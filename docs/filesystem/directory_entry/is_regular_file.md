# std::filesystem::directory_entry::is_regular_file

```cpp
bool is_regular_file() const;  // (1) (desde C++17)
bool is_regular_file( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Verifica se o objeto apontado é um arquivo regular. Efetivamente retorna:

1) [std::filesystem::is_regular_file](<#/doc/filesystem/is_regular_file>)(status()).

2) [std::filesystem::is_regular_file](<#/doc/filesystem/is_regular_file>)(status(ec)).

### Parâmetros

- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

true se o objeto do sistema de arquivos referenciado for um arquivo regular, false caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do SO subjacente, construída com `p` como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada à API do SO falhar, e executa `ec.[`clear`](<#/doc/error/error_code/clear>)()` se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    #include <string>
    
    namespace fs = std::filesystem;
    
    int main(int argc, const char* argv[])
    {
        // Print out all regular files in a directory 'dir'.
        try
        {
            const auto dir{argc == 2 ? fs::path{argv[1]} : fs::current_path()};
    
            std::cout << "Current dir: " << dir << '\n'
                      << std::string(40, '-') << '\n';
    
            for (fs::directory_entry const& entry : fs::directory_iterator(dir))
                if (entry.is_regular_file())
                    std::cout << entry.path().filename() << '\n';
        }
        catch(const fs::filesystem_error& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível:
```
    Current dir: "/tmp/1588616534.9884143"
    ----------------------------------------
    "main.cpp"
    "a.out"
```

### Veja também

[ is_regular_file](<#/doc/filesystem/is_regular_file>)(C++17) | verifica se o argumento se refere a um arquivo regular
(function)