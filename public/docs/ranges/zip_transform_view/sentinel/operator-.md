# operator-(ranges::zip_transform_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sized_sentinel_for</*zentinel*/<Const>, /*ziperator*/<OtherConst>>
friend constexpr ranges::range_difference_t</*maybe-const*/<OtherConst, /*InnerView*/>>
operator-( const /*iterator*/<OtherConst>& x, const /*sentinel*/& y );  // (1) (desde C++23)
template< bool OtherConst >
requires std::sized_sentinel_for</*zentinel*/<Const>, /*ziperator*/<OtherConst>>
friend constexpr ranges::range_difference_t</*maybe-const*/<OtherConst, /*InnerView*/>>
operator-( const /*sentinel*/& y, const /*iterator*/<OtherConst>& x );  // (2) (desde C++23)
```

  
Calcula a distância entre o iterator subjacente de x e o sentinel subjacente de y.

Esses function templates não são visíveis para [unqualified lookup](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>) comuns, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando `zip_transform_view::_sentinel_` é uma classe associada dos argumentos.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/zip_transform_view/iterator>)  
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/zip_transform_view/sentinel>)  
  
### Valor de retorno

Seja `_inner__` o iterator ou sentinel subjacente, respectivamente.

1) x.inner_ - y.inner_

2) y.inner_ - x.inner_