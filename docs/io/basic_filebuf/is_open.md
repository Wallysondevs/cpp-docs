# std::basic_filebuf&lt;CharT,Traits&gt;::is_open

bool is_open() const;

  
Retorna true se a chamada mais recente para [open()](<#/doc/io/basic_filebuf/open>) foi bem-sucedida e não houve nenhuma chamada para [close()](<#/doc/io/basic_filebuf/close>) desde então. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o arquivo associado estiver aberto, false caso contrário. 

### Notas

Esta função é tipicamente chamada por [std::basic_fstream::is_open()](<#/doc/io/basic_fstream/is_open>). 

### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::ifstream fs("test.txt");
        std::filebuf fb;
        fb.open("test.txt", std::ios_base::in);
        std::cout << std::boolalpha
                  << "direct call: " << fb.is_open() << '\n'
                  << "through streambuf: " << fs.rdbuf()->is_open() << '\n'
                  << "through fstream: " << fs.is_open() << '\n';
    }
```

Saída: 
```
    direct call: true
    through streambuf: true
    through fstream: true
```

### Ver também

[ open](<#/doc/io/basic_filebuf/open>) | abre um arquivo e o configura como a sequência de caracteres associada   
(função membro pública)  
[ close](<#/doc/io/basic_filebuf/close>) | descarrega o buffer da área de escrita e fecha o arquivo associado   
(função membro pública)