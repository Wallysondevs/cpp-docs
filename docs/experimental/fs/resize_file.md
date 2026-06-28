# std::experimental::filesystem::resize_file

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
void resize_file( const path& p, std::uintmax_t new_size );
void resize_file( const path& p, std::uintmax_t new_size, error_code& ec );
```

Altera o tamanho do arquivo regular nomeado por `p` como se fosse pela função POSIX [truncate](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/truncate.html>): se o tamanho do arquivo era anteriormente maior que `new_size`, o restante do arquivo é descartado. Se o arquivo era anteriormente menor que `new_size`, o tamanho do arquivo é aumentado e a nova área aparece como se estivesse preenchida com zeros.

### Parâmetros

- **p** — caminho para redimensionar
- **new_size** — novo tamanho que o arquivo terá
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente, construída com `p` como o primeiro argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui a especificação

[`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Observações

Em sistemas que suportam arquivos esparsos, aumentar o tamanho do arquivo não aumenta o espaço que ele ocupa no sistema de arquivos: a alocação de espaço ocorre apenas quando bytes diferentes de zero são gravados no arquivo.

### Exemplo

Demonstra o efeito da criação de um arquivo esparso no espaço livre.

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = fs::temp_directory_path() / "example.bin";
        std::ofstream(p).put('a');
        std::cout << "File size:  " << fs::file_size(p) << '\n'
                  << "Free space: " << fs::space(p).free << '\n';
        fs::resize_file(p, 64*1024); // resize to 64 KB
        std::cout << "File size:  " << fs::file_size(p) << '\n'
                  << "Free space: " << fs::space(p).free << '\n';
        fs::remove(p);
    }
```

Saída possível:
```
    File size:  1
    Free space: 31805444096
    File size:  65536
    Free space: 31805444096
```

### Ver também

[ file_size](<#/doc/experimental/fs/file_size>) | retorna o tamanho de um arquivo
(função)
[ space](<#/doc/experimental/fs/space>) | determina o espaço livre disponível no sistema de arquivos
(função)