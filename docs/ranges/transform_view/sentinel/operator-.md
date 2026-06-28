# operator-(ranges::transform_view::sentinel)

```cpp
friend constexpr ranges::range_difference_t<Base>
operator-( const /*iterator*/<Const>& x, const /*sentinel*/& y )
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t<Base>>;  // (1) (desde C++20)
friend constexpr ranges::range_difference_t<Base>
operator-( const /*sentinel*/& y, const /*iterator*/<Const>& x )
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t<Base>>;  // (2) (desde C++20)
```

  
Calcula a distância entre o iterator subjacente de x e o sentinel subjacente de y.

Estas funções não são visíveis para pesquisa não qualificada comum ou pesquisa qualificada, e só podem ser encontradas por pesquisa dependente de argumento quando `transform_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/transform_view/iterator>)  
---|---|---
y  |  \-  |  um sentinel   
  
### Valor de retorno

Seja `_current__` o iterator subjacente, `_end__` o sentinel subjacente.

1) x.current_ - y.end_

2) y.end_ - x.current_