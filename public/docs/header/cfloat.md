# Cabeçalho da biblioteca padrão &lt;cfloat&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<float.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [suporte a tipos](<#/doc/types>), em particular, é parte da [interface de limites numéricos C](<#/doc/types/climits>).

### Macros

FLT_RADIX | a base (inteira) usada pela representação de todos os três tipos de ponto flutuante
(constante de macro)
DECIMAL_DIG(desde C++11) | conversão de long double para decimal com pelo menos [DECIMAL_DIG](<#/doc/types/climits>) dígitos e de volta para long double é a conversão de identidade: esta é a precisão decimal necessária para serializar/desserializar um long double (veja também [std::numeric_limits::max_digits10](<#/doc/types/numeric_limits/max_digits10>))
(constante de macro)
FLT_DECIMAL_DIGDBL_DECIMAL_DIGLDBL_DECIMAL_DIG(desde C++17) | conversão de float/double/long double para decimal com pelo menos [FLT_DECIMAL_DIG](<#/doc/types/climits>)/[DBL_DECIMAL_DIG](<#/doc/types/climits>)/[LDBL_DECIMAL_DIG](<#/doc/types/climits>) dígitos e de volta é a conversão de identidade: esta é a precisão decimal necessária para serializar/desserializar um valor de ponto flutuante (veja também [std::numeric_limits::max_digits10](<#/doc/types/numeric_limits/max_digits10>)). Definido para pelo menos 6, 10 e 10, respectivamente, ou 9 para float IEEE e 17 para double IEEE.
(constante de macro)
FLT_MINDBL_MINLDBL_MIN | valor positivo normalizado mínimo de float, double e long double, respectivamente
(constante de macro)
FLT_TRUE_MINDBL_TRUE_MINLDBL_TRUE_MIN(desde C++17) | valor positivo mínimo de float, double e long double, respectivamente
(constante de macro)
FLT_MAXDBL_MAXLDBL_MAX | valor finito máximo de float, double e long double, respectivamente
(constante de macro)
FLT_EPSILONDBL_EPSILONLDBL_EPSILON | diferença entre 1.0 e o próximo valor representável para float, double e long double, respectivamente
(constante de macro)
FLT_DIGDBL_DIGLDBL_DIG | número de dígitos decimais que são garantidos para serem preservados em uma viagem de ida e volta texto → float/double/long double → texto sem alteração devido a arredondamento ou estouro (veja [std::numeric_limits::digits10](<#/doc/types/numeric_limits/digits10>) para explicação)
(constante de macro)
FLT_MANT_DIGDBL_MANT_DIGLDBL_MANT_DIG | número de dígitos na base [FLT_RADIX](<#/doc/types/climits>) que podem ser representados sem perda de precisão para float, double e long double, respectivamente
(constante de macro)
FLT_MIN_EXPDBL_MIN_EXPLDBL_MIN_EXP | inteiro negativo mínimo tal que [FLT_RADIX](<#/doc/types/climits>) elevado à potência um a menos que esse inteiro é um float, double e long double normalizado, respectivamente
(constante de macro)
FLT_MIN_10_EXPDBL_MIN_10_EXPLDBL_MIN_10_EXP | inteiro negativo mínimo tal que 10 elevado a essa potência é um float, double e long double normalizado, respectivamente
(constante de macro)
FLT_MAX_EXPDBL_MAX_EXPLDBL_MAX_EXP | inteiro positivo máximo tal que [FLT_RADIX](<#/doc/types/climits>) elevado à potência um a menos que esse inteiro é um float, double e long double finito representável, respectivamente
(constante de macro)
FLT_MAX_10_EXPDBL_MAX_10_EXPLDBL_MAX_10_EXP | inteiro positivo máximo tal que 10 elevado a essa potência é um float, double e long double finito representável, respectivamente
(constante de macro)
[ FLT_ROUNDS](<#/doc/types/climits/FLT_ROUNDS>) | modo de arredondamento padrão da aritmética de ponto flutuante
(constante de macro)
[ FLT_EVAL_METHOD](<#/doc/types/climits/FLT_EVAL_METHOD>)(desde C++11) | especifica em qual precisão todas as operações aritméticas são realizadas
(constante de macro)
FLT_HAS_SUBNORMDBL_HAS_SUBNORMLDBL_HAS_SUBNORM(desde C++17) | especifica se o tipo suporta números subnormais ([denormais](<https://en.wikipedia.org/wiki/Denormal_number> "enwiki:Denormal number")) :
-1 – indeterminável, ​0​ – ausente, 1 – presente
(constante de macro)

### Sinopse
```cpp
    #define FLT_ROUNDS           /* see definition */
    #define FLT_EVAL_METHOD      /* see definition */
    #define FLT_HAS_SUBNORM      /* see definition */
    #define DBL_HAS_SUBNORM      /* see definition */
    #define LDBL_HAS_SUBNORM     /* see definition */
    #define FLT_RADIX            /* see definition */
    #define FLT_MANT_DIG         /* see definition */
    #define DBL_MANT_DIG         /* see definition */
    #define LDBL_MANT_DIG        /* see definition */
    #define FLT_DECIMAL_DIG      /* see definition */
    #define DBL_DECIMAL_DIG      /* see definition */
    #define LDBL_DECIMAL_DIG     /* see definition */
    #define DECIMAL_DIG          /* see definition */
    #define FLT_DIG              /* see definition */
    #define DBL_DIG              /* see definition */
    #define LDBL_DIG             /* see definition */
    #define FLT_MIN_EXP          /* see definition */
    #define DBL_MIN_EXP          /* see definition */
    #define LDBL_MIN_EXP         /* see definition */
    #define FLT_MIN_10_EXP       /* see definition */
    #define DBL_MIN_10_EXP       /* see definition */
    #define LDBL_MIN_10_EXP      /* see definition */
    #define FLT_MAX_EXP          /* see definition */
    #define DBL_MAX_EXP          /* see definition */
    #define LDBL_MAX_EXP         /* see definition */
    #define FLT_MAX_10_EXP       /* see definition */
    #define DBL_MAX_10_EXP       /* see definition */
    #define LDBL_MAX_10_EXP      /* see definition */
    #define FLT_MAX              /* see definition */
    #define DBL_MAX              /* see definition */
    #define LDBL_MAX             /* see definition */
    #define FLT_EPSILON          /* see definition */
    #define DBL_EPSILON          /* see definition */
    #define LDBL_EPSILON         /* see definition */
    #define FLT_MIN              /* see definition */
    #define DBL_MIN              /* see definition */
    #define LDBL_MIN             /* see definition */
    #define FLT_TRUE_MIN         /* see definition */
    #define DBL_TRUE_MIN         /* see definition */
    #define LDBL_TRUE_MIN        /* see definition */
```

### Veja também

[documentação C](<#/>) para Limites de tipos de ponto flutuante
---