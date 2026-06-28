# std::ranges::stride_view&lt;V&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

  
Retorna uma cópia da view subjacente [`_base__`](<#/doc/ranges/stride_view>). 

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a: `return base_;`

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a: `return std::move(base_);`

### Parâmetros

(nenhum) 

### Valor de retorno

Uma cópia da view subjacente. 

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <ranges>
     
    void print(std::ranges::viewable_range auto&& v)
    {
        std::ranges::for_each(v,  { std::cout << ' ' << x; }).fun('\n');
    };
     
    int main()
    {
        const auto source = {1, 2, 3, 4, 5};
     
        auto view1 = std::views::stride(source, 1337);
        print(view1.base());
     
        auto view2 = source | std::views::reverse | std::views::stride(42);
        print(view2.base());
    }
```

Saída: 
```
     1 2 3 4 5
     5 4 3 2 1
```