# Funções membro não estáticas

Uma função membro não estática é uma função que é declarada em uma [especificação de membro](<#/doc/language/class>) de uma classe sem um especificador [`static`](<#/doc/language/static>) ou [`friend`](<#/doc/language/friend>) (veja [funções membro estáticas](<#/doc/language/static>) e [declaração friend](<#/doc/language/friend>) para o efeito dessas palavras-chave).
```cpp
    class S
    {
        int mf1(); // non-static member function declaration
        void mf2() volatile, mf3() &&; // can have cv-qualifiers and/or a reference-qualifier
            // the declaration above is equivalent to two separate declarations:
            // void mf2() volatile;
            // void mf3() &&;
    
        int mf4() const { return data; } // can be defined inline
        virtual void mf5() final; // can be virtual, can use final/override
        S() : data(12) {} // constructors are member functions too
        int data;
    };
    
    int S::mf1() { return 7; } // if not defined inline, has to be defined at namespace
```

[Construtores](<#/doc/language/initializer_list>), [destrutores](<#/doc/language/destructor>) e [funções de conversão](<#/doc/language/cast_operator>) usam sintaxes especiais para suas declarações. As regras descritas nesta página podem não se aplicar a essas funções. Consulte suas respectivas páginas para detalhes.

Uma _função membro de objeto explícito_ é uma função membro não estática com um [parâmetro de objeto explícito](<#/doc/language/function>). | (desde C++23)

Uma _função membro de objeto implícito_ é uma função membro não estática sem um parâmetro de objeto explícito (antes do C++23, este era o único tipo de função membro não estática, e, portanto, referida como "função membro não estática" na literatura).

### Explicação

Quaisquer [declarações de função](<#/doc/language/function>) são permitidas, com elementos de sintaxe adicionais que estão disponíveis apenas para funções membro não estáticas: [especificadores puros](<#/doc/language/abstract_class>), cv-qualifiers, ref-qualifiers, especificadores [`final`](<#/doc/language/final>) e [`override`](<#/doc/language/override>) (desde C++11), e [listas de inicialização de membro](<#/doc/language/initializer_list>).

Uma função membro não estática da classe `X` pode ser chamada

1) Para um objeto do tipo `X` usando o operador de acesso a membro da classe

2) Para um objeto de uma classe [derivada](<#/doc/language/derived_class>) de `X`

3) Diretamente de dentro do corpo de uma função membro de `X`

4) Diretamente de dentro do corpo de uma função membro de uma classe derivada de `X`

Chamar uma função membro não estática da classe `X` em um objeto que não é do tipo `X`, ou de um tipo derivado de `X`, invoca comportamento indefinido.

Dentro do corpo de uma função membro não estática de `X`, qualquer [id-expression](<#/doc/language/expressions>) `e` (por exemplo, um identificador) que se resolve para um membro não estático não-tipo de `X` ou de uma classe base de `X`, é transformada em uma expressão de acesso a membro `(*this).e` (a menos que já faça parte de uma expressão de acesso a membro). Isso não ocorre no contexto de definição de template, então um nome pode ter que ser prefixado com `this->` explicitamente para se tornar [dependente](<#/doc/language/dependent_name>).
```cpp
    struct S
    {
        int n;
        void f();
    };
    
    void S::f()
    {
        n = 1; // transformed to (*this).n = 1;
    }
    
    int main()
    {
        S s1, s2;
        s1.f(); // changes s1.n
    }
```

Dentro do corpo de uma função membro não estática de `X`, qualquer unqualified-id que se resolve para um membro estático, um enumerador ou um tipo aninhado de `X` ou de uma classe base de `X`, é transformado para o qualified-id correspondente:
```cpp
    struct S
    {
        static int n;
        void f();
    };
    
    void S::f()
    {
        n = 1; // transformed to S::n = 1;
    }
    
    int main()
    {
        S s1, s2;
        s1.f(); // changes S::n
    }
```

#### Funções membro com cv-qualifiers

Uma função membro de objeto implícito pode ser declarada com uma sequência de [cv-qualifier](<#/doc/language/cv>) (const, volatile, ou uma combinação de const e volatile), esta sequência aparece após a lista de parâmetros na [declaração da função](<#/doc/language/function>). Funções com diferentes sequências de cv-qualifier (ou sem sequência) têm tipos diferentes e, portanto, podem sobrecarregar umas às outras.

No corpo de uma função com uma sequência de cv-qualifier, `*this` é cv-qualificado, por exemplo, em uma função membro com qualificador `const`, apenas outras funções membro com qualificador `const` podem ser chamadas normalmente. Uma função membro sem qualificador `const` ainda pode ser chamada se [`const_cast`](<#/doc/language/const_cast>) for aplicado ou através de um caminho de acesso que não envolva [`this`](<#/doc/language/this>).
```cpp
    #include <vector>
    
    struct Array
    {
        std::vector<int> data;
        Array(int sz) : data(sz) {}
    
        // const member function
        int operator const
        {                     // the this pointer has type const Array*
            return data[idx]; // transformed to (*this).data[idx];
        }
    
        // non-const member function
        int& operator
        {                     // the this pointer has type Array*
            return data[idx]; // transformed to (*this).data[idx]
        }
    };
    
    int main()
    {
        Array a(10);
        a[1] = 1;  // OK: the type of a[1] is int&
        const Array ca(10);
        ca[1] = 2; // Error: the type of ca[1] is int
    }
```

#### Funções membro com ref-qualifier

Uma função membro de objeto implícito pode ser declarada sem ref-qualifier, com um ref-qualifier lvalue (o token `&` após a lista de parâmetros) ou o ref-qualifier rvalue (o token `&&` após a lista de parâmetros). Durante a [resolução de sobrecarga](<#/doc/language/overload_resolution>), uma função membro de objeto implícito com uma sequência de cv-qualifier da classe X é tratada da seguinte forma:

  * sem ref-qualifier: o parâmetro de objeto implícito tem o tipo referência lvalue para X cv-qualificado e é adicionalmente permitido vincular um argumento de objeto implícito rvalue
  * ref-qualifier lvalue: o parâmetro de objeto implícito tem o tipo referência lvalue para X cv-qualificado
  * ref-qualifier rvalue: o parâmetro de objeto implícito tem o tipo referência rvalue para X cv-qualificado

```cpp
    #include <iostream>
    
    struct S
    {
        void f() &  { std::cout << "lvalue\n"; }
        void f() && { std::cout << "rvalue\n"; }
    };
    
    int main()
    {
        S s;
        s.f();            // prints "lvalue"
        std::move(s).f(); // prints "rvalue"
        S().f();          // prints "rvalue"
    }
```

Nota: ao contrário da cv-qualificação, a ref-qualificação não altera as propriedades do ponteiro [`this`](<#/doc/language/this>): dentro de uma função ref-qualificada rvalue, `*this` permanece uma expressão lvalue. | (desde C++11)

#### Funções virtuais e virtuais puras

Uma função membro não estática pode ser declarada _virtual_ ou _virtual pura_. Consulte [funções virtuais](<#/doc/language/virtual>) e [classes abstratas](<#/doc/language/abstract_class>) para detalhes.

#### Funções membro de objeto explícito

Para uma função membro não estática e não virtual não declarada com cv-qualifier ou ref-qualifier, seu primeiro parâmetro, se não for um [function parameter pack](<#/doc/language/parameter_pack>), pode ser um [parâmetro de objeto explícito](<#/doc/language/function>) (denotado com a palavra-chave `this` prefixada):
```cpp
    struct X
    {
        void foo(this X const& self, int i); // same as void foo(int i) const &;
    //  void foo(int i) const &; // Error: already declared
    
        void bar(this X self, int i); // pass object by value: makes a copy of “*this”
    };
```

Para templates de funções membro, o parâmetro de objeto explícito permite a dedução do tipo e da categoria de valor, este recurso da linguagem é chamado de “deducing this”:
```cpp
    struct X
    {
        template<typename Self>
        void foo(this Self&&, int);
    };
    
    struct D : X {};
    
    void ex(X& x, D& d)
    {
        x.foo(1);       // Self = X&
        move(x).foo(2); // Self = X
        d.foo(3);       // Self = D&
    }
```

Isso torna possível deduplicar funções membro `const` e não-`const`, veja [operador de subscrito de array](<#/doc/language/operators>) para um exemplo. Além disso, o parâmetro de objeto explícito deduz para o tipo derivado, o que simplifica [CRTP](<#/doc/language/crtp>):
```cpp
    // a CRTP trait
    struct add_postfix_increment
    {
        template<typename Self>
        auto operator++(this Self&& self, int)
        {
            auto tmp = self; // Self deduces to "some_type"
            ++self;
            return tmp;
        }
    };
    
    struct some_type : add_postfix_increment
    {
        some_type& operator++() { ... }
    };
```

Dentro do corpo de uma função membro de objeto explícito, o ponteiro `this` não pode ser usado: todo acesso a membro deve ser feito através do primeiro parâmetro, como em funções membro estáticas:
```cpp
    struct C
    {
        void bar();
    
        void foo(this C c)
        {
            auto x = this; // error: no this
            bar();         // error: no implicit this->
            c.bar();       // ok
        }
    };
```

Um ponteiro para uma função membro de objeto explícito é um ponteiro comum para função, não um ponteiro para membro:
```cpp
    struct Y 
    {
        int f(int, int) const&;
        int g(this Y const&, int, int);
    };
    
    auto pf = &Y::f;
    pf(y, 1, 2);              // error: pointers to member functions are not callable
    (y.*pf)(1, 2);            // ok
    std::invoke(pf, y, 1, 2); // ok
    
    auto pg = &Y::g;
    pg(y, 3, 4);              // ok
    (y.*pg)(3, 4);            // error: “pg” is not a pointer to member function
    std::invoke(pg, y, 3, 4); // ok
```

| (desde C++23)

#### Funções membro especiais

Algumas funções membro são _especiais_: sob certas circunstâncias, elas são definidas pelo compilador mesmo que não sejam definidas pelo usuário. Elas são:

  * [Construtor padrão](<#/doc/language/default_constructor>)
  * [Construtor de cópia](<#/doc/language/copy_constructor>)

  * [Construtor de movimento](<#/doc/language/move_constructor>)

| (desde C++11)

  * [Operador de atribuição de cópia](<#/doc/language/as_operator>)

  * [Operador de atribuição de movimento](<#/doc/language/move_operator>)

| (desde C++11)

  * [Destrutor](<#/doc/language/destructor>) (até C++20) [Destrutor prospectivo](<#/doc/language/destructor>) (desde C++20)

Funções membro especiais, juntamente com os [operadores de comparação](<#/doc/language/default_comparisons>) (desde C++20), são as únicas funções que podem ser _defaulted_, ou seja, definidas usando `= default` em vez do corpo da função (consulte suas páginas para detalhes).

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_ref_qualifiers`](<#/doc/feature_test>) | [`200710L`](<#/>) | (desde C++11) | [ref-qualifiers](<#/doc/language/function>)
[`__cpp_explicit_this_parameter`](<#/doc/feature_test>) | [`202110L`](<#/>) | (desde C++23) | [explicit object parameter](<#/doc/language/function>) ([deducing `this`](<#/doc/language/member_functions>))

### Exemplo

Execute este código
```cpp
    #include <exception>
    #include <iostream>
    #include <string>
    #include <utility>
    
    struct S
    {
        int data;
    
        // simple converting constructor (declaration)
        S(int val);
    
        // simple explicit constructor (declaration)
        explicit S(std::string str);
    
        // const member function (definition)
        virtual int getData() const { return data; }
    };
    
    // definition of the constructor
    S::S(int val) : data(val)
    {
        std::cout << "ctor1 called, data = " << data << '\n';
    }
    
    // this constructor has a catch clause
    S::S(std::string str) try : data(std::stoi(str))
    {
        std::cout << "ctor2 called, data = " << data << '\n';
    }
    catch(const std::exception&)
    {
        std::cout << "ctor2 failed, string was '" << str << "'\n";
        throw; // ctor's catch clause should always rethrow
    }
    
    struct D : S
    {
        int data2;
        // constructor with a default argument
        D(int v1, int v2 = 11) : S(v1), data2(v2) {}
    
        // virtual member function
        int getData() const override { return data * data2; }
    
        // lvalue-only assignment operator
        D& operator=(D other) &
        {
            std::swap(other.data, data);
            std::swap(other.data2, data2);
            return *this;
        }
    };
    
    int main()
    {
        D d1 = 1;
        S s2("2");
    
        try
        {
            S s3("not a number");
        }
        catch(const std::exception&) {}
    
        std::cout << s2.getData() << '\n';
    
        D d2(3, 4);
        d2 = d1;   // OK: assignment to lvalue
    //  D(5) = d1; // ERROR: no suitable overload of operator=
    }
```

Saída:
```
    ctor1 called, data = 1
    ctor2 called, data = 2
    ctor2 failed, string was 'not a number'
    2
    ctor1 called, data = 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 194](<https://cplusplus.github.io/CWG/issues/194.html>) | C++98 | ambíguo se uma função membro não estática poderia ter o mesmo nome que o nome da classe envolvente | restrição de nomenclatura explícita adicionada

### Veja também

  * [classes](<#/doc/language/classes>)
  * [membros de dados não estáticos](<#/doc/language/data_members>)
  * [membros de dados estáticos](<#/doc/language/static>)
