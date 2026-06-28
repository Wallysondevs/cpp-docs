# std::experimental::filesystem::path::begin, std::experimental::filesystem::path::end

iterator begin() const; |  (1)  |  (filesystem TS)  
---|---|---
iterator end() const; |  (2)  |  (filesystem TS)  

  
1) Retorna um iterator para o primeiro elemento do path. Se o path estiver vazio, o iterator retornado é igual a **end()**.

2) Retorna um iterator um após o último elemento do path. Desreferenciar este iterator é comportamento indefinido.

A sequência denotada por este par de iterators consiste no seguinte: 

1) root-name (se houver).

2) root-directory (se houver).

3) Sequência de nomes de arquivo, omitindo quaisquer separadores de diretório.

4) Se houver um separador de diretório após o último nome de arquivo no path, o último elemento antes do iterator `end` é um nome de arquivo de ponto fictício.

### Parâmetros

(nenhum) 

### Valor de retorno

1) Iterator para o primeiro elemento do path.

2) Iterator um após o final do path.

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
        fs::path p = "C:\\users\\abcdef\\AppData\\Local\\Temp\\";
        std::cout << "Examining the path " << p << " through iterators gives\n";
        for (auto& e : p)
            std::cout << e << '\n';
    }
```

Saída: 
```
    Examining the path "C:\users\abcdef\AppData\Local\Temp\" through iterators gives
    "C:"
    "/"
    "users"
    "abcdef"
    "AppData"
    "Local"
    "Temp"
    "."
```