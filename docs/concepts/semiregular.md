# std::semiregular

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept semiregular = std::copyable<T> && std::default_initializable<T>;
```

O concept `semiregular` especifica que um tipo é tanto copiável quanto construtível por padrão. Ele é satisfeito por tipos que se comportam de forma semelhante a tipos embutidos como int, exceto que eles não precisam suportar comparação com `==`.

### Exemplo

Execute este código
```cpp
    #include <concepts>
    #include <iostream>
    
    template<std::semiregular T>
    // Credit Alexander Stepanov
    // concepts are requirements on T
    // Requirement on T: T is semiregular
    // T a(b); or T a = b; => copy constructor
    // T a; => default constructor
    // a = b; => assignment
    struct Single
    {
        T value;
        // A inicialização por agregação para Single se comporta como o seguinte construtor:
        // explicit Single(const T& x) : value(x) {}
    
        // Funções membro especiais declaradas implicitamente se comportam como as seguintes definições,
        // exceto que elas podem ter propriedades adicionais:
        // Single(const Single& x) : value(x.value) {}
        // Single() {}
        // ~Single() {}
        // Single& operator=(const Single& x) { value = x.value; return *this; }
        // o operador de comparação não é definido; não é exigido pelo concept `semiregular`
        // bool operator==(Single const& other) const = delete;
    };
    
    void print(std::semiregular auto x)
    {
        std::cout << x.value << '\n';
    }
    
    int main()
    {
        Single<int> myInt1{4};      // inicialização por agregação: myInt1.value = 4
        Single<int> myInt2(myInt1); // construtor de cópia
        Single<int> myInt3;         // construtor padrão
        myInt3 = myInt2;            // operador de atribuição de cópia
    //  myInt1 == myInt2;           // Erro: operator== não está definido
    
        print(myInt1); // ok: Single<int> é um tipo `semiregular`
        print(myInt2);
        print(myInt3);
    
    }   // Variáveis Single<int> são destruídas aqui
```

Saída:
```
    4
    4
    4
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.6 Conceitos de objeto [concepts.object]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.6 Conceitos de objeto [concepts.object]

### Veja também

[ regular](<#/doc/concepts/regular>)(C++20) | especifica que um tipo é regular, ou seja, é tanto `semiregular` quanto [`equality_comparable`](<#/doc/concepts/equality_comparable>)
(concept)