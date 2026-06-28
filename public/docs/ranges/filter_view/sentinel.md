# std::ranges::filter_view&lt;V,Pred&gt;::sentinel

```cpp
class /*sentinel*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`filter_view::end`](<#/doc/ranges/filter_view>) quando o tipo [`view`](<#/doc/ranges/view>) subjacente (`V`) não modela [`common_range`](<#/doc/ranges/common_range>). 

### Membros de dados

Nome do membro  |  Definição   
---|---
`_end__` (private) |  O sentinel do [`view`](<#/doc/ranges/view>) subjacente.  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (constructor)](<#/doc/ranges/filter_view/sentinel>) |  constrói um sentinel   
(função membro pública)  
[ base](<#/doc/ranges/filter_view/sentinel>) |  retorna o sentinel subjacente   
(função membro pública)  
  
##  std::ranges::filter_view::_sentinel_ ::_sentinel_

```cpp
/*sentinel*/() = default;  // (1) (desde C++20)
constexpr explicit /*sentinel*/( filter_view& parent );  // (2) (desde C++20)
```

  
1) Inicializa `_end__` por valor através de seu inicializador de membro padrão (= [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt;()).

2) Inicializa `_end__` com [ranges::end](<#/doc/ranges/end>)(parent.base_). 

##  std::ranges::filter_view::_sentinel_ ::base

```cpp
constexpr ranges::sentinel_t<V> base() const;  // (desde C++20)
```

  
Equivalente a return end_;. 

### Funções não-membro

[ operator==](<#/doc/ranges/filter_view/sentinel>)(C++20) |  compara o iterator subjacente e o sentinel subjacente   
(função)  
  
##  operator==(std::ranges::filter_view::_iterator_ , std::ranges::filter_view::_sentinel_)

```cpp
friend constexpr bool operator==( const /*iterator*/& x,
const /*sentinel*/& y );  // (desde C++20)
```

  
Equivalente a return x.current_ == y.end_;, onde `_current__` é o iterator subjacente encapsulado em [`filter_view::_iterator_`](<#/doc/ranges/filter_view/iterator>). 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::filter_view::_sentinel_` é uma classe associada dos argumentos. 