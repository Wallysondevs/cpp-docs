# std::ostrstream::~ostrstream

virtual ~ostrstream(); | | (obsoleto desde C++98)
(removido em C++26)

Destrói um objeto [std::ostrstream](<#/doc/io/ostrstream>), o que também destrói o membro [std::strstreambuf](<#/doc/io/strstreambuf>), que pode chamar a função de desalocação se o buffer subjacente foi alocado dinamicamente e não foi congelado.

### Parâmetros

(nenhum)

### Observações

Se [str()](<#/doc/io/ostrstream/str>) foi chamado em um `ostrstream` dinâmico e [`freeze(false)`](<#/doc/io/ostrstream/freeze>) não foi chamado depois disso, este destrutor vaza memória.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        {
            std::ostrstream s; // buffer dinâmico
            s << 1.23;
            std::cout << s.str() << '\n';
            s.freeze(false);
        } // destrutor chamado, buffer desalocado
    
        {
            std::ostrstream s;
            s << 1.23;
            std::cout << s.str() << '\n';
    //      buf.freeze(false);
        } // destrutor chamado, memória vazada
    }
```

Saída:
```
    1.23
    1.23
```