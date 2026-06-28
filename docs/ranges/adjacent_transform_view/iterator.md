# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`adjacent_transform_view::begin`](<#/doc/ranges/adjacent_transform_view/begin>), e de [`adjacent_transform_view::end`](<#/doc/ranges/adjacent_transform_view/end>) quando a view subjacente `V` é um [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Parent_` (privado) |  const [ranges::adjacent_transform_view](<#/doc/ranges/adjacent_transform_view>), se `Const` for true. Caso contrário, [ranges::adjacent_transform_view](<#/doc/ranges/adjacent_transform_view>).  
(tipo membro apenas para exposição*)  
`_Base_` (privado) |  const V, se `Const` for true. Caso contrário, V.  
(tipo membro apenas para exposição*)  
`iterator_category` | 

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), se 

     [std::invoke_result_t](<#/doc/types/result_of>)</*maybe-const*/<Const, F>&,  
/*REPEAT*/([ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;, N)...>
     não for uma referência. Caso contrário, 

  * seja `_C_` o tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)<iterator_t&lt;Base&gt;>::iterator_category. 
    * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se   
[std::derived_from](<#/doc/concepts/derived_from>)<C, [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)> for true. Caso contrário, 
    * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se   
[std::derived_from](<#/doc/concepts/derived_from>)<C, [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>)> for true. Caso contrário, 
    * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se   
[std::derived_from](<#/doc/concepts/derived_from>)<C, [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)> for true. Caso contrário, 
    * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`iterator_concept` |  typename /*inner-iterator*/&lt;Const&gt;::iterator_concept;.   
---|---
`value_type` |  [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)</*maybe-const*/<Const, F>&,  
/*REPEAT*/([ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;, N)...>>;  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de Dados

Nome do Membro  |  Definição   
---|---
`_parent__` (privado) |  Um ponteiro do tipo [`_Parent*_`](<#/doc/ranges/adjacent_transform_view/iterator>).  
(objeto membro apenas para exposição*)  
`_inner__` (privado) |  Um iterator do tipo [`_inner_iterator_`](<#/doc/ranges/adjacent_transform_view>).  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/adjacent_transform_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/adjacent_transform_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/adjacent_transform_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/adjacent_transform_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  
  
### Funções Não-Membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/adjacent_transform_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/adjacent_transform_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.27.3 Class template adjacent_transform_view::_iterator_ [range.adjacent_transform.iterator] 

### Veja também  
  
---