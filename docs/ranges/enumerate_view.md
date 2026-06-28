# std::ranges::views::enumerate, std::ranges::enumerate_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
requires /*range-with-movable-references*/<V>
class enumerate_view
: public ranges::view_interface<enumerate_view<V>>
namespace views {
inline constexpr /* unspecified */ enumerate = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* see below */
constexpr /* see below */ enumerate( R&& r );
Conceitos auxiliares
template< class R >
concept /*range-with-movable-references*/ =
ranges::input_range<R> &&
std::move_constructible<ranges::range_reference_t<R>> &&
std::move_constructible<ranges::range_rvalue_reference_t<R>>;
```

1) `enumerate_view` é um range adaptor que recebe uma [`view`](<#/doc/ranges/view>) e produz uma view de [tuple](<#/doc/utility/tuple>)s. O `i`-ésimo elemento (a tuple) da sequência resultante contém:

  * o valor igual a `i`, que é um índice baseado em zero do elemento da sequência subjacente, e
  * a referência ao elemento subjacente.

2) O nome `views::enumerate` denota um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Dada uma subexpressão e, a expressão views::enumerate(e) é [expression-equivalent](<#/doc/language/expressions>) a enumerate_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>>(e) para qualquer subexpressão e adequada.

3) Garante que o tipo de referência do tipo subjacente pode ser movido.

`enumerate_view` modela os concepts [`random_access_range`](<#/doc/ranges/random_access_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`forward_range`](<#/doc/ranges/forward_range>), [`input_range`](<#/doc/ranges/input_range>), [`common_range`](<#/doc/ranges/common_range>), e [`sized_range`](<#/doc/ranges/sized_range>) quando a view subjacente `V` modela os respectivos concepts.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (privado) | Um iterator para a sequência subjacente do tipo `V`.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/enumerate_view/enumerate_view>) | constrói uma `enumerate_view`
(função membro pública)
[ base](<#/doc/ranges/enumerate_view/base>) | retorna uma cópia da view subjacente (adaptada)
(função membro pública)
[ begin](<#/doc/ranges/enumerate_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/enumerate_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/enumerate_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
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
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/enumerate_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/enumerate_view/iterator>)(C++23) | o tipo do iterator
(template de classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/enumerate_view/sentinel>)(C++23) | o tipo do sentinel
(template de classe membro apenas para exposição*)

### Templates auxiliares

```cpp
template< class View >
constexpr bool enable_borrowed_range<ranges::enumerate_view<View>> =
ranges::enable_borrowed_range<View>;  // (desde C++23)
```

Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `enumerate_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente o satisfaz.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_ranges_enumerate`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | `std::ranges::enumerate_view`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        constexpr static auto v = {'A', 'B', 'C', 'D'};
    
        for (auto const [index, letter] : std::views::enumerate(v))
            std::cout << '(' << index << ':' << letter << ") ";
        std::cout << '\n';
    
    #if __cpp_lib_ranges_to_container
        // cria um mapa usando a posição de cada elemento como chave
        auto m = v | std::views::enumerate | std::ranges::to<std::map>();
    
        for (auto const [key, value] : m)
            std::cout << '[' << key << "]:" << value << ' ';
        std::cout << '\n';
    #endif
    
        std::vector<int> numbers{1, 3, 5, 7};
    
        // num é mutável mesmo com const, que não se propaga para a referência
        // para torná-lo const, use `std::views::enumerate(numbers) | std::views::as_const`
        // ou `std::views::enumerate(std::as_const(numbers))`
        for (auto const [index, num] : std::views::enumerate(numbers))
        {
            ++num; // o tipo é int&
            std::cout << numbers[index] << ' ';
        }
        std::cout << '\n';
    }
```

Saída possível:
```
    (0:A) (1:B) (2:C) (3:D)
    [0]:A [1]:B [2]:C [3]:D
    2 4 6 8
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 26.7.23 Enumerate view [range.enumerate]

### Veja também

[ ranges::iota_viewviews::iota](<#/doc/ranges/iota_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo de uma sequência gerada pelo incremento repetido de um valor inicial
(template de classe) (objeto de ponto de customização)
[ ranges::zip_viewviews::zip](<#/doc/ranges/zip_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo de tuples de referências para elementos correspondentes das views adaptadas
(template de classe) (objeto de ponto de customização)
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(C++20) | recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) e um número N e produz uma [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tuple
(template de classe) (objeto range adaptor)