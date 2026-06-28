# std::ranges::adjacent_view&lt;V,N&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr auto operator const
requires ranges::random_access_range<Base>;  // (desde C++23)
```

  
Retorna um elemento em uma localização relativa especificada.

Seja [`_current__`](<#/doc/ranges/adjacent_view/iterator>) um array subjacente de iteradores.

Equivalente a:
```
    return /*tuple-transform*/(& -> decltype(auto) { return i[n]; }, current_);
```

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento no deslocamento n relativo à localização atual.

### Exemplo

Execute este código
```
    #include <ranges>
    #include <tuple>
     
    int main()
    {
        constexpr static auto v = {0, 1, 2, 3, 4, 5};
        //                               └──┬──┘  
        //                                  └─────────────────┐
        constexpr auto view = v | std::views::adjacent<3>; // │
        //                 ┌───────────────────┬──────────────┘ 
        //                 │                ┌──┴──┐
        static_assert(view[2] == std::tuple{2, 3, 4});
    }
```