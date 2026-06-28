# std::experimental::pmr::polymorphic_allocator&lt;T&gt;::deallocate

void deallocate( T* p, [std::size_t](<#/doc/types/size_t>) n ); |  |  (library fundamentals TS)  

  
Desaloca o armazenamento apontado por p, que deve ter sido alocado de um(a) [`memory_resource`](<#/doc/experimental/memory_resource>) `x` que se compara igual a *resource() usando x.allocate(n * sizeof(T), alignof(T)). 

Equivalente a this->resource()->deallocate(p, n * sizeof(T), alignof(T));. 

### Parâmetros

p  |  \-  |  ponteiro para a memória a ser desalocada   
---|---|---
n  |  \-  |  o número de objetos originalmente alocados   
  
### Exceções

Não lança exceções. 

### Veja também

[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] |  desaloca armazenamento usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ deallocate](<#/doc/experimental/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::experimental::pmr::memory_resource`)