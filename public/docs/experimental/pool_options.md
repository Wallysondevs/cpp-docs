# std::experimental::pmr::pool_options

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
struct pool_options {
std::size_t max_blocks_per_chunk = 0;
std::size_t largest_required_pool_block = 0;
};
```

A struct `std::experimental::pmr::pool_options` contém um conjunto de opções de construtor para [std::experimental::pmr::synchronized_pool_resource](<#/doc/experimental/synchronized_pool_resource>) e [std::experimental::pmr::unsynchronized_pool_resource](<#/doc/experimental/unsynchronized_pool_resource>).

### Membros de dados

std::size_t max_blocks_per_chunk | o número máximo de blocos que serão alocados de uma vez do memory resource upstream para reabastecer um pool
(membro objeto público)
std::size_t largest_required_pool_block | o maior tamanho de alocação que deve ser atendido através do mecanismo de pooling
(membro objeto público)

Se o valor de `max_blocks_per_chunk` for zero ou maior que um limite definido pela implementação, esse limite será usado. A implementação pode usar um valor menor do que o especificado e pode usar valores diferentes para pools diferentes.

Se o valor de `largest_required_pool_block` for zero ou maior que um limite definido pela implementação, esse limite será usado. A implementação pode usar um limite maior do que o especificado neste campo.

### Ver também

[ synchronized_pool_resource](<#/doc/experimental/synchronized_pool_resource>) | um [memory_resource](<#/doc/experimental/memory_resource>) thread-safe para gerenciar alocações em pools de diferentes tamanhos de bloco
(classe)
[ unsynchronized_pool_resource](<#/doc/experimental/unsynchronized_pool_resource>) | um [memory_resource](<#/doc/experimental/memory_resource>) thread-unsafe para gerenciar alocações em pools de diferentes tamanhos de bloco
(classe)