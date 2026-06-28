# std::basic_string&lt;CharT,Traits,Allocator&gt;::ends_with

```cpp
constexpr bool
ends_with( std::basic_string_view<CharT, Traits> sv ) const noexcept;  // (1) (desde C++20)
constexpr bool
ends_with( CharT ch ) const noexcept;  // (2) (desde C++20)
constexpr bool
ends_with( const CharT* s ) const;  // (3) (desde C++20)
```

  
Verifica se a string termina com o sufixo fornecido. O sufixo pode ser um dos seguintes: 

1) Uma string view sv (que pode ser o resultado de uma conversão implícita de outra `std::basic_string`).

2) Um único caractere ch.

3) Uma string de caracteres terminada em nulo s.

Todas as três sobrecargas efetivamente retornam [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>(data(), size()).ends_with(x), onde `x` é o parâmetro. 

### Parâmetros

sv  |  \-  |  uma string view que pode ser o resultado de uma conversão implícita de outra `std::basic_string`  
---|---|---
ch  |  \-  |  um único caractere   
s  |  \-  |  uma string de caracteres terminada em nulo   
  
### Valor de retorno

true se a string terminar com o sufixo fornecido, false caso contrário. 

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_starts_ends_with`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | Verificação de prefixo e sufixo de string: starts_with() e ends_with()  
  
### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <string>
    #include <string_view>
     
    int main()
    {
        using namespace std::literals;
     
        const auto str = "Hello, C++20!"s;
     
        assert
        (""
            && str.ends_with("C++20!"sv)  // (1)
            && !str.ends_with("c++20!"sv) // (1)
            && str.ends_with("C++20!"s)   // (1) implicit conversion string to string_view
            && !str.ends_with("c++20!"s)  // (1) implicit conversion string to string_view
            && str.ends_with('!')         // (2)
            && !str.ends_with('?')        // (2)
            && str.ends_with("C++20!")    // (3)
            && !str.ends_with("c++20!")   // (3)
        );
    }
```

### Veja também

[ starts_with](<#/doc/string/basic_string/starts_with>)(C++20) |  verifica se a string começa com o prefixo fornecido   
(função membro pública)  
[ starts_with](<#/doc/string/basic_string_view/starts_with>)(C++20) |  verifica se a string view começa com o prefixo fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)  
[ ends_with](<#/doc/string/basic_string_view/ends_with>)(C++20) |  verifica se a string view termina com o sufixo fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)  
[ contains](<#/doc/string/basic_string/contains>)(C++23) |  verifica se a string contém a substring ou caractere fornecido   
(função membro pública)  
[ contains](<#/doc/string/basic_string_view/contains>)(C++23) |  verifica se a string view contém a substring ou caractere fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)  
[ compare](<#/doc/string/basic_string/compare>) |  compara duas strings   
(função membro pública)  
[ substr](<#/doc/string/basic_string/substr>) |  retorna uma substring   
(função membro pública)