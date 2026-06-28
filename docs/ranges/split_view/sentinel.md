# std::ranges::split_view&lt;V,Pattern&gt;::sentinel

```cpp
class /*sentinel*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`split_view::end`](<#/doc/ranges/split_view>) quando o tipo [`view`](<#/doc/ranges/view>) subjacente `V` não modela [`common_range`](<#/doc/ranges/common_range>). 

### Membros de dados

Membro  |  Descrição   
---|---
[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt; `_end__` (private) |  o sentinel para o [`view`](<#/doc/ranges/view>) subjacente  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor)(C++20) |  constrói um sentinel   
(função membro pública)  
  
##  std::ranges::split_view::_sentinel_ ::_sentinel_

```cpp
/*sentinel*/() = default;  // (1) (desde C++20)
constexpr explicit /*sentinel*/( ranges::split_view& parent );  // (2) (desde C++20)
```

  
1) Inicializa por valor `_[end_](<#/doc/ranges/split_view/sentinel>)_` através de seu inicializador de membro padrão (= [`ranges::sentinel_t`](<#/doc/ranges/iterator_t>)&lt;V&gt;()).

2) Inicializa `_[end_](<#/doc/ranges/split_view/sentinel>)_` com [`ranges::end`](<#/doc/ranges/end>)(parent.base_). 

### Funções não-membro

operator==(C++20) |  compara o iterator subjacente e o sentinel subjacente   
(função)  
  
##  operator==(std::ranges::split_view::_iterator_ , std::ranges::split_view::_sentinel_)

```cpp
friend constexpr bool operator==( const /*iterator*/& x,
const /*sentinel*/& y );  // (desde C++20)
```

  
Equivalente a `return x.cur_ == y.end_ and !x.trailing_empty_;`. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::split_view::_sentinel_` é uma classe associada dos argumentos. 