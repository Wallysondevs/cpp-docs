# std::filesystem::directory_entry::is_other

```cpp
bool is_other() const;  // (1) (desde C++17)
bool is_other( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Verifica se o objeto apontado é um arquivo _other_ (não um arquivo regular, diretório ou symlink). Efetivamente retorna:

1) [std::filesystem::is_other](<#/doc/filesystem/is_other>)(status()).

2) [std::filesystem::is_other](<#/doc/filesystem/is_other>)(status(ec)).

### Parâmetros

ec | \- | parâmetro de saída para relatórios de erro na sobrecarga que não lança exceções

### Valor de retorno

true se o objeto do sistema de arquivos referenciado for um arquivo _other_, false caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstring>
    #include <filesystem>
    #include <fstream>
    #include <functional>
    #include <iostream>
    #include <memory>
    #include <sys/socket.h>
    #include <sys/stat.h>
    #include <sys/un.h>
    #include <unistd.h>
    
    namespace fs = std::filesystem;
    
    void print_entry_type(const std::filesystem::directory_entry& entry)
    {
        std::cout << entry.path() << ": ";
    
        if (!entry.exists())
            std::cout << "does not exist ";
        if (entry.is_block_file())
            std::cout << "is a block device ";
        if (entry.is_character_file())
            std::cout << "is a character device ";
        if (entry.is_directory())
            std::cout << "is a directory ";
        if (entry.is_fifo())
            std::cout << "is a named IPC pipe ";
        if (entry.is_regular_file())
            std::cout << "is a regular file ";
        if (entry.is_socket())
            std::cout << "is a named IPC socket ";
        if (entry.is_symlink())
            std::cout << "(a symlink)";
        if (entry.is_other())
            std::cout << "(an `other` file)";
    
        std::cout << '\n';
    }
    
    template<typename Type, typename Fun>
    class scoped_cleanup
    {
        std::unique_ptr<Type, std::function<void(const Type*)>> u;
    
    public:
        scoped_cleanup(Type* ptr, Fun fun) : u{ptr, std::move(fun)} {}
    };
    
    int main()
    {
        // Create files of different kinds.
        std::filesystem::current_path(fs::temp_directory_path());
        const std::filesystem::path sandbox{"sandbox"};
        scoped_cleanup remove_all_at_exit{&sandbox, 
        {
            std::cout << "cleanup: remove_all(" << *p << ")\n";
            fs::remove_all(*p);
        }};
        std::filesystem::create_directory(sandbox);
        std::ofstream{sandbox/"file"}; // Creates a regular file
        std::filesystem::create_directory(sandbox/"dir");
    
        mkfifo((sandbox/"pipe").string().data(), 0644);
        struct sockaddr_un addr; addr.sun_family = AF_UNIX;
    
        std::strcpy(addr.sun_path, (sandbox/"sock").string().data());
        int fd{socket(PF_UNIX, SOCK_STREAM, 0)};
        scoped_cleanup close_socket_at_exit{&fd, 
        {
            std::cout << "cleanup: close socket #" << *f << '\n';
            close(*f);
        }};
        bind(fd, reinterpret_cast<sockaddr*>(std::addressof(addr)), sizeof addr);
    
        fs::create_symlink("file", sandbox/"symlink");
    
        for (std::filesystem::directory_entry entry: fs::directory_iterator(sandbox))
            print_entry_type(entry);
    
        // Request file system objects status directly:
        for (const char* str : {"/dev/null", "/dev/cpu", "/usr/include/c++",
                                "/usr/include/asm", "/usr/include/time.h"})
            print_entry_type(fs::directory_entry{str});
    
    } // Cleanup via scoped_cleanup objects
```

Saída possível:
```
    "sandbox/symlink": is a regular file (a symlink) 
    "sandbox/sock": is a named IPC socket (an `other` file) 
    "sandbox/pipe": is a named IPC pipe (an `other` file) 
    "sandbox/dir": is a directory 
    "sandbox/file": is a regular file 
    "/dev/null": is a character device (an `other` file) 
    "/dev/cpu": does not exist 
    "/usr/include/c++": is a directory 
    "/usr/include/asm": is a directory (a symlink) 
    "/usr/include/time.h": is a regular file 
    cleanup: close socket #3
    cleanup: remove_all("sandbox")
```

### Veja também

[ is_other](<#/doc/filesystem/is_other>)(C++17) | verifica se o argumento se refere a um arquivo _other_
(função)