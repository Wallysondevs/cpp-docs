# Membros static

Dentro de uma definição de classe, a palavra-chave [`static`](<#/doc/keywords/static>) declara membros que não estão vinculados a instâncias da classe.

Fora de uma definição de classe, ela tem um significado diferente: veja [duração de armazenamento](<#/doc/language/storage_duration>).

### Sintaxe

Uma declaração para um membro `static` é uma [declaração de membro](<#/doc/language/class>) cujos especificadores de declaração contêm a palavra-chave `static`. A palavra-chave `static` geralmente aparece antes de outros especificadores (razão pela qual a sintaxe é frequentemente descrita informalmente como membro de dados `static` ou função membro `static`), mas pode aparecer em qualquer lugar na sequência de especificadores.

O nome de qualquer membro de dados `static` e função membro `static` deve ser diferente do nome da classe que o contém.

### Explicação

Membros `static` de uma classe não estão associados aos objetos da classe: eles são variáveis independentes com [duração de armazenamento](<#/doc/language/storage_duration>) `static` ou de thread (desde C++11) ou funções regulares.

A palavra-chave `static` é usada apenas na declaração de um membro `static`, dentro da definição da classe, mas não na definição desse membro `static`:
```cpp
    class X { static int n; }; // declaration (uses 'static')
    int X::n = 1;              // definition (does not use 'static')
```

A declaração dentro do corpo da classe não é uma definição e pode declarar o membro como sendo de [tipo incompleto](<#/doc/language/incomplete_type>) (diferente de `void`), incluindo o tipo no qual o membro é declarado:
```cpp
    struct Foo;
    
    struct S
    {
        static int a[]; // declaration, incomplete type
        static Foo x;   // declaration, incomplete type
        static S s;     // declaration, incomplete type (inside its own definition)
    };
    
    int S::a[10]; // definition, complete type
    struct Foo {};
    Foo S::x;     // definition, complete type
    S S::s;       // definition, complete type
```

```cpp
No entanto, se a declaração usar o especificador `constexpr` ou `inline` (desde C++17), o membro deve ser declarado com tipo completo.  // (desde C++11)
```

Para se referir a um membro `static` `m` da classe `T`, duas formas podem ser usadas: nome qualificado `T::m` ou expressão de acesso a membro `E.m` ou `E->m`, onde `E` é uma expressão que avalia para `T` ou `T*` respectivamente. Quando no mesmo escopo de classe, a qualificação é desnecessária:
```cpp
    struct X
    {
        static void f(); // declaration
        static int n;    // declaration
    };
    
    X g() { return X(); } // some function returning X
    
    void f()
    {
        X::f();  // X::f is a qualified name of static member function
        g().f(); // g().f is member access expression referring to a static member function
    }
    
    int X::n = 7; // definition
    
    void X::f() // definition
    {
        n = 1; // X::n is accessible as just n in this scope
    }
```

Membros `static` obedecem às [regras de acesso a membros de classe (private, protected, public)](<#/doc/language/access>).

#### Funções membro static

Funções membro `static` não estão associadas a nenhum objeto. Quando chamadas, elas não possuem um ponteiro `this`.

Funções membro `static` não podem ser `virtual`, `const`, `volatile` ou [ref-qualificadas](<#/doc/language/member_functions>).

O endereço de uma função membro `static` pode ser armazenado em um [ponteiro para função](<#/doc/language/pointer>) regular, mas não em um [ponteiro para função membro](<#/doc/language/pointer>).

#### Membros de dados static

Membros de dados `static` não estão associados a nenhum objeto. Eles existem mesmo que nenhum objeto da classe tenha sido definido. Há apenas uma instância do membro de dados `static` em todo o programa com [duração de armazenamento](<#/doc/language/storage_duration>) `static`, a menos que a palavra-chave [`thread_local`](<#/doc/keyword/thread_local>) seja usada, caso em que há um objeto desse tipo por thread com duração de armazenamento de thread (desde C++11).

Membros de dados `static` não podem ser `mutable`.

Membros de dados `static` de uma classe em escopo de namespace têm [ligação externa](<#/doc/language/storage_duration>) se a própria classe tiver ligação externa (não for membro de um [namespace sem nome](<#/doc/language/namespace>)). Classes locais (classes definidas dentro de funções) e classes sem nome, incluindo classes membro de classes sem nome, não podem ter membros de dados `static`.

Um membro de dados `static` pode ser declarado [`inline`](<#/doc/language/inline>). Um membro de dados `static` `inline` pode ser definido na definição da classe e pode especificar um inicializador. Ele não precisa de uma definição fora da classe:
```cpp
    struct X
    {
        inline static int fully_usable = 1; // No out-of-class definition required, ODR-usable
        inline static const std::string class_name{"X"}; // Likewise
    
        static const int non_addressable = 1; // C.f. non-inline constants, usable
                                              // for its value, but not ODR-usable
        // static const std::string class_name{"X"}; // Non-integral declaration of this
                                                     // form is disallowed entirely
    };
```

| (desde C++17)

#### Membros static constantes

Se um membro de dados `static` de tipo integral ou de enumeração for declarado `const` (e não `volatile`), ele pode ser inicializado com um [inicializador](<#/doc/language/initialization>) no qual cada expressão é uma [expressão constante](<#/doc/language/constexpr>), diretamente dentro da definição da classe:
```cpp
    struct X
    {
        const static int n = 1;
        const static int m{2}; // since C++11
        const static int k;
    };
    const int X::k = 3;
```

Se um membro de dados `static` de [LiteralType](<#/doc/named_req/LiteralType>) for declarado `constexpr`, ele deve ser inicializado com um inicializador no qual cada expressão é uma expressão constante, diretamente dentro da definição da classe:
```cpp
    struct X
    {
        constexpr static int arr[] = { 1, 2, 3 };        // OK
        constexpr static std::complex<double> n = {1,2}; // OK
        constexpr static int k; // Error: constexpr static requires an initializer
    };
```

| (desde C++11)

Se um membro de dados `static` `const` não `inline` (desde C++17) ou um membro de dados `static` `constexpr` (desde C++11) (até C++17) for [ODR-usado](<#/doc/language/definition>), uma definição no escopo de namespace ainda é necessária, mas não pode ter um inicializador.

```cpp
Um membro de dados `static` `constexpr` é implicitamente `inline` e não precisa ser redeclarado no escopo de namespace. Esta redeclaração sem um inicializador (anteriormente exigida) ainda é permitida, mas está obsoleta.  // (desde C++17)
```
```cpp
    struct X
    {
        static const int n = 1;
        static constexpr int m = 4;
    };
    
    const int *p = &X::n, *q = &X::m; // X::n and X::m are ODR-used
    const int X::n;             // … so a definition is necessary
    constexpr int X::m;         // … (except for X::m in C++17)
```

### Palavras-chave

[`static`](<#/doc/keywords/static>)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 194](<https://cplusplus.github.io/CWG/issues/194.html>) | C++98 | Nomes de funções membro (static) podem ser os mesmos que o nome da classe | restrição de nomenclatura adicionada (incluindo [funções membro não-static](<#/doc/language/member_functions>))

### Referências

*   C++23 standard (ISO/IEC 14882:2024):
    *   11.4.9 Static members [class.static]
*   C++20 standard (ISO/IEC 14882:2020):
    *   11.4.8 Static members [class.static]
*   C++17 standard (ISO/IEC 14882:2017):
    *   12.2.3 Static members [class.static]
*   C++14 standard (ISO/IEC 14882:2014):
    *   9.4 Static members [class.static]
*   C++11 standard (ISO/IEC 14882:2011):
    *   9.4 Static members [class.static]
*   C++98 standard (ISO/IEC 14882:1998):
    *   9.4 Static members [class.static]

### Veja também

*   especificador de armazenamento [`static`](<#/doc/language/storage_duration>)
