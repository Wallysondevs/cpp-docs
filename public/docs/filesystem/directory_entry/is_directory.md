# std::filesystem::directory_entry::is_directory

```cpp
bool is_directory() const;  // (1) (desde C++17)
bool is_directory( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Verifica se o objeto apontado é um diretório. Efetivamente retorna:

1) [std::filesystem::is_directory](<#/doc/filesystem/is_directory>)(status()),

2) [std::filesystem::is_directory](<#/doc/filesystem/is_directory>)(status(ec)).

### Parâmetros

- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

true se o objeto do filesystem referenciado for um diretório, false caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construída com p como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
    #include <string_view>
    
    namespace fs = std::filesystem;
    
    void check_directory(fs::directory_entry const& d, std::string_view rem = "")
    {
        std::cout << "is_directory(" << d << "): " << d.is_directory() << rem << '\n';
    }
    
    int main()
    {
        fs::directory_entry d1(".");
        fs::directory_entry d2("file.txt");
        fs::directory_entry d3("new_dir");
    
        std::cout << std::boolalpha;
    
        check_directory(d1);
        check_directory(d2);
        check_directory(d3, " (has not been created yet).");
    
        std::filesystem::create_directory("new_dir");
    
        check_directory(d3, " (before refresh).");
        d3.refresh();
        check_directory(d3, " (after refresh).");
    }
```

Saída possível:
```
    is_directory("."): true
    is_directory("file.txt"): false
    is_directory("new_dir"): false (has not been created yet).
    is_directory("new_dir"): false (before refresh).
    is_directory("new_dir"): true (after refresh).
```

### Veja também

[ is_directory](<#/doc/filesystem/is_directory>)(C++17) | verifica se o caminho fornecido se refere a um diretório
(função)