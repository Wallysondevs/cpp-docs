# std::ranges::view_interface&lt;D&gt;::back

```cpp
constexpr decltype(auto) back()
requires ranges::bidirectional_range<D> && ranges::common_range<D>;  // (1) (desde C++20)
constexpr decltype(auto) back() const
requires ranges::bidirectional_range<const D> && ranges::common_range<const D>;  // (2) (desde C++20)
```

  
A implementação padrão da função membro `back()` retorna o último elemento na view do tipo derivado. Se o elemento é retornado por valor ou por referência depende do operator* do tipo do iterator.

1) Seja `derived` static_cast<D&>(*this). Equivalente a return *[ranges::prev](<#/doc/iterator/ranges/prev>)([ranges::end](<#/doc/ranges/end>)(derived));. O comportamento é indefinido se [`empty()`](<#/doc/ranges/view_interface/empty>) for true (ou seja, o iterator inicial se compara igual ao sentinel), mesmo que o iterator obtido da mesma forma seja desreferenciável.

2) O mesmo que (1), exceto que `derived` é static_cast&lt;const D&&gt;(*this).

### Parâmetros

(nenhum) 

### Valor de retorno

O último elemento na view. 

### Notas

Em C++20, nenhum tipo derivado de [std::ranges::view_interface](<#/doc/ranges/view_interface>) na standard library fornece sua própria função membro `back()`.

No entanto, os seguintes tipos derivados não podem usar as implementações padrão, pois nunca satisfazem nem [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) nem [`common_range`](<#/doc/ranges/common_range>):

  * [std::ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)
  * std::ranges::lazy_split_view
  * [std::ranges::split_view](<#/doc/ranges/split_view>)
  * [std::ranges::take_while_view](<#/doc/ranges/take_while_view>)

A função membro `back()` herdada está disponível para [std::ranges::empty_view](<#/doc/ranges/empty_view>), mas uma chamada a ela sempre resulta em comportamento indefinido.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array   
(function template)  
[ ranges::rbegin](<#/doc/ranges/rbegin>)(C++20) | retorna um reverse iterator para um range  
(customization point object)  
[ ranges::crbegin](<#/doc/ranges/crbegin>)(C++20) | retorna um reverse iterator para um range somente leitura  
(customization point object)