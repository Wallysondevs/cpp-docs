# std::experimental::filesystem::status, std::experimental::filesystem::symlink_status

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
`file_status status( const path& p );`
`file_status status( const path& p, error_code& ec ) noexcept;`
`file_status symlink_status( const path& p );`
`file_status symlink_status( const path& p, error_code& ec ) noexcept;`
```

1) Determina o tipo e os atributos do objeto do sistema de arquivos identificado por `p` como se fosse por POSIX [stat](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) (symlinks são seguidos até seus alvos).

* Se `p` é um arquivo regular, retorna `file_status(file_type::regular)`.
* Se `p` é um diretório, retorna `file_status(file_type::directory)`.
* Se `p` é um arquivo especial de bloco, retorna `file_status(file_type::block)`.
* Se `p` é um arquivo especial de caractere, retorna `file_status(file_type::character)`.
* Se `p` é um arquivo FIFO ou pipe, retorna `file_status(file_type::fifo)`.
* Se `p` é um socket, retorna `file_status(file_type::socket)`.
* Se `p` não existe, retorna `file_status(file_type::not_found)`.
* Se `p` existe, mas os atributos do arquivo não podem ser determinados, por exemplo, devido à falta de permissões, retorna `file_status(file_type::unknown)`.
* Se erros impedem até mesmo saber se `p` existe, a sobrecarga que não lança exceção define `ec` e retorna `file_status(file_type::none)`, e a sobrecarga que lança exceção lança `filesystem_error`.
* Caso contrário, retorna `file_status(file_type::unknown)`.

2) O mesmo que (1), exceto que o comportamento é como se o POSIX [lstat](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html>) fosse usado (symlinks não são seguidos):

* Se `p` é um symlink, retorna `file_status(file_type::symlink)`.

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceção

### Valor de retorno

O status do arquivo (um objeto `[file_status](<#/doc/experimental/fs/file_status>)`).

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança `[filesystem_error](<#/doc/experimental/fs/filesystem_error>)` em erros da API do sistema operacional subjacente, construída com `p` como o primeiro argumento e o código de erro do sistema operacional como o argumento do código de erro. `[std::bad_alloc](<#/doc/memory/new/bad_alloc>)` pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui a especificação `[`noexcept`](<#/doc/language/noexcept_spec>)`:

`noexcept`

### Notas

As informações fornecidas por esta função geralmente também são fornecidas como um subproduto da iteração de diretório e podem ser obtidas pelas funções membro de `[directory_entry](<#/doc/experimental/fs/directory_entry>)`. Durante a iteração de diretório, chamar `status` novamente é desnecessário.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstring>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    #include <sys/socket.h>
    #include <sys/stat.h>
    #include <sys/un.h>
    #include <unistd.h>
    
    namespace fs = std::experimental::filesystem;
    
    void demo_status(const fs::path& p, fs::file_status s)
    {
        std::cout << p;
        // alternative: switch(s.type()) { case fs::file_type::regular: ... }
        if (fs::is_regular_file(s))
            std::cout << " is a regular file\n";
        if (fs::is_directory(s))
            std::cout << " is a directory\n";
        if (fs::is_block_file(s))
            std::cout << " is a block device\n";
        if (fs::is_character_file(s))
            std::cout << " is a character device\n";
        if (fs::is_fifo(s))
            std::cout << " is a named IPC pipe\n";
        if (fs::is_socket(s))
            std::cout << " is a named IPC socket\n";
        if (fs::is_symlink(s))
            std::cout << " is a symlink\n";
        if (!fs::exists(s))
            std::cout << " does not exist\n";
    }
    
    int main()
    {
        // create files of different kinds
        fs::create_directory("sandbox");
        std::ofstream("sandbox/file"); // create regular file
        fs::create_directory("sandbox/dir");
        mkfifo("sandbox/pipe", 0644);
        struct sockaddr_un addr;
        addr.sun_family = AF_UNIX;
        std::strcpy(addr.sun_path, "sandbox/sock");
        int fd = socket(PF_UNIX, SOCK_STREAM, 0);
        bind(fd, (struct sockaddr*)&addr, sizeof addr);
        fs::create_symlink("file", "sandbox/symlink");
    
        // demo different status accessors
        for (auto it = fs::directory_iterator("sandbox"); it != fs::directory_iterator(); ++it)
            demo_status(*it, it->symlink_status()); // use cached status from directory entry
        demo_status("dev/null", fs::status("/dev/null")); // direct calls to status
        demo_status("dev/sda", fs::status("/dev/sda"));
        demo_status("sandbox/no", fs::status("/sandbox/no"));
    
        // cleanup
        close(fd);
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/file" is a regular file
    "sandbox/dir" is a directory
    "sandbox/pipe" is a named IPC pipe
    "sandbox/sock" is a named IPC socket
    "sandbox/symlink" is a symlink
    "dev/null" is a character device
    "dev/sda" is a block device
    "sandbox/no" does not exist
```

### Veja também

`[ file_status](<#/doc/experimental/fs/file_status>)` | representa o tipo e as permissões do arquivo
(classe)
`[ status_known](<#/doc/experimental/fs/status_known>)` | verifica se o status do arquivo é conhecido
(função)
`[ is_block_file](<#/doc/experimental/fs/is_block_file>)` | verifica se o caminho dado se refere a um dispositivo de bloco
(função)
`[ is_character_file](<#/doc/experimental/fs/is_character_file>)` | verifica se o caminho dado se refere a um dispositivo de caractere
(função)
`[ is_directory](<#/doc/experimental/fs/is_directory>)` | verifica se o caminho dado se refere a um diretório
(função)
`[ is_fifo](<#/doc/experimental/fs/is_fifo>)` | verifica se o caminho dado se refere a um pipe nomeado
(função)
`[ is_other](<#/doc/experimental/fs/is_other>)` | verifica se o argumento se refere a um arquivo _outro_
(função)
`[ is_regular_file](<#/doc/experimental/fs/is_regular_file>)` | verifica se o argumento se refere a um arquivo regular
(função)
`[ is_socket](<#/doc/experimental/fs/is_socket>)` | verifica se o argumento se refere a um socket IPC nomeado
(função)
`[ is_symlink](<#/doc/experimental/fs/is_symlink>)` | verifica se o argumento se refere a um link simbólico
(função)
`[ exists](<#/doc/experimental/fs/exists>)` | verifica se o caminho se refere a um objeto existente do sistema de arquivos
(função)
`[ statussymlink_status](<#/doc/experimental/fs/directory_entry/status>)` | status em cache do arquivo designado por esta entrada de diretório
status symlink_status em cache do arquivo designado por esta entrada de diretório
(função membro pública de `std::experimental::filesystem::directory_entry`)