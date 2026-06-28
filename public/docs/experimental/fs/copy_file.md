# std::experimental::filesystem::copy_file

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool copy_file( const path& from, const path& to );
bool copy_file( const path& from, const path& to, error_code& ec );
bool copy_file( const path& from, const path& to, copy_options options );
bool copy_file( const path& from, const path& to, copy_options options, error_code& ec );
```

1) O padrão, equivalente a (2) com `copy_options::none` usado como opções.

2) Copia um único arquivo de from para to, usando as opções de cópia indicadas por options. O comportamento é indefinido se houver mais de uma opção em qualquer um dos grupos de opções de [copy_options](<#/doc/experimental/fs/copy_options>) presente em options (mesmo nos grupos não relevantes para `copy_file`).

  * Se o arquivo de destino não existir,

    

  * copia o conteúdo e os atributos do arquivo para o qual from resolve para o arquivo para o qual to resolve (symlinks são seguidos).

  * Caso contrário, se o arquivo de destino já existir:

    

  * Se to e from forem os mesmos, conforme determinado por [`equivalent(from, to)`](<#/doc/experimental/fs/equivalent>), reporta um erro.
  * Caso contrário, se nenhuma das opções de controle de copy_file estiver definida em options, reporta um erro.
  * Caso contrário, se `copy_options::skip_existing` estiver definido em options, não faz nada.
  * Caso contrário, se `copy_options::overwrite_existing` estiver definido em options, copia o conteúdo e os atributos do arquivo para o qual from resolve para o arquivo para o qual to resolve.
  * Caso contrário, se `copy_options::update_existing` estiver definido em options, copia o arquivo apenas se from for mais recente que to, conforme definido por [`last_write_time()`](<#/doc/experimental/fs/last_write_time>).

As sobrecargas que não lançam exceções retornam false se ocorrer um erro.

### Parâmetros

- **from** — caminho para o arquivo de origem
- **to** — caminho para o arquivo de destino
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

true se o arquivo foi copiado, false caso contrário.

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente, construída com from como o primeiro argumento, to como o segundo argumento, e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Observações

As funções envolvem no máximo uma chamada direta ou indireta para [`status(to)`](<#/doc/experimental/fs/status>) (usada tanto para determinar se o arquivo existe, quanto, para a opção `copy_options::update_existing`, seu último tempo de escrita).

Um erro é reportado quando `copy_file` é usado para copiar um diretório: use [`copy`](<#/doc/experimental/fs/copy>) para isso.

`copy_file` segue symlinks: use [`copy_symlink`](<#/doc/experimental/fs/copy_symlink>) ou [`copy`](<#/doc/experimental/fs/copy>) com `copy_options::copy_symlinks` para isso.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directory("sandbox");
        std::ofstream("sandbox/file1.txt").put('a');
    
        fs::copy_file("sandbox/file1.txt", "sandbox/file2.txt");
    
        // now there are two files in sandbox:
        std::cout << "file1.txt holds : "
                  << std::ifstream("sandbox/file1.txt").rdbuf() << '\n';
        std::cout << "file2.txt holds : "
                  << std::ifstream("sandbox/file2.txt").rdbuf() << '\n';
    
        // fail to copy directory
        fs::create_directory("sandbox/abc");
        try
        {
            fs::copy_file("sandbox/abc", "sandbox/def");
        }
        catch (fs::filesystem_error& e)
        {
            std::cout << "Could not copy sandbox/abc: " << e.what() << '\n';
        }
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    file1.txt holds : a
    file2.txt holds : a
    Could not copy sandbox/abc: copy_file: Is a directory: "sandbox/abc", "sandbox/def"
```

### Veja também

[ copy_options](<#/doc/experimental/fs/copy_options>) | especifica a semântica das operações de cópia
(enum)
[ copy_symlink](<#/doc/experimental/fs/copy_symlink>) | copia um link simbólico
(função)
[ copy](<#/doc/experimental/fs/copy>) | copia arquivos ou diretórios
(função)