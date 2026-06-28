# std::filesystem::path::parent_path

path parent_path() const; |  |  (desde C++17)  

  
Retorna o caminho para o diretório pai.

Se has_relative_path() retornar false, o resultado é uma cópia de *this. Caso contrário, o resultado é um path cujo pathname em formato genérico é o prefixo mais longo do pathname em formato genérico de *this que produz um elemento a menos em sua iteração.

### Parâmetros

(nenhum)

### Valor de retorno

O caminho para o diretório pai, ou uma cópia de *this se não has_relative_path().

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Run this code
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
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
    The parent path of "/" is "/"
    The parent path of "/var/tmp/." is "/var/tmp"
```

### Ver também

[ root_name](<#/doc/filesystem/path/root_name>) | retorna o root-name do path, se presente   
(função membro pública)  
[ root_directory](<#/doc/filesystem/path/root_directory>) | retorna o diretório raiz do path, se presente   
(função membro pública)  
[ root_path](<#/doc/filesystem/path/root_path>) | retorna o root path do path, se presente   
(função membro pública)