# std::ranges::chunk_view&lt;V&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`chunk_view::begin`](<#/doc/ranges/chunk_view/begin>), e de [`chunk_view::end`](<#/doc/ranges/chunk_view/end>) quando a view subjacente `V` é um(a) [`common_range`](<#/doc/ranges/common_range>). 

Presente apenas se `V` modela [`forward_range`](<#/doc/ranges/forward_range>). 

O tipo /*iterator*/&lt;true&gt; é retornado pelas sobrecargas qualificadas com `const`. O tipo /*iterator*/&lt;false&gt; é retornado pelas sobrecargas não qualificadas com `const`. 

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`_Parent_` (private) |  const chunk_view se `Const` for true, caso contrário chunk_view.  
(tipo de membro apenas para exposição*)  
`_Base_` (private) |  const V se `Const` for true, caso contrário V.  
(tipo de membro apenas para exposição*)  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
---|---
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`random_access_range`](<#/doc/ranges/random_access_range>). Caso contrário, 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>). Caso contrário, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`value_type` |  decltype([views::take](<#/doc/ranges/take_view>)([ranges::subrange](<#/doc/ranges/subrange>)(current_, end_), n_));.   
---|---
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de dados

Nome do membro  |  Definição   
---|---
`_current__` (private) |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, contém um iterator para o primeiro elemento do chunk atual na sequência subjacente (ou seja, o início de um chunk).  
(objeto membro apenas para exposição*)  
`_end__` (private) |  [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;, contém um sentinel para o fim da sequência subjacente.  
(objeto membro apenas para exposição*)  
`_n__` (private) |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;, contém o número inicial de elementos no chunk (o último chunk pode ser menor).  
(objeto membro apenas para exposição*)  
`_missing__` (private) |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;, geralmente é igual a [ranges::advance](<#/doc/iterator/ranges/advance>)(current_, n_, end_);.  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/chunk_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ base](<#/doc/ranges/chunk_view/iterator/base>) |  retorna um iterator para o elemento atual   
(função membro pública)  
[ operator*](<#/doc/ranges/chunk_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator[]](<#/doc/ranges/chunk_view/iterator/operator_at>) |  acessa um elemento por índice   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/chunk_view/iterator/operator_arith>) |  avança ou decrementa o iterator subjacente   
(função membro pública)  
  
### Funções não-membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/chunk_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/chunk_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 26.7.28.7 Class template `chunk_view::iterator` for forward ranges [range.chunk.fwd.iter] 

### Ver também  
  
---