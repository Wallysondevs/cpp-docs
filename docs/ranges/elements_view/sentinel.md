# std::ranges::elements_view&lt;V,N&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (apenas para exposição*)
```

  
O tipo de retorno de [`elements_view::end`](<#/doc/ranges/elements_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>).

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada com const. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada com const.

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`_Base_` (private) |  const V se `Const` for true, caso contrário V.  
(tipo de membro apenas para exposição*)  
  
### Membros de dados

Objeto membro  |  Definição   
---|---
`_end__` (private) |  Um sentinel obtido de V (possivelmente qualificado com const).  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/elements_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
[ base](<#/doc/ranges/elements_view/sentinel/base>) |  retorna o sentinel subjacente   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/elements_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`elements_view::begin`](<#/doc/ranges/elements_view/begin>)   
(função)  
[ operator-](<#/doc/ranges/elements_view/sentinel/operator->)(C++20) |  calcula a distância entre um sentinel e um iterator retornado de [`elements_view::begin`](<#/doc/ranges/elements_view/begin>)   
(função)