# std::experimental::ranges::UniformRandomNumberGenerator

Definido no cabeçalho `[<experimental/ranges/random>](<#/doc/header/experimental/ranges/random>)`

```c
template< class G >
concept bool UniformRandomNumberGenerator =
Invocable<G&> &&
UnsignedIntegral<std::result_of_t<G&()>> &&
requires {
{ G::min() } -> Same<std::result_of_t<G&()>>&&;
{ G::max() } -> Same<std::result_of_t<G&()>>&&;
};
```

O concept `UniformRandomNumberGenerator<G>` especifica que `G` é o tipo de um gerador de números aleatórios uniformes, isto é, objetos do tipo `G` são function objects que retornam valores inteiros sem sinal de tal forma que cada valor no range de resultados possíveis tem (idealmente) igual probabilidade de ser retornado.

`UniformRandomNumberGenerator<G>` é satisfeito apenas se, dado qualquer objeto `g` do tipo `G`:

*   `G::min()` e `G::max()` são expressões constantes prvalue;
*   `G::min() < G::max()`
*   `g()` está no range `[G::min(), G::max()]`
*   `g()` tem complexidade constante amortizada.
