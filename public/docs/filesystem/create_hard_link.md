# std::filesystem::create_hard_link

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void create_hard_link( const std::filesystem::path& target,
const std::filesystem::path& link );
void create_hard_link( const std::filesystem::path& target,
const std::filesystem::path& link,
std::error_code& ec ) noexcept;
```

Cria um hard link link com seu destino definido como target como se fosse por POSIX [`link()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html>): o pathname target deve existir.

Uma vez criados, link e target são dois nomes lógicos que se referem ao mesmo arquivo (eles são [`equivalentes`](<#/doc/filesystem/equivalent>)). Mesmo que o nome original target seja excluído, o arquivo continua a existir e é acessível como link.

### Parâmetros

- **target** — caminho do arquivo ou diretório para o qual criar o link
- **link** — caminho do novo hard link
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com target como o primeiro argumento de caminho, link como o segundo argumento de caminho e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

Alguns sistemas operacionais não suportam hard links de forma alguma ou os suportam apenas para arquivos regulares.

Alguns sistemas de arquivos não suportam hard links independentemente do sistema operacional: o sistema de arquivos FAT usado em cartões de memória e pen drives, por exemplo.

Alguns sistemas de arquivos limitam o número de links por arquivo.

A criação de hard links para diretórios é tipicamente restrita ao superusuário.

Hard links tipicamente não podem cruzar limites de sistemas de arquivos.

O pathname especial ponto (".") é um hard link para seu diretório pai. O pathname especial ponto-ponto ("..") é um hard link para o diretório que é o pai de seu pai.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
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

[ create_symlinkcreate_directory_symlink](<#/doc/filesystem/create_symlink>)(C++17)(C++17) | cria um link simbólico
(função)
[ hard_link_count](<#/doc/filesystem/hard_link_count>)(C++17) | retorna o número de hard links que se referem ao arquivo específico
(função)