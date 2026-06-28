# std::countr_one

Definido no header `[<bit>](<#/doc/header/bit>)`

```cpp
template< class T >
constexpr int countr_one( T x ) noexcept;  // (desde C++20)
```

Retorna o número de bits 1 consecutivos no valor de x, começando pelo bit menos significativo ("à direita").

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor de tipo inteiro sem sinal

### Valor de retorno

O número de bits 1 consecutivos no valor de x, começando pelo bit menos significativo.

### Notas

Macro de teste de funcionalidade | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_bitops`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [Operações de bit](<#/doc/numeric>)

### Exemplo

Execute este código
```cpp
    #include <bit>
    #include <bitset>
    #include <cstdint>
    #include <iostream>
    
    int main()
    {
        for (const std::uint8_t i : {0, 0b11111111, 0b11111110, 0b11100011})
            std::cout << "countr_one( " << std::bitset<8>(i) << " ) = "
                      << std::countr_one(i) << '\n';
    }
```

Saída:
```
    countr_one( 00000000 ) = 0
    countr_one( 11111111 ) = 8
    countr_one( 11111110 ) = 0
    countr_one( 11100011 ) = 2
```

### Veja também

[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando pelo bit mais significativo
(function template)
[ countl_one](<#/doc/numeric/countl_one>)(C++20) | conta o número de bits 1 consecutivos, começando pelo bit mais significativo
(function template)
[ countr_zero](<#/doc/numeric/countr_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando pelo bit menos significativo
(function template)
[ popcount](<#/doc/numeric/popcount>)(C++20) | conta o número de bits 1 em um inteiro sem sinal
(function template)
[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) | verifica se um número é uma potência integral de 2
(function template)
[ count](<#/doc/utility/bitset/count>) | retorna o número de bits definidos como true
(public member function of `std::bitset<N>`)
[ allanynone](<#/doc/utility/bitset/all_any_none>) | verifica se todos, qualquer ou nenhum dos bits estão definidos como true
(public member function of `std::bitset<N>`)