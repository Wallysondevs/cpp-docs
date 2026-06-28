# std::ranges::chunk_view&lt;V&gt;::outer-iterator::value_type

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
struct value_type : view_interface<value_type>
```

  
Um tipo de valor do iterator [`chunk_view::_outer-iterator_`](<#/doc/ranges/chunk_view/outer_iterator>), formado quando `V` modela [`input_range`](<#/doc/ranges/input_range>). 

### Membros de dados

Objeto membro  |  Definição   
---|---
`_parent__` (privado) |  Um ponteiro para o "objeto pai" do tipo [ranges::chunk_view](<#/doc/ranges/chunk_view>)*  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/ranges/chunk_view/outer_iterator/value_type>)(C++23) |  constrói um `value_type`   
(função membro pública)  
[ begin](<#/doc/ranges/chunk_view/outer_iterator/value_type>)(C++23) |  retorna o [`chunk_view::_inner-iterator_`](<#/doc/ranges/chunk_view/inner_iterator>) inicial   
(função membro pública)  
[ end](<#/doc/ranges/chunk_view/outer_iterator/value_type>)(C++23) |  retorna o sentinel padrão   
(função membro pública)  
[ size](<#/doc/ranges/chunk_view/outer_iterator/value_type>)(C++23) |  retorna o tamanho da view   
(função membro pública)  
  
#####  Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)  
  
[ empty](<#/doc/ranges/view_interface/empty>) |  retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) |  retorna um iterator constante para o início do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) |  retorna um sentinel para o iterator constante do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) |  retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.   
(função membro pública de `std::ranges::view_interface<D>`)  
  
##  std::ranges::chunk_view::_outer-iterator_ ::value_type::value_type

```cpp
private:
// apenas para exposição
constexpr explicit value_type( chunk_view& parent );  // (desde C++23)
```

  
Constrói o objeto `value_type` de modo que `_parent__` seja inicializado com [std::addressof](<#/doc/memory/addressof>)(parent). 

###  Parâmetros

parent  |  \-  |  o objeto `chunk_view`   
  
##  std::ranges::chunk_view::_outer-iterator_ ::value_type::begin

```cpp
constexpr /*inner-iterator*/ begin() const noexcept;  // (desde C++23)
```

  
Equivalente a return /*inner-iterator*/(*parent_);. 

##  std::ranges::chunk_view::_outer-iterator_ ::value_type::end

```cpp
constexpr std::default_sentinel_t end() const noexcept;  // (desde C++23)
```

  
Equivalente a return [std::default_sentinel](<#/doc/iterator/default_sentinel>);. 

##  std::ranges::chunk_view::_outer-iterator_ ::value_type::size

```cpp
constexpr auto size() const
requires std::sized_sentinel_for<ranges::sentinel_t<V>, ranges::iterator_t<V>>;  // (desde C++23)
```

  
Retorna o tamanho da view. 

Equivalente a  
return /*to-unsigned-like*/(  
[ranges::min](<#/doc/algorithm/ranges/min>)(parent_->remainder_, [ranges::end](<#/doc/ranges/end>)(parent_->base_) - *parent_->current_));

### Exemplo

| Esta seção está incompleta  
Razão: exemplo   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 26.7.28.4 Class chunk_view::outer-iterator::value_type [range.chunk.outer.value] 

### Veja também

[_outer_iterator_](<#/doc/ranges/chunk_view/outer_iterator>)(C++23) |  o tipo de iterator de saída ("chunk-wise") quando V modela [`input_range`](<#/doc/ranges/input_range>)  
(classe membro apenas para exposição de `std::ranges::chunk_view<V>`*)  
[_inner_iterator_](<#/doc/ranges/chunk_view/inner_iterator>)(C++23) |  o tipo de iterator interno ("element-wise") quando V modela [`input_range`](<#/doc/ranges/input_range>)  
(classe membro apenas para exposição de `std::ranges::chunk_view<V>`*)