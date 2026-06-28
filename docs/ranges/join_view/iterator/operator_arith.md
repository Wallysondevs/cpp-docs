# std::ranges::join_view&lt;V&gt;::iterator&lt;Const&gt;::operator++,--

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++20)
constexpr void operator++( int );  // (2) (desde C++20)
constexpr /*iterator*/ operator++( int )
requires /*ref-is-glvalue*/ && ranges::forward_range<Base> &&
ranges::forward_range<ranges::range_reference_t<Base>>;  // (3) (desde C++20)
constexpr iterator& operator\--()
requires /*ref-is-glvalue*/ && ranges::bidirectional_range<Base> &&
ranges::bidirectional_range<ranges::range_reference_t<Base>> &&
ranges::common_range<ranges::range_reference_t<Base>>;  // (4) (desde C++20)
constexpr /*iterator*/ operator\--( int )
requires /*ref-is-glvalue*/ && ranges::bidirectional_range<Base> &&
ranges::bidirectional_range<ranges::range_reference_t<Base>> &&
ranges::common_range<ranges::range_reference_t<Base>>;  // (5) (desde C++20)
```

  
Incrementa ou decrementa o iterator subjacente.

Sejam [`_inner__`](<#/doc/ranges/join_view/iterator>) e [`_outer__`](<#/doc/ranges/join_view/iterator>) os iterators subjacentes, e [`_parent__`](<#/doc/ranges/join_view/iterator>) o ponteiro para o [ranges::join_view](<#/doc/ranges/join_view>) pai, a constante /*ref-is-glvalue*/ sendo [std::is_reference_v](<#/doc/types/is_reference>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>.

1) Seja /*inner-range*/:

  * *outer_, se /*ref-is-glvalue*/ == true;
  * *parent_->inner_ caso contrário.

Equivalente a:
```cpp
    auto&& inner_rng = /*inner-range*/;
    if (++inner_ == ranges::end(inner_rng))
    {
        ++outer_;
        satisfy();
    }
    return *this;
```

2) Equivalente a: ++*this.

3) Equivalente a:
```cpp
    auto tmp = *this;
    ++*this;
    return tmp;
```

4) Equivalente a:
```cpp
    if (outer_ == ranges::end(parent_->base_))
        inner_ = ranges::end(*--outer_);
    while (inner_ == ranges::begin(*outer_))
        inner_ = ranges::end(*--outer_);
    --inner_;
    return *this;
```

5) Equivalente a:
```cpp
    auto tmp = *this;
    --*this;
    return tmp;
```

### Parâmetros

(nenhum)

### Valor de retorno

1,4) *this

2) (nenhum)

3,5) uma cópia de *this que foi feita antes da alteração.