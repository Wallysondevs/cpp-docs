# std::experimental::pmr::memory_resource::do_deallocate

virtual void* do_deallocate( void* p, [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment ) = 0; |  |  (library fundamentals TS)  

  
Desaloca o armazenamento apontado por p. p deve ter sido retornado por uma chamada anterior a `allocate(bytes, alignment)` em um `memory_resource` que se compara como igual a *this, e o armazenamento para o qual ele aponta não deve ter sido desalocado ainda.

### Exceções

Não lança exceções.

### Veja também

[ deallocate](<#/doc/experimental/memory_resource/deallocate>) |  desaloca memória   
(função membro pública)  