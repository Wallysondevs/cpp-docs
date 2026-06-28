# std::rotr

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class T >
constexpr T rotr( T x, int s ) noexcept;
```

Calcula o resultado da rotação bit a bit para a direita do valor de x por s posições. Esta operação também é conhecida como um [deslocamento circular](<https://en.wikipedia.org/wiki/Circular_shift> "enwiki:Circular shift") para a direita.

Formalmente, seja `N` [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits e r seja s % N.

* Se r for ​0​, retorna x;
* se r for positivo, retorna (x >> r) | (x << (N - r));
* se r for negativo, retorna [std::rotl](<#/doc/numeric/rotl>)(x, -r).

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor de tipo inteiro sem sinal
- **s** — número de posições para deslocar

### Valor de retorno

O resultado da rotação bit a bit para a direita de x por s posições.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
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
        using bin = std::bitset<8>;
        const std::uint8_t x{0b00011101};
        std::cout << bin(x) << " <- x\n";
        for (const int s : {0, 1, 9, -1, 2})
            std::cout << bin(std::rotr(x, s)) << " <- rotr(x, " << s << ")\n";
    }
```

Saída:
```
    00011101 <- x
    00011101 <- rotr(x, 0)
    10001110 <- rotr(x, 1)
    10001110 <- rotr(x, 9)
    00111010 <- rotr(x, -1)
    01000111 <- rotr(x, 2)
```

### Veja também

[ rotl](<#/doc/numeric/rotl>)(C++20) | calcula o resultado da rotação bit a bit para a esquerda
(modelo de função)
[ operator<<=operator>>=operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt>) | realiza deslocamento binário para a esquerda e para a direita
(função membro pública de `std::bitset<N>`)