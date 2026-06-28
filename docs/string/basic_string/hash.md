# std::hash&lt;std::basic_string&gt;

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class A >
struct hash<std::basic_string<char, std::char_traits<char>, A>>;
template< class A >
struct hash<std::basic_string<char16_t, std::char_traits<char16_t>, A>>;
template< class A >
struct hash<std::basic_string<char32_t, std::char_traits<char32_t>, A>>;
template< class A >
struct hash<std::basic_string<wchar_t, std::char_traits<wchar_t>, A>>;
template< class A >
struct hash<std::basic_string<char8_t, std::char_traits<char8_t>, A>>;
```

As especializações de template de [std::hash](<#/doc/utility/hash>) para as várias classes de string permitem aos usuários obter hashes de strings.

Esses hashes são iguais aos hashes das classes [std::basic_string_view](<#/doc/string/basic_string_view>) correspondentes: Se `S` for um desses tipos de string, `SV` for o tipo de string view correspondente, e `s` for um objeto do tipo `S`, então [std::hash](<#/doc/utility/hash>)&lt;S&gt;()(s) == [std::hash](<#/doc/utility/hash>)&lt;SV&gt;()(SV(s)). | (desde C++17)

### Exemplo

O código a seguir mostra uma possível saída de uma função hash usada em uma string:

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <memory_resource>
    #include <string>
    #include <string_view>
    using namespace std::literals;
    
    int main()
    {
        auto sv = "Stand back! I've got jimmies!"sv;
        std::string s(sv);
        std::pmr::string pmrs(sv); // usa o alocador padrão
    
        std::cout << std::hash<std::string_view>{}(sv) << '\n';
        std::cout << std::hash<std::string>{}(s) << '\n';
        std::cout << std::hash<std::pmr::string>{}(pmrs) << '\n';
    }
```

Saída possível:
```
    3544599705012401047
    3544599705012401047
    3544599705012401047
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3705](<https://cplusplus.github.io/LWG/issue3705>) | C++11 | o suporte a hash para [std::basic_string](<#/doc/string/basic_string>) com alocadores personalizados não estava habilitado | habilitado

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)
[ std::hash<std::string_view>std::hash<std::wstring_view>std::hash<std::u8string_view>std::hash<std::u16string_view>std::hash<std::u32string_view>](<#/doc/string/basic_string_view/hash>)(C++17)(C++17)(C++20)(C++17)(C++17) | suporte a hash para string views
(especialização de template de classe)