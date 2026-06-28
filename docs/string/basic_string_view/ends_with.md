# std::basic_string_view&lt;CharT,Traits&gt;::ends_with

```cpp
constexpr bool ends_with( basic_string_view sv ) const noexcept;  // (1) (desde C++20)
constexpr bool ends_with( CharT ch ) const noexcept;  // (2) (desde C++20)
constexpr bool ends_with( const CharT* s ) const;  // (3) (desde C++20)
```

Verifica se a string view termina com o sufixo fornecido, onde

1) o sufixo é uma string view. Efetivamente retorna `size() >= sv.size() && compare(size() - sv.size(), npos, sv) == 0`.

2) o sufixo é um único caractere. Efetivamente retorna `!empty() && Traits::eq(back(), ch)`.

3) o sufixo é uma string de caracteres terminada em nulo. Efetivamente retorna `ends_with(basic_string_view(s))`.

### Parâmetros

- **sv** — uma string view que pode ser resultado de uma conversão implícita de `std::basic_string`
- **ch** — um único caractere
- **s** — uma string de caracteres terminada em nulo

### Valor de retorno

`true` se a string view terminar com o sufixo fornecido, `false` caso contrário.

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_starts_ends_with`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | Verificação de prefixo e sufixo de string: starts_with() e ends_with()

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string_view>
    
    int main()
    {
        using namespace std::literals;
    
        assert
        (""
            // (1) ends_with( basic_string_view sv )
            && std::string_view("https://cppreference.com").ends_with(".com"sv) == true
            && std::string_view("https://cppreference.com").ends_with(".org"sv) == false
    
            // (2) ends_with( CharT c )
            && std::string_view("C++20").ends_with('0') == true
            && std::string_view("C++20").ends_with('3') == false
    
            // (3) ends_with( const CharT* s )
            && std::string_view("string_view").ends_with("view") == true
            && std::string_view("string_view").ends_with("View") == false
        );
    }
```

### Veja também

[ starts_with](<#/doc/string/basic_string_view/starts_with>)(C++20) | verifica se a string view começa com o prefixo fornecido
(função membro pública)
[ starts_with](<#/doc/string/basic_string/starts_with>)(C++20) | verifica se a string começa com o prefixo fornecido
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ ends_with](<#/doc/string/basic_string/ends_with>)(C++20) | verifica se a string termina com o sufixo fornecido
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ contains](<#/doc/string/basic_string/contains>)(C++23) | verifica se a string contém a substring ou caractere fornecido
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ contains](<#/doc/string/basic_string_view/contains>)(C++23) | verifica se a string view contém a substring ou caractere fornecido
(função membro pública)
[ compare](<#/doc/string/basic_string_view/compare>) | compara duas views
(função membro pública)