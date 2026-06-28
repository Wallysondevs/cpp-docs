# Parâmetros de template e argumentos de template

### Parâmetros de template

Todo [template](<#/doc/language/templates>) é parametrizado por um ou mais parâmetros de template, indicados na parameter-list da sintaxe de declaração de template:

---
`template` `<` parameter-list `>` declaration | (1) |
---|---|---
`template` `<` parameter-list `>` `requires` constraint declaration | (2) | (desde C++20)

Cada parâmetro na parameter-list pode ser:

*   um parâmetro de template não-tipo;
*   um parâmetro de template de tipo;
*   um parâmetro de template template.

#### Parâmetro de template não-tipo

---
type name ﻿(opcional) | (1) |
---|---|---
type name ﻿(opcional) `=` default | (2) |
type `...` name ﻿(opcional) | (3) | (desde C++11)

1) Um parâmetro de template não-tipo.

2) Um parâmetro de template não-tipo com um argumento de template padrão.

3) Um [parameter pack](<#/doc/language/parameter_pack>) de template não-tipo.

type | - | um dos seguintes tipos:

*   um tipo estrutural (veja abaixo)

|

*   um tipo que contém um [placeholder type](<#/doc/language/auto>)

| (desde C++17)
---|---
*   um [placeholder para um tipo de classe deduzido](<#/doc/language/ctad>)

| (desde C++20)
---|---|---
name | - | o nome do parâmetro de template não-tipo
default | - | o [argumento de template padrão](<#/doc/language/template_parameters>)

Um _tipo estrutural_ é um dos seguintes tipos (opcionalmente cv-qualified, os qualificadores são ignorados):

*   [tipo de referência lvalue](<#/doc/language/reference>) (para objeto ou para função);
*   um [tipo integral](<#/doc/language/type-id>);
*   um [tipo ponteiro](<#/doc/language/pointer>) (para objeto ou para função);
*   um [tipo ponteiro para membro](<#/doc/language/pointer>) (para objeto membro ou para função membro);
*   um [tipo de enumeração](<#/doc/language/enum>);

*   [std::nullptr_t](<#/doc/types/nullptr_t>);

| (desde C++11)
---|---
*   um [tipo de ponto flutuante](<#/doc/language/type-id>);
*   um [tipo de closure lambda](<#/doc/language/lambda>) cuja expressão lambda não possui captura;
*   um [literal class type](<#/doc/named_req/LiteralType>) não-closure com as seguintes propriedades:

    *   todas as classes base e membros de dados não-estáticos são públicos e não-mutáveis e
    *   os tipos de todas as classes base e membros de dados não-estáticos são tipos estruturais ou (possivelmente multi-dimensionais) arrays destes.

| (desde C++20)
---|---

Tipos array e função podem ser escritos em uma declaração de template, mas são automaticamente substituídos por ponteiro para objeto e ponteiro para função, conforme apropriado.

Quando o nome de um parâmetro de template não-tipo é usado em uma expressão dentro do corpo do template de classe, ele é um [prvalue](<#/doc/language/value_category>) não modificável, a menos que seu tipo fosse um tipo de referência lvalue, ou a menos que seu tipo seja um tipo de classe (desde C++20).

Um parâmetro de template na forma class Foo não é um parâmetro de template não-tipo sem nome do tipo `Foo`, mesmo que de outra forma class Foo seja um [elaborated type specifier](<#/doc/language/elaborated_type_specifier>) e class Foo x; declare x como sendo do tipo `Foo`.

Um [identificador](<#/doc/language/name>) que nomeia um parâmetro de template não-tipo de um tipo de classe `T` denota um objeto de duração de armazenamento estático do tipo const T, chamado de _objeto de parâmetro de template_, que é [template-argument-equivalent](<#/doc/language/template_parameters>) ao argumento de template correspondente após ter sido convertido para o tipo do parâmetro de template. Nenhum par de objetos de parâmetro de template é template-argument-equivalent.
```
    struct A
    {
        friend bool operator==(const A&, const A&) = default;
    };

    template<A a>
    void f()
    {
        &a;                       // OK
        const A& ra = a, &rb = a; // Both bound to the same template parameter object
        assert(&ra == &rb);       // passes
    }
```

| (desde C++20)
---|---

#### Parâmetro de template de tipo

---
type-parameter-key name ﻿(opcional) | (1) |
type-parameter-key name ﻿(opcional) `=` default | (2) |
type-parameter-key `...` name ﻿(opcional) | (3) | (desde C++11)
type-constraint name ﻿(opcional) | (4) | (desde C++20)
type-constraint name ﻿(opcional) `=` default | (5) | (desde C++20)
type-constraint `...` name ﻿(opcional) | (6) | (desde C++20)
type-parameter-key | - | ou `typename` ou `class`. Não há diferença entre essas palavras-chave em uma declaração de parâmetro de template de tipo
---|---|---
type-constraint | - | ou o nome de um [concept](<#/doc/language/constraints>) ou o nome de um concept seguido por uma lista de argumentos de template (entre colchetes angulares). De qualquer forma, o nome do concept pode ser opcionalmente qualificado
name | - | o nome do parâmetro de template de tipo
default | - | o [argumento de template padrão](<#/doc/language/template_parameters>)

1) Um parâmetro de template de tipo sem um padrão.
```
    template<class T>
    class My_vector { /* ... */ };
```

2) Um parâmetro de template de tipo com um padrão.
```
    template<class T = void>
    struct My_op_functor { /* ... */ };
```

3) Um [parameter pack](<#/doc/language/parameter_pack>) de template de tipo.
```
    template<typename... Ts>
    class My_tuple { /* ... */ };
```

4) Um parâmetro de template de tipo restrito sem um padrão.
```
    template<My_concept T>
    class My_constrained_vector { /* ... */ };
```

5) Um parâmetro de template de tipo restrito com um padrão.
```
    template<My_concept T = void>
    class My_constrained_op_functor { /* ... */ };
```

6) Um [parameter pack](<#/doc/language/parameter_pack>) de template de tipo restrito.
```
    template<My_concept... Ts>
    class My_constrained_tuple { /* ... */ };
```

O nome do parâmetro é opcional:
```
    // Declarations of the templates shown above:
    template<class>
    class My_vector;
    template<class = void>
    struct My_op_functor;
    template<typename...>
    class My_tuple;
```

No corpo da declaração do template, o nome de um parâmetro de tipo é um typedef-name que é um alias para o tipo fornecido quando o template é instanciado.

Cada parâmetro restrito `P` cujo type-constraint é Q designando o concept `C` introduz uma [constraint-expression](<#/doc/language/constraints>) `E` de acordo com as seguintes regras:

*   se `Q` é `C` (sem uma lista de argumentos),

    *   se `P` não é um parameter pack, `E` é simplesmente `C<P>`
    *   caso contrário, `P` é um parameter pack, `E` é uma fold-expression `(C<P> && ...)`

*   se `Q` é `C<A1,A2...,AN>`, então `E` é `C<P,A1,A2,...AN>` ou `(C<P,A1,A2,...AN> && ...)`, respectivamente.

```
    template<typename T>
    concept C1 = true;
    template<typename... Ts> // variadic concept
    concept C2 = true;
    template<typename T, typename U>
    concept C3 = true;

    template<C1 T>         struct s1; // constraint-expression is C1<T>
    template<C1... T>      struct s2; // constraint-expression is (C1<T> && ...)
    template<C2... T>      struct s3; // constraint-expression is (C2<T> && ...)
    template<C3<int> T>    struct s4; // constraint-expression is C3<T, int>
    template<C3<int>... T> struct s5; // constraint-expression is (C3<T, int> && ...)
```

| (desde C++20)
---|---

#### Parâmetro de template template

---
`template` `<` parameter-list `>` type-parameter-key name ﻿(opcional) | (1) |
`template` `<` parameter-list `>` type-parameter-key name ﻿(opcional) `=` default | (2) |
`template` `<` parameter-list `>` type-parameter-key `...` name ﻿(opcional) | (3) | (desde C++11)
type-parameter-key | - | `class` ou `typename`(desde C++17)
---|---|---

1) Um parâmetro de template template com um nome opcional.

2) Um parâmetro de template template com um nome opcional e um padrão.

3) Um [parameter pack](<#/doc/language/parameter_pack>) de template template com um nome opcional.

No corpo da declaração do template, o nome deste parâmetro é um template-name (e precisa de argumentos para ser instanciado).
```
    template<typename T>
    class my_array {};

    // two type template parameters and one template template parameter:
    template<typename K, typename V, template<typename> typename C = my_array>
    class Map
    {
        C<K> key;
        C<V> value;
    };
```

#### Resolução de nomes para parâmetros de template

O nome de um parâmetro de template não pode ser redeclarado dentro de seu escopo (incluindo escopos aninhados). Um parâmetro de template não pode ter o mesmo nome que o nome do template.
```
    template<class T, int N>
    class Y
    {
        int T;      // error: template parameter redeclared
        void f()
        {
            char T; // error: template parameter redeclared
        }
    };

    template<class X>
    class X; // error: template parameter redeclared
```

Na definição de um membro de um template de classe que aparece fora da definição do template de classe, o nome de um membro do template de classe oculta o nome de um parâmetro de template de quaisquer templates de classe envolventes, mas não um parâmetro de template do membro se o membro for um template de classe ou função.
```
    template<class T>
    struct A
    {
        struct B {};
        typedef void C;
        void f();

        template<class U>
        void g(U);
    };

    template<class B>
    void A<B>::f()
    {
        B b; // A's B, not the template parameter
    }

    template<class B>
    template<class C>
    void A<B>::g(C)
    {
        B b; // A's B, not the template parameter
        C c; // the template parameter C, not A's C
    }
```

Na definição de um membro de um template de classe que aparece fora do namespace que contém a definição do template de classe, o nome de um parâmetro de template oculta o nome de um membro deste namespace.
```
    namespace N
    {
        class C {};

        template<class T>
        class B
        {
            void f(T);
        };
    }

    template<class C>
    void N::B<C>::f(C)
    {
        C b; // C is the template parameter, not N::C
    }
```

Na definição de um template de classe ou na definição de um membro de tal template que aparece fora da definição do template, para cada classe base não-[dependente](<#/doc/language/dependent_name>), se o nome da classe base ou o nome de um membro da classe base for o mesmo que o nome de um parâmetro de template, o nome da classe base ou o nome do membro oculta o nome do parâmetro de template.
```
    struct A
    {
        struct B {};
        int C;
        int Y;
    };

    template<class B, class C>
    struct X : A
    {
        B b; // A's B
        C b; // error: A's C isn't a type name
    };
```

### Argumentos de template

Para que um template seja instanciado, cada parâmetro de template (de tipo, não-tipo ou template) deve ser substituído por um argumento de template correspondente. Para [templates de classe](<#/doc/language/class_template>), os argumentos são fornecidos explicitamente, [deduzidos do inicializador](<#/doc/language/ctad>), (desde C++17) ou padronizados. Para [templates de função](<#/doc/language/function_template>), os argumentos são fornecidos explicitamente, [deduzidos do contexto](<#/doc/language/template_argument_deduction>), ou padronizados.

Se um argumento pode ser interpretado tanto como um [type-id](<#/doc/language/type-id>) quanto como uma expressão, ele é sempre interpretado como um type-id, mesmo que o parâmetro de template correspondente seja não-tipo:
```
    template<class T>
    void f(); // #1

    template<int I>
    void f(); // #2

    void g()
    {
        f<int()>(); // "int()" is both a type and an expression,
                    // calls #1 because it is interpreted as a type
    }
```

#### Argumentos de template não-tipo

O argumento de template que pode ser usado com um parâmetro de template não-tipo pode ser qualquer [expressão manifestamente avaliada em tempo de compilação](<#/doc/language/constant_expression>). | (ate C++11)
---|---
O argumento de template que pode ser usado com um parâmetro de template não-tipo pode ser qualquer [cláusula inicializadora](<#/doc/language/initialization>). Se a cláusula inicializadora for uma expressão, ela deve ser [manifestamente avaliada em tempo de compilação](<#/doc/language/constant_expression>). | (desde C++11)

Dado o tipo da [declaração de parâmetro de template não-tipo](<#/doc/language/template_parameters>) como `T` e o argumento de template fornecido para o parâmetro como E.

```cpp
A declaração inventada T x = E; deve satisfazer as restrições semânticas para a definição de uma variável constexpr com duração de armazenamento estática.  // (desde C++26)
```
---|---
Se `T` contém um [placeholder type](<#/doc/language/auto>), ou é um [placeholder para um tipo de classe deduzido](<#/doc/language/ctad>), o tipo do parâmetro de template é o tipo deduzido para a variável x na declaração inventada T x = E;. Se um tipo de parâmetro deduzido não for um [tipo estrutural](<#/doc/language/template_parameters>), o programa é malformado. Para parameter packs de template não-tipo cujo tipo usa um placeholder type, o tipo é deduzido independentemente para cada argumento de template e não precisa corresponder. | (desde C++17)
```
    template<auto n>
    struct B { /* ... */ };

    B<5> b1;   // OK: non-type template parameter type is int
    B<'a'> b2; // OK: non-type template parameter type is char
    B<2.5> b3; // error (until C++20): non-type template parameter type cannot be double

    // C++20 deduced class type placeholder, class template arguments are deduced at the
    // call site
    template<std::array arr>
    void f();

    f<std::array<double, 8>{}>();

    template<auto...>
    struct C {};

    C<'C', 0, 2L, nullptr> x; // OK
```

O valor de um parâmetro de template não-tipo P de tipo `T` (possivelmente deduzido)(desde C++17) é determinado a partir de seu argumento de template A da seguinte forma:

*   Se A é uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo `T`, o valor de P é A (conforme convertido).
*   Caso contrário, o programa é malformado.

| (ate C++11)
---|---

*   Se A é uma expressão:

    *   Se A é uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo `T`, o valor de P é A (conforme convertido).
    *   Caso contrário, o programa é malformado.

*   Caso contrário (A é uma lista inicializadora entre chaves), uma variável temporária constexpr T v = A; é introduzida. O valor de P é o de v.

    *   O [tempo de vida](<#/doc/language/lifetime>) de v termina imediatamente após sua inicialização.

| (desde C++11)
(ate C++20)

*   Se `T` não é um tipo de classe e A é uma expressão:

    *   Se A é uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo `T`, o valor de P é A (conforme convertido).
    *   Caso contrário, o programa é malformado.

*   Caso contrário (`T` é um tipo de classe ou A é uma lista inicializadora entre chaves), uma variável temporária constexpr T v = A; é introduzida.

    *   Se `T` é um tipo de classe, um [objeto de parâmetro de template](<#/doc/language/template_parameters>) existe (que também é denotado por P). P é inicializado por cópia a partir de um inicializador candidato não especificado que é [template-argument-equivalent](<#/doc/language/template_parameters>) a v.

    *   O [tempo de vida](<#/doc/language/lifetime>) de v termina imediatamente após sua inicialização e a de P.
    *   Se a inicialização de P satisfaz qualquer uma das seguintes condições, o programa é malformado:

        *   A inicialização seria malformada.
        *   A [full-expression](<#/doc/language/expressions>) de uma sequência declarator-initializer inventada para a inicialização não seria uma expressão constante quando interpretada como uma [expressão manifestamente avaliada em tempo de compilação](<#/doc/language/constant_expression>).
        *   A inicialização faria com que P não fosse [template-argument-equivalent](<#/doc/language/template_parameters>) a v.

    *   Caso contrário, o valor de P é o de v.

| (desde C++20)
```
    template<int i>
    struct C { /* ... */ };

    C<{42}> c1; // OK

    template<auto n>
    struct B { /* ... */ };

    struct J1
    {
        J1* self = this;
    };

    B<J1{}> j1; // error: initialization of the template parameter object
                //        is not a constant expression

    struct J2
    {
        J2 *self = this;
        constexpr J2() {}
        constexpr J2(const J2&) {}
    };

    B<J2{}> j2; // error: the template parameter object is not
                //        template-argument-equivalent to introduced temporary
```

As seguintes limitações se aplicam ao instanciar templates que possuem parâmetros de template não-tipo:

*   Para tipos integrais e aritméticos, o argumento de template fornecido durante a instanciação deve ser uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo do parâmetro de template (portanto, certas conversões implícitas se aplicam).
*   Para ponteiros para objetos, os argumentos de template devem designar o endereço de um objeto completo com [duração de armazenamento estática](<#/doc/language/storage_duration>) e uma [ligação](<#/doc/language/storage_duration>) (interna ou externa), ou uma expressão constante que avalia para o ponteiro nulo apropriado ou valor [std::nullptr_t](<#/doc/types/nullptr_t>)(desde C++11).
*   Para ponteiros para funções, os argumentos válidos são ponteiros para funções com ligação (ou expressões constantes que avaliam para valores de ponteiro nulo).
*   Para parâmetros de referência lvalue, o argumento fornecido na instanciação não pode ser um temporário, um lvalue sem nome, ou um lvalue nomeado sem ligação (em outras palavras, o argumento deve ter ligação).
*   Para ponteiros para membros, o argumento deve ser um ponteiro para membro expresso como &Class::Member ou uma expressão constante que avalia para ponteiro nulo ou valor [std::nullptr_t](<#/doc/types/nullptr_t>)(desde C++11).

Em particular, isso implica que literais de string, endereços de elementos de array e endereços de membros não-estáticos não podem ser usados como argumentos de template para instanciar templates cujos parâmetros de template não-tipo correspondentes são ponteiros para objetos. | (ate C++17)
---|---
Parâmetros de template não-tipo de tipo referência ou ponteiro e membros de dados não-estáticos de tipo referência ou ponteiro em um parâmetro de template não-tipo de tipo de classe e seus subobjetos(desde C++20) não podem se referir a/ser o endereço de

*   um objeto temporário (incluindo um criado durante a [inicialização de referência](<#/doc/language/reference_initialization>));
*   um [literal de string](<#/doc/language/string_literal>);
*   o resultado de [`typeid`](<#/doc/language/typeid>);
*   a variável predefinida __func__;
*   ou um subobjeto (incluindo membro de classe não-estático, subobjeto base ou elemento de array) de um dos acima(desde C++20).

| (desde C++17)
```
    template<const int* pci>
    struct X {};

    int ai[10];
    X<ai> xi; // OK: array to pointer conversion and cv-qualification conversion

    struct Y {};

    template<const Y& b>
    struct Z {};

    Y y;
    Z<y> z;   // OK: no conversion

    template<int (&pa)[5]>
    struct W {};

    int b[5];
    W<b> w;   // OK: no conversion

    void f(char);
    void f(int);

    template<void (*pf)(int)>
    struct A {};

    A<&f> a;  // OK: overload resolution selects f(int)
```
```
    template<class T, const char* p>
    class X {};

    X<int, "Studebaker"> x1; // error: string literal as template-argument

    template<int* p>
    class X {};

    int a[10];

    struct S
    {
        int m;
        static int s;
    } s;

    X<&a[2]> x3; // error (until C++20): address of array element
    X<&s.m> x4;  // error (until C++20): address of non-static member
    X<&s.s> x5;  // OK: address of static member
    X<&S::s> x6; // OK: address of static member

    template<const int& CRI>
    struct B {};

    B<1> b2;     // error: temporary would be required for template argument
    int c = 1;
    B<c> b1;     // OK
```

#### Argumentos de template de tipo

Um argumento de template para um parâmetro de template de tipo deve ser um [type-id](<#/doc/language/type-id>), que pode nomear um tipo incompleto:
```
    template<typename T>
    class X {}; // class template

    struct A;            // incomplete type
    typedef struct {} B; // type alias to an unnamed type

    int main()
    {
        X<A> x1;  // OK: 'A' names a type
        X<A*> x2; // OK: 'A*' names a type
        X<B> x3;  // OK: 'B' names a type
    }
```

#### Argumentos de template template

Um argumento de template para um parâmetro de template template deve ser uma [id-expression](<#/doc/language/name>) que nomeia um template de classe ou um alias de template.

Quando o argumento é um template de classe, apenas o template primário é considerado ao fazer a correspondência com o parâmetro. As especializações parciais, se houver, são consideradas apenas quando uma especialização baseada neste parâmetro de template template é instanciada.
```
    template<typename T> // primary template
    class A { int x; };

    template<typename T> // partial specialization
    class A<T*> { long x; };

    // class template with a template template parameter V
    template<template<typename> class V>
    class C
    {
        V<int> y;  // uses the primary template
        V<int*> z; // uses the partial specialization
    };

    C<A> c; // c.y.x has type int, c.z.x has type long
```

Para que um argumento de template template `A` corresponda a um parâmetro de template template `P`, `P` deve ser _pelo menos tão especializado_ quanto `A` (veja abaixo). Se a lista de parâmetros de `P` inclui um [parameter pack](<#/doc/language/parameter_pack>), zero ou mais parâmetros de template (ou parameter packs) da lista de parâmetros de template de `A` são correspondidos por ele.(desde C++11)

Formalmente, um template template-parameter `P` é _pelo menos tão especializado_ quanto um argumento de template template `A` se, dada a seguinte reescrita para dois templates de função, o template de função correspondente a `P` é pelo menos tão especializado quanto o template de função correspondente a `A` de acordo com as regras de ordenação parcial para [templates de função](<#/doc/language/function_template>). Dado um template de classe inventado `X` com a lista de parâmetros de template de `A` (incluindo argumentos padrão):

*   Cada um dos dois templates de função tem os mesmos parâmetros de template, respectivamente, que `P` ou `A`.
*   Cada template de função tem um único parâmetro de função cujo tipo é uma especialização de `X` com argumentos de template correspondentes aos parâmetros de template do respectivo template de função onde, para cada parâmetro de template `PP` na lista de parâmetros de template do template de função, um argumento de template correspondente `AA` é formado. Se `PP` declara um parameter pack, então `AA` é a expansão de pack `PP...`; caso contrário,(desde C++11) `AA` é a id-expression `PP`.

Se a reescrita produzir um tipo inválido, então `P` não é pelo menos tão especializado quanto `A`.
```
    template<typename T>
    struct eval;                     // primary template

    template<template<typename, typename...> class TT, typename T1, typename... Rest>
    struct eval<TT<T1, Rest...>> {}; // partial specialization of eval

    template<typename T1> struct A;
    template<typename T1, typename T2> struct B;
    template<int N> struct C;
    template<typename T1, int N> struct D;
    template<typename T1, typename T2, int N = 17> struct E;

    eval<A<int>> eA;        // OK: matches partial specialization of eval
    eval<B<int, float>> eB; // OK: matches partial specialization of eval
    eval<C<17>> eC;         // error: C does not match TT in partial specialization
                            // because TT's first parameter is a
                            // type template parameter, while 17 does not name a type
    eval<D<int, 17>> eD;    // error: D does not match TT in partial specialization
                            // because TT's second parameter is a
                            // type parameter pack, while 17 does not name a type
    eval<E<int, float>> eE; // error: E does not match TT in partial specialization
                            // because E's third (default) parameter is a non-type
```

Antes da adoção de [P0522R0](<https://wg21.link/p0522r0>), cada um dos parâmetros de template de `A` deve corresponder exatamente aos parâmetros de template correspondentes de `P`. Isso impede que muitos argumentos de template razoáveis sejam aceitos.

Embora tenha sido apontado muito cedo ([CWG#150](<https://wg21.cmeerw.net/cwg/issue150>)), no momento em que foi resolvido, as mudanças foram aplicadas ao working paper do C++17 e a resolução se tornou um recurso de fato do C++17. Muitos compiladores o desabilitam por padrão:

*   [GCC](<https://gcc.gnu.org/gcc-7/changes.html#cxx>) o desabilita em todos os modos de linguagem anteriores ao C++17 por padrão; ele só pode ser habilitado definindo um flag do compilador nesses modos.
*   [Clang](<https://clang.llvm.org/cxx_status.html#p0522>) o desabilita em todos os modos de linguagem por padrão; ele só pode ser habilitado definindo um flag do compilador.
*   [Microsoft Visual Studio](<https://docs.microsoft.com/en-us/cpp/overview/visual-cpp-language-conformance>) o trata como um recurso normal do C++17 e só o habilita nos modos de linguagem C++17 e posteriores (ou seja, sem suporte no modo de linguagem C++14, que é o modo padrão).

```
    template<class T> class A { /* ... */ };
    template<class T, class U = T> class B { /* ... */ };
    template<class... Types> class C { /* ... */ };

    template<template<class> class P> class X { /* ... */ };
    X<A> xa; // OK
    X<B> xb; // OK after P0522R0
             // Error earlier: not an exact match
    X<C> xc; // OK after P0522R0
             // Error earlier: not an exact match

    template<template<class...> class Q> class Y { /* ... */ };
    Y<A> ya; // OK
    Y<B> yb; // OK
    Y<C> yc; // OK

    template<auto n> class D { /* ... */ };   // note: C++17
    template<template<int> class R> class Z { /* ... */ };
    Z<D> zd; // OK after P0522R0: the template parameter
             // is more specialized than the template argument

    template<int> struct SI { /* ... */ };
    template<template<auto> class> void FA(); // note: C++17
    FA<SI>(); // Error
```

#### Argumentos de template padrão

Argumentos de template padrão são especificados nas listas de parâmetros após o sinal `=`. Padrões podem ser especificados para qualquer tipo de parâmetro de template (tipo, não-tipo ou template), mas não para parameter packs(desde C++11).

Se o padrão for especificado para um parâmetro de template de um template de classe primário, template de variável primário,(desde C++14) ou alias de template, cada parâmetro de template subsequente deve ter um argumento padrão, exceto o último que pode ser um parameter pack de template(desde C++11). Em um template de função, não há restrições nos parâmetros que seguem um padrão, e um parameter pack pode ser seguido por mais parâmetros de tipo apenas se eles tiverem padrões ou puderem ser deduzidos dos argumentos da função(desde C++11).

Parâmetros padrão não são permitidos

*   na definição fora da classe de um membro de um [template de classe](<#/doc/language/class_template>) (eles devem ser fornecidos na declaração dentro do corpo da classe). Note que [templates de membro](<#/doc/language/member_template>) de classes não-template podem usar parâmetros padrão em suas definições fora da classe (veja [GCC bug 53856](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=53856>))
*   em declarações de [template de classe friend](<#/doc/language/friend>)

*   em qualquer declaração ou definição de [template de função](<#/doc/language/function_template>)

| (ate C++11)
---|---
Em uma declaração de template de função friend, argumentos de template padrão são permitidos apenas se a declaração for uma definição, e nenhuma outra declaração desta função aparecer nesta unidade de tradução. | (desde C++11)
---|---

Argumentos de template padrão que aparecem nas declarações são mesclados de forma semelhante aos argumentos de função padrão:
```
    template<typename T1, typename T2 = int> class A;
    template<typename T1 = int, typename T2> class A;

    // the above is the same as the following:
    template<typename T1 = int, typename T2 = int> class A;
```

Mas o mesmo parâmetro não pode receber argumentos padrão duas vezes no mesmo escopo:
```
    template<typename T = int> class X;
    template<typename T = int> class X {}; // error
```

Ao analisar um argumento de template padrão para um parâmetro de template não-tipo, o primeiro `>` não aninhado é considerado o fim da lista de parâmetros de template, em vez de um operador de "maior que":
```
    template<int i = 3 > 4>   // syntax error
    class X { /* ... */ };

    template<int i = (3 > 4)> // OK
    class Y { /* ... */ };
```

As listas de parâmetros de template de parâmetros de template template podem ter seus próprios argumentos padrão, que só estão em vigor onde o próprio parâmetro de template template está no escopo:
```
    // class template, with a type template parameter with a default
    template<typename T = float>
    struct B {};

    // template template parameter T has a parameter list, which
    // consists of one type template parameter with a default
    template<template<typename = float> typename T>
    struct A
    {
        void f();
        void g();
    };

    // out-of-body member function template definitions

    template<template<typename TT> class T>
    void A<T>::f()
    {
        T<> t; // error: TT has no default in scope
    }

    template<template<typename TT = char> class T>
    void A<T>::g()
    {
        T<> t; // OK: t is T<char>
    }
```

O [acesso a membros](<#/doc/language/access>) para os nomes usados em um parâmetro de template padrão é verificado na declaração, não no ponto de uso:
```
    class B {};

    template<typename T>
    class C
    {
    protected:
        typedef T TT;
    };

    template<typename U, typename V = typename U::TT>
    class D: public U {};

    D<C<B>>* d; // error: C::TT is protected
```

O argumento de template padrão é implicitamente instanciado quando o valor desse argumento padrão é necessário, exceto se o template for usado para nomear uma função:
```
    template<typename T, typename U = int>
    struct S {};

    S<bool>* p; // The default argument for U is instantiated at this point
```
```cpp
                // the type of p is S<bool, int>*
```

| (desde C++14)
---|---
#### Equivalência de Argumentos Template

A equivalência de argumentos template é usada para determinar se dois [identificadores de template](<#/doc/language/templates>) são os mesmos.

Dois valores são _template-argument-equivalentes_ se forem do mesmo tipo e qualquer uma das seguintes condições for satisfeita:

  * Eles são de tipo integral ou de enumeração e seus valores são os mesmos.
  * Eles são de tipo ponteiro e têm o mesmo valor de ponteiro.
  * Eles são de tipo ponteiro para membro e referem-se ao mesmo membro de classe ou ambos são o valor de ponteiro de membro nulo.
  * Eles são de tipo referência lvalue e referem-se ao mesmo objeto ou função.

  * Eles são do tipo [std::nullptr_t](<#/doc/types/nullptr_t>).

| (desde C++11)
---|---

  * Eles são de tipo ponto flutuante e seus valores são idênticos.
  * Eles são de tipo array (neste caso, os arrays devem ser objetos membro de alguma classe/união) e seus elementos correspondentes são template-argument-equivalentes.
  * Eles são de tipo união e ambos não têm membro ativo ou têm o mesmo membro ativo e seus membros ativos são template-argument-equivalentes.
  * Eles são de um tipo de closure lambda.
  * Eles são de tipo de classe não-união e seus subobjetos diretos correspondentes e membros de referência são template-argument-equivalentes.

| (desde C++20)
---|---

### Notas

Em parâmetros template, restrições de tipo podem ser usadas tanto para parâmetros de tipo quanto para parâmetros não-tipo, dependendo se `auto` está presente.
```cpp
    template<typename>
    concept C = true;
    
    template<C,     // type parameter 
             C auto // non-type parameter
            >
    struct S{};
    
    S<int, 0> s;
```

| (desde C++20)
---|---
Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_nontype_template_parameter_auto`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | Declarando [parâmetros template não-tipo](<#/doc/language/template_parameters>) com `auto`
[`__cpp_template_template_args`](<#/doc/feature_test>) | [`201611L`](<#/>) | (c++17)
(DR) | Correspondência de [argumentos template template](<#/doc/language/template_parameters>)
[`__cpp_nontype_template_args`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | Permitir avaliação constante para todos os [argumentos template não-tipo](<#/doc/language/template_parameters>)
[`201911L`](<#/>) | (C++20) | Tipos de classe e tipos de ponto flutuante em [parâmetros template não-tipo](<#/doc/language/template_parameters>)

### Exemplos

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <numeric>
    
    // simple non-type template parameter
    template<int N>
    struct S { int a[N]; };
    
    template<const char*>
    struct S2 {};
    
    // complicated non-type example
    template
    <
        char c,             // integral type
        int (&ra)[5],       // lvalue reference to object (of array type)
        int (*pf)(int),     // pointer to function
        int (S<10>::*a)[10] // pointer to member object (of type int[10])
    >
    struct Complicated
    {
        // calls the function selected at compile time
        // and stores the result in the array selected at compile time
        void foo(char base)
        {
            ra[4] = pf(c - base);
        }
    };
    
    //  S2<"fail"> s2;        // error: string literal cannot be used
        char okay[] = "okay"; // static object with linkage
    //  S2<&okay[0]> s3;      // error: array element has no linkage
        S2<okay> s4;          // works
    
    int a[5];
    int f(int n) { return n; }
    
    // C++20: NTTP can be a literal class type
    template<std::array arr>
    constexpr
    auto sum() { return std::accumulate(arr.cbegin(), arr.cend(), 0); }
    
    // C++20: class template arguments are deduced at the call site
    static_assert(sum<std::array<double, 8>{3, 1, 4, 1, 5, 9, 2, 6}>() == 31.0);
    // C++20: NTTP argument deduction and CTAD
    static_assert(sum<std::array{2, 7, 1, 8, 2, 8}>() == 28);
    
    int main()
    {
        S<10> s; // s.a is an array of 10 int
        s.a[9] = 4;
    
        Complicated<'2', a, f, &S<10>::a> c;
        c.foo('0');
    
        std::cout << s.a[9] << a[4] << '\n';
    }
```

Saída:
```
    42
```

| Esta seção está incompleta
Razão: mais exemplos
---|---

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 150](<https://cplusplus.github.io/CWG/issues/150.html>)
([P0522R0](<https://wg21.link/P0522R0>)) | C++98 | argumentos template-template tinham que corresponder exatamente às listas de parâmetros de parâmetros template-template | mais especializado também permitido
---|---|---|---
[CWG 184](<https://cplusplus.github.io/CWG/issues/184.html>) | C++98 | se os parâmetros template de parâmetros template template podem ter argumentos padrão é não especificado | especificação adicionada
[CWG 354](<https://cplusplus.github.io/CWG/issues/354.html>) | C++98 | valores de ponteiro nulo não podiam ser argumentos template não-tipo | permitido
[CWG 1398](<https://cplusplus.github.io/CWG/issues/1398.html>) | C++11 | argumentos template não-tipo não podiam ter o tipo `std::nullptr_t` | permitido
[CWG 1570](<https://cplusplus.github.io/CWG/issues/1570.html>) | C++98 | argumentos template não-tipo podiam designar endereços de subobjetos | não permitido
[CWG 1922](<https://cplusplus.github.io/CWG/issues/1922.html>) | C++98 | não estava claro se um template de classe cujo nome é um injected-class-name pode usar os argumentos padrão em declarações anteriores | permitido
[CWG 2032](<https://cplusplus.github.io/CWG/issues/2032.html>) | C++14 | para templates de variável, não havia restrição nos parâmetros template após um parâmetro template com um argumento padrão | aplicar a mesma restrição que em templates de classe e templates de alias
[CWG 2542](<https://cplusplus.github.io/CWG/issues/2542.html>) | C++20 | não estava claro se o tipo de closure é estrutural | não é estrutural
[CWG 2845](<https://cplusplus.github.io/CWG/issues/2845.html>) | C++20 | o tipo de closure não era estrutural | é estrutural se sem captura
[P2308R1](<https://wg21.link/P2308R1>) | C++11
C++20 | 1. list-initialization não era permitida para argumentos template não-tipo (C++11)
2. não estava claro como parâmetros template não-tipo de tipos de classe são inicializados (C++20) | 1. permitido
2. esclarecido