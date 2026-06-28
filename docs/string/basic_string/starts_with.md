# std::basic_string&lt;CharT,Traits,Allocator&gt;::starts_with

```cpp
constexpr bool
starts_with( std::basic_string_view<CharT,Traits> sv ) const noexcept;  // (1) (desde C++20)
constexpr bool
starts_with( CharT ch ) const noexcept;  // (2) (desde C++20)
constexpr bool
starts_with( const CharT* s ) const;  // (3) (desde C++20)
```

  
Verifica se a string começa com o prefixo fornecido. O prefixo pode ser um dos seguintes: 

1) Um string view `sv` (que pode ser o resultado de uma conversão implícita de outra `std::basic_string`).

2) Um único caractere `ch`.

3) Uma string de caracteres terminada em nulo `s`.

Todas as três sobrecargas efetivamente retornam [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>(data(), size()).starts_with(x), onde `x` é o parâmetro. 

### Parâmetros

sv  |  \-  |  um string view que pode ser o resultado de uma conversão implícita de outra `std::basic_string`  
---|---|---
ch  |  \-  |  um único caractere   
s  |  \-  |  uma string de caracteres terminada em nulo   
  
### Valor de retorno

`true` se a string começar com o prefixo fornecido, `false` caso contrário. 

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_starts_ends_with`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | Verificação de prefixo e sufixo de string: starts_with() e ends_with()  
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <string>
    #include <string_view>
     
    int main()
    {
        using namespace std::literals;
     
        const auto str = "Hello, C++20!"s;
     
        assert
        (""
            && str.starts_with("He"sv)  // (1)
            && !str.starts_with("he"sv) // (1)
            && str.starts_with("He"s)   // (1) implicit conversion string to string_view
            && !str.starts_with("he"s)  // (1) implicit conversion string to string_view
            && str.starts_with('H')     // (2)
            && !str.starts_with('h')    // (2)
            && str.starts_with("He")    // (3)
            && !str.starts_with("he")   // (3)
        );
    }
```

### Veja também

[ ends_with](<#/doc/string/basic_string/ends_with>)(C++20) |  verifica se a string termina com o sufixo fornecido   
(função membro pública)  
[ starts_with](<#/doc/string/basic_string_view/starts_with>)(C++20) |  verifica se o string view começa com o prefixo fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)  
[ ends_with](<#/doc/string/basic_string_view/ends_with>)(C++20) |  verifica se o string view termina com o sufixo fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)  
[ contains](<#/doc/string/basic_string/contains>)(C++23) |  verifica se a string contém a substring ou caractere fornecido   
(função membro pública)  
[ contains](<#/doc/string/basic_string_view/contains>)(C++23) |  verifica se o string view contém a substring ou caractere fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)  
[ compare](<#/doc/string/basic_string/compare>) |  compara duas strings   
(função membro pública)  
[ substr](<#/doc/string/basic_string/substr>) |  retorna uma substring   
(função membro pública)