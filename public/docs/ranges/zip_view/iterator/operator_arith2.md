# operator+,-(ranges::zip_view::iterator)

```cpp
friend constexpr /*iterator*/ operator+( const /*iterator*/& i, difference_type n )
requires /*all-random-access*/<Const, Views...>;  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+( difference_type n, const /*iterator*/& i )
requires /*all-random-access*/<Const, Views...>;  // (2) (desde C++23)
friend constexpr /*iterator*/ operator-( const /*iterator*/& i, difference_type n )
requires /*all-random-access*/<Const, Views...>;  // (3) (desde C++23)
friend constexpr difference_type operator-( const /*iterator*/& i,
const /*iterator*/& j )
requires (std::sized_sentinel_for<
ranges::iterator_t</*maybe-const*/<Const, Views>>,
ranges::iterator_t</*maybe-const*/<Const, Views>>>
and ...);  // (4) (desde C++23)
```

  
Seja `_current__` o objeto subjacente _tuple-like_ de iterators para elementos de views adaptadas.

1,2) Retorna o iterator i incrementado por n. Equivalente a: auto r = i; r += n; return r;.

3) Retorna o iterator i decrementado por n. Equivalente a: auto r = i; r -= n; return r;.

4) Seja `_DIST(k)_` igual a difference_type(std::get&lt;k&gt;(i.current_) - std::get&lt;k&gt;(j.current_)). Retorna o menor valor absoluto entre `_DIST(n)_` para todos os inteiros 0 <= n < sizeof...(Views).

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `zip_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i, j  |  \-  |  os iterators.   
---|---|---
n  |  \-  |  posição relativa à localização atual.   
  
### Valor de retorno

1,2) uma cópia de i que é avançada por n

3) uma cópia de i que é avançada por -n

4) a distância entre i e j

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/zip_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  