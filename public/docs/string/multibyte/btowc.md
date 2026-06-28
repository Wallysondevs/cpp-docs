# std::btowc

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::wint_t btowc( int c );
```

Amplia um caractere de byte único c para seu equivalente de caractere largo.

A maioria das codificações de caracteres multibyte usa códigos de byte único para representar os caracteres do conjunto de caracteres ASCII. Esta função pode ser usada para converter tais caracteres para wchar_t.

### Parâmetros

- **c** — caractere de byte único a ser ampliado

### Valor de retorno

WEOF se c for [`EOF`](<#/doc/io/c>).

Representação de caractere largo de c se (unsigned char)c for um caractere de byte único válido no estado de mudança inicial, WEOF caso contrário.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
     
    void try_widen(char c)
    {
        std::wint_t w = std::btowc(c);
        if (w != WEOF)
            std::cout << "The single-byte character " << +(unsigned char)c
                      << " widens to " << +w << '\n';
        else
            std::cout << "The single-byte character " << +(unsigned char)c
                      << " failed to widen\n";
    }
     
    int main()
    {
        std::setlocale(LC_ALL, "lt_LT.iso88594");
        std::cout << std::hex << std::showbase << "In Lithuanian ISO-8859-4 locale:\n";
        try_widen('A');
        try_widen('\xdf'); // German letter ß (U+00df) in ISO-8859-4
        try_widen('\xf9'); // Lithuanian letter ų (U+0173) in ISO-8859-4
     
        std::setlocale(LC_ALL, "lt_LT.utf8");
        std::cout << "In Lithuanian UTF-8 locale:\n";
        try_widen('A');
        try_widen('\xdf');
        try_widen('\xf9');
    }
```

Saída possível:
```
    In Lithuanian ISO-8859-4 locale:
    The single-byte character 0x41 widens to 0x41
    The single-byte character 0xdf widens to 0xdf
    The single-byte character 0xf9 widens to 0x173
    In Lithuanian UTF-8 locale:
    The single-byte character 0x41 widens to 0x41
    The single-byte character 0xdf failed to widen
    The single-byte character 0xf9 failed to widen
```

### Veja também

[ wctob](<#/doc/string/multibyte/wctob>) | estreita um caractere largo para um caractere estreito de byte único, se possível
(função)
[ do_widen](<#/doc/locale/ctype/widen>)[virtual] | converte um caractere ou caracteres de char para `CharT`
(função membro virtual protegida de `std::ctype<CharT>`)
[Documentação C](<#/>) para btowc