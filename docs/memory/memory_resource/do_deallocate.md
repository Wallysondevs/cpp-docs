# std::pmr::memory_resource::do_deallocate

```cpp
virtual void do_deallocate( void* p, std::size_t bytes, std::size_t alignment ) = 0;  // (desde C++17)
```

  
Desaloca o armazenamento apontado por p. 

p deve ter sido retornado por uma chamada anterior a `allocate(bytes, alignment)` em um `memory_resource` que se compara como igual a *this, e o armazenamento para o qual ele aponta ainda não deve ter sido desalocado, caso contrário, o comportamento é indefinido. 

### Exceções 

Não lança exceções. 

### Veja também 

[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública)  