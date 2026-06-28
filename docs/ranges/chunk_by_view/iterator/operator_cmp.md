# operator==(ranges::chunk_by_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y );  // (1) (desde C++23)
friend constexpr bool operator==( const /*iterator*/& x, std::default_sentinel_t );  // (2) (desde C++23)
```

  
Compara os iterators subjacentes.

1) Equivalente a return x.[`_current__`](<#/doc/ranges/chunk_by_view/iterator>)` `== y.[`_current__`](<#/doc/ranges/chunk_by_view/iterator>) ;.

2) Equivalente a return x.[`_current__`](<#/doc/ranges/chunk_by_view/iterator>)` `== x.[`_next__`](<#/doc/ranges/chunk_by_view/iterator>) ;.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::chunk_by_view::_iterator_` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x, y  |  \-  |  [iterators](<#/doc/ranges/chunk_by_view/iterator>) para comparar   
  
### Valor de retorno

O resultado da comparação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   