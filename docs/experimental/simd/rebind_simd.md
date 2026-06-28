# std::experimental::rebind_simd, std::experimental::resize_simd

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class V >
struct rebind_simd;
template< int N, class V >
struct resize_simd;
```

Cria um tipo [`simd`](<#/doc/experimental/simd/simd>) ou [`simd_mask`](<#/doc/experimental/simd/simd_mask>) com um tipo de elemento ou tamanho diferente. O novo tipo provavelmente usa um tipo de tag ABI diferente de `V::abi_type`.

1) Altera o tipo do elemento para `T` e mantém o tamanho inalterado.

2) Altera o tamanho para `N` e mantém o tipo do elemento inalterado.

### Parâmetros de template

- **T** — o novo tipo de elemento; um tipo aritmético diferente de bool
- **N** — o novo número de elementos
- **V** — um tipo simd ou simd_mask

### Tipos de membros

Nome | Definição
---|---
`type` | Tipo `simd` ou `simd_mask` com um tipo de elemento diferente (1) ou tamanho (2)

### Tipos auxiliares

template< class T, class V >
using rebind_simd_t = typename rebind_simd<T, V>::type; | | (parallelism TS v2)
template< int N, class V >
using resize_simd_t = typename resize_simd<N, V>::type; | | (parallelism TS v2)

### Exemplo

Execute este código
```cpp
    #include <experimental/simd>
    #include <iostream>
     
    namespace stdx = std::experimental;
    using floatv = stdx::native_simd<float>;
     
    // use double precision internally
    floatv dp(floatv x)
    {
        using doublev = stdx::rebind_simd_t<double, floatv>;
        return stdx::static_simd_cast<floatv>(stdx::simd_cast<doublev>(x) - 1.234);
    }
     
    template<class T>
    stdx::resize_simd_t<T::size() / 2, T> partial_reduction(T x)
    {
        auto [lo, hi] = stdx::split<stdx::resize_simd_t<T::size() / 2, T>>(x);
        return lo + hi;
    }
     
    int main() 
    {
        floatv x( { return 1.234f + std::numeric_limits<float>::epsilon() * i; });
        x = dp(x);
        const auto y = partial_reduction(x);
        for (unsigned i = 0; i < y.size(); ++i)
            std::cout << y[i] << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    1.73569e-07 4.11987e-07
```

### Veja também

[deduce_t](<#/doc/experimental/simd/deduce>)(parallelism TS v2) | obtém um tipo ABI para um dado tipo de elemento e número de elementos
(class template)