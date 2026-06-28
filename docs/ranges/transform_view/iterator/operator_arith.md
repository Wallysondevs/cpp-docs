# std::ranges::transform_view&lt;V,F&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++20)
constexpr void operator++( int );  // (2) (desde C++20)
constexpr /*iterator*/ operator++( int )
requires ranges::forward_range<Base>;  // (3) (desde C++20)
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<Base>;  // (4) (desde C++20)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<Base>;  // (5) (desde C++20)
constexpr /*iterator*/& operator+=( difference_type n )
requires ranges::random_access_range<Base>;  // (6) (desde C++20)
constexpr /*iterator*/& operator-=( difference_type n )
requires ranges::random_access_range<Base>;  // (7) (desde C++20)
```

Incrementa ou decrementa o iterator.

Seja `current_` o iterator subjacente.

1) Equivalente a `++current_; return *this;`

2) Equivalente a `++current_;`

3) Equivalente a `auto tmp = *this; ++*this; return tmp;`

4) Equivalente a `--current_; return *this;`

5) Equivalente a `auto tmp = *this; --*this; return tmp;`

6) Equivalente a `current_ += n; return *this;`

7) Equivalente a `current_ -= n; return *this;`

### Parâmetros

- **n** — posição relativa à localização atual

### Valor de retorno

1,4,6,7) `*this`

3,5) uma cópia de `*this` que foi feita antes da alteração