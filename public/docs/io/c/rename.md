# std::rename

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int rename( const char* old_filename, const char* new_filename );
```

Altera o nome de um arquivo. O arquivo é identificado pela string de caracteres apontada por old_filename. O novo nome do arquivo é identificado pela string de caracteres apontada por new_filename.

Se new_filename existir, o comportamento é definido pela implementação.

### Parâmetros

- **old_filename** — ponteiro para uma string terminada em nulo contendo o caminho que identifica o arquivo a ser renomeado
- **new_filename** — ponteiro para uma string terminada em nulo contendo o novo caminho do arquivo

### Valor de retorno

​0​ em caso de sucesso ou um valor diferente de zero em caso de erro.

### Observações

[POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html>) especifica muitos detalhes adicionais sobre a semântica desta função, que são reproduzidos em C++ por [std::filesystem::rename](<#/doc/filesystem/rename>).

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        if (!std::ofstream("from.txt").put('a')) // create and write to file
        {
            std::perror("Error creating from.txt");
            return EXIT_FAILURE;
        }
    
        if (std::rename("from.txt", "to.txt"))
        {
            std::perror("Error renaming");
            return EXIT_FAILURE;
        }
    
        std::cout << std::ifstream("to.txt").rdbuf() << '\n'; // print file
        return EXIT_SUCCESS;
    }
```

Saída:
```
    a
```

### Veja também

[ rename](<#/doc/filesystem/rename>)(C++17) | move ou renomeia um arquivo ou diretório
(função)
[ remove](<#/doc/io/c/remove>) | apaga um arquivo
(função)
[Documentação C](<#/>) para rename