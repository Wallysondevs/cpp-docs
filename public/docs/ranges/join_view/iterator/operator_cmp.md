# operator==(ranges::join_view::iterator, ranges::join_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires
/*ref-is-glvalue*/ &&
std::equality_comparable<ranges::iterator_t<Base>> &&
std::equality_comparable<ranges::iterator_t<ranges::range_reference_t<Base>>>;  // (desde C++20)
```

  
Compara os iterators subjacentes. 

Equivalente a: return (x.outer_ == y.outer_) and (x.inner_ == y.inner_);, onde [`_outer__`](<#/doc/ranges/join_view/iterator>) e [`_inner__`](<#/doc/ranges/join_view/iterator>) são os iterators subjacentes. A constante /*ref-is-glvalue*/ na cláusula requires é igual a [std::is_reference_v](<#/doc/types/is_reference>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::join_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  iterators para comparar   
  
### Valor de retorno

Resultado da comparação. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator==](<#/doc/ranges/join_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`join_view::begin`](<#/doc/ranges/join_view/begin>)   
(função)  