# std::ranges::zip_view&lt;Views...&gt;::iterator

```cpp
template< bool Const >
class /*iterator*/;  // (apenas para exposição*)
```

  
O tipo de iterator de uma `zip_view` possivelmente qualificada com const, retornado por [`zip_view::begin`](<#/doc/ranges/zip_view/begin>) e em certos casos por [`zip_view::end`](<#/doc/ranges/zip_view/end>). 

O tipo /*iterator*/&lt;true&gt; ou /*iterator*/&lt;false&gt; trata as views subjacentes como qualificadas com const ou não qualificadas com const, respectivamente. 

### Tipos de membros

Tipo de membro  |  Definição   
---|---
`iterator_concept` | 

  * [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>) se `_[all-random-access](<#/doc/ranges>)_` <Const, Views...> for verdadeiro, caso contrário 
  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>) se `_[all-bidirectional](<#/doc/ranges>)_` <Const, Views...> for verdadeiro, caso contrário 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>) se `_[all-forward](<#/doc/ranges>)_` <Const, Views...> for verdadeiro, caso contrário 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>). 

  
`iterator_category`  
(presente condicionalmente) | 

  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) se `_[all-forward](<#/doc/ranges>)_` <Const, Views...> for verdadeiro, 
  * não definido caso contrário. 

  
`value_type` | 

  * [std::tuple](<#/doc/utility/tuple>)<[ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;Views&gt;...> se `Const` for false, 
  * [std::tuple](<#/doc/utility/tuple>)<[ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;const Views&gt;...> caso contrário. 

  
`difference_type` | 

  * [std::common_type_t](<#/doc/types/common_type>)<[ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Views&gt;...> se `Const` for false, 
  * [std::common_type_t](<#/doc/types/common_type>)<[ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;const Views&gt;...> caso contrário. 

  
  
### Membros de dados

Nome do membro  |  Definição   
---|---
`_current__` (private) | 

  * [std::tuple](<#/doc/utility/tuple>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Views&gt;...> se `Const` for false, ou 
  * [std::tuple](<#/doc/utility/tuple>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const Views&gt;...> caso contrário.  
(objeto membro apenas para exposição*)

  
  
### Funções membro

[ (construtor)](<#/doc/ranges/zip_view/iterator/iterator>) |  constrói um iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/zip_view/iterator/operator_star_>) |  obtém um valor tipo tupla que consiste nos elementos subjacentes apontados   
(função membro pública)  
[ operator[]](<#/doc/ranges/zip_view/iterator/operator_at>) |  obtém um valor tipo tupla que consiste nos elementos subjacentes em um dado offset   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)operator+=operator-=](<#/doc/ranges/zip_view/iterator/operator_arith>) |  avança ou decrementa os iterators subjacentes   
(função membro pública)  
  
### Funções não-membro

[ operator==operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/ranges/zip_view/iterator/operator_cmp>)(C++23) |  compara os iterators subjacentes   
(função)  
[ operator+operator-](<#/doc/ranges/zip_view/iterator/operator_arith2>)(C++23) |  realiza aritmética de iterators nos iterators subjacentes   
(função)  
[ iter_move](<#/doc/ranges/zip_view/iterator/iter_move>)(C++23) |  obtém um valor tipo tupla que denota os elementos subjacentes apontados a serem movidos   
(função)  
[ iter_swap](<#/doc/ranges/zip_view/iterator/iter_swap>)(C++23) |  troca os elementos subjacentes apontados   
(função)  
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   