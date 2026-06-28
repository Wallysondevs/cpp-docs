# Especificadores de acesso

Em uma especificação de membro de uma [classe/struct](<#/doc/language/class>) ou [union](<#/doc/language/union>), definem a acessibilidade dos membros subsequentes.

Em um especificador de base de uma declaração de [classe derivada](<#/doc/language/derived_class>), definem a acessibilidade dos membros herdados da classe base subsequente.

### Sintaxe

---
```cpp
`public` `:` member-declarations  // (1)
`protected` `:` member-declarations  // (2)
`private` `:` member-declarations  // (3)
public base-class  // (4)
protected base-class  // (5)
private base-class  // (6)
```

1) Os membros declarados após o especificador de acesso têm acesso de membro público.

2) Os membros declarados após o especificador de acesso têm acesso de membro protegido.

3) Os membros declarados após o especificador de acesso têm acesso de membro privado.

4) [Herança pública](<#/doc/language/derived_class>): os membros públicos e protegidos da [classe base](<#/doc/language/derived_class>) listada após o especificador de acesso mantêm seu acesso de membro na classe derivada.

5) [Herança protegida](<#/doc/language/derived_class>): os membros públicos e protegidos da [classe base](<#/doc/language/derived_class>) listada após o especificador de acesso são membros protegidos da classe derivada.

6) [Herança privada](<#/doc/language/derived_class>): os membros públicos e protegidos da [classe base](<#/doc/language/derived_class>) listada após o especificador de acesso são membros privados da classe derivada.

Os membros privados da classe base são sempre inacessíveis à classe derivada, independentemente de herança pública, protegida ou privada.

### Explicação

O nome de cada membro de [classe](<#/doc/language/class>) (estático, não estático, função, tipo, etc.) tem um "acesso de membro" associado. Quando um nome de membro é usado em qualquer lugar de um programa, seu acesso é verificado e, se não satisfizer as regras de acesso, o programa não compila:

Execute este código
```cpp
    #include <iostream>
     
    class Example
    {
    public:             // all declarations after this point are public
        void add(int x) // member "add" has public access
        {
            n += x;     // OK: private Example::n can be accessed from Example::add
        }
    private:            // all declarations after this point are private
        int n = 0;      // member "n" has private access
    };
     
    int main()
    {
        Example e;
        e.add(1); // OK: public Example::add can be accessed from main
    //  e.n = 7;  // error: private Example::n cannot be accessed from main
    }
```

Os especificadores de acesso dão ao autor da classe a capacidade de decidir quais membros da classe são acessíveis aos usuários da classe (ou seja, a _interface_) e quais membros são para uso interno da classe (a _implementação_).

### Em detalhe

Todos os membros de uma classe (corpos de [funções membro](<#/doc/language/member_functions>), inicializadores de objetos membro e todas as [definições de classes aninhadas](<#/doc/language/nested_classes>)) têm acesso a todos os nomes que a classe pode acessar. Uma classe local dentro de uma função membro tem acesso a todos os nomes que a função membro pode acessar.

Uma classe definida com a palavra-chave `class` tem acesso privado para seus membros e suas classes base por padrão. Uma classe definida com a palavra-chave `struct` tem acesso público para seus membros e suas classes base por padrão. Uma [union](<#/doc/language/union>) tem acesso público para seus membros por padrão.

Para conceder acesso a funções ou classes adicionais a membros protegidos ou privados, uma [declaração de amizade](<#/doc/language/friend>) pode ser usada.

A acessibilidade se aplica a todos os nomes, independentemente de sua origem, então um nome introduzido por um [typedef](<#/doc/language/typedef>) ou [declarações using](<#/doc/language/using_declaration>) (exceto construtores de herança) é verificado, não o nome ao qual ele se refere:
```cpp
    class A : X
    {
        class B {};   // B is private in A
    public:
        typedef B BB; // BB is public
    };
     
    void f()
    {
        A::B y;  // error: A::B is private
        A::BB x; // OK: A::BB is public
    }
```

O acesso de membro não afeta a visibilidade: nomes de membros privados e herdados privadamente são visíveis e considerados pela resolução de sobrecarga, conversões implícitas para classes base inacessíveis ainda são consideradas, etc. A verificação de acesso de membro é a última etapa após a interpretação de qualquer construção de linguagem. A intenção desta regra é que substituir qualquer `private` por `public` nunca altera o comportamento do programa.

A verificação de acesso para os nomes usados em [argumentos de função padrão](<#/doc/language/default_arguments>), bem como nos [parâmetros de template](<#/doc/language/template_parameters>) padrão, é realizada no ponto de declaração, não no ponto de uso.

As regras de acesso para os nomes de [funções virtuais](<#/doc/language/virtual>) são verificadas no ponto de chamada usando o tipo da expressão usada para denotar o objeto para o qual a função membro é chamada. O acesso do overrider final é ignorado:
```cpp
    struct B
    {
        virtual int f(); // f is public in B
    };
     
    class D : public B
    {
    private:
        int f(); // f is private in D
    };
     
    void f()
    {
        D d;
        B& b = d;
     
        b.f(); // OK: B::f is public, D::f is invoked even though it's private
        d.f(); // error: D::f is private
    }
```

Um nome que é privado de acordo com a [pesquisa de nome](<#/doc/language/lookup>) não qualificada, pode ser acessível através da pesquisa de nome qualificada:
```cpp
    class A {};
     
    class B : private A {};
     
    class C : public B
    {
        A* p;   // error: unqualified name lookup finds A as the private base of B
        ::A* q; // OK: qualified name lookup finds the namespace-level declaration
    };
```

Um nome que é acessível através de múltiplos caminhos no grafo de herança tem o acesso do caminho com o maior acesso:
```cpp
    class W
    {
    public:
        void f();
    };
     
    class A : private virtual W {};
     
    class B : public virtual W {};
     
    class C : public A, public B
    {
        void f()
        {
            W::f(); // OK: W is accessible to C through B
        }
    };
```

Qualquer número de especificadores de acesso pode aparecer dentro de uma classe, em qualquer ordem.

Especificadores de acesso de membro podem afetar o [layout da classe](<#/doc/language/data_members>): os endereços de membros de dados não estáticos são garantidos para aumentar em ordem de declaração apenas para os membros não separados por um especificador de acesso (até C++11) com o mesmo acesso (desde C++11). | (até C++23)
---|---
Para [tipos de layout padrão](<#/doc/named_req/StandardLayoutType>), todos os membros de dados não estáticos devem ter o mesmo acesso. | (desde C++11)

Quando um membro é redeclarado dentro da mesma classe, ele deve fazê-lo sob o mesmo acesso de membro:
```cpp
    struct S
    {
        class A;    // S::A is public
    private:
        class A {}; // error: cannot change access
    };
```

### Acesso de membro público

Membros públicos formam parte da interface pública de uma classe (outras partes da interface pública são as funções não-membro encontradas por [ADL](<#/doc/language/adl>)).

Um membro público de uma classe é acessível em qualquer lugar:
```cpp
    class S
    {
    public:
        // n, E, A, B, C, U, f are public members
        int n;
        enum E {A, B, C};
        struct U {};
        static void f() {}
    };
     
    int main()
    {
        S::f();     // S::f is accessible in main
     
        S s;
        s.n = S::B; // S::n and S::B are accessible in main
     
        S::U x;     // S::U is accessible in main
    }
```

### Acesso de membro protegido

Membros protegidos formam a interface de uma classe para suas classes derivadas (o que é distinto da interface pública da classe).

Um membro protegido de uma classe é acessível apenas

1) aos membros e amigos dessa classe;

2) aos membros e amigos de qualquer classe derivada dessa classe, mas apenas quando a classe do objeto através do qual o membro protegido é acessado é essa classe derivada ou uma classe derivada dessa classe derivada:
```cpp
    struct Base
    {
    protected:
        int i;
    private:
        void g(Base& b, struct Derived& d);
    };
     
    struct Derived : Base
    {
        friend void h(Base& b, Derived& d);
        void f(Base& b, Derived& d) // member function of a derived class
        {
            ++d.i;                  // OK: the type of d is Derived
            ++i;                    // OK: the type of the implied '*this' is Derived
    //      ++b.i;                  // error: can't access a protected member through
                                    // Base (otherwise it would be possible to change
                                    // other derived classes, like a hypothetical
                                    // Derived2, base implementation)
        }
    };
     
    void Base::g(Base& b, Derived& d) // member function of Base
    {
        ++i;                          // OK
        ++b.i;                        // OK
        ++d.i;                        // OK
    }
     
    void h(Base& b, Derived& d) // Friend of Derived
    {
        ++d.i;                  // OK: friend of Derived can access a protected 
                                // member through an object of Derived
    //  ++b.i;                  // error: friend of Derived is not a friend of Base
    }
     
    void x(Base& b, Derived& d) // non-member non-friend
    {
    //  ++b.i;                  // error: no access from non-member
    //  ++d.i;                  // error: no access from non-member
    }
```

Quando um ponteiro para um membro protegido é formado, ele deve usar uma classe derivada em sua declaração:
```cpp
    struct Base
    {
    protected:
        int i;
    };
     
    struct Derived : Base
    {
        void f()
        {
    //      int Base::* ptr = &Base::i;    // error: must name using Derived
            int Base::* ptr = &Derived::i; // OK
        }
    };
```

### Acesso de membro privado

Membros privados formam a implementação de uma classe, bem como a interface privada para os outros membros da classe.

Um membro privado de uma classe é acessível apenas aos membros e amigos dessa classe, independentemente de os membros estarem na mesma instância ou em instâncias diferentes:
```cpp
    class S
    {
    private:
        int n; // S::n is private
    public:
        S() : n(10) {}                    // this->n is accessible in S::S
        S(const S& other) : n(other.n) {} // other.n is accessible in S::S
    };
```

O [explicit cast](<#/doc/language/explicit_cast>) (estilo C e estilo função) permite a conversão de um lvalue derivado para uma referência à sua base privada, ou de um ponteiro para derivado para um ponteiro para sua base privada.

### Herança

Consulte [classes derivadas](<#/doc/language/derived_class>) para o significado de herança pública, protegida e privada.

### Palavras-chave

[`public`](<#/doc/keyword/public>), [`protected`](<#/doc/keyword/protected>), [`private`](<#/doc/keyword/private>)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1873](<https://cplusplus.github.io/CWG/issues/1873.html>) | C++98 | membros protegidos eram acessíveis a amigos de classes derivadas | tornados inacessíveis