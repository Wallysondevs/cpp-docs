# iter_swap(ranges::chunk_view::inner-iterator)

```cpp
friend constexpr void iter_swap( const /*inner-iterator*/& x,  
const /*inner-iterator*/& y )  
noexcept(noexcept(ranges::iter_swap(*x.parent_->current_,  
*y.parent_->current_)))  
requires std::indirectly_swappable<ranges::iterator_t<V>>;
```
| | | (desde C++23)

Aplica [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>) aos iterators subjacentes em cache.

Seja [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) o ponteiro subjacente para o `chunk_view` envolvente, e *i.parent_->current_ denota o iterator subjacente em cache do tipo [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;.

Equivalente a: [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(*x.parent_->current_, *y.parent_->current_);.

Esta função não é visível para `lookup` comum [não qualificado](<#/doc/language/unqualified_lookup>) ou [qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `chunk_view::_inner-iterator_` é uma classe associada dos argumentos.

### Parâmetros

- **x, y** — iterators para os elementos a serem trocados

### Valor de retorno

(nenhum)

### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis
(objeto de ponto de customização)
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators
(modelo de função)