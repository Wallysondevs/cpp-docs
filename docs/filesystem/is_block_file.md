# std::filesystem::is_block_file

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool is_block_file( std::filesystem::file_status s ) noexcept;
bool is_block_file( const std::filesystem::path& p );
bool is_block_file( const std::filesystem::path& p, std::error_code& ec ) noexcept;
```

Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo especial de bloco, como se determinado pelo POSIX [S_ISBLK](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html>). Exemplos de arquivos especiais de bloco são dispositivos de bloco como /dev/sda ou /dev/loop0 no Linux.

1) Equivalente a s.type() == file_type::block.

2,3) Equivalente a is_block_file(status(p)) ou is_block_file(status(p, ec)).

### Parâmetros

- **s** — status de arquivo a verificar
- **p** — caminho a examinar
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

`true` se o arquivo indicado por `p` ou se o tipo indicado por `s` se refere a um dispositivo de bloco. A sobrecarga que não lança exceções retorna `false` se ocorrer um erro.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

2,3) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& com o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

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

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ file_status](<#/doc/filesystem/file_status>)(C++17) | representa tipo de arquivo e permissões
(classe)
[ status_known](<#/doc/filesystem/status_known>)(C++17) | verifica se o status do arquivo é conhecido
(função)
[ is_character_file](<#/doc/filesystem/is_character_file>)(C++17) | verifica se o caminho fornecido se refere a um dispositivo de caractere
(função)
[ is_directory](<#/doc/filesystem/is_directory>)(C++17) | verifica se o caminho fornecido se refere a um diretório
(função)
[ is_fifo](<#/doc/filesystem/is_fifo>)(C++17) | verifica se o caminho fornecido se refere a um pipe nomeado
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
[ is_block_file](<#/doc/filesystem/directory_entry/is_block_file>) | verifica se a entrada de diretório se refere a um dispositivo de bloco
(função membro pública de `std::filesystem::directory_entry`)