# std::ranges::views::take_while, std::ranges::take_while_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V, class Pred >
requires ranges::input_range<V> &&
std::is_object_v<Pred> &&
std::indirect_unary_predicate<const Pred, ranges::iterator_t<V>>
class take_while_view
: public ranges::view_interface<take_while_view<V, Pred>>
namespace views {
inline constexpr /*unspecified*/ take_while = /*unspecified*/;
}
Assinatura da chamada
template< ranges::viewable_range R, class Pred >
requires /* veja abaixo */
constexpr ranges::view auto take_while( R&& r, Pred&& pred );
template< class Pred >
constexpr /*range adaptor closure*/ take_while( Pred&& pred );
```

1) Um adaptador de range que representa uma [`view`](<#/doc/ranges/view>) dos elementos de uma sequência subjacente, começando no início e terminando no primeiro elemento para o qual o predicado retorna falso.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::take_while(e, f) é [expression-equivalent](<#/doc/language/expressions>) a take_while_view(e, f) para quaisquer subexpressões e e f adequadas.

`take_while_view` modela os concepts [`contiguous_range`](<#/doc/ranges/contiguous_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), e [`input_range`](<#/doc/ranges/input_range>) quando a view subjacente `V` modela os respectivos concepts.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (private) | a [`view`](<#/doc/ranges/view>) subjacente do tipo `V` (objeto membro apenas para exposição*)
`_pred__` (private) | o objeto de função subjacente do tipo [`_copyable-box_`](<#/doc/ranges/copyable_wrapper>)`<Pred>`(até C++23)[`_movable-box_`](<#/doc/ranges/copyable_wrapper>)`<Pred>`(desde C++23) (objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/take_while_view/take_while_view>) | constrói uma `take_while_view`
(função membro pública)
[ base](<#/doc/ranges/take_while_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ pred](<#/doc/ranges/take_while_view/pred>) | retorna uma referência ao predicado armazenado
(função membro pública)
[ begin](<#/doc/ranges/take_while_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/take_while_view/end>) | retorna um sentinel representando o fim
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ data](<#/doc/ranges/view_interface/data>) | obtém o endereço dos dados da view derivada. Fornecido se seu tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/take_while_view/deduction_guides>)

### Classes aninhadas

[_sentinel_](<#/doc/ranges/take_while_view/sentinel>) | o tipo sentinel
(template de classe membro apenas para exposição*)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        for (int year : std::views::iota(2020)
                      | std::views::take_while({ return y < 2026; }))
            std::cout << year << ' ';
        std::cout << '\n';
    
        const char note[]{"Today is yesterday's tomorrow!..."};
        auto not_dot = { return c != '.'; };
        for (char x : std::ranges::take_while_view(note, not_dot))
            std::cout << x;
        std::cout << '\n';
    }
```

Saída:
```
    2020 2021 2022 2023 2024 2025
    Today is yesterday's tomorrow!
```

### Veja também

[ ranges::take_viewviews::take](<#/doc/ranges/take_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo nos primeiros N elementos de outra [`view`](<#/doc/ranges/view>)
(template de classe) (objeto adaptador de range)
[ ranges::drop_while_viewviews::drop_while](<#/doc/ranges/drop_while_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo nos elementos de outra [`view`](<#/doc/ranges/view>), pulando a subsequência inicial de elementos até o primeiro elemento onde o predicado retorna falso
(template de classe) (objeto adaptador de range)