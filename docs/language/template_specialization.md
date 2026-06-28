# Especialização explícita (completa) de template

Permite personalizar o código do template para um dado conjunto de argumentos de template.

### Sintaxe

---
`template <>` declaração
---

Qualquer um dos seguintes pode ser totalmente especializado:

1.  [template de função](<#/doc/language/function_template>)
2.  [template de classe](<#/doc/language/class_template>)
3.  [template de variável](<#/doc/language/variable_template>)(desde C++14)
4.  [função membro](<#/doc/language/member_functions>) de um template de classe
5.  [membro de dados estático](<#/doc/language/static>) de um template de classe
6.  [classe membro](<#/doc/language/nested_classes>) de um template de classe
7.  [enumeração](<#/doc/language/enum>) membro de um template de classe
8.  [template de classe membro](<#/doc/language/member_template>) de uma classe ou template de classe
9.  [template de função membro](<#/doc/language/member_template>) de uma classe ou template de classe
10. [template de variável membro](<#/doc/language/member_template>) de uma classe ou template de classe(desde C++14)

Por exemplo,

Execute este código
```cpp
    #include <type_traits>
    
    template<typename T> // primary template
    struct is_void : std::false_type {};
    template<>           // explicit specialization for T = void
    struct is_void<void> : std::true_type {};
    
    int main()
    {
        static_assert(is_void<char>::value == false,
            "for any type T other than void, the class is derived from false_type");
        static_assert(is_void<void>::value == true,
            "but when T is void, the class is derived from true_type");
    }
```

### Em detalhe

A especialização explícita pode ser declarada em qualquer escopo onde seu template primário possa ser definido (o que pode ser diferente do escopo onde o template primário é definido; como na especialização fora da classe de um [template membro](<#/doc/language/member_template>)). A especialização explícita deve aparecer após a declaração do template não especializado.
```cpp
    namespace N
    {
        template<class T> // primary template
        class X { /*...*/ };
        template<>        // specialization in same namespace
        class X<int> { /*...*/ };
    
        template<class T> // primary template
        class Y { /*...*/ };
        template<>        // forward declare specialization for double
        class Y<double>;
    }
    
    template<> // OK: specialization in same namespace
    class N::Y<double> { /*...*/ };
```

A especialização deve ser declarada antes do primeiro uso que causaria a instanciação implícita, em cada unidade de tradução onde tal uso ocorre:
```cpp
    class String {};
    
    template<class T>
    class Array { /*...*/ };
    
    template<class T> // primary template
    void sort(Array<T>& v) { /*...*/ }
    
    void f(Array<String>& v)
    {
        sort(v); // implicitly instantiates sort(Array<String>&), 
    }            // using the primary template for sort()
    
    template<> // ERROR: explicit specialization of sort(Array<String>)
    void sort<String>(Array<String>& v); // after implicit instantiation
```

Uma especialização de template que foi declarada mas não definida pode ser usada como qualquer outro [tipo incompleto](<#/doc/language/incomplete_type>) (por exemplo, ponteiros e referências a ela podem ser usados):
```cpp
    template<class T> // primary template
    class X;
    template<>        // specialization (declared, not defined)
    class X<int>;
    
    X<int>* p; // OK: pointer to incomplete type
    X<int> x;  // error: object of incomplete type
```

Se uma especialização explícita de um template de função ou variável(desde C++14) é [`inline`](<#/doc/language/inline>)/[`constexpr`](<#/doc/language/constexpr>)(desde C++11)/[`constinit`](<#/doc/language/constinit>)/[`consteval`](<#/doc/language/consteval>)(desde C++20) é determinado pela própria especialização explícita, independentemente de o template primário ser declarado com esse especificador. Da mesma forma, [atributos](<#/doc/language/attributes>) que aparecem na declaração de um template não têm efeito em uma especialização explícita desse template:(desde C++11)
```cpp
    template<class T>
    void f(T) { /* ... */ }
    template<>
    inline void f<>(int) { /* ... */ } // OK, inline
    
    template<class T>
    inline T g(T) { /* ... */ }
    template<>
    int g<>(int) { /* ... */ }         // OK, not inline
    
    template<typename>
    [[noreturn]] void h([[maybe_unused]] int i);
    template<> void h<int>(int i)
    {
        // [[noreturn]] has no effect, but [[maybe_unused]] has
    }
```

### Especializações explícitas de templates de função

Ao especializar um template de função, seus argumentos de template podem ser omitidos se a [dedução de argumentos de template](<#/doc/language/template_argument_deduction>) puder fornecê-los a partir dos argumentos da função:
```cpp
    template<class T>
    class Array { /*...*/ };
    
    template<class T> // primary template
    void sort(Array<T>& v);
    template<>        // specialization for T = int
    void sort(Array<int>&);
    
    // no need to write
    // template<> void sort<int>(Array<int>&);
```

Uma função com o mesmo nome e a mesma lista de argumentos que uma especialização não é uma especialização (veja sobrecarga de template em [template de função](<#/doc/language/function_template>)).

[Argumentos de função padrão](<#/doc/language/default_arguments>) não podem ser especificados em especializações explícitas de templates de função, templates de função membro e funções membro de templates de classe quando a classe é implicitamente instanciada.

Uma especialização explícita não pode ser uma [declaração friend](<#/doc/language/friend>).

| Esta seção está incompleta
Razão: revisar o requisito de especificação de exceção em diferentes versões do C++

### Membros de especializações

Ao definir um membro de um template de classe explicitamente especializado fora do corpo da classe, a sintaxe template<> não é usada, exceto se for um membro de um template de classe membro explicitamente especializado, que é especializado como um template de classe, porque, caso contrário, a sintaxe exigiria que tal definição começasse com template<parâmetros> exigido pelo template aninhado
```cpp
    template<typename T>
    struct A
    {
        struct B {};      // member class 
    
        template<class U> // member class template
        struct C {};
    };
    
    template<> // specialization
    struct A<int> 
    {
        void f(int); // member function of a specialization
    };
    // template<> not used for a member of a specialization
    void A<int>::f(int) { /* ... */ }
    
    template<> // specialization of a member class
    struct A<char>::B
    {
        void f();
    };
    // template<> not used for a member of a specialized member class either
    void A<char>::B::f() { /* ... */ }
    
    template<> // specialization of a member class template
    template<class U>
    struct A<char>::C
    {
        void f();
    };
    
    // template<> is used when defining a member of an explicitly
    // specialized member class template specialized as a class template
    template<>
    template<class U>
    void A<char>::C<U>::f() { /* ... */ }
```

Uma especialização explícita de um membro de dados estático de um template é uma definição se a declaração incluir um inicializador; caso contrário, é uma declaração. Essas definições devem usar chaves para inicialização padrão:
```cpp
    template<>
    X Q<int>::x;    // declaration of a static member
    template<>
    X Q<int>::x (); // error: function declaration
    template<>
    X Q<int>::x {}; // definition of a default-initialized static member
```

Um membro ou um template membro de um template de classe pode ser explicitamente especializado para uma dada instanciação implícita do template de classe, mesmo que o membro ou template membro seja definido na definição do template de classe.
```cpp
    template<typename T>
    struct A
    {
        void f(T);         // member, declared in the primary template
    
        void h(T) {}       // member, defined in the primary template
    
        template<class X1> // member template
        void g1(T, X1);
    
        template<class X2> // member template
        void g2(T, X2);
    };
    
    // specialization of a member
    template<>
    void A<int>::f(int);
    
    // member specialization OK even if defined in-class
    template<>
    void A<int>::h(int) {}
    
    // out of class member template definition
    template<class T>
    template<class X1>
    void A<T>::g1(T, X1) {}
    
    // member template specialization
    template<>
    template<class X1>
    void A<int>::g1(int, X1);
    
    // member template specialization
    template<>
    template<>
    void A<int>::g2<char>(int, char); // for X2 = char
    
    // same, using template argument deduction (X1 = char)
    template<> 
    template<>
    void A<int>::g1(int, char);
```

Um membro ou um template membro pode ser aninhado dentro de muitos templates de classe envolventes. Em uma especialização explícita para tal membro, há um template<> para cada template de classe envolvente que é explicitamente especializado.
```cpp
    template<class T1>
    struct A
    {
        template<class T2>
        struct B
        {
            template<class T3>
            void mf();
        };
    };
    
    template<>
    struct A<int>;
    
    template<>
    template<>
    struct A<char>::B<double>;
    
    template<>
    template<>
    template<>
    void A<char>::B<char>::mf<double>();
```

Em tal declaração aninhada, alguns dos níveis podem permanecer não especializados (exceto que não se pode especializar um template de classe membro no escopo de namespace se sua classe envolvente não for especializada). Para cada um desses níveis, a declaração precisa de template&lt;argumentos&gt;, porque tais especializações são elas próprias templates:
```cpp
    template<class T1>
    class A
    {
        template<class T2>
        class B
        {
            template<class T3> // member template
            void mf1(T3);
    
            void mf2();        // non-template member
        };
    };
    
    // specialization
    template<>        // for the specialized A
    template<class X> // for the unspecialized B
    class A<int>::B
    {
        template<class T>
        void mf1(T);
    };
    
    // specialization
    template<>        // for the specialized A
    template<>        // for the specialized B
    template<class T> // for the unspecialized mf1
    void A<int>::B<double>::mf1(T t) {}
    
    // ERROR: B<double> is specialized and is a member template, so its enclosing A
    // must be specialized also
    template<class Y>
    template<>
    void A<Y>::B<double>::mf2() {}
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 531](<https://cplusplus.github.io/CWG/issues/531.html>) | C++98 | a sintaxe de definição de membros de especializações explícitas no escopo de namespace não era especificada | especificado
[CWG 727](<https://cplusplus.github.io/CWG/issues/727.html>) | C++98 | especializações parciais e completas não permitidas no escopo de classe | permitido em qualquer escopo
[CWG 730](<https://cplusplus.github.io/CWG/issues/730.html>) | C++98 | templates membro de classes não-template não podiam ser totalmente especializados | permitido
[CWG 2478](<https://cplusplus.github.io/CWG/issues/2478.html>) | C++20 | não estava claro se constinit e consteval do template primário são transferidos para suas especializações explícitas | não transferidos
[CWG 2604](<https://cplusplus.github.io/CWG/issues/2604.html>) | C++11 | não estava claro se os atributos do template primário são transferidos para suas especializações explícitas | não transferidos

### Veja também

*   [templates](<#/doc/language/templates>)
*   [template de classe](<#/doc/language/class_template>)
*   [template de função](<#/doc/language/function_template>)
*   [especialização parcial](<#/doc/language/partial_specialization>)
