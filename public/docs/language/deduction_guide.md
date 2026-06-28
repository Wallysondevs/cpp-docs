# Dedução de argumentos de template de classe (CTAD) (desde C++17)

Para instanciar um [class template](<#/doc/language/class_template>), cada argumento de template deve ser conhecido, mas nem todo argumento de template precisa ser especificado. Nos seguintes contextos, o compilador deduzirá os argumentos de template a partir do tipo do inicializador:

*   qualquer [declaração](<#/doc/language/declarations>) que especifique a inicialização de uma variável e de um template de variável, cujo tipo declarado é o class template (possivelmente [cv-qualified](<#/doc/language/cv>)):

```
    std::pair p(2, 4.5);     // deduces to std::pair<int, double> p(2, 4.5);
    std::tuple t(4, 3, 2.5); // same as auto t = std::make_tuple(4, 3, 2.5);
    std::less l;             // same as std::less<void> l;
```

*   [new-expressions](<#/doc/language/new>):

```
    template<class T>
    struct A
    {
        A(T, T);
    };
     
    auto y = new A{1, 2}; // allocated type is A<int>
```

*   expressões de [function-style cast](<#/doc/language/explicit_cast>):

```
    auto lck = std::lock_guard(mtx);     // deduces to std::lock_guard<std::mutex>
    std::copy_n(vi1, 3,
        std::back_insert_iterator(vi2)); // deduces to std::back_insert_iterator<T>,
                                         // where T is the type of the container vi2
    std::for_each(vi.begin(), vi.end(),
        Foo(& {...}));          // deduces to Foo<T>,
                                         // where T is the unique lambda type
```

*   o tipo de um [non-type template parameter](<#/doc/language/template_parameters>):

```
    template<class T>
    struct X
    {
        constexpr X(T) {}
    };
     
    template<X x>
    struct Y {};
     
    Y<0> y; // OK, Y<X<int>(0)>
```

| (desde C++20)

### Dedução para class templates

#### Guias de dedução geradas implicitamente

Quando, em um function-style cast ou na declaração de uma variável, o especificador de tipo consiste unicamente no nome de um class template primário `C` (ou seja, não há uma lista de argumentos de template acompanhante), os candidatos para dedução são formados da seguinte maneira:

*   Se `C` é definido, para cada construtor (ou template de construtor) `Ci` declarado no template primário nomeado, um template de função fictício `Fi` é construído, de modo que todas as seguintes condições sejam satisfeitas:

    *   Os parâmetros de template de `Fi` são os parâmetros de template de `C` seguidos (se `Ci` for um template de construtor) pelos parâmetros de template de `Ci` (argumentos de template padrão também são incluídos).

    *   As [restrições associadas](<#/doc/language/constraints>) de `Fi` são a conjunção das restrições associadas de `C` e das restrições associadas de `Ci`.

| (desde C++20)

    *   A [lista de parâmetros](<#/doc/language/function>) de `Fi` é a lista de parâmetros de `Ci`.
    *   O tipo de retorno de `Fi` é `C` seguido pelos parâmetros de template do class template entre `<>`.

*   Se `C` não for definido ou não declarar nenhum construtor, um template de função fictício adicional é adicionado, derivado como acima de um construtor hipotético `C()`.

*   Em qualquer caso, um template de função fictício adicional derivado como acima de um construtor hipotético `C(C)` é adicionado, chamado de candidato de dedução de cópia.

*   Para cada [guia de dedução definida pelo usuário](<#/doc/language/ctad>) `Gi`, uma função ou template de função fictício `Fi` é construído, de modo que todas as seguintes condições sejam satisfeitas:

    *   A lista de parâmetros de `Fi` é a lista de parâmetros de `Gi`.
    *   O tipo de retorno de `Fi` é o identificador de template simples de `Gi`.
    *   Se `Gi` tiver parâmetros de template (sintaxe (2)), `Fi` é um template de função, e sua lista de parâmetros de template é a lista de parâmetros de template de `Gi`. Caso contrário, `Fi` é uma função.

*   Além disso, se

    *   `C` é definido e satisfaz os requisitos de um [tipo agregado](<#/doc/language/aggregate_initialization>) com a suposição de que qualquer classe base dependente não possui funções virtuais ou classes base virtuais,
    *   não há guias de dedução definidas pelo usuário para `C`, e
    *   a variável é inicializada a partir de uma lista não vazia de inicializadores arg1, arg2, ..., argn (que pode usar [designated initializer](<#/doc/language/aggregate_initialization>)),

    um candidato de dedução de agregado pode ser adicionado. A lista de parâmetros do candidato de dedução de agregado é produzida a partir dos tipos de elementos agregados, da seguinte forma:

    *   Seja `ei` o [elemento agregado](<#/doc/language/aggregate_initialization>) (possivelmente recursivo) que seria inicializado a partir de `argi`, onde

        *   [brace elision](<#/doc/language/aggregate_initialization>) não é considerada para qualquer elemento agregado que tenha

            *   um tipo não-array [dependente](<#/doc/language/dependent_name>),
            *   um tipo array com um limite [value-dependent](<#/doc/language/dependent_name>), ou
            *   um tipo array com um tipo de elemento array dependente e `argi` é um [string literal](<#/doc/language/string_literal>)

        *   se `C` (ou seu elemento que é ele próprio um agregado) tiver uma base que é uma [pack expansion](<#/doc/language/parameter_pack>):

            *   se a pack expansion for um elemento agregado final, ela é considerada para corresponder a todos os elementos restantes da lista de inicializadores;
            *   caso contrário, o pack é considerado vazio.

    *   Se não houver tal `ei`, o candidato de dedução de agregado não é adicionado.
    *   Caso contrário, determine a lista de parâmetros `T1, T2, ..., Tn` do candidato de dedução de agregado da seguinte forma:

        *   Se `ei` for um array e `argi` for uma braced-init-list, `Ti` é uma rvalue reference para o tipo declarado de `ei`.
        *   Se `ei` for um array e `argi` for um [string literal](<#/doc/language/string_literal>), `Ti` é uma lvalue reference para o tipo declarado const-qualified de `ei`.
        *   Caso contrário, `Ti` é o tipo declarado de `ei`.
        *   Se um pack foi ignorado porque é um elemento agregado não-final, um pack de parâmetros adicional da forma `Pj ...` é inserido em sua posição original de elemento agregado. (Isso geralmente fará com que a dedução falhe.)
        *   Se um pack for um elemento agregado final, a sequência final de parâmetros correspondente a ele é substituída por um único parâmetro da forma `Tn ...`.

    O candidato de dedução de agregado é um template de função fictício derivado como acima de um construtor hipotético `C(T1, T2, ..., Tn)`.

    Durante a dedução de argumentos de template para o candidato de dedução de agregado, o número de elementos em um pack de parâmetros final é deduzido do número de argumentos de função restantes apenas se não for deduzido de outra forma.
```
    template<class T>
    struct A
    {
        T t;
     
        struct
        {
            long a, b;
        } u;
    };
     
    A a{1, 2, 3};
    // aggregate deduction candidate:
    //   template<class T>
    //   A<T> F(T, long, long);
     
    template<class... Args>
    struct B : std::tuple<Args...>, Args... {};
     
    B b{std::tuple<std::any, std::string>{}, std::any{}};
    // aggregate deduction candidate:
    //   template<class... Args>
    //   B<Args...> F(std::tuple<Args...>, Args...);
     
    // type of b is deduced as B<std::any, std::string>
```

| (desde C++20)

A [dedução de argumentos de template](<#/doc/language/template_argument_deduction>) e a [resolução de sobrecarga](<#/doc/language/overload_resolution>) são então realizadas para a inicialização de um objeto fictício de um tipo de classe hipotético, cujas assinaturas de construtor correspondem às guias (exceto pelo tipo de retorno) para o propósito de formar um conjunto de sobrecarga, e o inicializador é fornecido pelo contexto em que a dedução de argumentos de template de classe foi realizada, exceto que a primeira fase da [list-initialization](<#/doc/language/overload_resolution>) (considerando construtores de initializer-list) é omitida se a lista de inicializadores consistir em uma única expressão de tipo (possivelmente cv-qualified) `U`, onde `U` é uma especialização de `C` ou uma classe derivada de uma especialização de `C`.

Esses construtores fictícios são membros públicos do tipo de classe hipotético. Eles são `explicit` se a guia foi formada a partir de um construtor `explicit`. Se a resolução de sobrecarga falhar, o programa é malformado. Caso contrário, o tipo de retorno da especialização de template `F` selecionada torna-se a especialização de template de classe deduzida.
```
    template<class T>
    struct UniquePtr
    {
        UniquePtr(T* t);
    };
     
    UniquePtr dp{new auto(2.0)};
     
    // One declared constructor:
    // C1: UniquePtr(T*);
     
    // Set of implicitly-generated deduction guides:
     
    // F1: template<class T>
    //     UniquePtr<T> F(T* p);
     
    // F2: template<class T>
    //     UniquePtr<T> F(UniquePtr<T>); // copy deduction candidate
     
    // imaginary class to initialize:
    // struct X
    // {
    //     template<class T>
    //     X(T* p);         // from F1
    //     
    //     template<class T>
    //     X(UniquePtr<T>); // from F2
    // };
     
    // direct-initialization of an X object
    // with "new double(2.0)" as the initializer
    // selects the constructor that corresponds to the guide F1 with T = double
    // For F1 with T=double, the return type is UniquePtr<double>
     
    // result:
    // UniquePtr<double> dp{new auto(2.0)}
```

Ou, para um exemplo mais complexo (nota: "`S::N`" não compilaria: qualificadores de resolução de escopo não são algo que pode ser deduzido):
```
    template<class T>
    struct S
    {
        template<class U>
        struct N
        {
            N(T);
            N(T, U);
     
            template<class V>
            N(V, U);
        };
    };
     
    S<int>::N x{2.0, 1};
     
    // the implicitly-generated deduction guides are (note that T is already known to be int)
     
    // F1: template<class U>
    //     S<int>::N<U> F(int);
     
    // F2: template<class U>
    //     S<int>::N<U> F(int, U);
     
    // F3: template<class U, class V>
    //     S<int>::N<U> F(V, U);
     
    // F4: template<class U>
    //     S<int>::N<U> F(S<int>::N<U>); (copy deduction candidate)
     
    // Overload resolution for direct-list-init with "{2.0, 1}" as the initializer
    // chooses F3 with U=int and V=double.
    // The return type is S<int>::N<int>
     
    // result:
    // S<int>::N<int> x{2.0, 1};
```

#### Guias de dedução definidas pelo usuário

A sintaxe de uma guia de dedução definida pelo usuário é a sintaxe de uma declaração de função (template) com um tipo de retorno final, exceto que ela usa o nome de um class template como o nome da função:

---
```cpp
explicit ﻿(opcional) template-name `(` parameter-list `)` `- >` simple-template-id requires-clause ﻿(opcional) `;`  // (1)
`template <`template-parameter-list ﻿`>` requires-clause ﻿(opcional)
explicit ﻿(opcional) template-name `(` parameter-list `)` `- >` simple-template-id requires-clause ﻿(opcional) `;`  // (2)
```
- **template-parameter-list** — uma lista não vazia de [parâmetros de template](<#/doc/language/template_parameters>) separados por vírgulas
- **explicit** — um especificador [`explicit`](<#/doc/language/explicit>)
- **template-name** — o nome do class template cujos argumentos devem ser deduzidos
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) (possivelmente vazia)
- **simple-template-id** — um [identificador de template simples](<#/doc/language/templates>)
- **requires-clause** — (desde C++20) uma [requires clause](<#/doc/language/constraints>)

Os parâmetros das guias de dedução definidas pelo usuário não podem ter tipos placeholder: a sintaxe de [abbreviated function template](<#/doc/language/function_template>) não é permitida. | (desde C++20)

Guias de dedução definidas pelo usuário devem nomear um class template e devem ser introduzidas dentro do mesmo escopo semântico do class template (que pode ser um namespace ou uma classe envolvente) e, para um class template membro, devem ter o mesmo acesso, mas as guias de dedução não se tornam membros desse escopo.

Uma guia de dedução não é uma função e não possui um corpo. Guias de dedução não são encontradas por name lookup e não participam da resolução de sobrecarga, exceto pela [resolução de sobrecarga contra outras guias de dedução](<#/doc/language/overload_resolution>) ao deduzir argumentos de template de classe. Guias de dedução não podem ser redeclaradas na mesma unidade de tradução para o mesmo class template.
```
    // declaration of the template
    template<class T>
    struct container
    {
        container(T t) {}
     
        template<class Iter>
        container(Iter beg, Iter end);
    };
     
    // additional deduction guide
    template<class Iter>
    container(Iter b, Iter e) -> container<typename std::iterator_traits<Iter>::value_type>;
     
    // uses
    container c(7); // OK: deduces T=int using an implicitly-generated guide
    std::vector<double> v = {/* ... */};
    auto d = container(v.begin(), v.end()); // OK: deduces T=double
    container e{5, 6}; // Error: there is no std::iterator_traits<int>::value_type
```

Os construtores fictícios para fins de resolução de sobrecarga (descritos acima) são `explicit` se corresponderem a uma guia de dedução implicitamente gerada a partir de um construtor `explicit` ou a uma guia de dedução definida pelo usuário que é declarada [explicit](<#/doc/language/explicit>). Como sempre, tais construtores são ignorados no contexto de copy-initialization:
```
    template<class T>
    struct A
    {
        explicit A(const T&, ...) noexcept; // #1
        A(T&&, ...);                        // #2
    };
     
    int i;
    A a1 = {i, i}; // error: cannot deduce from rvalue reference in #2,
                   // and #1 is explicit, and not considered in copy-initialization.
    A a2{i, i};    // OK, #1 deduces to A<int> and also initializes
    A a3{0, i};    // OK, #2 deduces to A<int> and also initializes
    A a4 = {0, i}; // OK, #2 deduces to A<int> and also initializes
     
    template<class T>
    A(const T&, const T&) -> A<T&>; // #3
     
    template<class T>
    explicit A(T&&, T&&)  -> A<T>;  // #4
     
    A a5 = {0, 1}; // error: #3 deduces to A<int&>
                   // and #1 & #2 result in same parameter constructors.
    A a6{0, 1};    // OK, #4 deduces to A<int> and #2 initializes
    A a7 = {0, i}; // error: #3 deduces to A<int&>
    A a8{0, i};    // error: #3 deduces to A<int&>
```

Usar um `typedef` membro ou um alias template na lista de parâmetros de um construtor ou template de construtor não torna, por si só, o parâmetro correspondente da guia gerada implicitamente um contexto não deduzido.
```
    template<class T>
    struct B
    {
        template<class U>
        using TA = T;
     
        template<class U>
        B(U, TA<U>); // #1
    };
     
    // Implicit deduction guide generated from #1 is the equivalent of
    //     template<class T, class U>
    //     B(U, T) -> B<T>;
    // rather than
    //     template<class T, class U>
    //     B(U, typename B<T>::template TA<U>) -> B<T>;
    // which would not have been deducible
     
    B b{(int*)0, (char*)0}; // OK, deduces B<char*>
```

### Dedução para alias templates

Quando um function-style cast ou declaração de uma variável usa o nome de um alias template `A` sem uma lista de argumentos como o especificador de tipo, onde `A` é definido como um alias de `B<ArgList>`, o escopo de `B` é não-dependente, e `B` é um class template ou um alias template definido de forma semelhante, a dedução prosseguirá da mesma forma que para class templates, exceto que as guias são geradas a partir das guias de `B`, da seguinte forma:

*   Para cada guia `f` de `B`, deduza os argumentos de template do tipo de retorno de `f` de `B<ArgList>` usando [dedução de argumentos de template](<#/doc/language/template_argument_deduction>), exceto que a dedução não falha se alguns argumentos não forem deduzidos. Se a dedução falhar por outro motivo, prossiga com um conjunto vazio de argumentos de template deduzidos.
*   Substitua o resultado da dedução acima em `f`; se a substituição falhar, nenhuma guia é produzida; caso contrário, seja `g` o resultado da substituição, uma guia `f'` é formada, de modo que

    *   Os tipos de parâmetro e o tipo de retorno de `f'` são os mesmos que `g`
    *   Se `f` for um template, `f'` é um template de função cuja lista de parâmetros de template consiste em todos os parâmetros de template de `A` (incluindo seus argumentos de template padrão) que aparecem nas deduções acima ou (recursivamente) em seus argumentos de template padrão, seguidos pelos parâmetros de template de `f` que não foram deduzidos (incluindo seus argumentos de template padrão); caso contrário (`f` não é um template), `f'` é uma função
    *   As [restrições](<#/doc/language/constraints>) associadas de `f'` são a conjunção das restrições associadas de `g` e uma restrição que é satisfeita se e somente se os argumentos de `A` forem deduzíveis do tipo de resultado

```
    template<class T>
    class unique_ptr
    {
        /* ... */
    };
     
    template<class T>
    class unique_ptr<T[]>
    {
        /* ... */
    };
     
    template<class T>
    unique_ptr(T*) -> unique_ptr<T>;   // #1
     
    template<class T>
    unique_ptr(T*) -> unique_ptr<T[]>; // #2
     
    template<class T>
    concept NonArray = !std::is_array_v<T>;
     
    template<NonArray A>
    using unique_ptr_nonarray = unique_ptr<A>;
     
    template<class A>
    using unique_ptr_array = unique_ptr<A[]>;
     
    // generated guide for unique_ptr_nonarray:
     
    // from #1 (deduction of unique_ptr<T> from unique_ptr<A> yields T = A):
    // template<class A>
    //     requires(argument_of_unique_ptr_nonarray_is_deducible_from<unique_ptr<A>>)
    // auto F(A*) -> unique_ptr<A>;
     
    // from #2 (deduction of unique_ptr<T[]> from unique_ptr<A> yields nothing):
    // template<class T>
    //     requires(argument_of_unique_ptr_nonarray_is_deducible_from<unique_ptr<T[]>>)
    // auto F(T*) -> unique_ptr<T[]>;
     
    // where argument_of_unique_ptr_nonarray_is_deducible_from can be defined as
     
    // template<class>
    // class AA;
     
    // template<NonArray A>
    // class AA<unique_ptr_nonarray<A>> {};
     
    // template<class T>
    // concept argument_of_unique_ptr_nonarray_is_deducible_from =
    //     requires { sizeof(AA<T>); };
     
    // generated guide for unique_ptr_array:
     
    // from #1 (deduction of unique_ptr<T> from unique_ptr<A[]> yields T = A[]):
    // template<class A>
    //     requires(argument_of_unique_ptr_array_is_deducible_from<unique_ptr<A[]>>)
    // auto F(A(*)[]) -> unique_ptr<A[]>;
     
    // from #2 (deduction of unique_ptr<T[]> from unique_ptr<A[]> yields T = A):
    // template<class A>
    //     requires(argument_of_unique_ptr_array_is_deducible_from<unique_ptr<A[]>>)
    // auto F(A*) -> unique_ptr<A[]>;
     
    // where argument_of_unique_ptr_array_is_deducible_from can be defined as
     
    // template<class>
    // class BB;
     
    // template<class A>
    // class BB<unique_ptr_array<A>> {};
     
    // template<class T>
    // concept argument_of_unique_ptr_array_is_deducible_from =
    //     requires { sizeof(BB<T>); };
     
    // Use:
    unique_ptr_nonarray p(new int); // deduced to unique_ptr<int>
    // deduction guide generated from #1 returns unique_ptr<int>
    // deduction guide generated from #2 returns unique_ptr<int[]>, which is ignored because
    //   argument_of_unique_ptr_nonarray_is_deducible_from<unique_ptr<int[]>> is unsatisfied
     
    unique_ptr_array q(new int[42]); // deduced to unique_ptr<int[]>
    // deduction guide generated from #1 fails (cannot deduce A in A(*)[] from new int[42])
    // deduction guide generated from #2 returns unique_ptr<int[]>
```

| (desde C++20)

### Notas

A dedução de argumentos de template de classe é realizada apenas se nenhuma lista de argumentos de template estiver presente. Se uma lista de argumentos de template for especificada, a dedução não ocorre.
```
    std::tuple t1(1, 2, 3);                // OK: deduction
    std::tuple<int, int, int> t2(1, 2, 3); // OK: all arguments are provided
     
    std::tuple<> t3(1, 2, 3);    // Error: no matching constructor in tuple<>.
                                 //        No deduction performed.
    std::tuple<int> t4(1, 2, 3); // Error
```

A dedução de argumentos de template de classe de agregados geralmente requer guias de dedução definidas pelo usuário:
```
    template<class A, class B>
    struct Agg
    {
        A a;
        B b;
    };
    // implicitly-generated guides are formed from default, copy, and move constructors
     
    template<class A, class B>
    Agg(A a, B b) -> Agg<A, B>;
    // ^ This deduction guide can be implicitly generated in C++20
     
    Agg agg{1, 2.0}; // deduced to Agg<int, double> from the user-defined guide
     
    template<class... T>
    array(T&&... t) -> array<std::common_type_t<T...>, sizeof...(T)>;
    auto a = array{1, 2, 5u}; // deduced to array<unsigned, 3> from the user-defined guide
```

| (até C++20)

Guias de dedução definidas pelo usuário não precisam ser templates:
```
    template<class T>
    struct S
    {
        S(T);
    };
    S(char const*) -> S<std::string>;
     
    S s{"hello"}; // deduced to S<std::string>
```

Dentro do escopo de um class template, o nome do template sem uma lista de parâmetros é um nome de classe injetado, e pode ser usado como um tipo. Nesse caso, a dedução de argumentos de classe não acontece e os parâmetros de template devem ser fornecidos explicitamente:
```
    template<class T>
    struct X
    {
        X(T) {}
     
        template<class Iter>
        X(Iter b, Iter e) {}
     
        template<class Iter>
        auto foo(Iter b, Iter e)
        {
            return X(b, e); // no deduction: X is the current X<T>
        }
     
        template<class Iter>
        auto bar(Iter b, Iter e)
        {
            return X<typename Iter::value_type>(b, e); // must specify what we want
        }
     
        auto baz()
        {
            return ::X(0); // not the injected-class-name; deduced to be X<int>
        }
    };
```

Na [resolução de sobrecarga](<#/doc/language/overload_resolution>), a ordenação parcial tem precedência sobre se um template de função é gerado a partir de uma guia de dedução definida pelo usuário: se o template de função gerado a partir do construtor for mais especializado do que o gerado a partir da guia de dedução definida pelo usuário, o gerado a partir do construtor é escolhido. Como o candidato de dedução de cópia é tipicamente mais especializado do que um construtor de "wrapping", esta regra significa que a cópia é geralmente preferida ao "wrapping".
```
    template<class T>
    struct A
    {
        A(T, int*);     // #1
        A(A<T>&, int*); // #2
     
        enum { value };
    };
     
    template<class T, int N = T::value>
    A(T&&, int*) -> A<T>; //#3
     
    A a{1, 0}; // uses #1 to deduce A<int> and initializes with #1
    A b{a, 0}; // uses #2 (more specialized than #3) to deduce A<int> and initializes with #2
```

Quando desempates anteriores, incluindo ordenação parcial, falharam em distinguir entre dois templates de função candidatos, as seguintes regras se aplicam:

*   Um template de função gerado a partir de uma guia de dedução definida pelo usuário é preferido em relação a um implicitamente gerado a partir de um construtor ou template de construtor.
*   O candidato de dedução de cópia é preferido em relação a todos os outros templates de função implicitamente gerados a partir de um construtor ou template de construtor.
*   Um template de função implicitamente gerado a partir de um construtor não-template é preferido em relação a um template de função implicitamente gerado a partir de um template de construtor.

```
    template<class T>
    struct A
    {
        using value_type = T;
     
        A(value_type); // #1
        A(const A&);   // #2
        A(T, T, int);  // #3
     
        template<class U>
        A(int, T, U);  // #4
    };                 // #5, the copy deduction candidate A(A);
     
    A x(1, 2, 3); // uses #3, generated from a non-template constructor
     
    template<class T>
    A(T) -> A<T>; // #6, less specialized than #5
     
    A a(42); // uses #6 to deduce A<int> and #1 to initialize
    A b = a; // uses #5 to deduce A<int> and #2 to initialize
     
    template<class T>
    A(A<T>) -> A<A<T>>; // #7, as specialized as #5
     
    A b2 = a; // uses #7 to deduce A<A<int>> and #1 to initialize
```

Uma rvalue reference para um parâmetro de template cv-unqualified não é uma [forwarding reference](<#/doc/language/template_argument_deduction>) se esse parâmetro for um parâmetro de class template:
```
    template<class T>
    struct A
    {
        template<class U>
        A(T&&, U&&, int*); // #1: T&& is not a forwarding reference
                           //     U&& is a forwarding reference
     
        A(T&&, int*);      // #2: T&& is not a forwarding reference
    };
     
    template<class T>
    A(T&&, int*) -> A<T>; // #3: T&& is a forwarding reference
     
    int i, *ip;
    A a{i, 0, ip};  // error, cannot deduce from #1
    A a0{0, 0, ip}; // uses #1 to deduce A<int> and #1 to initialize
    A a2{i, ip};    // uses #3 to deduce A<int&> and #2 to initialize
```

Ao inicializar a partir de um único argumento de um tipo que é uma especialização do class template em questão, a dedução de cópia é geralmente preferida ao "wrapping" por padrão:
```
    std::tuple t1{1};  //std::tuple<int>
    std::tuple t2{t1}; //std::tuple<int>, not std::tuple<std::tuple<int>>
     
    std::vector v1{1, 2};   // std::vector<int>
    std::vector v2{v1};     // std::vector<int>, not std::vector<std::vector<int>> (P0702R1)
    std::vector v3{v1, v2}; // std::vector<std::vector<int>>
```

Fora do caso especial para cópia vs. "wrapping", a forte preferência por construtores de initializer-list na list-initialization permanece intacta.
```
    std::vector v1{1, 2}; // std::vector<int>
     
    std::vector v2(v1.begin(), v1.end()); // std::vector<int>
    std::vector v3{v1.begin(), v1.end()}; // std::vector<std::vector<int>::iterator>
```

Antes da introdução da dedução de argumentos de template de classe, uma abordagem comum para evitar a especificação explícita de argumentos era usar um template de função:
```
    std::tuple p1{1, 1.0};             //std::tuple<int, double>, using deduction
    auto p2 = std::make_tuple(1, 1.0); //std::tuple<int, double>, pre-C++17
```

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_deduction_guides`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | Dedução de argumentos de template para class templates
[`201907L`](<#/>) | (C++20) | CTAD para agregados e aliases

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 2376](<https://cplusplus.github.io/CWG/issues/2376.html>) | C++17 | CTAD seria realizado mesmo se o tipo da variável declarada fosse
diferente do class template cujos argumentos seriam deduzidos | não realizar
CTAD neste caso
[CWG 2628](<https://cplusplus.github.io/CWG/issues/2628.html>) | C++20 | guias de dedução implícitas não propagavam restrições | propagar restrições
[CWG 2697](<https://cplusplus.github.io/CWG/issues/2697.html>) | C++20 | não estava claro se a sintaxe de abbreviated function template
é permitida em guias de dedução definidas pelo usuário | proibido
[CWG 2707](<https://cplusplus.github.io/CWG/issues/2707.html>) | C++20 | guias de dedução não podiam ter uma trailing requires clause | elas podem
[CWG 2714](<https://cplusplus.github.io/CWG/issues/2714.html>) | C++17 | guias de dedução implícitas não consideravam
os argumentos padrão dos construtores | considerá-los
[CWG 2913](<https://cplusplus.github.io/CWG/issues/2913.html>) | C++20 | a resolução do [CWG issue 2707](<https://cplusplus.github.io/CWG/issues/2707.html>) tornou a sintaxe da guia de dedução
inconsistente com a sintaxe de declaração de função | sintaxe ajustada
[P0702R1](<https://wg21.link/P0702R1>) | C++17 | um construtor de initializer-list pode preceder o
candidato de dedução de cópia, resultando em "wrapping" | fase de initializer-list
ignorada ao copiar