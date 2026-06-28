# Requisitos nomeados C++: LegacyRandomAccessIterator

Um **LegacyRandomAccessIterator** é um [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) que pode ser movido para apontar para qualquer elemento em tempo constante.

Se um **LegacyRandomAccessIterator** se origina de um [Container](<#/doc/named_req/Container>), então seu `value_type` é o mesmo do container, de modo que a desreferenciação (*it) obtém o `value_type` do container.

Um ponteiro para um elemento de um array satisfaz todos os requisitos de LegacyRandomAccessIterator.

### Requisitos

O tipo `It` satisfaz LegacyRandomAccessIterator se

* O tipo `It` satisfaz [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>)

E, dado

* `value_type`, o tipo denotado por [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::value_type
* `difference_type`, o tipo denotado por [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::difference_type
* `reference`, o tipo denotado por [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::reference
* i, a, b, objetos do tipo `It` ou const It
* r, um lvalue do tipo `It`
* n, um inteiro do tipo `difference_type`

As seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expression | Return type | Operational semantics | Notas
r += n | `It&` | difference_type m = n;
if (m >= 0) while (m\--) ++r;
else while (m++) \--r;
return r; |
  * n pode ser positivo ou negativo
  * A complexidade é constante (ou seja, a implementação não pode realmente executar o loop while mostrado na semântica operacional)

a + n n + a | `It` | It temp = a;
return temp += n; |
  * n pode ser positivo ou negativo
  * a + n == n + a

r -= n | `It&` | return r += -n; | O valor absoluto de n deve estar dentro do intervalo de valores representáveis de `difference_type`.
i - n | `It` | It temp = i;
return temp -= n; |
b - a | `difference_type` | return n;
(see the precondition) | Pré-condição:
  * existe um valor n do tipo `difference_type` tal que a + n == b
Pós-condição:
  * b == a + (b - a).

i[n] | convertible to `reference` | *(i + n) | convertível para `reference`
---|---|---|---
a < b | | satisfaz [BooleanTestable](<#/doc/named_req/BooleanTestable>) | (até C++20)
modela [`_boolean-testable_`](<#/doc/concepts/boolean-testable>) | (desde C++20)
Equivalente a return b - a > 0; | Pré-condição:
  * o mesmo que para b - a
Relação de ordenação total estrita:
  * !(a < a)
  * se a < b então !(b < a)
  * se a < b e b < c então a < c
  * a < b ou b < a ou a == b
(exatamente uma das expressões é verdadeira)

a > b | | satisfaz [BooleanTestable](<#/doc/named_req/BooleanTestable>) | (até C++20)
---|---
modela [`_boolean-testable_`](<#/doc/concepts/boolean-testable>) | (desde C++20)
b < a | Relação de ordenação total oposta a a < b
a >= b | | satisfaz [BooleanTestable](<#/doc/named_req/BooleanTestable>) | (até C++20)
modela [`_boolean-testable_`](<#/doc/concepts/boolean-testable>) | (desde C++20)
!(a < b) |
a <= b | | satisfaz [BooleanTestable](<#/doc/named_req/BooleanTestable>) | (até C++20)
modela [`_boolean-testable_`](<#/doc/concepts/boolean-testable>) | (desde C++20)
!(a > b) |

As regras acima implicam que LegacyRandomAccessIterator também implementa [LessThanComparable](<#/doc/named_req/LessThanComparable>).

Um LegacyRandomAccessIterator _mutável_ é um LegacyRandomAccessIterator que adicionalmente satisfaz os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Conceito

Para a definição de [std::iterator_traits](<#/doc/iterator/iterator_traits>), o seguinte conceito apenas para exposição é definido. | template&lt;class I&gt;
concept __LegacyRandomAccessIterator =
__LegacyBidirectionalIterator&lt;I&gt; && [std::totally_ordered](<#/doc/concepts/totally_ordered>)&lt;I&gt; &&
requires(I i, typename [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)&lt;I&gt;::difference_type n)
{
{ i += n } -> [std::same_as](<#/doc/concepts/same_as>)<I&>;
{ i -= n } -> [std::same_as](<#/doc/concepts/same_as>)<I&>;
{ i + n } -> [std::same_as](<#/doc/concepts/same_as>)&lt;I&gt;;
{ n + i } -> [std::same_as](<#/doc/concepts/same_as>)&lt;I&gt;;
{ i - n } -> [std::same_as](<#/doc/concepts/same_as>)&lt;I&gt;;
{ i - i } -> [std::same_as](<#/doc/concepts/same_as>)<decltype(n)>;
{ i[n] } -> [std::convertible_to](<#/doc/concepts/convertible_to>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>;
};

onde o conceito apenas para exposição `__LegacyBidirectionalIterator` é descrito em [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

(desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 299](<https://cplusplus.github.io/LWG/issue299>)
([N3066](<https://wg21.link/N3066>)) | C++98 | o tipo de retorno de a[n] era exigido
ser convertível para const value_type& | o tipo de retorno é exigido
ser convertível para `reference`
[LWG 448](<https://cplusplus.github.io/LWG/issue448>) | C++98 | o tipo de retorno de a[n] era exigido
ser convertível para `value_type` | o tipo de retorno é exigido ser
convertível para const value_type&[1](<#/doc/named_req/RandomAccessIterator>)
[LWG 1079](<https://cplusplus.github.io/LWG/issue1079>) | C++98 | b - a foi definido usando a < b,
resultando em definição circular | removido a < b da definição
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | a convertibilidade para bool era muito fraca para refletir a expectativa das implementações | requisitos fortalecidos

1. [↑](<#/doc/named_req/RandomAccessIterator>) [LWG issue 299](<https://cplusplus.github.io/LWG/issue299>) foi reaberto após esta resolução.

### Veja também

[ random_access_iterator](<#/doc/iterator/random_access_iterator>)(C++20) | especifica que um [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) é um iterator de acesso aleatório, suportando avanço em tempo constante e indexação
(conceito)
[**Biblioteca de iterators**](<#/doc/iterator>) | fornece definições para iterators, traits de iterators, adaptadores e funções de utilidade
*[_(como está)_]: A::pointer