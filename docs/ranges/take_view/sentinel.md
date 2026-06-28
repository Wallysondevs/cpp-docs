# std::ranges::take_view&lt;V&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`take_view::end`](<#/doc/ranges/take_view/end>) quando a view subjacente não é um [`sized_range`](<#/doc/ranges/sized_range>). 

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada como const. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada como const. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Base_` (private) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
  
### Membros de Dados

Nome  |  Definição   
---|---
[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt; `_end__` (private) |  Um sentinel obtido de `V` (possivelmente qualificado como const)  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/take_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
[ base](<#/doc/ranges/take_view/sentinel/base>) |  retorna o sentinel subjacente   
(função membro pública)  
  
### Funções Não-Membro

[ operator==](<#/doc/ranges/take_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`take_view::begin`](<#/doc/ranges/take_view/begin>)   
(função)  