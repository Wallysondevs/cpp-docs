# std::filesystem::directory_entry::last_write_time

```cpp
std::filesystem::file_time_type last_write_time() const;  // (1) (desde C++17)
std::filesystem::file_time_type last_write_time( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Se a hora da última modificação estiver em cache neste [`directory_entry`](<#/doc/filesystem/directory_entry/directory_entry>), retorna o valor em cache. Caso contrário, retorna:

1) [std::filesystem::last_write_time](<#/doc/filesystem/last_write_time>)(path()).

2) [std::filesystem::last_write_time](<#/doc/filesystem/last_write_time>)(path(), ec).

### Parâmetros

- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

A hora da última modificação para o objeto do sistema de arquivos referenciado.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <ctime>
    #include <filesystem>
    #include <format>
    #include <iostream>
    #include <string>
    
    std::string to_string(const std::filesystem::file_time_type& ftime)
    {
    #if __cpp_lib_format
        return std::format("{:%c}", ftime);
    #else
        std::time_t cftime = std::chrono::system_clock::to_time_t(
            std::chrono::file_clock::to_sys(ftime));
        std::string str = std::asctime(std::localtime(&cftime));
        str.pop_back(); // rm the trailing '\n' put by `asctime`
        return str;
    #endif
    }
    
    int main()
    {
        auto dir = std::filesystem::current_path();
        using Entry = std::filesystem::directory_entry;
        for (Entry const& entry : std::filesystem::directory_iterator(dir))
            std::cout << to_string(entry.last_write_time()) << " : "
                      << entry.path().filename() << '\n';
    }
```

Saída possível:
```
    Wed Sep  6 13:37:13.960314156 2023 : "main.cpp"
    Wed Sep  6 13:37:42.690271828 2023 : "a.out"
```

### Veja também

[ last_write_time](<#/doc/filesystem/last_write_time>)(C++17) | obtém ou define a hora da última modificação de dados
(função)