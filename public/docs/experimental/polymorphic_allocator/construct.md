# std::experimental::pmr::polymorphic_allocator&lt;T&gt;::construct

template< class U, class... Args >  
void construct( U* p, Args&&... args ); |  (1)  |  (library fundamentals TS)  
template< class T1, class T2, class... Args1, class... Args2 >  
void construct( [std::pair](<#/doc/utility/pair>)<T1, T2>* p,  
[std::piecewise_construct_t](<#/doc/utility/piecewise_construct_t>),  
[std::tuple](<#/doc/utility/tuple>)<Args1...> x,  
[std::tuple](<#/doc/utility/tuple>)<Args2...> y ); |  (2)  |  (library fundamentals TS)  
template< class T1, class T2 >  
void construct( [std::pair](<#/doc/utility/pair>)<T1, T2>* p ); |  (3)  |  (library fundamentals TS)  
template< class T1, class T2, class U, class V >  
void construct( [std::pair](<#/doc/utility/pair>)<T1, T2>* p, U&& x, V&& y ); |  (4)  |  (library fundamentals TS)  
template< class T1, class T2, class U, class V >  
void construct( [std::pair](<#/doc/utility/pair>)<T1, T2>* p, const [std::pair](<#/doc/utility/pair>)<U, V>& xy ); |  (5)  |  (library fundamentals TS)  
template< class T1, class T2, class U, class V >  
void construct( [std::pair](<#/doc/utility/pair>)<T1, T2>* p, [std::pair](<#/doc/utility/pair>)<U, V>&& xy ); |  (6)  |  (library fundamentals TS)  

  
Constrói um objeto em armazenamento alocado, mas não inicializado, apontado por `p` com os argumentos do construtor fornecidos. Se o objeto for de um tipo que usa alocadores, ou se for `std::pair`, passa `this->resource()` para o objeto construído.

1) Se [std::uses_allocator](<#/doc/memory/uses_allocator>)<U, memory_resource*>::value == false (o tipo `U` não usa alocadores) e [std::is_constructible](<#/doc/types/is_constructible>)<U, Args...>::value == true, então constrói o objeto como se por ::new((void *) p) U([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);.

Caso contrário, se [std::uses_allocator](<#/doc/memory/uses_allocator>)<U, memory_resource*>::value == true (o tipo `U` usa alocadores, por exemplo, é um container) e [std::is_constructible](<#/doc/types/is_constructible>)<U, [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), memory_resource*, Args...>::value == true, então constrói o objeto como se por ::new((void *) p) U([std::allocator_arg](<#/doc/memory/allocator_arg_t>), this->resource(), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);.

Caso contrário, se [std::uses_allocator](<#/doc/memory/uses_allocator>)<U, memory_resource*>::value == true (o tipo `U` usa alocadores, por exemplo, é um container) e [std::is_constructible](<#/doc/types/is_constructible>)<U, Args..., memory_resource*>::value == true, então constrói o objeto como se por ::new((void *) p) U([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., this->resource());.

Caso contrário, o programa é malformado.

2) Primeiro, se `T1` ou `T2` for ciente de alocador (allocator-aware), modifica as tuplas `x` e `y` para incluir `this->resource()`, resultando nas duas novas tuplas `xprime` e `yprime`, de acordo com as três regras a seguir:

2a) se `T1` não for ciente de alocador ([std::uses_allocator](<#/doc/memory/uses_allocator>)<T1, memory_resource*>::value == false) e [std::is_constructible](<#/doc/types/is_constructible>)<T1, Args1...>::value == true, então `xprime` é `x`, não modificado.

2b) se `T1` for ciente de alocador ([std::uses_allocator](<#/doc/memory/uses_allocator>)<T1, memory_resource*>::value == true), e seu construtor aceitar uma tag de alocador ([std::is_constructible](<#/doc/types/is_constructible>)<T1, [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), memory_resource*, Args1...>::value == true, então `xprime` é [std::tuple_cat](<#/doc/utility/tuple/tuple_cat>)([std::make_tuple](<#/doc/utility/tuple/make_tuple>)([std::allocator_arg](<#/doc/memory/allocator_arg_t>), this->resource()), std::move(x)).

2c) se `T1` for ciente de alocador ([std::uses_allocator](<#/doc/memory/uses_allocator>)<T1, memory_resource*>::value == true), e seu construtor aceitar o alocador como o último argumento ([std::is_constructible](<#/doc/types/is_constructible>)<T1, Args1..., memory_resource*>::value == true), então `xprime` é [std::tuple_cat](<#/doc/utility/tuple/tuple_cat>)(std::move(x), [std::make_tuple](<#/doc/utility/tuple/make_tuple>)(this->resource())).

2d) Caso contrário, o programa é malformado.

As mesmas regras se aplicam a `T2` e à substituição de `y` por `yprime`.

Uma vez que `xprime` e `yprime` são construídos, constrói o par `p` em armazenamento alocado como se por ::new((void *) p) pair<T1, T2>([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), std::move(xprime), std::move(yprime));.

3) Equivalente a construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::tuple](<#/doc/utility/tuple>)<>(), [std::tuple](<#/doc/utility/tuple>)<>()), ou seja, passa o recurso de memória para os tipos membros do par se eles os aceitarem.

4) Equivalente a

construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;U&gt;(x)),  
[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;V&gt;(y)))

5) Equivalente a

construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(xy.first),  
[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(xy.second))

6) Equivalente a

construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;U&gt;(xy.first)),  
[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;V&gt;(xy.second)))

### Parameters

p  |  \-  |  ponteiro para armazenamento alocado, mas não inicializado   
---|---|---
args...  |  \-  |  os argumentos do construtor a serem passados para o construtor de `T`  
x  |  \-  |  os argumentos do construtor a serem passados para o construtor de `T1`  
y  |  \-  |  os argumentos do construtor a serem passados para o construtor de `T2`  
xy  |  \-  |  o par cujos dois membros são os argumentos do construtor para `T1` e `T2`  
  
### Return value

(nenhum)

### Notes

Esta função é chamada (através de [std::allocator_traits](<#/doc/memory/allocator_traits>)) por qualquer objeto ciente de alocador (allocator-aware), como [std::vector](<#/doc/container/vector>), que recebeu um [std::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>) como o alocador a ser usado. Como `memory_resource*` se converte implicitamente para `polymorphic_allocator`, o ponteiro do recurso de memória se propagará para quaisquer subobjetos cientes de alocador que utilizem alocadores polimórficos.

### See also

[ construct](<#/doc/memory/allocator_traits/construct>)[static] |  constrói um objeto no armazenamento alocado   
(modelo de função)  
[ construct](<#/doc/memory/allocator/construct>)(até C++20) |  constrói um objeto em armazenamento alocado   
(função membro pública de `std::allocator<T>`)