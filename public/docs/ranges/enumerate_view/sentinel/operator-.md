# operator-(ranges::enumerate_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sized_sentinel_for<
ranges::sentinel_t<Base>,
ranges::iterator_t</*maybe-const*/<OtherConst, V>>>
friend constexpr ranges::range_difference_t</*maybe-const*/<OtherConst, V>>
operator-( const /*iterator*/<OtherConst>& x, const /*sentinel*/& y );  // (1) (desde C++23)
template< bool OtherConst >
requires std::sized_sentinel_for<
ranges::sentinel_t<Base>,
ranges::iterator_t</*maybe-const*/<OtherConst, V>>>
friend constexpr ranges::range_difference_t</*maybe-const*/<OtherConst, V>>
operator-( const /*sentinel*/& y, const /*iterator*/<OtherConst>& x );  // (2) (desde C++23)
```

  
Calcula a distância entre o [iterator](<#/doc/ranges/enumerate_view/iterator>) subjacente de x e o [sentinel](<#/doc/ranges/enumerate_view/sentinel>) subjacente de y.

Estes function templates não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando `enumerate_view::_sentinel_` é uma classe associada dos argumentos.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/enumerate_view/iterator>)  
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/enumerate_view/sentinel>)  
  
### Valor de retorno

1) x.base() - y.base()

2) y.base() - x.base()

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   