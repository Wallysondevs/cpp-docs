# Cabeçalho da biblioteca padrão &lt;stdatomic.h&gt;

Este cabeçalho era originalmente da biblioteca padrão C.

Este cabeçalho faz parte da [biblioteca de suporte à concorrência](<#/doc/atomic>).

Não é especificado se `<stdatomic.h>` fornece quaisquer declarações no namespace `std`.

### Macros
---
[ _Atomic](<#/doc/atomic/atomic>)(C++23) | macro de compatibilidade tal que _Atomic(T) é idêntico a [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;
(macro de função)
[ ATOMIC_FLAG_INIT](<#/doc/atomic/ATOMIC_FLAG_INIT>)(C++11) | inicializa um [std::atomic_flag](<#/doc/atomic/atomic_flag>) para false
(macro constante)

### Tipos

[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) | o tipo atômico booleano lock-free
(classe)
[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[ atomic_bool](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;bool&gt;
(typedef)
[ atomic_char](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;char&gt;
(typedef)
[ atomic_schar](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;signed char&gt;
(typedef)
[ atomic_uchar](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned char&gt;
(typedef)
[ atomic_short](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;short&gt;
(typedef)
[ atomic_ushort](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned short&gt;
(typedef)
[ atomic_int](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;int&gt;
(typedef)
[ atomic_uint](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned int&gt;
(typedef)
[ atomic_long](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;long&gt;
(typedef)
[ atomic_ulong](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned long&gt;
(typedef)
[ atomic_llong](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;long long&gt;
(typedef)
[ atomic_ullong](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned long long&gt;
(typedef)
[ atomic_char8_t](<#/doc/atomic/atomic>)(C++20) | [std::atomic](<#/doc/atomic/atomic>)<char8_t>
(typedef)
[ atomic_char16_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<char16_t>
(typedef)
[ atomic_char32_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<char32_t>
(typedef)
[ atomic_wchar_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<wchar_t>
(typedef)
[ atomic_int8_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint8_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int16_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint16_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int32_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint32_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int64_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint64_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least8_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least8_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least16_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least16_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least32_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least32_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least64_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least64_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast8_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast8_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast16_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast16_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast32_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast32_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast64_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast64_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_intptr_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::intptr_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uintptr_t](<#/doc/atomic/atomic>)(C++11)(optional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uintptr_t](<#/doc/types/integer>)>
(typedef)
[ atomic_size_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::size_t](<#/doc/types/size_t>)>
(typedef)
[ atomic_ptrdiff_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::ptrdiff_t](<#/doc/types/ptrdiff_t>)>
(typedef)
[ atomic_intmax_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::intmax_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uintmax_t](<#/doc/atomic/atomic>)(C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uintmax_t](<#/doc/types/integer>)>
(typedef)

### Funções

[ atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(C++11) | verifica se as operações do tipo atômico são lock-free
(modelo de função)
[ atomic_storeatomic_store_explicit](<#/doc/atomic/atomic_store>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico
(modelo de função)
[ atomic_loadatomic_load_explicit](<#/doc/atomic/atomic_load>)(C++11)(C++11) | obtém atomicamente o valor armazenado em um objeto atômico
(modelo de função)
[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico e retorna o valor antigo do atômico
(modelo de função)
[ atomic_compare_exchange_weakatomic_compare_exchange_weak_explicitatomic_compare_exchange_strongatomic_compare_exchange_strong_explicit](<#/doc/atomic/atomic_compare_exchange>)(C++11)(C++11)(C++11)(C++11) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se forem iguais ou uma leitura atômica se não forem
(modelo de função)
[ atomic_fetch_addatomic_fetch_add_explicit](<#/doc/atomic/atomic_fetch_add>)(C++11)(C++11) | adiciona um valor não atômico a um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_subatomic_fetch_sub_explicit](<#/doc/atomic/atomic_fetch_sub>)(C++11)(C++11) | subtrai um valor não atômico de um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_andatomic_fetch_and_explicit](<#/doc/atomic/atomic_fetch_and>)(C++11)(C++11) | substitui o objeto atômico pelo resultado de um AND bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_oratomic_fetch_or_explicit](<#/doc/atomic/atomic_fetch_or>)(C++11)(C++11) | substitui o objeto atômico pelo resultado de um OR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_xoratomic_fetch_xor_explicit](<#/doc/atomic/atomic_fetch_xor>)(C++11)(C++11) | substitui o objeto atômico pelo resultado de um XOR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_flag_test_and_setatomic_flag_test_and_set_explicit](<#/doc/atomic/atomic_flag_test_and_set>)(C++11)(C++11) | define atomicamente a flag como true e retorna seu valor anterior
(função)
[ atomic_flag_clearatomic_flag_clear_explicit](<#/doc/atomic/atomic_flag_clear>)(C++11)(C++11) | define atomicamente o valor da flag como false
(função)
[ atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>)(C++11) | primitiva de sincronização de fence genérica dependente da ordem de memória
(função)
[ atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)(C++11) | fence entre uma thread e um manipulador de sinal executado na mesma thread
(função)

### Sinopse
```cpp
    template<class T>
      using __std_atomic = std::atomic<T>;        // exposition only
     
    #define _Atomic(T) __std_atomic<T>
     
    #define ATOMIC_BOOL_LOCK_FREE /* see description */
    #define ATOMIC_CHAR_LOCK_FREE /* see description */
    #define ATOMIC_CHAR16_T_LOCK_FREE /* see description */
    #define ATOMIC_CHAR32_T_LOCK_FREE /* see description */
    #define ATOMIC_WCHAR_T_LOCK_FREE /* see description */
    #define ATOMIC_SHORT_LOCK_FREE /* see description */
    #define ATOMIC_INT_LOCK_FREE /* see description */
    #define ATOMIC_LONG_LOCK_FREE /* see description */
    #define ATOMIC_LLONG_LOCK_FREE /* see description */
    #define ATOMIC_POINTER_LOCK_FREE /* see description */
     
    using std::memory_order;                // see description
    using std::memory_order_relaxed;        // see description
    using std::memory_order_consume;        // see description
    using std::memory_order_acquire;        // see description
    using std::memory_order_release;        // see description
    using std::memory_order_acq_rel;        // see description
    using std::memory_order_seq_cst;        // see description
     
    using std::atomic_flag;                 // see description
     
    using std::atomic_bool;                 // see description
    using std::atomic_char;                 // see description
    using std::atomic_schar;                // see description
    using std::atomic_uchar;                // see description
    using std::atomic_short;                // see description
    using std::atomic_ushort;               // see description
    using std::atomic_int;                  // see description
    using std::atomic_uint;                 // see description
    using std::atomic_long;                 // see description
    using std::atomic_ulong;                // see description
    using std::atomic_llong;                // see description
    using std::atomic_ullong;               // see description
    using std::atomic_char8_t;              // see description
    using std::atomic_char16_t;             // see description
    using std::atomic_char32_t;             // see description
    using std::atomic_wchar_t;              // see description
    using std::atomic_int8_t;               // see description
    using std::atomic_uint8_t;              // see description
    using std::atomic_int16_t;              // see description
    using std::atomic_uint16_t;             // see description
    using std::atomic_int32_t;              // see description
    using std::atomic_uint32_t;             // see description
    using std::atomic_int64_t;              // see description
    using std::atomic_uint64_t;             // see description
    using std::atomic_int_least8_t;         // see description
    using std::atomic_uint_least8_t;        // see description
    using std::atomic_int_least16_t;        // see description
    using std::atomic_uint_least16_t;       // see description
    using std::atomic_int_least32_t;        // see description
    using std::atomic_uint_least32_t;       // see description
    using std::atomic_int_least64_t;        // see description
    using std::atomic_uint_least64_t;       // see description
    using std::atomic_int_fast8_t;          // see description
    using std::atomic_uint_fast8_t;         // see description
    using std::atomic_int_fast16_t;         // see description
    using std::atomic_uint_fast16_t;        // see description
    using std::atomic_int_fast32_t;         // see description
    using std::atomic_uint_fast32_t;        // see description
    using std::atomic_int_fast64_t;         // see description
    using std::atomic_uint_fast64_t;        // see description
    using std::atomic_intptr_t;             // see description
    using std::atomic_uintptr_t;            // see description
    using std::atomic_size_t;               // see description
    using std::atomic_ptrdiff_t;            // see description
    using std::atomic_intmax_t;             // see description
    using std::atomic_uintmax_t;            // see description
     
    using std::atomic_is_lock_free;                         // see description
    using std::atomic_load;                                 // see description
    using std::atomic_load_explicit;                        // see description
    using std::atomic_store;                                // see description
    using std::atomic_store_explicit;                       // see description
    using std::atomic_exchange;                             // see description
    using std::atomic_exchange_explicit;                    // see description
    using std::atomic_compare_exchange_strong;              // see description
    using std::atomic_compare_exchange_strong_explicit;     // see description
    using std::atomic_compare_exchange_weak;                // see description
    using std::atomic_compare_exchange_weak_explicit;       // see description
    using std::atomic_fetch_add;                            // see description
    using std::atomic_fetch_add_explicit;                   // see description
    using std::atomic_fetch_sub;                            // see description
    using std::atomic_fetch_sub_explicit;                   // see description
    using std::atomic_fetch_or;                             // see description
    using std::atomic_fetch_or_explicit;                    // see description
    using std::atomic_fetch_xor;                            // see description
    using std::atomic_fetch_xor_explicit;                   // see description
    using std::atomic_fetch_and;                            // see description
    using std::atomic_fetch_and_explicit;                   // see description
    using std::atomic_flag_test_and_set;                    // see description
    using std::atomic_flag_test_and_set_explicit;           // see description
    using std::atomic_flag_clear;                           // see description
    using std::atomic_flag_clear_explicit;                  // see description
     
    #define ATOMIC_FLAG_INIT /* see description */
     
    using std::atomic_thread_fence;                         // see description
    using std::atomic_signal_fence;                         // see description
```