# Palavra-chave C++: and

### Uso

  * [operadores alternativos](<#/doc/language/operator_alternative>): como uma alternativa para `&&`

### Exemplo

Execute este código
```cpp
    int main()
    {
        static_assert((false and false) == false);
        static_assert((false and true)  == false);
        static_assert((true  and false) == false);
        static_assert((true  and true)  == true);
    }
```

### Veja também

  * [`and_eq`](<#/doc/keyword/and_eq>)
  * [`bitand`](<#/doc/keyword/bitand>), [`bitor`](<#/doc/keyword/bitor>)
  * [`not`](<#/doc/keyword/not>), [`not_eq`](<#/doc/keyword/not_eq>)
  * [`or`](<#/doc/keyword/or>), [`or_eq`](<#/doc/keyword/or_eq>)
  * [`xor`](<#/doc/keyword/xor>), [`xor_eq`](<#/doc/keyword/xor_eq>)
