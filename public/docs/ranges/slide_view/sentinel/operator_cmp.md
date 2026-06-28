# operator==(ranges::slide_view::iterator, ranges::slide_view::sentinel ﻿)

```cpp
friend constexpr bool operator==( const /*iterator*/<Const>& x, const /*sentinel*/& y );  // (desde C++23)
```

  
Compara o iterator subjacente de x com o sentinel subjacente de y. 

Seja [`_last_ele__`](<#/doc/ranges/slide_view/iterator>) o iterator subjacente de x e [`_end__`](<#/doc/ranges/slide_view/sentinel>) o sentinel subjacente de y. 

Equivalente a: return x.last_ele_ == y.end_;. 

Esta função não é visível para pesquisa não qualificada comum ou pesquisa qualificada, e só pode ser encontrada por pesquisa dependente de argumento (ADL) quando `slide_view::_sentinel_` é uma classe associada dos argumentos. 

O operador `!=` é sintetizado a partir de `operator==`. 

### Parâmetros

x  |  \-  |  um [iterator](<#/doc/ranges/slide_view/iterator>) para comparar   
---|---|---
y  |  \-  |  um [sentinel](<#/doc/ranges/slide_view/sentinel>) para comparar   
  
### Valor de retorno

O resultado da comparação. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   