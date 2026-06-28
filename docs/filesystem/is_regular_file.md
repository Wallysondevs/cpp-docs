# std::filesystem::is_regular_file

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
bool is_regular_file( std::filesystem::file_status s ) noexcept;  // (1) (desde C++17)
bool is_regular_file( const std::filesystem::path& p );  // (2) (desde C++17)
bool is_regular_file( const std::filesystem::path& p, std::error_code& ec ) noexcept;  // (3) (desde C++17)
```

Verifica se o status do arquivo ou o path fornecido corresponde a um arquivo regular.

1) Equivalente a s.type() == file_type::regular.

2,3) Equivalente a is_regular_file(status(p)) ou is_regular_file(status(p, ec)) respectivamente.

### Parâmetros

- **s** — status do arquivo a ser verificado
- **p** — path a ser examinado
- **ec** — error code para armazenar o status do erro

### Valor de retorno

true se o arquivo indicado por p ou se o tipo indicado por s se refere a um arquivo regular, false caso contrário. A sobrecarga que não lança exceções retorna false se ocorrer um erro.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

2,3) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Observações

A sobrecarga que lança exceções é adicionalmente especificada para lançar [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) se status(p) lançaria uma exceção.

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

[ file_type](<#/doc/filesystem/file_type>)(C++17) | o tipo de um arquivo
(enum)
[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ file_status](<#/doc/filesystem/file_status>)(C++17) | representa o tipo e as permissões do arquivo
(classe)
[ status_known](<#/doc/filesystem/status_known>)(C++17) | verifica se o status do arquivo é conhecido
(função)
[ is_block_file](<#/doc/filesystem/is_block_file>)(C++17) | verifica se o path fornecido se refere a um dispositivo de bloco
(função)
[ is_character_file](<#/doc/filesystem/is_character_file>)(C++17) | verifica se o path fornecido se refere a um dispositivo de caractere
(função)
[ is_directory](<#/doc/filesystem/is_directory>)(C++17) | verifica se o path fornecido se refere a um diretório
(função)
[ is_fifo](<#/doc/filesystem/is_fifo>)(C++17) | verifica se o path fornecido se refere a um pipe nomeado
(função)
[ is_other](<#/doc/filesystem/is_other>)(C++17) | verifica se o argumento se refere a um arquivo _outro_
(função)
[ is_socket](<#/doc/filesystem/is_socket>)(C++17) | verifica se o argumento se refere a um socket IPC nomeado
(função)
[ is_symlink](<#/doc/filesystem/is_symlink>)(C++17) | verifica se o argumento se refere a um link simbólico
(função)
[ exists](<#/doc/filesystem/exists>)(C++17) | verifica se o path se refere a um objeto existente do sistema de arquivos
(função)
[ is_regular_file](<#/doc/filesystem/directory_entry/is_regular_file>) | verifica se a entrada do diretório se refere a um arquivo regular
(função membro pública de `std::filesystem::directory_entry`)