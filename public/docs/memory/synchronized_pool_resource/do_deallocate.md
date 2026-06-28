# std::pmr::synchronized_pool_resource::do_deallocate

```cpp
virtual void do_deallocate( void* p, std::size_t bytes, std::size_t alignment );  // (desde C++17)
```

  
Retorna a memória em `p` para o pool. É não especificado se ou sob quais circunstâncias esta operação resultará em uma chamada a `deallocate()` no recurso de memória upstream. 

### Exceções 

Não lança exceções. 

### Veja também 

[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::pmr::memory_resource`)  
[ do_deallocate](<#/doc/memory/memory_resource/do_deallocate>)[virtual] |  desaloca memória  
(função membro privada virtual de `std::pmr::memory_resource`)