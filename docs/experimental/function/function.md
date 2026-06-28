# std::experimental::function&lt;R(Args...)&gt;::function

```cpp
function() noexcept; | (1) | (library fundamentals TS)
function( std::nullptr_t ) noexcept; | (2) | (library fundamentals TS)
function( const function& other ); | (3) | (library fundamentals TS)
function( function&& other ); | (4) | (library fundamentals TS)
template< class F >
function( F f ); | (5) | (library fundamentals TS)
  // (6)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc ) noexcept; | | (library fundamentals TS)
function( std::allocator_arg_t,
const allocator_type& alloc ) noexcept; | | (library fundamentals TS v3)
  // (7)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc,
std::nullptr_t ) noexcept; | | (library fundamentals TS)
function( std::allocator_arg_t, const allocator_type& alloc,
std::nullptr_t ) noexcept; | | (library fundamentals TS v3)
  // (8)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc,
const function& other ); | | (library fundamentals TS)
function( std::allocator_arg_t, const allocator_type& alloc,
const function& other ); | | (library fundamentals TS v3)
  // (9)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc,
function&& other ); | | (library fundamentals TS)
function( std::allocator_arg_t, const allocator_type& alloc,
function&& other ); | | (library fundamentals TS v3)
  // (10)
template< class F, class Alloc >
function( std::allocator_arg_t, const Alloc& alloc, F f ); | | (library fundamentals TS)
function( std::allocator_arg_t, const allocator_type& alloc, F f ); | | (library fundamentals TS v3)
```

Constrói um `std::experimental::function` a partir de uma variedade de fontes.

1,2) Cria uma função _vazia_.

3) Copia o _target_ de `other` para o _target_ de `*this`. Se `other` estiver _vazio_, `*this` também estará _vazio_ após a chamada.

4) Move o _target_ de `other` para o _target_ de `*this`. Se `other` estiver _vazio_, `*this` também estará _vazio_ após a chamada. Após a construção, `*this` armazena uma cópia de `other.get_allocator()`. (library fundamentals TS v3)

5) Inicializa o _target_ com uma cópia de `f`. Se `f` for um null pointer para função ou null pointer para membro, `*this` estará _vazio_ após a chamada. Este construtor não participa da resolução de sobrecarga a menos que `f` seja [Callable](<#/doc/named_req/Callable>) para os tipos de argumento `Args...` e tipo de retorno `R`.

6-10) O mesmo que (1-5), exceto que `alloc` é usado para alocar memória para quaisquer estruturas de dados internas que a `function` possa usar. Esses construtores tratam `alloc` como um type-erased allocator (veja abaixo). (até library fundamentals TS v3)

Após a construção via (1-5), `this->get_memory_resource()` retorna o mesmo valor que [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() durante a construção. | (library fundamentals TS)
(até library fundamentals TS v3)
Após a construção via (1-3) e (5), `*this` armazena um [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> construído por padrão. | (library fundamentals TS v3)

Quando o _target_ é um function pointer ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), a small object optimization é garantida, ou seja, esses targets são sempre armazenados diretamente dentro do objeto `std::experimental::function`, nenhuma alocação dinâmica ocorre. Outros objetos grandes podem ser construídos em armazenamento alocado dinamicamente e acessados pelo objeto `std::experimental::function` através de um ponteiro.

Se um construtor move ou copia um function object, incluindo uma instância de `std::experimental::function`, então essa operação de move ou copy é realizada por [_using-allocator construction_](<#/doc/memory/uses_allocator>) com o allocator `this->get_memory_resource()` (até library fundamentals TS v3) `this->get_allocator()` (library fundamentals TS v3).

### Type-erased allocator

Os construtores de `function` que recebem um argumento allocator `alloc` tratam esse argumento como um type-erased allocator. O ponteiro para o recurso de memória usado por `function` para alocar memória é determinado usando o argumento allocator (se especificado) da seguinte forma:

Tipo de `alloc` | Valor do ponteiro para o recurso de memória
---|---
Não existente (nenhum allocator especificado no momento da construção) | O valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() no momento da construção.
[std::nullptr_t](<#/doc/types/nullptr_t>) | O valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)() no momento da construção.
Um tipo de ponteiro conversível para
[std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>)* | `static_cast<[std::experimental::pmr::memory_resource](<#/doc/experimental/memory_resource>)*>(alloc)`
Uma especialização de
[std::experimental::pmr::polymorphic_allocator](<#/doc/experimental/polymorphic_allocator>) | `alloc.resource()`
---|---
Qualquer outro tipo que atenda aos requisitos de [Allocator](<#/doc/named_req/Allocator>) | Um ponteiro para um valor do tipo [std::experimental::pmr::resource_adaptor](<#/doc/experimental/resource_adaptor>)&lt;A&gt;(alloc), onde `A` é o tipo de `alloc`. O ponteiro permanece válido apenas durante a vida útil do function object.
Nenhum dos anteriores | O programa é malformado.

### Parâmetros

- **other** — o function object usado para inicializar `*this`
- **f** — um callable usado para inicializar `*this`
- **alloc** — um allocator usado para alocação de memória interna
Requisitos de tipo
-`F` deve atender aos requisitos de [Callable](<#/doc/named_req/Callable>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Exceções

3,8) Não lança exceção se o _target_ de `other` for um function pointer ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), caso contrário, pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo copy constructor do callable object armazenado.

4) (nenhuma)

5,10) Não lança exceção se `f` for um function pointer ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), caso contrário, pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo copy constructor do callable object armazenado.

9) (nenhuma)

### Exemplo

| Esta seção está incompleta
Motivo: sem exemplo