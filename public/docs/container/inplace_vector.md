# std::inplace_vector

Definido no cabeçalho `[<inplace_vector>](<#/doc/header/inplace_vector>)`

```c
template<
class T,
std::size_t N
> struct inplace_vector;
```

`inplace_vector` é um array redimensionável dinamicamente com armazenamento contíguo *inplace*. Os elementos do tipo `T` são armazenados e alinhados corretamente dentro do próprio objeto. A capacidade do armazenamento interno é fixa em tempo de compilação e é igual a N.

Os elementos são armazenados contiguamente, o que significa que os elementos podem ser acessados não apenas através de iterators ou do operador[] de acesso aleatório, mas também usando offsets para ponteiros regulares para elementos. Um ponteiro para um elemento de um `inplace_vector` pode ser passado para qualquer função que espera um ponteiro para um elemento de um array C.

O `inplace_vector` modela [Container](<#/doc/named_req/Container>), [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), [ContiguousContainer](<#/doc/named_req/ContiguousContainer>) e [SequenceContainer](<#/doc/named_req/SequenceContainer>), incluindo a maioria dos [requisitos opcionais de sequence container](<#/doc/named_req/SequenceContainer>), exceto que as funções membro `push_front`, `emplace_front`, `pop_front` e `prepend_range` não são fornecidas.

Para qualquer N positivo, `std::inplace_vector<T, N>::iterator` e `std::inplace_vector<T, N>::const_iterator` atendem aos requisitos de [ConstexprIterator](<#/doc/named_req/ConstexprIterator>).

Para qualquer N positivo, se `T` não for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) ou [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T&gt; for falso, então as funções membro de `inplace_vector` não são [utilizáveis em expressões constantes](<#/doc/language/constant_expression>).

A especialização std::inplace_vector<T, 0> é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e é vazia. [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)<std::inplace_vector<T, 0>> também é verdadeiro.

Qualquer função membro de std::inplace_vector<T, N> que causaria inserção além da capacidade N lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

A complexidade das operações comuns em `inplace_vector`s é a seguinte:

*   Acesso aleatório a um elemento via [`operator[]`](<#/doc/container/inplace_vector/operator_at>) ou [`at()`](<#/doc/container/inplace_vector/at>) – constante: 𝓞(1).
*   Inserção ou remoção de um elemento no final – constante: 𝓞(1).
*   Inserção ou remoção de elementos no final – linear no número de elementos inseridos/removidos: 𝓞(n).
*   Inserção ou remoção de elementos no início ou no meio – linear no número de elementos inseridos/removidos mais a distância até o final do vetor: 𝓞(n).

### Invalidação de iterators

As garantias de invalidação de iterators de `std::inplace_vector` diferem de [std::vector](<#/doc/container/vector>):

*   mover um `inplace_vector` invalida todos os iterators;
*   trocar dois `inplace_vector`s invalida todos os iterators (durante a troca, o iterator continuará a apontar para o mesmo elemento do array e, portanto, pode mudar seu valor).

As seguintes funções membro potencialmente invalidam iterators: [`operator=`](<#/>), [`assign`](<#/doc/container/inplace_vector/assign>), [`assign_range`](<#/doc/container/inplace_vector/assign_range>), [`clear`](<#/doc/container/inplace_vector/clear>), [`emplace`](<#/doc/container/inplace_vector/emplace>), [`erase`](<#/doc/container/inplace_vector/erase>), [`insert`](<#/doc/container/inplace_vector/insert>), [`insert_range`](<#/doc/container/inplace_vector/insert_range>), [`pop_back`](<#/doc/container/inplace_vector/pop_back>), [`resize`](<#/doc/container/inplace_vector/resize>) e [`swap`](<#/doc/container/inplace_vector/swap>).

As seguintes funções membro potencialmente invalidam apenas o iterator [`end`](<#/doc/container/inplace_vector/end>): [`append_range`](<#/doc/container/inplace_vector/append_range>), [`emplace_back`](<#/doc/container/inplace_vector/emplace_back>), [`push_back`](<#/doc/container/inplace_vector/push_back>), [`try_append_range`](<#/doc/container/inplace_vector/try_append_range>), [`try_emplace_back`](<#/doc/container/inplace_vector/try_emplace_back>), [`try_push_back`](<#/doc/container/inplace_vector/try_push_back>), [`unchecked_emplace_back`](<#/doc/container/inplace_vector/unchecked_emplace_back>) e [`unchecked_push_back`](<#/doc/container/inplace_vector/unchecked_push_back>).

### Parâmetros de template

- **T** — tipo do elemento. Deve ser [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>).
- **N** — capacidade, ou seja, o número máximo de elementos no `inplace_vector` (pode ser ​0​).

### Tipos membro

Tipo | Definição
---|---
`value_type` | `T`
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | value_type*
`const_pointer` | const value_type*
`iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) definido pela implementação para `value_type`
`const_iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) definido pela implementação para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Funções membro

[ (constructor)](<#/doc/container/inplace_vector/inplace_vector>) | constrói o `inplace_vector`
(função membro pública)
[ (destructor)](<#/doc/container/inplace_vector/~inplace_vector>) | destrói o `inplace_vector`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ assign](<#/doc/container/inplace_vector/assign>) | atribui valores ao container
(função membro pública)
[ assign_range](<#/doc/container/inplace_vector/assign_range>) | atribui um range de valores ao container
(função membro pública)

##### Acesso a elementos

[ at](<#/doc/container/inplace_vector/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/inplace_vector/operator_at>) | acessa o elemento especificado
(função membro pública)
[ front](<#/doc/container/inplace_vector/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/inplace_vector/back>) | acessa o último elemento
(função membro pública)
[ data](<#/doc/container/inplace_vector/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)

##### Iterators

[ begincbegin](<#/doc/container/inplace_vector/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/inplace_vector/end>) | retorna um iterator para o final
(função membro pública)
[ rbegincrbegin](<#/doc/container/inplace_vector/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/container/inplace_vector/rend>) | retorna um reverse iterator para o final
(função membro pública)

##### Tamanho e capacidade

[ empty](<#/doc/container/inplace_vector/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/inplace_vector/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/inplace_vector/max_size>)[static] | retorna o número máximo possível de elementos
(função membro pública estática)
[ capacity](<#/doc/container/inplace_vector/capacity>)[static] | retorna o número de elementos que podem ser mantidos no armazenamento atualmente alocado
(função membro pública estática)
[ resize](<#/doc/container/inplace_vector/resize>) | altera o número de elementos armazenados
(função membro pública)
[ reserve](<#/doc/container/inplace_vector/reserve>)[static] | reserva armazenamento
(função membro pública estática)
[ shrink_to_fit](<#/doc/container/inplace_vector/shrink_to_fit>)[static] | reduz o uso de memória liberando memória não utilizada
(função membro pública estática)

##### Modificadores

[ insert](<#/doc/container/inplace_vector/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/inplace_vector/insert_range>) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/inplace_vector/emplace>) | constrói o elemento *in-place*
(função membro pública)
[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) | constrói um elemento *in-place* no final
(função membro pública)
[ try_emplace_back](<#/doc/container/inplace_vector/try_emplace_back>) | tenta construir um elemento *in-place* no final
(função membro pública)
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) | constrói incondicionalmente um elemento *in-place* no final
(função membro pública)
[ push_back](<#/doc/container/inplace_vector/push_back>) | adiciona um elemento ao final
(função membro pública)
[ try_push_back](<#/doc/container/inplace_vector/try_push_back>) | tenta adicionar um elemento ao final
(função membro pública)
[ unchecked_push_back](<#/doc/container/inplace_vector/unchecked_push_back>) | adiciona incondicionalmente um elemento ao final
(função membro pública)
[ pop_back](<#/doc/container/inplace_vector/pop_back>) | remove o último elemento
(função membro pública)
[ append_range](<#/doc/container/inplace_vector/append_range>) | adiciona um range de elementos ao final
(função membro pública)
[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) | tenta adicionar um range de elementos ao final
(função membro pública)
[ clear](<#/doc/container/inplace_vector/clear>) | limpa o conteúdo
(função membro pública)
[ erase](<#/doc/container/inplace_vector/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/inplace_vector/swap>) | troca o conteúdo
(função membro pública)

### Funções não-membro

[ std::swap(std::inplace_vector)](<#/doc/container/inplace_vector/swap2>)(C++26) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase(std::inplace_vector)erase_if(std::inplace_vector)](<#/doc/container/inplace_vector/erase2>)(C++26) | apaga todos os elementos que satisfazem critérios específicos
(template de função)
[ operator==operator<=>](<#/doc/container/inplace_vector/operator_cmp>)(C++26) | compara lexicograficamente os valores de dois `inplace_vector`s
(template de função)

### Notas

O número de elementos em um `inplace_vector` pode variar dinamicamente até uma capacidade fixa porque os elementos são armazenados dentro do próprio objeto, de forma semelhante a [std::array](<#/doc/container/array>). No entanto, os objetos são inicializados à medida que são inseridos no `inplace_vector`, ao contrário dos arrays C ou [std::array](<#/doc/container/array>), que devem construir todos os elementos na instanciação.

`inplace_vector` é útil em ambientes onde alocações dinâmicas de memória não são desejadas.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_inplace_vector`](<#/doc/feature_test>) | [`202406L`](<#/>) | (C++26) | `std::inplace_vector`: vetor redimensionável dinamicamente com armazenamento *inplace* de capacidade fixa

### Exemplo

Run this code
```cpp
    #include <algorithm>
    #include <array>
    #include <cassert>
    #include <inplace_vector>
    
    int main()
    {
        std::inplace_vector<int, 4> v1{0, 1, 2};
        assert(v1.max_size() == 4);
        assert(v1.capacity() == 4);
        assert(v1.size() == 3);
        assert(std::ranges::equal(v1, std::array{0, 1, 2}));
        assert(v1[0] == 0);
        assert(v1.at(0) == 0);
        assert(v1.front() == 0);
        assert(*v1.begin() == 0);
        assert(v1.back() == 2);
        v1.push_back(3);
        assert(v1.back() == 3);
        assert(std::ranges::equal(v1, std::array{0, 1, 2, 3}));
        v1.resize(3);
        assert(std::ranges::equal(v1, std::array{0, 1, 2}));
        assert(v1.try_push_back(3) != nullptr);
        assert(v1.back() == 3);
        assert(v1.size() == 4);
        assert(v1.try_push_back(13) == nullptr); // sem espaço
        assert(v1.back() == 3);
        assert(v1.size() == 4);
        v1.clear();
        assert(v1.size() == 0);
        assert(v1.empty());
    }
```

### Veja também

[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(template de classe)
[ array](<#/doc/container/array>)(C++11) | array contíguo *inplace* de tamanho fixo
(template de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(template de classe)

### Links externos

1. | [`inplace_vector`](<https://godbolt.org/z/5P78aG5xE>) — Uma implementação de referência de [P0843R14](<https://wg21.link/P0843R14>) (`std::inplace_vector`).
---|---
2. | [`static_vector`](<https://www.boost.org/doc/libs/release/doc/html/container/non_standard_containers.html#container.non_standard_containers.static_vector>) — Boost.Container implementa *inplace vector* como um tipo autônomo com suas próprias garantias.
3. | [`fixed_vector`](<https://github.com/questor/eastl/blob/master/fixed_vector.h#L71>) — EASTL implementa *inplace vector* via um parâmetro de template extra.
4. | [`small_vector`](<https://github.com/facebook/folly/blob/master/folly/docs/small_vector.md>) — Folly também implementa *inplace vector* via um parâmetro de template extra.
5. | [`stack_alloc`](<https://howardhinnant.github.io/stack_alloc.html>) — Alocadores personalizados de Howard Hinnant que emulam `std::inplace_vector` sobre [std::vector](<#/doc/container/vector>).