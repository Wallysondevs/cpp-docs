# std::experimental::simd&lt;T,Abi&gt;::size

static constexpr size_t size() noexcept; |  |  (parallelism TS v2)  

  
Retorna a largura (o número de valores) de `simd<T, Abi>`. 

### Exemplo

A saída real depende do alvo e das flags do compilador.

Execute este código
```cpp
    #include <experimental/simd>
    #include <cstdint>
    #include <iostream>
    namespace stdx = std::experimental;
    
    int main()
    {
        stdx::native_simd<std::int32_t> a = 1;
        std::cout << a.size() << '\n';
        std::cout << reduce(a) << '\n';
    }
```

Saída possível: 
```
    16
    16
```

### Veja também

[ simd_size](<#/doc/experimental/simd/simd_size>)(parallelism TS v2) |  obtém o número de elementos de um dado tipo de elemento e tag ABI   
(modelo de classe)  
[ size](<#/doc/experimental/simd/simd_mask/size>)[static] (parallelism TS v2) |  retorna a largura / número de elementos   
(função membro estática pública de `std::experimental::simd_mask<T,Abi>`)