# operator+,-(ranges::adjacent_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i,
difference_type n )
requires ranges::random_access_range<Base>;  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+( difference_type n,
const /*iterator*/& i )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
friend constexpr /*iterator*/ operator-( const /*iterator*/& i,
difference_type n )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
const /*iterator*/& j )
requires std::sized_sentinel_for<ranges::iterator_t<Base>,
ranges::iterator_t<Base>>;  // (4) (desde C++23)
```

  
Seja [`_current__`](<#/doc/ranges/adjacent_view/iterator>) o array subjacente de iterators, e [`_Base_`](<#/doc/ranges/adjacent_view/iterator>) o tipo (possivelmente qualificado com const) da view subjacente. 

1,2) Retorna o iterator i incrementado por n. Equivalente a: auto r = i; r += n; return r;.

3) Retorna o iterator i decrementado por n. Equivalente a: auto r = i; r -= n; return r;.

4) Retorna a distância entre i e j. Equivalente a: return i.current_.back() - j.current_.back();.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `adjacent_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i, j  |  \-  |  os iterators   
---|---|---
n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,2) Um iterator incrementado.

3) Um iterator decrementado.

4) Uma distância entre os iterators fornecidos.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/adjacent_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  