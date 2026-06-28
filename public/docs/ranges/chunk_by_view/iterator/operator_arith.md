# std::ranges::chunk_by_view&lt;V,Pred&gt;::iterator::operator++,--

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr /*iterator*/ operator++(int);  // (2) (desde C++23)
constexpr /*iterator*/& operator\--() requires ranges::bidirectional_range<V>;  // (3) (desde C++23)
constexpr /*iterator*/ operator\--(int) requires ranges::bidirectional_range<V>;  // (4) (desde C++23)
```

Incrementa ou decrementa o [iterator](<#/doc/ranges/chunk_by_view/iterator/iterator>).

Sejam [`_parent__`](<#/doc/ranges/chunk_by_view/iterator>), [`_current__`](<#/doc/ranges/chunk_by_view/iterator>), e [`_next__`](<#/doc/ranges/chunk_by_view/iterator>) os membros de dados subjacentes (apenas para exposição) apropriados do [iterator](<#/doc/ranges/chunk_by_view/iterator/iterator>).

Sejam [`_find-next_`](<#/doc/ranges/chunk_by_view/helpers>) e [`_find-prev_`](<#/doc/ranges/chunk_by_view/helpers>) as funções membro (apenas para exposição) apropriadas de ranges::chunk_by_view.

1) Equivalente a:
```cpp
    current_ = next_;
    next_ = parent_->/*find-next*/(current_);
    return *this;
```

O comportamento é indefinido se, antes da chamada a este operador, [`_current__`](<#/doc/ranges/chunk_by_view/iterator>) for igual a [`_next__`](<#/doc/ranges/chunk_by_view/iterator>).

2) Equivalente a: auto tmp = *this; ++*this; return tmp;

3) Equivalente a:
```cpp
    next_ = current_;
    current_ = parent_->/*find-prev*/(next_);
    return *this;
```

4) Equivalente a: auto tmp = *this; \--*this; return tmp;

### Parâmetros

(nenhum)

### Valor de retorno

1,3) *this

2,4) uma cópia de *this que foi feita antes da alteração.