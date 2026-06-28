# std::ranges::zip_transform_view&lt;F,Views...&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/;  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de iterator de uma `zip_transform_view` possivelmente qualificada com `const`, retornado por [`zip_transform_view::begin`](<#/doc/ranges/zip_transform_view/begin>) e em certos casos por [`zip_transform_view::end`](<#/doc/ranges/zip_transform_view/end>). 

O tipo /*iterator*/&lt;true&gt; ou /*iterator*/&lt;false&gt; trata as views subjacentes como qualificadas com `const` ou não qualificadas com `const`, respectivamente. 

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`_Parent_` (private) |  [`zip_transform_view`](<#/doc/ranges/zip_transform_view>) se `Const` for `false`, `const zip_transform_view` caso contrário.  
(tipo de membro apenas para exposição*)  
`_Base_` (private) |  [`_InnerView_`](<#/doc/ranges/zip_transform_view>) se `Const` for `false`, `const InnerView` caso contrário.  
(tipo de membro apenas para exposição*)  
`iterator_category`  
(presente condicionalmente) |  Seja /*maybe-const*/<Const, F>& denotando `const F&` se `Const` for `true`, `F&` caso contrário.  
Seja /*maybe-const*/<Const, Views> denotando `const Views` se `Const` for `true`, `Views` caso contrário.  
Seja /*POT*/ denotando o pacote de tipos [std::iterator_traits](<#/doc/iterator/iterator_traits>)<std::iterator_t<  
/*maybe-const*/<Const, Views>>>::iterator_category...  
Se /*Base*/ modelar [`forward_range`](<#/doc/ranges/forward_range>), então `iterator_category` denota: 

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), se [std::invoke_result_t](<#/doc/types/result_of>)</*maybe-const*/<Const, F>&,  
[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)</*maybe-const*/<Const, Views>>...>

     não for uma referência. 

  * Caso contrário, 

    

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se  

     ([std::derived_from](<#/doc/concepts/derived_from>)</*POT*/, [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)> && ...) for `true`.  

  * Caso contrário, [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se  

     ([std::derived_from](<#/doc/concepts/derived_from>)</*POT*/, [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>)> && ...) for `true`.  

  * Caso contrário, [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se  

     ([std::derived_from](<#/doc/concepts/derived_from>)</*POT*/, [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)> && ...) for `true`.  

  * Caso contrário, [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

Não presente se /*Base*/ não modelar [`forward_range`](<#/doc/ranges/forward_range>).   
`iterator_concept` |  /*ziperator*/&lt;Const&gt;::iterator_concept  
---|---
`value_type` |  Seja /*RREF*/ [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Views&gt;...,  
e /*CRREF*/ [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;const Views&gt;.... Então: 

  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F&, /*RREF*/>> se `Const` for `false`, 
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)&lt;const F&, /*CRREF*/&gt;> caso contrário. 

  
`difference_type` |  range::range_difference_t</*Base*/>  
  
### Membros de dados

Objeto membro  |  Definição   
---|---
`_parent__` (private) |  Um ponteiro [`_Parent*_`](<#/doc/ranges/zip_transform_view/iterator>) para o objeto pai  
(objeto membro apenas para exposição*)  
`_inner__` (private) |  Um iterator do tipo [`_ziperator <Const>_`](<#/doc/ranges/zip_transform_view>).  
(tipo de membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/zip_transform_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/zip_transform_view/iterator/operator_star_>) |  obtém o resultado da aplicação do objeto invocável aos elementos subjacentes apontados   
(função membro pública)  
[ operator[]](<#/doc/ranges/zip_transform_view/iterator/operator_at>) |  obtém o resultado da aplicação do objeto invocável aos elementos subjacentes em um dado offset   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/zip_transform_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
### Funções não-membro

[ operator==operator<=>](<#/doc/ranges/zip_transform_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/zip_transform_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators nos iterators subjacentes   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   