# std::ranges::join_with_view&lt;V,Pattern&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/  // (apenas para exposição*)
```

  
[ranges::join_with_view](<#/doc/ranges/join_with_view>)<V, Pattern>::`_sentinel_` é o tipo dos sentinelas retornados por [`end()`](<#/doc/ranges/join_with_view/end>) de [ranges::join_with_view](<#/doc/ranges/join_with_view>)<V, Pattern>.

Se um iterator se compara como igual a um sentinel, o iterator é um iterator past-the-end.

### Parâmetros de template

Const  |  \-  |  se o sentinel corresponde a um iterator constante   
  
### Tipos aninhados

Nome  |  Definição   
---|---
`_Parent_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::join_with_view](<#/doc/ranges/join_with_view>)<V, Pattern>>  
(tipo membro apenas para exposição*)  
`_Base_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
  
### Membros de dados

Membro  |  Descrição   
---|---
[ranges::sentinel_t](<#/doc/ranges/iterator_t>)<`_Base_` ﻿> `_end__` |  o sentinel do range pai  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/join_with_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/join_with_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`join_with_view::begin`](<#/doc/ranges/join_with_view/begin>)   
(função)  