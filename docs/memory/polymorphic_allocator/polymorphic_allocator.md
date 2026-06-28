# std::pmr::polymorphic_allocator&lt;T&gt;::polymorphic_allocator

```cpp
polymorphic_allocator() noexcept;  // (1)
polymorphic_allocator( const polymorphic_allocator& other ) = default;  // (2)
template< class U >
polymorphic_allocator( const polymorphic_allocator<U>& other ) noexcept;  // (3)
polymorphic_allocator( std::pmr::memory_resource* r );  // (4)
```

Constrói um novo `polymorphic_allocator`.

1) Constrói um `polymorphic_allocator` usando o valor de retorno de [std::pmr::get_default_resource](<#/doc/memory/get_default_resource>)() como o recurso de memória subjacente.

2,3) Constrói um `polymorphic_allocator` usando other.resource() como o recurso de memória subjacente.

4) Constrói um `polymorphic_allocator` usando r como o recurso de memória subjacente. Este construtor fornece uma conversão implícita de [std::pmr::memory_resource](<#/doc/memory/memory_resource>)*.

### Parâmetros

- **other** — outro `polymorphic_allocator` para copiar
- **r** — ponteiro para o recurso de memória a ser usado. Não pode ser nulo

### Exceções

4) Não lança exceções.

### Notas

Copiar um container usando um `polymorphic_allocator` não chamará o construtor de cópia do alocador. Em vez disso, o novo container usará o valor de retorno de `[select_on_container_copy_construction](<#/doc/memory/polymorphic_allocator/select_on_container_copy_construction>)` (um `polymorphic_allocator` construído por padrão) como seu alocador.

### Veja também

[ select_on_container_copy_construction](<#/doc/memory/polymorphic_allocator/select_on_container_copy_construction>) | cria um novo `polymorphic_allocator` para uso pelo construtor de cópia de um container
(função membro pública)