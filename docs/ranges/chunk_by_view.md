Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::forward_range V, std::indirect_binary_predicate<iterator_t<V>,
ranges::iterator_t<V>> Pred >
requires ranges::view<V> && std::is_object_v<Pred>
class chunk_by_view
: public ranges::view_interface<chunk_by_view<V, Pred>>
namespace views {
inline constexpr /* unspecified */ chunk_by = /* unspecified */ ;
}
Call signature
template< ranges::viewable_range R, class Pred >
requires /* see below */
constexpr ranges::view auto chunk_by( R&& r, Pred&& pred );
template< class Pred >
constexpr /*range adaptor closure*/ chunk_by( Pred&& pred );
```

1) `chunk_by_view` é um range adaptor que recebe uma [`view`](<#/doc/ranges/view>) e um objeto invocável pred (o predicado binário), e produz uma [`view`](<#/doc/ranges/view>) de sub-ranges (chunks), dividindo a view subjacente entre cada par de elementos adjacentes para os quais pred retorna false. O primeiro elemento de cada par pertence ao chunk anterior, e o segundo elemento pertence ao próximo chunk.

2) O nome views::chunk_by denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dada uma subexpressão e e f, a expressão views::chunk_by(e, f) é [expression-equivalent](<#/doc/language/expressions>) a chunk_by_view(e, f).

`chunk_by_view` sempre modela [`forward_range`](<#/doc/ranges/forward_range>), e modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e/ou [`common_range`](<#/doc/ranges/common_range>), se o tipo de [`view`](<#/doc/ranges/view>) adaptado modelar os concepts correspondentes. `chunk_by_view` nunca modela [`borrowed_range`](<#/doc/ranges/borrowed_range>) ou [`sized_range`](<#/doc/ranges/sized_range>).

### Membros de dados

Membro | Definição
---|---
`V` `_base__` | a [`view`](<#/doc/ranges/view>) subjacente
(objeto membro apenas para exposição*)
[`_movable-box_`](<#/doc/ranges/copyable_wrapper>)` _< Pred>_` `_pred__` | um objeto que encapsula o predicado usado para dividir os elementos de `_base__`
(objeto membro apenas para exposição*)
[`_non-propagating-cache_`](<#/doc/ranges/non-propagating-cache>)` _< iterator>_` `_begin__` | um objeto que armazena em cache o iterator para o primeiro elemento
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/chunk_by_view/chunk_by_view>) | constrói um `chunk_by_view`
(função membro pública)
[ base](<#/doc/ranges/chunk_by_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ pred](<#/doc/ranges/chunk_by_view/pred>) | retorna uma referência ao predicado armazenado
(função membro pública)
[ begin](<#/doc/ranges/chunk_by_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/chunk_by_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[__find_next__](<#/doc/ranges/chunk_by_view/helpers>) | retorna um iterator para o início do próximo sub-range
(função membro apenas para exposição*)
[__find_prev__](<#/doc/ranges/chunk_by_view/helpers>) | retorna um iterator para o início do sub-range anterior
(função membro apenas para exposição*)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfizer [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/chunk_by_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/chunk_by_view/iterator>) | o tipo do iterator
(template de classe membro apenas para exposição*)

### Notas

A fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), o resultado de [`begin()`](<#/doc/ranges/chunk_by_view/begin>) é armazenado em cache dentro do objeto `chunk_by_view`. Se o range subjacente for modificado após a primeira chamada a [`begin()`](<#/doc/ranges/chunk_by_view/begin>), usos subsequentes do objeto `chunk_by_view` podem ter um comportamento não intuitivo.

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_chunk_by`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::chunk_by_view`

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    void print_chunks(auto view, std::string_view separator = ", ")
    {
        for (auto const subrange : view)
        {
            std::cout << '[';
            for (std::string_view prefix; auto const& elem : subrange)
                std::cout << prefix << elem, prefix = separator;
            std::cout << "] ";
        }
        std::cout << '\n';
    }
    
    int main()
    {
        std::initializer_list v1 = {1, 2, 3, 1, 2, 3, 3, 3, 1, 2, 3};
        auto fn1 = std::ranges::less{};
        auto view1 = v1 | std::views::chunk_by(fn1);
        print_chunks(view1);
    
        std::initializer_list v2 = {1, 2, 3, 4, 4, 0, 2, 3, 3, 3, 2, 1};
        auto fn2 = std::ranges::not_equal_to{};
        auto view2 = v2 | std::views::chunk_by(fn2);
        print_chunks(view2);
    
        std::string_view v3 = "__cpp_lib_ranges_chunk_by";
        auto fn3 =  { return not(x == '_' or y == '_'); };
        auto view3 = v3 | std::views::chunk_by(fn3);
        print_chunks(view3, "");
    
        std::string_view v4 = "\u007a\u00df\u6c34\u{1f34c}"; // "zß水🍌"
        auto fn4 =  { return 128 == ((128 + 64) & ß); };
        auto view4 = v4 | std::views::chunk_by(fn4);
        print_chunks(view4, "");
    }
```

Saída:
```
    [1, 2, 3] [1, 2, 3] [3] [3] [1, 2, 3] 
    [1, 2, 3, 4] [4, 0, 2, 3] [3] [3, 2, 1] 
    [_] [_] [cpp] [_] [lib] [_] [ranges] [_] [chunk] [_] [by]
    [z] [ß] [水] [🍌]
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 26.7.30 Chunk by view [range.chunk.by]

### Veja também

[ ranges::chunk_viewviews::chunk](<#/doc/ranges/chunk_view>)(C++23) | um range de [`view`s](<#/doc/ranges/view>) que são chunks sucessivos não sobrepostos de tamanho `N` dos elementos de outra [`view`](<#/doc/ranges/view>)
(template de classe) (objeto adaptador de range)
[ ranges::slide_viewviews::slide](<#/doc/ranges/slide_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) cujo M-ésimo elemento é uma [`view`](<#/doc/ranges/view>) sobre os elementos do M-ésimo ao (M + N - 1)-ésimo de outra [`view`](<#/doc/ranges/view>)
(template de classe) (objeto adaptador de range)
[ ranges::stride_viewviews::stride](<#/doc/ranges/stride_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de elementos de outra [`view`](<#/doc/ranges/view>), avançando `N` elementos por vez
(template de classe) (objeto adaptador de range)