# operator==(ranges::chunk_view::outer-iterator)

```cpp
friend constexpr bool
operator==( const /*outer-iterator*/& x, std::default_sentinel_t );  // (desde C++23)
```

  
Compara o [iterator](<#/doc/ranges/chunk_view/outer_iterator>) e o [sentinel](<#/doc/iterator/default_sentinel>). 

Seja [`_parent__`](<#/doc/ranges/chunk_view/outer_iterator>) o ponteiro subjacente para o `chunk_view` envolvente. Equivalente a: 
```
    return *x.parent_->current_ == ranges::end(x.parent_->base_) and x.parent_->remainder_ != 0;
```

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::chunk_view::_outer-iterator_` é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/chunk_view/outer_iterator>) a ser comparado   
  
### Valor de retorno

O resultado da comparação. 