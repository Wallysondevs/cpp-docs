# std::popcount

Definido no header `[<bit>](<#/doc/header/bit>)`

```cpp
template< class T >
constexpr int popcount( T x ) noexcept;  // (desde C++20)
```

Retorna o número de bits 1 no valor de x.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (isto é, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor de tipo inteiro sem sinal

### Valor de retorno

O número de bits 1 no valor de x.

### Notas

O nome `popcount` é uma contração para "population count".

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_bitops`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [Operações de bit](<#/doc/numeric>)

### Exemplo

Execute este código
```
    #include <bit>
    #include <bitset>
    #include <cstdint>
    #include <iostream>
    
    static_assert(std::popcount(0xFULL) == 4);
    
    int main()
    {
        for (const std::uint8_t x : {0, 0b00011101, 0b11111111})
            std::cout << "popcount( " << std::bitset<8>(x) << " ) = "
                      << std::popcount(x) << '\n';
    }
```

Saída:
```
    popcount( 00000000 ) = 0
    popcount( 00011101 ) = 4
    popcount( 11111111 ) = 8
```

### Veja também

[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando pelo bit mais significativo
(modelo de função)
[ countl_one](<#/doc/numeric/countl_one>)(C++20) | conta o número de bits 1 consecutivos, começando pelo bit mais significativo
(modelo de função)
[ countr_zero](<#/doc/numeric/countr_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando pelo bit menos significativo
(modelo de função)
[ countr_one](<#/doc/numeric/countr_one>)(C++20) | conta o número de bits 1 consecutivos, começando pelo bit menos significativo
(modelo de função)
[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) | verifica se um número é uma potência integral de 2
(modelo de função)
[ count](<#/doc/utility/bitset/count>) | retorna o número de bits definidos como true
(função membro pública de `std::bitset<N>`)
[ allanynone](<#/doc/utility/bitset/all_any_none>) | verifica se todos, qualquer ou nenhum dos bits estão definidos como true
(função membro pública de `std::bitset<N>`)