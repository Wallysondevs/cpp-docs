# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`cartesian_product_view::begin`](<#/doc/ranges/cartesian_product_view/begin>), e de [`cartesian_product_view::end`](<#/doc/ranges/cartesian_product_view/end>) quando o view subjacente `V` é um [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`. 

### Tipos de membros

Membro  |  Definição   
---|---
`_Parent_` (privado) |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::cartesian_product_view](<#/doc/ranges/cartesian_product_view>)>>  
(tipo de membro apenas para exposição*)  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
---|---
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se /*cartesian-product-is-random-access*/<Const, First, Vs...> é modelado, 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se /*cartesian-product-is-bidirectional*/<Const, First, Vs...> é modelado, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, First> modela [`forward_range`](<#/doc/ranges/forward_range>), 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), caso contrário. 

  
`value_type` |  [std::tuple](<#/doc/utility/tuple>)<[ranges::range_value_t](<#/doc/ranges/range_size_t>)</*maybe-const*/<Const, First>>,  
[ranges::range_value_t](<#/doc/ranges/range_size_t>)</*maybe-const*/<Const, Vs>>...>;  
`reference` |  [std::tuple](<#/doc/utility/tuple>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)</*maybe-const*/<Const, First>>,  
[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)</*maybe-const*/<Const, Vs>>...>;  
`difference_type` |  Um tipo _similar a inteiro com sinal_ definido pela implementação (talvez o menor de tais tipos), que é suficientemente largo para armazenar o produto dos tamanhos máximos de todos os ranges subjacentes, se tal tipo existir.   
  
### Membros de dados

Membro  |  Definição   
---|---
`_Parent*_` `_parent__` (privado) |  Um ponteiro para o objeto pai [`cartesian_product_view`](<#/doc/ranges/cartesian_product_view/cartesian_product_view>)  
(objeto membro apenas para exposição*)  
`_current__` (privado) |  Uma tupla de iterators para os elementos subjacentes atuais do tipo [std::tuple](<#/doc/utility/tuple>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)</*maybe-const*/<Const, First>>,  
[ranges::iterator_t](<#/doc/ranges/iterator_t>)</*maybe-const*/<Const, Vs>>...>  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/cartesian_product_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/cartesian_product_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/cartesian_product_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/cartesian_product_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
[__next__](<#/doc/ranges/cartesian_product_view/iterator/helpers>) |  avança o iterator  
(função membro apenas para exposição*)  
[__prev__](<#/doc/ranges/cartesian_product_view/iterator/helpers>) |  decrementa o iterator  
(função membro apenas para exposição*)  
[__distance_from__](<#/doc/ranges/cartesian_product_view/iterator/helpers>) |  retorna a distância entre dois iterators  
(função membro apenas para exposição*)  
  
### Funções não-membro

[ operator==operator<=>](<#/doc/ranges/cartesian_product_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/cartesian_product_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators   
(função)  
[ iter_move](<#/doc/ranges/cartesian_product_view/iterator/iter_move>)(C++23) |  converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/cartesian_product_view/iterator/iter_swap>)(C++23) |  troca elementos subjacentes apontados   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.32.3 Class template `cartesian_product_view::iterator` [range.cartesian.iterator] 

### Ver também  
  
---