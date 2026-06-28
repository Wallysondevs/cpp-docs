# std::ranges::concat_view&lt;Views...&gt;::concat_view

```cpp
concat_view() = default;  // (1) (desde C++26)
constexpr concat_view( Views... views );  // (2) (desde C++26)
```

Sobrecarga | `_[views_](<#/doc/ranges/concat_view>)_`
---|---
(1) | [inicializado por padrão](<#/doc/language/default_initialization>)
(2) | inicializado com std::move(views)...

### Parâmetros

- **views** — objetos view para adaptar

### Observações

Para chamar o construtor padrão, `Views` deve ser explicitamente fornecido e todos os tipos que ele contém devem ser inicializáveis por padrão.

### Exemplo

Uma prévia inicial do exemplo está disponível no [Compiler Explorer](<https://godbolt.org/z/fKaKvd3oh>).

Run this code
```cpp
    #include <algorithm>
    #include <ranges>
     
    int main()
    {
        using namespace std::ranges;
     
        static constexpr concat_view<empty_view<char>> concat1{}; // overload (1)
        static_assert(equal(concat1, views::empty<char>));
     
        static constexpr auto con = {'c', 'o', 'n'};
        static constexpr char cat[]{'c', 'a', 't', '\0'};
        static constexpr auto concat2{views::concat(con, cat)};   // overload (2)
        static_assert(equal(concat2, "concat"));
    }
```