# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::underflow

protected:  
virtual int_type underflow()

  
Lê o próximo caractere da área de leitura (get area) do buffer. 

Especificamente: 

1) Se a sequência de entrada tiver uma posição de leitura disponível (egptr() > gptr()), retorna Traits::to_int_type(*gptr())

2) Caso contrário, se pptr() > egptr() (alguns caracteres foram inseridos no stream desde a última vez que [overflow()](<#/doc/io/basic_stringbuf/overflow>) alterou [egptr()](<#/doc/io/basic_streambuf/gptr>)), então estende o final da área de leitura (get area) para incluir os caracteres inseridos mais recentemente, alterando [egptr()](<#/doc/io/basic_streambuf/gptr>) para ser igual a [pptr()](<#/doc/io/basic_streambuf/pptr>), e então retorna Traits::to_int_type(*gptr())

3) Caso contrário, retorna Traits::eof().

Qualquer caractere no buffer que tenha sido inicializado, independentemente de ter se originado da string passada no construtor ou ter sido anexado por [overflow()](<#/doc/io/basic_stringbuf/overflow>), é considerado parte da sequência de entrada. 

### Parâmetros

(nenhum) 

### Valor de retorno

Traits::to_int_type(*gptr()) (o próximo caractere a ser lido na área de leitura) em caso de sucesso, ou Traits::eof() em caso de falha. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <sstream>
     
    struct mybuf : std::stringbuf
    {
        mybuf(const std::string& new_str,
              std::ios_base::openmode which = std::ios_base::in | std::ios_base::out)
            : std::stringbuf(new_str, which) {}
     
        int_type overflow(int_type c)
        {
            std::cout << "Before overflow():  get area size is " << egptr() - eback()
                      << ", the put area size is " << epptr() - pbase() << '\n';
            int_type rc = std::stringbuf::overflow(c);
            std::cout << "After overflow():   get area size is " << egptr() - eback()
                      << ", put area size is " << epptr() - pbase() << '\n';
            return rc;
        }
     
        int_type underflow()
        {
            std::cout << "Before underflow(): get area size is " << egptr() - eback()
                      << ", put area size is " << epptr() - pbase() << '\n';
            int_type ch = std::stringbuf::underflow();
            std::cout << "After underflow():  get area size is " << egptr() - eback()
                      << ", put area size is " << epptr() - pbase() << '\n';
     
            if (ch == EOF)
                std::cout << "underflow() returns EOF\n";
            else
                std::cout << "underflow() returns '" << char(ch) << "'\n";
            return ch;
        }
    };
     
    int main()
    {
        mybuf sbuf("123"); // read-write stream
        std::iostream stream(&sbuf);
        int n;
        stream >> n; // calls sgetc() four times
                     // three calls return the characters '1', '2', '3'
                     // the fourth call, gptr() == egptr() and underflow() is called
                     // underflow returns EOF
        std::cout << "n = " << n << '\n';
        stream.clear(); // clear the eofbit
     
        stream << "123456"; // sputc() is called 6 times
                            // first three calls store "123" in the existing buffer
                            // 4th call finds that pptr() == epptr() and calls overflow()
                            // overflow() grows the buffer and sets egptr() to 4
                            // 5th and 6th calls store '5' and '6', advancing pptr()
     
        stream >> n; // calls sgetc() 4 times
                     // 1st call returns the '4' that was made available by overflow()
                     // on the 2nd call, egptr() == egptr() and underflow() is called
                     // underflow advances egptr() to equal pptr() (which is 6)
                     // 3rd sgetc() returns '6'
                     // 4th sgetc() finds gptr() == egptr(), calls underflow()
                     // underflow() returns EOF
     
        std::cout << "n = " << n << '\n';
    }
```

Saída possível: 
```
    Before underflow(): get area size is 3, put area size is 15
    After underflow():  get area size is 3, put area size is 15
    underflow() returns EOF
    n = 123
    Before underflow(): get area size is 3, put area size is 15
    After underflow():  get area size is 6, put area size is 15
    underflow() returns '4'
    Before underflow(): get area size is 6, put area size is 15
    After underflow():  get area size is 6, put area size is 15
    underflow() returns EOF
    n = 456
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 432](<https://cplusplus.github.io/LWG/issue432>) | C++98  | não estava claro se os caracteres anexados por [overflow()](<#/doc/io/basic_stringbuf/overflow>)  
são considerados parte da sequência de entrada  | esclarecido   
  
### Veja também

[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura (get area)   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ underflow](<#/doc/io/strstreambuf/underflow>)[virtual] | lê um caractere da sequência de entrada sem avançar o próximo ponteiro   
(função membro virtual protegida de `std::strstreambuf`)  
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)