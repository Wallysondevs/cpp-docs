# std::putchar

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int putchar( int ch );
```

Escreve um caractere ch para [stdout](<#/doc/io/c/std_streams>). Internamente, o caractere é convertido para unsigned char pouco antes de ser escrito.

Equivalente a [std::putc](<#/doc/io/c/fputc>)(ch, stdout).

### Parâmetros

- **ch** — caractere a ser escrito

### Valor de retorno

Em caso de sucesso, retorna o caractere escrito.

Em caso de falha, retorna [EOF](<#/doc/io/c>) e define o indicador de _erro_ (veja [std::ferror()](<#/doc/io/c/ferror>)) em [stdout](<#/doc/io/c/std_streams>).

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    
    int main()
    {
        for (char c = 'a'; c != 'z'; ++c)
            std::putchar(c);
    
        // putchar return value is not equal to the argument
        int r = 0x1024;
        std::printf("\nr = 0x%x\n", r);
        r = std::putchar(r);
        std::printf("\nr = 0x%x\n", r);
    }
```

Saída possível:
```
    abcdefghijklmnopqrstuvwxy
    r = 0x1024
    $
    r = 0x24
```

### Veja também

[ fputcputc](<#/doc/io/c/fputc>) | escreve um caractere em um stream de arquivo
(função)
[Documentação C](<#/>) para putchar