# std::experimental::simd&lt;T,Abi&gt;::copy_to

template< class U, class Flags >  
void copy_to( U* mem, Flags flags ); |  |  (parallelism TS v2)  

  
A função de armazenamento (store) copia todos os elementos de um [`simd`](<#/doc/experimental/simd/simd>) de modo que o i-ésimo elemento é convertido para `U` e subsequentemente escrito em mem[i] para todo i no intervalo `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`. 

### Parâmetros

mem  |  \-  |  um ponteiro para um array onde `[`mem`, `mem + size()`)` é um range válido   
---|---|---
flags  |  \-  |  se do tipo [`vector_aligned_tag`](<#/doc/experimental/simd/vector_aligned>), o construtor de carregamento (load) pode assumir que `mem` aponta para um armazenamento alinhado por [`memory_alignment_v<simd, U>`](<#/doc/experimental/simd/memory_alignment>)  
Requisitos de Tipo   
-`U` deve ser um tipo _vetorizável_.   
-`is_simd_flag_type_v<Flags>` deve ser verdadeiro.   
  
### Exemplo

Execute este código
```
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
     
    int main()
    {
        alignas(stdx::memory_alignment_v<stdx::native_simd<int>>)
            std::array<int, stdx::native_simd<int>::size()> mem = {};
     
        stdx::native_simd<int> a = 7;
        a.copy_to(&mem[0], stdx::vector_aligned);
     
        for (int e : mem)
            std::cout << e << ' ';
        std::cout << '\n';
    }
```

Saída possível: 
```
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
```

### Veja também

[ element_aligned_tagelement_aligned](<#/doc/experimental/simd/element_aligned>)(parallelism TS v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento (load/store) ao alinhamento do elemento   
(classe)  
[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(parallelism TS v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento (load/store) ao alinhamento do vetor   
(classe)  
[ overaligned_tagoveraligned](<#/doc/experimental/simd/overaligned>)(parallelism TS v2) |  flag indicando o alinhamento do endereço de carregamento/armazenamento (load/store) ao alinhamento especificado   
(modelo de classe)  
[ memory_alignment](<#/doc/experimental/simd/memory_alignment>)(parallelism TS v2) |  obtém um alinhamento apropriado para [`vector_aligned`](<#/doc/experimental/simd/vector_aligned>)   
(modelo de classe)  
[ copy_from](<#/doc/experimental/simd/simd/copy_from>)(parallelism TS v2) |  carrega elementos [`simd`](<#/doc/experimental/simd/simd>) de memória contígua   
(função membro pública)