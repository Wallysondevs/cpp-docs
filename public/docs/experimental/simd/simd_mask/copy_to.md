# std::experimental::simd_mask&lt;T,Abi&gt;::copy_to

template&lt;class Flags&gt;  
void copy_to( bool* mem, Flags flags ); |  |  (parallelism TS v2)  

  
A função de armazenamento copia todos os elementos de uma [`simd_mask`](<#/doc/experimental/simd/simd_mask>) de modo que o i-ésimo elemento é escrito em `mem[i]` para todo i no range de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd_mask/size>)`)`. 

### Parâmetros

mem  |  \-  |  um ponteiro para um array onde [`mem`, `mem + size()`) é um range válido   
---|---|---
flags  |  \-  |  se for do tipo [`vector_aligned_tag`](<#/doc/experimental/simd/vector_aligned>), o construtor de carregamento pode assumir que `mem` aponta para um armazenamento alinhado por [`memory_alignment_v<simd_mask>`](<#/doc/experimental/simd/memory_alignment>)  
Type requirements   
-`is_simd_flag_type_v<Flags>` deve ser verdadeiro.   
  
### Veja também

[ element_aligned_tagelement_aligned](<#/doc/experimental/simd/element_aligned>)(parallelism TS v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do elemento   
(classe)  
[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(parallelism TS v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do vetor   
(classe)  
[ overaligned_tagoveraligned](<#/doc/experimental/simd/overaligned>)(parallelism TS v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento especificado   
(modelo de classe)  
[ memory_alignment](<#/doc/experimental/simd/memory_alignment>)(parallelism TS v2) |  obtém um alinhamento apropriado para [`vector_aligned`](<#/doc/experimental/simd/vector_aligned>)   
(modelo de classe)  
[ copy_from](<#/doc/experimental/simd/simd_mask/copy_from>)(parallelism TS v2) |  carrega elementos de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) de memória contígua   
(função membro pública)