# Injected-class-name

O injected-class-name é o nome não qualificado de uma classe dentro do escopo da referida classe.

Em um [template de classe](<#/doc/language/class_template>), o injected-class-name pode ser usado tanto como um nome de template que se refere ao template atual, quanto como um nome de classe que se refere à instanciação atual.

### Explanation

Em um [escopo de classe](<#/doc/language/scope>), o nome da classe atual ou o nome do template do template de classe atual é tratado como se fosse um nome de membro público; isso é chamado de _injected-class-name_. O ponto de declaração do nome é imediatamente após a chave de abertura da definição da classe (template).
```cpp
    int X;
     
    struct X
    {
        void f()
        {
            X* p;   // OK, X is an injected-class-name
            ::X* q; // Error: name lookup finds a variable name, which hides the struct name
        }
    };
     
    template<class T>
    struct Y
    {
        void g()
        {
            Y* p;    // OK, Y is an injected-class-name
            Y<T>* q; // OK, Y is an injected-class-name, but Y<T> is not
        }
    };
```

Assim como outros membros, os injected-class-names são herdados. Na presença de herança privada ou protegida, o injected-class-name de uma classe base indireta pode acabar sendo inacessível em uma classe derivada.
```cpp
    struct A {};
    struct B : private A {};
    struct C : public B
    {
        A* p;   // Error: injected-class-name A is inaccessible
        ::A* q; // OK, does not use the injected-class-name
    };
```

### Em template de classe

O injected-class-name de um template de classe pode ser usado como um template-name ou um type-name.

Nos seguintes casos, o injected-class-name é tratado como um template-name do próprio template de classe:

  * É seguido por `<`.
  * É usado como um [argumento template template](<#/doc/language/template_parameters>).
  * É o identificador final no [especificador de classe elaborado](<#/doc/language/elaborated_type_specifier>) de uma declaração de template de classe friend.

Caso contrário, é tratado como um type-name e é equivalente ao template-name seguido pelos template-parameters do template de classe entre `< >`.
```cpp
    template<template<class, class> class>
    struct A;
     
    template<class T1, class T2>
    struct X
    {
        X<T1, T2>* p;   // OK, X is treated as a template-name
     
        using a = A<X>; // OK, X is treated as a template-name
     
        template<class U1, class U2>
        friend class X; // OK, X is treated as a template-name
     
        X* q;           // OK, X is treated as a type-name, equivalent to X<T1, T2>
    };
```

Dentro do escopo de uma [especialização de template](<#/doc/language/template_specialization>) de classe ou [especialização parcial](<#/doc/language/partial_specialization>), quando o injected-class-name é usado como um type-name, ele é equivalente ao template-name seguido pelos template-arguments da especialização de template de classe ou especialização parcial entre `< >`.
```cpp
    template<>
    struct X<void, void>
    {
        X* p; // OK, X is treated as a type-name, equivalent to X<void, void>
     
        template<class, class>
        friend class X; // OK, X is treated as a template-name (same as in primary template)
     
        X<void, void>* q; // OK, X is treated as a template-name
    };
     
    template<class T>
    struct X<char, T>
    {
        X* p, q; // OK, X is treated as a type-name, equivalent to X<char, T>
     
        using r = X<int, int>; // OK, can be used to name another specialization
    };
```

O injected-class-name de um template de classe ou especialização de template de classe pode ser usado tanto como um template-name quanto como um type-name onde quer que esteja no escopo.
```cpp
    template<>
    class X<int, char>
    {
        class B
        {
            X a;            // meaning X<int, char>
     
            template<class, class>
            friend class X; // meaning ::X
        };
    };
     
    template<class T>
    struct Base
    {
        Base* p; // OK: Base means Base<T>
    };
     
    template<class T>
    struct Derived : public Base<T*>
    {
        typename Derived::Base* p; // OK: Derived::Base means Derived<T>::Base,
                                   // which is Base<T*>
    };
     
    template<class T, template<class> class U = T::template Base>
    struct Third {};
     
    Third<Derived<int>> t; // OK: default argument uses injected-class-name as a template
```

Uma pesquisa que encontra um injected-class-name pode resultar em uma ambiguidade em certos casos (por exemplo, se for encontrado em mais de uma classe base). Se todos os injected-class-names encontrados se referem a especializações do mesmo template de classe, e se o nome é usado como um template-name, a referência se refere ao próprio template de classe e não a uma especialização dele, e não é ambígua.
```cpp
    template<class T>
    struct Base {};
     
    template<class T>
    struct Derived: Base<int>, Base<char>
    {
        typename Derived::Base b;         // error: ambiguous
        typename Derived::Base<double> d; // OK
    };
```

### injected-class-name e construtores

Construtores não têm nomes, mas o injected-class-name da classe envolvente é considerado para nomear um construtor em declarações e definições de construtores.

Em um nome qualificado `C::D`, se

  * a pesquisa de nome não ignora nomes de função, e
  * a pesquisa de `D` no escopo da classe `C` encontra seu injected-class-name

o nome qualificado é sempre considerado para nomear o construtor de `C`. Tal nome só pode ser usado na declaração de um construtor (por exemplo, em uma declaração de construtor friend, uma especialização de template de construtor, instanciação de template de construtor ou definição de construtor) ou ser usado para herdar construtores (desde C++11).
```cpp
    struct A
    {
        A();
        A(int);
     
        template<class T>
        A(T) {}
    };
    using A_alias = A;
     
    A::A() {}
    A_alias::A(int) {}
    template A::A(double);
     
    struct B : A
    {
        using A_alias::A;
    };
     
    A::A a;         // Error: A::A is considered to name a constructor, not a type
    struct A::A a2; // OK, same as 'A a2;'
    B::A b;         // OK, same as 'A b;'
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1004](<https://cplusplus.github.io/CWG/issues/1004.html>) | C++98 | um injected-class-name não poderia ser um argumento template template | permitido, ele se refere ao próprio template de classe neste caso
[CWG 2637](<https://cplusplus.github.io/CWG/issues/2637.html>) | C++98 | o template-id inteiro poderia ser um injected-class-name | apenas o nome do template pode