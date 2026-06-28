# std::setvbuf

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int setvbuf( std::FILE* stream, char* buffer, int mode, std::size_t size );
```

Altera o modo de buffering do stream de arquivo stream fornecido, conforme indicado pelo argumento mode. Além disso,

*   Se buffer for um ponteiro nulo, redimensiona o buffer interno para size.
*   Se buffer não for um ponteiro nulo, instrui o stream a usar o buffer fornecido pelo usuário de tamanho size começando em buffer. O stream deve ser fechado (com [std::fclose](<#/doc/io/c/fclose>)) antes que o [tempo de vida](<#/doc/language/lifetime>) do array apontado por buffer termine. O conteúdo do array após uma chamada bem-sucedida a **std::setvbuf** é indeterminado e qualquer tentativa de usá-lo é comportamento indefinido.

### Parâmetros

- **stream** — o stream de arquivo para o qual definir o buffer
- **buffer** — ponteiro para um buffer para o stream usar ou ponteiro nulo para alterar apenas o tamanho e o modo
- **mode** — modo de buffering a ser usado. Pode ser um dos seguintes valores: | [_IOFBF](<#/doc/io/c>) | buffering completo
---|---
[_IOLBF](<#/doc/io/c>) | buffering de linha
[_IONBF](<#/doc/io/c>) | sem buffering
- **size** — tamanho do buffer

### Valor de retorno

​0​ em caso de sucesso ou diferente de zero em caso de falha.

### Notas

Esta função só pode ser usada depois que stream tiver sido associado a um arquivo aberto, mas antes de qualquer outra operação (além de uma chamada falha para [std::setbuf](<#/doc/io/c/setbuf>)/`std::setvbuf`).

Nem todos os bytes de size serão necessariamente usados para buffering: o tamanho real do buffer é geralmente arredondado para baixo para um múltiplo de 2, um múltiplo do tamanho da página, etc.

Em muitas implementações, o buffering de linha está disponível apenas para streams de entrada de terminal.

Um erro comum é definir o buffer de `stdin` ou `stdout` para um array cujo tempo de vida termina antes que o programa finalize:
```cpp
    int main()
    {
        char buf[BUFSIZ];
        std::setbuf(stdin, buf);
    } // tempo de vida de buf termina, comportamento indefinido
```

O tamanho de buffer padrão [BUFSIZ](<#/doc/io/c>) é esperado ser o tamanho de buffer mais eficiente para I/O de arquivo na implementação, mas POSIX [`fstat`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fstat.html>) frequentemente fornece uma estimativa melhor.

### Exemplo

Um caso de uso para alterar o tamanho do buffer é quando um tamanho melhor é conhecido.

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <iostream>
    #include <sys/stat.h>
    
    int main()
    {
        std::FILE* fp = std::fopen("/tmp/test.txt", "w+");
        if (!fp)
        {
            std::perror("fopen");
            return EXIT_FAILURE;
        }
    
        struct stat stats;
        if (fstat(fileno(fp), &stats) == -1) // Apenas POSIX
        {
            std::perror("fstat");
            return EXIT_FAILURE;
        }
    
        std::cout << "BUFSIZ is " << BUFSIZ << ", but optimal block size is "
                  << stats.st_blksize << '\n';
        if (std::setvbuf(fp, nullptr, _IOFBF, stats.st_blksize) != 0)
        {
            std::perror("setvbuf failed"); // A versão POSIX define errno
            return EXIT_FAILURE;
        }
    
        // Lê o arquivo inteiro: use truss/strace para observar as chamadas de sistema read(2) usadas
        for (int ch; (ch = std::fgetc(fp)) != EOF;)
        {}
    
        std::fclose(fp);
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    BUFSIZ is 8192, but optimal block size is 65536
```

### Veja também

[ setbuf](<#/doc/io/c/setbuf>) | define o buffer para um stream de arquivo
(função)
[ setbuf](<#/doc/io/basic_filebuf/setbuf>)[virtual] | fornece buffer fornecido pelo usuário ou torna este filebuf sem buffer
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
[Documentação C](<#/>) para setvbuf