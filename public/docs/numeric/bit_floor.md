# std::bit_floor

Definido no header `[<bit>](<#/doc/header/bit>)`

```cpp
template< class T >
constexpr T bit_floor( T x ) noexcept;  // (desde C++20)
```

Se x não for zero, calcula a maior potência integral de dois que não é maior que x. Se x for zero, retorna zero.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor inteiro sem sinal

### Valor de retorno

Zero se x for zero; caso contrário, a maior potência integral de dois que não é maior que x.

### Notas

Antes de [P1956R1](<https://wg21.link/P1956R1>), o nome proposto para este function template era `floor2`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_int_pow2`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | [Operações de potência de 2 integral](<#/doc/numeric>)

### Possível implementação
```cpp
    template<std::unsigned_integral T>
        requires !std::same_as<T, bool> && !std::same_as<T, char> &&
                 !std::same_as<T, char8_t> && !std::same_as<T, char16_t> &&
                 !std::same_as<T, char32_t> && !std::same_as<T, wchar_t>
    constexpr T bit_floor(T x) noexcept
    {
        if (x != 0)
            return T{1} << (std::bit_width(x) - 1);
        return 0;
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
        for (unsigned x{}; x != 012; ++x)
            std::cout << "bit_floor( " << bin(x) << " ) = "
                      << bin(std::bit_floor(x)) << '\n';
    }
```

Saída:
```
    bit_floor( 00000000 ) = 00000000
    bit_floor( 00000001 ) = 00000001
    bit_floor( 00000010 ) = 00000010
    bit_floor( 00000011 ) = 00000010
    bit_floor( 00000100 ) = 00000100
    bit_floor( 00000101 ) = 00000100
    bit_floor( 00000110 ) = 00000100
    bit_floor( 00000111 ) = 00000100
    bit_floor( 00001000 ) = 00001000
    bit_floor( 00001001 ) = 00001000
```

### Veja também

[ bit_ceil](<#/doc/numeric/bit_ceil>)(C++20) | encontra a menor potência integral de 2 não menor que o valor fornecido
(function template)
[ rotr](<#/doc/numeric/rotr>)(C++20) | calcula o resultado da rotação bit a bit para a direita
(function template)
[ bit_width](<#/doc/numeric/bit_width>)(C++20) | encontra o menor número de bits necessários para representar o valor fornecido
(function template)
[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) | verifica se um número é uma potência integral de 2
(function template)