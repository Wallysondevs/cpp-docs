# std::putwchar

Definido no header `[<cwchar>](<#/doc/header/cwchar>)`

```cpp
std::wint_t putwchar( wchar_t ch );
```

Escreve um caractere largo ch para [stdout](<#/doc/io/c/std_streams>).

### Parâmetros

- **ch** — caractere largo a ser escrito

### Valor de retorno

ch em caso de sucesso, WEOF em caso de falha.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdio>
    #include <cstdlib>
    #include <cwchar>
    #include <initializer_list>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
    
        for (const wchar_t ch : {
            L'\u2200', // Unicode name: "FOR ALL"
            L'∀',
            L'\n'
            })
            if (std::putwchar(ch) == WEOF)
            {
                std::puts("I/O error in std::putwchar");
                return EXIT_FAILURE;
            }
    
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    ∀∀
```

### Veja também

[ putchar](<#/doc/io/c/putchar>) | escreve um caractere para [stdout](<#/doc/io/c/std_streams>)
(função)
[ fputwcputwc](<#/doc/io/c/fputwc>) | escreve um caractere largo para um stream de arquivo
(função)
[Documentação C](<#/>) para putwchar