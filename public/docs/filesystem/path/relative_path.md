# std::filesystem::path::relative_path

path relative_path() const; | | (desde C++17)

Retorna o caminho relativo ao root-path, isto é, um nome de caminho composto por cada componente de formato genérico de *this após o root-path. Se *this for um caminho vazio, retorna um caminho vazio.

### Parâmetros

(nenhum)

### Valor de retorno

Caminho relativo ao [root path](<#/doc/filesystem/path/root_path>).

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
                  << "root-path " << p.root_path() << '\n'
                  << "relative path " << p.relative_path() << '\n';
    }
```

Saída possível:
```
    The current path "C:\Users\abcdef\Local Settings\temp" decomposes into:
    root-path "C:\"
    relative path "Users\abcdef\Local Settings\temp"
```

### Veja também

[ root_name](<#/doc/filesystem/path/root_name>) | retorna o root-name do caminho, se presente
(função membro pública)
[ root_directory](<#/doc/filesystem/path/root_directory>) | retorna o diretório raiz do caminho, se presente
(função membro pública)
[ root_path](<#/doc/filesystem/path/root_path>) | retorna o root path do caminho, se presente
(função membro pública)