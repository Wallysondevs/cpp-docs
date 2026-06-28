# std::ranges::views::split, std::ranges::split_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::forward_range V, ranges::forward_range Pattern >
requires ranges::view<V> &&
ranges::view<Pattern> &&
std::indirectly_comparable<ranges::iterator_t<V>,
ranges::iterator_t<Pattern>,
ranges::equal_to>
class split_view
: public ranges::view_interface<split_view<V, Pattern>>
namespace views {
inline constexpr /* unspecified */ split = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R, class Pattern >
requires /* see below */
constexpr ranges::view auto split( R&& r, Pattern&& pattern );
template< class Pattern >
constexpr /* range adaptor closure */ split( Pattern&& pattern );
```

1) `split_view` recebe uma [`view`](<#/doc/ranges/view>) e um delimitador, e divide a [`view`](<#/doc/ranges/view>) em sub-ranges com base no delimitador.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::split(e, p) é [expression-equivalent](<#/doc/language/expressions>) a split_view(e, p) para quaisquer subexpressões e e p adequadas.

`split_view` modela os concepts [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>) quando a [`view`](<#/doc/ranges/view>) subjacente `V` modela os respectivos concepts.

O range interno ([ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<split_view>) é um [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>, que modela [`common_range`](<#/doc/ranges/common_range>), modela [`sized_range`](<#/doc/ranges/sized_range>) quando [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt; modela [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>, e modela [`contiguous_range`](<#/doc/ranges/contiguous_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`forward_range`](<#/doc/ranges/forward_range>) quando `V` modela os respectivos concepts.

Ao contrário de [`lazy_split_view`](<#/doc/ranges/lazy_split_view>), `split_view` mantém a continuidade do sub-range, tornando-o adequado para divisão de strings.

### Membros de dados

Membro | Descrição
---|---
`V` `_base__` (private) | a [`view`](<#/doc/ranges/view>) subjacente (adaptada)
(objeto membro apenas para exposição*)
`Pattern` `_pattern__` (private) | o objeto pattern que é usado como delimitador para dividir a [`view`](<#/doc/ranges/view>) subjacente
(objeto membro apenas para exposição*)
[`_non-propagating-cache_`](<#/doc/ranges/non-propagating-cache>) <[ranges::subrange](<#/doc/ranges/subrange>)
` `<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;>> `_cached_begin__` (private) | um objeto que armazena em cache o resultado da primeira chamada a [`begin()`](<#/doc/ranges/split_view/begin>)
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/ranges/split_view/split_view>) | constrói uma `split_view`
(função membro pública)
[ base](<#/doc/ranges/split_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/split_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/split_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[_find_next_](<#/doc/ranges/split_view/find_next>) | procura pela próxima ocorrência do pattern
(função membro apenas para exposição*)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### Classes aninhadas

[_iterator_](<#/doc/ranges/split_view/iterator>) | o tipo do iterator
(classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/split_view/sentinel>) | o tipo do sentinel
(classe membro apenas para exposição*)

### [Guias de dedução](<#/doc/ranges/split_view/deduction_guides>)

### Notas

Antes de [P2210R2](<https://wg21.link/P2210R2>), `split_view` usava um mecanismo _lazy_ para divisão, e, portanto, não conseguia manter as propriedades bidirecionais, de acesso aleatório ou contíguas da view subjacente, nem tornar o tipo de iterator do range interno o mesmo da view subjacente. Consequentemente, foi redesenhado por [P2210R2](<https://wg21.link/P2210R2>), e o mecanismo lazy foi movido para [`lazy_split_view`](<#/doc/ranges/lazy_split_view>).

O `pattern` delimitador geralmente não deve ser um literal de string comum, pois ele considerará o terminador nulo como parte necessária do delimitador; portanto, é aconselhável usar um literal `std::string_view` em vez disso.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        using std::operator""sv;
        constexpr auto words{"Hello^_^C++^_^20^_^!"sv};
        constexpr auto delim{"^_^"sv};
    
        for (const auto word : std::views::split(words, delim))
            // with string_view's C++23 range constructor:
            std::cout << std::quoted(std::string_view(word)) << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    "Hello" "C++" "20" "!"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2210R2](<https://wg21.link/P2210R2>) | C++20 | a antiga `split_view` era muito lazy para ser facilmente usada | foi redesenhada

### Veja também

[ ranges::lazy_split_viewviews::lazy_split](<#/doc/ranges/lazy_split_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) sobre os sub-ranges obtidos da divisão de outra [`view`](<#/doc/ranges/view>) usando um delimitador
(class template) (range adaptor object)
[ ranges::join_viewviews::join](<#/doc/ranges/join_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que consiste na sequência obtida ao achatar uma [`view`](<#/doc/ranges/view>) de [`range`s](<#/doc/ranges/range>)
(class template) (range adaptor object)