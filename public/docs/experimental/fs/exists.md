# std::experimental::filesystem::exists

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool exists( file_status s )
bool exists( const path& p );
bool exists( const path& p, error_code& ec )
```

Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo ou diretório existente.

1) Equivalente a `status_known(s) && s.type() != file_type::not_found`.

2) Equivalente a `exists(status(p))` ou `exists(status(p, ec))` (symlinks são seguidos). A sobrecarga que não lança exceções retorna `false` se ocorrer um erro.

### Parâmetros

- **s** — status de arquivo a verificar
- **p** — caminho a examinar
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

`true` se o caminho ou status de arquivo fornecido corresponder a um arquivo ou diretório existente, `false` caso contrário.

### Exceções

1)

especificação `noexcept`:

`noexcept`

2) A sobrecarga que não recebe um parâmetro `error_code&` lança [`filesystem_error`](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com `p` como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [`std::bad_alloc`](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do SO se uma chamada à API do SO falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

especificação `noexcept`:

`noexcept`

### Observações

As informações fornecidas por esta função geralmente também são fornecidas como um subproduto da iteração de diretório. Durante a iteração de diretório, chamar `exists(*iterator)` é menos eficiente do que `exists(iterator->status())`.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    void demo_exists(const fs::path& p, fs::file_status s = fs::file_status{})
    {
        std::cout << p;
        if (fs::status_known(s) ? fs::exists(s) : fs::exists(p))
            std::cout << " exists\n";
        else
            std::cout << " does not exist\n";
    }
    
    int main()
    {
        fs::create_directory("sandbox");
        std::ofstream("sandbox/file"); // create regular file
        fs::create_symlink("non-existing", "sandbox/symlink");
    
        demo_exists("sandbox");
        for (auto it = fs::directory_iterator("sandbox"); it != fs::directory_iterator(); ++it)
            demo_exists(*it, it->status()); // use cached status from directory entry
        fs::remove_all("sandbox");
    }
```

Saída:
```
    "sandbox" exists
    "sandbox/file" exists
    "sandbox/symlink" does not exist
```

### Veja também

[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ file_status](<#/doc/experimental/fs/file_status>) | representa tipo e permissões de arquivo
(classe)
[ statussymlink_status](<#/doc/experimental/fs/directory_entry/status>) | status em cache do arquivo designado por esta entrada de diretório
symlink_status em cache do arquivo designado por esta entrada de diretório
(função membro pública de `std::experimental::filesystem::directory_entry`)