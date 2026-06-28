# std::basic_string_view&lt;CharT,Traits&gt;::basic_string_view

```cpp
constexpr basic_string_view() noexcept;  // (1) (desde C++17)
constexpr basic_string_view( const basic_string_view& other ) noexcept = default;  // (2) (desde C++17)
constexpr basic_string_view( const CharT* s, size_type count );  // (3) (desde C++17)
constexpr basic_string_view( const CharT* s );  // (4) (desde C++17)
template< class It, class End >
constexpr basic_string_view( It first, End last );  // (5) (desde C++20)
template< class R >
constexpr explicit basic_string_view( R&& r );  // (6) (desde C++23)
constexpr basic_string_view( std::nullptr_t ) = delete;  // (7) (desde C++23)
```

1) Construtor padrão. Constrói um `std::basic_string_view` vazio. Após a construção, [data()](<#/doc/string/basic_string_view/data>) é igual a nullptr, e [size()](<#/doc/string/basic_string_view/size>) é igual a ​0​.

2) Construtor de cópia. Constrói uma view com o mesmo conteúdo de other. Após a construção, [data()](<#/doc/string/basic_string_view/data>) é igual a other.data(), e [size()](<#/doc/string/basic_string_view/size>) é igual a other.size().

3) Constrói uma view dos primeiros `count` caracteres do array de caracteres começando com o elemento apontado por `s`. `s` pode conter caracteres nulos. O comportamento é indefinido se `[`s`, `s + count`)` não for um range válido (mesmo que o construtor possa não acessar nenhum dos elementos deste range). Após a construção, [data()](<#/doc/string/basic_string_view/data>) é igual a `s`, e [size()](<#/doc/string/basic_string_view/size>) é igual a `count`.

4) Constrói uma view da string de caracteres terminada em nulo apontada por `s`, não incluindo o caractere nulo terminador. O comprimento da view é determinado como se por `Traits::length(s)`. O comportamento é indefinido se `[`s`, `s + Traits::length(s)`)` não for um range válido. Após a construção, [data()](<#/doc/string/basic_string_view/data>) é igual a `s`, e [size()](<#/doc/string/basic_string_view/size>) é igual a `Traits::length(s)`.

5) Constrói um `std::basic_string_view` sobre o range `[`first`, `last`)`. O comportamento é indefinido se `[`first`, `last`)` não for um range válido, se `It` não modelar de fato um [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), ou se `End` não modelar de fato um [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>) para `It`. Após a construção, [data()](<#/doc/string/basic_string_view/data>) é igual a [std::to_address](<#/doc/memory/to_address>)(first), e [size()](<#/doc/string/basic_string_view/size>) é igual a `last - first`.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:

*   `It` satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>),
*   `End` satisfaz [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>) para `It`,
*   [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;It&gt; e `CharT` são do mesmo tipo, e
*   `End` não é conversível para [std::size_t](<#/doc/types/size_t>).

6) Constrói um `std::basic_string_view` sobre o range `r`. Após a construção, [data()](<#/doc/string/basic_string_view/data>) é igual a [ranges::data](<#/doc/ranges/data>)(r), e [size()](<#/doc/string/basic_string_view/size>) é igual a [ranges::size](<#/doc/ranges/size>)(r).

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:

*   [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;R&gt; não é do mesmo tipo que `std::basic_string_view`,
*   `R` modela [`contiguous_range`](<#/doc/ranges/contiguous_range>) e [`sized_range`](<#/doc/ranges/sized_range>),
*   [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;R&gt; e `CharT` são do mesmo tipo,
*   `R` não é conversível para `const CharT*`, e
*   Seja `d` um lvalue do tipo [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;R&gt;, `d.operator ::[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>()` não é uma expressão válida.

7) `std::basic_string_view` não pode ser construído a partir de nullptr.

### Parâmetros

- **other** — outra view para inicializar a view
- **s** — ponteiro para um array de caracteres ou uma string C para inicializar a view
- **count** — número de caracteres a serem incluídos na view
- **first** — iterator para o primeiro caractere da sequência
- **last** — iterator após o último caractere da sequência ou outro sentinel
- **r** — um range contíguo que contém a sequência

### Complexidade

1-3,5,6) Constante.

4) Linear no comprimento de s.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    int main()
    {
        std::string cppstr = "Foo";
        std::string_view cppstr_v(cppstr); // overload (2), after
                                           // std::string::operator string_view
        std::cout << "1) cppstr_v: " << std::quoted(cppstr_v) << '\n';
    
        char array[3] = {'B', 'a', 'r'};
        std::string_view array_v(array, std::size(array)); // overload (3)
        std::cout << "2) array_v: " << std::quoted(array_v) << '\n';
    
        const char* one_0_two = "One\0Two";
    
        std::string_view one_two_v{one_0_two, 7}; // overload (3)
        std::cout << "3) one_two_v: \"";
        for (char c : one_two_v)
            std::cout << (c != '\0' ? c : '?');
        std::cout << "\", one_two_v.size(): " << one_two_v.size() << '\n';
    
        std::string_view one_v{one_0_two}; // overload (4)
        std::cout << "4) one_v: " << std::quoted(one_v) << ", one_v.size(): " 
                  << one_v.size() << '\n';
    
        constexpr std::wstring_view wcstr_v = L"xyzzy"; // overload (4)
        std::cout << "5) wcstr_v.size(): " << wcstr_v.size() << '\n';
    
        std::array ar = {'P', 'u', 'b'};
        std::string_view ar_v(ar.begin(), ar.end()); // overload (5), C++20
        std::cout << "6) ar_v: " << std::quoted(ar_v) << '\n';
    
    //  std::string_view ar_v2{ar}; // overload (6), OK in C++23
    //  std::cout << "ar_v2: " << std::quoted(ar_v2) << '\n'; // ar_v2: "Pub"
    
        [[maybe_unused]] auto zero = [] { /* ... */ return nullptr; };
    //  std::string_view s{zero()}; // overload (7), won't compile since C++23
    }
```

Saída:
```
    1) cppstr_v: "Foo"
    2) array_v: "Bar"
    3) one_two_v: "One?Two", one_two_v.size(): 7
    4) one_v: "One", one_v.size(): 3
    5) wcstr_v.size(): 5
    6) ar_v: "Pub"
```

### Veja também

[ operator=](<#/>) | atribui uma view
(função membro pública)
[ (constructor)](<#/doc/string/basic_string/basic_string>) | constrói um `basic_string`
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)