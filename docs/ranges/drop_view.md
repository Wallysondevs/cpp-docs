# std::ranges::views::drop, std::ranges::drop_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
class drop_view
: public ranges::view_interface<drop_view<V>>
namespace views {
inline constexpr /* unspecified */ drop = /* unspecified */;
}
Call signature
template< ranges::viewable_range R >
requires /* see below */
constexpr ranges::view auto
drop( R&& r, ranges::range_difference_t<R> count );
template< class DifferenceType >
constexpr /* range adaptor closure */ drop( DifferenceType&& count );
```

1) Um adaptador de range que consiste em elementos da sequência subjacente, pulando os primeiros _N_ elementos.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dado que `T` é [std::remove_cvref_t](<#/doc/types/remove_cvref>)<decltype((e))> e `D` é [ranges::range_difference_t](<#/doc/ranges/range_size_t>)<decltype((e))>), a expressão views::drop(e, f) é [expression-equivalent](<#/doc/language/expressions>) a:

  * ((void)f,` `[` _decay-copy_`](<#/doc/standard_library/decay-copy>)(e)), se `T` for um [`ranges::empty_view`](<#/doc/ranges/empty_view>), exceto que as avaliações de e e f são sequenciadas de forma indeterminada;
  * caso contrário, T([ranges::begin](<#/doc/ranges/begin>)(e) + inc, [ranges::end](<#/doc/ranges/end>)(e), /*to-unsigned-like*/([ranges::distance](<#/doc/iterator/ranges/distance>)(e) - inc)), se `T` for uma especialização de [ranges::subrange](<#/doc/ranges/subrange>) que modela tanto [`random_access_range`](<#/doc/ranges/random_access_range>) quanto [`sized_range`](<#/doc/ranges/sized_range>), e `T` precisar armazenar o tamanho (veja [`ranges::subrange::subrange()`](<#/doc/ranges/subrange/subrange>) para detalhes), onde inc é [std::min](<#/doc/algorithm/min>)&lt;D&gt;([ranges::distance](<#/doc/iterator/ranges/distance>)(e), f);
  * caso contrário, U([ranges::begin](<#/doc/ranges/begin>)(e) + inc, [ranges::end](<#/doc/ranges/end>)(e)), se `T` for uma especialização de [std::span](<#/doc/container/span>), [std::basic_string_view](<#/doc/string/basic_string_view>), [ranges::iota_view](<#/doc/ranges/iota_view>), ou [ranges::subrange](<#/doc/ranges/subrange>) que modela tanto [`random_access_range`](<#/doc/ranges/random_access_range>) quanto [`sized_range`](<#/doc/ranges/sized_range>), onde `U` é

    

  * [std::span](<#/doc/container/span>)&lt;typename T::element_type&gt;, se `T` for uma especialização de [std::span](<#/doc/container/span>);
  * `T` caso contrário;

  * caso contrário, se `T` for uma especialização de [`ranges::repeat_view`](<#/doc/ranges/repeat_view>):

    

  * [views::repeat](<#/doc/ranges/repeat_view>)(*e.value_, [ranges::distance](<#/doc/iterator/ranges/distance>)(e) - inc), se `T` modelar [`sized_range`](<#/doc/ranges/sized_range>); neste caso, e é avaliado apenas uma vez;
  * ((void)e, auto(f)) caso contrário, exceto que as avaliações de e e f são sequenciadas de forma indeterminada;

| (desde C++23)

  * caso contrário, drop_view(e, f).

Em todos os casos, decltype((f)) deve modelar [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;D&gt;.

`drop_view` modela os concepts [`contiguous_range`](<#/doc/ranges/contiguous_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), [`common_range`](<#/doc/ranges/common_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando o view subjacente `V` modela os concepts respectivos.

### Data members

Nome do membro | Definição
---|---
`_base__` (privado) | o [`view`](<#/doc/ranges/view>) subjacente (adaptado) do tipo `V`
(objeto membro apenas para exposição*)
`_count__` (privado) | o número de elementos a pular, do tipo [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;
(objeto membro apenas para exposição*)
`_cache__` (privado)
(presente condicionalmente) | TODO: mencionar L4$
(objeto membro apenas para exposição*)

### Member functions

[ (construtor)](<#/doc/ranges/drop_view/drop_view>) | constrói um `drop_view`
(função membro pública)
[ base](<#/doc/ranges/drop_view/base>) | retorna uma cópia do view subjacente (adaptado)
(função membro pública)
[ begin](<#/doc/ranges/drop_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/drop_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/drop_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfizer [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se o view derivado está vazio. Fornecido se ele satisfizer [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ data](<#/doc/ranges/view_interface/data>) | obtém o endereço dos dados do view derivado. Fornecido se seu tipo de iterator satisfizer [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se ele satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se ele satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se ele satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Deduction guides](<#/doc/ranges/drop_view/deduction_guides>)

### Helper templates

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::drop_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

Esta especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `drop_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando o view subjacente o satisfaz.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        const auto nums = {1, 2, 3, 4, 5, 6, 7};
    
        std::cout << "drop " << 2 << ": ";
        for (int i : std::ranges::drop_view{nums, 2})
            std::cout << i << ' ';
        std::cout << '\n';
    
        std::cout << "drop " << 3 << ": ";
        for (int i : nums | std::views::drop(3))
            std::cout << i << ' ';
        std::cout << '\n';
    
        std::cout << "drop " << 4 << ": ";
        for (int i : std::views::iota(1, 8) | std::views::drop(4))
            std::cout << i << ' ';
        std::cout << '\n';
    
        // Note that dropping more than the number of elements is OK:
        for (int dp : {5, 6, 7, 890, 100500})
        {
            std::cout << "drop " << dp << ": ";
            for (int i : std::views::iota(1, 8) | std::views::drop(dp))
                std::cout << i << ' ';
            std::cout << '\n';
        }
    }
```

Saída:
```
    drop 2: 3 4 5 6 7
    drop 3: 4 5 6 7
    drop 4: 5 6 7
    drop 5: 6 7
    drop 6: 7
    drop 7:
    drop 890: 
    drop 100500:
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3407](<https://cplusplus.github.io/LWG/issue3407>) | C++20 | `views::drop` às vezes falha ao construir um random access range dimensionado | a construção é ajustada para que seja sempre válida
[LWG 3494](<https://cplusplus.github.io/LWG/issue3494>) | C++20 | `drop_view` nunca foi um `borrowed_range` | é um `borrowed_range` se seu view subjacente for

### Veja também

[ ranges::drop_while_viewviews::drop_while](<#/doc/ranges/drop_while_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste nos elementos de outro [`view`](<#/doc/ranges/view>), pulando a subsequência inicial de elementos até o primeiro elemento onde o predicado retorna falso
(class template) (objeto adaptador de range)