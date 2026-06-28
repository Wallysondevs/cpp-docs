# Argumentos padrão

Permite que uma função seja chamada sem fornecer um ou mais argumentos finais.

Indicado pelo uso da seguinte sintaxe para um parâmetro na lista de parâmetros de uma [declaração de função](<#/doc/language/function>).

---
attr ﻿(optional) decl-specifier-seq declarator `=` initializer | (1) |
---|---|---
attr ﻿(optional) decl-specifier-seq abstract-declarator ﻿(optional) `=` initializer | (2) |

Argumentos padrão são usados no lugar dos argumentos finais ausentes em uma chamada de função:
```cpp
    void point(int x = 3, int y = 4);
     
    point(1, 2); // calls point(1, 2)
    point(1);    // calls point(1, 4)
    point();     // calls point(3, 4)
```

Em uma declaração de função, após um parâmetro com um argumento padrão, todos os parâmetros subsequentes devem:

  * ter um argumento padrão fornecido nesta ou em uma declaração anterior do mesmo escopo:

```cpp
    int x(int = 1, int); // Error: only the trailing parameters can have default arguments
                         // (assuming there's no previous declaration of x)
     
    void f(int n, int k = 1);
    void f(int n = 0, int k); // OK: the default argument of `k` is provided by
                              // the previous declaration in the same scope
     
    void g(int, int = 7);
     
    void h()
    {
        void g(int = 1, int); // Error: not the same scope
    }
```

  * ...a menos que o parâmetro tenha sido expandido de um parameter pack:

```cpp
    template<class... T>
    struct C { void f(int n = 0, T...); };
     
    C<int> c;  // OK; instantiates declaration void C::f(int n = 0, int)
```

  * ou ser um function parameter pack:

```cpp
    template<class... T>
    void h(int i = 0, T... args); // OK
```

| (desde C++11)

A elipse não é um parâmetro e, portanto, pode seguir um parâmetro com um argumento padrão:
```cpp
    int g(int n = 0, ...); // OK
```

Argumentos padrão são permitidos apenas nas listas de parâmetros de [declarações de função](<#/doc/language/function>) e [lambda-expressions](<#/doc/language/lambda>),(desde C++11) e não são permitidos nas declarações de ponteiros para funções, referências para funções, ou em declarações [typedef](<#/doc/language/typedef>). Listas de parâmetros de template usam sintaxe similar para seus [argumentos de template padrão](<#/doc/language/template_parameters>).

Para funções não-template, argumentos padrão podem ser adicionados a uma função que já foi declarada se a função for redeclarada no mesmo escopo. No ponto de uma chamada de função, os argumentos padrão são uma união dos argumentos padrão fornecidos em todas as declarações visíveis para a função. Uma redeclaração não pode introduzir um argumento padrão para um parâmetro para o qual um argumento padrão já é visível (mesmo que o valor seja o mesmo). Uma redeclaração em um escopo interno não adquire os argumentos padrão de escopos externos.
```cpp
    void f(int, int);     // #1
    void f(int, int = 7); // #2 OK: adds a default argument
     
    void h()
    {
        f(3); // #1 and #2 are in scope; makes a call to f(3,7)
        void f(int = 1, int); // Error: the default argument of the second
                              // parameter is not acquired from outer scopes
    }
     
    void m()
    { // new scope begins
        void f(int, int); // inner scope declaration; has no default argument.
        f(4); // Error: not enough arguments to call f(int, int)
        void f(int, int = 6);
        f(4); // OK: calls f(4, 6);
        void f(int, int = 6); // Error: the second parameter already has a
                              // default argument (even if the values are the same)
    }
     
    void f(int = 1, int); // #3 OK, adds a default argument to #2
     
    void n()
    { // new scope begins
        f(); // #1, #2, and #3 are in scope: calls f(1, 7);
    }
```

Se uma função [inline](<#/doc/language/inline>) é declarada em diferentes unidades de tradução, os conjuntos acumulados de argumentos padrão devem ser os mesmos no final de cada unidade de tradução.

Se uma função não-inline é declarada no mesmo escopo de namespace em diferentes unidades de tradução, os argumentos padrão correspondentes devem ser os mesmos, se presentes (mas alguns argumentos padrão podem estar ausentes em algumas TUs). | (desde C++20)

Se uma declaração [friend](<#/doc/language/friend>) especifica um argumento padrão, ela deve ser uma definição de função friend, e nenhuma outra declaração desta função é permitida na unidade de tradução.

As [using-declarations](<#/doc/language/namespace>) carregam o conjunto de argumentos padrão conhecidos, e se mais argumentos padrão forem adicionados posteriormente ao namespace da função, esses argumentos padrão também serão visíveis onde quer que a using-declaration seja visível:
```cpp
    namespace N
    {
        void f(int, int = 1);
    }
     
    using N::f;
     
    void g()
    {
        f(7); // calls f(7, 1);
        f();  // error
    }
     
    namespace N
    {
        void f(int = 2, int);
    }
     
    void h()
    {
        f();  // calls f(2, 1);
    }
```

Os nomes usados nos argumentos padrão são pesquisados, verificados quanto à [acessibilidade](<#/doc/language/access>) e vinculados no ponto de declaração, mas são executados no ponto da chamada da função:
```cpp
    int a = 1;
     
    int f(int);
     
    int g(int x = f(a)); // lookup for f finds ::f, lookup for a finds ::a
                         // the value of ::a, which is 1 at this point, is not used
     
    void h()
    {
        a = 2; // changes the value of ::a
        {
            int a = 3;
            g(); // calls f(2), then calls g() with the result
        }
    }
```

Para uma [função membro](<#/doc/language/member_functions>) de uma classe não-[template](<#/doc/language/templates>), os argumentos padrão são permitidos na definição fora da classe e são combinados com os argumentos padrão fornecidos pela declaração dentro do corpo da classe. Se esses argumentos padrão fora da classe transformassem uma função membro em um construtor padrão ou operador de atribuição/construtor de cópia/movimento (desde C++11) (o que torna a chamada ambígua), o programa é malformado. Para funções membro de classes template, todos os argumentos padrão devem ser fornecidos na declaração inicial da função membro.
```cpp
    class C
    {
        void f(int i = 3);
        void g(int i, int j = 99);
        C(int arg); // non-default constructor
    };
     
    void C::f(int i = 3) {}         // error: default argument already
                                    // specified in class scope
     
    void C::g(int i = 88, int j) {} // OK: in this translation unit,
                                    // C::g can be called with no argument
     
    C::C(int arg = 1) {}            // Error: turns this into a default constructor
```

Os overriders de funções [virtuais](<#/doc/language/virtual>) não adquirem os argumentos padrão das declarações da classe base, e quando a chamada da função virtual é feita, os argumentos padrão são decididos com base no tipo estático do objeto (nota: isso pode ser evitado com o padrão [non-virtual interface](<http://www.gotw.ca/publications/mill18.htm>)).
```cpp
    struct Base
    {
        virtual void f(int a = 7);
    };
     
    struct Derived : Base
    {
        void f(int a) override;
    };
     
    void m()
    {
        Derived d;
        Base& b = d;
        b.f(); // OK: calls Derived::f(7)
        d.f(); // Error: no default argument
    }
```

Variáveis locais não são permitidas em argumentos padrão, a menos que não sejam [avaliadas](<#/doc/language/expressions>):
```cpp
    void f()
    {
        int n = 1;
        extern void g(int x = n); // error: local variable cannot be a default argument
        extern void h(int x = sizeof n); // OK as of CWG 2082
    }
```

O ponteiro [this](<#/doc/language/this>) não é permitido em argumentos padrão:
```cpp
    class A
    {
        void f(A* p = this) {} // error: this is not allowed
    };
```

Membros de classe não-estáticos não são permitidos em argumentos padrão (mesmo que não sejam avaliados), exceto quando usados para formar um ponteiro para membro ou em uma expressão de acesso a membro:
```cpp
    int b;
     
    class X
    {
        int a;
        int mem1(int i = a); // error: non-static member cannot be used
        int mem2(int i = b); // OK: lookup finds X::b, the static member
        int mem3(int X::* i = &X::a); // OK: non-static member can be used
        int mem4(int i = x.a); // OK: in a member access expression
     
        static X x;
        static int b;
    };
```

Um argumento padrão é avaliado cada vez que a função é chamada sem um argumento para o parâmetro correspondente. Parâmetros de função não são permitidos em argumentos padrão, exceto se não forem [avaliados](<#/doc/language/expressions>). Note que os parâmetros que aparecem antes na lista de parâmetros estão no [escopo](<#/doc/language/scope>):
```cpp
    int a;
     
    int f(int a, int b = a); // Error: the parameter a used in a default argument
     
    int g(int a, int b = sizeof a); // Error until resolving CWG 2082
                                    // OK after resolution: use in unevaluated context is OK
```

Os argumentos padrão não fazem parte do tipo da função:
```cpp
    int f(int = 0);
     
    void h()
    {
        int j = f(1);
        int k = f(); // calls f(0);
    }
     
    int (*p1)(int) = &f;
    int (*p2)()    = &f; // Error: the type of f is int(int)
```

Funções de operador não podem ter argumentos padrão, exceto para o operador de chamada de função:
```cpp
    class C
    {
        int operator; // ill-formed
        int operator()(int x = 0); // OK
    };
```

[Parâmetros de objeto explícitos](<#/doc/language/member_functions>) não podem ter argumentos padrão:
```cpp
    struct S { void f(this const S& = S{}); }; // ill-formed
```

| (desde C++23)

### Nota

Espaços podem ser necessários para evitar um token de atribuição composta se o nome do parâmetro estiver ausente.
```cpp
    void f1(int*=0);         // Error, '*=' is unexpected here
    void g1(const int&=0);   // Error, '&=' is unexpected here
    void f2(int* = 0);       // OK
    void g2(const int& = 0); // OK
    void h(int&&=0);         // OK even without spaces, '&&' is a token here
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 217](<https://cplusplus.github.io/CWG/issues/217.html>) | C++98 | um argumento padrão poderia ser adicionado a uma função membro não-template de um template de classe | proibido
[CWG 1344](<https://cplusplus.github.io/CWG/issues/1344.html>) | C++98 | argumentos padrão adicionados na definição fora da classe de uma função membro poderiam transformá-la em uma função membro especial | proibido
[CWG 1716](<https://cplusplus.github.io/CWG/issues/1716.html>) | C++98 | argumentos padrão eram avaliados cada vez que a função era chamada, mesmo que o chamador fornecesse os argumentos | avaliado apenas se nenhum argumento for fornecido para o parâmetro correspondente
[CWG 2082](<https://cplusplus.github.io/CWG/issues/2082.html>) | C++98 | argumentos padrão eram proibidos de usar variáveis locais e parâmetros precedentes em contexto não avaliado | uso de contexto não avaliado permitido
[CWG 2233](<https://cplusplus.github.io/CWG/issues/2233.html>) | C++11 | parâmetros expandidos de parameter packs não podiam aparecer após parâmetros com argumentos padrão | permitido
[CWG 2683](<https://cplusplus.github.io/CWG/issues/2683.html>) | C++98 | definições fora da classe das funções membro de classes aninhadas de templates de classe poderiam ter argumentos padrão | proibido