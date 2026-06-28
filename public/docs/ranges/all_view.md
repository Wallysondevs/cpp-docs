# std::ranges::views::all, std::ranges::views::all_t

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
inline constexpr /* unspecified */ all = /* unspecified */;
template< ranges::viewable_range R >
using all_t = decltype(views::all(std::declval<R>()));
```

  
1) Um [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) (também um [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>)) que retorna um [`view`](<#/doc/ranges/view>) que inclui todos os elementos do seu argumento [`range`](<#/doc/ranges/range>).

Dada uma expressão `e` do tipo `R`, a expressão `views::all(e)` é [equivalente em expressão](<#/doc/language/expressions>) a: 

  * Convertendo implicitamente `e` para um prvalue [std::decay_t](<#/doc/types/decay>)&lt;R&gt;, se [std::decay_t](<#/doc/types/decay>)&lt;R&gt; modela [`view`](<#/doc/ranges/view>). 
  * Caso contrário, `std::[ranges::ref_view](<#/doc/ranges/ref_view>){e}` se essa expressão for bem-formada. 
  * Caso contrário, `std::[ranges::owning_view](<#/doc/ranges/owning_view>){e}`.

2) Calcula o tipo [`view`](<#/doc/ranges/view>) adequado de um tipo [`viewable_range`](<#/doc/ranges/viewable_range>).

### Exemplo

Run this code
```
    #include <iostream>
    #include <ranges>
    #include <type_traits>
    #include <vector>
     
    int main()
    {
        std::vector<int> v{0, 1, 2, 3, 4, 5};
        for (int n : std::views::all(v) | std::views::take(2))
            std::cout << n << ' ';
        std::cout << '\n';
     
        static_assert(std::is_same<
            decltype(std::views::single(42)),
            std::ranges::single_view<int>
            >{});
     
        static_assert(std::is_same<
            decltype(std::views::all(v)),
            std::ranges::ref_view<std::vector<int, std::allocator<int>>>
            >{});
     
        int a[]{1, 2, 3, 4};
        static_assert(std::is_same<
            decltype(std::views::all(a)),
            std::ranges::ref_view<int[4]>
            >{});
     
        static_assert(std::is_same<
            decltype(std::ranges::subrange{std::begin(a) + 1, std::end(a) - 1}),
            std::ranges::subrange<int*, int*, std::ranges::subrange_kind(1)>
            >{});
    }
```

Output: 
```
    0 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3724](<https://cplusplus.github.io/LWG/issue3724>) | C++20  | `views::all` pode resultar em erro grave para alguns views move-only  | torna-se bem-restrito   
[P2415R2](<https://wg21.link/P2415R2>) | C++20  | `views::all` retornava um `subrange` para um [`range`](<#/doc/ranges/range>) rvalue não-[`view`](<#/doc/ranges/view>) | retorna um `owning_view` para ele   
  
### Veja também

[ ranges::empty_viewviews::empty](<#/doc/ranges/empty_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) vazio sem elementos  
(class template) (variable template)  
[ ranges::single_viewviews::single](<#/doc/ranges/single_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) que contém um único elemento de um valor especificado  
(class template) (customization point object)  
[ ranges::owning_view](<#/doc/ranges/owning_view>)(C++20) |  um [`view`](<#/doc/ranges/view>) com propriedade única de algum [`range`](<#/doc/ranges/range>)   
(class template)