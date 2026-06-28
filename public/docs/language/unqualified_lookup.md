# Pesquisa de nome não qualificado

Para um nome _não qualificado_, ou seja, um nome que não aparece à direita de um operador de resolução de escopo `::`, a pesquisa de nome examina os [escopos](<#/doc/language/scope>) conforme descrito abaixo, até encontrar pelo menos uma declaração de qualquer tipo, momento em que a pesquisa para e nenhum outro escopo é examinado. (Nota: a pesquisa em alguns contextos ignora algumas declarações, por exemplo, a pesquisa do nome usado à esquerda de `::` ignora declarações de função, variável e enumerador; a pesquisa de um nome usado como especificador de classe base ignora todas as declarações que não são de tipo).

Para fins de pesquisa de nome não qualificado, todas as declarações de um namespace nomeado por uma [diretiva using](<#/doc/language/namespace>) aparecem como se declaradas no namespace envolvente mais próximo que contém, direta ou indiretamente, tanto a diretiva using quanto o namespace nomeado.

A pesquisa de nome não qualificado do nome usado à esquerda do operador de chamada de função (e, equivalentemente, operador em uma expressão) é descrita na [pesquisa dependente de argumento](<#/doc/language/adl>).

### Escopo de arquivo

Para um nome usado no escopo global (namespace de nível superior), fora de qualquer função, classe ou namespace declarado pelo usuário, o escopo global antes do uso do nome é examinado:
```cpp
    int n = 1;     // declaration of n
    int x = n + 1; // OK: lookup finds ::n
     
    int z = y - 1; // Error: lookup fails
    int y = 2;     // declaration of y
```

### Escopo de namespace

Para um nome usado em um namespace declarado pelo usuário fora de qualquer função ou classe, este namespace é pesquisado antes do uso do nome, então o namespace que o envolve é pesquisado antes da declaração deste namespace, e assim por diante até que o namespace global seja alcançado.
```cpp
    int n = 1; // declaration
     
    namespace N
    {
        int m = 2;
     
        namespace Y
        {
            int x = n; // OK, lookup finds ::n
            int y = m; // OK, lookup finds ::N::m
            int z = k; // Error: lookup fails
        }
     
        int k = 3;
    }
```

### Definição fora de seu namespace

Para um nome usado na definição de uma variável membro de namespace fora do namespace, a pesquisa prossegue da mesma forma que para um nome usado dentro do namespace:
```cpp
    namespace X
    {
        extern int x; // declaration, not definition
        int n = 1;    // found 1st
    }
     
    int n = 2;        // found 2nd
    int X::x = n;     // finds X::n, sets X::x to 1
```

### Definição de função não-membro

Para um nome usado na definição de uma função, seja em seu corpo ou como parte de um argumento padrão, onde a função é um membro de um namespace declarado pelo usuário ou global, o bloco em que o nome é usado é pesquisado antes do uso do nome, então o bloco envolvente é pesquisado antes do início desse bloco, e assim por diante, até alcançar o bloco que é o corpo da função. Em seguida, o namespace no qual a função é declarada é pesquisado até a definição (não necessariamente a declaração) da função que usa o nome, depois os namespaces envolventes, etc.
```cpp
    namespace A
    {
        namespace N
        {
            void f();
            int i = 3; // found 3rd (if 2nd is not present)
        }
     
        int i = 4;     // found 4th (if 3rd is not present)
    }
     
    int i = 5;         // found 5th (if 4th is not present)
     
    void A::N::f()
    {
        int i = 2;     // found 2nd (if 1st is not present)
     
        while (true)
        {
           int i = 1;  // found 1st: lookup is done
           std::cout << i;
        }
    }
     
    // int i;          // not found
     
    namespace A
    {
        namespace N
        {
            // int i;  // not found
        }
    }
```

### Definição de classe

Para um nome usado em qualquer lugar na [definição de classe](<#/doc/language/class>) (incluindo especificadores de classe base e definições de classe aninhadas), exceto dentro do corpo de uma função membro, um argumento padrão de uma função membro, especificação de exceção de uma função membro ou inicializador de membro padrão, onde o membro pode pertencer a uma classe aninhada cuja definição está no corpo da classe envolvente, os seguintes escopos são pesquisados:

a) o corpo da classe em que o nome é usado até o ponto de uso,

b) o corpo inteiro de sua(s) classe(s) base, recursivamente em suas bases quando nenhuma declaração é encontrada,

c) se esta classe for [aninhada](<#/doc/language/nested_classes>), o corpo da classe envolvente até a definição desta classe e o corpo inteiro da(s) classe(s) base da classe envolvente,

d) se esta classe for [local](<#/doc/language/class>), ou aninhada dentro de uma classe local, o escopo de bloco no qual a classe é definida até o ponto de definição,

e) se esta classe for um membro de um namespace, ou estiver aninhada em uma classe que é membro de um namespace, ou for uma classe local em uma função que é membro de um namespace, o escopo do namespace é pesquisado até a definição da classe, classe envolvente ou função; a pesquisa continua para os namespaces que a envolvem até o escopo global.

Para uma declaração [friend](<#/doc/language/friend>), a pesquisa para determinar se ela se refere a uma entidade previamente declarada prossegue como acima, exceto que ela para após o namespace envolvente mais interno.
```cpp
    namespace M
    {
        // const int i = 1; // never found
     
        class B
        {
            // static const int i = 3;     // found 3rd (but will not pass access check)
        };
    }
     
    // const int i = 5;                    // found 5th
     
    namespace N
    {
        // const int i = 4;                // found 4th
     
        class Y : public M::B
        {
            // static const int i = 2;     // found 2nd
     
            class X
            {
                // static const int i = 1; // found 1st
                int a[i]; // use of i
                // static const int i = 1; // never found
            };
     
            // static const int i = 2;     // never found
        };
     
        // const int i = 4;                // never found
    }
     
    // const int i = 5;                    // never found
```

### Nome de classe injetado

Para o nome de uma classe ou template de classe usado dentro da definição dessa classe ou template ou derivado de um, a pesquisa de nome não qualificado encontra a classe que está sendo definida como se o nome tivesse sido introduzido por uma declaração de membro (com acesso de membro público). Para mais detalhes, veja [injected-class-name](<#/doc/language/injected-class-name>).

### Definição de função membro

Para um nome usado dentro do corpo de uma função membro, um argumento padrão de uma função membro, especificação de exceção de uma função membro ou um inicializador de membro padrão, os escopos pesquisados são os mesmos que na [definição de classe](<#/doc/language/unqualified_lookup>), exceto que o escopo inteiro da classe é considerado, não apenas a parte anterior à declaração que usa o nome. Para classes aninhadas, o corpo inteiro da classe envolvente é pesquisado.
```cpp
    class B
    {
        // int i;         // found 3rd
    };
     
    namespace M
    {
        // int i;         // found 5th
     
        namespace N
        {
            // int i;     // found 4th
     
            class X : public B
            {
                // int i; // found 2nd
                void f();
                // int i; // found 2nd as well
            };
     
            // int i;     // found 4th
        }
    }
     
    // int i;             // found 6th
     
    void M::N::X::f()
    {
        // int i;         // found 1st
        i = 16;
        // int i;         // never found
    }
     
    namespace M
    {
        namespace N
        {
            // int i;     // never found
        }
    }
```

```cpp
De qualquer forma, ao examinar as bases das quais a classe é derivada, as seguintes regras, às vezes referidas como dominância em herança virtual> "enwiki:Dominance \(C++\)"), são seguidas:
Um nome de membro encontrado em um subobjeto `B` oculta o mesmo nome de membro em qualquer subobjeto `A` se `A` for um subobjeto de classe base de `B`. (Note que isso não oculta o nome em quaisquer cópias adicionais, não virtuais, de `A` na rede de herança que não são bases de `B`: esta regra só tem efeito na herança virtual.) Nomes introduzidos por declarações using são tratados como nomes na classe que contém a declaração. Após examinar cada base, o conjunto resultante deve incluir declarações de um membro estático de subobjetos do mesmo tipo, ou declarações de membros não estáticos do mesmo subobjeto.  // (até C++11)
Um _conjunto de pesquisa_ é construído, que consiste nas declarações e nos subobjetos nos quais essas declarações foram encontradas. As declarações using são substituídas pelos membros que representam e as declarações de tipo, incluindo injected-class-names, são substituídas pelos tipos que representam. Se `C` for a classe em cujo escopo o nome foi usado, `C` é examinada primeiro. Se a lista de declarações em `C` estiver vazia, o conjunto de pesquisa é construído para cada uma de suas bases diretas `Bi` (aplicando recursivamente essas regras se `Bi` tiver suas próprias bases). Uma vez construídos, os conjuntos de pesquisa para as bases diretas são mesclados no conjunto de pesquisa em `C` da seguinte forma:
```

  * se o conjunto de declarações em `Bi` estiver vazio, ele é descartado,
  * se o conjunto de pesquisa de `C` construído até agora estiver vazio, ele é substituído pelo conjunto de pesquisa de `Bi`,
  * se cada subobjeto no conjunto de pesquisa de `Bi` for uma base de pelo menos um dos subobjetos já adicionados ao conjunto de pesquisa de `C`, o conjunto de pesquisa de `Bi` é descartado,
  * se cada subobjeto já adicionado ao conjunto de pesquisa de `C` for uma base de pelo menos um subobjeto no conjunto de pesquisa de `Bi`, então o conjunto de pesquisa de `C` é descartado e substituído pelo conjunto de pesquisa de `Bi`,
  * caso contrário, se os conjuntos de declarações em `Bi` e em `C` forem diferentes, o resultado é uma mesclagem ambígua: o novo conjunto de pesquisa de `C` tem uma declaração inválida e uma união dos subobjetos anteriormente mesclados em `C` e introduzidos de `Bi`. Este conjunto de pesquisa inválido pode não ser um erro se for descartado posteriormente,
  * caso contrário, o novo conjunto de pesquisa de `C` tem os conjuntos de declarações compartilhados e a união dos subobjetos anteriormente mesclados em `C` e introduzidos de `Bi`.

| (desde C++11)
```cpp
    struct X { void f(); };
     
    struct B1: virtual X { void f(); };
     
    struct B2: virtual X {};
     
    struct D : B1, B2
    {
        void foo()
        {
            X::f(); // OK, calls X::f (qualified lookup)
            f(); // OK, calls B1::f (unqualified lookup)
        }
    };
     
    // C++98 rules: B1::f hides X::f, so even though X::f can be reached from D
    // through B2, it is not found by name lookup from D.
     
    // C++11 rules: lookup set for f in D finds nothing, proceeds to bases
    //  lookup set for f in B1 finds B1::f, and is completed
    // merge replaces the empty set, now lookup set for f in C has B1::f in B1
    //  lookup set for f in B2 finds nothing, proceeds to bases
    //    lookup for f in X finds X::f
    //  merge replaces the empty set, now lookup set for f in B2 has X::f in X
    // merge into C finds that every subobject (X) in the lookup set in B2 is a base
    // of every subobject (B1) already merged, so the B2 set is discarded
    // C is left with just B1::f found in B1
    // (if struct D : B2, B1 was used, then the last merge would *replace* C's
    //  so far merged X::f in X because every subobject already added to C (that is X)
    //  would be a base of at least one subobject in the new set (B1), the end
    //  result would be the same: lookup set in C holds just B1::f found in B1)
```

A pesquisa de nome não qualificado que encontra membros estáticos de `B`, tipos aninhados de `B` e enumeradores declarados em `B` é não ambígua, mesmo que existam múltiplos subobjetos base não virtuais do tipo `B` na árvore de herança da classe que está sendo examinada:
```cpp
    struct V { int v; };
     
    struct B
    {
        int a;
        static int s;
        enum { e };
    };
     
    struct B1 : B, virtual V {};
    struct B2 : B, virtual V {};
    struct D : B1, B2 {};
     
    void f(D& pd)
    {
        ++pd.v;       // OK: only one v because only one virtual base subobject
        ++pd.s;       // OK: only one static B::s, even though found in both B1 and B2
        int i = pd.e; // OK: only one enumerator B::e, even though found in both B1 and B2
        ++pd.a;       // error, ambiguous: B::a in B1 and B::a in B2
    }
```

### Definição de função friend

Para um nome usado na definição de uma função [friend](<#/doc/language/friend>) dentro do corpo da classe que concede amizade, a pesquisa de nome não qualificado prossegue da mesma forma que para uma função membro. Para um nome usado em uma função [friend](<#/doc/language/friend>) que é definida fora do corpo de uma classe, a pesquisa de nome não qualificado prossegue da mesma forma que para uma função em um namespace.
```cpp
    int i = 3;                     // found 3rd for f1, found 2nd for f2
     
    struct X
    {
        static const int i = 2;    // found 2nd for f1, never found for f2
     
        friend void f1(int x)
        {
            // int i;              // found 1st
            i = x;                 // finds and modifies X::i
        }
     
        friend int f2();
     
        // static const int i = 2; // found 2nd for f1 anywhere in class scope
    };
     
    void f2(int x)
    {
        // int i;                  // found 1st
        i = x;                     // finds and modifies ::i
    }
```

### Declaração de função friend

Para um nome usado no declarator de uma declaração de função [friend](<#/doc/language/friend>) que concede amizade a uma função membro de outra classe, se o nome não fizer parte de nenhum argumento de template no identificador do [declarator](<#/doc/language/declarations>), a pesquisa não qualificada examina primeiro o escopo inteiro da classe da função membro. Se não for encontrado nesse escopo (ou se o nome for parte de um argumento de template no identificador do declarator), a pesquisa continua como se fosse para uma função membro da classe que está concedendo amizade.
```cpp
    template<class T>
    struct S;
     
    // the class whose member functions are friended
    struct A
    {
        typedef int AT;
     
        void f1(AT);
        void f2(float);
     
        template<class T>
        void f3();
     
        void f4(S<AT>);
    };
     
    // the class that is granting friendship for f1, f2 and f3
    struct B
    {
        typedef char AT;
        typedef float BT;
     
        friend void A::f1(AT);    // lookup for AT finds A::AT (AT found in A)
        friend void A::f2(BT);    // lookup for BT finds B::BT (BT not found in A)
        friend void A::f3<AT>();  // lookup for AT finds B::AT (no lookup in A, because
                                  //     AT is in the declarator identifier A::f3<AT>)
    };
     
    // the class template that is granting friendship for f4
    template<class AT>
    struct C
    {
        friend void A::f4(S<AT>); // lookup for AT finds A::AT
                                  // (AT is not in the declarator identifier A::f4)
    };
```

### Argumento padrão

Para um nome usado em um [argumento padrão](<#/doc/language/default_arguments>) em uma declaração de função, ou nome usado na parte da expressão de um [inicializador de membro](<#/doc/language/initializer_list>) de um construtor, os nomes dos parâmetros da função são encontrados primeiro, antes que os escopos de bloco, classe ou namespace envolventes sejam examinados:
```cpp
    class X
    {
        int a, b, i, j;
    public:
        const int& r;
     
        X(int i): r(a),      // initializes X::r to refer to X::a
                  b(i),      // initializes X::b to the value of the parameter i
                  i(i),      // initializes X::i to the value of the parameter i
                  j(this->i) // initializes X::j to the value of X::i
        {}
    };
     
    int a;
    int f(int a, int b = a); // error: lookup for a finds the parameter a, not ::a
                             // and parameters are not allowed as default arguments
```

### Definição de membro de dados estático

Para um nome usado na definição de um [membro de dados estático](<#/doc/language/static>), a pesquisa prossegue da mesma forma que para um nome usado na definição de uma função membro.
```cpp
    struct X
    {
        static int x;
        static const int n = 1; // found 1st
    };
     
    int n = 2;                  // found 2nd
    int X::x = n;               // finds X::n, sets X::x to 1, not 2
```

### Declaração de enumerador

Para um nome usado na parte do inicializador da [declaração de enumerador](<#/doc/language/enum>), os enumeradores previamente declarados na mesma enumeração são encontrados primeiro, antes que a pesquisa de nome não qualificado prossiga para examinar o bloco, classe ou escopo de namespace envolvente.
```cpp
    const int RED = 7;
     
    enum class color
    {
        RED,
        GREEN = RED + 2, // RED finds color::RED, not ::RED, so GREEN = 2
        BLUE = ::RED + 4 // qualified lookup finds ::RED, BLUE = 11
    };
```

### Handler de um bloco try de função

Para um nome usado no [handler](<#/doc/language/catch>) de um [bloco try de função](<#/doc/language/try>), a pesquisa prossegue como se fosse para um nome usado no início do bloco mais externo do corpo da função (em particular, os parâmetros da função são visíveis, mas os nomes declarados nesse bloco mais externo não são)
```cpp
    int n = 3;          // found 3rd
    int f(int n = 2)    // found 2nd
     
    try
    {
        int n = -1;     // never found
    }
    catch(...)
    {
        // int n = 1;   // found 1st
        assert(n == 2); // loookup for n finds function parameter f
        throw;
    }
```

### Operador sobrecarregado

Para um [operador](<#/doc/language/expressions>) usado em uma expressão (por exemplo, operator+ usado em a + b), as regras de pesquisa são ligeiramente diferentes do operador usado em uma expressão de chamada de função explícita, como operator+(a, b): ao analisar uma expressão, duas pesquisas separadas são realizadas: para as sobrecargas de operador não-membro e para as sobrecargas de operador membro (para os operadores onde ambas as formas são permitidas). Esses conjuntos são então mesclados com as sobrecargas de operador embutidas em igualdade de condições, conforme descrito na [resolução de sobrecarga](<#/doc/language/overload_resolution>). Se a sintaxe de chamada de função explícita for usada, a pesquisa de nome não qualificado regular é realizada:
```cpp
    struct A {};
    void operator+(A, A);  // user-defined non-member operator+
     
    struct B
    {
        void operator+(B); // user-defined member operator+
        void f();
    };
     
    A a;
     
    void B::f() // definition of a member function of B
    {
        operator+(a, a); // error: regular name lookup from a member function
                         // finds the declaration of operator+ in the scope of B
                         // and stops there, never reaching the global scope
     
        a + a; // OK: member lookup finds B::operator+, non-member lookup
               // finds ::operator+(A, A), overload resolution selects ::operator+(A, A)
    }
```

### Definição de template

Para um [nome não dependente](<#/doc/language/dependent_name>) usado em uma definição de template, a pesquisa de nome não qualificado ocorre quando a definição do template é examinada. A vinculação às declarações feitas naquele ponto não é afetada por declarações visíveis no ponto de instanciação. Para um [nome dependente](<#/doc/language/dependent_name>) usado em uma definição de template, a pesquisa é adiada até que os argumentos do template sejam conhecidos, momento em que [ADL](<#/doc/language/adl>) examina declarações de função com linkage externo (até C++11) que são visíveis do contexto de definição do template, bem como no contexto de instanciação do template, enquanto a pesquisa não-ADL examina apenas declarações de função com linkage externo (até C++11) que são visíveis do contexto de definição do template (em outras palavras, adicionar uma nova declaração de função após a definição do template não a torna visível, exceto via ADL). O comportamento é indefinido se houver uma correspondência melhor com linkage externo nos namespaces examinados pela pesquisa ADL, declarada em alguma outra unidade de tradução, ou se a pesquisa teria sido ambígua se essas unidades de tradução tivessem sido examinadas. Em qualquer caso, se uma classe base depende de um parâmetro de template, seu escopo não é examinado pela pesquisa de nome não qualificado (nem no ponto de definição nem no ponto de instanciação).
```cpp
    void f(char); // first declaration of f
     
    template<class T>
    void g(T t)
    {
        f(1);    // non-dependent name: lookup finds ::f(char) and binds it now
        f(T(1)); // dependent name: lookup postponed
        f(t);    // dependent name: lookup postponed
    //  dd++;    // non-dependent name: lookup finds no declaration
    }
     
    enum E { e };
    void f(E);   // second declaration of f
    void f(int); // third declaration of f
    double dd;
     
    void h()
    {
        g(e);  // instantiates g<E>, at which point
               // the second and the third uses of the name 'f'
               // are looked up and find ::f(char) (by lookup) and ::f(E) (by ADL)
               // then overload resolution chooses ::f(E).
               // This calls f(char), then f(E) twice
     
        g(32); // instantiates g<int>, at which point
               // the second and the third uses of the name 'f'
               // are looked up and find ::f(char) only
               // then overload resolution chooses ::f(char)
               // This calls f(char) three times
    }
     
    typedef double A;
     
    template<class T>
    class B
    {
        typedef int A;
    };
     
    template<class T>
    struct X : B<T>
    {
        A a; // lookup for A finds ::A (double), not B<T>::A
    };
```
Nota: veja [regras de pesquisa de nome dependente](<#/doc/language/dependent_name>) para o raciocínio e as implicações desta regra.

### Nome de template

| Esta seção está incompleta
Razão: pesquisa de escopo duplo do nome do template após -> e .

### Membro de um template de classe fora do template

| Esta seção está incompleta

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 490](<https://cplusplus.github.io/CWG/issues/490.html>) | C++98 | qualquer nome em um argumento de template em uma declaração de função membro friend não era pesquisado no escopo da classe da função membro | apenas exclui os nomes em argumentos de template no identificador do declarator
[CWG 514](<https://cplusplus.github.io/CWG/issues/514.html>) | C++98 | qualquer nome não qualificado usado no escopo de namespace era pesquisado primeiro nesse escopo | os nomes não qualificados usados para definir um membro de variável de namespace fora desse namespace são pesquisados primeiro nesse namespace

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 6.5 Name lookup [basic.lookup] (p: 44-45)

    

  * 6.5.2 Member name lookup [class.member.lookup] (p: 45-47)

    

  * 13.8 Name resolution [temp.res] (p: 399-403)

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 6.5 Name lookup [basic.lookup] (p: 38-50)

    

  * 11.8 Member name lookup [class.member.lookup] (p: 283-285)

    

  * 13.8 Name resolution [temp.res] (p: 385-400)

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 6.4 Name lookup [basic.lookup] (p: 50-63)

    

  * 13.2 Member name lookup [class.member.lookup] (p: 259-262)

    

  * 17.6 Name resolution [temp.res] (p: 375-378)

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 3.4 Name lookup [basic.lookup] (p: 42-56)

    

  * 10.2 Member name lookup [class.member.lookup] (p: 233-236)

    

  * 14.6 Name resolution [temp.res] (p: 346-359)

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 3.4 Name lookup [basic.lookup]

    

  * 10.2 Member name lookup [class.member.lookup]

    

  * 14.6 Name resolution [temp.res]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 3.4 Name lookup [basic.lookup]

    

  * 10.2 Member name lookup [class.member.lookup]

    

  * 14.6 Name resolution [temp.res]

### Veja também

  * [Pesquisa de nome qualificado](<#/doc/language/qualified_lookup>)
  * [Escopo](<#/doc/language/scope>)
  * [Pesquisa dependente de argumento](<#/doc/language/adl>)
  * [Dedução de argumento de template](<#/doc/language/function_template>)
  * [Resolução de sobrecarga](<#/doc/language/overload_resolution>)
