# std::ostrstream::freeze

void freeze( bool flag = true ); |  |  (obsoleto em C++98)
(removido em C++26)

Se o stream estiver usando um array alocado dinamicamente para saída, desabilita (`flag == true`) ou habilita (`flag == false`) a alocação/desalocação automática do buffer. Efetivamente chama `rdbuf()->freeze(flag)`.

### Notas

Após uma chamada para [str()](<#/doc/io/ostrstream/str>), streams dinâmicos são congelados automaticamente. Uma chamada para `freeze(false)` é necessária antes de sair do escopo no qual este objeto `ostrstream` foi criado, caso contrário o destrutor vazará memória. Além disso, saída adicional para um stream congelado pode ser truncada assim que atingir o final do buffer alocado.

### Parâmetros

flag  |  \-  |  status desejado

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::ostrstream dyn; // dynamically-allocated output buffer
        dyn << "Test: " << 1.23; // note: no std::ends to demonstrate appending
        std::cout << "The output stream contains \"";
        std::cout.write(dyn.str(), dyn.pcount()) << "\"\n";
        // the stream is now frozen due to str()
        dyn << " More text"; // output to a frozen stream may be truncated
        std::cout << "The output stream contains \"";
        std::cout.write(dyn.str(), dyn.pcount()) << "\"\n";
        dyn.freeze(false); // freeze(false) must be called or the  destructor will leak
    
        std::ostrstream dyn2; // dynamically-allocated output buffer
        dyn2 << "Test: " << 1.23; // note: no std::ends
        std::cout << "The output stream contains \"";
        std::cout.write(dyn2.str(), dyn2.pcount()) << "\"\n";
        dyn2.freeze(false);   // unfreeze the stream after str()
        dyn2 << " More text" << std::ends; // output will not be truncated (buffer grows)
        std::cout << "The output stream contains \"" << dyn2.str() << "\"\n";
        dyn2.freeze(false); // freeze(false) must be called or the  destructor will leak 
    }
```

Saída possível:
```
    The output stream contains "Test: 1.23"
    The output stream contains "Test: 1.23 More "
    The output stream contains "Test: 1.23"
    The output stream contains "Test: 1.23 More text"
```

### Veja também

[ freeze](<#/doc/io/strstreambuf/freeze>) |  define/limpa o estado congelado do buffer
(função membro pública de `std::strstreambuf`)