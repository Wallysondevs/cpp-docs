# operator==,&lt;=&gt;(ranges::zip_transform_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires std::equality_comparable</*ziperator*/<Const>>;  // (1) (desde C++23)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base> &&
std::three_way_comparable</*ziperator*/<Const>>;  // (2) (desde C++23)
```

  
Compara os iterators subjacentes. Seja [`_inner__`](<#/doc/ranges/zip_transform_view/iterator>) o iterator subjacente. 

Equivalente a: 

1) return x.inner_ == y.inner_;

2) return x.inner_ <=> y.inner_;

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::zip_transform_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente. 

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

O resultado da comparação 

### Ver também

[ operator==](<#/doc/ranges/zip_transform_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`zip_transform_view::begin`](<#/doc/ranges/zip_transform_view/begin>)   
(função)  