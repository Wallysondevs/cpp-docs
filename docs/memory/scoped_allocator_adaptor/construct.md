# std::scoped_allocator_adaptor&lt;OuterAlloc,InnerAlloc...&gt;::construct

Definido no cabeçalho `[<scoped_allocator>](<#/doc/header/scoped_allocator>)`

```c
template< class T, class... Args >
void construct( T* p, Args&&... args );
template< class T1, class T2, class... Args1, class... Args2 >
void construct( std::pair<T1, T2>* p, std::piecewise_construct_t,
std::tuple<Args1...> x, std::tuple<Args2...> y );
template< class T1, class T2 >
void construct( std::pair<T1, T2>* p );
template< class T1, class T2, class U, class V >
void construct( std::pair<T1, T2>* p, U&& x, V&& y );
template< class T1, class T2, class U, class V >
void construct( std::pair<T1, T2>* p, const std::pair<U, V>& xy );
template< class T1, class T2, class U, class V >
void construct( std::pair<T1, T2>* p, std::pair<U, V>&& xy );
Helper function templates
template < class T, class... Args >
std::tuple</* see below */> /*concat-args*/( std::tuple<Args...>&& tup );
(até C++20)
```

Constrói um objeto em armazenamento alocado, mas não inicializado, apontado por p, usando o alocador externo e os argumentos do construtor fornecidos. Se o objeto for de um tipo que usa alocadores, ou se for [std::pair](<#/doc/utility/pair>)(até C++20), passa o alocador interno para o objeto construído.

1) Constrói um objeto do tipo `T` por [construção uses-allocator](<#/doc/memory/uses_allocator>) no local de memória não inicializado indicado por p, usando o alocador mais externo. Dado [std::uses_allocator](<#/doc/memory/uses_allocator>)<T, inner_allocator_type>::value como uses_inner:

  * Se uses_inner for false e [std::is_constructible](<#/doc/types/is_constructible>)<T, Args...>::value for true, chama `_[outermost-construct](<#/doc/memory/scoped_allocator_adaptor/helpers>)_` ﻿(p, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).
  * Caso contrário, se uses_inner e [std::is_constructible](<#/doc/types/is_constructible>)<T, [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>),
inner_allocator_type&,
Args...>::value forem ambos true, chama `_[outermost-construct](<#/doc/memory/scoped_allocator_adaptor/helpers>)_` ﻿(p, [std::allocator_arg](<#/doc/memory/allocator_arg_t>),
` `inner_allocator(),
` `[std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).
  * Caso contrário, se uses_inner e [std::is_constructible](<#/doc/types/is_constructible>)<T, Args..., inner_allocator_type&>::value forem ambos true, chama `_[outermost-construct](<#/doc/memory/scoped_allocator_adaptor/helpers>)_` ﻿(p, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., inner_allocator()).
  * Caso contrário, o programa é malformado.

```cpp
Esta sobrecarga participa da resolução de sobrecarga apenas se `T` não for uma especialização de std::pair.  // (até C++20)
Equivalente a [std::apply]
(
` `p, this
` `{
` ` _outermost-construct_`
` `(p, std::forward<decltype(newargs)>(newargs)...);
` `},
` `[std::uses_allocator_construction_args]
` `(inner_allocator(), std::forward<Args>(args)...)
); .  // (desde C++20)
```

2-6) Constrói um objeto [std::pair](<#/doc/utility/pair>) por [construção uses-allocator](<#/doc/memory/uses_allocator>) no local de memória não inicializado indicado por p, usando o alocador mais externo.

2) Seja xprime `_concat-args_` ﻿&lt;T1&gt;(std::move(x)), yprime `_concat-args_` ﻿&lt;T2&gt;(std::move(y)), chama `_[outermost-construct](<#/doc/memory/scoped_allocator_adaptor/helpers>)_` ﻿(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), std::move(xprime), std::move(yprime)).

3) Equivalente a construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::tuple](<#/doc/utility/tuple>)<>(), [std::tuple](<#/doc/utility/tuple>)<>());.

4-6) Equivalente a construct(p, [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),
[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(xarg), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(yarg));, onde xarg e yarg são definidos como segue: Sobrecarga | xarg | yarg
---|---|---
(4) | [std::forward](<#/doc/utility/forward>)&lt;U&gt;(x) | [std::forward](<#/doc/utility/forward>)&lt;V&gt;(y)
(5) | xy.first | xy.second
(6) | [std::forward](<#/doc/utility/forward>)&lt;U&gt;(xy.first) | [std::forward](<#/doc/utility/forward>)&lt;V&gt;(xy.second)

7) Mescla os argumentos contidos em tup e argumentos adicionais exigidos pela [construção uses-allocator](<#/doc/memory/uses_allocator>) de um objeto do tipo `T`.

Dado [std::uses_allocator](<#/doc/memory/uses_allocator>)<T, inner_allocator_type>::value como uses_inner:

  * Se uses_inner for false e [std::is_constructible](<#/doc/types/is_constructible>)<T, Args...>::value for true, retorna [std::tuple](<#/doc/utility/tuple>)<Args&&...>(std::move(tup)).
  * Caso contrário, se uses_inner e [std::is_constructible](<#/doc/types/is_constructible>)<T, [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>),
inner_allocator_type&,
Args...>::value forem ambos true, retorna [std::tuple_cat](<#/doc/utility/tuple/tuple_cat>)([std::tuple](<#/doc/utility/tuple>)<[std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), inner_allocator_type&>
([std::allocator_arg](<#/doc/memory/allocator_arg_t>), inner_allocator()),
[std::tuple](<#/doc/utility/tuple>)<Args&&...>(std::move(tup))).
  * Caso contrário, se uses_inner e [std::is_constructible](<#/doc/types/is_constructible>)<T, Args..., inner_allocator_type&>::value forem ambos true, retorna [std::tuple_cat](<#/doc/utility/tuple/tuple_cat>)([std::tuple](<#/doc/utility/tuple>)<Args&&...>(std::move(tup)),
[std::tuple](<#/doc/utility/tuple>)<inner_allocator_type&>(inner_allocator()).
  * Caso contrário, o programa é malformado.

### Parâmetros

- **p** — ponteiro para armazenamento alocado, mas não inicializado
- **args** — os argumentos do construtor a serem passados para o construtor de `T`
- **x** — os argumentos do construtor a serem passados para o construtor de `T1`
- **y** — os argumentos do construtor a serem passados para o construtor de `T2`
- **xy** — o par cujos dois membros são os argumentos do construtor para `T1` e `T2`
- **tup** — os argumentos a serem mesclados

### Observações

Esta função é chamada (através de [std::allocator_traits](<#/doc/memory/allocator_traits>)) por qualquer objeto ciente de alocador (allocator-aware object), como [std::vector](<#/doc/container/vector>), que recebeu um [std::scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>) como o alocador a ser usado. Como `inner_allocator_type` é em si uma especialização de [std::scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>), esta função também será chamada quando os objetos cientes de alocador construídos através desta função começarem a construir seus próprios membros.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2203](<https://cplusplus.github.io/LWG/issue2203>) | C++11 | alocadores internos eram obtidos por inicialização por valor de um objeto `inner_allocator_type` | obtido chamando [`inner_allocator()`](<#/doc/memory/scoped_allocator_adaptor/inner_allocator>)
[LWG 2511](<https://cplusplus.github.io/LWG/issue2511>)
([P0475R1](<https://wg21.link/P0475R1>)) | C++11 | `_concat-args_` poderia copiar elementos de [std::tuple](<#/doc/utility/tuple>)s | eliminou todas as operações de cópia de elementos
---|---|---|---
[LWG 2586](<https://cplusplus.github.io/LWG/issue2586>) | C++11 | apenas construções de rvalues de `inner_allocator_type` eram verificadas | verifica construções de lvalues não-const de `inner_allocator_type` em vez disso
[LWG 2975](<https://cplusplus.github.io/LWG/issue2975>) | C++11 | a sobrecarga (1) não era restrita | restrita para recusar [std::pair](<#/doc/utility/pair>)

### Veja também

[ construct](<#/doc/memory/allocator_traits/construct>)[static] | constrói um objeto no armazenamento alocado
(modelo de função)
[ construct](<#/doc/memory/allocator/construct>)(até C++20) | constrói um objeto no armazenamento alocado
(função membro pública de `std::allocator<T>`)