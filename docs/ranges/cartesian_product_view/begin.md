# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::begin

```cpp
constexpr iterator<false> begin()
requires (!/*simple-view*/<First> || ... || !/*simple-view*/<Vs>);  // (1) (desde C++23)
constexpr iterator<true> begin() const
requires (ranges::range<const First> && ... && ranges::range<const Vs>);  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/cartesian_product_view/iterator>) para o primeiro elemento da [`cartesian_product_view`](<#/doc/ranges/cartesian_product_view>). 

Seja [`_bases__`](<#/doc/ranges/cartesian_product_view>) a tupla de views subjacentes. 

1) Equivalente a return /*iterator*/&lt;false&gt;(`_[tuple-transform](<#/doc/ranges>)_`([ranges::begin](<#/doc/ranges/begin>), bases_));.

2) Equivalente a return /*iterator*/&lt;true&gt;(`_[tuple-transform](<#/doc/ranges>)_`([ranges::begin](<#/doc/ranges/begin>), bases_));.

### Parâmetros

(nenhum) 

### Valor de retorno

Um [iterator](<#/doc/ranges/cartesian_product_view/iterator>) para o primeiro elemento. 

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <format>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <tuple>
    using namespace std::literals;
    
    int main()
    {
        constexpr auto a = std::array{"Curiously"sv, "Recurring"sv, "Template"sv, "Pattern"sv};
    
        constexpr auto v = std::ranges::cartesian_product_view(a[0], a[1], a[2], a[3]);
    
        constexpr std::tuple<char const&,
                             char const&,
                             char const&,
                             char const&> first{*v.begin()};
    
        std::cout << std::format("{}{}{}{}{}",
                                 std::get<0>(first),
                                 std::get<1>(first),
                                 std::get<2>(first),
                                 std::get<3>(first),
                                 '\n');
    }
```

Saída: 
```
    CRTP
```

### Veja também

[ end](<#/doc/ranges/cartesian_product_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)