# std::istrstream::istrstream

explicit istrstream( const char* s ); | (1) | (obsoleto em C++98)
(removido em C++26)
explicit istrstream( char* s ); | (2) | (obsoleto em C++98)
(removido em C++26)
istrstream( const char* s, [std::streamsize](<#/doc/io/streamsize>) n ); | (3) | (obsoleto em C++98)
(removido em C++26)
istrstream( char* s, [std::streamsize](<#/doc/io/streamsize>) n ); | (4) | (obsoleto em C++98)
(removido em C++26)

Constrói um novo [std::istrstream](<#/doc/io/istrstream>) e seu [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente.

1,2) Constrói o [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente chamando strstreambuf(s, 0) e inicializa a classe base com o endereço do `strstreambuf`. O comportamento é indefinido se s não estiver apontando para um elemento de um array terminado em nulo.

3,4) Constrói o [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente chamando strstreambuf(s, n) e inicializa a classe base com o endereço do `strstreambuf`. O comportamento é indefinido se s não estiver apontando para um elemento de um array cujo comprimento seja de pelo menos n elementos.

### Parâmetros

- **s** — C-string ou array de char para usar como conteúdo do stream
- **n** — tamanho do array

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::istrstream s1("1 2 3"); // string literal
        int n1, n2, n3;
        if (s1 >> n1 >> n2 >> n3)
            std::cout << n1 << ", " << n2 << ", " << n3 << '\n';
    
        char arr[] = {'4', ' ', '5', ' ', '6'};
        std::istrstream s2(arr, sizeof arr);
        if (s2 >> n1 >> n2 >> n3)
            std::cout << n1 << ", " << n2 << ", " << n3 << '\n';
    }
```

Saída:
```
    1, 2, 3
    4, 5, 6
```

### Veja também

[ (constructor)](<#/doc/io/strstreambuf/strstreambuf>) | constrói um objeto `strstreambuf`
(função membro pública de `std::strstreambuf`)
[ (constructor)](<#/doc/io/ostrstream/ostrstream>) | constrói um objeto `ostrstream`, opcionalmente alocando o buffer
(função membro pública de `std::ostrstream`)
[ (constructor)](<#/doc/io/strstream/strstream>) | constrói um objeto `strstream`, opcionalmente alocando o buffer
(função membro pública de `std::strstream`)