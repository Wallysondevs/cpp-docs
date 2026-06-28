# Requisitos nomeados C++: LegacyIterator

Os requisitos de **LegacyIterator** descrevem tipos que podem ser usados para identificar e percorrer os elementos de um container.

LegacyIterator é o conjunto base de requisitos usado por outros tipos de iterator: [LegacyInputIterator](<#/doc/named_req/InputIterator>), [LegacyOutputIterator](<#/doc/named_req/OutputIterator>), [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), e [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>). Iterators podem ser pensados como uma abstração de ponteiros.

Todas as categorias de iterators exigem apenas as funções que são realizáveis para uma dada categoria em tempo constante (amortizado). Portanto, as tabelas de requisitos e as definições de concept (desde C++20) para os iterators não especificam complexidade.

### Requisitos

O tipo `It` satisfaz LegacyIterator se

*   O tipo `It` satisfaz [CopyConstructible](<#/doc/named_req/CopyConstructible>), e
*   O tipo `It` satisfaz [CopyAssignable](<#/doc/named_req/CopyAssignable>), e
*   O tipo `It` satisfaz [Destructible](<#/doc/named_req/Destructible>), e
*   O tipo `It` satisfaz [Swappable](<#/doc/named_req/Swappable>), e
*   [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;It&gt; possui os typedefs de membro `value_type`(até C++20), `difference_type`, `reference`, `pointer`, e `iterator_category`, e
*   Dado r, um lvalue do tipo `It`, as seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expressão | Tipo de Retorno | Pré-condição
---|---|---
*r | não especificado | r é [desreferenciável](<#/doc/iterator>)
++r | It& | r é _incrementável_ (o comportamento da expressão ++r é definido)

### Concept

Para a definição de [std::iterator_traits](<#/doc/iterator/iterator_traits>), o seguinte concept apenas para exposição é definido. | template&lt;class I&gt;
concept __LegacyIterator =
requires(I i)
{
{ *i } -> __Referenceable;
{ ++i } -> [std::same_as](<#/doc/concepts/same_as>)<I&>;
{ *i++ } -> __Referenceable;
} && [std::copyable](<#/doc/concepts/copyable>)&lt;I&gt;;

onde o concept apenas para exposição __Referenceable&lt;T&gt; é satisfeito se e somente se T& é um tipo válido (em particular, `T` não deve ser void).

(desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2437](<https://cplusplus.github.io/LWG/issue2437>) | C++98 | *r é exigido ser `reference` | não exigido para output iterators
[LWG 3420](<https://cplusplus.github.io/LWG/issue3420>) | C++20 | o concept apenas para exposição verifica `copyable` primeiro | `copyable` é verificado apenas se a requires-expression resultar em true

### Veja também

[ input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>)(C++20) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)
[**Biblioteca de iterators**](<#/doc/iterator>) | fornece definições para iterators, iterator traits, adaptadores e funções de utilidade
*[_(como está)_]: A::pointer