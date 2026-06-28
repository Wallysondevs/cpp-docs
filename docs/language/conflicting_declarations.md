# Declarações Conflitantes

A menos que especificado de outra forma, duas declarações não podem (re)introduzir a mesma entidade. O programa é malformado se tais declarações existirem.

### Declarações Correspondentes

Duas declarações _correspondem_ se elas (re)introduzem o mesmo nome, ambas declaram construtores, ou ambas declaram destrutores, a menos que

*   uma delas seja uma [using declaration](<#/doc/language/using_declaration>),
*   uma declare um tipo (não um [typedef name](<#/doc/language/typedef>)) e a outra declare uma variável, um membro de dados não estático que não seja de uma [anonymous union](<#/doc/language/union>), um enumerador, uma função ou um function template, ou
*   cada uma declare uma função ou um function template e elas não declarem sobrecargas correspondentes.

#### Sobrecargas de Função Correspondentes

Duas [function declarations](<#/doc/language/function>) declaram _corresponding overloads_ (sobrecargas correspondentes) se ambas declaram funções que satisfazem todas as seguintes condições:

*   Elas possuem a mesma [parameter-type-list](<#/doc/language/function>), omitindo os tipos de [explicit object parameters](<#/doc/language/member_functions>) (desde C++23).

*   Elas possuem [requires clauses](<#/doc/language/constraints>) finais [equivalentes](<#/doc/language/function_template>) (se houver, exceto para [friend declarations](<#/doc/language/friend>)).

| (desde C++20)

*   Se ambas forem member functions não estáticas, elas precisam satisfazer adicionalmente um dos seguintes requisitos:

*   Exatamente uma delas é uma [implicit object member function](<#/doc/language/member_functions>) sem ref-qualifier e os tipos de seus object parameters, após remover referências de nível superior, são os mesmos.

| (desde C++23)

*   Seus object parameters possuem o mesmo tipo.

#### Sobrecargas de Function Template Correspondentes

Duas [function template declarations](<#/doc/language/function_template>) declaram _corresponding overloads_ (sobrecargas correspondentes) se ambas declaram function templates que satisfazem todas as seguintes condições:

*   Suas listas de template parameters têm o mesmo comprimento.
*   Seus template parameters correspondentes são [equivalentes](<#/doc/language/function_template>).
*   Elas possuem [parameter-type-lists](<#/doc/language/function>) equivalentes, omitindo os tipos de [explicit object parameters](<#/doc/language/member_functions>) (desde C++23).
*   Elas possuem tipos de retorno equivalentes.

*   Seus template parameters correspondentes são ambos declarados sem [constraint](<#/doc/language/constraints>), ou ambos declarados com constraints equivalentes.
*   Elas possuem [requires clauses](<#/doc/language/constraints>) finais equivalentes (se houver).

| (desde C++20)

*   Se ambos forem function templates membros não estáticos, eles precisam satisfazer adicionalmente um dos seguintes requisitos:

*   Exatamente um deles é um [implicit object member function](<#/doc/language/member_functions>) template sem ref-qualifier e os tipos de seus object parameters, após remover todas as referências, são equivalentes.

| (desde C++23)

*   Seus object parameters possuem tipos equivalentes.

```cpp
    struct A
    {
        friend void c();   // #1
    };
    
    struct B
    {
        friend void c() {} // corresponds to, and defines, #1
    };
    
    typedef int Int;
    
    enum E : int { a };
    
    void f(int);   // #2
    void f(Int) {} // defines #2
    void f(E) {}   // OK, another overload
    
    struct X
    {
        static void f();
        void f() const;   // error: redeclaration
    
        void g();
        void g() const;   // OK
        void g() &;       // error: redeclaration
    
        void h(this X&, int);
        void h(int) &&;   // OK, another overload
    
        void j(this const X&);
        void j() const &; // error: redeclaration
    
        void k();
        void k(this X&);  // error: redeclaration
    };
```

### Múltiplas declarações da mesma entidade

Uma declaração é _name-independent_ (independente de nome) se seu nome é `_` e ela declara

*   uma variável com [storage duration](<#/doc/language/storage_duration>) automática,
*   um [structured binding](<#/doc/language/structured_binding>) sem [storage class specifier](<#/doc/language/storage_duration>) e que não [habita](<#/doc/language/scope>) um escopo de namespace,
*   a variável introduzida por uma [lambda capture](<#/doc/language/lambda>) com um inicializador, ou
*   um [data member](<#/doc/language/data_members>) não estático que não seja de uma [anonymous union](<#/doc/language/union>).

| (desde C++26)

A menos que especificado de outra forma, duas declarações de entidades _declaram a mesma entidade_ se todas as seguintes condições forem satisfeitas, considerando declarações de tipos sem nome para introduzir seus [typedef names](<#/doc/language/typedef>) e [enumeration names](<#/doc/language/enum>) para fins de linkage (se houver):

*   Elas correspondem.
*   Elas possuem o mesmo [target scope](<#/doc/language/scope>), que não é um [function parameter scope](<#/doc/language/scope>) ou um [template parameter scope](<#/doc/language/scope>).

*   Nenhuma delas é uma declaração name-independent.

| (desde C++26)

*   Uma das seguintes condições é satisfeita:

*   Elas aparecem na mesma unidade de tradução.

*   Ambas declaram nomes com [module linkage](<#/doc/language/storage_duration>) e estão [anexadas ao mesmo module](<#/doc/language/modules>).

| (desde C++20)

*   Ambas declaram nomes com [external linkage](<#/doc/language/storage_duration>).

Uma declaração de uma entidade ou typedef name `X` é uma _redeclaration_ (redeclaração) de `X` se outra declaração de `X` for alcançável a partir dela.

#### Restrições

Se quaisquer duas declarações de uma entidade `E` violarem a restrição correspondente abaixo, o programa é malformado:

*   Se uma declara `E` como uma variável, a outra também deve declarar `E` como uma variável do mesmo tipo.
*   Se uma declara `E` como uma [function](<#/doc/language/function>), a outra também deve declarar `E` como uma função do mesmo tipo.
*   Se uma declara `E` como um [enumerator](<#/doc/language/enum>), a outra também deve declarar `E` como um enumerador.
*   Se uma declara `E` como um [namespace](<#/doc/language/namespace>), a outra também deve declarar `E` como um namespace.
*   Se uma declara `E` como um [class type](<#/doc/language/class>), a outra também deve declarar `E` como um class type.
*   Se uma declara `E` como um [enumeration type](<#/doc/language/enum>), a outra também deve declarar `E` como um enumeration type.
*   Se uma declara `E` como um [class template](<#/doc/language/class_template>), a outra também deve declarar `E` como um class template com uma lista de template parameters equivalente (veja [function template overloading](<#/doc/language/function_template>)).
*   Se uma declara `E` como um [function template](<#/doc/language/function_template>), a outra também deve declarar `E` como um function template com uma lista de template parameters e tipo equivalentes.

*   Se uma declara `E` como um [alias template](<#/doc/language/type_alias>), a outra também deve declarar `E` como um alias template com uma lista de template parameters e type-id equivalentes.

| (desde C++11)

*   Se uma declara `E` como uma (especialização parcial de um) [variable template](<#/doc/language/variable_template>), a outra também deve declarar `E` como uma (especialização parcial de um) variable template com uma lista de template parameters e tipo equivalentes.

| (desde C++14)

*   Se uma declara `E` como um [concept](<#/doc/language/constraints>), a outra também deve declarar `E` como um concept.

| (desde C++20)

Tipos são comparados após todos os ajustes de tipos (durante os quais [typedefs](<#/doc/language/typedef>) são substituídos por suas definições). Declarações para um objeto array podem especificar tipos de array que diferem pela presença ou ausência de um limite de array principal. Nenhum diagnóstico é exigido se nenhuma das declarações for alcançável a partir da outra.
```cpp
    void g();      // #1
    void g(int);   // OK, different entity from #1 (they do not correspond)
    int g();       // Error: same entity as #1 with different type
    
    void h();      // #2
    namespace h {} // Error: same entity as #2, but not a function
```

Se uma declaração `H` que declara um nome com [internal linkage](<#/doc/language/storage_duration>) precede uma declaração `D` em outra unidade de tradução `U` e declararia a mesma entidade que `D` se aparecesse em `U`, o programa é malformado.

### Declarações Potencialmente Conflitantes

Duas declarações _potentially conflict_ (potencialmente conflitam) se elas correspondem, mas declaram entidades diferentes.

Se, em qualquer escopo, um nome estiver vinculado a duas declarações `A` e `B` que potencialmente conflitam, `B` não for name-independent (desde C++26), e `A` preceder `B`, o programa é malformado:
```cpp
    void f()
    {
        int x, y;
        void x(); // Error: different entity for x
        int y;    // Error: redefinition
    }
    
    enum { f };   // Error: different entity for ::f
    
    namespace A {}
    namespace B = A;
    namespace B = A; // OK, no effect
    namespace B = B; // OK, no effect
    namespace A = B; // OK, no effect
    namespace B {}   // Error: different entity for B
    
    void g()
    {
        int _;
        _ = 0; // OK
        int _; // OK since C++26, name-independent declaration
        _ = 0; // Error: two non-function declarations in the lookup set
    }
    
    void h ()
    {
        int _;        // #1
        _ ++;         // OK
        static int _; // Error: conflicts with #1 because
                      // static variables are not name-independent
    }
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 279](<https://cplusplus.github.io/CWG/issues/279.html>) ([P1787R6](<https://wg21.link/P1787R6>)) | C++98 | não estava claro se uma classe ou enumeração sem nome pode ser redeclarada se tiver um typedef name para fins de linkage | pode ser redeclarada
[CWG 338](<https://cplusplus.github.io/CWG/issues/338.html>) ([P1787R6](<https://wg21.link/P1787R6>)) | C++98 | não estava claro se uma enumeração sem nome pode ser redeclarada se tiver um enumerador como nome para fins de linkage | pode ser redeclarada
[CWG 1884](<https://cplusplus.github.io/CWG/issues/1884.html>) ([P1787R6](<https://wg21.link/P1787R6>)) | C++98 | as restrições aplicadas a múltiplas declarações da mesma entidade não estavam claras | tornadas claras