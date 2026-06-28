# std::basic_istream&lt;CharT,Traits&gt;::~basic_istream

virtual ~basic_istream();

  
Destrói o fluxo de entrada.

### Notas

Este destrutor não realiza nenhuma operação no streambuffer subjacente (`rdbuf()`): os destrutores dos fluxos de entrada derivados, como [std::basic_ifstream](<#/doc/io/basic_ifstream>) e [std::basic_istringstream](<#/doc/io/basic_istringstream>), são responsáveis por chamar os destrutores dos streambuffers.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    void print_stringbuf(std::streambuf* p)
    {
        std::istream buf(p); // buf compartilha o buffer com s1
        int n;
        buf >> n;
        std::cout << n;
    } // chama o destrutor de buf. p permanece inalterado
     
    int main()
    {
        std::istringstream s1("10 20");
        print_stringbuf(s1.rdbuf());
        int n;
        s1 >> n;
        std::cout << ',' << n << '\n';
    }
```

Saída: 
```
    10,20
```