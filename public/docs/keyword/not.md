# Palavra-chave C++: not

### Uso

  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `!`

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    void show(bool z, const char* s, int n)
    {
        const char* r{z ? " true  " : " false "};
        if (n == 0) std::cout << "┌───────────┬─────────┐\n";
        if (n <= 1) std::cout << "│ " <<s<< " │ "<<r<<" │\n";
        if (n == 1) std::cout << "└───────────┴─────────┘\n";
    }
     
    int main()
    {
        show(not true , "not true ", 0);
        show(not false, "not false", 1);
    }
```

Saída: 
```
    ┌───────────┬─────────┐
    │ not true  │  false  │
    │ not false │  true   │
    └───────────┴─────────┘
```

### Veja também

  * [`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
