# std::ranges::join_with_view&lt;V,Pattern&gt;::end

```cpp
constexpr auto end();  // (1) (desde C++23)
constexpr auto end() const
requires ranges::forward_range<const V> &&
ranges::forward_range<const Pattern> &&
std::is_reference_v<ranges::range_reference_t<const V>>> &&
ranges::input_range<ranges::range_reference_t<const V>> &&
/*concatable*/<ranges::range_reference_t<const V>,
const Pattern>;  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/join_with_view/iterator>) ou um [sentinel](<#/doc/ranges/join_with_view/sentinel>) que se compara como igual ao iterator "past-the-end" do [`join_with_view`](<#/doc/ranges/join_with_view>). 

1) Retorna um iterator/sentinel mutável ou um iterator/sentinel constante. 

  * Se todas as condições a seguir forem satisfeitas, retorna um iterator: 

    

  * `V` modela [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>). 
  * [std::is_reference_v](<#/doc/types/is_reference>)<`_[InnerRng](<#/doc/ranges/join_with_view>)_` > é verdadeiro. 
  * `_[InnerRng](<#/doc/ranges/join_with_view>)_` modela [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>). 

  * Caso contrário, retorna um sentinel.

2) Retorna um iterator/sentinel constante. 

  * Se todas as condições a seguir forem satisfeitas, retorna um iterator: 

    

  * const V modela [`common_range`](<#/doc/ranges/common_range>). 
  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;const V&gt; modela [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>). 

  * Caso contrário, retorna um sentinel.

Para a definição de /*concatable*/, veja [`std::ranges::concat_view`](<#/doc/ranges/concat_view>).

### Valor de retorno

Sobrecarga | Valor de retorno   
---|---
Iterator  | Sentinel   
(1) | [`_iterator_`](<#/doc/ranges/join_with_view/iterator>) ﻿<[`_simple-view_`](<#/doc/ranges>) ﻿&lt;V&gt; &&  
` `[` _simple-view_`](<#/doc/ranges>) ﻿&lt;Pattern&gt;>  
` `{*this, [ranges::end](<#/doc/ranges/end>)(`_[base_](<#/doc/ranges/join_with_view>)_`)} |  [` _sentinel_`](<#/doc/ranges/join_with_view/sentinel>) ﻿<[`_simple-view_`](<#/doc/ranges>) ﻿&lt;V&gt; &&  
` `[` _simple-view_`](<#/doc/ranges>) ﻿&lt;Pattern&gt;>  
` `{*this}  
(2) |  [` _iterator_`](<#/doc/ranges/join_with_view/iterator>) ﻿&lt;true&gt;{*this, [ranges::end](<#/doc/ranges/end>)(`_[base_](<#/doc/ranges/join_with_view>)_`)} | [`_sentinel_`](<#/doc/ranges/join_with_view/sentinel>) ﻿&lt;true&gt;{*this}  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ begin](<#/doc/ranges/join_with_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)