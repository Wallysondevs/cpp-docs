# std::ranges::join_view&lt;V&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`join_view::begin`](<#/doc/ranges/join_view/begin>), e de [`join_view::end`](<#/doc/ranges/join_view/end>) quando tanto o range externo `V` quanto o range interno [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; satisfazem [`common_range`](<#/doc/ranges/common_range>) e o `join_view` pai é um [`forward_range`](<#/doc/ranges/forward_range>). 

Se `V` não é uma [simple view](<#/doc/ranges>) (por exemplo, se [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const V&gt; é inválido ou diferente de [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;), `Const` é true para iterators retornados de sobrecargas const, e false caso contrário. Se `V` é uma simple view, `Const` é true se e somente se [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é uma referência. 

### Tipos Membro

Membro  |  Definição   
---|---
`_Parent_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::join_view](<#/doc/ranges/join_view>)&lt;V&gt;>  
(tipo membro apenas para exposição*)  
`_Base_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
`_OuterIter_` |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;  
(tipo membro apenas para exposição*)  
`_InnerIter_` |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>  
(tipo membro apenas para exposição*)  
`iterator_concept` | 

  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt; é um tipo de referência, e `_Base_` e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt; cada um modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>);  

  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt; é um tipo de referência, e `_Base_` e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt; cada um modela [`forward_range`](<#/doc/ranges/forward_range>);  

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário. 

  
`iterator_category`  
(presente condicionalmente) |  Definido apenas se `iterator::iterator_concept` (veja acima) denota [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>).  
Seja `_OUTERC_` [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;>::iterator_category, e seja `_INNERC_` [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>>::  
iterator_category.  

  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_OUTERC_` e `_INNERC_` cada um modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>)>;  

  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_OUTERC_` e `_INNERC_` cada um modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)>;  

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário. 

  
`value_type` |  [ranges::range_value_t](<#/doc/ranges/range_size_t>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>  
---|---
`difference_type` |  [std::common_type_t](<#/doc/types/common_type>)<[ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;,  
[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>>  
  
### Membros de Dados

Membro  |  Definição   
---|---
`_OuterIter_` `_outer__` (privado) |  Um iterator externo  
(objeto membro apenas para exposição*)  
`_InnerIter_` `_inner__` (privado) |  Um iterator interno  
(objeto membro apenas para exposição*)  
`_Parent*_` `_parent__` (privado) |  Um ponteiro para o objeto pai  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/join_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*operator->](<#/doc/ranges/join_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)](<#/doc/ranges/join_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  
[_satisfy_](<#/doc/ranges/join_view/iterator/satisfy>) |  pula ranges internos vazios  
(função membro apenas para exposição*)  
  
### Funções Não-Membro

[ operator==](<#/doc/ranges/join_view/iterator/operator_cmp>)(C++20) |  compara os iterators subjacentes   
(função)  
[ iter_move](<#/doc/ranges/join_view/iterator/iter_move>)(C++20) |  converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/join_view/iterator/iter_swap>)(C++20) |  troca os objetos apontados por dois iterators subjacentes   
(função)