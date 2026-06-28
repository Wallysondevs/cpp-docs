# std::ranges::adjacent_view&lt;V,N&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (apenas para exposição*)
(desde C++23)
```

  
O tipo de retorno de [`adjacent_view::end`](<#/doc/ranges/adjacent_view/end>) quando a view subjacente não é um [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada como `const`. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada como `const`. 

### Tipos membro

Tipo membro  |  Definição   
---|---
`_Base_` (private) |  const V se `Const` for true, caso contrário V.  
(tipo membro apenas para exposição*)  
  
### Membros de dados

Objeto membro  |  Definição   
---|---
`_end__` (private) |  Um sentinel obtido de V (possivelmente qualificado como const).  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/adjacent_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/adjacent_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`adjacent_view::begin`](<#/doc/ranges/adjacent_view/begin>)   
(função)  
[ operator-](<#/doc/ranges/adjacent_view/sentinel/operator->)(C++23) |  calcula a distância entre um sentinel e um iterator retornado de [`adjacent_view::begin`](<#/doc/ranges/adjacent_view/begin>)   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 26.7.25.4 Class template `adjacent_view::sentinel` [range.adjacent.sentinel] 

### Veja também  
  
---