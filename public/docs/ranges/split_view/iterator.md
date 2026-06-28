# std::ranges::split_view&lt;V,Pattern&gt;::iterator

```cpp
class /*iterator*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`split_view::begin`](<#/doc/ranges/split_view>). Este é um [`forward_iterator`](<#/doc/iterator/forward_iterator>), portanto, espera-se que `V` modele pelo menos [`forward_range`](<#/doc/ranges/forward_range>). 

### Tipos de membro

Tipo de membro  |  Definição   
---|---
`iterator_concept` |  [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)  
`iterator_category` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
`value_type` |  [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;  
  
### Membros de dados

Membro  |  Descrição   
---|---
[ranges::split_view](<#/doc/ranges/split_view>)<V, Pattern>* `_parent__` (private) |  um ponteiro para o objeto pai [split_view](<#/doc/ranges/split_view>)  
(objeto membro apenas para exposição*)  
[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt; `_cur__` (private) |  um iterator para o [`view`](<#/doc/ranges/view>) subjacente que aponta para o início de um subrange atual  
(objeto membro apenas para exposição*)  
[ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> `_next__` (private) |  um subrange para a posição do padrão adjacente ao subrange atual  
(objeto membro apenas para exposição*)  
bool `_trailing_empty__` (private) |  uma flag que indica se um subrange vazio final (se houver) foi alcançado  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor)(C++20) |  constrói um iterator   
(função membro pública)  
base(C++20) |  retorna o iterator subjacente   
(função membro pública)  
operator*(C++20) |  retorna o subrange atual   
(função membro pública)  
operator++operator++(int)(C++20) |  avança o iterator   
(função membro pública)  
  
##  std::ranges::split_view::_iterator_ ::_iterator_

```cpp
/*iterator*/() = default;  // (1) (desde C++20)
constexpr /*iterator*/( split_view& parent, ranges::iterator_t<V> current,
ranges::subrange<ranges::iterator_t<V>> next );  // (2) (desde C++20)
```

  
1) Inicializa por valor os membros de dados não estáticos com seus inicializadores de membro padrão, ou seja 

  * [ranges::split_view](<#/doc/ranges/split_view>)* parent_ = nullptr;, 
  * [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt; cur_ = [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;();, 
  * [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> next_ = [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>();, e 
  * bool trailing_empty_ = false;.

2) Inicializa os membros de dados não estáticos: 

  * [ranges::split_view](<#/doc/ranges/split_view>)* parent_ = [std::addressof](<#/doc/memory/addressof>)(parent);, 
  * [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt; cur_ = std::move(current);, 
  * [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> next_ = std::move(next);, e 
  * bool trailing_empty_ = false;. 

##  std::ranges::split_view::_iterator_ ::base

```cpp
constexpr const ranges::iterator_t<V> base() const;  // (desde C++20)
```

  
Equivalente a return cur_;. 

##  std::ranges::split_view::_iterator_ ::operator*

```cpp
constexpr value_type operator*() const;  // (desde C++20)
```

  
Equivalente a return {cur_, next_.begin()};. 

##  std::ranges::split_view::_iterator_ ::operator++

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++20)
constexpr void operator++( int );  // (2) (desde C++20)
```

  
1) Equivalente a  
cur_ = next_.begin();  

if (cur_ != [ranges::end](<#/doc/ranges/end>)(parent_->base_))  
{  
if (cur_ = next_.end(); cur_ == [ranges::end](<#/doc/ranges/end>)(parent_->base_))  
{  
trailing_empty_ = true;  
next_ = {cur_, cur_};  
}  
else  
next_ = parent_->find_next(cur_);  
}  
else  
trailing_empty_ = false;  
  

return *this;

2) Equivalente a auto tmp = *this; ++*this; return tmp;. 

### Funções não-membro

operator==(C++20) |  compara os iterators subjacentes   
(função)  
  
##  operator==(std::ranges::split_view::_iterator_ , std::ranges::split_view::_iterator_)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y );  // (desde C++20)
```

  
Equivalente a return x.cur_ == y.cur_ and x.trailing_empty_ == y.trailing_empty_;. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esta função não é visível para a pesquisa (lookup) comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `std::ranges::split_view::_iterator_` é uma classe associada dos argumentos. 