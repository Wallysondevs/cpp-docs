# Pacote (desde C++11)

Um pacote é uma entidade C++ que define um dos seguintes:

*   um parameter pack

*   template parameter pack
*   function parameter pack

*   [lambda init-capture pack](<#/doc/language/lambda>)

| (desde C++20)
*   [structured binding pack](<#/doc/language/structured_binding>)

| (desde C++26)

Um template parameter pack é um parâmetro de template que aceita zero ou mais argumentos de template (não-tipos, tipos ou templates). Um function parameter pack é um parâmetro de função que aceita zero ou mais argumentos de função.

Um lambda init-capture pack é uma captura lambda que introduz um init-capture para cada um dos elementos na expansão de pacote de seu inicializador. | (desde C++20)
---|---
Um structured binding pack é um identificador na declaração de structured binding que introduz zero ou mais structured bindings. | (desde C++26)

O número de elementos de um pacote é igual a:

*   o número de argumentos fornecidos para o parameter pack, se o pacote for um template ou function parameter pack,

*   o número de elementos na expansão de pacote de seu inicializador, se o pacote for um lambda init-capture pack,

| (desde C++20)

*   o tamanho do structured binding do inicializador menos o número de elementos não-pack na declaração de structured binding, se o pacote for um structured binding pack.

| (desde C++26)

Um template com pelo menos um parameter pack é chamado de _variadic template_.

### Sintaxe

Template parameter pack (aparece em listas de parâmetros de [alias template](<#/doc/language/type_alias>), [class template](<#/doc/language/class_template>), [variable template](<#/doc/language/variable_template>)(desde C++14), [concept](<#/doc/language/constraints>)(desde C++20) e [function template](<#/doc/language/function_template>))

---
type `...` pack-name ﻿(opcional) | (1) |
---|---|---
`typename`|`class` `...` pack-name ﻿(opcional) | (2) |
type-constraint `...` pack-name ﻿(opcional) | (3) | (desde C++20)
`template` `<` parameter-list `>` `class` `...` pack-name ﻿(opcional) | (4) | (ate C++17)
`template` `<` parameter-list `>` `typename`|`class` `...` pack-name ﻿(opcional) | (4) | (desde C++17)

Function parameter pack (uma forma de [declarator](<#/doc/language/declarations>), aparece em uma lista de parâmetros de função de um variadic function template)

---
pack-name `...` pack-param-name ﻿(opcional) | (5) |
Para a sintaxe de pacotes não-parâmetro, veja [lambda init-capture pack](<#/doc/language/lambda>) e [structured binding pack](<#/doc/language/structured_binding>)(desde C++26). | (desde C++20)

Expansão de pacote (aparece no corpo de um template)

---
pattern `...` | (6) |

1) Um non-type template parameter pack com um nome opcional

2) Um type template parameter pack com um nome opcional

3) Um type template parameter pack [restrito](<#/doc/language/constraints>) com um nome opcional | (desde C++20)

4) Um template template parameter pack com um nome opcional

5) Um function parameter pack com um nome opcional

6) Expansão de pacote: expande para uma lista de zero ou mais `pattern`s. O pattern deve incluir pelo menos um pacote.

### Explicação

Um variadic class template pode ser instanciado com qualquer número de argumentos de template:
```cpp
    template<class... Types>
    struct Tuple {};
    
    Tuple<> t0;           // Types contains no arguments
    Tuple<int> t1;        // Types contains one argument: int
    Tuple<int, float> t2; // Types contains two arguments: int and float
    Tuple<0> t3;          // error: 0 is not a type
```

Um variadic function template pode ser chamado com qualquer número de argumentos de função (os argumentos de template são deduzidos através de [dedução de argumento de template](<#/doc/language/template_argument_deduction>)):
```cpp
    template<class... Types>
    void f(Types... args);
    
    f();       // OK: args contains no arguments
    f(1);      // OK: args contains one argument: int
    f(2, 1.0); // OK: args contains two arguments: int and double
```

Em um primary class template, o template parameter pack deve ser o parâmetro final na lista de parâmetros de template. Em um function template, o template parameter pack pode aparecer antes na lista, desde que todos os parâmetros seguintes possam ser deduzidos dos argumentos da função, ou tenham argumentos padrão:
```cpp
    template<typename U, typename... Ts>    // OK: can deduce U
    struct valid;
    // template<typename... Ts, typename U> // Error: Ts... not at the end
    // struct Invalid;
    
    template<typename... Ts, typename U, typename=void>
    void valid(U, Ts...);    // OK: can deduce U
    // void valid(Ts..., U); // Can't be used: Ts... is a non-deduced context in this position
    
    valid(1.0, 1, 2, 3);     // OK: deduces U as double, Ts as {int, int, int}
```

Se cada especialização válida de um variadic template exigir um template parameter pack vazio, o programa é malformado, sem diagnóstico necessário.

### Expansão de pacote

Um pattern seguido por uma elipse, no qual o nome de pelo menos um pacote aparece pelo menos uma vez, é _expandido_ em zero ou mais instanciações do pattern, onde o nome do pacote é substituído por cada um dos elementos do pacote, em ordem. Instanciações de [especificadores de alinhamento](<#/doc/language/parameter_pack>) são separadas por espaço, outras instanciações são separadas por vírgula.
```cpp
    template<class... Us>
    void f(Us... pargs) {}
    
    template<class... Ts>
    void g(Ts... args)
    {
        f(&args...); // “&args...” is a pack expansion
                     // “&args” is its pattern
    }
    
    g(1, 0.2, "a"); // Ts... args expand to int E1, double E2, const char* E3
                    // &args... expands to &E1, &E2, &E3
                    // Us... pargs expand to int* E1, double* E2, const char** E3
```

Se os nomes de dois pacotes aparecerem no mesmo pattern, eles são expandidos simultaneamente e devem ter o mesmo comprimento:
```cpp
    template<typename...>
    struct Tuple {};
    
    template<typename T1, typename T2>
    struct Pair {};
    
    template<class... Args1>
    struct zip
    {
        template<class... Args2>
        struct with
        {
            typedef Tuple<Pair<Args1, Args2>...> type;
            // Pair<Args1, Args2>... is the pack expansion
            // Pair<Args1, Args2> is the pattern
        };
    };
    
    typedef zip<short, int>::with<unsigned short, unsigned>::type T1;
    // Pair<Args1, Args2>... expands to
    // Pair<short, unsigned short>, Pair<int, unsigned int> 
    // T1 is Tuple<Pair<short, unsigned short>, Pair<int, unsigned>>
    
    // typedef zip<short>::with<unsigned short, unsigned>::type T2;
    // error: pack expansion contains packs of different lengths
```

Se uma expansão de pacote estiver aninhada dentro de outra expansão de pacote, os pacotes que aparecem dentro da expansão de pacote mais interna são expandidos por ela, e deve haver outro pacote mencionado na expansão de pacote envolvente, mas não na mais interna:
```cpp
    template<class... Args>
    void g(Args... args)
    {
        f(const_cast<const Args*>(&args)...); 
        // const_cast<const Args*>(&args) is the pattern, it expands two packs
        // (Args and args) simultaneously
    
        f(h(args...) + args...); // Nested pack expansion:
        // inner pack expansion is "args...", it is expanded first
        // outer pack expansion is h(E1, E2, E3) + args..., it is expanded
        // second (as h(E1, E2, E3) + E1, h(E1, E2, E3) + E2, h(E1, E2, E3) + E3)
    }
```

Quando o número de elementos em um pacote é zero (pacote vazio), a instanciação de uma expansão de pacote não altera a interpretação sintática da construção envolvente, mesmo em casos onde omitir a expansão de pacote inteiramente seria malformado ou resultaria em uma ambiguidade de sintaxe. A instanciação produz uma lista vazia.
```cpp
    template<class... Bases> 
    struct X : Bases... { };
    
    template<class... Args> 
    void f(Args... args) 
    {
        X<Args...> x(args...);
    }
    
    template void f<>(); // OK, X<> has no base classes
                         // x is a variable of type X<> that is value-initialized
```

### Locais de expansão

Dependendo de onde a expansão ocorre, a lista resultante separada por vírgulas (ou separada por espaços para [especificadores de alinhamento](<#/doc/language/parameter_pack>)) é um tipo diferente de lista: lista de parâmetros de função, lista de inicializadores de membro, lista de atributos, etc. A seguir está a lista de todos os contextos permitidos:

#### Listas de argumentos de função

Uma expansão de pacote pode aparecer dentro dos parênteses de um operador de chamada de função, caso em que a maior expressão ou [lista de inicializadores entre chaves](<#/doc/language/initialization>) à esquerda da elipse é o pattern que é expandido:
```cpp
    f(args...);              // expands to f(E1, E2, E3)
    f(&args...);             // expands to f(&E1, &E2, &E3)
    f(n, ++args...);         // expands to f(n, ++E1, ++E2, ++E3);
    f(++args..., n);         // expands to f(++E1, ++E2, ++E3, n);
    
    f(const_cast<const Args*>(&args)...);
    // f(const_cast<const E1*>(&X1), const_cast<const E2*>(&X2), const_cast<const E3*>(&X3))
    
    f(h(args...) + args...); // expands to 
    // f(h(E1, E2, E3) + E1, h(E1, E2, E3) + E2, h(E1, E2, E3) + E3)
```

#### Inicializadores entre parênteses

Uma expansão de pacote pode aparecer dentro dos parênteses de um [inicializador direto](<#/doc/language/direct_initialization>), um [cast estilo função](<#/doc/language/explicit_cast>), e outros contextos ([inicializador de membro](<#/doc/language/initializer_list>), [new-expression](<#/doc/language/new>), etc.) caso em que as regras são idênticas às regras para uma expressão de chamada de função acima:
```cpp
    Class c1(&args...);             // calls Class::Class(&E1, &E2, &E3)
    Class c2 = Class(n, ++args...); // calls Class::Class(n, ++E1, ++E2, ++E3);
    
    ::new((void *)p) U(std::forward<Args>(args)...) // std::allocator::allocate
```

#### Inicializadores entre chaves

Em uma lista de inicializadores entre chaves, uma expansão de pacote também pode aparecer:
```cpp
    template<typename... Ts>
    void func(Ts... args)
    {
        const int size = sizeof...(args) + 2;
        int res[size] = {1, args..., 2};
    
        // since initializer lists guarantee sequencing, this can be used to
        // call a function on each element of a pack, in order:
        int dummy[sizeof...(Ts)] = {(std::cout << args, 0)...};
    }
```

#### Listas de argumentos de template

Expansões de pacote podem ser usadas em qualquer lugar em uma lista de argumentos de template, desde que o template tenha os parâmetros para corresponder à expansão:
```cpp
    template<class A, class B, class... C>
    void func(A arg1, B arg2, C... arg3)
    {
        container<A, B, C...> t1; // expands to container<A, B, E1, E2, E3> 
        container<C..., A, B> t2; // expands to container<E1, E2, E3, A, B> 
        container<A, C..., B> t3; // expands to container<A, E1, E2, E3, B> 
    }
```

#### Lista de parâmetros de função

Em uma lista de parâmetros de função, se uma elipse aparecer em uma declaração de parâmetro (seja ela nomeando um function parameter pack (como em, Args`...` args) ou não) a declaração de parâmetro é o pattern:
```cpp
    template<typename... Ts>
    void f(Ts...) {}
    
    f('a', 1); // Ts... expands to void f(char, int)
    f(0.1);    // Ts... expands to void f(double)
    
    template<typename... Ts, int... N>
    void g(Ts (&...arr)[N]) {}
    
    int n[1];
    
    g<const char, int>("a", n); // Ts (&...arr)[N] expands to 
                                // const char (&)[2], int(&)[1]
```

Nota: No pattern `Ts (&...arr)[N]`, a elipse é o elemento mais interno, não o último elemento como em todas as outras expansões de pacote.

Nota: `Ts (&...)[N]` não é permitido porque a gramática C++11 exige que a elipse entre parênteses tenha um nome: [CWG issue 1488](<https://cplusplus.github.io/CWG/issues/1488.html>).

#### Lista de parâmetros de template

A expansão de pacote pode aparecer em uma lista de parâmetros de template:
```cpp
    template<typename... T>
    struct value_holder
    {
        template<T... Values> // expands to a non-type template parameter 
        struct apply {};      // list, such as <int, char, int(&)[5]>
    };
```

#### Especificadores de base e listas de inicializadores de membro

Uma expansão de pacote pode designar a lista de classes base em uma [declaração de classe](<#/doc/language/class>). Tipicamente, isso também significa que o construtor precisa usar uma expansão de pacote na [lista de inicializadores de membro](<#/doc/language/initializer_list>) para chamar os construtores dessas bases:
```cpp
    template<class... Mixins>
    class X : public Mixins...
    {
    public:
        X(const Mixins&... mixins) : Mixins(mixins)... {}
    };
```

#### Capturas lambda

A expansão de pacote pode aparecer na cláusula de captura de uma expressão [lambda](<#/doc/language/lambda>):
```cpp
    template<class... Args>
    void f(Args... args)
    {
        auto lm = [&, args...] { return g(args...); };
        lm();
    }
```

#### O operador sizeof...

O operador [`sizeof...`](<#/doc/language/sizeof...>) também é classificado como uma expansão de pacote:
```cpp
    template<class... Types>
    struct count
    {
        static const std::size_t value = sizeof...(Types);
    };
```

#### Especificações de exceção dinâmicas

A lista de exceções em uma [especificação de exceção dinâmica](<#/doc/language/except_spec>) também pode ser uma expansão de pacote:
```cpp
    template<class... X>
    void func(int arg) throw(X...)
    {
        // ... throw different Xs in different situations
    }
```

| (ate C++17)

#### Especificador de alinhamento

Expansões de pacote são permitidas tanto nas listas de tipos quanto nas listas de expressões usadas pela palavra-chave [`alignas`](<#/doc/language/alignas>). As instanciações são separadas por espaço:
```cpp
    template<class... T>
    struct Align
    {
        alignas(T...) unsigned char buffer[128];
    };
    
    Align<int, short> a; // the alignment specifiers after expansion are
                         // alignas(int) alignas(short)
                         // (no comma in between)
```

#### Lista de atributos

Expansões de pacote são permitidas nas listas de [atributos](<#/doc/language/attributes>), se permitido pela especificação do atributo. Por exemplo:
```cpp
    template<int... args>
    [[vendor::attr(args)...]] void* f();
```

#### Expressões de fold

Em [expressões de fold](<#/doc/language/fold>), o pattern é a subexpressão inteira que não contém um pacote não expandido.

#### Declarações using

Em [declarações using](<#/doc/language/using_declaration>), a elipse pode aparecer na lista de declarators, isso é útil ao derivar de um template parameter pack:
```cpp
    template<typename... bases>
    struct X : bases...
    {
        using bases::g...;
    };
    X<B, D> x; // OK: B::g and D::g introduced
```

| (desde C++17)

#### Indexação de pacote

Em [pack indexing](<#/doc/language/pack_indexing>), a expansão de pacote contém um pacote não expandido seguido por uma elipse e um subscrito. O pattern da expressão de pack indexing é um identificador, enquanto o pattern do especificador de pack indexing é um typedef-name.
```cpp
    consteval auto first_plus_last(auto... args)
    {
        return args...[0] + args...[sizeof...(args) - 1];
    }
    
    static_assert(first_plus_last(5) == 10);
    static_assert(first_plus_last(5, 4) == 9);
    static_assert(first_plus_last(5, 6, 2) == 7);
```

#### Declarações friend

Em [declarações friend](<#/doc/language/friend>) de classe, cada especificador de tipo pode ser seguido por uma elipse:
```cpp
    struct C {};
    struct E { struct Nested; };
    
    template<class... Ts>
    class R
    {
        friend Ts...;
    };
    
    template<class... Ts, class... Us>
    class R<R<Ts...>, R<Us...>>
    {
        friend Ts::Nested..., Us...;
    };
    
    R<C, E> rce;           // classes C and E are friends of R<C, E>
    R<R<E>, R<C, int>> rr; // E::Nested and C are friends of R<R<E>, R<C, int>>
```

#### Restrições expandidas por fold

Em [restrições expandidas por fold](<#/doc/language/constraints>), o pattern é a restrição dessa restrição expandida por fold. Uma restrição expandida por fold não é instanciada. | (desde C++26)

### Notas

| Esta seção está incompleta
Razão: algumas palavras sobre especializações parciais e outras formas de acessar elementos individuais? Mencionar recursão vs logarítmica vs atalhos como expressões de fold
Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_variadic_templates`](<#/doc/feature_test>) | [`200704L`](<#/>) | (C++11) | [Variadic templates](<#/doc/language/parameter_pack>)
[`__cpp_pack_indexing`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [Pack indexing](<#/doc/language/parameter_pack>)

### Exemplo

O exemplo abaixo define uma função similar a [std::printf](<#/doc/io/c/printf>), que substitui cada ocorrência do caractere `%` na string de formato por um valor.

A primeira sobrecarga é chamada quando apenas a string de formato é passada e não há expansão de parâmetro.

A segunda sobrecarga contém um parâmetro de template separado para o início dos argumentos e um parameter pack, isso permite que a chamada recursiva passe apenas o restante dos parâmetros até que se torne vazio.

`Targs` é o template parameter pack e `Fargs` é o function parameter pack.

Execute este código
```cpp
    #include <iostream>
    
    void tprintf(const char* format) // base function
    {
        std::cout << format;
    }
    
    template<typename T, typename... Targs>
    void tprintf(const char* format, T value, Targs... Fargs) // recursive variadic function
    {
        for (; *format != '\0'; format++)
        {
            if (*format == '%')
            {
                std::cout << value;
                tprintf(format + 1, Fargs...); // recursive call
                return;
            }
            std::cout << *format;
        }
    }
    
    int main()
    {
        tprintf("% world% %\n", "Hello", '!', 123);
    }
```

Saída:
```
    Hello world! 123
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1533](<https://cplusplus.github.io/CWG/issues/1533.html>) | C++11 | uma expansão de pacote poderia ocorrer em um inicializador de membro para um membro | não permitido
[CWG 2717](<https://cplusplus.github.io/CWG/issues/2717.html>) | C++11 | instanciações de especificadores de alinhamento eram separadas por vírgula | elas são separadas por espaço

### Veja também

[Function template](<#/doc/language/function_template>) | Define uma família de funções
---|---
[Class template](<#/doc/language/class_template>) | Define uma família de classes
[`sizeof...`](<#/doc/language/sizeof...>) | Consulta o número de elementos em um pacote
[C-style variadic function](<#/doc/utility/variadic>) | Aceita um número variável de argumentos
[Preprocessor macros](<#/doc/preprocessor/replace>) | Também podem ser variádicas
[Fold expression](<#/doc/language/fold>) | Reduz um pacote sobre um operador binário
[Pack indexing](<#/doc/language/pack_indexing>) | Acessa o elemento de um pacote no índice especificado