# std::ranges::split_view&lt;V,Pattern&gt;::split_view

Definido no header `[<ranges>](<#/doc/header/ranges>)`

```cpp
split_view()
requires std::default_initializable<V> &&
std::default_initializable<Pattern> = default;  // (1) (desde C++20)
constexpr explicit split_view( V base, Pattern pattern );  // (2) (desde C++20)
template< ranges::forward_range R >
requires std::constructible_from<V, views::all_t<R>> &&
std::constructible_from<Pattern, ranges::single_view<
ranges::range_value_t<R>>>
constexpr explicit split_view( R&& r, ranges::range_value_t<R> e );  // (3) (desde C++20)
```

Constrói um `split_view`.

Seja `_[base_](<#/doc/ranges/split_view>)_` o view subjacente e `_[pattern_](<#/doc/ranges/split_view>)_` o delimitador.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) `_base__` e `_pattern__` com seus respectivos inicializadores de membro padrão.

2) Inicializa `_base__` com std::move(base) e `_pattern__` com std::move(pattern).

3) Inicializa `_base__` com [views::all](<#/doc/ranges/all_view>)([std::forward](<#/doc/utility/forward>)&lt;R&gt;(r)) e `_pattern__` com [ranges::single_view](<#/doc/ranges/single_view>){std::move(e)}.

### Parâmetros

- **base** — o view (a ser dividido)
- **pattern** — view a ser usado como delimitador
- **e** — elemento a ser usado como delimitador

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cctype>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <string_view>
    #include <vector>
    
    int main()
    {
        {
            auto view = std::views::iota(1, 20)
                      | std::views::transform( { return x % 5; });
            auto splitts = std::views::split(view, 0); // (2)
            for (const auto& split : splitts)
            {
                std::cout << "{ ";
                std::ranges::copy(split, std::ostream_iterator<int>(std::cout, " "));
                std::cout << "} ";
            }
        }
        std::cout << '\n';
    
        {
            const std::vector nums{1, -1, -1, 2, 3, -1, -1, 4, 5, 6};
            const std::array delim{-1, -1};
            auto splitter = std::views::split(nums, delim); // (3)
            for (const auto& split : splitter)
            {
                std::cout << "{ ";
                std::ranges::copy(split, std::ostream_iterator<int>(std::cout, " "));
                std::cout << "} ";
            }
        }
        std::cout << '\n';
    
        {
            constexpr std::string_view JupiterMoons
            {
                "Callisto, Europa, Ganymede, Io, and 91 more"
            };
            constexpr std::string_view delim{", "};
            std::ranges::split_view moons_extractor{JupiterMoons, delim}; // (3)
            auto is_moon = std::views::filter(
            {
                return std::isupper(str[0]);
            });
            std::cout << "Some moons of Jupiter: ";
            for (const auto moon : moons_extractor | is_moon)
                std::cout << std::string_view(moon) << ' ';
        }
        std::cout << '\n';
    }
```

Saída:
```
    { 1 2 3 4 } { 1 2 3 4 } { 1 2 3 4 } { 1 2 3 4 }
    { 1 } { 2 3 } { 4 5 6 }
    Some moons of Jupiter: Callisto Europa Ganymede Io
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)
([P2711R1](<https://wg21.link/P2711R1>)) | C++20 | o construtor multiparâmetro não era explicit | tornado explicit

### Ver também

[ (constructor)](<#/doc/ranges/lazy_split_view/lazy_split_view>) | constrói um `lazy_split_view`
(função membro pública de `std::ranges::lazy_split_view<V,Pattern>`)