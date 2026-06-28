# std::ranges::chunk_by_view&lt;V,Pred&gt;::find_next, std::ranges::chunk_by_view&lt;V,Pred&gt;::find_prev

## std::ranges::chunk_by_view::_next_

```cpp
constexpr ranges::iterator_t<V>
/*find-next*/( ranges::iterator_t<V> current );  // (desde C++23)
(exposition only*)
```

Encontra o próximo chunk.

Sejam [`_base__`](<#/doc/ranges/chunk_by_view>) e [`_pred__`](<#/doc/ranges/chunk_by_view>) os membros de dados subjacentes apropriados de [`chunk_by_view`](<#/doc/ranges/chunk_by_view>).

Equivalente a
```cpp
    return ranges::next
    (
        ranges::adjacent_find
        (
            current, ranges::end(base_), std::not_fn(std::ref(*pred_))
        ),
        1, ranges::end(base_)
    );
```

O comportamento é indefinido se pred_.has_value() for falso antes da chamada a esta função.

Usado nas seguintes funções membro não estáticas:

*   ranges::chunk_by_view::_iterator_ ::[`operator++`](<#/doc/ranges/chunk_by_view/iterator/operator_arith>)

### Parâmetros

- **current** — o iterator para o elemento atual na view adaptada

### Valor de retorno

Um iterator para o próximo chunk, conforme descrito acima.

## std::ranges::chunk_by_view::_prev_

```cpp
constexpr ranges::iterator_t<V>
/*find-prev*/( ranges::iterator_t<V> current )
requires ranges::bidirectional_range<V>;  // (desde C++23)
(exposition only*)
```

Encontra o chunk anterior.

Sejam [`_base__`](<#/doc/ranges/chunk_by_view>) e [`_pred__`](<#/doc/ranges/chunk_by_view>) os membros de dados subjacentes apropriados de [`chunk_by_view`](<#/doc/ranges/chunk_by_view>).

Retorna um iterator `i` no range `[`[ranges::begin](<#/doc/ranges/begin>)(base_)`, `current`)` tal que:

*   [ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(i, current, [std::not_fn](<#/doc/utility/functional/not_fn>)([std::ref](<#/doc/utility/functional/ref>)(*pred_))) é igual a current, e
*   se `i` não for igual a [ranges::begin](<#/doc/ranges/begin>)(base_), então bool([std::invoke](<#/doc/utility/functional/invoke>)(*pred_, *[ranges::prev](<#/doc/iterator/ranges/prev>)(i), *i)) é falso.

O comportamento é indefinido se, antes da chamada a esta função, current == [ranges::begin](<#/doc/ranges/begin>)(base_) ou pred_.has_value() != true.

Usado nas seguintes funções membro não estáticas:

*   ranges::chunk_by_view::_iterator_ ::[`operator--`](<#/doc/ranges/chunk_by_view/iterator/operator_arith>)

### Parâmetros

- **current** — o iterator para o elemento atual na view adaptada

### Valor de retorno

Um iterator para o chunk anterior, conforme descrito acima.