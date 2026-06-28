# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::adjacent_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y );  // (1) (desde C++23)
friend constexpr bool operator<( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
friend constexpr bool operator>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr bool operator<=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (4) (desde C++23)
friend constexpr bool operator>=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (5) (desde C++23)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base> &&
std::three_way_comparable<ranges::iterator_t<Base>>;  // (6) (desde C++23)
```

  
Compara os iteradores subjacentes. Seja [`_current__`](<#/doc/ranges/adjacent_view/iterator>) um array subjacente de iteradores.

1) Equivalente a return x.current_.back() == y.current_.back().

2) Equivalente a return x.current_.back() < y.current_.back().

3) Equivalente a return y < x;.

4) Equivalente a return !(y < x);.

5) Equivalente a return !(x < y);.

6) Equivalente a return x.base() <=> y.base();.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::adjacent_view::_iterator_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  iteradores para comparar   
  
### Valor de retorno

Resultado da comparação.

### Veja também

[ operator==](<#/doc/ranges/adjacent_view/sentinel/operator_cmp>)(C++23) | compara um sentinel com um iterator retornado de [`adjacent_view::begin`](<#/doc/ranges/adjacent_view/begin>)   
(function)  