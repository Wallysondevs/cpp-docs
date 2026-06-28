# std::filesystem::filesystem_error::path1, std::filesystem::filesystem_error::path2

```cpp
const std::filesystem::path& path1() const noexcept;  // (desde C++17)
const std::filesystem::path& path2() const noexcept;  // (desde C++17)
```

  
Retorna os paths que foram armazenados no objeto de exceção.

### Parâmetros

(nenhum)

### Valor de retorno

Referências para a cópia dos parâmetros `path` armazenados pelo construtor.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <filesystem>
    #include <iostream>
    
    int main()
    {
        const std::filesystem::path old_p{std::tmpnam(nullptr)},
                                    new_p{std::tmpnam(nullptr)};
        try {
            std::filesystem::rename(old_p, new_p); // lança uma exceção pois old_p não existe
        }
        catch(std::filesystem::filesystem_error const& ex) {
            std::cout
                << "what():  " << ex.what() << '\n'
                << "path1(): " << ex.path1() << '\n'
                << "path2(): " << ex.path2() << '\n';
        }
    }
```

Saída possível:
```
    what():  filesystem error: cannot rename: No such file or directory [/tmp/fileIzzRLB] [/tmp/fileiUDWlV]
    path1(): "/tmp/fileIzzRLB"
    path2(): "/tmp/fileiUDWlV"
```