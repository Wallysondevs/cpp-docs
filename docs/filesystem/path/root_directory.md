# std::filesystem::path::root_directory

path root_directory() const; | | (desde C++17)

Retorna o diretório raiz do path em formato genérico. Se o path (em formato genérico) não incluir um diretório raiz, retorna path().

### Parâmetros

(nenhum)

### Valor de retorno

O diretório raiz do path.

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

[ root_name](<#/doc/filesystem/path/root_name>) | retorna o root-name do path, se presente
(função membro pública)
[ root_path](<#/doc/filesystem/path/root_path>) | retorna o root path do path, se presente
(função membro pública)