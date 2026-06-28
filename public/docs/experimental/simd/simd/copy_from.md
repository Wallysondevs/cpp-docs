# std::experimental::simd&lt;T,Abi&gt;::copy_from

template< class U, class Flags >  
void copy_from( const U* mem, Flags flags ); |  |  (parallelism TS v2)  

  
A função de carregamento substitui todos os elementos de um [`simd`](<#/doc/experimental/simd/simd>) de modo que o i-ésimo elemento seja atribuído com static_cast&lt;T&gt;(mem[i]) para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`. 

### Parâmetros

mem  |  \-  |  um ponteiro para um array onde `[`mem`, `mem + size())` é um intervalo válido   
---|---|---
flags  |  \-  |  se do tipo [`vector_aligned_tag`](<#/doc/experimental/simd/vector_aligned>), o construtor de carregamento pode assumir que `mem` aponta para um armazenamento alinhado por [`memory_alignment_v<simd, U>`](<#/doc/experimental/simd/memory_alignment>)  
Requisitos de tipo   
-`U` deve ser um tipo _vetorizável_.   
-`is_simd_flag_type_v&lt;Flags&gt;` deve ser verdadeiro.   
  
### Exemplo

Execute este código
```
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    #include <numeric>
    namespace stdx = std::experimental;
     
    void print(auto const& a)
    {
        for (std::size_t i{}; i != std::size(a); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        alignas(stdx::memory_alignment_v<stdx::native_simd<int>>)
            std::array<int, stdx::native_simd<int>::size() * 2> mem = {};
        std::iota(mem.begin(), mem.end(), 0);
        print(mem);
     
        stdx::native_simd<int> a; // uninitialized
     
        a.copy_from(&mem[0], stdx::vector_aligned);
        print(a);
     
        a.copy_from(&mem[1], stdx::element_aligned); // vector_aligned would likely crash
        print(a);
    }
```

Saída possível: 
```
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    0 1 2 3 4 5 6 7
    1 2 3 4 5 6 7 8
```

### Veja também

[ memory_alignment](<#/doc/experimental/simd/memory_alignment>)(parallelism TS v2) |  obtém um alinhamento apropriado para [`vector_aligned`](<#/doc/experimental/simd/vector_aligned>)   
(modelo de classe)  
[ copy_to](<#/doc/experimental/simd/simd/copy_to>)(parallelism TS v2) |  armazena elementos `simd` em memória contígua   
(função membro pública)  
[ (constructor)](<#/doc/experimental/simd/simd/simd>)(parallelism TS v2) |  constrói um objeto [`simd`](<#/doc/experimental/simd/simd>)   
(função membro pública)