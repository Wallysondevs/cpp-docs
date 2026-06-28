# std::ranges::slide_view&lt;V&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`slide_view::begin`](<#/doc/ranges/slide_view/begin>), e de [`slide_view::end`](<#/doc/ranges/slide_view/end>) quando a view subjacente `V` é uma [`common_range`](<#/doc/ranges/common_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`. 

### Tipos membro

Tipo membro  |  Definição   
---|---
`_Base_` (private) |  const V se `Const` for true, caso contrário V.  
(tipo membro apenas para exposição*)  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
---|---
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`random_access_range`](<#/doc/ranges/random_access_range>). Caso contrário, 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>). Caso contrário, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`value_type` |  decltype([views::counted](<#/doc/ranges/counted_view>)(current_, n_))  
---|---
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de dados

Nome do membro  |  Definição   
---|---
`_current__` (private) |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, contém um iterator para o primeiro elemento subjacente da janela atual em [`slide_view`](<#/doc/ranges/slide_view>)  
(objeto membro apenas para exposição*)  
`_last_ele__` (private)   
(presente condicionalmente) |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, contém um iterator para o elemento subjacente um-depois-do-final da janela atual em [`slide_view`](<#/doc/ranges/slide_view>). Presente apenas se [`_Base_`](<#/doc/ranges/slide_view/iterator>) modela /*slide-caches-first*/.  
(objeto membro apenas para exposição*)  
`_n__` (private) |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;, contém a largura da janela de [`slide_view`](<#/doc/ranges/slide_view>).  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/slide_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/slide_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/slide_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/slide_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  
  
### Funções não-membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/slide_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/slide_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 26.7.29.3 Class template `slide_view::iterator` [range.slide.iterator] 

### Veja também  
  
---