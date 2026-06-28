# std::span&lt;T,Extent&gt;::data

```cpp
constexpr pointer data() const noexcept;  // (desde C++20)
```

  
Retorna um ponteiro para o início da sequência. 

### Valor de retorno

Um ponteiro para o início da sequência. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <span>
     
    int main()
    {
        constexpr char str[] = "ABCDEF\n";
     
        const std::span sp{str};
     
        for (auto n{sp.size()}; n != 2; --n)
            std::cout << sp.last(n).data();
    }
```

Saída: 
```
    ABCDEF
    BCDEF
    CDEF
    DEF
    EF
    F
```

### Veja também

[ (construtor)](<#/doc/container/span/span>) |  constrói um `span`   
(função membro pública)  