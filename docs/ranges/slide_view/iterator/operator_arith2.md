# operator+,-(ranges::slide_view::iterator)

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

  
Realiza aritmética de iteradores.

1,2) Equivalente a: auto r = i; r += n; return r;.

3) Equivalente a: auto r = i; r -= n; return r;.

4) Sejam [`_current__`](<#/doc/ranges/slide_view/iterator>) e [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) os iteradores subjacentes para o início e fim da janela deslizante, respectivamente. Equivalente a: 

  * return x.last_ele_ - y.last_ele_;, se `_last_ele__` estiver presente. Caso contrário, 
  * return x.current_ - y.current_;.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `slide_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i, j  |  \-  |  os iteradores   
---|---|---
n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,2) Um iterador incrementado.

3) Um iterador decrementado.

4) Uma distância entre os iteradores fornecidos.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/slide_view/iterator/operator_arith>) |  avança ou decrementa os iteradores subjacentes   
(função membro pública)  