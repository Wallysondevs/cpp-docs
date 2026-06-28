# std::pmr::monotonic_buffer_resource::do_allocate

```cpp
virtual void* do_allocate( std::size_t bytes, std::size_t alignment );  // (desde C++17)
```

  
Aloca armazenamento.

Se o _buffer atual_ tiver espaço não utilizado suficiente para caber um bloco com o tamanho e alinhamento especificados, aloca o bloco de retorno do buffer atual.

Caso contrário, esta função aloca um novo buffer chamando upstream_resource()->allocate(n, m), onde `n` não é menor que o maior entre bytes e o _tamanho do próximo buffer_ e `m` não é menor que alignment. Ela define o novo buffer como o _buffer atual_, aumenta o _tamanho do próximo buffer_ por um fator de crescimento definido pela implementação (que não é necessariamente integral), e então aloca o bloco de retorno do buffer recém-alocado.

### Valor de retorno

Um ponteiro para o armazenamento alocado de pelo menos `bytes` bytes de tamanho, alinhado ao alinhamento especificado se tal alinhamento for suportado, e a alignof([std::max_align_t](<#/doc/types/max_align_t>)) caso contrário.

### Exceções

Não lança exceções, a menos que a chamada a `allocate()` no recurso de memória upstream lance.

### Veja também

[ allocate](<#/doc/memory/memory_resource/allocate>) | aloca memória   
(função membro pública de `std::pmr::memory_resource`)  
[ do_allocate](<#/doc/memory/memory_resource/do_allocate>)[virtual] | aloca memória  
(função membro virtual privada de `std::pmr::memory_resource`)