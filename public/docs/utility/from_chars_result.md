# std::from_chars_result

Definido no cabeçalho `<charconv>`

```c
struct from_chars_result;
```

`std::from_chars_result` é o tipo de retorno de [`std::from_chars`](<#/doc/utility/from_chars>). Não possui classes base e tem apenas os seguintes membros.

### Membros de dados

Nome do membro | Definição
---|---
ptr | um ponteiro do tipo const char*
(objeto membro público)
ec | um código de erro do tipo [std::errc](<#/doc/error/errc>)
(objeto membro público)

### Funções membro e amigas

## operator==(std::from_chars_result)

```cpp
friend bool operator==( const from_chars_result&,
const from_chars_result& ) = default;  // (desde C++20)
```

Compara os dois argumentos usando [comparações padrão](<#/doc/language/default_comparisons>) (que usa operator== para comparar `ptr` e `ec` respectivamente).

Esta função não é visível para pesquisa [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [pesquisa dependente de argumento (ADL)](<#/doc/language/adl>) quando std::from_chars_result é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

## operator bool

```cpp
constexpr explicit operator bool() const noexcept;  // (desde C++26)
```

Verifica se a conversão foi bem-sucedida. Retorna ec == [std::errc](<#/doc/error/errc>){}.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_to_chars`](<#/doc/feature_test>) | [`201611L`](<#/>) | (C++17) | Conversões elementares de string ([`std::to_chars`](<#/doc/utility/to_chars>), [`std::from_chars`](<#/doc/utility/from_chars>))
[`202306L`](<#/>) | (C++26) | Teste de sucesso ou falha das funções de [`<charconv>`](<#/doc/header/charconv>)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <charconv>
    #include <iomanip>
    #include <iostream>
    #include <optional>
    #include <string_view>
    #include <system_error>
    
    int main()
    {
        for (std::string_view const str : {"1234", "15 foo", "bar", " 42", "5000000000"})
        {
            std::cout << "String: " << std::quoted(str) << ". ";
            int result{};
            auto [ptr, ec] = std::from_chars(str.data(), str.data() + str.size(), result);
    
            if (ec == std::errc())
                std::cout << "Result: " << result << ", ptr -> " << std::quoted(ptr) << '\n';
            else if (ec == std::errc::invalid_argument)
                std::cout << "This is not a number.\n";
            else if (ec == std::errc::result_out_of_range)
                std::cout << "This number is larger than an int.\n";
        }
    
        // C++23's constexpr from_char demo / C++26's operator bool() demo:
        auto to_int =  -> std::optional<int>
        {
            int value{};
    #if __cpp_lib_to_chars >= 202306L
            if (std::from_chars(s.data(), s.data() + s.size(), value))
    #else
            if (std::from_chars(s.data(), s.data() + s.size(), value).ec == std::errc{})
    #endif
                return value;
            else
                return std::nullopt;
        };
    
        assert(to_int("42") == 42);
        assert(to_int("foo") == std::nullopt);
    #if __cpp_lib_constexpr_charconv and __cpp_lib_optional >= 202106
        static_assert(to_int("42") == 42);
        static_assert(to_int("foo") == std::nullopt);
    #endif
    }
```

Saída:
```
    String: "1234". Result: 1234, ptr -> ""
    String: "15 foo". Result: 15, ptr -> " foo"
    String: "bar". This is not a number.
    String: " 42". This is not a number.
    String: "5000000000". This number is larger than an int.
```

### Veja também

[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)