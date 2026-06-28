# Inicialização por cópia

Inicializa um objeto a partir de outro objeto.

### Sintaxe

---
T object `=` other`;` | (1) |
---|---|---
T object `=` `{` other`};` | (2) | (até C++11)
f`(` other`)` | (3) |
`return` other`;` | (4) |
`throw` object`;` `catch (` T object`)` | (5) |
T array`[` N`] = {` other-sequence`};` | (6) |

### Explicação

A inicialização por cópia é realizada nas seguintes situações:

1) Quando uma variável nomeada (automática, estática ou thread-local) de um tipo não-referência `T` é declarada com o inicializador consistindo de um sinal de igual seguido por uma expressão.

2) (até C++11) Quando uma variável nomeada de um tipo escalar `T` é declarada com o inicializador consistindo de um sinal de igual seguido por uma expressão entre chaves (Nota: a partir de C++11, isso é classificado como [inicialização de lista](<#/doc/language/list_initialization>), e conversões de estreitamento não são permitidas).

3) Ao [passar um argumento](<#/doc/language/operator_other>) para uma função por valor.

4) Ao [retornar](<#/doc/language/return>) de uma função que retorna por valor.

5) Ao [lançar](<#/doc/language/throw>) ou [capturar](<#/doc/language/catch>) uma exceção por valor.

6) Como parte da [inicialização de agregado](<#/doc/language/aggregate_initialization>), para inicializar cada elemento para o qual um inicializador é fornecido.

Os efeitos da inicialização por cópia são:

*   Primeiro, se `T` é um tipo de classe e o inicializador é uma expressão [prvalue](<#/doc/language/value_category>) cujo tipo não-cv-qualificado é a mesma classe que `T`, a própria expressão inicializadora, em vez de um temporário materializado a partir dela, é usada para inicializar o objeto de destino: veja [copy elision](<#/doc/language/copy_elision>).

| (desde C++17)

*   Caso contrário, se `T` é um tipo de classe e a versão não-cv-qualificada do tipo de other é `T` ou uma classe derivada de `T`, os [construtores não-explícitos](<#/doc/language/converting_constructor>) de `T` são examinados e a melhor correspondência é selecionada pela resolução de sobrecarga. Esse construtor é então chamado para inicializar o objeto.

*   Caso contrário, se `T` é um tipo de classe, e a versão não-cv-qualificada do tipo de other não é `T` ou derivada de `T`, ou se `T` é um tipo não-classe, mas o tipo de other é um tipo de classe, [sequências de conversão definidas pelo usuário](<#/doc/language/implicit_cast>) que podem converter do tipo de other para `T` (ou para um tipo derivado de `T` se `T` é um tipo de classe e uma função de conversão está disponível) são examinadas e a melhor é selecionada através da resolução de sobrecarga. O resultado da conversão, que é um rvalue temporário (até C++11) prvalue temporário (desde C++11) (até C++17) prvalue expression (desde C++17) da versão não-cv-qualificada de `T` se um [construtor de conversão](<#/doc/language/converting_constructor>) foi usado, é então usado para [inicializar diretamente](<#/doc/language/direct_initialization>) o objeto. A última etapa é geralmente [otimizada](<#/doc/language/copy_elision>) e o resultado da conversão é construído diretamente na memória alocada para o objeto de destino, mas o construtor apropriado (de movimento ou cópia) é exigido como acessível, mesmo que não seja usado. (até C++17)

*   Caso contrário (se nem `T` nem o tipo de other são tipos de classe), [conversões padrão](<#/doc/language/implicit_cast>) são usadas, se necessário, para converter o valor de other para a versão não-cv-qualificada de `T`.

### Notas

A inicialização por cópia é menos permissiva que a inicialização direta: [construtores explícitos](<#/doc/language/explicit>) não são [construtores de conversão](<#/doc/language/converting_constructor>) e não são considerados para inicialização por cópia.
```cpp
    struct Exp { explicit Exp(const char*) {} }; // not convertible from const char*
    Exp e1("abc");  // OK
    Exp e2 = "abc"; // Error, copy-initialization does not consider explicit constructor
    
    struct Imp { Imp(const char*) {} }; // convertible from const char*
    Imp i1("abc");  // OK
    Imp i2 = "abc"; // OK
```

Além disso, a conversão implícita na inicialização por cópia deve produzir `T` diretamente do inicializador, enquanto, por exemplo, a inicialização direta espera uma conversão implícita do inicializador para um argumento do construtor de `T`.
```cpp
    struct S { S(std::string) {} }; // implicitly convertible from std::string
    S s("abc");   // OK: conversion from const char[4] to std::string
    S s = "abc";  // Error: no conversion from const char[4] to S
    S s = "abc"s; // OK: conversion from std::string to S
```

Se other é uma expressão rvalue, um [construtor de movimento](<#/doc/language/move_constructor>) será selecionado pela resolução de sobrecarga e chamado durante a inicialização por cópia. Isso ainda é considerado inicialização por cópia; não há um termo especial (por exemplo, inicialização por movimento) para este caso.

A [conversão implícita](<#/doc/language/implicit_cast>) é definida em termos de inicialização por cópia: se um objeto do tipo `T` pode ser inicializado por cópia com a expressão `E`, então `E` é implicitamente conversível para `T`.

O sinal de igual, `=`, na inicialização por cópia de uma variável nomeada não está relacionado ao operador de atribuição. Sobrecargas do operador de atribuição não têm efeito na inicialização por cópia.

### Exemplo

Execute este código
```cpp
    #include <memory>
    #include <string>
    #include <utility>
    
    struct A
    {
        operator int() { return 12;}
    };
    
    struct B
    {
        B(int) {}
    };
    
    int main()
    {
        std::string s = "test";        // OK: constructor is non-explicit
        std::string s2 = std::move(s); // this copy-initialization performs a move
    
    //  std::unique_ptr<int> p = new int(1); // error: constructor is explicit
        std::unique_ptr<int> p(new int(1));  // OK: direct-initialization
    
        int n = 3.14;    // floating-integral conversion
        const int b = n; // const doesn't matter
        int c = b;       // ...either way
    
        A a;
        B b0 = 12;
    //  B b1 = a;       // < error: conversion from 'A' to non-scalar type 'B' requested
        B b2{a};        // < identical, calling A::operator int(), then B::B(int)
        B b3 = {a};     // <
        auto b4 = B{a}; // <
    
    //  b0 = a;         // < error, assignment operator overload needed
    
        {}(c, b0, b3, b4); // pretend these variables are used
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 5](<https://cplusplus.github.io/CWG/issues/5.html>) | C++98 | a qualificação cv do tipo de destino é aplicada ao temporário inicializado por um construtor de conversão | o temporário não é cv-qualificado
[CWG 177](<https://cplusplus.github.io/CWG/issues/177.html>) | C++98 | a categoria de valor do temporário criado durante a inicialização por cópia de um objeto de classe é não especificada | especificada como rvalue

### Veja também

*   [copy elision](<#/doc/language/copy_elision>)
*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [atribuição por cópia](<#/doc/language/as_operator>)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [destrutor](<#/doc/language/destructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização padrão](<#/doc/language/default_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [lista de inicializadores](<#/doc/language/initializer_list>)
    *   [inicialização de lista](<#/doc/language/list_initialization>)
    *   [inicialização de referência](<#/doc/language/reference_initialization>)
    *   [inicialização por valor](<#/doc/language/value_initialization>)
    *   [inicialização zero](<#/doc/language/zero_initialization>)
*   [atribuição por movimento](<#/doc/language/move_operator>)
*   [construtor de movimento](<#/doc/language/move_constructor>)
*   [`new`](<#/doc/language/new>)
