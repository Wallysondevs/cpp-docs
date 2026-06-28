# std::to_underlying

Definido no header `[<utility>](<#/doc/header/utility>)`

```cpp
template< class Enum >
constexpr std::underlying_type_t<Enum> to_underlying( Enum e ) noexcept;  // (desde C++23)
```

Converte uma enumeração para seu tipo subjacente. Equivalente a return static_cast<[std::underlying_type_t](<#/doc/types/underlying_type>)&lt;Enum&gt;>(e);.

### Parâmetros

- **e** — valor de enumeração para converter

### Valor de retorno

O valor inteiro do tipo subjacente de `Enum`, convertido de e.

### Observações

`std::to_underlying` pode ser usado para evitar a conversão de uma enumeração para um tipo inteiro diferente de seu tipo subjacente.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_to_underlying`](<#/doc/feature_test>) | [`202102L`](<#/>) | (C++23) | `std::to_underlying`

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    #include <type_traits>
    #include <utility>
    
    enum class E1 : char { e };
    static_assert(std::is_same_v<char, decltype(std::to_underlying(E1::e))>);
    
    enum struct E2 : long { e };
    static_assert(std::is_same_v<long, decltype(std::to_underlying(E2::e))>);
    
    enum E3 : unsigned { e };
    static_assert(std::is_same_v<unsigned, decltype(std::to_underlying(e))>);
    
    int main()
    {
        enum class ColorMask : std::uint32_t
        {
            red = 0xFF, green = (red << 8), blue = (green << 8), alpha = (blue << 8)
        };
    
        std::cout << std::hex << std::uppercase << std::setfill('0')
                  << std::setw(8) << std::to_underlying(ColorMask::red) << '\n'
                  << std::setw(8) << std::to_underlying(ColorMask::green) << '\n'
                  << std::setw(8) << std::to_underlying(ColorMask::blue) << '\n'
                  << std::setw(8) << std::to_underlying(ColorMask::alpha) << '\n';
    
    //  std::underlying_type_t<ColorMask> x = ColorMask::alpha; // Error: no known conversion
        [[maybe_unused]]
        std::underlying_type_t<ColorMask> y = std::to_underlying(ColorMask::alpha); // OK
    }
```

Saída:
```
    000000FF
    0000FF00
    00FF0000
    FF000000
```

### Veja também

[ underlying_type](<#/doc/types/underlying_type>)(C++11) | obtém o tipo inteiro subjacente para um dado tipo de enumeração
(modelo de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(modelo de classe)
[ is_scoped_enum](<#/doc/types/is_scoped_enum>)(C++23) | verifica se um tipo é um tipo de enumeração com escopo
(modelo de classe)