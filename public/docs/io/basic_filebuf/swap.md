# std::basic_filebuf&lt;CharT,Traits&gt;::swap

void swap( [std::basic_filebuf](<#/doc/io/basic_filebuf>)& rhs ); |  |  (desde C++11)  

  
Troca o estado e o conteúdo de *this e rhs. 

### Parâmetros

rhs  |  \-  |  outro `basic_filebuf`  
  
### Valor de retorno

(nenhum) 

### Notas

Esta função é chamada automaticamente ao trocar objetos `std::fstream`, raramente sendo necessário chamá-la diretamente. 

### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::ifstream fin("test.in"); // read-only
        std::ofstream fout("test.out"); // write-only
     
        std::string s;
        getline(fin, s);
        std::cout << s << '\n'; // outputs the first line of test.in
     
        fin.rdbuf()->swap(*fout.rdbuf()); //swap the underlying buffers
     
        getline(fin, s); // fails: cannot read from a write-only filebuf
        std::cout << s << '\n'; // prints empty line
    }
```

### Veja também

[ operator=](<#/>)(C++11) |  atribui um objeto `basic_filebuf`   
(função membro pública)  
[ std::swap(std::basic_filebuf)](<#/doc/io/basic_filebuf/swap2>)(C++11) |  especializa o algoritmo `std::swap`   
(modelo de função)  
[ swap](<#/doc/io/basic_fstream/swap>)(C++11) |  troca dois fluxos de arquivo   
(função membro pública de `std::basic_fstream<CharT,Traits>`)