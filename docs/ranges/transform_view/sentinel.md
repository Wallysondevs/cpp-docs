# std::ranges::transform_view&lt;V,F&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`transform_view::end`](<#/doc/ranges/transform_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada com const. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada com const. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Parent_` (private) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::transform_view](<#/doc/ranges/transform_view>)<V, F>>  
(tipo membro apenas para exposição*)  
`_Base_` (private) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
  
### Membros de Dados

Objeto Membro  |  Definição   
---|---
[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt; `_end__` (private) |  Um sentinel obtido de `V` (possivelmente qualificado com const)  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/transform_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
[ base](<#/doc/ranges/transform_view/sentinel/base>) |  retorna o sentinel subjacente   
(função membro pública)  
  
### Funções Não-Membro

[ operator==](<#/doc/ranges/transform_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`transform_view::begin`](<#/doc/ranges/transform_view/begin>)   
(função)  
[ operator-](<#/doc/ranges/transform_view/sentinel/operator->)(C++20) |  calcula a distância entre um sentinel e um iterator retornado de [`transform_view::begin`](<#/doc/ranges/transform_view/begin>)   
(função)