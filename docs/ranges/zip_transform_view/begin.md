# std::ranges::zip_transform_view&lt;F,Views...&gt;::begin

```cpp
constexpr auto begin();  // (1) (desde C++23)
constexpr auto begin() const
requires ranges::range<const ranges::zip_view<Views...>>;  // (2) (desde C++23)
```

Obtém o iterator inicial de `zip_transform_view`.

1) Equivalente a return /*iterator*/&lt;false&gt;(*this, zip_.begin());.

2) Equivalente a return /*iterator*/&lt;true&gt;(*this, zip_.begin());.

### Parâmetros

(nenhum)

### Valor de retorno

[Iterator](<#/doc/ranges/zip_transform_view/iterator>) para o primeiro elemento.

### Observações

[ranges::range](<#/doc/ranges/range>)<const [ranges::zip_view](<#/doc/ranges/zip_view>)<Views...>> é modelado se e somente se para cada tipo `Vi` em `Views...`, const Vi modela [`range`](<#/doc/ranges/range>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ end](<#/doc/ranges/zip_transform_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)