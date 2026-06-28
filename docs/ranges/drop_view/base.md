# std::ranges::drop_view&lt;V&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

  
Retorna uma cópia da view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente [`_base__`](<#/doc/ranges/drop_view>).

2) Constrói por movimento o resultado a partir da view subjacente `_base__`.

### Parâmetros

(nenhum)

### Valor de retorno

Uma cópia da view subjacente (adaptada) [`_base__`](<#/doc/ranges/drop_view>).

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
     
    namespace stq {
    void println(auto, const auto& v)
    {
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    }
     
    int main()
    {
        static constexpr int a[]{1, 2, 3, 4, 5};
        constexpr auto view = a | std::views::drop(2);
        stq::println("{}", view);
        const auto base = view.base();
        stq::println("{}", base);
    }
```

Saída: 
```
    3 4 5
    1 2 3 4 5
```