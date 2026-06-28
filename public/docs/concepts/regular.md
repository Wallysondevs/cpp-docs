# std::regular

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept regular = std::semiregular<T> && std::equality_comparable<T>;
```

O concept `regular` especifica que um tipo é _regular_, ou seja, é copiável, construível por padrão (default constructible) e comparável por igualdade. Ele é satisfeito por tipos que se comportam de forma semelhante a tipos embutidos como int, e que são comparáveis com `==`.

### Exemplo

Execute este código
```
    #include <concepts>
    #include <iostream>
    
    template<std::regular T>
    struct Single
    {
        T value;
        friend bool operator==(const Single&, const Single&) = default;
    };
    
    int main()
    {
        Single<int> myInt1{4};
        Single<int> myInt2;
        myInt2 = myInt1;
    
        if (myInt1 == myInt2)
            std::cout << "Equal\n";
    
        std::cout << myInt1.value << ' ' << myInt2.value << '\n';
    }
```

Saída:
```
    Equal
    4 4
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.6 Object concepts [concepts.object]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.6 Object concepts [concepts.object]

### Veja também

[ semiregular](<#/doc/concepts/semiregular>)(C++20) | especifica que um objeto de um tipo pode ser copiado, movido, trocado (swapped) e construído por padrão (default constructed)
(concept)