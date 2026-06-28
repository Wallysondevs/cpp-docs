# std::ranges::drop_while_view&lt;V,Pred&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

  
Retorna uma cópia da view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente [`_base__`](<#/doc/ranges/drop_while_view>).

2) Constrói por movimento o resultado a partir da view subjacente `_base__`.

### Parâmetros

(nenhum)

### Valor de retorno

Uma cópia da view subjacente.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <ranges>
     
    void print(auto first, auto last)
    {
        for (; first != last; ++first)
            std::cout << *first << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::array data{1, 2, 3, 4, 5};
        print(data.cbegin(), data.cend());
     
        auto func =  { return x < 3; };
        auto view = std::ranges::drop_while_view{data, func};
        print(view.begin(), view.end());
     
        auto base = view.base(); // `base` se refere a `data`
        std::ranges::reverse(base); //< altera `data` indiretamente
        print(data.cbegin(), data.cend());
    }
```

Saída: 
```
    1 2 3 4 5
    3 4 5
    5 4 3 2 1
```