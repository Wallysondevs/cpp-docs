# std::ranges::chunk_view&lt;V&gt;::end

```cpp
`V` modela apenas `input_range`
constexpr std::default_sentinel_t end() const noexcept;  // (1) (desde C++23)
`V` modela `forward_range`
constexpr auto end() requires (!__simple_view<V>);  // (2) (desde C++23)
constexpr auto end() const requires ranges::forward_range<const V>;  // (3) (desde C++23)
```

Retorna um [iterator](<#/doc/ranges/chunk_view>) ou um [std::default_sentinel](<#/doc/iterator/default_sentinel>) que se compara como igual ao iterator final do [`chunk_view`](<#/doc/ranges/chunk_view>).

1) Disponível apenas se V modela [`input_range`](<#/doc/ranges/input_range>). Equivalente a: return [std::default_sentinel](<#/doc/iterator/default_sentinel>).

2,3) Disponível se V modela [`forward_range`](<#/doc/ranges/forward_range>). Seja [`_base__`](<#/doc/ranges/chunk_view>) a view adaptada subjacente, [`_n__`](<#/doc/ranges/chunk_view>) o tamanho do chunk armazenado, e [`_iterator_`](<#/doc/ranges/chunk_view>) a classe iterator aninhada.

2) Equivalente a:
```cpp
    if constexpr (ranges::common_range<V> && ranges::sized_range<V>)
    {
        auto missing = (n_ - ranges::distance(base_) % n_) % n_;
        return iterator<false>(this, ranges::end(base_), missing);
    }
    else if constexpr (ranges::common_range<V> && !ranges::bidirectional_range<V>)
        return iterator<false>(this, ranges::end(base_));
    else
        return std::default_sentinel;
```

3) Equivalente a:
```cpp
    if constexpr (ranges::common_range<const V> && ranges::sized_range<const V>)
    {
        auto missing = (n_ - ranges::distance(base_) % n_) % n_;
        return iterator<true>(this, ranges::end(base_), missing);
    }
    else if constexpr (ranges::common_range<const V> && !ranges::bidirectional_range<const V>)
        return iterator<true>(this, ranges::end(base_));
    else
        return std::default_sentinel;
```

### Parameters

(nenhum)

### Return value

Um iterator ou sentinel representando o fim do [`chunk_view`](<#/doc/ranges/chunk_view>), conforme descrito acima.

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### See also

[ begin](<#/doc/ranges/chunk_view/begin>) | retorna um iterator para o início
(função membro pública)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)