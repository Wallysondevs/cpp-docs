# std::pmr::polymorphic_allocator&lt;T&gt;::allocate_bytes

void* allocate_bytes( [std::size_t](<#/doc/types/size_t>) nbytes,  
[std::size_t](<#/doc/types/size_t>) alignment = alignof([std::max_align_t](<#/doc/types/max_align_t>)) ); |  |  (desde C++20)  

  
Aloca `nbytes` bytes de armazenamento com o alinhamento `alignment` especificado usando o recurso de memória subjacente. Equivalente a `return resource()->allocate(nbytes, alignment);`.

### Parâmetros

nbytes  |  \-  |  o número de bytes a alocar   
---|---|---
alignment  |  \-  |  o alinhamento a ser usado   
  
### Valor de retorno

Um ponteiro para o armazenamento alocado.

### Notas

Esta função foi introduzida para uso com o alocador totalmente especializado [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<>, mas pode ser útil em qualquer especialização.

O tipo de retorno é `void*` (em vez de, por exemplo, `[std::byte](<#/doc/types/byte>)*`) para suportar a conversão para um tipo de ponteiro arbitrário `U*` por `static_cast<U*>`.

### Exceções

Pode lançar quaisquer exceções lançadas pela chamada a `resource()->allocate`.

### Veja também

[ allocate_object](<#/doc/memory/polymorphic_allocator/allocate_object>)(C++20) |  aloca memória bruta adequada para um objeto ou um array   
(função membro pública)  
[ new_object](<#/doc/memory/polymorphic_allocator/new_object>)(C++20) |  aloca e constrói um objeto   
(função membro pública)  
[ allocate](<#/doc/memory/polymorphic_allocator/allocate>) |  aloca memória   
(função membro pública)  
[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] |  aloca armazenamento não inicializado usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ allocate](<#/doc/memory/memory_resource/allocate>) |  aloca memória   
(função membro pública de `std::pmr::memory_resource`)