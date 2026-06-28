# std::ranges::join_with_view&lt;V,Pattern&gt;::join_with_view

```cpp
join_with_view()
requires std::default_initializable<V> &&
std::default_initializable<Pattern> = default;  // (1) (desde C++23)
constexpr explicit join_with_view( V base, Pattern pattern );  // (2) (desde C++23)
template< ranges::input_range R >
requires std::constructible_from<V, views::all_t<R>> &&
std::constructible_from
<Pattern, ranges::single_view
<ranges::range_value_t</*InnerRng*/>>>
constexpr explicit join_with_view
( R&& r, ranges::range_value_t</*InnerRng*/> e );  // (3) (desde C++23)
```

  
Constrói um `join_with_view`, inicializa o view subjacente `_[base_](<#/doc/ranges/join_with_view>)_` e o padrão armazenado `_[pattern_](<#/doc/ranges/join_with_view>)_` ﻿.

Sobrecarga  | [Membros de dados](<#/doc/ranges/join_with_view>)  
---|---|---
`_base__` | `_pattern__`  
(1) | [inicializado por valor](<#/doc/language/value_initialization>) | [inicializado por valor](<#/doc/language/value_initialization>)  
(2) | inicializado com std::move(base) | inicializado com std::move(pattern)  
(3) |  inicializado com [views::all](<#/doc/ranges/all_view>)([std::forward](<#/doc/utility/forward>)&lt;R&gt;(r)) |  inicializado com [views::single](<#/doc/ranges/single_view>)(std::move(e))  
  
### Parâmetros

base  |  \-  |  um view de ranges a ser achatado   
---|---|---
pattern  |  \-  |  view a ser usado como delimitador   
e  |  \-  |  elemento a ser usado como delimitador   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   