# std::experimental::filesystem::is_socket

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool is_socket( file_status s );
bool is_socket( const path& p );
bool is_socket( const path& p, error_code& ec );
```

Verifica se o status de arquivo ou caminho fornecido corresponde a um socket IPC nomeado, como se determinado pelo POSIX [S_IFSOCK](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html>).

1) Equivalente a s.type() == file_type::socket.

2) Equivalente a is_socket(status(p)) ou is_socket(status(p, ec)).

### Parâmetros

- **s** — status do arquivo a ser verificado
- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

true se o arquivo indicado por p ou se o tipo indicado por s se refere a um socket nomeado. A sobrecarga que não lança exceções retorna false se ocorrer um erro.

### Exceções

1)

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

2) A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente, construída com p como o primeiro argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Notas

Sockets nomeados são sockets de domínio UNIX construídos com as APIs POSIX [socket](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/socket.html>) e [bind](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/bind.html>), que podem ser usados para comunicação avançada entre processos. Em particular, eles podem ser usados para transportar descritores de arquivo abertos de um processo em execução para outro.

A informação fornecida por esta função geralmente também é fornecida como um subproduto da iteração de diretório. Durante a iteração de diretório, chamar `is_socket(*iterator)` é menos eficiente do que `is_socket(iterator->status())`.

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

[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ file_status](<#/doc/experimental/fs/file_status>) | representa tipo de arquivo e permissões
(classe)
[ status_known](<#/doc/experimental/fs/status_known>) | verifica se o status do arquivo é conhecido
(função)
[ is_block_file](<#/doc/experimental/fs/is_block_file>) | verifica se o caminho fornecido se refere a um dispositivo de bloco
(função)
[ is_character_file](<#/doc/experimental/fs/is_character_file>) | verifica se o caminho fornecido se refere a um dispositivo de caractere
(função)
[ is_directory](<#/doc/experimental/fs/is_directory>) | verifica se o caminho fornecido se refere a um diretório
(função)
[ is_fifo](<#/doc/experimental/fs/is_fifo>) | verifica se o caminho fornecido se refere a um pipe nomeado
(função)
[ is_other](<#/doc/experimental/fs/is_other>) | verifica se o argumento se refere a um arquivo _outro_
(função)
[ is_regular_file](<#/doc/experimental/fs/is_regular_file>) | verifica se o argumento se refere a um arquivo regular
(função)
[ is_symlink](<#/doc/experimental/fs/is_symlink>) | verifica se o argumento se refere a um link simbólico
(função)
[ exists](<#/doc/experimental/fs/exists>) | verifica se o caminho se refere a um objeto do sistema de arquivos existente
(função)
[ statussymlink_status](<#/doc/experimental/fs/directory_entry/status>) | status em cache do arquivo designado por esta entrada de diretório
symlink_status em cache do arquivo designado por esta entrada de diretório
(função membro pública de `std::experimental::filesystem::directory_entry`)