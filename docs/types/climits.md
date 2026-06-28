# Interface de limites numéricos C

Veja também a interface [std::numeric_limits](<#/doc/types/numeric_limits>).

### Limites de tipos inteiros

##### Limites de tipos inteiros da linguagem principal

---
Definido no header `[<climits>](<#/doc/header/climits>)`

```cpp
CHAR_BIT
(macro constante)
MB_LEN_MAX
(macro constante)
CHAR_MIN
(macro constante)
CHAR_MAX
(macro constante)
SCHAR_MINSHRT_MININT_MINLONG_MINLLONG_MIN(desde C++11)
(macro constante)
SCHAR_MAXSHRT_MAXINT_MAXLONG_MAXLLONG_MAX(desde C++11)
(macro constante)
UCHAR_MAXUSHRT_MAXUINT_MAXULONG_MAXULLONG_MAX(desde C++11)
unsigned long e unsigned long long, respectivamente
(macro constante)
Definido no header `<cwchar>`
Definido no header `<cstdint>`
WCHAR_MIN(desde C++11)
(macro constante)
WCHAR_MAX(desde C++11)
(macro constante)
```

##### Limites de aliases de tipos da biblioteca

Definido no header `[<cstdint>](<#/doc/header/cstdint>)`

```cpp
PTRDIFF_MIN(desde C++11)
(macro constante)
PTRDIFF_MAX(desde C++11)
(macro constante)
SIZE_MAX(desde C++11)
(macro constante)
SIG_ATOMIC_MIN(desde C++11)
(macro constante)
SIG_ATOMIC_MAX(desde C++11)
(macro constante)
WINT_MIN(desde C++11)
(macro constante)
WINT_MAX(desde C++11)
(macro constante)
```

#### Notas

Os tipos dessas constantes, exceto CHAR_BIT e MB_LEN_MAX, devem corresponder aos resultados das [promoções integrais](<#/doc/language/implicit_cast>) aplicadas a objetos dos tipos que descrevem: CHAR_MAX pode ter o tipo int ou unsigned int, mas nunca char. Da mesma forma, USHRT_MAX pode não ser de um tipo unsigned: seu tipo pode ser int.

Uma implementação [freestanding](<#/doc/freestanding>) pode não possuir os typedef names [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>) e/ou [`std::wint_t`](<#/doc/string/wide>), caso em que as macros `SIG_ATOMIC_*` e/ou `WINT_*` estarão correspondentemente ausentes.

#### Exemplo

Execute este código
```cpp
    #include <climits>
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        constexpr int w = 14;
        std::cout << std::left;
    #   define COUT(x) std::cout << std::setw(w) << #x << " = " << x << '\n'
    
        COUT( CHAR_BIT       );
        COUT( MB_LEN_MAX     );
        COUT( CHAR_MIN       );
        COUT( CHAR_MAX       );
        COUT( SCHAR_MIN      );
        COUT( SHRT_MIN       );
        COUT( INT_MIN        );
        COUT( LONG_MIN       );
        COUT( LLONG_MIN      );
        COUT( SCHAR_MAX      );
        COUT( SHRT_MAX       );
        COUT( INT_MAX        );
        COUT( LONG_MAX       );
        COUT( LLONG_MAX      );
        COUT( UCHAR_MAX      );
        COUT( USHRT_MAX      );
        COUT( UINT_MAX       );
        COUT( ULONG_MAX      );
        COUT( ULLONG_MAX     );
        COUT( PTRDIFF_MIN    );
        COUT( PTRDIFF_MAX    );
        COUT( SIZE_MAX       );
        COUT( SIG_ATOMIC_MIN );
        COUT( SIG_ATOMIC_MAX );
        COUT( WCHAR_MIN      );
        COUT( WCHAR_MAX      );
        COUT( WINT_MIN       );
        COUT( WINT_MAX       );
    }
```

Saída possível:
```
    CHAR_BIT       = 8
    MB_LEN_MAX     = 16
    CHAR_MIN       = -128
    CHAR_MAX       = 127
    SCHAR_MIN      = -128
    SHRT_MIN       = -32768
    INT_MIN        = -2147483648
    LONG_MIN       = -9223372036854775808
    LLONG_MIN      = -9223372036854775808
    SCHAR_MAX      = 127
    SHRT_MAX       = 32767
    INT_MAX        = 2147483647
    LONG_MAX       = 92233372036854775807
    LLONG_MAX      = 9223372036854775807
    UCHAR_MAX      = 255
    USHRT_MAX      = 65535
    UINT_MAX       = 4294967295
    ULONG_MAX      = 18446744073709551615
    ULLONG_MAX     = 18446744073709551615
    PTRDIFF_MIN    = -9223372036854775808
    PTRDIFF_MAX    = 9223372036854775807
    SIZE_MAX       = 18446744073709551615
    SIG_ATOMIC_MIN = -2147483648
    SIG_ATOMIC_MAX = 2147483647
    WCHAR_MIN      = -2147483648
    WCHAR_MAX      = 2147483647
    WINT_MIN       = 0
    WINT_MAX       = 4294967295
```

### Limites de tipos de ponto flutuante

Definido no header `[<cfloat>](<#/doc/header/cfloat>)`
---
FLT_RADIX | o radix (base inteira) usado pela representação de todos os três tipos de ponto flutuante
(macro constante)
DECIMAL_DIG(desde C++11) | a conversão de long double para decimal com pelo menos DECIMAL_DIG dígitos e de volta para long double é a conversão de identidade: esta é a precisão decimal necessária para serializar/desserializar um long double (veja também [std::numeric_limits::max_digits10](<#/doc/types/numeric_limits/max_digits10>))
(macro constante)
FLT_DECIMAL_DIGDBL_DECIMAL_DIGLDBL_DECIMAL_DIG(desde C++17) | a conversão de float/double/long double para decimal com pelo menos FLT_DECIMAL_DIG/DBL_DECIMAL_DIG/LDBL_DECIMAL_DIG dígitos e de volta é a conversão de identidade: esta é a precisão decimal necessária para serializar/desserializar um valor de ponto flutuante (veja também [std::numeric_limits::max_digits10](<#/doc/types/numeric_limits/max_digits10>)). Definido para pelo menos 6, 10 e 10, respectivamente, ou 9 para float IEEE e 17 para double IEEE.
(macro constante)
FLT_MINDBL_MINLDBL_MIN | valor positivo normalizado mínimo de float, double e long double, respectivamente
(macro constante)
FLT_TRUE_MINDBL_TRUE_MINLDBL_TRUE_MIN(desde C++17) | valor positivo mínimo de float, double e long double, respectivamente
(macro constante)
FLT_MAXDBL_MAXLDBL_MAX | valor finito máximo de float, double e long double, respectivamente
(macro constante)
FLT_EPSILONDBL_EPSILONLDBL_EPSILON | diferença entre 1.0 e o próximo valor representável para float, double e long double, respectivamente
(macro constante)
FLT_DIGDBL_DIGLDBL_DIG | número de dígitos decimais que são garantidos de serem preservados em uma viagem de ida e volta texto → float/double/long double → texto sem alteração devido a arredondamento ou overflow (veja [std::numeric_limits::digits10](<#/doc/types/numeric_limits/digits10>) para explicação)
(macro constante)
FLT_MANT_DIGDBL_MANT_DIGLDBL_MANT_DIG | número de dígitos na base FLT_RADIX que podem ser representados sem perda de precisão para float, double e long double, respectivamente
(macro constante)
FLT_MIN_EXPDBL_MIN_EXPLDBL_MIN_EXP | menor inteiro negativo tal que FLT_RADIX elevado à potência um a menos que esse inteiro é um float, double e long double normalizado, respectivamente
(macro constante)
FLT_MIN_10_EXPDBL_MIN_10_EXPLDBL_MIN_10_EXP | menor inteiro negativo tal que 10 elevado a essa potência é um float, double e long double normalizado, respectivamente
(macro constante)
FLT_MAX_EXPDBL_MAX_EXPLDBL_MAX_EXP | maior inteiro positivo tal que FLT_RADIX elevado à potência um a menos que esse inteiro é um float, double e long double finito representável, respectivamente
(macro constante)
FLT_MAX_10_EXPDBL_MAX_10_EXPLDBL_MAX_10_EXP | maior inteiro positivo tal que 10 elevado a essa potência é um float, double e long double finito representável, respectivamente
(macro constante)
[ FLT_ROUNDS](<#/doc/types/climits/FLT_ROUNDS>) | modo de arredondamento padrão da aritmética de ponto flutuante
(macro constante)
[ FLT_EVAL_METHOD](<#/doc/types/climits/FLT_EVAL_METHOD>)(desde C++11) | especifica em qual precisão todas as operações aritméticas são realizadas
(macro constante)
FLT_HAS_SUBNORMDBL_HAS_SUBNORMLDBL_HAS_SUBNORM(desde C++17) | especifica se o tipo suporta números subnormais ([denormal](<https://en.wikipedia.org/wiki/Denormal_number> "enwiki:Denormal number")): -1 – indeterminável, ​0​ – ausente, 1 – presente
(macro constante)

#### Exemplo

Execute este código
```cpp
    #include <cfloat>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        int w = 16;
        std::cout << std::left; // std::cout << std::setprecision(53);
    #   define COUT(x) std::cout << std::setw(w) << #x << " = " << x << '\n'
    
        COUT( FLT_RADIX        );
        COUT( DECIMAL_DIG      );
        COUT( FLT_DECIMAL_DIG  );
        COUT( DBL_DECIMAL_DIG  );
        COUT( LDBL_DECIMAL_DIG );
        COUT( FLT_MIN          );
        COUT( DBL_MIN          );
        COUT( LDBL_MIN         );
        COUT( FLT_TRUE_MIN     );
        COUT( DBL_TRUE_MIN     );
        COUT( LDBL_TRUE_MIN    );
        COUT( FLT_MAX          );
        COUT( DBL_MAX          );
        COUT( LDBL_MAX         );
        COUT( FLT_EPSILON      );
        COUT( DBL_EPSILON      );
        COUT( LDBL_EPSILON     );
        COUT( FLT_DIG          );
        COUT( DBL_DIG          );
        COUT( LDBL_DIG         );
        COUT( FLT_MANT_DIG     );
        COUT( DBL_MANT_DIG     );
        COUT( LDBL_MANT_DIG    );
        COUT( FLT_MIN_EXP      );
        COUT( DBL_MIN_EXP      );
        COUT( LDBL_MIN_EXP     );
        COUT( FLT_MIN_10_EXP   );
        COUT( DBL_MIN_10_EXP   );
        COUT( LDBL_MIN_10_EXP  );
        COUT( FLT_MAX_EXP      );
        COUT( DBL_MAX_EXP      );
        COUT( LDBL_MAX_EXP     );
        COUT( FLT_MAX_10_EXP   );
        COUT( DBL_MAX_10_EXP   );
        COUT( LDBL_MAX_10_EXP  );
        COUT( FLT_ROUNDS       );
        COUT( FLT_EVAL_METHOD  );
        COUT( FLT_HAS_SUBNORM  );
        COUT( DBL_HAS_SUBNORM  );
        COUT( LDBL_HAS_SUBNORM );
    }
```

Saída possível:
```
    FLT_RADIX        = 2
    DECIMAL_DIG      = 21
    FLT_DECIMAL_DIG  = 9
    DBL_DECIMAL_DIG  = 17
    LDBL_DECIMAL_DIG = 21
    FLT_MIN          = 1.17549e-38
    DBL_MIN          = 2.22507e-308
    LDBL_MIN         = 3.3621e-4932
    FLT_TRUE_MIN     = 1.4013e-45
    DBL_TRUE_MIN     = 4.94066e-324
    LDBL_TRUE_MIN    = 3.6452e-4951
    FLT_MAX          = 3.40282e+38
    DBL_MAX          = 1.79769e+308
    LDBL_MAX         = 1.18973e+4932
    FLT_EPSILON      = 1.19209e-07
    DBL_EPSILON      = 2.22045e-16
    LDBL_EPSILON     = 1.0842e-19
    FLT_DIG          = 6
    DBL_DIG          = 15
    LDBL_DIG         = 18
    FLT_MANT_DIG     = 24
    DBL_MANT_DIG     = 53
    LDBL_MANT_DIG    = 64
    FLT_MIN_EXP      = -125
    DBL_MIN_EXP      = -1021
    LDBL_MIN_EXP     = -16381
    FLT_MIN_10_EXP   = -37
    DBL_MIN_10_EXP   = -307
    LDBL_MIN_10_EXP  = -4931
    FLT_MAX_EXP      = 128
    DBL_MAX_EXP      = 1024
    LDBL_MAX_EXP     = 16384
    FLT_MAX_10_EXP   = 38
    DBL_MAX_10_EXP   = 308
    LDBL_MAX_10_EXP  = 4932
    FLT_ROUNDS       = 1
    FLT_EVAL_METHOD  = 0
    FLT_HAS_SUBNORM  = 1
    DBL_HAS_SUBNORM  = 1
    LDBL_HAS_SUBNORM = 1
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 416](<https://cplusplus.github.io/LWG/issue416>) | C++98 | não estava claro se os tipos das macros em [`<climits>`](<#/doc/header/climits>) são garantidos de corresponder ao tipo ao qual se referem (C++ se refere a C, e C diz que não) | esclarecido como não garantido

### Veja também

* [Tipos inteiros de largura fixa](<#/doc/types/integer>)
* [Tipos aritméticos](<#/doc/language/types>)
* [Visão geral do sistema de tipos C++](<#/doc/language/type-id>)
* [Suporte a tipos (tipos básicos, RTTI, type traits)](<#/doc/types>)

[Documentação C](<#/>) para limites numéricos
---
* [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão