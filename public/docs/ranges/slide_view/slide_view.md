# std::ranges::slide_view&lt;V&gt;::slide_view

```cpp
constexpr explicit slide_view( V base, ranges::range_difference_t<V> n );  // (desde C++23)
```

  
Constrói um `slide_view` inicializando os membros de dados subjacentes: 

  * constrói por movimento a view subjacente [`_base__`](<#/doc/ranges/slide_view>) com std::move(base), 
  * o "tamanho da janela" [`_n__`](<#/doc/ranges/slide_view>) com n. 

### Parâmetros

base  |  \-  |  a view de origem   
---|---|---
n  |  \-  |  o tamanho da "janela deslizante"   
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        const auto source = {1, 2, 3, 4};
     
        auto slide = std::views::slide(source, 3);
     
        std::ranges::for_each(slide,  auto&& w)
        {
            std::cout << '[' << w[0] << ' ' << w[1] << ' ' << w[2] << "]\n";
        });
    }
```

Saída: 
```
    [1 2 3]
    [2 3 4]
```