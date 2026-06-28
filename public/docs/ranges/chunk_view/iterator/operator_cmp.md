# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::chunk_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y );  // (1) (desde C++23)
friend constexpr bool operator==( const /*iterator*/& x, std::default_sentinel_t );  // (2) (desde C++23)
friend constexpr bool operator<( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr bool operator>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (4) (desde C++23)
friend constexpr bool operator<=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (5) (desde C++23)
friend constexpr bool operator>=( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base> &&
std::three_way_comparable<ranges::iterator_t<Base>>;  // (7) (desde C++23)
```

  
Compara os iterators subjacentes (ou o iterator subjacente e o sentinel padrão (2)).

Sejam `_current__` e `_end__` os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes.

Equivalente a:

1) return x.current_ == y.current_;.

2) return x.current_ == x.end_;.

3) return x.current_ < y.current_;.

4) return y < x;.

5) return !(y < x);.

6) return !(x < y);.

7) return x.current_ <=> y.current_;.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::chunk_view::_iterator_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  os [iterators](<#/doc/ranges/chunk_view/iterator>) a serem comparados   
  
### Valor de retorno

O resultado da comparação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também  
  
---