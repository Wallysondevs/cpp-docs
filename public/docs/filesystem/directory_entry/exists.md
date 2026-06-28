# std::filesystem::directory_entry::exists

```cpp
bool exists() const;  // (1) (desde C++17)
bool exists( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Verifica se o objeto apontado existe. Efetivamente retorna:

1) [std::filesystem::exists](<#/doc/filesystem/exists>)(status()),

2) [std::filesystem::exists](<#/doc/filesystem/exists>)(status(ec)).

Note que [`status()`](<#/doc/filesystem/directory_entry/status>) segue symlinks para seus alvos.

### Parâmetros

- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

true se o objeto do sistema de arquivos referenciado existir.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    
    int main()
    {
        for (auto const str:
        {
            "/usr/bin/cat",
            "/usr/bin/mouse",
            "/usr/bin/python",
            "/usr/bin/bison",
            "/usr/bin/yacc",
            "/usr/bin/c++",
        })
        {
            std::filesystem::directory_entry entry{str};
    
            std::cout << "directory entry " << entry
                      << (entry.exists() ? " exists\n" : " does not exist\n");
        }
    }
```

Saída possível:
```
    // Saída em um sistema POSIX:
    directory entry "/usr/bin/cat" exist
    directory entry "/usr/bin/mouse" does not exist
    directory entry "/usr/bin/python" exists
    directory entry "/usr/bin/bison" exists
    directory entry "/usr/bin/yacc" does not exist
    directory entry "/usr/bin/c++" exists
```

### Veja também

[ exists](<#/doc/filesystem/exists>)(C++17) | verifica se o caminho se refere a um objeto existente do sistema de arquivos
(função)