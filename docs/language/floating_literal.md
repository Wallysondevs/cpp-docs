# Literal de ponto flutuante

Um literal de ponto flutuante define uma constante em tempo de compilação cujo valor é especificado no arquivo fonte.

### Sintaxe

---
digit-sequence decimal-exponent suffix ﻿(opcional) | (1) |
---|---|---
digit-sequence `.` decimal-exponent ﻿(opcional) suffix ﻿(opcional) | (2) |
digit-sequence ﻿(opcional) `.` digit-sequence decimal-exponent ﻿(opcional) suffix ﻿(opcional) | (3) |
`0x` | `0X` hex-digit-sequence hex-exponent suffix ﻿(opcional) | (4) | (desde C++17)
`0x` | `0X` hex-digit-sequence `.` hex-exponent suffix ﻿(opcional) | (5) | (desde C++17)
`0x` | `0X` hex-digit-sequence ﻿(opcional) `.` hex-digit-sequence hex-exponent suffix ﻿(opcional) | (6) | (desde C++17)

1) sequência de dígitos representando um número inteiro sem um separador decimal; neste caso, o expoente não é opcional: 1e10, 1e-5L.

2) sequência de dígitos representando um número inteiro com um separador decimal; neste caso, o expoente é opcional: 1., 1.e-2.

3) sequência de dígitos representando um número fracionário. O expoente é opcional: 3.14, .1f, 0.1e-1L.

4) Sequência de dígitos hexadecimais representando um número inteiro sem um separador de base. O expoente nunca é opcional para literais de ponto flutuante hexadecimais: 0x1ffp10, 0X0p-1.

5) Sequência de dígitos hexadecimais representando um número inteiro com um separador de base. O expoente nunca é opcional para literais de ponto flutuante hexadecimais: 0x1.p0, 0xf.p-1.

6) Sequência de dígitos hexadecimais representando um número fracionário com um separador de base. O expoente nunca é opcional para literais de ponto flutuante hexadecimais: 0x0.123p-1, 0xa.bp10l.

decimal-exponent tem a forma

---
`e` | `E` exponent-sign ﻿(opcional) digit-sequence

hex-exponent tem a forma

---
`p` | `P` exponent-sign ﻿(opcional) digit-sequence | | (desde C++17)

exponent-sign, se presente, é `+` ou `-`

suffix, se presente, é um de `f`, `l`, `F`, `L` , `f16`, `f32`, `f64`, `f128`, `bf16`, `F16`, `F32`, `F64`, `F128`, `BF16`(desde C++23). O sufixo determina o tipo do literal de ponto flutuante:

*   (sem sufixo) define double
*   `f F` define float
*   `l L` define long double
*   `f16 F16` define std::float16_t
*   `f32 F32` define std::float32_t
*   `f64 F64` define std::float64_t
*   `f128 F128` define std::float128_t
*   `bf16 BF16` define std::bfloat16_t

| (desde C++23)

Aspas simples opcionais (') podem ser inseridas entre os dígitos como um separador; elas são ignoradas ao determinar o valor do literal. | (desde C++14)

### Explicação

É usada a notação científica decimal, o que significa que o valor do literal de ponto flutuante é o significando multiplicado pelo número 10 elevado à potência de decimal-exponent. Por exemplo, o significado matemático de 123e4 é _123×10 4_.

Se o literal flutuante começar com a sequência de caracteres `0x` ou `0X`, o literal flutuante é um _literal flutuante hexadecimal_. Caso contrário, é um _literal flutuante decimal_. Para um _literal flutuante hexadecimal_, o significando é interpretado como um número racional hexadecimal, e a sequência de dígitos do expoente é interpretada como a potência inteira (decimal) de 2 pela qual o significando deve ser escalado. double d = 0x1.4p3;`// fração hexadecimal 1.4 (decimal 1.25) escalada por 23, ou seja, 10.0` | (desde C++17)

### Notas

Os literais de ponto flutuante hexadecimais não faziam parte do C++ até C++17, embora pudessem ser analisados e impressos pelas funções de E/S desde C++11: tanto os streams de E/S do C++ quando [std::hexfloat](<#/doc/io/manip/fixed>) está habilitado quanto os streams de E/S do C: [std::printf](<#/doc/io/c/printf>), [std::scanf](<#/doc/io/c/scanf>), etc. Veja [std::strtof](<#/doc/string/byte/strtof>) para a descrição do formato.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_hex_float`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | Literais flutuantes hexadecimais

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <typeinfo>
    
    #define OUT(x) '\n' << std::setw(16) << #x << x
    
    int main()
    {
        std::cout
            << "Literal" "\t" "Printed value" << std::left
            << OUT( 58.            ) // double
            << OUT( 4e2            ) // double
            << OUT( 123.456e-67    ) // double
            << OUT( 123.456e-67f   ) // float, truncado para zero
            << OUT( .1E4f          ) // float
            << OUT( 0x10.1p0       ) // double
            << OUT( 0x1p5          ) // double
            << OUT( 0x1e5          ) // literal inteiro, não de ponto flutuante
            << OUT( 3.14'15'92     ) // double, aspas simples ignoradas (C++14)
            << OUT( 1.18e-4932l    ) // long double
            << std::setprecision(39)
            << OUT( 3.4028234e38f  ) // float
            << OUT( 3.4028234e38   ) // double
            << OUT( 3.4028234e38l  ) // long double
            << '\n';
    
        static_assert(3.4028234e38f == std::numeric_limits<float>::max());
    
        static_assert(3.4028234e38f ==  // termina com 4
                      3.4028235e38f);   // termina com 5
    
        static_assert(3.4028234e38 !=   // termina com 4
                      3.4028235e38);    // termina com 5
    
        // Ambas as constantes de ponto flutuante abaixo são 3.4028234e38
        static_assert(3.4028234e38f !=  // um float (então promovido para double)
                      3.4028234e38);    // um double
    }
```

Saída possível:
```
    Literal         Printed value
    58.             58
    4e2             400
    123.456e-67     1.23456e-65
    123.456e-67f    0
    .1E4f           1000
    0x10.1p0        16.0625
    0x1p5           32
    0x1e5           485
    3.14'15'92      3.14159
    1.18e-4932l     1.18e-4932
    3.4028234e38f   340282346638528859811704183484516925440
    3.4028234e38    340282339999999992395853996843190976512
    3.4028234e38l   340282339999999999995912555211526242304
```

### Referências

*   padrão C++23 (ISO/IEC 14882:2024):
    *   5.13.4 Literais de ponto flutuante [lex.fcon]
*   padrão C++20 (ISO/IEC 14882:2020):
    *   5.13.4 Literais de ponto flutuante [lex.fcon]
*   padrão C++17 (ISO/IEC 14882:2017):
    *   5.13.4 Literais flutuantes [lex.fcon]
*   padrão C++14 (ISO/IEC 14882:2014):
    *   2.14.4 Literais flutuantes [lex.fcon]
*   padrão C++11 (ISO/IEC 14882:2011):
    *   2.14.4 Literais flutuantes [lex.fcon]
*   padrão C++98 (ISO/IEC 14882:1998):
    *   2.13.3 Literais flutuantes [lex.fcon]

### Veja também

[ literais definidos pelo usuário](<#/doc/language/user_literal>)(C++11) | literais com sufixo definido pelo usuário
[documentação C](<#/>) para constante de ponto flutuante