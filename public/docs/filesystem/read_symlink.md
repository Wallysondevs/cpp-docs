# std::filesystem::read_symlink

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
std::filesystem::path read_symlink( const std::filesystem::path& p );  // (1) (desde C++17)
std::filesystem::path read_symlink( const std::filesystem::path& p,
std::error_code& ec );  // (2) (desde C++17)
```

Se o path p se refere a um link simbólico, retorna um novo objeto path que se refere ao alvo desse link simbólico.

É um erro se p não se refere a um link simbólico.

A sobrecarga que não lança exceções retorna um path vazio em caso de erros.

### Parâmetros

- **p** — path para um symlink
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

O alvo do symlink (que pode não necessariamente existir).

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do SO subjacente, construída com p como o primeiro argumento path e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
     
    namespace fs = std::filesystem;
     
    int main()
    {
        for (fs::path p : {"/usr/bin/gcc", "/bin/cat", "/bin/mouse"})
        {
            std::cout << p;
            fs::exists(p) ?
                fs::is_symlink(p) ?
                    std::cout << " -> " << fs::read_symlink(p) << '\n' :
                    std::cout << " exists but it is not a symlink\n" :
                std::cout << " does not exist\n";
        }
    }
```

Saída possível:
```
    "/usr/bin/gcc" -> "gcc-5"
    "/bin/cat" exists but it is not a symlink
    "/bin/mouse" does not exist
```

### Veja também

[ is_symlink](<#/doc/filesystem/is_symlink>)(C++17) | verifica se o argumento se refere a um link simbólico
(função)
[ create_symlinkcreate_directory_symlink](<#/doc/filesystem/create_symlink>)(C++17)(C++17) | cria um link simbólico
(função)
[ copy_symlink](<#/doc/filesystem/copy_symlink>)(C++17) | copia um link simbólico
(função)
[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)