# operator+,-(ranges::chunk_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i,
difference_type pos )
requires ranges::random_access_range<Base>;  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+( difference_type pos,
const /*iterator*/& i )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
friend constexpr /*iterator*/ operator-( const /*iterator*/& i,
difference_type pos )
requires ranges::random_access_range<Base>;  // (3) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
const /*iterator*/& j )
requires std::sized_sentinel_for<ranges::iterator_t<Base>,
ranges::iterator_t<Base>>;  // (4) (desde C++23)
friend constexpr difference_type operator-( std::default_sentinel_t,
const /*iterator*/& i )
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t<Base>>;  // (5) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
std::default_sentinel_t )
requires std::sized_sentinel_for<ranges::sentinel_t<Base>,
ranges::iterator_t<Base>>;  // (6) (desde C++23)
```

  
Realiza aritmética de iteradores ou calcula a distância.

Sejam `_current__`, `_end__`, `_n__`, e `_missing__` os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes.

Equivalente a:

1,2) auto r = i; r += pos; return r;.

3) auto r = i; r -= pos; return r;.

4) return (i.current_ - j.current_ + i.missing_ - j.missing_) / i.n_;.

5) return /*div-ceil*/(i.end_ - i.current_, i.n_);.

6) return -(y - x);.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `chunk_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i, j  |  \-  |  os iteradores   
---|---|---
pos  |  \-  |  a posição relativa à localização atual   
  
### Valor de retorno

1,2) Um iterador incrementado.

3) Um iterador decrementado.

4) Uma distância (em número de elementos, ou seja, chunks) entre os iteradores fornecidos.

5,6) Uma distância (em número de elementos) entre o iterador e o sentinel fornecidos.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/chunk_view/iterator/operator_arith>) |  avança ou decrementa o iterador subjacente   
(função membro pública)  