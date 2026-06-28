# iter_move(ranges::concat_view::iterator)

```cpp
friend constexpr decltype(auto)
iter_move( const /*iterator*/& it ) noexcept(/* see description */);  // (desde C++26)
```

  
Retorna o resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator subjacente contido em `_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿. 

Seja `Ref` `_[concat-rvalue-reference-t](<#/doc/ranges/concat_view>)_` ﻿<`_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Views>...>. Equivalente a `return [std::visit](<#/doc/utility/variant/visit>)([](const auto& i) -> Ref { return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i); }, it.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿);`. 

Se `it.`_[it_](<#/doc/ranges/concat_view/iterator>)_`.valueless_by_exception()` for `true`, o comportamento é indefinido. 

Esta função não é visível para [unqualified lookup](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `concat_view::iterator &lt;Const&gt;` é uma classe associada dos argumentos. 

### Parâmetros

it  |  \-  |  iterator   
  
### Valor de retorno

O resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator subjacente. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(  

(([std::is_nothrow_invocable_v](<#/doc/types/is_invocable>)  
<decltype([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)),  
const [ranges::iterator_t](<#/doc/ranges/iterator_t>)</*maybe-const*/<Const, Views>>&> &&  
[std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)  
</*maybe-const*/<Const, Views>>, Ref>) && ...)  

)