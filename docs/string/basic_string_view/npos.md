# std::basic_string_view&lt;CharT,Traits&gt;::npos

```cpp
static constexpr size_type npos = size_type(-1);  // (desde C++17)
```

  
Este é um valor especial igual ao valor máximo representável pelo tipo [`size_type`](<#/doc/string/basic_string_view>). O significado exato depende do contexto, mas é geralmente usado como um indicador de fim de view pelas funções que esperam um índice de view ou como um indicador de erro pelas funções que retornam um índice de view.

### Exemplo

Run this code
```
    #include <string_view>
     
    constexpr bool
    contains(std::string_view const what, std::string_view const where) noexcept
    {
        return std::string_view::npos != where.find(what);
    }
     
    int main()
    {
        using namespace std::literals;
     
        static_assert(contains("water", "in a bottle of water"));
        static_assert(!contains("wine", "in a bottle of champagne"));
        static_assert(""sv.npos == "haystack"sv.find("needle"));
    }
```

### Veja também

constexpr size_type `npos` [static] | o valor especial size_type(-1), cujo significado exato depende do contexto  