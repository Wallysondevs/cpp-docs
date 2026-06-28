# std::experimental::filesystem::hard_link_count

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
std::uintmax_t hard_link_count( const path& p );
std::uintmax_t hard_link_count( const path& p, error_code& ec );
```

  
Retorna o número de hard links para o objeto do filesystem identificado pelo path p.

A sobrecarga que não lança exceções retorna static_cast<uintmax_t>(-1) em caso de erros.

### Parâmetros

p  |  \-  |  path a ser examinado   
---|---|---
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

O número de hard links para p.

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        // On a POSIX-style filesystem, each directory has at least 2 hard links:
        // itself and the special member pathname "."
        fs::path p = fs::current_path();
        std::cout << "Number of hard links for current path is "
                  << fs::hard_link_count(p) << '\n';
    
        // each ".." is a hard link to the parent directory, so the total number
        // of hard links for any directory is 2 plus number of direct subdirectories
        p = fs::current_path() / ".."; // each dot-dot is a hard link to parent
        std::cout << "Number of hard links for .. is "
                  << fs::hard_link_count(p) << '\n';
    }
```

Saída:
```
    Number of hard links for current path is 2
    Number of hard links for .. is 3
```

### Veja também

[ create_hard_link](<#/doc/experimental/fs/create_hard_link>) |  cria um hard link   
(função)  