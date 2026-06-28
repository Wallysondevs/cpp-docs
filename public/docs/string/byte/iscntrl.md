# std::iscntrl

Definido no cabeçalho `[<cctype>](<#/doc/header/cctype>)`

```c
int iscntrl( int ch );
```

Verifica se o caractere fornecido é um caractere de controle conforme classificado pela locale C atualmente instalada. Na locale padrão, "C", os caracteres de controle são os caracteres com os códigos `0x00-0x1F` e `0x7F`.

O comportamento é indefinido se o valor de ch não for representável como unsigned char e não for igual a [EOF](<#/doc/io/c>).

### Parâmetros

- **ch** — caractere a ser classificado

### Valor de retorno

Valor diferente de zero se o caractere for um caractere de controle, zero caso contrário.

### Observações

Assim como todas as outras funções de [`<cctype>`](<#/doc/header/cctype>), o comportamento de `std::iscntrl` é indefinido se o valor do argumento não for representável como unsigned char nem igual a [EOF](<#/doc/io/c>). Para usar essas funções com segurança com plain chars (ou signed chars), o argumento deve primeiro ser convertido para unsigned char:
```cpp
    bool my_iscntrl(char ch)
    {
        return std::iscntrl(static_cast<unsigned char>(ch));
    }
```

Similarmente, elas não devem ser usadas diretamente com algoritmos padrão quando o tipo de valor do iterator for char ou signed char. Em vez disso, converta o valor para unsigned char primeiro:
```cpp
    int count_cntrls(const std::string& s)
    {
        return std::count_if(s.begin(), s.end(),
                          // static_cast<int(*)(int)>(std::iscntrl)         // wrong
                          // { return std::iscntrl(c); }           // wrong
                          // { return std::iscntrl(c); }          // wrong
                             { return std::iscntrl(c); } // correct
                            );
    }
```

### Exemplo

Execute este código
```cpp
    #include <cctype>
    #include <clocale>
    #include <iostream>
    
    int main()
    {
        unsigned char c = '\x94'; // the control code CCH in ISO-8859-1
    
        std::cout << "iscntrl('\\x94', default C locale) returned "
                  << std::boolalpha << !!std::iscntrl(c) << '\n';
    
        std::setlocale(LC_ALL, "en_GB.iso88591");
        std::cout << "iscntrl('\\x94', ISO-8859-1 locale) returned "
                  << !!std::iscntrl(c) << '\n';
    
    }
```

### Saída possível:
```
    iscntrl('\x94', default C locale) returned false
    iscntrl('\x94', ISO-8859-1 locale) returned true
```

### Veja também

[ iscntrl(std::locale)](<#/doc/locale/iscntrl>) | verifica se um caractere é classificado como caractere de controle por uma locale
(modelo de função)
[ iswcntrl](<#/doc/string/wide/iswcntrl>) | verifica se um caractere largo é um caractere de controle
(função)
[documentação C](<#/>) para iscntrl
Valores ASCII | caracteres | `iscntrl`
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
[`iswdigit`](<#/doc/string/wide/iswdigit>) | [`isxdigit`](<#/doc/string/byte/isxdigit>)
[`iswxdigit`](<#/doc/string/wide/iswxdigit>)
decimal | hexadecimal | octal
---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---
0–8 | `\x0`–`\x8` | `\0`–`\10` | códigos de controle (NUL, etc.) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
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
127 | `\x7F` | `\177` | caractere backspace (DEL) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`