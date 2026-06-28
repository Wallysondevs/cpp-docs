# std::experimental::simd_mask&lt;T,Abi&gt;::copy_from

template&lt;class Flags&gt;  
void copy_from( const bool* mem, Flags flags ); |  |  (TS de paralelismo v2)  

  
A função de carregamento substitui todos os elementos de um(a) [`simd_mask`](<#/doc/experimental/simd/simd_mask>) de modo que o i-ésimo elemento é atribuído com `mem[i]` para todo i no intervalo `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd_mask/size>)`)`. 

### Parâmetros

mem  |  \-  |  um ponteiro para um array onde [`mem`, `mem + size()`) é um range válido   
---|---|---
flags  |  \-  |  se do tipo [`vector_aligned_tag`](<#/doc/experimental/simd/vector_aligned>), o construtor de carregamento pode assumir que `mem` aponta para um armazenamento alinhado por [`memory_alignment_v<simd_mask>`](<#/doc/experimental/simd/memory_alignment>)  
Type requirements   
-`is_simd_flag_type_v<Flags>` must be true.   
  
### Veja também

[ element_aligned_tagelement_aligned](<#/doc/experimental/simd/element_aligned>)(TS de paralelismo v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do elemento   
(classe)  
[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(TS de paralelismo v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do vetor   
(classe)  
[ overaligned_tagoveraligned](<#/doc/experimental/simd/overaligned>)(TS de paralelismo v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento especificado   
(modelo de classe)  
[ memory_alignment](<#/doc/experimental/simd/memory_alignment>)(TS de paralelismo v2) |  obtém um alinhamento apropriado para [`vector_aligned`](<#/doc/experimental/simd/vector_aligned>)   
(modelo de classe)  
[ (constructor)](<#/doc/experimental/simd/simd_mask/simd_mask>)(TS de paralelismo v2) |  constrói um objeto [`simd_mask`](<#/doc/experimental/simd/simd_mask>)   
(função membro pública)  
[ copy_to](<#/doc/experimental/simd/simd_mask/copy_to>)(TS de paralelismo v2) |  armazena elementos de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) em memória contígua   
(função membro pública)  
[ copy_from](<#/doc/experimental/simd/simd/copy_from>)(TS de paralelismo v2) |  carrega elementos de [`simd`](<#/doc/experimental/simd/simd>) de memória contígua   
(função membro pública de `std::experimental::simd<T,Abi>`)