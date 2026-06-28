# std::experimental::filesystem::copy_symlink

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
void copy_symlink( const path& from, const path& to );
void copy_symlink( const path& from, const path& to,
error_code& ec );
```

Copia um symlink para outro local.

1) Efetivamente chama f(read_symlink(from), to) onde `f` é create_symlink() ou create_directory_symlink dependendo se from resolve para um arquivo ou diretório.

2) Efetivamente chama f(read_symlink(from, ec), to, ec) onde `f` é create_symlink() ou create_directory_symlink dependendo se from resolve para um arquivo ou diretório.

### Parâmetros

- **from** — caminho para um link simbólico a ser copiado
- **to** — caminho de destino do novo symlink
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceção

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com from como o primeiro argumento, to como o segundo argumento, e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

### Veja também

[ copy](<#/doc/experimental/fs/copy>) | copia arquivos ou diretórios
(função)
[ copy_file](<#/doc/experimental/fs/copy_file>) | copia o conteúdo de arquivos
(função)
[ create_symlinkcreate_directory_symlink](<#/doc/experimental/fs/create_symlink>) | cria um link simbólico
(função)
[ read_symlink](<#/doc/experimental/fs/read_symlink>) | obtém o destino de um link simbólico
(função)