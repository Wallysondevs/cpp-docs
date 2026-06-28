# std::byte

Definido no cabeçalho `[<cstddef>](<#/doc/header/cstddef>)`

```c
enum class byte : unsigned char {};
```

`std::byte` é um tipo distinto que implementa o conceito de byte conforme especificado na definição da linguagem C++.

Assim como `unsigned char`, ele pode ser usado para acessar a memória bruta ocupada por outros objetos ([representação de objeto](<#/doc/language/objects>)), mas, ao contrário de `unsigned char`, não é um tipo de caractere e não é um tipo aritmético. `std::byte` modela uma mera coleção de bits, suportando apenas operações de deslocamento de bits com um inteiro, e operações bitwise e de comparação com outro `std::byte`.

### Funções não-membro

## std::to_integer

```cpp
template< class IntegerType >
constexpr IntegerType to_integer( std::byte b ) noexcept;  // (desde C++17)
```

Equivalente a: `return IntegerType(b);` Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_integral_v](<#/doc/types/is_integral>)<IntegerType>` for `true`.

## std::operator<<=,operator>>=

```cpp
template< class IntegerType >
constexpr std::byte& operator<<=( std::byte& b, IntegerType shift ) noexcept;  // (1) (desde C++17)
template< class IntegerType >
constexpr std::byte& operator>>=( std::byte& b, IntegerType shift ) noexcept;  // (2) (desde C++17)
```

1) Equivalente a: `return b = b << shift;` Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_integral_v](<#/doc/types/is_integral>)<IntegerType>` for `true`.

2) Equivalente a: `return b = b >> shift;`

Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_integral_v](<#/doc/types/is_integral>)<IntegerType>` for `true`.

## std::operator<<,operator>>

```cpp
template< class IntegerType >
constexpr std::byte operator<<( std::byte b, IntegerType shift ) noexcept;  // (1) (desde C++17)
template< class IntegerType >
constexpr std::byte operator>>( std::byte b, IntegerType shift ) noexcept;  // (2) (desde C++17)
```

1) Equivalente a: `return std::byte(static_cast<unsigned int>(b) << shift);` Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_integral_v](<#/doc/types/is_integral>)<IntegerType>` for `true`.

2) Equivalente a: `return std::byte(static_cast<unsigned int>(b) >> shift);`

Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_integral_v](<#/doc/types/is_integral>)<IntegerType>` for `true`.

## std::operator|=,operator&=,operator^=

```cpp
constexpr std::byte& operator|=( std::byte& l, std::byte r ) noexcept;  // (1) (desde C++17)
constexpr std::byte& operator&=( std::byte& l, std::byte r ) noexcept;  // (2) (desde C++17)
constexpr std::byte& operator^=( std::byte& l, std::byte r ) noexcept;  // (3) (desde C++17)
```

1) Equivalente a: `return l = l | r;`.

2) Equivalente a: `return l = l & r;`.

3) Equivalente a: `return l = l ^ r;`.

## std::operator|,operator&,operator^,operator~

```cpp
constexpr std::byte operator|( std::byte l, std::byte r ) noexcept;  // (1) (desde C++17)
constexpr std::byte operator&( std::byte l, std::byte r ) noexcept;  // (2) (desde C++17)
constexpr std::byte operator^( std::byte l, std::byte r ) noexcept;  // (3) (desde C++17)
constexpr std::byte operator~( std::byte b ) noexcept;  // (4) (desde C++17)
```

1) Equivalente a: `return std::byte(static_cast<unsigned int>(l) | static_cast<unsigned int>(r));`.

2) Equivalente a: `return std::byte(static_cast<unsigned int>(l) & static_cast<unsigned int>(r));`.

3) Equivalente a: `return std::byte(static_cast<unsigned int>(l) ^ static_cast<unsigned int>(r));`.

4) Equivalente a: `return std::byte(~static_cast<unsigned int>(b));`

### Notas

Um valor numérico `n` pode ser convertido para um valor de byte usando `std::byte{n}`, devido às regras de [inicialização relaxada de enum class](<#/doc/language/enum>) do C++17.

Um byte pode ser convertido para um valor numérico (como para produzir um hash inteiro de um objeto) da maneira usual com uma [conversão explícita](<#/doc/language/explicit_cast>) ou, alternativamente, com [`std::to_integer`](<#/doc/types/byte>).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_byte`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | `std::byte`

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <cassert>
    #include <cstddef>
    #include <iostream>
    #include <utility>
    
    std::ostream& operator<<(std::ostream& os, std::byte b)
    {
        return os << std::bitset<8>(std::to_integer<int>(b));
    }
    
    int main()
    {
        // std::byte y = 1; // Error: cannot convert int to byte.
        std::byte y{1}; // OK
    
        // if (y == 13) {} // Error: cannot be compared.
        if (y == std::byte{13}) {} // OK, bytes are comparable
    
        int arr[]{1, 2, 3};
        // int c = a[y]; // Error: array subscript is not an integer
        [[maybe_unused]] int i = arr[std::to_integer<int>(y)]; // OK
        [[maybe_unused]] int j = arr[std::to_underlying(y)];   // OK
    
        auto to_int =  { return std::to_integer<int>(b); };
    
        std::byte b{42};
        assert(to_int(b) == 0b00101010);
        std::cout << b << '\n';
    
        // b *= 2; // Error: b is not of arithmetic type
        b <<= 1;
        assert(to_int(b) == 0b01010100);
    
        b >>= 1;
        assert(to_int(b) == 0b00101010);
    
        assert(to_int(b << 1) == 0b01010100);
        assert(to_int(b >> 1) == 0b00010101);
    
        b |= std::byte{0b11110000};
        assert(to_int(b) == 0b11111010);
    
        b &= std::byte{0b11110000};
        assert(to_int(b) == 0b11110000);
    
        b ^= std::byte{0b11111111};
        assert(to_int(b) == 0b00001111);
    }
```

Saída:
```
    00101010
```