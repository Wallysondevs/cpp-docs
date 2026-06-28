# std::basic_fstream&lt;CharT,Traits&gt;::is_open

bool is_open() const;

  
Verifica se o stream de arquivo possui um arquivo associado.

Efetivamente chama [`rdbuf()->is_open()`](<#/doc/io/basic_filebuf/is_open>). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o stream de arquivo possui um arquivo associado, false caso contrário. 

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string filename = "some_file";
    
        std::fstream fs(filename, std::ios::in);
    
        std::cout << std::boolalpha;
        std::cout << "fs.is_open() = " << fs.is_open() << '\n';
    
        if (!fs.is_open())
        {
            fs.clear();
            fs.open(filename, std::ios::out);
            std::cout << "fs.is_open() = " << fs.is_open() << '\n';
        }
    }
```

Saída possível: 
```
    fs.is_open() = false
    fs.is_open() = true
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 365](<https://cplusplus.github.io/LWG/issue365>) | C++98  | `is_open` não foi declarado com qualificador const  | declarado com qualificador const   
  
### Veja também

[ open](<#/doc/io/basic_fstream/open>) |  abre um arquivo e o associa ao stream   
(função membro pública)  
[ close](<#/doc/io/basic_fstream/close>) |  fecha o arquivo associado   
(função membro pública)