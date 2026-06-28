# std::clearerr

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
void clearerr( std::FILE* stream );
```

Reinicia os flags de erro e o indicador [`EOF`](<#/doc/io/c>) para o stream de arquivo fornecido.

### Parâmetros

- **stream** — o arquivo para o qual reiniciar os flags de erro

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstdio>
    
    int main()
    {
        std::FILE* tmpf = std::tmpfile();
        std::fputs("cppreference.com\n", tmpf);
        std::rewind(tmpf);
    
        for (int ch; (ch = std::fgetc(tmpf)) != EOF; std::putchar(ch)) { }
    
        assert(std::feof(tmpf)); // the loop is expected to terminate by EOF
        std::puts("End of file reached");
    
        std::clearerr(tmpf); // clear EOF
    
        std::puts(std::feof(tmpf) ? "EOF indicator set"
                                  : "EOF indicator cleared");
    }
```

Saída:
```
    cppreference.com
    End of file reached
    EOF indicator cleared
```

### Veja também

[ feof](<#/doc/io/c/feof>) | verifica o fim do arquivo
(função)
[ perror](<#/doc/io/c/perror>) | exibe uma string de caracteres correspondente ao erro atual para [stderr](<#/doc/io/c/std_streams>)
(função)
[ ferror](<#/doc/io/c/ferror>) | verifica um erro de arquivo
(função)
[Documentação C](<#/>) para clearerr