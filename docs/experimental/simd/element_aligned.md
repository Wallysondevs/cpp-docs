# std::experimental::element_aligned_tag, std::experimental::element_aligned

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
struct element_aligned_tag {};
inline constexpr element_aligned_tag element_aligned{};
```

Este tipo de tag indica que o buffer de copy_from e copy_to está alinhado ao seu alinhamento de elemento.

### Veja também

[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do vetor
(class)
[ overaligned_tagoveraligned](<#/doc/experimental/simd/overaligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento especificado
(class template)