# std::experimental::pmr::monotonic_buffer_resource::do_allocate

virtual void* do_allocate( [std::size_t](<#/doc/types/size_t>) bytes, [std::size_t](<#/doc/types/size_t>) alignment ); |  |  (library fundamentals TS)  

  
Aloca armazenamento.

Se o _current buffer_ tiver espaço não utilizado suficiente para acomodar um bloco com o tamanho e alinhamento especificados, aloca o bloco de retorno do current buffer.

Caso contrário, esta função aloca um novo buffer chamando `upstream_resource()->allocate(n, m)`, onde `n` não é menor que o maior entre bytes e o _next buffer size_ e `m` não é menor que alignment. Ela define o novo buffer como o _current buffer_, aumenta o _next buffer size_ por um fator de crescimento definido pela implementação (que não é necessariamente integral), e então aloca o bloco de retorno do buffer recém-alocado.

### Valor de retorno

Um ponteiro para armazenamento alocado de pelo menos bytes bytes em tamanho, alinhado ao alignment especificado se tal alinhamento for suportado, e a alignof([std::max_align_t](<#/doc/types/max_align_t>)) caso contrário.

### Exceções

Não lança exceções, a menos que a chamada a `allocate()` no upstream memory resource lance uma.

### Veja também

[ allocate](<#/doc/experimental/memory_resource/allocate>) |  aloca memória   
(função membro pública de `std::experimental::pmr::memory_resource`)  
[ do_allocate](<#/doc/experimental/memory_resource/do_allocate>)[virtual] |  aloca memória   
(função membro protegida virtual de `std::experimental::pmr::memory_resource`)