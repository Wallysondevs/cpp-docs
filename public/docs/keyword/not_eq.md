# Palavra-chave C++: not_eq

### Uso

  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `!=`

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    void show(bool z, const char* s, int n)
    {
        const char* r { z ? " true  " : " false " };
        if (n == 0) std::cout << "┌────────────────────┬─────────┐\n";
        if (n <= 2) std::cout << "│ "      <<s<<     " │ "<<r<<" │\n";
        if (n == 2) std::cout << "└────────────────────┴─────────┘\n";
    }
     
    int main()
    {
        show(false not_eq false, "false not_eq false", 0);
        show(false not_eq true , "false not_eq true ", 1);
        show(true  not_eq false, "true  not_eq false", 1);
        show(true  not_eq true , "true  not_eq true ", 2);
    }
```

Saída:
```
    ┌────────────────────┬─────────┐
    │ false not_eq false │  false  │
    │ false not_eq true  │  true   │
    │ true  not_eq false │  true   │
    │ true  not_eq true  │  false  │
    └────────────────────┴─────────┘
```

### Veja também

  * [`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
