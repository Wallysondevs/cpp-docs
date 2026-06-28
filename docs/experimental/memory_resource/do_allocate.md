# std::experimental::pmr::memory_resource::do_allocate

virtual void* do_allocate( [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment ) = 0; |  |  (library fundamentals TS)  

  
Aloca armazenamento com um tamanho de pelo menos `bytes` bytes. O armazenamento retornado é alinhado ao `alignment` especificado se tal alinhamento for suportado, e a `alignof([std::max_align_t](<#/doc/types/max_align_t>))` caso contrário. 

`alignment` deve ser uma potência de dois. 

### Exceções

Lança uma exceção se o armazenamento do tamanho e alinhamento solicitados não puder ser obtido. 

### Veja também

[ allocate](<#/doc/experimental/memory_resource/allocate>) | aloca memória   
(função membro pública)  