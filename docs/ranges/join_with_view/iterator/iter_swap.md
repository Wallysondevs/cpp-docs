# iter_swap(ranges::join_with_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
requires std::indirectly_swappable<ranges::iterator_t</*InnerBase*/>,
ranges::iterator_t</*PatternBase*/>>;  // (desde C++23)
```

  
Aplica [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>) aos iterators internos como se por [std::visit](<#/doc/utility/variant/visit>)([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>), x.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿, y.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿);. 

Esta função não é visível para a pesquisa (lookup) comum [unqualified](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `join_with_view::_iterator_` ﻿`<Const>` é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  iterators para os elementos a serem trocados   
  
### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) |  troca os valores referenciados por dois objetos dereferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/algorithm/iter_swap>) |  troca os elementos apontados por dois iterators   
(modelo de função)