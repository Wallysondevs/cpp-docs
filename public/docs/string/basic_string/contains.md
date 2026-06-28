# std::basic_string&lt;CharT,Traits,Allocator&gt;::contains

```cpp
constexpr bool
contains( std::basic_string_view<CharT,Traits> sv ) const noexcept;  // (1) (desde C++23)
constexpr bool
contains( CharT ch ) const noexcept;  // (2) (desde C++23)
constexpr bool
contains( const CharT* s ) const;  // (3) (desde C++23)
```

  
Verifica se a string contém a substring fornecida. A substring pode ser uma das seguintes: 

1) Uma string view `sv` (que pode ser o resultado de uma conversão implícita de outra `std::basic_string`).

2) Um único caractere `ch`.

3) Uma string de caracteres terminada em nulo `s`.

Todas as três sobrecargas são equivalentes a retornar `find(x) != npos;`, onde `x` é o parâmetro. 

### Parâmetros

sv  |  \-  |  uma string view que pode ser o resultado de uma conversão implícita de outra `std::basic_string`  
---|---|---
ch  |  \-  |  um único caractere   
s  |  \-  |  uma string de caracteres terminada em nulo   
  
### Valor de retorno

`true` se a string contiver a substring fornecida, `false` caso contrário. 

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_string_contains`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | Funções `contains`   
  
### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <type_traits>
    
    template<typename SubstrType>
    void test_substring(const std::string& str, SubstrType subs)
    {
        constexpr char delim = std::is_scalar_v<SubstrType> ? '\'' : '\"';
        std::cout << std::quoted(str)
                  << (str.contains(subs) ? " contains "
                                         : " does not contain ")
                  << std::quoted(std::string{subs}, delim) << '\n';
    }
    
    int main()
    {
        using namespace std::literals;
    
        auto helloWorld = "hello world"s;
    
        test_substring(helloWorld, "hello"sv);
        test_substring(helloWorld, "goodbye"sv);
        test_substring(helloWorld, 'w');
        test_substring(helloWorld, 'x');
    }
```

Saída: 
```
    "hello world" contains "hello"
    "hello world" does not contain "goodbye"
    "hello world" contains 'w'
    "hello world" does not contain 'x'
```

### Veja também

[ starts_with](<#/doc/string/basic_string/starts_with>)(C++20) | verifica se a string começa com o prefixo fornecido   
(função membro pública)  
[ ends_with](<#/doc/string/basic_string/ends_with>)(C++20) | verifica se a string termina com o sufixo fornecido   
(função membro pública)  
[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida   
(função membro pública)  
[ substr](<#/doc/string/basic_string/substr>) | retorna uma substring   
(função membro pública)  
[ contains](<#/doc/string/basic_string_view/contains>)(C++23) | verifica se a string view contém a substring ou caractere fornecido   
(função membro pública de `std::basic_string_view<CharT,Traits>`)