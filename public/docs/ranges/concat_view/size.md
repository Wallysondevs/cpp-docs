# std::ranges::concat_view&lt;Views...&gt;::size

```cpp
constexpr auto size()
requires(sized_range<Views> && ...);  // (1) (desde C++26)
constexpr auto size() const
requires(sized_range<const Views> && ...);  // (2) (desde C++26)
```

  
Retorna o número de elementos.

Equivalente a [std::apply](<#/doc/utility/apply>)  
` `(  
` `[](auto... sizes)  
` `{  
` `using CT = [ranges::common_type_t](<#/doc/experimental/ranges/type_traits/common_type>)<decltype(sizes)...>;  
` `return (`_[make-unsigned-like-t](<#/doc/ranges>)_` ﻿&lt;CT&gt;(sizes) + ...);  
` `},  
` ` _[tuple-transform](<#/doc/ranges>)_` ﻿([ranges::size](<#/doc/ranges/size>),` ` _[views_](<#/doc/ranges/concat_view>)_` ﻿)  
` `); .

### Valor de retorno

Conforme descrito acima.

### Complexidade

Constante.

### Observações

A complexidade de [`concat_view`](<#/doc/ranges/concat_view>) é de tempo constante (mesmo que em alguns casos seja uma função linear do número de ranges que ela concatena, o que é um parâmetro estaticamente conhecido desta view) porque a complexidade de tempo, conforme exigido pelos concepts de ranges, é formalmente expressa em relação ao número total de elementos (o tamanho) de um dado range, e não aos parâmetros estaticamente conhecidos desse range.

### Exemplo

A versão preliminar pode ser verificada no [Compiler Explorer](<https://godbolt.org/z/KccTnacPe>).

Execute este código
```
    #include <cassert>
    #include <forward_list>
    #include <list>
    #include <ranges>
     
    int main()
    {
        constexpr static auto a = {1, 2};
        constexpr static auto b = {1, 2, 3};
        constexpr static auto c = {1, 2, 3, 4};
     
        constexpr auto con{std::views::concat(a, b, c)};
        static_assert(std::ranges::sized_range<decltype(con)>);
        static_assert(con.size() == 2 + 3 + 4);
     
        std::forward_list d = b;
        static_assert(not std::ranges::sized_range<std::forward_list<int>>);
        const auto cat{std::views::concat(b, c, d)};
        static_assert(not std::ranges::sized_range<decltype(cat)>);
    //  auto x = cat.size(); // error: cat is not sized_range because of d
     
        std::list e = c;
        const auto dog{std::views::concat(a, b, e)};
        static_assert(std::ranges::sized_range<decltype(dog)>);
        assert(dog.size() == 2 + 3 + 4);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)