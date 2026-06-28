# std::experimental::vector_aligned_tag, std::experimental::vector_aligned

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
struct vector_aligned_tag {};
inline constexpr vector_aligned_tag vector_aligned{};
```

Este tipo de tag indica que o buffer de copy_from e copy_to está alinhado a memory_alignment_v<T, U>, onde a operação de cópia opera no tipo simd/simd_mask T, e o buffer com tipo de elemento U.

### Observações

Este tipo de tag permite implementar carregamento e armazenamento alinhados a vetor.

### Veja também

[ element_aligned_tagelement_aligned](<#/doc/experimental/simd/element_aligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do elemento
(classe)
[ overaligned_tagoveraligned](<#/doc/experimental/simd/overaligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento especificado
(modelo de classe)
[ memory_alignment](<#/doc/experimental/simd/memory_alignment>)(parallelism TS v2) | obtém um alinhamento apropriado para `vector_aligned`
(modelo de classe)