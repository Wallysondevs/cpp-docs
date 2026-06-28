# Pesquisa de nome qualificado

Um nome _qualificado_ é um nome que aparece no lado direito do operador de resolução de escopo `::` (veja também [identificadores qualificados](<#/doc/language/name>)). Um nome qualificado pode se referir a um

  * membro de classe (incluindo funções estáticas e não estáticas, tipos, templates, etc),
  * membro de namespace (incluindo outro namespace),
  * enumerador.

Se não houver nada no lado esquerdo de `::`, a pesquisa considera apenas declarações no [escopo do namespace global](<#/doc/language/qualified_lookup>). Isso torna possível referir-se a tais nomes mesmo que tenham sido ocultados por uma declaração local:
```cpp
    #include <iostream>
    
    namespace M {
        const char* fail = "fail\n";
    }
    
    using M::fail;
    
    namespace N {
        const char* ok = "ok\n";
    }
    
    using namespace N;
    
    int main()
    {
        struct std {};
    
        std::cout << ::fail; // Error: unqualified lookup for 'std' finds the struct
        ::std::cout << ::ok; // OK: ::std finds the namespace std
    }
```

Antes que a pesquisa de nome possa ser realizada para o nome no lado direito de `::`, a pesquisa deve ser concluída para o nome no seu lado esquerdo (a menos que uma expressão [decltype](<#/doc/language/decltype>) seja usada, ou não haja nada à esquerda). Esta pesquisa, que pode ser qualificada ou não qualificada, dependendo se há outro `::` à esquerda desse nome, considera apenas namespaces, tipos de classe, enumerações e templates cujas especializações são tipos. Se o nome encontrado à esquerda não designar um namespace ou uma classe, enumeração ou tipo dependente, o programa é malformado:
```cpp
    struct A
    {
        static int n;
    };
    
    int main()
    {
        int A;
        A::n = 42; // OK: unqualified lookup of A to the left of :: ignores the variable
        A b;       // Error: unqualified lookup of A finds the variable A
    }
    
    template<int>
    struct B : A {};
    
    namespace N
    {
        template<int>
        void B();
    
        int f()
        {
            return B<0>::n; // Error: N::B<0> is not a type
        }
    }
```

Quando um nome qualificado é usado como um [declarador](<#/doc/language/declarations>), então a [pesquisa não qualificada](<#/doc/language/unqualified_lookup>) dos nomes usados no mesmo declarador que seguem esse nome qualificado, mas não os nomes que o precedem, é realizada no escopo da classe ou namespace do membro:
```cpp
    class X {};
    
    constexpr int number = 100;
    
    struct C
    {
        class X {};
        static const int number = 50;
        static X arr[number];
    };
    
    X C::arr[number], brr[number];    // Error: look up for X finds ::X, not C::X
    C::X C::arr[number], brr[number]; // OK: size of arr is 50, size of brr is 100
```

Se `::` for seguido pelo caractere `~` que, por sua vez, é seguido por um identificador (ou seja, especifica um destrutor ou pseudo-destrutor), esse identificador é pesquisado no mesmo escopo que o nome no lado esquerdo de `::`
```cpp
    struct C { typedef int I; };
    
    typedef int I1, I2;
    
    extern int *p, *q;
    
    struct A { ~A(); };
    
    typedef A AB;
    
    int main()
    {
        p->C::I::~I(); // The name I after ~ is looked up in the same scope as I before ::
                       // (that is, within the scope of C, so it finds C::I)
    
        q->I1::~I2();  // The name I2 is looked up in the same scope as I1
                       // (that is, from the current scope, so it finds ::I2)
    
        AB x;
        x.AB::~AB();   // The name AB after ~ is looked up in the same scope as AB before ::
                       // (that is, from the current scope, so it finds ::AB)
    }
```

#### Enumeradores

Se a pesquisa do nome do lado esquerdo resultar em uma [enumeração](<#/doc/language/enum>) (com escopo ou sem escopo), a pesquisa do lado direito deve resultar em um enumerador que pertence a essa enumeração, caso contrário, o programa é malformado. | (desde C++11)

#### Membros de classe

Se a pesquisa do nome do lado esquerdo resultar em um nome de classe/struct ou union, o nome no lado direito de `::` é pesquisado no escopo dessa classe (e assim pode encontrar uma declaração de um membro dessa classe ou de sua base), com as seguintes exceções:

  * Um destrutor é pesquisado conforme descrito acima (no escopo do nome à esquerda de `::`).
  * Um conversion-type-id em um nome de função de [conversão definida pelo usuário](<#/doc/language/cast_operator>) é primeiro pesquisado no escopo da classe. Se não for encontrado, o nome é então pesquisado no escopo atual.
  * Nomes usados em argumentos de template são pesquisados no escopo atual (não no escopo do nome do template).
  * Nomes em [using-declarations](<#/doc/language/namespace>) também consideram nomes de classe/enum que são ocultados pelo nome de uma variável, membro de dados, função ou enumerador declarado no mesmo escopo.

| Esta seção está incompleta
Razão: micro-exemplos para o acima

Se o lado direito de `::` nomeia a mesma classe que o lado esquerdo, o nome designa o [construtor](<#/doc/language/initializer_list>) dessa classe. Tal nome qualificado só pode ser usado em uma declaração de um construtor e na [using-declaration](<#/doc/language/using_declaration>) para um [construtor herdado](<#/doc/language/using_declaration>). Nessas pesquisas onde os nomes de funções são ignorados (ou seja, ao pesquisar um nome à esquerda de `::`, ao pesquisar um nome em um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>), ou [especificador de base](<#/doc/language/derived_class>)), a mesma sintaxe resolve para o injected-class-name:
```cpp
    struct A { A(); };
    
    struct B : A { B(); };
    
    A::A() {} // A::A names a constructor, used in a declaration
    B::B() {} // B::B names a constructor, used in a declaration
    
    B::A ba;  // B::A names the type A (looked up in the scope of B)
    A::A a;   // Error: A::A does not name a type
    
    struct A::A a2; // OK: lookup in elaborated type specifier ignores functions
                    // so A::A simply names the class A as seen from within the scope of A
                    // (that is, the injected-class-name)
```

A pesquisa de nome qualificado pode ser usada para acessar um membro de classe que está oculto por uma declaração aninhada ou por uma classe derivada. Uma chamada para uma função membro qualificada nunca é virtual:
```cpp
    struct B { virtual void foo(); };
    
    struct D : B { void foo() override; };
    
    int main()
    {
        D x;
        B& b = x;
    
        b.foo();    // Calls D::foo (virtual dispatch)
        b.B::foo(); // Calls B::foo (static dispatch)
    }
```

#### Membros de namespace

Se o nome à esquerda de `::` se refere a um namespace ou se não há nada à esquerda de `::` (nesse caso, refere-se ao namespace global), o nome que aparece no lado direito de `::` é pesquisado no escopo desse namespace, exceto que

  * nomes usados em argumentos de template são pesquisados no escopo atual:

```cpp
    namespace N
    {
        template<typename T>
        struct foo {};
    
        struct X {};
    }
    
    N::foo<X> x; // Error: X is looked up as ::X, not as N::X
```

A pesquisa qualificada dentro do escopo de um [namespace](<#/doc/language/namespace>) `N` primeiro considera todas as declarações que estão localizadas em `N` e todas as declarações que estão localizadas nos [membros de namespace inline](<#/doc/language/namespace>) de `N` (e, transitivamente, em seus membros de namespace inline). Se não houver declarações nesse conjunto, então ele considera declarações em todos os namespaces nomeados por [using-directives](<#/doc/language/namespace>) encontrados em `N` e em todos os membros de namespace inline transitivos de `N`. As regras são aplicadas recursivamente:
```cpp
    int x;
    
    namespace Y
    {
        void f(float);
        void h(int);
    }
    
    namespace Z
    {
        void h(double);
    }
    
    namespace A
    {
        using namespace Y;
        void f(int);
        void g(int);
        int i;
    }
    
    namespace B
    {
        using namespace Z;
        void f(char);
        int i;
    }
    
    namespace AB
    {
        using namespace A;
        using namespace B;
        void g();
    }
    
    void h()
    {
        AB::g();  // AB is searched, AB::g found by lookup and is chosen AB::g(void)
                  // (A and B are not searched)
    
        AB::f(1); // First, AB is searched. There is no f
                  // Then, A, B are searched
                  // A::f, B::f found by lookup
                  // (but Y is not searched so Y::f is not considered)
                  // Overload resolution picks A::f(int)
    
        AB::x++;  // First, AB is searched. There is no x
                  // Then A, B are searched. There is no x
                  // Then Y and Z are searched. There is still no x: this is an error
    
        AB::i++;  // AB is searched. There is no i
                  // Then A, B are searched. A::i and B::i found by lookup: this is an error
    
        AB::h(16.8); // First, AB is searched. There is no h
                     // Then A, B are searched. There is no h
                     // Then Y and Z are searched
                     // Lookup finds Y::h and Z::h. Overload resolution picks Z::h(double)
    }
```

É permitido que a mesma declaração seja encontrada mais de uma vez:
```cpp
    namespace A { int a; }
    
    namespace B { using namespace A; }
    
    namespace D { using A::a; }
    
    namespace BD
    {
        using namespace B;
        using namespace D;
    }
    
    void g()
    {
        BD::a++; // OK: finds the same A::a through B and through D
    }
```

| Esta seção está incompleta
Razão: o restante de N4861 6.5.3.2[namespace.qual], tentar encurtar seus exemplos

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 215](<https://cplusplus.github.io/CWG/issues/215.html>) | C++98 | o nome que precede `::` deve ser um nome de classe ou nome de namespace, então parâmetros de template não eram permitidos lá | o nome deve designar uma classe, namespace ou tipo dependente
[CWG 318](<https://cplusplus.github.io/CWG/issues/318.html>) | C++98 | se o lado direito de `::` nomeia a mesma classe que o lado esquerdo, o nome qualificado era sempre considerado como nomeando o construtor dessa classe | nomear o construtor apenas quando aceitável (por exemplo, não em um especificador de tipo elaborado)

### Veja também

  * [Pesquisa de nome não qualificado](<#/doc/language/unqualified_lookup>)
  * [Escopo](<#/doc/language/scope>)
  * [Pesquisa dependente de argumento](<#/doc/language/adl>)
  * [Dedução de argumento de template](<#/doc/language/function_template>)
  * [Resolução de sobrecarga](<#/doc/language/overload_resolution>)
