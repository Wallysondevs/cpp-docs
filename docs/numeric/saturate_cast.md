# std::saturate_cast

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class T, class U >
constexpr T saturate_cast( U x ) noexcept;
```

Converte o valor x para um valor do tipo `T`, limitando x entre os valores mínimo e máximo do tipo `T`.

O programa é malformado se `T` ou `U` não for um [tipo inteiro](<#/doc/language/types>) assinado ou não assinado (incluindo [tipo inteiro padrão](<#/doc/language/types>) e [tipo inteiro estendido](<#/doc/language/types>)).

### Parâmetros

- **x** — um valor inteiro

### Valor de retorno

* x, se x for representável como um valor do tipo `T`. Caso contrário,
* o maior ou o menor valor representável do tipo `T`, o que estiver mais próximo do valor de x.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_saturation_arithmetic`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Aritmética de saturação

### Implementação possível

Veja [libstdc++ (GCC)](<https://github.com/gcc-mirror/gcc/blob/07fe07935ddb9228b4426dbfdb62d4a7e7337efe/libstdc%2B%2B-v3/include/bits/sat_arith.h#L106>).

### Exemplo

Pode ser visualizado no [Compiler Explorer](<https://godbolt.org/z/5P149Y377>).

Execute este código
```
    #include <cstdint>
    #include <limits>
    #include <numeric>
     
    int main()
    {
        constexpr std::int16_t x1{696};
     
        constexpr std::int8_t x2 = std::saturate_cast<std::int8_t>(x1);
        static_assert(x2 == std::numeric_limits<std::int8_t>::max());
     
        constexpr std::uint8_t x3 = std::saturate_cast<std::uint8_t>(x1);
        static_assert(x3 == std::numeric_limits<std::uint8_t>::max());
     
        constexpr std::int16_t y1{-696};
     
        constexpr std::int8_t y2 = std::saturate_cast<std::int8_t>(y1);
        static_assert(y2 == std::numeric_limits<std::int8_t>::min());
     
        constexpr std::uint8_t y3 = std::saturate_cast<std::uint8_t>(y1);
        static_assert(y3 == 0);
    }
```

### Veja também

[ bit_cast](<#/doc/numeric/bit_cast>)(C++20) | reinterpreta a representação de objeto de um tipo como a de outro
(modelo de função)
[ clamp](<#/doc/algorithm/clamp>)(C++17) | limita um valor entre um par de valores de fronteira
(modelo de função)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)