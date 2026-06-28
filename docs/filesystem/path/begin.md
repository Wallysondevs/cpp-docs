# std::filesystem::path::begin, std::filesystem::path::end

iterator begin() const; | (1) | (desde C++17)
---|---|---
iterator end() const; | (2) | (desde C++17)

1) Retorna um iterator para o primeiro elemento do path. Se o path estiver vazio, o iterator retornado é igual a **end()**.

2) Retorna um iterator um após o último elemento do path. Desreferenciar este iterator é comportamento indefinido.

A sequência denotada por este par de iterators consiste no seguinte:

1. root-name (se houver).
2. root-directory (se houver).
3. Sequência de file-names, omitindo quaisquer separadores de diretório.
4. Se houver um separador de diretório após o último file-name no path, o último elemento antes do iterator de fim é um elemento vazio.

### Parâmetros

(nenhum)

### Valor de retorno

1) Iterator para o primeiro elemento do path.

2) Iterator um após o fim do path

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
        const fs::path p = 
    #   ifdef _WIN32
            "C:\\users\\abcdef\\AppData\\Local\\Temp\\";
    #   else
            "/home/user/.config/Cppcheck/Cppcheck-GUI.conf";
    #   endif
        std::cout << "Examining the path " << p << " through iterators gives\n";
        for (auto it = p.begin(); it != p.end(); ++it)
            std::cout << *it << " │ ";
        std::cout << '\n';
    }
```

Saída possível:
```
    --- Windows ---
    Examining the path "C:\users\abcdef\AppData\Local\Temp\" through iterators gives
    "C:" │ "/" │ "users" │ "abcdef" │ "AppData" │ "Local" │ "Temp" │ "" │
    
    --- UNIX ---
    Examining the path "/home/user/.config/Cppcheck/Cppcheck-GUI.conf" through iterators gives
    "/" │ "home" │ "user" │ ".config" │ "Cppcheck" │ "Cppcheck-GUI.conf" │
```