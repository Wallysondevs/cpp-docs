# std::filesystem::create_symlink, std::filesystem::create_directory_symlink

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void create_symlink( const std::filesystem::path& target,
const std::filesystem::path& link );
void create_symlink( const std::filesystem::path& target,
const std::filesystem::path& link,
std::error_code& ec ) noexcept;
void create_directory_symlink( const std::filesystem::path& target,
const std::filesystem::path& link );
void create_directory_symlink( const std::filesystem::path& target,
const std::filesystem::path& link,
std::error_code& ec ) noexcept;
```

Cria um link simbólico `link` com seu destino definido como `target` como se por POSIX [`symlink()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html>): o caminho `target` pode ser inválido ou inexistente.

Alguns sistemas operacionais exigem que a criação de symlink identifique que o link é para um diretório. O código portátil deve usar (3,4) para criar symlinks de diretório em vez de (1,2), mesmo que não haja distinção em sistemas POSIX.

### Parâmetros

- **target** — caminho para o qual o symlink aponta, não precisa existir
- **link** — caminho do novo link simbólico
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com `target` como o primeiro argumento de caminho, `link` como o segundo argumento de caminho, e o código de erro do SO como o argumento de código de erro.

2,4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

Alguns sistemas operacionais não suportam links simbólicos de forma alguma ou os suportam apenas para arquivos regulares.

Alguns sistemas de arquivos não suportam links simbólicos independentemente do sistema operacional, por exemplo, o sistema FAT usado em alguns cartões de memória e pen drives.

Assim como um hard link, um link simbólico permite que um arquivo tenha múltiplos nomes lógicos. A presença de um hard link garante a existência de um arquivo, mesmo depois que o nome original foi removido. Um link simbólico não oferece tal garantia; de fato, o arquivo nomeado pelo argumento `target` não precisa existir quando o link é criado. Um link simbólico pode cruzar limites de sistemas de arquivos.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/subdir");
        fs::create_symlink("target", "sandbox/sym1");
        fs::create_directory_symlink("subdir", "sandbox/sym2");
    
        for (auto it = fs::directory_iterator("sandbox"); it != fs::directory_iterator(); ++it)
            if (is_symlink(it->symlink_status()))
                std::cout << *it << "->" << read_symlink(*it) << '\n';
    
        assert(std::filesystem::equivalent("sandbox/sym2", "sandbox/subdir"));
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/sym1"->"target"
    "sandbox/sym2"->"subdir"
```

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o destino do symlink
(função)
[ read_symlink](<#/doc/filesystem/read_symlink>)(C++17) | obtém o destino de um link simbólico
(função)
[ create_hard_link](<#/doc/filesystem/create_hard_link>)(C++17) | cria um hard link
(função)