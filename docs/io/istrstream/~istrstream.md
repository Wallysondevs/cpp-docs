# std::istrstream::~istrstream

virtual ~istrstream(); | | (obsoleto desde C++98)
(removido em C++26)

Destrói um objeto `std::istrstream`, o que também destrói o membro [std::strstreambuf](<#/doc/io/strstreambuf>).

### Parâmetros

(nenhum)

### Observações

Os construtores de [std::istrstream](<#/doc/io/istrstream>) não criam o [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente em modo de alocação dinâmica, portanto, os vazamentos de memória que são possíveis com [std::ostrstream::~ostrstream](<#/doc/io/ostrstream/~ostrstream>) ou [std::strstream::~strstream](<#/doc/io/strstream/~strstream>) não se aplicam.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <strstream>
     
    int main()
    {
        {
            std::istrstream s("1.234");
            double d;
            s >> d;
            std::cout << d << '\n';
        } // destrutor chamado
    }
```

Saída:
```
    1.234
```