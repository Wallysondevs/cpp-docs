# std::ranges::repeat_view&lt;W, Bound&gt;::iterator

```cpp
struct /*iterator*/;  // (apenas para exposição*)
```

  
`[ranges::repeat_view](<#/doc/ranges/repeat_view>)<W, Bound>::_iterator_` é o tipo dos iteradores retornados por [`begin()`](<#/doc/ranges/repeat_view>) e [`end()`](<#/doc/ranges/repeat_view>) de [ranges::repeat_view](<#/doc/ranges/repeat_view>)<W, Bound>. 

### Tipos aninhados

#####  Tipos apenas para exposição   
  
---  
Tipo  |  Definição   
---|---
`_index-type_` |  [std::conditional_t](<#/doc/types/conditional>)<[std::same_as](<#/doc/concepts/same_as>)<Bound, [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>)>,  
` `[std::ptrdiff_t](<#/doc/types/ptrdiff_t>), Bound>  
(tipo membro apenas para exposição*)  
  
#####  Tipos de propriedade do Iterator   
  
Tipo  |  Definição   
---|---
`iterator_concept` |  [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)  
`iterator_category` |  [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>)  
`value_type` |  `W`  
`difference_type` |  [std::conditional_t](<#/doc/types/conditional>)<[`_is-signed-integer-like_`](<#/doc/iterator/is-integer-like>) ﻿<`_index-type_` ﻿>,  
` ` _index-type_` ﻿,` `[` _iota-diff-t_`](<#/doc/ranges/iota_view/iterator>) ﻿<`_index-type_` ﻿>>  
  
### Membros de dados

Membro  |  Definição   
---|---
const W* `_value__` |  um ponteiro para o valor a ser repetido  
(objeto membro apenas para exposição*)  
`_index-type_` `_current__` |  a posição atual  
(objeto membro apenas para exposição*)  
  
### Funções membro

##  std::ranges::repeat_view::_iterator_ ::_iterator_

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
constexpr explicit /*iterator*/
( const W* value, /*index-type*/ b = /*index-type*/() );  // (2) (desde C++23)
```

  
Constrói um iterator. A sobrecarga (2) é chamada por [`begin()`](<#/doc/ranges/repeat_view>) e [`end()`](<#/doc/ranges/repeat_view>) de [`ranges::repeat_view`](<#/doc/ranges/repeat_view>). 

1) Inicializa `_[value_](<#/doc/ranges/repeat_view/iterator>)_` com nullptr e inicializa por valor `_[current_](<#/doc/ranges/repeat_view/iterator>)_` ﻿.

2) Inicializa `_[value_](<#/doc/ranges/repeat_view/iterator>)_` com value e `_[current_](<#/doc/ranges/repeat_view/iterator>)_` com b.

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e b for negativo, o comportamento é indefinido. 

##  std::ranges::repeat_view::_iterator_ ::operator*

```cpp
constexpr const W& operator*() const noexcept;  // (desde C++23)
```

  
Retorna *`_[value_](<#/doc/ranges/repeat_view/iterator>)_`. 

##  std::ranges::repeat_view::_iterator_ ::operator[]

```cpp
constexpr const W& operator const noexcept;  // (desde C++23)
```

  
Retorna *(*this + n). 

##  std::ranges::repeat_view::_iterator_ ::operator++

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++(int);  // (2) (desde C++23)
```

  
1) Equivalente a ++`_[current_](<#/doc/ranges/repeat_view/iterator>)_` ﻿; return *this;.

2) Equivalente a auto tmp = *this; ++*this; return tmp;. 

##  std::ranges::repeat_view::_iterator_ ::operator--

```cpp
constexpr /*iterator*/& operator\--();  // (1) (desde C++23)
constexpr /*iterator*/ operator\--(int);  // (2) (desde C++23)
```

  
1) Equivalente a \--`_[current_](<#/doc/ranges/repeat_view/iterator>)_` ﻿; return *this;.

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e `_[current_](<#/doc/ranges/repeat_view/iterator>)_` for não-positivo, o comportamento é indefinido.

2) Equivalente a auto tmp = *this; \--*this; return tmp;. 

##  std::ranges::repeat_view::_iterator_ ::operator+=

```cpp
constexpr /*iterator*/& operator+=( difference_type n );  // (desde C++23)
```

  
Equivalente a `_[current_](<#/doc/ranges/repeat_view/iterator>)_` `+= n; return *this;. 

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e `_[current_](<#/doc/ranges/repeat_view/iterator>)_` `+ n for negativo, o comportamento é indefinido. 

##  std::ranges::repeat_view::_iterator_ ::operator-=

```cpp
constexpr /*iterator*/& operator-=( difference_type n );  // (desde C++23)
```

  
Equivalente a `_[current_](<#/doc/ranges/repeat_view/iterator>)_` `-= n; return *this;. 

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e `_[current_](<#/doc/ranges/repeat_view/iterator>)_` `- n for negativo, o comportamento é indefinido. 

### Funções não-membro

##  operator==, <=>(std::ranges::repeat_view::_iterator_)

```cpp
friend constexpr bool operator==
( const /*iterator*/& x, const /*iterator*/& y );  // (1) (desde C++23)
friend constexpr auto operator<=>
( const /*iterator*/& x, const /*iterator*/& y );  // (2) (desde C++23)
```

  
1) Retorna x.`_[current_](<#/doc/ranges/repeat_view/iterator>)_` `== y.`_[current_](<#/doc/ranges/repeat_view/iterator>)_`.

2) Retorna x.`_[current_](<#/doc/ranges/repeat_view/iterator>)_` `<=> y.`_[current_](<#/doc/ranges/repeat_view/iterator>)_`.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `_iterator_` é uma classe associada dos argumentos. 

##  operator+(std::ranges::repeat_view::_iterator_)

```cpp
friend constexpr /*iterator*/ operator+
( /*iterator*/ i, difference_type n );  // (1) (desde C++23)
friend constexpr /*iterator*/ operator+
( difference_type n, /*iterator*/ i );  // (2) (desde C++23)
```

  
Equivalente a i += n; return i;. 

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `_iterator_` é uma classe associada dos argumentos. 

##  operator-(std::ranges::repeat_view::_iterator_)

```cpp
friend constexpr /*iterator*/ operator-
( /*iterator*/ i, difference_type n );  // (1) (desde C++23)
friend constexpr difference_type operator-
( const /*iterator*/& x, const /*iterator*/& y );  // (2) (desde C++23)
```

  
1) Equivalente a i -= n; return i;.

2) Retorna static_cast<`[difference_type](<#/doc/ranges/repeat_view/iterator>)`>(x.`_[current_](<#/doc/ranges/repeat_view/iterator>)_` ﻿) -  
` `static_cast<`[difference_type](<#/doc/ranges/repeat_view/iterator>)`>(y.`_[current_](<#/doc/ranges/repeat_view/iterator>)_` ﻿).

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `_iterator_` é uma classe associada dos argumentos. 

### Notas

`_iterator_` é sempre [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). 