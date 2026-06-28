# Palavra-chave C++: compl

### Uso

  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `~`

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
    
    using bin = std::bitset<8>;
    
    void show(bin z, const char* s, int n)
    {
        if (n == 0) std::cout << "┌─────────┬──────────┐\n";
        if (n <= 2) std::cout << "│ "<<s<<" │ " <<z<<" │\n";
        if (n == 2) std::cout << "└─────────┴──────────┘\n";
    }
    
    struct A
    {
        compl A() { std::cout << "A dtor\n"; }
    };
    
    int main()
    {
        bin x{"01011010"}; show(x, "x      ", 0);
        bin z = compl x;   show(z, "compl x", 2);
        A a;
    }
```

Saída:
```
    ┌─────────┬──────────┐
    │ x       │ 01011010 │
    │ compl x │ 10100101 │
    └─────────┴──────────┘
    A dtor
```

### Veja também

  * [`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
