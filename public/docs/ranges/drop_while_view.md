# std::ranges::views::drop_while, std::ranges::drop_while_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V, class Pred >
requires ranges::input_range<V> &&
std::is_object_v<Pred> &&
std::indirect_unary_predicate<const Pred, ranges::iterator_t<V>>
class drop_while_view
: public ranges::view_interface<drop_while_view<V, Pred>>
namespace views {
inline constexpr /* unspecified */ drop_while = /* unspecified */;
}
Call signature
template< ranges::viewable_range R, class Pred >
requires /* see below */
constexpr ranges::view auto drop_while( R&& r, Pred&& pred );
template< class Pred >
constexpr /*range adaptor closure*/ drop_while( Pred&& pred );
```

1) Um adaptador de range que representa uma [`view`](<#/doc/ranges/view>) de elementos de uma sequência subjacente, começando no primeiro elemento para o qual o predicado retorna falso.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::drop_while(e, f) é [expressão-equivalente](<#/doc/language/expressions>) a drop_while_view(e, f) para quaisquer subexpressões e e f adequadas.

drop_while_view modela os concepts [`contiguous_range`](<#/doc/ranges/contiguous_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), e [`common_range`](<#/doc/ranges/common_range>) quando a view subjacente V modela os concepts respectivos. Ele também modela [`sized_range`](<#/doc/ranges/sized_range>) se [ranges::forward_range](<#/doc/ranges/forward_range>)&lt;V&gt; e [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt;, [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> forem modelados.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (private) | a [`view`](<#/doc/ranges/view>) subjacente do tipo `V`
(objeto membro apenas para exposição*)
`_pred__` (private) | o objeto de função subjacente do tipo [`_copyable-box_`](<#/doc/ranges/copyable_wrapper>)`<Pred>`(até C++23)[`_movable-box_`](<#/doc/ranges/copyable_wrapper>)`<Pred>`(desde C++23)
(objeto membro apenas para exposição*)
`_cache__` (private)
(condicionalmente presente) | TODO: mencionar L4$, veja [notas](<#/doc/ranges/drop_while_view>).
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/drop_while_view/drop_while_view>) | constrói um `drop_while_view`
(função membro pública)
[ base](<#/doc/ranges/drop_while_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ pred](<#/doc/ranges/drop_while_view/pred>) | retorna uma referência ao predicado armazenado
(função membro pública)
[ begin](<#/doc/ranges/drop_while_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/drop_while_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se ela satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ data](<#/doc/ranges/view_interface/data>) | obtém o endereço dos dados da view derivada. Fornecido se seu tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).
(função membro pública de `std::ranges::view_interface<D>`)
[ size](<#/doc/ranges/view_interface/size>) | retorna o número de elementos na view derivada. Fornecido se ela satisfaz [`forward_range`](<#/doc/ranges/forward_range>) e seus tipos de sentinel e iterator satisfazem [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>).
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se ela satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se ela satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se ela satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/drop_while_view/deduction_guides>)

### Templates auxiliares

```cpp
template< class T, class Pred >
constexpr bool enable_borrowed_range<std::ranges::drop_while_view<T, Pred>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

Esta especialização de std::[ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `drop_while_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente o satisfaz.

### Notas

A fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), o resultado de [`begin`](<#/doc/ranges/drop_while_view/begin>) é armazenado em cache dentro do objeto `drop_while_view`. Se o range subjacente for modificado após a primeira chamada a begin(), usos subsequentes do objeto `drop_while_view` podem ter um comportamento não intuitivo.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <string_view>
    
    using std::operator""sv;
    
    [[nodiscard]]
    constexpr bool is_space(char p) noexcept
    {
        auto ne = p { return p != q; };
        return !!(" \t\n\v\r\f" | std::views::drop_while(ne));
    };
    
    [[nodiscard("trims the output")]]
    constexpr std::string_view trim_left(std::string_view const in) noexcept
    {
        auto view = in | std::views::drop_while(is_space);
        return {view.begin(), view.end()};
    }
    
    [[nodiscard("trims the output")]]
    constexpr std::string trim(std::string_view const in)
    {
        auto view = in
                  | std::views::drop_while(is_space)
                  | std::views::reverse
                  | std::views::drop_while(is_space)
                  | std::views::reverse
                  ;
        return {view.begin(), view.end()};
    }
    
    int main()
    {
        static_assert(trim_left(" \n C++23") == "C++23"sv);
    
        constexpr auto src{" \f\n\t\r\vHello, C++20!\f\n\t\r\v "sv};
        static_assert(trim(src) == "Hello, C++20!");
    
        static constexpr auto v = {0, 1, 2, 3, 4, 5};
        for (int n : v | std::views::drop_while( { return i < 3; }))
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    3 4 5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3494](<https://cplusplus.github.io/LWG/issue3494>) | C++20 | `drop_while_view` nunca foi um `borrowed_range` | é um `borrowed_range` se sua view subjacente for

### Veja também

[ ranges::drop_viewviews::drop](<#/doc/ranges/drop_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo de elementos de outra [`view`](<#/doc/ranges/view>), pulando os primeiros N elementos
(template de classe) (objeto adaptador de range)