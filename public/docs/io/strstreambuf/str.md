# std::strstreambuf::str

char* str(); | | (obsoleto em C++98)
(removido em C++26)

Chama [freeze()](<#/doc/io/strstreambuf/freeze>), então retorna uma cópia do ponteiro inicial da área de leitura (get area), [std::streambuf::eback()](<#/doc/io/basic_streambuf/gptr>).

O início da área de leitura (get area), para todos os objetos `std::strstreambuf` graváveis construídos através da interface fornecida por [std::strstream](<#/doc/io/strstream>), é também o início da área de escrita (put area).

### Parâmetros

(nenhum)

### Valor de retorno

Uma cópia de [eback()](<#/doc/io/basic_streambuf/gptr>), que pode ser um ponteiro nulo.

### Observações

Esta função é tipicamente chamada através da interface [std::strstream](<#/doc/io/strstream>).

A chamada para [freeze()](<#/doc/io/strstreambuf/freeze>) garante que o ponteiro retornado permanece válido até a próxima chamada explícita para [freeze](<#/doc/io/strstreambuf/freeze>)(false): caso contrário (em um buffer dinâmico), qualquer operação de saída poderia acionar a realocação do buffer, o que invalidaria o ponteiro. Isso também causa um vazamento de memória no destrutor de `std::strstreambuf`, a menos que freeze(false) seja chamado antes que o buffer (ou, mais comumente, o [std::strstream](<#/doc/io/strstream>) que o gerencia) seja destruído.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::strstream dyn; // dynamically-allocated read/write buffer
        dyn << "Test: " << 1.23 << std::ends;
        std::strstreambuf* buf = dyn.rdbuf();
        std::cout << "R/W buffer holds [" << buf->str() // or dyn.str()
                  << "]\n";
        dyn.freeze(false); // after calling .str() on a dynamic strstream
    
        char arr[10];
        std::ostrstream user(arr, 10); // fixed-size write-only buffer
        buf = user.rdbuf();
        user << 1.23 << std::ends;
        std::cout << "Write-only buffer holds [" << buf->str() // or user.str()
                  << "]\n";
    
        std::istrstream lit("1 2 3"); // fixed-size read-only buffer
        buf = lit.rdbuf();
        std::cout << "Read-only buffer holds [" << buf->str() // or lit.str()
                  << "]\n";
    }
```

Saída:
```
    R/W buffer holds [Test: 1.23]
    Write-only buffer holds [1.23]
    Read-only buffer holds [1 2 31 2 3]
```

### Veja também

[ str](<#/doc/io/strstream/str>) | acessa o buffer de saída
(função membro pública de `std::strstream`)
[ str](<#/doc/io/ostrstream/str>) | acessa o buffer de saída
(função membro pública de `std::ostrstream`)
[ str](<#/doc/io/istrstream/str>) | acessa o buffer de saída
(função membro pública de `std::istrstream`)