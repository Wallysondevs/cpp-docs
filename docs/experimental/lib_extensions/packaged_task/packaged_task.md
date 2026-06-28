# std::experimental::packaged_task&lt;R(Args...)&gt;::packaged_task (TS de Fundamentos da Biblioteca)

packaged_task() noexcept; | (1) | (TS de Fundamentos da Biblioteca)
template< class F >
explicit packaged_task( F&& f ); | (2) | (TS de Fundamentos da Biblioteca)
template< class F, class Allocator >
explicit packaged_task( [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), const Allocator& alloc, F&& f ); | (3) | (TS de Fundamentos da Biblioteca)
---|---|---
packaged_task( const packaged_task& ) = delete; | (4) | (TS de Fundamentos da Biblioteca)
packaged_task( packaged_task&& rhs ) noexcept; | (5) | (TS de Fundamentos da Biblioteca)

Constrói um novo objeto `std::experimental::packaged_task`.

1) Constrói um objeto `std::experimental::packaged_task` sem tarefa e sem estado compartilhado.

2) Constrói um objeto `std::experimental::packaged_task` com um estado compartilhado e uma cópia da tarefa, inicializada com [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f). Este construtor não participa da resolução de sobrecarga se [std::decay](<#/doc/types/decay>)&lt;F&gt;::type for do mesmo tipo que [std::packaged_task](<#/doc/thread/packaged_task>)<R(ArgTypes...)>.

3) Constrói um objeto `std::experimental::packaged_task` com um estado compartilhado e uma cópia da tarefa, inicializada com [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f). Usa o allocator fornecido para alocar a memória necessária para armazenar a tarefa, que é tratada como um allocator com tipo apagado (veja abaixo). Este construtor não participa da resolução de sobrecarga se [std::decay](<#/doc/types/decay>)&lt;F&gt;::type for do mesmo tipo que [std::packaged_task](<#/doc/thread/packaged_task>)<R(ArgTypes...)>.

4) O construtor de cópia é deletado, `std::experimental::packaged_task` é apenas movível (move-only).

5) Constrói um `std::experimental::packaged_task` com o estado compartilhado e a tarefa anteriormente possuídos por rhs, deixando rhs sem estado compartilhado e com uma tarefa movida (moved-from).

### Allocator com tipo apagado

Os construtores de `packaged_task` que recebem um argumento allocator `alloc` tratam esse argumento como um allocator com tipo apagado. O ponteiro de recurso de memória usado por `packaged_task` para alocar memória é determinado usando o argumento allocator (se especificado) da seguinte forma:

Tipo de `alloc` | Valor do ponteiro de recurso de memória
---|---
Não existente (nenhum allocator especificado no momento da construção) | O valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() no momento da construção.
[std::nullptr_t](<#/doc/types/nullptr_t>) | O valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() no momento da construção.
Um tipo de ponteiro conversível para
[std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>)* | static_cast<[std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>)*>(alloc)
Uma especialização de
[std::experimental::pmr::polymorphic_allocator](<#/doc/experimental/polymorphic_allocator>) | alloc.resource()
---|---
Qualquer outro tipo que atenda aos requisitos de [Allocator](<#/doc/named_req/Allocator>) | Um ponteiro para um valor do tipo [std::experimental::pmr::resource_adaptor](<#/doc/experimental/resource_adaptor>)&lt;A&gt;(alloc), onde `A` é o tipo de `alloc`. O ponteiro permanece válido apenas durante a vida útil do objeto `packaged_task`.
Nenhum dos anteriores | O programa é malformado.

### Parâmetros

- **f** — o callable target (função, função membro, lambda-expression, functor) a ser executado
- **alloc** — o allocator a ser usado ao armazenar a tarefa
- **rhs** — o `std::experimental::packaged_task` do qual mover

### Exceções

2,3) Quaisquer exceções lançadas pelo construtor de cópia/movimento de f e possivelmente [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação falhar.

4) (nenhuma)