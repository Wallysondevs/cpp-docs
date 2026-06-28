# std::experimental::filesystem::path::replace_filename

path& replace_filename( const path& replacement ); |  |  (filesystem TS)  

  
Substitui um único componente de nome de arquivo por replacement.

Equivalente ao seguinte: 
```cpp 
    remove_filename();
    operator/=(replacement);
```

O comportamento é indefinido se o path não tiver um componente de nome de arquivo ([`has_filename`](<#/doc/experimental/fs/path/has_path>) retornar false). 

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
        std::cout << fs::path("/foo").replace_filename("bar") << '\n'
                  << fs::path("/").replace_filename("bar") << '\n';
    }
```

Saída: 
```
    "/bar"
    "bar"
```

### Veja também

[ replace_extension](<#/doc/experimental/fs/path/replace_extension>) | substitui a extensão   
(função membro pública)  
[ filename](<#/doc/experimental/fs/path/filename>) | retorna o componente de nome de arquivo do path   
(função membro pública)  
[ remove_filename](<#/doc/experimental/fs/path/remove_filename>) | remove o componente de nome de arquivo do path   
(função membro pública)  
[ has_filename](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento path correspondente não está vazio   
(função membro pública)