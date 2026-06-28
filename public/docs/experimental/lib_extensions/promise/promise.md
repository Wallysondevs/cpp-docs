# std::experimental::promise&lt;R&gt;::promise (TS de fundamentos da biblioteca)

promise(); | (1) | (TS de fundamentos da biblioteca)
template< class Alloc >
promise( [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), const Alloc& alloc ); | (2) | (TS de fundamentos da biblioteca)
---|---|---
promise( promise&& other ) noexcept; | (3) | (TS de fundamentos da biblioteca)
promise( const promise& other ) = delete; | (4) | (TS de fundamentos da biblioteca)

Constrói um objeto `std::experimental::promise`.

1) Construtor padrão. Constrói a promise com um estado compartilhado vazio.

2) Constrói a promise com um estado compartilhado vazio. O estado compartilhado é alocado usando alloc, que é tratado como um allocator com tipo apagado (veja abaixo).

3) Construtor de movimento. Constrói a promise com o estado compartilhado de other usando move semantics. Após a construção, other não possui estado compartilhado.

4) `std::experimental::promise` não é copiável.

### Allocator com tipo apagado

Os construtores de `promise` que recebem um argumento allocator `alloc` tratam esse argumento como um allocator com tipo apagado. O ponteiro para o recurso de memória usado por `promise` para alocar memória é determinado usando o argumento allocator (se especificado) da seguinte forma:

Tipo de `alloc` | Valor do ponteiro para o recurso de memória
---|---
Não existente (nenhum allocator especificado no momento da construção) | O valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() no momento da construção.
[std::nullptr_t](<#/doc/types/nullptr_t>) | O valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() no momento da construção.
Um tipo de ponteiro conversível para
[std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>)* | static_cast<[std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>)*>(alloc)
Uma especialização de
[std::experimental::pmr::polymorphic_allocator](<#/doc/experimental/polymorphic_allocator>) | alloc.resource()
---|---
Qualquer outro tipo que satisfaça os requisitos de [Allocator](<#/doc/named_req/Allocator>) | Um ponteiro para um valor do tipo [std::experimental::pmr::resource_adaptor](<#/doc/experimental/resource_adaptor>)&lt;A&gt;(alloc), onde `A` é o tipo de `alloc`. O ponteiro permanece válido apenas durante a vida útil do objeto `promise`.
Nenhum dos anteriores | O programa é malformado.

### Parâmetros

- **alloc** — allocator a ser usado para alocar o estado compartilhado
- **other** — outra `std::experimental::promise` da qual adquirir o estado

### Exceções

1,2) (nenhuma)