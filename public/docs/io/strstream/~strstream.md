# std::strstream::~strstream

virtual ~strstream(); | | (obsoleto em C++98)
(removido em C++26)

Destrói um objeto `std::strstream`, o que também destrói o membro [std::strstreambuf](<#/doc/io/strstreambuf>), que pode chamar a função de desalocação se o buffer subjacente foi alocado dinamicamente e não estava congelado.

### Parâmetros

(nenhum)

### Observações

Se [str()](<#/doc/io/strstream/str>) foi chamado em um `strstream` dinâmico e [`freeze(false)`](<#/doc/io/strstream/freeze>) não foi chamado depois disso, este destrutor vaza memória.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        {
            std::ostrstream s; // buffer dinâmico 
            s << 1.23 << std::ends;
            std::cout << s.str() << '\n';
            s.freeze(false);
        } // destrutor chamado, buffer desalocado 
    
        {
            std::ostrstream s;
            s << 1.23 << std::ends;
            std::cout << s.str() << '\n';
    //      buf.freeze(false);
        } // destrutor chamado, memória vazada
    
        {
            std::istrstream s("1.23"); // buffer constante
            double d;
            s >> d;
            std::cout << d << '\n';
        } // destrutor chamado, nada a desalocar
    }
```

Saída:
```
    1.23
    1.23
    1.23
```