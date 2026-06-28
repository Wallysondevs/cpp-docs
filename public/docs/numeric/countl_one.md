# std::countl_one

Definido no header `[<bit>](<#/doc/header/bit>)`

```cpp
template< class T >
constexpr int countl_one( T x ) noexcept;  // (desde C++20)
```

  
Retorna o número de bits 1 ("um") consecutivos no valor de x, começando pelo bit mais significativo ("esquerda").

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

x  |  \-  |  valor de tipo inteiro sem sinal   
  
### Valor de retorno

O número de bits 1 consecutivos no valor de x, começando pelo bit mais significativo.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_bitops`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [Operações de bit](<#/doc/numeric>)  
  
### Exemplo

Execute este código
```
    #include <bit>
    #include <bitset>
    #include <cstdint>
    #include <iostream>
     
    int main()
    {
        for (const std::uint8_t i : {0, 0b11111111, 0b01111111, 0b11100011})
            std::cout << "countl_one( " << std::bitset<8>(i) << " ) = "
                      << std::countl_one(i) << '\n';
    }
```

Saída: 
```
    countl_one( 00000000 ) = 0
    countl_one( 11111111 ) = 8
    countl_one( 01111111 ) = 0
    countl_one( 11100011 ) = 3
```

### Veja também

[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) |  conta o número de bits 0 consecutivos, começando pelo bit mais significativo   
(modelo de função)  
[ countr_zero](<#/doc/numeric/countr_zero>)(C++20) |  conta o número de bits 0 consecutivos, começando pelo bit menos significativo   
(modelo de função)  
[ countr_one](<#/doc/numeric/countr_one>)(C++20) |  conta o número de bits 1 consecutivos, começando pelo bit menos significativo   
(modelo de função)  
[ popcount](<#/doc/numeric/popcount>)(C++20) |  conta o número de bits 1 em um inteiro sem sinal   
(modelo de função)  
[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) |  verifica se um número é uma potência integral de 2   
(modelo de função)  
[ count](<#/doc/utility/bitset/count>) |  retorna o número de bits definidos como true   
(função membro pública de `std::bitset<N>`)  
[ allanynone](<#/doc/utility/bitset/all_any_none>) |  verifica se todos, qualquer ou nenhum dos bits estão definidos como true   
(função membro pública de `std::bitset<N>`)