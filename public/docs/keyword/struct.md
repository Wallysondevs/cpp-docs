# Palavra-chave C++: struct

### Uso

  * [declaração de um tipo composto](<#/doc/language/class>)

  * [declaração de um tipo de enumeração com escopo](<#/doc/language/enum>)

| (desde C++11)  
  
  * Se uma função ou uma variável existe no escopo com o nome idêntico ao nome de um tipo de classe que não seja uma union, `struct` pode ser prefixado ao nome para desambiguação, resultando em um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>). 

### Exemplo

Execute este código
```
    struct Foo; // forward declaration of a struct
     
    struct Bar  // definition of a struct
    {
        Bar(int i) : i(i + i) {}
     
        int i;
    };
     
    enum struct Pub // scoped enum, since C++11
    {
        b, d, p, q,
    };
     
    int main()
    {
        Bar Bar(1);
        struct Bar Bar2(2); // elaborated type
    }
```

### Veja também

  * [`class`](<#/doc/keyword/class>), [`union`](<#/doc/keyword/union>)

  * [`final`](<#/doc/identifier_with_special_meaning/final>)

| (desde C++11)  
  
  * [`enum`](<#/doc/keyword/enum>)
