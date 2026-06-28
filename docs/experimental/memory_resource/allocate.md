# std::experimental::pmr::memory_resource::allocate

void* allocate( [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment = alignof([std::max_align_t](<#/doc/types/max_align_t>)) ); |  |  (library fundamentals TS)  

  
Aloca armazenamento com um tamanho de pelo menos `bytes` bytes. O armazenamento retornado é alinhado ao `alignment` especificado se tal alinhamento for suportado, e a `alignof([std::max_align_t](<#/doc/types/max_align_t>))` caso contrário.

Equivalente a `return do_allocate(bytes, alignment);`.

### Exceções

Lança uma exceção se o armazenamento do tamanho e alinhamento solicitados não puder ser obtido.

### Veja também

[ do_allocate](<#/doc/experimental/memory_resource/do_allocate>)[virtual] | aloca memória   
(função membro virtual protegida)  