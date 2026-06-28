# std::strstreambuf::underflow

protected:  
virtual int_type underflow(); |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Lê o próximo caractere da área de leitura (get area) do buffer.

Se a sequência de entrada tiver uma posição de leitura disponível (gptr() < egptr()), retorna (unsigned char)(*gptr()).

Caso contrário, se [pptr()](<#/doc/io/basic_streambuf/pptr>) não for nulo e pptr() > egptr() (existe uma área de escrita (put area) e ela está localizada após a área de leitura (get area)), estende o final da área de leitura para incluir os caracteres que foram recentemente escritos na área de escrita, incrementando [egptr()](<#/doc/io/basic_streambuf/gptr>) para algum valor entre gptr() e [pptr()](<#/doc/io/basic_streambuf/pptr>), e então retorna (unsigned char)(*gptr()).

Caso contrário, retorna [EOF](<#/doc/io/c>) para indicar falha.

### Parâmetros

(nenhum)

### Valor de retorno

O próximo caractere na área de leitura (get area), (unsigned char)(*gptr()) em caso de sucesso, [EOF](<#/doc/io/c>) em caso de falha.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <strstream>
     
    struct mybuf : std::strstreambuf
    {
        int_type overflow(int_type c) 
        {
            std::cout << "Before overflow(): size of the get area is " << egptr()-eback()
                      << " size of the put area is " << epptr()-pbase() << '\n';
            int_type rc = std::strstreambuf::overflow(c);
            std::cout << "After overflow(): size of the get area is " << egptr()-eback()
                      << " size of the put area is " << epptr()-pbase() << '\n';
            return rc;
        }
     
        int_type underflow() 
        {
            std::cout << "Before underflow(): size of the get area is " << egptr()-eback()
                      << " size of the put area is " << epptr()-pbase() << '\n';
            int_type ch = std::strstreambuf::underflow();
            std::cout << "After underflow(): size of the get area is " << egptr()-eback()
                      << " size of the put area is " << epptr()-pbase() << '\n';
            if (ch == EOF)
                std::cout << "underflow() returns EOF\n";
            else
                std::cout << "underflow() returns '" << char(ch) << "'\n";
            return ch;
        }
    };
     
    int main()
    {
        mybuf sbuf; // read-write dynamic strstreambuf
        std::iostream stream(&sbuf);
     
        int n;
        stream >> n;
        stream.clear();
        stream << "123";
        stream >> n;
        std::cout << n << '\n';
    }
```

Saída possível:
```
    Before underflow(): size of the get area is 0 size of the put area is 0
    After underflow(): size of the get area is 0 size of the put area is 0
    underflow() returns EOF
    Before overflow(): size of the get area is 0 size of the put area is 32
    After overflow(): size of the get area is 0 size of the put area is 32
    Before underflow(): size of the get area is 0 size of the put area is 32
    After underflow(): size of the get area is 3 size of the put area is 32
    underflow() returns '1'
    Before underflow(): size of the get area is 3 size of the put area is 32
    After underflow(): size of the get area is 3 size of the put area is 32
    underflow() returns EOF
    123
```

### Veja também

[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura (get area)   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_stringbuf/underflow>)[virtual] | retorna o próximo caractere disponível na sequência de entrada   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ get](<#/doc/io/basic_istream/get>) | extrai caracteres   
(função membro pública de `std::basic_istream<CharT,Traits>`)