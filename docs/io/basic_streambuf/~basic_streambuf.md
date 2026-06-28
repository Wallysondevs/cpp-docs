# std::basic_streambuf&lt;CharT,Traits&gt;::~basic_streambuf

virtual ~basic_streambuf();

  
Este destrutor não tem efeito: os membros deste `basic_streambuf` (os ponteiros e o locale) são destruídos de acordo com a sequência usual de destruição de objetos após o retorno deste destrutor. No entanto, como é declarado `public virtual`, ele permite que os objetos derivados de `std::basic_streambuf` sejam deletados através de um ponteiro para a classe base. 

### Parâmetros

(nenhum) 

### Exemplo

Execute este código
```cpp 
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::filebuf* fbp = new std::filebuf;
        fbp->open("test.txt", std::ios_base::out);
        fbp->sputn("Hello\n", 6);
     
        std::streambuf* sbp = fbp;
        delete sbp; // the file is closed, output flushed and written
     
        std::ifstream f("test.txt");
        std::cout << f.rdbuf(); // proof
    }
```

Saída: 
```
    Hello
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 54](<https://cplusplus.github.io/LWG/issue54>) | C++98  | o efeito do destrutor não foi especificado  | especificado como sem efeito   
  
### Ver também

[ (constructor)](<#/doc/io/basic_streambuf/basic_streambuf>) |  constrói um objeto `basic_streambuf`   
(função membro protegida)  