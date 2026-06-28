# std::experimental::filesystem::file_size

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
std::uintmax_t file_size( const path& p );
std::uintmax_t file_size( const path& p, error_code& ec );
```

Retorna o tamanho do arquivo regular p, determinado como se fosse pela leitura do membro `st_size` da estrutura obtida por POSIX [stat](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) (symlinks são seguidos).

A tentativa de determinar o tamanho de um diretório (assim como qualquer outro arquivo que não seja um arquivo regular ou um symlink) é tratada como um erro.

A sobrecarga que não lança exceções retorna -1 em caso de erros.

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

O tamanho do arquivo, em bytes.

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com p como o primeiro argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = fs::current_path() / "example.bin";
        std::ofstream(p).put('a'); // create file of size 1
        std::cout << "File size = " << fs::file_size(p) << '\n';
        fs::remove(p);
    
        try
        {
            fs::file_size("/dev"); // attempt to get size of a directory
        }
        catch (fs::filesystem_error& e)
        {
            std::cout << e.what() << '\n';
        }        
    }
```

Saída possível:
```
    File size = 1
    filesystem error: cannot get file size: Is a directory [/dev]
```

### Veja também

[ resize_file](<#/doc/experimental/fs/resize_file>) | altera o tamanho de um arquivo regular por truncamento ou preenchimento com zeros
(function)
[ space](<#/doc/experimental/fs/space>) | determina o espaço livre disponível no sistema de arquivos
(function)