# std::ranges::concat_view&lt;Views...&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++26)
constexpr /*iterator*/( /*iterator*/<!Const> it )
requires Const &&
(std::convertible_to<ranges::iterator_t<Views>,
ranges::iterator_t<const Views>> && ...);  // (2) (desde C++26)
template< class... Args >
constexpr explicit /*iterator*/
( /*maybe-const*/<Const, concat_view>* parent, Args&&... args )
requires std::constructible_from</*base-iter*/, Args&&...>;  // (3) (desde C++26)
(exposition only*)
```

  
Constrói um iterator.

Para a definição de /*maybe-const*/, veja `_[maybe-const](<#/doc/ranges>)_` ﻿.

Sobrecarga | [Membros de dados](<#/doc/ranges/concat_view/iterator>)
---|---
`_parent__` | `_it__`  
(1) | inicializado com nullptr | [inicializado por padrão](<#/doc/language/default_initialization>)  
(2) | inicializado com it.`_[parent_](<#/doc/ranges/concat_view/iterator>)_` | inicializado com `_[base-iter](<#/doc/ranges/concat_view/iterator>)_` ﻿([std::in_place_index](<#/doc/utility/in_place>)&lt;I&gt;,  
` ` ﻿std::get&lt;I&gt;(std::move(it.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿)))   
(onde I é it.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.index())  
(3) | inicializado com parent | inicializado com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...  
  
2) Se it.`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.valueless_by_exception() for true, o comportamento é indefinido.

### Parâmetros

- **it** — um iterator mutável
- **parent** — um ponteiro para ranges::concat_view
- **args** — os argumentos para inicializar `_[it_](<#/doc/ranges/concat_view/iterator>)_`
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   