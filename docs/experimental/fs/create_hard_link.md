# std::experimental::filesystem::create_hard_link

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
void create_hard_link( const path& target, const path& link );
void create_hard_link( const path& target, const path& link, error_code& ec );
```

Cria um hard link `link` com seu destino definido como `target`, como se fosse pela função POSIX [link()](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html>): o caminho `target` deve existir.

Uma vez criado, `link` e `target` são dois nomes lógicos que se referem ao mesmo arquivo (eles são [`equivalent`](<#/doc/experimental/fs/equivalent>)). Mesmo que o nome original `target` seja excluído, o arquivo continua a existir e é acessível como `link`.

### Parâmetros

- **target** — caminho do arquivo ou diretório para o qual o link será criado
- **link** — caminho do novo hard link
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com `target` como o primeiro argumento, `link` como o segundo argumento, e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do SO se uma chamada de API do SO falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

### Observações

Alguns sistemas operacionais não suportam hard links de forma alguma ou os suportam apenas para arquivos regulares.

Alguns sistemas de arquivos não suportam hard links independentemente do sistema operacional: o sistema de arquivos FAT usado em cartões de memória e pen drives, por exemplo.

Alguns sistemas de arquivos limitam o número de links por arquivo.

A criação de hard links para diretórios é tipicamente restrita ao superusuário.

Hard links tipicamente não podem cruzar limites de sistemas de arquivos.

O caminho especial ponto (".") é um hard link para seu diretório pai. O caminho especial ponto-ponto ("..") é um hard link para o diretório que é o pai de seu pai.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/subdir");
        std::ofstream("sandbox/a").put('a'); // create regular file
        fs::create_hard_link("sandbox/a", "sandbox/b");
        fs::remove("sandbox/a");
        // read from the original file via surviving hard link
        char c = std::ifstream("sandbox/b").get();
        std::cout << c << '\n';
        fs::remove_all("sandbox");
    }
```

Saída:
```
    a
```

### Veja também

[ create_symlinkcreate_directory_symlink](<#/doc/experimental/fs/create_symlink>) | cria um link simbólico
(função)
[ hard_link_count](<#/doc/experimental/fs/hard_link_count>) | retorna o número de hard links que se referem ao arquivo específico
(função)