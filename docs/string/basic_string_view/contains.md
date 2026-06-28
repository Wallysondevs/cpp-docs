# std::basic_string_view&lt;CharT,Traits&gt;::contains

```cpp
constexpr bool contains( basic_string_view sv ) const noexcept;  // (1) (desde C++23)
constexpr bool contains( CharT c ) const noexcept;  // (2) (desde C++23)
constexpr bool contains( const CharT* s ) const;  // (3) (desde C++23)
```

Verifica se o string view contém a substring fornecida, onde

1) a substring é um string view.

2) a substring é um único caractere.

3) a substring é uma string de caracteres terminada em nulo.

Todas as três sobrecargas são equivalentes a retornar find(x) != npos;, onde `x` é o parâmetro.

### Parâmetros

- **sv** — um string view
- **c** — um único caractere
- **s** — uma string de caracteres terminada em nulo

### Valor de retorno

true se o string view contiver a substring fornecida, false caso contrário.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_string_contains`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | Funções `contains`

### Exemplo

Execute este código
```cpp
    #include <string_view>
    using namespace std::literals;
    
    static_assert
    (
        // bool contains(basic_string_view x) const noexcept;
        "https://cppreference.com"sv.contains("cpp"sv) == true and
        "https://cppreference.com"sv.contains("php"sv) == false and
    
        // bool contains(CharT x) const noexcept;
        "C++23"sv.contains('+') == true and
        "C++23"sv.contains('-') == false and
    
        // bool contains(const CharT* x) const;
        std::string_view("basic_string_view").contains("string") == true and
        std::string_view("basic_string_view").contains("String") == false
    );
    
    int main() {}
```

### Veja também

[ starts_with](<#/doc/string/basic_string_view/starts_with>)(C++20) | verifica se o string view começa com o prefixo fornecido
(função membro pública)
[ ends_with](<#/doc/string/basic_string_view/ends_with>)(C++20) | verifica se o string view termina com o sufixo fornecido
(função membro pública)
[ find](<#/doc/string/basic_string_view/find>) | encontra caracteres no view
(função membro pública)
[ substr](<#/doc/string/basic_string_view/substr>) | retorna uma substring
(função membro pública)
[ contains](<#/doc/string/basic_string/contains>)(C++23) | verifica se a string contém a substring ou caractere fornecido
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)