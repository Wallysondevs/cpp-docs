# std::ranges::views::slide, std::ranges::slide_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::forward_range V >
requires ranges::view<V>
class slide_view
: public ranges::view_interface<slide_view<V>>
namespace views {
inline constexpr /* unspecified */ slide = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
constexpr ranges::view auto slide( R&& r, ranges::range_difference_t<R> n );
template< class DifferenceType >
constexpr /* range adaptor object */ slide( DifferenceType&& n );
Conceitos auxiliares
template< class V >
concept /*slide-caches-nothing*/ =
ranges::random_access_range<V> && ranges::sized_range<V>;
template< class V >
concept /*slide-caches-last*/ =
!/*slide-caches-nothing*/<V> &&
ranges::bidirectional_range<V> && ranges::common_range<V>;
template< class V >
concept /*slide-caches-first*/ =
!/*slide-caches-nothing*/<V> && !/*slide-caches-last*/<V>;
```

1) `slide_view` é um range adaptor que recebe uma [`view`](<#/doc/ranges/view>) e um número n e produz uma view cujo `_m_-ésimo` elemento (uma "janela") é uma view sobre os elementos do `_m_-ésimo` ao `_(m + n - 1)_-ésimo` da view original.

Seja s o tamanho da view original. Então o tamanho da view produzida é:

*   s - n + 1, se s >= n,
*   0 caso contrário, e a view resultante é vazia.

2) O nome views::slide denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dadas as subexpressões e e n, a expressão views::slide(e, n) é [expression-equivalent](<#/doc/language/expressions>) a slide_view(e, n).

Se n não for maior que 0, o comportamento é indefinido.

`slide_view` sempre modela [`forward_range`](<#/doc/ranges/forward_range>), e modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), ou [`sized_range`](<#/doc/ranges/sized_range>) se o tipo [`view`](<#/doc/ranges/view>) adaptado modelar o conceito correspondente.

### Membros de dados

Objeto membro | Definição
---|---
`_base__` (privado) | A [`view`](<#/doc/ranges/view>) subjacente do tipo `V`.
(objeto membro apenas para exposição*)
`_n__` (privado) | O "tamanho da janela" do tipo [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;.
(objeto membro apenas para exposição*)
`_cached_begin__` (privado)
(presente apenas se `V` modelar o `_[slide-caches-first](<#/doc/ranges/slide_view>)_`) | Um objeto [optional-like](<#/doc/ranges>).
(objeto membro apenas para exposição*)
`_cached_end__` (privado)
(presente apenas se `V` modelar o `_[slide-caches-last](<#/doc/ranges/slide_view>)_`) | Um objeto [optional-like](<#/doc/ranges>).
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/slide_view/slide_view>) | constrói uma `slide_view`
(função membro pública)
[ begin](<#/doc/ranges/slide_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/slide_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/slide_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfizer [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

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
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/slide_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/slide_view/iterator>)(C++23) | o tipo de iterator
(classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/slide_view/sentinel>)(C++23) | o tipo de sentinel usado quando `slide_view` não é um [`common_range`](<#/doc/ranges/common_range>)
(classe membro apenas para exposição*)

### Templates auxiliares

```cpp
template< class V >
constexpr bool ranges::enable_borrowed_range<slide_view<V>> =
ranges::enable_borrowed_range<V>;  // (desde C++23)
```

Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `slide_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente o satisfaz.

### Notas

Existem semelhanças entre ranges::adjacent_view e ranges::slide_view:

*   Ambos criam uma "janela deslizante" de tamanho `_N_`.
*   Ambos têm o mesmo tamanho `_S - N + 1_`, onde `_S_` é o tamanho de uma [`view`](<#/doc/ranges/view>) adaptada tal que `_S >= N > 0_`.

A tabela a seguir mostra as diferenças entre esses adaptadores:

Adaptador de view | `value_type` | O tamanho da janela `_N_`
---|---|---
[ranges::adjacent_view](<#/doc/ranges/adjacent_view>) | [std::tuple](<#/doc/utility/tuple>) | Um parâmetro de template
ranges::slide_view | [ranges::range](<#/doc/ranges/range>) | Um argumento em tempo de execução
Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
[`__cpp_lib_ranges_slide`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::slide_view`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    
    auto print_subrange =  auto&& r)
    {
        std::cout << '[';
        for (char space[]{0,0}; auto elem : r)
            std::cout << space << elem, *space = ' ';
        std::cout << "] ";
    };
    
    int main()
    {
        const auto v = {1, 2, 3, 4, 5, 6};
    
        std::cout << "All sliding windows of width:\n";
        for (const unsigned width : std::views::iota(1U, 1U + v.size()))
        {
            auto const windows = v | std::views::slide(width);
            std::cout << "W = " << width << ": ";
            std::ranges::for_each(windows, print_subrange);
            std::cout << '\n';
        }
    }
```

Saída:
```
    All sliding windows of width W:
    W = 1: [1] [2] [3] [4] [5] [6] 
    W = 2: [1 2] [2 3] [3 4] [4 5] [5 6] 
    W = 3: [1 2 3] [2 3 4] [3 4 5] [4 5 6] 
    W = 4: [1 2 3 4] [2 3 4 5] [3 4 5 6] 
    W = 5: [1 2 3 4 5] [2 3 4 5 6] 
    W = 6: [1 2 3 4 5 6]
```

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

*   26.7.29 Slide view [range.slide]

### Veja também

[ ranges::adjacent_viewviews::adjacent](<#/doc/ranges/adjacent_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) que consiste em tuplas de referências a elementos adjacentes da view adaptada
(class template) (range adaptor object)
[ ranges::chunk_viewviews::chunk](<#/doc/ranges/chunk_view>)(C++23) | um range de [`view`s](<#/doc/ranges/view>) que são blocos sucessivos não sobrepostos de tamanho `N` dos elementos de outra [`view`](<#/doc/ranges/view>)
(class template) (range adaptor object)