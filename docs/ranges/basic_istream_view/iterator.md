# std::ranges::basic_istream_view::iterator

```cpp
struct /*iterator*/;  // (apenas para exposição*)
```

[ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)<Val, CharT, Traits>::`_iterator_` é o tipo dos iteradores retornados por [`begin()`](<#/doc/ranges/basic_istream_view>) de [ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)<Val, CharT, Traits>.

`_iterator_` é um [`input_iterator`](<#/doc/iterator/input_iterator>), mas não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>), e, portanto, não funciona com [algoritmos](<#/doc/algorithm>) anteriores a C++20.

### Tipos aninhados

Tipo | Definição
---|---
`iterator_concept` | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`value_type` | `Val`

### Membros de dados

Membro | Definição
---|---
[ranges::basic_istream_view](<#/doc/ranges/basic_istream_view>)<Val, CharT, Traits> `_parent__` | um ponteiro para a view pai
(objeto membro apenas para exposição*)

### Funções membro

## std::ranges::basic_istream_view::_iterator_ ::_iterator_

```cpp
/*iterator*/( const /*iterator*/& ) = delete;  // (1) (desde C++20)
/*iterator*/( /*iterator*/&& ) = default;  // (2) (desde C++20)
constexpr explicit /*iterator*/( basic_istream_view& parent );  // (3) (desde C++20)
```

1) O construtor de cópia é deletado. O iterator não é copiável.

2) O construtor de movimento é padronizado.

3) Inicializa `_[parent_](<#/doc/ranges/basic_istream_view/iterator>)_` com [std::addressof](<#/doc/memory/addressof>)(parent).

## std::ranges::basic_istream_view::_iterator_ ::operator=

```cpp
/*iterator*/& operator=( const /*iterator*/& ) = delete;  // (1) (desde C++20)
/*iterator*/& operator=( /*iterator*/&& ) = default;  // (2) (desde C++20)
```

1) O operador de atribuição de cópia é deletado. O iterator não é copiável.

2) O operador de atribuição de movimento é padronizado.

## std::ranges::basic_istream_view::_iterator_ ::operator++

```cpp
/*iterator*/& operator++();  // (1) (desde C++20)
void operator++(int);  // (2) (desde C++20)
```

1) Equivalente a `*_[parent_](<#/doc/ranges/basic_istream_view/iterator>)_` ﻿->`_[stream_](<#/doc/ranges/basic_istream_view>)_` `>>` ` _[parent_](<#/doc/ranges/basic_istream_view/iterator>)_` ﻿->`_[value_](<#/doc/ranges/basic_istream_view>)_`.

2) Equivalente a `++*this`.

## std::ranges::basic_istream_view::_iterator_ ::operator*

```cpp
Val& operator*() const;  // (desde C++20)
```

Retorna `_[parent_](<#/doc/ranges/basic_istream_view/iterator>)_` ﻿->`_[value_](<#/doc/ranges/basic_istream_view>)_`.

### Funções não-membro

## operator==(std::ranges::basic_istream_view::_iterator_ , std::default_sentinel)

```cpp
friend bool operator==( const /*iterator*/& x, std::default_sentinel_t );  // (desde C++20)
```

Retorna `!*_[parent_](<#/doc/ranges/basic_istream_view/iterator>)_` ﻿->`_[stream_](<#/doc/ranges/basic_istream_view>)_`.

Esta função não é visível para lookup não qualificado comum ou lookup qualificado, e só pode ser encontrada por argument-dependent lookup quando `std::ranges::basic_istream_view::_iterator_` é uma classe associada dos argumentos.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | construtor padrão foi fornecido como iterators C++20 devem ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido junto com o requisito