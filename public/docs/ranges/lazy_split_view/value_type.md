# std::ranges::lazy_split_view&lt;V, Pattern&gt;::outer_iterator&lt;Const&gt;::value_type

```cpp
struct value_type : ranges::view_interface<value_type>  // (desde C++20)
```

  
O tipo de valor do iterator [ranges::lazy_split_view](<#/doc/ranges/lazy_split_view>)<V, Pattern>::[`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) &lt;Const&gt;. 

### Membros de dados

Membro  |  Descrição   
---|---
[`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) `_i__` (private) |  um iterator para a [`view`](<#/doc/ranges/view>) subjacente da classe externa  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor) |  constrói um objeto `value_type`  
(função membro apenas para exposição*)  
begin |  retorna um [`_inner_iterator_`](<#/doc/ranges/lazy_split_view/inner_iterator>) para o início do range interno   
(função membro pública)  
end |  retorna um [std::default_sentinel](<#/doc/iterator/default_sentinel>)   
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
[ front](<#/doc/ranges/view_interface/front>) |  retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
  
### Funções membro

##  std::ranges::lazy_split_view::_outer_iterator_ ::value_type::value_type

```cpp
constexpr explicit value_type(/*outer_iterator*/ i); // exposition only  // (desde C++20)
```

  
Inicializa `_[i_](<#/doc/ranges/lazy_split_view/value_type>)_` com std::move(i). 

##  std::ranges::lazy_split_view::_outer_iterator_ ::value_type::begin

```cpp
constexpr /*inner_iterator*/<Const> begin() const;  // (desde C++20)
```

  
Equivalente a return /*inner_iterator*/&lt;Const&gt;{`_i__`};. 

##  std::ranges::lazy_split_view::_outer_iterator_ ::value_type::end

```cpp
constexpr std::default_sentinel_t end() const noexcept;  // (desde C++20)
```

  
Retorna [std::default_sentinel](<#/doc/iterator/default_sentinel>). 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3593](<https://cplusplus.github.io/LWG/issue3593>) | C++20  | `end` não era noexcept  | tornado noexcept   
[LWG 4013](<https://cplusplus.github.io/LWG/issue4013>) | C++20  | `value_type` era inicializável por padrão  | não inicializável por padrão 