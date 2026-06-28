# std::experimental::pmr::synchronized_pool_resource::do_deallocate

virtual void do_deallocate( void* p, [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment ); |  |  (library fundamentals TS)  

  
Devolve a memória em `p` para o pool. É não especificado se ou sob quais circunstâncias esta operação resultará em uma chamada para `deallocate()` no recurso de memória upstream. 

### Exceptions

Não lança exceções. 

### See also

[ deallocate](<#/doc/experimental/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::experimental::pmr::memory_resource`)  
[ do_deallocate](<#/doc/experimental/memory_resource/do_deallocate>)[virtual] |  desaloca memória   
(função membro protegida virtual de `std::experimental::pmr::memory_resource`)