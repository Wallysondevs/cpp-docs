# std::basic_streambuf&lt;CharT,Traits&gt;::sputbackc

int_type sputbackc( char_type c );

  
Coloca um caractere de volta na área de leitura (get area).

Se uma posição de retorno (putback) estiver disponível na área de leitura (get area) (gptr() > eback()), e o caractere `c` for igual ao caractere uma posição à esquerda de [gptr()](<#/doc/io/basic_streambuf/gptr>) (conforme determinado por Traits::eq(c, gptr()[-1])), então simplesmente decrementa o ponteiro seguinte ([gptr()](<#/doc/io/basic_streambuf/gptr>)).

Caso contrário, chama pbackfail(Traits::to_int_type(c)) para retroceder a área de leitura (get area) ou para modificar tanto a área de leitura (get area) quanto, possivelmente, a sequência de caracteres associada.

A função de stream de E/S [`basic_istream::putback`](<#/doc/io/basic_istream/putback>) é implementada em termos desta função.

### Parâmetros

c  |  \-  |  caractere a ser retornado   
  
### Valor de retorno

Se a posição de retorno (putback) estava disponível, retorna o caractere para o qual o ponteiro seguinte está agora apontando, convertido para `int_type` com Traits::to_int_type(*gptr()). A próxima entrada de caractere único deste streambuf retornará este caractere.

Se a posição de retorno (putback) não estava disponível, retorna o que [pbackfail()](<#/doc/io/basic_streambuf/pbackfail>) retorna, que é Traits::eof() em caso de falha.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::stringstream s("abcdef"); // gptr() points to 'a' in "abcdef"
        std::cout << "Before putback, string holds " << s.str() << '\n';
        char c1 = s.get(); // c1 = 'a', gptr() now points to 'b' in "abcdef"
        char c2 = s.rdbuf()->sputbackc('z'); // same as s.putback('z')
                                             // gptr() now points to 'z' in "zbcdef"
        std::cout << "After putback, string holds " << s.str() << '\n';
        char c3 = s.get(); // c3 = 'z', gptr() now points to 'b' in "zbcdef"
        char c4 = s.get(); // c4 = 'b', gptr() now points to 'c' in "zbcdef"
        std::cout << c1 << c2 << c3 << c4 << '\n';
     
        s.rdbuf()->sputbackc('b');  // gptr() now points to 'b' in "zbcdef"
        s.rdbuf()->sputbackc('z');  // gptr() now points to 'z' in "zbcdef"
        int eof = s.rdbuf()->sputbackc('x');  // nothing to unget: pbackfail() fails
        if (eof == EOF)
            std::cout << "No room to putback after 'z'\n";
    }
```

Saída: 
```
    Before putback, string holds abcdef
    After putback, string holds zbcdef
    azzb
    No room to putback after 'z'
```

### Veja também

[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o ponteiro seguinte na sequência de entrada uma posição para trás   
(função membro pública)  
[ putback](<#/doc/io/basic_istream/putback>) | coloca um caractere no stream de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)