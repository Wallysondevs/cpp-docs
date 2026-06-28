# iter_move(ranges::chunk_view::inner-iterator)

```cpp
friend constexpr auto iter_move( const /*inner-iterator*/& i ) noexcept(/* see below */)  // (desde C++23)
```

  
Retorna o resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator interno armazenado. 

Seja [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) o ponteiro subjacente para a `chunk_view` envolvente, e *i.parent_->current_ denota o iterator subjacente em cache do tipo [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;. 

Equivalente a: return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(*i.parent_->current_);. 

Esta função não é visível para [unqualified lookup](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>) ordinários, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `chunk_view::_inner-iterator_` é uma classe associada dos argumentos. 

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

O resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator armazenado do tipo [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(*i.parent_->current_)))

### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  