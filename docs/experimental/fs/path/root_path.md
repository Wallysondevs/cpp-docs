# std::experimental::filesystem::path::root_path

path root_path() const; | | (filesystem TS)

Retorna o caminho raiz do path. Se o path não incluir um caminho raiz, retorna path().

Efetivamente, retorna o seguinte: root_name() / root_directory()

### Parâmetros

(nenhum)

### Valor de retorno

O caminho raiz do path.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
     
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

[ root_name](<#/doc/experimental/fs/path/root_name>) | retorna o root-name do path, se presente
(função membro pública)
[ root_directory](<#/doc/experimental/fs/path/root_directory>) | retorna o diretório raiz do path, se presente
(função membro pública)