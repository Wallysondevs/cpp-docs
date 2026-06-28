# Cabeçalho de biblioteca experimental &lt;experimental/memory_resource&gt;

Este cabeçalho faz parte do Library Fundamentals TS ([v1](<#/doc/experimental/memory>), [v2](<#/doc/experimental/lib_extensions_2>), [v3](<#/doc/experimental/lib_extensions_3>)).

### Classes

Definido no namespace `std::experimental::pmr`
---
[ memory_resource](<#/doc/experimental/memory_resource>) | uma interface abstrata para classes que encapsulam recursos de memória
(class)
[ synchronized_pool_resource](<#/doc/experimental/synchronized_pool_resource>) | um memory_resource thread-safe para gerenciar alocações em pools de diferentes tamanhos de bloco
(class)
[ unsynchronized_pool_resource](<#/doc/experimental/unsynchronized_pool_resource>) | um memory_resource não thread-safe para gerenciar alocações em pools de diferentes tamanhos de bloco
(class)
[ monotonic_buffer_resource](<#/doc/experimental/monotonic_buffer_resource>) | um memory_resource de propósito especial que libera a memória alocada apenas quando o recurso é destruído
(class)
[ polymorphic_allocator](<#/doc/experimental/polymorphic_allocator>) | um alocador que suporta polimorfismo em tempo de execução baseado no memory_resource com o qual é construído
(class template)
[ resource_adaptor](<#/doc/experimental/resource_adaptor>) | adapta um alocador em um memory_resource
(alias template)

### Funções

Definido no namespace `std::experimental::pmr`
---

##### Comparação

[ operator==operator!=](<#/doc/experimental/memory_resource/operator_eq>) | compara dois `memory_resource`s
(function)
[ operator==operator!=](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/pmr/polymorphic_allocator/operator_cmp&action=edit&redlink=1> "cpp/experimental/pmr/polymorphic allocator/operator cmp \(page does not exist\)") | compara dois alocadores
(function template)

##### Recursos de memória globais

[ new_delete_resource](<#/doc/experimental/new_delete_resource>) | retorna um `memory_resource` estático em todo o programa que usa os [operator new](<#/doc/memory/new/operator_new>) e [operator delete](<#/doc/memory/new/operator_delete>) globais para alocar e desalocar memória
(function)
[ null_memory_resource](<#/doc/experimental/null_memory_resource>) | retorna um `memory_resource` estático que não realiza nenhuma alocação
(function)

##### Recurso de memória padrão

[ get_default_resource](<#/doc/experimental/get_default_resource>) | obtém o `memory_resource` padrão
(function)
[ set_default_resource](<#/doc/experimental/set_default_resource>) | define o `memory_resource` padrão
(function)

### Sinopse
```
    namespace std {
    namespace experimental {
    inline namespace fundamentals_v1 {
    namespace pmr {
    
      class memory_resource;
    
      bool operator==(const memory_resource& a,
                      const memory_resource& b) noexcept;
      bool operator!=(const memory_resource& a,
                      const memory_resource& b) noexcept;
    
      template <class Tp> class polymorphic_allocator;
    
      template <class T1, class T2>
      bool operator==(const polymorphic_allocator<T1>& a,
                      const polymorphic_allocator<T2>& b) noexcept;
      template <class T1, class T2>
      bool operator!=(const polymorphic_allocator<T1>& a,
                      const polymorphic_allocator<T2>& b) noexcept;
    
      // O nome resource_adaptor_imp é apenas para exposição.
      template <class Allocator> class resource_adaptor_imp;
    
      template <class Allocator>
        using resource_adaptor = resource_adaptor_imp<
          typename allocator_traits<Allocator>::template rebind_alloc<char>>;
    
      // Recursos de memória globais
      memory_resource* new_delete_resource() noexcept;
      memory_resource* null_memory_resource() noexcept;
    
      // O recurso de memória padrão
      memory_resource* set_default_resource(memory_resource* r) noexcept;
      memory_resource* get_default_resource() noexcept;
    
      // Recursos de memória padrão
      struct pool_options;
      class synchronized_pool_resource;
      class unsynchronized_pool_resource;
      class monotonic_buffer_resource;
    
    } // namespace pmr
    } // namespace fundamentals_v1
    } // namespace experimental
    } // namespace std
```