# Cabeçalho da biblioteca padrão &lt;climits&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<limits.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [suporte a tipos](<#/doc/types>), em particular, faz parte da [interface de limites numéricos C](<#/doc/types/climits>).

### Macros

CHAR_BIT | largura em bits de um byte
(macro constante)
MB_LEN_MAX | número máximo de bytes em um caractere multibyte
(macro constante)
CHAR_MIN | valor mínimo de char
(macro constante)
CHAR_MAX | valor máximo de char
(macro constante)
SCHAR_MINSHRT_MININT_MINLONG_MINLLONG_MIN(desde C++11) | valor mínimo de signed char, short, int, long e long long, respectivamente
(macro constante)
SCHAR_MAXSHRT_MAXINT_MAXLONG_MAXLLONG_MAX(desde C++11) | valor máximo de signed char, short, int, long e long long, respectivamente
(macro constante)
UCHAR_MAXUSHRT_MAXUINT_MAXULONG_MAXULLONG_MAX(desde C++11) | valor máximo de unsigned char, unsigned short, unsigned int,
unsigned long e unsigned long long, respectivamente
(macro constante)

### Sinopse
```cpp
    #define CHAR_BIT      /* see definition */
    #define SCHAR_MIN     /* see definition */
    #define SCHAR_MAX     /* see definition */
    #define UCHAR_MAX     /* see definition */
    #define CHAR_MIN      /* see definition */
    #define CHAR_MAX      /* see definition */
    #define MB_LEN_MAX    /* see definition */
    #define SHRT_MIN      /* see definition */
    #define SHRT_MAX      /* see definition */
    #define USHRT_MAX     /* see definition */
    #define INT_MIN       /* see definition */
    #define INT_MAX       /* see definition */
    #define UINT_MAX      /* see definition */
    #define LONG_MIN      /* see definition */
    #define LONG_MAX      /* see definition */
    #define ULONG_MAX     /* see definition */
    #define LLONG_MIN     /* see definition */
    #define LLONG_MAX     /* see definition */
    #define ULLONG_MAX    /* see definition */
```