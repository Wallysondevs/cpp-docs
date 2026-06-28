# operator==,&lt;,&gt;,&lt;=,&gt;=,&lt;=&gt;(ranges::adjacent_transform_view::iterator)

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
requires ranges::random_access_range<Base> and
std::three_way_comparable<ranges::iterator_t<Base>>;  // (6) (desde C++23)
```

  
Compara os iterators subjacentes: [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>). 

1) Equivalente a return x.inner_ == y.inner_;.

2) Equivalente a return x.inner_ < y.inner_;.

3) Equivalente a return x.inner_ > y.inner_;.

4) Equivalente a return x.inner_ <= y.inner_;.

5) Equivalente a return x.inner_ >= y.inner_;.

6) Equivalente a return x.inner_ <=> y.inner_;.

Estas funções não são visíveis para a pesquisa (lookup) comum [unqualified](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::adjacent_transform_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

Resultado da comparação. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator==](<#/doc/ranges/adjacent_transform_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`adjacent_transform_view::begin`](<#/doc/ranges/adjacent_transform_view/begin>)   
(função)  