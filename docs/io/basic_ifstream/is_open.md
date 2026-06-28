# std::basic_ifstream&lt;CharT,Traits&gt;::is_open

bool is_open() const;

  
Verifica se o fluxo de arquivo tem um arquivo associado.

Efetivamente chama [`rdbuf()->is_open()`](<#/doc/io/basic_filebuf/is_open>).

### Parâmetros

(nenhum)

### Valor de retorno

`true` se o fluxo de arquivo tiver um arquivo associado, `false` caso contrário.

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <string>
     
    // this file is called main.cpp
     
    bool file_exists(const std::string& str)
    {
        std::ifstream fs(str);
        return fs.is_open();
    }
     
    int main()
    {
        std::boolalpha(std::cout);
        std::cout << file_exists("main.cpp")  << '\n'
                  << file_exists("strange_file") << '\n';
    }
```

Saída possível:
```
    true
    false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 365](<https://cplusplus.github.io/LWG/issue365>) | C++98  | `is_open` não foi declarado com o qualificador `const`  | declarado com o qualificador `const`   
  
### Veja também

[ open](<#/doc/io/basic_ifstream/open>) | abre um arquivo e o associa ao fluxo   
(função membro pública)  
[ close](<#/doc/io/basic_ifstream/close>) | fecha o arquivo associado   
(função membro pública)