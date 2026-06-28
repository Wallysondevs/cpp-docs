# std::strstreambuf::~strstreambuf

virtual ~strstreambuf(); | | (obsoleto desde C++98)
(removido em C++26)

Destrói um objeto `std::strstreambuf`. Se o objeto estiver gerenciando um buffer alocado dinamicamente (o estado do buffer é "alocado") e se o objeto não estiver congelado, então desaloca o buffer usando a função de desalocação fornecida na construção ou delete[] se nenhuma foi fornecida.

### Parâmetros

(nenhum)

### Observações

Este destrutor é tipicamente chamado pelo destrutor de [std::strstream](<#/doc/io/strstream>).

Se [str()](<#/doc/io/strstreambuf/str>) foi chamado em um `strstream` dinâmico e [`freeze(false)`](<#/doc/io/strstreambuf/freeze>) não foi chamado depois disso, este destrutor causa vazamento de memória.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <strstream>
    
    void* my_alloc(size_t n)
    {
        std::cout << "my_alloc(" << n << ") called\n";
        return new char[n];
    }
    
    void my_free(void* p)
    {
        std::cout << "my_free() called\n";
        delete[] (char*)p;
    }
    
    int main()
    {
        {
            std::strstreambuf buf(my_alloc, my_free);
            std::ostream s(&buf);
            s << 1.23 << std::ends;
            std::cout << buf.str() << '\n';
            buf.freeze(false);
        } // destructor called here, buffer deallocated
    
        {
            std::strstreambuf buf(my_alloc, my_free);
            std::ostream s(&buf);
            s << 1.23 << std::ends;
            std::cout << buf.str() << '\n';
    //      buf.freeze(false);
        } // destructor called here, memory leak!
    }
```

Saída:
```
    my_alloc(4096) called
    1.23
    my_free() called
    my_alloc(4096) called
    1.23
```