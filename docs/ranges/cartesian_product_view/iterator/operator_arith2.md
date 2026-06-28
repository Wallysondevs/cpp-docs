# operator+,-(ranges::cartesian_product_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i,
difference_type n )
requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+( difference_type n,
const /*iterator*/& i )
requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;  // (2) (desde C++23)
friend constexpr /*iterator*/ operator-( const /*iterator*/& i,
difference_type n )
requires /*cartesian-product-is-random-access*/<Const, First, Vs...>;  // (3) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
const /*iterator*/& j )
requires
/*cartesian-is-sized-sentinel*/<Const, iterator_t, First, Vs...>;  // (4) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
std::default_sentinel_t )
requires
/*cartesian-is-sized-sentinel*/<Const, ranges::sentinel_t, First, Vs...>;  // (5) (desde C++23)
friend constexpr difference_type operator-( std::default_sentinel_t s,
const /*iterator*/& i )
requires
/*cartesian-is-sized-sentinel*/<Const, ranges::sentinel_t, First, Vs...>;  // (6) (desde C++23)
```

  
Realiza aritmética de [iterator](<#/doc/ranges/cartesian_product_view/iterator>) ou calcula a distância.

Seja [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) o tuple subjacente de iterators e [`_parent__`](<#/doc/ranges/cartesian_product_view/iterator>) o ponteiro subjacente para `cartesian_product_view`.

1) Equivalente a: return /*iterator*/(i) += n;.

2) Equivalente a: return i + n;.

3) Equivalente a: return /*iterator*/(i) -= n;.

4) Equivalente a: return i.[`_distance_from_`](<#/doc/ranges/cartesian_product_view/iterator/helpers>)(j.current_);.

5) Seja /*end-tuple*/ um objeto de um tipo que é uma especialização de [tuple](<#/doc/utility/tuple>), tal que:

  * std::get<0>(/*end-tuple*/) tem o mesmo valor que [ranges::end](<#/doc/ranges/end>)(std::get<0>(i.parent_->bases_));
  * std::get&lt;N&gt;(/*end-tuple*/) tem o mesmo valor que [ranges::begin](<#/doc/ranges/begin>)(std::get&lt;N&gt;(i.parent_->bases_)) para todo inteiro 1 ≤ N ≤ sizeof...(Vs).

Equivalente a: return i.[`_distance_from_`](<#/doc/ranges/cartesian_product_view/iterator/helpers>)(/*end-tuple*/);.

6) Equivalente a: return -(i - s);.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `cartesian_product_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i, j  |  \-  |  os iterators   
---|---|---
n  |  \-  |  a posição relativa à localização atual   
s  |  \-  |  o sentinel   
  
### Valor de retorno

1,2) Um iterator incrementado.

3) Um iterator decrementado.

4) Uma distância entre os iterators fornecidos.

5,6) Uma distância entre o iterator fornecido e o sentinel.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/cartesian_product_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  