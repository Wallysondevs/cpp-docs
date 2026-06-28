# Cabeçalho da biblioteca padrão &lt;cstdint&gt; (C++11)

Este cabeçalho estava originalmente na biblioteca padrão C como [`<stdint.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [suporte a tipos](<#/doc/types>), fornecendo [tipos inteiros de largura fixa](<#/doc/types/integer>) e parte da [interface de limites numéricos C](<#/doc/types/climits>).

### Tipos

---
int8_tint16_tint32_tint64_t(opcional) | tipo inteiro com sinal com largura de exatamente 8, 16, 32 e 64 bits respectivamente
sem bits de preenchimento e usando complemento de 2 para valores negativos
(fornecido se e somente se a implementação suportar diretamente o tipo)
(typedef)
int_fast8_tint_fast16_tint_fast32_tint_fast64_t | tipo inteiro com sinal mais rápido com largura de pelo menos 8, 16, 32 e 64 bits respectivamente
(typedef)
int_least8_tint_least16_tint_least32_tint_least64_t | menor tipo inteiro com sinal com largura de pelo menos 8, 16, 32 e 64 bits respectivamente
(typedef)
intmax_t | tipo inteiro com sinal de largura máxima
(typedef)
intptr_t(opcional) | tipo inteiro com sinal capaz de armazenar um ponteiro para void
(typedef)
uint8_tuint16_tuint32_tuint64_t(opcional) | tipo inteiro sem sinal com largura de exatamente 8, 16, 32 e 64 bits respectivamente
(fornecido se e somente se a implementação suportar diretamente o tipo)
(typedef)
uint_fast8_tuint_fast16_tuint_fast32_tuint_fast64_t | tipo inteiro sem sinal mais rápido com largura de pelo menos 8, 16, 32 e 64 bits respectivamente
(typedef)
uint_least8_tuint_least16_tuint_least32_tuint_least64_t | menor tipo inteiro sem sinal com largura de pelo menos 8, 16, 32 e 64 bits respectivamente
(typedef)
uintmax_t | tipo inteiro sem sinal de largura máxima
(typedef)
uintptr_t(opcional) | tipo inteiro sem sinal capaz de armazenar um ponteiro para void
(typedef)

### Macros

##### Inteiros com sinal: valor mínimo

INT8_MININT16_MININT32_MININT64_MIN(opcional) | valor mínimo de `std::int8_t`, `std::int16_t`, `std::int32_t` e `std::int64_t` respectivamente
(constante de macro)
INT_FAST8_MININT_FAST16_MININT_FAST32_MININT_FAST64_MIN | valor mínimo de `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t` e `std::int_fast64_t` respectivamente
(constante de macro)
INT_LEAST8_MININT_LEAST16_MININT_LEAST32_MININT_LEAST64_MIN | valor mínimo de `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` e `std::int_least64_t` respectivamente
(constante de macro)
INTPTR_MIN(opcional) | valor mínimo de `std::intptr_t`
(constante de macro)
INTMAX_MIN | valor mínimo de `std::intmax_t`
(constante de macro)

##### Inteiros com sinal: valor máximo

INT8_MAXINT16_MAXINT32_MAXINT64_MAX(opcional) | valor máximo de `std::int8_t`, `std::int16_t`, `std::int32_t` e `std::int64_t` respectivamente
(constante de macro)
INT_FAST8_MAXINT_FAST16_MAXINT_FAST32_MAXINT_FAST64_MAX | valor máximo de `std::int_fast8_t`, `std::int_fast16_t`, `std::int_fast32_t` e `std::int_fast64_t` respectivamente
(constante de macro)
INT_LEAST8_MAXINT_LEAST16_MAXINT_LEAST32_MAXINT_LEAST64_MAX | valor máximo de `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` e `std::int_least64_t` respectivamente
(constante de macro)
INTPTR_MAX(opcional) | valor máximo de `std::intptr_t`
(constante de macro)
INTMAX_MAX | valor máximo de `std::intmax_t`
(constante de macro)

##### Inteiros sem sinal: valor máximo

UINT8_MAXUINT16_MAXUINT32_MAXUINT64_MAX(opcional) | valor máximo de `std::uint8_t`, `std::uint16_t`, `std::uint32_t` e `std::uint64_t` respectivamente
(constante de macro)
UINT_FAST8_MAXUINT_FAST16_MAXUINT_FAST32_MAXUINT_FAST64_MAX | valor máximo de `std::uint_fast8_t`, `std::uint_fast16_t`, `std::uint_fast32_t` e `std::uint_fast64_t` respectivamente
(constante de macro)
UINT_LEAST8_MAXUINT_LEAST16_MAXUINT_LEAST32_MAXUINT_LEAST64_MAX | valor máximo de `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t` e `std::uint_least64_t` respectivamente
(constante de macro)
UINTPTR_MAX(opcional) | valor máximo de `std::uintptr_t`
(constante de macro)
UINTMAX_MAX | valor máximo de `std::uintmax_t`
(constante de macro)

##### Limites de outros tipos inteiros

PTRDIFF_MIN(desde C++11) | valor mínimo de [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
(constante de macro)
PTRDIFF_MAX(desde C++11) | valor máximo de [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
(constante de macro)
SIZE_MAX(desde C++11) | valor máximo de [std::size_t](<#/doc/types/size_t>)
(constante de macro)
SIG_ATOMIC_MIN(desde C++11) | valor mínimo de [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>)
(constante de macro)
SIG_ATOMIC_MAX(desde C++11) | valor máximo de [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>)
(constante de macro)
WCHAR_MIN(desde C++11) | valor mínimo de wchar_t
(constante de macro)
WCHAR_MAX(desde C++11) | valor máximo de wchar_t
(constante de macro)
WINT_MIN(desde C++11) | valor mínimo de [`std::wint_t`](<#/doc/string/wide>)
(constante de macro)
WINT_MAX(desde C++11) | valor máximo de [`std::wint_t`](<#/doc/string/wide>)
(constante de macro)

##### Macros de função para constantes inteiras

INT8_CINT16_CINT32_CINT64_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e cujo tipo é o tipo [promovido](<#/doc/language/implicit_cast>) de `std::int_least8_t`, `std::int_least16_t`, `std::int_least32_t` e `std::int_least64_t` respectivamente
(macro de função)
INTMAX_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e o tipo `std::intmax_t`
(macro de função)
UINT8_CUINT16_CUINT32_CUINT64_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e cujo tipo é o tipo [promovido](<#/doc/language/implicit_cast>) de `std::uint_least8_t`, `std::uint_least16_t`, `std::uint_least32_t` e `std::uint_least64_t` respectivamente
(macro de função)
UINTMAX_C | expande para uma expressão constante inteira com o valor especificado por seu argumento e o tipo `std::uintmax_t`
(macro de função)

### Sinopse
```cpp
    namespace std {
      using int8_t         = /* signed integer type */;   // optional
      using int16_t        = /* signed integer type */;   // optional
      using int32_t        = /* signed integer type */;   // optional
      using int64_t        = /* signed integer type */;   // optional
      using intN_t         = /* see description */;       // optional, see description
    
      using int_fast8_t    = /* signed integer type */;
      using int_fast16_t   = /* signed integer type */;
      using int_fast32_t   = /* signed integer type */;
      using int_fast64_t   = /* signed integer type */;
      using int_fastN_t    = /* see description */;       // optional, see description
    
      using int_least8_t   = /* signed integer type */;
      using int_least16_t  = /* signed integer type */;
      using int_least32_t  = /* signed integer type */;
      using int_least64_t  = /* signed integer type */;
      using int_leastN_t   = /* see description */;       // optional, see description
    
      using intmax_t       = /* signed integer type */;
      using intptr_t       = /* signed integer type */;   // optional
    
      using uint8_t        = /* unsigned integer type */; // optional
      using uint16_t       = /* unsigned integer type */; // optional
      using uint32_t       = /* unsigned integer type */; // optional
      using uint64_t       = /* unsigned integer type */; // optional
      using uintN_t        = /* see description */;       // optional, see description
    
      using uint_fast8_t   = /* unsigned integer type */;
      using uint_fast16_t  = /* unsigned integer type */;
      using uint_fast32_t  = /* unsigned integer type */;
      using uint_fast64_t  = /* unsigned integer type */;
      using uint_fastN_t   = /* see description */;       // optional, see description
    
      using uint_least8_t  = /* unsigned integer type */;
      using uint_least16_t = /* unsigned integer type */;
      using uint_least32_t = /* unsigned integer type */;
      using uint_least64_t = /* unsigned integer type */;
      using uint_leastN_t  = /* see description */;       // optional, see description
    
      using uintmax_t      = /* unsigned integer type */;
      using uintptr_t      = /* unsigned integer type */; // optional
    }
    
    #define INTN_MIN         /* see description */
    #define INTN_MAX         /* see description */
    #define UINTN_MAX        /* see description */
    
    #define INT_FASTN_MIN    /* see description */
    #define INT_FASTN_MAX    /* see description */
    #define UINT_FASTN_MAX   /* see description */
    
    #define INT_LEASTN_MIN   /* see description */
    #define INT_LEASTN_MAX   /* see description */
    #define UINT_LEASTN_MAX  /* see description */
    
    #define INTMAX_MIN       /* see description */
    #define INTMAX_MAX       /* see description */
    #define UINTMAX_MAX      /* see description */
    
    #define INTPTR_MIN       /* see description */        // optional
    #define INTPTR_MAX       /* see description */        // optional
    #define UINTPTR_MAX      /* see description */        // optional
    
    #define PTRDIFF_MIN      /* see description */
    #define PTRDIFF_MAX      /* see description */
    #define SIZE_MAX         /* see description */
    
    #define SIG_ATOMIC_MIN   /* see description */
    #define SIG_ATOMIC_MAX   /* see description */
    
    #define WCHAR_MIN        /* see description */
    #define WCHAR_MAX        /* see description */
    
    #define WINT_MIN         /* see description */
    #define WINT_MAX         /* see description */
    
    #define INTN_C(value)    /* see description */
    #define UINTN_C(value)   /* see description */
    #define INTMAX_C(value)  /* see description */
    #define UINTMAX_C(value) /* see description */
```