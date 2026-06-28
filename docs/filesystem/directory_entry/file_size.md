# std::filesystem::directory_entry::file_size

```cpp
std::uintmax_t file_size() const;  // (1) (desde C++17)
std::uintmax_t file_size( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Se o tamanho do arquivo estiver em cache neste [`directory_entry`](<#/doc/filesystem/directory_entry/directory_entry>), retorna o valor em cache. Caso contrário, retorna:

1) [std::filesystem::file_size](<#/doc/filesystem/file_size>)(path()),

2) [std::filesystem::file_size](<#/doc/filesystem/file_size>)(path(), ec).

### Parâmetros

- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

O tamanho do objeto do sistema de arquivos referenciado.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API subjacente do sistema operacional, construída com p como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Imprime a lista de arquivos em um determinado diretório juntamente com seus tamanhos em formato legível por humanos.

Execute este código
```
    #include <cmath>
    #include <cstdint>
    #include <filesystem>
    #include <iostream>
    
    struct HumanReadable
    {
        std::uintmax_t size{};
    
        template<typename Os> friend Os& operator<<(Os& os, HumanReadable hr)
        {
            int i{};
            double mantissa = hr.size;
            for (; mantissa >= 1024.0; mantissa /= 1024.0, ++i)
            {}
            os << std::ceil(mantissa * 10.0) / 10.0 << i["BKMGTPE"];
            return i ? os << "B (" << hr.size << ')' : os;
        }
    };
    
    int main(int argc, const char* argv[])
    {
        const auto dir = argc == 2 ? std::filesystem::path{argv[1]}
                                   : std::filesystem::current_path();
    
        for (std::filesystem::directory_entry const& entry : 
             std::filesystem::directory_iterator(dir))
            if (entry.is_regular_file())
                std::cout << entry.path().filename() << " size: "
                          << HumanReadable{entry.file_size()} << '\n';
    }
```

Saída possível:
```
    "boost_1_73_0.tar.bz2" size: 104.2MB (109247910)
    "CppCon 2018 - Jon Kalb “Copy Elision”.mp4" size: 15.7MB (16411990)
    "cppreference-doc-20190607.tar.xz" size: 6.3MB (6531336)
    "hana.hpp" size: 6.7KB (6807)
```

### Veja também

[ file_size](<#/doc/filesystem/file_size>)(C++17) | retorna o tamanho de um arquivo
(função)