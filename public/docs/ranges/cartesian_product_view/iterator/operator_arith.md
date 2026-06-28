# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/ operator++( int )
requires ranges::forward_range</*maybe-const*/<Const, First>>;  // (3) (desde C++23)
constexpr /*iterator*/& operator\--()
requires /*cartesian-product-is-bidirectional*/<Const, First, Vs...>;  // (4) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires /*cartesian-product-is-bidirectional*/<Const, First, Vs...>;  // (5) (desde C++23)
constexpr /*iterator*/& operator+=( difference_type n )
requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;  // (6) (desde C++23)
constexpr /*iterator*/& operator-=( difference_type n )
requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;  // (7) (desde C++23)
```

  
Incrementa ou decrementa o [iterator](<#/doc/ranges/cartesian_product_view/iterator/iterator>).

Seja [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) o tuple subjacente de iterators e [`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) o ponteiro subjacente para `cartesian_product_view`.

1) Equivalente a [`_next_`](<#/doc/ranges/cartesian_product_view/iterator/helpers>)();` `return *this;

2) Equivalente a ++*this;

3) Equivalente a auto tmp = *this; ++*this; return tmp;

4) Equivalente a [`_prev_`](<#/doc/ranges/cartesian_product_view/iterator/helpers>)();` `return *this;

5) Equivalente a auto tmp = *this; \--*this; return tmp;

6) Define o valor de *this para `_ret_`, onde `_ret_` é:

  * se n > 0, o valor de *this, desde que [`_next_`](<#/doc/ranges/cartesian_product_view/iterator/helpers>) tenha sido chamado n vezes. Caso contrário,
  * se n < 0, o valor de *this, desde que [`_prev_`](<#/doc/ranges/cartesian_product_view/iterator/helpers>) tenha sido chamado -n vezes. Caso contrário,
  * o valor de *this antes da chamada.

O comportamento é indefinido se n não estiver no range `[`[ranges::distance](<#/doc/iterator/ranges/distance>)(*this, [ranges::begin](<#/doc/ranges/begin>)(*parent_))`, `[ranges::distance](<#/doc/iterator/ranges/distance>)(*this, [ranges::end](<#/doc/ranges/end>)(*parent_))`)`.

7) Equivalente a *this += -n; return *this;.

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,4,6,7) *this

2) (nenhum)

3,5) uma cópia de *this que foi feita antes da alteração.

### Complexidade

6) Constante.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ operator+operator-](<#/doc/ranges/cartesian_product_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterator   
(função)  