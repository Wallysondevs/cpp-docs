# operator-(ranges::slide_view::sentinel)

```cpp
friend constexpr ranges::range_difference_t<V>
operator-( const /*iterator*/<false>& x, const /*sentinel*/& y )
requires std::sized_sentinel_for<ranges::sentinel_t<V>,
ranges::iterator_t<V>>;  // (1) (desde C++23)
friend constexpr ranges::range_difference_t<V>
operator-( const /*sentinel*/& y, const /*iterator*/<false>& x )
requires std::sized_sentinel_for<ranges::sentinel_t<V>,
ranges::iterator_t<V>>;  // (2) (desde C++23)
```

  
Calcula a distância entre o [iterator](<#/doc/ranges/slide_view/iterator>) subjacente de x e o [sentinel](<#/doc/ranges/slide_view/sentinel>) subjacente de y. 

Seja [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) o iterator subjacente de x e [`_end__`](<#/doc/ranges/slide_view/sentinel>) o sentinel subjacente de y. 

1) Equivalente a: return x.last_ele_ - y.end_;.

2) Equivalente a: return y.end_ - x.last_ele_;.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `slide_view::_sentinel_` é uma classe associada dos argumentos. 

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/slide_view/iterator>)  
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/slide_view/sentinel>)  
  
### Valor de retorno

A distância entre o iterator e o sentinel. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   