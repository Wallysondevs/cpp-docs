# std::experimental::filesystem::remove, std::experimental::filesystem::remove_all

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool remove( const path& p );
bool remove( const path& p, error_code& ec );
std::uintmax_t remove_all( const path& p );
std::uintmax_t remove_all( const path& p, error_code& ec );
```

1) O arquivo ou diretório vazio identificado pelo path p é excluído como se fosse pela função POSIX [remove](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remove.html>). Symlinks não são seguidos (o symlink é removido, não seu alvo).

2) Exclui o conteúdo de p (se for um diretório) e o conteúdo de todos os seus subdiretórios, recursivamente, então exclui o próprio p como se fosse pela aplicação repetida da função POSIX [remove](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remove.html>). Symlinks não são seguidos (o symlink é removido, não seu alvo).

### Parâmetros

- **p** — path a ser excluído
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

1) true se o arquivo foi excluído, false se ele não existia. A sobrecarga que recebe o argumento error_code& retorna false em caso de erros.

2) Retorna o número de arquivos e diretórios que foram excluídos (que pode ser zero se p não existia para começar). A sobrecarga que recebe o argumento error_code& retorna static_cast<[std::uintmax_t](<#/doc/types/integer>)>(-1) em caso de erro.

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui a especificação `noexcept`:

`noexcept`

### Observações

Em sistemas POSIX, esta função tipicamente chama `unlink` e `rmdir` conforme necessário; no Windows, `RemoveDirectoryW` e `DeleteFileW`.

### Exemplo

Execute este código
```
    #include <cstdint>
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path dir = fs::temp_directory_path();
        fs::create_directories(dir / "abcdef/example");
        std::uintmax_t n = fs::remove_all(dir / "abcdef");
        std::cout << "Deleted " << n << " files or directories\n";
    }
```

Saída possível:
```
    Deleted 2 files or directories
```

### Veja também

[ remove](<#/doc/io/c/remove>) | apaga um arquivo
(função)