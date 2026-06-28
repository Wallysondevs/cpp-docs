# std::experimental::pmr::polymorphic_allocator&lt;T&gt;::polymorphic_allocator

```cpp
polymorphic_allocator() noexcept;  // (1)
polymorphic_allocator( const polymorphic_allocator& other ) noexcept = default;  // (2)
template< class U >
polymorphic_allocator( const polymorphic_allocator<U>& other ) noexcept;  // (3)
polymorphic_allocator( memory_resource* r );  // (4)
```

  
Constrói um novo `polymorphic_allocator`. 

1) Constrói um `polymorphic_allocator` usando o valor de retorno de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() como o recurso de memória subjacente.

2,3) Constrói um `polymorphic_allocator` usando other.resource() como o recurso de memória subjacente.

4) Constrói um `polymorphic_allocator` usando `r` como o recurso de memória subjacente. Este construtor fornece uma conversão implícita de `memory_resource*`.

### Parâmetros

other  |  \-  |  outro `polymorphic_allocator` para copiar   
---|---|---
r  |  \-  |  ponteiro para o recurso de memória a ser usado. Não pode ser nulo   
  
### Exceções

4) Não lança exceções.