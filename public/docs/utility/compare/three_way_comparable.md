# std::three_way_comparable, std::three_way_comparable_with

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
template< class T, class Cat = std::partial_ordering >
concept three_way_comparable =
__WeaklyEqualityComparableWith<T, T> &&
__PartiallyOrderedWith<T, T> &&
requires(const std::remove_reference_t<T>& a,
const std::remove_reference_t<T>& b) {
{ a <=> b } -> __ComparesAs<Cat>;
};
template< class T, class U, class Cat = std::partial_ordering >
concept three_way_comparable_with =
std::three_way_comparable<T, Cat> &&
std::three_way_comparable<U, Cat> &&
__ComparisonCommonTypeWith<T, U> &&
std::three_way_comparable<
std::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>, Cat> &&
__WeaklyEqualityComparableWith<T, U> &&
__PartiallyOrderedWith<T, U> &&
requires(const std::remove_reference_t<T>& t,
const std::remove_reference_t<U>& u) {
{ t <=> u } -> __ComparesAs<Cat>;
{ u <=> t } -> __ComparesAs<Cat>;
};
template< class T, class Cat >
concept __ComparesAs =
std::same_as<std::common_comparison_category_t<T, Cat>, Cat>;
```

1) O concept `std::three_way_comparable` especifica que o operador de comparação de três vias `<=>` em `T` produz resultados consistentes com a categoria de comparação implicada por `Cat`.

2) O concept `std::three_way_comparable_with` especifica que o operador de comparação de três vias `<=>` em operandos (possivelmente mistos) `T` e `U` produz resultados consistentes com a categoria de comparação implicada por `Cat`. Comparar operandos mistos produz resultados equivalentes a comparar os operandos convertidos para seu tipo comum.

[`___WeaklyEqualityComparableWith_`](<#/doc/concepts/equality_comparable>), [`___PartiallyOrderedWith_`](<#/doc/concepts/totally_ordered>), e [`___ComparisonCommonTypeWith_`](<#/doc/concepts/equality_comparable>) são concepts apenas para exposição. Veja as descrições de [`equality_comparable`](<#/doc/concepts/equality_comparable>) e [`totally_ordered`](<#/doc/concepts/totally_ordered>).

### Requisitos Semânticos

Esses concepts são modelados apenas se forem satisfeitos e todos os concepts que eles subsumem forem modelados.

1) `T` e `Cat` modelam std::three_way_comparable<T, Cat> apenas se, dados lvalues `a` e `b` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;, o seguinte for verdadeiro:

  * (a <=> b == 0) == bool(a == b),
  * (a <=> b != 0) == bool(a != b),
  * ((a <=> b) <=> 0) e (0 <=> (b <=> a)) são iguais,
  * bool(a > b) == bool(b < a),
  * bool(a >= b) == !bool(a < b),
  * bool(a <= b) == !bool(b < a),
  * (a <=> b < 0) == bool(a < b),
  * (a <=> b > 0) == bool(a > b),
  * (a <=> b <= 0) == bool(a <= b), e
  * (a <=> b >= 0) == bool(a >= b), e
  * se `Cat` for conversível para std::strong_ordering, `T` modela [`totally_ordered`](<#/doc/concepts/totally_ordered>).

2) `T`, `U`, e `Cat` modelam std::three_way_comparable_with<T, U, Cat> apenas se, dados

  * `t` e `t2`, lvalues denotando objetos distintos e iguais dos tipos const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; respectivamente, e
  * `u` e `u2`, lvalues denotando objetos distintos e iguais dos tipos const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; e [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; respectivamente.

Seja `C` [std::common_reference_t](<#/doc/types/common_reference>)<const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;&, const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;&> e dada uma expressão `E` e um tipo `C`, seja CONVERT_TO&lt;C&gt;(E):

  * static_cast&lt;C&gt;([std::as_const](<#/doc/utility/as_const>)(E)).

| (até C++23)
  * static_cast&lt;const C&&gt;([std::as_const](<#/doc/utility/as_const>)(E)) se for uma expressão válida,
  * static_cast&lt;const C&&gt;(std::move(E)) caso contrário.

| (desde C++23)

o seguinte é verdadeiro:

  * t <=> u e u <=> t têm o mesmo domínio,
  * ((t <=> u) <=> 0) e (0 <=> (u <=> t)) são iguais,
  * (t <=> u == 0) == bool(t == u),
  * (t <=> u != 0) == bool(t != u),
  * Cat(t <=> u) == Cat(CONVERT_TO&lt;C&gt;(t2) <=> CONVERT_TO&lt;C&gt;(u2)),
  * (t <=> u < 0) == bool(t < u),
  * (t <=> u > 0) == bool(t > u),
  * (t <=> u <= 0) == bool(t <= u),
  * (t <=> u >= 0) == bool(t >= u), e
  * se `Cat` for conversível para std::strong_ordering, `T` e `U` modelam [std::totally_ordered_with](<#/doc/concepts/totally_ordered>)<T, U>.

### Preservação de Igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da biblioteca padrão são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Variações de Expressão Implícitas

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão que não é modificadora para algum operando lvalue constante também requer [implicit expression variations](<#/doc/concepts>).

### Ver também

[ equality_comparableequality_comparable_with](<#/doc/concepts/equality_comparable>)(C++20) | especifica que o operador == é uma relação de equivalência
(concept)
[ totally_orderedtotally_ordered_with](<#/doc/concepts/totally_ordered>)(C++20) | especifica que os operadores de comparação no tipo produzem uma ordem total
(concept)