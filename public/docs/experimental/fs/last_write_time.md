# std::experimental::filesystem::last_write_time

Definido no header `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```cpp
file_time_type last_write_time( const path& p );
file_time_type last_write_time( const path& p, error_code& ec )  // (1)
void last_write_time( const path& p, file_time_type new_time );
void last_write_time( const path& p, file_time_type new_time, error_code& ec );  // (2)
```

  
1) Retorna o tempo da última modificação de p, determinado como se acessando o membro `st_mtime` da função POSIX [stat](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) (symlinks são seguidos). A sobrecarga que não lança exceções retorna file_time_type::min() em caso de erros.

2) Altera o tempo da última modificação de p, como se pela função POSIX [futimens](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/futimens.html>) (symlinks são seguidos).

### Parâmetros

p  |  \-  |  caminho a examinar ou modificar   
---|---|---
new_time  |  \-  |  novo tempo de modificação   
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

1) O tempo da última modificação de p.

2) (nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui a especificação 

[`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept

### Notas

Não é garantido que imediatamente após definir o tempo de escrita, o valor retornado por (1) seja o mesmo que foi passado como argumento para (2) porque o tempo do sistema de arquivos pode ser mais granular do que `file_time_type`. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    using namespace std::chrono_literals;
     
    int main()
    {
        fs::path p = fs::current_path() / "example.bin";
        std::ofstream(p.c_str()).put('a'); // create file
        auto ftime = fs::last_write_time(p);
     
        std::time_t cftime = decltype(ftime)::clock::to_time_t(ftime); // assuming system_clock
        std::cout << "File write time is " << std::asctime(std::localtime(&cftime)) << '\n';
     
        fs::last_write_time(p, ftime + 1h); // move file write time 1 hour to the future
        ftime = fs::last_write_time(p); // read back from the filesystem
     
        cftime = decltype(ftime)::clock::to_time_t(ftime);
        std::cout << "File write time is " << std::asctime(std::localtime(&cftime)) << '\n';
        fs::remove(p);
    }
```

Saída possível: 
```
    File write time is Tue Mar 31 19:47:04 2015
     
    File write time is Tue Mar 31 20:47:04 2015
```

### Veja também

[ file_time_type](<#/doc/experimental/fs/file_time_type>) |  representa valores de tempo de arquivo   
(typedef)  