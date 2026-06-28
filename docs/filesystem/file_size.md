# std::filesystem::file_size

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
std::uintmax_t file_size( const std::filesystem::path& p );
std::uintmax_t file_size( const std::filesystem::path& p,
std::error_code& ec ) noexcept;
```

  
Se p não existir, reporta um erro.

Para um arquivo regular p, retorna o tamanho determinado como se lendo o membro `st_size` da estrutura obtida por POSIX [`stat`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) (symlinks são seguidos).

O resultado de tentar determinar o tamanho de um diretório (assim como qualquer outro arquivo que não seja um arquivo regular ou um symlink) é definido pela implementação.

A sobrecarga que não lança exceções retorna static_cast<[std::uintmax_t](<#/doc/types/integer>)>(-1) em caso de erros.

### Parâmetros

p  |  \-  |  caminho a ser examinado   
---|---|---
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

O tamanho do arquivo, em bytes.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.  

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
    struct HumanReadable
    {
        std::uintmax_t size{};
    
    private:
        friend std::ostream& operator<<(std::ostream& os, HumanReadable hr)
        {
            int o{};
            double mantissa = hr.size;
            for (; mantissa >= 1024.; mantissa /= 1024., ++o);
            os << std::ceil(mantissa * 10.) / 10. << "BKMGTPE"[o];
            return o ? os << "B (" << hr.size << ')' : os;
        }
    };
    
    int main(int, char const* argv[])
    {
        fs::path example = "example.bin";
        fs::path p = fs::current_path() / example;
        std::ofstream(p).put('a'); // create file of size 1
        std::cout << example << " size = " << fs::file_size(p) << '\n';
        fs::remove(p);
    
        p = argv[0];
        std::cout << p << " size = " << HumanReadable{fs::file_size(p)} << '\n';
    
        try
        {
            std::cout << "Attempt to get size of a directory:\n";
            [[maybe_unused]] auto x_x = fs::file_size("/dev");
        }
        catch (fs::filesystem_error& e)
        {
            std::cout << e.what() << '\n';
        }
    
        for (std::error_code ec; fs::path bin : {"cat", "mouse"})
        {
            bin = "/bin"/bin;
            if (const std::uintmax_t size = fs::file_size(bin, ec); ec)
                std::cout << bin << " : " << ec.message() << '\n';
            else
                std::cout << bin << " size = " << HumanReadable{size} << '\n';
        }
    }
```

Saída possível: 
```
    "example.bin" size = 1
    "./a.out" size = 22KB (22512)
    Attempt to get size of a directory:
    filesystem error: cannot get file size: Is a directory [/dev]
    "/bin/cat" size = 50.9KB (52080)
    "/bin/mouse" : No such file or directory
```

### Veja também

[ resize_file](<#/doc/filesystem/resize_file>)(C++17) |  altera o tamanho de um arquivo regular por truncamento ou preenchimento com zeros   
(função)  
[ space](<#/doc/filesystem/space>)(C++17) |  determina o espaço livre disponível no sistema de arquivos   
(função)  
[ file_size](<#/doc/filesystem/directory_entry/file_size>) |  retorna o tamanho do arquivo ao qual a entrada de diretório se refere   
(função membro pública de `std::filesystem::directory_entry`)