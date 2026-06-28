# std::ranges::views::transform, std::ranges::transform_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V,
std::copy_constructible F >
requires ranges::view<V> &&
std::is_object_v<F> &&
std::regular_invocable<F&, ranges::range_reference_t<V>> &&
/* invoke_result_t<F&, range_reference_t<V>>& is a valid type */
class transform_view
: public ranges::view_interface<transform_view<V, F>>
(até C++23)
template< ranges::input_range V,
std::move_constructible F >
requires ranges::view<V> &&
std::is_object_v<F> &&
std::regular_invocable<F&, ranges::range_reference_t<V>> &&
/* invoke_result_t<F&, range_reference_t<V>>& is a valid type */
class transform_view
: public ranges::view_interface<transform_view<V, F>>
namespace views {
inline constexpr /*unspecified*/ transform = /*unspecified*/;
}
Call signature
template< ranges::viewable_range R, class F >
requires /* see below */
constexpr ranges::view auto transform( R&& r, F&& fun );
template< class F >
constexpr /*range adaptor closure*/ transform( F&& fun );
```

1) Um adaptador de range que representa uma [`view`](<#/doc/ranges/view>) de uma sequência subjacente após aplicar uma função de transformação a cada elemento.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::transform(e, f) é [expression-equivalent](<#/doc/language/expressions>) a transform_view(e, f) para quaisquer subexpressões e e f adequadas.

`transform_view` modela os concepts [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), [`common_range`](<#/doc/ranges/common_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando a view subjacente `V` modela os respectivos concepts.

### Data members

Nome do membro | Definição
---|---
`_base__` (privado) | a [`view`](<#/doc/ranges/view>) subjacente do tipo `V`
(objeto membro apenas para exposição*)
`_fun__` (privado) | o objeto de função subjacente do tipo [`_copyable-box_`](<#/doc/ranges/copyable_wrapper>)`<F>`(até C++23)[`_movable-box_`](<#/doc/ranges/copyable_wrapper>)`<F>`(desde C++23)
(objeto membro apenas para exposição*)

### Member functions

[ (construtor)](<#/doc/ranges/transform_view/transform_view>) | constrói uma `transform_view`
(função membro pública)
[ base](<#/doc/ranges/transform_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/transform_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/transform_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/transform_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
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
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se ela satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se ela satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se ela satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/transform_view/deduction_guides>)

### Nested classes

[_iterator_](<#/doc/ranges/transform_view/iterator>) | o tipo do iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/transform_view/sentinel>) | o tipo do sentinel
(template de classe membro apenas para exposição*)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstdio>
    #include <iterator>
    #include <ranges>
    #include <string>
    
    char rot13a(const char x, const char a)
    {
        return a + (x - a + 13) % 26;
    }
    
    char rot13(const char x)
    {
        if ('Z' >= x and x >= 'A')
            return rot13a(x, 'A');
    
        if ('z' >= x and x >= 'a')
            return rot13a(x, 'a');
    
        return x;
    }
    
    int main()
    {
        auto show =  { std::putchar(x); };
    
        std::string in{"cppreference.com\n"};
        std::ranges::for_each(in, show);
        std::ranges::for_each(in | std::views::transform(rot13), show);
    
        std::string out;
        std::ranges::copy(std::views::transform(in, rot13), std::back_inserter(out));
        std::ranges::for_each(out, show);
        std::ranges::for_each(out | std::views::transform(rot13), show);
    }
```

Output:
```
    cppreference.com
    pccersrerapr.pbz
    pccersrerapr.pbz
    cppreference.com
```

### Veja também

[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)