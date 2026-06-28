# std::ranges::views::join_with, std::ranges::join_with_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V, ranges::forward_range Pattern >
requires ranges::view<V> &&
ranges::input_range<ranges::range_reference_t<V>> &&
ranges::view<Pattern> &&
/*concatable*/<ranges::range_reference_t<V>, Pattern>
class join_with_view :
ranges::view_interface<join_with_view<V, Pattern>>
namespace views {
inline constexpr /* unspecified */ join_with = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R, class Pattern >
requires /* see below */
constexpr ranges::view auto join_with( R&& r, Pattern&& pattern );
template< class Pattern >
constexpr /* range adaptor closure */ join_with( Pattern&& pattern );
```

1) Um adaptador de range que representa uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma view de ranges, com cada elemento do delimitador inserido entre os elementos da view. O delimitador pode ser um único elemento ou uma view de elementos.

Para a definição de /*concatable*/, veja [`std::ranges::concat_view`](<#/doc/ranges/concat_view>).

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::join_with(e, f) é [expression-equivalent](<#/doc/language/expressions>) a join_with_view(e, f) para quaisquer subexpressões e e f adequadas.

`join_with_view` modela [`input_range`](<#/doc/ranges/input_range>).

`join_with_view` modela [`forward_range`](<#/doc/ranges/forward_range>) quando:

  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é uma referência, e
  * `V` e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; cada um modela [`forward_range`](<#/doc/ranges/forward_range>).

`join_with_view` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) quando:

  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é uma referência,
  * `V`, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt;, e `Pattern` cada um modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), e
  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; e `Pattern` cada um modela [`common_range`](<#/doc/ranges/common_range>).

`join_with_view` modela [`common_range`](<#/doc/ranges/common_range>) quando:

  * [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; é uma referência, e
  * `V` e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt; cada um modela [`forward_range`](<#/doc/ranges/forward_range>) e [`common_range`](<#/doc/ranges/common_range>).

### Tipos aninhados

Tipo | Definição
---|---
`_InnerRng_` | [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;V&gt;
(tipo membro apenas para exposição*)

### Membros de dados

Membro | Definição
---|---
`V` `_base__` | a view subjacente (adaptada)
(objeto membro apenas para exposição*)
`Pattern` `_pattern__` | o objeto pattern
(objeto membro apenas para exposição*)
[`_non-propagating-cache_`](<#/doc/ranges/non-propagating-cache>) ﻿<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> `_outer_it__`
(presente apenas se `V` não modelar [`forward_range`](<#/doc/ranges/forward_range>)) | o cache do iterator externo
(objeto membro apenas para exposição*)
[`_non-propagating-cache_`](<#/doc/ranges/non-propagating-cache>) ﻿<[std::remove_cv_t](<#/doc/types/remove_cv>)<`_InnerRng_` ﻿>> `_inner__`
(presente apenas se [std::is_reference_v](<#/doc/types/is_reference>)<`_InnerRng_` ﻿> for false) | o cache do range interno
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/join_with_view/join_with_view>) | constrói uma `join_with_view`
(função membro pública)
[ base](<#/doc/ranges/join_with_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/join_with_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/join_with_view/end>) | retorna um iterator ou um sentinel para o fim
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
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/join_with_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/join_with_view/iterator>) | o tipo iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/join_with_view/sentinel>) | o tipo sentinel
(template de classe membro apenas para exposição*)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_join_with`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::join_with_view`

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
    
        std::vector v{"This"sv, "is"sv, "a"sv, "test."sv};
        auto joined = v | std::views::join_with(' ');
    
        for (auto c : joined)
            std::cout << c;
        std::cout << '\n';
    }
```

Saída:
```
    This is a test.
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 4074](<https://cplusplus.github.io/LWG/issue4074>) | C++23 | `join_with_view` estava sub-restrito | restrições atualizadas

### Veja também

[ ranges::join_viewviews::join](<#/doc/ranges/join_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma [`view`](<#/doc/ranges/view>) de [`range`s](<#/doc/ranges/range>)
(template de classe) (objeto adaptador de range)
[ ranges::concat_viewviews::concat](<#/doc/ranges/concat_view>)(C++26) | uma [`view`](<#/doc/ranges/view>) consistindo na concatenação das views adaptadas
(template de classe) (objeto de ponto de customização)