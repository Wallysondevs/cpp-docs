# std::ranges::zip_view&lt;Views...&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`zip_view::end`](<#/doc/ranges/zip_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*sentinel*/&lt;true&gt; ou /*sentinel*/&lt;false&gt; trata a view subjacente como qualificada com `const` ou não qualificada com `const`, respectivamente. 

### Membros de dados

Nome do membro  |  Definição   
---|---
`_end__` (privado) | 

  * [std::tuple](<#/doc/utility/tuple>)<[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Views&gt;...> se Const for false, ou 
  * [std::tuple](<#/doc/utility/tuple>)<[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;const Views&gt;...> se Const for true.  
(objeto membro apenas para exposição*)

  
  
### Funções membro

[ (construtor)](<#/doc/ranges/zip_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/zip_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`zip_view::begin`](<#/doc/ranges/zip_view/begin>)   
(função)  
[ operator-](<#/doc/ranges/zip_view/sentinel/operator->)(C++23) |  calcula a distância entre um sentinel e um iterator retornado de [`zip_view::begin`](<#/doc/ranges/zip_view/begin>)   
(função)