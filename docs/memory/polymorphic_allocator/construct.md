# std::pmr::polymorphic_allocator&lt;T&gt;::construct

```cpp
template< class U, class... Args >
void construct( U* p, Args&&... args );  // (1) (desde C++17)
template< class T1, class T2, class... Args1, class... Args2 >
void construct( std::pair<T1, T2>* p,
std::piecewise_construct_t,
std::tuple<Args1...> x,
std::tuple<Args2...> y );  // (2) (desde C++17)
(até C++20)
template< class T1, class T2 >
void construct( std::pair<T1, T2>* p );  // (3) (desde C++17)
(até C++20)
template< class T1, class T2, class U, class V >
void construct( std::pair<T1, T2>* p, U&& x, V&& y );  // (4) (desde C++17)
(até C++20)
template< class T1, class T2, class U, class V >
void construct( std::pair<T1, T2>* p, const std::pair<U, V>& xy );  // (5) (desde C++17)
(até C++20)
template< class T1, class T2, class U, class V >
void construct( std::pair<T1, T2>* p, std::pair<U, V>&& xy );  // (6) (desde C++17)
(até C++20)
template< class T1, class T2, class NonPair >
void construct( std::pair<T1, T2>* p, NonPair&& non_pair );  // (7) (desde C++17)
(até C++20)
```

  
Constrói um objeto em armazenamento alocado, mas não inicializado, apontado por `p` com os argumentos do construtor fornecidos. Se o objeto for de um tipo que usa allocators, ou se for `std::pair`, passa `*this` para o objeto construído.

1) Cria um objeto do tipo `U` fornecido por meio de [construção que usa allocator](<#/doc/memory/uses_allocator>) no local de memória não inicializado indicado por `p`, usando `*this` como o allocator. Esta sobrecarga participa da resolução de sobrecarga apenas se `U` não for uma especialização de [std::pair](<#/doc/utility/pair>). (até C++20)

2) Primeiro, se `T1` ou `T2` for allocator-aware, modifica as tuplas `x` e `y` para incluir `this->resource()`, resultando nas duas novas tuplas `xprime` e `yprime`, de acordo com as três regras a seguir: 2a) se `T1` não for allocator-aware ([std::uses_allocator](<#/doc/memory/uses_allocator>)<T1, polymorphic_allocator>::value==false) e [std::is_constructible](<#/doc/types/is_constructible>)<T1, Args1...>::value==true, então `xprime` é `x`, não modificado. 2b) se `T1` for allocator-aware ([std::uses_allocator](<#/doc/memory/uses_allocator>)<T1, polymorphic_allocator>::value==true), e seu construtor aceitar uma tag de allocator ([std::is_constructible](<#/doc/types/is_constructible>)<T1, [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), polymorphic_allocator, Args1...>::value==true), então `xprime` é [std::tuple_cat](<#/doc/utility/tuple/tuple_cat>)([std::make_tuple](<#/doc/utility/tuple/make_tuple>)([std::allocator_arg](<#/doc/memory/allocator_arg_t>), *this), std::move(x)). 2c) se `T1` for allocator-aware ([std::uses_allocator](<#/doc/memory/uses_allocator>)<T1, polymorphic_allocator>::value==true), e seu construtor aceitar o allocator como o último argumento ([std::is_constructible](<#/doc/types/is_constructible>)<T1, Args1..., polymorphic_allocator>::value==true), então `xprime` é [std::tuple_cat](<#/doc/utility/tuple/tuple_cat>)(std::move(x), [std::make_tuple](<#/doc/utility/tuple/make_tuple>)(*this)). 2d) Caso contrário, o programa é malformado. As mesmas regras se aplicam a `T2` e à substituição de `y` por `yprime`. Uma vez que `xprime` e `yprime` são construídos, constrói o par `p` em armazenamento alocado como se por `::new((void *) p) pair<T1, T2>([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), std::move(xprime), std::move(yprime));`.
3) Equivalente a `construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::tuple](<#/doc/utility/tuple>)<>(), [std::tuple](<#/doc/utility/tuple>)<>())`, ou seja, passa o recurso de memória para os tipos membros do par se eles os aceitarem.
4) Equivalente a 
```cpp
    construct(p, std::piecewise_construct, std::forward_as_tuple(std::forward<U>(x)),
                                           std::forward_as_tuple(std::forward<V>(y)))
```

5) Equivalente a 
```cpp
    construct(p, std::piecewise_construct, std::forward_as_tuple(xy.first),
                                           std::forward_as_tuple(xy.second))
```

6) Equivalente a 
```cpp
    construct(p, std::piecewise_construct, std::forward_as_tuple(std::forward<U>(xy.first)),
                                           std::forward_as_tuple(std::forward<V>(xy.second)))
```

7) Esta sobrecarga participa da resolução de sobrecarga apenas se, dado o template de função apenas para exposição 
```cpp
    template< class A, class B >
    void /*deduce-as-pair*/( const std::pair<A, B>& );
```

, `/*deduce-as-pair*/(non_pair)` for malformado quando considerado como um operando não avaliado. Equivalente a 
```cpp 
    construct<T1, T2, T1, T2>(p, std::forward<NonPair>(non_pair));
```

| (até C++20)  
  
### Parameters

p  |  \-  |  ponteiro para armazenamento alocado, mas não inicializado   
---|---|---
args...  |  \-  |  os argumentos do construtor a serem passados para o construtor de `T`  
x  |  \-  |  os argumentos do construtor a serem passados para o construtor de `T1`  
y  |  \-  |  os argumentos do construtor a serem passados para o construtor de `T2`  
xy  |  \-  |  o par cujos dois membros são os argumentos do construtor para `T1` e `T2`  
non_pair  |  \-  |  argumento não-`pair` a ser convertido para `pair` para construção posterior   
  
### Return value

(nenhum) 

### Notes

Esta função é chamada (através de [std::allocator_traits](<#/doc/memory/allocator_traits>)) por qualquer objeto allocator-aware, como [std::pmr::vector](<#/doc/container/vector>) (ou outro [std::vector](<#/doc/container/vector>) que recebeu um `std::pmr::polymorphic_allocator` como o allocator a ser usado). 

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2969](<https://cplusplus.github.io/LWG/issue2969>) | C++17  | construção que usa allocator passava `resource()` | passa `*this`  
[LWG 2975](<https://cplusplus.github.io/LWG/issue2975>) | C++17  | primeira sobrecarga é usada erroneamente para construção de par em alguns casos  | restrita para não aceitar pares   
[LWG 3525](<https://cplusplus.github.io/LWG/issue3525>) | C++17  | nenhuma sobrecarga podia lidar com tipos não-`pair` convertíveis para `pair` | sobrecarga de reconstrução adicionada   
  
### See also

[ construct](<#/doc/memory/allocator_traits/construct>)[static] |  constrói um objeto no armazenamento alocado   
(template de função)  
[ construct](<#/doc/memory/allocator/construct>)(até C++20) |  constrói um objeto em armazenamento alocado   
(função membro pública de `std::allocator<T>`)