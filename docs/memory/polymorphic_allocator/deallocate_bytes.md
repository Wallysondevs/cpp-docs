# std::pmr::polymorphic_allocator&lt;T&gt;::deallocate_bytes

void deallocate_bytes( void* p,  
[std::size_t](<#/doc/types/size_t>) nbytes,  
[std::size_t](<#/doc/types/size_t>) alignment = alignof([std::max_align_t](<#/doc/types/max_align_t>)) ); |  |  (desde C++20)  

  
Desaloca o armazenamento apontado por p, que deve ter sido alocado de um [std::pmr::memory_resource](<#/doc/memory/memory_resource>) x que se compara como igual a *resource(), usando x.allocate(nbytes, alignment), tipicamente através de uma chamada para allocate_bytes(nbytes, alignment).

Equivalente a resource()->deallocate(p, nbytes, alignment);.

### Parâmetros

p  |  \-  |  ponteiro para a memória a ser desalocada   
---|---|---
nbytes  |  \-  |  o número de bytes originalmente alocados   
alignment  |  \-  |  o alinhamento originalmente alocado   
  
### Exceções

Não lança exceções.

### Notas

Esta função foi introduzida para uso com o alocador totalmente especializado [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<>, mas pode ser útil em qualquer especialização.

### Veja também

[ deallocate_object](<#/doc/memory/polymorphic_allocator/deallocate_object>)(C++20) |  libera memória bruta obtida por `allocate_object`   
(função membro pública)  
[ delete_object](<#/doc/memory/polymorphic_allocator/delete_object>)(C++20) |  destrói e desaloca um objeto   
(função membro pública)  
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] |  desaloca armazenamento usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::pmr::memory_resource`)