# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::transform_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires std::equality_comparable<ranges::iterator_t<Base>>;  // (1) (desde C++20)
friend constexpr bool operator<( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (2) (desde C++20)
friend constexpr bool operator>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (3) (desde C++20)
friend constexpr bool operator<=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (4) (desde C++20)
friend constexpr bool operator>=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (5) (desde C++20)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base> &&
std::three_way_comparable<ranges::iterator_t<Base>>;  // (6) (desde C++20)
```

  
Compara os iteradores subjacentes.

1) Equivalente a return x.current_ == y.current_;, onde `_current__` é o iterador subjacente.

2) Equivalente a return x.current_ < y.current_;, onde `_current__` é o iterador subjacente.

3) Equivalente a return y < x;

4) Equivalente a return !(y < x);

5) Equivalente a return !(x < y);

6) Equivalente a return x.current_ <=> y.current_;, onde `_current__` é o iterador subjacente.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::transform_view::_iterator_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  iteradores para comparar   
  
### Valor de retorno

resultado da comparação

### Veja também

[ operator==](<#/doc/ranges/transform_view/sentinel/operator_cmp>)(desde C++20) |  compara um sentinel com um iterator retornado de [`transform_view::begin`](<#/doc/ranges/transform_view/begin>)   
(função)  