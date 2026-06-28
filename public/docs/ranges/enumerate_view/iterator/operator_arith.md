# std::ranges::enumerate_view&lt;V&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/ operator++( int )
requires ranges::forward_range<Base>;  // (3) (desde C++23)
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<Base>;  // (4) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<Base>;  // (5) (desde C++23)
constexpr /*iterator*/& operator+=( difference_type n )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
constexpr /*iterator*/& operator-=( difference_type n )
requires ranges::random_access_range<Base>;  // (7) (desde C++23)
```

  
Incrementa ou decrementa o [iterator](<#/doc/ranges/enumerate_view/iterator/iterator>). 

Seja [`_current__`](<#/doc/ranges/enumerate_view/iterator>) o iterator subjacente e [`_pos__`](<#/doc/ranges/enumerate_view/iterator>) o índice subjacente. 

1) Equivalente a ++current_; ++pos_; return *this;

2) Equivalente a ++current_;

3) Equivalente a auto tmp = *this; ++*this; return tmp;

4) Equivalente a \--current_; \--pos_; return *this;

5) Equivalente a auto tmp = *this; \--*this; return tmp;

6) Equivalente a current_ += n; pos_ += n; return *this;

7) Equivalente a current_ -= n; pos_ -= n; return *this;

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,4,6,7) *this

2) (nenhum)

3,5) uma cópia de *this que foi feita antes da alteração

### Ver também

[ operator+operator-](<#/doc/ranges/enumerate_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iteradores   
(function)  