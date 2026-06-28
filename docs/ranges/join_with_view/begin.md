# std::ranges::join_with_view&lt;V,Pattern&gt;::begin

```cpp
constexpr auto begin();  // (1) (desde C++23)
constexpr auto begin() const
requires ranges::forward_range<const V> &&
ranges::forward_range<const Pattern> &&
std::is_reference_v<ranges::range_reference_t<const V>> &&
ranges::input_range<ranges::range_reference_t<const V>> &&
/*concatable*/<ranges::range_reference_t<const V>,
const Pattern>;  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/join_with_view/iterator>) para o início da [`join_with_view`](<#/doc/ranges/join_with_view>).

1) Retorna um iterator mutável ou um iterator const.

  * Se `V` modela [`forward_range`](<#/doc/ranges/forward_range>), equivalente a constexpr bool use_const =
` ` _[simple-view](<#/doc/ranges>)_` ﻿&lt;V&gt; && [std::is_reference_v](<#/doc/types/is_reference>)<`_[InnerRng](<#/doc/ranges/join_with_view>)_` ﻿> &&` ` _[simple-view](<#/doc/ranges>)_` ﻿&lt;Pattern&gt;;
return` `[` _iterator_`](<#/doc/ranges/join_with_view/iterator>) ﻿<use_const>{*this, [ranges::begin](<#/doc/ranges/begin>)(`_[base_](<#/doc/ranges/join_with_view>)_`)};.
  * Caso contrário, equivalente a `_[outer_it_](<#/doc/ranges/join_with_view>)_` `= [ranges::begin](<#/doc/ranges/begin>)(`_[base_](<#/doc/ranges/join_with_view>)_`);
return` `[` _iterator_`](<#/doc/ranges/join_with_view/iterator>) ﻿&lt;false&gt;{*this};.

2) Retorna um iterator const.

Para a definição de `_[concatable](<#/doc/ranges/concat_view>)_`, veja [`std::ranges::concat_view`](<#/doc/ranges/concat_view>).

### Valor de retorno

1) Conforme descrito acima.

2) [`_iterator_`](<#/doc/ranges/join_with_view/iterator>) ﻿&lt;true&gt;{*this, [ranges::begin](<#/doc/ranges/begin>)(`_[base_](<#/doc/ranges/join_with_view>)_`)}.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo
  
### Veja também

[ end](<#/doc/ranges/join_with_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)