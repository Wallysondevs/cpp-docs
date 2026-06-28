# std::iswupper

Definido no header `[<cwctype>](<#/doc/header/cwctype>)`

```cpp
int iswupper( std::wint_t ch );
```

Verifica se o wide character fornecido é uma letra maiúscula, ou seja, uma das `ABCDEFGHIJKLMNOPQRSTUVWXYZ` ou qualquer letra maiúscula específica da locale atual.

Se o valor de ch não for representável como um wchar_t nem igual ao valor da macro WEOF, o comportamento é indefinido.

### Parâmetros

- **ch** — wide character

### Valor de retorno

Valor diferente de zero se o wide character for uma letra maiúscula, zero caso contrário.

### Notas

[ISO 30112](<https://www.open-std.org/JTC1/SC35/WG5/docs/30112d10.pdf>) especifica quais caracteres Unicode estão incluídos na categoria POSIX de maiúsculas.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwctype>
    #include <iostream>
    
    int main()
    {
        const wchar_t c = L'\u053d'; // Armenian capital letter xeh ('Խ')
    
        std::cout << std::hex << std::showbase << std::boolalpha;
        std::cout << "in the default locale, iswupper("
                  << static_cast<std::wint_t>(c) << ") = "
                  << static_cast<bool>(std::iswupper(c)) << '\n';
    
        std::setlocale(LC_ALL, "en_US.utf8");
        std::cout << "in Unicode locale, iswupper("
                  << static_cast<std::wint_t>(c) << ") = "
                  << static_cast<bool>(std::iswupper(c)) << '\n';
    }
```

Saída:
```
    in the default locale, iswupper(0x53d) = false
    in Unicode locale, iswupper(0x53d) = true
```

### Veja também

[ isupper(std::locale)](<#/doc/locale/isupper>) | verifica se um caractere é classificado como maiúsculo por uma locale
(modelo de função)
[ isupper](<#/doc/string/byte/isupper>) | verifica se um caractere é um caractere maiúsculo
(função)
[Documentação C](<#/>) para iswupper
Valores ASCII | caracteres | [`iscntrl`](<#/doc/string/byte/iscntrl>)
---|---
[`iswcntrl`](<#/doc/string/wide/iswcntrl>) | [`isprint`](<#/doc/string/byte/isprint>)
[`iswprint`](<#/doc/string/wide/iswprint>) | [`isspace`](<#/doc/string/byte/isspace>)
[`iswspace`](<#/doc/string/wide/iswspace>) | [`isblank`](<#/doc/string/byte/isblank>)
[`iswblank`](<#/doc/string/wide/iswblank>) | [`isgraph`](<#/doc/string/byte/isgraph>)
[`iswgraph`](<#/doc/string/wide/iswgraph>) | [`ispunct`](<#/doc/string/byte/ispunct>)
[`iswpunct`](<#/doc/string/wide/iswpunct>) | [`isalnum`](<#/doc/string/byte/isalnum>)
[`iswalnum`](<#/doc/string/wide/iswalnum>) | [`isalpha`](<#/doc/string/byte/isalpha>)
[`iswalpha`](<#/doc/string/wide/iswalpha>) | [`isupper`](<#/doc/string/byte/isupper>)
`iswupper` | [`islower`](<#/doc/string/byte/islower>)
[`iswlower`](<#/doc/string/wide/iswlower>) | [`isdigit`](<#/doc/string/byte/isdigit>)
[`iswdigit`](<#/doc/string/wide/iswdigit>) | [`isxdigit`](<#/doc/string/byte/isxdigit>)
[`iswxdigit`](<#/doc/string/wide/iswxdigit>)
decimal | hexadecimal | octal
---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---
0–8 | `\x0`–`\x8` | `\0`–`\10` | códigos de controle (`NUL`, etc.) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
9 | `\x9` | `\11` | tab (`\t`) | `≠0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
10–13 | `\xA`–`\xD` | `\12`–`\15` | espaços em branco (`\n`, `\v`, `\f`, `\r`) | `≠0` | `0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
14–31 | `\xE`–`\x1F` | `\16`–`\37` | códigos de controle | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
32 | `\x20` | `\40` | espaço | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
33–47 | `\x21`–`\x2F` | `\41`–`\57` | `!"#$%&'()*+,-./` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
48–57 | `\x30`–`\x39` | `\60`–`\71` | `0123456789` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `0` | `0` | `0` | `≠0` | `≠0`
58–64 | `\x3A`–`\x40` | `\72`–`\100` | `:;<=>?@` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
65–70 | `\x41`–`\x46` | `\101`–`\106` | `ABCDEF` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `≠0`
71–90 | `\x47`–`\x5A` | `\107`–`\132` | `GHIJKLMNOP`
`QRSTUVWXYZ` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `0`
91–96 | `\x5B`–`\x60` | `\133`–`\140` | `[\]^_` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
97–102 | `\x61`–`\x66` | `\141`–`\146` | `abcdef` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `0` | `≠0` | `0` | `≠0`
103–122 | `\x67`–`\x7A` | `\147`–`\172` | `ghijklmnop`
`qrstuvwxyz` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `0` | `≠0` | `0` | `0`
123–126 | `\x7B`–`\x7E` | `\172`–`\176` | `{|}~` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
127 | `\x7F` | `\177` | caractere backspace (`DEL`) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`