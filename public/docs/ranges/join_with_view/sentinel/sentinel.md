# std::ranges::join_with_view&lt;V,Pattern&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
constexpr /*sentinel*/( /*sentinel*/<!Const> i )
requires Const && std::convertible_to<ranges::sentinel_t<V>,
ranges::sentinel_t<const V>>;  // (2) (desde C++23)
constexpr explicit /*sentinel*/ ( /*Parent*/& parent );  // (3) (desde C++23)
(apenas para exposição*)
```

  
Constrói um sentinel. A sobrecarga (3) é chamada por [`end()`](<#/doc/ranges/join_with_view/end>) de ranges::join_with_view. 

Sobrecarga  | [`_end__`](<#/doc/ranges/join_with_view/sentinel>)  
---|---
(1) | [inicializado por valor](<#/doc/language/value_initialization>)  
(2) | inicializado com std::move(s.[`_end__`](<#/doc/ranges/join_with_view/sentinel>) ﻿)  
(3) |  inicializado com [ranges::end](<#/doc/ranges/end>)(parent.[`_base__`](<#/doc/ranges/join_with_view>) ﻿)  
  
### Parâmetros

i  |  \-  |  um sentinel correspondente a um iterator mutável   
---|---|---
parent  |  \-  |  um objeto std::ranges::join_with_view   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   