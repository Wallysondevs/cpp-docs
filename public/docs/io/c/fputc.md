# std::fputc, std::putc

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int fputc( int ch, std::FILE* stream );
int putc( int ch, std::FILE* stream );
```

  
Escreve um caractere `ch` no stream de saída `stream` fornecido.

Internamente, o caractere é convertido para `unsigned char` pouco antes de ser escrito.

Em C, [putc()](<#/>) pode ser implementado como uma macro, o que não é permitido em C++. Portanto, chamadas para `std::fputc()` e `std::putc()` sempre têm o mesmo efeito.

### Parâmetros

ch  |  \-  |  caractere a ser escrito   
---|---|---
stream  |  \-  |  stream de saída   
  
### Valor de retorno

Em caso de sucesso, retorna o caractere escrito.

Em caso de falha, retorna [EOF](<#/doc/io/c>) e define o indicador de _erro_ (veja [std::ferror()](<#/doc/io/c/ferror>)) no stream.

### Exemplo

Execute este código
```
    #include <cstdio>
     
    int main()
    {
        for (char c = 'a'; c != 'z'; c++)
            std::putc(c, stdout);
     
        // putchar's return value is not equal to the argument
        int r = 0x102A;
        std::printf("\nr = 0x%x\n", r);
     
        r = std::putchar(r);
        std::printf("\nr = 0x%x\n", r);
    }
```

Saída possível: 
```
    abcdefghijklmnopqrstuvwxy
    r = 0x102A
    *
    r = 0x2A
```

### Veja também

[ putchar](<#/doc/io/c/putchar>) |  escreve um caractere para [stdout](<#/doc/io/c/std_streams>)   
(função)  
[Documentação C](<#/>) para fputc, putc