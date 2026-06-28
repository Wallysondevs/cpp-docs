# std::bit_ceil

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class T >
constexpr T bit_ceil( T x );
```

Calcula a menor potência integral de dois que não é menor que x.

Se esse valor não for representável em `T`, o comportamento é indefinido. A chamada a esta função é permitida em [avaliação constante](<#/doc/language/constant_expression>) apenas se o comportamento indefinido não ocorrer.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor de tipo inteiro sem sinal

### Valor de retorno

A menor potência integral de dois que não é menor que x.

### Exceções

Não lança exceções.

### Notas

Antes de [P1956R1](<https://wg21.link/P1956R1>), o nome proposto para este function template era `ceil2`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_int_pow2`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | [Operações de potência integral de 2](<#/doc/numeric>)

### Implementação possível

Veja implementações possíveis em [libstdc++ (gcc)](<https://github.com/gcc-mirror/gcc/blob/62c25d7adb1a5664982449dda0e7f9ca63cf4735/libstdc%2B%2B-v3/include/std/bit#L217-L248>) e [libc++ (clang)](<https://github.com/llvm/llvm-project/blob/llvmorg-14.0.4/libcxx/include/bit#L304-L321>).
```cpp
    template<std::unsigned_integral T>
        requires !std::same_as<T, bool> && !std::same_as<T, char> &&
                 !std::same_as<T, char8_t> && !std::same_as<T, char16_t> &&
                 !std::same_as<T, char32_t> && !std::same_as<T, wchar_t>
    constexpr T bit_ceil(T x) noexcept
    {
        if (x <= 1u)
            return T(1);
        if constexpr (std::same_as<T, decltype(+x)>)
            return T(1) << std::bit_width(T(x - 1));
        else
        {   // for types subject to integral promotion
            constexpr int offset_for_ub =
                std::numeric_limits<unsigned>::digits - std::numeric_limits<T>::digits;
            return T(1u << (std::bit_width(T(x - 1)) + offset_for_ub) >> offset_for_ub);
        }
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <bit>
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        using bin = std::bitset<8>;
        for (auto x{0U}; 0XA != x; ++x)
            std::cout << "bit_ceil( " << bin(x) << " ) = "
                      << bin(std::bit_ceil(x)) << '\n';
    }
```

Saída:
```
    bit_ceil( 00000000 ) = 00000001
    bit_ceil( 00000001 ) = 00000001
    bit_ceil( 00000010 ) = 00000010
    bit_ceil( 00000011 ) = 00000100
    bit_ceil( 00000100 ) = 00000100
    bit_ceil( 00000101 ) = 00001000
    bit_ceil( 00000110 ) = 00001000
    bit_ceil( 00000111 ) = 00001000
    bit_ceil( 00001000 ) = 00001000
    bit_ceil( 00001001 ) = 00010000
```

### Veja também

[ bit_floor](<#/doc/numeric/bit_floor>)(C++20) | encontra a maior potência integral de 2 não maior que o valor fornecido
(function template)