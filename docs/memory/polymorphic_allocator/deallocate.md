# std::pmr::polymorphic_allocator&lt;T&gt;::deallocate

```cpp
void deallocate( T* p, std::size_t n );
```
(desde C++17)

Desaloca o armazenamento apontado por `p`, que deve ter sido alocado de um(a) [std::pmr::memory_resource](<#/doc/memory/memory_resource>) `x` que se compara como igual a `*resource()` usando `x.allocate(n * sizeof(T), alignof(T))`.

Equivalente a `this->resource()->deallocate(p, n * sizeof(T), alignof(T));`.

### Parâmetros

p  |  \-  |  ponteiro para a memória a ser desalocada
---|---|---
n  |  \-  |  o número de objetos originalmente alocados

### Exceções

Não lança exceções.

### Veja também

[ deallocate_bytes](<#/doc/memory/polymorphic_allocator/deallocate_bytes>)(C++20) | libera memória bruta obtida de `allocate_bytes`
(função membro pública)
[ deallocate_object](<#/doc/memory/polymorphic_allocator/deallocate_object>)(C++20) | libera memória bruta obtida por `allocate_object`
(função membro pública)
[ delete_object](<#/doc/memory/polymorphic_allocator/delete_object>)(C++20) | destrói e desaloca um objeto
(função membro pública)
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] | desaloca armazenamento usando o alocador
(função membro estática pública de `std::allocator_traits<Alloc>`)
[ deallocate](<#/doc/memory/memory_resource/deallocate>) | desaloca memória
(função membro pública de `std::pmr::memory_resource`)