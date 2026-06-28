# std::ranges::view_interface&lt;D&gt;::size

```cpp
constexpr auto size() requires ranges::forward_range<D> &&
std::sized_sentinel_for<ranges::sentinel_t<D>,
ranges::iterator_t<D>>;  // (1) (desde C++20)
constexpr auto size() const requires ranges::forward_range<const D> &&
std::sized_sentinel_for<ranges::sentinel_t<const D>,
ranges::iterator_t<const D>>;  // (2) (desde C++20)
```

  
A implementação padrão da função membro `size()` obtém o tamanho do range calculando a diferença entre o sentinel e o iterator inicial.

### Valor de retorno

1) `_[to-unsigned-like](<#/doc/ranges>)_` ﻿([ranges::end](<#/doc/ranges/end>)(static_cast<D&>(this)) -  
` `[ranges::begin](<#/doc/ranges/begin>)(static_cast<D&>(this))).

2) `_[to-unsigned-like](<#/doc/ranges>)_` ﻿([ranges::end](<#/doc/ranges/end>)(static_cast&lt;const D&&gt;(this)) -  
` `[ranges::begin](<#/doc/ranges/begin>)(static_cast&lt;const D&&gt;(this))).

### Observações

Os seguintes tipos derivados podem usar a implementação padrão de `size()`: 

  * [std::ranges::drop_while_view](<#/doc/ranges/drop_while_view>)

Os seguintes tipos são derivados de [std::ranges::view_interface](<#/doc/ranges/view_interface>) e não declaram sua própria função membro `size()`, mas não podem usar a implementação padrão, porque seus tipos de iterator e sentinel nunca satisfazem [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>): 

  * [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)
  * [std::ranges::filter_view](<#/doc/ranges/filter_view>)
  * [std::ranges::join_view](<#/doc/ranges/join_view>)
  * std::ranges::lazy_split_view
  * [std::ranges::split_view](<#/doc/ranges/split_view>)
  * [std::ranges::take_while_view](<#/doc/ranges/take_while_view>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 3646](<https://cplusplus.github.io/LWG/issue3646>) | C++20  | as implementações padrão das funções `size` retornavam um tipo com sinal  | elas retornam um tipo sem sinal   
  
### Veja também

[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(function template)  
[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(customization point object)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro com sinal igual ao tamanho de um range  
(customization point object)