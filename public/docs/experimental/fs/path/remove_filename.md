# std::experimental::filesystem::path::remove_filename

path& remove_filename() | (1) | (filesystem TS)

Remove um único componente de nome de arquivo.

O comportamento é indefinido se o path não tiver um componente de nome de arquivo ([`has_filename`](<#/doc/experimental/fs/path/has_path>) retornar `false`).

### Parâmetros

(nenhum)

### Valor de retorno

*this

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
        std::cout << fs::path("/foo").remove_filename() << '\n'
                  << fs::path("/").remove_filename() << '\n';
    }
```

Saída:
```
    "/"
    ""
```

### Veja também

[ filename](<#/doc/experimental/fs/path/filename>) | retorna o componente de nome de arquivo do path
(função membro pública)
[ replace_filename](<#/doc/experimental/fs/path/replace_filename>) | substitui o último componente do path por outro path
(função membro pública)
[ has_filename](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento do path correspondente não está vazio
(função membro pública)