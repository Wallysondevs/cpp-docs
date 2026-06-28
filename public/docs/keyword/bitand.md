# Palavra-chave C++: bitand

### Uso
  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `&`

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
     
    using bin = std::bitset<8>;
     
    void show(bin z, const char* s, int n)
    {
        if (n == 0) std::cout << "┌────────────┬──────────┐\n";
        if (n <= 2) std::cout << "│ " <<s<<  " │ " <<z<<" │\n";
        if (n == 2) std::cout << "└────────────┴──────────┘\n";
    }
     
    int main()
    {
        bin x{"01011010"};  show(x, "x         ", 0);
        bin y{"00111100"};  show(y, "y         ", 1);
        bin z = x bitand y; show(z, "x bitand y", 2);
    }
```

Saída:
```
    ┌────────────┬──────────┐
    │ x          │ 01011010 │
    │ y          │ 00111100 │
    │ x bitand y │ 00011000 │
    └────────────┴──────────┘
```

### Veja também

  * [`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
