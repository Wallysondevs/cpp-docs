# Classe abstrata

Define um tipo abstrato que não pode ser instanciado, mas pode ser usado como uma classe base.

### Sintaxe

Uma função _virtual pura_ é uma [função virtual](<#/doc/language/virtual>) cujo [declarador](<#/doc/language/function>) tem a seguinte sintaxe:

---
declarator virt-specifier ﻿(optional) `=` `0`

Aqui a sequência `= 0` é conhecida como especificador-puro (pure-specifier), e aparece imediatamente após o declarador ou após o virt-specifier opcional ([`override`](<#/doc/language/override>) ou [`final`](<#/doc/language/final>)).

O especificador-puro (pure-specifier) não pode aparecer em uma definição de função membro ou declaração [friend](<#/doc/language/friend>).
```cpp
    struct Base
    {
        virtual int g();
        virtual ~Base() {}
    };
    
    struct A : Base
    {
        // OK: declara três funções membro virtuais, duas delas puras
        virtual int f() = 0, g() override = 0, h();
    
        // OK: destrutor também pode ser puro
        ~A() = 0;
    
        // Erro: especificador-puro em uma definição de função
        virtual int b() = 0 {}
    };
```

Uma _classe abstrata_ é uma classe que define ou herda pelo menos uma função para a qual [o final overrider](<#/doc/language/virtual>) é _virtual puro_.

### Explicação

Classes abstratas são usadas para representar conceitos gerais (por exemplo, Forma, Animal), que podem ser usadas como classes base para classes concretas (por exemplo, Círculo, Cão).

Nenhum objeto de uma classe abstrata pode ser criado (exceto para subobjetos base de uma classe derivada dela) e nenhum membro de dados não estático cujo tipo seja uma classe abstrata pode ser declarado.

Tipos abstratos não podem ser usados como tipos de parâmetro, como tipos de retorno de função, ou como o tipo de uma conversão explícita (note que isso é verificado no ponto de definição e chamada de função, já que no ponto de declaração de função o parâmetro e o tipo de retorno podem estar incompletos).

Ponteiros e referências para uma classe abstrata podem ser declarados.

Execute este código
```cpp
    struct Abstract
    {
        virtual void f() = 0;  // virtual pura
    }; // "Abstract" é abstrata
    
    struct Concrete : Abstract
    {
        void f() override {}   // virtual não pura
        virtual void g();      // virtual não pura
    }; // "Concrete" não é abstrata
    
    struct Abstract2 : Concrete
    {
        void g() override = 0; // overrider virtual puro
    }; // "Abstract2" é abstrata
    
    int main()
    {
        // Abstract a;   // Erro: classe abstrata
        Concrete b;      // OK
        Abstract& a = b; // OK para referenciar base abstrata
        a.f();           // dispatch virtual para Concrete::f()
        // Abstract2 a2; // Erro: classe abstrata (final overrider de g() é puro)
    }
```

A definição de uma função virtual pura pode ser fornecida (e deve ser fornecida se a virtual pura for o [destrutor](<#/doc/language/destructor>)): as funções membro da classe derivada são livres para chamar a função virtual pura da base abstrata usando um id de função qualificado. Esta definição deve ser fornecida fora do corpo da classe (a sintaxe de uma declaração de função não permite tanto o especificador-puro `= 0` quanto um corpo de função).

Fazer uma chamada virtual para uma função virtual pura a partir de um construtor ou do destrutor da classe abstrata é comportamento indefinido (independentemente de ter uma definição ou não).
```cpp
    struct Abstract
    {
        virtual void f() = 0; // virtual pura
        virtual void g() {}   // virtual não pura
    
        ~Abstract()
        {
            g();           // OK: chama Abstract::g()
            // f();        // comportamento indefinido
            Abstract::f(); // OK: chamada não virtual
        }
    };
    
    // definição da função virtual pura
    void Abstract::f()
    {
        std::cout << "A::f()\n";
    }
    
    struct Concrete : Abstract
    {
        void f() override
        {
            Abstract::f(); // OK: chama função virtual pura
        }
    
        void g() override {}
    
        ~Concrete()
        {
            g(); // OK: chama Concrete::g()
            f(); // OK: chama Concrete::f()
        }
    };
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 390](<https://cplusplus.github.io/CWG/issues/390.html>) | C++98 | um destrutor virtual puro indefinido poderia ser chamado | uma definição é necessária neste caso
[CWG 2153](<https://cplusplus.github.io/CWG/issues/2153.html>) | C++98 | o especificador-puro (pure-specifier) poderia aparecer em declarações friend | proibido

### Veja também

*   [`virtual`](<#/doc/language/virtual>)
