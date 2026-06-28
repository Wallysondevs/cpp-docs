# std::experimental::filesystem::create_symlink, std::experimental::filesystem::create_directory_symlink

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
void create_symlink( const path& target, const path& link );
void create_symlink( const path& target, const path& link, error_code& ec );
void create_directory_symlink( const path& target, const path& link );
void create_directory_symlink( const path& target, const path& link, error_code& ec );
```

Cria um link simbólico `link` com seu destino definido como `target` como se fosse por POSIX [symlink()](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html>): o caminho `target` pode ser inválido ou não existente.

Alguns sistemas operacionais exigem que a criação de symlink identifique que o link é para um diretório. Código portável deve usar (2) para criar symlinks de diretório em vez de (1), mesmo que não haja distinção em sistemas POSIX.

### Parâmetros

- **target** — caminho para o qual o symlink aponta, não precisa existir
- **link** — caminho do novo link simbólico
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente, construída com `target` como o primeiro argumento, `link` como o segundo argumento, e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

### Observações

Alguns sistemas operacionais não suportam links simbólicos de forma alguma ou os suportam apenas para arquivos regulares.

Alguns sistemas de arquivos não suportam links simbólicos independentemente do sistema operacional, por exemplo, o sistema FAT usado em alguns cartões de memória e pen drives.

Assim como um hard link, um link simbólico permite que um arquivo tenha múltiplos nomes lógicos. A presença de um hard link garante a existência de um arquivo, mesmo depois que o nome original tenha sido removido. Um link simbólico não oferece tal garantia; na verdade, o arquivo nomeado pelo argumento `target` não precisa existir quando o link é criado. Um link simbólico pode cruzar limites de sistemas de arquivos.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/subdir");
        fs::create_symlink("target", "sandbox/sym1");
        fs::create_directory_symlink("subdir", "sandbox/sym2");
    
        for (auto it = fs::directory_iterator("sandbox"); it != fs::directory_iterator(); ++it)
            if (is_symlink(it->symlink_status()))
                std::cout << *it << "->" << read_symlink(*it) << '\n';
    
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/sym1"->"target"
    "sandbox/sym2"->"subdir"
```

### Veja também

[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o destino do symlink
(função)
[ read_symlink](<#/doc/experimental/fs/read_symlink>) | obtém o destino de um link simbólico
(função)
[ create_hard_link](<#/doc/experimental/fs/create_hard_link>) | cria um hard link
(função)