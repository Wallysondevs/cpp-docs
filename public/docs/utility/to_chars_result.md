# std::to_chars_result

Definido no cabeçalho `[<charconv>](<#/doc/header/charconv>)`

```c
struct to_chars_result;
```

`std::to_chars_result` é o tipo de retorno de [`std::to_chars`](<#/doc/utility/to_chars>). Não possui classes base e tem apenas os seguintes membros.

### Membros de dados

Nome do membro | Definição
---|---
ptr | um ponteiro do tipo char*
(objeto membro público)
ec | um código de erro do tipo [std::errc](<#/doc/error/errc>)
(objeto membro público)

### Funções membro e friend

## operator==(std::to_chars_result)

```cpp
friend bool operator==( const to_chars_result&,
const to_chars_result& ) = default;  // (desde C++20)
```

Compara os dois argumentos usando [comparações padrão](<#/doc/language/default_comparisons>) (que usa operator== para comparar `ptr` e `ec` respectivamente).

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::to_chars_result é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

## operator bool

```cpp
constexpr explicit operator bool() const noexcept;  // (desde C++26)
```

Verifica se a conversão foi bem-sucedida. Retorna ec == [std::errc](<#/doc/error/errc>){}.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_to_chars`](<#/doc/feature_test>) | [`201611L`](<#/>) | (C++17) | Conversões de string elementares ([`std::to_chars`](<#/doc/utility/to_chars>), [`std::from_chars`](<#/doc/utility/from_chars>))
[`202306L`](<#/>) | (C++26) | Testando o sucesso ou falha das funções de [`<charconv>`](<#/doc/header/charconv>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <charconv>
    #include <iostream>
    #include <string_view>
    #include <system_error>
    
    void show_to_chars(auto... format_args)
    {
        std::array<char, 10> str;
    
    #if __cpp_lib_to_chars >= 202306L and __cpp_structured_bindings >= 202406L
        // use C++26 structured bindings declaration as condition (P0963)
        // and C++26 to_chars_result::operator bool() for error checking (P2497)
        if (auto [ptr, ec] =
                std::to_chars(str.data(), str.data() + str.size(), format_args...))
            std::cout << std::string_view(str.data(), ptr) << '\n';
        else
            std::cout << std::make_error_code(ec).message() << '\n';
    #elif __cpp_lib_to_chars >= 202306L
        // use C++26 to_chars_result::operator bool() for error checking (P2497)
        if (auto result =
                std::to_chars(str.data(), str.data() + str.size(), format_args...))
            std::cout << std::string_view(str.data(), result.ptr) << '\n';
        else
            std::cout << std::make_error_code(result.ec).message() << '\n';
    #else
        // fallback to C++17 if-with-initializer and structured bindings
        if (auto [ptr, ec] =
                std::to_chars(str.data(), str.data() + str.size(), format_args...);
            ec == std::errc())
            std::cout << std::string_view(str.data(), ptr - str.data()) << '\n';
        else
            std::cout << std::make_error_code(ec).message() << '\n';
    #endif
    }
    
    int main()
    {
        show_to_chars(42);
        show_to_chars(+3.14159F);
        show_to_chars(-3.14159, std::chars_format::fixed);
        show_to_chars(-3.14159, std::chars_format::scientific, 3);
        show_to_chars(3.1415926535, std::chars_format::fixed, 10);
    }
```

Saída possível:
```
    42
    3.14159
    -3.14159
    -3.142e+00
    Value too large for defined data type
```

### Veja também

[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(função)