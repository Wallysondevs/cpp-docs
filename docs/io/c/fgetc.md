# std::fgetc, std::getc

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int fgetc( std::FILE* stream );
int getc( std::FILE* stream );
```

Lê o próximo caractere do fluxo de entrada fornecido.

### Parâmetros

- **stream** — de onde ler o caractere

### Valor de retorno

O caractere obtido em caso de sucesso ou [EOF](<#/doc/io/c>) em caso de falha.

Se a falha foi causada pela condição de fim de arquivo, adicionalmente define o indicador _eof_ (veja [std::feof()](<#/doc/io/c/feof>)) no fluxo. Se a falha foi causada por algum outro erro, define o indicador _error_ (veja [std::ferror()](<#/doc/io/c/ferror>)) no fluxo.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    
    int main()
    {
        int is_ok = EXIT_FAILURE;
        FILE* fp = std::fopen("/tmp/test.txt", "w+");
        if (!fp)
        {
            std::perror("File opening failed");
            return is_ok;
        }
    
        int c; // Note: int, not char, required to handle EOF
        while ((c = std::fgetc(fp)) != EOF) // Standard C I/O file reading loop
            std::putchar(c);
    
        if (std::ferror(fp))
            std::puts("I/O error when reading");
        else if (std::feof(fp))
        {
            std::puts("End of file reached successfully");
            is_ok = EXIT_SUCCESS;
        }
    
        std::fclose(fp);
        return is_ok;
    }
```

Saída:
```
    End of file reached successfully
```

### Veja também

[ gets](<#/doc/io/c/gets>)(obsoleto desde C++11)(removido em C++14) | lê uma string de caracteres de [stdin](<#/doc/io/c/std_streams>)
(função)
[ fputcputc](<#/doc/io/c/fputc>) | escreve um caractere em um fluxo de arquivo
(função)
[ ungetc](<#/doc/io/c/ungetc>) | devolve um caractere para um fluxo de arquivo
(função)
[Documentação C](<#/>) para fgetc, getc