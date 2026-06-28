# std::swappable, std::swappable_with

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept swappable =
requires(T& a, T& b) {
ranges::swap(a, b);
};
template< class T, class U >
concept swappable_with =
std::common_reference_with<T, U> &&
requires(T&& t, U&& u) {
ranges::swap(std::forward<T>(t), std::forward<T>(t));
ranges::swap(std::forward<U>(u), std::forward<U>(u));
ranges::swap(std::forward<T>(t), std::forward<U>(u));
ranges::swap(std::forward<U>(u), std::forward<T>(t));
};
```

O concept `swappable<T>` especifica que lvalues do tipo `T` são swappable.

O concept `swappable_with<T, U>` especifica que expressões do tipo e categoria de valor codificados por `T` e `U` são swappable entre si. `swappable_with<T, U>` é satisfeito apenas se uma chamada para `[ranges::swap](<#/doc/utility/ranges/swap>)(t, u)` troca o valor de `t` e `u`, ou seja, dados objetos distintos `t2` igual a `t` e `u2` igual a `u`, após avaliar `[ranges::swap](<#/doc/utility/ranges/swap>)(t, u)` ou `[ranges::swap](<#/doc/utility/ranges/swap>)(u, t)`, `t2` é igual a `u` e `u2` é igual a `t`.

### Preservação de Igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 18.4.9 Concept `swappable` [concept.swappable]

* Padrão C++20 (ISO/IEC 14882:2020):

* 18.4.9 Concept `swappable` [concept.swappable]
