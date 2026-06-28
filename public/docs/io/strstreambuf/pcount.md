# std::strstreambuf::pcount

int pcount() const; |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Retorna o número de caracteres escritos na sequência de saída. 

Se o próximo ponteiro para a área de escrita ([std::streambuf::pptr()](<#/doc/io/basic_streambuf/pptr>)) for um ponteiro nulo, retorna zero. 

Caso contrário, retorna o próximo ponteiro na área de escrita menos o ponteiro inicial na área de escrita, ou seja, pptr() - pbase(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de caracteres escritos na área de escrita. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::strstream dyn; // dynamically-allocated output buffer
        dyn << "Test: " << 1.23 << std::ends;
        std::strstreambuf* buf = dyn.rdbuf();
        std::cout << "The size of the output is "
                  << buf->pcount() // or just buf.pcount()
                  << " and it holds \"" << dyn.str() << "\"\n";
        dyn.freeze(false); // after calling .str() on a dynamic strstream
    
        char arr[10];
        std::ostrstream user(arr, 10); // user-provided output buffer
        buf = user.rdbuf();
        user << 1.23; // note: no std::ends
        std::cout.write(arr, buf->pcount()); // or just user.pcount()
        std::cout << '\n';
    
        std::istrstream lit("1 2 3"); // read-only fixed-size buffer
        buf = lit.rdbuf();
        // istrstream has no member pcount(), so lit.pcount() won't work
        std::cout << "Input-only pcount() = " << buf->pcount() << '\n';
    }
```

Saída: 
```
    The size of the output is 11 and it holds "Test: 1.23"
    1.23
    Input-only pcount() = 0
```

### Veja também

[ pcount](<#/doc/io/strstream/pcount>) |  obtém o número de caracteres escritos   
(função membro pública de `std::strstream`)  
[ pcount](<#/doc/io/ostrstream/pcount>) |  obtém o número de caracteres escritos   
(função membro pública de `std::ostrstream`)