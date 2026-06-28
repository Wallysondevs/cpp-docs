# std::filesystem::last_write_time

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
std::filesystem::file_time_type last_write_time( const std::filesystem::path& p );  // (1) (desde C++17)
std::filesystem::file_time_type last_write_time( const std::filesystem::path& p,
std::error_code& ec ) noexcept;  // (2) (desde C++17)
void last_write_time( const std::filesystem::path& p,
std::filesystem::file_time_type new_time );  // (3) (desde C++17)
void last_write_time( const std::filesystem::path& p,
std::filesystem::file_time_type new_time,
std::error_code& ec ) noexcept;  // (4) (desde C++17)
```

  
1,2) Retorna o tempo da última modificação de p, determinado como se acessando o membro `st_mtime` do POSIX [`stat`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) (symlinks são seguidos). A sobrecarga que não lança exceções retorna file_time_type::min() em caso de erros.

3,4) Altera o tempo da última modificação de p, como se por POSIX [`futimens`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/futimens.html>) (symlinks são seguidos).

### Parâmetros

p  |  \-  |  caminho para examinar ou modificar   
---|---|---
new_time  |  \-  |  novo tempo de modificação   
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

1,2) O tempo da última modificação de p.

3,4) (nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.  

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2,4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Observações

Não é garantido que imediatamente após definir o tempo de escrita, o valor retornado por (1,2) seja o mesmo que foi passado como argumento para (3,4) porque o tempo do sistema de arquivos pode ser mais granular do que [filesystem::file_time_type](<#/doc/filesystem/file_time_type>). 

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <filesystem>
    #include <format>
    #include <fstream>
    #include <iostream>
    
    using namespace std::chrono_literals;
    
    int main()
    {
        auto p = std::filesystem::temp_directory_path() / "example.bin";
        std::ofstream{p.c_str()}.put('a'); // create file
    
        std::filesystem::file_time_type ftime = std::filesystem::last_write_time(p);
        std::cout << std::format("File write time is {}\n", ftime);
    
        // move file write time 1 hour to the future
        std::filesystem::last_write_time(p, ftime + 1h);
    
        // read back from the filesystem
        ftime = std::filesystem::last_write_time(p);
        std::cout << std::format("File write time is {}\n", ftime);
    
        std::filesystem::remove(p);
    }
```

Saída possível: 
```
    File write time is 2023-09-04 19:33:24.702639224
    File write time is 2023-09-04 20:33:24.702639224
```

### Veja também

[ file_time_type](<#/doc/filesystem/file_time_type>)(C++17) | representa valores de tempo de arquivo   
(typedef)  
[ last_write_time](<#/doc/filesystem/directory_entry/last_write_time>) | obtém o tempo da última modificação de dados do arquivo ao qual a entrada de diretório se refere   
(função membro pública de `std::filesystem::directory_entry`)