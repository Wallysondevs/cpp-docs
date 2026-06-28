# std::pmr::polymorphic_allocator&lt;T&gt;::deallocate_object

```cpp
template< class U >
void deallocate_object( U* p, std::size_t n = 1 );  // (desde C++20)
```

  
Desaloca o armazenamento apontado por p, que deve ter sido alocado de um [std::pmr::memory_resource](<#/doc/memory/memory_resource>) x que se compara como igual a *resource(), usando x.allocate(n * sizeof(U), alignof(U)), tipicamente através de uma chamada para allocate_object&lt;U&gt;(n).

Equivalente a deallocate_bytes(p, n * sizeof(U), alignof(U));.

### Parâmetros

p  |  \-  |  ponteiro para a memória a ser desalocada   
---|---|---
n  |  \-  |  número de objetos do tipo U para os quais a memória foi alocada   
  
### Exceções

Não lança exceções.

### Notas

Esta função foi introduzida para uso com o alocador totalmente especializado [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<>, mas pode ser útil em qualquer especialização.

### Ver também

[ deallocate_bytes](<#/doc/memory/polymorphic_allocator/deallocate_bytes>)(C++20) |  libera memória bruta obtida de `allocate_bytes`   
(função membro pública)  
[ delete_object](<#/doc/memory/polymorphic_allocator/delete_object>)(C++20) |  destrói e desaloca um objeto   
(função membro pública)  
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] |  desaloca armazenamento usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::pmr::memory_resource`)