# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::cartesian_product_view

```cpp
constexpr cartesian_product_view() = default;  // (1) (desde C++23)
constexpr explicit cartesian_product_view( First first_base, Vs... bases );  // (2) (desde C++23)
```

  
Constrói um [`cartesian_product_view`](<#/doc/ranges/cartesian_product_view>). 

1) Construtor padrão. [Inicializa por padrão](<#/doc/language/default_initialization>) o membro de dados subjacente [`_base__`](<#/doc/ranges/cartesian_product_view>).

2) Constrói por movimento (move constructs) o [`_base__`](<#/doc/ranges/cartesian_product_view>) subjacente, inicializando-o com std::move(first_base), std::move(bases)....

### Parâmetros

first_base  |  \-  |  o primeiro objeto view a ser adaptado   
---|---|---
bases  |  \-  |  o pack de objetos view a serem adaptados   
  
### Exemplo

Execute este código
```cpp 
    #include <array>
    #include <format>
    #include <iostream>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        auto x = std::array{'A', 'B'};
        auto y = std::vector{1, 2, 3};
        auto z = std::vector{-1, -2, -3};
    
        auto v = std::ranges::cartesian_product_view(x, y, z); // overload (2)
    
        for (int i{1}; auto const& [rx, ry, rz] : v)
            std::cout << std::format("({} {} {}){}", rx, ry, rz, (i++ % 3) ? ' ' : '\n');
    }
```

Saída: 
```
    (A 1 -1) (A 1 -2) (A 1 -3)
    (A 2 -1) (A 2 -2) (A 2 -3)
    (A 3 -1) (A 3 -2) (A 3 -3)
    (B 1 -1) (B 1 -2) (B 1 -3)
    (B 2 -1) (B 2 -2) (B 2 -3)
    (B 3 -1) (B 3 -2) (B 3 -3)
```