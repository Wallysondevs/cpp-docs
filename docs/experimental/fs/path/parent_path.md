# std::experimental::filesystem::path::parent_path

path parent_path() const; |  |  (filesystem TS)  

  
Retorna o caminho para o diretório pai. Retorna um caminho vazio se `empty()` ou se houver apenas um único elemento no caminho (`begin() == --end()`). 

O caminho resultante é construído anexando todos os elementos em um range `[`begin()`, `\--end()`)` a um caminho vazio. 

### Parâmetros

(nenhum) 

### Valor de retorno

O caminho para o diretório pai. 

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
        for (fs::path p : {"/var/tmp/example.txt", "/", "/var/tmp/."})
            std::cout << "The parent path of " << p
                      << " is " << p.parent_path() << '\n';
    }
```

Saída possível: 
```
    The parent path of "/var/tmp/example.txt" is "/var/tmp"
    The parent path of "/" is ""
    The parent path of "/var/tmp/." is "/var/tmp"
```

### Veja também

| Esta seção está incompleta   