# std::experimental::pmr::polymorphic_allocator&lt;T&gt;::allocate

T* allocate( [std::size_t](<#/doc/types/size_t>) n ); | | (library fundamentals TS)

Aloca armazenamento para n objetos do tipo `T` usando o recurso de memória subjacente. Equivalente a

```cpp
return static_cast<T*>(this->resource()->allocate(n * sizeof(T), alignof(T)));
```

### Parâmetros

- **n** — o número de objetos para os quais alocar armazenamento

### Valor de retorno

Um ponteiro para o armazenamento alocado.

### Veja também

[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] | aloca armazenamento não inicializado usando o alocador
(função membro estática pública de `std::allocator_traits<Alloc>`)
[ deallocate](<#/doc/experimental/memory_resource/deallocate>) | desaloca memória
(função membro pública de `std::experimental::pmr::memory_resource`)