# std::ranges::chunk_by_view&lt;V,Pred&gt;::iterator

```cpp
class /*iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`chunk_by_view::begin`](<#/doc/ranges/chunk_by_view/begin>), e de [`chunk_by_view::end`](<#/doc/ranges/chunk_by_view/end>) quando a view subjacente `V` é um [`common_range`](<#/doc/ranges/common_range>). 

### Tipos de membros

Tipo membro  |  Definição   
---|---
`value_type` |  [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
`iterator_concept` | 

  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se `V` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), caso contrário 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
  
### Membros de dados

Nome do membro  |  Definição   
---|---
`_parent__` (private) |  Um ponteiro para o `chunk_by_view` pai.  
(objeto membro apenas para exposição*)  
`_current__` (private) |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;, um iterator para o início do chunk atual.  
(objeto membro apenas para exposição*)  
`_next__` (private) |  [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;, um iterator para o início do próximo chunk, se presente.  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/chunk_by_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/chunk_by_view/iterator/operator_star_>) |  acessa o elemento   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)](<#/doc/ranges/chunk_by_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  
  
### Funções não-membro

[ operator==](<#/doc/ranges/chunk_by_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.30.3 Classe `chunk_by_view​::​iterator` [range.chunk.by.iter] 

### Ver também  
  
---