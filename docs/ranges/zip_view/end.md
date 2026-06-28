# std::ranges::zip_view&lt;Views...&gt;::end

```cpp
constexpr auto end()
requires (!(/*simple-view*/<Views> && ...);  // (1) (desde C++23)
constexpr auto end() const
requires (ranges::range<const Views> && ...);  // (2) (desde C++23)
template< class... Rs >
concept /*zip-is-common*/ =
(sizeof...(Rs) == 1 && (ranges::common_range<Rs> && ...))
```

(!([ranges::bidirectional_range](<#/doc/ranges/bidirectional_range>)&lt;Rs&gt; && ...) && ([ranges::common_range](<#/doc/ranges/common_range>)&lt;Rs&gt; && ...))  

(([ranges::random_access_range](<#/doc/ranges/random_access_range>)&lt;Rs&gt; && ...) && ([ranges::sized_range](<#/doc/ranges/sized_range>)&lt;Rs&gt; && ...)); |  (3)  |  (apenas para exposição*)  

  
Retorna um [iterator](<#/doc/ranges/zip_view/iterator>) ou um [sentinel](<#/doc/ranges/zip_view/sentinel>) que se compara como igual ao iterator de fim da [`zip_view`](<#/doc/ranges/zip_view>).

Seja [`_views__`](<#/doc/ranges/zip_view>) o tuple subjacente de views.

1) Equivalente a:

  * return /*sentinel*/&lt;false&gt;(/*tuple-transform*/([ranges::end](<#/doc/ranges/end>), views_));,

     se `/*zip-is-common*/<Views...>` avaliar como `false`. Caso contrário,

  * return begin() + [std::iter_difference_t](<#/doc/iterator/iter_t>)</*iterator*/&lt;false&gt;>(size());,

     se `([ranges::random_access_range](<#/doc/ranges/random_access_range>)<Views> && ...)` avaliar como `true`. Caso contrário,

  * return /*iterator*/&lt;false&gt;(/*tuple-transform*/([ranges::end](<#/doc/ranges/end>), views_));.

2) Equivalente a:

  * return /*sentinel*/&lt;true&gt;(/*tuple-transform*/([ranges::end](<#/doc/ranges/end>), views_));,

     se `/*zip-is-common*/<const Views...>` avaliar como `false`. Caso contrário,

  * return begin() + [std::iter_difference_t](<#/doc/iterator/iter_t>)</*iterator*/&lt;true&gt;>(size());,

     se `[ranges::random_access_range](<#/doc/ranges/random_access_range>)<const Views> && ...` avaliar como `true`. Caso contrário,

  * return /*iterator*/&lt;true&gt;(/*tuple-transform*/([ranges::end](<#/doc/ranges/end>), views_));.

### Parâmetros

(nenhum)

### Valor de retorno

Um iterator ou sentinel representando o fim da `zip_view`, conforme descrito acima.

### Observações

`[ranges::range](<#/doc/ranges/range>)<const [ranges::zip_view](<#/doc/ranges/zip_view>)<Views...>>` é modelado se e somente se para cada tipo `Vi` em `Views...`, `const Vi` modela [`range`](<#/doc/ranges/range>).

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ begin](<#/doc/ranges/zip_view/begin>) | retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)