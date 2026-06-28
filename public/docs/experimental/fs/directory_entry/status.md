# std::experimental::filesystem::directory_entry::status, std::experimental::filesystem::directory_entry::symlink_status

file_status status() const;  
file_status status( error_code& ec ) const; |  (1)  |  (filesystem TS)  
file_status symlink_status() const;  
file_status symlink_status( error_code& ec ) const; |  (2)  |  (filesystem TS)  

  
1) Retorna o status potencialmente em cache da entrada, como se determinado por uma chamada a [status](<#/doc/experimental/fs/status>) (symlinks são seguidos até seus alvos).

2) Retorna o status potencialmente em cache da entrada, como se determinado por uma chamada a [symlink_status](<#/doc/experimental/fs/status>) (symlinks não são seguidos).

### Parâmetros

ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

O status do arquivo referenciado pela entrada. 

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/fs/directory_entry/filesystem_error&action=edit&redlink=1> "cpp/experimental/fs/directory entry/filesystem error \(page does not exist\)") em erros da API do sistema operacional subjacente, construída com `p` como o primeiro argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação: 

noexcept

### Observações

As informações de status do arquivo são geralmente fornecidas como um subproduto da iteração de diretório, caso em que são armazenadas em cache e podem ser obtidas por essas funções membro sem o custo de uma chamada de sistema adicional. Durante a iteração de diretório, chamar `status` é desnecessário e acessadores como `is_directory` devem ser chamados com o valor de status em cache, e não com um `path`. 

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

[ file_status](<#/doc/experimental/fs/file_status>) | representa o tipo e as permissões do arquivo   
(classe)  
[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo  
determina atributos de arquivo, verificando o alvo do symlink   
(função)  
[ status_known](<#/doc/experimental/fs/status_known>) | verifica se o status do arquivo é conhecido   
(função)  
[ is_block_file](<#/doc/experimental/fs/is_block_file>) | verifica se o `path` fornecido se refere a um dispositivo de bloco   
(função)  
[ is_character_file](<#/doc/experimental/fs/is_character_file>) | verifica se o `path` fornecido se refere a um dispositivo de caractere   
(função)  
[ is_directory](<#/doc/experimental/fs/is_directory>) | verifica se o `path` fornecido se refere a um diretório   
(função)  
[ is_fifo](<#/doc/experimental/fs/is_fifo>) | verifica se o `path` fornecido se refere a um pipe nomeado   
(função)  
[ is_other](<#/doc/experimental/fs/is_other>) | verifica se o argumento se refere a um arquivo _outro_   
(função)  
[ is_regular_file](<#/doc/experimental/fs/is_regular_file>) | verifica se o argumento se refere a um arquivo regular   
(função)  
[ is_socket](<#/doc/experimental/fs/is_socket>) | verifica se o argumento se refere a um socket IPC nomeado   
(função)  
[ is_symlink](<#/doc/experimental/fs/is_symlink>) | verifica se o argumento se refere a um link simbólico   
(função)