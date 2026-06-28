# std::filesystem::copy_file

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool copy_file( const std::filesystem::path& from,
const std::filesystem::path& to );
bool copy_file( const std::filesystem::path& from,
const std::filesystem::path& to,
std::error_code& ec );
bool copy_file( const std::filesystem::path& from,
const std::filesystem::path& to,
std::filesystem::copy_options options );
bool copy_file( const std::filesystem::path& from,
const std::filesystem::path& to,
std::filesystem::copy_options options,
std::error_code& ec );
```

1,2) O padrão, equivalente a (3,4) com `copy_options::none` usado como opções.

3,4) Copia um único arquivo de from para to, usando as opções de cópia indicadas por options. O comportamento é indefinido se houver mais de uma opção em qualquer um dos grupos de opções de [copy_options](<#/doc/filesystem/copy_options>) presente em options (mesmo nos grupos não relevantes para **filesystem::copy_file**).

  * Se [!filesystem::is_regular_file(from)](<#/doc/filesystem/is_regular_file>) (seja porque o arquivo de origem não existe ou porque não é um arquivo regular), reporta um erro.
  * Caso contrário, se o arquivo de destino não existir,

  * copia o conteúdo e os atributos do arquivo para o qual from se resolve para o arquivo para o qual to se resolve (symlinks são seguidos).

  * Caso contrário, se o arquivo de destino já existir,

  * reporta um erro se qualquer um dos seguintes for verdadeiro:

  * to e from são os mesmos, conforme determinado por [filesystem::equivalent(from, to)](<#/doc/filesystem/equivalent>);
  * to não é um arquivo regular, conforme determinado por [!filesystem::is_regular_file(to)](<#/doc/filesystem/is_regular_file>);
  * nenhuma das opções de controle de **filesystem::copy_file** está definida em options.

  * Caso contrário, se `copy_options::skip_existing` estiver definido em options, não faz nada.
  * Caso contrário, se `copy_options::overwrite_existing` estiver definido em options, copia o conteúdo e os atributos do arquivo para o qual from se resolve para o arquivo para o qual to se resolve.
  * Caso contrário, se `copy_options::update_existing` estiver definido em options, copia o arquivo apenas se from for mais recente que to, conforme definido por [filesystem::last_write_time()](<#/doc/filesystem/last_write_time>).

As sobrecargas que não lançam exceções retornam false se ocorrer um erro.

### Parâmetros

- **from** — caminho para o arquivo de origem
- **to** — caminho para o arquivo de destino
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

true se o arquivo foi copiado, false caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com from como o primeiro argumento de caminho, to como o segundo argumento de caminho, e o código de erro do SO como o argumento de código de erro.

2,4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Observações

As funções envolvem no máximo uma chamada direta ou indireta para [filesystem::status(to)](<#/doc/filesystem/status>) (usada tanto para determinar se o arquivo existe quanto, para a opção `filesystem::copy_options::update_existing`, seu tempo da última gravação).

Um erro é reportado quando **filesystem::copy_file** é usado para copiar um diretório: use [filesystem::copy](<#/doc/filesystem/copy>) para isso.

**filesystem::copy_file** segue symlinks: use [filesystem::copy_symlink](<#/doc/filesystem/copy_symlink>) ou [filesystem::copy](<#/doc/filesystem/copy>) com `filesystem::copy_options::copy_symlinks` para isso.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::create_directory("sandbox");
        std::ofstream("sandbox/file1.txt").put('a');
    
        fs::copy_file("sandbox/file1.txt", "sandbox/file2.txt");
    
        // now there are two files in sandbox:
        std::cout << "file1.txt holds: "
                  << std::ifstream("sandbox/file1.txt").rdbuf() << '\n';
        std::cout << "file2.txt holds: "
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
    file1.txt holds: a
    file2.txt holds: a
    Could not copy sandbox/abc: copy_file: Is a directory: "sandbox/abc", "sandbox/def"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3014](<https://cplusplus.github.io/LWG/issue3014>) | C++17 | Sobrecarga de `error_code` marcada como noexcept, mas pode alocar memória | noexcept removido

### Veja também

[ copy_options](<#/doc/filesystem/copy_options>)(C++17) | especifica a semântica das operações de cópia
(enum)
[ copy_symlink](<#/doc/filesystem/copy_symlink>)(C++17) | copia um link simbólico
(function)
[ copy](<#/doc/filesystem/copy>)(C++17) | copia arquivos ou diretórios
(function)