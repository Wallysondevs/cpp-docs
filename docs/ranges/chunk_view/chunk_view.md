# std::ranges::chunk_view&lt;V&gt;::chunk_view

```cpp
constexpr explicit chunk_view( V base, ranges::range_difference_t<V> n );  // (desde C++23)
```

  
Constrói um `chunk_view`, inicializando os membros de dados subjacentes: 

  * constrói por movimento o [`_base__`](<#/doc/ranges/chunk_view>) com std::move(base), 
  * inicializa o "tamanho do chunk" [`_n__`](<#/doc/ranges/chunk_view>) com n. 

Além disso, se `V` modela exatamente o [`input_range`](<#/doc/ranges/input_range>), o construtor inicializa os seguintes membros de dados somente para exposição: 

  * inicializa o [`_remainder__`](<#/doc/ranges/chunk_view>) com ​0​, 
  * [inicializa por padrão](<#/doc/language/default_initialization>) o [`_current__`](<#/doc/ranges/chunk_view>). 

O comportamento é indefinido se n for menor ou igual a ​0​. 

### Parâmetros

base  |  \-  |  a view adaptada   
---|---|---
n  |  \-  |  o tamanho do chunk   
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        auto i = std::views::iota(0, 10);
        auto w = std::ranges::chunk_view(i, 4);
     
        std::ranges::for_each(w, 
        {
            for (auto e : v)
                std::cout << e << ' ';
            std::cout << '\n';
        });
    }
```

Saída: 
```
    0 1 2 3
    4 5 6 7
    8 9
```