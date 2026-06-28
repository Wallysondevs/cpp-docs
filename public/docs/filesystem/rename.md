# std::filesystem::rename

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void rename( const std::filesystem::path& old_p,
const std::filesystem::path& new_p );
void rename( const std::filesystem::path& old_p,
const std::filesystem::path& new_p,
std::error_code& ec ) noexcept;
```

Move ou renomeia o objeto do sistema de arquivos identificado por old_p para new_p como se fosse pela função POSIX [`rename`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html>):

  * Se old_p for um arquivo que não é um diretório, então new_p deve ser um dos seguintes:

    * o mesmo arquivo que old_p ou um link físico para ele: nada é feito neste caso.
    * arquivo existente que não é um diretório: new_p é primeiro excluído, então, sem permitir que outros processos observem new_p como excluído, o caminho new_p é vinculado ao arquivo e old_p é desvinculado do arquivo. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.
    * arquivo não existente em um diretório existente: O caminho new_p é vinculado ao arquivo e old_p é desvinculado do arquivo. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.

  * Se old_p for um diretório, então new_p deve ser um dos seguintes:

    * o mesmo diretório que old_p ou um link físico para ele: nada é feito neste caso.
    * diretório existente: new_p é excluído se estiver vazio em sistemas POSIX, mas isso pode ser um erro em outros sistemas. Se não for um erro, então new_p é primeiro excluído, então, sem permitir que outros processos observem new_p como excluído, o caminho new_p é vinculado ao diretório e old_p é desvinculado do diretório. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.
    * diretório não existente, que não termina com um separador de diretório, e cujo diretório pai existe: O caminho new_p é vinculado ao diretório e old_p é desvinculado do diretório. Permissões de escrita são necessárias tanto para o diretório que contém old_p quanto para o diretório que contém new_p.

  * Links simbólicos não são seguidos: se old_p for um link simbólico, ele mesmo é renomeado, não seu alvo. Se new_p for um link simbólico existente, ele mesmo é apagado, não seu alvo.

A renomeação falha se

  * new_p terminar com ponto ou com ponto-ponto.
  * new_p nomear um diretório não existente que termina com um separador de diretório.
  * old_p for um diretório que é um ancestral de new_p.

### Parâmetros

- **old_p** — caminho a ser movido ou renomeado
- **new_p** — caminho de destino para a operação de mover/renomear
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construída com old_p como o primeiro argumento de caminho, new_p como o segundo argumento de caminho, e o código de erro do sistema operacional como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    namespace fs = std::filesystem;
    
    int main()
    {
        std::filesystem::path p = std::filesystem::current_path() / "sandbox";
        std::filesystem::create_directories(p / "from");
        std::ofstream{ p / "from/file1.txt" }.put('a');
        std::filesystem::create_directory(p / "to");
    
    //  fs::rename(p / "from/file1.txt", p / "to/"); // error: "to" is a directory
        fs::rename(p / "from/file1.txt", p / "to/file2.txt"); // OK
    //  fs::rename(p / "from", p / "to"); // error: "to" is not empty
        fs::rename(p / "from", p / "to/subdir"); // OK
    
        std::filesystem::remove_all(p);
    }
```

### Ver também

[ rename](<#/doc/io/c/rename>) | renomeia um arquivo
(função)
[ removeremove_all](<#/doc/filesystem/remove>)(C++17)(C++17) | remove um arquivo ou diretório vazio
remove um arquivo ou diretório e todo o seu conteúdo, recursivamente
(função)