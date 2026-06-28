# std::experimental::filesystem::path::relative_path

path relative_path() const; |  |  (filesystem TS)  

  
Retorna o caminho relativo ao [caminho raiz](<#/doc/experimental/fs/path/root_path>). Se *this for um caminho vazio, retorna um caminho vazio. 

### Parâmetros

(nenhum) 

### Valor de retorno

Caminho relativo ao [caminho raiz](<#/doc/experimental/fs/path/root_path>). 

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
        fs::path p = fs::current_path();
     
        std::cout << "The current path " << p << " decomposes into:\n"
                  << "root-path " << p.root_path() << '\n'
                  << "relative path " << p.relative_path() << '\n';
    }
```

Saída possível: 
```
    The current path "C:\Users\abcdef\Local Settings\temp" decomposes into:
    root-path "C:\"
    relative path "Users\abcdef\Local Settings\temp"
```

### Ver também

[ root_name](<#/doc/experimental/fs/path/root_name>) |  retorna o nome raiz do caminho, se presente   
(função membro pública)  
[ root_directory](<#/doc/experimental/fs/path/root_directory>) |  retorna o diretório raiz do caminho, se presente   
(função membro pública)  
[ root_path](<#/doc/experimental/fs/path/root_path>) |  retorna o caminho raiz do caminho, se presente   
(função membro pública)