# Header da biblioteca padrão &lt;atomic&gt; (desde C++11)

Este header faz parte da [biblioteca de suporte à concorrência](<#/doc/atomic>).

### Classes

---
[ atomic](<#/doc/atomic/atomic>)(desde C++11) | modelo de classe atomic e especializações para tipos bool, integral, de ponto flutuante,(desde C++20) e ponteiro
(modelo de classe)
[ atomic_ref](<#/doc/atomic/atomic_ref>)(desde C++20) | fornece operações atômicas em objetos não atômicos
(modelo de classe)
[ atomic_flag](<#/doc/atomic/atomic_flag>)(desde C++11) | o tipo atômico booleano lock-free
(classe)
[ memory_order](<#/doc/atomic/memory_order>)(desde C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[ atomic_bool](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;bool&gt;
(typedef)
[ atomic_char](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;char&gt;
(typedef)
[ atomic_schar](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;signed char&gt;
(typedef)
[ atomic_uchar](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned char&gt;
(typedef)
[ atomic_short](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;short&gt;
(typedef)
[ atomic_ushort](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned short&gt;
(typedef)
[ atomic_int](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;int&gt;
(typedef)
[ atomic_uint](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned int&gt;
(typedef)
[ atomic_long](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;long&gt;
(typedef)
[ atomic_ulong](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned long&gt;
(typedef)
[ atomic_llong](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;long long&gt;
(typedef)
[ atomic_ullong](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)&lt;unsigned long long&gt;
(typedef)
[ atomic_char8_t](<#/doc/atomic/atomic>)(desde C++20) | [std::atomic](<#/doc/atomic/atomic>)<char8_t>
(typedef)
[ atomic_char16_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<char16_t>
(typedef)
[ atomic_char32_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<char32_t>
(typedef)
[ atomic_wchar_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<wchar_t>
(typedef)
[ atomic_int8_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint8_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int16_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint16_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int32_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint32_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int64_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::int64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint64_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least8_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least8_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least16_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least16_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least32_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least32_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_least64_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_least64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_least64_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_least64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast8_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast8_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast8_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast16_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast16_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast16_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast32_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast32_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast32_t](<#/doc/types/integer>)>
(typedef)
[ atomic_int_fast64_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::int_fast64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uint_fast64_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uint_fast64_t](<#/doc/types/integer>)>
(typedef)
[ atomic_intptr_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::intptr_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uintptr_t](<#/doc/atomic/atomic>)(desde C++11)(opcional) | [std::atomic](<#/doc/atomic/atomic>)<[std::uintptr_t](<#/doc/types/integer>)>
(typedef)
[ atomic_size_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::size_t](<#/doc/types/size_t>)>
(typedef)
[ atomic_ptrdiff_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::ptrdiff_t](<#/doc/types/ptrdiff_t>)>
(typedef)
[ atomic_intmax_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::intmax_t](<#/doc/types/integer>)>
(typedef)
[ atomic_uintmax_t](<#/doc/atomic/atomic>)(desde C++11) | [std::atomic](<#/doc/atomic/atomic>)<[std::uintmax_t](<#/doc/types/integer>)>
(typedef)
[ atomic_signed_lock_free](<#/doc/atomic/atomic>)(desde C++20) | um tipo atômico integral com sinal que é lock-free e para o qual esperar/notificar é mais eficiente
(typedef)
[ atomic_unsigned_lock_free](<#/doc/atomic/atomic>)(desde C++20) | um tipo atômico integral sem sinal que é lock-free e para o qual esperar/notificar é mais eficiente
(typedef)

### Funções

[ atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(desde C++11) | verifica se as operações do tipo atômico são lock-free
(modelo de função)
[ atomic_storeatomic_store_explicit](<#/doc/atomic/atomic_store>)(desde C++11)(desde C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico
(modelo de função)
[ atomic_loadatomic_load_explicit](<#/doc/atomic/atomic_load>)(desde C++11)(desde C++11) | obtém atomicamente o valor armazenado em um objeto atômico
(modelo de função)
[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(desde C++11)(desde C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico e retorna o valor antigo do atômico
(modelo de função)
[ atomic_compare_exchange_weakatomic_compare_exchange_weak_explicitatomic_compare_exchange_strongatomic_compare_exchange_strong_explicit](<#/doc/atomic/atomic_compare_exchange>)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se forem iguais ou um carregamento atômico se não forem
(modelo de função)
[ atomic_fetch_addatomic_fetch_add_explicit](<#/doc/atomic/atomic_fetch_add>)(desde C++11)(desde C++11) | adiciona um valor não atômico a um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_subatomic_fetch_sub_explicit](<#/doc/atomic/atomic_fetch_sub>)(desde C++11)(desde C++11) | subtrai um valor não atômico de um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_andatomic_fetch_and_explicit](<#/doc/atomic/atomic_fetch_and>)(desde C++11)(desde C++11) | substitui o objeto atômico pelo resultado de um AND bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_oratomic_fetch_or_explicit](<#/doc/atomic/atomic_fetch_or>)(desde C++11)(desde C++11) | substitui o objeto atômico pelo resultado de um OR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_xoratomic_fetch_xor_explicit](<#/doc/atomic/atomic_fetch_xor>)(desde C++11)(desde C++11) | substitui o objeto atômico pelo resultado de um XOR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_maxatomic_fetch_max_explicit](<#/doc/atomic/atomic_fetch_max>)(desde C++26)(desde C++26) | substitui o objeto atômico pelo resultado de [std::max](<#/doc/algorithm/max>) com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_minatomic_fetch_min_explicit](<#/doc/atomic/atomic_fetch_min>)(desde C++26)(desde C++26) | substitui o objeto atômico pelo resultado de [std::min](<#/doc/algorithm/min>) com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_waitatomic_wait_explicit](<#/doc/atomic/atomic_wait>)(desde C++20)(desde C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(modelo de função)
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(desde C++20) | notifica uma thread bloqueada em atomic_wait
(modelo de função)
[ atomic_notify_all](<#/doc/atomic/atomic_notify_all>)(desde C++20) | notifica todas as threads bloqueadas em atomic_wait
(modelo de função)
[ atomic_flag_testatomic_flag_test_explicit](<#/doc/atomic/atomic_flag_test>)(desde C++20)(desde C++20) | retorna atomicamente o valor da flag
(função)
[ atomic_flag_test_and_setatomic_flag_test_and_set_explicit](<#/doc/atomic/atomic_flag_test_and_set>)(desde C++11)(desde C++11) | define atomicamente a flag como true e retorna seu valor anterior
(função)
[ atomic_flag_clearatomic_flag_clear_explicit](<#/doc/atomic/atomic_flag_clear>)(desde C++11)(desde C++11) | define atomicamente o valor da flag como false
(função)
[ atomic_flag_waitatomic_flag_wait_explicit](<#/doc/atomic/atomic_flag_wait>)(desde C++20)(desde C++20) | bloqueia a thread até ser notificada e a flag mudar
(função)
[ atomic_flag_notify_one](<#/>)(desde C++20) | notifica uma thread bloqueada em atomic_flag_wait
(função)
[ atomic_flag_notify_all](<#/>)(desde C++20) | notifica todas as threads bloqueadas em atomic_flag_wait
(função)
[ atomic_init](<#/doc/atomic/atomic_init>)(desde C++11)(obsoleto desde C++20) | inicialização não atômica de um objeto atômico construído por padrão
(modelo de função)
[ kill_dependency](<#/doc/atomic/kill_dependency>)(desde C++11) | remove o objeto especificado da árvore de dependência [std::memory_order_consume](<#/doc/atomic/memory_order>)
(modelo de função)
[ atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>)(desde C++11) | primitiva de sincronização de barreira genérica dependente da ordem de memória
(função)
[ atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)(desde C++11) | barreira entre uma thread e um manipulador de sinal executado na mesma thread
(função)

### Macros

[ ATOMIC_VAR_INIT](<#/doc/atomic/ATOMIC_VAR_INIT>)(desde C++11)(obsoleto desde C++20) | inicialização constante de uma variável atômica com duração de armazenamento estática
(macro de função)
[ ATOMIC_FLAG_INIT](<#/doc/atomic/ATOMIC_FLAG_INIT>)(desde C++11) | inicializa um(a) [std::atomic_flag](<#/doc/atomic/atomic_flag>) para false
(macro constante)

### Sinopse
```cpp
    namespace std {
      /* until C++20:
      enum memory_order {
        memory_order_relaxed,
        memory_order_consume,
        memory_order_acquire,
        memory_order_release,
        memory_order_acq_rel,
        memory_order_seq_cst
      };
      */
    
      enum class memory_order : /* unspecified */;
      inline constexpr memory_order memory_order_relaxed = memory_order::relaxed;
      inline constexpr memory_order memory_order_consume = memory_order::consume;
      inline constexpr memory_order memory_order_acquire = memory_order::acquire;
      inline constexpr memory_order memory_order_release = memory_order::release;
      inline constexpr memory_order memory_order_acq_rel = memory_order::acq_rel;
      inline constexpr memory_order memory_order_seq_cst = memory_order::seq_cst;
    
      template<class T>
        T kill_dependency(T y) noexcept;
    
      // lock-free property
      #define ATOMIC_BOOL_LOCK_FREE /* unspecified */
      #define ATOMIC_CHAR_LOCK_FREE /* unspecified */
      #define ATOMIC_CHAR8_T_LOCK_FREE /* unspecified */
      #define ATOMIC_CHAR16_T_LOCK_FREE /* unspecified */
      #define ATOMIC_CHAR32_T_LOCK_FREE /* unspecified */
      #define ATOMIC_WCHAR_T_LOCK_FREE /* unspecified */
      #define ATOMIC_SHORT_LOCK_FREE /* unspecified */
      #define ATOMIC_INT_LOCK_FREE /* unspecified */
      #define ATOMIC_LONG_LOCK_FREE /* unspecified */
      #define ATOMIC_LLONG_LOCK_FREE /* unspecified */
      #define ATOMIC_POINTER_LOCK_FREE /* unspecified */
    
      // class template atomic_ref
      template<class T> struct atomic_ref;
      // partial specialization for pointers
      template<class T> struct atomic_ref<T*>;
    
      // class template atomic
      template<class T> struct atomic;
      // partial specialization for pointers
      template<class T> struct atomic<T*>;
    
      // non-member functions
      template<class T>
        bool atomic_is_lock_free(const volatile atomic<T>*) noexcept;
      template<class T>
        bool atomic_is_lock_free(const atomic<T>*) noexcept;
      template<class T>
        void atomic_store(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        void atomic_store(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        void atomic_store_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                   memory_order) noexcept;
      template<class T>
        void atomic_store_explicit(atomic<T>*, typename atomic<T>::value_type,
                                   memory_order) noexcept;
      template<class T>
        T atomic_load(const volatile atomic<T>*) noexcept;
      template<class T>
        T atomic_load(const atomic<T>*) noexcept;
      template<class T>
        T atomic_load_explicit(const volatile atomic<T>*, memory_order) noexcept;
      template<class T>
        T atomic_load_explicit(const atomic<T>*, memory_order) noexcept;
      template<class T>
        T atomic_exchange(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_exchange(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_exchange_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                   memory_order) noexcept;
      template<class T>
        T atomic_exchange_explicit(atomic<T>*, typename atomic<T>::value_type,
                                   memory_order) noexcept;
      template<class T>
        bool atomic_compare_exchange_weak(volatile atomic<T>*,
                                          typename atomic<T>::value_type*,
                                          typename atomic<T>::value_type) noexcept;
      template<class T>
        bool atomic_compare_exchange_weak(atomic<T>*,
                                          typename atomic<T>::value_type*,
                                          typename atomic<T>::value_type) noexcept;
      template<class T>
        bool atomic_compare_exchange_strong(volatile atomic<T>*,
                                            typename atomic<T>::value_type*,
                                            typename atomic<T>::value_type) noexcept;
      template<class T>
        bool atomic_compare_exchange_strong(atomic<T>*,
                                            typename atomic<T>::value_type*,
                                            typename atomic<T>::value_type) noexcept;
      template<class T>
        bool atomic_compare_exchange_weak_explicit(volatile atomic<T>*,
                                                   typename atomic<T>::value_type*,
                                                   typename atomic<T>::value_type,
                                                   memory_order, memory_order) noexcept;
      template<class T>
        bool atomic_compare_exchange_weak_explicit(atomic<T>*,
                                                   typename atomic<T>::value_type*,
                                                   typename atomic<T>::value_type,
                                                   memory_order, memory_order) noexcept;
      template<class T>
        bool atomic_compare_exchange_strong_explicit(volatile atomic<T>*,
                                                     typename atomic<T>::value_type*,
                                                     typename atomic<T>::value_type,
                                                     memory_order, memory_order) noexcept;
      template<class T>
        bool atomic_compare_exchange_strong_explicit(atomic<T>*,
                                                     typename atomic<T>::value_type*,
                                                     typename atomic<T>::value_type,
                                                     memory_order, memory_order) noexcept;
    
      template<class T>
        T atomic_fetch_add(volatile atomic<T>*, typename atomic<T>::difference_type) noexcept;
      template<class T>
        T atomic_fetch_add(atomic<T>*, typename atomic<T>::difference_type) noexcept;
      template<class T>
        T atomic_fetch_add_explicit(volatile atomic<T>*, typename atomic<T>::difference_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_add_explicit(atomic<T>*, typename atomic<T>::difference_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_sub(volatile atomic<T>*, typename atomic<T>::difference_type) noexcept;
      template<class T>
        T atomic_fetch_sub(atomic<T>*, typename atomic<T>::difference_type) noexcept;
      template<class T>
        T atomic_fetch_sub_explicit(volatile atomic<T>*, typename atomic<T>::difference_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_sub_explicit(atomic<T>*, typename atomic<T>::difference_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_and(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_and(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_and_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_and_explicit(atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_or(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_or(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_or_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                   memory_order) noexcept;
      template<class T>
        T atomic_fetch_or_explicit(atomic<T>*, typename atomic<T>::value_type,
                                   memory_order) noexcept;
      template<class T>
        T atomic_fetch_xor(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_xor(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_xor_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_xor_explicit(atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_max(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_max(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_max_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_max_explicit(atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_min(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_min(atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        T atomic_fetch_min_explicit(volatile atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
      template<class T>
        T atomic_fetch_min_explicit(atomic<T>*, typename atomic<T>::value_type,
                                    memory_order) noexcept;
    
      template<class T>
        void atomic_wait(const volatile atomic<T>*, typename atomic<T>::value_type);
      template<class T>
        void atomic_wait(const atomic<T>*, typename atomic<T>::value_type);
      template<class T>
        void atomic_wait_explicit(const volatile atomic<T>*,
                                  typename atomic<T>::value_type, memory_order);
      template<class T>
        void atomic_wait_explicit(const atomic<T>*,
                                  typename atomic<T>::value_type, memory_order);
      template<class T>
        void atomic_notify_one(volatile atomic<T>*);
      template<class T>
        void atomic_notify_one(atomic<T>*);
      template<class T>
        void atomic_notify_all(volatile atomic<T>*);
      template<class T>
        void atomic_notify_all(atomic<T>*);
    
      // type aliases
      using atomic_bool           = atomic<bool>;
      using atomic_char           = atomic<char>;
      using atomic_schar          = atomic<signed char>;
      using atomic_uchar          = atomic<unsigned char>;
      using atomic_short          = atomic<short>;
      using atomic_ushort         = atomic<unsigned short>;
      using atomic_int            = atomic<int>;
      using atomic_uint           = atomic<unsigned int>;
      using atomic_long           = atomic<long>;
      using atomic_ulong          = atomic<unsigned long>;
      using atomic_llong          = atomic<long long>;
      using atomic_ullong         = atomic<unsigned long long>;
      using atomic_char8_t        = atomic<char8_t>;
      using atomic_char16_t       = atomic<char16_t>;
      using atomic_char32_t       = atomic<char32_t>;
      using atomic_wchar_t        = atomic<wchar_t>;
    
      using atomic_int8_t         = atomic<int8_t>;
      using atomic_uint8_t        = atomic<uint8_t>;
      using atomic_int16_t        = atomic<int16_t>;
      using atomic_uint16_t       = atomic<uint16_t>;
      using atomic_int32_t        = atomic<int32_t>;
      using atomic_uint32_t       = atomic<uint32_t>;
      using atomic_int64_t        = atomic<int64_t>;
      using atomic_uint64_t       = atomic<uint64_t>;
    
      using atomic_int_least8_t   = atomic<int_least8_t>;
      using atomic_uint_least8_t  = atomic<uint_least8_t>;
      using atomic_int_least16_t  = atomic<int_least16_t>;
      using atomic_uint_least16_t = atomic<uint_least16_t>;
      using atomic_int_least32_t  = atomic<int_least32_t>;
      using atomic_uint_least32_t = atomic<uint_least32_t>;
      using atomic_int_least64_t  = atomic<int_least64_t>;
      using atomic_uint_least64_t = atomic<uint_least64_t>;
    
      using atomic_int_fast8_t    = atomic<int_fast8_t>;
      using atomic_uint_fast8_t   = atomic<uint_fast8_t>;
      using atomic_int_fast16_t   = atomic<int_fast16_t>;
      using atomic_uint_fast16_t  = atomic<uint_fast16_t>;
      using atomic_int_fast32_t   = atomic<int_fast32_t>;
      using atomic_uint_fast32_t  = atomic<uint_fast32_t>;
      using atomic_int_fast64_t   = atomic<int_fast64_t>;
      using atomic_uint_fast64_t  = atomic<uint_fast64_t>;
    
      using atomic_intptr_t       = atomic<intptr_t>;
      using atomic_uintptr_t      = atomic<uintptr_t>;
      using atomic_size_t         = atomic<size_t>;
      using atomic_ptrdiff_t      = atomic<ptrdiff_t>;
      using atomic_intmax_t       = atomic<intmax_t>;
      using atomic_uintmax_t      = atomic<uintmax_t>;
    
      using atomic_signed_lock_free   = /* see description */;
      using atomic_unsigned_lock_free = /* see description */;
    
      // flag type and operations
      struct atomic_flag;
    
      bool atomic_flag_test(const volatile atomic_flag*) noexcept;
      bool atomic_flag_test(const atomic_flag*) noexcept;
      bool atomic_flag_test_explicit(const volatile atomic_flag*, memory_order) noexcept;
      bool atomic_flag_test_explicit(const atomic_flag*, memory_order) noexcept;
      bool atomic_flag_test_and_set(volatile atomic_flag*) noexcept;
      bool atomic_flag_test_and_set(atomic_flag*) noexcept;
      bool atomic_flag_test_and_set_explicit(volatile atomic_flag*, memory_order) noexcept;
      bool atomic_flag_test_and_set_explicit(atomic_flag*, memory_order) noexcept;
      void atomic_flag_clear(volatile atomic_flag*) noexcept;
      void atomic_flag_clear(atomic_flag*) noexcept;
      void atomic_flag_clear_explicit(volatile atomic_flag*, memory_order) noexcept;
      void atomic_flag_clear_explicit(atomic_flag*, memory_order) noexcept;
    
      void atomic_flag_wait(const volatile atomic_flag*, bool) noexcept;
      void atomic_flag_wait(const atomic_flag*, bool) noexcept;
      void atomic_flag_wait_explicit(const volatile atomic_flag*,
                                     bool, memory_order) noexcept;
      void atomic_flag_wait_explicit(const atomic_flag*,
                                     bool, memory_order) noexcept;
      void atomic_flag_notify_one(volatile atomic_flag*) noexcept;
      void atomic_flag_notify_one(atomic_flag*) noexcept;
      void atomic_flag_notify_all(volatile atomic_flag*) noexcept;
      void atomic_flag_notify_all(atomic_flag*) noexcept;
    
      // fences
      extern "C" void atomic_thread_fence(memory_order) noexcept;
      extern "C" void atomic_signal_fence(memory_order) noexcept;
    }
    
    // deprecated
    namespace std {
      template<class T>
        void atomic_init(volatile atomic<T>*, typename atomic<T>::value_type) noexcept;
      template<class T>
        void atomic_init(atomic<T>*, typename atomic<T>::value_type) noexcept;
    
      #define ATOMIC_VAR_INIT(value) /* see description */
    
      #define ATOMIC_FLAG_INIT /* see description */
    }
```

#### Modelo de classe [std::atomic](<#/doc/atomic/atomic>)
```cpp
    namespace std {
      template<class T> struct atomic {
        using value_type = T;
    
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const volatile noexcept;
        bool is_lock_free() const noexcept;
    
        // operations on atomic types
        constexpr atomic() noexcept(is_nothrow_default_constructible_v<T>);
        constexpr atomic(T) noexcept;
        atomic(const atomic&) = delete;
        atomic& operator=(const atomic&) = delete;
        atomic& operator=(const atomic&) volatile = delete;
    
        T load(memory_order = memory_order::seq_cst) const volatile noexcept;
        T load(memory_order = memory_order::seq_cst) const noexcept;
        operator T() const volatile noexcept;
        operator T() const noexcept;
        void store(T, memory_order = memory_order::seq_cst) volatile noexcept;
        void store(T, memory_order = memory_order::seq_cst) noexcept;
        T operator=(T) volatile noexcept;
        T operator=(T) noexcept;
    
        T exchange(T, memory_order = memory_order::seq_cst) volatile noexcept;
        T exchange(T, memory_order = memory_order::seq_cst) noexcept;
        bool compare_exchange_weak(T&, T, memory_order, memory_order) volatile noexcept;
        bool compare_exchange_weak(T&, T, memory_order, memory_order) noexcept;
        bool compare_exchange_strong(T&, T, memory_order, memory_order) volatile noexcept;
        bool compare_exchange_strong(T&, T, memory_order, memory_order) noexcept;
        bool compare_exchange_weak(T&, T,
                                   memory_order = memory_order::seq_cst) volatile noexcept;
        bool compare_exchange_weak(T&, T, memory_order = memory_order::seq_cst) noexcept;
```
```cpp
        bool compare_exchange_strong(T&, T,
                                     memory_order = memory_order::seq_cst) volatile noexcept;
        bool compare_exchange_strong(T&, T, memory_order = memory_order::seq_cst) noexcept;
     
        void wait(T, memory_order = memory_order::seq_cst) const volatile noexcept;
        void wait(T, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() volatile noexcept;
        void notify_one() noexcept;
        void notify_all() volatile noexcept;
        void notify_all() noexcept;
      };
    }
```

#### Especializações de [std::atomic](<#/doc/atomic/atomic>) para tipos integrais
```cpp
    namespace std {
      template<> struct atomic</* integral */> {
        using value_type = /* integral */;
        using difference_type = value_type;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const volatile noexcept;
        bool is_lock_free() const noexcept;
     
        constexpr atomic() noexcept;
        constexpr atomic(/* integral */) noexcept;
        atomic(const atomic&) = delete;
        atomic& operator=(const atomic&) = delete;
        atomic& operator=(const atomic&) volatile = delete;
     
        void store(/* integral */, memory_order = memory_order::seq_cst) volatile noexcept;
        void store(/* integral */, memory_order = memory_order::seq_cst) noexcept;
        /* integral */ operator=(/* integral */) volatile noexcept;
        /* integral */ operator=(/* integral */) noexcept;
        /* integral */ load(memory_order = memory_order::seq_cst) const volatile noexcept;
        /* integral */ load(memory_order = memory_order::seq_cst) const noexcept;
        operator /* integral */() const volatile noexcept;
        operator /* integral */() const noexcept;
     
        /* integral */ exchange(/* integral */,
                            memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ exchange(/* integral */,
                            memory_order = memory_order::seq_cst) noexcept;
        bool compare_exchange_weak(/* integral */&, /* integral */,
                                   memory_order, memory_order) volatile noexcept;
        bool compare_exchange_weak(/* integral */&, /* integral */,
                                   memory_order, memory_order) noexcept;
        bool compare_exchange_strong(/* integral */&, /* integral */,
                                     memory_order, memory_order) volatile noexcept;
        bool compare_exchange_strong(/* integral */&, /* integral */,
                                     memory_order, memory_order) noexcept;
        bool compare_exchange_weak(/* integral */&, /* integral */,
                                   memory_order = memory_order::seq_cst) volatile noexcept;
        bool compare_exchange_weak(/* integral */&, /* integral */,
                                   memory_order = memory_order::seq_cst) noexcept;
        bool compare_exchange_strong(/* integral */&, /* integral */,
                                     memory_order = memory_order::seq_cst) volatile noexcept;
        bool compare_exchange_strong(/* integral */&, /* integral */,
                                     memory_order = memory_order::seq_cst) noexcept;
     
        /* integral */ fetch_add(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_add(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
        /* integral */ fetch_sub(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_sub(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
        /* integral */ fetch_and(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_and(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
        /* integral */ fetch_or(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_or(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
        /* integral */ fetch_xor(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_xor(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
        /* integral */ fetch_max(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_max(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
        /* integral */ fetch_min(/* integral */,
                             memory_order = memory_order::seq_cst) volatile noexcept;
        /* integral */ fetch_min(/* integral */,
                             memory_order = memory_order::seq_cst) noexcept;
     
        /* integral */ operator++(int) volatile noexcept;
        /* integral */ operator++(int) noexcept;
        /* integral */ operator--(int) volatile noexcept;
        /* integral */ operator--(int) noexcept;
        /* integral */ operator++() volatile noexcept;
        /* integral */ operator++() noexcept;
        /* integral */ operator--() volatile noexcept;
        /* integral */ operator--() noexcept;
        /* integral */ operator+=(/* integral */) volatile noexcept;
        /* integral */ operator+=(/* integral */) noexcept;
        /* integral */ operator-=(/* integral */) volatile noexcept;
        /* integral */ operator-=(/* integral */) noexcept;
        /* integral */ operator&=(/* integral */) volatile noexcept;
        /* integral */ operator&=(/* integral */) noexcept;
        /* integral */ operator|=(/* integral */) volatile noexcept;
        /* integral */ operator|=(/* integral */) noexcept;
        /* integral */ operator^=(/* integral */) volatile noexcept;
        /* integral */ operator^=(/* integral */) noexcept;
     
        void wait(/* integral */,
                  memory_order = memory_order::seq_cst) const volatile noexcept;
        void wait(/* integral */, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() volatile noexcept;
        void notify_one() noexcept;
        void notify_all() volatile noexcept;
        void notify_all() noexcept;
      };
    }
```

#### Especializações de [std::atomic](<#/doc/atomic/atomic>) para tipos de ponto flutuante
```cpp
    namespace std {
      template<> struct atomic</* floating-point */> {
        using value_type = /* floating-point */;
        using difference_type = value_type;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const volatile noexcept;
        bool is_lock_free() const noexcept;
     
        constexpr atomic() noexcept;
        constexpr atomic(/* floating-point */) noexcept;
        atomic(const atomic&) = delete;
        atomic& operator=(const atomic&) = delete;
        atomic& operator=(const atomic&) volatile = delete;
     
        void store(/* floating-point */,
                   memory_order = memory_order_seq_cst) volatile noexcept;
        void store(/* floating-point */,
                   memory_order = memory_order_seq_cst) noexcept;
        /* floating-point */ operator=(/* floating-point */) volatile noexcept;
        /* floating-point */ operator=(/* floating-point */) noexcept;
        /* floating-point */ load(memory_order = memory_order_seq_cst) volatile noexcept;
        /* floating-point */ load(memory_order = memory_order_seq_cst) noexcept;
        operator /* floating-point */() volatile noexcept;
        operator /* floating-point */() noexcept;
     
        /* floating-point */ exchange(/* floating-point */,
                                memory_order = memory_order_seq_cst) volatile noexcept;
        /* floating-point */ exchange(/* floating-point */,
                                memory_order = memory_order_seq_cst) noexcept;
        bool compare_exchange_weak(/* floating-point */&, /* floating-point */,
                                   memory_order, memory_order) volatile noexcept;
        bool compare_exchange_weak(/* floating-point */&, /* floating-point */,
                                   memory_order, memory_order) noexcept;
        bool compare_exchange_strong(/* floating-point */&, /* floating-point */,
                                     memory_order, memory_order) volatile noexcept;
        bool compare_exchange_strong(/* floating-point */&, /* floating-point */,
                                     memory_order, memory_order) noexcept;
        bool compare_exchange_weak(/* floating-point */&, /* floating-point */,
                                   memory_order = memory_order_seq_cst) volatile noexcept;
        bool compare_exchange_weak(/* floating-point */&, /* floating-point */,
                                   memory_order = memory_order_seq_cst) noexcept;
        bool compare_exchange_strong(/* floating-point */&, /* floating-point */,
                                     memory_order = memory_order_seq_cst) volatile noexcept;
        bool compare_exchange_strong(/* floating-point */&, /* floating-point */,
                                     memory_order = memory_order_seq_cst) noexcept;
     
        /* floating-point */ fetch_add(/* floating-point */,
                                 memory_order = memory_order_seq_cst) volatile noexcept;
        /* floating-point */ fetch_add(/* floating-point */,
                                 memory_order = memory_order_seq_cst) noexcept;
        /* floating-point */ fetch_sub(/* floating-point */,
                                 memory_order = memory_order_seq_cst) volatile noexcept;
        /* floating-point */ fetch_sub(/* floating-point */,
                                 memory_order = memory_order_seq_cst) noexcept;
     
        /* floating-point */ operator+=(/* floating-point */) volatile noexcept;
        /* floating-point */ operator+=(/* floating-point */) noexcept;
        /* floating-point */ operator-=(/* floating-point */) volatile noexcept;
        /* floating-point */ operator-=(/* floating-point */) noexcept;
     
        void wait(/* floating-point */,
                  memory_order = memory_order::seq_cst) const volatile noexcept;
        void wait(/* floating-point */,
                  memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() volatile noexcept;
        void notify_one() noexcept;
        void notify_all() volatile noexcept;
        void notify_all() noexcept;
      };
    }
```

#### Especializações de [std::atomic](<#/doc/atomic/atomic>) para tipos ponteiro
```cpp
    namespace std {
      template<class T> struct atomic<T*> {
        using value_type = T*;
        using difference_type = ptrdiff_t;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const volatile noexcept;
        bool is_lock_free() const noexcept;
     
        constexpr atomic() noexcept;
        constexpr atomic(T*) noexcept;
        atomic(const atomic&) = delete;
        atomic& operator=(const atomic&) = delete;
        atomic& operator=(const atomic&) volatile = delete;
     
        void store(T*, memory_order = memory_order::seq_cst) volatile noexcept;
        void store(T*, memory_order = memory_order::seq_cst) noexcept;
        T* operator=(T*) volatile noexcept;
        T* operator=(T*) noexcept;
        T* load(memory_order = memory_order::seq_cst) const volatile noexcept;
        T* load(memory_order = memory_order::seq_cst) const noexcept;
        operator T*() const volatile noexcept;
        operator T*() const noexcept;
     
        T* exchange(T*, memory_order = memory_order::seq_cst) volatile noexcept;
        T* exchange(T*, memory_order = memory_order::seq_cst) noexcept;
        bool compare_exchange_weak(T*&, T*, memory_order, memory_order) volatile noexcept;
        bool compare_exchange_weak(T*&, T*, memory_order, memory_order) noexcept;
        bool compare_exchange_strong(T*&, T*, memory_order, memory_order) volatile noexcept;
        bool compare_exchange_strong(T*&, T*, memory_order, memory_order) noexcept;
        bool compare_exchange_weak(T*&, T*,
                                   memory_order = memory_order::seq_cst) volatile noexcept;
        bool compare_exchange_weak(T*&, T*,
                                   memory_order = memory_order::seq_cst) noexcept;
        bool compare_exchange_strong(T*&, T*,
                                     memory_order = memory_order::seq_cst) volatile noexcept;
        bool compare_exchange_strong(T*&, T*,
                                     memory_order = memory_order::seq_cst) noexcept;
     
        T* fetch_add(ptrdiff_t, memory_order = memory_order::seq_cst) volatile noexcept;
        T* fetch_add(ptrdiff_t, memory_order = memory_order::seq_cst) noexcept;
        T* fetch_sub(ptrdiff_t, memory_order = memory_order::seq_cst) volatile noexcept;
        T* fetch_sub(ptrdiff_t, memory_order = memory_order::seq_cst) noexcept;
        T* fetch_max(T*, memory_order = memory_order::seq_cst) volatile noexcept;
        T* fetch_max(T*, memory_order = memory_order::seq_cst) noexcept;
        T* fetch_min(T*, memory_order = memory_order::seq_cst) volatile noexcept;
        T* fetch_min(T*, memory_order = memory_order::seq_cst) noexcept;
     
        T* operator++(int) volatile noexcept;
        T* operator++(int) noexcept;
        T* operator--(int) volatile noexcept;
        T* operator--(int) noexcept;
        T* operator++() volatile noexcept;
        T* operator++() noexcept;
        T* operator--() volatile noexcept;
        T* operator--() noexcept;
        T* operator+=(ptrdiff_t) volatile noexcept;
        T* operator+=(ptrdiff_t) noexcept;
        T* operator-=(ptrdiff_t) volatile noexcept;
        T* operator-=(ptrdiff_t) noexcept;
     
        void wait(T*, memory_order = memory_order::seq_cst) const volatile noexcept;
        void wait(T*, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() volatile noexcept;
        void notify_one() noexcept;
        void notify_all() volatile noexcept;
        void notify_all() noexcept;
      };
    }
```

#### Modelo de classe [std::atomic_ref](<#/doc/atomic/atomic_ref>)
```cpp
    namespace std {
      template<class T> struct atomic_ref {
      private:
        T* ptr;             // apenas para exposição
      public:
        using value_type = T;
        static constexpr size_t required_alignment = /* implementation-defined */;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const noexcept;
     
        explicit atomic_ref(T&);
        atomic_ref(const atomic_ref&) noexcept;
        atomic_ref& operator=(const atomic_ref&) = delete;
     
        void store(T, memory_order = memory_order_seq_cst) const noexcept;
        T operator=(T) const noexcept;
        T load(memory_order = memory_order_seq_cst) const noexcept;
        operator T() const noexcept;
     
        T exchange(T, memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_weak(T&, T,
                                   memory_order, memory_order) const noexcept;
        bool compare_exchange_strong(T&, T,
                                     memory_order, memory_order) const noexcept;
        bool compare_exchange_weak(T&, T,
                                   memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_strong(T&, T,
                                     memory_order = memory_order_seq_cst) const noexcept;
     
        void wait(T, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() const noexcept;
        void notify_all() const noexcept;
      };
    }
```

#### Especializações de [std::atomic_ref](<#/doc/atomic/atomic_ref>) para tipos integrais
```cpp
    namespace std {
      template<> struct atomic_ref</* integral */> {
      private:
        /* integral */* ptr;        // apenas para exposição
      public:
        using value_type = /* integral */;
        using difference_type = value_type;
        static constexpr size_t required_alignment = /* implementation-defined */;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const noexcept;
     
        explicit atomic_ref(/* integral */&);
        atomic_ref(const atomic_ref&) noexcept;
        atomic_ref& operator=(const atomic_ref&) = delete;
     
        void store(/* integral */, memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ operator=(/* integral */) const noexcept;
        /* integral */ load(memory_order = memory_order_seq_cst) const noexcept;
        operator /* integral */() const noexcept;
     
        /* integral */ exchange(/* integral */,
                          memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_weak(/* integral */&, /* integral */,
                                   memory_order, memory_order) const noexcept;
        bool compare_exchange_strong(/* integral */&, /* integral */,
                                     memory_order, memory_order) const noexcept;
        bool compare_exchange_weak(/* integral */&, /* integral */,
                                   memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_strong(/* integral */&, /* integral */,
                                     memory_order = memory_order_seq_cst) const noexcept;
     
        /* integral */ fetch_add(/* integral */,
                           memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ fetch_sub(/* integral */,
                           memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ fetch_and(/* integral */,
                           memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ fetch_or(/* integral */,
                          memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ fetch_xor(/* integral */,
                           memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ fetch_max(/* integral */,
                           memory_order = memory_order_seq_cst) const noexcept;
        /* integral */ fetch_min(/* integral */,
                           memory_order = memory_order_seq_cst) const noexcept;
     
        /* integral */ operator++(int) const noexcept;
        /* integral */ operator--(int) const noexcept;
        /* integral */ operator++() const noexcept;
        /* integral */ operator--() const noexcept;
        /* integral */ operator+=(/* integral */) const noexcept;
        /* integral */ operator-=(/* integral */) const noexcept;
        /* integral */ operator&=(/* integral */) const noexcept;
        /* integral */ operator
```

#### Especializações de [std::atomic_ref](<#/doc/atomic/atomic_ref>) para tipos de ponto flutuante
```cpp
    namespace std {
      template<> struct atomic_ref</* floating-point */> {
      private:
        /* floating-point */* ptr;  // apenas para exposição
      public:
        using value_type = /* floating-point */;
        using difference_type = value_type;
        static constexpr size_t required_alignment = /* implementation-defined */;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const noexcept;
     
        explicit atomic_ref(/* floating-point */&);
        atomic_ref(const atomic_ref&) noexcept;
        atomic_ref& operator=(const atomic_ref&) = delete;
     
        void store(/* floating-point */, memory_order = memory_order_seq_cst) const noexcept;
        /* floating-point */ operator=(/* floating-point */) const noexcept;
        /* floating-point */ load(memory_order = memory_order_seq_cst) const noexcept;
        operator /* floating-point */() const noexcept;
     
        /* floating-point */ exchange(/* floating-point */,
                                memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_weak(/* floating-point */&, /* floating-point */,
                                   memory_order, memory_order) const noexcept;
        bool compare_exchange_strong(/* floating-point */&, /* floating-point */,
                                     memory_order, memory_order) const noexcept;
        bool compare_exchange_weak(/* floating-point */&, /* floating-point */,
                                   memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_strong(/* floating-point */&, /* floating-point */,
                                     memory_order = memory_order_seq_cst) const noexcept;
     
        /* floating-point */ fetch_add(/* floating-point */,
                                 memory_order = memory_order_seq_cst) const noexcept;
        /* floating-point */ fetch_sub(/* floating-point */,
                                 memory_order = memory_order_seq_cst) const noexcept;
     
        /* floating-point */ operator+=(/* floating-point */) const noexcept;
        /* floating-point */ operator-=(/* floating-point */) const noexcept;
     
        void wait(/* floating-point */, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() const noexcept;
        void notify_all() const noexcept;
      };
    }
```

#### Especializações de [std::atomic_ref](<#/doc/atomic/atomic_ref>) para tipos ponteiro
```cpp
    namespace std {
      template<class T> struct atomic_ref<T*> {
      private:
        T** ptr;        // apenas para exposição
      public:
        using value_type = T*;
        using difference_type = ptrdiff_t;
        static constexpr size_t required_alignment = /* implementation-defined */;
     
        static constexpr bool is_always_lock_free = /* implementation-defined */;
        bool is_lock_free() const noexcept;
     
        explicit atomic_ref(T*&);
        atomic_ref(const atomic_ref&) noexcept;
        atomic_ref& operator=(const atomic_ref&) = delete;
     
        void store(T*, memory_order = memory_order_seq_cst) const noexcept;
        T* operator=(T*) const noexcept;
        T* load(memory_order = memory_order_seq_cst) const noexcept;
        operator T*() const noexcept;
     
        T* exchange(T*, memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_weak(T*&, T*,
                                   memory_order, memory_order) const noexcept;
        bool compare_exchange_strong(T*&, T*,
                                     memory_order, memory_order) const noexcept;
        bool compare_exchange_weak(T*&, T*,
                                   memory_order = memory_order_seq_cst) const noexcept;
        bool compare_exchange_strong(T*&, T*,
                                     memory_order = memory_order_seq_cst) const noexcept;
     
        T* fetch_add(difference_type, memory_order = memory_order_seq_cst) const noexcept;
        T* fetch_sub(difference_type, memory_order = memory_order_seq_cst) const noexcept;
        T* fetch_max(T *, memory_order = memory_order::seq_cst) const noexcept;
        T* fetch_min(T *, memory_order = memory_order::seq_cst) const noexcept;
     
        T* operator++(int) const noexcept;
        T* operator--(int) const noexcept;
        T* operator++() const noexcept;
        T* operator--() const noexcept;
        T* operator+=(difference_type) const noexcept;
        T* operator-=(difference_type) const noexcept;
     
        void wait(T*, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() const noexcept;
        void notify_all() const noexcept;
      };
    }
```

#### Classe [std::atomic_flag](<#/doc/atomic/atomic_flag>)
```cpp
    namespace std {
      struct atomic_flag {
        constexpr atomic_flag() noexcept;
        atomic_flag(const atomic_flag&) = delete;
        atomic_flag& operator=(const atomic_flag&) = delete;
        atomic_flag& operator=(const atomic_flag&) volatile = delete;
     
        bool test(memory_order = memory_order::seq_cst) const volatile noexcept;
        bool test(memory_order = memory_order::seq_cst) const noexcept;
        bool test_and_set(memory_order = memory_order::seq_cst) volatile noexcept;
        bool test_and_set(memory_order = memory_order::seq_cst) noexcept;
        void clear(memory_order = memory_order::seq_cst) volatile noexcept;
        void clear(memory_order = memory_order::seq_cst) noexcept;
     
        void wait(bool, memory_order = memory_order::seq_cst) const volatile noexcept;
        void wait(bool, memory_order = memory_order::seq_cst) const noexcept;
        void notify_one() volatile noexcept;
        void notify_one() noexcept;
        void notify_all() volatile noexcept;
        void notify_all() noexcept;
      };
    }
```