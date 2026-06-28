# Standard library header &lt;memory&gt;

Este header faz parte da biblioteca de [gerenciamento de memória dinâmica](<#/doc/memory>).

### Includes

---
[ &lt;compare&gt;](<#/doc/header/compare>)(desde C++20) | Suporte ao [operador de comparação de três vias](<#/doc/language/operator_comparison>)
  
### Classes
  
##### Pointer traits
  
[ pointer_traits](<#/doc/memory/pointer_traits>)(desde C++11) | Fornece informações sobre tipos semelhantes a ponteiros
(class template)
  
##### Suporte a coletor de lixo
  
[ pointer_safety](<#/doc/memory/gc/pointer_safety>)(desde C++11)(removido em C++23) | Lista modelos de segurança de ponteiro
(enum)
  
##### Alocadores
  
[ allocator](<#/doc/memory/allocator>) | O alocador padrão
(class template)
[ allocator_traits](<#/doc/memory/allocator_traits>)(desde C++11) | Fornece informações sobre tipos de alocadores
(class template)
[ allocation_result](<#/doc/memory/allocation_result>)(desde C++23) | Registra o endereço e o tamanho real do armazenamento alocado por `allocate_at_least`
(class template)
[ uses_allocator](<#/doc/memory/uses_allocator>)(desde C++11) | Verifica se o tipo especificado suporta construção com uses-allocator
(class template)
  
##### Armazenamento não inicializado
  
[ raw_storage_iterator](<#/doc/memory/raw_storage_iterator>)(obsoleto em C++17)(removido em C++20) | Um iterator que permite que algoritmos padrão armazenem resultados em memória não inicializada
(class template)
  
##### Ponteiros inteligentes
  
[ unique_ptr](<#/doc/memory/unique_ptr>)(desde C++11) | Ponteiro inteligente com semântica de posse única de objeto
(class template)
[ shared_ptr](<#/doc/memory/shared_ptr>)(desde C++11) | Ponteiro inteligente com semântica de posse compartilhada de objeto
(class template)
[ weak_ptr](<#/doc/memory/weak_ptr>)(desde C++11) | Referência fraca a um objeto gerenciado por [std::shared_ptr](<#/doc/memory/shared_ptr>)
(class template)
[ auto_ptr](<#/doc/memory/auto_ptr>)(obsoleto em C++11)(removido em C++17) | Ponteiro inteligente com semântica de posse estrita de objeto
(class template)
  
##### Classes auxiliares
  
[ std::atomic<std::shared_ptr>](<#/doc/memory/shared_ptr/atomic2>)(desde C++20) | Ponteiro compartilhado atômico
(class template specialization)
[ std::atomic<std::weak_ptr>](<#/doc/memory/weak_ptr/atomic2>)(desde C++20) | Ponteiro fraco atômico
(class template specialization)
[ owner_less](<#/doc/memory/owner_less>)(desde C++11) | Fornece ordenação baseada em proprietário de tipos mistos para ponteiros compartilhados e fracos
(class template)
[ owner_hash](<#/doc/memory/owner_hash>)(desde C++26) | Fornece hashing baseado em proprietário para ponteiros compartilhados e fracos
(class)
[ owner_equal](<#/doc/memory/owner_equal>)(desde C++26) | Fornece comparações de igualdade baseadas em proprietário de tipos mistos para ponteiros compartilhados e fracos
(class)
[ enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)(desde C++11) | Permite que um objeto crie um `shared_ptr` referindo-se a si mesmo
(class template)
[ bad_weak_ptr](<#/doc/memory/bad_weak_ptr>)(desde C++11) | Exceção lançada ao acessar um `weak_ptr` que se refere a um objeto já destruído
(class)
[ default_delete](<#/doc/memory/default_delete>)(desde C++11) | Deleter padrão para [unique_ptr](<#/doc/memory/unique_ptr>)
(class template)
[ std::hash<std::unique_ptr>](<#/doc/memory/unique_ptr/hash>)(desde C++11) | Suporte a hash para [`std::unique_ptr`](<#/doc/memory/unique_ptr>)
(class template specialization)
[ std::hash<std::shared_ptr>](<#/doc/memory/shared_ptr/hash>)(desde C++11) | Suporte a hash para [`std::shared_ptr`](<#/doc/memory/shared_ptr>)
(class template specialization)
  
##### Adaptadores de ponteiro inteligente
  
[ out_ptr_t](<#/doc/memory/out_ptr_t>)(desde C++23) | Interopera com setters de ponteiros externos e redefine um ponteiro inteligente na destruição
(class template)
[ inout_ptr_t](<#/doc/memory/inout_ptr_t>)(desde C++23) | Interopera com setters de ponteiros externos, obtém o valor inicial do ponteiro de um ponteiro inteligente e o redefine na destruição
(class template)
  
##### Declarações antecipadas
  
Definido no header `[<functional>](<#/doc/header/functional>)`

```cpp
 hash(desde C++11)
(class template)
Definido no header `<atomic>`
 atomic(desde C++11)  // (desde C++20)
(class template)
```

  
### Tags
  
[ allocator_argallocator_arg_t](<#/doc/memory/allocator_arg_t>)(desde C++11) | Uma tag usada para selecionar construtores cientes de alocador
(tag)
  
### Funções
  
##### Construção com uses-allocator
  
[ uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>)(desde C++20) | Prepara a lista de argumentos que corresponde ao tipo de construção uses-allocator exigido pelo tipo dado
(function template)
[ make_obj_using_allocator](<#/doc/memory/make_obj_using_allocator>)(desde C++20) | Cria um objeto do tipo dado por meio de construção uses-allocator
(function template)
[ uninitialized_construct_using_allocator](<#/doc/memory/uninitialized_construct_using_allocator>)(desde C++20) | Cria um objeto do tipo dado em um local de memória especificado por meio de construção uses-allocator
(function template)
  
##### Diversos
  
[ to_address](<#/doc/memory/to_address>)(desde C++20) | Obtém um ponteiro bruto de um tipo semelhante a ponteiro
(function template)
[ addressof](<#/doc/memory/addressof>)(desde C++11) | Obtém o endereço real de um objeto, mesmo que o operador `&` esteja sobrecarregado
(function template)
[ align](<#/doc/memory/align>)(desde C++11) | Alinha um ponteiro em um buffer
(function)
[ assume_aligned](<#/doc/memory/assume_aligned>)(desde C++20) | Informa ao compilador que um ponteiro está alinhado
(function template)
[ is_sufficiently_aligned](<#/doc/memory/is_sufficiently_aligned>)(desde C++26) | Verifica se o ponteiro aponta para um objeto cujo alinhamento tem pelo menos o valor dado
(function template)
  
##### Gerenciamento explícito de tempo de vida
  
[ start_lifetime_asstart_lifetime_as_array](<#/doc/memory/start_lifetime_as>)(desde C++23) | Cria implicitamente objetos em um armazenamento dado com a representação do objeto reutilizada
(function template)
  
##### Suporte a coletor de lixo
  
[ declare_reachable](<#/doc/memory/gc/declare_reachable>)(desde C++11)(removido em C++23) | Declara que um objeto não pode ser reciclado
(function)
[ undeclare_reachable](<#/doc/memory/gc/undeclare_reachable>)(desde C++11)(removido em C++23) | Declara que um objeto pode ser reciclado
(function template)
[ declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)(desde C++11)(removido em C++23) | Declara que uma área de memória não contém ponteiros rastreáveis
(function)
[ undeclare_no_pointers](<#/doc/memory/gc/undeclare_no_pointers>)(desde C++11)(removido em C++23) | Cancela o efeito de [std::declare_no_pointers](<#/doc/memory/gc/declare_no_pointers>)
(function)
[ get_pointer_safety](<#/doc/memory/gc/get_pointer_safety>)(desde C++11)(removido em C++23) | Retorna o modelo de segurança de ponteiro atual
(function)
  
##### Armazenamento não inicializado
  
[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) | Copia um range de objetos para uma área de memória não inicializada
(function template)
[ uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)(desde C++11) | Copia um número de objetos para uma área de memória não inicializada
(function template)
[ uninitialized_fill](<#/doc/memory/uninitialized_fill>) | Copia um objeto para uma área de memória não inicializada, definida por um range
(function template)
[ uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>) | Copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(function template)
[ uninitialized_move](<#/doc/memory/uninitialized_move>)(desde C++17) | Move um range de objetos para uma área de memória não inicializada
(function template)
[ uninitialized_move_n](<#/doc/memory/uninitialized_move_n>)(desde C++17) | Move um número de objetos para uma área de memória não inicializada
(function template)
[ uninitialized_default_construct](<#/doc/memory/uninitialized_default_construct>)(desde C++17) | Constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(function template)
[ uninitialized_default_construct_n](<#/doc/memory/uninitialized_default_construct_n>)(desde C++17) | Constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(function template)
[ uninitialized_value_construct](<#/doc/memory/uninitialized_value_construct>)(desde C++17) | Constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(function template)
[ uninitialized_value_construct_n](<#/doc/memory/uninitialized_value_construct_n>)(desde C++17) | Constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(function template)
[ construct_at](<#/doc/memory/construct_at>)(desde C++20) | Cria um objeto em um endereço dado
(function template)
[ destroy_at](<#/doc/memory/destroy_at>)(desde C++17) | Destrói um objeto em um endereço dado
(function template)
[ destroy](<#/doc/memory/destroy>)(desde C++17) | Destrói um range de objetos
(function template)
[ destroy_n](<#/doc/memory/destroy_n>)(desde C++17) | Destrói um número de objetos em um range
(function template)
[ get_temporary_buffer](<#/doc/memory/get_temporary_buffer>)(obsoleto em C++17)(removido em C++20) | Obtém armazenamento não inicializado
(function template)
[ return_temporary_buffer](<#/doc/memory/return_temporary_buffer>)(obsoleto em C++17)(removido em C++20) | Libera armazenamento não inicializado
(function template)
  
##### Operações não-membro de ponteiro inteligente
  
[ make_uniquemake_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)(desde C++14)(C++20) | Cria um ponteiro único que gerencia um novo objeto
(function template)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/unique_ptr/operator_cmp>)(removido em C++20)(desde C++20) | Compara com outro `unique_ptr` ou com nullptr
(function template)
[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(desde C++20) | Cria um ponteiro compartilhado que gerencia um novo objeto
(function template)
[ allocate_sharedallocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>)(desde C++20) | Cria um ponteiro compartilhado que gerencia um novo objeto alocado usando um alocador
(function template)
[ static_pointer_castdynamic_pointer_castconst_pointer_castreinterpret_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)(desde C++17) | Aplica [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), [`const_cast`](<#/doc/language/const_cast>), ou [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) ao ponteiro armazenado
(function template)
[ get_deleter](<#/doc/memory/shared_ptr/get_deleter>) | Retorna o deleter do tipo especificado, se possuído
(function template)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/shared_ptr/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(desde C++20) | Compara com outro `shared_ptr` ou com nullptr
(function template)
[ operator<<(std::shared_ptr)](<#/doc/memory/shared_ptr/operator_ltlt>) | Envia o valor do ponteiro armazenado para um stream de saída
(function template)
[ operator<<(std::unique_ptr)](<#/doc/memory/unique_ptr/operator_ltlt>)(desde C++20) | Envia o valor do ponteiro gerenciado para um stream de saída
(function template)
[ std::swap(std::unique_ptr)](<#/doc/memory/unique_ptr/swap2>)(desde C++11) | Especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(function template)
[ std::swap(std::shared_ptr)](<#/doc/memory/shared_ptr/swap2>)(desde C++11) | Especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(function template)
[ std::swap(std::weak_ptr)](<#/doc/memory/weak_ptr/swap2>)(desde C++11) | Especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(function template)
[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | Especializa operações atômicas para `std::shared_ptr`
(function template)
  
### Entidades semelhantes a funções
  
---
Definido no namespace `std::ranges`
  
##### Armazenamento não inicializado
  
[ ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)(desde C++20) | Copia um range de objetos para uma área de memória não inicializada
(algorithm function object)
[ ranges::uninitialized_copy_n](<#/doc/memory/ranges/uninitialized_copy_n>)(desde C++20) | Copia um número de objetos para uma área de memória não inicializada
(algorithm function object)
[ ranges::uninitialized_fill](<#/doc/memory/ranges/uninitialized_fill>)(desde C++20) | Copia um objeto para uma área de memória não inicializada, definida por um range
(algorithm function object)
[ ranges::uninitialized_fill_n](<#/doc/memory/ranges/uninitialized_fill_n>)(desde C++20) | Copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(algorithm function object)
[ ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)(desde C++20) | Move um range de objetos para uma área de memória não inicializada
(algorithm function object)
[ ranges::uninitialized_move_n](<#/doc/memory/ranges/uninitialized_move_n>)(desde C++20) | Move um número de objetos para uma área de memória não inicializada
(algorithm function object)
[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(desde C++20) | Constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(algorithm function object)
[ ranges::uninitialized_default_construct_n](<#/doc/memory/ranges/uninitialized_default_construct_n>)(desde C++20) | Constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e contagem
(algorithm function object)
[ ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)(desde C++20) | Constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(algorithm function object)
[ ranges::uninitialized_value_construct_n](<#/doc/memory/ranges/uninitialized_value_construct_n>)(desde C++20) | Constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(algorithm function object)
[ ranges::construct_at](<#/doc/memory/ranges/construct_at>)(desde C++20) | Cria um objeto em um endereço dado
(algorithm function object)
[ ranges::destroy_at](<#/doc/memory/ranges/destroy_at>)(desde C++20) | Destrói um objeto em um endereço dado
(algorithm function object)
[ ranges::destroy](<#/doc/memory/ranges/destroy>)(desde C++20) | Destrói um range de objetos
(algorithm function object)
[ ranges::destroy_n](<#/doc/memory/ranges/destroy_n>)(desde C++20) | Destrói um número de objetos em um range
(algorithm function object)
  
### Synopsis
```cpp
    #include <compare>
    
    namespace std {
      // pointer traits
      template<class Ptr> struct pointer_traits;
      template<class T> struct pointer_traits<T*>;
    
      // pointer conversion
      template<class T>
        constexpr T* to_address(T* p) noexcept;
      template<class Ptr>
        constexpr auto to_address(const Ptr& p) noexcept;
    
      // pointer alignment
      void* align(size_t alignment, size_t size, void*& ptr, size_t& space);
      template<size_t N, class T>
        constexpr T* assume_aligned(T* ptr);
    
      // explicit lifetime management
      template<class T>
        T* start_lifetime_as(void* p) noexcept;                                   // freestanding
      template<class T>
        const T* start_lifetime_as(const void* p) noexcept;                       // freestanding
      template<class T>
        volatile T* start_lifetime_as(volatile void* p) noexcept;                 // freestanding
      template<class T>
        const volatile T* start_lifetime_as(const volatile void* p) noexcept;     // freestanding
      template<class T>
        T* start_lifetime_as_array(void* p, size_t n) noexcept;                   // freestanding
      template<class T>
        const T* start_lifetime_as_array(const void* p, size_t n) noexcept;       // freestanding
      template<class T>
        volatile T* start_lifetime_as_array(volatile void* p, size_t n) noexcept; // freestanding
      template<class T>
        const volatile T* start_lifetime_as_array(const volatile void* p,         // freestanding
                                                  size_t n) noexcept;
    
      // allocator argument tag
      struct allocator_arg_t { explicit allocator_arg_t() = default; };
      inline constexpr allocator_arg_t allocator_arg{};
    
      // uses_allocator
      template<class T, class Alloc> struct uses_allocator;
    
      // uses_allocator
      template<class T, class Alloc>
        inline constexpr bool uses_allocator_v = uses_allocator<T, Alloc>::value;
    
      // uses-allocator construction
      template<class T, class Alloc, class... Args>
        constexpr auto uses_allocator_construction_args(const Alloc& alloc,
                                                        Args&&... args) noexcept;
      template<class T, class Alloc, class Tuple1, class Tuple2>
        constexpr auto uses_allocator_construction_args(const Alloc& alloc, piecewise_construct_t,
                                                        Tuple1&& x, Tuple2&& y) noexcept;
      template<class T, class Alloc>
        constexpr auto uses_allocator_construction_args(const Alloc& alloc) noexcept;
      template<class T, class Alloc, class U, class V>
        constexpr auto uses_allocator_construction_args(const Alloc& alloc,
                                                        U&& u, V&& v) noexcept;
      template<class T, class Alloc, class U, class V>
        constexpr auto uses_allocator_construction_args(const Alloc& alloc,
                                                        const pair<U, V>& pr) noexcept;
      template<class T, class Alloc, class U, class V>
        constexpr auto uses_allocator_construction_args(const Alloc& alloc,
                                                        pair<U, V>&& pr) noexcept;
      template<class T, class Alloc, class... Args>
        constexpr T make_obj_using_allocator(const Alloc& alloc, Args&&... args);
      template<class T, class Alloc, class... Args>
        constexpr T* uninitialized_construct_using_allocator(T* p, const Alloc& alloc,
                                                             Args&&... args);
    
      // allocator traits
      template<class Alloc> struct allocator_traits;
    
      template<class Pointer, class SizeType = size_t>
      struct allocation_result {
        Pointer ptr;
        SizeType count;
      };
    
      // the default allocator
      template<class T> class allocator;
      template<class T, class U>
        constexpr bool operator==(const allocator<T>&, const allocator<U>&) noexcept;
    
      // addressof
      template<class T>
        constexpr T* addressof(T& r) noexcept;
      template<class T>
        const T* addressof(const T&&) = delete;
    
      // specialized algorithms
      // special memory concepts
      template<class I>
        concept no-throw-input-iterator = /* see description */;    // exposition only
      template<class I>
        concept no-throw-forward-iterator = /* see description */;  // exposition only
      template<class S, class I>
        concept no-throw-sentinel-for = /* see description */;      // exposition only
      template<class R>
        concept no-throw-input-range = /* see description */;       // exposition only
      template<class R>
        concept no-throw-forward-range = /* see description */;     // exposition only
    
      template<class NoThrowForwardIt>
        void uninitialized_default_construct(NoThrowForwardIt first,
                                             NoThrowForwardIt last);
      template<class ExecutionPolicy, class NoThrowForwardIt>
        void uninitialized_default_construct(ExecutionPolicy&& exec,
                                             NoThrowForwardIt first,
                                             NoThrowForwardIt last);
      template<class NoThrowForwardIt, class Size>
        NoThrowForwardIt
          uninitialized_default_construct_n(NoThrowForwardIt first, Size n);
      template<class ExecutionPolicy, class NoThrowForwardIt, class Size>
        NoThrowForwardIt
          uninitialized_default_construct_n(ExecutionPolicy&& exec,
                                            NoThrowForwardIt first, Size n);
    
      namespace ranges {
        template<no-throw-forward-iterator I, no-throw-sentinel-for<I> S>
          requires default_initializable<iter_value_t<I>>
            I uninitialized_default_construct(I first, S last);
        template<no-throw-forward-range R>
          requires default_initializable<range_value_t<R>>
            borrowed_iterator_t<R> uninitialized_default_construct(R&& r);
    
        template<no-throw-forward-iterator I>
          requires default_initializable<iter_value_t<I>>
            I uninitialized_default_construct_n(I first, iter_difference_t<I> n);
      }
    
      template<class NoThrowForwardIterator>
        void uninitialized_value_construct(NoThrowForwardIterator first,
                                           NoThrowForwardIterator last);
      template<class ExecutionPolicy, class NoThrowForwardIt>
        void uninitialized_value_construct(ExecutionPolicy&& exec,
                                           NoThrowForwardIt first,
                                           NoThrowForwardIt last);
      template<class NoThrowForwardIt, class Size>
        NoThrowForwardIt
          uninitialized_value_construct_n(NoThrowForwardIt first, Size n);
      template<class ExecutionPolicy, class NoThrowForwardIt, class Size>
        NoThrowForwardIt
          uninitialized_value_construct_n(ExecutionPolicy&& exec,
                                          NoThrowForwardIt first, Size n);
    
      namespace ranges {
        template<no-throw-forward-iterator I, no-throw-sentinel-for<I> S>
          requires default_initializable<iter_value_t<I>>
            I uninitialized_value_construct(I first, S last);
        template<no-throw-forward-range R>
          requires default_initializable<range_value_t<R>>
            borrowed_iterator_t<R> uninitialized_value_construct(R&& r);
    
        template<no-throw-forward-iterator I>
          requires default_initializable<iter_value_t<I>>
            I uninitialized_value_construct_n(I first, iter_difference_t<I> n);
      }
    
      template<class InputIt, class NoThrowForwardIt>
        NoThrowForwardIt uninitialized_copy(InputIt first, InputIt last,
                                            NoThrowForwardIt result);
      template<class ExecutionPolicy, class ForwardIt, class NoThrowForwardIt>
        NoThrowForwardIt uninitialized_copy(ExecutionPolicy&& exec,
                                            ForwardIt first, ForwardIt last,
                                            NoThrowForwardIt result);
      template<class InputIt, class Size, class NoThrowForwardIt>
        NoThrowForwardIt uninitialized_copy_n(InputIt first, Size n,
                                              NoThrowForwardIt result);
      template<class ExecutionPolicy, class ForwardIt, class Size,
               class NoThrowForwardIt>
        NoThrowForwardIt uninitialized_copy_n(ExecutionPolicy&& exec,
                                              ForwardIt first, Size n,
                                              NoThrowForwardIt result);
    
      namespace ranges {
        template<class I, class O>
          using uninitialized_copy_result = in_out_result<I, O>;
        template<input_iterator I, sentinel_for<I> S1,
                 no-throw-forward-iterator O, no-throw-sentinel-for<O> S2>
          requires constructible_from<iter_value_t<O>, iter_reference_t<I>>
            uninitialized_copy_result<I, O>
              uninitialized_copy(I ifirst, S1 ilast, O ofirst, S2 olast);
        template<input_range IR, no-throw-forward-range OR>
          requires constructible_from<range_value_t<OR>, range_reference_t<IR>>
            uninitialized_copy_result<borrowed_iterator_t<IR>, borrowed_iterator_t<OR>>
              uninitialized_copy(IR&& in_range, OR&& out_range);
    
        template<class I, class O>
          using uninitialized_copy_n_result = in_out_result<I, O>;
        template<input_iterator I, no-throw-forward-iterator O, no-throw-sentinel-for<O> S>
          requires constructible_from<iter_value_t<O>, iter_reference_t<I>>
            uninitialized_copy_n_result<I, O>
              uninitialized_copy_n(I ifirst, iter_difference_t<I> n, O ofirst, S olast);
      }
    
      template<class InputIt, class NoThrowForwardIt>
        NoThrowForwardIt uninitialized_move(InputIt first, InputIt last,
                                            NoThrowForwardIt result);
      template<class ExecutionPolicy, class ForwardIt, class NoThrowForwardIt>
        NoThrowForwardIt uninitialized_move(ExecutionPolicy&& exec,
                                            ForwardIt first, ForwardIt last,
                                            NoThrowForwardIt result);
      template<class InputIt, class Size, class NoThrowForwardIt>
        pair<InputIt, NoThrowForwardIt>
          uninitialized_move_n(InputIt first, Size n, NoThrowForwardIt result);
      template<class ExecutionPolicy, class ForwardIt, class Size,
               class NoThrowForwardIt>
        pair<ForwardIt, NoThrowForwardIt>
          uninitialized_move_n(ExecutionPolicy&& exec,
                               ForwardIt first, Size n, NoThrowForwardIt result);
    
      namespace ranges {
        template<class I, class O>
          using uninitialized_move_result = in_out_result<I, O>;
        template<input_iterator I, sentinel_for<I> S1,
                 no-throw-forward-iterator O, no-throw-sentinel-for<O> S2>
          requires constructible_from<iter_value_t<O>, iter_rvalue_reference_t<I>>
            uninitialized_move_result<I, O>
              uninitialized_move(I ifirst, S1 ilast, O ofirst, S2 olast);
        template<input_range IR, no-throw-forward-range OR>
          requires constructible_from<range_value_t<OR>, range_rvalue_reference_t<IR>>
            uninitialized_move_result<borrowed_iterator_t<IR>, borrowed_iterator_t<OR>>
              uninitialized_move(IR&& in_range, OR&& out_range);
    
        template<class I, class O>
          using uninitialized_move_n_result = in_out_result<I, O>;
```
```cpp
        template<input_iterator I,
                 no-throw-forward-iterator O, no-throw-sentinel-for<O> S>
          requires constructible_from<iter_value_t<O>, iter_rvalue_reference_t<I>>
            uninitialized_move_n_result<I, O>
              uninitialized_move_n(I ifirst, iter_difference_t<I> n, O ofirst, S olast);
      }
     
      template<class NoThrowForwardIt, class T>
        void uninitialized_fill(NoThrowForwardIt first, NoThrowForwardIt last,
                                const T& x);
      template<class ExecutionPolicy, class NoThrowForwardIt, class T>
        void uninitialized_fill(ExecutionPolicy&& exec,
                                NoThrowForwardIt first, NoThrowForwardIt last,
                                const T& x);
      template<class NoThrowForwardIt, class Size, class T>
        NoThrowForwardIt
          uninitialized_fill_n(NoThrowForwardIt first, Size n, const T& x);
      template<class ExecutionPolicy, class NoThrowForwardIt, class Size, class T>
        NoThrowForwardIt
          uninitialized_fill_n(ExecutionPolicy&& exec,
                               NoThrowForwardIt first, Size n, const T& x);
     
      namespace ranges {
        template<no-throw-forward-iterator I, no-throw-sentinel-for<I> S, class T>
          requires constructible_from<iter_value_t<I>, const T&>
            I uninitialized_fill(I first, S last, const T& x);
        template<no-throw-forward-range R, class T>
          requires constructible_from<range_value_t<R>, const T&>
            borrowed_iterator_t<R> uninitialized_fill(R&& r, const T& x);
     
        template<no-throw-forward-iterator I, class T>
          requires constructible_from<iter_value_t<I>, const T&>
            I uninitialized_fill_n(I first, iter_difference_t<I> n, const T& x);
      }
     
      // construct_at
      template<class T, class... Args>
        constexpr T* construct_at(T* location, Args&&... args);
     
      namespace ranges {
        template<class T, class... Args>
          constexpr T* construct_at(T* location, Args&&... args);
      }
     
      // destroy
      template<class T>
        constexpr void destroy_at(T* location);
      template<class NoThrowForwardIt>
        constexpr void destroy(NoThrowForwardIt first, NoThrowForwardIt last);
      template<class ExecutionPolicy, class NoThrowForwardIt>
        void destroy(ExecutionPolicy&& exec,
                     NoThrowForwardIt first, NoThrowForwardIt last);
      template<class NoThrowForwardIt, class Size>
        constexpr NoThrowForwardIt destroy_n(NoThrowForwardIt first, Size n);
      template<class ExecutionPolicy, class NoThrowForwardIt, class Size>
        NoThrowForwardIt destroy_n(ExecutionPolicy&& exec,
                                   NoThrowForwardIt first, Size n);
     
      namespace ranges {
        template<destructible T>
          constexpr void destroy_at(T* location) noexcept;
     
        template<no-throw-input-iterator I, no-throw-sentinel-for<I> S>
          requires destructible<iter_value_t<I>>
            constexpr I destroy(I first, S last) noexcept;
        template<no-throw-input-range R>
          requires destructible<range_value_t<R>>
            constexpr borrowed_iterator_t<R> destroy(R&& r) noexcept;
     
        template<no-throw-input-iterator I>
          requires destructible<iter_value_t<I>>
            constexpr I destroy_n(I first, iter_difference_t<I> n) noexcept;
      }
     
      // class template unique_ptr
      template<class T> struct default_delete;
      template<class T> struct default_delete<T[]>;
      template<class T, class D = default_delete<T>> class unique_ptr;
      template<class T, class D> class unique_ptr<T[], D>;
     
      template<class T, class... Args>
        unique_ptr<T> make_unique(Args&&... args);                                  // T is not array
      template<class T>
        unique_ptr<T> make_unique(size_t n);                                        // T is U[]
      template<class T, class... Args>
        /* unspecified */ make_unique(Args&&...) = delete;                          // T is U[N]
     
      template<class T>
        unique_ptr<T> make_unique_for_overwrite();                                  // T is not array
      template<class T>
        unique_ptr<T> make_unique_for_overwrite(size_t n);                          // T is U[]
      template<class T, class... Args>
        /* unspecified */ make_unique_for_overwrite(Args&&...) = delete;            // T is U[N]
     
      template<class T, class D>
        void swap(unique_ptr<T, D>& x, unique_ptr<T, D>& y) noexcept;
     
      template<class T1, class D1, class T2, class D2>
        bool operator==(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y);
      template<class T1, class D1, class T2, class D2>
        bool operator<(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y);
      template<class T1, class D1, class T2, class D2>
        bool operator>(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y);
      template<class T1, class D1, class T2, class D2>
        bool operator<=(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y);
      template<class T1, class D1, class T2, class D2>
        bool operator>=(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y);
      template<class T1, class D1, class T2, class D2>
        requires three_way_comparable_with<typename unique_ptr<T1, D1>::pointer,
                                           typename unique_ptr<T2, D2>::pointer>
        compare_three_way_result_t<typename unique_ptr<T1, D1>::pointer,
                                   typename unique_ptr<T2, D2>::pointer>
          operator<=>(const unique_ptr<T1, D1>& x, const unique_ptr<T2, D2>& y);
     
      template<class T, class D>
        bool operator==(const unique_ptr<T, D>& x, nullptr_t) noexcept;
      template<class T, class D>
        bool operator<(const unique_ptr<T, D>& x, nullptr_t);
      template<class T, class D>
        bool operator<(nullptr_t, const unique_ptr<T, D>& y);
      template<class T, class D>
        bool operator>(const unique_ptr<T, D>& x, nullptr_t);
      template<class T, class D>
        bool operator>(nullptr_t, const unique_ptr<T, D>& y);
      template<class T, class D>
        bool operator<=(const unique_ptr<T, D>& x, nullptr_t);
      template<class T, class D>
        bool operator<=(nullptr_t, const unique_ptr<T, D>& y);
      template<class T, class D>
        bool operator>=(const unique_ptr<T, D>& x, nullptr_t);
      template<class T, class D>
        bool operator>=(nullptr_t, const unique_ptr<T, D>& y);
      template<class T, class D>
        requires three_way_comparable<typename unique_ptr<T, D>::pointer>
        compare_three_way_result_t<typename unique_ptr<T, D>::pointer>
          operator<=>(const unique_ptr<T, D>& x, nullptr_t);
     
      template<class E, class T, class Y, class D>
        basic_ostream<E, T>& operator<<(basic_ostream<E, T>& os, const unique_ptr<Y, D>& p);
     
      // class bad_weak_ptr
      class bad_weak_ptr;
     
      // class template shared_ptr
      template<class T> class shared_ptr;
     
      // shared_ptr creation
      template<class T, class... Args>
        shared_ptr<T> make_shared(Args&&... args);                                  // T is not array
      template<class T, class A, class... Args>
        shared_ptr<T> allocate_shared(const A& a, Args&&... args);                  // T is not array
     
      template<class T>
        shared_ptr<T> make_shared(size_t N);                                        // T is U[]
      template<class T, class A>
        shared_ptr<T> allocate_shared(const A& a, size_t N);                        // T is U[]
     
      template<class T>
        shared_ptr<T> make_shared();                                                // T is U[N]
      template<class T, class A>
        shared_ptr<T> allocate_shared(const A& a);                                  // T is U[N]
     
      template<class T>
        shared_ptr<T> make_shared(size_t N, const remove_extent_t<T>& u);           // T is U[]
      template<class T, class A>
        shared_ptr<T> allocate_shared(const A& a, size_t N,
                                      const remove_extent_t<T>& u);                 // T is U[]
     
      template<class T>
        shared_ptr<T> make_shared(const remove_extent_t<T>& u);                     // T is U[N]
      template<class T, class A>
        shared_ptr<T> allocate_shared(const A& a, const remove_extent_t<T>& u);     // T is U[N]
     
      template<class T>
        shared_ptr<T> make_shared_for_overwrite();                                  // T is not U[]
      template<class T, class A>
        shared_ptr<T> allocate_shared_for_overwrite(const A& a);                    // T is not U[]
     
      template<class T>
        shared_ptr<T> make_shared_for_overwrite(size_t N);                          // T is U[]
      template<class T, class A>
        shared_ptr<T> allocate_shared_for_overwrite(const A& a, size_t N);          // T is U[]
     
      // shared_ptr comparisons
      template<class T, class U>
        bool operator==(const shared_ptr<T>& a, const shared_ptr<U>& b) noexcept;
      template<class T, class U>
        strong_ordering operator<=>(const shared_ptr<T>& a, const shared_ptr<U>& b) noexcept;
     
      template<class T>
        bool operator==(const shared_ptr<T>& x, nullptr_t) noexcept;
      template<class T>
        strong_ordering operator<=>(const shared_ptr<T>& x, nullptr_t) noexcept;
     
      // shared_ptr specialized algorithms
      template<class T>
        void swap(shared_ptr<T>& a, shared_ptr<T>& b) noexcept;
     
      // shared_ptr casts
      template<class T, class U>
        shared_ptr<T> static_pointer_cast(const shared_ptr<U>& r) noexcept;
      template<class T, class U>
        shared_ptr<T> static_pointer_cast(shared_ptr<U>&& r) noexcept;
      template<class T, class U>
        shared_ptr<T> dynamic_pointer_cast(const shared_ptr<U>& r) noexcept;
      template<class T, class U>
        shared_ptr<T> dynamic_pointer_cast(shared_ptr<U>&& r) noexcept;
      template<class T, class U>
        shared_ptr<T> const_pointer_cast(const shared_ptr<U>& r) noexcept;
      template<class T, class U>
        shared_ptr<T> const_pointer_cast(shared_ptr<U>&& r) noexcept;
      template<class T, class U>
        shared_ptr<T> reinterpret_pointer_cast(const shared_ptr<U>& r) noexcept;
      template<class T, class U>
        shared_ptr<T> reinterpret_pointer_cast(shared_ptr<U>&& r) noexcept;
     
      // shared_ptr get_deleter
      template<class D, class T>
        D* get_deleter(const shared_ptr<T>& p) noexcept;
     
      // shared_ptr I/O
      template<class E, class T, class Y>
        basic_ostream<E, T>& operator<<(basic_ostream<E, T>& os, const shared_ptr<Y>& p);
     
      // class template weak_ptr
      template<class T> class weak_ptr;
     
      // weak_ptr specialized algorithms
      template<class T> void swap(weak_ptr<T>& a, weak_ptr<T>& b) noexcept;
     
      // class template owner_less
      template<class T = void> struct owner_less;
     
      // class template enable_shared_from_this
      template<class T> class enable_shared_from_this;
     
      // hash support
      template<class T> struct hash;
      template<class T, class D> struct hash<unique_ptr<T, D>>;
      template<class T> struct hash<shared_ptr<T>>;
     
      // atomic smart pointers
      template<class T> struct atomic;
      template<class T> struct atomic<shared_ptr<T>>;
      template<class T> struct atomic<weak_ptr<T>>;
     
      // class template out_ptr_t
      template<class Smart, class Pointer, class... Args>
        class out_ptr_t;
     
      // function template out_ptr
      template<class Pointer = void, class Smart, class... Args>
        auto out_ptr(Smart& s, Args&&... args);
     
      // class template inout_ptr_t
      template<class Smart, class Pointer, class... Args>
        class inout_ptr_t;
     
      // function template inout_ptr
      template<class Pointer = void, class Smart, class... Args>
        auto inout_ptr(Smart& s, Args&&... args);
    }
     
    // deprecated
    namespace std {
      template<class T>
        bool atomic_is_lock_free(const shared_ptr<T>* p);
     
      template<class T>
        shared_ptr<T> atomic_load(const shared_ptr<T>* p);
      template<class T>
        shared_ptr<T> atomic_load_explicit(const shared_ptr<T>* p, memory_order mo);
     
      template<class T>
        void atomic_store(shared_ptr<T>* p, shared_ptr<T> r);
      template<class T>
        void atomic_store_explicit(shared_ptr<T>* p, shared_ptr<T> r, memory_order mo);
     
      template<class T>
        shared_ptr<T> atomic_exchange(shared_ptr<T>* p, shared_ptr<T> r);
      template<class T>
        shared_ptr<T> atomic_exchange_explicit(shared_ptr<T>* p, shared_ptr<T> r, memory_order mo);
     
      template<class T>
        bool atomic_compare_exchange_weak(shared_ptr<T>* p, shared_ptr<T>* v, shared_ptr<T> w);
      template<class T>
        bool atomic_compare_exchange_strong(shared_ptr<T>* p, shared_ptr<T>* v, shared_ptr<T> w);
      template<class T>
        bool atomic_compare_exchange_weak_explicit(
          shared_ptr<T>* p, shared_ptr<T>* v, shared_ptr<T> w,
          memory_order success, memory_order failure);
      template<class T>
        bool atomic_compare_exchange_strong_explicit(
          shared_ptr<T>* p, shared_ptr<T>* v, shared_ptr<T> w,
          memory_order success, memory_order failure);
    }
```

#### Conceitos Auxiliares

Nota: [Estes nomes](<#/doc/memory/ranges/nothrow_concepts>) são apenas para exposição, eles não fazem parte da interface.
```cpp
    template<class I>
    concept no-throw-input-iterator = // exposition only
      input_iterator<I> &&
      is_lvalue_reference_v<iter_reference_t<I>> &&
      same_as<remove_cvref_t<iter_reference_t<I>>, iter_value_t<I>>;
     
    template<class S, class I>
    concept no-throw-sentinel-for = sentinel_for<S, I>; // exposition only
     
    template<class R>
    concept no-throw-input-range = // exposition only
      ranges::range<R> &&
      no-throw-input-iterator<ranges::iterator_t<R>> &&
      no-throw-sentinel-for<ranges::sentinel_t<R>, ranges::iterator_t<R>>;
     
    template<class I>
    concept no-throw-forward-iterator = // exposition only
      no-throw-input-iterator<I> &&
      forward_iterator<I> &&
      no-throw-sentinel-for<I, I>;
     
    template<class R>
    concept no-throw-forward-range = // exposition only
      no-throw-input-range<R> &&
      no-throw-forward-iterator<ranges::iterator_t<R>>;
```

#### Modelo de classe [std::pointer_traits](<#/doc/memory/pointer_traits>)
```cpp
    namespace std {
      template<class Ptr> struct pointer_traits {
        using pointer         = Ptr;
        using element_type    = /* see description */;
        using difference_type = /* see description */;
     
        template<class U> using rebind = /* see description */;
     
        static pointer pointer_to(/* see description */ r);
      };
     
      template<class T> struct pointer_traits<T*> {
        using pointer         = T*;
        using element_type    = T;
        using difference_type = ptrdiff_t;
     
        template<class U> using rebind = U*;
     
        static constexpr pointer pointer_to(/* see description */ r) noexcept;
      };
    }
```

#### Classe [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>)
```cpp
    namespace std {
      struct allocator_arg_t { explicit allocator_arg_t() = default; };
      inline constexpr allocator_arg_t allocator_arg{};
    }
```

#### Modelo de classe [std::allocator_traits](<#/doc/memory/allocator_traits>)
```cpp
    namespace std {
      template<class Alloc> struct allocator_traits {
        using allocator_type     = Alloc;
     
        using value_type         = typename Alloc::value_type;
     
        using pointer            = /* see description */;
        using const_pointer      = /* see description */;
        using void_pointer       = /* see description */;
        using const_void_pointer = /* see description */;
     
        using difference_type    = /* see description */;
        using size_type          = /* see description */;
     
        using propagate_on_container_copy_assignment = /* see description */;
        using propagate_on_container_move_assignment = /* see description */;
        using propagate_on_container_swap            = /* see description */;
        using is_always_equal                        = /* see description */;
     
        template<class T> using rebind_alloc = /* see description */;
        template<class T> using rebind_traits = allocator_traits<rebind_alloc<T>>;
     
        static pointer allocate(Alloc& a, size_type n);
        static pointer allocate(Alloc& a, size_type n,
                                const_void_pointer hint);
     
        static constexpr allocation_result<pointer, size_type>
              allocate_at_least(Alloc& a, size_type n);
     
        static void deallocate(Alloc& a, pointer p, size_type n);
     
        template<class T, class... Args>
          static void construct(Alloc& a, T* p, Args&&... args);
     
        template<class T>
          static void destroy(Alloc& a, T* p);
     
        static size_type max_size(const Alloc& a) noexcept;
     
        static Alloc select_on_container_copy_construction(const Alloc& rhs);
      };
    }
```

#### Modelo de classe [std::allocator](<#/doc/memory/allocator>)
```cpp
    namespace std {
      template<class T> class allocator {
       public:
        using value_type                             = T;
        using size_type                              = size_t;
        using difference_type                        = ptrdiff_t;
        using propagate_on_container_move_assignment = true_type;
     
        constexpr allocator() noexcept;
        constexpr allocator(const allocator&) noexcept;
        template<class U> constexpr allocator(const allocator<U>&) noexcept;
        constexpr ~allocator();
        constexpr allocator& operator=(const allocator&) = default;
     
        constexpr T* allocate(size_t n);
        constexpr allocation_result<T*> allocate_at_least(size_t n);
        constexpr void deallocate(T* p, size_t n);
     
        // deprecated
        using is_always_equal = true_type;
      };
    }
```

#### Modelo de classe [std::default_delete](<#/doc/memory/default_delete>)
```cpp
    namespace std {
      template<class T> struct default_delete {
        constexpr default_delete() noexcept = default;
        template<class U> default_delete(const default_delete<U>&) noexcept;
        void operator()(T*) const;
      };
     
      template<class T> struct default_delete<T[]> {
        constexpr default_delete() noexcept = default;
        template<class U> default_delete(const default_delete<U[]>&) noexcept;
        template<class U> void operator()(U* ptr) const;
      };
    }
```

#### Modelo de classe [std::unique_ptr](<#/doc/memory/unique_ptr>)
```cpp
    namespace std {
      template<class T, class D = default_delete<T>> class unique_ptr {
      public:
        using pointer      = /* see description */;
        using element_type = T;
        using deleter_type = D;
     
        // constructors
        constexpr unique_ptr() noexcept;
        explicit unique_ptr(pointer p) noexcept;
        unique_ptr(pointer p, /* see description */ d1) noexcept;
        unique_ptr(pointer p, /* see description */ d2) noexcept;
        unique_ptr(unique_ptr&& u) noexcept;
        constexpr unique_ptr(nullptr_t) noexcept;
        template<class U, class E>
          unique_ptr(unique_ptr<U, E>&& u) noexcept;
     
        // destructor
        ~unique_ptr();
     
        // assignment
        unique_ptr& operator=(unique_ptr&& u) noexcept;
        template<class U, class E>
          unique_ptr& operator=(unique_ptr<U, E>&& u) noexcept;
        unique_ptr& operator=(nullptr_t) noexcept;
     
        // observers
        add_lvalue_reference_t<T> operator*() const noexcept(/* see description */);
        pointer operator->() const noexcept;
        pointer get() const noexcept;
        deleter_type& get_deleter() noexcept;
        const deleter_type& get_deleter() const noexcept;
        explicit operator bool() const noexcept;
     
        // modifiers
        pointer release() noexcept;
        void reset(pointer p = pointer()) noexcept;
        void swap(unique_ptr& u) noexcept;
     
        // disable copy from lvalue
        unique_ptr(const unique_ptr&) = delete;
        unique_ptr& operator=(const unique_ptr&) = delete;
      };
     
      template<class T, class D> class unique_ptr<T[], D> {
      public:
        using pointer      = /* see description */;
        using element_type = T;
        using deleter_type = D;
     
        // constructors
        constexpr unique_ptr() noexcept;
        template<class U> explicit unique_ptr(U p) noexcept;
        template<class U> unique_ptr(U p, /* see description */ d) noexcept;
        template<class U> unique_ptr(U p, /* see description */ d) noexcept;
        unique_ptr(unique_ptr&& u) noexcept;
        template<class U, class E>
          unique_ptr(unique_ptr<U, E>&& u) noexcept;
        constexpr unique_ptr(nullptr_t) noexcept;
     
        // destructor
        ~unique_ptr();
     
        // assignment
        unique_ptr& operator=(unique_ptr&& u) noexcept;
        template<class U, class E>
          unique_ptr& operator=(unique_ptr<U, E>&& u) noexcept;
        unique_ptr& operator=(nullptr_t) noexcept;
     
        // observers
        T& operator const;
        pointer get() const noexcept;
        deleter_type& get_deleter() noexcept;
        const deleter_type& get_deleter() const noexcept;
        explicit operator bool() const noexcept;
     
        // modifiers
        pointer release() noexcept;
        template<class U> void reset(U p) noexcept;
        void reset(nullptr_t = nullptr) noexcept;
        void swap(unique_ptr& u) noexcept;
     
        // disable copy from lvalue
        unique_ptr(const unique_ptr&) = delete;
        unique_ptr& operator=(const unique_ptr&) = delete;
      };
    }
```

#### Classe [std::bad_weak_ptr](<#/doc/memory/bad_weak_ptr>)
```cpp
    namespace std {
      class bad_weak_ptr : public exception {
      public:
        bad_weak_ptr() noexcept;
      };
    }
```

#### Modelo de classe [std::shared_ptr](<#/doc/memory/shared_ptr>)
```cpp
    namespace std {
      template<class T> class shared_ptr {
      public:
        using element_type = remove_extent_t<T>;
        using weak_type    = weak_ptr<T>;
     
        // constructors
        constexpr shared_ptr() noexcept;
        constexpr shared_ptr(nullptr_t) noexcept : shared_ptr() { }
        template<class Y>
          explicit shared_ptr(Y* p);
        template<class Y, class D>
          shared_ptr(Y* p, D d);
        template<class Y, class D, class A>
          shared_ptr(Y* p, D d, A a);
        template<class D>
          shared_ptr(nullptr_t p, D d);
        template<class D, class A>
          shared_ptr(nullptr_t p, D d, A a);
        template<class Y>
          shared_ptr(const shared_ptr<Y>& r, element_type* p) noexcept;
        template<class Y>
          shared_ptr(shared_ptr<Y>&& r, element_type* p) noexcept;
        shared_ptr(const shared_ptr& r) noexcept;
        template<class Y>
          shared_ptr(const shared_ptr<Y>& r) noexcept;
        shared_ptr(shared_ptr&& r) noexcept;
        template<class Y>
          shared_ptr(shared_ptr<Y>&& r) noexcept;
        template<class Y>
          explicit shared_ptr(const weak_ptr<Y>& r);
        template<class Y, class D>
          shared_ptr(unique_ptr<Y, D>&& r);
     
        // destructor
        ~shared_ptr();
     
        // assignment
        shared_ptr& operator=(const shared_ptr& r) noexcept;
        template<class Y>
          shared_ptr& operator=(const shared_ptr<Y>& r) noexcept;
        shared_ptr& operator=(shared_ptr&& r) noexcept;
        template<class Y>
          shared_ptr& operator=(shared_ptr<Y>&& r) noexcept;
        template<class Y, class D>
          shared_ptr& operator=(unique_ptr<Y, D>&& r);
     
        // modifiers
        void swap(shared_ptr& r) noexcept;
        void reset() noexcept;
        template<class Y>
          void reset(Y* p);
        template<class Y, class D>
          void reset(Y* p, D d);
        template<class Y, class D, class A>
          void reset(Y* p, D d, A a);
     
        // observers
        element_type* get() const noexcept;
        T& operator*() const noexcept;
        T* operator->() const noexcept;
        element_type& operator const;
        long use_count() const noexcept;
        explicit operator bool() const noexcept;
        template<class U>
          bool owner_before(const shared_ptr<U>& b) const noexcept;
        template<class U>
          bool owner_before(const weak_ptr<U>& b) const noexcept;
      };
     
      template<class T>
        shared_ptr(weak_ptr<T>) -> shared_ptr<T>;
      template<class T, class D>
        shared_ptr(unique_ptr<T, D>) -> shared_ptr<T>;
    }
```

#### Modelo de classe [std::weak_ptr](<#/doc/memory/weak_ptr>)
```cpp
    namespace std {
      template<class T> class weak_ptr {
      public:
        using element_type = remove_extent_t<T>;
     
        // constructors
        constexpr weak_ptr() noexcept;
        template<class Y>
          weak_ptr(const shared_ptr<Y>& r) noexcept;
        weak_ptr(const weak_ptr& r) noexcept;
        template<class Y>
          weak_ptr(const weak_ptr<Y>& r) noexcept;
        weak_ptr(weak_ptr&& r) noexcept;
        template<class Y>
          weak_ptr(weak_ptr<Y>&& r) noexcept;
     
        // destructor
        ~weak_ptr();
     
        // assignment
        weak_ptr& operator=(const weak_ptr& r) noexcept;
        template<class Y>
          weak_ptr& operator=(const weak_ptr<Y>& r) noexcept;
        template<class Y>
          weak_ptr& operator=(const shared_ptr<Y>& r) noexcept;
        weak_ptr& operator=(weak_ptr&& r) noexcept;
        template<class Y>
          weak_ptr& operator=(weak_ptr<Y>&& r) noexcept;
     
        // modifiers
        void swap(weak_ptr& r) noexcept;
        void reset() noexcept;
     
        // observers
        long use_count() const noexcept;
        bool expired() const noexcept;
        shared_ptr<T> lock() const noexcept;
        template<class U>
          bool owner_before(const shared_ptr<U>& b) const noexcept;
        template<class U>
          bool owner_before(const weak_ptr<U>& b) const noexcept;
      };
     
      template<class T>
        weak_ptr(shared_ptr<T>) -> weak_ptr<T>;
    }
```

#### Modelo de classe [std::owner_less](<#/doc/memory/owner_less>)
```cpp
    namespace std {
      template<class T = void> struct owner_less;
     
      template<class T> struct owner_less<shared_ptr<T>> {
        bool operator()(const shared_ptr<T>&, const shared_ptr<T>&) const noexcept;
        bool operator()(const shared_ptr<T>&, const weak_ptr<T>&) const noexcept;
        bool operator()(const weak_ptr<T>&, const shared_ptr<T>&) const noexcept;
      };
     
      template<class T> struct owner_less<weak_ptr<T>> {
        bool operator()(const weak_ptr<T>&, const weak_ptr<T>&) const noexcept;
        bool operator()(const shared_ptr<T>&, const weak_ptr<T>&) const noexcept;
        bool operator()(const weak_ptr<T>&, const shared_ptr<T>&) const noexcept;
      };
     
      template<> struct owner_less<void> {
        template<class T, class U>
          bool operator()(const shared_ptr<T>&, const shared_ptr<U>&) const noexcept;
        template<class T, class U>
          bool operator()(const shared_ptr<T>&, const weak_ptr<U>&) const noexcept;
        template<class T, class U>
          bool operator()(const weak_ptr<T>&, const shared_ptr<U>&) const noexcept;
        template<class T, class U>
          bool operator()(const weak_ptr<T>&, const weak_ptr<U>&) const noexcept;
     
        using is_transparent = /* unspecified */;
      };
    }
```

#### Modelo de classe [std::enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)
```cpp
    namespace std {
      template<class T> class enable_shared_from_this {
      protected:
        constexpr enable_shared_from_this() noexcept;
        enable_shared_from_this(const enable_shared_from_this&) noexcept;
        enable_shared_from_this& operator=(const enable_shared_from_this&) noexcept;
        ~enable_shared_from_this();
     
      public:
        shared_ptr<T> shared_from_this();
        shared_ptr<T const> shared_from_this() const;
        weak_ptr<T> weak_from_this() noexcept;
        weak_ptr<T const> weak_from_this() const noexcept;
     
      private:
        mutable weak_ptr<T> weak_this;  // exposition only
      };
    }
```

#### Especialização do modelo de classe [std::atomic](<#/doc/atomic/atomic>) para [std::shared_ptr](<#/doc/memory/shared_ptr>)
```cpp
    namespace std {
      template<class T> struct atomic<shared_ptr<T>> {
        using value_type = shared_ptr<T>;
        static constexpr bool is_always_lock_free = /* implementation-defined */;
     
        bool is_lock_free() const noexcept;
        void store(shared_ptr<T> desired, memory_order order = memory_order::seq_cst) noexcept;
        shared_ptr<T> load(memory_order order = memory_order::seq_cst) const noexcept;
        operator shared_ptr<T>() const noexcept;
     
        shared_ptr<T> exchange(shared_ptr<T> desired,
                               memory_order order = memory_order::seq_cst) noexcept;
     
        bool compare_exchange_weak(shared_ptr<T>& expected, shared_ptr<T> desired,
                                   memory_order success, memory_order failure) noexcept;
        bool compare_exchange_strong(shared_ptr<T>& expected, shared_ptr<T> desired,
                                     memory_order success, memory_order failure) noexcept;
     
        bool compare_exchange_weak(shared_ptr<T>& expected, shared_ptr<T> desired,
                                   memory_order order = memory_order::seq_cst) noexcept;
        bool compare_exchange_strong(shared_ptr<T>& expected, shared_ptr<T> desired,
                                     memory_order order = memory_order::seq_cst) noexcept;
     
        constexpr atomic() noexcept = default;
        atomic(shared_ptr<T> desired) noexcept;
        atomic(const atomic&) = delete;
        void operator=(const atomic&) = delete;
        void operator=(shared_ptr<T> desired) noexcept;
     
      private:
        shared_ptr<T> p;            // exposition only
      };
    }
```

#### Especialização do modelo de classe [std::atomic](<#/doc/atomic/atomic>) para [std::weak_ptr](<#/doc/memory/weak_ptr>)
```cpp
    namespace std {
      template<class T> struct atomic<weak_ptr<T>> {
        using value_type = weak_ptr<T>;
```
```cpp
        static constexpr bool is_always_lock_free = /* implementation-defined */;
     
        bool is_lock_free() const noexcept;
        void store(weak_ptr<T> desired, memory_order order = memory_order::seq_cst) noexcept;
        weak_ptr<T> load(memory_order order = memory_order::seq_cst) const noexcept;
        operator weak_ptr<T>() const noexcept;
     
        weak_ptr<T> exchange(weak_ptr<T> desired,
                             memory_order order = memory_order::seq_cst) noexcept;
     
        bool compare_exchange_weak(weak_ptr<T>& expected, weak_ptr<T> desired,
                                   memory_order success, memory_order failure) noexcept;
        bool compare_exchange_strong(weak_ptr<T>& expected, weak_ptr<T> desired,
                                     memory_order success, memory_order failure) noexcept;
     
        bool compare_exchange_weak(weak_ptr<T>& expected, weak_ptr<T> desired,
                                   memory_order order = memory_order::seq_cst) noexcept;
        bool compare_exchange_strong(weak_ptr<T>& expected, weak_ptr<T> desired,
                                     memory_order order = memory_order::seq_cst) noexcept;
     
        constexpr atomic() noexcept = default;
        atomic(weak_ptr<T> desired) noexcept;
        atomic(const atomic&) = delete;
        void operator=(const atomic&) = delete;
        void operator=(weak_ptr<T> desired) noexcept;
     
      private:
        weak_ptr<T> p;              // apenas para exposição
      };
    }
```

#### Modelo de classe [std::out_ptr_t](<#/doc/memory/out_ptr_t>)
```cpp
    namespace std {
      template<class Smart, class Pointer, class... Args>
      class out_ptr_t {
      public:
        explicit out_ptr_t(Smart&, Args...);
        out_ptr_t(const out_ptr_t&) = delete;
     
        ~out_ptr_t();
     
        operator Pointer*() const noexcept;
        operator void**() const noexcept;
     
      private:
        Smart& s;                   // apenas para exposição
        tuple<Args...> a;           // apenas para exposição
        Pointer p;                  // apenas para exposição
      };
    }
```

#### Modelo de classe [std::inout_ptr_t](<#/doc/memory/inout_ptr_t>)
```cpp
    namespace std {
      template<class Smart, class Pointer, class... Args>
      class inout_ptr_t {
      public:
        explicit inout_ptr_t(Smart&, Args...);
        inout_ptr_t(const inout_ptr_t&) = delete;
     
        ~inout_ptr_t();
     
        operator Pointer*() const noexcept;
        operator void**() const noexcept;
     
      private:
        Smart& s;                   // apenas para exposição
        tuple<Args...> a;           // apenas para exposição
        Pointer p;                  // apenas para exposição
      };
    }
```