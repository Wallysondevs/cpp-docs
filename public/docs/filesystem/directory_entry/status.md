# std::filesystem::directory_entry::status, std::filesystem::directory_entry::symlink_status

```cpp
std::filesystem::file_status status() const;  // (1) (desde C++17)
std::filesystem::file_status status( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
std::filesystem::file_status symlink_status() const;  // (3) (desde C++17)
std::filesystem::file_status symlink_status( std::error_code& ec ) const noexcept;  // (4) (desde C++17)
```

1,2) Retorna o status da entrada, como se determinado por uma chamada a [filesystem::status](<#/doc/filesystem/status>) (symlinks são seguidos até seus alvos).

3,4) Retorna o status da entrada, como se determinado por uma chamada a [filesystem::symlink_status](<#/doc/filesystem/status>) (symlinks não são seguidos).

### Parâmetros

- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

O status do arquivo referenciado pela entrada.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API subjacente do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2,4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

Muitas APIs de baixo nível do SO para travessia de diretórios recuperam atributos de arquivo junto com a próxima entrada de diretório. Os construtores e as funções membro não-const de [std::filesystem::directory_iterator](<#/doc/filesystem/directory_iterator>) armazenam esses atributos, se houver, na [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>) apontada sem chamar [`directory_entry::refresh`](<#/doc/filesystem/directory_entry/refresh>), o que torna possível examinar os atributos das entradas de diretório enquanto são iteradas, sem fazer chamadas adicionais ao sistema.

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

[ refresh](<#/doc/filesystem/directory_entry/refresh>) | atualiza os atributos de arquivo em cache
(função membro pública)
[ exists](<#/doc/filesystem/directory_entry/exists>) | verifica se a entrada de diretório se refere a um objeto do sistema de arquivos existente
(função membro pública)
[ is_block_file](<#/doc/filesystem/directory_entry/is_block_file>) | verifica se a entrada de diretório se refere a um dispositivo de bloco
(função membro pública)
[ is_character_file](<#/doc/filesystem/directory_entry/is_character_file>) | verifica se a entrada de diretório se refere a um dispositivo de caractere
(função membro pública)
[ is_directory](<#/doc/filesystem/directory_entry/is_directory>) | verifica se a entrada de diretório se refere a um diretório
(função membro pública)
[ is_fifo](<#/doc/filesystem/directory_entry/is_fifo>) | verifica se a entrada de diretório se refere a um pipe nomeado
(função membro pública)
[ is_other](<#/doc/filesystem/directory_entry/is_other>) | verifica se a entrada de diretório se refere a um arquivo _outro_
(função membro pública)
[ is_regular_file](<#/doc/filesystem/directory_entry/is_regular_file>) | verifica se a entrada de diretório se refere a um arquivo regular
(função membro pública)
[ is_socket](<#/doc/filesystem/directory_entry/is_socket>) | verifica se a entrada de diretório se refere a um socket IPC nomeado
(função membro pública)
[ is_symlink](<#/doc/filesystem/directory_entry/is_symlink>) | verifica se a entrada de diretório se refere a um link simbólico
(função membro pública)
[ file_size](<#/doc/filesystem/directory_entry/file_size>) | retorna o tamanho do arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ hard_link_count](<#/doc/filesystem/directory_entry/hard_link_count>) | retorna o número de hard links que se referem ao arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ last_write_time](<#/doc/filesystem/directory_entry/last_write_time>) | obtém o tempo da última modificação de dados do arquivo ao qual a entrada de diretório se refere
(função membro pública)