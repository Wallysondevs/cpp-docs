# std::ranges::lazy_split_view&lt;V, Pattern&gt;::inner_iterator

```cpp
template< bool Const >
struct /*inner_iterator*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`lazy_split_view::`](<#/doc/ranges/lazy_split_view/value_type>)[`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) ::value_type::begin(). 

`Const` corresponde ao argumento de template de [`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>). 

### Tipos de membros

Membro  |  Definição   
---|---
`_Base_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo de membro apenas para exposição*)  
`iterator_concept` | 

  * [`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) &lt;Const&gt;::iterator_concept, ou seja, [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>). 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), caso contrário. 

  
`iterator_category`  
(presente condicionalmente) |  Presente apenas se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>). 

  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>) se [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;>::iterator_category modelar [std::derived_from](<#/doc/concepts/derived_from>)<[std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)>. 
  * [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;>::iterator_category caso contrário. 

  
`value_type` |  [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
---|---
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de dados

Membro  |  Descrição   
---|---
[`_outer_iterator_`](<#/doc/ranges/lazy_split_view/outer_iterator>) &lt;Const&gt; `_i__` (private) |  um iterator para o [`view`](<#/doc/ranges/view>) subjacente do objeto pai [`lazy_split_view`](<#/doc/ranges/lazy_split_view/lazy_split_view>)  
(objeto membro apenas para exposição*)  
bool `_incremented__` (private) |  uma flag que indica se o operator++ foi invocado neste objeto pelo menos uma vez  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor)(C++20) |  constrói um iterator   
(função membro pública)  
base(C++20) |  retorna o iterator subjacente   
(função membro pública)  
operator*(C++20) |  retorna o elemento atual   
(função membro pública)  
operator++operator++(int)(C++20) |  avança o iterator   
(função membro pública)  
  
### Funções membro

##  std::ranges::lazy_split_view::_inner_iterator_ ::_inner_iterator_

```cpp
/*inner_iterator*/() = default;  // (1) (desde C++20)
constexpr explicit /*inner_iterator*/( /*outer_iterator*/<Const> i );  // (2) (desde C++20)
```

  
1) Inicializa por valor o membro de dados `_[i_](<#/doc/ranges/lazy_split_view/inner_iterator>)_` através de seu inicializador de membro padrão (= /*outer_iterator*/&lt;Const&gt;()).

2) Inicializa `_[i_](<#/doc/ranges/lazy_split_view/inner_iterator>)_` com std::move(i).

O membro de dados `_[incremented_](<#/doc/ranges/lazy_split_view/inner_iterator>)_` é inicializado com seu inicializador de membro padrão para false. 

##  std::ranges::lazy_split_view::_inner_iterator_ ::_base_

```cpp
constexpr const ranges::iterator_t<Base>& base() const & noexcept;  // (1) (desde C++20)
constexpr ranges::iterator_t<Base> base() &&
requires ranges::forward_range<V>;  // (2) (desde C++20)
```

  
Retorna uma cópia do iterator subjacente. 

1) Constrói por cópia o resultado a partir do iterator subjacente. Equivalente a return i_./*cur*/();.

2) Constrói por movimento o resultado a partir do iterator subjacente. Equivalente a return std::move(i_./*cur*/());. 

##  std::ranges::lazy_split_view::_inner_iterator_ ::operator*

```cpp
constexpr decltype(auto) operator*() const;  // (desde C++20)
```

  
Retorna o elemento para o qual o iterator subjacente aponta. 

Equivalent to return *i_./*cur*/();. 

##  std::ranges::lazy_split_view::_inner_iterator_ ::operator++

```cpp
constexpr /*inner_iterator*/& operator++();  // (1) (desde C++20)
constexpr decltype(auto) operator++(int);  // (2) (desde C++20)
```

  
1) O corpo da função é equivalente a  
```cpp
incremented_ = true;  

if constexpr (!ranges::forward_range<Base>)  
{  
if constexpr (Pattern::size() == 0)  
return *this;  
}  
++i_./*cur*/();  

return *this;
```

2) Equivalente a  
```cpp
if constexpr (ranges::forward_range<Base>)  

{  
auto tmp = *this;  
++*this;  
return tmp;  
}  
else  
++*this; // sem instrução de retorno
```

### Funções não-membro

operator==(C++20) |  compara os iterators ou o iterator e [std::default_sentinel](<#/doc/iterator/default_sentinel>)   
(função)  
iter_move(C++20) |  converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
iter_swap(C++20) |  troca os objetos apontados por dois iterators subjacentes   
(função)  
  
##  operator==(std::ranges::split_view::_inner_iterator_)

```cpp
friend constexpr bool operator==( const /*inner_iterator*/& x,
const /*inner_iterator*/& y )
requires forward_range<Base>;  // (1) (desde C++20)
friend constexpr bool operator==( const /*inner_iterator*/& x,
std::default_sentinel_t );  // (2) (desde C++20)
```

  
1) Equivalent to return x.i_./*cur*/() == y.i_./*cur*/();.

2) O corpo da função é equivalente a 
```cpp
    auto [pcur, pend] = ranges::subrange{x.i_.parent_->pattern_};
    auto end = ranges::end(x.i_.parent_->base_);
    if constexpr (/*tiny_range*/<Pattern>)
    {
        const auto& cur = x.i_./*cur*/();
        if (cur == end)
            return true;
        if (pcur == pend)
            return x.incremented_;
        return *cur == *pcur;
    }
    else
    {
        auto cur = x.i_./*cur*/();
        if (cur == end)
            return true;
        if (pcur == pend)
            return x.incremented_;
        do
        {
            if (*cur != *pcur)
                return false;
            if (++pcur == pend)
                return true;
        }
        while (++cur != end);
        return false;
    }
```

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [lookup dependente de argumento](<#/doc/language/adl>) quando `std::ranges::split_view::_inner_iterator_` é uma classe associada dos argumentos. 

##  iter_move(std::ranges::split_view::_inner_iterator_)

```cpp
friend constexpr decltype(auto) iter_move( const /*inner_iterator*/& i )
noexcept(noexcept(ranges::iter_move(i.i_./*cur*/())));  // (desde C++20)
```

  
Equivalent to return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.i_./*cur*/());. 

Essa função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [lookup dependente de argumento](<#/doc/language/adl>) quando `std::ranges::split_view::_inner_iterator_` é uma classe associada dos argumentos. 

##  iter_swap(std::ranges::split_view::_inner_iterator_)

```cpp
friend constexpr void iter_swap( const /*inner_iterator*/& x,
const /*inner_iterator*/& y )
noexcept(noexcept(ranges::iter_swap(x.i_.current, y.i_.current)))
requires std::indirectly_swappable<ranges::iterator_t<Base>>;  // (desde C++20)
```

  
Equivalent to [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.i_./*cur*/(), y.i_./*cur*/()). 

Essa função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [lookup dependente de argumento](<#/doc/language/adl>) quando `std::ranges::split_view::_inner_iterator_` é uma classe associada dos argumentos. 

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 3591](<https://cplusplus.github.io/LWG/issue3591>) | C++20 | a sobrecarga && de `base` pode invalidar iterators externos | restrições adicionadas   
[LWG 3593](<https://cplusplus.github.io/LWG/issue3593>) | C++20 | a sobrecarga const& de `base` retorna uma referência, mas pode não ser noexcept | tornada noexcept 