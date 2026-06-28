# Categorias de valor

Cada [expressão](<#/doc/language/expressions>) C++ (um operador com seus operandos, um literal, um nome de variável, etc.) é caracterizada por duas propriedades independentes: um _[tipo](<#/doc/language/type-id>)_ e uma _categoria de valor_. Cada expressão tem algum tipo não-referência, e cada expressão pertence a exatamente uma das três categorias de valor primárias: [_prvalue_](<#/doc/language/value_category>), [_xvalue_](<#/doc/language/value_category>), e [_lvalue_](<#/doc/language/value_category>).

*   um [glvalue](<#/doc/language/value_category>) (lvalue "generalizado") é uma expressão cuja avaliação determina a identidade de um objeto ou função;
*   um [prvalue](<#/doc/language/value_category>) (rvalue "puro") é uma expressão cuja avaliação

    *   calcula o valor de um operando de um operador embutido (tal prvalue não tem um _objeto de resultado_), ou
    *   inicializa um objeto (tal prvalue é dito ter um _objeto de resultado_).

    O objeto de resultado pode ser uma variável, um objeto criado por [new-expression](<#/doc/language/new>), um temporário criado por [materialização temporária](<#/doc/language/implicit_cast>), ou um membro dele. Note que expressões [descartadas](<#/doc/language/expressions>) não-void têm um objeto de resultado (o temporário materializado). Além disso, todo prvalue de classe e array tem um objeto de resultado, exceto quando é o operando de [`decltype`](<#/doc/language/decltype>);
*   um [xvalue](<#/doc/language/value_category>) (um valor "eXpirando") é um glvalue que denota um objeto cujos recursos podem ser reutilizados;
*   um [lvalue](<#/doc/language/value_category>) é um glvalue que não é um xvalue;

Conteúdo estendido
---
Historicamente chamado assim porque lvalues podiam aparecer no lado esquerdo de uma expressão de atribuição. Em geral, nem sempre é o caso:
```cpp
    void foo();
    
    void baz()
    {
        int a; // Expression `a` is lvalue
        a = 4; // OK, could appear on the left-hand side of an assignment expression
    
        int &b{a}; // Expression `b` is lvalue
        b = 5; // OK, could appear on the left-hand side of an assignment expression
    
        const int &c{a}; // Expression `c` is lvalue
        c = 6;           // ill-formed, assignment of read-only reference
    
        // Expression `foo` is lvalue
        // address may be taken by built-in address-of operator
        void (*p)() = &foo;
    
        foo = baz; // ill-formed, assignment of function
    }
```

*   um [rvalue](<#/doc/language/value_category>) é um prvalue ou um xvalue;

Conteúdo estendido
---
Historicamente chamado assim porque rvalues podiam aparecer no lado direito de uma expressão de atribuição. Em geral, nem sempre é o caso: Execute este código
```cpp
    #include <iostream>
    
    struct S
    {
        S() : m{42} {}
        S(int a) : m{a} {}
        int m;
    };
    
    int main()
    {
        S s;
    
        // Expression `S{}` is prvalue
        // May appear on the right-hand side of an assignment expression
        s = S{};
    
        std::cout << s.m << '\n';
    
        // Expression `S{}` is prvalue
        // Can be used on the left-hand side too
        std::cout << (S{} = S{7}).m << '\n';
    }
```

Output:
```
    42
    7
```

Nota: esta taxonomia passou por mudanças significativas com revisões anteriores do padrão C++, veja [Histórico](<#/doc/language/value_category>) abaixo para detalhes.

Conteúdo estendido
---
Apesar de seus nomes, esses termos classificam expressões, não valores. Execute este código
```cpp
    #include <type_traits>
    #include <utility>
    
    template <class T> struct is_prvalue : std::true_type {};
    template <class T> struct is_prvalue<T&> : std::false_type {};
    template <class T> struct is_prvalue<T&&> : std::false_type {};
    
    template <class T> struct is_lvalue : std::false_type {};
    template <class T> struct is_lvalue<T&> : std::true_type {};
    template <class T> struct is_lvalue<T&&> : std::false_type {};
    
    template <class T> struct is_xvalue : std::false_type {};
    template <class T> struct is_xvalue<T&> : std::false_type {};
    template <class T> struct is_xvalue<T&&> : std::true_type {};
    
    int main()
    {
        int a{42};
        int& b{a};
        int&& r{std::move(a)};
    
        // Expression `42` is prvalue
        static_assert(is_prvalue<decltype((42))>::value);
    
        // Expression `a` is lvalue
        static_assert(is_lvalue<decltype((a))>::value);
    
        // Expression `b` is lvalue
        static_assert(is_lvalue<decltype((b))>::value);
    
        // Expression `std::move(a)` is xvalue
        static_assert(is_xvalue<decltype((std::move(a)))>::value);
    
        // Type of variable `r` is rvalue reference
        static_assert(std::is_rvalue_reference<decltype(r)>::value);
    
        // Type of variable `b` is lvalue reference
        static_assert(std::is_lvalue_reference<decltype(b)>::value);
    
        // Expression `r` is lvalue
        static_assert(is_lvalue<decltype((r))>::value);
    }
```

### Categorias primárias

#### lvalue

As seguintes são _expressões lvalue_ :

*   o nome de uma variável, uma função, um [objeto parâmetro de template](<#/doc/language/template_parameters>) (desde C++20), ou um membro de dados, independentemente do tipo, como [std::cin](<#/doc/io/cin>) ou [std::endl](<#/doc/io/manip/endl>). Mesmo que o tipo da variável seja rvalue reference, a expressão que consiste em seu nome é uma expressão lvalue (mas veja [Expressões elegíveis para move](<#/doc/language/value_category>));

Conteúdo estendido
---
```cpp
    void foo() {}
    
    void baz()
    {
        // `foo` is lvalue
        // address may be taken by built-in address-of operator
        void (*p)() = &foo;
    }
```
```cpp
    struct foo {};
    
    template <foo a>
    void baz()
    {
        const foo* obj = &a;  // `a` is an lvalue, template parameter object
    }
```

*   uma chamada de função ou uma expressão de operador sobrecarregado, cujo tipo de retorno é lvalue reference, como [std::getline](<#/doc/string/basic_string/getline>)([std::cin](<#/doc/io/cin>), str), [std::cout](<#/doc/io/cout>) << 1, str1 = str2, ou ++it;

Conteúdo estendido
---
```cpp
    int& a_ref()
    {
        static int a{3};
        return a;
    }
    
    void foo()
    {
        a_ref() = 5;  // `a_ref()` is lvalue, function call whose return type is lvalue reference
    }
```

*   a = b, a += b, a %= b, e todas as outras expressões de [atribuição e atribuição composta](<#/doc/language/operator_assignment>) embutidas;
*   ++a e --a, as expressões de [pré-incremento e pré-decremento](<#/doc/language/operator_incdec>) embutidas;
*   *p, a expressão de [indireção](<#/doc/language/operator_member_access>) embutida;
*   a[n] e p[n], as expressões de [subscrito](<#/doc/language/operator_member_access>) embutidas, onde um operando em a[n] é um lvalue de array (desde C++11);
*   a.m, a expressão de [membro de objeto](<#/doc/language/operator_member_access>), exceto quando `m` é um enumerador membro ou uma função membro não-estática, ou quando a é um rvalue e `m` é um membro de dados não-estático de tipo objeto;

Conteúdo estendido
---
```cpp
    struct foo
    {
        enum bar
        {
            m // member enumerator
        };
    };
    
    void baz()
    {
        foo a;
        a.m = 42; // ill-formed, lvalue required as left operand of assignment
    }
```
```cpp
    struct foo
    {
        void m() {} // non-static member function
    };
    
    void baz()
    {
        foo a;
    
        // `a.m` is a prvalue, hence the address cannot be taken by built-in
        // address-of operator
        void (foo::*p1)() = &a.m; // ill-formed
    
        void (foo::*p2)() = &foo::m; // OK: pointer to member function
    }
```
```cpp
    struct foo
    {
        static void m() {} // static member function
    };
    
    void baz()
    {
        foo a;
        void (*p1)() = &a.m;     // `a.m` is an lvalue
        void (*p2)() = &foo::m;  // the same
    }
```

*   p->m, a expressão de [membro de ponteiro](<#/doc/language/operator_member_access>) embutida, exceto quando `m` é um enumerador membro ou uma função membro não-estática;
*   a.*mp, a expressão de [ponteiro para membro de objeto](<#/doc/language/operator_member_access>), onde a é um lvalue e `mp` é um ponteiro para membro de dados;
*   p->*mp, a expressão de [ponteiro para membro de ponteiro](<#/doc/language/operator_member_access>) embutida, onde `mp` é um ponteiro para membro de dados;
*   a, b, a expressão de [vírgula](<#/doc/language/operator_other>) embutida, onde b é um lvalue;
*   a ? b : c, a expressão [condicional ternária](<#/doc/language/operator_other>) para certos b e c (por exemplo, quando ambos são lvalues do mesmo tipo, mas veja [definição](<#/doc/language/operator_other>) para detalhes);
*   um [literal de string](<#/doc/language/string_literal>), como "Hello, world!";
*   uma expressão de cast para tipo lvalue reference, como static_cast<int&>(x) ou static_cast<void(&)(int)>(x);
*   um [parâmetro de template](<#/doc/language/template_parameters>) não-tipo de um tipo lvalue reference;

```cpp
    template <int& v>
    void set()
    {
        v = 5; // template parameter is lvalue
    }
    
    int a{3}; // static variable, fixed address is known at compile-time
    
    void foo()
    {
        set<a>();
    }
```

*   uma chamada de função ou uma expressão de operador sobrecarregado, cujo tipo de retorno é rvalue reference para função;
*   uma expressão de cast para rvalue reference para tipo função, como static_cast<void(&&)(int)>(x).

| (desde C++11)

Propriedades:

*   O mesmo que [glvalue](<#/doc/language/value_category>) (abaixo).
*   O endereço de um lvalue pode ser obtido pelo operador address-of embutido: &++i[1](<#/doc/language/value_category>) e &[std::endl](<#/doc/io/manip/endl>) são expressões válidas.
*   Um lvalue modificável pode ser usado como o operando esquerdo dos operadores de atribuição e atribuição composta embutidos.
*   Um lvalue pode ser usado para [inicializar uma lvalue reference](<#/doc/language/reference_initialization>); isso associa um novo nome ao objeto identificado pela expressão.

#### prvalue

As seguintes são _expressões prvalue_ :

*   um [literal](<#/doc/language/expressions>) (exceto por [literal de string](<#/doc/language/string_literal>)), como 42, true ou nullptr;
*   uma chamada de função ou uma expressão de operador sobrecarregado, cujo tipo de retorno é não-referência, como str.substr(1, 2), str1 + str2, ou it++;
*   a++ e a--, as expressões de [pós-incremento e pós-decremento](<#/doc/language/operator_incdec>) embutidas;
*   a + b, a % b, a & b, a << b, e todas as outras expressões [aritméticas](<#/doc/language/operator_arithmetic>) embutidas;
*   a && b, a || b, !a, as expressões [lógicas](<#/doc/language/operator_logical>) embutidas;
*   a < b, a == b, a >= b, e todas as outras expressões de [comparação](<#/doc/language/operator_comparison>) embutidas;
*   &a, a expressão [address-of](<#/doc/language/operator_member_access>) embutida;
*   a.m, a expressão de [membro de objeto](<#/doc/language/operator_member_access>), onde `m` é um enumerador membro ou uma função membro não-estática[2](<#/doc/language/value_category>);
*   p->m, a expressão de [membro de ponteiro](<#/doc/language/operator_member_access>) embutida, onde `m` é um enumerador membro ou uma função membro não-estática[2](<#/doc/language/value_category>);
*   a.*mp, a expressão de [ponteiro para membro de objeto](<#/doc/language/operator_member_access>), onde `mp` é um ponteiro para função membro[2](<#/doc/language/value_category>);
*   p->*mp, a expressão de [ponteiro para membro de ponteiro](<#/doc/language/operator_member_access>) embutida, onde `mp` é um ponteiro para função membro[2](<#/doc/language/value_category>);
*   a, b, a expressão de [vírgula](<#/doc/language/operator_other>) embutida, onde b é um prvalue;
*   a ? b : c, a expressão [condicional ternária](<#/doc/language/operator_other>) para certos b e c (veja [definição](<#/doc/language/operator_other>) para detalhes);
*   uma expressão de cast para tipo não-referência, como static_cast&lt;double&gt;(x), [std::string](<#/doc/string/basic_string>){}, ou (int)42;
*   o ponteiro [`this`](<#/doc/language/this>);
*   um [enumerador](<#/doc/language/enum>);
*   um [parâmetro de template](<#/doc/language/template_parameters>) não-tipo de um tipo escalar;

```cpp
    template <int v>
    void foo()
    {
        // not an lvalue, `v` is a template parameter of scalar type int
        const int* a = &v; // ill-formed
    
        v = 3; // ill-formed: lvalue required as left operand of assignment
    }
```

*   uma [expressão lambda](<#/doc/language/lambda>), como [](int x){ return x * x; };

| (desde C++11)

*   uma [requires-expression](<#/doc/language/constraints>), como requires (T i) { typename T::type; };
*   uma especialização de um [concept](<#/doc/language/constraints>), como [std::equality_comparable](<#/doc/concepts/equality_comparable>)&lt;int&gt;.

| (C++20)

Propriedades:

*   O mesmo que [rvalue](<#/doc/language/value_category>) (abaixo).
*   Um prvalue não pode ser [polimórfico](<#/doc/language/objects>): o [tipo dinâmico](<#/doc/language/type-id>) do objeto que ele denota é sempre o tipo da expressão.
*   Um prvalue não-classe e não-array não pode ser [cv-qualificado](<#/doc/language/cv>), a menos que seja [materializado](<#/doc/language/implicit_cast>) para ser [ligado a uma referência](<#/doc/language/reference_initialization>) a um tipo cv-qualificado (desde C++17). (Nota: uma chamada de função ou expressão de cast pode resultar em um prvalue de tipo cv-qualificado não-classe, mas o cv-qualificador é geralmente removido imediatamente.)
*   Um prvalue não pode ter [tipo incompleto](<#/doc/language/type-id>) (exceto para o tipo void, veja abaixo, ou quando usado no especificador [`decltype`](<#/doc/language/decltype>)).
*   Um prvalue não pode ter [tipo de classe abstrata](<#/doc/language/abstract_class>) ou um array dele.

#### xvalue

As seguintes são _expressões xvalue_ :

*   a.m, a expressão de [membro de objeto](<#/doc/language/operator_member_access>), onde a é um rvalue e `m` é um membro de dados não-estático de um tipo objeto;
*   a.*mp, a expressão de [ponteiro para membro de objeto](<#/doc/language/operator_member_access>), onde a é um rvalue e `mp` é um ponteiro para membro de dados;
*   a, b, a expressão de [vírgula](<#/doc/language/operator_other>) embutida, onde b é um xvalue;
*   a ? b : c, a expressão [condicional ternária](<#/doc/language/operator_other>) para certos b e c (veja [definição](<#/doc/language/operator_other>) para detalhes);
*   uma chamada de função ou uma expressão de operador sobrecarregado, cujo tipo de retorno é rvalue reference para objeto, como std::move(x);
*   a[n], a expressão de [subscrito](<#/doc/language/operator_member_access>) embutida, onde um operando é um rvalue de array;
*   uma expressão de cast para rvalue reference para tipo objeto, como static_cast<char&&>(x);

| (desde C++11)

*   qualquer expressão que designa um objeto temporário, após [materialização temporária](<#/doc/language/implicit_cast>);

| (desde C++17)

*   uma [expressão elegível para move](<#/doc/language/value_category>).

| (C++23)

Propriedades:

*   O mesmo que rvalue (abaixo).
*   O mesmo que glvalue (abaixo).

Em particular, como todos os rvalues, xvalues se ligam a rvalue references, e como todos os glvalues, xvalues podem ser [polimórficos](<#/doc/language/objects>), e xvalues não-classe podem ser [cv-qualificados](<#/doc/language/cv>).

Conteúdo estendido
---
Execute este código
```cpp
    #include <type_traits>
    
    template <class T> struct is_prvalue : std::true_type {};
    template <class T> struct is_prvalue<T&> : std::false_type {};
    template <class T> struct is_prvalue<T&&> : std::false_type {};
    
    template <class T> struct is_lvalue : std::false_type {};
    template <class T> struct is_lvalue<T&> : std::true_type {};
    template <class T> struct is_lvalue<T&&> : std::false_type {};
    
    template <class T> struct is_xvalue : std::false_type {};
    template <class T> struct is_xvalue<T&> : std::false_type {};
    template <class T> struct is_xvalue<T&&> : std::true_type {};
    
    // Example from C++23 standard: 7.2.1 Value category [basic.lval]
    struct A
    {
        int m;
    };
    
    A&& operator+(A, A);
    A&& f();
    
    int main()
    {
        A a;
        A&& ar = static_cast<A&&>(a);
    
        // Function call with return type rvalue reference is xvalue
        static_assert(is_xvalue<decltype( (f()) )>::value);
    
        // Member of object expression, object is xvalue, `m` is a non-static data member
        static_assert(is_xvalue<decltype( (f().m) )>::value);
    
        // A cast expression to rvalue reference
        static_assert(is_xvalue<decltype( (static_cast<A&&>(a)) )>::value);
    
        // Operator expression, whose return type is rvalue reference to object
        static_assert(is_xvalue<decltype( (a + a) )>::value);
    
        // Expression `ar` is lvalue, `&ar` is valid
        static_assert(is_lvalue<decltype( (ar) )>::value);
        [[maybe_unused]] A* ap = &ar;
    }
```

### Categorias mistas

#### glvalue

Uma _expressão glvalue_ é um lvalue ou um xvalue.

Propriedades:

*   Um glvalue pode ser implicitamente convertido para um prvalue com [conversão implícita](<#/doc/language/implicit_cast>) de lvalue para rvalue, de array para ponteiro, ou de função para ponteiro.
*   Um glvalue pode ser [polimórfico](<#/doc/language/objects>): o [tipo dinâmico](<#/doc/language/type-id>) do objeto que ele identifica não é necessariamente o tipo estático da expressão.
*   Um glvalue pode ter [tipo incompleto](<#/doc/language/type-id>), onde permitido pela expressão.

#### rvalue

Uma _expressão rvalue_ é um prvalue ou um xvalue.

Propriedades:

*   O endereço de um rvalue não pode ser obtido pelo operador address-of embutido: &int(), &i++[3](<#/doc/language/value_category>), &42, e &std::move(x) são inválidos.
*   Um rvalue não pode ser usado como o operando esquerdo dos operadores de atribuição ou atribuição composta embutidos.
*   Um rvalue pode ser usado para [inicializar uma const lvalue reference](<#/doc/language/reference_initialization>), caso em que o tempo de vida do objeto temporário identificado pelo rvalue é [estendido](<#/doc/language/reference_initialization>) até o fim do escopo da referência.
*   Um rvalue pode ser usado para [inicializar uma rvalue reference](<#/doc/language/reference_initialization>), caso em que o tempo de vida do objeto temporário identificado pelo rvalue é [estendido](<#/doc/language/reference_initialization>) até o fim do escopo da referência.
*   Quando usado como argumento de função e quando [duas sobrecargas](<#/doc/language/overload_resolution>) da função estão disponíveis, uma recebendo um parâmetro rvalue reference e a outra recebendo um parâmetro lvalue reference para const, um rvalue se liga à sobrecarga de rvalue reference (assim, se ambos os construtores de cópia e move estiverem disponíveis, um argumento rvalue invoca o [construtor de move](<#/doc/language/move_constructor>), e o mesmo ocorre com os operadores de atribuição de cópia e move).

| (desde C++11)

### Categorias especiais

#### Chamada de função membro pendente

As expressões a.mf e p->mf, onde `mf` é uma [função membro não-estática](<#/doc/language/member_functions>), e as expressões a.*pmf e p->*pmf, onde `pmf` é um [ponteiro para função membro](<#/doc/language/pointer>), são classificadas como expressões prvalue, mas não podem ser usadas para inicializar referências, como argumentos de função, ou para qualquer outro propósito, exceto como o argumento esquerdo do operador de chamada de função, por exemplo, (p->*pmf)(args).

#### Expressões void

Expressões de chamada de função que retornam void, expressões de cast para void, e [throw-expressions](<#/doc/language/throw>) são classificadas como expressões prvalue, mas não podem ser usadas para inicializar referências ou como argumentos de função. Elas podem ser usadas em contextos de valor descartado (por exemplo, em uma linha própria, como o operando esquerdo do operador vírgula, etc.) e na instrução return em uma função que retorna void. Além disso, throw-expressions podem ser usadas como o segundo e o terceiro operandos do [operador condicional ?:](<#/doc/language/operator_other>).

Expressões void não têm um _objeto de resultado_. | (desde C++17)

#### Bit-fields

Uma expressão que designa um [bit-field](<#/doc/language/bit_field>) (por exemplo, a.m, onde a é um lvalue do tipo struct A { int m: 3; }) é uma expressão glvalue: ela pode ser usada como o operando esquerdo do operador de atribuição, mas seu endereço não pode ser obtido e uma lvalue reference não-const não pode ser ligada a ela. Uma const lvalue reference ou rvalue reference pode ser inicializada a partir de um glvalue de bit-field, mas uma cópia temporária do bit-field será feita: ela não se ligará diretamente ao bit-field.

#### Expressões elegíveis para move

Embora uma expressão que consiste no nome de qualquer variável seja uma expressão lvalue, tal expressão pode ser elegível para move se aparecer como operando de

*   uma instrução [`return`](<#/doc/language/return>)
*   uma instrução [`co_return`](<#/doc/language/coroutines>) (C++20)
*   uma expressão [`throw`](<#/doc/language/throw>) (desde C++17)

Se uma expressão é elegível para move, ela é tratada como um rvalue ou como um lvalue (até C++23) como um rvalue (desde C++23) para fins de [resolução de sobrecarga](<#/doc/language/overload_resolution>) (assim, pode selecionar o [construtor de move](<#/doc/language/move_constructor>)). Veja [Move automático de variáveis locais e parâmetros](<#/doc/language/return>) para detalhes. | (desde C++11)

### Histórico

#### CPL

A linguagem de programação [CPL](<https://en.wikipedia.org/wiki/CPL_\(programming_language\)> "enwiki:CPL \(programming language\)") foi a primeira a introduzir categorias de valor para expressões: todas as expressões CPL podem ser avaliadas em "modo de lado direito", mas apenas certos tipos de expressão são significativos em "modo de lado esquerdo". Quando avaliada em modo de lado direito, uma expressão é considerada uma regra para o cálculo de um valor (o valor de lado direito, ou _rvalue_). Quando avaliada em modo de lado esquerdo, uma expressão efetivamente fornece um endereço (o valor de lado esquerdo, ou _lvalue_). "Esquerdo" e "Direito" aqui significavam "esquerda da atribuição" e "direita da atribuição".

#### C

A linguagem de programação C seguiu uma taxonomia semelhante, exceto que o papel da atribuição não era mais significativo: as expressões C são categorizadas entre "expressões lvalue" e outras (funções e valores não-objeto), onde "lvalue" significa uma expressão que identifica um objeto, um "valor localizador"[4](<#/doc/language/value_category>).

#### C++98

O C++ pré-2011 seguiu o modelo C, mas restaurou o nome "rvalue" para expressões não-lvalue, transformou funções em lvalues, e adicionou a regra de que referências podem se ligar a lvalues, mas apenas referências a const podem se ligar a rvalues. Várias expressões C não-lvalue se tornaram expressões lvalue em C++.

#### C++11

Com a introdução de move semantics em C++11, as categorias de valor foram redefinidas para caracterizar duas propriedades independentes de expressões[5](<#/doc/language/value_category>):

*   _tem identidade_ : é possível determinar se a expressão se refere à mesma entidade que outra expressão, como comparando endereços dos objetos ou das funções que elas identificam (obtidos direta ou indiretamente);
*   _pode ser movido de_ : [construtor de move](<#/doc/language/move_constructor>), [operador de atribuição de move](<#/doc/language/move_operator>), ou outra sobrecarga de função que implementa move semantics pode se ligar à expressão.

Em C++11, expressões que:

*   têm identidade e não podem ser movidas de são chamadas expressões _lvalue_;
*   têm identidade e podem ser movidas de são chamadas expressões _xvalue_;
*   não têm identidade e podem ser movidas de são chamadas expressões _prvalue_ ("rvalue puro");
*   não têm identidade e não podem ser movidas de não são usadas[6](<#/doc/language/value_category>).

As expressões que têm identidade são chamadas "expressões glvalue" (glvalue significa "lvalue generalizado"). Ambos lvalues e xvalues são expressões glvalue.

As expressões que podem ser movidas de são chamadas "expressões rvalue". Ambos prvalues e xvalues são expressões rvalue.

#### C++17

Em C++17, a [eliminação de cópia](<#/doc/language/copy_elision>) tornou-se obrigatória em algumas situações, e isso exigiu a separação das expressões prvalue dos objetos temporários inicializados por elas, resultando no sistema que temos hoje. Note que, em contraste com o esquema C++11, prvalues não são mais movidos de.

### Notas de rodapé

*   1. [↑](<#/doc/language/value_category>) Assumindo que i tem tipo embutido ou que o operador de pré-incremento é [sobrecarregado](<#/doc/language/operators>) para retornar por lvalue reference.
*   2. ↑ [2.0](<#/doc/language/value_category>) [2.1](<#/doc/language/value_category>) [2.2](<#/doc/language/value_category>) [2.3](<#/doc/language/value_category>) Categoria rvalue especial, veja [chamada de função membro pendente](<#/doc/language/value_category>).
*   3. [↑](<#/doc/language/value_category>) Assumindo que i tem tipo embutido ou que o operador de pós-incremento não é [sobrecarregado](<#/doc/language/operators>) para retornar por lvalue reference.
*   4. [↑](<#/doc/language/value_category>) "Uma diferença de opinião dentro da comunidade C centrava-se no significado de lvalue, um grupo considerando um lvalue como qualquer tipo de localizador de objeto, outro grupo sustentando que um lvalue é significativo no lado esquerdo de um operador de atribuição. O Comitê C89 adotou a definição de lvalue como um localizador de objeto." -- ANSI C Rationale, 6.3.2.1/10.
*   5. [↑](<#/doc/language/value_category>) ["Nova" Terminologia de Valor](<https://www.stroustrup.com/terminology.pdf>) por Bjarne Stroustrup, 2010.
*   6. [↑](<#/doc/language/value_category>) const prvalues (permitidos apenas para tipos de classe) e const xvalues não se ligam a sobrecargas `T&&`, mas se ligam a sobrecargas const T&&, que também são classificadas como "construtor de move" e "operador de atribuição de move" pelo padrão, satisfazendo a definição de "pode ser movido de" para fins desta classificação. No entanto, tais sobrecargas não podem modificar seus argumentos e não são usadas na prática; na ausência delas, const prvalues e const xvalues se ligam a sobrecargas const T&.

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   7.2.1 Categoria de valor [basic.lval]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   7.2.1 Categoria de valor [basic.lval]

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   6.10 Lvalues e rvalues [basic.lval]

*   Padrão C++14 (ISO/IEC 14882:2014):

    *   3.10 Lvalues e rvalues [basic.lval]

*   Padrão C++11 (ISO/IEC 14882:2011):

    *   3.10 Lvalues e rvalues [basic.lval]

*   Padrão C++98 (ISO/IEC 14882:1998):

    *   3.10 Lvalues e rvalues [basic.lval]

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 616](<https://cplusplus.github.io/CWG/issues/616.html>) | C++11 | acesso a membro e acesso a membro através de ponteiro para membro de um rvalue resultava em prvalue | reclassificado como xvalue
[CWG 1059](<https://cplusplus.github.io/CWG/issues/1059.html>) | C++11 | prvalues de array não podiam ser cv-qualificados | permitido
[CWG 1213](<https://cplusplus.github.io/CWG/issues/1213.html>) | C++11 | subscritar um rvalue de array resultava em lvalue | reclassificado como xvalue

### Veja também

[Documentação C](<#/>) para categorias de valor
---

### Links externos

```cpp
1. | Categorias de valor C++ e decltype desmistificados — David Mazières, 2021
2. | Determinar empiricamente a categoria de valor de uma expressão — StackOverflow
```
---