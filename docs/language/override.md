# especificador override (desde C++11)

Especifica que uma [função virtual](<#/doc/language/virtual>) sobrescreve outra função virtual.

### Sintaxe

O identificador `override`, se usado, aparece imediatamente após o [declarador](<#/doc/language/function>) na sintaxe de uma declaração de função membro ou de uma definição de função membro dentro de uma definição de classe.

---
declarator virt-specifier-seq ﻿(optional) pure-specifier ﻿(optional) | (1) |
---|---|---
declarator virt-specifier-seq ﻿(optional) function-body | (2) |

1) Em uma declaração de função membro, `override` pode aparecer em virt-specifier-seq imediatamente após o declarador, e antes do [pure-specifier](<#/doc/language/abstract_class>), se usado.

2) Em uma definição de função membro dentro de uma definição de classe, `override` pode aparecer em virt-specifier-seq imediatamente após o declarador e logo antes do function-body.

Em ambos os casos, virt-specifier-seq, se usado, é `override` ou [`final`](<#/doc/language/final>), ou final override ou override final.

### Explicação

Em uma declaração ou definição de função membro, o especificador `override` garante que a função é virtual e está sobrescrevendo uma função virtual de uma classe base. O programa é malformado (um erro em tempo de compilação é gerado) se isso não for verdade.

`override` é um _identificador com um significado especial_ quando usado após declaradores de função membro; não é uma [palavra-chave](<#/doc/keywords>) reservada em outros contextos.

### Palavras-chave

[`override`](<#/doc/identifier_with_special_meaning/override>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    struct A
    {
        virtual void foo();
        void bar();
        virtual ~A();
    };
    
    // member functions definitions of struct A:
    void A::foo() { std::cout << "A::foo();\n"; }
    A::~A() { std::cout << "A::~A();\n"; }
    
    struct B : A
    {
    //  void foo() const override; // Error: B::foo does not override A::foo
                                   // (signature mismatch)
        void foo() override; // OK: B::foo overrides A::foo
    //  void bar() override; // Error: A::bar is not virtual
        ~B() override; // OK: `override` can also be applied to virtual
                       // special member functions, e.g. destructors
        void override(); // OK, member function name, not a reserved keyword
    };
    
    // member functions definitions of struct B:
    void B::foo() { std::cout << "B::foo();\n"; }
    B::~B() { std::cout << "B::~B();\n"; }
    void B::override() { std::cout << "B::override();\n"; }
    
    int main()
    {
        B b;
        b.foo();
        b.override(); // OK, invokes the member function `override()`
        int override{42}; // OK, defines an integer variable
        std::cout << "override: " << override << '\n';
    }
```

Saída:
```
    B::foo();
    B::override();
    override: 42
    B::~B();
    A::~A();
```

### Veja também

[ especificador `final`](<#/doc/language/final>)(C++11) | declara que um método não pode ser sobrescrito