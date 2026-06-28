# iter_swap(ranges::cartesian_product_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept (/* see description */)
requires (std::indirectly_swappable<
ranges::iterator_t</*maybe-const*/<Const, First>>> and ... and
std::indirectly_swappable<ranges::iterator_t</*maybe-const*/<Const, Vs>>>);  // (desde C++23)
```

  
Aplica [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>) aos iterators subjacentes armazenados. Formalmente, para cada inteiro 0 ≤ i ≤ sizeof...(Vs), executa [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(std::get<i>(x.current_), std::get<i>(y.current_)), onde [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) é a tupla subjacente de iterators.

Esta função não é visível para lookup não qualificado ou qualificado comum, e só pode ser encontrada por argument-dependent lookup quando `cartesian_product_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  iterators para os elementos a serem trocados   
  
### Valor de retorno

(nenhum) 

### Exceções

A especificação de exceção é equivalente ao AND lógico da expressão noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(std::get<i>(x.current_), std::get<i>(y.current_))) para cada inteiro 0 ≤ i ≤ sizeof...(Vs).

### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos dereferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators   
(modelo de função)