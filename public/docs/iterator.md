# Biblioteca de iteradores

Iteradores são uma generalização de [ponteiros](<#/doc/language/pointer>) que permitem que um programa C++ trabalhe com diferentes estruturas de dados (por exemplo, [containers](<#/doc/container>) e [ranges](<#/doc/ranges>)(desde C++20)) de maneira uniforme. A biblioteca de iteradores fornece definições para iteradores, bem como traits de iteradores, adaptadores e funções de utilidade.

Como os iteradores são uma abstração de ponteiros, suas semânticas são uma generalização da maioria das semânticas de ponteiros em C++. Isso garante que todo [function template](<#/doc/language/function_template>) que aceita iteradores funcione também com ponteiros regulares.

### Categorias de iteradores

Existem cinco(ate C++17)seis(desde C++17) tipos de iteradores: [LegacyInputIterator](<#/doc/named_req/InputIterator>), [LegacyOutputIterator](<#/doc/named_req/OutputIterator>), [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>)(desde C++17). (Veja também [LegacyIterator](<#/doc/named_req/Iterator>) para o tipo mais básico de iterador.)

Em vez de serem definidas por tipos específicos, cada categoria de iterador é definida pelas operações que podem ser realizadas nela. Essa definição significa que qualquer tipo que suporte as operações necessárias pode ser usado como um iterador -- por exemplo, um ponteiro suporta todas as operações exigidas por [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), então um ponteiro pode ser usado em qualquer lugar onde um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) é esperado.

Todas as categorias de iteradores (exceto [LegacyOutputIterator](<#/doc/named_req/OutputIterator>)) podem ser organizadas em uma hierarquia, onde categorias de iteradores mais poderosas (por exemplo, [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>)) suportam as operações de categorias menos poderosas (por exemplo, [LegacyInputIterator](<#/doc/named_req/InputIterator>)). Se um iterador se enquadra em uma dessas categorias e também satisfaz os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>), então ele é chamado de iterador _mutável_ e suporta _ambos_ entrada e saída. Iteradores não mutáveis são chamados de iteradores _constantes_.

```text
Iteradores são chamados de iteradores _constexpr_ se todas as operações fornecidas para atender aos requisitos da categoria de iterador forem constexpr functions.  // (desde C++20)
Categoria de iterador | Operações e requisito de armazenamento
escrita | leitura | incremento | decremento | acesso aleatório | armazenamento contíguo
sem múltiplas passagens | com múltiplas passagens
LegacyIterator | | | Obrigatório
LegacyOutputIterator | Obrigatório | | Obrigatório
LegacyInputIterator
(mutável se suporta operação de escrita) | | Obrigatório | Obrigatório
LegacyForwardIterator
(também satisfaz LegacyInputIterator) | | Obrigatório | Obrigatório | Obrigatório
LegacyBidirectionalIterator
(também satisfaz LegacyForwardIterator) | | Obrigatório | Obrigatório | Obrigatório | Obrigatório
LegacyRandomAccessIterator
(também satisfaz LegacyBidirectionalIterator) | | Obrigatório | Obrigatório | Obrigatório | Obrigatório | Obrigatório
LegacyContiguousIterator1
(também satisfaz LegacyRandomAccessIterator) | | Obrigatório | Obrigatório | Obrigatório | Obrigatório | Obrigatório | Obrigatório
```

1.  [↑](<#/doc/iterator>) A categoria [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) foi formalmente especificada apenas em C++17, mas os iteradores de [std::vector](<#/doc/container/vector>), [std::basic_string](<#/doc/string/basic_string>), [std::array](<#/doc/container/array>), e [std::valarray](<#/doc/numeric/valarray>), bem como ponteiros para arrays C, são frequentemente tratados como uma categoria separada em código pré-C++17.

Nota: Um tipo que suporta as operações exigidas em uma linha da tabela acima não se enquadra necessariamente na categoria correspondente; consulte a página da categoria para a lista completa de requisitos.

### Definições

#### Tipos e gravabilidade

Um iterador de entrada i suporta a expressão *i, resultando em um valor de algum [object type](<#/doc/language/type-id>) `T`, chamado de _value type_ do iterador.

Um iterador de saída i possui um conjunto não vazio de tipos que são _writable_(ate C++20)[`indirectly_writable`](<#/doc/iterator/indirectly_writable>)(desde C++20) para o iterador; para cada tipo `T`, a expressão *i = o é válida onde o é um valor do tipo `T`.

Para cada tipo de iterador `X` para o qual a igualdade é definida(ate C++20), existe um tipo [inteiro](<#/doc/language/types>) com sinal(ate C++20)[integer-like](<#/doc/iterator/is-integer-like>)(desde C++20) correspondente, chamado de _difference type_ do iterador.

#### Desreferenciabilidade e validade

Assim como um ponteiro regular para um [array](<#/doc/language/array>) garante que existe um valor de ponteiro apontando para além do último elemento do array, para qualquer tipo de iterador existe um valor de iterador que aponta para além do último elemento de uma sequência correspondente. Tal valor é chamado de valor _past-the-end_.

Valores de um iterador i para os quais a expressão *i é definida são chamados de _desreferenciáveis_. A [standard library](<#/doc/standard_library>) nunca assume que valores past-the-end são desreferenciáveis.

Iteradores também podem ter valores _singulares_ que não estão associados a nenhuma sequência. Os resultados da maioria das expressões são comportamento indefinido para valores singulares; as únicas exceções são

*   a atribuição de um valor não singular a um iterador que contém um valor singular,
*   destruir um iterador que contém um valor singular, e,
*   para iteradores que atendem aos requisitos de [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), usar um iterador [value-initialized](<#/doc/language/value_initialization>) como fonte de uma operação de cópia ou move(desde C++11).

Nesses casos, o valor singular é sobrescrito da mesma forma que qualquer outro valor. Valores desreferenciáveis são sempre não singulares.

Um iterador _inválido_ é um iterador que pode ser singular.

#### Ranges

A maioria dos templates algorítmicos da standard library que operam em estruturas de dados possuem interfaces que utilizam ranges.

Um iterador j é chamado _alcançável_ a partir de um iterador i se e somente se houver uma sequência finita de aplicações da expressão ++i que faça i == j. Se j é alcançável a partir de i, eles se referem a elementos da mesma sequência. Um _range_ é um par de iteradores que designam o início e o fim da computação. Um range `[`i`, `i`)` é um range vazio; em geral, um range `[`i`, `j`)` se refere aos elementos na estrutura de dados começando com o elemento apontado por i e indo até, mas não incluindo, o elemento apontado por j. O range `[`i`, `j`)` é _válido_ se e somente se j for alcançável a partir de i. | (ate C++20)
Um _range_ pode ser denotado por:

*   `[`i`, `s`)`, com um iterador i e um _sentinel_ s que designam o início e o fim da computação (i e s podem ter tipos diferentes), ou
*   i` + `[`​0​`, `n`)`, com um iterador i e uma contagem n que designam o início e o número de elementos aos quais a computação deve ser aplicada.

##### Range iterador-sentinel

Um iterador e um sentinel denotando um range são comparáveis. `[`i`, `s`)` é vazio se i == s; caso contrário, `[`i`, `s`)` se refere aos elementos na estrutura de dados começando com o elemento apontado por i e indo até, mas não incluindo, o elemento, se houver, apontado pelo primeiro iterador j tal que j == s. Um sentinel s é chamado _alcançável_ a partir de um iterador i se e somente se houver uma sequência finita de aplicações da expressão ++i que faça i == s. Se s é alcançável a partir de i, `[`i`, `s`)` denota um range _válido_.

##### Range contado

Um _counted range_ i` + `[`​0​`, `n`)` é vazio se n == 0; caso contrário, i` + `[`​0​`, `n`)` se refere aos n elementos na estrutura de dados começando com o elemento apontado por i e indo até, mas não incluindo, o elemento, se houver, apontado pelo resultado de n aplicações de ++i. Um counted range i` + `[`​0​`, `n`)` é _válido_ se e somente se

*   n == 0; ou
*   todas as seguintes condições são satisfeitas:
    *   n é positivo,
    *   i é desreferenciável, e
    *   ++i` + `[`​0​`, `\--n`)` é válido.

| (desde C++20)

O resultado da aplicação de funções na standard library a ranges inválidos é comportamento indefinido.

### Iterator concepts (desde C++20)

Um novo sistema de iteradores baseado em [concepts](<#/doc/language/constraints>) que são diferentes dos iteradores C++17. Embora a taxonomia básica permaneça semelhante, os requisitos para as categorias de iteradores individuais são um pouco diferentes.

Definido no namespace `std`
---
[ indirectly_readable](<#/doc/iterator/indirectly_readable>)(C++20) | especifica que um tipo é indiretamente legível aplicando o operador `*`
(concept)
[ indirectly_writable](<#/doc/iterator/indirectly_writable>)(C++20) | especifica que um valor pode ser escrito no objeto referenciado por um iterador
(concept)
[ weakly_incrementable](<#/doc/iterator/weakly_incrementable>)(C++20) | especifica que um tipo [`semiregular`](<#/doc/concepts/semiregular>) pode ser incrementado com operadores de pré e pós-incremento
(concept)
[ incrementable](<#/doc/iterator/incrementable>)(C++20) | especifica que a operação de incremento em um tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>) preserva a igualdade ([equality-preserving](<#/doc/concepts>)) e que o tipo é [`equality_comparable`](<#/doc/concepts/equality_comparable>)
(concept)
[_is-integer-like is-signed-integer-like_](<#/doc/iterator/is-integer-like>)(C++20)(C++20) | especifica que um tipo se comporta como um tipo inteiro (com sinal)
(exposition-only concept*)
[ input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>)(C++20) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)
[ sentinel_for](<#/doc/iterator/sentinel_for>)(C++20) | especifica que um tipo é um sentinel para um tipo [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>)
(concept)
[ sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)(C++20) | especifica que o operador - pode ser aplicado a um iterador e um sentinel para calcular sua diferença em tempo constante
(concept)
[ input_iterator](<#/doc/iterator/input_iterator>)(C++20) | especifica que um tipo é um iterador de entrada, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré e pós-incrementado
(concept)
[ output_iterator](<#/doc/iterator/output_iterator>)(C++20) | especifica que um tipo é um iterador de saída para um dado value type, ou seja, valores desse tipo podem ser escritos nele e ele pode ser pré e pós-incrementado
(concept)
[ forward_iterator](<#/doc/iterator/forward_iterator>)(C++20) | especifica que um [`input_iterator`](<#/doc/iterator/input_iterator>) é um iterador forward, suportando comparação de igualdade e múltiplas passagens
(concept)
[ bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>)(C++20) | especifica que um [`forward_iterator`](<#/doc/iterator/forward_iterator>) é um iterador bidirectional, suportando movimento para trás
(concept)
[ random_access_iterator](<#/doc/iterator/random_access_iterator>)(C++20) | especifica que um [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) é um iterador random-access, suportando avanço em tempo constante e indexação
(concept)
[ contiguous_iterator](<#/doc/iterator/contiguous_iterator>)(C++20) | especifica que um [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) é um iterador contiguous, referindo-se a elementos que são contíguos na memória
(concept)

### Iterator associated types (desde C++20)

Definido no namespace `std`
---
[ incrementable_traits](<#/doc/iterator/incrementable_traits>)(C++20) | calcula o difference type de um tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
(class template)
[ indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)(C++20) | calcula o value type de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(class template)
[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterador
(alias template)

### Iterator primitives

[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece uma interface uniforme para as propriedades de um iterador
(class template)
---
[ input_iterator_tagoutput_iterator_tagforward_iterator_tagbidirectional_iterator_tagrandom_access_iterator_tagcontiguous_iterator_tag](<#/doc/iterator/iterator_tags>)(C++20) | tipos de classe vazios usados para indicar categorias de iteradores
(class)
[ iterator](<#/doc/iterator/iterator>)(deprecated in C++17) | classe base para facilitar a definição de tipos exigidos para iteradores simples
(class template)

### Iterator customization points (desde C++20)

Definido no namespace `std::ranges`
---
[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado
(customization point object)
[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis
(customization point object)

### Algorithm concepts e utilitários (desde C++20)

Um conjunto de concepts e templates de utilidade relacionados, projetados para facilitar a restrição de operações algorítmicas comuns.

Definido no header `[<iterator>](<#/doc/header/iterator>)`
---
Definido no namespace `std`

##### Concepts de invocáveis indiretos

[ indirectly_unary_invocableindirectly_regular_unary_invocable](<#/doc/iterator/indirectly_unary_invocable>)(C++20)(C++20) | especifica que um tipo invocável pode ser invocado com o resultado da desreferenciação de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(concept)
[ indirect_unary_predicate](<#/doc/iterator/indirect_unary_predicate>)(C++20) | especifica que um tipo invocável, quando invocado com o resultado da desreferenciação de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`predicate`](<#/doc/concepts/predicate>)
(concept)
[ indirect_binary_predicate](<#/doc/iterator/indirect_binary_predicate>)(C++20) | especifica que um tipo invocável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`predicate`](<#/doc/concepts/predicate>)
(concept)
[ indirect_equivalence_relation](<#/doc/iterator/indirect_equivalence_relation>)(C++20) | especifica que um tipo invocável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`equivalence_relation`](<#/doc/concepts/equivalence_relation>)
(concept)
[ indirect_strict_weak_order](<#/doc/iterator/indirect_strict_weak_order>)(C++20) | especifica que um tipo invocável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`strict_weak_order`](<#/doc/concepts/strict_weak_order>)
(concept)

##### Requisitos comuns de algoritmo

[ indirectly_movable](<#/doc/iterator/indirectly_movable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_movable_storable](<#/doc/iterator/indirectly_movable_storable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que o move pode ser realizado através de um objeto intermediário
(concept)
[ indirectly_copyable](<#/doc/iterator/indirectly_copyable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_copyable_storable](<#/doc/iterator/indirectly_copyable_storable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que a cópia pode ser realizada através de um objeto intermediário
(concept)
[ indirectly_swappable](<#/doc/iterator/indirectly_swappable>)(C++20) | especifica que os valores referenciados por dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) podem ser trocados
(concept)
[ indirectly_comparable](<#/doc/iterator/indirectly_comparable>)(C++20) | especifica que os valores referenciados por dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) podem ser comparados
(concept)
[ permutable](<#/doc/iterator/permutable>)(C++20) | especifica os requisitos comuns de algoritmos que reordenam elementos no local
(concept)
[ mergeable](<#/doc/iterator/mergeable>)(C++20) | especifica os requisitos de algoritmos que mesclam sequências ordenadas em uma sequência de saída copiando elementos
(concept)
[ sortable](<#/doc/iterator/sortable>)(C++20) | especifica os requisitos comuns de algoritmos que permutam sequências em sequências ordenadas
(concept)

##### Utilitários

[ indirect_result_t](<#/doc/iterator/indirect_result_t>)(C++20) | calcula o resultado de invocar um objeto invocável no resultado da desreferenciação de um conjunto de tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(alias template)
[ projected](<#/doc/iterator/projected>)(C++20) | template auxiliar para especificar as restrições em algoritmos que aceitam projeções
(class template)
[ projected_value_t](<#/doc/iterator/projected_value_t>)(C++26) | calcula o value type de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) por projeção
(alias template)

### Adaptadores de iteradores

[ reverse_iterator](<#/doc/iterator/reverse_iterator>) | adaptador de iterador para travessia em ordem inversa
(class template)
---
[ make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)(C++14) | cria um [std::reverse_iterator](<#/doc/iterator/reverse_iterator>) de tipo inferido a partir do argumento
(function template)
[ back_insert_iterator](<#/doc/iterator/back_insert_iterator>) | adaptador de iterador para inserção no final de um container
(class template)
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento
(function template)
[ front_insert_iterator](<#/doc/iterator/front_insert_iterator>) | adaptador de iterador para inserção no início de um container
(class template)
[ front_inserter](<#/doc/iterator/front_inserter>) | cria um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) de tipo inferido a partir do argumento
(function template)
[ insert_iterator](<#/doc/iterator/insert_iterator>) | adaptador de iterador para inserção em um container
(class template)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(function template)
[ basic_const_iterator](<#/doc/iterator/basic_const_iterator>)(C++23) | adaptador de iterador que converte um iterador em um iterador constante
(class template)
[ const_iterator](<#/doc/iterator/const_iterator>)(C++23) | calcula um tipo de iterador constante para um dado tipo
(alias template)
[ const_sentinel](<#/doc/iterator/const_sentinel>)(C++23) | calcula um tipo sentinel a ser usado com iteradores constantes
(alias template)
[ make_const_iterator](<#/doc/iterator/make_const_iterator>)(C++23) | cria um std::const_iterator de tipo inferido a partir do argumento
(function template)
[ make_const_sentinel](<#/doc/iterator/make_const_sentinel>)(C++23) | cria um std::const_sentinel de tipo inferido a partir do argumento
(function template)
[ move_iterator](<#/doc/iterator/move_iterator>)(C++11) | adaptador de iterador que desreferencia para um rvalue
(class template)
[ move_sentinel](<#/doc/iterator/move_sentinel>)(C++20) | adaptador sentinel para [std::move_iterator](<#/doc/iterator/move_iterator>)
(class template)
[ make_move_iterator](<#/doc/iterator/make_move_iterator>)(C++11) | cria um [std::move_iterator](<#/doc/iterator/move_iterator>) de tipo inferido a partir do argumento
(function template)
[ common_iterator](<#/doc/iterator/common_iterator>)(C++20) | adapta um tipo de iterador e seu sentinel em um tipo de iterador comum
(class template)
[ default_sentinel_t](<#/doc/iterator/default_sentinel>)(C++20) | sentinel padrão para uso com iteradores que conhecem o limite de seu range
(class)
[ counted_iterator](<#/doc/iterator/counted_iterator>)(C++20) | adaptador de iterador que rastreia a distância até o final do range
(class template)
[ unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>)(C++20) | sentinel que sempre compara como diferente de qualquer tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
(class)

### Iteradores de stream

[ istream_iterator](<#/doc/iterator/istream_iterator>) | iterador de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(class template)
---
[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | iterador de saída que escreve para [std::basic_ostream](<#/doc/io/basic_ostream>)
(class template)
[ istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) | iterador de entrada que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(class template)
[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | iterador de saída que escreve para [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(class template)

### Operações de iteradores

Definido no header `[<iterator>](<#/doc/header/iterator>)`
---
[ advance](<#/doc/iterator/advance>) | avança um iterador por uma dada distância
(function template)
[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iteradores
(function template)
[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterador
(function template)
[ prev](<#/doc/iterator/prev>)(C++11) | decrementa um iterador
(function template)
[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterador por uma dada distância ou até um limite dado
(algorithm function object)
[ ranges::distance](<#/doc/iterator/ranges/distance>)(C++20) | retorna a distância entre um iterador e um sentinel, ou entre o início e o fim de um range
(algorithm function object)
[ ranges::next](<#/doc/iterator/ranges/next>)(C++20) | incrementa um iterador por uma dada distância ou até um limite
(algorithm function object)
[ ranges::prev](<#/doc/iterator/ranges/prev>)(C++20) | decrementa um iterador por uma dada distância ou até um limite
(algorithm function object)

### Acesso a Range (desde C++11)

Esses function templates não-membros fornecem uma interface genérica para containers, arrays simples e [std::initializer_list](<#/doc/utility/initializer_list>).

Definido no header `[<array>](<#/doc/header/array>)`
---
Definido no header `[<deque>](<#/doc/header/deque>)`

```cpp
Definido no header `<flat_map>`
Definido no header `<flat_set>`
Definido no header `<forward_list>`
Definido no header `<inplace_vector>`
Definido no header `<iterator>`
Definido no header `<list>`
Definido no header `<map>`
Definido no header `<regex>`
Definido no header `<set>`
Definido no header `<span>`
Definido no header `<string>`
Definido no header `<string_view>`
Definido no header `<unordered_map>`
Definido no header `<unordered_set>`
Definido no header `<vector>`
Definido no namespace `std`
 begincbegin(C++11)(C++14)
(function template)
 endcend(C++11)(C++14)
(function template)
 rbegincrbegin(C++14)
(function template)
 rendcrend(C++14)
(function template)
 sizessize(C++17)(C++20)
(function template)
 empty(C++17)
(function template)
 data(C++17)
(function template)
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

```text
DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
CWG 1181 | C++98 | tipos array não podiam ser value types | eles podem
LWG 208 | C++98 | iteradores past-the-end eram sempre não singulares | eles podem ser singulares
LWG 278 | C++98 | a validade de um iterador não era definida | definida como sendo sempre não singular
LWG 324 | C++98 | iteradores de saída tinham value types | iteradores de saída têm writable types em vez disso
LWG 407 | C++98 | iteradores singulares não podiam ser destruídos | permitido
LWG 408
(N3066) | C++98 | iteradores singulares não podiam ser copiados | permitido se forem value-initialized
LWG 1185  
(N3066)  | C++98  | LegacyForwardIterator, LegacyBidirectionalIterator  
e LegacyRandomAccessIterator sempre satisfazem LegacyOutputIterator | eles podem não satisfazer LegacyOutputIterator  
LWG 1210  
(N3066)  | C++98  | a definição de singularidade e alcançabilidade de iterator dependia de containers  | dependem de sequências em vez disso   
LWG 3009 | C++17  | `<string_view>` não fornecia os  
templates de função de acesso a range  | fornece esses templates   
LWG 3987 | C++23  | `<flat_map>` e `<flat_set>` não  
forneciam os templates de função de acesso a range  | fornecem esses templates 
```