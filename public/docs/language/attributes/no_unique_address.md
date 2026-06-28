# Atributo C++: no_unique_address (desde C++20)

Permite que este membro de dados seja sobreposto com outros membros de dados não estáticos ou subobjetos de classe base de sua classe.

### Sintaxe

---
`[[no_unique_address]]`
---

### Explicação

Aplica-se ao nome que está sendo declarado na declaração de um membro de dados não estático que não é um bit-field.

Torna este subobjeto membro [potencialmente sobreposto](<#/doc/language/objects>), ou seja, permite que este membro seja sobreposto com outros membros de dados não estáticos ou subobjetos de classe base de sua classe. Isso significa que, se o membro tiver um tipo de classe vazia (por exemplo, um alocador sem estado), o compilador pode otimizá-lo para não ocupar espaço, assim como se fosse uma [base vazia](<#/doc/language/ebo>). Se o membro não for vazio, qualquer preenchimento de cauda nele também pode ser reutilizado para armazenar outros membros de dados.

### Notas

[[no_unique_address]] é ignorado pelo MSVC mesmo no modo C++20; em vez disso, [[msvc::no_unique_address]] é fornecido.

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    struct Empty {}; // classe vazia
     
    struct X
    {
        int i;
        Empty e;
    };
     
    struct Y
    {
        int i;
        [[no_unique_address]] Empty e;
    };
     
    struct Z
    {
        char c;
        [[no_unique_address]] Empty e1, e2;
    };
     
    struct W
    {
        char c[2];
        [[no_unique_address]] Empty e1, e2;
    };
     
    int main()
    {
        // o tamanho de qualquer objeto de tipo de classe vazia é de pelo menos 1
        static_assert(sizeof(Empty) >= 1);
     
        // pelo menos mais um byte é necessário para dar a e um endereço único
        static_assert(sizeof(X) >= sizeof(int) + 1);
     
        // membro vazio otimizado
        std::cout << "sizeof(Y) == sizeof(int) is " << std::boolalpha 
                  << (sizeof(Y) == sizeof(int)) << '\n';
     
        // e1 e e2 não podem compartilhar o mesmo endereço porque têm o
        // mesmo tipo, mesmo que estejam marcados com [[no_unique_address]]. 
        // No entanto, qualquer um deles pode compartilhar o endereço com c.
        static_assert(sizeof(Z) >= 2);
     
        // e1 e e2 não podem ter o mesmo endereço, mas um deles pode compartilhar com
        // c[0] e o outro com c[1]
        std::cout << "sizeof(W) == 2 is " << (sizeof(W) == 2) << '\n';
    }
```

Saída possível:
```
    sizeof(Y) == sizeof(int) is true
    sizeof(W) == 2 is true
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 9.12.11 Atributo sem endereço único [dcl.attr.nouniqueaddr] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 9.12.10 Atributo sem endereço único [dcl.attr.nouniqueaddr] 
