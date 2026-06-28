# std::ranges::zip_view&lt;Views...&gt;::size

```cpp
constexpr auto size()
requires (ranges::sized_range<Views> && ...);  // (1) (desde C++23)
constexpr auto size() const
requires (ranges::sized_range<const Views> && ...);  // (2) (desde C++23)
```

  
Retorna o número de elementos na [`zip_view`](<#/doc/ranges/zip_view>). Disponível apenas se cada range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>). 

Equivalente a: 
```
    return std::apply
    (
        
        {
            using CT = /*make-unsigned-like-t*/<std::common_type_t<decltype(sizes)...>>;
            return ranges::min({CT(sizes)...});
        },
        /*tuple-transform*/(ranges::size, views_)
    );
```

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos, que é o tamanho mínimo entre todos os tamanhos das [`view`s](<#/doc/ranges/view>) adaptadas. 

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <deque>
    #include <forward_list>
    #include <ranges>
    #include <vector>
     
    int main()
    {
        auto x = std::vector{1, 2, 3, 4, 5};
        auto y = std::deque{'a', 'b', 'c'};
        auto z = std::forward_list{1., 2.};
     
        auto v1 = std::views::zip(x, y);
        assert(v1.size() == std::min(x.size(), y.size()));
        assert(v1.size() == 3);
     
        [[maybe_unused]] auto v2 = std::views::zip(x, z);
    //  auto sz = v2.size(); // Error, v2 does not have size():
        static_assert(not std::ranges::sized_range<decltype(z)>);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)