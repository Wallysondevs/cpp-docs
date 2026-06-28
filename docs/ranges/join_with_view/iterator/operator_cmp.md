# operator==(ranges::join_with_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires std::is_reference_v<InnerBase> &&
std::equality_comparable<ranges::iterator_t<Base>> &&
std::equality_comparable<ranges::iterator_t<InnerBase>>;  // (desde C++23)
```

  
Compara se os iterators x e y são iguais. Eles só são considerados iguais se seus [iterators externos](<#/doc/ranges/join_with_view/iterator>) e [iterators internos](<#/doc/ranges/join_with_view/iterator>) se compararem como iguais, respectivamente.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::join_with_view::_iterator_` ﻿`<Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

x.`_[outer_it_](<#/doc/ranges/join_with_view/iterator>)_` `== y.`_[outer_it_](<#/doc/ranges/join_with_view/iterator>)_` `&& x.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` `== y.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_`

### Veja também

[ operator==](<#/doc/ranges/join_with_view/sentinel/operator_cmp>)(C++23) | compara um sentinel com um iterator retornado de [`join_with_view::begin`](<#/doc/ranges/join_with_view/begin>)   
(função)  