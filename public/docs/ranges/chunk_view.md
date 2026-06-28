# std::ranges::views::chunk, std::ranges::chunk_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
requires ranges::input_range<V>
class chunk_view
: public ranges::view_interface<chunk_view<V>>
template< ranges::view V >
requires ranges::forward_range<V>
class chunk_view<V>
: public ranges::view_interface<chunk_view<V>>
namespace views {
inline constexpr /* unspecified */ chunk = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
constexpr ranges::view auto chunk( R&& r, ranges::range_difference_t<R> n );
template< class DifferenceType >
constexpr /*range adaptor closure*/ chunk( DifferenceType&& n );
Modelos auxiliares
template< class I >
constexpr I /*div-ceil*/( I num, I denom );
```

`chunk_view` recebe uma [`view`](<#/doc/ranges/view>) e um número n e produz um range de views (os _chunks_) da view original, de modo que cada _chunk_, exceto talvez o último, tenha o tamanho `n`. Esses _chunks_ são sub-ranges não sobrepostos e sucessivos dos elementos da view original, em ordem.

Seja `_s_` o tamanho da view original. Se `_s_` não for múltiplo de n, o tamanho da _última_ view produzida é exatamente s % n (o resto). Caso contrário, o tamanho de cada _chunk_, incluindo o último, é n.

O tamanho da view produzida é /*div-ceil*/(s).

Se n não for maior que 0, o comportamento é indefinido.

1) Uma implementação que suporta a view subjacente `V` que modela apenas [`input_range`](<#/doc/ranges/input_range>).

2) Uma especialização parcial que suporta a view subjacente `V` que modela [`forward_range`](<#/doc/ranges/forward_range>) ou mais forte. Modela [`common_range`](<#/doc/ranges/common_range>) se a view subjacente `V` for [`forward_range`](<#/doc/ranges/forward_range>), [`common_range`](<#/doc/ranges/common_range>), e seja [`sized_range`](<#/doc/ranges/sized_range>) ou não [`bidirectional_range`](<#/doc/ranges/bidirectional_range>).

3) O nome views::chunk denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dadas as subexpressões e e n, a expressão views::chunk(e, n) é [expression-equivalent](<#/doc/language/expressions>) a chunk_view(e, n).

4) Calcula o menor valor inteiro que não é menor que o quociente da divisão de num por denom. Equivalente a:
```cpp
    I r = num / denom;
    if (num % denom)
        ++r;
    return r;
```

### Membros de dados

Objeto membro | Definição
---|---
`_base__` (privado) | A [`view`](<#/doc/ranges/view>) subjacente do tipo `V`.
(objeto membro apenas para exposição*)
`_n__` (privado) | O "tamanho do chunk" do tipo [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;.
(objeto membro apenas para exposição*)

##### Se `V` modela exatamente [`input_range`](<#/doc/ranges/input_range>) ([1](<#/doc/ranges/chunk_view>))

---
`_remainder__` (privado)
(presente condicionalmente) | O número de elementos restantes no chunk atual, do tipo [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;.
(objeto membro apenas para exposição*)
`_current__` (privado)
(presente condicionalmente) | Um objeto [_optional-like_](<#/doc/ranges>) do tipo /*non-propagating-cache*/<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;> que armazena em cache o iterator subjacente atual.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/chunk_view/chunk_view>) | constrói uma `chunk_view`
(função membro pública)
[ base](<#/doc/ranges/chunk_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/chunk_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/chunk_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/chunk_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfizer [`sized_range`](<#/doc/ranges/sized_range>).
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

### [Guias de dedução](<#/doc/ranges/chunk_view/deduction_guides>)

### Classes aninhadas

[_outer_iterator_](<#/doc/ranges/chunk_view/outer_iterator>)(C++23) | o tipo de iterator de saída ("chunk-wise") quando `V` modela [`input_range`](<#/doc/ranges/input_range>) ([1](<#/doc/ranges/chunk_view>))
(classe membro apenas para exposição*)
[_inner_iterator_](<#/doc/ranges/chunk_view/inner_iterator>)(C++23) | o tipo de iterator interno ("element-wise") quando `V` modela [`input_range`](<#/doc/ranges/input_range>) ([1](<#/doc/ranges/chunk_view>))
(classe membro apenas para exposição*)
[_iterator_](<#/doc/ranges/chunk_view/iterator>)(C++23) | o tipo de iterator quando `V` modela [`forward_range`](<#/doc/ranges/forward_range>) ([2](<#/doc/ranges/chunk_view>))
(template de classe membro apenas para exposição*)

### Modelos auxiliares

```cpp
template< class V >
constexpr bool ranges::enable_borrowed_range<chunk_view<V>> =
ranges::forward_range<V> && ranges::enable_borrowed_range<V>;  // (desde C++23)
```

Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `chunk_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente `V` satisfaz ambos, o [`forward_range`](<#/doc/ranges/forward_range>) e o [`borrowed_range`](<#/doc/ranges/borrowed_range>).

### Notas

Se `V` modela [`input_range`](<#/doc/ranges/input_range>) ([1](<#/doc/ranges/chunk_view>)), o iterator de `chunk_view` tem um tipo dedicado: [`_outer_iterator::value_type_`](<#/doc/ranges/chunk_view/outer_iterator/value_type>) que é ele próprio uma input view.

Se `V` modela [`forward_range`](<#/doc/ranges/forward_range>) ou mais forte ([2](<#/doc/ranges/chunk_view>)), `chunk_view` delega a views::take para seu `value_type`.

Se `V` modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) ou ranges mais fortes ([2](<#/doc/ranges/chunk_view>)), a necessidade de calcular corretamente o tamanho do último chunk (a partir do [iterator](<#/doc/ranges/chunk_view/iterator>) final) exige que o tipo de range subjacente `V` seja [`sized_range`](<#/doc/ranges/sized_range>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_ranges_chunk`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::chunk_view`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    
    auto print_subrange =  auto&& r)
    {
        std::cout << '[';
        for (int pos{}; auto elem : r)
            std::cout << (pos++ ? " " : "") << elem;
        std::cout << "] ";
    };
    
    int main()
    {
        const auto v = {1, 2, 3, 4, 5, 6};
    
        for (const unsigned width : std::views::iota(1U, 2U + v.size()))
        {
            auto const chunks = v | std::views::chunk(width);
            std::cout << "chunk(" << width << "): ";
            std::ranges::for_each(chunks, print_subrange);
            std::cout << '\n';
        }
    }
```

Saída:
```
    chunk(1): [1] [2] [3] [4] [5] [6]
    chunk(2): [1 2] [3 4] [5 6]
    chunk(3): [1 2 3] [4 5 6]
    chunk(4): [1 2 3 4] [5 6]
    chunk(5): [1 2 3 4 5] [6]
    chunk(6): [1 2 3 4 5 6]
    chunk(7): [1 2 3 4 5 6]
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 26.7.28 Chunk view [range.chunk]

### Veja também

[ ranges::chunk_by_viewviews::chunk_by](<#/doc/ranges/chunk_by_view>)(C++23) | divide a [`view`](<#/doc/ranges/view>) em sub-ranges entre cada par de elementos adjacentes para os quais o predicado dado retorna falso
(template de classe) (objeto adaptador de range)
[ ranges::adjacent_viewviews::adjacent](<#/doc/ranges/adjacent_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de tuplas de referências a elementos adjacentes da view adaptada
(template de classe) (objeto adaptador de range)
[ ranges::slide_viewviews::slide](<#/doc/ranges/slide_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) cujo M-ésimo elemento é uma [`view`](<#/doc/ranges/view>) sobre os elementos do M-ésimo ao (M + N - 1)-ésimo de outra [`view`](<#/doc/ranges/view>)
(template de classe) (objeto adaptador de range)