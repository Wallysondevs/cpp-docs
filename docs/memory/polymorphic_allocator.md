# std::pmr::polymorphic_allocator

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
template< class T >
class polymorphic_allocator;
(até C++20)
template< class T = std::byte >
class polymorphic_allocator;
```

O template de classe `std::pmr::polymorphic_allocator` é um [Allocator](<#/doc/named_req/Allocator>) que exibe um comportamento de alocação diferente dependendo do [std::pmr::memory_resource](<#/doc/memory/memory_resource>) a partir do qual é construído. Como `memory_resource` usa polimorfismo em tempo de execução para gerenciar alocações, diferentes instâncias de container com `polymorphic_allocator` como seu tipo de allocator estático são interoperáveis, mas podem se comportar como se tivessem tipos de allocator diferentes.

Todas as especializações de `polymorphic_allocator` atendem aos [requisitos de completude do allocator](<#/doc/named_req/Allocator>).

A função membro `polymorphic_allocator::construct` realiza [construção com uso de allocator](<#/doc/memory/uses_allocator>), de modo que os elementos de um container que usa um `polymorphic_allocator` usarão o mesmo allocator para suas próprias alocações. Por exemplo, um [std::pmr::vector](<#/doc/container/vector>)<[std::pmr::string](<#/doc/string/basic_string>)> usará o mesmo `memory_resource` para o armazenamento do `vector` e para o armazenamento de cada `string`.

Para allocators não polimórficos, uma propagação similar pode ser alcançada com a ajuda de [std::scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>).

### Tipos membro

Tipo membro | definição
---|---
`value_type` | `T`

### Funções membro

[ (construtor)](<#/doc/memory/polymorphic_allocator/polymorphic_allocator>) | constrói um `polymorphic_allocator`
(função membro pública)
(destrutor)(declarado implicitamente) | destrutor declarado implicitamente
(função membro pública)
operator=[deleted] | operador de atribuição de cópia é deletado
(função membro pública)

##### Funções membro públicas

[ allocate](<#/doc/memory/polymorphic_allocator/allocate>) | aloca memória
(função membro pública)
[ deallocate](<#/doc/memory/polymorphic_allocator/deallocate>) | desaloca memória
(função membro pública)
[ construct](<#/doc/memory/polymorphic_allocator/construct>) | constrói um objeto em armazenamento alocado
(função membro pública)
[ destroy](<#/doc/memory/polymorphic_allocator/destroy>)(obsoleto em C++20)(não obsoleto em C++26) | destrói um objeto em armazenamento alocado
(função membro pública)
[ allocate_bytes](<#/doc/memory/polymorphic_allocator/allocate_bytes>)(C++20) | aloca memória bruta alinhada do recurso subjacente
(função membro pública)
[ deallocate_bytes](<#/doc/memory/polymorphic_allocator/deallocate_bytes>)(C++20) | libera memória bruta obtida de `allocate_bytes`
(função membro pública)
[ allocate_object](<#/doc/memory/polymorphic_allocator/allocate_object>)(C++20) | aloca memória bruta adequada para um objeto ou um array
(função membro pública)
[ deallocate_object](<#/doc/memory/polymorphic_allocator/deallocate_object>)(C++20) | libera memória bruta obtida por `allocate_object`
(função membro pública)
[ new_object](<#/doc/memory/polymorphic_allocator/new_object>)(C++20) | aloca e constrói um objeto
(função membro pública)
[ delete_object](<#/doc/memory/polymorphic_allocator/delete_object>)(C++20) | destrói e desaloca um objeto
(função membro pública)
[ select_on_container_copy_construction](<#/doc/memory/polymorphic_allocator/select_on_container_copy_construction>) | cria um novo `polymorphic_allocator` para uso pelo construtor de cópia de um container
(função membro pública)
[ resource](<#/doc/memory/polymorphic_allocator/resource>) | retorna um ponteiro para o recurso de memória subjacente
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/memory/polymorphic_allocator/operator_eq>)(removido em C++20) | compara dois `polymorphic_allocator`s
(função)

### Notas

`polymorphic_allocator` não se propaga na atribuição de cópia de container, atribuição de movimento ou troca. Como resultado, a atribuição de movimento de um container que usa `polymorphic_allocator` pode lançar uma exceção, e a troca de dois containers que usam `polymorphic_allocator` cujos allocators não se comparam como iguais resulta em comportamento indefinido.

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_polymorphic_allocator`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | `std::pmr::polymorphic_allocator<>` como um tipo de vocabulário

### Veja também

[ memory_resource](<#/doc/memory/memory_resource>)(C++17) | uma interface abstrata para classes que encapsulam recursos de memória
(classe)