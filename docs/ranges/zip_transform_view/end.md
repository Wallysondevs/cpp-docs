# std::ranges::zip_transform_view&lt;F,Views...&gt;::end

```cpp
constexpr auto end();  // (1) (desde C++23)
constexpr auto end() const
requires ranges::range<const /*InnerView*/> &&
std::regular_invocable<const F&,
ranges::range_reference_t<const Views>...>;  // (2) (desde C++23)
```

Retorna um [iterator](<#/doc/ranges/zip_transform_view/iterator>) ou um [sentinel](<#/doc/ranges/zip_transform_view/sentinel>) que se compara igual ao iterator de fim do [`zip_transform_view`](<#/doc/ranges/zip_transform_view>).

Seja `zip_` o tuple subjacente de views:

1) Equivalente a:
if constexpr ([ranges::common_range](<#/doc/ranges/common_range>)</*InnerView*/>)

return /*iterator*/&lt;false&gt;(*this, zip_.end());
else

return /*sentinel*/&lt;false&gt;(zip_.end());

2) Equivalente a:
if constexpr ([ranges::common_range](<#/doc/ranges/common_range>)&lt;const /*InnerView*/&gt;)

return /*iterator*/&lt;true&gt;(*this, zip_.end());
else

return /*sentinel*/&lt;true&gt;(zip_.end());

### Parâmetros

(nenhum)

### Valor de retorno

Um iterator ou sentinel representando o fim do `zip_transform_view`, conforme descrito acima.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ begin](<#/doc/ranges/zip_transform_view/begin>) | retorna um iterator para o início
(função membro pública)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)