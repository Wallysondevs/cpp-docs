# std::ranges::concat_view&lt;Views...&gt;::end

```cpp
constexpr auto end()
requires (!(/*simple-view*/<Views> && ...));  // (1) (desde C++26)
constexpr auto end() const
requires (ranges::range<const Views> && ...) &&
/*concatable*/<const Views...>;  // (2) (desde C++26)
```

  
Retorna um [iterator](<#/doc/ranges/concat_view/iterator>) ou [std::default_sentinel](<#/doc/iterator/default_sentinel>) que se compara como igual ao iterator past-the-end do [`concat_view`](<#/doc/ranges/concat_view>). 

1) Equivalente a 

```cpp
constexpr auto N = sizeof...(Views);  
if constexpr (ranges::common_range<Views...[N - 1]>)  
` `return` `` _iterator_` ﻿<false>(this, std::in_place_index<N - 1>,  
` `ranges::end(std::get<N - 1>(`_views__` ﻿)));  
else  
` `return std::default_sentinel;
```

.

2) Equivalente a 

```cpp
constexpr auto N = sizeof...(Views);  
if constexpr (ranges::common_range<const Views...[N - 1]>)  
` `return` `` _iterator_` ﻿<true>(this, std::in_place_index<N - 1>,  
` `ranges::end(std::get<N - 1>(`_views__` ﻿)));  
else  
` `return std::default_sentinel;
```

.

### Valor de retorno

Conforme descrito acima. 

### Exemplo

A versão preliminar pode ser verificada no [Compiler Explorer](<https://godbolt.org/z/voza5z5dv>).

Execute este código
```cpp 
    #include <concepts>
    #include <iterator>
    #include <ranges>
     
    int main()
    {
        static constexpr int p[]{37, 42, 69};
        static constexpr auto q = {19937, 1729};
        constexpr auto cat = std::ranges::views::concat(p, q);
        static_assert(not std::same_as<std::default_sentinel_t, decltype(cat.end())>);
        static_assert(cat.end()[-1] == 1729);
    }
```

### Veja também

[ begin](<#/doc/ranges/concat_view/begin>) | retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)