# std::literals::string_literals::operator""s

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
std::string operator""s( const char* str, std::size_t len );
(constexpr desde C++20)
constexpr std::u8string operator""s( const char8_t* str,
std::size_t len );
std::u16string operator""s( const char16_t* str, std::size_t len );
(constexpr desde C++20)
std::u32string operator""s( const char32_t* str, std::size_t len );
(constexpr desde C++20)
std::wstring operator""s( const wchar_t* str, std::size_t len );
(constexpr desde C++20)
```

Forma um literal de string do tipo desejado.

1) Retorna [std::string](<#/doc/string/basic_string>){str, len}.

2) Retorna [std::u8string](<#/doc/string/basic_string>){str, len}.

3) Retorna [std::u16string](<#/doc/string/basic_string>){str, len}.

4) Retorna [std::u32string](<#/doc/string/basic_string>){str, len}.

5) Retorna [std::wstring](<#/doc/string/basic_string>){str, len}.

### Parâmetros

- **str** — ponteiro para o início do literal de array de caracteres bruto
- **len** — comprimento do literal de array de caracteres bruto

### Valor de retorno

O literal de string.

### Notas

Esses operadores são declarados no namespace std::literals::string_literals, onde tanto `literals` quanto `string_literals` são inline namespaces. O acesso a esses operadores pode ser obtido com qualquer uma das seguintes diretivas using:

*   using namespace std::literals
*   using namespace std::string_literals
*   using namespace std::literals::string_literals

[std::chrono::duration](<#/doc/chrono/duration>) também define [`operator""s`](<#/doc/chrono/operator_q__q_s>) para representar segundos literais, mas é um literal aritmético: 10.0s e 10s são dez segundos, mas "10"s é uma string.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_string_udls`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Literais definidos pelo usuário para tipos de string

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    void print_with_zeros(const auto note, const std::string& s)
    {
        std::cout << note;
        for (const char c : s)
            c ? std::cout << c : std::cout << "₀";
        std::cout << " (size = " << s.size() << ")\n";
    }
    
    int main()
    {
        using namespace std::string_literals;
    
        std::string s1 = "abc\0\0def";
        std::string s2 = "abc\0\0def"s;
        print_with_zeros("s1: ", s1);
        print_with_zeros("s2: ", s2);
    
        std::cout << "abcdef"s.substr(1,4) << '\n';
    }
```

Saída:
```
    s1: abc (size = 3)
    s2: abc₀₀def (size = 8)
    bcde
```

### Veja também

[ (construtor)](<#/doc/string/basic_string/basic_string>) | constrói um `basic_string`
(função membro pública)
[ operator""sv](<#/doc/string/basic_string_view/operator_q__q_sv>)(C++17) | cria uma string view de um literal de array de caracteres
(função)