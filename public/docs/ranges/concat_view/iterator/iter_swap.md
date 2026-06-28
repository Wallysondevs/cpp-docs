# iter_swap(ranges::concat_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept( /* veja a descrição */ ) requires ( /* veja a descrição */ );  // (desde C++26)
```

  
Troca os objetos apontados pelos iterators subjacentes de x e y. Equivalente a [std::visit](<#/doc/utility/variant/visit>)  
(  
` `[&](const auto& it1, const auto& it2)  
` `{  
` `if constexpr ([std::is_same_v](<#/doc/types/is_same>)<decltype(it1), decltype(it2)>)  
` `[ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(it1, it2);  
` `else  
` `[ranges::swap](<#/doc/utility/ranges/swap>)(*x, *y);  
` `},  
` `x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿,  
` `y.`_[it_](<#/doc/ranges/concat_view/iterator>)_`  
);

A expressão na cláusula requires é equivalente a [std::swappable_with](<#/doc/concepts/swappable>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)</*iterator*/>,  
` `[std::iter_reference_t](<#/doc/iterator/iter_t>)</*iterator*/>> &&  
(... && [std::indirectly_swappable](<#/doc/iterator/indirectly_swappable>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>>>) . 

Se x.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() || y.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() for true, o comportamento é indefinido. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando concat_view::`_iterator_` ﻿&lt;Const&gt; é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  [iterators](<#/doc/ranges/concat_view/iterator>)  
  
### Exceções

Seja its um pack de lvalues, onde cada valor é do tipo correspondente em const [ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>>. 

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([ranges::swap](<#/doc/utility/ranges/swap>)(*x, *y)) && ... && noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(its, its)))

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) |  troca os valores referenciados por dois objetos desreferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/algorithm/iter_swap>) |  troca os elementos apontados por dois iterators   
(modelo de função)