Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class T >
constexpr int bit_width( T x ) noexcept;
```

Se x não for zero, calcula o número de bits necessários para armazenar o valor x, ou seja, \\(1 + \lfloor \log_2(x) \rfloor\\)1 + floor(log2(x)). Se x for zero, retorna zero.

Esta sobrecarga participa da resolução de sobrecarga somente se `T` for um tipo inteiro sem sinal (ou seja, unsigned char, unsigned short, unsigned int, unsigned long, unsigned long long, ou um tipo inteiro sem sinal estendido).

### Parâmetros

- **x** — valor inteiro sem sinal

### Valor de retorno

Zero se x for zero; caso contrário, um mais o logaritmo de base 2 de x, com qualquer parte fracionária descartada.

### Notas

Esta função é equivalente a return [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits - [std::countl_zero](<#/doc/numeric/countl_zero>)(x);.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_int_pow2`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | [Operações de potência de 2 inteiras](<#/doc/numeric>)

### Exemplo

Execute este código
```
    #include <bit>
    #include <bitset>
    #include <iostream>
    
    int main()
    {
        for (unsigned x{}; x != 010; ++x)
            std::cout << "bit_width( "
                      << std::bitset<4>{x} << " ) = "
                      << std::bit_width(x) << '\n';
    }
```

Saída:
```
    bit_width( 0000 ) = 0
    bit_width( 0001 ) = 1
    bit_width( 0010 ) = 2
    bit_width( 0011 ) = 2
    bit_width( 0100 ) = 3
    bit_width( 0101 ) = 3
    bit_width( 0110 ) = 3
    bit_width( 0111 ) = 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3656](<https://cplusplus.github.io/LWG/issue3656>) | C++20 | o tipo de retorno de `bit_width` é o mesmo que o tipo de seu argumento de função | tornou-o int

### Veja também

[ countl_zero](<#/doc/numeric/countl_zero>)(C++20) | conta o número de bits ​0​ consecutivos, começando do bit mais significativo
(modelo de função)