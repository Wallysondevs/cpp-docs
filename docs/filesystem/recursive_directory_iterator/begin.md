# std::filesystem::begin(recursive_directory_iterator), std::filesystem::end(recursive_directory_iterator)

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
recursive_directory_iterator begin( recursive_directory_iterator iter ) noexcept;
recursive_directory_iterator end( recursive_directory_iterator ) noexcept;
```

  
1) Retorna `iter` inalterado.

2) Retorna um `recursive_directory_iterator` construído por padrão, que serve como o iterator de fim. O argumento é ignorado.

Essas funções não-membro permitem o uso de `recursive_directory_iterator`s com loops `for` baseados em range e tornam `recursive_directory_iterator` um tipo [`range`](<#/doc/ranges/range>) (desde C++20). 

### Parâmetros

iter  |  \-  |  um `recursive_directory_iterator`  
  
### Valor de retorno

1) `iter` inalterado.

2) Iterator de fim (`recursive_directory_iterator` construído por padrão).

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::current_path(fs::temp_directory_path());
        fs::create_directories("sandbox/a/b");
        std::ofstream("sandbox/file1.txt");
        fs::create_symlink("a", "sandbox/syma");
    
        std::cout << "Print dir structure using OS specific command 'tree':\n";
        std::system("tree --noreport sandbox");
    
        std::cout << "\nPrint dir structure using directory iterator:\n";
        for (auto& p : fs::recursive_directory_iterator("sandbox"))
            std::cout << p << '\n';
    
        fs::remove_all("sandbox");
    }
```

Saída possível: 
```
    Print dir structure using OS specific command 'tree':
    sandbox
    ├── a
    │   └── b
    ├── file1.txt
    └── syma -> a
    
    Print dir structure using directory iterator:
    "sandbox/syma"
    "sandbox/file1.txt"
    "sandbox/a"
    "sandbox/a/b"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 3480](<https://cplusplus.github.io/LWG/issue3480>) | C++17  | `end` recebia o argumento por referência  | recebe o argumento por valor   
  
### Veja também

[ begin(std::filesystem::directory_iterator)end(std::filesystem::directory_iterator)](<#/doc/filesystem/directory_iterator/begin>)(C++17) |  suporte a loops for baseados em range   
(function)  