# Palavra-chave C++: or

### Uso
  
  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `||`

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    void show(bool z, const char* s, int n)
    {
        const char* r{z ? " true  " : " false "};
        if (n == 0) std::cout << "┌────────────────┬─────────┐\n";
        if (n <= 2) std::cout << "│ "   <<s<<    " │ "<<r<<" │\n";
        if (n == 2) std::cout << "└────────────────┴─────────┘\n";
    }
     
    int main()
    {
        show(false or false, "false or false", 0);
        show(false or true , "false or true ", 1);
        show(true  or false, "true  or false", 1);
        show(true  or true , "true  or true ", 2);
    }
```

Saída: 
```
    ┌────────────────┬─────────┐
    │ false or false │  false  │
    │ false or true  │  true   │
    │ true  or false │  true   │
    │ true  or true  │  true   │
    └────────────────┴─────────┘
```

### Veja também

  * [`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
