# std::isxdigit(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isxdigit( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um dígito hexadecimal pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como um dígito hexadecimal, false caso contrário.

### Possível implementação
```cpp
    template<class CharT>
    bool isxdigit(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::xdigit, ch);
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
    #include <unordered_set>
    
    struct gxdigit_ctype : std::ctype<wchar_t>
    {
        std::unordered_set<wchar_t> greek_digits{L'α', L'β', L'γ', L'δ', L'ε', L'ζ'};
    
        bool do_is(mask m, char_type c) const override
        {
            return (m & xdigit) && greek_digits.contains(c)
                ? true // 6 first Greek small letters will be classified as digits
                : ctype::do_is(m, c); // leave the rest to the parent class
        }
    };
    
    int main()
    {
        std::wstring text = L"0123456789abcdefABCDEFαβγδεζηθικλμ";
        std::locale loc(std::locale(""), new gxdigit_ctype);
    
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale());
    
        std::wcout << "Hexadecimal digits in text: ";
        for (const wchar_t c : text)
            if (std::isxdigit(c, loc))
                std::wcout << c << L' ';
        std::wcout << L'\n';
    
        std::wcout << "Not hexadecimal digits in text: ";
        for (const wchar_t c : text)
            if (not std::isxdigit(c, loc))
                std::wcout << c << L' ';
        std::wcout << L'\n';
    }
```

Saída:
```
    Hexadecimal digits in text: 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F α β γ δ ε ζ
    Not hexadecimal digits in text: η θ ι κ λ μ
```

### Ver também

[ isxdigit](<#/doc/string/byte/isxdigit>) | verifica se um caractere é um caractere hexadecimal
(função)
[ iswxdigit](<#/doc/string/wide/iswxdigit>) | verifica se um caractere largo é um caractere hexadecimal
(função)