# std::experimental::simd_abi::max_fixed_size

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T >
constexpr int max_fixed_size = /*implementation-defined*/;
```

O valor de max_fixed_size&lt;T&gt; declara que uma instância de simd<T, fixed_size&lt;N&gt;> com N <= max_fixed_size&lt;T&gt; é suportada pela implementação. O valor de max_fixed_size&lt;T&gt; é de pelo menos 32.

### Observações

Não é especificado se uma implementação suporta simd<T, fixed_size&lt;N&gt;> com N > max_fixed_size&lt;T&gt;. O valor de max_fixed_size&lt;T&gt; pode depender de flags do compilador e pode mudar entre diferentes versões de compiladores.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <experimental/simd>
    #include <iostream>
    namespace stq = std::experimental;
    
    int main()
    {
        std::cout << stq::simd_abi::max_fixed_size<std::uint8_t> << ' ';
        std::cout << stq::simd_abi::max_fixed_size<std::uint64_t> << ' ';
        std::cout << stq::simd_abi::max_fixed_size<float> << ' ';
        std::cout << stq::simd_abi::max_fixed_size<long double> << '\n';
    }
```

Saída possível:
```
    32 32 32 32
```

### Veja também

[ fixed_size](<#/doc/experimental/simd/fixed_size>)(parallelism TS v2) | tipo de tag para armazenar um número especificado de elementos
(alias template)