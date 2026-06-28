# std::tmpfile

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
std::FILE* tmpfile();
```

Cria e abre um arquivo temporário com um nome de arquivo único gerado automaticamente.

O arquivo é aberto como um arquivo binário para atualização (como por [std::fopen](<#/doc/io/c/fopen>) com modo de acesso "wb+"). Pelo menos [TMP_MAX](<#/doc/io/c>) arquivos podem ser abertos durante a vida útil de um programa (este limite pode ser compartilhado com [std::tmpnam](<#/doc/io/c/tmpnam>) e pode ser ainda mais limitado por [FOPEN_MAX](<#/doc/io/c>)).

Se o programa fechar o arquivo, por exemplo, executando [std::fclose](<#/doc/io/c/fclose>), o arquivo é automaticamente excluído.

Se o programa terminar normalmente (chamando [std::exit](<#/doc/utility/program/exit>), retornando de main, etc), todos os arquivos que foram abertos chamando `std::tmpfile` também são automaticamente excluídos.

Se o programa terminar anormalmente, é comportamento definido pela implementação se esses arquivos temporários são excluídos.

### Parâmetros

(nenhum)

### Valor de retorno

O stream de arquivo associado ou um ponteiro nulo se um erro ocorreu.

### Notas

Em algumas implementações (por exemplo, Linux mais antigo), esta função realmente cria, abre e imediatamente exclui o arquivo do sistema de arquivos: enquanto um descritor de arquivo aberto para um arquivo excluído for mantido por um programa, o arquivo existe, mas como foi excluído, seu nome não aparece em nenhum diretório, de modo que nenhum outro processo pode abri-lo. Uma vez que o descritor de arquivo é fechado, ou uma vez que o programa termina (normalmente ou anormalmente), o espaço ocupado pelo arquivo é recuperado pelo sistema de arquivos. Linux mais recente (desde 3.11 ou posterior, dependendo do sistema de arquivos) cria esses arquivos temporários invisíveis em uma única etapa, através de um flag especial na chamada de sistema [`open()`](<https://man7.org/linux/man-pages/man2/open.2.html>).

Em algumas implementações (por exemplo, Windows), privilégios elevados são necessários, pois a função pode criar o arquivo temporário em um diretório do sistema.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        std::cout << "TMP_MAX = " << TMP_MAX << '\n'
                  << "FOPEN_MAX = " << FOPEN_MAX << '\n';
        std::FILE* tmpf = std::tmpfile();
        std::fputs("Hello, world", tmpf);
        std::rewind(tmpf);
        char buf[6];
        std::fgets(buf, sizeof buf, tmpf);
        std::cout << buf << '\n';
    
        // Linux-specific method to display the tmpfile name
        std::cout << fs::read_symlink(
                         fs::path("/proc/self/fd") / std::to_string(fileno(tmpf))
                     ) << '\n';
    }
```

Saída possível:
```
    TMP_MAX = 238328
    FOPEN_MAX = 16
    Hello
    "/tmp/tmpfBlY1lI (deleted)"
```

### Veja também

[ tmpnam](<#/doc/io/c/tmpnam>) | retorna um nome de arquivo único
(função)
[ temp_directory_path](<#/doc/filesystem/temp_directory_path>)(C++17) | retorna um diretório adequado para arquivos temporários
(função)
[Documentação C](<#/>) para tmpfile