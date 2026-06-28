# iter_swap(ranges::stride_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept( /*see below*/ )
requires std::indirectly_swappable<ranges::iterator_t<Base>>;  // (desde C++23)
```

  
Troca os objetos apontados por dois iterators subjacentes (cada um denotado como [`_current__`](<#/doc/ranges/stride_view/iterator>)).

Equivalente a [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.current_, y.current_);.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `stride_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  [iterators](<#/doc/ranges/stride_view/iterator>)  
  
### Valor de retorno

(nenhum)

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.current_, y.current_)))

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators   
(modelo de função)