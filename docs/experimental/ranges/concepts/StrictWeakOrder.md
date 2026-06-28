# std::experimental::ranges::StrictWeakOrder

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class R, class T, class U >
concept bool StrictWeakOrder = Relation<R, T, U>;
```

O concept `StrictWeakOrder<R, T, U>` especifica que a [`Relation`](<#/doc/experimental/ranges/concepts/Relation>) `R` impõe uma ordem fraca estrita em seus argumentos. Uma relação `r` é uma ordem fraca estrita se

*   é irreflexiva: para todo `x`, `r(x, x)` é falso;
*   é transitiva: para todos `a`, `b` e `c`, se `r(a, b)` e `r(b, c)` são ambos verdadeiros, então `r(a, c)` é verdadeiro;
*   seja `e(a, b)` igual a `!r(a, b) && !r(b, a)`, então `e` é transitiva: `e(a, b) && e(b, c)` implica `e(a, c)`.

Sob estas condições, pode-se demonstrar que `e` é uma relação de equivalência, e `r` induz uma ordem total estrita nas classes de equivalência determinadas por `e`.

### Notas

A distinção entre [`Relation`](<#/doc/experimental/ranges/concepts/Relation>) e `StrictWeakOrder` é puramente semântica.