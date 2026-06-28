# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (apenas para exposição*)
```

  
O tipo de retorno de [`adjacent_transform_view::end`](<#/doc/ranges/adjacent_transform_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada com `const`. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada com `const`. 

### Membros de dados

Objeto membro  |  Definição   
---|---
`_inner__` (privado) |  Um sentinel do tipo [`_inner-sentinel_`](<#/doc/ranges/adjacent_transform_view>).  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/adjacent_transform_view/sentinel/sentinel>) |  constrói um sentinel   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/adjacent_transform_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`adjacent_transform_view::begin`](<#/doc/ranges/adjacent_transform_view/begin>)   
(função)  
[ operator-](<#/doc/ranges/adjacent_transform_view/sentinel/operator->)(C++23) |  calcula a distância entre um sentinel e um iterator retornado de [`adjacent_transform_view::begin`](<#/doc/ranges/adjacent_transform_view/begin>)   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.27.4 Class template `adjacent_transform_view::sentinel` [range.adjacent_transform.sentinel] 

### Veja também  
  
---