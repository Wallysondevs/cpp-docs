# std::experimental::pmr::memory_resource

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
class memory_resource;
```

A classe `std::experimental::pmr::memory_resource` é uma interface abstrata para um conjunto ilimitado de classes que encapsulam recursos de memória.

### Funções membro

[ (construtor)](<#/doc/experimental/memory_resource/memory_resource>)(implicitamente declarado) | constrói um novo `memory_resource`
(função membro pública)
(destrutor)[virtual] | destrói um `memory_resource`
(função membro pública virtual)
operator=(implicitamente declarado) | operador de atribuição de cópia implicitamente declarado
(função membro pública)

##### Funções membro públicas

[ allocate](<#/doc/experimental/memory_resource/allocate>) | aloca memória
(função membro pública)
[ deallocate](<#/doc/experimental/memory_resource/deallocate>) | desaloca memória
(função membro pública)
[ is_equal](<#/doc/experimental/memory_resource/is_equal>) | compara por igualdade com outro `memory_resource`
(função membro pública)

##### Funções membro protegidas

[ do_allocate](<#/doc/experimental/memory_resource/do_allocate>)[virtual] | aloca memória
(função membro protegida virtual)
[ do_deallocate](<#/doc/experimental/memory_resource/do_deallocate>)[virtual] | desaloca memória
(função membro protegida virtual)
[ do_is_equal](<#/doc/experimental/memory_resource/do_is_equal>)[virtual] | compara por igualdade com outro `memory_resource`
(função membro protegida virtual)

### Funções não-membro

[ operator==operator!=](<#/doc/experimental/memory_resource/operator_eq>) | compara dois `memory_resource`s
(função)