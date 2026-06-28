# std::experimental::pmr::unsynchronized_pool_resource::do_allocate

virtual void* do_allocate( [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment ); |  |  (library fundamentals TS)  

  
Aloca armazenamento. 

Se o pool selecionado para um bloco de `bytes` de tamanho for incapaz de satisfazer a requisição a partir de suas estruturas de dados internas, chama `allocate()` no recurso de memória upstream para obter memória. 

Se o tamanho requisitado for maior do que o maior pool pode manipular, a memória é alocada chamando `allocate()` no recurso de memória upstream. 

### Valor de retorno

Um ponteiro para armazenamento alocado de pelo menos `bytes` bytes em tamanho, alinhado ao `alignment` especificado se tal alinhamento for suportado, e a `alignof(std::max_align_t)` caso contrário. 

### Exceções

Não lança exceções a menos que a chamada a `allocate()` no recurso de memória upstream lance. 

### Veja também

[ allocate](<#/doc/experimental/memory_resource/allocate>) |  aloca memória   
(função membro pública de `std::experimental::pmr::memory_resource`)  
[ do_allocate](<#/doc/experimental/memory_resource/do_allocate>)[virtual] |  aloca memória   
(função membro virtual protegida de `std::experimental::pmr::memory_resource`)