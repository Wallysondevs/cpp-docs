# Dedução de argumentos de template de classe (CTAD) (desde C++17)

Para instanciar um [template de classe](<#/doc/language/class_template>), cada argumento de template deve ser conhecido, mas nem todo argumento de template precisa ser especificado. Nos seguintes contextos, o compilador deduzirá os argumentos de template a partir do tipo do inicializador:

*   qualquer [declaração](<#/doc/language/declarations>) que especifique a inicialização de uma variável e template de variável, cujo tipo declarado é o template de classe (possivelmente [cv-qualificado](<#/doc/language/cv>)):

```cpp
std::pair p(2, 4.5);     // deduz para std::pair<int, double> p(2, 4.5);
std::tuple t(4, 3, 2.5); // o mesmo que auto t = std::make_tuple(4, 3, 2.5);
std::less l;             // o mesmo que std::less<void> l;
```

*   [new-expressions](<#/doc/language/new>):

```cpp
    template<class T>
    struct A
    {
        A(T, T);
    };
    
    auto y = new A{1, 2}; // o tipo alocado é A<int>
```

*   expressões de [function-style cast](<#/doc/language/explicit_cast>):

```cpp
    auto lck = std::lock_guard(mtx);     // deduz para std::lock_guard<std::mutex>
    std::copy_n(vi1, 3,
        std::back_insert_iterator(vi2)); // deduz para std::back_insert_iterator<T>,
                                         // onde T é o tipo do container vi2
    std::for_each(vi.begin(), vi.end(),
        Foo(& {...}));          // deduz para Foo<T>,
                                         // onde T é o tipo único da lambda
```

*   o tipo de um [parâmetro de template não-tipo](<#/doc/language/template_parameters>):

```cpp
    template<class T>
    struct X
    {
        constexpr X(T) {}
    };
    
    template<X x>
    struct Y {};
    
    Y<0> y; // OK, Y<X<int>(0)>
```

| (desde C++20) |
|---|

### Dedução para templates de classe

#### Guias de dedução geradas implicitamente

Quando, em um function-style cast ou na declaração de uma variável, o especificador de tipo consiste unicamente no nome de um template de classe primário `C` (ou seja, não há uma lista de argumentos de template acompanhante), os candidatos para dedução são formados da seguinte maneira:

*   Se `C` for definido, para cada construtor (ou template de construtor) `Ci` declarado no template primário nomeado, um template de função fictício `Fi` é construído, de modo que todas as seguintes condições sejam satisfeitas:

    *   Os parâmetros de template de `Fi` são os parâmetros de template de `C` seguidos (se `Ci` for um template de construtor) pelos parâmetros de template de `Ci` (argumentos de template padrão também são incluídos).

    *   As [restrições associadas](<#/doc/language/constraints>) de `Fi` são a conjunção das restrições associadas de `C` e das restrições associadas de `Ci`.

| (desde C++20) |
|---|

    *   A [lista de parâmetros](<#/doc/language/function>) de `Fi` é a lista de parâmetros de `Ci`.
    *   O tipo de retorno de `Fi` é `C` seguido pelos parâmetros de template do template de classe entre `<>`.

*   Se `C` não for definido ou não declarar nenhum construtor, um template de função fictício adicional é adicionado, derivado como acima de um construtor hipotético `C()`.

*   Em qualquer caso, um template de função fictício adicional derivado como acima de um construtor hipotético `C(C)` é adicionado, chamado de candidato de dedução de cópia.

*   Para cada [guia de dedução definida pelo usuário](<#/doc/language/ctad>) `Gi`, uma função ou template de função fictício `Fi` é construído, de modo que todas as seguintes condições sejam satisfeitas:

    *   A lista de parâmetros de `Fi` é a lista de parâmetros de `Gi`.
    *   O tipo de retorno de `Fi` é o identificador de template simples de `Gi`.
    *   Se `Gi` tiver parâmetros de template (sintaxe (2)), `Fi` é um template de função, e sua lista de parâmetros de template é a lista de parâmetros de template de `Gi`. Caso contrário, `Fi` é uma função.

*   Além disso, se

    *   `C` for definido e satisfizer os requisitos de um [tipo agregado](<#/doc/language/aggregate_initialization>) com a suposição de que qualquer classe base dependente não possui funções virtuais ou classes base virtuais,
    *   não houver guias de dedução definidas pelo usuário para `C`, e
    *   a variável for inicializada a partir de uma lista não vazia de inicializadores arg1, arg2, ..., argn (que pode usar [inicializador designado](<#/doc/language/aggregate_initialization>)),

    um candidato de dedução de agregado pode ser adicionado. A lista de parâmetros do candidato de dedução de agregado é produzida a partir dos tipos de elementos agregados, da seguinte forma:

    *   Seja `ei` o [elemento agregado](<#/doc/language/aggregate_initialization>) (possivelmente recursivo) que seria inicializado a partir de `argi`, onde

        *   a [elision de chaves](<#/doc/language/aggregate_initialization>) não é considerada para qualquer elemento agregado que tenha

            *   um tipo não-array [dependente](<#/doc/language/dependent_name>),
            *   um tipo array com um limite [dependente de valor](<#/doc/language/dependent_name>), ou
            *   um tipo array com um tipo de elemento array dependente e `argi` é um [literal de string](<#/doc/language/string_literal>)

        *   se `C` (ou seu elemento que é ele próprio um agregado) tiver uma base que é uma [expansão de pack](<#/doc/language/parameter_pack>):

            *   se a expansão de pack for um elemento agregado final, ela é considerada para corresponder a todos os elementos restantes da lista de inicializadores;
            *   caso contrário, o pack é considerado vazio.

    *   Se não houver tal `ei`, o candidato de dedução de agregado não é adicionado.
    *   Caso contrário, determine a lista de parâmetros `T1, T2, ..., Tn` do candidato de dedução de agregado da seguinte forma:

        *   Se `ei` for um array e `argi` for uma braced-init-list, `Ti` é uma rvalue reference para o tipo declarado de `ei`.
        *   Se `ei` for um array e `argi` for um [literal de string](<#/doc/language/string_literal>), `Ti` é uma lvalue reference para o tipo declarado de `ei` qualificado com const.
        *   Caso contrário, `Ti` é o tipo declarado de `ei`.
        *   Se um pack foi ignorado porque é um elemento agregado não-final, um pack de parâmetros adicional na forma `Pj ...` é inserido em sua posição original de elemento agregado. (Isso geralmente fará com que a dedução falhe.)
        *   Se um pack for um elemento agregado final, a sequência final de parâmetros correspondente a ele é substituída por um único parâmetro na forma `Tn ...`.

    O candidato de dedução de agregado é um template de função fictício derivado como acima de um construtor hipotético `C(T1, T2, ..., Tn)`.

    Durante a dedução de argumentos de template para o candidato de dedução de agregado, o número de elementos em um pack de parâmetros final é deduzido do número de argumentos de função restantes apenas se não for deduzido de outra forma.
```cpp
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
    // candidato de dedução de agregado:
    //   template<class T>
    //   A<T> F(T, long, long);
    
    template<class... Args>
    struct B : std::tuple<Args...>, Args... {};
    
    B b{std::tuple<std::any, std::string>{}, std::any{}};
    // candidato de dedução de agregado:
    //   template<class... Args>
    //   B<Args...> F(std::tuple<Args...>, Args...);
    
    // o tipo de b é deduzido como B<std::any, std::string>
```

| (desde C++20) |
|---|

A [dedução de argumentos de template](<#/doc/language/template_argument_deduction>) e a [resolução de sobrecarga](<#/doc/language/overload_resolution>) são então realizadas para a inicialização de um objeto fictício de um tipo de classe hipotético, cujas assinaturas de construtor correspondem às guias (exceto pelo tipo de retorno) com o propósito de formar um conjunto de sobrecarga, e o inicializador é fornecido pelo contexto em que a dedução de argumentos de template de classe foi realizada, exceto que a primeira fase da [inicialização de lista](<#/doc/language/overload_resolution>) (considerando construtores de lista de inicializadores) é omitida se a lista de inicializadores consistir em uma única expressão do tipo (possivelmente cv-qualificado) `U`, onde `U` é uma especialização de `C` ou uma classe derivada de uma especialização de `C`.

Esses construtores fictícios são membros públicos do tipo de classe hipotético. Eles são explicit se a guia foi formada a partir de um construtor explícito. Se a resolução de sobrecarga falhar, o programa é malformado. Caso contrário, o tipo de retorno da especialização de template `F` selecionada torna-se a especialização de template de classe deduzida.
```cpp
    template<class T>
    struct UniquePtr
    {
        UniquePtr(T* t);
    };
    
    UniquePtr dp{new auto(2.0)};
    
    // Um construtor declarado:
    // C1: UniquePtr(T*);
    
    // Conjunto de guias de dedução geradas implicitamente:
    
    // F1: template<class T>
    //     UniquePtr<T> F(T* p);
    
    // F2: template<class T> 
    //     UniquePtr<T> F(UniquePtr<T>); // candidato de dedução de cópia
    
    // classe imaginária para inicializar:
    // struct X
    // {
    //     template<class T>
    //     X(T* p);         // de F1
    //     
    //     template<class T>
    //     X(UniquePtr<T>); // de F2
    // };
    
    // inicialização direta de um objeto X
    // com "new double(2.0)" como inicializador
    // seleciona o construtor que corresponde à guia F1 com T = double
    // Para F1 com T=double, o tipo de retorno é UniquePtr<double>
    
    // resultado:
    // UniquePtr<double> dp{new auto(2.0)}
```

Ou, para um exemplo mais complexo (nota: "`S::N`" não compilaria: qualificadores de resolução de escopo não são algo que pode ser deduzido):
```cpp
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
    
    // as guias de dedução geradas implicitamente são (note que T já é conhecido como int)
    
    // F1: template<class U>
    //     S<int>::N<U> F(int);
    
    // F2: template<class U>
    //     S<int>::N<U> F(int, U);
    
    // F3: template<class U, class V>
    //     S<int>::N<U> F(V, U);
    
    // F4: template<class U>
    //     S<int>::N<U> F(S<int>::N<U>); (candidato de dedução de cópia)
    
    // A resolução de sobrecarga para direct-list-init com "{2.0, 1}" como inicializador
    // escolhe F3 com U=int e V=double.
    // O tipo de retorno é S<int>::N<int>
    
    // resultado:
    // S<int>::N<int> x{2.0, 1};
```

#### Guias de dedução definidas pelo usuário

A sintaxe de uma guia de dedução definida pelo usuário é a sintaxe de uma declaração de função (template) com um tipo de retorno final, exceto que ela usa o nome de um template de classe como nome da função:

---
```cpp
explicit ﻿(opcional) template-name `(` parameter-list `)` `- >` simple-template-id requires-clause ﻿(opcional) `;`  // (1)
`template <`template-parameter-list ﻿`>` requires-clause ﻿(opcional)
explicit ﻿(opcional) template-name `(` parameter-list `)` `- >` simple-template-id requires-clause ﻿(opcional) `;`  // (2)
```
- **template-parameter-list** — uma lista não vazia separada por vírgulas de [parâmetros de template](<#/doc/language/template_parameters>)
- **explicit** — um [especificador `explicit`](<#/doc/language/explicit>)
- **template-name** — o nome do template de classe cujos argumentos devem ser deduzidos
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) (possivelmente vazia)
- **simple-template-id** — um [identificador de template simples](<#/doc/language/templates>)
- **requires-clause** — (desde C++20) uma [cláusula requires](<#/doc/language/constraints>)

Os parâmetros das guias de dedução definidas pelo usuário não podem ter tipos de placeholder: a sintaxe de [template de função abreviado](<#/doc/language/function_template>) não é permitida. | (desde C++20)

As guias de dedução definidas pelo usuário devem nomear um template de classe e devem ser introduzidas dentro do mesmo escopo semântico do template de classe (que pode ser um namespace ou uma classe envolvente) e, para um template de classe membro, devem ter o mesmo acesso, mas as guias de dedução não se tornam membros desse escopo.

Uma guia de dedução não é uma função e não possui corpo. As guias de dedução não são encontradas por name lookup e não participam da resolução de sobrecarga, exceto pela [resolução de sobrecarga contra outras guias de dedução](<#/doc/language/overload_resolution>) ao deduzir argumentos de template de classe. As guias de dedução não podem ser redeclaradas na mesma unidade de tradução para o mesmo template de classe.
```cpp
    // declaração do template
    template<class T>
    struct container
    {
        container(T t) {}
    
        template<class Iter>
        container(Iter beg, Iter end);
    };
    
    // guia de dedução adicional
    template<class Iter>
    container(Iter b, Iter e) -> container<typename std::iterator_traits<Iter>::value_type>;
    
    // usos
    container c(7); // OK: deduz T=int usando uma guia gerada implicitamente
    std::vector<double> v = {/* ... */};
    auto d = container(v.begin(), v.end()); // OK: deduz T=double
    container e{5, 6}; // Erro: não existe std::iterator_traits<int>::value_type
```

Os construtores fictícios para fins de resolução de sobrecarga (descritos acima) são explicit se corresponderem a uma guia de dedução gerada implicitamente a partir de um construtor explícito ou a uma guia de dedução definida pelo usuário que é declarada [explicit](<#/doc/language/explicit>). Como sempre, tais construtores são ignorados no contexto de inicialização por cópia:
```cpp
    template<class T>
    struct A
    {
        explicit A(const T&, ...) noexcept; // #1
        A(T&&, ...);                        // #2
    };
    
    int i;
    A a1 = {i, i}; // erro: não pode deduzir de rvalue reference em #2,
                   // e #1 é explícito, e não considerado na inicialização por cópia.
    A a2{i, i};    // OK, #1 deduz para A<int> e também inicializa
    A a3{0, i};    // OK, #2 deduz para A<int> e também inicializa
    A a4 = {0, i}; // OK, #2 deduz para A<int> e também inicializa
    
    template<class T>
    A(const T&, const T&) -> A<T&>; // #3
    
    template<class T>
    explicit A(T&&, T&&)  -> A<T>;  // #4
    
    A a5 = {0, 1}; // erro: #3 deduz para A<int&>
                   // e #1 & #2 resultam nos mesmos construtores de parâmetro.
    A a6{0, 1};    // OK, #4 deduz para A<int> e #2 inicializa
    A a7 = {0, i}; // erro: #3 deduz para A<int&>
    A a8{0, i};    // erro: #3 deduz para A<int&>
```

Usar um typedef membro ou alias template na lista de parâmetros de um construtor ou template de construtor não torna, por si só, o parâmetro correspondente da guia gerada implicitamente um contexto não deduzido.
```cpp
    template<class T>
    struct B
    {
        template<class U>
        using TA = T;
    
        template<class U>
        B(U, TA<U>); // #1
    };
    
    // A guia de dedução implícita gerada a partir de #1 é o equivalente de
    //     template<class T, class U>
    //     B(U, T) -> B<T>;
    // em vez de
    //     template<class T, class U>
    //     B(U, typename B<T>::template TA<U>) -> B<T>;
    // o que não teria sido dedutível
    
    B b{(int*)0, (char*)0}; // OK, deduz B<char*>
```

### Dedução para alias templates

Quando um function-style cast ou declaração de uma variável usa o nome de um alias template `A` sem uma lista de argumentos como especificador de tipo, onde `A` é definido como um alias de `B<ArgList>`, o escopo de `B` é não-dependente, e `B` é um template de classe ou um alias template definido de forma semelhante, a dedução prosseguirá da mesma forma que para templates de classe, exceto que as guias são geradas a partir das guias de `B`, da seguinte forma:

*   Para cada guia `f` de `B`, deduza os argumentos de template do tipo de retorno de `f` de `B<ArgList>` usando [dedução de argumentos de template](<#/doc/language/template_argument_deduction>), exceto que a dedução não falha se alguns argumentos não forem deduzidos. Se a dedução falhar por outro motivo, prossiga com um conjunto vazio de argumentos de template deduzidos.
*   Substitua o resultado da dedução acima em `f`; se a substituição falhar, nenhuma guia é produzida; caso contrário, seja `g` o resultado da substituição, uma guia `f'` é formada, de modo que

    *   Os tipos de parâmetro e o tipo de retorno de `f'` são os mesmos que `g`
    *   Se `f` for um template, `f'` é um template de função cuja lista de parâmetros de template consiste em todos os parâmetros de template de `A` (incluindo seus argumentos de template padrão) que aparecem nas deduções acima ou (recursivamente) em seus argumentos de template padrão, seguidos pelos parâmetros de template de `f` que não foram deduzidos (incluindo seus argumentos de template padrão); caso contrário (`f` não é um template), `f'` é uma função
    *   As [restrições](<#/doc/language/constraints>) associadas de `f'` são a conjunção das restrições associadas de `g` e uma restrição que é satisfeita se e somente se os argumentos de `A` forem deduzíveis do tipo de resultado

```cpp
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
    
    // guia gerada para unique_ptr_nonarray:
    
    // de #1 (dedução de unique_ptr<T> de unique_ptr<A> resulta em T = A):
    // template<class A>
    //     requires(argument_of_unique_ptr_nonarray_is_deducible_from<unique_ptr<A>>)
    // auto F(A*) -> unique_ptr<A>;
    
    // de #2 (dedução de unique_ptr<T[]> de unique_ptr<A> não resulta em nada):
    // template<class T>
    //     requires(argument_of_unique_ptr_nonarray_is_deducible_from<unique_ptr<T[]>>)
    // auto F(T*) -> unique_ptr<T[]>;
    
    // onde argument_of_unique_ptr_nonarray_is_deducible_from pode ser definido como
    
    // template<class>
    // class AA;
    
    // template<NonArray A>
    // class AA<unique_ptr_nonarray<A>> {};
    
    // template<class T>
    // concept argument_of_unique_ptr_nonarray_is_deducible_from =
    //     requires { sizeof(AA<T>); };
    
    // guia gerada para unique_ptr_array:
    
    // de #1 (dedução de unique_ptr<T> de unique_ptr<A[]> resulta em T = A[]):
    // template<class A>
    //     requires(argument_of_unique_ptr_array_is_deducible_from<unique_ptr<A[]>>)
    // auto F(A(*)[]) -> unique_ptr<A[]>;
    
    // de #2 (dedução de unique_ptr<T[]> de unique_ptr<A[]> resulta em T = A):
    // template<class A>
    //     requires(argument_of_unique_ptr_array_is_deducible_from<unique_ptr<A[]>>)
    // auto F(A*) -> unique_ptr<A[]>;
    
    // onde argument_of_unique_ptr_array_is_deducible_from pode ser definido como
    
    // template<class>
    // class BB;
    
    // template<class A>
    // class BB<unique_ptr_array<A>> {};
    
    // template<class T>
    // concept argument_of_unique_ptr_array_is_deducible_from =
    //     requires { sizeof(BB<T>); };
    
    // Uso:
    unique_ptr_nonarray p(new int); // deduzido para unique_ptr<int>
    // guia de dedução gerada de #1 retorna unique_ptr<int>
    // guia de dedução gerada de #2 retorna unique_ptr<int[]>, que é ignorada porque
    //   argument_of_unique_ptr_nonarray_is_deducible_from<unique_ptr<int[]>> não é satisfeita
    
    unique_ptr_array q(new int[42]); // deduzido para unique_ptr<int[]>
    // guia de dedução gerada de #1 falha (não pode deduzir A em A(*)[] de new int[42])
    // guia de dedução gerada de #2 retorna unique_ptr<int[]>
```

| (desde C++20) |
|---|

### Notas

A dedução de argumentos de template de classe é realizada apenas se nenhuma lista de argumentos de template estiver presente. Se uma lista de argumentos de template for especificada, a dedução não ocorre.
```cpp
    std::tuple t1(1, 2, 3);                // OK: dedução
    std::tuple<int, int, int> t2(1, 2, 3); // OK: todos os argumentos são fornecidos
    
    std::tuple<> t3(1, 2, 3);    // Erro: nenhum construtor correspondente em tuple<>.
                                 //        Nenhuma dedução realizada.
    std::tuple<int> t4(1, 2, 3); // Erro
```

A dedução de argumentos de template de classe de agregados tipicamente requer guias de dedução definidas pelo usuário:
```cpp
    template<class A, class B>
    struct Agg
    {
        A a;
        B b;
    };
    // guias geradas implicitamente são formadas a partir de construtores padrão, de cópia e de movimento
    
    template<class A, class B>
    Agg(A a, B b) -> Agg<A, B>;
    // ^ Esta guia de dedução pode ser gerada implicitamente em C++20
    
    Agg agg{1, 2.0}; // deduzido para Agg<int, double> a partir da guia definida pelo usuário
    
    template<class... T>
    array(T&&... t) -> array<std::common_type_t<T...>, sizeof...(T)>;
    auto a = array{1, 2, 5u}; // deduzido para array<unsigned, 3> a partir da guia definida pelo usuário
```

| (até C++20) |
|---|

As guias de dedução definidas pelo usuário não precisam ser templates:
```cpp
    template<class T>
    struct S
    {
        S(T);
    };
    S(char const*) -> S<std::string>;
    
    S s{"hello"}; // deduzido para S<std::string>
```

Dentro do escopo de um template de classe, o nome do template sem uma lista de parâmetros é um nome de classe injetado, e pode ser usado como um tipo. Nesse caso, a dedução de argumentos de classe não ocorre e os parâmetros de template devem ser fornecidos explicitamente:
```cpp
    template<class T>
    struct X
    {
        X(T) {}
    
        template<class Iter>
        X(Iter b, Iter e) {}
    
        template<class Iter>
        auto foo(Iter b, Iter e)
        {
            return X(b, e); // nenhuma dedução: X é o X<T> atual
        }
    
        template<class Iter>
        auto bar(Iter b, Iter e)
        {
            return X<typename Iter::value_type>(b, e); // deve especificar o que queremos
        }
    
        auto baz()
        {
            return ::X(0); // não é o injected-class-name; deduzido para ser X<int>
        }
    };
```

Na [resolução de sobrecarga](<#/doc/language/overload_resolution>), a ordenação parcial tem precedência sobre se um template de função é gerado a partir de uma guia de dedução definida pelo usuário: se o template de função gerado a partir do construtor for mais especializado do que aquele gerado a partir da guia de dedução definida pelo usuário, o gerado a partir do construtor é escolhido. Como o candidato de dedução de cópia é tipicamente mais especializado do que um construtor de "wrapping", esta regra significa que a cópia é geralmente preferida ao "wrapping".
```cpp
    template<class T>
    struct A
    {
        A(T, int*);     // #1
        A(A<T>&, int*); // #2
    
        enum { value };
    };
    
    template<class T, int N = T::value>
    A(T&&, int*) -> A<T>; //#3
    
    A a{1, 0}; // usa #1 para deduzir A<int> e inicializa com #1
    A b{a, 0}; // usa #2 (mais especializado que #3) para deduzir A<int> e inicializa com #2
```

Quando desempates anteriores, incluindo ordenação parcial, falharam em distinguir entre dois templates de função candidatos, as seguintes regras se aplicam:

*   Um template de função gerado a partir de uma guia de dedução definida pelo usuário é preferido em relação a um gerado implicitamente a partir de um construtor ou template de construtor.
*   O candidato de dedução de cópia é preferido em relação a todos os outros templates de função gerados implicitamente a partir de um construtor ou template de construtor.
*   Um template de função gerado implicitamente a partir de um construtor não-template é preferido em relação a um template de função gerado implicitamente a partir de um template de construtor.

```cpp
    template<class T>
    struct A
    {
        using value_type = T;
    
        A(value_type); // #1
        A(const A&);   // #2
        A(T, T, int);  // #3
    
        template<class U>
        A(int, T, U);  // #4
    };                 // #5, o candidato de dedução de cópia A(A);
    
    A x(1, 2, 3); // usa #3, gerado de um construtor não-template
    
    template<class T>
    A(T) -> A<T>; // #6, menos especializado que #5
    
    A a(42); // usa #6 para deduzir A<int> e #1 para inicializar
    A b = a; // usa #5 para deduzir A<int> e #2 para inicializar
    
    template<class T>
    A(A<T>) -> A<A<T>>; // #7, tão especializado quanto #5
    
    A b2 = a; // usa #7 para deduzir A<A<int>> e #1 para inicializar
```

Uma rvalue reference para um parâmetro de template não-cv-qualificado não é uma [forwarding reference](<#/doc/language/template_argument_deduction>) se esse parâmetro for um parâmetro de template de classe:
```cpp
    template<class T>
    struct A
    {
        template<class U>
        A(T&&, U&&, int*); // #1: T&& não é uma forwarding reference
                           //     U&& é uma forwarding reference
    
        A(T&&, int*);      // #2: T&& não é uma forwarding reference
    };
    
    template<class T>
    A(T&&, int*) -> A<T>; // #3: T&& é uma forwarding reference
    
    int i, *ip;
    A a{i, 0, ip};  // erro, não pode deduzir de #1
    A a0{0, 0, ip}; // usa #1 para deduzir A<int> e #1 para inicializar
    A a2{i, ip};    // usa #3 para deduzir A<int&> e #2 para inicializar
```

Ao inicializar a partir de um único argumento de um tipo que é uma especialização do template de classe em questão, a dedução de cópia é geralmente preferida ao "wrapping" por padrão:
```cpp
    std::tuple t1{1};  //std::tuple<int>
    std::tuple t2{t1}; //std::tuple<int>, não std::tuple<std::tuple<int>>
    
    std::vector v1{1, 2};   // std::vector<int>
    std::vector v2{v1};     // std::vector<int>, não std::vector<std::vector<int>> (P0702R1)
    std::vector v3{v1, v2}; // std::vector<std::vector<int>>
```

Fora do caso especial para cópia vs. "wrapping", a forte preferência por construtores de lista de inicializadores na inicialização de lista permanece intacta.
```cpp
    std::vector v1{1, 2}; // std::vector<int>
    
    std::vector v2(v1.begin(), v1.end()); // std::vector<int>
    std::vector v3{v1.begin(), v1.end()}; // std::vector<std::vector<int>::iterator>
```

Antes da introdução da dedução de argumentos de template de classe, uma abordagem comum para evitar a especificação explícita de argumentos era usar um template de função:
```cpp
    std::tuple p1{1, 1.0};             //std::tuple<int, double>, usando dedução
    auto p2 = std::make_tuple(1, 1.0); //std::tuple<int, double>, pré-C++17
```

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_deduction_guides`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | Dedução de argumentos de template para templates de classe
[`201907L`](<#/>) | (C++20) | CTAD para agregados e aliases

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[CWG 2376](<https://cplusplus.github.io/CWG/issues/2376.html>) | C++17 | CTAD seria realizada mesmo se o tipo da variável declarada fosse
diferente do template de classe cujos argumentos seriam deduzidos | não realizar
CTAD neste caso
[CWG 2628](<https://cplusplus.github.io/CWG/issues/2628.html>) | C++20 | guias de dedução implícitas não propagavam restrições | propagar restrições
[CWG 2697](<https://cplusplus.github.io/CWG/issues/2697.html>) | C++20 | não estava claro se a sintaxe de template de função abreviado
é permitida em guias de dedução definidas pelo usuário | proibido
[CWG 2707](<https://cplusplus.github.io/CWG/issues/2707.html>) | C++20 | guias de dedução não podiam ter uma cláusula requires final | elas podem
[CWG 2714](<https://cplusplus.github.io/CWG/issues/2714.html>) | C++17 | guias de dedução implícitas não consideravam
os argumentos padrão dos construtores | considerá-los
[CWG 2913](<https://cplusplus.github.io/CWG/issues/2913.html>) | C++20 | a resolução do [problema CWG 2707](<https://cplusplus.github.io/CWG/issues/2707.html>) tornou a sintaxe da guia de dedução
inconsistente com a sintaxe de declaração de função | ajustou a sintaxe
[P0702R1](<https://wg21.link/P0702R1>) | C++17 | um construtor de lista de inicializadores pode preceder o
candidato de dedução de cópia, resultando em "wrapping" | fase de lista de inicializadores
ignorada ao copiar