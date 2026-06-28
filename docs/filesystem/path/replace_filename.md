# std::filesystem::path::replace_filename

```cpp
path& replace_filename( const path& replacement );  // (desde C++17)
```

  
Substitui um único componente de nome de arquivo por replacement.

Equivalente a: remove_filename(); return operator/=(replacement);.

### Parâmetros

replacement  |  \-  |  `path` usado para substituir o componente de nome de arquivo   
  
### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
     
    int main()
    {
        std::cout << fs::path("/foo").replace_filename("bar") << '\n'
                  << fs::path("/").replace_filename("bar") << '\n'
                  << fs::path("").replace_filename("pub") << '\n';
    }
```

Saída: 
```
    "/bar"
    "/bar"
    "pub"
```

### Veja também

[ replace_extension](<#/doc/filesystem/path/replace_extension>) |  substitui a extensão   
(função membro pública)  
[ filename](<#/doc/filesystem/path/filename>) |  retorna o componente de nome de arquivo do path   
(função membro pública)  
[ remove_filename](<#/doc/filesystem/path/remove_filename>) |  remove o componente de nome de arquivo do path   
(função membro pública)  
[ has_filename](<#/doc/filesystem/path/has_path>) |  verifica se o elemento de path correspondente não está vazio   
(função membro pública)