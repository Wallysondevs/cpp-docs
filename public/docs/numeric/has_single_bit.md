# std::has_single_bit

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class T >
constexpr bool has_single_bit( T x ) noexcept;
```

Verifica se x é uma potência inteira de dois.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor de tipo inteiro sem sinal

### Valor de retorno

true se x for uma potência inteira de dois; caso contrário, false.

### Notas

Antes de [P1956R1](<https://wg21.link/P1956R1>), o nome proposto para este template de função era `ispow2`.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_int_pow2`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | [Operações de potência de 2 inteira](<#/doc/numeric>)

### Possível implementação

Primeira versão
---
```cpp
    template<std::unsigned_integral T>
        requires !std::same_as<T, bool> && !std::same_as<T, char> &&
                 !std::same_as<T, char8_t> && !std::same_as<T, char16_t> &&
                 !std::same_as<T, char32_t> && !std::same_as<T, wchar_t>
    constexpr bool has_single_bit(T x) noexcept
    {
        return x && !(x & (x - 1));
    }
```

Segunda versão
```cpp
    template<std::unsigned_integral T>
        requires !std::same_as<T, bool> && !std::same_as<T, char> &&
                 !std::same_as<T, char8_t> && !std::same_as<T, char16_t> &&
                 !std::same_as<T, char32_t> && !std::same_as<T, wchar_t>
    constexpr bool has_single_bit(T x) noexcept
    {
        return std::popcount(x) == 1;
    }
```

### Exemplo

Execute este código
```cpp
    #include <bit>
    #include <bitset>
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        for (auto u{0u}; u != 0B1010; ++u)
        {
            std::cout << "u = " << u << " = " << std::bitset<4>(u);
            if (std::has_single_bit(u))
                std::cout << " = 2^" << std::log2(u) << " (is power of two)";
            std::cout << '\n';
        }
    }
```

Saída:
```
    u = 0 = 0000
    u = 1 = 0001 = 2^0 (is power of two)
    u = 2 = 0010 = 2^1 (is power of two)
    u = 3 = 0011
    u = 4 = 0100 = 2^2 (is power of two)
    u = 5 = 0101
    u = 6 = 0110
    u = 7 = 0111
    u = 8 = 1000 = 2^3 (is power of two)
    u = 9 = 1001
```

### Veja também

[ popcount](<#/doc/numeric/popcount>)(C++20) | conta o número de bits 1 em um inteiro sem sinal
(template de função)
[ count](<#/doc/utility/bitset/count>) | retorna o número de bits definidos como true
(função membro pública de `std::bitset<N>`)
[ test](<#/doc/utility/bitset/test>) | acessa um bit específico
(função membro pública de `std::bitset<N>`)