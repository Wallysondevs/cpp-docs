# std::ranges::lazy_split_view&lt;V,Pattern&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

  
Retorna uma cópia da view subjacente `_[base_](<#/doc/ranges/lazy_split_view>)_`. 

1) Constrói por cópia o resultado a partir da view subjacente `_base__`.

2) Constrói por movimento o resultado a partir da view subjacente `_base__`.

### Return value

Uma cópia da view subjacente `_[base_](<#/doc/ranges/lazy_split_view>)_`. 

### Example

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <string_view>
     
    void print(std::string_view rem, auto const& r, std::string_view post = "\n")
    {
        for (std::cout << rem; auto const& e : r)
            std::cout << e;
        std::cout << post;
    }
     
    int main()
    {
        constexpr std::string_view keywords{ "this,..throw,..true,..try,.." };
        constexpr std::string_view pattern{",.."};
        constexpr std::ranges::lazy_split_view lazy_split_view{keywords, pattern};
        print("base() = [", lazy_split_view.base(), "]\n"
              "substrings: ");
        for (auto const& split: lazy_split_view)
            print("[", split, "] ");
    }
```

Saída: 
```
    base() = [this,..throw,..true,..try,..]
    substrings: [this] [throw] [true] [try] []
```

### See also

[ base](<#/doc/ranges/split_view/base>) |  retorna uma cópia da view subjacente (adaptada)   
(função membro pública de `std::ranges::split_view<V,Pattern>`)  