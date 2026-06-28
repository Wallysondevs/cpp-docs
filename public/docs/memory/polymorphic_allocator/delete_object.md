# std::pmr::polymorphic_allocator&lt;T&gt;::delete_object

```cpp
template< class U >
void delete_object( U* p );  // (desde C++20)
```

  
Destrói o objeto do tipo `U` e desaloca o armazenamento alocado para ele. 

Equivalente a  
[std::allocator_traits](<#/doc/memory/allocator_traits>)<polymorphic_allocator>::destroy(*this, p);  
deallocate_object(p);

### Parâmetros

p  |  \-  |  ponteiro para o objeto a ser destruído e desalocado   
  
### Exceções

Não lança exceções. 

### Notas

Esta função foi introduzida para uso com o alocador totalmente especializado [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<>, mas pode ser útil em qualquer especialização. 

### Veja também

[ deallocate_bytes](<#/doc/memory/polymorphic_allocator/deallocate_bytes>)(C++20) |  libera memória bruta obtida de `allocate_bytes`   
(função membro pública)  
[ deallocate_object](<#/doc/memory/polymorphic_allocator/deallocate_object>)(C++20) |  libera memória bruta obtida por `allocate_object`   
(função membro pública)  
[ deallocate](<#/doc/memory/allocator_traits/deallocate>)[static] |  desaloca armazenamento usando o alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)  
[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::pmr::memory_resource`)