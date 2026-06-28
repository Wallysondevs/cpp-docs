# iter_swap(ranges::join_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept( /*see below*/ )
requires std::indirectly_swappable<InnerIter>;  // (desde C++20)
```

  
Troca os objetos apontados por dois iterators subjacentes (denotados como [`_inner__`](<#/doc/ranges/join_view/iterator>)). 

Equivalente a: [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.inner_, y.inner_);. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `join_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  iterators   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.inner_, y.inner_)))

### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators   
(template de função)