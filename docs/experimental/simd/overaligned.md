# std::experimental::overaligned_tag, std::experimental::overaligned

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< std::size_t N >
struct overaligned_tag {};
```

template< [std::size_t](<#/doc/types/size_t>) N >
inline constexpr overaligned_tag&lt;N&gt; overaligned{}; | | (parallelism TS v2)

Este tipo de tag indica que o buffer de `copy_from` e `copy_to` está alinhado a `N`.

### Parâmetros de template

- **N** — o alinhamento em bytes que o acesso à memória pode assumir

### Veja também

[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(parallelism TS v2) | flag que indica o alinhamento do endereço de carga/armazenamento ao alinhamento do vetor
(class)
[ element_aligned_tagelement_aligned](<#/doc/experimental/simd/element_aligned>)(parallelism TS v2) | flag que indica o alinhamento do endereço de carga/armazenamento ao alinhamento do elemento
(class)