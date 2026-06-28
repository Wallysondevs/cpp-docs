# Header da biblioteca padrão &lt;new&gt;

Este header faz parte da biblioteca de [gerenciamento de memória dinâmica](<#/doc/memory>), em particular fornece recursos de [gerenciamento de memória de baixo nível](<#/doc/memory/new>).

### Classes
  
---  
[ bad_alloc](<#/doc/memory/new/bad_alloc>) | exceção lançada quando a alocação de memória falha   
(classe)  
[ bad_array_new_length](<#/doc/memory/new/bad_array_new_length>)(desde C++11) | exceção lançada na alocação de array com comprimento inválido   
(classe)  
[ align_val_t](<#/doc/memory/new/align_val_t>)(desde C++17) | tipo usado para passar alinhamento para funções de alocação e desalocação cientes de alinhamento   
(enum)  
  
### Tipos  
  
[ new_handler](<#/doc/memory/new/new_handler>) | tipo de ponteiro para função do new handler   
(typedef)  
  
### Tags  
  
[ nothrownothrow_t](<#/doc/memory/new/nothrow>) | uma tag usada para selecionar uma _função de alocação_ que não lança exceções  
(tag)  
[ destroying_deletedestroying_delete_t](<#/doc/memory/new/destroying_delete_t>)(desde C++20) | uma tag usada para selecionar sobrecargas de destroying-delete de [operator delete](<#/doc/memory/new/operator_delete>)  
(tag)  
  
### Constantes  
  
[ hardware_destructive_interference_sizehardware_constructive_interference_size](<#/doc/thread/hardware_destructive_interference_size>)(desde C++17) | deslocamento mínimo para evitar false sharing  
deslocamento máximo para promover true sharing   
(constante)  
  
### Funções  
  
[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação   
(função)  
[ operator deleteoperator delete[]](<#/doc/memory/new/operator_delete>) | funções de desalocação   
(função)  
[ get_new_handler](<#/doc/memory/new/get_new_handler>)(desde C++11) | obtém o new handler atual   
(função)  
[ set_new_handler](<#/doc/memory/new/set_new_handler>) | registra um new handler   
(função)  
[ launder](<#/doc/utility/launder>)(desde C++17) | barreira de otimização de ponteiro   
(modelo de função)  
  
### Sinopse
```cpp
    namespace std {
      // storage allocation errors
      class bad_alloc;
      class bad_array_new_length;
    
      struct destroying_delete_t {
        explicit destroying_delete_t() = default;
      };
      inline constexpr destroying_delete_t destroying_delete{};
    
      // global operator new control
      enum class align_val_t : size_t {};
    
      struct nothrow_t { explicit nothrow_t() = default; };
      extern const nothrow_t nothrow;
    
      using new_handler = void (*)();
      new_handler get_new_handler() noexcept;
      new_handler set_new_handler(new_handler new_p) noexcept;
    
      // pointer optimization barrier
      template<class T> constexpr T* launder(T* p) noexcept;
    
      // hardware interference size
      inline constexpr size_t hardware_destructive_interference_size =
        /* implementation-defined */;
      inline constexpr size_t hardware_constructive_interference_size =
        /* implementation-defined */;
    }
    
    // storage allocation and deallocation
    void* operator new(std::size_t size);
    void* operator new(std::size_t size, std::align_val_t alignment);
    void* operator new(std::size_t size, const std::nothrow_t&) noexcept;
    void* operator new(std::size_t size, std::align_val_t alignment,
                                     const std::nothrow_t&) noexcept;
    
    void  operator delete(void* ptr) noexcept;
    void  operator delete(void* ptr, std::size_t size) noexcept;
    void  operator delete(void* ptr, std::align_val_t alignment) noexcept;
    void  operator delete(void* ptr, std::size_t size, std::align_val_t alignment) noexcept;
    void  operator delete(void* ptr, const std::nothrow_t&) noexcept;
    void  operator delete(void* ptr, std::align_val_t alignment,
                          const std::nothrow_t&) noexcept;
    
    void* operator new size);
    void* operator new size, std::align_val_t alignment);
    void* operator new size, const std::nothrow_t&) noexcept;
    void* operator new size, std::align_val_t alignment,
                                       const std::nothrow_t&) noexcept;
    
    void  operator delete noexcept;
    void  operator delete size) noexcept;
    void  operator delete alignment) noexcept;
    void  operator delete size, std::align_val_t alignment) noexcept;
    void  operator delete&) noexcept;
    void  operator delete alignment,
                            const std::nothrow_t&) noexcept;
    
    constexpr void* operator new  (std::size_t size, void* ptr) noexcept;
    constexpr void* operator new size, void* ptr) noexcept;
    void  operator delete  (void* ptr, void*) noexcept;
    void  operator delete noexcept;
```