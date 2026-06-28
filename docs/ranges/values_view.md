# std::ranges::views::values, std::ranges::values_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
using values_view = ranges::elements_view<R, 1>;
namespace views {
inline constexpr auto values = ranges::elements<1>;
}
```

  
Recebe uma [`view`](<#/doc/ranges/view>) de valores _tuple-like_ (ex: [std::tuple](<#/doc/utility/tuple>) ou [std::pair](<#/doc/utility/pair>)), e produz uma view com um tipo de valor do segundo elemento do tipo de valor da view adaptada.

1) Um alias para [ranges::elements_view](<#/doc/ranges/elements_view>)<R, 1>.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) (e também [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>)). A expressão views::values(e) é [equivalente em expressão](<#/doc/language/expressions>) a values_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>>{e} para qualquer subexpressão `e` adequada.

### Notes

values_view pode ser útil para extrair valores de contêineres associativos, ex: 
```
    std::map<int, std::string> map{{1, "alpha"}, {2, "beta"}};
    for (auto const& value : std::views::values(map))
        std::cout << value << ' ';
    // prints: alpha beta
```

### Example

Run this code
```
    #include <iostream>
    #include <map>
    #include <ranges>
     
    int main()
    {
        const auto list = {std::pair{1, 11.1}, {2, 22.2}, {3, 33.3}};
        std::cout << "pair::second values in the list: ";
        for (double value : list | std::views::values)
            std::cout << value << ' ';
     
        std::map<char, int> map{{'A', 1}, {'B', 2}, {'C', 3}, {'D', 4}, {'E', 5}};
        auto odd =  { return 0 != (x & 1); };
        std::cout << "\nodd values in the map: ";
        for (int value : map | std::views::values | std::views::filter(odd))
            std::cout << value << ' ';
        std::cout << '\n';
    }
```

Output: 
```
    pair::second values in the list: 11.1 22.2 33.3
    odd values in the map: 1 3 5
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3563](<https://cplusplus.github.io/LWG/issue3563>) | C++20  | `keys_view` é incapaz de participar do CTAD devido ao seu uso de views::all_t | views::all_t removido   
  
### See also

[ ranges::keys_viewviews::keys](<#/doc/ranges/keys_view>)(C++20) |  recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores tipo par e produz uma [`view`](<#/doc/ranges/view>) dos primeiros elementos de cada par  
(modelo de classe) (objeto adaptador de range)  
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(C++20) |  recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) e um número N e produz uma [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tupla  
(modelo de classe) (objeto adaptador de range)  
[ slice](<#/doc/numeric/valarray/slice>) |  slice tipo BLAS de um valarray: índice inicial, comprimento, passo   
(classe)