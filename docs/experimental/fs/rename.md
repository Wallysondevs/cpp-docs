# std::experimental::filesystem::rename

Definido no header `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```cpp
void rename( const path& old_p, const path& new_p );
void rename( const path& old_p, const path& new_p, std::error_code& ec );
```

Move ou renomeia o objeto do filesystem identificado por old_p para new_p como se fosse pela função POSIX [rename](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html>):

  * Se old_p for um arquivo que não é um diretório, então new_p deve ser um dos seguintes:

    * o mesmo arquivo que old_p ou um hardlink para ele: nada é feito neste caso.
    * arquivo existente que não é um diretório: new_p é primeiro excluído, então, sem permitir que outros processos observem new_p como excluído, o pathname new_p é linkado ao arquivo e old_p é deslinkado do arquivo. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.
    * arquivo não existente em um diretório existente: O pathname new_p é linkado ao arquivo e old_p é deslinkado do arquivo. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.

  * Se old_p for um diretório, então new_p deve ser um dos seguintes:

    * o mesmo diretório que old_p ou um hardlink para ele: nada é feito neste caso.
    * diretório existente: new_p é excluído se estiver vazio em sistemas POSIX, mas isso pode ser um erro em outros sistemas. Se não for um erro, então new_p é primeiro excluído, então, sem permitir que outros processos observem new_p como excluído, o pathname new_p é linkado ao diretório e old_p é deslinkado do diretório. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.
    * diretório não existente, não terminando com um separador de diretório, e cujo diretório pai existe: O pathname new_p é linkado ao diretório e old_p é deslinkado do diretório. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.

  * Symlinks não são seguidos: se old_p for um symlink, ele mesmo é renomeado, não seu alvo. Se new_p for um symlink existente, ele mesmo é apagado, não seu alvo.

A renomeação falha se

  * new_p terminar com ponto ou com ponto-ponto.
  * new_p nomear um diretório não existente terminando com um separador de diretório.
  * old_p for um diretório que é um ancestral de new_p.

### Parâmetros

- **old_p** — caminho a ser movido ou renomeado
- **new_p** — caminho de destino para a operação de mover/renomear
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com old_p como o primeiro argumento, new_p como o segundo argumento, e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do SO se uma chamada à API do SO falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

`noexcept`

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = fs::current_path() / "sandbox";
        fs::create_directories(p/"from");
        std::ofstream(p/"from/file1.txt").put('a');
        fs::create_directory(p/"to");
    
    //  fs::rename(p/"from/file1.txt", p/"to/"); // error: to is a directory
        fs::rename(p/"from/file1.txt", p/"to/file2.txt"); // OK
    //  fs::rename(p/"from", p/"to"); // error: to is not empty
        fs::rename(p/"from", p/"to/subdir"); // OK
    
        fs::remove_all(p);
    }
```

### Veja também

[ rename](<#/doc/io/c/rename>) | renomeia um arquivo
(função)
[ removeremove_all](<#/doc/experimental/fs/remove>) | remove um arquivo ou diretório vazio
remove um arquivo ou diretório e todo o seu conteúdo, recursivamente
(função)