# Namespaces

Namespaces fornecem um método para prevenir conflitos de nomes em grandes projetos.

Entidades declaradas dentro de um bloco namespace são colocadas em um escopo de namespace, o que impede que sejam confundidas com entidades de nomes idênticos em outros escopos.

Entidades declaradas fora de todos os blocos namespace pertencem ao _namespace global_. O namespace global pertence ao [escopo global](<#/doc/language/scope>), e pode ser referido explicitamente com um `::` inicial. Embora não tenha uma declaração, o namespace global não é um [namespace sem nome](<#/doc/language/namespace>).

Múltiplos blocos namespace com o mesmo nome são permitidos. Todas as declarações dentro desses blocos são declaradas no mesmo escopo de namespace.

### Sintaxe

---
`namespace` ns-name `{` declarations `}` | (1) |
---|---|---
`inline` `namespace` ns-name `{` declarations `}` | (2) | (desde C++11)
`namespace` `{` declarations `}` | (3) |
ns-name `::` member-name | (4) |
`using` `namespace` ns-name `;` | (5) |
`using` ns-name `::` member-name `;` | (6) |
`namespace` name `=` qualified-namespace `;` | (7) |
`namespace` ns-name `::` member-name `{` declarations `}` | (8) | (desde C++17)
`namespace` ns-name `::` `inline` member-name `{` declarations `}` | (9) | (desde C++20)

1) [Definição de namespace nomeado](<#/doc/language/namespace>) para o namespace ns-name.

2) [Definição de namespace inline](<#/doc/language/namespace>) para o namespace ns-name. Declarações dentro de ns-name serão visíveis em seu namespace envolvente.

3) [Definição de namespace sem nome](<#/doc/language/namespace>). Seus membros têm escopo potencial desde o ponto de declaração até o final da unidade de tradução, e possuem [ligação interna](<#/doc/language/storage_duration>).

4) Nomes de namespace (juntamente com nomes de classe) podem aparecer no lado esquerdo do operador de resolução de escopo, como parte da [pesquisa de nome qualificado](<#/doc/language/lookup>).

5) [using-directive](<#/doc/language/namespace>): Do ponto de vista da [pesquisa de nome](<#/doc/language/lookup>) não qualificada de qualquer nome após uma using-directive e até o final do escopo em que ela aparece, cada nome de ns-name é visível como se tivesse sido declarado no namespace envolvente mais próximo que contém tanto a using-directive quanto ns-name.

6) [using-declaration](<#/doc/language/namespace>): torna o símbolo member-name do namespace ns-name acessível para [pesquisa não qualificada](<#/doc/language/lookup>) como se declarado no mesmo escopo de classe, escopo de bloco ou namespace onde esta using-declaration aparece.

7) definição de alias de namespace: torna name um sinônimo para outro namespace: veja [alias de namespace](<#/doc/language/namespace_alias>)

8) definição de namespace aninhado: namespace A::B::C { ... } é equivalente a namespace A { namespace B { namespace C { ... } } }.

9) definição de namespace inline aninhado: namespace A::B::inline C { ... } é equivalente a namespace A::B { inline namespace C { ... } }. inline pode aparecer na frente de cada nome de namespace, exceto o primeiro: namespace A::inline B::C {} é equivalente a namespace A { inline namespace B { namespace C {} } }.

### Explicação

#### Namespaces

---
`inline`(optional) `namespace` attr ﻿(optional) identifier `{` namespace-body `}`
- `inline` — (desde C++11) se presente, torna este um namespace inline (veja abaixo). Não pode aparecer na _definição-de-namespace-de-extensão_ se a _definição-de-namespace-original_ não usou `inline`
- **attr** — (desde C++17) sequência opcional de qualquer número de [atributos](<#/doc/language/attributes>)
- **identifier** — ou

  * um identificador não utilizado anteriormente, caso em que esta é uma _definição-de-namespace-original_;

  * o nome de um namespace, caso em que esta é uma _definição-de-namespace-de-extensão_;

|

  * uma sequência de especificadores de namespace envolventes separados por `::`, terminando com um identificador, caso em que esta é uma _definição-de-namespace-aninhado_

| (desde C++17)
- **namespace-body** — sequência possivelmente vazia de [declarações](<#/doc/language/declarations>) de qualquer tipo (incluindo definições de classe e função, bem como namespaces aninhados)

Definições de namespace são permitidas apenas no escopo de namespace, incluindo o escopo global.

Para reabrir um namespace existente (formalmente, para ser uma _definição-de-namespace-de-extensão_), a pesquisa pelo identificador usado na definição do namespace deve resolver para um nome de namespace (não um alias de namespace), que foi declarado como membro do namespace envolvente ou de um namespace inline dentro de um namespace envolvente.

O namespace-body define um [escopo de namespace](<#/doc/language/scope>), que afeta a [pesquisa de nome](<#/doc/language/lookup>).

Todos os nomes introduzidos pelas declarações que aparecem dentro do namespace-body (incluindo definições de namespace aninhados) tornam-se membros do identificador do namespace, seja esta definição de namespace a definição de namespace original (que introduziu o identificador), ou uma definição de namespace de extensão (que "reabriu" o namespace já definido)

Um membro de namespace que foi declarado dentro de um corpo de namespace pode ser definido ou redeclarado fora dele usando qualificação explícita
```cpp
    namespace Q
    {
        namespace V   // V is a member of Q, and is fully defined within Q
        { // namespace Q::V { // C++17 alternative to the lines above
            class C { void m(); }; // C is a member of V and is fully defined within V
                                   // C::m is only declared
            void f(); // f is a member of V, but is only declared here
        }

        void V::f() // definition of V's member f outside of V
                    // f's enclosing namespaces are still the global namespace, Q, and Q::V
        {
            extern void h(); // This declares ::Q::V::h
        }

        void V::C::m() // definition of V::C::m outside of the namespace (and the class body)
                       // enclosing namespaces are the global namespace, Q, and Q::V
        {}
    }
```

Definições e redeclarações fora do namespace são permitidas apenas

  * após o ponto de declaração,
  * no escopo de namespace, e
  * em namespaces que envolvem o namespace original (incluindo o namespace global).

Além disso, eles devem usar a sintaxe qualified-id.
```cpp
    namespace Q
    {
        namespace V    // original-namespace-definition for V
        {
            void f();  // declaration of Q::V::f
        }

        void V::f() {} // OK
        void V::g() {} // Error: g() is not yet a member of V

        namespace V    // extension-namespace-definition for V
        {
            void g();  // declaration of Q::V::g
        }
    }

    namespace R           // not an enclosing namespace for Q
    {
        void Q::V::g() {} // Error: cannot define Q::V::g inside R
    }

    void Q::V::g() {}     // OK: global namespace encloses Q
```

Nomes introduzidos por declarações [friend](<#/doc/language/friend>) dentro de uma classe não-local X tornam-se membros do namespace envolvente mais interno de X, mas não se tornam visíveis para a [pesquisa de nome](<#/doc/language/lookup>) comum (nem [não qualificada](<#/doc/language/unqualified_lookup>) nem [qualificada](<#/doc/language/qualified_lookup>)) a menos que uma declaração correspondente seja fornecida no escopo do namespace, seja antes ou depois da definição da classe. Tal nome pode ser encontrado através de [ADL](<#/doc/language/adl>) que considera tanto namespaces quanto classes.

Apenas o namespace envolvente mais interno é considerado por tal declaração friend ao decidir se o nome entraria em conflito com um nome declarado anteriormente.
```cpp
    void h(int);
    namespace A
    {
        class X
        {
            friend void f(X);       // A::f is a friend

            class Y
            {
                friend void g();    // A::g is a friend
                friend void h(int); // A::h is a friend, no conflict with ::h
            };
        };
        // A::f, A::g and A::h are not visible at namespace scope
        // even though they are members of the namespace A

        X x;
        void g()  // definition of A::g
        {
            f(x); // A::X::f is found through ADL
        }

        void f(X) {}   // definition of A::f
        void h(int) {} // definition of A::h
        // A::f, A::g and A::h are now visible at namespace scope
        // and they are also friends of A::X and A::X::Y
    }
```

#### Namespaces inline

Um namespace inline é um namespace que usa a palavra-chave opcional `inline` em sua _definição-de-namespace-original_. Membros de um namespace inline são tratados como se fossem membros do namespace envolvente em muitas situações (listadas abaixo). Esta propriedade é transitiva: se um namespace N contém um namespace inline M, que por sua vez contém um namespace inline O, então os membros de O podem ser usados como se fossem membros de M ou N.

  * Uma _using-directive_ que nomeia o namespace inline é implicitamente inserida no namespace envolvente (semelhante à using-directive implícita para o namespace sem nome)
  * Na [pesquisa dependente de argumento](<#/doc/language/adl>), quando um namespace é adicionado ao conjunto de namespaces associados, seus namespaces inline também são adicionados, e se um namespace inline é adicionado à lista de namespaces associados, seu namespace envolvente também é adicionado.
  * Cada membro de um namespace inline pode ser parcialmente especializado, explicitamente instanciado ou explicitamente especializado como se fosse um membro do namespace envolvente.
  * A [pesquisa de nome](<#/doc/language/lookup>) qualificada que examina o namespace envolvente incluirá os nomes dos namespaces inline, mesmo que o mesmo nome esteja presente no namespace envolvente.

```cpp
    // in C++14, std::literals and its member namespaces are inline
    {
        using namespace std::string_literals; // makes visible operator""s
                                              // from std::literals::string_literals
        auto str = "abc"s;
    }

    {
        using namespace std::literals; // makes visible both
                                       // std::literals::string_literals::operator""s
                                       // and std::literals::chrono_literals::operator""s
        auto str = "abc"s;
        auto min = 60s;
    }

    {
        using std::operator""s; // makes both std::literals::string_literals::operator""s
                                // and std::literals::chrono_literals::operator""s visible
        auto str = "abc"s;
        auto min = 60s;
    }
```

Nota: a regra sobre especializações permite o versionamento de bibliotecas: diferentes implementações de um template de biblioteca podem ser definidas em diferentes namespaces inline, enquanto ainda permite ao usuário estender o namespace pai com uma especialização explícita do template primário: Execute este código
```cpp
    namespace Lib
    {
        inline namespace Lib_1
        {
            template<typename T> class A;
        }

        template<typename T> void g(T) { /* ... */ }
    }
    /* ... */
    struct MyClass { /* ... */ };
    namespace Lib
    {
        template<> class A<MyClass> { /* ... */ };
    }

    int main()
    {
        Lib::A<MyClass> a;
        g(a);  // ok, Lib is an associated namespace of A
    }
```

| (desde C++11)

#### Namespaces sem nome

A _definição-de-namespace-sem-nome_ é uma definição de namespace na forma

---
`inline`(optional) `namespace` attr ﻿(optional) `{` namespace-body `}`
- `inline` — (desde C++11) se presente, torna este um namespace inline
- **attr** — (desde C++17) sequência opcional de qualquer número de [atributos](<#/doc/language/attributes>)

Esta definição é tratada como uma definição de um namespace com nome único e uma _using-directive_ no escopo atual que nomeia este namespace sem nome (Nota: a using-directive implicitamente adicionada torna o namespace disponível para a [pesquisa de nome qualificado](<#/doc/language/qualified_lookup>) e [pesquisa de nome não qualificado](<#/doc/language/unqualified_lookup>), mas não para a [pesquisa dependente de argumento](<#/doc/language/adl>)). O nome único é único em todo o programa, mas dentro de uma unidade de tradução, cada definição de namespace sem nome mapeia para o mesmo nome único: múltiplas definições de namespace sem nome no mesmo escopo denotam o mesmo namespace sem nome.
```cpp
    namespace
    {
        int i; // defines ::(unique)::i
    }

    void f()
    {
        i++;   // increments ::(unique)::i
    }

    namespace A
    {
        namespace
        {
            int i;        // A::(unique)::i
            int j;        // A::(unique)::j
        }

        void g() { i++; } // A::(unique)::i++
    }

    using namespace A; // introduces all names from A into global namespace

    void h()
    {
        i++;    // error: ::(unique)::i and ::A::(unique)::i are both in scope
        A::i++; // ok, increments ::A::(unique)::i
        j++;    // ok, increments ::A::(unique)::j
    }
```

Embora nomes em um namespace sem nome possam ser declarados com ligação externa, eles nunca são acessíveis de outras unidades de tradução porque o nome do seu namespace é único. | (até C++11)
---|---
Namespaces sem nome, bem como todos os namespaces declarados direta ou indireamente dentro de um namespace sem nome, possuem [ligação interna](<#/doc/language/storage_duration>), o que significa que qualquer nome declarado dentro de um namespace sem nome tem ligação interna. | (desde C++11)

#### Using-declarations

Introduz um nome que é definido em outro lugar na região declarativa onde esta using-declaration aparece.

---
`using` `typename`(optional) nested-name-specifier unqualified-id `;` | | (até C++17)
---|---|---
`using` declarator-list `;` | | (desde C++17)
- `typename` — a palavra-chave `typename` pode ser usada conforme necessário para resolver [nomes dependentes](<#/doc/language/dependent_name>), quando a using-declaration introduz um tipo membro de uma classe base em um template de classe
- **nested-name-specifier** — uma sequência de nomes e operadores de resolução de escopo `::`, terminando com um operador de resolução de escopo. Um único `::` refere-se ao namespace global.
- **unqualified-id** — uma [id-expression](<#/doc/language/name>)
- **declarator-list** — lista separada por vírgulas de um ou mais declaradores na forma `typename`(opcional) nested-name-specifier unqualified-id. Um declarador pode ser seguido por uma elipse para indicar [expansão de pacote](<#/doc/language/parameter_pack>), embora essa forma seja significativa apenas em [definições de classe derivada](<#/doc/language/using_declaration>)

Using-declarations podem ser usadas para introduzir membros de namespace em outros namespaces e escopos de bloco, ou para introduzir membros de classe base em definições de classe derivada, ou para introduzir [enumeradores](<#/doc/language/enum>) em namespaces, escopos de bloco e de classe (desde C++20).

Uma using-declaration com mais de um using-declarator é equivalente a uma sequência correspondente de using-declarations com um using-declarator. | (desde C++17)

Para o uso em definições de classe derivada, veja [using declaration](<#/doc/language/using_declaration>).

Nomes introduzidos em um escopo de namespace por uma using-declaration podem ser usados como quaisquer outros nomes, incluindo pesquisa qualificada de outros escopos:
```cpp
    void f();
    namespace A
    {
        void g();
    }

    namespace X
    {
        using ::f;        // global f is now visible as ::X::f
        using A::g;       // A::g is now visible as ::X::g
        using A::g, A::g; // (C++17) OK: double declaration allowed at namespace scope
    }

    void h()
    {
        X::f(); // calls ::f
        X::g(); // calls A::g
    }
```

Se, depois que a using-declaration foi usada para pegar um membro de um namespace, o namespace for estendido e declarações adicionais para o mesmo nome forem introduzidas, essas declarações adicionais não se tornam visíveis através da using-declaration (em contraste com a using-directive). Uma exceção é quando uma using-declaration nomeia um template de classe: especializações parciais introduzidas posteriormente são efetivamente visíveis, porque sua [pesquisa](<#/doc/language/lookup>) prossegue através do template primário.
```cpp
    namespace A
    {
        void f(int);
    }
    using A::f; // ::f is now a synonym for A::f(int)

    namespace A       // namespace extension
    {
        void f(char); // does not change what ::f means
    }

    void foo()
    {
        f('a'); // calls f(int), even though f(char) exists.
    }

    void bar()
    {
        using A::f; // this f is a synonym for both A::f(int) and A::f(char)
        f('a');     // calls f(char)
    }
```

Using-declarations não podem nomear [template-id](<#/doc/language/templates>), ou namespace, ou um enumerador com escopo (até C++20). Cada declarador em uma using-declaration introduz um e apenas um nome, por exemplo, uma using-declaration para uma [enumeração](<#/doc/language/enum>) não introduz nenhum de seus enumeradores.

Todas as restrições sobre declarações regulares dos mesmos nomes, regras de ocultação e sobrecarga se aplicam às using-declarations:
```cpp
    namespace A
    {
        int x;
    }

    namespace B
    {
        int i;
        struct g {};
        struct x {};

        void f(int);
        void f(double);
        void g(char); // OK: function name g hides struct g
    }

    void func()
    {
        int i;
        using B::i;   // error: i declared twice

        void f(char);
        using B::f;   // OK: f(char), f(int), f(double) are overloads
        f(3.5);       // calls B::f(double)

        using B::g;
        g('a');       // calls B::g(char)
        struct g g1;  // declares g1 to have type struct B::g

        using B::x;
        using A::x;   // OK: hides struct B::x
        x = 99;       // assigns to A::x
        struct x x1;  // declares x1 to have type struct B::x
    }
```

Se uma função foi introduzida por uma using-declaration, declarar uma função com o mesmo nome e lista de parâmetros é malformado (a menos que a declaração seja para a mesma função). Se um template de função foi introduzido por uma using-declaration, declarar um template de função com o mesmo nome, lista de tipos de parâmetros, tipo de retorno e lista de parâmetros de template é malformado. Duas using-declarations podem introduzir funções com o mesmo nome e lista de parâmetros, mas se uma chamada para essa função for tentada, o programa é malformado.
```cpp
    namespace B
    {
        void f(int);
        void f(double);
    }

    namespace C
    {
        void f(int);
        void f(double);
        void f(char);
    }

    void h()
    {
        using B::f;  // introduces B::f(int), B::f(double)
        using C::f;  // introduces C::f(int), C::f(double), and C::f(char)
        f('h');      // calls C::f(char)
        f(1);        // error: B::f(int) or C::f(int)?
        void f(int); // error: f(int) conflicts with C::f(int) and B::f(int)
    }
```

Se uma entidade é declarada, mas não definida em algum namespace interno, e então declarada através de using-declaration no namespace externo, e então uma definição aparece no namespace externo com o mesmo nome não qualificado, essa definição é um membro do namespace externo e entra em conflito com a using-declaration:
```cpp
    namespace X
    {
        namespace M
        {
            void g(); // declares, but doesn't define X::M::g()
        }
        using M::g;

        void g();     // Error: attempt to declare X::g which conflicts with X::M::g()
    }
```

Mais geralmente, uma declaração que aparece em qualquer escopo de namespace e introduz um nome usando um identificador não qualificado sempre introduz um membro no namespace em que está e não em qualquer outro namespace. As exceções são instanciações explícitas e especializações explícitas de um template primário que é definido em um namespace inline: como eles não introduzem um novo nome, eles podem usar unqualified-id em um namespace envolvente.

#### Using-directives

Uma _using-directive_ é uma [declaração de bloco](<#/doc/language/declarations>) com a seguinte sintaxe:

---
attr ﻿(optional) `using` `namespace` nested-name-specifier ﻿(optional) namespace-name `;` | (1) |
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>) que se aplicam a esta using-directive
- **nested-name-specifier** — uma sequência de nomes e operadores de resolução de escopo `::`, terminando com um operador de resolução de escopo. Um único `::` refere-se ao namespace global. Ao pesquisar os nomes nesta sequência, a [pesquisa](<#/doc/language/lookup>) considera apenas declarações de namespace
- **namespace-name** — um nome de um namespace. Ao pesquisar este nome, a [pesquisa](<#/doc/language/lookup>) considera apenas declarações de namespace

Using-directives são permitidas apenas no [escopo](<#/doc/language/scope>) de namespace e no escopo de bloco. Do ponto de vista da [pesquisa de nome não qualificado](<#/doc/language/unqualified_lookup>) de qualquer nome após uma using-directive e até o final do escopo em que ela aparece, cada nome de namespace-name é visível como se tivesse sido declarado no namespace envolvente mais próximo que contém tanto a using-directive quanto namespace-name.

A Using-directive não adiciona nenhum nome à região declarativa em que aparece (ao contrário da using-declaration), e, portanto, não impede que nomes idênticos sejam declarados.

Using-directives são transitivas para fins de [pesquisa não qualificada](<#/doc/language/unqualified_lookup>): se um escopo contém uma using-directive que nomeia um namespace-name, que por sua vez contém uma using-directive para algum namespace-name-2, o efeito é como se as using-directives do segundo namespace aparecessem dentro do primeiro. A ordem em que esses namespaces transitivos ocorrem não influencia a pesquisa de nome.
```cpp
    namespace A
    {
        int i;
    }

    namespace B
    {
        int i;
        int j;

        namespace C
        {
            namespace D
            {
                using namespace A;
                // Names from A are "injected" into D.
                // Unqualified lookup within D considers these names to have the same
                // scope as the global scope (e.g. for the purposes of name hiding).
                // Qualified lookup referring to D (D::name for some name)
                // will find the same name as unqualified lookup within D.

                int j;
                int k;
                int a = i;   // i is B::i, because A::i is hidden by B::i
                int b = ::i; // error: there is still no i in the global namespace
            }

            using namespace D; // names from D and A are injected into C

            int k = 89; // OK to declare name identical to one introduced by a using
            int l = k;  // ambiguous: C::k or D::k
            int m = i;  // ok: B::i hides A::i
            int n = j;  // ok: D::j hides B::j
        }
    }

    // These are all equivalent definitions:
    int t0 = B::i;
    int t1 = B::C::a;
    int t2 = B::C::D::a;
```

Se, depois que uma using-directive foi usada para nomear algum namespace, o namespace for estendido e membros adicionais e/ou using-directives forem adicionados a ele, esses membros adicionais e os namespaces adicionais são visíveis através da using-directive (em contraste com a using-declaration)
```cpp
    namespace D
    {
        int d1;
        void f(char);
    }
    using namespace D; // introduces D::d1, D::f, D::d2, D::f,
                       // E::e, and E::f into global namespace!

    int d1;            // OK: no conflict with D::d1 when declaring

    namespace E
    {
        int e;
        void f(int);
    }

    namespace D            // namespace extension
    {
        int d2;
        using namespace E; // transitive using-directive
        void f(int);
    }

    void f()
    {
        d1++;    // error: ambiguous ::d1 or D::d1?
        ::d1++;  // OK
        D::d1++; // OK
        d2++;    // OK, d2 is D::d2

        e++;     // OK: e is E::e due to transitive using

        f(1);    // error: ambiguous: D::f(int) or E::f(int)?
        f('a');  // OK: the only f(char) is D::f(char)
    }
```

### Notas

A using-directive `using namespace std;` em qualquer escopo de namespace introduz cada nome do namespace `std` no namespace global (já que o namespace global é o namespace mais próximo que contém tanto `std` quanto qualquer namespace declarado pelo usuário), o que pode levar a colisões de nomes indesejáveis. Esta, e outras using-directives, são geralmente consideradas uma má prática no escopo de arquivo de um arquivo de cabeçalho ([SF.7: Não escreva using namespace no escopo global em um arquivo de cabeçalho](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rs-using-directive>)).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_namespace_attributes`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [Atributos](<#/doc/language/attributes>) para namespaces

### Palavras-chave

[`namespace`](<#/doc/keyword/namespace>), [`using`](<#/doc/keyword/using>), [`inline`](<#/doc/keyword/inline>)

### Exemplo

Este exemplo mostra como usar um namespace para criar uma classe que já foi nomeada no namespace `std`.

Execute este código
```cpp
    #include <vector>

    namespace vec
    {
        template<typename T>
        class vector
        {
            // ...
        };
    } // of vec

    int main()
    {
        std::vector<int> v1; // Standard vector.
        vec::vector<int> v2; // User defined vector.

        // v1 = v2;          // Error: v1 and v2 are different object's type.

        {
            using namespace std;
            vector<int> v3;  // Same as std::vector
            v1 = v3; // OK
        }

        {
            using vec::vector;
            vector<int> v4;  // Same as vec::vector
            v2 = v4; // OK
        }
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 101](<https://cplusplus.github.io/CWG/issues/101.html>) | C++98 | o programa é malformado se uma declaração de função no escopo de namespace ou escopo de bloco e uma função introduzida por uma using-declaration declaram a mesma função (sem ambiguidade) | permitido
[CWG 373](<https://cplusplus.github.io/CWG/issues/373.html>) | C++98 | a pesquisa considerava declarações de namespace apenas para o último nome no operando de uma using-directive (o que é subótimo, porque classes não podem conter namespaces) | a restrição de pesquisa se aplica a todos os nomes nos operandos de using-directives
[CWG 460](<https://cplusplus.github.io/CWG/issues/460.html>) | C++98 | uma using-declaration poderia nomear um namespace | proibido
[CWG 565](<https://cplusplus.github.io/CWG/issues/565.html>) | C++98 | uma using-declaration não pode introduzir uma função idêntica a outra função no mesmo escopo, mas a restrição não foi aplicada a templates de função | aplicar a mesma restrição a templates de função também
[CWG 986](<https://cplusplus.github.io/CWG/issues/986.html>) | C++98 | using-directive era transitiva para pesquisa qualificada | apenas transitiva para pesquisa não qualificada
[CWG 987](<https://cplusplus.github.io/CWG/issues/987.html>) | C++98 | entidades declaradas em um namespace aninhado também eram membros do namespace envolvente | escopos aninhados excluídos
[CWG 1021](<https://cplusplus.github.io/CWG/issues/1021.html>) | C++98 | não estava claro se uma entidade cuja definição é introduzida em um namespace via using-declaration é considerada definida nesse namespace | não definida nesse namespace
[CWG 1838](<https://cplusplus.github.io/CWG/issues/1838.html>) | C++98 | definição não qualificada em um namespace externo poderia definir uma entidade declarada, mas não definida em outro namespace e puxada por um using | definição não qualificada sempre se refere ao seu namespace
[CWG 2155](<https://cplusplus.github.io/CWG/issues/2155.html>) | C++98 | a resolução do [problema CWG 1838](<https://cplusplus.github.io/CWG/issues/1838.html>) não foi aplicada a declarações de classe e enumeração | aplicado

### Veja também

[ alias de namespace ](<#/doc/language/namespace_alias>) | cria um alias de um namespace existente