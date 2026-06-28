# std::filesystem::copy

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void copy( const std::filesystem::path& from,
const std::filesystem::path& to );
void copy( const std::filesystem::path& from,
const std::filesystem::path& to,
std::error_code& ec );
void copy( const std::filesystem::path& from,
const std::filesystem::path& to,
std::filesystem::copy_options options );
void copy( const std::filesystem::path& from,
const std::filesystem::path& to,
std::filesystem::copy_options options,
std::error_code& ec );
```

Copia arquivos e diretórios, com uma variedade de opções.

1,2) O padrão, equivalente a (3,4) com `copy_options::none` usado como opções.

3,4) Copia o arquivo ou diretório `from` para o arquivo ou diretório `to`, usando as opções de cópia indicadas por `options`. O comportamento é indefinido se houver mais de uma opção em qualquer um dos grupos de opções de [copy_options](<#/doc/filesystem/copy_options>) presente em `options` (mesmo no grupo `copy_file`).

O comportamento é o seguinte:

*   Primeiro, antes de fazer qualquer outra coisa, obtém o tipo e as permissões de `from` por não mais do que uma única chamada para

    *   [std::filesystem::symlink_status](<#/doc/filesystem/status>), se `copy_options::skip_symlinks`, `copy_options::copy_symlinks`, ou `copy_options::create_symlinks` estiver presente em `options`;
    *   [std::filesystem::status](<#/doc/filesystem/status>) caso contrário.

*   Se necessário, obtém o status de `to`, por não mais do que uma única chamada para

    *   [std::filesystem::symlink_status](<#/doc/filesystem/status>), se `copy_options::skip_symlinks` ou `copy_options::create_symlinks` estiver presente em `options`;
    *   [std::filesystem::status](<#/doc/filesystem/status>) caso contrário (incluindo o caso em que `copy_options::copy_symlinks` está presente em `options`).

*   Se `from` ou `to` tiver um [tipo de arquivo](<#/doc/filesystem/file_type>) definido pela implementação, os efeitos desta função são definidos pela implementação.
*   Se `from` não existir, reporta um erro.
*   Se `from` e `to` forem o mesmo arquivo, conforme determinado por [std::filesystem::equivalent](<#/doc/filesystem/equivalent>), reporta um erro.
*   Se `from` ou `to` não for um arquivo regular, um diretório ou um symlink, conforme determinado por [std::filesystem::is_other](<#/doc/filesystem/is_other>), reporta um erro.
*   Se `from` for um diretório, mas `to` for um arquivo regular, reporta um erro.
*   Se `from` for um link simbólico, então

    *   Se `copy_options::skip_symlink` estiver presente em `options`, não faz nada.
    *   Caso contrário, se `to` não existir e `copy_options::copy_symlinks` estiver presente em `options`, então se comporta como `copy_symlink(from, to)`.
    *   Caso contrário, reporta um erro.

*   Caso contrário, se `from` for um arquivo regular, então

    *   Se `copy_options::directories_only` estiver presente em `options`, não faz nada.
    *   Caso contrário, se `copy_options::create_symlinks` estiver presente em `options`, cria um symlink para `to`. Nota: `from` deve ser um caminho absoluto, a menos que `to` esteja no diretório atual.
    *   Caso contrário, se `copy_options::create_hard_links` estiver presente em `options`, cria um hard link para `to`.
    *   Caso contrário, se `to` for um diretório, então se comporta como `copy_file(from, to/from.filename(), options)` (cria uma cópia de `from` como um arquivo no diretório `to`).
    *   Caso contrário, se comporta como `copy_file(from, to, options)` (copia o arquivo).

*   Caso contrário, se `from` for um diretório e `copy_options::create_symlinks` estiver definido em `options`, reporta um erro com um código de erro igual a [std::make_error_code](<#/doc/error/errc/make_error_code>)([std::errc::is_a_directory](<#/doc/error/errc>)).
*   Caso contrário, se `from` for um diretório e `options` tiver `copy_options::recursive` ou for `copy_options::none`,

    *   Se `to` não existir, primeiro executa `create_directory(to, from)` (cria o novo diretório com uma cópia dos atributos do diretório antigo).
    *   Então, quer `to` já existisse ou tenha acabado de ser criado, itera sobre os arquivos contidos em `from` como se por `for (const [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)& x : [std::filesystem::directory_iterator](<#/doc/filesystem/directory_iterator>)(from))` e para cada entrada de diretório, chama recursivamente `copy(x.path(), to/x.path().filename(), options | in-recursive-copy)`, onde _in-recursive-copy_ é um bit especial que não tem outro efeito quando definido em `options`. (O único propósito de definir este bit é evitar a cópia recursiva de subdiretórios se `options` for `copy_options::none`.)

*   Caso contrário, não faz nada.

### Parâmetros

- **from** — caminho para o arquivo, diretório ou symlink de origem
- **to** — caminho para o arquivo, diretório ou symlink de destino
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construída com `from` como o primeiro argumento de caminho, `to` como o segundo argumento de caminho, e o código de erro do sistema operacional como o argumento de código de erro.

2,4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa `ec.[clear](<#/doc/error/error_code/clear>)()` se nenhum erro ocorrer.

### Notas

O comportamento padrão ao copiar diretórios é a cópia não recursiva: os arquivos são copiados, mas não os subdiretórios:
```cpp
    // Dado
    // /dir1 contém /dir1/file1, /dir1/file2, /dir1/dir2
    // e /dir1/dir2 contém /dir1/dir2/file3
    // Depois
    std::filesystem::copy("/dir1", "/dir3");
    // /dir3 é criado (com os atributos de /dir1)
    // /dir1/file1 é copiado para /dir3/file1
    // /dir1/file2 é copiado para /dir3/file2
```

Enquanto com `copy_options::recursive`, os subdiretórios também são copiados, com seu conteúdo, recursivamente.
```cpp
    // ...mas depois
    std::filesystem::copy("/dir1", "/dir3", std::filesystem::copy_options::recursive);
    // /dir3 é criado (com os atributos de /dir1)
    // /dir1/file1 é copiado para /dir3/file1
    // /dir1/file2 é copiado para /dir3/file2
    // /dir3/dir2 é criado (com os atributos de /dir1/dir2)
    // /dir1/dir2/file3 é copiado para /dir3/dir2/file3
```

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/dir/subdir");
        std::ofstream("sandbox/file1.txt").put('a');
        fs::copy("sandbox/file1.txt", "sandbox/file2.txt"); // copy file
        fs::copy("sandbox/dir", "sandbox/dir2"); // copy directory (non-recursive)
        const auto copyOptions = fs::copy_options::update_existing
                               | fs::copy_options::recursive
                               | fs::copy_options::directories_only
                               ;
        fs::copy("sandbox", "sandbox_copy", copyOptions); 
        static_cast<void>(std::system("tree"));
        fs::remove_all("sandbox");
        fs::remove_all("sandbox_copy");
    }
```

Saída possível:
```
    .
    ├── sandbox
    │   ├── dir
    │   │   └── subdir
    │   ├── dir2
    │   ├── file1.txt
    │   └── file2.txt
    └── sandbox_copy
        ├── dir
        │   └── subdir
        └── dir2
    
    8 directories, 2 files
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3013](<https://cplusplus.github.io/LWG/issue3013>) | C++17 | Sobrecarga de `error_code` marcada como noexcept, mas pode alocar memória | noexcept removido
[LWG 2682](<https://cplusplus.github.io/LWG/issue2682>) | C++17 | Tentar criar um symlink para um diretório é bem-sucedido, mas não faz nada | Reporta um erro

### Veja também

[ copy_options](<#/doc/filesystem/copy_options>)(C++17) | especifica a semântica das operações de cópia
(enum)
[ copy_symlink](<#/doc/filesystem/copy_symlink>)(C++17) | copia um link simbólico
(função)
[ copy_file](<#/doc/filesystem/copy_file>)(C++17) | copia o conteúdo do arquivo
(função)
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.