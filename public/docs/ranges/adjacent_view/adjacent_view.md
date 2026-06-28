# std::ranges::adjacent_view&lt;V,N&gt;::adjacent_view

```cpp
adjacent_view() requires std::default_initializable<V> = default;  // (1) (desde C++23)
constexpr explicit adjacent_view( V base );  // (2) (desde C++23)
```

Constrói uma [`adjacent_view`](<#/doc/ranges/adjacent_view>).

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente.

2) Inicializa a view subjacente [`_base__`](<#/doc/ranges/adjacent_view>) com std::move(base).

### Parâmetros

- **base** — a view subjacente

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <tuple>
    
    template<class... Ts>
    void print(std::tuple<Ts...> const& tuple)
    {
        std::apply(&
        {
            std::cout << arg;
            ((std::cout << args), ...);
        }, tuple);
        std::cout << '\n';
    }
    
    int main()
    {
        const std::string v{"ABCDEF"};
        constexpr int window_size{4};
    
        std::cout << "v: " << v << '\n';
    
        auto view = std::views::adjacent<window_size>(v); // overload (2)
    
        for (auto const& tuple : view)
            print(tuple);
    }
```

Saída:
```
    v: ABCDEF
    ABCD
    BCDE
    CDEF
```