# std::contiguous_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept contiguous_iterator =
std::random_access_iterator<I> &&
std::derived_from</*ITER_CONCEPT*/<I>, std::contiguous_iterator_tag> &&
std::is_lvalue_reference_v<std::iter_reference_t<I>> &&
std::same_as<
std::iter_value_t<I>, std::remove_cvref_t<std::iter_reference_t<I>>
> &&
requires(const I& i) {
{ std::to_address(i) } ->
std::same_as<std::add_pointer_t<std::iter_reference_t<I>>>;
};
```

O concept `contiguous_iterator` refina [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) fornecendo uma garantia de que os elementos denotados são armazenados contiguamente na memória.

### Determinação do concept de iterator

A definição deste concept é especificada através de um alias template apenas para exposição /*ITER_CONCEPT*/.

Para determinar /*ITER_CONCEPT*/&lt;I&gt;, seja ITER_TRAITS&lt;I&gt; denotando I se a especialização [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerada a partir do template primário, ou [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; caso contrário:

*   Se ITER_TRAITS&lt;I&gt;::iterator_concept for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
*   Caso contrário, se ITER_TRAITS&lt;I&gt;::iterator_category for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
*   Caso contrário, se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerado a partir do template primário, /*ITER_CONCEPT*/&lt;I&gt; denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>).
*   Caso contrário, /*ITER_CONCEPT*/&lt;I&gt; não denota um tipo e resulta em uma falha de substituição.

### Requisitos semânticos

Sejam `a` e `b` iteradores desreferenciáveis e `c` um iterador não desreferenciável do tipo `I` tal que `b` é alcançável a partir de `a` e `c` é alcançável a partir de `b`. O tipo `I` modela `contiguous_iterator` somente se todos os concepts que ele subsume forem modelados e:

*   [std::to_address](<#/doc/memory/to_address>)(a) == [std::addressof](<#/doc/memory/addressof>)(*a),
*   [std::to_address](<#/doc/memory/to_address>)(b) == [std::to_address](<#/doc/memory/to_address>)(a) + [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;(b - a), e
*   [std::to_address](<#/doc/memory/to_address>)(c) == [std::to_address](<#/doc/memory/to_address>)(a) + [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;(c - a).

### Preservação de igualdade

As expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [preservadoras de igualdade](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Variações implícitas de expressão

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão não modificadora para algum operando lvalue constante também exige [variações implícitas de expressão](<#/doc/concepts>).

### Observações

`contiguous_iterator` é modelado por todo tipo ponteiro para tipo de objeto completo.

Tipos de iterator na standard library que são exigidos para satisfazer os requisitos de [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) em C++17 também são exigidos para modelar `contiguous_iterator` em C++20.

### Veja também

[ random_access_iterator](<#/doc/iterator/random_access_iterator>)(C++20) | especifica que um [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) é um iterator de acesso aleatório, suportando avanço em tempo constante e indexação
(concept)