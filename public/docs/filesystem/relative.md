# std::filesystem::relative, std::filesystem::proximate

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
path relative( const std::filesystem::path& p,
std::error_code& ec );
path relative( const std::filesystem::path& p,
const std::filesystem::path& base = std::filesystem::current_path() );
path relative( const std::filesystem::path& p,
const std::filesystem::path& base,
std::error_code& ec );
path proximate( const std::filesystem::path& p,
std::error_code& ec );
path proximate( const std::filesystem::path& p,
const std::filesystem::path& base = std::filesystem::current_path() );
path proximate( const std::filesystem::path& p,
const std::filesystem::path& base,
std::error_code& ec );
```

1) Retorna relative(p, current_path(), ec).

2,3) Retorna p tornado relativo a base. Resolve symlinks e normaliza tanto p quanto base antes de outro processamento. Efetivamente retorna [std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(p).lexically_relative([std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(base)) ou [std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(p, ec).lexically_relative([std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(base, ec)), exceto que a forma com código de erro retorna path() na primeira ocorrência de erro, se houver.

4) Retorna proximate(p, current_path(), ec).

5,6) Efetivamente retorna [std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(p).lexically_proximate([std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(base)) ou [std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(p, ec).lexically_proximate([std::filesystem::weakly_canonical](<#/doc/filesystem/canonical>)(base, ec)), exceto que a forma com código de erro retorna path() na primeira ocorrência de erro, se houver.

### Parâmetros

- **p** — um path existente
- **base** — path base, em relação ao qual p será tornado relativo/próximo
- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

1) p tornado relativo a current_path().

2,3) p tornado relativo a base.

4) p tornado próximo a current_path().

5,6) p tornado próximo a base.

### Exceções

Qualquer sobrecarga não marcada `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

2,5) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construído com p como o primeiro argumento path, base como o segundo argumento path, e o código de erro do sistema operacional como o argumento do código de erro.

1,3,4,6) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    
    void show(std::filesystem::path x, std::filesystem::path y)
    {
        std::cout << "x:\t\t " << x << "\ny:\t\t " << y << '\n'
                  << "relative(x, y):  "
                  << std::filesystem::relative(x, y) << '\n'
                  << "proximate(x, y): "
                  << std::filesystem::proximate(x, y) << "\n\n";
    }
    
    int main()
    {
        show("/a/b/c", "/a/b");
        show("/a/c", "/a/b");
        show("c", "/a/b");
        show("/a/b", "c");
    }
```

Saída possível:
```
    x:               "/a/b/c"
    y:               "/a/b"
    relative(x, y):  "c"
    proximate(x, y): "c"
    
    x:               "/a/c"
    y:               "/a/b"
    relative(x, y):  "../c"
    proximate(x, y): "../c"
    
    x:               "c"
    y:               "/a/b"
    relative(x, y):  ""
    proximate(x, y): "c"
    
    x:               "/a/b"
    y:               "c"
    relative(x, y):  ""
    proximate(x, y): "/a/b"
```

### Veja também

[ path](<#/doc/filesystem/path>)(C++17) | representa um path
(classe)
[ absolute](<#/doc/filesystem/absolute>)(C++17) | compõe um path absoluto
(função)
[ canonicalweakly_canonical](<#/doc/filesystem/canonical>)(C++17) | compõe um path canônico
(função)
[ lexically_normallexically_relativelexically_proximate](<#/doc/filesystem/path/lexically_normal>) | converte path para forma normal
converte path para forma relativa
converte path para forma próxima
(função membro pública de `std::filesystem::path`)