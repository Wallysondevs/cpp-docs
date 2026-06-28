# std::basic_ostream&lt;CharT,Traits&gt;::~basic_ostream

virtual ~basic_ostream();

  
Destrói o objeto `basic_ostream`. Este destrutor não realiza nenhuma operação no streambuffer subjacente (`rdbuf()`): os destrutores dos fluxos de saída derivados, como [std::basic_ofstream](<#/doc/io/basic_ofstream>) e [std::basic_ostringstream](<#/doc/io/basic_ostringstream>), são responsáveis por chamar os destrutores dos stream buffers. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    void add_words(std::streambuf* p)
    {
        std::ostream buf(p); // buf shares the buffer with s
        buf << " is the answer";
    } // calls the destructor of buf. p remains unaffected
     
    int main()
    {
        std::ostringstream s;
        s << 42;
        add_words(s.rdbuf());
        s << ".";
        std::cout << s.str() << '\n';
    }
```

Saída: 
```
    42 is the answer.
```