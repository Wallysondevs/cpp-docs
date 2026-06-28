# std::ranges::stride_view&lt;V&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`stride_view::begin`](<#/doc/ranges/stride_view/begin>), e de [`stride_view::end`](<#/doc/ranges/stride_view/end>) quando a view subjacente `V` é um [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Parent_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::stride_view](<#/doc/ranges/stride_view>)>  
(tipo membro apenas para exposição*)  
`_Base_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
---|---
`value_type` |  [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`random_access_range`](<#/doc/ranges/random_access_range>). Caso contrário, 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`bidirectional_range`](<#/doc/ranges/bidirectional_range>). Caso contrário, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>). Caso contrário, 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`iterator_category`  
(presente apenas se `_Base_` modelar  
[`forward_range`](<#/doc/ranges/forward_range>)) |  Seja `_C_` o tipo iterator_traits<iterator_t&lt;Base&gt;>::iterator_category. 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_C_` modelar [std::derived_from](<#/doc/concepts/derived_from>)<[std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)>. 
  * `_C_` caso contrário. 

  
  
### Membros de Dados

Objeto Membro  |  Definição   
---|---
`_current__` (privado) |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, contém um iterator para o elemento atual.  
(objeto membro apenas para exposição*)  
`_end__` (privado) |  [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, contém um sentinel para o fim.  
(objeto membro apenas para exposição*)  
`_stride__` (privado) |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;, contém o valor do stride.  
(objeto membro apenas para exposição*)  
`_missing__` (privado) |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;, geralmente contém o resultado de [ranges::advance](<#/doc/iterator/ranges/advance>)(current_, stride_, end_).  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (constructor)](<#/doc/ranges/stride_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ base](<#/doc/ranges/stride_view/iterator/base>) |  retorna um iterator para o elemento atual   
(função membro pública)  
[ operator*](<#/doc/ranges/stride_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/stride_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/stride_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
### Funções Não-Membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/stride_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/stride_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators   
(função)  
[ iter_move](<#/doc/ranges/stride_view/iterator/iter_move>)(C++23) |  converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/stride_view/iterator/iter_swap>)(C++23) |  troca elementos apontados subjacentes   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 26.7.31.3 Class template stride_view::iterator [range.stride.iterator] 

### Veja também  
  
---