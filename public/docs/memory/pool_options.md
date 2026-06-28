# std::pmr::pool_options

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
struct pool_options;
```

`std::pmr::pool_options` é um conjunto de opções de construtor para recursos de pool, incluindo `[std::pmr::synchronized_pool_resource](<#/doc/memory/synchronized_pool_resource>)` e `[std::pmr::unsynchronized_pool_resource](<#/doc/memory/unsynchronized_pool_resource>)`.

### Membros de dados

Membro | Significado
---|---
| `[std::size_t](<#/doc/types/size_t>) max_blocks_per_chunk;`

O número máximo de blocos que serão alocados de uma vez do `[std::pmr::memory_resource](<#/doc/memory/memory_resource>)` upstream para reabastecer o pool. Se o valor de `max_blocks_per_chunk` for zero ou maior que um limite definido pela implementação, esse limite será usado. A implementação pode optar por usar um valor menor do que o especificado neste campo e pode usar valores diferentes para pools diferentes.
| `[std::size_t](<#/doc/types/size_t>) largest_required_pool_block;`

O maior tamanho de alocação que deve ser atendido usando o mecanismo de pooling. Tentativas de alocar um único bloco maior que este limite serão alocadas diretamente do `[std::pmr::memory_resource](<#/doc/memory/memory_resource>)` upstream. Se `largest_required_pool_block` for zero ou maior que um limite definido pela implementação, esse limite será usado. A implementação pode escolher um limite de passagem direta maior do que o especificado neste campo.

### Veja também

`[ synchronized_pool_resource](<#/doc/memory/synchronized_pool_resource>)`(C++17) | um `[std::pmr::memory_resource](<#/doc/memory/memory_resource>)` thread-safe para gerenciar alocações em pools de diferentes tamanhos de bloco
(class)
`[ unsynchronized_pool_resource](<#/doc/memory/unsynchronized_pool_resource>)`(C++17) | um `[std::pmr::memory_resource](<#/doc/memory/memory_resource>)` thread-unsafe para gerenciar alocações em pools de diferentes tamanhos de bloco
(class)