# Declaração de Array

Declara um objeto do tipo array.

### Sintaxe

Uma declaração de array é qualquer declaração simples cujo [declarador](<#/doc/language/declarations>) tem a forma

---
noptr-declarator `[` expr ﻿(opcional)`]` attr ﻿(opcional)
- **noptr-declarator** — qualquer declarador válido, mas se começar com `*`, `&`, ou `&&`, deve ser cercado por parênteses (caso contrário, o declarador inteiro é tratado como um [declarador de ponteiro](<#/doc/language/pointer>) ou [declarador de referência](<#/doc/language/reference>)).
- **expr** — uma [expressão constante integral](<#/doc/language/constant_expression>)(até C++14)uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo [std::size_t](<#/doc/types/size_t>)(desde C++14), que avalia para um valor maior que zero
- **attr** — (desde C++11) lista de [atributos](<#/doc/language/attributes>)

Uma declaração na forma T a[N];, declara `a` como um [objeto](<#/doc/language/objects>) array que consiste em N objetos do tipo `T` alocados contiguamente. Os elementos de um array são numerados de ​0​, …, N - 1, e podem ser acessados com o [operador de subscrito []](<#/doc/language/operator_member_access>), como em a[0], …, a[N - 1].

Arrays podem ser construídos a partir de qualquer [tipo fundamental](<#/doc/language/types>) (exceto void), [ponteiros](<#/doc/language/pointer>), [ponteiros para membros](<#/doc/language/pointer>), [classes](<#/doc/language/classes>), [enumerações](<#/doc/language/enum>), ou de outros arrays de limite conhecido (nesse caso, o array é dito ser multidimensional). Em outras palavras, apenas tipos de objeto, exceto tipos de array de limite desconhecido, podem ser tipos de elemento de tipos de array. Tipos de array de tipo de elemento incompleto também são tipos incompletos.

O especificador [`auto`](<#/doc/language/auto>) possivelmente [restrito](<#/doc/language/constraints>)(desde C++20) pode ser usado como tipo de elemento de array na declaração de um ponteiro ou referência para array, que deduz o tipo de elemento do inicializador ou do argumento da função(desde C++14), por exemplo, auto (*p)[42] = &a; é válido se `a` for um lvalue do tipo int[42]. | (desde C++11)

Não existem arrays de referências ou arrays de funções.

A aplicação de [cv-qualifiers](<#/doc/language/cv>) a um tipo array (através de typedef ou manipulação de tipo template) aplica os qualificadores ao tipo do elemento, mas qualquer tipo array cujos elementos são de tipo cv-qualificado é considerado ter a mesma cv-qualificação.
```cpp
    // a e b têm o mesmo tipo const-qualificado "array de 5 const char"
    
    typedef const char CC;
    CC a[5] = {};
    
    typedef char CA[5];
    const CA b = {};
```

Quando usado com [new[]-expression](<#/doc/language/new>), o tamanho de um array pode ser zero; tal array não possui elementos:
```cpp
    int* p = new int[0]; // acessar p[0] ou *p é comportamento indefinido
    delete[] p; // limpeza ainda é necessária
```

#### Atribuição

Objetos do tipo array não podem ser modificados como um todo: embora sejam [lvalues](<#/doc/language/value_category>) (por exemplo, o endereço de um array pode ser obtido), eles não podem aparecer no lado esquerdo de um operador de atribuição:
```cpp
    int a[3] = {1, 2, 3}, b[3] = {4, 5, 6};
    int (*p)[3] = &a; // ok: o endereço de a pode ser obtido
    a = b;            // erro: a é um array
    
    struct { int c[3]; } s1, s2 = {3, 4, 5};
    s1 = s2; // ok: o operador de atribuição de cópia implicitamente definido
             // pode atribuir membros de dados do tipo array
```

#### Decaimento de array para ponteiro

Existe uma [conversão implícita](<#/doc/language/implicit_cast>) de lvalues e rvalues do tipo array para rvalues do tipo ponteiro: ela constrói um ponteiro para o primeiro elemento de um array. Esta conversão é usada sempre que arrays aparecem em contextos onde arrays não são esperados, mas ponteiros são:

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <numeric>
    
    void g(int (&a)[3])
    {
        std::cout << a[0] << '\n';
    }
    
    void f(int* p)
    {
        std::cout << *p << '\n';
    }
    
    int main()
    {
        int a[3] = {1, 2, 3};
        int* p = a;
    
        std::cout << sizeof a << '\n'  // imprime o tamanho do array
                  << sizeof p << '\n'; // imprime o tamanho de um ponteiro
    
        // onde arrays são aceitáveis, mas ponteiros não, apenas arrays podem ser usados
        g(a); // ok: função recebe um array por referência
    //  g(p); // erro
    
        for (int n : a)            // ok: arrays podem ser usados em loops range-for
            std::cout << n << ' '; // imprime os elementos do array
    //  for (int n : p)            // erro
    //      std::cout << n << ' ';
    
        std::iota(std::begin(a), std::end(a), 7); // ok: begin e end aceitam arrays
    //  std::iota(std::begin(p), std::end(p), 7); // erro
    
        // onde ponteiros são aceitáveis, mas arrays não, ambos podem ser usados:
        f(a); // ok: função recebe um ponteiro
        f(p); // ok: função recebe um ponteiro
    
        std::cout << *a << '\n' // imprime o primeiro elemento
                  << *p << '\n' // o mesmo
                  << *(a + 1) << ' ' << a[1] << '\n'  // imprime o segundo elemento
                  << *(p + 1) << ' ' << p[1] << '\n'; // o mesmo
    }
```

#### Arrays multidimensionais

Quando o tipo de elemento de um array é outro array, diz-se que o array é multidimensional:
```cpp
    // array de 2 arrays de 3 int cada
    int a[2][3] = {{1, 2, 3},  // pode ser visto como uma matriz 2 × 3
                   {4, 5, 6}}; // com layout row-major
```

Note que quando o decaimento de array para ponteiro é aplicado, um array multidimensional é convertido para um ponteiro para seu primeiro elemento (por exemplo, um ponteiro para sua primeira linha ou para seu primeiro plano): o decaimento de array para ponteiro é aplicado apenas uma vez.
```cpp
    int a[2];            // array de 2 int
    int* p1 = a;         // a decai para um ponteiro para o primeiro elemento de a
    
    int b[2][3];         // array de 2 arrays de 3 int
    // int** p2 = b;     // erro: b não decai para int**
    int (*p2)[3] = b;    // b decai para um ponteiro para a primeira linha de 3 elementos de b
    
    int c[2][3][4];      // array de 2 arrays de 3 arrays de 4 int
    // int*** p3 = c;    // erro: c não decai para int***
    int (*p3)[3][4] = c; // c decai para um ponteiro para o primeiro plano de 3 × 4 elementos de c
```

#### Arrays de limite desconhecido

Se `expr` for omitido na declaração de um array, o tipo declarado é "array de limite desconhecido de T", que é um tipo de [tipo incompleto](<#/doc/language/incomplete_type>), exceto quando usado em uma declaração com um [inicializador agregado](<#/doc/language/aggregate_initialization>):
```cpp
    extern int x[];      // o tipo de x é "array de limite desconhecido de int"
    int a[] = {1, 2, 3}; // o tipo de a é "array de 3 int"
```

Como elementos de array não podem ser arrays de limite desconhecido, arrays multidimensionais não podem ter limite desconhecido em uma dimensão diferente da primeira:
```cpp
    extern int a[][2]; // ok: array de limite desconhecido de arrays de 2 int
    extern int b[2][]; // erro: array tem tipo de elemento incompleto
```

Se houver uma declaração precedente da entidade no mesmo escopo em que o limite foi especificado, um limite de array omitido é considerado o mesmo da declaração anterior, e similarmente para a definição de um membro de dados estático de uma classe:
```cpp
    extern int x[10];
    struct S
    {
        static int y[10];
    };
    
    int x[];               // OK: limite é 10
    int S::y[];            // OK: limite é 10
    
    void f()
    {
        extern int x[];
        int i = sizeof(x); // erro: tipo de objeto incompleto
    }
```

Referências e ponteiros para arrays de limite desconhecido podem ser formados, mas não podem(até C++20)e podem(desde C++20) ser inicializados ou atribuídos a partir de arrays e ponteiros para arrays de limite conhecido. Note que na linguagem de programação C, ponteiros para arrays de limite desconhecido são compatíveis com ponteiros para arrays de limite conhecido e, portanto, são conversíveis e atribuíveis em ambas as direções.
```cpp
    extern int a1[];
    
    int (&r1)[] = a1;  // ok
    int (*p1)[] = &a1; // ok
    int (*q)[2] = &a1; // erro (mas ok em C)
    
    int a2[] = {1, 2, 3};
    int (&r2)[] = a2;  // ok (desde C++20)
    int (*p2)[] = &a2; // ok (desde C++20)
```

Ponteiros para arrays de limite desconhecido não podem participar da [aritmética de ponteiros](<#/doc/language/operator_arithmetic>) e não podem ser usados à esquerda do [operador de subscrito](<#/doc/language/operator_member_access>), mas podem ser desreferenciados.

#### rvalues de Array

Embora arrays não possam ser retornados de funções por valor e não possam ser alvos da maioria das expressões de cast, [prvalues](<#/doc/language/value_category>) de array podem ser formados usando um alias de tipo para construir um array temporário usando [brace-initialized functional cast](<#/doc/language/explicit_cast>).

Assim como prvalues de classe, prvalues de array convertem para xvalues por [materialização temporária](<#/doc/language/implicit_cast>) quando avaliados. | (desde C++17)

[xvalues](<#/doc/language/value_category>) de array podem ser formados diretamente acessando um membro array de um rvalue de classe ou usando std::move ou outro cast ou chamada de função que retorna uma referência rvalue.

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    #include <utility>
    
    void f(int (&&x)[2][3])
    {
        std::cout << sizeof x << '\n';
    }
    
    struct X
    {
        int i[2][3];
    } x;
    
    template<typename T>
    using identity = T;
    
    int main()
    {
        std::cout << sizeof X().i << '\n';           // tamanho do array
        f(X().i);                                    // ok: liga-se a xvalue
    //  f(x.i);                                      // erro: não pode ligar-se a lvalue
    
        int a[2][3];
        f(std::move(a));                             // ok: liga-se a xvalue
    
        using arr_t = int[2][3];
        f(arr_t{});                                  // ok: liga-se a prvalue
        f(identity<int[][3]>{{1, 2, 3}, {4, 5, 6}}); // ok: liga-se a prvalue
    
    }
```

Saída:
```
    24
    24
    24
    24
    24
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 393](<https://cplusplus.github.io/CWG/issues/393.html>) | C++98 | um ponteiro ou referência para um array de limite desconhecido não podia ser um parâmetro de função | permitido
[CWG 619](<https://cplusplus.github.io/CWG/issues/619.html>) | C++98 | quando omitido, o limite de um array não podia ser inferido de uma declaração anterior | inferência permitida
[CWG 2099](<https://cplusplus.github.io/CWG/issues/2099.html>) | C++98 | o limite de um membro de dados estático de array não podia ser omitido mesmo se um inicializador fosse fornecido | omissão permitida
[CWG 2397](<https://cplusplus.github.io/CWG/issues/2397.html>) | C++11 | auto não podia ser usado como tipo de elemento | permitido

### Veja também

[documentação C](<#/>) para Declaração de Array
---