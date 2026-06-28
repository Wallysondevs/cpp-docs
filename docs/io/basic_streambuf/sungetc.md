# std::basic_streambuf&lt;CharT,Traits&gt;::sungetc

int_type sungetc();

  
Se uma posição de putback estiver disponível na área de leitura (gptr() > eback()), então decrementa o ponteiro seguinte ([gptr()](<#/doc/io/basic_streambuf/gptr>)) e retorna o caractere para o qual ele agora aponta.

Se uma posição de putback não estiver disponível, então chama [pbackfail()](<#/doc/io/basic_streambuf/pbackfail>) para retroceder a sequência de entrada, se possível.

A função de stream de E/S [`basic_istream::unget`](<#/doc/io/basic_istream/unget>) é implementada usando esta função.

### Parâmetros

(nenhum)

### Valor de retorno

Se a posição de putback estava disponível, retorna o caractere para o qual o ponteiro seguinte agora aponta, convertido para `int_type` com `Traits::to_int_type(*gptr())`. A próxima entrada de caractere único deste streambuf retornará este caractere.

Se a posição de putback não estava disponível, retorna o que [pbackfail()](<#/doc/io/basic_streambuf/pbackfail>) retorna, que é `Traits::eof()` em caso de falha.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::stringstream s("abcdef"); // gptr() points to 'a'
        char c1 = s.get(); // c = 'a', gptr() now points to 'b' 
        char c2 = s.rdbuf()->sungetc(); // same as s.unget(): gptr() points to 'a' again 
        char c3 = s.get(); // c3 = 'a', gptr() now points to 'b'
        char c4 = s.get(); // c4 = 'b', gptr() now points to 'c'
        std::cout << c1 << c2 << c3 << c4 << '\n';
     
        s.rdbuf()->sungetc();  // back to 'b'
        s.rdbuf()->sungetc();  // back to 'a'
        int eof = s.rdbuf()->sungetc();  // nothing to unget: pbackfail() fails
        if (eof == EOF)
                std::cout << "Nothing to unget after 'a'\n";
    }
```

Saída:
```
    aaab
    Nothing to unget after 'a'
```

### Ver também

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada   
(função membro pública)  
[ unget](<#/doc/io/basic_istream/unget>) | desextrai um caractere   
(função membro pública de `std::basic_istream<CharT,Traits>`)