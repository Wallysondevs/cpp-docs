# Escopo

Cada [declaração](<#/doc/language/declarations>) que aparece em um programa C++ é visível apenas em alguns _escopos_ possivelmente descontíguos.

Dentro de um escopo, a [busca de nome não qualificado](<#/doc/language/lookup>) pode ser usada para associar um nome à sua declaração.

### Geral

Cada programa possui um _escopo global_, que _contém_ o programa inteiro.

Todo outro escopo `S` é introduzido por

  * uma [declaração](<#/doc/language/declarations>),
  * um parâmetro em uma [lista de parâmetros](<#/doc/language/function>),
  * uma [instrução](<#/doc/language/statements>), ou
  * um [handler](<#/doc/language/catch>).

`S` sempre aparece em outro escopo, que assim _contém_ `S`.

Um _escopo envolvente_ em um ponto do programa é qualquer escopo que o contém; o menor desses escopos é dito ser o _escopo imediato_ naquele ponto.

Um escopo _intervém_ entre um ponto do programa `P` e um escopo `S` (que não contém `P`) se ele é ou contém `S` mas não contém `P`.

O _escopo pai_ de qualquer escopo `S` que não seja um [escopo de parâmetro de template](<#/doc/language/scope>) é o menor escopo que contém `S` e não é um escopo de parâmetro de template.

Salvo especificação em contrário:

  * Uma declaração _habita_ o escopo imediato em seu [locus](<#/doc/language/scope>).
  * O _escopo alvo_ de uma declaração é o escopo que ela habita.
  * Quaisquer nomes (re)introduzidos por uma declaração são _ligados_ a ela em seu escopo alvo.

Uma entidade _pertence_ a um escopo `S` se `S` é o escopo alvo de uma declaração da entidade.
```cpp
    //                global  scope  scope
    //                scope     S      T
    int x;         //   ─┐                 // ponto do programa X
                   //    │
    {              //    │     ─┐
        {          //    │      │     ─┐
            int y; //    │      │      │   // ponto do programa Y
        }          //    │      │     ─┘
    }              //   ─┘     ─┘
```

No programa acima:

  * O escopo global, o escopo `S` e o escopo `T` contêm o ponto do programa `Y`.

  * Em outras palavras, esses três escopos são todos escopos envolventes no ponto do programa `Y`.

  * O escopo global contém os escopos `S` e `T`, e o escopo `S` contém o escopo `T`.

  * Portanto, o escopo `T` é o menor escopo entre os três, o que significa:

  * O escopo `T` é o escopo imediato no ponto do programa `Y`.
  * A declaração da variável y habita o escopo `T` em seu locus.
  * O escopo `T` é o escopo alvo da declaração de y.
  * A variável y pertence ao escopo `T`.

  * O escopo `S` é o escopo pai do escopo `T`, e o escopo global é o escopo pai do escopo `S`.

  * O escopo `S` intervém entre o ponto do programa `X` e o escopo `T`.

### Escopo de bloco

Cada

  * [instrução de seleção](<#/doc/language/statements>) ([if](<#/doc/language/if>), [switch](<#/doc/language/switch>)),
  * [instrução de iteração](<#/doc/language/statements>) ([for](<#/doc/language/for>), [range-for](<#/doc/language/range-for>)(desde C++11), [while](<#/doc/language/while>), [do-while](<#/doc/language/do>)),
  * [handler](<#/doc/language/catch>), ou
  * [instrução composta](<#/doc/language/statements>) que não é a instrução composta de um handler

introduz um _escopo de bloco_ que inclui a instrução ou o handler.

Uma variável que pertence a um escopo de bloco é uma _variável de bloco_.
```cpp
    int i = 42;
    int a[10];
    
    for (int i = 0; i < 10; i++) // “i” interno habita o escopo de bloco
        a[i] = i;                // introduzido pela instrução for
    
    int j = i; // j = 42
```

Declarações extern com escopo de bloco visam um escopo envolvente maior, mas ligam um nome em seu escopo imediato.

Se uma declaração que não é uma [declaração independente de nome](<#/doc/language/conflicting_declarations>) e(desde C++26) que liga um nome no escopo de bloco `S` de

  * a instrução composta de um [corpo de função](<#/doc/language/function>) ou [bloco try de função](<#/doc/language/try>),

  * a instrução composta `{` body `}` de uma [expressão lambda](<#/doc/language/lambda>),

| (desde C++11)
  
  * uma subinstrução de uma instrução de seleção ou iteração que não é ela própria uma instrução de seleção ou iteração, ou
  * um handler de um bloco try de função

[potencialmente conflita](<#/doc/language/conflicting_declarations>) com uma declaração cujo escopo alvo é o escopo pai de `S`, o programa é malformado.
```cpp
    if (int x = f())  // declara “x”
    { // o bloco if é uma subinstrução da instrução if
        int x;        // erro: redeclaração de “x”
    }
    else
    { // o bloco else também é uma subinstrução da instrução if
        int x;        // erro: redeclaração de “x”
    }
    
    void g(int i)
    {
        extern int i; // erro: redeclaração de “i”
    }
```

### Escopo de parâmetro de função

Cada [declaração de parâmetro](<#/doc/language/function>) `P` introduz um _escopo de parâmetro de função_ que inclui `P`.

  * Se o parâmetro declarado é da lista de parâmetros de uma [declaração de função](<#/doc/language/function>):

  * Se a declaração de função é uma [definição de função](<#/doc/language/function>), o escopo introduzido é estendido até o final da definição da função.
  * Caso contrário (a declaração de função é um protótipo de função), o escopo introduzido é estendido até o final do declarador da função.
  * Em ambos os casos, o escopo não inclui o [locus](<#/doc/language/scope>) da declaração da função.

  * Se o parâmetro declarado é da lista de parâmetros de uma [expressão lambda](<#/doc/language/lambda>), o escopo introduzido é estendido até o final de `{` body `}`.

| (desde C++11)
  
  * Se o parâmetro declarado é da lista de parâmetros de um [guia de dedução](<#/doc/language/deduction_guide>), o escopo introduzido é estendido até o final desse guia de dedução.

| (desde C++17)
  
  * Se o parâmetro declarado é da lista de parâmetros de uma [expressão requires](<#/doc/language/requires>), o escopo introduzido é estendido até o final de `{` requirement-seq `}`.

| (desde C++20)
```cpp
    int f(int n) // a declaração do parâmetro “n”
    {            // introduz um escopo de parâmetro de função
        /* ... */
    }            // o escopo de parâmetro de função termina aqui
```

### Escopo lambda

Cada [expressão lambda](<#/doc/language/lambda>) introduz um _escopo lambda_ que começa imediatamente após `[` captures ﻿`]` e se estende até o final de `{` body `}`. As [capturas](<#/doc/language/lambda>) com inicializadores de uma expressão lambda E habitam o escopo lambda introduzido por E.
```cpp
    auto lambda = x = 1, y // esta expressão lambda introduz um escopo lambda,
    {                          // é o escopo alvo da captura “x”
        /* ... */
    };                         // o escopo lambda termina antes do ponto e vírgula
```

| (desde C++14)
  
### Escopo de namespace

Cada [definição de namespace](<#/doc/language/namespace>) para um namespace `N` introduz um _escopo de namespace_ `S` que inclui as declarações para cada definição de namespace para `N`.

Para cada redeclaração ou especialização não-friend cujo escopo alvo é `S` ou está contido por `S`, as seguintes porções também são incluídas no escopo `S`:

  * Para uma redeclaração de [classe](<#/doc/language/class>) (template) ou especialização de template de classe, a porção após seu class-head-name.
  * Para uma redeclaração de [enumeração](<#/doc/language/enum>), a porção após seu enum-head-name.
  * Para qualquer outra redeclaração ou especialização, a porção após o unqualified-id ou qualified-id do [declarador](<#/doc/language/declarations>).

O [escopo global](<#/doc/language/scope>) é o escopo de namespace do [namespace global](<#/doc/language/namespace>).
```cpp
    namespace V   // a definição do namespace “V”
    {             // introduz um escopo de namespace “S”
        // a primeira parte do escopo “S” começa aqui
        void f();
        // a primeira parte do escopo “S” termina aqui
    }
    
    void V::f()   // a porção após “f” também faz parte do escopo “S”
    {
        void h(); // declara V::h
    }             // a segunda parte do escopo “S” termina aqui
```

### Escopo de classe

Cada declaração de uma classe ou template de classe `C` introduz um _escopo de classe_ `S` que inclui a member-specification da [definição de classe](<#/doc/language/class>) de `C`.

Para cada redeclaração ou especialização não-friend cujo escopo alvo é `S` ou está contido por `S`, as seguintes porções também são incluídas no escopo `S`:

  * Para uma redeclaração de [classe](<#/doc/language/class>) (template) ou especialização de template de classe, a porção após seu class-head-name.
  * Para uma redeclaração de [enumeração](<#/doc/language/enum>), a porção após seu enum-head-name.
  * Para qualquer outra redeclaração ou especialização, a porção após o unqualified-id ou qualified-id do [declarador](<#/doc/language/declarations>).

```cpp
    class C       // a definição da classe “C”
    {             // introduz um escopo de classe “S”
        // a primeira parte do escopo “S” começa aqui
        void f();
        // a primeira parte do escopo “S” termina aqui
    }
    
    void C::f()   // a porção após “f” também faz parte do escopo “S”
    {
        /* ... */
    }             // a segunda parte do escopo “S” termina aqui
```

### Escopo de enumeração

Cada declaração de uma enumeração `E` introduz um _escopo de enumeração_ que inclui a enumerator-list da [declaração de enumeração](<#/doc/language/enum>) não-opaca(desde C++11) de `E` (se presente).
```cpp
    enum class E // a declaração da enumeração “E”
    {            // introduz um escopo de enumeração “S”
        // o escopo “S” começa aqui
        e1, e2, e3
        // o escopo “S” termina aqui
    }
```

### Escopo de parâmetro de template

Cada [parâmetro template template](<#/doc/language/template_parameters>) introduz um _escopo de parâmetro de template_ que inclui toda a lista de parâmetros de template e as [cláusulas require](<#/doc/language/constraints>)(desde C++20) desse parâmetro template template.

Cada declaração de template `D` introduz um _escopo de parâmetro de template_ `S` que se estende do início da lista de parâmetros de template de `D` até o final de `D`. Qualquer declaração fora da lista de parâmetros de template que habitaria `S` em vez disso habita o mesmo escopo que `D`.
```cpp
    // a declaração do template de classe “X”
    // introduz um escopo de parâmetro de template “S1”
    template
    <
        // o escopo “S1” começa aqui
        template // o parâmetro template template “T”
                 // introduz outro escopo de parâmetro de template “S2”
        <
            typename T1
            typename T2
        > requires std::convertible_from<T1, T2> // o escopo “S2” termina aqui
        class T,
        typename U
    >
    class X; // o escopo “S1” termina antes do ponto e vírgula
```

### Ponto de declaração

Em geral, um nome é visível após o _locus_ de sua primeira declaração, que é localizado da seguinte forma.

O locus de um nome declarado em uma declaração simples é imediatamente após o [declarador](<#/doc/language/declarations>) desse nome e antes de seu inicializador, se houver.
```cpp
    int x = 32; // x externo está no escopo
    
    {
        int x = x; // x interno está no escopo antes do inicializador (= x)
                   // isso não inicializa o x interno com o valor do x externo (32),
                   // isso inicializa o x interno com seu próprio valor (indeterminado)
    }
    
    std::function<int(int)> f = &{ return n > 1 ? n * f(n - 1) : n; };
    // o nome da função f está no escopo na lambda e pode
    // ser corretamente capturado por referência, resultando em uma função recursiva
```
```cpp
    const int x = 2; // x externo está no escopo
    
    {
        int x[x] = {}; // x interno está no escopo antes do inicializador (= {}),
                       // mas depois do declarador (x[x])
                       // no declarador, o x externo ainda está no escopo
                       // isso declara um array de 2 int
    }
```

O locus de uma declaração de classe ou template de classe é imediatamente após o identificador que nomeia a classe (ou o [template-id](<#/doc/language/templates>) que nomeia a especialização do template) em seu [class-head](<#/doc/language/class>). O nome da classe ou template de classe já está no escopo na lista de classes base.
```cpp
    struct S: std::enable_shared_from_this<S> {}; // S está no escopo no dois pontos
```

O locus do [especificador de enum](<#/doc/language/enum>) ou declaração de enum opaca(desde C++11) é imediatamente após o identificador que nomeia a enumeração.
```cpp
    enum E : int // E está no escopo no dois pontos
    {
        A = sizeof(E)
    };
```

O locus de uma declaração de [alias de tipo ou alias de template](<#/doc/language/type_alias>) é imediatamente após o type-id ao qual o alias se refere.
```cpp
    using T = int; // T externo está no escopo no ponto e vírgula
    
    {
        using T = T*; // T interno está no escopo no ponto e vírgula,
                      // T externo ainda está no escopo antes do ponto e vírgula
                      // o mesmo que T = int*
    }
```

O locus para um declarador em uma [declaração using](<#/doc/language/using_declaration>) que não nomeia um construtor é imediatamente após o declarador.
```cpp
    template<int N>
    class Base
    {
    protected:
        static const int next = N + 1;
        static const int value = N;
    };
    
    struct Derived: Base<0>, Base<1>, Base<2>
    {
        using Base<0>::next,     // next está no escopo na vírgula
              Base<next>::value; // Derived::value é 1
    };
```

O locus de um enumerador é imediatamente após sua definição (não antes do inicializador como é para variáveis).
```cpp
    const int x = 12;
    
    {
        enum
        {
            x = x + 1, // o enumerador x está no escopo na vírgula,
                       // o x externo está no escopo antes da vírgula,
                       // o enumerador x é inicializado para 13
            y = x + 1  // y é inicializado para 14
        };
    }
```

O locus para um [injected-class-name](<#/doc/language/injected-class-name>) é imediatamente após a chave de abertura de sua definição de classe (ou template de classe).
```cpp
    template<typename T>
    struct Array
    //  : std::enable_shared_from_this<Array> // erro: o nome da classe injetada não está no escopo
        : std::enable_shared_from_this< Array<T> > // OK: o template-name Array está no escopo
    { // o nome da classe injetada Array agora está no escopo como se fosse um nome de membro público
        Array* p; // ponteiro para Array<T>
    };
```

O locus da declaração implícita para uma variável predefinida local de função __func__ é imediatamente antes do corpo da função de uma definição de função. | (desde C++11)
  

O locus de uma [declaração de structured binding](<#/doc/language/structured_binding>) é imediatamente após a identifier-list, mas os inicializadores de structured binding são proibidos de se referir a qualquer um dos nomes que estão sendo declarados. | (desde C++17)
  

O locus da variável ou dos structured bindings(desde C++17) declarados na range-declaration de um [loop range-for](<#/doc/language/range-for>) é imediatamente após a range-expression.
```cpp
    std::vector<int> x;
    
    for (auto x : x) // o vetor x está no escopo antes do parêntese de fechamento,
                     // auto x está no escopo no parêntese de fechamento
    {
        // o auto x está no escopo
    }
```

| (desde C++11)
  
O locus de um [parâmetro de template](<#/doc/language/template_parameters>) é imediatamente após seu parâmetro de template completo (incluindo o argumento padrão opcional).
```cpp
    typedef unsigned char T;
    
    template<
        class T = T, // o parâmetro de template T está no escopo na vírgula,
                     // o nome typedef de unsigned char está no escopo antes da vírgula
        T // o parâmetro de template T está no escopo
        N = 0
    >
    struct A
    {
    };
```

O locus de uma [definição de concept](<#/doc/language/constraints>) é imediatamente após o nome do concept, mas as definições de concept são proibidas de se referir ao nome do concept que está sendo declarado. | (desde C++20)
  
O locus de uma [definição de namespace](<#/doc/language/namespace>) nomeada é imediatamente após o nome do namespace.

| Esta seção está incompleta
Razão: restante de [basic.scope.pdecl]
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 2793](<https://cplusplus.github.io/CWG/issues/2793.html>) | C++98 | uma declaração extern em um escopo de bloco poderia conflitar com outra declaração no escopo pai | proibido
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 6.4 Scope [basic.scope]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 6.4 Scope [basic.scope]

  * Padrão C++17 (ISO/IEC 14882:2017):

  * 6.3 Scope [basic.scope]

  * Padrão C++14 (ISO/IEC 14882:2014):

  * 3.3 Scope [basic.scope]

  * Padrão C++11 (ISO/IEC 14882:2011):

  * 3.3 Scope [basic.scope]

  * Padrão C++98 (ISO/IEC 14882:1998):

  * 3.3 Declarative regions and scopes [basic.scope]

### Veja também

[Documentação C](<#/>) para Escopo
---