# std::experimental::popcount

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)` | | (parallelism TS v2)

```c
template< class T, class Abi >
int popcount( const simd_mask<T, Abi>& k ) noexcept;
```

Retorna o número de valores verdadeiros na máscara k.

### Parâmetros

- **k** — a [`simd_mask`](<#/doc/experimental/simd/simd_mask>) à qual aplicar a redução

### Valor de retorno

Um int no intervalo `[`0`, `simd_size_v<T, Abi>`)`.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
    
    template<typename Abi>
    int count_zeros(stdx::simd<int, Abi> v)
    {
        return stdx::popcount(v == 0); // v == 0 returns a simd_mask
    }
    
    void println(auto rem, auto const v)
    {
        std::cout << rem << ": ";
        for (std::size_t i = 0; i != v.size(); ++i)
            std::cout << v[i] << ' ';
    }
    
    int main()
    {
        stdx::simd<int> x{8};
        println("x", x);
        std::cout << "  zeros: " << count_zeros(x) << '\n';
    
        x[3] = x[1] = false;
        println("x", x);
        std::cout << "  zeros: " << count_zeros(x) << '\n';
    }
```

Saída possível:
```
    x: 8 8 8 8   zeros: 0
    x: 8 0 8 0   zeros: 2
```