# std::experimental::filesystem::begin(recursive_directory_iterator), std::experimental::filesystem::end(recursive_directory_iterator)

recursive_directory_iterator begin( recursive_directory_iterator iter ); | (1) | (filesystem TS)
---|---|---
recursive_directory_iterator end( const recursive_directory_iterator& ); | (2) | (filesystem TS)

1) Retorna iter inalterado.

2) Retorna um [`recursive_directory_iterator`](<#/doc/experimental/fs/recursive_directory_iterator>) construído por padrão, que serve como o iterador final. O argumento é ignorado.

Essas funções não-membro permitem o uso de `recursive_directory_iterator`s com loops for baseados em range.

### Parâmetros

- **iter** — um recursive_directory_iterator

### Valor de retorno

1) iter inalterado.

2) Iterador final (`recursive_directory_iterator` construído por padrão).

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/a/b");
        std::ofstream("sandbox/file1.txt");
        fs::create_symlink("a", "sandbox/syma");
        for (auto& p : fs::recursive_directory_iterator("sandbox"))
            std::cout << p << '\n';
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/a"
    "sandbox/a/b"
    "sandbox/file1.txt"
    "sandbox/syma"
```

### Veja também

[ filesystem::begin(filesystem::directory_iterator)filesystem::end(filesystem::directory_iterator)](<#/doc/experimental/fs/directory_iterator/begin>) | suporte a loops for baseados em range
(função)