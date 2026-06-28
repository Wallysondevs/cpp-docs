# std::ranges::take_while_view&lt;V,Pred&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`take_while_view::end`](<#/doc/ranges/take_while_view/end>). 

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada como `const`. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada como `const`. 

### Member types

Membro  |  Definição   
---|---
`_Base_` (private) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
  
### Data members

Membro  |  Definição   
---|---
[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt; `_end__` (private) |  Um sentinel que representa o fim da view subjacente  
(objeto membro apenas para exposição*)  
Pred* `_parent__` (private) |  Um ponteiro para o predicado  
(objeto membro apenas para exposição*)  
  
### Member functions

[ (constructor)](<#/doc/ranges/take_while_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
[ base](<#/doc/ranges/take_while_view/sentinel/base>) |  retorna o sentinel subjacente   
(função membro pública)  
  
### Non-member functions

[ operator==](<#/doc/ranges/take_while_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`take_while_view::begin`](<#/doc/ranges/take_while_view/begin>)   
(função)  