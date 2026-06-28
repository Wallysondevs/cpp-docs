# std::ranges::views::join, std::ranges::join_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V >
requires ranges::view<V> and
ranges::input_range<ranges::range_reference_t<V>>
class join_view
: public ranges::view_interface<join_view<V>>
namespace views {
inline constexpr /* unspecified */ join = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* veja abaixo */
constexpr ranges::view auto join( R&& r );
```

1) Um adaptador de range que representa uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma view de ranges.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) (e também [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>)). A expressão views::join(e) é [expressão-equivalente](<#/doc/language/expressions>) a join_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>>{e} para quaisquer subexpressões e adequadas.

`join_view` modela [`input_range`](<#/doc/ranges/input_range>).

`join_view` modela [`forward_range`](<#/doc/ranges/forward_range>) quando:

  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é um tipo de referência, e
  * V e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; cada um modela [`forward_range`](<#/doc/ranges/forward_range>).

`join_view` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) quando:

  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é um tipo de referência,
  * V modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), e
  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; modela tanto [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) quanto [`common_range`](<#/doc/ranges/common_range>).

`join_view` modela [`common_range`](<#/doc/ranges/common_range>) quando:

  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é um tipo de referência, e
  * V e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; cada um modela [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>).

### Funções membro

[ (construtor)](<#/doc/ranges/join_view/join_view>) | constrói uma `join_view`
(função membro pública)
[ base](<#/doc/ranges/join_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/join_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/join_view/end>) | retorna um iterator ou uma sentinela para o fim
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

### [Guias de dedução](<#/doc/ranges/join_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/join_view/iterator>) | o tipo do iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/join_view/sentinel>) | o tipo da sentinela
(template de classe membro apenas para exposição*)

### Notas

Antes da adoção de [P2328R1](<https://wg21.link/P2328R1>), o tipo de range interno ([ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt;) não podia ser um tipo de container (mas podia ser uma referência a um container). Por exemplo, não era permitido juntar uma [`transform_view`](<#/doc/ranges/transform_view>) de um prvalue [std::string](<#/doc/string/basic_string>).
```cpp
    struct Person { int age; std::string name; };
    
    auto f(std::vector<Person>& v) {
    //  return v | std::views::transform({ return p.name; })
    //           | std::views::join; // erro antes de P2328R1
        return v | std::views::transform( -> std::string& { return p.name; })
                 | std::views::join; // OK
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <vector>
    
    int main()
    {
        using namespace std::literals;
    
        const auto bits = {"https:"sv, "//"sv, "cppreference"sv, "."sv, "com"sv};
        for (char const c : bits | std::views::join)
            std::cout << c;
        std::cout << '\n';
    
        const std::vector<std::vector<int>> v{{1, 2}, {3, 4, 5}, {6}, {7, 8, 9}};
        auto jv = std::ranges::join_view(v);
        for (int const e : jv)
            std::cout << e << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    https://cppreference.com
    1 2 3 4 5 6 7 8 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3474](<https://cplusplus.github.io/LWG/issue3474>) | C++20 | views::join(e) retornava uma cópia de e quando e era uma `join_view` | retorna uma `join_view` aninhada
[P2328R1](<https://wg21.link/P2328R1>) | C++20 | prvalues de [`range`](<#/doc/ranges/range>) que não eram views não podiam ser unidos por `join_view` | tornados uníveis

### Veja também

[ ranges::join_with_viewviews::join_with](<#/doc/ranges/join_with_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma view de ranges, com o delimitador entre os elementos
(template de classe) (objeto adaptador de range)
[ ranges::concat_viewviews::concat](<#/doc/ranges/concat_view>)(C++26) | uma [`view`](<#/doc/ranges/view>) consistindo na concatenação das views adaptadas
(template de classe) (objeto de ponto de customização)