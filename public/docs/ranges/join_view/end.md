# std::ranges::join_view&lt;V&gt;::end

```cpp
constexpr auto end();  // (1) (desde C++20)
constexpr auto end() const
requires ranges::input_range<const V> &&
std::is_reference_v<ranges::range_reference_t<const V>>;  // (2) (desde C++20)
```

Retorna um [sentinel](<#/doc/ranges/join_view/sentinel>) ou um [iterator](<#/doc/ranges/join_view/iterator>) representando o fim da `join_view`.

Seja `_base__` a view subjacente:

1) Equivalente a
```
    if constexpr (ranges::forward_range<V> &&
                  std::is_reference_v<ranges::range_reference_t<V>> &&
                  ranges::forward_range<ranges::range_reference_t<V>> &&
                  ranges::common_range<V> &&
                  ranges::common_range<ranges::range_reference_t<V>>)
        return /*iterator*/</*simple-view*/<V>>{*this, ranges::end(base_)};
    else
        return /*sentinel*/</*simple-view*/<V>>{*this};
```

2) Equivalente a
```
    if constexpr (ranges::forward_range<const V> &&
                  std::is_reference_v<ranges::range_reference_t<const V>> &&
                  ranges::forward_range<ranges::range_reference_t<const V>> &&
                  ranges::common_range<const V> &&
                  ranges::common_range<ranges::range_reference_t<const V>>)
        return /*iterator*/<true>{*this, ranges::end(base_)};
    else
        return /*sentinel*/<true>{*this};
```

### Parâmetros

(nenhum)

### Valor de retorno

1) Um sentinel que se compara como igual ao iterator final.

2) Um iterator para o elemento que segue o último elemento.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ begin](<#/doc/ranges/join_view/begin>) | retorna um iterator para o início
(função membro pública)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)