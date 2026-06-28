# operator==(ranges::transform_view::sentinel)

```cpp
friend constexpr bool operator==( const /*iterator*/<Const>& x, const /*sentinel*/& y );  // (desde C++20)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y.

Esta função não é visível para pesquisa comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `transform_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/transform_view/iterator>) para comparar   
---|---|---
y  |  \-  |  sentinel para comparar   
  
### Valor de retorno

x.current_ == y.end_, onde `_current__` denota o iterator subjacente, `_end__` denota o sentinel subjacente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   