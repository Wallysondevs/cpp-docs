# Manipulação de bits (desde C++20)

Fornece vários function templates para acessar, manipular e processar bits individuais e sequências de bits.

Definido no header `[<bit>](<#/doc/header/bit>)`
---
Definido no namespace `std`

```cpp
 bit_cast(C++20)
(function template)
 byteswap(C++23)
(function template)
```

##### Potências inteiras de 2

[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) | verifica se um número é uma potência inteira de 2
(function template)
[ bit_ceil](<#/doc/numeric/bit_ceil>)(C++20) | encontra a menor potência inteira de 2 não menor que o valor fornecido
(function template)
[ bit_floor](<#/doc/numeric/bit_floor>)(C++20) | encontra a maior potência inteira de 2 não maior que o valor fornecido
(function template)
[ bit_width](<#/doc/numeric/bit_width>)(C++20) | encontra o menor número de bits necessários para representar o valor fornecido
(function template)

##### Rotação

[ rotl](<#/doc/numeric/rotl>)(C++20) | calcula o resultado da rotação bit a bit para a esquerda
(function template)
[ rotr](<#/doc/numeric/rotr>)(C++20) | calcula o resultado da rotação bit a bit para a direita
(function template)

##### Contagem

[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando do bit mais significativo
(function template)
[ countl_one](<#/doc/numeric/countl_one>)(C++20) | conta o número de bits 1 consecutivos, começando do bit mais significativo
(function template)
[ countr_zero](<#/doc/numeric/countr_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando do bit menos significativo
(function template)
[ countr_one](<#/doc/numeric/countr_one>)(C++20) | conta o número de bits 1 consecutivos, começando do bit menos significativo
(function template)
[ popcount](<#/doc/numeric/popcount>)(C++20) | conta o número de bits 1 em um inteiro sem sinal
(function template)

##### Endian

[ endian](<#/doc/types/endian>)(C++20) | indica a endianness de tipos escalares
(enum)

### Veja também

[Documentação C](<#/>) para Manipulação de bits
---