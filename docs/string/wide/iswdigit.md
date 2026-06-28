# std::iswdigit

Definido no header `[<cwctype>](<#/doc/header/cwctype>)`

```cpp
int iswdigit( wint_t ch );
```

Verifica se o wide character fornecido corresponde (se estreitado) a um dos dez caracteres de dígito decimal 0123456789.

Se o valor de ch não for representável como um wchar_t nem igual ao valor da macro WEOF, o comportamento é indefinido.

### Parâmetros

- **ch** — wide character

### Valor de retorno

Valor não zero se o wide character for um caractere numérico, zero caso contrário.

### Observações

`std::iswdigit` e [std::iswxdigit](<#/doc/string/wide/iswxdigit>) são as únicas funções padrão de classificação de wide character que não são afetadas pelo locale C atualmente instalado.

### Exemplo

Alguns locales oferecem classes de caracteres adicionais que detectam dígitos não-ASCII

Execute este código
```
    #include <clocale>
    #include <cwctype>
    #include <iostream>
    
    void test(wchar_t a3, wchar_t u3, wchar_t j3)
    {
        std::wcout << std::boolalpha
                   << "\t   '" << a3 << "'   '" << u3 << "'  '" << j3  << "'\n"
                   << "iswdigit: "
                   << (bool)std::iswdigit(a3) << "  "
                   << (bool)std::iswdigit(u3) << " "
                   << (bool)std::iswdigit(j3) << '\n'
                   << "jdigit:   "
                   << (bool)std::iswctype(a3, std::wctype("jdigit")) << ' '
                   << (bool)std::iswctype(u3, std::wctype("jdigit")) << ' '
                   << (bool)std::iswctype(j3, std::wctype("jdigit")) << '\n';
    }
    
    int main()
    {
        wchar_t a3 = L'3';  // the ASCII digit 3
        wchar_t u3 = L'三'; // the CJK numeral 3
        wchar_t j3 = L'３'; // the full-width digit 3
    
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout << "In American locale:\n";
        test(a3, u3, j3);
    
        std::wcout << "\nIn Japanese locale:\n";
        std::setlocale(LC_ALL, "ja_JP.utf8");
        test(a3, u3, j3);
    }
```

Saída possível:
```
    In American locale:
               '3'   '三'  '３'
    iswdigit: true  false false
    jdigit:   false false false
    
    In Japanese locale:
               '3'   '三'  '３'
    iswdigit: true  false false
    jdigit:   false false true
```

### Veja também

[ isdigit(std::locale)](<#/doc/locale/isdigit>) | verifica se um caractere é classificado como um dígito por um locale
(modelo de função)
[ isdigit](<#/doc/string/byte/isdigit>) | verifica se um caractere é um dígito
(função)
[Documentação C](<#/>) para iswdigit
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
[`iswupper`](<#/doc/string/wide/iswupper>) | [`islower`](<#/doc/string/byte/islower>)
[`iswlower`](<#/doc/string/wide/iswlower>) | [`isdigit`](<#/doc/string/byte/isdigit>)
`iswdigit` | [`isxdigit`](<#/doc/string/byte/isxdigit>)
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
71–90 | `\x47`–`\x5A` | `\107`–`\132` | `GHIJKLMNOP` `QRSTUVWXYZ` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `0`
91–96 | `\x5B`–`\x60` | `\133`–`\140` | `[\]^_` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
97–102 | `\x61`–`\x66` | `\141`–`\146` | `abcdef` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `0` | `≠0` | `0` | `≠0`
103–122 | `\x67`–`\x7A` | `\147`–`\172` | `ghijklmnop` `qrstuvwxyz` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `0` | `≠0` | `0` | `0`
123–126 | `\x7B`–`\x7E` | `\172`–`\176` | `{|}~` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
127 | `\x7F` | `\177` | caractere backspace (`DEL`) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`