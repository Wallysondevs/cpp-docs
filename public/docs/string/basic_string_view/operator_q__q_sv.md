# std::literals::string_view_literals::operator""sv

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`

```c
constexpr std::string_view
operator ""sv( const char* str, std::size_t len ) noexcept;
constexpr std::u8string_view
operator ""sv( const char8_t* str, std::size_t len ) noexcept;
constexpr std::u16string_view
operator ""sv( const char16_t* str, std::size_t len ) noexcept;
constexpr std::u32string_view
operator ""sv( const char32_t* str, std::size_t len ) noexcept;
constexpr std::wstring_view
operator ""sv( const wchar_t* str, std::size_t len ) noexcept;
```

Cria uma string view de um literal de caractere.

1) Retorna [std::string_view](<#/doc/string/basic_string_view>){str, len}.

2) Retorna [std::u8string_view](<#/doc/string/basic_string_view>){str, len}.

3) Retorna [std::u16string_view](<#/doc/string/basic_string_view>){str, len}.

4) Retorna [std::u32string_view](<#/doc/string/basic_string_view>){str, len}.

5) Retorna [std::wstring_view](<#/doc/string/basic_string_view>){str, len}.

### Parâmetros

- **str** — ponteiro para o início do literal de array de caracteres bruto
- **len** — comprimento do literal de array de caracteres bruto

### Valor de retorno

O literal [std::basic_string_view](<#/doc/string/basic_string_view>).

### Observações

Esses operadores são declarados no namespace `std::literals::string_view_literals`, onde tanto `literals` quanto `string_view_literals` são inline namespaces. O acesso a esses operadores pode ser obtido com qualquer um dos seguintes:

*   `using namespace std::literals`,
*   `using namespace std::string_view_literals`, ou
*   `using namespace std::literals::string_view_literals`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    #include <typeinfo>
    
    void print_each_character(const std::string_view sw)
    {
        for (char c : sw)
            std::cout << (c == '\0' ? '@' : c);
        std::cout << '\n';
    }
    
    int main()
    {
        using namespace std::literals;
    
        std::string_view s1 = "abc\0\0def";
        std::string_view s2 = "abc\0\0def"sv;
    
        std::cout << "s1.size(): " << s1.size() << "; s1: ";
        print_each_character(s1);
        std::cout << "s2.size(): " << s2.size() << "; s2: ";
        print_each_character(s2);
    
        std::cout << "substr(1, 4): " << "abcdef"sv.substr(1, 4) << '\n';
    
        auto value_type_info = []<typename T>(T)
        {
            using V = typename T::value_type;
            std::cout << "sizeof " << typeid(V).name() << ": " << sizeof(V) << '\n';
        };
    
        value_type_info("char A"sv);
        value_type_info(L"wchar_t ∀"sv);
        value_type_info(u8"char8_t ∆"sv);
        value_type_info(u"char16_t ∇"sv);
        value_type_info(U"char32_t ∃"sv);
        value_type_info(LR"(raw ⊞)"sv);
    }
```

Saída possível:
```
    s1.size(): 3; s1: abc
    s2.size(): 8; s2: abc@@def
    substr(1, 4): bcde
    sizeof char: 1
    sizeof wchar_t: 4
    sizeof char8_t: 1
    sizeof char16_t: 2
    sizeof char32_t: 4
    sizeof wchar_t: 4
```

### Veja também

[ (construtor)](<#/doc/string/basic_string_view/basic_string_view>) | constrói um `basic_string_view`
(função membro pública)
[ operator""s](<#/doc/string/basic_string/operator_q__q_s>)(C++14) | converte um literal de array de caracteres para `basic_string`
(função)
*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão