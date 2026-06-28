# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::end

```cpp
constexpr auto end();  // (1) (desde C++23)
constexpr auto end() const
requires ranges::range<const InnerView> &&
std::regular_invocable<const F&,
/*REPEAT*/(ranges::range_reference_t<const V>, N)...>;  // (2) (desde C++23)
```

Retorna um [iterator](<#/doc/ranges/adjacent_transform_view/iterator>) ou um [sentinel](<#/doc/ranges/adjacent_transform_view/sentinel>) representando o fim da [`adjacent_transform_view`](<#/doc/ranges/adjacent_transform_view>).

Seja [`_inner__`](<#/doc/ranges/adjacent_transform_view>) o ranges::adjacent_view subjacente.

1) Equivalente a:
```cpp
    if constexpr (ranges::common_range<InnerView>)
        return /*iterator*/<false>(*this, inner_.end());
    else
        return /*sentinel*/<false>(inner_.end());
```

2) Equivalente a:
```cpp
    if constexpr (ranges::common_range<const InnerView>)
        return /*iterator*/<true>(*this, inner_.end());
    else
        return /*sentinel*/<true>(inner_.end());
```

### Parâmetros

(nenhum)

### Valor de retorno

Um [iterator](<#/doc/ranges/adjacent_transform_view/iterator>) para o elemento que segue o último elemento, se a view subjacente V modelar [`common_range`](<#/doc/ranges/common_range>). Caso contrário, um [sentinel](<#/doc/ranges/adjacent_transform_view/sentinel>) que se compara como igual ao iterator final.

### Observações

adjacent_transform_view<V,F,N> modela [`common_range`](<#/doc/ranges/common_range>) sempre que a view subjacente V o faz.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ begin](<#/doc/ranges/adjacent_transform_view/begin>) | retorna um iterator para o início
(função membro pública)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)