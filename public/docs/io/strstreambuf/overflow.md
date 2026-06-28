# std::strstreambuf::overflow

protected:  
virtual int_type overflow( int_type c = [EOF](<#/doc/io/c>) ); |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Anexa o caractere c à área de escrita (put area) do buffer, realocando se possível. 

1) Se c == [EOF](<#/doc/io/c>), não faz nada.

2) Caso contrário, se a área de escrita (put area) tiver uma posição de escrita disponível (pptr() < epptr()), armazena o caractere como se fosse por *pptr()++ = c.

3) Caso contrário, se o modo do stream buffer não for dinâmico ou o stream buffer estiver atualmente congelado (frozen), a função falha e retorna [EOF](<#/doc/io/c>).

4) Caso contrário, a função realoca (ou aloca inicialmente) um array dinâmico grande o suficiente para conter o conteúdo do array dinâmico atual (se houver) mais pelo menos uma posição de escrita adicional. Se um ponteiro para a função de alocação `palloc` foi usado no construtor, essa função é chamada com (*palloc)(n) onde `n` é o número de bytes a alocar, caso contrário, new char[n] é usado. Se um ponteiro para a função de desalocação `pfree` foi usado no construtor, essa função é chamada com (*pfree)(p) para desalocar o array anterior, se necessário, caso contrário, delete[] p é usado. Se a alocação falhar, a função falha e retorna [EOF](<#/doc/io/c>). 

### Parâmetros

c  |  \-  |  o caractere a ser armazenado na área de escrita (put area)   
  
### Valor de retorno

Se c == [EOF](<#/doc/io/c>), retorna algum valor diferente de [EOF](<#/doc/io/c>). Caso contrário, retorna (unsigned char)(c) em caso de sucesso, [EOF](<#/doc/io/c>) em caso de falha. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <strstream>
     
    struct mybuf : std::strstreambuf
    {
        int_type overflow(int_type c) 
        {
            std::cout << "Before overflow(): size of the put area is " << epptr()-pbase()
                      << " with " << epptr()-pptr() << " write positions available\n";
            int_type rc = std::strstreambuf::overflow(c);
            std::cout << "After overflow(): size of the put area is " << epptr()-pbase()
                      << " with " << epptr()-pptr() << " write positions available\n";
            return rc;
        }
    };
     
    int main()
    {
        mybuf sbuf; // read-write dynamic strstreambuf
        std::iostream stream(&sbuf);
     
        stream << "Sufficiently long string to overflow the initial allocation, at least "
               << " on some systems.";
    }
```

Saída possível: 
```
    Before overflow(): size of the put area is 16 with 0 write positions available
    After overflow(): size of the put area is 32 with 15 write positions available
    Before overflow(): size of the put area is 32 with 0 write positions available
    After overflow(): size of the put area is 64 with 31 write positions available
    Before overflow(): size of the put area is 64 with 0 write positions available
    After overflow(): size of the put area is 128 with 63 write positions available
```

### Ver também

[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] |  escreve caracteres para a sequência de saída associada a partir da área de escrita (put area)   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ overflow](<#/doc/io/basic_stringbuf/overflow>)[virtual] |  anexa um caractere à sequência de saída   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ overflow](<#/doc/io/basic_filebuf/overflow>)[virtual] |  escreve caracteres para o arquivo associado a partir da área de escrita (put area)   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ sputc](<#/doc/io/basic_streambuf/sputc>) |  escreve um caractere na área de escrita (put area) e avança o ponteiro seguinte   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ put](<#/doc/io/basic_ostream/put>) |  insere um caractere   
(função membro pública de `std::basic_ostream<CharT,Traits>`)