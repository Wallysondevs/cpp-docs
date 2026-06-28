# std::experimental::filesystem::begin(directory_iterator), std::experimental::filesystem::end(directory_iterator)

directory_iterator begin( directory_iterator iter ); |  (1)  |  (filesystem TS)  
directory_iterator end( const directory_iterator& ); |  (2)  (filesystem TS)  

  
1) Retorna iter inalterado.

2) Retorna um [`directory_iterator`](<#/doc/experimental/fs/directory_iterator>) construído por padrão, que serve como o iterator de fim. O argumento é ignorado.

Essas funções não-membro permitem o uso de `directory_iterator`s com loops for baseados em range. 

### Parâmetros

iter  |  \-  |  um directory_iterator   
  
### Valor de retorno

1) iter inalterado.

2) Iterator de fim (um `directory_iterator` construído por padrão).

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
        std::ofstream("sandbox/file2.txt");
        for (auto& p : fs::directory_iterator("sandbox"))
            std::cout << p << '\n';
        fs::remove_all("sandbox");
    }
```

Saída possível: 
```
    "sandbox/a"
    "sandbox/file1.txt"
    "sandbox/file2.txt"
```

### Veja também

[ filesystem::begin(filesystem::recursive_directory_iterator)filesystem::end(filesystem::recursive_directory_iterator)](<#/doc/experimental/fs/recursive_directory_iterator/begin>) | suporte a loops for baseados em range   
(função)  