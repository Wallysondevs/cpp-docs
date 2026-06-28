# std::ranges::common_view&lt;V&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

  
Retorna uma cópia da view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente.

2) Constrói por movimento o resultado a partir da view subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

Uma cópia da view subjacente.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <string>
     
    int main()
    {
        std::string str { "C++20" };
        auto view = std::views::common(str);
     
        std::string copy_of_str = view.base();
        std::cout << "copy of str: [" << copy_of_str << "]\n";
        std::cout << "view.base(): [" << view.base() << "]\n";
     
        std::string move_str = std::move(view.base());
        std::cout << "moved str:   [" << move_str << "]\n";
        std::cout << "view.base(): [" << view.base() << "]\n"; // unspecified
    }
```

Saída possível:
```
    copy of str: [C++20]
    view.base(): [C++20]
    moved str:   [C++20]
    view.base(): []
```