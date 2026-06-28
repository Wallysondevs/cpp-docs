# std::ranges::zip_transform_view&lt;F,Views...&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`zip_transform_view::end`](<#/doc/ranges/zip_transform_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*sentinel*/&lt;true&gt; ou /*sentinel*/&lt;false&gt; trata a view subjacente como const-qualificada ou não-const-qualificada, respectivamente. 

### Membros de dados

Objeto membro  |  Definição   
---|---
`_inner__` (private) |  Um sentinel do tipo [`_zentinel_ <Const>`](<#/doc/ranges/zip_transform_view>)  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/zip_transform_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/zip_transform_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`zip_transform_view::begin`](<#/doc/ranges/zip_transform_view/begin>)   
(função)  
[ operator-](<#/doc/ranges/zip_transform_view/sentinel/operator->)(C++23) |  calcula a distância entre um sentinel e um iterator retornado de [`zip_transform_view::begin`](<#/doc/ranges/zip_transform_view/begin>)   
(função)