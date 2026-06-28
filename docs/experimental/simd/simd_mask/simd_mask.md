# std::experimental::simd_mask&lt;T,Abi&gt;::simd_mask

simd_mask() noexcept = default; | (1) | (parallelism TS v2)
---|---|---
explicit simd_mask( bool value ) noexcept; | (2) | (parallelism TS v2)
template< class U >
simd_mask( const simd_mask<U, simd_abi::fixed_size<size()>>& other ) noexcept; | (3) | (parallelism TS v2)
template< class U, class Flags >
simd_mask( const bool* mem, Flags flags ); | (4) | (parallelism TS v2)
---|---|---
simd_mask( const simd_mask& other ) noexcept = default; | (5) | (parallelism TS v2)
(implicitly declared)
simd_mask( simd_mask&& other ) noexcept = default; | (6) | (parallelism TS v2)
(implicitly declared)

1) Constrói um `simd_mask` usando [inicialização padrão](<#/doc/language/default_initialization>) (construído sem inicializador) ou [inicialização por valor](<#/doc/language/value_initialization>) (construído com um inicializador vazio).

2) O construtor de broadcast constrói um `simd_mask` com todos os valores inicializados para `value`.

3) Constrói um `simd_mask` onde o i-ésimo elemento é inicializado para `other[i]` para todo `i` no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd_mask/size>)`)`. Esta sobrecarga participa da resolução de sobrecarga somente se `Abi` for `simd_abi::fixed_size<size()`.

4) O construtor de carregamento (load constructor) constrói um `simd_mask` onde o i-ésimo elemento é inicializado para `mem[i]` para todo `i` no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd_mask/size>)`)`.

5,6) Construtores de cópia e de movimento declarados implicitamente. Constrói um `simd_mask` onde cada elemento é inicializado a partir dos valores dos elementos em `other`.

### Parâmetros

- **value** — o valor usado para a inicialização de todos os elementos do `simd_mask`
- **other** — outro `simd_mask` para copiar
- **mem** — um ponteiro para um array onde `[`mem`, `mem + size()`)` é um intervalo válido
- **flags** — se do tipo [`vector_aligned_tag`](<#/doc/experimental/simd/vector_aligned>), o construtor de carregamento (load constructor) pode assumir que `mem` aponta para um armazenamento alinhado por [`memory_alignment_v<simd_mask>`](<#/doc/experimental/simd/memory_alignment>)
Requisitos de Tipo
-`is_simd_flag_type_v<Flags>` deve ser verdadeiro.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
    
    int main()
    {
        [[maybe_unused]]
        stdx::native_simd_mask<int> a;       // uninitialized
        stdx::native_simd_mask<int> b(true); // all elements initialized with true
        stdx::native_simd_mask<int> c{};     // all elements initialized with false
    
        alignas(stdx::memory_alignment_v<stdx::native_simd_mask<int>>)
            std::array<bool, stdx::native_simd_mask<int>::size() * 2> mem = {};
        std::ranges::generate(mem, [i{0}] mutable -> bool { return i++ & 1; });
    
        stdx::native_simd_mask<int> d(&mem[0], stdx::vector_aligned);  // {0, 1, 0, 1, ...}
        stdx::native_simd_mask<int> e(&mem[1], stdx::element_aligned); // {1, 0, 1, 0, ...}
    
        const auto xored = b ^ c ^ d ^ e;
    
        for (std::size_t i{}; i != xored.size(); ++i)
            std::cout << xored[i] << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    0 0 0 0 0 0 0 0
```

### Veja também

[ element_aligned_tagelement_aligned](<#/doc/experimental/simd/element_aligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do elemento
(class)
[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do vetor
(class)
[ overaligned_tagoveraligned](<#/doc/experimental/simd/overaligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento especificado
(class template)
[ memory_alignment](<#/doc/experimental/simd/memory_alignment>)(parallelism TS v2) | obtém um alinhamento apropriado para [`vector_aligned`](<#/doc/experimental/simd/vector_aligned>)
(class template)
[ copy_from](<#/doc/experimental/simd/simd_mask/copy_from>)(parallelism TS v2) | carrega elementos de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) de memória contígua
(public member function)