# Especialização parcial de template

Permite personalizar templates de classe e de variável (desde C++14) para uma dada categoria de argumentos de template.

### Sintaxe

---
`template` `<` parameter-list `>` class-key class-head-name `<` argument-list `>` declaration | (1) |
---|---|---
`template` `<` parameter-list `>` decl-specifier-seq declarator `<` argument-list `>` initializer ﻿(optional) | (2) | (desde C++14)
---

onde class-head-name identifica o nome de um [template de classe](<#/doc/language/class_template>) previamente declarado e declarator identifica o nome de um [template de variável](<#/doc/language/variable_template>) (desde C++14) previamente declarado.

A especialização parcial pode ser declarada em qualquer escopo onde seu template primário possa ser definido (o que pode ser diferente do escopo onde o template primário é definido; como na especialização fora da classe de um [template membro](<#/doc/language/member_template>)). A especialização parcial deve aparecer após a declaração do template não especializado.

Por exemplo,
```cpp
    template<class T1, class T2, int I>
    class A {};             // primary template
    
    template<class T, int I>
    class A<T, T*, I> {};   // #1: partial specialization where T2 is a pointer to T1
    
    template<class T, class T2, int I>
    class A<T*, T2, I> {};  // #2: partial specialization where T1 is a pointer
    
    template<class T>
    class A<int, T*, 5> {}; // #3: partial specialization where
                            //     T1 is int, I is 5, and T2 is a pointer
    
    template<class X, class T, int I>
    class A<X, T*, I> {};   // #4: partial specialization where T2 is a pointer
```

Exemplos de especializações parciais na standard library incluem [std::unique_ptr](<#/doc/memory/unique_ptr>), que possui uma especialização parcial para tipos array.

### A lista de argumentos

As seguintes restrições se aplicam à lista de argumentos de uma especialização parcial de template:

1) A lista de argumentos não pode ser idêntica à lista de argumentos não especializada (ela deve especializar algo):
```cpp
    template<class T1, class T2, int I> class B {};        // primary template
    template<class X, class Y, int N> class B<X, Y, N> {}; // error
```

Além disso, a especialização deve ser mais especializada do que o template primário
```cpp
    template<int N, typename T1, typename... Ts> struct B;
    template<typename... Ts> struct B<0, Ts...> {}; // Error: not more specialized
```

| (desde C++11)

2) Argumentos padrão não podem aparecer na lista de argumentos

3) Se qualquer argumento for uma expansão de pack, ele deve ser o último argumento na lista

4) Expressões de argumento não-tipo podem usar parâmetros de template, desde que o parâmetro apareça pelo menos uma vez fora de um [contexto não deduzido](<#/doc/language/template_argument_deduction>) (note que apenas clang e gcc 12 suportam este recurso atualmente):
```cpp
    template<int I, int J> struct A {};
    template<int I> struct A<I + 5, I * 2> {}; // error, I is not deducible
    
    template<int I, int J, int K> struct B {};
    template<int I> struct B<I, I * 2, 2> {};  // OK: first parameter is deducible
```

5) Argumento de template não-tipo não pode especializar um parâmetro de template cujo tipo depende de um parâmetro da especialização:
```cpp
    template<class T, T t> struct C {}; // primary template
    template<class T> struct C<T, 1>;   // error: type of the argument 1 is T,
                                        // which depends on the parameter T
    
    template<int X, int (*array_ptr)[X]> class B {}; // primary template
    int array[5];
    template<int X> class B<X, &array> {}; // error: type of the argument &array is
                                           // int(*)[X], which depends on the parameter X
```

### Busca de nome

Especializações parciais de template não são encontradas pela busca de nome. Somente se o template primário for encontrado pela busca de nome, suas especializações parciais são consideradas. Em particular, uma declaração `using` que torna um template primário visível, também torna as especializações parciais visíveis:
```cpp
    namespace N
    {
        template<class T1, class T2> class Z {}; // primary template
    }
    using N::Z; // refers to the primary template
    
    namespace N
    {
        template<class T> class Z<T, T*> {};     // partial specialization
    }
    Z<int, int*> z; // name lookup finds N::Z (the primary template), the
                    // partial specialization with T = int is then used
```

### Ordenação parcial

Quando um template de classe ou de variável (desde C++14) é instanciado, e há especializações parciais disponíveis, o compilador precisa decidir se o template primário será usado ou uma de suas especializações parciais.

1) Se apenas uma especialização corresponder aos argumentos do template, essa especialização é usada

2) Se mais de uma especialização corresponder, regras de ordenação parcial são usadas para determinar qual especialização é mais especializada. A especialização mais especializada é usada, se for única (se não for única, o programa não pode ser compilado)

3) Se nenhuma especialização corresponder, o template primário é usado
```cpp
    // given the template A as defined above
    A<int, int, 1> a1;   // no specializations match, uses primary template
    A<int, int*, 1> a2;  // uses partial specialization #1 (T = int, I = 1)
    A<int, char*, 5> a3; // uses partial specialization #3, (T = char)
    A<int, char*, 1> a4; // uses partial specialization #4, (X = int, T = char, I = 1)
    A<int*, int*, 2> a5; // error: matches #2 (T = int, T2 = int*, I= 2)
                         //        matches #4 (X = int*, T = int, I = 2)
                         // neither one is more specialized than the other
```

Informalmente, "A é mais especializada que B" significa "A aceita um subconjunto dos tipos que B aceita".

Formalmente, para estabelecer a relação "mais especializada que" entre especializações parciais, cada uma é primeiro convertida em um template de função fictício da seguinte forma:

* o primeiro template de função tem os mesmos parâmetros de template que a primeira especialização parcial e tem apenas um parâmetro de função, cujo tipo é uma especialização de template de classe com todos os argumentos de template da primeira especialização parcial
* o segundo template de função tem os mesmos parâmetros de template que a segunda especialização parcial e tem apenas um parâmetro de função cujo tipo é uma especialização de template de classe com todos os argumentos de template da segunda especialização parcial.

Os templates de função são então classificados como se fossem para [sobrecarga de template de função](<#/doc/language/function_template>).
```cpp
    template<int I, int J, class T> struct X {}; // primary template
    template<int I, int J>          struct X<I, J, int>
    {
        static const int s = 1;
    }; // partial specialization #1
    // fictitious function template for #1 is
    // template<int I, int J> void f(X<I, J, int>); #A
    
    template<int I>                 struct X<I, I, int>
    {
        static const int s = 2;
    }; // partial specialization #2
    // fictitious function template for #2 is
    // template<int I>        void f(X<I, I, int>); #B
    
    int main()
    {
        X<2, 2, int> x; // both #1 and #2 match
    // partial ordering for function templates:
    // #A from #B: void(X<I, J, int>) from void(X<U1, U1, int>): deduction OK
    // #B from #A: void(X<I, I, int>) from void(X<U1, U2, int>): deduction fails
    // #B is more specialized
    // #2 is the specialization that is instantiated
        std::cout << x.s << '\n'; // prints 2
    }
```

### Membros de especializações parciais

A lista de parâmetros de template e a lista de argumentos de template de um membro de uma especialização parcial devem corresponder à lista de parâmetros e à lista de argumentos da especialização parcial.

Assim como com membros de templates primários, eles só precisam ser definidos se usados no programa.

Membros de especializações parciais não estão relacionados aos membros do template primário.

A especialização explícita (completa) de um membro de uma especialização parcial é declarada da mesma forma que uma especialização explícita do template primário.
```cpp
    template<class T, int I> // primary template
    struct A
    {
        void f(); // member declaration
    };
    
    template<class T, int I>
    void A<T, I>::f() {}     // primary template member definition
    
    // partial specialization
    template<class T>
    struct A<T, 2>
    {
        void f();
        void g();
        void h();
    };
    
    // member of partial specialization
    template<class T>
    void A<T, 2>::g() {}
    
    // explicit (full) specialization
    // of a member of partial specialization
    template<>
    void A<char, 2>::h() {}
    
    int main()
    {
        A<char, 0> a0;
        A<char, 2> a2;
        a0.f(); // OK, uses primary template’s member definition
        a2.g(); // OK, uses partial specialization's member definition
        a2.h(); // OK, uses fully-specialized definition of
                // the member of a partial specialization
        a2.f(); // error: no definition of f() in the partial
                // specialization A<T,2> (the primary template is not used)
    }
```

Se um template primário é membro de outro template de classe, suas especializações parciais são membros do template de classe envolvente. Se o template envolvente é instanciado, a declaração de cada especialização parcial membro também é instanciada (da mesma forma que as declarações, mas não as definições, de todos os outros membros de um template são instanciadas).

Se o template membro primário é explicitamente (completamente) especializado para uma dada especialização (implícita) do template de classe envolvente, as especializações parciais do template membro são ignoradas para esta especialização do template de classe envolvente.

Se uma especialização parcial do template membro é explicitamente especializada para uma dada especialização (implícita) do template de classe envolvente, o template membro primário e suas outras especializações parciais ainda são considerados para esta especialização do template de classe envolvente.
```cpp
    template<class T> struct A // enclosing class template
    {
        template<class T2>
        struct B {};      // primary member template
        template<class T2>
        struct B<T2*> {}; // partial specialization of member template
    };
    
    template<>
    template<class T2>
    struct A<short>::B {}; // full specialization of primary member template
                           // (will ignore the partial)
    
    A<char>::B<int*> abcip;  // uses partial specialization T2=int
    A<short>::B<int*> absip; // uses full specialization of the primary (ignores partial)
    A<char>::B<int> abci;    // uses primary
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 727](<https://cplusplus.github.io/CWG/issues/727.html>) | C++98 | especializações parciais e completas não permitidas em escopo de classe | permitido em qualquer escopo
[CWG 1315](<https://cplusplus.github.io/CWG/issues/1315.html>) | C++98 | parâmetro de template não podia ser usado em argumentos de template não-tipo que não fossem id-expressions | expressões ok desde que dedutíveis
[CWG 1495](<https://cplusplus.github.io/CWG/issues/1495.html>) | C++11 | a especificação era pouco clara ao envolver parameter pack | a especialização deve ser mais especializada
[CWG 1711](<https://cplusplus.github.io/CWG/issues/1711.html>) | C++14 | especificação ausente de especializações parciais de template de variável | adicionar suporte para templates de variável
[CWG 1819](<https://cplusplus.github.io/CWG/issues/1819.html>) | C++98 | escopos aceitáveis para definição de especialização parcial | fazer com que a especialização parcial possa ser declarada no mesmo escopo que os templates primários
[CWG 2330](<https://cplusplus.github.io/CWG/issues/2330.html>) | C++14 | referências ausentes a templates de variável | adicionar suporte para templates de variável

### Veja também

* [templates](<#/doc/language/templates>)
* [class template](<#/doc/language/class_template>)
* [function template](<#/doc/language/function_template>)
* [full template specialization](<#/doc/language/template_specialization>)
