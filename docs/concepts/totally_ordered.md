# std::totally_ordered, std::totally_ordered_with

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept totally_ordered =
std::equality_comparable<T> && __PartiallyOrderedWith<T, T>;
template< class T, class U >
concept totally_ordered_with =
std::totally_ordered<T> &&
std::totally_ordered<U> &&
std::equality_comparable_with<T, U> &&
std::totally_ordered<
std::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>> &&
__PartiallyOrderedWith<T, U>;
### Conceitos auxiliares
template< class T, class U >
concept __PartiallyOrderedWith =
requires(const std::remove_reference_t<T>& t,
const std::remove_reference_t<U>& u) {
{ t < u } -> boolean-testable;
{ t > u } -> boolean-testable;
{ t <= u } -> boolean-testable;
{ t >= u } -> boolean-testable;
{ u < t } -> boolean-testable;
{ u > t } -> boolean-testable;
{ u <= t } -> boolean-testable;
{ u >= t } -> boolean-testable;
};
```

1) O conceito `std::totally_ordered` especifica que os operadores de comparação `==,!=,<,>,<=,>=` em um tipo produzem resultados consistentes com uma [ordem total estrita](<https://en.wikipedia.org/wiki/Total_order#Strict_and_non-strict_total_orders> "enwiki:Total order") no tipo.

2) O conceito `std::totally_ordered_with` especifica que os operadores de comparação `==,!=,<,>,<=,>=` em operandos `T` e `U` (possivelmente mistos) produzem resultados consistentes com uma ordem total estrita. A comparação de operandos mistos produz resultados equivalentes à comparação dos operandos convertidos para seu tipo comum.

3) O conceito `___PartiallyOrderedWith_`, apenas para exposição, especifica que um valor do tipo `T` e um valor do tipo `U` podem ser comparados em uma ordem parcial entre si (em qualquer ordem) usando `<`, `>`, `<=`, e `>=`, e os resultados das comparações são consistentes.

### Requisitos semânticos

Esses concepts são modelados apenas se forem satisfeitos e todos os concepts que eles subsumem forem modelados.

1) std::totally_ordered&lt;T&gt; é modelado apenas se, dados os lvalues `a`, `b` e `c` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;:

  * Exatamente um de bool(a < b), bool(a > b) e bool(a == b) é verdadeiro;
  * Se bool(a < b) e bool(b < c) forem ambos verdadeiros, então bool(a < c) é verdadeiro;
  * bool(a > b) == bool(b < a)
  * bool(a >= b) == !bool(a < b)
  * bool(a <= b) == !bool(b < a)

2) std::totally_ordered_with<T, U> é modelado apenas se, dados

  * `t` e `t2`, lvalues denotando objetos distintos e iguais dos tipos const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; respectivamente, e
  * `u` e `u2`, lvalues denotando objetos distintos e iguais dos tipos const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; e [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; respectivamente,

seja `C` [std::common_reference_t](<#/doc/types/common_reference>)<const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;&, const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;&>, e, dada uma expressão `E` e um tipo `C`, seja CONVERT_TO&lt;C&gt;(E):

  * static_cast&lt;C&gt;([std::as_const](<#/doc/utility/as_const>)(E)).

| (ate C++23)
  * static_cast&lt;const C&&gt;([std::as_const](<#/doc/utility/as_const>)(E)) se essa for uma expressão válida,
  * static_cast&lt;const C&&gt;(std::move(E)) caso contrário.

| (desde C++23)

o seguinte é verdadeiro:

  * bool(t < u) == bool(CONVERT_TO&lt;C&gt;(t2) < CONVERT_TO&lt;C&gt;(u2))
  * bool(t > u) == bool(CONVERT_TO&lt;C&gt;(t2) > CONVERT_TO&lt;C&gt;(u2))
  * bool(t <= u) == bool(CONVERT_TO&lt;C&gt;(t2) <= CONVERT_TO&lt;C&gt;(u2))
  * bool(t >= u) == bool(CONVERT_TO&lt;C&gt;(t2) >= CONVERT_TO&lt;C&gt;(u2))
  * bool(u < t) == bool(CONVERT_TO&lt;C&gt;(u2) < CONVERT_TO&lt;C&gt;(t2))
  * bool(u > t) == bool(CONVERT_TO&lt;C&gt;(u2) > CONVERT_TO&lt;C&gt;(t2))
  * bool(u <= t) == bool(CONVERT_TO&lt;C&gt;(u2) <= CONVERT_TO&lt;C&gt;(t2))
  * bool(u >= t) == bool(CONVERT_TO&lt;C&gt;(u2) >= CONVERT_TO&lt;C&gt;(t2))

3) `__PartiallyOrderedWith<T, U>` é modelado apenas se, dados

  * qualquer lvalue `t` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;, e
  * qualquer lvalue `u` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;,

o seguinte é verdadeiro:

  * t < u, t <= u, t > u, t >= u, u < t, u <= t, u > t, e u >= t têm o mesmo domínio;
  * bool(t < u) == bool(u > t);
  * bool(u < t) == bool(t > u);
  * bool(t <= u) == bool(u >= t); e
  * bool(u <= t) == bool(t >= u).

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Variações de expressão implícitas

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão não modificadora para algum operando lvalue constante também requer [variações de expressão implícitas](<#/doc/concepts>).

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 18.5.5 Concept `totally_ordered` [concept.totallyordered]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 18.5.4 Concept `totally_ordered` [concept.totallyordered]

### Veja também

[ three_way_comparablethree_way_comparable_with](<#/doc/utility/compare/three_way_comparable>)(C++20) | especifica que o operador <=> produz resultado consistente em tipos dados
(concept)