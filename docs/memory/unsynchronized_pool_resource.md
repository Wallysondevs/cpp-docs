# std::pmr::unsynchronized_pool_resource

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
class unsynchronized_pool_resource : public std::pmr::memory_resource;
```

A classe `std::pmr::unsynchronized_pool_resource` é uma classe de recurso de memória de propósito geral com as seguintes propriedades:

*   Ela possui a memória alocada e a libera na destruição, mesmo que `deallocate` não tenha sido chamado para alguns dos blocos alocados.
*   Consiste em uma coleção de _pools_ que atende a requisições para diferentes tamanhos de bloco. Cada pool gerencia uma coleção de _chunks_ que são então divididos em blocos de tamanho uniforme.
*   Chamadas para [`do_allocate`](<#/doc/memory/unsynchronized_pool_resource/do_allocate>) são despachadas para o pool que atende aos menores blocos que acomodam o tamanho solicitado.
*   Esgotar a memória no pool faz com que a próxima requisição de alocação para aquele pool aloque um chunk adicional de memória do _upstream allocator_ para reabastecer o pool. O tamanho do chunk obtido aumenta geometricamente.
*   Requisições de alocação que excedem o maior tamanho de bloco são atendidas diretamente pelo _upstream allocator_.
*   O maior tamanho de bloco e o tamanho máximo do chunk podem ser ajustados passando uma struct [std::pmr::pool_options](<#/doc/memory/pool_options>) para seu construtor.

`unsynchronized_pool_resource` não é thread-safe e não pode ser acessado por múltiplas threads simultaneamente; use [`synchronized_pool_resource`](<#/doc/memory/synchronized_pool_resource>) se o acesso por múltiplas threads for necessário.

### Funções membro

[ (construtor)](<#/doc/memory/unsynchronized_pool_resource/unsynchronized_pool_resource>) | constrói um `unsynchronized_pool_resource`
(função membro pública)
[ (destrutor)](<#/doc/memory/unsynchronized_pool_resource/~unsynchronized_pool_resource>)[virtual] | destrói um `unsynchronized_pool_resource`, liberando toda a memória alocada
(função membro pública virtual)
operator=[deleted] | o operador de atribuição de cópia é deletado. `unsynchronized_pool_resource` não é copiável por atribuição
(função membro pública)

##### Funções membro públicas

[ release](<#/doc/memory/unsynchronized_pool_resource/release>) | libera toda a memória alocada
(função membro pública)
[ upstream_resource](<#/doc/memory/unsynchronized_pool_resource/upstream_resource>) | retorna um ponteiro para o recurso de memória upstream
(função membro pública)
[ options](<#/doc/memory/unsynchronized_pool_resource/options>) | retorna as opções que controlam o comportamento de pooling deste recurso
(função membro pública)

##### Funções membro protegidas

[ do_allocate](<#/doc/memory/unsynchronized_pool_resource/do_allocate>)[virtual] | aloca memória
(função membro protegida virtual)
[ do_deallocate](<#/doc/memory/unsynchronized_pool_resource/do_deallocate>)[virtual] | retorna memória para o pool
(função membro protegida virtual)
[ do_is_equal](<#/doc/memory/unsynchronized_pool_resource/do_is_equal>)[virtual] | compara por igualdade com outro [std::pmr::memory_resource](<#/doc/memory/memory_resource>)
(função membro protegida virtual)