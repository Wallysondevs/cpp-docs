# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::concat_view::iterator)

```cpp
friend constexpr bool operator==
( const /*iterator*/& x, std::default_sentinel_t );  // (1) (desde C++26)
friend constexpr bool operator==
( const /*iterator*/& x, const /*iterator*/& y )
requires (std::equality_comparable<ranges::iterator_t<
std::conditional_t<Const, const Views, Views>>> && ...);  // (2) (desde C++26)
friend constexpr bool operator<
( const /*iterator*/& x, const /*iterator*/& y )
requires /*all-random-access*/<Const, Views...>;  // (3) (desde C++26)
friend constexpr bool operator>
( const /*iterator*/& x, const /*iterator*/& y )
requires /*all-random-access*/<Const, Views...>;  // (4) (desde C++26)
friend constexpr bool operator<=
( const /*iterator*/& x, const /*iterator*/& y )
requires /*all-random-access*/<Const, Views...>;  // (5) (desde C++26)
friend constexpr bool operator>=
( const /*iterator*/& x, const /*iterator*/& y )
requires /*all-random-access*/<Const, Views...>;  // (6) (desde C++26)
friend constexpr auto operator<=>
( const /*iterator*/& x, const /*iterator*/& y )
requires (/*all-random-access*/<Const, Views...> &&
(std::three_way_comparable<ranges::iterator_t<
std::conditional_t<Const, const Views, Views>>> && ...));  // (7) (desde C++26)
```

  
Compara o iterator com outro iterator ou um sentinel.

1) Compara um iterator com um sentinel.

Se x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() for verdadeiro, o comportamento é indefinido.

2-7) Compara dois iterators. O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

Se x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() || y.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() for verdadeiro, o comportamento é indefinido.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::concat_view::_iterator_ ﻿<Const>` é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

1)

x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.index() == (sizeof...(Views) - 1) &&  
` `x.`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿<sizeof...(Views) - 1>() == x.`_[get-end](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿<sizeof...(Views) - 1>()

2) x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` `== y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`

3) x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` `< y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`

4) x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` `> y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`

5) x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` `<= y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`

6) x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` `>= y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`

7) x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` `<=> y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   