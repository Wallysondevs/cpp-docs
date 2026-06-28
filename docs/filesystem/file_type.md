# std::filesystem::file_type

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
enum class file_type {
none = /* unspecified */,
not_found = /* unspecified */,
regular = /* unspecified */,
directory = /* unspecified */,
symlink = /* unspecified */,
block = /* unspecified */,
character = /* unspecified */,
fifo = /* unspecified */,
socket = /* unspecified */,
unknown = /* unspecified */,
/* implementation-defined */
};
```

`file_type` define constantes que indicam o tipo de um arquivo ou diretório ao qual um caminho se refere. O valor dos enumeradores é distinto.

### Constantes

Constante | Significado
---|---
`none` | indica que o status do arquivo ainda não foi avaliado, ou que ocorreu um erro ao avaliá-lo
`not_found` | indica que o arquivo não foi encontrado (isso não é considerado um erro)
`regular` | um arquivo regular
`directory` | um diretório
`symlink` | um link simbólico
`block` | um arquivo especial de bloco
`character` | um arquivo especial de caractere
`fifo` | um arquivo FIFO (também conhecido como pipe)
`socket` | um arquivo socket
implementation-defined | uma constante adicional definida pela implementação para cada tipo de arquivo adicional suportado pela implementação (por exemplo, MSVC STL define junction para [junctions NTFS](<https://docs.microsoft.com/en-us/sysinternals/downloads/junction>))
`unknown` | o arquivo existe, mas seu tipo não pôde ser determinado

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
        switch (s.type())
        {
            case fs::file_type::none:
                std::cout << " has `not-evaluated-yet` type";
                break;
            case fs::file_type::not_found:
                std::cout << " does not exist";
                break;
            case fs::file_type::regular:
                std::cout << " is a regular file";
                break;
            case fs::file_type::directory:
                std::cout << " is a directory";
                break;
            case fs::file_type::symlink:
                std::cout << " is a symlink";
                break;
            case fs::file_type::block:
                std::cout << " is a block device";
                break;
            case fs::file_type::character:
                std::cout << " is a character device";
                break;
            case fs::file_type::fifo:
                std::cout << " is a named IPC pipe";
                break;
            case fs::file_type::socket:
                std::cout << " is a named IPC socket";
                break;
            case fs::file_type::unknown:
                std::cout << " has `unknown` type";
                break;
            default:
                std::cout << " has `implementation-defined` type";
                break;
        }
        std::cout << '\n';
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
[ is_socket](<#/doc/filesystem/is_socket>)(C++17) | verifica se o argumento se refere a um socket IPC nomeado
(função)
[ is_symlink](<#/doc/filesystem/is_symlink>)(C++17) | verifica se o argumento se refere a um link simbólico
(função)
[ is_regular_file](<#/doc/filesystem/directory_entry/is_regular_file>) | verifica se a entrada do diretório se refere a um arquivo regular
(função membro pública de `std::filesystem::directory_entry`)