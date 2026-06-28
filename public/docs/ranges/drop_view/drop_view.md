# std::ranges::drop_view&lt;V&gt;::drop_view

```cpp
drop_view() requires std::default_initializable<V> = default;  // (1) (desde C++20)
constexpr explicit drop_view( V base, ranges::range_difference_t<V> count );  // (2) (desde C++20)
```

Constrói uma `drop_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente [`_base__`](<#/doc/ranges/drop_view>) e inicializa o contador [`_count__`](<#/doc/ranges/drop_view>) para ​0​. Após a construção, [`base()`](<#/doc/ranges/drop_view/base>) retorna uma cópia de V() e [`size()`](<#/doc/ranges/drop_view/size>) é igual ao tamanho da view subjacente.

2) Inicializa a view subjacente `_base__` com std::move(base) e o contador `_count__` com count. Após a construção, [`base()`](<#/doc/ranges/drop_view/base>) retorna uma cópia de base e [`size()`](<#/doc/ranges/drop_view/size>) retorna [ranges::size](<#/doc/ranges/size>)(base) - count se o tamanho de base não for menor que count, ou ​0​ caso contrário.

### Parâmetros

- **base** — a view subjacente
- **count** — número de elementos a serem ignorados

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        constexpr std::array hi{'H', 'e', 'l', 'l', 'o', ',',
                                ' ', 'C', '+', '+', '2', '0'};
    
        std::ranges::for_each(hi, { std::cout << c; });
        std::cout << '\n';
    
        constexpr auto n = std::distance(hi.cbegin(), std::ranges::find(hi, 'C'));
    
        auto cxx = std::ranges::drop_view{hi, n};
    
        std::ranges::for_each(cxx, { std::cout << c; });
        std::cout << '\n';
    }
```

Saída:
```
    Hello, C++20
    C++20
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)
([P2711R1](<https://wg21.link/P2711R1>)) | C++20 | o construtor de múltiplos parâmetros não era explícito | tornado explícito