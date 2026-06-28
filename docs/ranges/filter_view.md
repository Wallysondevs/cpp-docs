# std::ranges::views::filter, std::ranges::filter_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V,
std::indirect_unary_predicate<ranges::iterator_t<V>> Pred >
requires ranges::view<V> && std::is_object_v<Pred>
class filter_view
: public ranges::view_interface<filter_view<V, Pred>>
namespace views {
inline constexpr /* unspecified */ filter = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R, class Pred >
requires /* see below */
constexpr ranges::view auto filter( R&& r, Pred&& pred );
template< class Pred >
constexpr /* range adaptor closure */ filter( Pred&& pred );
```

1) Um adaptador de range que representa uma [`view`](<#/doc/ranges/view>) de uma sequência subjacente sem os elementos que não satisfazem um predicado.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::filter(e, p) é [equivalente em expressão](<#/doc/language/expressions>) a filter_view(e, p) para quaisquer subexpressões e e p adequadas.

`filter_view` modela os concepts [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), e [`common_range`](<#/doc/ranges/common_range>) quando a [`view`](<#/doc/ranges/view>) subjacente `V` modela os concepts respectivos.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (private) | A [`view`](<#/doc/ranges/view>) subjacente do tipo `V`.
(objeto membro apenas para exposição*)
`_pred__` (private) | Empacota o predicado usado para filtrar elementos de `_base__` do tipo [`_copyable-box_`](<#/doc/ranges/copyable_wrapper>)`<Pred>`(até C++23)[`_movable-box_`](<#/doc/ranges/copyable_wrapper>)`<Pred>`(desde C++23), aumentando `Pred` com capacidade de atribuição quando necessário e, portanto, sempre satisfaz [`copyable`](<#/doc/concepts/copyable>) ou [`movable`](<#/doc/concepts/movable>) (desde C++23).
(objeto membro apenas para exposição*)
`_begin__` (private)
(condicionalmente presente) | Um objeto de tipo [similar a optional](<#/doc/ranges>) que armazena em cache um iterator para o primeiro elemento de `_base__` que satisfaz `_pred__`. Presente apenas se `filter_view` modela [`forward_range`](<#/doc/ranges/forward_range>).
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/filter_view>) | constrói uma `filter_view`
(função membro pública)
[ base](<#/doc/ranges/filter_view>) | retorna a view subjacente `V`
(função membro pública)
[ pred](<#/doc/ranges/filter_view>) | retorna uma referência ao predicado armazenado dentro de `filter_view`
(função membro pública)
[ begin](<#/doc/ranges/filter_view>) | retorna o iterator de início da `filter_view`
(função membro pública)
[ end](<#/doc/ranges/filter_view>) | retorna a sentinela da `filter_view`
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna uma sentinela para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::filter_view::filter_view

```cpp
filter_view() requires std::default_initializable<V> &&
std::default_initializable<Pred> = default;  // (1) (desde C++20)
constexpr explicit filter_view( V base, Pred pred );  // (2) (desde C++20)
```

1) Inicializa por valor `_base__` através de seu inicializador de membro padrão (= V()) e inicializa por padrão `_pred__` (que inicializa por valor o `Pred` contido).

2) Inicializa `_base__` com std::move(base) e inicializa `_pred__` com std::move(pred).

### Parâmetros

- **base** — range a ser filtrado
- **pred** — predicado para filtrar elementos

## std::ranges::filter_view::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

1) Equivalente a return base_;.

2) Equivalente a return std::move(base_);.

## std::ranges::filter_view::pred

```cpp
constexpr const Pred& pred() const;  // (desde C++20)
```

Retorna uma referência ao objeto `Pred` contido. O comportamento é indefinido se `_pred__` não contiver um valor.

## std::ranges::filter_view::begin

```cpp
constexpr /*iterator*/ begin();  // (apenas para exposição*)
```

A fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), esta função armazena o resultado em cache dentro do objeto `filter_view` para uso em chamadas subsequentes. Equivalente a
```cpp
    if constexpr (!ranges::forward_range<V>)
        return /*iterator*/{*this, ranges::find_if(base_, std::ref(*pred_))};
    else
    {
        if (!begin_.has_value())
            begin_ = ranges::find_if(base_, std::ref(*pred_)); // armazenamento em cache
        return /*iterator*/{*this, begin_.value())};
    }
```

O comportamento é indefinido se `_pred__` não contiver um valor.

## std::ranges::filter_view::end

```cpp
constexpr auto end();  // (desde C++20)
```

Retorna um iterator para o fim. Equivalente a
```cpp
    if constexpr (ranges::common_range<V>)
        return /*iterator*/{*this, ranges::end(base_)};
    else
        return /*sentinel*/{*this};
```

### Guias de dedução

```cpp
template< class R, class Pred >
filter_view( R&&, Pred ) -> filter_view<views::all_t<R>, Pred>;  // (desde C++20)
```

### Classes aninhadas

[_iterator_](<#/doc/ranges/filter_view/iterator>) | o tipo de iterator de `filter_view`
(classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/filter_view/sentinel>) | o tipo de sentinela de `filter_view` quando a view subjacente não é um [`common_range`](<#/doc/ranges/common_range>)
(classe membro apenas para exposição*)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        auto even =  { return 0 == i % 2; };
        auto square =  { return i * i; };
     
        for (int i : std::views::iota(0, 6)
                   | std::views::filter(even)
                   | std::views::transform(square))
            std::cout << i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    0 4 16
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)
([P2711R1](<https://wg21.link/P2711R1>)) | C++20 | o construtor de múltiplos parâmetros não era explícito | tornou-se explícito
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | se `Pred` não é [`default_initializable`](<#/doc/concepts/default_initializable>), o construtor padrão
constrói uma `filter_view` que não contém um `Pred` | a `filter_view` também
não é [`default_initializable`](<#/doc/concepts/default_initializable>)

### Veja também

[ ranges::take_while_viewviews::take_while](<#/doc/ranges/take_while_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que consiste nos elementos iniciais de outra [`view`](<#/doc/ranges/view>), até o primeiro elemento para o qual um predicado retorna falso
(class template) (objeto adaptador de range)