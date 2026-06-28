# std::wctob

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int wctob( std::wint_t c );
```

Restringe um caractere largo `c` se seu equivalente de caractere multibyte no estado de mudança inicial for um único byte.

Isso é tipicamente possível para os caracteres do conjunto de caracteres ASCII, já que a maioria das codificações multibyte (como UTF-8) usa bytes únicos para codificar esses caracteres.

### Parâmetros

- **c** — caractere largo a ser restringido

### Valor de retorno

[EOF](<#/doc/io/c>) se `c` não representar um caractere multibyte com comprimento 1 no estado de mudança inicial.

Caso contrário, a representação de byte único de `c` como `unsigned char` convertida para `int`.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    
    void try_narrowing(wchar_t c)
    {
        int cn = std::wctob(c);
        if (cn != EOF)
            std::cout << '\'' << int(c) << "' narrowed to " << +cn << '\n';
        else
            std::cout << '\'' << int(c) << "' could not be narrowed\n";
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "th_TH.utf8");
        std::cout << std::hex << std::showbase << "In Thai UTF-8 locale:\n";
        try_narrowing(L'a');
        try_narrowing(L'๛');
    
        std::setlocale(LC_ALL, "th_TH.tis620");
        std::cout << "In Thai TIS-620 locale:\n";
        try_narrowing(L'a');
        try_narrowing(L'๛');
    }
```

Saída:
```
    In Thai UTF-8 locale:
    '0x61' narrowed to 0x61
    '0xe5b' could not be narrowed
    In Thai TIS-620 locale:
    '0x61' narrowed to 0x61
    '0xe5b' narrowed to 0xfb
```

### Veja também

[ btowc](<#/doc/string/multibyte/btowc>) | expande um caractere estreito de byte único para caractere largo, se possível
(função)
[ narrow](<#/doc/io/basic_ios/narrow>) | restringe caracteres
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ narrow](<#/doc/locale/ctype/narrow>) | invoca `do_narrow`
(função membro pública de `std::ctype<CharT>`)
[Documentação C](<#/>) para wctob