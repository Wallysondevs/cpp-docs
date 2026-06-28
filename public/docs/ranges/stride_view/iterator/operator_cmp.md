# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::stride_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, std::default_sentinel_t );  // (1) (desde C++23)
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires std::equality_comparable<ranges::iterator_t<Base>>;  // (2) (desde C++23)
friend constexpr bool operator<( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr bool operator>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (4) (desde C++23)
friend constexpr bool operator<=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (5) (desde C++23)
friend constexpr bool operator>=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base> and
std::three_way_comparable<ranges::iterator_t<Base>>;  // (7) (desde C++23)
```

  
Compara os iterators/sentinels subjacentes.

Seja [`_current__`](<#/doc/ranges/stride_view/iterator>) o iterator subjacente, e [`_end__`](<#/doc/ranges/stride_view/iterator>) o sentinel subjacente.

1) Equivalente a return x.current_ == x.end_;.

2) Equivalente a return x.current_ == y.current_;.

3) Equivalente a return x.current_ < y.current_;.

4) Equivalente a return y < x;

5) Equivalente a return !(y < x);

6) Equivalente a return !(x < y);

7) Equivalente a return x.current_ <=> y.current_;.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::stride_view::_iterator_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

resultado da comparação 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   