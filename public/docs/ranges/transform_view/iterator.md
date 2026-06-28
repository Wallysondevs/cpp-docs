# std::ranges::transform_view&lt;V,F&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`transform_view::begin`](<#/doc/ranges/transform_view/begin>), e de [`transform_view::end`](<#/doc/ranges/transform_view/end>) quando a view subjacente é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Parent_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::transform_view](<#/doc/ranges/transform_view>)<V, F>>  
(tipo membro apenas para exposição*)  
`_Base_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`random_access_range`](<#/doc/ranges/random_access_range>), 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`forward_range`](<#/doc/ranges/forward_range>), 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário. 

  
`iterator_category`  
(presente apenas se `_Base_` modela  
[`forward_range`](<#/doc/ranges/forward_range>)) |  Seja `MCF` `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, F>. 

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), se [std::invoke_result_t](<#/doc/types/result_of>)<MCF&, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;> não é uma referência. 

Caso contrário, seja `_C_` [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;>::iterator_category. 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_C_` é [std::contiguous_iterator_tag](<#/doc/iterator/iterator_tags>); 
  * `_C_`, caso contrário. 

  
`value_type` |  [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<MCF&, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>>, onde `MCF` denota `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, F>  
---|---
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de Dados

Nome do Membro  |  Definição   
---|---
`_current__` (privado) |  Um iterator para (possivelmente qualificado com `const`) `V`.  
(objeto membro apenas para exposição*)  
`_parent__` (privado) |  Um ponteiro para a `transform_view` pai.  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/transform_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ base](<#/doc/ranges/transform_view/iterator/base>) |  retorna o iterator subjacente   
(função membro pública)  
[ operator*](<#/doc/ranges/transform_view/iterator/operator_star_>) |  acessa o elemento transformado   
(função membro pública)  
[ operator[]](<#/doc/ranges/transform_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/transform_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
### Funções Não-Membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/transform_view/iterator/operator_cmp>)(C++20) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/transform_view/iterator/operator_arith2>)(C++20) |  realiza aritmética de iterators   
(função)  
[ iter_move](<#/doc/ranges/transform_view/iterator/iter_move>)(C++20) |  obtém uma rvalue reference para o elemento transformado   
(função)  
  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2259R1](<https://wg21.link/P2259R1>) | C++20  | o membro `iterator_category` é sempre definido  | definido apenas se `_Base_` modela [`forward_range`](<#/doc/ranges/forward_range>)  
[LWG 3555](<https://cplusplus.github.io/LWG/issue3555>) | C++20  | a definição de `iterator_concept` ignora const  | feita para considerar   
[LWG 3798](<https://cplusplus.github.io/LWG/issue3798>) | C++20  | `iterator_category` é apenas de entrada se o resultado da transformação é uma rvalue reference  | pode ter uma categoria mais forte 