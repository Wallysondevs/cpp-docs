# std::filesystem::hard_link_count

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
std::uintmax_t hard_link_count( const std::filesystem::path& p );
std::uintmax_t hard_link_count( const std::filesystem::path& p,
std::error_code& ec ) noexcept;
```

Retorna o número de hard links para o objeto do sistema de arquivos identificado pelo caminho p.

A sobrecarga que não lança exceções retorna static_cast<uintmax_t>(-1) em caso de erros.

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

O número de hard links para p.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro `std::error_code`& para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Run this code
```
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        // Em um sistema de arquivos estilo POSIX, cada diretório tem pelo menos 2 hard links:
        // ele mesmo e o nome de caminho de membro especial "."
        fs::path p = fs::current_path();
        std::cout << "Number of hard links for current path is "
                  << fs::hard_link_count(p) << '\n';
    
        // Cada ".." é um hard link para o diretório pai, então o número total
        // de hard links para qualquer diretório é 2 mais o número de subdiretórios diretos
        p = fs::current_path() / ".."; // Cada ponto-ponto é um hard link para o pai
        std::cout << "Number of hard links for .. is "
                  << fs::hard_link_count(p) << '\n';
    }
```

Saída possível:
```
    Number of hard links for current path is 2
    Number of hard links for .. is 3
```

### Veja também

[ create_hard_link](<#/doc/filesystem/create_hard_link>)(C++17) | cria um hard link
(função)
[ hard_link_count](<#/doc/filesystem/directory_entry/hard_link_count>) | retorna o número de hard links que referenciam o arquivo ao qual a entrada de diretório se refere
(função membro pública de `std::filesystem::directory_entry`)