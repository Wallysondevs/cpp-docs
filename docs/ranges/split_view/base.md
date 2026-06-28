# std::ranges::split_view&lt;V,Pattern&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

  
Retorna uma cópia da view subjacente `_[base_](<#/doc/ranges/split_view>)_`. 

1) Constrói por cópia o resultado a partir da view subjacente.

2) Constrói por movimento o resultado a partir da view subjacente.

### Valor de retorno

1) Uma cópia da view subjacente.

2) Uma view construída por movimento a partir da view subjacente.

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <ranges>
    #include <string_view>
     
    int main()
    {
        constexpr std::string_view keywords{"this throw true try typedef typeid"};
        std::ranges::split_view split_view{keywords, ' '};
        std::cout << "base() = " << std::quoted(split_view.base()) << "\n"
                     "substrings: ";
        for (auto split : split_view)
            std::cout << std::quoted(std::string_view{split}) << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    base() = "this throw true try typedef typeid"
    substrings: "this" "throw" "true" "try" "typedef" "typeid"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3590](<https://cplusplus.github.io/LWG/issue3590>) | C++20  | a sobrecarga const& exigia adicionalmente a validade da atribuição por cópia  | restrições relaxadas   
  
### Ver também

[ base](<#/doc/ranges/lazy_split_view/base>) |  retorna uma cópia da view subjacente (adaptada)   
(função membro pública de `std::ranges::lazy_split_view<V,Pattern>`)  