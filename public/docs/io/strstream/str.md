# std::strstream::str

char* str(); | | (obsoleto desde C++98)
(removido em C++26)

Retorna o ponteiro para o início do buffer, após congelá-lo. Efetivamente chama rdbuf()->str().

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o início do buffer no [std::strstreambuf](<#/doc/io/strstreambuf>) associado ou um ponteiro nulo se nenhum buffer estiver disponível.

### Observações

Antes de uma chamada a `str()` que usa o resultado como uma string C, o buffer do stream deve ser terminado em nulo. Saídas regulares, como com stream << 1.2, não armazenam um terminador nulo; ele deve ser anexado explicitamente, tipicamente com o manipulador [std::ends](<#/doc/io/manip/ends>).

Após uma chamada a `str()`, streams dinâmicos tornam-se congelados. Uma chamada a [`freeze(false)`](<#/doc/io/strstream/freeze>) é necessária antes de sair do escopo no qual este objeto strstream foi criado, caso contrário, o destrutor vazará memória. Além disso, saída adicional para um stream congelado pode ser truncada assim que atingir o final do buffer alocado, o que pode deixar o buffer não terminado em nulo.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::strstream dyn; // dynamically-allocated output buffer
        dyn << "Test: " << 1.23; // not adding std::ends to demonstrate append behavior
        std::cout << "The output stream holds \"";
        std::cout.write(dyn.str(), dyn.pcount()) << "\"\n"; 
        // the stream is now frozen due to str()
        dyn << " More text" << std::ends;
        std::cout << "The output stream holds \"";
        std::cout.write(dyn.str(), dyn.pcount()) << "\"\n";
        dyn.freeze(false);
    }
```

Saída possível:
```
    The stream holds "Test: 1.23"
    The stream holds "Test: 1.23 More "
```

### Veja também

[ str](<#/doc/io/strstreambuf/str>) | marca o buffer como congelado e retorna o ponteiro inicial da sequência de entrada
(função membro pública de `std::strstreambuf`)