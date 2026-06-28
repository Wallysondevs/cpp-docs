# Tipos inteiros de largura fixa (desde C++11)

### Tipos

Definido no header `[<cstdint>](<#/doc/header/cstdint>)`
---
int8_tint16_tint32_tint64_t(optional) | tipo inteiro com sinal com largura de exatamente 8, 16, 32 e 64 bits, respectivamente
sem bits de preenchimento e usando complemento de 2 para valores negativos
(fornecido se e somente se a implementação suportar diretamente o tipo)
(typedef)
int_fast8_tint_fast16_tint_fast32_tint_fast64_t | tipo inteiro com sinal mais rápido com largura de pelo menos 8, 16, 32 e 64 bits, respectivamente
(typedef)
int_least8_tint_least16_tint_least32_tint_least64_t | menor tipo inteiro com sinal com largura de pelo menos 8, 16, 32 e 64 bits, respectivamente
(typedef)
intmax_t | tipo inteiro com sinal de largura máxima
(typedef)
intptr_t(optional) | tipo inteiro com sinal capaz de armazenar um ponteiro para void
(typedef)
uint8_tuint16_tuint32_tuint64_t(optional) | tipo inteiro sem sinal com largura de exatamente 8, 16, 32 e 64 bits, respectivamente
(fornecido se e somente se a implementação suportar diretamente o tipo)
(typedef)
uint_fast8_tuint_fast16_tuint_fast32_tuint_fast64_t | tipo inteiro sem sinal mais rápido com largura de pelo menos 8, 16, 32 e 64 bits, respectivamente
(typedef)
uint_least8_tuint_least16_tuint_least32_tuint_least64_t | menor tipo inteiro sem sinal com largura de pelo menos 8, 16, 32 e 64 bits, respectivamente
(typedef)
uintmax_t | tipo inteiro sem sinal de largura máxima
(typedef)
uintptr_t(optional) | tipo inteiro sem sinal capaz de armazenar um ponteiro para void
(typedef)

A implementação pode definir nomes de typedef `int _N_ _t`, `int_fast _N_ _t`, `int_least _N_ _t`, `uint _N_ _t`, `uint_fast _N_ _t` e `uint_least _N_ _t` quando _N_ não for 8, 16, 32 ou 64. Nomes de typedef na forma `int _N_ _t` só podem ser definidos se a implementação suportar um tipo inteiro dessa largura sem preenchimento. Assim, `std::uint24_t` denota um tipo inteiro sem sinal com uma largura de exatamente 24 bits.

Cada uma das macros listadas abaixo é definida se e somente se a implementação definir o nome de typedef correspondente. As macros `INT _N_ _C` e `UINT _N_ _C` correspondem aos nomes de typedef `int_least _N_ _t` e `uint_least _N_ _t`, respectivamente.

### Constantes de macro

Definido no header `[<cstdint>](<#/doc/header/cstdint>)`
---

##### Inteiros com sinal: valor mínimo

INT8_MININT16_MININT32_MININT64_MIN(optional) | valor mínimo de `std::int8_t`, `std::int16_t`, `std::int32_t` e `std::int64_t`, respectivamente
(constante de macro)
INT_FAST8_MININT_FAST16_MININT_FAST32_MININT_FAST64_MIN | valor mínimo de `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t` e `std::int_fast64_t`, respectivamente
(constante de macro)
INT_LEAST8_MININT_LEAST16_MININT_LEAST32_MININT_LEAST64_MIN | valor mínimo de `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` e `std::int_least64_t`, respectivamente
(constante de macro)
INTPTR_MIN(optional) | valor mínimo de `std::intptr_t`
(constante de macro)
INTMAX_MIN | valor mínimo de `std::intmax_t`
(constante de macro)

##### Inteiros com sinal: valor máximo

INT8_MAXINT16_MAXINT32_MAXINT64_MAX(optional) | valor máximo de `std::int8_t`, `std::int16_t`, `std::int32_t` e `std::int64_t`, respectivamente
(constante de macro)
INT_FAST8_MAXINT_FAST16_MAXINT_FAST32_MAXINT_FAST64_MAX | valor máximo de `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t` e `std::int_fast64_t`, respectivamente
(constante de macro)
INT_LEAST8_MAXINT_LEAST16_MAXINT_LEAST32_MAXINT_LEAST64_MAX | valor máximo de `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` e `std::int_least64_t`, respectivamente
(constante de macro)
INTPTR_MAX(optional) | valor máximo de `std::intptr_t`
(constante de macro)
INTMAX_MAX | valor máximo de `std::intmax_t`
(constante de macro)

##### Inteiros sem sinal: valor máximo

UINT8_MAXUINT16_MAXUINT32_MAXUINT64_MAX(optional) | valor máximo de `std::uint8_t`, `std::uint16_t`, `std::uint32_t` e `std::uint64_t`, respectivamente
(constante de macro)
UINT_FAST8_MAXUINT_FAST16_MAXUINT_FAST32_MAXUINT_FAST64_MAX | valor máximo de `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t` e `std::uint_fast64_t`, respectivamente
(constante de macro)
UINT_LEAST8_MAXUINT_LEAST16_MAXUINT_LEAST32_MAXUINT_LEAST64_MAX | valor máximo de `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t` e `std::uint_least64_t`, respectivamente
(constante de macro)
UINTPTR_MAX(optional) | valor máximo de `std::uintptr_t`
(constante de macro)
UINTMAX_MAX | valor máximo de `std::uintmax_t`
(constante de macro)

### Macros de função para constantes inteiras de largura mínima

INT8_CINT16_CINT32_CINT64_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e cujo tipo é o tipo [promovido](<#/doc/language/implicit_cast>) de `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` e `std::int_least64_t`, respectivamente
(macro de função)
INTMAX_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e o tipo `std::intmax_t`
(macro de função)
UINT8_CUINT16_CUINT32_CUINT64_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e cujo tipo é o tipo [promovido](<#/doc/language/implicit_cast>) de `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t` e `std::uint_least64_t`, respectivamente
(macro de função)
UINTMAX_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e o tipo `std::uintmax_t`
(macro de função)
```cpp
    #include <cstdint>
    UINT64_C(0x123) // expande para um literal do tipo uint_least64_t e valor 0x123
```

### Constantes de macro de formato

Definido no header `[<cinttypes>](<#/doc/header/cinttypes>)`
---

#### Constantes de formato para a família de funções [std::fprintf](<#/doc/io/c/printf>)

Cada uma das macros `PRI` listadas aqui é definida se e somente se a implementação definir o nome de typedef correspondente.

Equivalente
para int ou
unsigned int | Descrição | Macros para tipos de dados

`std::int`x`_t`

| `std::int_least`x** _t | `std::int_fast`x** _t | `std::intmax_t` | `std::intptr_t`
---|---|---|---|---|---|---
`d` | saída de um valor inteiro decimal com sinal | PRId**x** | PRIdLEAST**x** | PRIdFAST**x** | PRIdMAX | PRIdPTR
`i` | PRIi**x** | PRIiLEAST**x** | PRIiFAST**x** | PRIiMAX | PRIiPTR
`u` | saída de um valor inteiro decimal sem sinal | PRIu**x** | PRIuLEAST**x** | PRIuFAST**x** | PRIuMAX | PRIuPTR
`o` | saída de um valor inteiro octal sem sinal | PRIo**x** | PRIoLEAST**x** | PRIoFAST**x** | PRIoMAX | PRIoPTR
`x` | saída de um valor inteiro hexadecimal minúsculo sem sinal | PRIx**x** | PRIxLEAST**x** | PRIxFAST**x** | PRIxMAX | PRIxPTR
`X` | saída de um valor inteiro hexadecimal maiúsculo sem sinal | PRIX**x** | PRIXLEAST**x** | PRIXFAST**x** | PRIXMAX | PRIXPTR

#### Constantes de formato para a família de funções [std::fscanf](<#/doc/io/c/scanf>)

Cada uma das macros `SCN` listadas aqui é definida se e somente se a implementação definir o nome de typedef correspondente e tiver um modificador de comprimento [std::fscanf](<#/doc/io/c/scanf>) adequado para o tipo.

Equivalente
para int ou
unsigned int | Descrição | Macros para tipos de dados

`std::int`x`_t`

| `std::int_least`x** _t | `std::int_fast`x** _t | `std::intmax_t` | `std::intptr_t`
---|---|---|---|---|---|---
`d` | entrada de um valor inteiro decimal com sinal | SCNd**x** | SCNdLEAST**x** | SCNdFAST**x** | SCNdMAX | SCNdPTR
`i` | entrada de um valor inteiro com sinal | SCNi**x** | SCNiLEAST**x** | SCNiFAST**x** | SCNiMAX | SCNiPTR
`u` | entrada de um valor inteiro decimal sem sinal | SCNu**x** | SCNuLEAST**x** | SCNuFAST**x** | SCNuMAX | SCNuPTR
`o` | entrada de um valor inteiro octal sem sinal | SCNo**x** | SCNoLEAST**x** | SCNoFAST**x** | SCNoMAX | SCNoPTR
`x` | entrada de um valor inteiro hexadecimal sem sinal | SCNx**x** | SCNxLEAST**x** | SCNxFAST**x** | SCNxMAX | SCNxPTR

### Notas

Como C++ interpreta um caractere imediatamente após um literal de string como um [literal de string definido pelo usuário](<#/doc/language/user_literal>), o código C como printf("%"PRId64"\n",n); é C++ inválido e requer um espaço antes de `PRId64`.

O padrão C99 sugere que as implementações C++ não devem definir as macros de limite, constante ou formato acima, a menos que as macros __STDC_LIMIT_MACROS, __STDC_CONSTANT_MACROS ou __STDC_FORMAT_MACROS (respectivamente) sejam definidas antes de incluir o header C relevante (`stdint.h` ou `inttypes.h`). Esta recomendação não foi adotada por nenhum padrão C++ e foi removida em C11. No entanto, algumas implementações (como glibc 2.17) tentam aplicar esta regra, e pode ser necessário definir as macros `__STDC`; compiladores C++ podem tentar contornar isso definindo-as automaticamente em algumas circunstâncias.

`std::int8_t` pode ser signed char e `std::uint8_t` pode ser unsigned char, mas nenhum deles pode ser char independentemente de seu sinal (porque char não é considerado um "tipo inteiro com sinal" ou "tipo inteiro sem sinal").

### Exemplo

Veja também uma [nota](<#/doc/language/user_literal>) sobre espaços antes das [macros de formato](<#/doc/types/integer>) usadas neste exemplo.

Execute este código
```cpp
    #include <cinttypes>
    #include <cstdio>
     
    int main()
    {
        std::printf("%zu\n", sizeof(std::int64_t));
        std::printf("%s\n", PRId64);
        std::printf("%+" PRId64 "\n", INT64_MIN);
        std::printf("%+" PRId64 "\n", INT64_MAX);
     
        std::int64_t n = 7;
        std::printf("%+" PRId64 "\n", n);
    }
```

Saída possível:
```
    8
    lld
    -9223372036854775808
    +9223372036854775807
    +7
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2820](<https://cplusplus.github.io/LWG/issue2820>) | C++11 | os requisitos para nomes de typedef e macros opcionais eram inconsistentes com C | tornados consistentes

### Referências

* C++23 padrão (ISO/IEC 14882:2024):
  * 17.4.1 Header &lt;cstdint&gt; synopsis [cstdint.syn]
  * 31.13.2 Header &lt;cinttypes&gt; synopsis [cinttypes.syn]
* C++20 padrão (ISO/IEC 14882:2020):
  * 17.4 Tipos inteiros [cstdint]
  * 29.12.2 Header &lt;cinttypes&gt; synopsis [cinttypes.syn]
* C++17 padrão (ISO/IEC 14882:2017):
  * 21.4 Tipos inteiros [cstdint]
  * 30.11.2 Header &lt;cinttypes&gt; synopsis [cinttypes.syn]
* C++14 padrão (ISO/IEC 14882:2014):
  * 18.4 Tipos inteiros [cstdint]
  * 27.9.2 Arquivos da biblioteca C [c.files]
* C++11 padrão (ISO/IEC 14882:2011):
  * 18.4 Tipos inteiros [cstdint]
  * 27.9.2 Arquivos da biblioteca C [c.files]

### Veja também

* [Tipos fundamentais](<#/doc/language/types>)

[Documentação C](<#/>) para Tipos inteiros de largura fixa
---