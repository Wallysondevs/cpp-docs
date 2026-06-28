# std::filesystem::status, std::filesystem::symlink_status

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
std::filesystem::file_status status( const std::filesystem::path& p );
std::filesystem::file_status status( const std::filesystem::path& p,
std::error_code& ec ) noexcept;
std::filesystem::file_status symlink_status( const std::filesystem::path& p );
std::filesystem::file_status symlink_status( const std::filesystem::path& p,
std::error_code& ec ) noexcept;
```

1,2) Determina o tipo e os atributos do objeto do sistema de arquivos identificado por p como se fosse por POSIX [`stat`](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/stat.html>) (symlinks são seguidos até seus alvos). Na descrição a seguir, `prms` é o resultado de (m & perms::mask), onde m é obtido como se fosse pegando st_mode da struct POSIX stat e convertendo-o para o tipo [std::filesystem::perms](<#/doc/filesystem/perms>).

*   Se p for um arquivo regular (como se fosse por POSIX S_ISREG), retorna file_status(file_type::regular, prms).
*   Se p for um diretório (como se fosse por POSIX S_ISDIR), retorna file_status(file_type::directory, prms).
*   Se p for um arquivo especial de bloco (como se fosse por POSIX S_ISBLK), retorna file_status(file_type::block, prms).
*   Se p for um arquivo especial de caractere (como se fosse por POSIX S_ISCHR), retorna file_status(file_type::character, prms).
*   Se p for um arquivo fifo ou pipe (como se fosse por POSIX S_ISFIFO), retorna file_status(file_type::fifo, prms).
*   Se p for um socket (como se fosse por POSIX S_ISSOCK), retorna file_status(file_type::socket, prms).
*   Se p tiver um tipo de arquivo definido pela implementação, retorna file_status(file_type::A, prms) onde `A` é a constante [`file_type`](<#/doc/filesystem/file_type>) definida pela implementação para esse tipo.
*   Se p não existir, retorna file_status(file_type::not_found).
*   Se p existir, mas os atributos do arquivo não puderem ser determinados, por exemplo, devido à falta de permissões, retorna file_status(file_type::unknown).
*   Se erros impedirem até mesmo saber se p existe, a sobrecarga que não lança exceção (non-throwing overload) define ec e retorna file_status(file_type::none), e a sobrecarga que lança exceção (throwing overload) lança `filesystem_error`.
*   Caso contrário, retorna file_status(file_type::unknown, prms).

3,4) O mesmo que (1,2), exceto que o comportamento é como se o POSIX [`lstat`](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/lstat.html>) fosse usado (symlinks não são seguidos):

*   Se p for um symlink, retorna file_status(file_type::symlink).

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceção

### Valor de retorno

O status do arquivo (um objeto [filesystem::file_status](<#/doc/filesystem/file_status>)).

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construído com p como o primeiro argumento de caminho e o código de erro do SO como o argumento do código de erro.

2,4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Observações

As informações fornecidas por esta função geralmente também são fornecidas como um subproduto da iteração de diretório e podem ser obtidas pelas funções membro de [filesystem::directory_entry](<#/doc/filesystem/directory_entry>). Durante a iteração de diretório, chamar `status` novamente é desnecessário.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstring>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    #include <sys/socket.h>
    #include <sys/stat.h>
    #include <sys/un.h>
    #include <unistd.h>
    
    namespace fs = std::filesystem;
    
    void demo_status(const fs::path& p, fs::file_status s)
    {
        std::cout << p;
        // alternative: switch(s.type()) { case fs::file_type::regular: ...}
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
        fs::create_directory("sandbox/dir");
        std::ofstream{"sandbox/file"}; // create regular file
        fs::create_symlink("file", "sandbox/symlink");
    
        mkfifo("sandbox/pipe", 0644);
        sockaddr_un addr;
        addr.sun_family = AF_UNIX;
        std::strcpy(addr.sun_path, "sandbox/sock");
        int fd = socket(PF_UNIX, SOCK_STREAM, 0);
        bind(fd, reinterpret_cast<sockaddr*>(&addr), sizeof addr);
    
        // demo different status accessors
        for (auto it{fs::directory_iterator("sandbox")}; it != fs::directory_iterator(); ++it)
            demo_status(*it, it->symlink_status()); // use cached status from directory entry
        demo_status("/dev/null", fs::status("/dev/null")); // direct calls to status
        demo_status("/dev/sda", fs::status("/dev/sda"));
        demo_status("sandbox/no", fs::status("/sandbox/no"));
    
        // cleanup (prefer std::unique_ptr-based custom deleters)
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
    "/dev/null" is a character device
    "/dev/sda" is a block device
    "sandbox/no" does not exist
```

### Veja também

[ file_status](<#/doc/filesystem/file_status>)(C++17) | representa o tipo e as permissões do arquivo
(classe)
[ status_known](<#/doc/filesystem/status_known>)(C++17) | verifica se o status do arquivo é conhecido
(função)
[ is_block_file](<#/doc/filesystem/is_block_file>)(C++17) | verifica se o caminho dado se refere a um dispositivo de bloco
(função)
[ is_character_file](<#/doc/filesystem/is_character_file>)(C++17) | verifica se o caminho dado se refere a um dispositivo de caractere
(função)
[ is_directory](<#/doc/filesystem/is_directory>)(C++17) | verifica se o caminho dado se refere a um diretório
(função)
[ is_fifo](<#/doc/filesystem/is_fifo>)(C++17) | verifica se o caminho dado se refere a um pipe nomeado
(função)
[ is_other](<#/doc/filesystem/is_other>)(C++17) | verifica se o argumento se refere a um arquivo _outro_
(função)
[ is_regular_file](<#/doc/filesystem/is_regular_file>)(C++17) | verifica se o argumento se refere a um arquivo regular
(função)
[ is_socket](<#/doc/filesystem/is_socket>)(C++17) | verifica se o argumento se refere a um socket IPC nomeado
(função)
[ is_symlink](<#/doc/filesystem/is_symlink>)(C++17) | verifica se o argumento se refere a um link simbólico
(função)
[ exists](<#/doc/filesystem/exists>)(C++17) | verifica se o caminho se refere a um objeto existente do sistema de arquivos
(função)
[ statussymlink_status](<#/doc/filesystem/directory_entry/status>) | status do arquivo designado por esta entrada de diretório; status do arquivo/symlink designado por esta entrada de diretório
(função membro pública de `std::filesystem::directory_entry`)