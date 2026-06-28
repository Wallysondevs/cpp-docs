# std::fputws

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int fputws( const wchar_t* str, std::FILE* stream );
```

Escreve cada caractere largo da string larga terminada em nulo `str` para o stream de saída `stream`, como se executasse repetidamente [std::fputwc](<#/doc/io/c/fputwc>).

O caractere largo nulo terminador de `str` não é escrito.

### Parâmetros

- **str** — string larga terminada em nulo a ser escrita
- **stream** — stream de saída

### Valor de retorno

Em caso de sucesso, retorna um valor não negativo

Em caso de falha, retorna [EOF](<#/doc/io/c>) e define o indicador de _erro_ (veja [std::ferror](<#/doc/io/c/ferror>)) no `stream`.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdio>
    #include <cwchar>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        int rc = std::fputws(L"御休みなさい", stdout);
    
        if (rc == EOF)
            std::perror("fputws()"); // POSIX requires that errno is set
    }
```

Saída possível:
```
    御休みなさい
```

### Veja também

[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres para um stream de arquivo
(função)
[ wprintffwprintfswprintf](<#/doc/io/c/fwprintf>) | imprime saída formatada de caracteres largos para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
** fputws** | escreve uma string larga para um stream de arquivo
(função)
[ fgetws](<#/doc/io/c/fgetws>) | obtém uma string larga de um stream de arquivo
(função)
[Documentação C](<#/>) para fputws