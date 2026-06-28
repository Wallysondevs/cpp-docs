# operator-(ranges::adjacent_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t</*maybe-const*/<OtherConst, V>>>
friend constexpr ranges::range_difference_t</*maybe-const*/<OtherConst, V>>
operator-( const /*iterator*/<OtherConst>& x, const /*sentinel*/& y );  // (1) (desde C++23)
template< bool OtherConst >
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t</*maybe-const*/<OtherConst, V>>>
friend constexpr ranges::range_difference_t</*maybe-const*/<OtherConst, V>>
operator-( const /*sentinel*/& y, const /*iterator*/<OtherConst>& x );  // (2) (desde C++23)
```

  
Calcula a distância entre o iterator subjacente de x e o sentinel subjacente de y.

Seja [`_current__`](<#/doc/ranges/adjacent_view/iterator>) o array subjacente de iterators em x, e [`_end__`](<#/doc/ranges/adjacent_view/sentinel>) o sentinel subjacente em y.

1) Equivalente a: return x.current_.back() - y.end_;

2) Equivalente a: return y.end_ - x.current_.back();

Esses function templates não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando `adjacent_view::_sentinel_` é uma classe associada dos argumentos.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/adjacent_view/iterator>)  
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/adjacent_view/sentinel>)  
  
### Valor de retorno

A distância entre x e y.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também