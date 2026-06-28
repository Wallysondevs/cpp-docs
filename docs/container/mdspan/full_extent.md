# std::full_extent, std::full_extent_t

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
struct full_extent_t { explicit full_extent_t() = default; };
inline constexpr std::full_extent_t full_extent {};
```

1) A classe `std::full_extent_t` é um tipo de especificador de fatia que pode ser usado em std::submdspan.

2) A instância `std::full_extent` correspondente de (1) é um especificador de fatia para indicar o intervalo completo de índices na extensão especificada em std::submdspan.

### Exemplo

Execute este código
```cpp
    #include <mdspan>
    #include <print>
     
    void print(auto view)
    {
        static_assert(view.rank() <= 2);
     
        if constexpr (view.rank() == 2)
        {
            for (std::size_t i = 0; i != view.extent(0); ++i)
            {
                for (std::size_t j = 0; j != view.extent(1); ++j)
                    std::print("{} ", view[i, j]);
                std::println();
            }
        }
        else if constexpr (view.rank() == 1)
        {
            for (std::size_t i = 0; i != view.extent(0); ++i)
                std::print("{} ", view[i]);
            std::println();
        }
        else
            std::println("{}", view[]);
     
        std::println();
    }
     
    int main()
    {
        const char letters []{'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'};
        const std::mdspan view(letters, 3, 3);
     
        print(view);
        print(std::submdspan(view, std::full_extent, std::full_extent));
        print(std::submdspan(view, std::full_extent, 1));
        print(std::submdspan(view, 1, std::full_extent));
        print(std::submdspan(view, 2, 1));
    }
```

Saída possível:
```
    A B C
    D E F
    G H I
     
    A B C
    D E F
    G H I
     
    B E H
     
    D E F
     
    H
```

### Veja também

[ submdspan](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/submdspan&action=edit&redlink=1> "cpp/container/mdspan/submdspan \(page does not exist\)") (C++26) | retorna uma view de um subconjunto de um `mdspan` existente
(modelo de função)