# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::slide_view::iterator)

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

  
Compara os iterators subjacentes.

Sejam [`_current__`](<#/doc/ranges/slide_view/iterator>) e [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) os iterators subjacentes para o início e fim da janela deslizante, respectivamente.

1) Equivalente a:

  * `return x.last_ele_ == y.last_ele_;`, se `_last_ele__` estiver presente. Caso contrário,
  * `return x.current_ == y.current_;`.

2) Equivalente a `return x.current_ < y.current_;`.

3) Equivalente a `return y < x;`.

4) Equivalente a `return !(y < x);`.

5) Equivalente a `return !(x < y);`.

6) Equivalente a `return x.current_ <=> y.current_;`.

Essas funções não são visíveis para pesquisa não qualificada comum ou pesquisa qualificada, e só podem ser encontradas por pesquisa dependente de argumento (ADL) quando `std::ranges::slide_view::_iterator_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é sintetizado a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

O resultado da comparação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator==](<#/doc/ranges/slide_view/sentinel/operator_cmp>)(C++23) | compara um sentinel com um iterator retornado de [`slide_view::begin`](<#/doc/ranges/slide_view/begin>)   
(função)  