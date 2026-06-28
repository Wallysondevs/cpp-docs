# Declaração friend

A declaração friend aparece no [corpo de uma classe](<#/doc/language/class>) e concede a uma função ou outra classe acesso aos membros private e protected da classe onde a declaração friend aparece.

### Sintaxe

---
`friend** function-declaration | (1) |`
---|---|---
`friend** function-definition | (2) |`
`friend** elaborated-type-specifier **;** | (3) | (até C++26)`
`friend** simple-type-specifier **;** **friend** typename-specifier **;** | (4) | (desde C++11)`
`(até C++26)`
`friend** friend-type-specifier-list **;** | (5) | (desde C++26)`

1,2) Uma declaração friend de função.

3-5) Uma declaração friend de classe.

- **function-declaration** — uma [declaração de função](<#/doc/language/function>)
- **function-definition** — uma [definição de função](<#/doc/language/function>)
- **elaborated-type-specifier** — um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>)
- **simple-type-specifier** — um [especificador de tipo simples](<#/doc/language/declarations>)
- **typename-specifier** — a palavra-chave typename seguida por um identificador qualificado ou um [identificador de template simples](<#/doc/language/templates>) qualificado
- **friend-type-specifier-list** — uma lista não vazia separada por vírgulas de simple-type-specifier, elaborated-type-specifier e typename-specifier, onde cada especificador pode ser seguido por uma elipse (`...`)

### Descrição

1) Designa uma função ou várias funções como friends desta classe:
```cpp
    class Y
    {
        int data; // private member
    
        // the non-member function operator<< will have access to Y's private members
        friend std::ostream& operator<<(std::ostream& out, const Y& o);
        friend char* X::foo(int); // members of other classes can be friends too
        friend X::X(char), X::~X(); // constructors and destructors can be friends
    };
    
    // friend declaration does not declare a member function
    // this operator<< still needs to be defined, as a non-member
    std::ostream& operator<<(std::ostream& out, const Y& y)
    {
        return out << y.data; // can access private member Y::data
    }
```

2) (permitido apenas em definições de classe não [locais](<#/doc/language/class>)) Define uma função não-membro e a torna uma friend desta classe ao mesmo tempo. Tal função não-membro é sempre [inline](<#/doc/language/inline>), a menos que esteja anexada a um [módulo nomeado](<#/doc/language/modules>) (desde C++20).
```cpp
    class X
    {
        int a;
    
        friend void friend_set(X& p, int i)
        {
            p.a = i; // this is a non-member function
        }
    public:
        void member_set(int i)
        {
            a = i; // this is a member function
        }
    };
```

3,4) Designa uma classe como friend desta classe. Isso significa que as declarações e definições de membros da friend podem acessar membros private e protected desta classe e também que a friend pode herdar de membros private e protected desta classe.

3) A classe é nomeada por elaborated-type-specifier. O nome da classe que é usado nesta declaração friend não precisa ser declarado previamente.

4) A classe é nomeada por simple-type-specifier ou typename-specifier. Se o tipo nomeado não for um tipo de classe, esta declaração friend é ignorada. Esta declaração não fará uma forward declaration de um novo tipo.

5) Designa todas as classes em friend-type-specifier-list como friend desta classe. Isso significa que as declarações e definições de membros das friends podem acessar membros private e protected desta classe e também que as friends podem herdar de membros private e protected desta classe. Se um tipo nomeado não for um tipo de classe, ele é ignorado nesta declaração friend.

Cada especificador em friend-type-specifier-list nomeia uma classe se o especificador não for seguido por uma elipse, caso contrário, aplica-se a [expansão de pack](<#/doc/language/parameter_pack>).
```cpp
    class Y {};
    
    class A
    {
        int data; // private data member
    
        class B {}; // private nested type
    
        enum { a = 100 }; // private enumerator
    
        friend class X; // friend class forward declaration (elaborated class specifier)
        friend Y; // friend class declaration (simple type specifier) (desde C++11)
    
        // the two friend declarations above can be merged since C++26:
        // friend class X, Y;
    };
    
    class X : A::B // OK: A::B accessible to friend
    {
        A::B mx; // OK: A::B accessible to member of friend
    
        class Y
        {
            A::B my; // OK: A::B accessible to nested member of friend
        };
    
        int v[A::a]; // OK: A::a accessible to member of friend
    };
```

### Friends de template

Tanto declarações de [template de função](<#/doc/language/function_template>) quanto de [template de classe](<#/doc/language/class_template>) podem aparecer com o especificador `friend` em qualquer classe não-local ou template de classe (embora apenas templates de função possam ser definidos dentro da classe ou template de classe que está concedendo amizade). Neste caso, cada especialização do template se torna uma friend, seja ela implicitamente instanciada, parcialmente especializada ou explicitamente especializada.
```cpp
    class A
    {
        template<typename T>
        friend class B; // every B<T> is a friend of A
    
        template<typename T>
        friend void f(T) {} // every f<T> is a friend of A
    };
```

Declarações friend não podem se referir a especializações parciais, mas podem se referir a especializações completas:
```cpp
    template<class T>
    class A {};      // primary
    
    template<class T>
    class A<T*> {};  // partial
    
    template<>
    class A<int> {}; // full
    
    class X
    {
        template<class T>
        friend class A<T*>;  // Error
    
        friend class A<int>; // OK
    };
```

Quando uma declaração friend se refere a uma especialização completa de um template de função, as palavras-chave inline, constexpr (desde C++11), consteval (desde C++20) e argumentos padrão não podem ser usadas:
```cpp
    template<class T>
    void f(int);
    
    template<>
    void f<int>(int);
    
    class X
    {
        friend void f<int>(int x = 1); // error: default args not allowed
    };
```

Uma declaração friend de template pode nomear um membro de um template de classe A, que pode ser uma função membro ou um tipo membro (o tipo deve usar [elaborated-type-specifier](<#/doc/language/elaborated_type_specifier>)). Tal declaração é bem-formada apenas se o último componente em seu nested-name-specifier (o nome à esquerda do último `::`) for um simple-template-id (nome do template seguido por uma lista de argumentos entre colchetes angulares) que nomeia o template de classe. Os parâmetros de template de tal declaração friend de template devem ser deduzíveis do simple-template-id.

Neste caso, o membro de qualquer especialização de A ou especializações parciais de A se torna um friend. Isso não envolve a instanciação do template primário A ou especializações parciais de A: os únicos requisitos são que a dedução dos parâmetros de template de A a partir dessa especialização seja bem-sucedida, e que a substituição dos argumentos de template deduzidos na declaração friend produza uma declaração que seria uma redeclaração válida do membro da especialização:
```cpp
    // primary template
    template<class T>
    struct A
    { 
        struct B {};
    
        void f();
    
        struct D { void g(); };
    
        T h();
    
        template<T U>
        T i();
    };
    
    // full specialization
    template<>
    struct A<int>
    {
        struct B {};
    
        int f();
    
        struct D { void g(); };
    
        template<int U>
        int i();
    };
    
    // another full specialization
    template<>
    struct A<float*>
    {
        int *h();
    };
    
    // the non-template class granting friendship to members of class template A
    class X
    {
        template<class T>
        friend struct A<T>::B; // all A<T>::B are friends, including A<int>::B
    
        template<class T>
        friend void A<T>::f(); // A<int>::f() is not a friend because its signature
                               // does not match, but e.g. A<char>::f() is a friend
    
    //  template<class T>
    //  friend void A<T>::D::g(); // ill-formed, the last part of the nested-name-specifier,
    //                            // D in A<T>::D::, is not simple-template-id
    
        template<class T>
        friend int* A<T*>::h(); // all A<T*>::h are friends:
                                // A<float*>::h(), A<int*>::h(), etc
    
        template<class T> 
        template<T U>       // all instantiations of A<T>::i() and A<int>::i() are friends, 
        friend T A<T>::i(); // and thereby all specializations of those function templates
    };
```

```cpp
Argumentos de template padrão são permitidos em declarações friend de template apenas se a declaração for uma definição e nenhuma outra declaração deste template de função aparecer nesta unidade de tradução.  // (desde C++11)
```

### Operadores friend de template

Um caso de uso comum para friends de template é a declaração de uma sobrecarga de operador não-membro que atua em um template de classe, por exemplo, operator<<([std::ostream](<#/doc/io/basic_ostream>)&, const Foo&lt;T&gt;&) para algum Foo&lt;T&gt; definido pelo usuário.

Tal operador pode ser definido no corpo da classe, o que tem o efeito de gerar um operator<< não-template separado para cada `T` e torna esse operator<< não-template um friend de seu Foo&lt;T&gt;:

Execute este código
```cpp
    #include <iostream>
    
    template<typename T>
    class Foo
    {
    public:
        Foo(const T& val) : data(val) {}
    private:
        T data;
    
        // generates a non-template operator<< for this T
        friend std::ostream& operator<<(std::ostream& os, const Foo& obj)
        {
            return os << obj.data;
        }
    };
    
    int main()
    {
        Foo<double> obj(1.23);
        std::cout << obj << '\n';
    }
```

Saída:
```
    1.23
```

ou o template de função deve ser declarado como um template antes do corpo da classe, caso em que a declaração friend dentro de Foo&lt;T&gt; pode se referir à especialização completa de operator<< para seu `T`:

Execute este código
```cpp
    #include <iostream>
    
    template<typename T>
    class Foo; // forward declare to make function declaration possible
    
    template<typename T> // declaration
    std::ostream& operator<<(std::ostream&, const Foo<T>&);
    
    template<typename T>
    class Foo
    {
    public:
        Foo(const T& val) : data(val) {}
    private:
        T data;
    
        // refers to a full specialization for this particular T 
        friend std::ostream& operator<< <> (std::ostream&, const Foo&);
    
        // note: this relies on template argument deduction in declarations
        // can also specify the template argument with operator<< <T>"
    };
    
    // definition
    template<typename T>
    std::ostream& operator<<(std::ostream& os, const Foo<T>& obj)
    {
        return os << obj.data;
    }
    
    int main()
    {
        Foo<double> obj(1.23);
        std::cout << obj << '\n';
    }
```

### Linkage

[Especificadores de classe de armazenamento](<#/doc/language/storage_duration>) não são permitidos em declarações friend.

Se uma função ou template de função é declarado e definido pela primeira vez em uma declaração friend, e a classe envolvente é definida dentro de [declarações de exportação](<#/doc/language/modules>), seu nome tem o mesmo linkage que o nome da classe envolvente. | (desde C++20)

Se (até C++20) Caso contrário, se (desde C++20) uma função ou template de função é declarado em uma declaração friend, e uma [declaração não-friend correspondente](<#/doc/language/conflicting_declarations>) é alcançável, o nome tem o linkage determinado por essa declaração anterior.

Caso contrário, o linkage do nome introduzido por uma declaração friend é determinado como de costume.

### Notas

A amizade não é transitiva (um friend do seu friend não é seu friend).

A amizade não é herdada (os filhos do seu friend não são seus friends, e seus friends não são friends dos seus filhos).

[Especificadores de acesso](<#/doc/language/access>) não têm efeito no significado das declarações friend (eles podem aparecer nas seções private: ou public:, sem diferença).

Uma declaração friend de classe não pode definir uma nova classe (friend class X {}; é um erro).

Quando uma classe local declara uma função ou classe não qualificada como friend, apenas funções e classes no escopo não-classe mais interno são [procuradas](<#/doc/language/lookup>), e não as funções globais:
```cpp
    class F {};
    
    int f();
    
    int main()
    {
        extern int g();
    
        class Local // Local class in the main() function
        {
            friend int f(); // Error, no such function declared in main()
            friend int g(); // OK, there is a declaration for g in main()
            friend class F; // friends a local F (defined later)
            friend class ::F; // friends the global F
        };
    
        class F {}; // local F
    }
```

Um nome declarado pela primeira vez em uma declaração friend dentro de uma classe ou template de classe `X` torna-se um membro do namespace envolvente mais interno de `X`, mas não é visível para lookup (exceto lookup dependente de argumento que considera `X`) a menos que uma declaração correspondente no escopo do namespace seja fornecida - veja [namespaces](<#/doc/language/namespace>) para detalhes.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_variadic_friend`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Declarações friend variádicas

### Palavras-chave

[`friend`](<#/doc/keyword/friend>)

### Exemplo

Operadores de inserção e extração de stream são frequentemente declarados como friends não-membros:

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    
    class MyClass
    {
        int i;                   // friends have access to non-public, non-static
        static inline int id{6}; // and static (possibly inline) members
    
        friend std::ostream& operator<<(std::ostream& out, const MyClass&);
        friend std::istream& operator>>(std::istream& in, MyClass&);
        friend void change_id(int);
    public:
        MyClass(int i = 0) : i(i) {}
    };
    
    std::ostream& operator<<(std::ostream& out, const MyClass& mc)
    {
        return out << "MyClass::id = " << MyClass::id << "; i = " << mc.i;
    }
    
    std::istream& operator>>(std::istream& in, MyClass& mc)
    {
        return in >> mc.i;
    }
    
    void change_id(int id) { MyClass::id = id; }
    
    int main()
    {
        MyClass mc(7);
        std::cout << mc << '\n';
    //  mc.i = 333*2;  // error: i is a private member
        std::istringstream("100") >> mc;
        std::cout << mc << '\n';
    //  MyClass::id = 222*3;  // error: id is a private member
        change_id(9);
        std::cout << mc << '\n';
    }
```

Saída:
```
    MyClass::id = 6; i = 7
    MyClass::id = 6; i = 100
    MyClass::id = 9; i = 100
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 45](<https://cplusplus.github.io/CWG/issues/45.html>) | C++98 | membros de uma classe aninhada em uma classe friend de `T` não têm acesso especial a `T` | uma classe aninhada tem o mesmo acesso que a classe envolvente
[CWG 500](<https://cplusplus.github.io/CWG/issues/500.html>) | C++98 | classe friend de `T` não pode herdar de membros private ou protected de `T`, mas sua classe aninhada pode | ambas podem herdar de tais membros
[CWG 1439](<https://cplusplus.github.io/CWG/issues/1439.html>) | C++98 | a regra que visava declarações friend em classes não-locais não cobria declarações de template | coberto
[CWG 1477](<https://cplusplus.github.io/CWG/issues/1477.html>) | C++98 | um nome declarado pela primeira vez em uma declaração friend dentro de uma classe ou template de classe não era visível para lookup se a declaração correspondente fosse fornecida em outro escopo de namespace | é visível para lookup neste caso
[CWG 1804](<https://cplusplus.github.io/CWG/issues/1804.html>) | C++98 | quando um membro de um template de classe é tornado friend, o membro correspondente de especializações de especializações parciais do template de classe não era um friend da classe que concedia amizade | tais membros também são friends
[CWG 2379](<https://cplusplus.github.io/CWG/issues/2379.html>) | C++11 | declarações friend que se referem a especializações completas de templates de função poderiam ser declaradas constexpr | proibido
[CWG 2588](<https://cplusplus.github.io/CWG/issues/2588.html>) | C++98 | os linkages de nomes introduzidos por declarações friend eram incertos | esclarecido

### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 11.8.4 Friends [class.friend] 

    

  * 13.7.5 Friends [temp.friend] 

  * C++20 standard (ISO/IEC 14882:2020): 

    

  * 11.9.3 Friends [class.friend] 

    

  * 13.7.4 Friends [temp.friend] 

  * C++17 standard (ISO/IEC 14882:2017): 

    

  * 14.3 Friends [class.friend] 

    

  * 17.5.4 Friends [temp.friend] 

  * C++14 standard (ISO/IEC 14882:2014): 

    

  * 11.3 Friends [class.friend] 

    

  * 14.5.4 Friends [temp.friend] 

  * C++11 standard (ISO/IEC 14882:2011): 

    

  * 11.3 Friends [class.friend] 

    

  * 14.5.4 Friends [temp.friend] 

  * C++98 standard (ISO/IEC 14882:1998): 

    

  * 11.3 Friends [class.friend] 

    

  * 14.5.3 Friends [temp.friend] 

### Veja também

[ Tipos de classe ](<#/doc/language/class>) | define tipos que contêm vários membros de dados
---|---
[ Especificadores de acesso ](<#/doc/language/access>) | define a visibilidade dos membros da classe