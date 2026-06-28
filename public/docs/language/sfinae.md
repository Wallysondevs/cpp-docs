# SFINAE

"Falha de Substituição Não É Um Erro"

Esta regra se aplica durante a resolução de sobrecarga de function templates: Quando a [substituição](<#/doc/language/function_template>) do tipo explicitamente especificado ou [deduzido](<#/doc/language/template_argument_deduction>) para o parâmetro template falha, a especialização é descartada do [conjunto de sobrecargas](<#/doc/language/overload_resolution>) em vez de causar um erro de compilação.

Este recurso é usado em metaprogramação com templates.

### Explicação

Parâmetros de function template são substituídos (substituídos por argumentos template) duas vezes:

*   argumentos template explicitamente especificados são substituídos antes da dedução de argumentos template
*   argumentos deduzidos e os argumentos obtidos dos padrões são substituídos após a dedução de argumentos template

A substituição ocorre em

*   todos os tipos usados no tipo da função (o que inclui o tipo de retorno e os tipos de todos os parâmetros)
*   todos os tipos usados nas declarações de parâmetros template
*   todos os tipos usados na lista de argumentos template de uma especialização parcial

*   todas as expressões usadas no tipo da função
*   todas as expressões usadas em uma declaração de parâmetro template
*   todas as expressões usadas na lista de argumentos template de uma especialização parcial

| (desde C++11)
*   todas as expressões usadas no [especificador explicit](<#/doc/language/explicit>)

| (desde C++20)

Uma _falha de substituição_ é qualquer situação em que o tipo ou expressão acima seria malformado (com um diagnóstico requerido), se escrito usando os argumentos substituídos.

Apenas as falhas nos tipos e expressões no _contexto imediato_ do tipo da função ou de seus tipos de parâmetros template ou de seu [especificador explicit](<#/doc/language/explicit>)(desde C++20) são erros SFINAE. Se a avaliação de um tipo/expressão substituído causar um efeito colateral, como a instanciação de alguma especialização de template, a geração de uma função membro implicitamente definida, etc., os erros nesses efeitos colaterais são tratados como erros graves. Uma [expressão lambda](<#/doc/language/lambda>) não é considerada parte do contexto imediato.(desde C++20)

| Esta seção está incompleta
Motivo: mini-exemplo onde isso importa

A substituição prossegue em ordem lexical e para quando uma falha é encontrada.

Se houver múltiplas declarações com ordens lexicais diferentes (por exemplo, um function template declarado com tipo de retorno trailing, a ser substituído após um parâmetro, e redeclarado com tipo de retorno ordinário que seria substituído antes do parâmetro), e isso causaria instâncias de template a ocorrerem em uma ordem diferente ou não ocorrerem, então o programa é malformado; nenhum diagnóstico é requerido. | (desde C++11)
```cpp
    template<typename A>
    struct B { using type = typename A::type; };
    
    template<
        class T,
        class U = typename T::type,    // SFINAE failure if T has no member type
        class V = typename B<T>::type> // hard error if B has no member type
                                       // (guaranteed to not occur via CWG 1227 because
                                       // substitution into the default template argument
                                       // of U would fail first)
    void foo (int);
    
    template<class T>
    typename T::type h(typename B<T>::type);
    
    template<class T>
    auto h(typename B<T>::type) -> typename T::type; // redeclaration
    
    template<class T>
    void h(...) {}
    
    using R = decltype(h<int>(0));     // ill-formed, no diagnostic required
```

#### SFINAE de Tipo

Os seguintes erros de tipo são erros SFINAE:

*   tentar instanciar uma expansão de pack contendo múltiplos packs de comprimentos diferentes

| (desde C++11)

*   tentar criar um array de void, array de referência, array de função, array de tamanho negativo, array de tamanho não integral ou array de tamanho zero:

```cpp
    template<int I>
    void div(char(*)[I % 2 == 0] = nullptr)
    {
        // this overload is selected when I is even
    }
    
    template<int I>
    void div(char(*)[I % 2 == 1] = nullptr)
    {
        // this overload is selected when I is odd
    }
```

*   tentar usar um tipo à esquerda de um operador de resolução de escopo `::` e ele não é uma classe ou enumeração:

```cpp
    template<class T>
    int f(typename T::B*);
    
    template<class T>
    int f(T);
    
    int i = f<int>(0); // uses second overload
```

*   tentar usar um membro de um tipo, onde

    *   o tipo não contém o membro especificado
    *   o membro especificado não é um tipo onde um tipo é requerido
    *   o membro especificado não é um template onde um template é requerido
    *   o membro especificado não é um não-tipo onde um não-tipo é requerido

```cpp
    template<int I>
    struct X {};
    
    template<template<class T> class>
    struct Z {};
    
    template<class T>
    void f(typename T::Y*) {}
    
    template<class T>
    void g(X<T::N>*) {}
    
    template<class T>
    void h(Z<T::template TT>*) {}
    
    struct A {};
    struct B { int Y; };
    struct C { typedef int N; };
    struct D { typedef int TT; };
    struct B1 { typedef int Y; };
    struct C1 { static const int N = 0; };
    struct D1
    { 
        template<typename T>
        struct TT {}; 
    };
    
    int main()
    {
        // Deduction fails in each of these cases:
        f<A>(0); // A does not contain a member Y
        f<B>(0); // The Y member of B is not a type
        g<C>(0); // The N member of C is not a non-type
        h<D>(0); // The TT member of D is not a template
    
        // Deduction succeeds in each of these cases:
        f<B1>(0); 
        g<C1>(0); 
        h<D1>(0);
    }
    // todo: needs to demonstrate overload resolution, not just failure
```

*   tentar criar um ponteiro para referência
*   tentar criar uma referência para void
*   tentar criar um ponteiro para membro de T, onde T não é um tipo de classe:

```cpp
    template<typename T>
    class is_class
    {
        typedef char yes[1];
        typedef char no[2];
    
        template<typename C>
        static yes& test(int C::*); // selected if C is a class type
    
        template<typename C>
        static no& test(...);       // selected otherwise
    public:
        static bool const value = sizeof(test<T>(nullptr)) == sizeof(yes);
    };
```

*   tentar fornecer um tipo inválido para um parâmetro template não-tipo:

```cpp
    template<class T, T>
    struct S {};
    
    template<class T>
    int f(S<T, T()>*);
    
    struct X {};
    int i0 = f<X>(0);
    // todo: needs to demonstrate overload resolution, not just failure
```

*   tentar realizar uma conversão inválida em

    *   em uma expressão de argumento template
    *   em uma expressão usada na declaração de função:

```cpp
    template<class T, T*> int f(int);
    int i2 = f<int, 1>(0); // can’t conv 1 to int*
    // todo: needs to demonstrate overload resolution, not just failure
```

*   tentar criar um tipo de função com um parâmetro do tipo void
*   tentar criar um tipo de função que retorna um tipo array ou um tipo função

#### SFINAE de Expressão

Apenas expressões constantes que são usadas em tipos (como limites de array) eram requeridas a serem tratadas como SFINAE (e não erros graves) antes do C++11. | (até C++11)
Os seguintes erros de expressão são erros SFINAE

*   Expressão malformada usada em um tipo de parâmetro template
*   Expressão malformada usada no tipo da função:

```cpp
    struct X {};
    struct Y { Y(X){} }; // X is convertible to Y
    
    template<class T>
    auto f(T t1, T t2) -> decltype(t1 + t2); // overload #1
    
    X f(Y, Y);                               // overload #2
    
    X x1, x2;
    X x3 = f(x1, x2); // deduction fails on #1 (expression x1 + x2 is ill-formed)
                      // only #2 is in the overload set, and is called
```

| (desde C++11)

#### SFINAE em especializações parciais

A dedução e a substituição também ocorrem ao determinar se uma especialização de um template de classe ou variável (desde C++14) é gerada por alguma [especialização parcial](<#/doc/language/partial_specialization>) ou pelo template primário. Uma falha de substituição não é tratada como um erro grave durante tal determinação, mas faz com que a declaração de especialização parcial correspondente seja ignorada, como se na resolução de sobrecarga envolvendo function templates.
```cpp
    // primary template handles non-referenceable types:
    template<class T, class = void>
    struct reference_traits
    {
        using add_lref = T;
        using add_rref = T;
    };
    
    // specialization recognizes referenceable types:
    template<class T>
    struct reference_traits<T, std::void_t<T&>>
    {
        using add_lref = T&;
        using add_rref = T&&;
    };
    
    template<class T>
    using add_lvalue_reference_t = typename reference_traits<T>::add_lref;
    
    template<class T>
    using add_rvalue_reference_t = typename reference_traits<T>::add_rref;
```

### Suporte da biblioteca

O componente da standard library [std::enable_if](<#/doc/types/enable_if>) permite criar uma falha de substituição para habilitar ou desabilitar sobrecargas específicas com base em uma condição avaliada em tempo de compilação. Além disso, muitos [type traits](<#/doc/meta>) devem ser implementados com SFINAE se extensões de compilador apropriadas não estiverem disponíveis. | (desde C++11)
---|---
O componente da standard library [std::void_t](<#/doc/types/void_t>) é outra metafunção utilitária que simplifica as aplicações SFINAE de especialização parcial. | (desde C++17)

### Alternativas

Onde aplicável, [tag dispatch](<#/doc/iterator/iterator_tags>), [`if constexpr`](<#/doc/language/if>)(desde C++17), e [concepts](<#/doc/language/constraints>) (desde C++20) são geralmente preferidos em vez do uso de SFINAE.

[`static_assert`](<#/doc/language/static_assert>) é geralmente preferido em vez de SFINAE se apenas um erro condicional em tempo de compilação for desejado. | (desde C++11)

### Exemplos

Um idioma comum é usar SFINAE de expressão no tipo de retorno, onde a expressão usa o operador vírgula, cuja subexpressão esquerda é a que está sendo examinada (convertida para void para garantir que o operador vírgula definido pelo usuário no tipo retornado não seja selecionado), e a subexpressão direita tem o tipo que a função deve retornar.

Execute este código
```cpp
    #include <iostream>
    
    // This overload is added to the set of overloads if C is
    // a class or reference-to-class type and F is a pointer to member function of C
    template<class C, class F>
    auto test(C c, F f) -> decltype((void)(c.*f)(), void())
    {
        std::cout << "(1) Class/class reference overload called\n";
    }
    
    // This overload is added to the set of overloads if C is a
    // pointer-to-class type and F is a pointer to member function of C
    template<class C, class F>
    auto test(C c, F f) -> decltype((void)((c->*f)()), void())
    {
        std::cout << "(2) Pointer overload called\n";
    }
    
    // This overload is always in the set of overloads: ellipsis
    // parameter has the lowest ranking for overload resolution
    void test(...)
    {
        std::cout << "(3) Catch-all overload called\n";
    }
    
    int main()
    {
        struct X { void f() {} };
        X x;
        X& rx = x;
        test(x, &X::f);  // (1)
        test(rx, &X::f); // (1), creates a copy of x
        test(&x, &X::f); // (2)
        test(42, 1337);  // (3)
    }
```

Saída:
```
    (1) Class/class reference overload called
    (1) Class/class reference overload called
    (2) Pointer overload called
    (3) Catch-all overload called
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 295](<https://cplusplus.github.io/CWG/issues/295.html>) | C++98 | criar tipo de função cv-qualified
poderia resultar em falha de substituição | não mais falha,
descartando cv-qualification
[CWG 1227](<https://cplusplus.github.io/CWG/issues/1227.html>) | C++98 | a ordem de substituição era não especificada | igual à ordem lexical
---|---|---|---
[CWG 2054](<https://cplusplus.github.io/CWG/issues/2054.html>) | C++98 | substituição em especializações parciais não era corretamente especificada | especificada
[CWG 2322](<https://cplusplus.github.io/CWG/issues/2322.html>) | C++11 | declarações em ordens lexicais diferentes causariam instâncias de template
a ocorrerem em uma ordem diferente ou não ocorrerem | tal caso é malformado,
nenhum diagnóstico requerido