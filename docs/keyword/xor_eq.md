# Palavra-chave C++: xor_eq

### Uso

  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `^=`

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
        bin x{"01011010"}; show(x, "x         ", 0);
        bin y{"00111100"}; show(y, "y         ", 1);
        x xor_eq y;        show(x, "x xor_eq y", 2);
    }
```

Saída:
```
    ┌────────────┬──────────┐
    │ x          │ 01011010 │
    │ y          │ 00111100 │
    │ x xor_eq y │ 01100110 │
    └────────────┴──────────┘
```

### Ver também

  * [`and`](<#/doc/keyword/and>), [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>)
