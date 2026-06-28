# std::fputwc

Definido no cabeçalho `<cwchar>`

```c
std::wint_t fputwc( wchar_t ch, std::FILE* stream );
std::wint_t putwc( wchar_t ch, std::FILE* stream );
```

Escreve um caractere largo ch no stream de saída stream fornecido.

2) Pode ser implementado como uma macro e pode avaliar stream mais de uma vez.

### Parâmetros

- **ch** — caractere largo a ser escrito
- **stream** — o stream de saída

### Valor de retorno

ch em caso de sucesso, WEOF em caso de falha. Se ocorrer um erro de codificação, [errno](<#/doc/error/errno>) é definido como [EILSEQ](<#/doc/error/errno_macros>).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <clocale>
    #include <cstdio>
    #include <cstdlib>
    #include <cwchar>
    #include <initializer_list>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
    
        for (const wchar_t ch :
        {
            L'\u2200', // Unicode name: "FOR ALL"
            L'\n',
            L'∀',
        })
        {
            if (errno = 0; std::fputwc(ch, stdout) == WEOF)
            {
                std::puts(errno == EILSEQ
                    ? "Encoding error in fputwc"
                    : "I/O error in fputwc"
                );
                return EXIT_FAILURE;
            }
        }
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    ∀
    ∀
```

### Veja também

[ fputcputc](<#/doc/io/c/fputc>) | escreve um caractere em um stream de arquivo
(função)
[ fputws](<#/doc/io/c/fputws>) | escreve uma string larga em um stream de arquivo
(função)
[ fgetwcgetwc](<#/doc/io/c/fgetwc>) | obtém um caractere largo de um stream de arquivo
(função)
[Documentação C](<#/>) para fputwc