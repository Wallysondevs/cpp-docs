# std::experimental::filesystem::path::root_directory

path root_directory() const; | | (filesystem TS)

Retorna o diretório raiz do path. Se o path não incluir um nome raiz, retorna path().

### Parâmetros

(nenhum)

### Valor de retorno

O diretório raiz do path.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = fs::current_path();
    
        std::cout << "The current path " << p << " decomposes into:\n"
                  << "root name " << p.root_name() << '\n'
                  << "root directory " << p.root_directory() << '\n'
                  << "relative path " << p.relative_path() << '\n';
    }
```

Saída possível:
```
    The current path "C:\Users\abcdef\Local Settings\temp" decomposes into:
    root name "C:"
    root directory "\"
    relative path "Users\abcdef\Local Settings\temp"
```

### Veja também

[ root_name](<#/doc/experimental/fs/path/root_name>) | retorna o nome raiz do path, se presente
(função membro pública)
[ root_path](<#/doc/experimental/fs/path/root_path>) | retorna o path raiz do path, se presente
(função membro pública)