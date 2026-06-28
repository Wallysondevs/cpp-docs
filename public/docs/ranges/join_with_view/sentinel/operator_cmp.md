# operator==(ranges::join_with_view::iterator, ranges::join_with_view::sentinel)

```cpp
friend constexpr bool operator==( const /*iterator*/<Const>& x, const /*sentinel*/& y );  // (desde C++23)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y. A comparação retorna true se o iterator externo subjacente armazenado em x for o iterator de fim.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `join_with_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/join_with_view/iterator>) para comparar   
---|---|---
y  |  \-  |  sentinel para comparar   
  
### Valor de retorno

x.outer_it_ == y.end_, onde `_outer_it__` denota o iterator externo subjacente, `_end__` denota o sentinel subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   