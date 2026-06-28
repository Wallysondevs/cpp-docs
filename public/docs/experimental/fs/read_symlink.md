Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
path read_symlink( const path& p );
path read_symlink( const path& p, error_code& ec );
```

Se o path p se refere a um link simbólico, retorna um novo objeto path que se refere ao alvo desse link simbólico.

É um erro se p não se refere a um link simbólico.

A sobrecarga que não lança exceções retorna um path vazio em caso de erros.

### Parâmetros

- **p** — caminho para um symlink
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

O alvo do symlink (que pode não necessariamente existir).

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui a especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Exemplo

Execute este código
```
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        // on a typical Linux system, /lib/libc.so.6 is a symlink
        fs::path p = "/lib/libc.so.6";
        if (exists(p) && is_symlink(p))
            std::cout << p << " -> " << read_symlink(p) << '\n';
        else
            std::cout << p << " does not exist or is not a symlink\n";
    }
```

Saída possível:
```
    "/lib/libc.so.6" -> "libc-2.12.so"
```

### Veja também

[ is_symlink](<#/doc/experimental/fs/is_symlink>) | verifica se o argumento se refere a um link simbólico
(função)
[ create_symlinkcreate_directory_symlink](<#/doc/experimental/fs/create_symlink>) | cria um link simbólico
(função)
[ copy_symlink](<#/doc/experimental/fs/copy_symlink>) | copia um link simbólico
(função)
[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)