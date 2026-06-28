# std::strstream::pcount

int pcount() const; |  |  (obsoleto em C++98)   
(removido em C++26)  

  
Retorna o número de caracteres que foram enviados para a área de escrita (put area) do [std::strstreambuf](<#/doc/io/strstreambuf>) associado. Efetivamente chama rdbuf()->pcount(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de caracteres na área de escrita (put area), ou zero se nada foi enviado. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <strstream>
     
    int main()
    {
        std::strstream dyn; // dynamically-allocated output buffer
        dyn << "Test: " << 1.23 << std::ends;
        std::cout << "The size of the output is " << dyn.pcount()
                  << " and it holds \"" << dyn.str() << "\"\n";
        dyn.freeze(false);
     
        char buf[10];
        std::strstream user(buf, 10); // user-provided output buffer
        user << 1.23; // note: no std::ends
        std::cout.write(buf, user.pcount());
        std::cout << '\n';
    }
```

Saída: 
```
    The size of the output is 11 and it holds "Test: 1.23"
    1.23
```

### Veja também

[ pcount](<#/doc/io/strstreambuf/pcount>) | retorna o ponteiro seguinte menos o ponteiro inicial na sequência de saída: o número de caracteres escritos   
(função membro pública de `std::strstreambuf`)  