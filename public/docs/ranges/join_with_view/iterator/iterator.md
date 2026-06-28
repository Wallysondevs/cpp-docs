# std::ranges::join_with_view&lt;V,Pattern&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to<ranges::iterator_t<V>, /*OuterIter*/> &&
std::convertible_to<ranges::iterator_t</*InnerRng*/>,
/*InnerIter*/> &&
std::convertible_to<ranges::iterator_t<Pattern>, /*PatternIter*/>;  // (2) (desde C++23)
constexpr /*iterator*/( /*Parent*/& parent, /*OuterIter*/ outer )
requires std::forward_range</*Base*/>;  // (3) (desde C++23)
(apenas para exposição*)
constexpr explicit /*iterator*/( /*Parent*/ parent )
requires (!std::forward_range</*Base*/>);  // (4) (desde C++23)
(apenas para exposição*)
```

  
Constrói um iterator. As sobrecargas (3,4) são chamadas por [`begin()`](<#/doc/ranges/join_with_view/begin>) e [`end()`](<#/doc/ranges/join_with_view/end>) de ranges::join_with_view. 

Sobrecarga  | [Membros de dados](<#/doc/ranges/join_with_view/iterator>)  
---|---|---
`_parent__` | `_outer_it__` | `_inner_it__`  
(1) | inicializado com nullptr | [inicializado por valor](<#/doc/language/value_initialization>)  
(somente se `_[Base](<#/doc/ranges/join_with_view/iterator>)_` modelar [`forward_range`](<#/doc/ranges/forward_range>)) |  [inicializado por padrão](<#/doc/language/default_initialization>)  
(2) | inicializado com i.`_[parent_](<#/doc/ranges/join_with_view/iterator>)_` |  inicializado com std::move(i.`_[outer_it_](<#/doc/ranges/join_with_view/iterator>)_`   
(somente se `_[Base](<#/doc/ranges/join_with_view/iterator>)_` modelar [`forward_range`](<#/doc/ranges/forward_range>))  
(3) | inicializado com  
---|---
[std::addressof](<#/doc/memory/addressof>)(parent) | inicializado com std::move(outer)  
(4) |  N/A  
  
2) Após inicializar os membros de dados, equivalente a 

if (i.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿.index() == 0)  
` ` _[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿.template emplace<0>(std::get<0>(std::move(i.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿)));  
else  
` ` _[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿.template emplace<1>(std::get<1>(std::move(i.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿)));

.

3,4) Após inicializar os membros de dados, ajusta o [outer iterator](<#/doc/ranges/join_with_view/iterator>) como se o [inner iterator](<#/doc/ranges/join_with_view/iterator>) tivesse sido incrementado por [`operator++()`](<#/doc/ranges/join_with_view/iterator/operator_arith>).

### Parâmetros

i  |  \-  |  um iterator mutável   
---|---|---
parent  |  \-  |  um objeto std::ranges::join_with_view   
outer  |  \-  |  um iterator para o range subjacente de parent  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   