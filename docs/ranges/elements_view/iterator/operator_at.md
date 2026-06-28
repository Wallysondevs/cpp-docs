# std::ranges::elements_view&lt;V,F&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr decltype(auto) operator const
requires ranges::random_access_range<Base>;  // (desde C++20)
```

  
Retorna um elemento na localização relativa especificada, como se por /*get-element*/(this->base() + n), onde para uma expressão e, /*get-element*/(e) é 

  * std::get&lt;N&gt;(*e), se [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt; é um tipo de referência. Caso contrário, 
  * static_cast&lt;E&gt;(std::get&lt;N&gt;(*e)), onde E é [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::tuple_element_t](<#/doc/utility/tuple_element>)<N, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>>. 

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento no deslocamento n relativo à localização atual. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <tuple>
     
    int main()
    {
        using T = std::tuple<int, char, std::string_view>;
     
        const auto il =
        {
            T{1, 'A', "α"},
            T{2, 'B', "β"},
            T{3, 'C', "γ"},
        };
     
        std::cout << std::views::elements<0>(il)[1] << ' '   // 2
                  << std::views::elements<1>(il)[1] << ' '   // B
                  << std::views::elements<2>(il)[1] << '\n'; // β
    }
```

Saída: 
```
    2 B β
```

### Veja também

[ operator*](<#/doc/ranges/elements_view/iterator/operator_star_>)(C++20) |  acessa o N-ésimo elemento da tupla   
(função membro pública)  