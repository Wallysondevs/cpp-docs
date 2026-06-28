# std::experimental::pmr::monotonic_buffer_resource::monotonic_buffer_resource

monotonic_buffer_resource(); | (1) | (TS de fundamentos da biblioteca)
---|---|---
explicit monotonic_buffer_resource( memory_resource* upstream ); | (2) | (TS de fundamentos da biblioteca)
explicit monotonic_buffer_resource( [std::size_t](<#/doc/types/size_t>) initial_size ); | (3) | (TS de fundamentos da biblioteca)
monotonic_buffer_resource( [std::size_t](<#/doc/types/size_t>) initial_size, memory_resource* upstream ); | (4) | (TS de fundamentos da biblioteca)
monotonic_buffer_resource( void* buffer, [std::size_t](<#/doc/types/size_t>) buffer_size ); | (5) | (TS de fundamentos da biblioteca)
monotonic_buffer_resource( void* buffer, [std::size_t](<#/doc/types/size_t>) buffer_size, memory_resource* upstream ); | (6) | (TS de fundamentos da biblioteca)
monotonic_buffer_resource( const monotonic_buffer_resource& ) = delete; | (7) | (TS de fundamentos da biblioteca)

Constrói um `monotonic_buffer_resource`. Os construtores que não recebem um ponteiro para um recurso de memória upstream usam o valor de retorno de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() como o recurso de memória upstream.

1,2) Define o _buffer atual_ como nulo e o _tamanho do próximo buffer_ como um tamanho definido pela implementação.

3,4) Define o _buffer atual_ como nulo e o _tamanho do próximo buffer_ como um tamanho não menor que `initial_size`.

5,6) Define o _buffer atual_ como `buffer` e o _tamanho do próximo buffer_ como `buffer_size` (mas não menor que 1). Em seguida, aumenta o _tamanho do próximo buffer_ por um fator de crescimento definido pela implementação (que não precisa ser integral).

7) O construtor de cópia é deletado.

### Parâmetros

- **upstream** — o recurso de memória upstream a ser usado; deve apontar para um recurso de memória válido
- **initial_size** — o tamanho mínimo do primeiro buffer a ser alocado; deve ser maior que zero
- **buffer** — o buffer inicial a ser usado
- **buffer_size** — o tamanho do buffer inicial; não pode ser maior que o número de bytes em `buffer`