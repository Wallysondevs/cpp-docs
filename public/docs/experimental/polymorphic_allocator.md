# std::experimental::pmr::polymorphic_allocator

Definido no cabeçalho `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`

```c
template< class T >
class polymorphic_allocator;
```

O template de classe `std::experimental::pmr::polymorphic_allocator` é um [Allocator](<#/doc/named_req/Allocator>) cujo comportamento de alocação depende do recurso de memória com o qual é construído. Assim, diferentes instâncias de `polymorphic_allocator` podem exibir um comportamento de alocação inteiramente diferente. Este polimorfismo em tempo de execução permite que objetos que usam `polymorphic_allocator` se comportem como se usassem diferentes tipos de allocator em tempo de execução, apesar do tipo de allocator estático idêntico.

### Tipos de membros

Tipo de membro | definição
---|---
`value_type` | `T`

### Funções membro

[ (construtor)](<#/doc/experimental/polymorphic_allocator/polymorphic_allocator>) | constrói um `polymorphic_allocator`
(função membro pública)
(destrutor)(implicitamente declarado) | destrutor implicitamente declarado
(função membro pública)
[ operator=](<#/>) | operador de atribuição de cópia
(função membro pública)

##### Funções membro públicas

[ allocate](<#/doc/experimental/polymorphic_allocator/allocate>) | aloca memória
(função membro pública)
[ deallocate](<#/doc/experimental/polymorphic_allocator/deallocate>) | desaloca memória
(função membro pública)
[ construct](<#/doc/experimental/polymorphic_allocator/construct>) | constrói um objeto em armazenamento alocado
(função membro pública)
[ destroy](<#/doc/experimental/polymorphic_allocator/destroy>) | destrói um objeto em armazenamento alocado
(função membro pública)
[ select_on_container_copy_construction](<#/doc/experimental/polymorphic_allocator/select_on_container_copy_construction>) | cria um novo `polymorphic_allocator` para uso pelo construtor de cópia de um container
(função membro pública)
[ resource](<#/doc/experimental/polymorphic_allocator/resource>) | retorna um ponteiro para o recurso de memória subjacente
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/experimental/polymorphic_allocator/operator_eq>) | compara dois `polymorphic_allocator`s
(função)