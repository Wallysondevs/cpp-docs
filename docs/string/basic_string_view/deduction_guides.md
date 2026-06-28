# guias de dedução para std::basic_string_view

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`

```c
template< class It, class End >
basic_string_view( It, End ) -> basic_string_view<std::iter_value_t<It>>;
template< class R >
basic_string_view( R&& ) -> basic_string_view<ranges::range_value_t<R>>;
```

Estas [guias de dedução](<#/doc/language/ctad>) são fornecidas para [std::basic_string_view](<#/doc/string/basic_string_view>).

1) Esta guia de dedução permite que o tipo de caractere seja deduzido a partir do par iterador-sentinela. Esta sobrecarga participa da resolução de sobrecarga somente se `It` satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e `End` satisfaz [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>) para `It`.

2) Esta guia de dedução permite que o tipo de caractere seja deduzido a partir do range. Esta sobrecarga participa da resolução de sobrecarga somente se `R` satisfaz [`contiguous_range`](<#/doc/ranges/contiguous_range>).

### Exemplo

Execute este código
```
    #include <array>
    #include <iostream>
    #include <string_view>
     
    int main()
    {
        std::array a1{'n', 'u', 'c', 'l', 'e', 'o', 'n', 's', ':', '\n'};
        std::basic_string_view s1(a1.cbegin(), a1.cend()); // deduction: CharT -> char
        static_assert(std::is_same_v<decltype(s1)::value_type, char>);
        std::cout << s1;
     
        std::array a2{L'p', L'r', L'o', L't', L'o', L'n', L's', L'\n'};
        std::basic_string_view s2(a2.cbegin(), a2.cend()); // deduction: CharT -> wchar_t
        static_assert(std::is_same_v<decltype(s2)::value_type, wchar_t>);
        std::wcout << s2;
     
        std::array<long, 9> a3{'n', 'e', 'u', 't', 'r', 'o', 'n', 's', '\n'};
        std::basic_string_view s3(a3.cbegin(), a3.cend()); // deduction: CharT -> long
        static_assert(std::is_same_v<decltype(s3)::value_type, long>);
        for (const auto e : s3)
            std::cout << static_cast<char>(e);
    }
```

Saída:
```
    nucleons:
    protons
    neutrons
```