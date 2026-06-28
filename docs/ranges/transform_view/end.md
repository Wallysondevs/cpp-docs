# std::ranges::transform_view&lt;V,F&gt;::end

```cpp
constexpr /*sentinel*/<false> end();  // (1) (desde C++20)
constexpr /*iterator*/<false> end() requires ranges::common_range<V>;  // (2) (desde C++20)
constexpr /*sentinel*/<true> end() const
requires ranges::range<const V> &&
std::regular_invocable<const F&, ranges::range_reference_t<const V>>;  // (3) (desde C++20)
constexpr /*iterator*/<true> end() const
requires ranges::common_range<const V> &&
std::regular_invocable<const F&, ranges::range_reference_t<const V>>;  // (4) (desde C++20)
```

Retorna um [sentinel](<#/doc/ranges/transform_view/sentinel>) ou um [iterator](<#/doc/ranges/transform_view/iterator>) representando o fim da `transform_view`.

Seja [`_base__`](<#/doc/ranges/transform_view>) a view subjacente. Equivalente a:

1) return /*sentinel*/&lt;false&gt;{[ranges::end](<#/doc/ranges/end>)(base_)};.

2) return /*iterator*/&lt;false&gt;{*this, [ranges::end](<#/doc/ranges/end>)(base_)};.

3) return /*sentinel*/&lt;true&gt;{[ranges::end](<#/doc/ranges/end>)(base_)};.

4) return /*iterator*/&lt;true&gt;{*this, [ranges::end](<#/doc/ranges/end>)(base_)};.

### Parâmetros

(nenhum)

### Valor de retorno

1,3) sentinel que se compara como igual ao iterator final

2,4) iterator para o elemento que segue o último elemento

### Observações

`end()` retorna um iterator se e somente se a view subjacente for um [`common_range`](<#/doc/ranges/common_range>): transform_view<V,F> modela [`common_range`](<#/doc/ranges/common_range>) sempre que `V` o faz.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ begin](<#/doc/ranges/transform_view/begin>) | retorna um iterator para o início
(função membro pública)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)