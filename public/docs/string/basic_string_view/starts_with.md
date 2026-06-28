# std::basic_string_view&lt;CharT,Traits&gt;::starts_with

```cpp
constexpr bool starts_with( basic_string_view sv ) const noexcept;  // (1) (desde C++20)
constexpr bool starts_with( CharT ch ) const noexcept;  // (2) (desde C++20)
constexpr bool starts_with( const CharT* s ) const;  // (3) (desde C++20)
```

Verifica se a string view começa com o prefixo fornecido, onde

1) o prefixo é uma string view. Efetivamente retorna basic_string_view(data(), [std::min](<#/doc/algorithm/min>)(size(), sv.size())) == sv.

2) o prefixo é um único caractere. Efetivamente retorna !empty() && Traits::eq(front(), ch).

3) o prefixo é uma string de caracteres terminada em nulo. Efetivamente retorna starts_with(basic_string_view(s)).

### Parâmetros

- **sv** — uma string view que pode ser resultado de conversão implícita de `std::basic_string`
- **ch** — um único caractere
- **s** — uma string de caracteres terminada em nulo

### Valor de retorno

true se a string view começar com o prefixo fornecido, false caso contrário.

### Observações

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
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
    
        assert(
            // (1) starts_with( basic_string_view )
            "https://cppreference.com"sv.starts_with("http"sv) == true
            && "https://cppreference.com"sv.starts_with("ftp"sv) == false
    
            // (2) starts_with( CharT )
            && "C++20"sv.starts_with('C') == true
            && "C++20"sv.starts_with('J') == false
    
            // (3) starts_with( const CharT* )
            && std::string_view("string_view").starts_with("string") == true
            && std::string_view("string_view").starts_with("String") == false
        );
    }
```

### Veja também

[ ends_with](<#/doc/string/basic_string_view/ends_with>)(C++20) | verifica se a string view termina com o sufixo fornecido
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