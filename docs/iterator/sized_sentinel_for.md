# std::sized_sentinel_for, std::disable_sized_sentinel_for

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class S, class I >
concept sized_sentinel_for =
std::sentinel_for<S, I> &&
!std::disable_sized_sentinel_for<std::remove_cv_t<S>,
std::remove_cv_t<I>> &&
requires(const I& i, const S& s) {
{ s - i } -> std::same_as<std::iter_difference_t<I>>;
{ i - s } -> std::same_as<std::iter_difference_t<I>>;
};
template< class S, class I >
inline constexpr bool disable_sized_sentinel_for = false;
```

1) O concept `sized_sentinel_for` especifica que um objeto do tipo de iterator `I` e um objeto do tipo de sentinel `S` podem ser subtraídos para calcular a distância entre eles em tempo constante.

2) O template de variável `disable_sized_sentinel_for` pode ser usado para impedir que iterators e sentinels que podem ser subtraídos, mas que na verdade não modelam `sized_sentinel_for`, satisfaçam o concept.

Um programa pode especializar `disable_sized_sentinel_for` para tipos de objeto não-array `S` e `I` não qualificados por cv, desde que pelo menos um deles seja um [tipo definido pelo programa](<#/doc/language/type-id>). Tais especializações são utilizáveis em [expressões constantes](<#/doc/language/constant_expression>) e têm o tipo const bool.

### Requisitos Semânticos

Seja i um iterator do tipo `I`, e s um sentinel do tipo `S` tal que `[`i`, `s`)` denota um range. Seja n o menor número de aplicações de ++i necessárias para que bool(i == s) seja verdadeiro. `I` e `S` modelam `sized_sentinel_for<S, I>` apenas se todas as seguintes condições forem satisfeitas:

*   Se n for representável por [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;, então s - i é bem-definido e igual a n.
*   Se -n for representável por [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;, então i - s é bem-definido e igual a -n.

### Preservação de Igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [preservadoras de igualdade](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Variações de Expressão Implícitas

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão não-modificadora para algum operando lvalue constante também requer [variações de expressão implícitas](<#/doc/concepts>).

### Ver também

[ ranges::sized_range](<#/doc/ranges/sized_range>)(C++20) | especifica que um range conhece seu tamanho em tempo constante
(concept)
[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(customization point object)