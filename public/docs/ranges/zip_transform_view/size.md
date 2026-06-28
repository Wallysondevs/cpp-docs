# std::ranges::zip_transform_view&lt;F,Views...&gt;::size

```cpp
constexpr auto size()
requires ranges::sized_range</*InnerView*/>;  // (1) (desde C++23)
constexpr auto size() const
requires ranges::sized_range<const /*InnerView*/>  // (2) (desde C++23)
```

  
Retorna o número de elementos na zip_transform_view. Fornecido apenas se cada range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>). 

1,2) Equivalente a: return` `[` _zip__`](<#/doc/ranges/zip_transform_view>).size();.

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos, que é o tamanho mínimo entre todos os tamanhos dos [`view`s](<#/doc/ranges/view>) adaptados. 

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <deque>
    #include <forward_list>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <vector>
     
    int main()
    {
        auto x = std::vector{1, 2, 3, 4, 5};
        auto y = std::deque<short>{10, 20, 30};
        auto z = std::forward_list{100., 200.};
     
        auto v1 = std::views::zip_transform(std::plus{}, x, y);
        assert(v1.size() == std::min(x.size(), y.size()));
        assert(v1.size() == 3);
        for (int i : v1)
            std::cout << i << ' ';
        std::cout << '\n';
     
        [[maybe_unused]] auto v2 = std::views::zip_transform(std::plus{}, x, z);
    //  auto sz = v2.size(); // Error: z doesn't have size(), so neither does v2
        static_assert(not std::ranges::sized_range<decltype(z)>);
    }
```

Saída: 
```
    11 22 33
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)