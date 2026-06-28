# std::ranges::zip_view&lt;Views...&gt;::begin

```cpp
constexpr auto begin()
requires (!(/*simple-view*/<Views> && ...));  // (1) (desde C++23)
constexpr auto begin() const
requires (ranges::range<const Views> && ...);  // (2) (desde C++23)
```

  
Obtém o [iterator](<#/doc/ranges/zip_view/iterator>) inicial de [`zip_view`](<#/doc/ranges/zip_view>). 

### Valor de retorno

1) [`_iterator_`](<#/doc/ranges/zip_view/iterator>) ﻿&lt;false&gt;(`_[tuple-transform](<#/doc/ranges>)_`([ranges::begin](<#/doc/ranges/begin>),` ` _[views_](<#/doc/ranges/zip_view>)_` ﻿));.

2) [`_iterator_`](<#/doc/ranges/zip_view/iterator>) ﻿&lt;true&gt;(`_[tuple-transform](<#/doc/ranges>)_`([ranges::begin](<#/doc/ranges/begin>),` ` _[views_](<#/doc/ranges/zip_view>)_` ﻿));.

### Observações

[ranges::range](<#/doc/ranges/range>)<const [ranges::zip_view](<#/doc/ranges/zip_view>)<Views...>> é modelado se e somente se para cada tipo `Vi` em `Views...`, `const Vi` modela [`range`](<#/doc/ranges/range>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ end](<#/doc/ranges/zip_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)