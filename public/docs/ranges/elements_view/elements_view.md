# std::ranges::elements_view&lt;V,N&gt;::elements_view

```cpp
elements_view() requires std::default_initializable<V> = default;  // (1) (desde C++20)
constexpr explicit elements_view( V base );  // (2) (desde C++20)
```

Constrói um `elements_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente [`_base__`](<#/doc/ranges/elements_view>). Após a construção, [`base()`](<#/doc/ranges/elements_view/base>) retorna uma cópia de V().

2) Inicializa a view subjacente `_base__` com std::move(base).

### Parâmetros

- **base** — a view subjacente

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <ranges>
    #include <tuple>
     
    void println(auto const& v)
    {
        for (auto const& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        using namespace std::literals;
     
        const std::array<std::tuple<int, char, std::string>, 2> vt
        {
            std::tuple{1, 'A', "α"s},
            std::tuple{2, 'B', "β"s},
        };
     
        [[maybe_unused]]
        auto empty = std::views::elements<0>;
     
        println(std::views::elements<0>(vt));
        println(std::views::elements<1>(vt));
        println(std::views::elements<2>(vt));
    }
```

Saída:
```
    1 2
    A B
    α β
```