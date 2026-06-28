# std::tmpnam

Definido no header `[<cstdio>](<#/doc/header/cstdio>)`

```cpp
char* tmpnam( char* filename );
```

Cria um nome de arquivo único que não nomeia um arquivo atualmente existente, e o armazena na string de caracteres apontada por filename. A função é capaz de gerar até [TMP_MAX](<#/doc/io/c>) nomes de arquivo únicos, mas alguns ou todos eles já podem estar em uso, e, portanto, não serem valores de retorno adequados.

**std::tmpnam** modifica o estado estático e não é exigido que seja thread-safe.

### Parâmetros

- **filename** — ponteiro para o array de caracteres capaz de armazenar pelo menos [L_tmpnam](<#/doc/io/c>) bytes, a ser usado como buffer de resultado. Se um ponteiro nulo for passado, um ponteiro para um buffer estático interno é retornado

### Valor de retorno

filename se filename não era um ponteiro nulo. Caso contrário, um ponteiro para um buffer estático interno é retornado. Se nenhum nome de arquivo adequado puder ser gerado, um ponteiro nulo é retornado.

### Observações

Embora os nomes gerados por **std::tmpnam** sejam difíceis de adivinhar, é possível que um arquivo com esse nome seja criado por outro processo entre o momento em que **std::tmpnam** retorna e o momento em que este programa tenta usar o nome retornado para criar um arquivo. A função padrão [std::tmpfile](<#/doc/io/c/tmpfile>) e a função POSIX [`mkstemp`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdtemp.html>) não possuem esse problema (criar um diretório único usando apenas a biblioteca C padrão ainda requer o uso de `tmpnam`).

Sistemas POSIX adicionalmente definem a função de nome similar [`tempnam`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/tempnam.html>), que oferece a escolha de um diretório (que por padrão é a macro opcionalmente definida [`P_tmpdir`](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/stdio.h.html>)).

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string name1 = std::tmpnam(nullptr);
        std::cout << "temporary file name: " << name1 << '\n';
    
        char name2[L_tmpnam];
        if (std::tmpnam(name2))
            std::cout << "temporary file name: " << name2 << '\n';
    }
```

Saída possível:
```
    temporary file name: /tmp/fileDjwifs
    temporary file name: /tmp/fileEv2bfW
```

### Veja também

[ tmpfile](<#/doc/io/c/tmpfile>) | cria e abre um arquivo temporário, com remoção automática
(função)
[ temp_directory_path](<#/doc/filesystem/temp_directory_path>)(C++17) | retorna um diretório adequado para arquivos temporários
(função)
[Documentação C](<#/>) para tmpnam