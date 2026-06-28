# std::experimental::function&lt;R(Args...)&gt;::operator=

```cpp
function& operator=( const function& other ); |  (1)  |  (library fundamentals TS)
function& operator=( function&& other ); |  (2)  |  (library fundamentals TS)
function& operator=( std::nullptr_t ) noexcept; |  (3)  |  (library fundamentals TS)
template< class F >
function& operator=( F&& f ); |  (4)  |  (library fundamentals TS)
  // (5)
template< class F >
function& operator=( std::reference_wrapper<F> f ); |  | (library fundamentals TS)
template< class F >
function& operator=( std::reference_wrapper<F> f ) noexcept; |  |  (library fundamentals TS v3)
```

  
Atribui um novo _target_ a `std::experimental::function`. Na descrição abaixo, seja ALLOCATOR_OF(f) o alocador especificado na construção de f, ou o valor de [std::experimental::pmr::get_default_resource](<#/doc/experimental/get_default_resource>)()(até library fundamentals TS v3)o valor de [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> construído por padrão(library fundamentals TS v3) no momento da construção, se nenhum alocador foi especificado. 

1) Atribui uma cópia do _target_ de other, como se executasse function([std::allocator_arg](<#/doc/memory/allocator_arg_t>), ALLOCATOR_OF(*this), other).swap(*this);.

2) Move o _target_ de other para *this, como se executasse function([std::allocator_arg](<#/doc/memory/allocator_arg_t>), ALLOCATOR_OF(*this), std::move(other)).swap(*this);. other está em um estado válido com um valor não especificado.

3) Destrói o _target_ de *this. *this está _vazio_ após a chamada. O recurso de memória retornado por `get_memory_resource()` após a atribuição é equivalente ao recurso de memória antes da atribuição, mas o endereço pode mudar.

4) Define o _target_ de *this para o callable f, como se executasse function([std::allocator_arg](<#/doc/memory/allocator_arg_t>), ALLOCATOR_OF(*this),[std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)).swap(*this);. Este operador não participa da resolução de sobrecarga a menos que f seja [Callable](<#/doc/named_req/Callable>) para os tipos de argumento `Args...` e tipo de retorno `R`.

5) Define o _target_ de *this para uma cópia de f, como se executasse function([std::allocator_arg](<#/doc/memory/allocator_arg_t>), ALLOCATOR_OF(*this), f).swap(*this);.

### Parâmetros

other  |  \-  |  outro objeto `std::experimental::function` para copiar ou mover de   
---|---|---
f  |  \-  |  um callable para inicializar o _target_ com   
Requisitos de tipo   
-`F` deve atender aos requisitos de [Callable](<#/doc/named_req/Callable>).   
  
### Valor de retorno

*this

### Exceções

1,2,4) Exceção lançada na alocação necessária do armazenamento ou inicialização do target de *this, se houver.

5) (nenhuma)

### Observações

O operador de atribuição por movimento pode precisar alocar armazenamento se get_memory_resource() != other.get_memory_resource()(até library fundamentals TS v3)get_allocator() != other.get_allocator()(library fundamentals TS v3)