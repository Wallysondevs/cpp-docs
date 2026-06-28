# std::ranges::stride_view&lt;V&gt;::stride_view

```cpp
constexpr explicit stride_view( V base, ranges::range_difference_t<V> stride );  // (desde C++23)
```

  
Constrói um `stride_view` inicializando os membros de dados subjacentes: 

  * constrói por movimento a view subjacente [`_base__`](<#/doc/ranges/stride_view>) com std::move(base), 
  * constrói o [`_stride__`](<#/doc/ranges/stride_view>) com stride. 

Se stride < 1, o comportamento é indefinido. 

### Parâmetros

base  |  \-  |  a view de origem   
---|---|---
stride  |  \-  |  o valor do stride   
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <string_view>
    
    void print(std::string_view rem, auto v, std::string_view term = "\n")
    {
        std::cout << rem << ": ";
        std::ranges::copy(v, std::ostream_iterator<int>(std::cout, " "));
        std::cout << term;
    };
    
    int main()
    {
        auto source = std::views::iota(1, 10);
        print("source", source);
    
        for (int stride_value : std::views::iota(1, 6))
        {
            auto strided_view = std::views::stride(source, stride_value);
    
            print("stride", std::views::single(stride_value), "-> ");
            print("result", strided_view);
        }
    }
```

Saída: 
```
    source: 1 2 3 4 5 6 7 8 9
    stride: 1 -> result: 1 2 3 4 5 6 7 8 9
    stride: 2 -> result: 1 3 5 7 9
    stride: 3 -> result: 1 4 7
    stride: 4 -> result: 1 5 9
    stride: 5 -> result: 1 6
```