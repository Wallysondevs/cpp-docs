# operator==(ranges::chunk_view::inner-iterator)

```cpp
friend constexpr bool operator==( const /*inner-iterator*/& x,
std::default_sentinel_t );  // (desde C++23)
```

  
Compara o [iterator](<#/doc/ranges/chunk_view/inner_iterator>) e o [sentinel](<#/doc/iterator/default_sentinel>). 

Seja [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) o ponteiro subjacente para o `chunk_view` envolvente. 

Equivalente a: returns x.parent_->remainder_ == 0;

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::chunk_view::_inner-iterator_` é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/chunk_view/inner_iterator>) a ser comparado   
  
### Valor de retorno

O resultado da comparação. 