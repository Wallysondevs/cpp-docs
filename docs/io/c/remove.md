# std::remove

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int remove( const char* pathname );
```

Exclui o arquivo identificado pela string de caracteres apontada por pathname.

Se o arquivo estiver atualmente aberto por qualquer processo, o comportamento desta função é definido pela implementação. Sistemas POSIX desvinculam o nome do arquivo (entrada de diretório), mas o espaço do sistema de arquivos usado pelo arquivo não é recuperado enquanto ele estiver aberto em qualquer processo e enquanto outros hard links para o arquivo existirem. Windows não permite que o arquivo seja excluído em tais casos.

### Parâmetros

- **pathname** — ponteiro para uma string terminada em nulo contendo o caminho que identifica o arquivo a ser excluído

### Valor de retorno

`0` em caso de sucesso ou valor diferente de zero em caso de erro.

### Observações

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remove.html>) muitos detalhes adicionais para o comportamento desta função.

A standard library também define um function template [`std::remove`](<#/doc/algorithm/remove>) que recebe um par de iterators e um valor; esta sobrecarga é um dos [algorithms](<#/doc/algorithm>) padrão.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        // create a file, check success using operator! of temporary stream object
        if (!std::ofstream("file1.txt").put('a'))
        {
            std::perror("Error creating file1.txt");
            return EXIT_FAILURE;
        }
        std::cout << std::ifstream("file1.txt").rdbuf() << '\n'; // print file
     
        std::remove("file1.txt"); // delete file
     
        if (!std::ifstream{"file1.txt"}) // uses operator! of temporary stream object
        {
            std::perror("Error opening deleted file");
            return EXIT_FAILURE;
        }
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    a
    Error opening deleted file: No such file or directory
```

### Veja também

[ removeremove_all](<#/doc/filesystem/remove>)(C++17)(C++17) | remove um arquivo ou diretório vazio
remove um arquivo ou diretório e todo o seu conteúdo, recursivamente
(função)
[ rename](<#/doc/io/c/rename>) | renomeia um arquivo
(função)
[Documentação C](<#/>) para remove