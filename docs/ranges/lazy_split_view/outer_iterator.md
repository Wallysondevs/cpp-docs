# std::ranges::lazy_split_view&lt;V, Pattern&gt;::outer_iterator

```cpp
template< bool Const >
struct /*outer_iterator*/;  // (desde C++20)
(apenas para exposição*)
```

  
O tipo de retorno de [`lazy_split_view::begin`](<#/doc/ranges/lazy_split_view/begin>), e de [`lazy_split_view::end`](<#/doc/ranges/lazy_split_view/end>) quando a view subjacente é um [`common_range`](<#/doc/ranges/common_range>) e um [`forward_range`](<#/doc/ranges/forward_range>). 

Se `V` ou `Pattern` não for uma [simple view](<#/doc/ranges>) (por exemplo, se [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const V&gt; for inválido ou diferente de [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;), `Const` é verdadeiro para iterators retornados de sobrecargas const, e falso caso contrário. Se `V` for uma simple view, `Const` é verdadeiro se e somente se `V` for um [`forward_range`](<#/doc/ranges/forward_range>). 

### Tipos de membros

Membro  |  Definição   
---|---
`_Parent_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, [ranges::lazy_split_view](<#/doc/ranges/lazy_split_view>)>  
(tipo de membro apenas para exposição*)  
`_Base_` |  `_[maybe-const](<#/doc/ranges>)_` ﻿<Const, V>  
(tipo de membro apenas para exposição*)  
`iterator_concept` | 

  * [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>), se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>), 
  * [std::input_iterator_tag](<#/doc/iterator/iterator_tags>), caso contrário 

  
`iterator_category`  
(presente apenas se `_Base_` modelar [`forward_range`](<#/doc/ranges/forward_range>)) |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
---|---
[ value_type](<#/doc/ranges/lazy_split_view/value_type>) |  o tipo de valor do `_outer_iterator_`   
(classe membro pública)  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;Base&gt;  
  
### Membros de dados

Membro  |  Descrição   
---|---
Parent* `_parent__` (private) |  um ponteiro para o objeto pai [`lazy_split_view`](<#/doc/ranges/lazy_split_view>)  
(objeto membro apenas para exposição*)  
[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt; `_current__` (private)   
(presente apenas se `V` modelar [`forward_range`](<#/doc/ranges/forward_range>)) |  um iterator para a [`view`](<#/doc/ranges/view>) subjacente  
(objeto membro apenas para exposição*)  
bool `_trailing_empty__` (private) |  uma flag que indica se um sub-range vazio final (se houver) foi alcançado  
(objeto membro apenas para exposição*)  
  
### Funções membro

(construtor) |  constrói um iterator   
(função membro pública)  
operator* |  retorna o sub-range atual   
(função membro pública)  
operator++operator++(int) |  avança o iterator   
(função membro pública)  
_cur_ |  retorna condicionalmente uma referência para o `_[current_](<#/doc/ranges/lazy_split_view/outer_iterator>)_` (se presente) ou para o *`_[parent_](<#/doc/ranges/lazy_split_view/outer_iterator>)_` ->`_[current_](<#/doc/ranges/lazy_split_view>)_`  
(função membro apenas para exposição*)  
  
### Funções membro

##  std::ranges::lazy_split_view::_outer_iterator_ ﻿::_outer_iterator_

```cpp
/*outer_iterator*/() = default;  // (1) (desde C++20)
constexpr explicit /*outer_iterator*/( Parent& parent )
requires (!ranges::forward_range<Base>);  // (2) (desde C++20)
constexpr /*outer_iterator*/( Parent& parent,
ranges::iterator_t<Base> current )
requires ranges::forward_range<Base>;  // (3) (desde C++20)
constexpr /*outer_iterator*/( /*outer_iterator*/<!Const> i )
requires Const && std::convertible_to<ranges::iterator_t<V>,
ranges::iterator_t<Base>>;  // (4) (desde C++20)
```

  
1) Inicializa por valor os membros de dados não estáticos com seus inicializadores de membro padrão, ou seja: 

  * parent_ = nullptr;, 
  * current_ = iterator_t&lt;Base&gt;(); (presente apenas se `V` modelar [`forward_range`](<#/doc/ranges/forward_range>)),

2) Inicializa `_parent__` com [std::addressof](<#/doc/memory/addressof>)(parent).

3) Inicializa `_parent__` com [std::addressof](<#/doc/memory/addressof>)(parent) e `_current__` com std::move(current).

4) Inicializa `_parent__` com i.parent_, `_current__` com std::move(i.current_), e `_trailing_empty__` com t.trailing_empty_.

O `_trailing_empty__` é inicializado com seu inicializador de membro padrão para false. 

##  std::ranges::lazy_split_view::_outer_iterator_ ﻿::operator*

```cpp
constexpr value_type operator*() const;  // (desde C++20)
```

  
Equivalente a return value_type{*this};. 

##  std::ranges::lazy_split_view::_outer_iterator_ ﻿::operator++

```cpp
constexpr /*outer_iterator*/& operator++();  // (1) (desde C++20)
constexpr decltype(auto) operator++(int);  // (2) (desde C++20)
```

  
1) O corpo da função é equivalente a 
```cpp
    const auto end = ranges::end(parent_->base_);
    if (/*cur*/() == end)
    {
        trailing_empty_ = false;
        return *this;
    }
    const auto [pbegin, pend] = ranges::subrange{parent_->pattern_};
    if (pbegin == pend)
        ++/*cur*/();
    else if constexpr (/*tiny_range*/<Pattern>)
    {
        /*cur*/() = ranges::find(std::move(/*cur*/()), end, *pbegin);
        if (/*cur*/() != end)
        {
            ++/*cur*/();
            if (/*cur*/() == end)
                trailing_empty_ = true;
        }
    }
    else
    {
        do
        {
            auto [b, p] = ranges::mismatch(/*cur*/(), end, pbegin, pend);
            if (p == pend)
            {
                /*cur*/() = b;
                if (/*cur*/() == end)
                    trailing_empty_ = true;
                break; // The pattern matched; skip it
            }
        } while (++/*cur*/() != end);
    }
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
    {
        ++*this; // no return statement
    }
```

##  std::ranges::lazy_split_view::_outer_iterator_ ﻿::_cur_ ﻿()

```cpp
constexpr auto& /*cur*/() noexcept;  // (1) (desde C++20)
(apenas para exposição*)
constexpr auto& /*cur*/() const noexcept;  // (2) (desde C++20)
(apenas para exposição*)
```

  
Esta função membro de conveniência é referenciada de /*outer_iterator*/::operator++(), do operador não-membro operator==(const /*outer_iterator*/&, [std::default_sentinel_t](<#/doc/iterator/default_sentinel>)), e de algumas funções membro da possível implementação de [`_inner_iterator_`](<#/doc/ranges/lazy_split_view/inner_iterator>). 

1,2) Equivalente a 
```cpp
    if constexpr (ranges::forward_range<V>)
        return current_;
    else
        return *parent->current_;
```

### Funções não-membro

operator==(C++20) |  compara os iterators subjacentes ou o iterator subjacente e [std::default_sentinel](<#/doc/iterator/default_sentinel>)   
(função)  
  
##  operator==(std::ranges::split_view::_outer_iterator_)

```cpp
friend constexpr bool operator==( const /*outer_iterator*/& x,
const /*outer_iterator*/& y )
requires forward_range<Base>;  // (1) (desde C++20)
friend constexpr bool operator==( const /*outer_iterator*/& x,
std::default_sentinel_t );  // (2) (desde C++20)
```

  
1) Equivalente a return x.current_ == y.current_ and x.trailing_empty_ == y.trailing_empty_;.

2) Equivalente a return x./*cur*/() == [ranges::end](<#/doc/ranges/end>)(x.parent_->base_) and !x.trailing_empty_;.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Estas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::split_view::_outer_iterator_` é uma classe associada dos argumentos. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 3904](<https://cplusplus.github.io/LWG/issue3904>) | C++20  | `_trailing_empty__` não era inicializado no construtor ([4](<#/doc/ranges/lazy_split_view/outer_iterator>))  | inicializado 