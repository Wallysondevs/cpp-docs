# std::ranges::enumerate_view&lt;V&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`enumerate_view::begin`](<#/doc/ranges/enumerate_view/begin>), e de [`enumerate_view::end`](<#/doc/ranges/enumerate_view/end>) quando a view subjacente `V` é um [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com const. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com const. 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`_Base_` (private) |  const V se `Const` for true, caso contrário `V`.  
(tipo membro apenas para exposição*)  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
---|---
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`random_access_range`](<#/doc/ranges/random_access_range>). Caso contrário, 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>). Caso contrário, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`forward_range`](<#/doc/ranges/forward_range>). Caso contrário, 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
---|---
`value_type` |  [std::tuple](<#/doc/utility/tuple>)<difference_type, [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;>  
`_reference-type_` (private) |  [std::tuple](<#/doc/utility/tuple>)<difference_type, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>  
(tipo membro apenas para exposição*)  
  
### Membros de Dados

Nome do Membro  |  Definição   
---|---
`_current__` (private) |  Um iterator para o elemento atual do tipo [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;  
(objeto membro apenas para exposição*)  
`_pos__` (private) |  Um índice atual do tipo `difference_type`  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/enumerate_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ base](<#/doc/ranges/enumerate_view/iterator/base>) |  retorna um iterator para o elemento atual   
(função membro pública)  
[ index](<#/doc/ranges/enumerate_view/iterator/index>) |  retorna o índice atual   
(função membro pública)  
[ operator*](<#/doc/ranges/enumerate_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/enumerate_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/enumerate_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
### Funções Não-Membro

[ operator==operator<=>](<#/doc/ranges/enumerate_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/enumerate_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterator   
(função)  
[ iter_move](<#/doc/ranges/enumerate_view/iterator/iter_move>)(C++23) |  converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.23.3 Class template `enumerate_view::iterator` [range.enumerate.iterator] 
