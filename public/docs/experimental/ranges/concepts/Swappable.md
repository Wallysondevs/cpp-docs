# std::experimental::ranges::Swappable, std::experimental::ranges::SwappableWith

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Swappable =
requires(T& a, T& b) {
ranges::swap(a, b);
};
template< class T, class U >
concept bool SwappableWith =
CommonReference<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&> &&
requires(T&& t, U&& u) {
ranges::swap(std::forward<T>(t), std::forward<T>(t));
ranges::swap(std::forward<U>(u), std::forward<U>(u));
ranges::swap(std::forward<T>(t), std::forward<U>(u));
ranges::swap(std::forward<U>(u), std::forward<T>(t));
};
```

O concept `Swappable<T>` especifica que lvalues do tipo `T` são swappable.

O concept `SwappableWith<T, U>` especifica que expressões do tipo e categoria de valor codificados por `T` e `U` são swappable entre si. `SwappableWith<T, U>` é satisfeito apenas se uma chamada para [ranges::swap](<#/doc/experimental/ranges/utility/swap>)(t, u) troca o valor de `t` e `u`, ou seja, dados objetos distintos `t2` igual a `t` e `u2` igual a `u`, após avaliar [ranges::swap](<#/doc/experimental/ranges/utility/swap>)(t, u) ou [ranges::swap](<#/doc/experimental/ranges/utility/swap>)(u, t), `t2` é igual a `u` e `u2` é igual a `t`.

### Preservação de Igualdade

Uma expressão é _preservadora de igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

* As entradas para uma expressão consistem em seus operandos.
* As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige ser preservadora de igualdade é adicionalmente exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e interveniente desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ é exigida ser preservadora de igualdade e estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.