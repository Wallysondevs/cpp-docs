# operator+,-(ranges::adjacent_transform_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
friend constexpr iterator operator-( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
const /*iterator*/& j )
requires std::sized_sentinel_for</*inner-iterator*/<Const>,
/*inner-iterator*/<Const>>;  // (4) (desde C++23)
```

  
Sejam [`_parent__`](<#/doc/ranges/adjacent_transform_view/iterator>) e [`_inner__`](<#/doc/ranges/adjacent_transform_view/iterator>) os membros de dados do [iterator](<#/doc/ranges/adjacent_transform_view/iterator>).

1,2) Equivalente a return /*iterator*/(*i.parent_, i.inner_ + n);.

3) Equivalente a return /*iterator*/(*i.parent_, i.inner_ - n);.

4) Equivalente a return i.inner_ - j.inner_;.

Essas funções não são visíveis para a [pesquisa não qualificada](<#/doc/language/unqualified_lookup>) comum ou [pesquisa qualificada](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `adjacent_transform_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i, j  |  \-  |  os [iterators](<#/doc/ranges/adjacent_transform_view/iterator>)  
---|---|---
n  |  \-  |  uma posição relativa à localização atual   
  
### Valor de retorno

1,2) Um iterator incrementado.

3) Um iterator decrementado.

4) Uma distância entre os iterators fornecidos.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/adjacent_transform_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  