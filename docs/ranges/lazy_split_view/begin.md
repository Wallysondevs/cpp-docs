# std::ranges::lazy_split_view&lt;V,Pattern&gt;::begin

```cpp
constexpr auto begin();  // (1) (desde C++20)
constexpr auto begin() const
requires ranges::forward_range<V> && ranges::forward_range<const V>;  // (2) (desde C++20)
```

Retorna um [`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) para o primeiro elemento da [`lazy_split_view`](<#/doc/ranges/lazy_split_view/lazy_split_view>).

Seja `_[base_](<#/doc/ranges/lazy_split_view>)_` a view subjacente e `_[current_](<#/doc/ranges/lazy_split_view>)_` o objeto de cache subjacente (pode não estar presente).

1) Equivalente a
```cpp
    constexpr auto begin()
    {
        if constexpr (ranges::forward_range<V>)
            return /*outer_iterator*/</*simple_view*/<V>>{*this, ranges::begin(base_)};
        else
        {
            current_ = ranges::begin(base_);
            return /*outer_iterator*/<false>{*this};
        }
    }
```

2) Equivalente a return /*outer_iterator*/&lt;true&gt;{*this, [ranges::begin](<#/doc/ranges/begin>)(base_)};.

### Valor de retorno

[`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) para o primeiro elemento.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ end](<#/doc/ranges/lazy_split_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)