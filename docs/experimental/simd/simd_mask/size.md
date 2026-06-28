# std::experimental::simd_mask&lt;T,Abi&gt;::size

static constexpr size_t size() noexcept; |  |  (parallelism TS v2)  

  
Retorna a largura (o número de valores) de `simd_mask<T, Abi>`. 

### Exemplo

A saída real depende do alvo e das flags do compilador.

Execute este código
```cpp
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
     
    int main()
    {
        stdx::native_simd_mask<int> a { true };
        std::cout << a.size() << '\n';
        std::cout << popcount(a) << '\n';
    }
```

Saída possível: 
```
    16
    16
```

### Veja também

[ simd_size](<#/doc/experimental/simd/simd_size>)(parallelism TS v2) | obtém o número de elementos de um dado tipo de elemento e ABI tag   
(template de classe)  
[ size](<#/doc/experimental/simd/simd/size>)[static] (parallelism TS v2) | retorna a largura / número de elementos   
(função membro estática pública de `std::experimental::simd<T,Abi>`)