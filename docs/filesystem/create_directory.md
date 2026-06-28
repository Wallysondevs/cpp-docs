# std::filesystem::create_directory, std::filesystem::create_directories

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool create_directory( const std::filesystem::path& p );
bool create_directory( const std::filesystem::path& p, std::error_code& ec ) noexcept;
bool create_directory( const std::filesystem::path& p,
const std::filesystem::path& existing_p );
bool create_directory( const std::filesystem::path& p,
const std::filesystem::path& existing_p,
std::error_code& ec ) noexcept;
bool create_directories( const std::filesystem::path& p );
bool create_directories( const std::filesystem::path& p, std::error_code& ec );
```

1,2) Cria o diretório p como se fosse por POSIX [`mkdir()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html>) com um segundo argumento de static_cast&lt;int&gt;([std::filesystem::perms::all](<#/doc/filesystem/perms>)) (o diretório pai já deve existir). Se a função falhar porque p resolve para um diretório existente, nenhum erro é reportado. Caso contrário, em caso de falha, um erro é reportado.

3,4) O mesmo que (1,2), exceto que os atributos do novo diretório são copiados de existing_p (que deve ser um diretório existente). É dependente do sistema operacional quais atributos são copiados: em sistemas POSIX, os atributos são copiados como se fosse por
```cpp
    stat(existing_p.c_str(), &attributes_stat)
    mkdir(p.c_str(), attributes_stat.st_mode)
```

No sistema operacional Windows, nenhum atributo de existing_p é copiado.

5,6) Executa (1,2) para cada elemento de p que ainda não existe. Se p já existe, a função não faz nada (esta condição não é tratada como um erro).

### Parâmetros

- **p** — o caminho para o novo diretório a ser criado
- **existing_p** — o caminho para um diretório de onde copiar os atributos
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

true se um diretório foi recém-criado para o diretório para o qual p resolve, false caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,5) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento do código de erro.

2,6) Define um parâmetro `std::error_code`& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho, existing_p como o segundo argumento de caminho, e o código de erro do SO como o argumento do código de erro.

4) Define um parâmetro `std::error_code`& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

A sobrecarga que preserva atributos (3,4) é implicitamente invocada por [`copy()`](<#/doc/filesystem/copy>) ao copiar diretórios recursivamente. Seu equivalente em boost.filesystem é [`copy_directory`](<https://www.boost.org/doc/libs/1_57_0/libs/filesystem/doc/reference.html#copy_directory>) (com a ordem dos argumentos invertida).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstdlib>
    #include <filesystem>
    
    int main()
    {
        std::filesystem::current_path(std::filesystem::temp_directory_path());
    
        // Basic usage
        std::filesystem::create_directories("sandbox/1/2/a");
        std::filesystem::create_directory("sandbox/1/2/b");
    
        // Directory already exists (false returned, no error)
        assert(!std::filesystem::create_directory("sandbox/1/2/b"));
    
        // Permissions copying usage
        std::filesystem::permissions(
            "sandbox/1/2/b",
            std::filesystem::perms::others_all,
            std::filesystem::perm_options::remove
        );
        std::filesystem::create_directory("sandbox/1/2/c", "sandbox/1/2/b");
    
        std::system("ls -l sandbox/1/2");
        std::system("tree sandbox");
        std::filesystem::remove_all("sandbox");
    }
```

Saída possível:
```
    drwxr-xr-x 2 user group 4096 Apr 15 09:33 a
    drwxr-x--- 2 user group 4096 Apr 15 09:33 b
    drwxr-x--- 2 user group 4096 Apr 15 09:33 c
    sandbox
    └── 1
        └── 2
            ├── a
            ├── b
            └── c
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2935](<https://cplusplus.github.io/LWG/issue2935>) | C++17 | erro se o destino já existe mas não é um diretório | não é erro
[LWG 3014](<https://cplusplus.github.io/LWG/issue3014>) | C++17 | sobrecarga de `error_code` de `create_directories` marcada como noexcept mas pode alocar memória | noexcept removido
[P1164R1](<https://wg21.link/P1164R1>) | C++17 | falha na criação causada por um arquivo não-diretório existente não é um erro | tornou-se erro

### Veja também

[ create_symlinkcreate_directory_symlink](<#/doc/filesystem/create_symlink>)(C++17)(C++17) | cria um link simbólico
(função)
[ copy](<#/doc/filesystem/copy>)(C++17) | copia arquivos ou diretórios
(função)
[ perms](<#/doc/filesystem/perms>)(C++17) | identifica permissões do sistema de arquivos
(enum)