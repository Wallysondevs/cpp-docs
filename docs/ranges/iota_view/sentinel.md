# std::ranges::iota_view&lt;W, Bound&gt;::sentinel

```cpp
struct /*sentinel*/;  // (apenas para exposição*)
```

[ranges::iota_view](<#/doc/ranges/iota_view>)<W, Bound>::`_sentinel_` é o tipo dos sentinels alcançáveis retornados por [`end()`](<#/doc/ranges/iota_view/end>) de [ranges::iota_view](<#/doc/ranges/iota_view>)<W, Bound>.

### Membros de dados

Membro | Definição
---|---
`Bound` `_bound__` | o valor do sentinel
(objeto membro apenas para exposição*)

### Funções membro

## std::ranges::iota_view::_sentinel_ ::_sentinel_

```cpp
/*sentinel*/() = default;  // (1) (desde C++20)
constexpr explicit /*sentinel*/( Bound bound );  // (2) (desde C++20)
```

1) Inicializa por valor `_[bound_](<#/doc/ranges/iota_view/sentinel>)_`.

2) Inicializa `_[bound_](<#/doc/ranges/iota_view/sentinel>)_` com bound.

### Funções não-membro

## operator==(std::ranges::iota_view::_iterator_ , std::ranges::iota_view::_sentinel_)

```cpp
friend constexpr bool operator==( const /*iterator*/& x,
const /*sentinel*/& y );  // (desde C++20)
```

Retorna x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` == y.`_[bound_](<#/doc/ranges/iota_view/sentinel>)_`.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

Esta função não é visível para a pesquisa (lookup) comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando _sentinel_ é uma classe associada dos argumentos.

## operator-(std::ranges::iota_view::_iterator_ , std::ranges::iota_view::_sentinel_)

```cpp
friend constexpr std::iter_difference_t<W>
operator-(const /*iterator*/& x, const /*sentinel*/& y)
requires std::sized_sentinel_for<Bound, W>;  // (1) (desde C++20)
friend constexpr std::iter_difference_t<W>
operator-(const /*sentinel*/& x, const /*iterator*/& y)
requires std::sized_sentinel_for<Bound, W>;  // (2) (desde C++20)
```

1) Retorna x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` - y.`_[bound_](<#/doc/ranges/iota_view/sentinel>)_`.

2) Retorna -(y.`_[value_](<#/doc/ranges/iota_view/iterator>)_` - x.`_[bound_](<#/doc/ranges/iota_view/sentinel>)_`).

Estas funções não são visíveis para a pesquisa (lookup) comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando _sentinel_ é uma classe associada dos argumentos.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo