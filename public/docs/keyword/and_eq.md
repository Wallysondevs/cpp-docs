# Palavra-chave C++: and_eq

### Uso

  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `&=`

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        std::bitset<4> mask("1100");
        std::bitset<4> val("0111");
        val and_eq mask;
        std::cout << val << '\n';
    }
```

Saída:
```
    0100
```

### Veja também

  * [`and`](<#/doc/keyword/and>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
