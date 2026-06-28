# std::experimental::simd_abi::scalar

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
using scalar = /*unspecified*/;
```

Com a tag ABI `scalar`, tipos de paralelismo de dados são equivalentes a um único tipo de elemento. No entanto, a interface completa de [`simd`](<#/doc/experimental/simd/simd>) e [`simd_mask`](<#/doc/experimental/simd/simd_mask>) é suportada e, portanto, facilita o desenvolvimento de código genérico.

### Notas

`scalar` _não_ é um alias para fixed_size<1>.

### Veja também

[ fixed_size](<#/doc/experimental/simd/fixed_size>)(parallelism TS v2) | tipo de tag para armazenar um número especificado de elementos
(modelo de alias)
[ compatible](<#/doc/experimental/simd/compatible>)(parallelism TS v2) | tipo de tag que garante compatibilidade ABI
(modelo de alias)
[ native](<#/doc/experimental/simd/native>)(parallelism TS v2) | tipo de tag que é mais eficiente
(modelo de alias)
[ deduce_t](<#/doc/experimental/simd/deduce>)(parallelism TS v2) | obtém um tipo ABI para um dado tipo de elemento e número de elementos
(modelo de classe)