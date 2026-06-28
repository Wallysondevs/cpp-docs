# operator==(ranges::join_view::iterator, ranges::join_view::sentinel)

```cpp
friend constexpr bool operator==( const /*iterator*/<Const>& x, const /*sentinel*/& y );  // (desde C++20)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `join_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/join_view/iterator>) para comparar   
---|---|---
y  |  \-  |  sentinel para comparar   
  
### Valor de retorno

x.current_ == y.end_, onde `_current__` denota o iterator subjacente, `_end__` denota o sentinel subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   