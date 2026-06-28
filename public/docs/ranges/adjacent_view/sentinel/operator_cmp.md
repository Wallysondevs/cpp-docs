# operator==(ranges::adjacent_view::iterator, ranges::adjacent_view::sentinel)

```cpp
template< bool OtherConst >
requires std::sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t</*maybe-const*/<OtherConst, V>>>
friend constexpr bool operator==( const /*iterator*/<OtherConst>& x,
const /*sentinel*/& y );  // (desde C++23)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y.

Equivalente a: return x.current_.back() == y.end_, onde [`_current__`](<#/doc/ranges/adjacent_view/iterator>) é o array subjacente de iterators em x, e [`_end__`](<#/doc/ranges/adjacent_view/sentinel>) é o sentinel subjacente em y.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `adjacent_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/adjacent_view/iterator>) para comparar   
---|---|---
y  |  \-  |  [sentinel](<#/doc/ranges/adjacent_view/sentinel>) para comparar   
  
### Valor de retorno

`true` se o iterator subjacente armazenado em x for o iterator de fim.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   