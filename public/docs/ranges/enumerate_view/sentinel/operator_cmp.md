# operator==(ranges::enumerate_view::iterator, ranges::enumerate_view::sentinel ﻿)

```cpp
friend constexpr bool operator==( const /*iterator*/<Const>& x, const /*sentinel*/& y );  // (desde C++23)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y.

Seja [`_current__`](<#/doc/ranges/enumerate_view/iterator>) o iterator subjacente de x e [`_end__`](<#/doc/ranges/enumerate_view/sentinel>) o sentinel subjacente de y. Equivalente a:

`return x.current_ == y.end_;.`

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `enumerate_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/enumerate_view/iterator>) para comparar   
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/enumerate_view/sentinel>) para comparar   
  
### Valor de retorno

O resultado da comparação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   