Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept equality_comparable = __WeaklyEqualityComparableWith<T, T>;
template< class T, class U >
concept equality_comparable_with =
std::equality_comparable<T> &&
std::equality_comparable<U> &&
__ComparisonCommonTypeWith<T, U> &&
std::equality_comparable<
std::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>> &&
__WeaklyEqualityComparableWith<T, U>;
Conceitos auxiliares
template< class T, class U >
concept __WeaklyEqualityComparableWith =
requires(const std::remove_reference_t<T>& t,
const std::remove_reference_t<U>& u) {
{ t == u } -> boolean-testable;
{ t != u } -> boolean-testable;
{ u == t } -> boolean-testable;
{ u != t } -> boolean-testable;
};
template< class T, class U >
concept __ComparisonCommonTypeWith =
std::common_reference_with<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>;
(apenas para exposição*)
template< class T, class U, class C = std::common_reference_t<const T&, const U&> >
concept _ComparisonCommonTypeWithImpl =
std::same_as<std::common_reference_t<const T&, const U&>,
std::common_reference_t<const U&, const T&>> &&
requires {
requires std::convertible_to<const T&, const C&>
std::convertible_to<T, const C&>;
requires std::convertible_to<const U&, const C&>
std::convertible_to<U, const C&>;
};
template< class T, class U >
concept __ComparisonCommonTypeWith =
_ComparisonCommonTypeWithImpl<std::remove_cvref_t<T>, std::remove_cvref_t<U>>;
(apenas para exposição*)
```

1) O concept `std::equality_comparable` especifica que os operadores de comparação `==` e `!=` em `T` refletem igualdade: `==` retorna true se e somente se os operandos são iguais.

2) O concept `std::equality_comparable_with` especifica que os operadores de comparação `==` e `!=` em operandos (possivelmente mistos) `T` e `U` produzem resultados consistentes com a igualdade. Comparar operandos mistos produz resultados equivalentes a comparar os operandos convertidos para seu tipo comum.

3) O concept apenas para exposição `___WeaklyEqualityComparableWith_` especifica que um objeto do tipo `T` e um objeto do tipo `U` podem ser comparados quanto à igualdade entre si (em qualquer ordem) usando tanto `==` quanto `!=`, e os resultados das comparações são consistentes.

4) O concept apenas para exposição `___ComparisonCommonTypeWith_` especifica que dois tipos compartilham um tipo comum, e um lvalue const ou um rvalue não-const (desde C++23) de qualquer um dos tipos é convertível para esse tipo comum.

### Requisitos semânticos

Esses concepts são modelados somente se forem satisfeitos e todos os concepts que eles subsumem forem modelados.

Nos parágrafos seguintes, dada uma expressão `E` e um tipo `C`, CONVERT_TO&lt;C&gt;(E) é definido como:

* static_cast&lt;C&gt;([std::as_const](<#/doc/utility/as_const>)(E)).

| (até C++23)

* static_cast&lt;const C&&gt;([std::as_const](<#/doc/utility/as_const>)(E)) se essa for uma expressão válida,
* static_cast&lt;const C&&gt;(std::move(E)) caso contrário.

| (desde C++23)

1) `std::equality_comparable<T>` é modelado somente se, dados objetos `a` e `b` do tipo `T`, `bool(a == b)` for true se e somente se `a` e `b` forem iguais. Juntamente com o requisito de que `a == b` é [equality-preserving](<#/doc/concepts>), isso implica que `==` é simétrico e transitivo, e ainda que `==` é reflexivo para todos os objetos `a` que são iguais a pelo menos um outro objeto.

2) `std::equality_comparable_with<T, U>` é modelado somente se, sejam

* `t` e `t2` lvalues denotando objetos distintos e iguais dos tipos const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt; respectivamente,
* `u` e `u2` lvalues denotando objetos distintos e iguais dos tipos const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; e [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt; respectivamente,
* `C` seja [std::common_reference_t](<#/doc/types/common_reference>)<const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;&, const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;&>,

a seguinte expressão é true:

* bool(t == u) == bool(CONVERT_TO&lt;C&gt;(t2) == CONVERT_TO&lt;C&gt;(u2)).

3) `__WeaklyEqualityComparableWith<T, U>` é modelado somente se, dados

* `t`, um lvalue do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e
* `u`, um lvalue do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;,

o seguinte é true:

* t == u, u == t, t != u, u != t têm o mesmo domínio;
* bool(u == t) == bool(t == u);
* bool(t != u) == !bool(t == u); e
* bool(u != t) == bool(t != u).

4) `__WeaklyEqualityComparableWith<T, U>` é modelado somente se: O concept [`common_reference_with`](<#/doc/concepts/common_reference_with>) correspondente for modelado. | (até C++23)
Sejam

* `C` [std::common_reference_t](<#/doc/types/common_reference>)&lt;const T&, const U&&gt;,
* `t1` e `t2` expressões [equality-preserving](<#/doc/concepts>) que são lvalues do tipo [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;,
* `u1` e `u2` expressões [equality-preserving](<#/doc/concepts>) que são lvalues do tipo [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt;,

as seguintes condições são válidas:

* CONVERT_TO&lt;C&gt;(t1) é igual a CONVERT_TO&lt;C&gt;(t2) se e somente se t1 for igual a t2; e
* CONVERT_TO&lt;C&gt;(u1) é igual a CONVERT_TO&lt;C&gt;(u2) se e somente se u1 for igual a u2.

| (desde C++23)

### Preservação da igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Variações de expressão implícitas

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão não-modificadora para algum operando lvalue constante também requer [implicit expression variations](<#/doc/concepts>).

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 18.5.4 Concept `equality_comparable` [concept.equalitycomparable]

* Padrão C++20 (ISO/IEC 14882:2020):

* 18.5.3 Concept `equality_comparable` [concept.equalitycomparable]
