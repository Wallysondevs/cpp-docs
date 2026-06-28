# std::experimental::ranges::Sentinel

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class S, class I >
concept bool Sentinel =
Semiregular<S> && Iterator<I> &&
WeaklyEqualityComparableWith<S, I>;
```

O concept `Sentinel` especifica a relação entre um tipo [`Iterator`](<#/doc/experimental/ranges/iterator/Iterator>) e um tipo [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) cujos valores denotam um range.

Sejam `s` e `i` valores dos tipos `S` e `I`, respectivamente, tais que `[`i`, `s`)` denota um range. `Sentinel<S, I>` é satisfeito somente se:

  * `i == s` é bem-definido.
  * Se `bool(i != s)`, então `i` é desreferenciável e `[`++i`, `s`)` denota um range.

O domínio de `==` pode mudar ao longo do tempo. Dado um iterator `i` e um sentinel `s` tal que `[`i`, `s`)` denota um range e `i != s`, `[`i`, `s`)` não é obrigado a continuar a denotar um range após incrementar qualquer iterator igual a `i` (e, portanto, `i == s` não é mais obrigado a ser bem-definido após tal incremento).