# std::sub_match&lt;BidirIt&gt;::operator string_type, std::sub_match&lt;BidirIt&gt;::str

```cpp
operator string_type() const;  // (1)
string_type str() const;  // (2)
```

Converte para um objeto do tipo [std::basic_string](<#/doc/string/basic_string>) subjacente.

1) Uma conversão implícita.

2) Uma conversão explícita.

### Valor de retorno

A sequência de caracteres correspondente como um objeto do tipo [std::basic_string](<#/doc/string/basic_string>) subjacente. Se o membro `matched` for falso, então retorna a string vazia.

### Complexidade

Linear no comprimento da sequência de caracteres subjacente.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        const std::string html{R"("<a href="https://cppreference.com/">)"};
        const std::regex re{"(http|https|ftp)://([a-z]+)\\.([a-z]{3})"};
        std::smatch parts;
        std::regex_search(html, parts, re);
        for (std::ssub_match const& sub : parts)
        {
            const std::string s = sub; // (1) implicit conversion
            assert(s == sub.str());    // (2)
            std::cout << s << '\n';
        }
    }
```

Saída:
```
    https://cppreference.com
    https
    cppreference
    com
```