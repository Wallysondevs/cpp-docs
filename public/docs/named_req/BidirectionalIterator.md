# Requisitos nomeados C++: LegacyBidirectionalIterator

Um **LegacyBidirectionalIterator** é um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) que pode ser movido em ambas as direções (ou seja, incrementado e decrementado).

Se um **LegacyBidirectionalIterator** se origina de um [Container](<#/doc/named_req/Container>), então seu `value_type` é o mesmo do container, de modo que a desreferenciação (*it) obtém o `value_type` do container.

### Requisitos

O tipo `It` satisfaz LegacyBidirectionalIterator se

* O tipo `It` satisfaz [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>)

E, dado

* a e b, lvalues do tipo `It`
* `reference`, o tipo denotado por [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt;::reference

As seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expressão | Retorno | Expressão equivalente | Notas
---|---|---|---
\--a | `It&` | | Pré-condições:

* a é decrementável (existe tal b que a == ++b)

Pós-condições:

* a é [desreferenciável](<#/doc/iterator>)
* \--(++a) == a
* Se \--a == \--b então a == b
* a e \--a designam o mesmo objeto iterator

a\-- | conversível para const It& | It temp = a;
\--a;
return temp; |
---|---
*a\-- | `reference`

Um LegacyBidirectionalIterator _mutável_ é um LegacyBidirectionalIterator que adicionalmente satisfaz os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Notas

O iterator de início não é decrementável e o comportamento é indefinido se \--container.begin() for avaliado.

Um iterator bidirecional não precisa ser desreferenciável para ser decrementável (em particular, o iterator de fim não é desreferenciável, mas é decrementável).

### Conceito

Para a definição de [std::iterator_traits](<#/doc/iterator/iterator_traits>), o seguinte conceito apenas para exposição é definido. | template&lt;class I&gt;
concept __LegacyBidirectionalIterator =
__LegacyForwardIterator&lt;I&gt; && requires(I i)
{
{ \--i } -> [std::same_as](<#/doc/concepts/same_as>)<I&>;
{ i\-- } -> [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;const I&&gt;;
{ *i\-- } -> [std::same_as](<#/doc/concepts/same_as>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>;
};

onde o conceito apenas para exposição `__LegacyForwardIterator` é descrito em [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

(desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 299](<https://cplusplus.github.io/LWG/issue299>)
([N3066](<https://wg21.link/N3066>)) | C++98 | o tipo de retorno de *a\-- era
exigido ser conversível para `T` | alterou o tipo de
retorno para `reference`[1](<#/doc/named_req/BidirectionalIterator>)
[LWG 383](<https://cplusplus.github.io/LWG/issue383>) | C++98 | b era exigido ser desreferenciável após \--a | a é exigido ser desreferenciável em vez disso
[LWG 1212](<https://cplusplus.github.io/LWG/issue1212>)
([N3066](<https://wg21.link/N3066>)) | C++98 | o tipo de retorno de *a\-- não correspondia ao tipo de
retorno de *a++ exigido por [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) | alterou o tipo de
retorno para `reference`

1. [↑](<#/doc/named_req/BidirectionalIterator>) Este problema foi inicialmente resolvido por [N2758](<https://wg21.link/N2758>) (conceitos de iterator), que foi posteriormente removido do padrão C++.

### Veja também

[bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>)(C++20) | especifica que um [`forward_iterator`](<#/doc/iterator/forward_iterator>) é um iterator bidirecional, suportando movimento para trás
(conceito)
[**Biblioteca de iterators**](<#/doc/iterator>) | fornece definições para iterators, traits de iterator, adaptadores e funções de utilidade
*[_(as is)_]: A::pointer