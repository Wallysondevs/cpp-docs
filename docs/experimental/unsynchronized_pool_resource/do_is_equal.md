# std::experimental::pmr::unsynchronized_pool_resource::do_is_equal

virtual bool do_is_equal( const memory_resource& other ) const noexcept; |  |  (library fundamentals TS)  

  
Compara *this com other por identidade - memória alocada usando um `unsynchronized_pool_resource` só pode ser desalocada usando aquele mesmo recurso. 

### Valor de retorno

this == dynamic_cast&lt;const unsynchronized_pool_resource*&gt;(&other)

### Veja também

[ do_is_equal](<#/doc/experimental/memory_resource/do_is_equal>)[virtual] |  compara por igualdade com outro `memory_resource`   
(função membro virtual protegida de `std::experimental::pmr::memory_resource`)  