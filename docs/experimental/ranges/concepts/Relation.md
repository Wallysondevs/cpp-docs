# std::experimental::ranges::Relation

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class R, class T, class U >
concept bool Relation =
Predicate<R, T, T> &&
Predicate<R, U, U> &&
CommonReference<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&> &&
Predicate<R,
ranges::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>,
ranges::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>> &&
Predicate<R, T, U> &&
Predicate<R, U, T>;
```

O concept `Relation<R, T, U>` especifica que `R` define uma relação binária sobre o conjunto de expressões cujo tipo e categoria de valor são aqueles codificados por `T` ou `U`.

Dado

* `r`, uma expressão tal que decltype((r)) é `R`,
* `t`, uma expressão tal que decltype((t)) é `T`,
* `u`, uma expressão tal que decltype((u)) é `U`,

e seja `C` [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;&, const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;&>,

então `Relation<R, T, U>` é satisfeito apenas se

* bool(r(t, u)) == bool(r(C(t), C(u))) e
* bool(r(u, t)) == bool(r(C(u), C(t))).
