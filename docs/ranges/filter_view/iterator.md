# std::ranges::filter_view&lt;V,Pred&gt;::iterator

```cpp
class /*iterator*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`filter_view::begin`](<#/doc/ranges/filter_view>). 

Este é um [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) se V modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), um [`forward_iterator`](<#/doc/iterator/forward_iterator>) se V modela [`forward_range`](<#/doc/ranges/forward_range>), e [`input_iterator`](<#/doc/iterator/input_iterator>) caso contrário. 

A modificação do elemento denotado por este iterator é permitida, mas resulta em comportamento indefinido se o valor resultante não satisfizer o predicado do filtro. 

### Tipos membro

Tipo membro  |  Definição   
---|---
`iterator_concept` | 

  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se V modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se V modela [`forward_iterator`](<#/doc/iterator/forward_iterator>), 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) caso contrário. 

  
`iterator_category`  
(presente condicionalmente) |  Definido se e somente se V modela [`forward_range`](<#/doc/ranges/forward_range>). Seja C o tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>::iterator_category. 

  * [std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>), se C modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::bidirectional_iterator_tag](<#/doc/iterator/iterator_tags>)>, 
  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se C modela [std::derived_from](<#/doc/concepts/derived_from>)<[std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)>, 
  * C caso contrário. 

  
`value_type` |  [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;V&gt;  
---|---
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;  
  
### Membros de dados

Nome do membro  |  Definição   
---|---
`_current__` (private) |  Um iterator do tipo [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt; para o [`view`](<#/doc/ranges/view>) subjacente.  
(objeto membro apenas para exposição*)  
`_parent__` (private) |  Um ponteiro do tipo [ranges::filter_view](<#/doc/ranges/filter_view>)<V, Pred>* para o objeto `filter_view` pai.  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/filter_view/iterator>) |  constrói um iterator   
(função membro pública)  
[ base](<#/doc/ranges/filter_view/iterator>) |  retorna o iterator subjacente   
(função membro pública)  
[ operator*operator->](<#/doc/ranges/filter_view/iterator>) |  encaminha para o iterator subjacente   
(função membro pública)  
[ operator++operator++(int)](<#/doc/ranges/filter_view/iterator>) |  avança o iterator   
(função membro pública)  
[ operator--operator--(int)](<#/doc/ranges/filter_view/iterator>) |  decrementa o iterator   
(função membro pública)  
  
##  std::ranges::filter_view::_iterator_ ::_iterator_

```cpp
/*iterator*/()
requires std::default_initializable<ranges::iterator_t<V>> = default;  // (1) (desde C++20)
constexpr /*iterator*/( filter_view& parent,
ranges::iterator_t<V> current );  // (2) (desde C++20)
```

  
1) Inicializa `_current__` e `_parent__` com seus inicializadores de membro padrão, que são = [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;() e = nullptr respectivamente.

2) Inicializa `_current__` com std::move(current) e `_parent__` com [std::addressof](<#/doc/memory/addressof>)(parent). 

##  std::ranges::filter_view::_iterator_ ::base

```cpp
constexpr const ranges::iterator_t<V>& base() const & noexcept;  // (1) (desde C++20)
constexpr ranges::iterator_t<V> base() &&;  // (2) (desde C++20)
```

  
1) Equivalente a return current_;.

2) Equivalente a return std::move(current_);. 

##  std::ranges::filter_view::_iterator_ ::operator*,->

```cpp
constexpr ranges::range_reference_t<V> operator*() const;  // (1) (desde C++20)
constexpr ranges::iterator_t<V> operator->() const
requires /*has-arrow*/<ranges::iterator_t<V>> &&
std::copyable<ranges::iterator_t<V>>;  // (2) (desde C++20)
```

  
1) Equivalente a return *current_;.

2) Equivalente a return current_;.  

Para um tipo `I`, /*has-arrow*/&lt;I&gt; é modelado ou satisfeito, se e somente se `I` modela ou satisfaz [`input_iterator`](<#/doc/iterator/input_iterator>) respectivamente, e `I` é um tipo ponteiro ou requires(I i){ i.operator->();} é verdadeiro. 

##  std::ranges::filter_view::_iterator_ ::operator++

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++20)
constexpr void operator++( int );  // (2) (desde C++20)
constexpr /*iterator*/ operator++( int )
requires ranges::forward_range<V>;  // (3) (desde C++20)
```

  
1) Equivalente a  
current_ = [ranges::find_if](<#/doc/algorithm/ranges/find>)(std::move(++current_), [ranges::end](<#/doc/ranges/end>)(parent_->base_),  
[std::ref](<#/doc/utility/functional/ref>)(*parent_->pred_));  
return *this;.

2) Equivalente a ++*this;.

3) Equivalente a auto tmp = *this; ++*this; return tmp;. 

##  std::ranges::filter_view::_iterator_ ::operator--

```cpp
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<V>;  // (1) (desde C++20)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<V>;  // (2) (desde C++20)
```

  
1) Equivalente a  
do  
\--current_;  
while (![std::invoke](<#/doc/utility/functional/invoke>)(*parent_->pred_, *current_));  
return *this;.

2) Equivalente a auto tmp = *this; \--*this; return tmp;. 

### Funções não-membro

[ operator==](<#/doc/ranges/filter_view/iterator>)(C++20) |  compara os iterators subjacentes   
(função)  
[ iter_move](<#/doc/ranges/filter_view/iterator>)(C++20) |  converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ iter_swap](<#/doc/ranges/filter_view/iterator>)(C++20) |  troca os objetos apontados por dois iterators subjacentes   
(função)  
  
##  operator==(std::ranges::filter_view::_iterator_)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires std::equality_comparable<ranges::iterator_t<V>>;  // (desde C++20)
```

  
Equivalente a return x.current_ == y.current_;. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::filter_view::_iterator_` é uma classe associada dos argumentos. 

##  iter_move(std::ranges::filter_view::_iterator_)

```cpp
friend constexpr ranges::range_rvalue_reference_t<V>
iter_move( const /*iterator*/& i )
noexcept(noexcept(ranges::iter_move(i.current_)));  // (desde C++20)
```

  
Equivalente a return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.current_);. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::filter_view::_iterator_` é uma classe associada dos argumentos. 

##  iter_swap(std::ranges::filter_view::_iterator_)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept(noexcept(ranges::iter_swap(x.current_, y.current_)))
requires std::indirectly_swappable<ranges::iterator_t<V>>;  // (desde C++20)
```

  
Equivalente a [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.current_, y.current_). 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::filter_view::_iterator_` é uma classe associada dos argumentos. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[P2259R1](<https://wg21.link/P2259R1>) | C++20  | o tipo membro `iterator_category` era sempre definido  | definido apenas se `V` for um [`forward_range`](<#/doc/ranges/forward_range>)  
[LWG 3533](<https://cplusplus.github.io/LWG/issue3533>) | C++20  | a sobrecarga const& de `base` copiava o iterator subjacente  | retorna uma referência a ele   
[LWG 3593](<https://cplusplus.github.io/LWG/issue3593>) | C++20  | a sobrecarga const& de `base` poderia não ser noexcept  | tornada noexcept 