# std::ranges::concat_view&lt;Views...&gt;::begin

```cpp
constexpr /*iterator*/<false> begin()
requires (!(/*simple-view*/<Views> && ...));  // (1) (desde C++26)
constexpr /*iterator*/<true> begin() const
requires (ranges::range<const Views> && ...) &&
/*concatable*/<const Views...>;  // (2) (desde C++26)
```

  
Retorna um [iterator](<#/doc/ranges/concat_view/iterator>) para o início da [`concat_view`](<#/doc/ranges/concat_view>). 

1) Equivalente a [`_iterator_`](<#/doc/ranges/concat_view/iterator>) ﻿&lt;false&gt; it(this, [std::in_place_index](<#/doc/utility/in_place>)<0>,  
` `[ranges::begin](<#/doc/ranges/begin>)(std::get<0>(`_[views_](<#/doc/ranges/concat_view>)_` ﻿)));  
it.template` ` _[satisfy](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿<0>();  
return it;.

2) Equivalente a [`_iterator_`](<#/doc/ranges/concat_view/iterator>) ﻿&lt;true&gt; it(this, [std::in_place_index](<#/doc/utility/in_place>)<0>,  
` `[ranges::begin](<#/doc/ranges/begin>)(std::get<0>(`_[views_](<#/doc/ranges/concat_view>)_` ﻿)));  
it.template` ` _[satisfy](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿<0>();  
return it;.

### Valor de retorno

Conforme especificado acima. 

### Exemplo

A versão preliminar pode ser verificada no [Compiler Explorer](<https://godbolt.org/z/ffoo7o3f5>).

Execute este código
```cpp
    #include <ranges>
    #include <string_view>
    using namespace std::literals;
     
    int main()
    {
        static constexpr auto c = {"🐱", "🐶"};
        static constexpr auto a = {"🤡"sv};
        static constexpr auto t = {"💚"sv};
        static constexpr auto cat{std::views::concat(c, a, t)};
        static_assert(*cat.begin() == "\U0001F431" and
                      cat.begin()[1] == "🐶" and
                      *(cat.begin() + 2) == "\N{CLOWN FACE}");
    }
```

### Veja também

[ end](<#/doc/ranges/concat_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)