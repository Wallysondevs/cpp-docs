# operator+,-(ranges::stride_view::iterator)

```cpp
friend constexpr /*iterator*/
operator+( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (1) (desde C++23)
friend constexpr /*iterator*/
operator+( difference_type n, const /*iterator*/& i )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
friend constexpr /*iterator*/
operator-( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr difference_type
operator-( const /*iterator*/& x, const /*iterator*/& y )
requires std::sized_sentinel_for<ranges::iterator_t<Base>,
ranges::iterator_t<Base>>;  // (4) (desde C++23)
friend constexpr difference_type
operator-( std::default_sentinel_t, const /*iterator*/& x )
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t<Base>>;  // (5) (desde C++23)
friend constexpr difference_type
operator-( const /*iterator*/& x, std::default_sentinel_t s )
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t<Base>>;  // (6) (desde C++23)
```

  
Incrementa ou decrementa o [iterator](<#/doc/ranges/stride_view/iterator/iterator>).

Sejam [`_current__`](<#/doc/ranges/stride_view/iterator>), [`_end__`](<#/doc/ranges/stride_view/iterator>), [`_stride__`](<#/doc/ranges/stride_view/iterator>), e [`_missing__`](<#/doc/ranges/stride_view/iterator>) os membros de dados do [iterator](<#/doc/ranges/stride_view/iterator/iterator>).

1,2) Equivalente a auto r = i; r += n; return r;.

3) Equivalente a auto r = i; r -= n; return r;.

4) Seja `_N_` x.current_ - y.current_. Retorna:

  * (N + x.missing_ - y.missing_) / x.stride_, se [`_Base_`](<#/doc/ranges/stride_view/iterator>) modela [`forward_range`](<#/doc/ranges/forward_range>).
  * -/*div-ceil*/(-N, x.stride_), se `_N < 0_`.
  * /*div-ceil*/(N, x.stride_) caso contrário.

5) Equivalente a return /*div-ceil*/(x.end_ - x.current_, x.stride_);.

6) Equivalente a return -(s - x);.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `stride_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

x, y, i  |  \-  |  os [iterators](<#/doc/ranges/stride_view/iterator>)  
---|---|---
s  |  \-  |  um [sentinel](<#/doc/iterator/default_sentinel>)  
  
### Valor de retorno

1,2) Um iterator incrementado

3) Um iterator decrementado

4) Uma distância entre os iterators fornecidos

5,6) Uma distância entre o iterator e o sentinel fornecidos

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/stride_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  