# std::pmr::unsynchronized_pool_resource::do_allocate

```cpp
virtual void* do_allocate( std::size_t bytes, std::size_t alignment );  // (desde C++17)
```

  
Aloca armazenamento. 

Se o pool selecionado para um bloco de tamanho bytes for incapaz de satisfazer a requisição a partir de suas estruturas de dados internas, chama `allocate()` no recurso de memória upstream para obter memória. 

Se o tamanho requisitado for maior do que o maior pool pode manipular, a memória é alocada chamando `allocate()` no recurso de memória upstream. 

### Valor de retorno

Um ponteiro para armazenamento alocado de pelo menos bytes bytes em tamanho, alinhado ao alinhamento especificado se tal alinhamento for suportado, e a alignof([std::max_align_t](<#/doc/types/max_align_t>)) caso contrário. 

### Exceções

Não lança exceções a menos que a chamada a `allocate()` no recurso de memória upstream lance. 

### Veja também

[ allocate](<#/doc/memory/memory_resource/allocate>) | aloca memória   
(função membro pública de `std::pmr::memory_resource`)  
[ do_allocate](<#/doc/memory/memory_resource/do_allocate>)[virtual] | aloca memória  
(função membro privada virtual de `std::pmr::memory_resource`)