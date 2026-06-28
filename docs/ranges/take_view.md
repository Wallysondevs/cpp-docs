# std::ranges::views::take, std::ranges::take_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
class take_view
: public ranges::view_interface<take_view<V>>
namespace views {
inline constexpr /* não especificado */ take = /* não especificado */;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* veja abaixo */
constexpr ranges::view auto
take( R&& r, ranges::range_difference_t<R> count );
template< class DifferenceType >
constexpr /* fechamento de adaptador de range */ take( DifferenceType&& count );
```

1) Um adaptador de range que representa um [`view`](<#/doc/ranges/view>) dos elementos de uma sequência subjacente, começando no início e terminando em um limite dado.

2) `views::take` é um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::take(e, f) resulta em um view que representa os primeiros f elementos de e. O resultado não é necessariamente um `take_view`.

views::take(e, f) é [expression-equivalent](<#/doc/language/expressions>) a (onde `T` é [std::remove_cvref_t](<#/doc/types/remove_cvref>)<decltype((e))> e `D` é [ranges::range_difference_t](<#/doc/ranges/range_size_t>)<decltype((e))>):

*   ((void)f,` `[` _decay-copy_`](<#/doc/standard_library/decay-copy>)(e)), se `T` é um [ranges::empty_view](<#/doc/ranges/empty_view>), exceto que as avaliações de e e f são sequenciadas de forma indeterminada;
*   U([ranges::begin](<#/doc/ranges/begin>)(e), [ranges::begin](<#/doc/ranges/begin>)(e) + [std::min](<#/doc/algorithm/min>)&lt;D&gt;([ranges::distance](<#/doc/iterator/ranges/distance>)(e), f)), se `T` é uma especialização de [std::span](<#/doc/container/span>), [std::basic_string_view](<#/doc/string/basic_string_view>), ou [ranges::subrange](<#/doc/ranges/subrange>) que modela ambos [`random_access_range`](<#/doc/ranges/random_access_range>) e [`sized_range`](<#/doc/ranges/sized_range>), onde `U` é

    *   [std::span](<#/doc/container/span>)<typename T::element_type>, se `T` é uma especialização de [std::span](<#/doc/container/span>);
    *   `T`, se `T` é uma especialização de [std::basic_string_view](<#/doc/string/basic_string_view>);
    *   [ranges::subrange](<#/doc/ranges/subrange>)<[ranges::iterator_t](<#/doc/ranges/iterator_t>)<T>>, se `T` é uma especialização de [ranges::subrange](<#/doc/ranges/subrange>);

*   [ranges::iota_view](<#/doc/ranges/iota_view>)(*[ranges::begin](<#/doc/ranges/begin>)(e),
    *([ranges::begin](<#/doc/ranges/begin>)(e) + [std::min](<#/doc/algorithm/min>)<D>([ranges::distance](<#/doc/iterator/ranges/distance>)(e), f))), se `T` é uma especialização de [ranges::iota_view](<#/doc/ranges/iota_view>) que modela ambos [`random_access_range`](<#/doc/ranges/random_access_range>) e [`sized_range`](<#/doc/ranges/sized_range>);

*   caso contrário, se `T` é uma especialização de [`ranges::repeat_view`](<#/doc/ranges/repeat_view>):

    *   [views::repeat](<#/doc/ranges/repeat_view>)(*e.value_, [std::min](<#/doc/algorithm/min>)<D>([ranges::distance](<#/doc/iterator/ranges/distance>)(e), f)), se `T` modela [`sized_range`](<#/doc/ranges/sized_range>); neste caso, e é avaliado apenas uma vez;
    *   [views::repeat](<#/doc/ranges/repeat_view>)(*e.value_, static_cast<D>(e)) caso contrário;

| (desde C++23)

*   caso contrário, take_view(e, f).

Em todos os casos, decltype((f)) deve modelar [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;D&gt;.

`take_view` modela os concepts [`contiguous_range`](<#/doc/ranges/contiguous_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando o view subjacente `V` modela os concepts respectivos. Ele modela [`common_range`](<#/doc/ranges/common_range>) quando o view subjacente `V` modela ambos [`random_access_range`](<#/doc/ranges/random_access_range>) e [`sized_range`](<#/doc/ranges/sized_range>).

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (private) | o [`view`](<#/doc/ranges/view>) subjacente do tipo `V`
(objeto membro apenas para exposição*)
`_count__` (private) | o número de elementos a serem pegos, do tipo [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/ranges/take_view/take_view>) | constrói um `take_view`
(função membro pública)
[ base](<#/doc/ranges/take_view/base>) | retorna uma cópia do view subjacente (adaptado)
(função membro pública)
[ begin](<#/doc/ranges/take_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/take_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/take_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se o view derivado está vazio. Fornecido se ele satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ data](<#/doc/ranges/view_interface/data>) | obtém o endereço dos dados do view derivado. Fornecido se seu tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se ele satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se ele satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se ele satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/take_view/deduction_guides>)

### Classes aninhadas

[_sentinel_](<#/doc/ranges/take_view/sentinel>)(C++20) | o tipo sentinel
(template de classe membro apenas para exposição*)

### Templates auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::take_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

Esta especialização de [`std::ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `take_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando o view subjacente o satisfaz.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        namespace views = std::views;
        auto print = { std::cout << x; };
    
        for (const char nums[]{'1', '2', '3'};
             int n : views::iota(0, 5))
        {
            std::cout << "take(" << n << "): ";
            // pega com segurança apenas até min(n, nums.size()) elementos:
            std::ranges::for_each(nums | views::take(n), print);
            std::cout << '\n';
        }
    }
```

Saída:
```
    take(0): 
    take(1): 1
    take(2): 12
    take(3): 123
    take(4): 123
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3407](<https://cplusplus.github.io/LWG/issue3407>) | C++20 | `views::take` às vezes falhava ao
construir um sized random access range | o tipo de resultado é ajustado para que
a construção seja sempre válida
[LWG 3494](<https://cplusplus.github.io/LWG/issue3494>) | C++20 | `take_view` nunca foi um `borrowed_range` | ele é um `borrowed_range` se seu view subjacente for

### Veja também

[ views::counted](<#/doc/ranges/counted_view>)(C++20) | cria um subrange a partir de um iterator e uma contagem
(objeto de ponto de customização)
[ ranges::take_while_viewviews::take_while](<#/doc/ranges/take_while_view>)(C++20) | um [`view`](<#/doc/ranges/view>) consistindo dos elementos iniciais de outro [`view`](<#/doc/ranges/view>), até o primeiro elemento para o qual um predicado retorna falso
(template de classe) (objeto adaptador de range)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(objeto de função de algoritmo)