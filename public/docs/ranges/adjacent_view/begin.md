# std::ranges::adjacent_view&lt;V,N&gt;::begin

```cpp
constexpr auto begin() requires (!__SimpleView<V>);  // (1) (desde C++23)
constexpr auto begin() const requires ranges::range<const V>;  // (2) (desde C++23)
```

Retorna um [iterator](<#/doc/ranges/adjacent_view/iterator>) para o primeiro elemento da [`adjacent_view`](<#/doc/ranges/adjacent_view>).

Seja [`_base__`](<#/doc/ranges/adjacent_view>) a view subjacente.

1) Equivalente a return /*iterator*/&lt;false&gt;([ranges::begin](<#/doc/ranges/begin>)(base_), [ranges::end](<#/doc/ranges/end>)(base_));.

2) Equivalente a return /*iterator*/&lt;true&gt;([ranges::begin](<#/doc/ranges/begin>)(base_), [ranges::end](<#/doc/ranges/end>)(base_));.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Exemplo

Execute este código
```
    #include <ranges>
    #include <tuple>
    #include <type_traits>
    
    int main()
    {
        constexpr static auto v = {'A', 'B', 'C', 'D', 'E'};
    
        constexpr auto view = std::views::adjacent<3>(v);
    
        constexpr auto tuple = *view.begin();
    
        static_assert
        (
            std::is_same_v
            <
                decltype(tuple),
                const std::tuple<char const&, char const&, char const&>
            >
        );
    
        static_assert
        (
            std::get<0>(tuple) == 'A' &&
            std::get<1>(tuple) == 'B' &&
            std::get<2>(tuple) == 'C'
        );
    }
```

### Veja também

[ end](<#/doc/ranges/adjacent_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)