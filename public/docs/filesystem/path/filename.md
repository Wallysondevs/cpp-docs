# std::filesystem::path::filename

path filename() const; |  |  (desde C++17)  

  
Retorna o componente de nome de arquivo em formato genérico do path. 

Equivalente a relative_path().empty() ? path() : *--end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O nome de arquivo identificado pelo path. 

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
        std::cout << fs::path("/foo/bar.txt").filename() << '\n'
                  << fs::path("/foo/.bar").filename() << '\n'
                  << fs::path("/foo/bar/").filename() << '\n'
                  << fs::path("/foo/.").filename() << '\n'
                  << fs::path("/foo/..").filename() << '\n'
                  << fs::path(".").filename() << '\n'
                  << fs::path("..").filename() << '\n'
                  << fs::path("/").filename() << '\n'
                  << fs::path("//host").filename() << '\n';
    }
```

Saída: 
```
    "bar.txt"
    ".bar"
    ""
    "."
    ".."
    "."
    ".."
    ""
    "host"
```

### Veja também

[ extension](<#/doc/filesystem/path/extension>) | retorna o componente de extensão de arquivo do path   
(função membro pública)  
[ stem](<#/doc/filesystem/path/stem>) | retorna o componente stem do path (nome de arquivo sem a extensão final)   
(função membro pública)  
[ replace_filename](<#/doc/filesystem/path/replace_filename>) | substitui o último componente do path por outro path   
(função membro pública)  
[ has_filename](<#/doc/filesystem/path/has_path>) | verifica se o elemento path correspondente não está vazio   
(função membro pública)