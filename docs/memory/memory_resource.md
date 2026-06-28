# std::pmr::memory_resource

Definido no header `[<memory_resource>](<#/doc/header/memory_resource>)`

```cpp
class memory_resource;  // (desde C++17)
```

A classe `std::pmr::memory_resource` é uma interface abstrata para um conjunto ilimitado de classes que encapsulam recursos de memória.

### Funções Membro

[ (construtor)](<#/doc/memory/memory_resource/memory_resource>)(declarado implicitamente) | constrói um novo `memory_resource`
(função membro pública)
(destrutor)[virtual] | destrói um `memory_resource`
(função membro pública virtual)
operator=(declarado implicitamente) | Operador de atribuição de cópia declarado implicitamente
(função membro pública)

##### Funções Membro Públicas

[ allocate](<#/doc/memory/memory_resource/allocate>) | aloca memória
(função membro pública)
[ deallocate](<#/doc/memory/memory_resource/deallocate>) | desaloca memória
(função membro pública)
[ is_equal](<#/doc/memory/memory_resource/is_equal>) | compara por igualdade com outro `memory_resource`
(função membro pública)

##### Funções Membro Privadas

[ do_allocate](<#/doc/memory/memory_resource/do_allocate>)[virtual] | aloca memória
(função membro privada virtual)
[ do_deallocate](<#/doc/memory/memory_resource/do_deallocate>)[virtual] | desaloca memória
(função membro privada virtual)
[ do_is_equal](<#/doc/memory/memory_resource/do_is_equal>)[virtual] | compara por igualdade com outro `memory_resource`
(função membro privada virtual)

### Funções Não-Membro

[ operator==operator!=](<#/doc/memory/memory_resource/operator_eq>)(removido em C++20) | compara dois `memory_resource`s
(função)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_memory_resource` | `std::pmr::memory_resource`