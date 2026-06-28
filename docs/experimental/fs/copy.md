# std::experimental::filesystem::copy

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
void copy( const path& from, const path& to );
void copy( const path& from, const path& to, error_code& ec );
void copy( const path& from, const path& to, copy_options options );
void copy( const path& from, const path& to, copy_options options, error_code& ec );
```

Copia arquivos e diretórios, com uma variedade de opções:

1) O padrão, equivalente a (2) com `copy_options::none` usado como opções.

2) Copia o arquivo ou diretório `from` para o arquivo ou diretório `to`, usando as opções de cópia indicadas por `options`. O comportamento é indefinido se houver mais de uma opção em qualquer um dos grupos de opções de [copy_options](<#/doc/experimental/fs/copy_options>) presente em `options` (mesmo no grupo `copy_file`, que não é relevante para `copy`).

O comportamento é o seguinte:

*   Primeiro, antes de fazer qualquer outra coisa, obtém o tipo e as permissões de `from` por não mais do que uma única chamada a [`status`](<#/doc/experimental/fs/status>) (ou, se `copy_options::skip_symlinks` ou `copy_options::create_symlinks` estiverem presentes em `options`, por uma chamada a `symlink_status`).
*   Se necessário, obtém o status de `to` da mesma forma, por não mais do que uma única chamada a `status` ou `symlink_status`.
*   Se `from` não existir, reporta um erro.
*   Se `from` e `to` forem o mesmo arquivo, conforme determinado por [`equivalent()`](<#/doc/experimental/fs/equivalent>), reporta um erro.
*   Se `from` ou `to` não for um arquivo regular, um diretório ou um symlink, conforme determinado por [`is_other`](<#/doc/experimental/fs/is_other>), reporta um erro.
*   Se `from` for um diretório, mas `to` for um arquivo regular, reporta um erro.
*   Se `from` for um link simbólico, então

    *   Se `copy_options::skip_symlink` estiver presente em `options`, não faz nada.
    *   Caso contrário, se `to` não existir e `copy_options::copy_symlinks` estiver presente em `options`, então se comporta como se `copy_symlink(from, to)` fosse chamado.
    *   Caso contrário, reporta um erro.

*   Caso contrário, se `from` for um arquivo regular, então

    *   Se `copy_options::directories_only` estiver presente em `options`, não faz nada.
    *   Caso contrário, se `copy_options::create_symlinks` estiver presente em `options`, cria um symlink para `to`. Nota: `from` deve ser um caminho absoluto, a menos que `to` esteja no diretório atual.
    *   Caso contrário, se `copy_options::create_hard_links` estiver presente em `options`, cria um hard link para `to`.
    *   Caso contrário, se `to` for um diretório, então se comporta como se `copy_file(from, to/from.filename(), options)` fosse chamado (cria uma cópia de `from` como um arquivo no diretório `to`).
    *   Caso contrário, se comporta como se `copy_file(from, to, options)` fosse chamado (copia o arquivo).

*   Caso contrário, se `from` for um diretório e `options` tiver `copy_options::recursive` ou for `copy_options::none`.

    *   Se `to` não existir, primeiro executa `create_directory(to, from)` (cria o novo diretório com uma cópia dos atributos do diretório antigo).
    *   Então, quer `to` já existisse ou tenha acabado de ser criado, itera sobre os arquivos contidos em `from` como se por `for (const directory_entry& x : directory_iterator(from))` e para cada entrada de diretório, chama recursivamente `copy(x.path(), to/x.path().filename(), options | unspecified)`, onde _unspecified_ é um bit especial que não tem outro efeito quando definido em `options` (o único propósito de definir este bit é prevenir a cópia recursiva de subdiretórios se `options` for `copy_options::none`).

*   Caso contrário, não faz nada.

### Parâmetros

- **from** — caminho para o arquivo, diretório ou symlink de origem
- **to** — caminho para o arquivo, diretório ou symlink de destino
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente, construída com `from` como o primeiro argumento, `to` como o segundo argumento, e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

`noexcept`

### Notas

O comportamento padrão ao copiar diretórios é a cópia não recursiva: os arquivos são copiados, mas não os subdiretórios:
```cpp
    // Dado
    // /dir1 contém /dir1/file1, /dir1/file2, /dir1/dir2
    // e /dir1/dir2 contém /dir1/dir2/file3
    // Depois
    std::experimental::filesystem::copy("/dir1", "/dir3");
    // /dir3 é criado (com os atributos de /dir1)
    // /dir1/file1 é copiado para /dir3/file1
    // /dir1/file2 é copiado para /dir3/file2
```

Enquanto com `copy_options::recursive`, os subdiretórios também são copiados, com seu conteúdo, recursivamente.
```cpp
    // ...mas depois
    std::experimental::filesystem::copy("/dir1", "/dir3", copy_options::recursive);
    // /dir3 é criado (com os atributos de /dir1)
    // /dir1/file1 é copiado para /dir3/file1
    // /dir1/file2 é copiado para /dir3/file2
    // /dir3/dir2 é criado (com os atributos de /dir1/dir2)
    // /dir1/dir2/file3 é copiado para /dir3/dir2/file3
```

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/dir/subdir");
        std::ofstream("sandbox/file1.txt").put('a');
        fs::copy("sandbox/file1.txt", "sandbox/file2.txt"); // copia arquivo
        fs::copy("sandbox/dir", "sandbox/dir2"); // copia diretório (não recursivo)
        // sandbox contém 2 arquivos e 2 diretórios, um dos quais tem um subdiretório
        // sandbox/file1.txt
        // sandbox/file2.txt
        // sandbox/dir2
        // sandbox/dir
        //    sandbox/dir/subdir
        fs::copy("sandbox", "sandbox/copy", fs::copy_options::recursive);
        // sandbox/copy contém cópias dos arquivos e subdiretórios acima
        fs::remove_all("sandbox");
    }
```

### Veja também

[ copy_options](<#/doc/experimental/fs/copy_options>) | especifica a semântica das operações de cópia
(enum)
[ copy_symlink](<#/doc/experimental/fs/copy_symlink>) | copia um link simbólico
(function)
[ copy_file](<#/doc/experimental/fs/copy_file>) | copia o conteúdo de um arquivo
(function)