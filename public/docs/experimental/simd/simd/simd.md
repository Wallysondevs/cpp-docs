# std::experimental::simd&lt;T,Abi&gt;::simd

simd() noexcept = default; | (1) | (parallelism TS v2)
template< class U >
simd( U&& value ) noexcept; | (2) | (parallelism TS v2)
template< class U >
simd( const simd<U, simd_abi::fixed_size<size()>>& other ) noexcept; | (3) | (parallelism TS v2)
template< class G >
explicit simd( G&& generator ) noexcept; | (4) | (parallelism TS v2)
template< class U, class Flags >
simd( const U* mem, Flags flags ); | (5) | (parallelism TS v2)
---|---|---
simd( const simd& other ) noexcept = default; | (6) | (parallelism TS v2)
(declarado implicitamente)
simd( simd&& other ) noexcept = default; | (7) | (parallelism TS v2)
(declarado implicitamente)

1) Constrói um `simd` usando [inicialização padrão](<#/doc/language/default_initialization>) (construído sem inicializador) ou [inicialização por valor](<#/doc/language/value_initialization>) (construído com um inicializador vazio).

2) O construtor de broadcast constrói um `simd` com todos os valores inicializados para `value`. Esta sobrecarga participa da resolução de sobrecarga apenas se a conversão de `U` para `T` for _preservadora de valor_, ou se `U` for `int` ou `unsigned int` caso `T` seja um tipo integral sem sinal.

3) Constrói um `simd` onde o i-ésimo elemento é inicializado para static_cast&lt;T&gt;(other[i]) para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`. Esta sobrecarga participa da resolução de sobrecarga apenas se `Abi` for simd_abi::fixed_size<size()> e a conversão de `U` para `T` for _preservadora de valor_, e, se ambos `U` e `T` forem integrais, o rank de conversão de inteiro de `T` for maior que o rank de conversão de inteiro de `U`.

4) O construtor de gerador constrói um `simd` onde o i-ésimo elemento é inicializado para generator([std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), i>()). Esta sobrecarga participa da resolução de sobrecarga apenas se `simd(gen(std::integral_constant<std::size_t, i>()))` for bem-formado para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`. As chamadas para o gerador não são sequenciadas umas em relação às outras. Funções da standard library _[não seguras para vetorização](<#/doc/algorithm/execution_policy_tag_t>)_ não podem ser invocadas pelo gerador.

5) O construtor de carregamento constrói um `simd` onde o i-ésimo elemento é inicializado para static_cast&lt;T&gt;(mem[i]) para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`.

6,7) Construtores de cópia e move declarados implicitamente. Constrói um `simd` onde cada elemento é inicializado a partir dos valores dos elementos em `other`.

### Parâmetros

- **value** — o valor usado para a inicialização de todos os elementos `simd`
- **other** — outro `simd` para copiar
- **generator** — um objeto de função usado para a inicialização de cada elemento `simd`
- **mem** — um ponteiro para um array onde `[`mem`, `mem + size()`)` é um range válido
- **flags** — se do tipo [`vector_aligned_tag`](<#/doc/experimental/simd/vector_aligned>), o construtor de carregamento pode assumir que `mem` aponta para um armazenamento alinhado por [`memory_alignment_v<simd, U>`](<#/doc/experimental/simd/memory_alignment>)
Requisitos de tipo
-A conversão de `U` para `T` deve ser _preservadora de valor_. O construtor de broadcast (2) adicionalmente permite que `U` seja `int` ou `unsigned int` se `T` for um tipo integral sem sinal.
-`is_simd_flag_type_v<Flags>` deve ser verdadeiro.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
    
    int main()
    {
        stdx::native_simd<int> a; // uninitialized
        a = 1; // all elements set to 1
        stdx::native_simd<int> b( { return i; }); // {0, 1, 2, 3, ...}
    
        alignas(stdx::memory_alignment_v<stdx::native_simd<int>>)
            std::array<int, stdx::native_simd<int>::size() * 2> mem = {};
        for (std::size_t i = 0; i < mem.size(); ++i)
            mem[i] = i & 1;
    
        stdx::native_simd<int> c(&mem[0], stdx::vector_aligned); // {0, 1, 0, 1, ...}
        stdx::native_simd<int> d(&mem[1], stdx::element_aligned); // {1, 0, 1, 0, ...}
    
        auto sum = a + b + c + d;
    
        for (std::size_t i = 0; i < sum.size(); ++i)
            std::cout << sum[i] << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
```

### Veja também

[ copy_from](<#/doc/experimental/simd/simd/copy_from>)(parallelism TS v2) | carrega elementos [`simd`](<#/doc/experimental/simd/simd>) de memória contígua
(função membro pública)