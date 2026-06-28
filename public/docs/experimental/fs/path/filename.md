# std::experimental::filesystem::path::filename

path filename() const; |  |  (filesystem TS)  

  
Retorna o componente de nome de arquivo do path. 

Equivalente a empty() ? path() : *--end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O nome de arquivo identificado pelo path. 

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
        std::cout << fs::path("/foo/bar.txt").filename() << '\n'
                  << fs::path("/foo/.bar").filename() << '\n'
                  << fs::path("/foo/bar/").filename() << '\n'
                  << fs::path("/foo/.").filename() << '\n'
                  << fs::path("/foo/..").filename() << '\n'
                  << fs::path(".").filename() << '\n'
                  << fs::path("..").filename() << '\n'
                  << fs::path("/").filename() << '\n';
    }
```

Saída: 
```
    "bar.txt"
    ".bar"
    "."
    "."
    ".."
    "."
    ".."
    "/"
```

### Veja também

[ extension](<#/doc/experimental/fs/path/extension>) | retorna o componente de extensão de arquivo do path   
(função membro pública)  
[ stem](<#/doc/experimental/fs/path/stem>) | retorna o componente stem do path   
(função membro pública)  
[ replace_filename](<#/doc/experimental/fs/path/replace_filename>) | substitui o último componente do path por outro path   
(função membro pública)  
[ has_filename](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento path correspondente não está vazio   
(função membro pública)