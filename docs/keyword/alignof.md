# Palavra-chave C++: alignof (desde C++11)

### Uso

  * [`alignof` operator](<#/doc/language/alignof>)

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
     
    int main()
    {
        std::cout << alignof(std::max_align_t) << '\n';
    }
```

Saída possível:
```
    16
```

### Veja também

  * [`alignas`](<#/doc/keyword/alignas>)
