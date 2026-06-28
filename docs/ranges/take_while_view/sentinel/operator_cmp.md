# operator==(ranges::take_while_view::sentinel)

```cpp
friend constexpr bool operator==( const ranges::iterator_t<Base>& x,
const /*sentinel*/& y );  // (desde C++20)
```

  
Compara um take_while_view::/*sentinel*/ com um iterator em uma view `V` (possivelmente qualificada como const). O iterator é tipicamente obtido de uma chamada para [`take_while_view::begin`](<#/doc/ranges/take_while_view/begin>). 

Retorna true se x se compara como igual ao sentinel subjacente de y (isto é, [`y.base()`](<#/doc/ranges/take_while_view/sentinel/base>)), ou se o predicado retorna false quando aplicado a *x. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `take_while_view::_sentinel_ <Const>` é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Parâmetros

x  |  \-  |  iterator para comparar   
---|---|---
y  |  \-  |  sentinel para comparar   
  
### Valor de retorno

y.end_ == x || ![std::invoke](<#/doc/utility/functional/invoke>)(*y.pred_, *x), onde `_end__` denota o sentinel armazenado e `_pred__` denota o ponteiro armazenado para o predicado. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   