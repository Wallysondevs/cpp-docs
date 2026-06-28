# Palavra-chave C++: alignas (desde C++11)

### Uso
  
  * [`alignas` especificador](<#/doc/language/alignas>)

### Exemplo
```cpp
    struct s1 final {};
    struct alignas(2) s2 final {};
    
    static_assert(alignof(s1) == 1);
    static_assert(alignof(s2) == 2);
```

### Ver também

  * [`alignof`](<#/doc/keyword/alignof>)
