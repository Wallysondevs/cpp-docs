# std::ranges::join_with_view&lt;V,Pattern&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const;  // (desde C++23)
```

  
Retorna o elemento atual na view unida.

### Valor de retorno

[std::visit](<#/doc/utility/variant/visit>)([](auto& it) -> /*referência*/ { return *it; },` ` _[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` ﻿), onde /*referência*/ é [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)<`_[InnerIter](<#/doc/ranges/join_with_view/iterator>)_` ﻿>,  
` `[std::iter_reference_t](<#/doc/iterator/iter_t>)<`_[PatternIter](<#/doc/ranges/join_with_view/iterator>)_` ﻿>>.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   