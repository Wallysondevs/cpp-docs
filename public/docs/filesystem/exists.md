# std::filesystem::exists

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool exists( std::filesystem::file_status s ) noexcept;
bool exists( const std::filesystem::path& p );
bool exists( const std::filesystem::path& p, std::error_code& ec ) noexcept;
```

Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo ou diretório existente.

1) Equivalente a status_known(s) && s.type() != file_type::not_found.

2,3) Seja s um [std::filesystem::file_status](<#/doc/filesystem/file_status>) determinado como se por status(p) ou status(p, ec) (symlinks são seguidos), respectivamente. Retorna exists(s). A sobrecarga que não lança exceção chama ec.clear() se status_known(s).

### Parâmetros

- **s** — status de arquivo a verificar
- **p** — caminho a examinar
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceção

### Valor de retorno

true se o caminho ou status de arquivo fornecido corresponde a um arquivo ou diretório existente, false caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

2) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

3) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

Nenhuma exceção de filesystem é lançada se o objeto não existir (use o valor de retorno).

### Observações

As informações fornecidas por esta função geralmente também são fornecidas como um subproduto da iteração de diretório. Durante a iteração de diretório, chamar exists(*iterator) é menos eficiente do que exists(iterator->status()).

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
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
        const fs::path sandbox{"sandbox"};
        fs::create_directory(sandbox);
        std::ofstream{sandbox/"file"}; // create regular file
        fs::create_symlink("non-existing", sandbox/"symlink");
    
        demo_exists(sandbox);
    
        for (const auto& entry : fs::directory_iterator(sandbox))
            demo_exists(entry, entry.status()); // use cached status from directory entry
    
        fs::remove_all(sandbox);
    }
```

Saída:
```
    "sandbox" exists
    "sandbox/symlink" does not exist
    "sandbox/file" exists
```

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ file_status](<#/doc/filesystem/file_status>)(C++17) | representa tipo de arquivo e permissões
(classe)
[ exists](<#/doc/filesystem/directory_entry/exists>) | verifica se a entrada de diretório se refere a um objeto do sistema de arquivos existente
(função membro pública de `std::filesystem::directory_entry`)