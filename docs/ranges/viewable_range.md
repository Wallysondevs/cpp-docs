# std::ranges::viewable_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept viewable_range =
ranges::range<T> &&
((ranges::view<std::remove_cvref_t<T>> &&
std::constructible_from<std::remove_cvref_t<T>, T>)
(!ranges::view<std::remove_cvref_t<T>> &&
(std::is_lvalue_reference_v<T>
(std::movable<std::remove_reference_t<T>> && !/*is-initializer-list*/<T>))));
```

O concept `viewable_range` é um refinamento de [`range`](<#/doc/ranges/range>) que descreve um range que pode ser convertido em um [`view`](<#/doc/ranges/view>) através de [`views::all`](<#/doc/ranges/all_view>).

A constante /*is-initializer-list*/&lt;T&gt; é verdadeira se e somente se [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt; for uma especialização de [std::initializer_list](<#/doc/utility/initializer_list>).

### Exemplo

Execute este código
```cpp
    #include <ranges>
    #include <string>
    #include <vector>
     
    struct valid_result {};
    struct invalid_result {};
     
    template <typename T>
    concept valid_viewable_range = std::same_as<T, valid_result>;
     
    template <typename T>
    concept invalid_viewable_range = std::same_as<T, invalid_result>;
     
    auto test_viewable_range(std::ranges::viewable_range auto &&) -> valid_result;
    auto test_viewable_range(auto&&) -> invalid_result;
     
    int main()
    {
        auto il = {1, 2, 3};
        int arr []{1, 2, 3};
        std::vector vec{1, 2, 3};
        std::ranges::ref_view r{arr};
        std::ranges::owning_view o{std::string("Hello")};
     
        static_assert(requires {
            { test_viewable_range(il) } -> valid_viewable_range;
            { test_viewable_range(std::move(il)) } -> invalid_viewable_range;
            { test_viewable_range(arr) } -> valid_viewable_range;
            { test_viewable_range(std::move(arr)) } -> invalid_viewable_range;
            { test_viewable_range(vec) } -> valid_viewable_range;
            { test_viewable_range(std::move(vec)) } -> valid_viewable_range;
            { test_viewable_range(r) } -> valid_viewable_range;
            { test_viewable_range(std::move(r)) } -> valid_viewable_range;
            { test_viewable_range(o) } -> invalid_viewable_range;
            { test_viewable_range(std::move(o)) } -> valid_viewable_range;
            { test_viewable_range(std::ranges::ref_view(o)) } -> valid_viewable_range;
        });
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3481](<https://cplusplus.github.io/LWG/issue3481>) | C++20 | `viewable_range` aceitava um lvalue de um view somente-movível | rejeita
[P2415R2](<https://wg21.link/P2415R2>) | C++20 | `viewable_range` aceitava apenas rvalues não-[`view`](<#/doc/ranges/view>) que são [`borrowed_range`](<#/doc/ranges/borrowed_range>) | aceita mais tipos

### Veja também

[ views::all_tviews::all](<#/doc/ranges/all_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que inclui todos os elementos de um [`range`](<#/doc/ranges/range>)
(alias template) (objeto adaptador de range)