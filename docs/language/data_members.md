# Membros de dados não estáticos

Membros de dados não estáticos são declarados em uma [especificação de membro](<#/doc/language/class>) de uma classe.
```cpp
    class S
    {
        int n;              // non-static data member
        int& r;             // non-static data member of reference type
        int a[2] = {1, 2};  // non-static data member with default member initializer (C++11)
        std::string s, *ps; // two non-static data members
    
        struct NestedS
        {
            std::string s;
        } d5;               // non-static data member of nested type
    
        char bit : 2;       // two-bit bitfield
    };
```
Quaisquer [declarações simples](<#/doc/language/declarations>) são permitidas, exceto

  * especificadores de classe de armazenamento [`extern`](<#/doc/keyword/extern>) e [`register`](<#/doc/keyword/register>) não são permitidos;

  * o especificador de classe de armazenamento [`thread_local`](<#/doc/keyword/thread_local>) não é permitido (mas é permitido para membros de dados [estáticos](<#/doc/language/static>));

| (desde C++11)

  * [tipos incompletos](<#/doc/language/incomplete_type>), [tipos de classe abstrata](<#/doc/language/abstract_class>), e arrays deles não são permitidos: em particular, uma classe `C` não pode ter um membro de dados não estático do tipo `C`, embora possa ter um membro de dados não estático do tipo `C&` (referência para C) ou `C*` (ponteiro para `C`);
  * um membro de dados não estático não pode ter o mesmo nome que o nome da classe se pelo menos um construtor declarado pelo usuário estiver presente;

  * um [especificador de tipo placeholder](<#/doc/language/auto>) (ou seja, auto, decltype(auto)(desde C++14), um nome de template de classe sujeito a [dedução](<#/doc/language/ctad>)(desde C++17), um placeholder [restrito](<#/doc/language/constraints>)(desde C++20)) não pode ser usado em uma declaração de membro de dados não estático (embora seja permitido para membros de dados estáticos que são [inicializados na definição da classe](<#/doc/language/static>)).

| (desde C++11)

Além disso, declarações de [bit-field](<#/doc/language/bit_field>) são permitidas.

### Layout

Quando um objeto de alguma classe `C` é criado, cada membro de dados não estático de tipo não-referência é alocado em alguma parte da representação do objeto de `C`. Se membros de referência ocupam algum armazenamento é definido pela implementação, mas sua [duração de armazenamento](<#/doc/language/storage_duration>) é a mesma do objeto no qual eles são membros.

Para tipos de classe que não são [union](<#/doc/language/union>), membros [não-de-tamanho-zero](<#/doc/language/objects>)(desde C++20) não separados por um [especificador de acesso](<#/doc/language/access>)(ate C++11) com o mesmo [acesso de membro](<#/doc/language/access>)(desde C++11) são sempre alocados de forma que os membros declarados posteriormente tenham endereços mais altos dentro de um objeto de classe. Membros separados por um especificador de acesso(ate C++11) com controle de acesso diferente(desde C++11) são alocados em ordem não especificada (o compilador pode agrupá-los). | (ate C++23)
---|---
Para tipos de classe que não são [union](<#/doc/language/union>), membros [não-de-tamanho-zero](<#/doc/language/objects>) são sempre alocados de forma que os membros declarados posteriormente tenham endereços mais altos dentro de um objeto de classe. Note que o controle de acesso de membro ainda afeta a propriedade de layout padrão (veja abaixo). | (desde C++23)

Requisitos de alinhamento podem necessitar de preenchimento (padding) entre membros, ou após o último membro de uma classe.

### Layout padrão

Uma classe é considerada _standard-layout_ (layout padrão) e ter as propriedades descritas abaixo se e somente se for uma [classe POD](<#/doc/language/classes>). | (ate C++11)
---|---
Uma classe onde todos os membros de dados não estáticos têm o mesmo controle de acesso e certas outras condições são satisfeitas é conhecida como _classe de layout padrão_ (veja [classe de layout padrão](<#/doc/language/classes>) para a lista de requisitos). | (desde C++11)

A _sequência inicial comum_ de dois tipos de classe de layout padrão que não são union é a sequência mais longa de membros de dados não estáticos e bit-fields em ordem de declaração, começando com a primeira entidade em cada uma das classes, de tal forma que

  * se __has_cpp_attribute(no_unique_address) não é ​0​, nenhuma das entidades é declarada com o atributo [[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`,

| (desde C++20)

  * entidades correspondentes têm tipos compatíveis com o layout,
  * entidades correspondentes têm os mesmos [requisitos de alinhamento](<#/doc/language/objects>), e
  * ambas as entidades são bit-fields com a mesma largura ou nenhuma delas é um bit-field.

```cpp
    struct A { int a; char b; };
    struct B { const int b1; volatile char b2; };
    // A e B's common initial sequence is A.a, A.b and B.b1, B.b2
    
    struct C { int c; unsigned : 0; char b; };
    // A e C's common initial sequence is A.a and C.c
    
    struct D { int d; char b : 4; };
    // A e D's common initial sequence is A.a and D.d
    
    struct E { unsigned int e; char b; };
    // A e E's common initial sequence is empty
```

Dois tipos de classe de layout padrão que não são union são chamados de _layout-compatíveis_ se forem do mesmo tipo ignorando cv-qualificadores, se houver, são [enumerações](<#/doc/language/enum>) layout-compatíveis (ou seja, enumerações com o mesmo tipo subjacente), ou se sua _sequência inicial comum_ consiste em cada membro de dados não estático e bit-field (no exemplo acima, `A` e `B` são layout-compatíveis).

Duas unions de layout padrão são chamadas de _layout-compatíveis_ se tiverem o mesmo número de membros de dados não estáticos e os membros de dados não estáticos correspondentes (em qualquer ordem) tiverem tipos layout-compatíveis.

Tipos de layout padrão têm as seguintes propriedades especiais:

  * Em uma union de layout padrão com um membro ativo de tipo de classe não-union `T1`, é permitido ler um membro de dados não estático `m` de outro membro da union de tipo de classe não-union `T2`, desde que `m` faça parte da sequência inicial comum de `T1` e `T2` (exceto que a leitura de um membro volátil através de um glvalue não-volátil é comportamento indefinido).
  * Um ponteiro para um objeto de tipo de classe de layout padrão pode ser [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) para um ponteiro para seu primeiro membro de dados não estático e não-bitfield (se tiver membros de dados não estáticos) ou, caso contrário, para qualquer um de seus subobjetos de classe base (se tiver algum), e vice-versa. Em outras palavras, preenchimento (padding) não é permitido antes do primeiro membro de dados de um tipo de layout padrão. Note que as regras de [aliasing estrito](<#/doc/language/reinterpret_cast>) ainda se aplicam ao resultado de tal cast.
  * A macro [offsetof](<#/doc/types/offsetof>) pode ser usada para determinar o offset de qualquer membro desde o início de uma classe de layout padrão.

### Inicialização de membro

Membros de dados não estáticos podem ser inicializados de uma de duas maneiras:

1) Na [lista de inicializadores de membro](<#/doc/language/initializer_list>) do construtor.
```cpp
    struct S
    {
        int n;
        std::string s;
        S() : n(7) {} // direct-initializes n, default-initializes s
    };
```

2) Através de um _inicializador de membro padrão_ , que é um [inicializador](<#/doc/language/initialization>) com chaves ou sinal de igual incluído na declaração do membro e é usado se o membro for omitido da lista de inicializadores de membro de um construtor.
```cpp
    struct S
    {
        int n = 7;
        std::string s{'a', 'b', 'c'};
        S() {} // default member initializer will copy-initialize n, list-initialize s
    };
```

Se um membro tem um inicializador de membro padrão e também aparece na lista de inicialização de membro em um construtor, o inicializador de membro padrão é ignorado para esse construtor. Execute este código
```cpp
    #include <iostream>
    
    int x = 0;
    struct S
    {
        int n = ++x;
        S() {}                 // uses default member initializer
        S(int arg) : n(arg) {} // uses member initializer
    };
    
    int main()
    {
        std::cout << x << '\n'; // prints 0
        S s1;                   // default initializer ran
        std::cout << x << '\n'; // prints 1
        S s2(7);                // default initializer did not run
        std::cout << x << '\n'; // prints 1
    }
```

| Inicializadores de membro padrão não são permitidos para membros [bit-field](<#/doc/language/bit_field>). | (ate C++20)

Membros de tipo array não podem deduzir seu tamanho a partir de inicializadores de membro:
```cpp
    struct X
    {
        int a[] = {1, 2, 3};  // error
        int b[3] = {1, 2, 3}; // OK
    };
```

Inicializadores de membro padrão não são permitidos para causar a definição implícita de um [construtor padrão](<#/doc/language/default_constructor>) default para a classe envolvente ou a especificação de exceção desse construtor:
```cpp
    struct node
    {
        node* p = new node; // error: use of implicit or defaulted node::node()
    };
```

Membros de referência não podem ser ligados a temporários em um inicializador de membro padrão (nota; a mesma regra existe para [listas de inicializadores de membro](<#/doc/language/initializer_list>)):
```cpp
    struct A
    {
        A() = default;     // OK
        A(int v) : v(v) {} // OK
        const int& v = 42; // OK
    };
    
    A a1;    // error: ill-formed binding of temporary to reference
    A a2(1); // OK (default member initializer ignored because v appears in a constructor)
             // however a2.v is a dangling reference
```

(desde C++11)

Se um membro de referência é inicializado a partir de seu inicializador de membro padrão(ate C++20)um membro tem um inicializador de membro padrão(desde C++20) e uma subexpressão [potencialmente avaliada](<#/doc/language/expressions>) dele é uma [inicialização agregada](<#/doc/language/aggregate_initialization>) que usaria esse inicializador de membro padrão, o programa é malformado:
```cpp
    struct A;
    extern A a;
    
    struct A
    {
        const A& a1{A{a, a}}; // OK
        const A& a2{A{}};     // error
    };
    
    A a{a, a};                // OK
```

| (desde C++17)

### Uso

O nome de um membro de dados não estático ou de uma função membro não estática só pode aparecer nas três situações seguintes:

1) Como parte de uma expressão de acesso a membro de classe, na qual a classe possui este membro ou é derivada de uma classe que possui este membro, incluindo as expressões implícitas de acesso a membro `this->` que aparecem quando um nome de membro não estático é usado em qualquer um dos contextos onde [`this`](<#/doc/language/this>) é permitido (dentro de corpos de funções membro, em listas de inicializadores de membro, nos inicializadores de membro padrão em-classe).
```cpp
    struct S
    {
        int m;
        int n;
        int x = m;            // OK: implicit this-> allowed in default initializers (C++11)
    
        S(int i) : m(i), n(m) // OK: implicit this-> allowed in member initializer lists
        {
            this->f();        // explicit member access expression
            f();              // implicit this-> allowed in member function bodies
        }
    
        void f();
    };
```

2) Para formar um [ponteiro para membro não estático](<#/doc/language/pointer>).
```cpp
    struct S
    {
        int m;
        void f();
    };
    
    int S::*p = &S::m;       // OK: use of m to make a pointer to member
    void (S::*fp)() = &S::f; // OK: use of f to make a pointer to member
```

3) (apenas para membros de dados, não funções membro) Quando usado em [operandos não avaliados](<#/doc/language/expressions>).
```cpp
    struct S
    {
        int m;
        static const std::size_t sz = sizeof m; // OK: m in unevaluated operand
    };
    
    std::size_t j = sizeof(S::m + 42); // OK: even though there is no "this" object for m
```

Notas: tais usos são permitidos através da resolução do [problema CWG 613](<https://cplusplus.github.io/CWG/issues/613.html>) em [N2253](<https://wg21.link/N2253>), que é tratado como uma mudança no C++11 por alguns compiladores (por exemplo, clang).

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_nsdmi`](<#/doc/feature_test>) | [`200809L`](<#/>) | (C++11) | [Inicializadores de membro de dados não estáticos](<#/doc/language/data_members>)
[`__cpp_aggregate_nsdmi`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | [Classes agregadas](<#/doc/language/aggregate_initialization>) com [inicializadores de membro padrão](<#/doc/language/data_members>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 80](<https://cplusplus.github.io/CWG/issues/80.html>) | C++98 | todos os membros de dados não podem ter o mesmo nome que o nome da classe (quebra a compatibilidade com C) | permite que membros de dados não estáticos compartilhem o nome da classe se não houver construtor declarado pelo usuário
[CWG 190](<https://cplusplus.github.io/CWG/issues/190.html>) | C++98 | ao determinar a compatibilidade de layout, todos os membros eram considerados | considerar apenas membros de dados não estáticos
[CWG 613](<https://cplusplus.github.io/CWG/issues/613.html>) | C++98 | usos não avaliados de membros de dados não estáticos não permitidos | tais usos são permitidos
[CWG 645](<https://cplusplus.github.io/CWG/issues/645.html>) | C++98 | não era especificado se membros bit-field e não-bit-field são layout-compatíveis | não são layout-compatíveis
[CWG 1397](<https://cplusplus.github.io/CWG/issues/1397.html>) | C++11 | a classe era considerada completa nos inicializadores de membro padrão | inicialização de membro padrão não pode acionar a definição de construtor padrão
[CWG 1425](<https://cplusplus.github.io/CWG/issues/1425.html>) | C++98 | não estava claro se um objeto de layout padrão compartilha o mesmo endereço com o primeiro membro de dados não estático ou o primeiro subobjeto de classe base | membro de dados não estático se presente, caso contrário subobjeto de classe base se presente
[CWG 1696](<https://cplusplus.github.io/CWG/issues/1696.html>) | C++98 | membros de referência podiam ser inicializados para temporários (cuja vida útil terminaria no final do construtor) | tal inicialização é malformada
[CWG 1719](<https://cplusplus.github.io/CWG/issues/1719.html>) | C++98 | tipos com cv-qualificadores diferentes não eram layout-compatíveis | cv-quals ignorados, especificação melhorada
[CWG 2254](<https://cplusplus.github.io/CWG/issues/2254.html>) | C++11 | ponteiro para classe de layout padrão sem membros de dados pode ser reinterpret_cast para sua primeira classe base | pode ser reinterpret_cast para qualquer uma de suas classes base
[CWG 2583](<https://cplusplus.github.io/CWG/issues/2583.html>) | C++11 | sequência inicial comum não considerava requisitos de alinhamento | considerado
[CWG 2759](<https://cplusplus.github.io/CWG/issues/2759.html>) | C++20 | sequência inicial comum poderia incluir membros declarados [[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]] | eles não são incluídos

### Veja também

[classes](<#/doc/language/classes>)
---
[membros estáticos](<#/doc/language/static>)
[funções membro não estáticas](<#/doc/language/member_functions>)
[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo de [layout padrão](<#/doc/language/data_members>)
(template de classe)
[ offsetof](<#/doc/types/offsetof>) | offset em bytes do início de um tipo de [layout padrão](<#/doc/named_req/StandardLayoutType>) para o membro especificado
(macro de função)