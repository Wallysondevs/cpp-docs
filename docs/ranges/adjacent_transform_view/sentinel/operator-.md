# operator-(ranges::adjacent_transform_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sized_sentinel_for</*inner-sentinel*/<Const>,
/*inner-iterator*/<OtherConst>>
friend constexpr
ranges::range_difference_t</*maybe-const*/<OtherConst, InnerView>>
operator-( const /*iterator*/<OtherConst>& x, const /*sentinel*/& y );  // (1) (desde C++23)
template< bool OtherConst >
requires std::sized_sentinel_for</*inner-sentinel*/<Const>,
/*inner-iterator*/<OtherConst>>
friend constexpr
ranges::range_difference_t</*maybe-const*/<OtherConst, InnerView>>
operator-( const /*sentinel*/& y, const /*iterator*/<OtherConst>& x );  // (2) (desde C++23)
```

  
Calcula a distância entre o [iterator](<#/doc/ranges/adjacent_transform_view/iterator>) x e o [sentinel](<#/doc/ranges/adjacent_transform_view/sentinel>) y. 

1) Equivalente a: `return x.[_inner__](<#/doc/ranges/adjacent_transform_view/iterator>) - y.[_inner__](<#/doc/ranges/adjacent_transform_view/sentinel>) ;`.

2) Equivalente a: `return y.[_inner__](<#/doc/ranges/adjacent_transform_view/sentinel>) - x.[_inner__](<#/doc/ranges/adjacent_transform_view/iterator>) ;`.

Esses function templates não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando `adjacent_transform_view::_sentinel_` é uma classe associada dos argumentos. 

### Parâmetros

x  |  \-  |  o iterator   
---|---|---
y  |  \-  |  o sentinel   
  
### Valor de retorno

A distância entre o iterator e o sentinel. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   