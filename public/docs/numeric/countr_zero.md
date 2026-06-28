# std::countr_zero

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class T >
constexpr int countr_zero( T x ) noexcept;
```

Retorna o número de bits ​0​ consecutivos no valor de x, começando pelo bit menos significativo ("à direita").

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor de tipo inteiro sem sinal

### Valor de retorno

O número de bits ​0​ consecutivos no valor de x, começando pelo bit menos significativo.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
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
        for (const std::uint8_t i : {0, 0b11111111, 0b00011100, 0b00011101})
            std::cout << "countr_zero( " << std::bitset<8>(i) << " ) = "
                      << std::countr_zero(i) << '\n';
    }
```

Saída:
```
    countr_zero( 00000000 ) = 8
    countr_zero( 11111111 ) = 0
    countr_zero( 00011100 ) = 2
    countr_zero( 00011101 ) = 0
```

### Veja também

[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando pelo bit mais significativo
(modelo de função)
[ countl_one](<#/doc/numeric/countl_one>)(C++20) | conta o número de bits 1 consecutivos, começando pelo bit mais significativo
(modelo de função)
[ countr_one](<#/doc/numeric/countr_one>)(C++20) | conta o número de bits 1 consecutivos, começando pelo bit menos significativo
(modelo de função)
[ popcount](<#/doc/numeric/popcount>)(C++20) | conta o número de bits 1 em um inteiro sem sinal
(modelo de função)
[ allanynone](<#/doc/utility/bitset/all_any_none>) | verifica se todos, alguns ou nenhum dos bits estão definidos como true
(função membro pública de `std::bitset<N>`)