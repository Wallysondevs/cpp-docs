# std::ranges::join_with_view&lt;V,Pattern&gt;::iterator

template< bool Const >  
class /*iterator*/ |  | (exposition only*)  

  
`_iterator_` de [ranges::join_with_view](<#/doc/ranges/join_with_view>)<V, Pattern> é o tipo dos iterators retornados por [`begin()`](<#/doc/ranges/join_with_view/begin>) e [`end()`](<#/doc/ranges/join_with_view/end>) de [ranges::join_with_view](<#/doc/ranges/join_with_view>)<V, Pattern>.

O estado de um iterator desta classe é gerenciado como se houvesse dois iterators aninhados:

  * um _outer iterator_ (iterator externo) para o range pai *`_[parent_](<#/doc/ranges/join_with_view/iterator>)_`*

    

  * Se `_Base_` modela [`forward_range`](<#/doc/ranges/forward_range>), ele é `_[outer_it_](<#/doc/ranges/join_with_view/iterator>)_`.
  * Caso contrário, ele é `_[parent_](<#/doc/ranges/join_with_view/iterator>)_` ﻿->`_[outer_it_](<#/doc/ranges/join_with_view>)_`.

  * um _inner iterator_ (iterator interno) `_[inner_it_](<#/doc/ranges/join_with_view/iterator>)_` para o range do padrão `_[parent_](<#/doc/ranges/join_with_view/iterator>)_` ﻿->`_[pattern_](<#/doc/ranges/join_with_view>)_` ou para um range filho do range pai

Esta classe de iterator possui o invariante de que o inner iterator é sempre desreferenciável, a menos que o outer iterator não seja desreferenciável. Quando um iterator é construído, incrementado ou decrementado, seu outer iterator pode ser ajustado para manter o invariante.

### Template parameters

Const  |  \-  |  se o iterator é um iterator constante   
  
### Nested types

#####  Exposition-only types   
  
---  
Type  |  Definition   
---|---
`_Parent_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::join_with_view](<#/doc/ranges/join_with_view>)<V, Pattern>>  
(tipo membro apenas para exposição*)  
`_Base_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo membro apenas para exposição*)  
`_InnerBase_` |  [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<`_Base_` ﻿>  
(tipo membro apenas para exposição*)  
`_PatternBase_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, Pattern>  
(tipo membro apenas para exposição*)  
`_OuterIter_` |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_Base_` ﻿>  
(tipo membro apenas para exposição*)  
`_InnerIter_` |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_InnerBase_` ﻿>  
(tipo membro apenas para exposição*)  
`_PatternIter_` |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)<`_PatternBase_` ﻿>  
(tipo membro apenas para exposição*)  
  
#####  Iterator property types   
  
Type  |  Definition   
---|---
`iterator_concept` |  uma [tag de iterator](<#/doc/iterator/iterator_tags>), [veja abaixo](<#/doc/ranges/join_with_view/iterator>)  
`iterator_category`  
(presente condicionalmente) |  uma tag de iterator, [veja abaixo](<#/doc/ranges/join_with_view/iterator>)  
---|---
`value_type` |  [std::common_type_t](<#/doc/types/common_type>)<[ranges::range_value_t](<#/doc/ranges/range_size_t>)<`_InnerBase_` ﻿>,  
` `[ranges::range_value_t](<#/doc/ranges/range_size_t>)<`_PatternBase_` ﻿>>  
`difference_type` |  [std::common_type_t](<#/doc/types/common_type>)<[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<`_Base_` ﻿>,  
` `[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<`_InnerBase_` ﻿>,  
` `[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<`_PatternBase_` ﻿>>  
  
#### Determining the iterator concept

`iterator_concept` é definido da seguinte forma:

  * Se todas as condições a seguir forem satisfeitas, `iterator_concept` denota [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>):
    * [std::is_reference_v](<#/doc/types/is_reference>)<`_InnerBase_` ﻿> é verdadeiro.
    * `_Base_` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>).
    * `_InnerBase_` e `_PatternBase_` cada um modela [`common_range`](<#/doc/ranges/common_range>).
  * Caso contrário, se todas as condições a seguir forem satisfeitas, `iterator_concept` denota [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>):
    * [std::is_reference_v](<#/doc/types/is_reference>)<`_InnerBase_` ﻿> é verdadeiro.
    * `_Base_` e `_InnerBase_` cada um modela [`forward_range`](<#/doc/ranges/forward_range>).
  * Caso contrário, `iterator_concept` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>).

#### Determining the iterator category

Dados os seguintes tipos:

  * Seja `OuterC` [std::iterator_traits](<#/doc/iterator/iterator_traits>)<`_OuterIter_` ﻿>::iterator_category.
  * Seja `InnerC` [std::iterator_traits](<#/doc/iterator/iterator_traits>)<`_InnerIter_` ﻿>::iterator_category.
  * Seja `PatternC` [std::iterator_traits](<#/doc/iterator/iterator_traits>)<`_PatternIter_` ﻿>::iterator_category.

`iterator_category` é definido se e somente se [std::is_reference_v](<#/doc/types/is_reference>)<`_InnerBase_` ﻿> é verdadeiro, e `_Base_` e `_InnerBase_` cada um modela [`forward_range`](<#/doc/ranges/forward_range>). Neste caso, é definido da seguinte forma:

  * Se [std::is_reference_v](<#/doc/types/is_reference>)<[std::common_reference_t](<#/doc/types/common_reference>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<`_InnerBase_` ﻿>,  
` `[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<`_PatternBase_` ﻿>> é falso, `iterator_category` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, se todas as condições a seguir forem satisfeitas, `iterator_category` denota [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>):
    * `OuterC`, `InnerC` e `PatternC` cada um modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>)>.
    * `_InnerBase_` e `_PatternBase_` cada um modela [`common_range`](<#/doc/ranges/common_range>).
  * Caso contrário, se `OuterC`, `InnerC` e `PatternC` cada um modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)>, `iterator_category` denota [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, `iterator_category` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>).

### Data members

Member  |  Description   
---|---
`_Parent_` ﻿* `_parent__` |  o ponteiro para o [`join_with_view`](<#/doc/ranges/join_with_view>) pai  
(objeto membro apenas para exposição*)  
`_OuterIter_` `_outer_it__`   
(presente apenas se `_Base_` modela [`forward_range`](<#/doc/ranges/forward_range>)) |  o outer iterator  
(objeto membro apenas para exposição*)  
[std::variant](<#/doc/utility/variant>)<`_PatternIter_` ﻿,` ` _InnerIter_` ﻿> `_inner_it__` |  o inner iterator  
(objeto membro apenas para exposição*)  
  
### Member functions

[ (construtor)](<#/doc/ranges/join_with_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/join_with_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)](<#/doc/ranges/join_with_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
### Non-member functions

[ operator==](<#/doc/ranges/join_with_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ iter_move](<#/doc/ranges/join_with_view/iterator/iter_move>)(C++23) |  converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/join_with_view/iterator/iter_swap>)(C++23) |  troca os objetos apontados por dois iterators subjacentes   
(função)