# std::fgetws

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* fgetws( wchar_t* str, int count, std::FILE* stream );
```

Lê no máximo `count - 1` caracteres largos do fluxo de arquivo fornecido e os armazena em `str`. A string larga produzida é sempre terminada em nulo. A análise para se o fim do arquivo ocorrer ou se um caractere largo de nova linha for encontrado, caso em que `str` conterá esse caractere largo de nova linha.

### Parâmetros

- **str** — string larga para onde os caracteres serão lidos
- **count** — o comprimento de `str`
- **stream** — fluxo de arquivo de onde os dados serão lidos

### Valor de retorno

`str` em caso de sucesso, um ponteiro nulo em caso de erro.

### Exemplo

Execute este código
```
    #include <array>
    #include <clocale>
    #include <cstdio>
    #include <cstdlib>
    #include <cwchar>
    #include <cwctype>
    #include <iomanip>
    #include <iostream>
    #include <span>
    #include <string>
    
    void dump(std::span<const wchar_t> sp, std::size_t width = 14)
    {
        for (wchar_t wc : sp)
            std::wcout << (std::iswprint(wc) ? wc : L'.');
        std::wcout << std::wstring(width > sp.size() ? width - sp.size() : 1, L' ')
                   << std::hex << std::uppercase << std::setfill(L'0');
        for (wchar_t wc : sp)
            std::wcout << std::setw(sizeof wc) << static_cast<unsigned>(wc) << ' ';
        std::wcout << '\n';
    }
    
    int main()
    {
        // Create temp file that contains wide characters
        std::setlocale(LC_ALL, "en_US.utf8");
        std::FILE* tmpf = std::tmpfile();
    
        for (const wchar_t* text : {
            L"Tétraèdre"    L"\n",
            L"Cube"         L"\n",
            L"Octaèdre"     L"\n",
            L"Icosaèdre"    L"\n",
            L"Dodécaèdre"   L"\n"
            })
            if (int rc = std::fputws(text, tmpf); rc == EOF)
            {
                std::perror("fputws()"); // POSIX requires that errno is set
                return EXIT_FAILURE;
            }
    
        std::rewind(tmpf);
    
        std::array<wchar_t, 12> buf;
        while (std::fgetws(buf.data(), buf.size(), tmpf) != nullptr)
            dump(std::span(buf.data(), buf.size()));
    
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    Tétraèdre...  0054 00E9 0074 0072 0061 00E8 0064 0072 0065 000A 0000 0000
    Cube..dre...  0043 0075 0062 0065 000A 0000 0064 0072 0065 000A 0000 0000
    Octaèdre....  004F 0063 0074 0061 00E8 0064 0072 0065 000A 0000 0000 0000
    Icosaèdre...  0049 0063 006F 0073 0061 00E8 0064 0072 0065 000A 0000 0000
    Dodécaèdre..  0044 006F 0064 00E9 0063 0061 00E8 0064 0072 0065 000A 0000
```

### Veja também

[ wscanffwscanfswscanf](<#/doc/io/c/fwscanf>) | lê entrada formatada de caracteres largos de `stdin`, um fluxo de arquivo ou um buffer
(função)
[ fgetwcgetwc](<#/doc/io/c/fgetwc>) | obtém um caractere largo de um fluxo de arquivo
(função)
[ fputws](<#/doc/io/c/fputws>) | escreve uma string larga em um fluxo de arquivo
(função)
[documentação C](<#/>) para fgetws