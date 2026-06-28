# Ligação de linguagem

Fornece ligação entre unidades de programa escritas em diferentes linguagens de programação.

Isso também pode ser usado para desvincular uma declaração de seu módulo. Veja [Propriedade do módulo](<#/doc/language/modules>). | (desde C++20)
---
`extern` string-literal `{` declaration-seq ﻿(optional) `}` | (1) |
---|---|---
`extern` string-literal declaration | (2) |

1) Aplica a especificação de linguagem string-literal a todos os tipos de função, nomes de função com ligação externa e variáveis com ligação externa declaradas em declaration-seq.

2) Aplica a especificação de linguagem string-literal a uma única declaração ou definição.

- **string-literal** — um [string literal não avaliado](<#/doc/language/string_literal>) que nomeia a ligação de linguagem requerida
- **declaration-seq** — uma sequência de declarações, que pode incluir especificações de ligação aninhadas
- **declaration** — uma declaração

### Explicação

Todo tipo de função, todo nome de função com [ligação externa](<#/doc/language/storage_duration>), e todo nome de variável com [ligação externa](<#/doc/language/storage_duration>), possui uma propriedade chamada _ligação de linguagem_. A ligação de linguagem encapsula o conjunto de requisitos necessários para vincular com uma unidade de programa escrita em outra linguagem de programação: [convenção de chamada](<https://en.wikipedia.org/wiki/calling_convention> "enwiki:calling convention"), algoritmo de [name mangling](<https://en.wikipedia.org/wiki/name_mangling> "enwiki:name mangling") (decoração de nome), etc.

Apenas duas ligações de linguagem têm suporte garantido:

1.  "C++", a ligação de linguagem padrão.
2.  "C", que possibilita a ligação com funções escritas na linguagem de programação C, e a definição, em um programa C++, de funções que podem ser chamadas a partir de unidades escritas em C.

```cpp
    extern "C"
    {
        int open(const char *path_name, int flags); // C function declaration
    }
    
    int main()
    {
        int fd = open("test.txt", 0); // calls a C function from a C++ program
    }
    
    // This C++ function can be called from C code
    extern "C" void handler(int)
    {
        std::cout << "Callback invoked\n"; // It can use C++
    }
```

Como a ligação de linguagem faz parte de todo tipo de função, ponteiros para funções também mantêm a ligação de linguagem. A ligação de linguagem de tipos de função (que representa a convenção de chamada) e a ligação de linguagem de nomes de função (que representa o name mangling) são independentes uma da outra:
```cpp
    extern "C" void f1(void(*pf)()); // declares a function f1 with C linkage,
                                 // which returns void and takes a pointer to a C function
                                 // which returns void and takes no parameters
    
    extern "C" typedef void FUNC(); // declares FUNC as a C function type that returns void
                                    // and takes no parameters
    
    FUNC f2;            // the name f2 has C++ linkage, but its type is C function
    extern "C" FUNC f3; // the name f3 has C linkage and its type is C function void()
    void (*pf2)(FUNC*); // the name pf2 has C++ linkage, and its type is
                        // "pointer to a C++ function which returns void and takes one
                        // argument of type 'pointer to the C function which returns void
                        // and takes no parameters'"
    
    extern "C"
    {
        static void f4(); // the name of the function f4 has internal linkage (no language)
                          // but the function's type has C language linkage
    }
```

Se [duas declarações de uma entidade](<#/doc/language/conflicting_declarations>) lhe atribuírem ligações de linguagem diferentes, o programa é malformado; nenhum diagnóstico é exigido se nenhuma das declarações for alcançável a partir da outra. Uma redeclaração de uma entidade sem uma especificação de ligação herda a ligação de linguagem da entidade e seu tipo (se existir).
```cpp
    extern "C" int f();
    extern "C++" int f(); // Error: different language linkages
    
    extern "C" int g();
    int g(); // OK, has C language linkage
    
    int h(); // has C++ language linkage by default
    extern "C" int h(); // Error: different language linkages
```

#### Regras especiais para ligação "C"

Quando membros de classe, funções friend com uma [cláusula requires](<#/doc/language/constraints>) final (desde C++20) ou funções membro não estáticas aparecem em um bloco de linguagem "C", a ligação de seus tipos permanece "C++" (mas os tipos de parâmetros, se houver, permanecem "C"):
```cpp
    extern "C"
    {
        class X
        {
            void mf();           // the function mf and its type have C++ language linkage
            void mf2(void(*)()); // the function mf2 has C++ language linkage;
                                 // the parameter has type “pointer to C function”
        };
    }
    
    template<typename T>
    struct A { struct B; };
    
    extern "C"
    {
        template<typename T>
        struct A<T>::B
        {
            friend void f(B*) requires true {} // C language linkage ignored
        };
    }
    
    namespace Q
    {
        extern "C" void f(); // not ill-formed
    }
```

Seja `C` uma declaração que declara uma função ou variável com ligação de linguagem "C". Se outra declaração `D` declara uma entidade com o mesmo nome, e ela satisfaz qualquer uma das seguintes condições, `C` e `D` declaram a mesma entidade:

*   `D` declara uma variável que pertence ao escopo global.
*   Se `C` declara uma variável, `D` também declara uma variável.
*   Se `C` declara uma função, `D` também declara uma função.

Ao contrário das [redeclarações regulares](<#/doc/language/conflicting_declarations>), `C` e `D` podem ter [escopos de destino](<#/doc/language/scope>) diferentes:
```cpp
    extern "C"
    {
        int x;
        int f();
        int g() { return 1; }
    }
    
    namespace A
    {
        int x;                // Error: redefines “x”
        int f();              // OK, redeclares “f”
        int g() { return 1; } // Error: redefines “g”
    }
```

No entanto, as [restrições](<#/doc/language/conflicting_declarations>) de tais declarações ainda se aplicam, o que significa que ambas devem declarar funções ou ambas devem declarar variáveis, e as entidades declaradas devem ter o mesmo tipo:
```cpp
    namespace A
    {
        extern "C" int x();
        extern "C" int y();
    }
    
    int x; // Error: redeclares “x” as a different kind of entity
    
    namespace B
    {
        void y(); // Error: redeclares “y” with a different type
    }
```

### Notas

Especificações de linguagem só podem aparecer em [escopo de namespace](<#/doc/language/scope>).

As chaves da especificação de linguagem não estabelecem um escopo.

Quando especificações de linguagem são aninhadas, a especificação mais interna é a que está em vigor.

Uma declaração diretamente contida em uma especificação de ligação de linguagem é tratada como se contivesse o [especificador extern](<#/doc/language/storage_duration>) para o propósito de determinar a [ligação](<#/doc/language/storage_duration>) do nome declarado e se é uma [definição](<#/doc/language/definition>).
```cpp
    extern "C" int x; // a declaration and not a definition
    // The above line is equivalent to extern "C" { extern int x; }
    
    extern "C" { int x; } // a declaration and definition
    
    extern "C" double f();
    static double f(); // error: linkage conflict
    
    extern "C" static void g(); // error: linkage conflict
```

`extern "C"` possibilita incluir arquivos de cabeçalho contendo declarações de funções da biblioteca C em um programa C++, mas se o mesmo arquivo de cabeçalho for compartilhado com um programa C, `extern "C"` (que não é permitido em C) deve ser ocultado com um [` #ifdef`](<#/doc/preprocessor/conditional>) apropriado, tipicamente [`__cplusplus`](<#/doc/preprocessor/replace>):
```cpp
    #ifdef __cplusplus
    extern "C" int foo(int, int); // C++ compiler sees this
    #else
    int foo(int, int);            // C compiler sees this
    #endif
```

O único compilador moderno que diferencia tipos de função com ligações de linguagem "C" e "C++" é o Oracle Studio; outros não permitem sobrecargas que diferem apenas na ligação de linguagem, incluindo os conjuntos de sobrecarga exigidos pelo padrão C++ ([std::qsort](<#/doc/algorithm/qsort>), [std::bsearch](<#/doc/algorithm/bsearch>), [std::signal](<#/doc/utility/program/signal>), [std::atexit](<#/doc/utility/program/atexit>), e [std::at_quick_exit](<#/doc/utility/program/at_quick_exit>)): [bug do GCC 2316](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=2316>), [bug do Clang 6277](<https://bugs.llvm.org/show_bug.cgi?id=6277>), [problema CWG 1555](<https://cplusplus.github.io/CWG/issues/1555.html>).
```cpp
    extern "C"   using c_predfun   = int(const void*, const void*);
    extern "C++" using cpp_predfun = int(const void*, const void*);
    
    // ill-formed, but accepted by most compilers
    static_assert(std::is_same<c_predfun, cpp_predfun>::value,
                  "C and C++ language linkages shall not differentiate function types.");
    
    // following declarations do not declare overloads in most compilers
    // because c_predfun and cpp_predfun are considered to be the same type
    void qsort(void* base, std::size_t nmemb, std::size_t size, c_predfun*   compar);
    void qsort(void* base, std::size_t nmemb, std::size_t size, cpp_predfun* compar);
```

### Palavras-chave

[`extern`](<#/doc/keyword/extern>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 4](<https://cplusplus.github.io/CWG/issues/4.html>) | C++98 | nomes com ligação interna podem ter ligações de linguagem | limitado a nomes com ligação externa
[CWG 341](<https://cplusplus.github.io/CWG/issues/341.html>) | C++98 | uma função com ligação de linguagem "C" pode ter o mesmo nome que uma variável global | o programa é malformado neste caso (nenhum diagnóstico é exigido se eles aparecerem em unidades de tradução diferentes)
[CWG 564](<https://cplusplus.github.io/CWG/issues/564.html>) | C++98 | o programa era malformado se duas declarações diferissem apenas nas especificações de ligação de linguagem (ou seja, diferentes string literals seguindo 'extern') | as ligações de linguagem reais dadas pelas declarações são comparadas em vez disso
[CWG 2460](<https://cplusplus.github.io/CWG/issues/2460.html>) | C++20 | funções friend com uma cláusula requires final e ligação de linguagem "C" tinham comportamentos conflitantes | a ligação de linguagem "C" é ignorada neste caso
[CWG 2483](<https://cplusplus.github.io/CWG/issues/2483.html>) | C++98 | a ligação dos tipos de funções membro estáticas que aparecem em blocos de linguagem "C" era "C++" | a ligação é "C"

### Referências

*   C++23 standard (ISO/IEC 14882:2024):

    *   9.11 Especificações de ligação [dcl.link]

*   C++20 standard (ISO/IEC 14882:2020):

    *   9.11 Especificações de ligação [dcl.link]

*   C++17 standard (ISO/IEC 14882:2017):

    *   10.5 Especificações de ligação [dcl.link]

*   C++14 standard (ISO/IEC 14882:2014):

    *   7.5 Especificações de ligação [dcl.link]

*   C++11 standard (ISO/IEC 14882:2011):

    *   7.5 Especificações de ligação [dcl.link]

*   C++03 standard (ISO/IEC 14882:2003):

    *   7.5 Especificações de ligação [dcl.link]

*   C++98 standard (ISO/IEC 14882:1998):

    *   7.5 Especificações de ligação [dcl.link]
