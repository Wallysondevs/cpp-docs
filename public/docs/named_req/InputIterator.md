# Requisitos nomeados C++: LegacyInputIterator

Um **LegacyInputIterator** é um [LegacyIterator](<#/doc/named_req/Iterator>) que pode ler do elemento apontado. LegacyInputIterators garantem validade apenas para algoritmos de passagem única: uma vez que um LegacyInputIterator i tenha sido incrementado, todas as cópias de seu valor anterior podem ser invalidadas.

### Requisitos

Tipo | Definição
---|---
`X` | Um tipo de input iterator
`T` | O [tipo de valor](<#/doc/iterator>) de `X` (isto é, [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;X&gt;::value_type)
`R` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;X&gt;::reference
Valor | Definição
i, j | Valores do tipo `X` ou const X
r | Um valor do tipo `X&`
Outros | Definição
`m` | Um identificador que possivelmente denota um membro de dados ou função membro

`X` satisfaz LegacyInputIterator se todas as seguintes condições forem satisfeitas:

*   `X` satisfaz [LegacyIterator](<#/doc/named_req/Iterator>).
*   `X` satisfaz [EqualityComparable](<#/doc/named_req/EqualityComparable>).
*   As seguintes expressões são bem-formadas e possuem a semântica especificada:

Expressão | Tipo | Semântica
i != j | um tipo que satisfaz [BooleanTestable](<#/doc/named_req/BooleanTestable>) | (ate C++20)
| um tipo que modela [`_boolean-testable_`](<#/doc/concepts/boolean-testable>) | (desde C++20)
Pré-condição | i e j estão no [domínio](<#/doc/named_req/InputIterator>) de ==.
Efeito | Equivalente a !(i == j).
*i | `R`, conversível para `T` | Pré-condição | i é [desreferenciável](<#/doc/iterator>).
Efeito |
*   A expressão (void)*i, *i é equivalente a *i.
*   Se i e j estão no domínio de ==, e i == j, então *i é equivalente a *j.

i->m | | Pré-condição | i é desreferenciável.
---|---|---|---
Efeito | Equivalente a (*i).m.
++r | `X&` | Pré-condição | r é desreferenciável.
Pós-condição |
*   r é desreferenciável ou r está past-the-end.
*   Quaisquer cópias do valor anterior de r não são mais exigidas para serem desreferenciáveis ou para estarem no domínio de ==.

(void)r++ | | Efeito | Equivalente a (void)++r.
---|---|---|---
*r++ | conversível para `T` | Efeito | Equivalente a T x = *r; ++r; return x;.

### Domínio de igualdade

O termo _o domínio de ==_ é usado no sentido matemático comum para denotar o conjunto de valores que podem ser comparados usando ==. Este conjunto pode mudar ao longo do tempo.

Cada algoritmo impõe requisitos adicionais no domínio de igualdade para os valores de iterator que ele usa. Esses requisitos podem ser inferidos dos usos que o algoritmo faz de == e !=.

### Notas

Para um input iterator `X` que não é um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;X&gt;::reference não precisa ser um tipo de referência: desreferenciar um input iterator pode retornar um objeto proxy ou o próprio [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;X&gt;::value_type por valor (como no caso de [`std::istreambuf_iterator`](<#/doc/iterator/istreambuf_iterator>)).

### Conceito

Para a definição de [std::iterator_traits](<#/doc/iterator/iterator_traits>), o seguinte concept apenas para exposição é definido. | template&lt;class I&gt;
concept __LegacyInputIterator =
__LegacyIterator&lt;I&gt; && [std::equality_comparable](<#/doc/concepts/equality_comparable>)&lt;I&gt; && requires(I i)
{
typename [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)&lt;I&gt;::difference_type;
typename [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)&lt;I&gt;::value_type;
typename [std::common_reference_t](<#/doc/types/common_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;&&,
typename [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)&lt;I&gt;::value_type&>;
*i++;
typename [std::common_reference_t](<#/doc/types/common_reference>)<decltype(*i++)&&,
typename [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)&lt;I&gt;::value_type&>;
requires [std::signed_integral](<#/doc/concepts/signed_integral>)<typename [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)&lt;I&gt;::difference_type>;
};

onde o concept apenas para exposição `__LegacyIterator` é descrito em [LegacyIterator](<#/doc/named_req/Iterator>).

(desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 98](<https://cplusplus.github.io/LWG/issue98>) | C++98 | o tipo de retorno de *i++ era exigido ser `T` | pode ser qualquer tipo conversível para `T`
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | a conversibilidade para bool era muito fraca para refletir a expectativa das implementações | requisitos fortalecidos

### Veja também

[ input_iterator](<#/doc/iterator/input_iterator>)(C++20) | especifica que um tipo é um input iterator, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré- e pós-incrementado
(concept)
[**Iterator library**](<#/doc/iterator>) | fornece definições para iterators, iterator traits, adaptadores e funções de utilidade
*[_(como está)_]: A::pointer