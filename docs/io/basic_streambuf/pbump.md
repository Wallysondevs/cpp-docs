# std::basic_streambuf&lt;CharT,Traits&gt;::pbump

protected:  
void pbump( int count );

  
Reposiciona o _ponteiro de escrita_ ([pptr()](<#/doc/io/basic_streambuf/pptr>)) por `count` caracteres, onde `count` pode ser positivo ou negativo. Nenhuma verificação é feita para mover o ponteiro para fora da área de escrita `[`pbase()`, `epptr()`)`. 

Se o ponteiro for avançado e então [overflow()](<#/doc/io/basic_streambuf/overflow>) for chamado para descarregar a área de escrita para a sequência de caracteres associada, o efeito é que `count` caracteres extras com valores indefinidos são produzidos. 

### Parâmetros

count  |  \-  |  número a ser adicionado ao ponteiro de escrita   
  
### Valor de retorno

(nenhum) 

### Observações

Como esta função recebe um `int`, ela não pode manipular buffers maiores que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::max() caracteres ([LWG issue 255](<https://cplusplus.github.io/LWG/issue255>)). 

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <string>
     
    struct showput_streambuf : std::filebuf
    {
        using std::filebuf::pbump; // expose protected
        std::string showput() const
        {
            return std::string(pbase(), pptr());
        }
    };
     
    int main()
    {
        showput_streambuf mybuf;
        mybuf.open("test.txt", std::ios_base::out);
        std::ostream str(&mybuf);
        str << "This is a test" << std::flush << "1234";
        std::cout << "The put area contains: " << mybuf.showput() << '\n';
        mybuf.pbump(10);
        std::cout << "after pbump(10), it contains " << mybuf.showput() << '\n';
    }
```

Saída: 
```
    The put area contains: 1234
    after pbump(10), it contains 1234 is a test
```

### Veja também

[ gbump](<#/doc/io/basic_streambuf/gbump>) | avança o próximo ponteiro na sequência de entrada   
(função membro protegida)  