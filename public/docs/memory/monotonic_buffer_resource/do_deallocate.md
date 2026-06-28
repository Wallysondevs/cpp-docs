# std::pmr::monotonic_buffer_resource::do_deallocate

```cpp
virtual void do_deallocate( void* p, std::size_t bytes, std::size_t alignment );  // (desde C++17)
```

  
Esta função não tem efeito. A memória usada por um [`monotonic_buffer_resource`](<#/doc/memory/monotonic_buffer_resource>), como o nome indica, aumenta monotonicamente até que o recurso seja destruído. 

### Exceções 

Não lança exceções. 

### Ver também 

[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::pmr::memory_resource`)  
[ do_deallocate](<#/doc/memory/memory_resource/do_deallocate>)[virtual] |  desaloca memória  
(função membro virtual privada de `std::pmr::memory_resource`)