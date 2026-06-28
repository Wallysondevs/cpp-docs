# Comportamento indefinido

Torna o programa inteiro sem sentido se certas regras da linguagem forem violadas.

### Explicação

O padrão C++ define precisamente o [comportamento observável](<#/doc/language/as_if>) de todo programa C++ que não se enquadra em uma das seguintes classes:

*   _ill-formed_ - O programa possui erros de sintaxe ou erros semânticos diagnosticáveis.
    *   Um compilador C++ em conformidade é obrigado a emitir um diagnóstico, mesmo que defina uma extensão de linguagem que atribua significado a tal código (como com arrays de tamanho variável).
    *   O texto do padrão usa _shall_, _shall not_ e _ill-formed_ para indicar esses requisitos.

*   _ill-formed,[no diagnostic required](<#/doc/language/ndr>)_ - O programa possui erros semânticos que podem não ser diagnosticáveis no caso geral (por exemplo, violações do [ODR](<#/doc/language/definition>) ou outros erros que são detectáveis apenas em tempo de linkagem).
    *   O comportamento é indefinido se tal programa for executado.

*   _implementation-defined behavior_ - O comportamento do programa varia entre implementações, e a implementação em conformidade deve documentar os efeitos de cada comportamento.
    *   Por exemplo, o tipo de [std::size_t](<#/doc/types/size_t>) ou o número de bits em um byte, ou o texto de [std::bad_alloc::what](<#/doc/memory/new/bad_alloc>).
    *   Um subconjunto do comportamento definido pela implementação é o _locale-specific behavior_, que depende do [locale](<#/doc/locale>) fornecido pela implementação.

*   _unspecified behavior_ - O comportamento do programa varia entre implementações, e a implementação em conformidade não é obrigada a documentar os efeitos de cada comportamento.
    *   Por exemplo, [ordem de avaliação](<#/doc/language/eval_order>), se [literais de string](<#/doc/language/string_literal>) idênticos são distintos, a quantidade de sobrecarga de alocação de array, etc.
    *   Cada comportamento não especificado resulta em um de um conjunto de resultados válidos.

*   _erroneous behavior_ - O comportamento (incorreto) que a implementação é recomendada a diagnosticar.
    *   O comportamento errôneo é sempre a consequência de um código de programa incorreto.
    *   A avaliação de uma expressão constante nunca resulta em um comportamento errôneo.
    *   Se a execução contiver uma operação especificada como tendo comportamento errôneo, a implementação é permitida e recomendada a emitir um diagnóstico, e é permitida a encerrar a execução em um momento não especificado após essa operação.
    *   Uma implementação pode emitir um diagnóstico se puder determinar que o comportamento errôneo é alcançável sob um conjunto de suposições específicas da implementação sobre o comportamento do programa, o que pode resultar em falsos positivos.

| Exemplos de comportamento errôneo
---
```cpp
    #include <cassert>
    #include <cstring>
    
    void f()
    {   
        int d1, d2;       // d1, d2 have erroneous values
        int e1 = d1;      // erroneous behavior
        int e2 = d1;      // erroneous behavior
        assert(e1 == e2); // holds
        assert(e1 == d1); // holds, erroneous behavior
        assert(e2 == d1); // holds, erroneous behavior
    
        std::memcpy(&d2, &d1, sizeof(int)); // no erroneous behavior, but
                                            // d2 has an erroneous value
    
        assert(e1 == d2); // holds, erroneous behavior
        assert(e2 == d2); // holds, erroneous behavior
    }
    
    unsigned char g(bool b)
    {
        unsigned char c;     // c has erroneous value
        unsigned char d = c; // no erroneous behavior, but d has an erroneous value
        assert(c == d);      // holds, both integral promotions have erroneous behavior
        int e = d;           // erroneous behavior
        return b ? d : 0;    // erroneous behavior if b is true
    }
```
(desde C++26)

*   _undefined behavior_ - Não há restrições sobre o comportamento do programa.
    *   Alguns exemplos de comportamento indefinido são data races, acessos à memória fora dos limites do array, overflow de inteiro com sinal, desreferência de ponteiro nulo, [mais de uma](<#/doc/language/eval_order>) modificação do mesmo escalar em uma expressão sem nenhum ponto de sequência intermediário (até C++11) que não seja sequenciado (desde C++11), acesso a um objeto através de [um ponteiro de um tipo diferente](<#/doc/language/reinterpret_cast>), etc.
    *   As implementações não são obrigadas a diagnosticar comportamento indefinido (embora muitas situações simples sejam diagnosticadas), e o programa compilado não é obrigado a fazer nada significativo.

*   _runtime-undefined behavior_ - O comportamento que é indefinido, exceto quando ocorre durante a avaliação de uma expressão como uma [expressão constante central](<#/doc/language/constant_expression>).

| (desde C++11)

### Comportamento indefinido e otimização

Como programas C++ corretos são livres de comportamento indefinido, os compiladores podem produzir resultados inesperados quando um programa que realmente possui comportamento indefinido é compilado com otimização habilitada:

Por exemplo,

#### Overflow de inteiro com sinal
```cpp
    int foo(int x)
    {
        return x + 1 > x; // either true or UB due to signed overflow
    }
```
pode ser compilado como ([demo](<https://godbolt.org/z/re39h7P1K>))
```asm
    foo(int):
            mov     eax, 1
            ret
```

#### Acesso fora dos limites
```cpp
    int table[4] = {};
    bool exists_in_table(int v)
    {
        // return true in one of the first 4 iterations or UB due to out-of-bounds access
        for (int i = 0; i <= 4; i++)
            if (table[i] == v)
                return true;
        return false;
    }
```
Pode ser compilado como ([demo](<https://godbolt.org/z/vMbsdo5az>))
```asm
    exists_in_table(int):
            mov     eax, 1
            ret
```

#### Escalar não inicializado
```cpp
    std::size_t f(int x)
    {
        std::size_t a;
        if (x) // either x nonzero or UB
            a = 42;
        return a;
    }
```
Pode ser compilado como ([demo](<https://godbolt.org/z/1sraffdM8>))
```asm
    f(int):
            mov     eax, 42
            ret
```
A saída mostrada foi observada em uma versão mais antiga do gcc

Execute este código
```cpp
    #include <cstdio>
    
    int main()
    {
        bool p; // uninitialized local variable
        if (p)  // UB access to uninitialized scalar
            std::puts("p is true");
        if (!p) // UB access to uninitialized scalar
            std::puts("p is false");
    }
```
Saída possível:
```
    p is true
    p is false
```

#### Escalar inválido
```cpp
    int f()
    {
        bool b = true;
        unsigned char* p = reinterpret_cast<unsigned char*>(&b);
        *p = 10;
        // reading from b is now UB
        return b == 0;
    }
```
Pode ser compilado como ([demo](<https://godbolt.org/z/4vKxhcea4>))
```asm
    f():
            mov     eax, 11
            ret
```

#### Desreferência de ponteiro nulo

Os exemplos demonstram a leitura do resultado da desreferência de um ponteiro nulo.
```cpp
    int foo(int* p)
    {
        int x = *p;
        if (!p)
            return x; // Either UB above or this branch is never taken
        else
            return 0;
    }
    
    int bar()
    {
        int* p = nullptr;
        return *p; // Unconditional UB
    }
```
pode ser compilado como ([demo](<https://godbolt.org/z/edxr5W5T7>))
```asm
    foo(int*):
            xor     eax, eax
            ret
    bar():
            ret
```

#### Acesso a ponteiro passado para [std::realloc](<#/doc/memory/c/realloc>)

Escolha clang para observar a saída mostrada

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
    
    int main()
    {
        int* p = (int*)std::malloc(sizeof(int));
        int* q = (int*)std::realloc(p, sizeof(int));
        *p = 1; // UB access to a pointer that was passed to realloc
        *q = 2;
        if (p == q) // UB access to a pointer that was passed to realloc
            std::cout << *p << *q << '\n';
    }
```
Saída possível:
```
    12
```

#### Loop infinito sem efeitos colaterais

Escolha clang ou a versão mais recente do gcc para observar a saída mostrada.

Execute este código
```cpp
    #include <iostream>
    
    bool fermat()
    {
        const int max_value = 1000;
    
        // Non-trivial infinite loop with no side effects is UB
        for (int a = 1, b = 1, c = 1; true; )
        {
            if (((a * a * a) == ((b * b * b) + (c * c * c))))
                return true; // disproved :()
            a++;
            if (a > max_value)
            {
                a = 1;
                b++;
            }
            if (b > max_value)
            {
                b = 1;
                c++;
            }
            if (c > max_value)
                c = 1;
        }
    
        return false; // not disproved
    }
    
    int main()
    {
        std::cout << "Fermat's Last Theorem ";
        fermat()
            ? std::cout << "has been disproved!\n"
            : std::cout << "has not been disproved.\n";
    }
```
Saída possível:
```
    Fermat's Last Theorem has been disproved!
```

### Malformado com mensagem de diagnóstico

Note que os compiladores têm permissão para estender a linguagem de maneiras que dão significado a programas malformados. A única coisa que o padrão C++ exige em tais casos é uma mensagem de diagnóstico (aviso do compilador), a menos que o programa fosse "ill-formed no diagnostic required".

Por exemplo, a menos que as extensões de linguagem sejam desabilitadas via `--pedantic-errors`, o GCC compilará o exemplo a seguir [com apenas um aviso](<https://coliru.stacked-crooked.com/a/3cc6bdd9576df9a5>) mesmo que ele [apareça no padrão C++](<https://eel.is/c++draft/dcl.init.list#example-6>) como um exemplo de "erro" (veja também [GCC Bugzilla #55783](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=55783>))

Execute este código
```cpp
    #include <iostream>
    
    // Example tweak, do not use constant
    double a{1.0};
    
    // C++23 standard, §9.4.5 List-initialization [dcl.init.list], Example #6:
    struct S
    {
        // no initializer-list constructors
        S(int, double, double); // #1
        S();                    // #2
        // ...
    };
    
    S s1 = {1, 2, 3.0}; // OK, invoke #1
    S s2{a, 2, 3}; // error: narrowing
    S s3{}; // OK, invoke #2
    // — end example]
    
    S::S(int, double, double) {}
    S::S() {}
    
    int main()
    {
        std::cout << "All checks have passed.\n";
    }
```
Saída possível:
```
    main.cpp:17:6: error: type 'double' cannot be narrowed to 'int' in initializer 
    list [-Wc++11-narrowing]
    S s2{a, 2, 3}; // error: narrowing
         ^
    main.cpp:17:6: note: insert an explicit cast to silence this issue
    S s2{a, 2, 3}; // error: narrowing
         ^
         static_cast<int>( )
    1 error generated.
```

### Referências

Conteúdo estendido
---
*   Padrão C++23 (ISO/IEC 14882:2024):
    *   3.25 ill-formed program [defns.ill.formed]
    *   3.26 implementation-defined behavior [defns.impl.defined]
    *   3.66 unspecified behavior [defns.unspecified]
    *   3.68 well-formed program [defns.well.formed]
*   Padrão C++20 (ISO/IEC 14882:2020):
    *   TBD ill-formed program [defns.ill.formed]
    *   TBD implementation-defined behavior [defns.impl.defined]
    *   TBD unspecified behavior [defns.unspecified]
    *   TBD well-formed program [defns.well.formed]
*   Padrão C++17 (ISO/IEC 14882:2017):
    *   TBD ill-formed program [defns.ill.formed]
    *   TBD implementation-defined behavior [defns.impl.defined]
    *   TBD unspecified behavior [defns.unspecified]
    *   TBD well-formed program [defns.well.formed]
*   Padrão C++14 (ISO/IEC 14882:2014):
    *   TBD ill-formed program [defns.ill.formed]
    *   TBD implementation-defined behavior [defns.impl.defined]
    *   TBD unspecified behavior [defns.unspecified]
    *   TBD well-formed program [defns.well.formed]
*   Padrão C++11 (ISO/IEC 14882:2011):
    *   TBD ill-formed program [defns.ill.formed]
    *   TBD implementation-defined behavior [defns.impl.defined]
    *   TBD unspecified behavior [defns.unspecified]
    *   TBD well-formed program [defns.well.formed]
*   Padrão C++98 (ISO/IEC 14882:1998):
    *   TBD ill-formed program [defns.ill.formed]
    *   TBD implementation-defined behavior [defns.impl.defined]
    *   TBD unspecified behavior [defns.unspecified]
    *   TBD well-formed program [defns.well.formed]

### Veja também

`[[[assume](<#/doc/language/attributes/assume>)(_expression_)]]`(C++23) | especifica que a _expressão_ sempre será avaliada como verdadeira em um dado ponto
(especificador de atributo)
`[[[indeterminate](<#/doc/language/attributes/indeterminate>)]]`(C++26) | especifica que um objeto tem um valor indeterminado se não for inicializado
(especificador de atributo)
[ unreachable](<#/doc/utility/unreachable>)(C++23) | marca um ponto de execução inalcançável
(função)
[Documentação C](<#/>) para Comportamento indefinido

### Links externos

1.  | [Blog do Projeto LLVM: O que Todo Programador C Deveria Saber Sobre Comportamento Indefinido #1/3](<https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html>)
---|---
2.  | [Blog do Projeto LLVM: O que Todo Programador C Deveria Saber Sobre Comportamento Indefinido #2/3](<https://blog.llvm.org/2011/05/what-every-c-programmer-should-know_14.html>)
3.  | [Blog do Projeto LLVM: O que Todo Programador C Deveria Saber Sobre Comportamento Indefinido #3/3](<https://blog.llvm.org/2011/05/what-every-c-programmer-should-know_21.html>)
4.  | [Comportamento indefinido pode resultar em viagem no tempo (entre outras coisas, mas viagem no tempo é a mais estranha)](<https://devblogs.microsoft.com/oldnewthing/20140627-00/?p=633>)
5.  | [Compreendendo o Overflow de Inteiro em C/C++](<https://www.cs.utah.edu/~regehr/papers/overflow12.pdf>)
6.  | [Diversão com ponteiros NULL, parte 1](<https://lwn.net/Articles/342330/>) (exploit local no Linux 2.6.30 causado por comportamento indefinido devido à desreferência de ponteiro nulo)
7.  | [Comportamento Indefinido e o Último Teorema de Fermat](<https://web.archive.org/web/20201108094235/https://kukuruku.co/post/undefined-behavior-and-fermats-last-theorem/>)
8.  | [Guia do programador C++ para comportamento indefinido](<https://pvs-studio.com/en/blog/posts/cpp/1129/>)