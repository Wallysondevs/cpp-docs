# std::pmr::synchronized_pool_resource

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
class synchronized_pool_resource : public std::pmr::memory_resource;
```

A classe `std::pmr::synchronized_pool_resource` é uma classe de recurso de memória de propósito geral com as seguintes propriedades:

*   Ela possui a memória alocada e a libera na destruição, mesmo que `deallocate` não tenha sido chamado para alguns dos blocos alocados.
*   Consiste em uma coleção de _pools_ que atende a requisições para diferentes tamanhos de bloco. Cada pool gerencia uma coleção de _chunks_ que são então divididos em blocos de tamanho uniforme.
*   Chamadas para [`do_allocate`](<#/doc/memory/synchronized_pool_resource/do_allocate>) são despachadas para o pool que atende aos menores blocos que acomodam o tamanho solicitado.
*   Esgotar a memória no pool faz com que a próxima requisição de alocação para aquele pool aloque um _chunk_ adicional de memória do _upstream allocator_ para reabastecer o pool. O tamanho do _chunk_ obtido aumenta geometricamente.
*   Requisições de alocação que excedem o maior tamanho de bloco são atendidas diretamente pelo _upstream allocator_.
*   O maior tamanho de bloco e o tamanho máximo do _chunk_ podem ser ajustados passando uma struct [std::pmr::pool_options](<#/doc/memory/pool_options>) para seu construtor.

`synchronized_pool_resource` pode ser acessado de múltiplas threads sem sincronização externa, e pode ter pools específicos para threads para reduzir custos de sincronização. Se o recurso de memória for acessado apenas de uma thread, [`unsynchronized_pool_resource`](<#/doc/memory/unsynchronized_pool_resource>) é mais eficiente.

### Funções membro

[ (construtor)](<#/doc/memory/synchronized_pool_resource/synchronized_pool_resource>) | constrói um `synchronized_pool_resource`
(função membro pública)
[ (destrutor)](<#/doc/memory/synchronized_pool_resource/~synchronized_pool_resource>)[virtual] | destrói um `synchronized_pool_resource`, liberando toda a memória alocada
(função membro pública virtual)
operator=[deleted] | o operador de atribuição de cópia é deletado. `synchronized_pool_resource` não é copiável por atribuição
(função membro pública)

##### Funções membro públicas

[ release](<#/doc/memory/synchronized_pool_resource/release>) | libera toda a memória alocada
(função membro pública)
[ upstream_resource](<#/doc/memory/synchronized_pool_resource/upstream_resource>) | retorna um ponteiro para o recurso de memória upstream
(função membro pública)
[ options](<#/doc/memory/synchronized_pool_resource/options>) | retorna as opções que controlam o comportamento de pooling deste recurso
(função membro pública)

##### Funções membro protegidas

[ do_allocate](<#/doc/memory/synchronized_pool_resource/do_allocate>)[virtual] | aloca memória
(função membro protegida virtual)
[ do_deallocate](<#/doc/memory/synchronized_pool_resource/do_deallocate>)[virtual] | retorna memória para o pool
(função membro protegida virtual)
[ do_is_equal](<#/doc/memory/synchronized_pool_resource/do_is_equal>)[virtual] | compara por igualdade com outro `memory_resource`
(função membro protegida virtual)