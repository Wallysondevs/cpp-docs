# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::adjacent_transform_view

```cpp
adjacent_transform_view() = default;  // (1) (desde C++23)
constexpr explicit adjacent_transform_view( V base, F fun );  // (2) (desde C++23)
```

Constrói um [`adjacent_transform_view`](<#/doc/ranges/adjacent_transform_view>).

1) Construtor padrão. [Inicializa por padrão](<#/doc/language/default_initialization>) os membros de dados subjacentes [`_fun__`](<#/doc/ranges/adjacent_transform_view>) e [`_inner__`](<#/doc/ranges/adjacent_transform_view>).

2) Constrói por movimento os membros de dados subjacentes: [`_fun__`](<#/doc/ranges/adjacent_transform_view>) com std::move(fun) e [`_inner__`](<#/doc/ranges/adjacent_transform_view>) com std::move(base).

### Parâmetros

- **base** — a view subjacente
- **fun** — a função de transformação N-ária

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <ranges>
     
    int main()
    {
        constexpr static auto v = {1, 2, 3, 4, 5};
        constexpr auto mul =  { return (... * x); };
        constexpr auto view = std::views::adjacent_transform<3>(v, mul);
        std::ranges::copy(view, std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída:
```
    6 24 60
```