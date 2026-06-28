# std::getchar

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int getchar();
```

Lê o próximo caractere de [stdin](<#/doc/io/c/std_streams>).

Equivalente a [std::getc](<#/doc/io/c/fgetc>)(stdin).

### Parâmetros

(nenhum)

### Valor de retorno

O caractere obtido em caso de sucesso ou [EOF](<#/doc/io/c>) em caso de falha.

Se a falha foi causada pela condição de fim de arquivo, adicionalmente define o indicador _eof_ (veja [std::feof()](<#/doc/io/c/feof>)) em [stdin](<#/doc/io/c/std_streams>). Se a falha foi causada por algum outro erro, define o indicador _error_ (veja [std::ferror()](<#/doc/io/c/ferror>)) em [stdin](<#/doc/io/c/std_streams>).

### Exemplo

`std::getchar` com verificação de erro. Saia do programa digitando o caractere ESC.
```cpp
    #include <cctype>
    #include <cstdio>
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        for (int ch; (ch = std::getchar()) != EOF ;) // read/print "abc" from stdin
        {
            if (std::isprint(ch))
                std::cout << static_cast<char>(ch) << '\n';
            if (ch == 27) // 'ESC' (escape) in ASCII
                return EXIT_SUCCESS;
        }
    
        // Test reason for reaching EOF.
        if (std::feof(stdin)) // if failure caused by end-of-file condition
            std::cout << "End of file reached\n";
        else if (std::ferror(stdin)) // if failure caused by some other error
        {
            std::perror("getchar()");
            std::cerr << "getchar() failed in file " << std::quoted(__FILE__)
                      << " at line # " << __LINE__ - 14 << '\n';
            std::exit(EXIT_FAILURE);
        }
    
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    abc
    a
    b
    c
    ^[
```

### Veja também

[ fgetcgetc](<#/doc/io/c/fgetc>) | obtém um caractere de um stream de arquivo
(função)
[C documentation](<#/>) para getchar