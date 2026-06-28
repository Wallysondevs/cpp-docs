# std::equivalence_relation

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class R, class T, class U >
concept equivalence_relation = std::relation<R, T, U>;
```

O concept `equivalence_relation<R, T, U>` especifica que a [`relation`](<#/doc/concepts/relation>) `R` impõe uma [relação de equivalência](<https://en.wikipedia.org/wiki/equivalence_relation> "enwiki:equivalence relation") em seus argumentos.

### Requisitos semânticos

Uma relation `r` é uma relação de equivalência se

*   é reflexiva: para todo `x`, `r(x, x)` é verdadeiro;
*   é simétrica: para todo `a` e `b`, `r(a, b)` é verdadeiro se e somente se `r(b, a)` é verdadeiro;
*   é transitiva: `r(a, b) && r(b, c)` implica `r(a, c)`.

### Observações

A distinção entre [`relation`](<#/doc/concepts/relation>) e `equivalence_relation` é puramente semântica.

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   18.7.6 Concept `equivalence_relation` [concept.equiv]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   18.7.6 Concept `equivalence_relation` [concept.equiv]
