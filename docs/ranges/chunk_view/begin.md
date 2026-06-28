# std::ranges::chunk_view&lt;V&gt;::begin

```cpp
`V` modela apenas `input_range`
constexpr __outer_iterator begin();  // (1) (desde C++23)
`V` modela `forward_range`
constexpr auto begin() requires (!__simple_view<V>);  // (2) (desde C++23)
constexpr auto begin() const requires ranges::forward_range<const V>;  // (3) (desde C++23)
```

Retorna um [iterador](<#/doc/ranges/chunk_view/iterator>) para o primeiro elemento da `chunk_view`.

Seja [`_base__`](<#/doc/ranges/chunk_view>) a view subjacente.

1) Disponível apenas se V modela [`input_range`](<#/doc/ranges/input_range>). Equivalente a:
```cpp
    current_ = ranges::begin(base_);
    remainder_ = n_;
    return __outer_iterator(*this);
```

[`_current__`](<#/doc/ranges/chunk_view>), [`_remainder__`](<#/doc/ranges/chunk_view>) e [`_n__`](<#/doc/ranges/chunk_view>) são membros de dados subjacentes apenas para exposição de [`chunk_view`](<#/doc/ranges/chunk_view>).

2) Disponível se V modela [`forward_range`](<#/doc/ranges/forward_range>). Equivalente a: return iterator&lt;false&gt;(this, [ranges::begin](<#/doc/ranges/begin>)(base_));, onde [`iterator`](<#/doc/ranges/chunk_view>) é uma classe aninhada apenas para exposição.

3) Disponível se V modela [`forward_range`](<#/doc/ranges/forward_range>). Equivalente a: return iterator&lt;true&gt;(this, [ranges::begin](<#/doc/ranges/begin>)(base_));, onde [`iterator`](<#/doc/ranges/chunk_view>) é uma classe aninhada apenas para exposição.

### Parâmetros

(nenhum)

### Valor de retorno

Um iterador para o primeiro elemento da [`chunk_view`](<#/doc/ranges/chunk_view>), conforme descrito acima.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ end](<#/doc/ranges/chunk_view/end>) | retorna um iterador ou um sentinela para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterador para o início de um range
(objeto de ponto de customização)