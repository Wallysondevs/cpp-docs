# iter_move(ranges::join_with_view::iterator)

```cpp
friend constexpr decltype(auto) iter_move( const /*iterator*/& i );  // (desde C++23)
```

  
Retorna o resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao [inner iterator](<#/doc/ranges/join_with_view/iterator>).

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `join_with_view::_iterator_` ﻿`<Const>` é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

[std::visit](<#/doc/utility/variant/visit>)<rvalue_reference>([ranges::iter_move](<#/doc/iterator/ranges/iter_move>), x.`_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_`), onde `rvalue_reference` é [std::common_reference_t](<#/doc/types/common_reference>)<[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)<`_[InnerBase](<#/doc/ranges/join_with_view/iterator>)_` ﻿>,  
` `[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)<`_[PatternBase](<#/doc/ranges/join_with_view/iterator>)_` ﻿>>.

### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  