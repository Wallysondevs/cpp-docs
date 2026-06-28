# Declaração `using`

Introduz um nome que é definido em outro lugar na região declarativa onde esta declaração `using` aparece. Veja [using enum](<#/doc/language/enum>) e (desde C++20)[using namespace](<#/doc/language/namespace>) para outras declarações relacionadas.

---
`using` `typename`(opcional) nested-name-specifier unqualified-id `;` | | (até C++17)
---|---|---
`using` declarator-list `;` | | (desde C++17)
- `typename` — a palavra-chave `typename` pode ser usada conforme necessário para resolver [nomes dependentes](<#/doc/language/dependent_name>), quando a declaração `using` introduz um tipo membro de uma classe base em um template de classe
- **nested-name-specifier** — uma sequência de nomes e operadores de resolução de escopo `::`, terminando com um operador de resolução de escopo. Um único `::` refere-se ao namespace global.
- **unqualified-id** — uma [id-expression](<#/doc/language/name>)
- **declarator-list** — lista separada por vírgulas de um ou mais declaradores do `typename`(opcional) nested-name-specifier unqualified-id. Alguns ou todos os declaradores podem ser seguidos por uma elipse ... para indicar [expansão de pacote](<#/doc/language/parameter_pack>)

### Explicação

Declarações `using` podem ser usadas para introduzir membros de namespace em outros namespaces e escopos de bloco, ou para introduzir membros de classe base em definições de classe derivada, ou para introduzir [enumeradores](<#/doc/language/enum>) em namespaces, escopos de bloco e de classe (desde C++20).

Uma declaração `using` com mais de um using-declarator é equivalente a uma sequência correspondente de declarações `using` com um using-declarator. | (desde C++17)

#### Em escopo de namespace e de bloco

[Declarações `using`](<#/doc/language/namespace>) introduzem um membro de outro namespace no namespace atual ou escopo de bloco.
```cpp
    #include <iostream>
    #include <string>
    
    using std::string;
    
    int main()
    {
        string str = "Example";
        using std::cout;
        cout << str;
    }
```

Veja [namespace](<#/doc/language/namespace>) para detalhes.

#### Em definição de classe

A declaração `using` introduz um membro de uma classe base na definição da classe derivada, como para expor um membro protegido da base como membro público da derivada. Neste caso, o nested-name-specifier deve nomear uma classe base daquela que está sendo definida. Se o nome for o nome de uma função membro sobrecarregada da classe base, todas as funções membro da classe base com esse nome são introduzidas. Se a classe derivada já tiver um membro com o mesmo nome, lista de parâmetros e qualificações, o membro da classe derivada oculta ou sobrescreve (não entra em conflito com) o membro que é introduzido da classe base.

Execute este código
```cpp
    #include <iostream>
    
    struct B
    {
        virtual void f(int) { std::cout << "B::f\n"; }
        void g(char)        { std::cout << "B::g\n"; }
        void h(int)         { std::cout << "B::h\n"; }
    protected:
        int m; // B::m is protected
        typedef int value_type;
    };
    
    struct D : B
    {
        using B::m;          // D::m is public
        using B::value_type; // D::value_type is public
    
        using B::f;
        void f(int) override { std::cout << "D::f\n"; } // D::f(int) overrides B::f(int)
    
        using B::g;
        void g(int) { std::cout << "D::g\n"; } // both g(int) and g(char) are visible
    
        using B::h;
        void h(int) { std::cout << "D::h\n"; } // D::h(int) hides B::h(int)
    };
    
    int main()
    {
        D d;
        B& b = d;
    
    //  b.m = 2;  // Error: B::m is protected
        d.m = 1;  // protected B::m is accessible as public D::m
    
        b.f(1);   // calls derived f()
        d.f(1);   // calls derived f()
        std::cout << "----------\n";
    
        d.g(1);   // calls derived g(int)
        d.g('a'); // calls base g(char), exposed via using B::g;
        std::cout << "----------\n";
    
        b.h(1);   // calls base h()
        d.h(1);   // calls derived h()
    }
```

Saída:
```
    D::f
    D::f
    ----------
    D::g
    B::g
    ----------
    B::h
    D::h
```

#### Construtores herdados

Se a _declaração `using`_ se refere a um construtor de uma base direta da classe que está sendo definida (por exemplo, `using Base::Base;`), todos os construtores dessa base (ignorando o acesso de membro) são tornados visíveis para a resolução de sobrecarga ao inicializar a classe derivada. Se a resolução de sobrecarga selecionar um construtor herdado, ele será acessível se fosse acessível ao ser usado para construir um objeto da classe base correspondente: a acessibilidade da declaração `using` que o introduziu é ignorada. Se a resolução de sobrecarga selecionar um dos construtores herdados ao inicializar um objeto de tal classe derivada, então o subobjeto `Base` do qual o construtor foi herdado é inicializado usando o construtor herdado, e todas as outras bases e membros de `Derived` são inicializados como se por um construtor padrão default (inicializadores de membro padrão são usados se fornecidos, caso contrário, ocorre a inicialização padrão). A inicialização inteira é tratada como uma única chamada de função: a inicialização dos parâmetros do construtor herdado é [sequenciada antes](<#/doc/language/eval_order>) da inicialização de qualquer base ou membro do objeto derivado.
```cpp
    struct B1 { B1(int, ...) {} };
    struct B2 { B2(double)   {} };
    
    int get();
    
    struct D1 : B1
    {
        using B1::B1; // inherits B1(int, ...)
        int x;
        int y = get();
    };
    
    void test()
    {
        D1 d(2, 3, 4); // OK: B1 is initialized by calling B1(2, 3, 4),
                       // then d.x is default-initialized (no initialization is performed),
                       // then d.y is initialized by calling get()
    
        D1 e;          // Error: D1 has no default constructor
    }
    
    struct D2 : B2
    {
        using B2::B2; // inherits B2(double)
        B1 b;
    };
    
    D2 f(1.0); // error: B1 has no default constructor
```
```cpp
    struct W { W(int); };
    
    struct X : virtual W
    {
        using W::W; // inherits W(int)
        X() = delete;
    };
    
    struct Y : X
    {
        using X::X;
    };
    
    struct Z : Y, virtual W
    {
        using Y::Y;
    };
    
    Z z(0); // OK: initialization of Y does not invoke default constructor of X
```

Se o subobjeto da classe base `Base` não for inicializado como parte do objeto `Derived` (ou seja, `Base` é uma [classe base virtual](<#/doc/language/derived_class>) de `Derived`, e o objeto `Derived` não é o [objeto mais derivado](<#/doc/language/objects>)), a invocação do construtor herdado, incluindo a avaliação de quaisquer argumentos, é omitida:
```cpp
    struct V
    {
        V() = default;
        V(int);
    };
    
    struct Q { Q(); };
    
    struct A : virtual V, Q
    {
        using V::V;
        A() = delete;
    };
    
    int bar() { return 42; }
    
    struct B : A
    {
        B() : A(bar()) {} // OK
    };
    
    struct C : B {};
    
    void foo()
    {
        C c; // “bar” is not invoked, because the V subobject
             // is not initialized as part of B
             // (the V subobject is initialized as part of C,
             //  because “c” is the most derived object)
    }
```

Se o construtor foi herdado de múltiplos subobjetos de classe base do tipo `Base`, o programa é malformado, similar a funções membro não estáticas herdadas múltiplas vezes:
```cpp
    struct A { A(int); };
    struct B : A { using A::A; };
    struct C1 : B { using B::B; };
    struct C2 : B { using B::B; };
    
    struct D1 : C1, C2
    {
        using C1::C1;
        using C2::C2;
    };
    D1 d1(0); // ill-formed: constructor inherited from different B base subobjects
    
    struct V1 : virtual B { using B::B; };
    struct V2 : virtual B { using B::B; };
    
    struct D2 : V1, V2
    {
        using V1::V1;
        using V2::V2;
    };
    D2 d2(0); // OK: there is only one B subobject.
              // This initializes the virtual B base class,
              //   which initializes the A base class
              // then initializes the V1 and V2 base classes
              //   as if by a defaulted default constructor
```

Assim como nas declarações `using` para quaisquer outras funções membro não estáticas, se um construtor herdado corresponder à assinatura de um dos construtores de `Derived`, ele será ocultado da pesquisa pela versão encontrada em `Derived`. Se um dos construtores herdados de `Base` por acaso tiver a assinatura que corresponde a um construtor de cópia/movimentação de `Derived`, isso não impede a geração implícita do construtor de cópia/movimentação de `Derived` (que então oculta a versão herdada, similar a `using operator=`).
```cpp
    struct B1 { B1(int); };
    struct B2 { B2(int); };
    
    struct D2 : B1, B2
    {
        using B1::B1;
        using B2::B2;
    
        D2(int); // OK: D2::D2(int) hides both B1::B1(int) and B2::B2(int)
    };
    D2 d2(0);    // calls D2::D2(int)
```

Dentro de uma [classe template](<#/doc/language/templates>), se uma declaração `using` se refere a um [nome dependente](<#/doc/language/dependent_name>), ela é considerada para nomear um construtor se o nested-name-specifier tiver um nome terminal que é o mesmo que o unqualified-id.
```cpp
    template<class T>
    struct A : T
    {
        using T::T; // OK, inherits constructors of T
    };
    
    template<class T, class U>
    struct B : T, A<U>
    {
        using A<U>::A; // OK, inherits constructors of A<U>
        using T::A;    // does not inherit constructor of T
                       // even though T may be a specialization of A<>
    };
```

| (desde C++11)

#### Introduzindo enumeradores com escopo

Além de membros de outro namespace e membros de classes base, a declaração `using` também pode introduzir enumeradores de [enumerações](<#/doc/language/enum>) em escopos de namespace, bloco e classe. Uma declaração `using` também pode ser usada com enumeradores sem escopo.
```cpp
    enum class button { up, down };
    
    struct S
    {
        using button::up;
        button b = up; // OK
    };
    
    using button::down;
    constexpr button non_up = down; // OK
    
    constexpr auto get_button(bool is_up)
    {
        using button::up, button::down;
        return is_up ? up : down; // OK
    }
    
    enum unscoped { val };
    using unscoped::val; // OK, though needless
```

| (desde C++20)

### Notas

Apenas o nome explicitamente mencionado na declaração `using` é transferido para o escopo declarativo: em particular, os enumeradores não são transferidos quando o nome do tipo de enumeração é declarado com `using`.

Uma declaração `using` não pode se referir a um namespace, a um enumerador com escopo (até C++20), a um destrutor de uma classe base ou a uma especialização de um template de membro para uma função de conversão definida pelo usuário.

Uma declaração `using` não pode nomear uma especialização de template de membro ([template-id](<#/doc/language/templates>) não é permitido pela gramática):
```cpp
    struct B
    {
        template<class T>
        void f();
    };
    
    struct D : B
    {
        using B::f;      // OK: names a template
    //  using B::f<int>; // Error: names a template specialization
    
        void g() { f<int>(); }
    };
```

Uma declaração `using` também não pode ser usada para introduzir o nome de um template de membro dependente como um _template-name_ (o desambiguador `template` para [nomes dependentes](<#/doc/language/dependent_name>) não é permitido).
```cpp
    template<class X>
    struct B
    {
        template<class T>
        void f(T);
    };
    
    template<class Y>
    struct D : B<Y>
    {
    //  using B<Y>::template f; // Error: disambiguator not allowed
        using B<Y>::f;          // compiles, but f is not a template-name
    
        void g()
        {
    //      f<int>(0);          // Error: f is not known to be a template name,
                                // so < does not start a template argument list
            f(0);               // OK
        }   
    };
```

Se uma declaração `using` traz o operador de atribuição da classe base para a classe derivada, cuja assinatura por acaso corresponde ao operador de atribuição de cópia ou movimentação da classe derivada, esse operador é ocultado pelo operador de atribuição de cópia/movimentação implicitamente declarado da classe derivada. O mesmo se aplica a uma declaração `using` que herda um construtor de classe base que por acaso corresponde ao construtor de cópia/movimentação da classe derivada (desde C++11).

A semântica dos construtores herdados foi alterada retroativamente por um [relatório de defeito contra C++11](<#/doc/language/using_declaration>). Anteriormente, uma declaração de construtor herdado causava a injeção de um conjunto de declarações de construtores sintetizados na classe derivada, o que resultava em cópias/movimentações de argumentos redundantes, tinha interações problemáticas com algumas formas de SFINAE e, em alguns casos, podia ser inviável em ABIs importantes. Compiladores mais antigos ainda podem implementar a semântica anterior. | Semântica antiga de construtores herdados
---
Se a _declaração `using`_ se refere a um construtor de uma base direta da classe que está sendo definida (por exemplo, `using Base::Base;`), os construtores dessa classe base são herdados, de acordo com as seguintes regras: 1) Um conjunto de _construtores herdados candidatos_ é composto por a) Todos os construtores não-template da classe base (após omitir parâmetros de elipse, se houver) (desde C++14) b) Para cada construtor com argumentos padrão ou o parâmetro de elipse, todas as assinaturas de construtor que são formadas pela remoção da elipse e omissão de argumentos padrão do final das listas de argumentos, um por um c) Todos os templates de construtor da classe base (após omitir parâmetros de elipse, se houver) (desde C++14) d) Para cada template de construtor com argumentos padrão ou a elipse, todas as assinaturas de construtor que são formadas pela remoção da elipse e omissão de argumentos padrão do final das listas de argumentos, um por um 2) Todos os construtores herdados candidatos que não são o construtor padrão ou o construtor de cópia/movimentação e cujas assinaturas não correspondem a construtores definidos pelo usuário na classe derivada, são implicitamente declarados na classe derivada. Os parâmetros padrão não são herdados:
```cpp
    struct B1
    {
        B1(int);
    };
    
    struct D1 : B1
    {
        using B1::B1;
    
        // The set of candidate inherited constructors is 
        // 1. B1(const B1&)
        // 2. B1(B1&&)
        // 3. B1(int)
    
        // D1 has the following constructors:
        // 1. D1() = delete
        // 2. D1(const D1&) 
        // 3. D1(D1&&)
        // 4. D1(int) <- inherited
    };
    
    struct B2
    {
        B2(int = 13, int = 42);
    };
    
    struct D2 : B2
    {
        using B2::B2;
    
        // The set of candidate inherited constructors is
        // 1. B2(const B2&)
        // 2. B2(B2&&)
        // 3. B2(int = 13, int = 42)
        // 4. B2(int = 13)
        // 5. B2()
    
        // D2 has the following constructors:
        // 1. D2()
        // 2. D2(const D2&)
        // 3. D2(D2&&)
        // 4. D2(int, int) <- inherited
        // 5. D2(int) <- inherited
    };
```

Os construtores herdados são equivalentes a construtores definidos pelo usuário com um corpo vazio e com uma [lista de inicializadores de membro](<#/doc/language/initializer_list>) consistindo de um único nested-name-specifier, que encaminha todos os seus argumentos para o construtor da classe base. Ele tem o mesmo [acesso](<#/doc/language/access>) que o construtor base correspondente. Ele é `constexpr` se o construtor definido pelo usuário tivesse satisfeito os requisitos de construtor `constexpr`. Ele é deletado se o construtor base correspondente for deletado ou se um construtor padrão default fosse deletado (exceto que a construção da base cujo construtor está sendo herdado não conta). Um construtor herdado não pode ser explicitamente instanciado ou explicitamente especializado. Se duas declarações `using` herdarem o construtor com a mesma assinatura (de duas classes base diretas), o programa é malformado. Um template de construtor herdado não deve ser [explicitamente instanciado](<#/doc/language/function_template>) ou [explicitamente especializado](<#/doc/language/template_specialization>).

(desde C++11)

[Expansões de pacote](<#/doc/language/parameter_pack>) em declarações `using` tornam possível formar uma classe que expõe membros sobrecarregados de bases variádicas sem recursão:
```cpp
    template<typename... Ts>
    struct Overloader : Ts...
    {
        using Ts::operator()...; // exposes operator() from every base
    };
    
    template<typename... T>
    Overloader(T...) -> Overloader<T...>; // C++17 deduction guide, not needed in C++20
    
    int main()
    {
        auto o = Overloader{ [] (auto const& a) {std::cout << a;},
                             [] (float f) {std::cout << std::setprecision(3) << f;} };
    }
```

| (desde C++17)
---|---
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_inheriting_constructors`](<#/doc/feature_test>) | [`200802L`](<#/>) | (C++11) | [Construtores herdados](<#/doc/language/using_declaration>)
[`201511L`](<#/>) | (C++17)
(DR11) | Reformulação de construtores herdados
[`__cpp_variadic_using`](<#/doc/feature_test>) | [`201611L`](<#/>) | (C++17) | [Expansões de pacote](<#/doc/language/parameter_pack>) em declarações `using`

### Palavras-chave

[`using`](<#/doc/keyword/using>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 258](<https://cplusplus.github.io/CWG/issues/258.html>) | C++98 | uma função membro não-const de uma classe derivada pode sobrescrever e/ou ocultar uma função membro const de sua base | sobrescrever e ocultar também exigem que as qualificações cv sejam as mesmas
[CWG 1738](<https://cplusplus.github.io/CWG/issues/1738.html>) | C++11 | não estava claro se era permitido instanciar explicitamente ou especializar explicitamente especializações de templates de construtores herdados | proibido
[CWG 2504](<https://cplusplus.github.io/CWG/issues/2504.html>) | C++11 | o comportamento de construtores herdados de classes base virtuais era incerto | esclarecido
[P0136R1](<https://wg21.link/P0136R1>) | C++11 | a declaração de construtor herdado injeta construtores adicionais na classe derivada | faz com que os construtores da classe base sejam encontrados pela pesquisa de nome

1. Referências

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

  * 9.9 A declaração `using` [namespace.udecl]

* Padrão C++20 (ISO/IEC 14882:2020):

  * 9.9 A declaração `using` [namespace.udecl]

* Padrão C++17 (ISO/IEC 14882:2017):

  * 10.3.3 A declaração `using` [namespace.udecl]

* Padrão C++14 (ISO/IEC 14882:2014):

  * 7.3.3 A declaração `using` [namespace.udecl]

* Padrão C++11 (ISO/IEC 14882:2011):

  * 7.3.3 A declaração `using` [namespace.udecl]

* Padrão C++03 (ISO/IEC 14882:2003):

  * 7.3.3 A declaração `using` [namespace.udecl]

* Padrão C++98 (ISO/IEC 14882:1998):

  * 7.3.3 A declaração `using` [namespace.udecl]
