# std::basic_streambuf&lt;CharT,Traits&gt;::sputc

int_type sputc( char_type ch );

  
Escreve um caractere na sequência de saída.

Se a posição de escrita da sequência de saída não estiver disponível (o buffer estiver cheio), então chama overflow(ch).

### Parâmetros

ch  |  \-  |  caractere a ser escrito   
  
### Valor de retorno

O caractere escrito, convertido para `int_type` com Traits::to_int_type(ch) em caso de sucesso.

Traits::eof() (conforme retornado por [overflow()](<#/doc/io/basic_streambuf/overflow>)) em caso de falha.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::ostringstream s;
        s.rdbuf()->sputc('a');
        std::cout << s.str() << '\n';
    }
```

Saída: 
```
    a
```

### Veja também

[ sputn](<#/doc/io/basic_streambuf/sputn>) |  invoca xsputn()   
(função membro pública)  