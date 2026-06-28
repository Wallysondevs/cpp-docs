# std::strict_weak_order

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class R, class T, class U >
concept strict_weak_order = std::relation<R, T, U>;
```

O concept `strict_weak_order<R, T, U>` especifica que a [`relation`](<#/doc/concepts/relation>) `R` impõe uma ordenação fraca estrita (strict weak ordering) em seus argumentos.

### Requisitos semânticos

Uma relation r é uma ordenação fraca estrita se

  * é irreflexiva: para todo x, r(x, x) é falso;
  * é transitiva: para todos a, b e c, se r(a, b) e r(b, c) são ambos verdadeiros, então r(a, c) é verdadeiro;
  * seja e(a, b) igual a !r(a, b) && !r(b, a), então e é transitiva: e(a, b) && e(b, c) implica e(a, c).

Sob estas condições, pode ser demonstrado que e é uma relação de equivalência, e r induz uma ordenação total estrita (strict total ordering) nas classes de equivalência determinadas por e.

### Notas

A distinção entre [`relation`](<#/doc/concepts/relation>) e `strict_weak_order` é puramente semântica.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.7.7 Concept `strict_weak_order` [concept.strictweakorder]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.7.7 Concept `strict_weak_order` [concept.strictweakorder]

### Veja também

  * [LessThanComparable](<#/doc/named_req/LessThanComparable>)
