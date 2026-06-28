# std::feof

Definido no header `[<cstdio>](<#/doc/header/cstdio>)`

```cpp
int feof( std::FILE* stream );
```

Verifica se o fim do stream de arquivo fornecido foi atingido.

### Parâmetros

- **stream** — o stream de arquivo a ser verificado

### Valor de retorno

Valor diferente de zero se o fim do stream foi atingido, caso contrário ​0​.

### Observações

Esta função apenas relata o estado do stream conforme reportado pela operação de E/S mais recente, ela não examina a fonte de dados associada. Por exemplo, se a E/S mais recente foi um [std::fgetc](<#/doc/io/c/fgetc>), que retornou o último byte de um arquivo, `std::feof` retorna zero. O próximo [std::fgetc](<#/doc/io/c/fgetc>) falha e altera o estado do stream para _fim-de-arquivo_. Somente então `std::feof` retorna um valor diferente de zero.

No uso típico, o processamento de stream de entrada para em qualquer erro; `feof` e [std::ferror](<#/doc/io/c/ferror>) são então usados para distinguir entre diferentes condições de erro.

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

[ eof](<#/doc/io/basic_ios/eof>) | verifica se o fim do arquivo foi atingido
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ clearerr](<#/doc/io/c/clearerr>) | limpa erros
(função)
[ perror](<#/doc/io/c/perror>) | exibe uma string de caracteres correspondente ao erro atual para [stderr](<#/doc/io/c/std_streams>)
(função)
[ ferror](<#/doc/io/c/ferror>) | verifica por um erro de arquivo
(função)
[Documentação C](<#/>) para feof