# std::experimental::filesystem::path::root_name

path root_name() const; |  |  (filesystem TS)  

  
Retorna o nome raiz do caminho. Se o caminho não incluir um nome raiz, retorna path(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O nome raiz do caminho. 

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
        std::cout << "Current root name is: " << fs::current_path().root_name() << '\n';
    }
```

Saída possível: 
```
    Current root name is: "C:"
```

### Veja também

[ root_directory](<#/doc/experimental/fs/path/root_directory>) |  retorna o diretório raiz do caminho, se presente   
(função membro pública)  
[ root_path](<#/doc/experimental/fs/path/root_path>) |  retorna o caminho raiz do caminho, se presente   
(função membro pública)