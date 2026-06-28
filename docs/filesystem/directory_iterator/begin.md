# std::filesystem::begin(directory_iterator), std::filesystem::end(directory_iterator)

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
directory_iterator begin( directory_iterator iter ) noexcept;  // (1) (desde C++17)
directory_iterator end( directory_iterator ) noexcept;  // (2) (desde C++17)
```

  
1) Retorna iter inalterado.

2) Retorna um [`directory_iterator`](<#/doc/filesystem/directory_iterator>) construído por padrão, que serve como o iterator de fim. O argumento é ignorado.

Essas funções não-membro permitem o uso de `directory_iterator`s com loops for baseados em range e tornam `directory_iterator` um tipo [`range`](<#/doc/ranges/range>) (desde C++20). 

### Parâmetros

iter  |  \-  |  um `directory_iterator`  
  
### Valor de retorno

1) iter inalterado.

2) Iterator de fim (`directory_iterator` construído por padrão).

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
     
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

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3480](<https://cplusplus.github.io/LWG/issue3480>) | C++17  | `end` recebia o argumento por referência  | recebe o argumento por valor   
  
### Veja também

[ begin(std::filesystem::recursive_directory_iterator)end(std::filesystem::recursive_directory_iterator)](<#/doc/filesystem/recursive_directory_iterator/begin>) |  suporte a loops for baseados em range   
(function)  