# especificador de função virtual

O especificador `virtual` especifica que uma [função membro](<#/doc/language/member_functions>) não estática é _virtual_ e suporta despacho dinâmico. Ele só pode aparecer na `decl-specifier-seq` da declaração inicial de uma função membro não estática (ou seja, quando é declarada na definição da classe).

### Explicação

Funções virtuais são funções membro cujo comportamento pode ser sobrescrito em classes derivadas. Ao contrário das funções não virtuais, o comportamento de sobrescrita é preservado mesmo que não haja informação em tempo de compilação sobre o tipo real da classe. Ou seja, se uma classe derivada for manipulada usando um ponteiro ou referência para a classe base, uma chamada para uma função virtual sobrescrita invocaria o comportamento definido na classe derivada. Tal chamada de função é conhecida como _chamada de função virtual_ ou _chamada virtual_. A chamada de função virtual é suprimida se a função for selecionada usando [lookup de nome qualificado](<#/doc/language/lookup>) (isto é, se o nome da função aparecer à direita do operador de resolução de escopo `::`).

Execute este código
```cpp
    #include <iostream>
    
    struct Base
    {
        virtual void f()
        {
            std::cout << "base\n";
        }
    };
    
    struct Derived : Base
    {
        void f() override // 'override' is optional
        {
            std::cout << "derived\n";
        }
    };
    
    int main()
    {
        Base b;
        Derived d;
    
        // virtual function call through reference
        Base& br = b; // the type of br is Base&
        Base& dr = d; // the type of dr is Base& as well
        br.f(); // prints "base"
        dr.f(); // prints "derived"
    
        // virtual function call through pointer
        Base* bp = &b; // the type of bp is Base*
        Base* dp = &d; // the type of dp is Base* as well
        bp->f(); // prints "base"
        dp->f(); // prints "derived"
    
        // non-virtual function call
        br.Base::f(); // prints "base"
        dr.Base::f(); // prints "base"
    }
```

### Em detalhe

Se alguma função membro `vf` for declarada como `virtual` em uma classe `Base`, e alguma classe `Derived`, que é derivada, direta ou indiretamente, de `Base`, tiver uma declaração para uma função membro com o mesmo

  * nome
  * lista de tipos de parâmetros (mas não o tipo de retorno)
  * cv-qualifiers
  * ref-qualifiers

Então esta função na classe `Derived` também é _virtual_ (independentemente de a palavra-chave `virtual` ser usada em sua declaração) e _sobrescreve_ Base::vf (independentemente de a palavra `override` ser usada em sua declaração).

`Base::vf` não precisa ser acessível ou visível para ser sobrescrita. (`Base::vf` pode ser declarada privada, ou `Base` pode ser herdada usando herança privada. Quaisquer membros com o mesmo nome em uma classe base de `Derived` que herda `Base` não importam para a determinação da sobrescrita, mesmo que eles ocultassem `Base::vf` durante o lookup de nome.)
```cpp
    class B
    {
        virtual void do_f(); // private member
    public:
        void f() { do_f(); } // public interface
    };
    
    struct D : public B
    {
        void do_f() override; // overrides B::do_f
    };
    
    int main()
    {
        D d;
        B* bp = &d;
        bp->f(); // internally calls D::do_f();
    }
```

Para cada função virtual, existe o _final overrider_, que é executado quando uma chamada de função virtual é feita. Uma função membro virtual `vf` de uma classe base `Base` é o final overrider, a menos que a classe derivada declare ou herde (através de herança múltipla) outra função que sobrescreva `vf`.
```cpp
    struct A { virtual void f(); };     // A::f is virtual
    struct B : A { void f(); };         // B::f overrides A::f in B
    struct C : virtual B { void f(); }; // C::f overrides A::f in C
    
    struct D : virtual B {}; // D does not introduce an overrider, B::f is final in D
    
    struct E : C, D          // E does not introduce an overrider, C::f is final in E
    {
        using A::f; // not a function declaration, just makes A::f visible to lookup
    };
    
    int main()
    {
        E e;
        e.f();    // virtual call calls C::f, the final overrider in e
        e.E::f(); // non-virtual call calls A::f, which is visible in E
    }
```

Se uma função tiver mais de um final overrider, o programa é malformado:
```cpp
    struct A
    {
        virtual void f();
    };
    
    struct VB1 : virtual A
    {
        void f(); // overrides A::f
    };
    
    struct VB2 : virtual A
    {
        void f(); // overrides A::f
    };
    
    // struct Error : VB1, VB2
    // {
    //     // Error: A::f has two final overriders in Error
    // };
    
    struct Okay : VB1, VB2
    {
        void f(); // OK: this is the final overrider for A::f
    };
    
    struct VB1a : virtual A {}; // does not declare an overrider
    
    struct Da : VB1a, VB2
    {
        // in Da, the final overrider of A::f is VB2::f
    };
```

Uma função com o mesmo nome, mas lista de parâmetros diferente, não sobrescreve a função base de mesmo nome, mas a _oculta_: quando o [lookup de nome não qualificado](<#/doc/language/lookup>) examina o escopo da classe derivada, o lookup encontra a declaração e não examina a classe base.
```cpp
    struct B
    {
        virtual void f();
    };
    
    struct D : B
    {
        void f(int); // D::f hides B::f (wrong parameter list)
    };
    
    struct D2 : D
    {
        void f(); // D2::f overrides B::f (doesn't matter that it's not visible)
    };
    
    int main()
    {
        B b;
        B& b_as_b = b;
    
        D d;
        B& d_as_b = d;
        D& d_as_d = d;
    
        D2 d2;
        B& d2_as_b = d2;
        D& d2_as_d = d2;
    
        b_as_b.f();  // calls B::f()
        d_as_b.f();  // calls B::f()
        d2_as_b.f(); // calls D2::f()
    
        d_as_d.f();  // Error: lookup in D finds only f(int)
        d2_as_d.f(); // Error: lookup in D finds only f(int)
    }
```

Se uma função for declarada com o especificador `override`, mas não sobrescrever uma função virtual, o programa é malformado:
```cpp
    struct B
    {
        virtual void f(int);
    };
    
    struct D : B
    {
        virtual void f(int) override;  // OK, D::f(int) overrides B::f(int)
        virtual void f(long) override; // Error: f(long) does not override B::f(int)
    };
```

Se uma função for declarada com o especificador `final`, e outra função tentar sobrescrevê-la, o programa é malformado:
```cpp
    struct B
    {
        virtual void f() const final;
    };
    
    struct D : B
    {
        void f() const; // Error: D::f attempts to override final B::f
    };
```

| (desde C++11)
Funções não membro e funções membro estáticas não podem ser virtuais.

Function templates não podem ser declarados `virtual`. Isso se aplica apenas a funções que são elas próprias templates - uma função membro regular de um class template pode ser declarada virtual.

Funções virtuais (sejam declaradas virtual ou sobrescrevendo uma) não podem ter quaisquer constraints associadas.
```cpp
    struct A
    {
        virtual void f() requires true; // Error: constrained virtual function
    };
```

```cpp
Uma função virtual `consteval` não deve sobrescrever ou ser sobrescrita por uma função virtual não-`consteval`.  // (desde C++20)
```

[Argumentos padrão](<#/doc/language/default_arguments>) para funções virtuais são substituídos em tempo de compilação.

#### Tipos de retorno covariantes

Se a função `Derived::f` sobrescreve uma função `Base::f`, seus tipos de retorno devem ser os mesmos ou ser _covariantes_. Dois tipos são covariantes se satisfizerem todos os seguintes requisitos:

  * ambos os tipos são ponteiros ou referências (lvalue ou rvalue) para classes. Ponteiros ou referências de múltiplos níveis não são permitidos.
  * a classe referenciada/apontada no tipo de retorno de `Base::f()` deve ser uma classe base direta ou indireta não ambígua e acessível da classe referenciada/apontada do tipo de retorno de `Derived::f()`.
  * o tipo de retorno de `Derived::f()` deve ser igualmente ou menos [ cv-qualified](<#/doc/language/cv>) que o tipo de retorno de `Base::f()`.

A classe no tipo de retorno de `Derived::f` deve ser `Derived` em si, ou deve ser um [tipo completo](<#/doc/language/incomplete_type>) no ponto de declaração de `Derived::f`.

Quando uma chamada de função virtual é feita, o tipo retornado pelo final overrider é [implicitamente convertido](<#/doc/language/implicit_cast>) para o tipo de retorno da função sobrescrita que foi chamada:
```cpp
    class B {};
    
    struct Base
    {
        virtual void vf1();
        virtual void vf2();
        virtual void vf3();
        virtual B* vf4();
        virtual B* vf5();
    };
    
    class D : private B
    {
        friend struct Derived; // in Derived, B is an accessible base of D
    };
    
    class A; // forward-declared class is an incomplete type
    
    struct Derived : public Base
    {
        void vf1();    // virtual, overrides Base::vf1()
        void vf2(int); // non-virtual, hides Base::vf2()
    //  char vf3();    // Error: overrides Base::vf3, but has different
                       // and non-covariant return type
        D* vf4();      // overrides Base::vf4() and has covariant return type
    //  A* vf5();      // Error: A is incomplete type
    };
    
    int main()
    {
        Derived d;
        Base& br = d;
        Derived& dr = d;
    
        br.vf1(); // calls Derived::vf1()
        br.vf2(); // calls Base::vf2()
    //  dr.vf2(); // Error: vf2(int) hides vf2()
    
        B* p = br.vf4(); // calls Derived::vf4() and converts the result to B*
        D* q = dr.vf4(); // calls Derived::vf4() and does not convert the result to B*
    }
```

#### Destrutor virtual

Embora os destrutores não sejam herdados, se uma classe base declara seu destrutor `virtual`, o destrutor derivado sempre o sobrescreve. Isso torna possível deletar objetos alocados dinamicamente de tipo polimórfico através de ponteiros para a base.
```cpp
    class Base
    {
    public:
        virtual ~Base() { /* releases Base's resources */ }
    };
    
    class Derived : public Base
    {
        ~Derived() { /* releases Derived's resources */ }
    };
    
    int main()
    {
        Base* b = new Derived;
        delete b; // Makes a virtual function call to Base::~Base()
                  // since it is virtual, it calls Derived::~Derived() which can
                  // release resources of the derived class, and then calls
                  // Base::~Base() following the usual order of destruction
    }
```

Além disso, se o destrutor da classe base não for virtual, deletar um objeto de classe derivada através de um ponteiro para a classe base é _comportamento indefinido_, independentemente de haver recursos que seriam vazados se o destrutor derivado não fosse invocado, a menos que a função de desalocação selecionada seja um [operator delete](<#/doc/memory/new/operator_delete>) destrutor (desde C++20).

Uma diretriz útil é que o destrutor de qualquer classe base deve ser [público e virtual ou protegido e não virtual](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#Rc-dtor-virtual>), sempre que expressões `delete` estiverem envolvidas, por exemplo, quando implicitamente usado em [std::unique_ptr](<#/doc/memory/unique_ptr>) (desde C++11).

### Durante a construção e destruição

Quando uma função virtual é chamada direta ou indiretamente de um construtor ou de um destrutor (incluindo durante a construção ou destruição dos membros de dados não estáticos da classe, por exemplo, em uma [lista de inicializadores](<#/doc/language/initializer_list>) de membro), e o objeto ao qual a chamada se aplica é o objeto em construção ou destruição, a função chamada é o final overrider na classe do construtor ou destrutor e não uma que a sobrescreva em uma classe mais derivada. Em outras palavras, durante a construção ou destruição, as classes mais derivadas não existem.

Ao construir uma classe complexa com múltiplos ramos, dentro de um construtor que pertence a um ramo, o polimorfismo é restrito a essa classe e suas bases: se ele obtiver um ponteiro ou referência para um subobjeto base fora desta sub-hierarquia, e tentar invocar uma chamada de função virtual (por exemplo, usando acesso explícito a membro), o comportamento é indefinido:
```cpp
    struct V
    {
        virtual void f();
        virtual void g();
    };
    
    struct A : virtual V
    {
        virtual void f(); // A::f is the final overrider of V::f in A
    };
    
    struct B : virtual V
    {
        virtual void g(); // B::g is the final overrider of V::g in B
        B(V*, A*);
    };
    
    struct D : A, B
    {
        virtual void f(); // D::f is the final overrider of V::f in D
        virtual void g(); // D::g is the final overrider of V::g in D
    
        // note: A is initialized before B
        D() : B((A*) this, this) {}
    };
    
    // the constructor of B, called from the constructor of D 
    B::B(V* v, A* a)
    {
        f(); // virtual call to V::f (although D has the final overrider, D doesn't exist)
        g(); // virtual call to B::g, which is the final overrider in B 
    
        v->g(); // v's type V is base of B, virtual call calls B::g as before
    
        a->f(); // a’s type A is not a base of B. it belongs to a different branch of the
                // hierarchy. Attempting a virtual call through that branch causes
                // undefined behavior even though A was already fully constructed in this
                // case (it was constructed before B since it appears before B in the list
                // of the bases of D). In practice, the virtual call to A::f will be
                // attempted using B's virtual member function table, since that's what
                // is active during B's construction)
    }
```

### Palavras-chave

[`virtual`](<#/doc/keyword/virtual>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 258](<https://cplusplus.github.io/CWG/issues/258.html>) | C++98 | uma função membro não-const de uma classe derivada poderia se tornar virtual por causa de uma função membro virtual const de sua base | a virtualidade também exige que as cv-qualifications sejam as mesmas
[CWG 477](<https://cplusplus.github.io/CWG/issues/477.html>) | C++98 | uma declaração friend poderia conter o especificador virtual | não permitido
[CWG 1516](<https://cplusplus.github.io/CWG/issues/1516.html>) | C++98 | a definição dos termos "chamada de função virtual" e "chamada virtual" não foi fornecida | fornecida

### Veja também

[classes derivadas e modos de herança](<#/doc/language/derived_class>)
---
[especificador `override`](<#/doc/language/override>) (C++11) | declara explicitamente que um método sobrescreve outro método
---|---
[especificador `final`](<#/doc/language/final>) (C++11) | declara que um método não pode ser sobrescrito