# std::any::~any

```cpp
~any();  // (desde C++17)
```

  
Destrói o objeto contido, se houver, como se por uma chamada a [`reset()`](<#/doc/utility/any/reset>). 

### Exemplo

Execute este código
```
    #include <any>
    #include <cstdio>
     
    struct X
    {
        X() { std::puts("X::X()"); }
        X(const X&) { std::puts("X::X(const X&)"); }
        ~X() { std::puts("X::~X()"); }
    };
     
    int main()
    {
        std::any a{X{}};
        std::puts("Leaving main()...");
    }
```

Saída: 
```
    X::X()
    X::X(const X&)
    X::~X()
    Leaving main()...
    X::~X()
```

### Veja também

[ reset](<#/doc/utility/any/reset>) |  destrói o objeto contido   
(função membro pública)  