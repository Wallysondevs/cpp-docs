# std::filesystem::path::root_path

path root_path() const; | | (desde C++17)

Retorna o caminho raiz do path. Se o path não incluir um caminho raiz, retorna path().

Efetivamente retorna root_name() / root_directory().

### Parâmetros

(nenhum)

### Valor de retorno

O caminho raiz do path.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        std::cout << "Current root path is: " << fs::current_path().root_path() << '\n';
    }
```

Saída possível:
```
    Current root path is: "C:\"
```

### Veja também

[ root_name](<#/doc/filesystem/path/root_name>) | retorna o root-name do path, se presente
(função membro pública)
[ root_directory](<#/doc/filesystem/path/root_directory>) | retorna o diretório raiz do path, se presente
(função membro pública)