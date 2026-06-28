# std::experimental::pmr::monotonic_buffer_resource

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
class monotonic_buffer_resource : public memory_resource;
```

A classe `std::experimental::pmr::monotonic_buffer_resource` é uma classe de recurso de memória de propósito especial que libera a memória alocada apenas quando o recurso é destruído. Ela é destinada a alocações de memória muito rápidas em situações onde a memória é usada para construir alguns objetos e então é liberada de uma só vez.

`monotonic_buffer_resource` pode ser construída com um buffer inicial. Se não houver um buffer inicial, ou se o buffer estiver esgotado, buffers adicionais são obtidos de um _recurso de memória upstream_ fornecido na construção. O tamanho dos buffers obtidos segue uma progressão geométrica.

`monotonic_buffer_resource` não é thread-safe.

### Funções membro

[ (construtor)](<#/doc/experimental/monotonic_buffer_resource/monotonic_buffer_resource>) | constrói um `monotonic_buffer_resource`
(função membro pública)
[ (destrutor)](<#/doc/experimental/monotonic_buffer_resource/~monotonic_buffer_resource>)[virtual] | destrói um `monotonic_buffer_resource`, liberando toda a memória alocada
(função membro pública virtual)
operator=[deleted] | o operador de atribuição de cópia é deletado. `monotonic_buffer_resource` não é atribuível por cópia
(função membro pública)

##### Funções membro públicas

[ release](<#/doc/experimental/monotonic_buffer_resource/release>) | libera toda a memória alocada
(função membro pública)
[ upstream_resource](<#/doc/experimental/monotonic_buffer_resource/upstream_resource>) | retorna um ponteiro para o recurso de memória upstream
(função membro pública)

##### Funções membro protegidas

[ do_allocate](<#/doc/experimental/monotonic_buffer_resource/do_allocate>)[virtual] | aloca memória
(função membro protegida virtual)
[ do_deallocate](<#/doc/experimental/monotonic_buffer_resource/do_deallocate>)[virtual] | no-op
(função membro protegida virtual)
[ do_is_equal](<#/doc/experimental/monotonic_buffer_resource/do_is_equal>)[virtual] | compara por igualdade com outro `memory_resource`
(função membro protegida virtual)