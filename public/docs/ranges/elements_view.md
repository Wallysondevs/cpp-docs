# std::ranges::views::elements, std::ranges::elements_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range V, std::size_t N >
requires ranges::view<V> &&
/*has-tuple-element*/<ranges::range_value_t<V>, N> &&
/*has-tuple-element*/<std::remove_reference_t<
ranges::range_reference_t<V>>, N> &&
/*returnable-element*/<ranges::range_reference_t<V>, N>
class elements_view
: public ranges::view_interface<elements_view<V, N>>;
namespace views {
template< std::size_t N >
constexpr /* unspecified */ elements = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* see below */
constexpr ranges::view auto elements<N>( R&& r );
Conceitos auxiliares
template< class T, std::size_t N >
concept /*has-tuple-element*/ =
requires(T t) {
typename std::tuple_size<T>::type;
requires N < std::tuple_size_v<T>;
typename std::tuple_element_t<N, T>;
{ std::get<N>(t) } -> std::convertible_to<
const std::tuple_element_t<N, T>&>;
};
(apenas para exposição*)
template< class T, std::size_t N >
concept /*has-tuple-element*/ =
/*tuple-like*/<T> && N < std::tuple_size_v<T>
(apenas para exposição*)
template< class T, std::size_t N >
concept returnable-element =
std::is_reference_v<T>
std::tuple_element_t<N, T>>;
```

1) Aceita uma [`view`](<#/doc/ranges/view>) de valores tipo tupla, e retorna uma view com um tipo de valor do N-ésimo elemento do tipo de valor da view adaptada.

2) Cada especialização de `views::elements` é um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::elements&lt;M&gt;(e) é [expression-equivalent](<#/doc/language/expressions>) a elements_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>, M>{e} para qualquer subexpressão e adequada e expressão constante M.

3) Garante que os elementos da view subjacente são valores tipo tupla, veja [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>)(desde C++23).

4) Garante que referências pendentes (dangling references) não podem ser retornadas.

`elements_view` modela os concepts [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), [`common_range`](<#/doc/ranges/common_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando a view subjacente `V` modela os respectivos concepts.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (private) | a view subjacente (adaptada) do tipo `V`
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/elements_view/elements_view>) | constrói uma `elements_view`
(função membro pública)
[ base](<#/doc/ranges/elements_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/elements_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/elements_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/elements_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
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
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o n-ésimo elemento na view derivada. Fornecido se ela satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### Classes aninhadas

[_iterator_](<#/doc/ranges/elements_view/iterator>) | o tipo do iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/elements_view/sentinel>) | o tipo do sentinel
(template de classe membro apenas para exposição*)

### Templates auxiliares

```cpp
template<class T, std::size_t N>
constexpr bool enable_borrowed_range<std::ranges::elements_view<T, N>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

Esta especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `elements_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente a satisfaz.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <tuple>
    #include <vector>
    
    int main()
    {
        const std::vector<std::tuple<int, char, std::string>> vt
        {
            {1, 'A', "α"},
            {2, 'B', "β"},
            {3, 'C', "γ"},
            {4, 'D', "δ"},
            {5, 'E', "ε"},
        };
    
        for (int const e : std::views::elements<0>(vt))
            std::cout << e << ' ';
        std::cout << '\n';
    
        for (char const e : vt | std::views::elements<1>)
            std::cout << e << ' ';
        std::cout << '\n';
    
        for (std::string const& e : std::views::elements<2>(vt))
            std::cout << e << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4 5
    A B C D E
    α β γ δ ε
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3494](<https://cplusplus.github.io/LWG/issue3494>) | C++20 | `elements_view` nunca foi um `borrowed_range` | é um `borrowed_range` se sua view subjacente for
[LWG 3502](<https://cplusplus.github.io/LWG/issue3502>) | C++20 | referência pendente (dangling reference) poderia ser obtida de `elements_view` | tal uso é proibido

### Veja também

[ ranges::keys_viewviews::keys](<#/doc/ranges/keys_view>)(C++20) | recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores tipo par e produz uma [`view`](<#/doc/ranges/view>) dos primeiros elementos de cada par
(template de classe) (objeto adaptador de range)
[ ranges::values_viewviews::values](<#/doc/ranges/values_view>)(C++20) | recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores tipo par e produz uma [`view`](<#/doc/ranges/view>) dos segundos elementos de cada par
(template de classe) (objeto adaptador de range)
[ ranges::zip_viewviews::zip](<#/doc/ranges/zip_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de tuplas de referências para elementos correspondentes das views adaptadas
(template de classe) (objeto de ponto de customização)
[ ranges::zip_transform_viewviews::zip_transform](<#/doc/ranges/zip_transform_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de resultados da aplicação de uma função de transformação para elementos correspondentes das views adaptadas
(template de classe) (objeto de ponto de customização)
[ slice](<#/doc/numeric/valarray/slice>) | fatia tipo BLAS de um valarray: índice inicial, comprimento, passo
(classe)