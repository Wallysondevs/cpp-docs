# Literal inteiro

Permite que valores de tipo inteiro sejam usados diretamente em expressões.

### Sintaxe

Um literal inteiro tem a forma

---
literal-decimal sufixo-inteiro ﻿(opcional) | (1) |
---|---|---
literal-octal sufixo-inteiro ﻿(opcional) | (2) |
literal-hexadecimal sufixo-inteiro ﻿(opcional) | (3) |
literal-binário sufixo-inteiro ﻿(opcional) | (4) | (desde C++14)
---

onde

*   literal-decimal é um dígito decimal não-zero (`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`), seguido por zero ou mais dígitos decimais (`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`)
*   literal-octal é o dígito zero (`0`) seguido por zero ou mais dígitos octais (`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`)
*   literal-hexadecimal é a sequência de caracteres `0x` ou a sequência de caracteres `0X` seguida por um ou mais dígitos hexadecimais (`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `a`, `A`, `b`, `B`, `c`, `C`, `d`, `D`, `e`, `E`, `f`, `F`)
*   literal-binário é a sequência de caracteres `0b` ou a sequência de caracteres `0B` seguida por um ou mais dígitos binários (`0`, `1`)
*   sufixo-inteiro, se fornecido, pode conter um ou ambos os seguintes (se ambos forem fornecidos, podem aparecer em qualquer ordem:

    *   sufixo-unsigned (o caractere `u` ou o caractere `U`)
    *   um de

        *   sufixo-long (o caractere `l` ou o caractere `L`)

        *   sufixo-long-long (a sequência de caracteres `ll` ou a sequência de caracteres `LL`)

| (desde C++11)

        *   sufixo-size (o caractere `z` ou o caractere `Z`)

| (desde C++23)

Aspas simples opcionais (`'`) podem ser inseridas entre os dígitos como um separador; elas são ignoradas ao determinar o valor do literal. | (desde C++14)

Um literal inteiro (como qualquer literal) é uma [expressão primária](<#/doc/language/expressions>).

### Explicação

1) Literal inteiro decimal (base 10).

2) Literal inteiro octal (base 8).

3) Literal inteiro hexadecimal (base 16, as letras 'a' a 'f' representam os valores (decimais) de 10 a 15).

4) Literal inteiro binário (base 2).

O primeiro dígito de um literal inteiro é o mais significativo.

Exemplo. As seguintes variáveis são inicializadas com o mesmo valor:
```cpp
    int d = 42;
    int o = 052;
    int x = 0x2a;
    int X = 0X2A;
    int b = 0b101010; // C++14
```

Exemplo. As seguintes variáveis também são inicializadas com o mesmo valor:
```cpp
    unsigned long long l1 = 18446744073709550592ull;       // C++11
    unsigned long long l2 = 18'446'744'073'709'550'592llu; // C++14
    unsigned long long l3 = 1844'6744'0737'0955'0592uLL;   // C++14
    unsigned long long l4 = 184467'440737'0'95505'92LLU;   // C++14
```

### O tipo do literal

O tipo do literal inteiro é o primeiro tipo em que o valor pode se encaixar, da lista de tipos que depende da base numérica e do sufixo-inteiro utilizados:

Sufixo | Bases decimais | Bases binárias, octais ou hexadecimais
(sem sufixo) | * int
* long int
* long long int (desde C++11) | * int
* unsigned int
* long int
* unsigned long int
* long long int (desde C++11)
* unsigned long long int (desde C++11)
`u` ou `U` | * unsigned int
* unsigned long int
* unsigned long long int (desde C++11) | * unsigned int
* unsigned long int
* unsigned long long int (desde C++11)
`l` ou `L` | * long int
* unsigned long int (até C++11)
* long long int (desde C++11) | * long int
* unsigned long int
* long long int (desde C++11)
* unsigned long long int (desde C++11)
ambos `l`/`L`
e `u`/`U` | * unsigned long int
---|---
* unsigned long long int (desde C++11) | * unsigned long int
* unsigned long long int (desde C++11)
`ll` ou `LL` | * long long int (desde C++11) | * long long int (desde C++11)
* unsigned long long int (desde C++11)
ambos `ll`/`LL`
e `u`/`U` | * unsigned long long int (desde C++11) | * unsigned long long int (desde C++11)
---|---|---
`z` ou `Z` | * a versão com sinal de [std::size_t](<#/doc/types/size_t>) (desde C++23) | * a versão com sinal de [std::size_t](<#/doc/types/size_t>) (desde C++23)
* [std::size_t](<#/doc/types/size_t>) (desde C++23)
ambos `z`/`Z`
e `u`/`U` | * [std::size_t](<#/doc/types/size_t>) (desde C++23) | * [std::size_t](<#/doc/types/size_t>) (desde C++23)

Se o valor do literal inteiro que não possui sufixo-size (desde C++23) for muito grande para caber em qualquer um dos tipos permitidos pela combinação de sufixo/base e o compilador suportar um tipo inteiro estendido (como `__int128`) que possa representar o valor do literal, o literal pode receber esse tipo inteiro estendido — caso contrário, o programa é malformado.

### Notas

As letras nos literais inteiros não diferenciam maiúsculas de minúsculas: `0xDeAdBeEfU` e `0XdeadBEEFu` representam o mesmo número (uma exceção é o sufixo-long-long, que é `ll` ou `LL`, nunca `lL` ou `Ll`) (desde C++11).

Não existem literais inteiros negativos. Expressões como `-1` aplicam o [operador de menos unário](<#/doc/language/operator_arithmetic>) ao valor representado pelo literal, o que pode envolver conversões de tipo implícitas.

Em C antes de C99 (mas não em C++), valores decimais sem sufixo que não cabem em `long int` são permitidos ter o tipo `unsigned long int`.

Quando usados em uma expressão de controle de [` #if`](<#/doc/preprocessor/conditional>) ou [` #elif`](<#/doc/preprocessor/conditional>), todas as constantes inteiras com sinal agem como se tivessem o tipo [std::intmax_t](<#/doc/types/integer>) e todas as constantes inteiras sem sinal agem como se tivessem o tipo [std::uintmax_t](<#/doc/types/integer>). | (desde C++11)

Devido ao [maximal munch](<#/doc/language/translation_phases>), literais inteiros hexadecimais terminados em `e` e `E`, quando seguidos pelos operadores `+` ou `-`, devem ser separados do operador por espaço em branco ou parênteses no código-fonte:
```cpp
    auto x = 0xE+2.0;   // error
    auto y = 0xa+2.0;   // OK
    auto z = 0xE +2.0;  // OK
    auto q = (0xE)+2.0; // OK
```

Caso contrário, um único token de número de pré-processamento inválido é formado, o que faz com que a análise subsequente falhe.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_binary_literals`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | [Literais binários](<#/doc/language/integer_literal>)
[`__cpp_size_t_suffix`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | Sufixos de literal para [std::size_t](<#/doc/types/size_t>) e sua versão com sinal

### Exemplo

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <type_traits>
    
    int main()
    {
        std::cout << 123 << '\n'
                  << 0123 << '\n'
                  << 0x123 << '\n'
                  << 0b10 << '\n'
                  << 12345678901234567890ull << '\n'
                  << 12345678901234567890u << '\n'; // o tipo é unsigned long long
                                                    // mesmo sem um sufixo long long
    
    //  std::cout << -9223372036854775808 << '\n'; // erro: o valor
                   // 9223372036854775808 não cabe em signed long long, que é o
                   // maior tipo permitido para literal inteiro decimal sem sufixo
        std::cout << -9223372036854775808u << '\n'; // menos unário aplicado a valor
                   // unsigned o subtrai de 2^64, isso resulta em 9223372036854775808
        std::cout << -9223372036854775807 - 1 << '\n'; // maneira correta de calcular
                                                       // o valor -9223372036854775808
    
    #if __cpp_size_t_suffix >= 202011L // C++23
        static_assert(std::is_same_v<decltype(0UZ), std::size_t>);
        static_assert(std::is_same_v<decltype(0Z), std::make_signed_t<std::size_t>>);
    #endif
    }
```

Saída:
```
    123
    83
    291
    2
    12345678901234567890
    12345678901234567890
    9223372036854775808
    -9223372036854775808
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2698](<https://cplusplus.github.io/CWG/issues/2698.html>) | C++23 | um literal inteiro com sufixo-size poderia ter um tipo inteiro estendido | malformado se muito grande

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   5.13.2 Integer literals [lex.icon]
*   Padrão C++20 (ISO/IEC 14882:2020):

    *   5.13.2 Integer literals [lex.icon]
*   Padrão C++17 (ISO/IEC 14882:2017):

    *   5.13.2 Integer literals [lex.icon]
*   Padrão C++14 (ISO/IEC 14882:2014):

    *   2.14.2 Integer literals [lex.icon]
*   Padrão C++11 (ISO/IEC 14882:2011):

    *   2.14.2 Integer literals [lex.icon]
*   Padrão C++98 (ISO/IEC 14882:1998):

    *   2.13.1 Integer literals [lex.icon]

### Veja também

[ literais definidos pelo usuário](<#/doc/language/user_literal>)(C++11) | literais com sufixo definido pelo usuário
[documentação C](<#/>) para constante inteira