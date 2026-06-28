# operator+,-(ranges::zip_transform_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
const /*iterator*/& j )
requires std::sized_sentinel_for</*ziperator*/<Const>, /*ziperator*/<Const>>;  // (4) (desde C++23)
```

  
Seja [`_inner__`](<#/doc/ranges/zip_transform_view/iterator>) o iterator subjacente. 

1,2) Retorna o iterator `i` incrementado por `n`. Equivalente a: `return /*iterator*/(*i.parent_, i.inner_ + n);`.

3) Retorna o iterator `i` decrementado por `n`. Equivalente a: `return /*iterator*/(*i.parent_, i.inner_ - n);`.

4) Calcula a _distância_ entre `i` e `j`. Equivalente a `return i.inner_ - j.inner_;`.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `zip_transform_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i, j  |  \-  |  os iterators   
---|---|---
n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,2) /*iterator*/{ inner_ + n }

3) /*iterator*/{ inner_ - n }

4) i.inner_ - j.inner_

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/zip_transform_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  