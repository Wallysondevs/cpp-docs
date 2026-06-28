# Inicialização de agregado

Inicializa um agregado a partir de uma lista de inicializadores. É uma forma de [inicialização por lista](<#/doc/language/list_initialization>)(desde C++11).

### Sintaxe

---
T object` `= {` arg1, arg2, ... `};` | (1) |
---|---|---
T object `{` arg1, arg2, ... `};` | (2) | (desde C++11)
T object` `= { .` des1` `=` `arg1 `, .` des2 `{` arg2 `}` ... `};` | (3) | (desde C++20)
T object `{ .` des1` `=` `arg1 `, .` des2 `{` arg2 `}` ... `};` | (4) | (desde C++20)

1,2) Inicializando um agregado com uma lista de inicializadores comum.

3,4) Inicializando um agregado com [inicializadores designados](<#/doc/language/aggregate_initialization>) (apenas para classes aggregate).

### Definições

#### Agregado

Um _agregado_ é um dos seguintes tipos:

*   tipos array
*   tipos de classe que possuem

    *   nenhum construtor declarado pelo usuário

| (até C++11)

    *   nenhum construtor [fornecido pelo usuário](<#/doc/language/function>), [herdado](<#/doc/language/using_declaration>), ou [explícito](<#/doc/language/explicit>)

| (desde C++11)
(até C++20)

    *   nenhum construtor declarado pelo usuário ou herdado

| (desde C++20)

    *   nenhum membro de dados não estático direto privado ou protegido

    *   nenhuma [classe base](<#/doc/language/derived_class>)

| (até C++17)

    *   nenhuma [classe base virtual](<#/doc/language/derived_class>)
    *   nenhuma classe base direta [privada](<#/doc/language/derived_class>) ou [protegida](<#/doc/language/derived_class>)

| (desde C++17)

    *   nenhuma função membro virtual

    *   nenhum [inicializador de membro padrão](<#/doc/language/data_members>)

| (desde C++11)
(até C++14)

#### Elemento

Os _elementos_ de um agregado são:

*   para um array, os elementos do array em ordem crescente de índice, ou
*   para uma classe, os membros de dados não estáticos que não são [bit-fields](<#/doc/language/bit_field>) anônimos, na ordem de declaração.

| (até C++17)

*   para uma classe, as classes base diretas na ordem de declaração, seguidas pelos membros de dados não estáticos diretos que não são nem [bit-fields](<#/doc/language/bit_field>) anônimos nem membros de uma [união anônima](<#/doc/language/union>), na ordem de declaração.

| (desde C++17)

#### Pertinência

Cada [cláusula de inicialização](<#/doc/language/initialization>) em uma lista de inicializadores entre chaves é dita _pertencer_ a um elemento do agregado que está sendo inicializado ou a um elemento de um de seus subagregados.

Considerando a sequência de cláusulas de inicialização e a sequência de elementos agregados inicialmente formada como a sequência de elementos do agregado que está sendo inicializado e potencialmente modificada conforme descrito abaixo:

*   Para cada cláusula de inicialização, se qualquer uma das seguintes condições for satisfeita, ela pertence ao elemento agregado correspondente `elem`:

    *   `elem` não é um agregado.
    *   A cláusula de inicialização começa com `{`.
    *   A cláusula de inicialização é uma expressão, e uma [sequência de conversão implícita](<#/doc/language/implicit_cast>) pode ser formada que converte a expressão para o tipo de `elem`.
    *   `elem` é um agregado que não possui elementos agregados.

*   Caso contrário, `elem` é um agregado e esse subagregado é substituído na lista de elementos agregados pela sequência de seus próprios elementos agregados, e a análise de pertinência é retomada com o primeiro desses elementos e a mesma cláusula de inicialização. Em outras palavras, essas regras se aplicam recursivamente aos subagregados do agregado.

A análise é concluída quando todas as cláusulas de inicialização foram esgotadas. Se alguma cláusula de inicialização permanecer que não pertença a um elemento do agregado ou a um de seus subagregados, o programa é malformado.
```cpp
    struct S1 { int a, b; };
    struct S2 { S1 s, t; };

    // Cada subagregado de “x” pertence a uma cláusula de inicialização que começa com {
    S2 x[2] =
    {
        // pertence a “x[0]”
        {
            {1, 2}, // pertence a “x[0].s”
            {3, 4}  // pertence a “x[0].t”
        },
        // pertence a “x[1]”
        {
            {5, 6}, // pertence a “x[1].s”
            {7, 8}  // pertence a “x[1].t”
        }
    };

    // “x” e “y” têm o mesmo valor (veja abaixo)
    S2 y[2] = {1, 2, 3, 4, 5, 6, 7, 8};

    // O processo de análise de pertinência de “y”:
    // 1. Inicializa a sequência de elementos agregados (x[0], x[1]) e
    //    a sequência de cláusulas de inicialização (1, 2, 3, 4, 5, 6, 7, 8).
    // 2. Começando pelos primeiros elementos de cada sequência,
    //    verifica se 1 pertence a x[0]:
    //    · x[0] é um agregado.
    //    · 1 não começa com {.
    //    · 1 é uma expressão, mas não pode ser implicitamente convertida para S2.
    //    · x[0] possui elementos agregados.
    // 3. 0 não pode pertencer a x[0], portanto x[0] é substituído por x[0].s e x[0].t,
    //    a sequência de elementos agregados se torna (x[0].s, x[0].t, x[1]).
    // 4. Retoma a verificação de pertinência, mas 1 também não pode pertencer a x[0].s.
    // 5. A sequência de elementos agregados agora se torna (x[0].s.a, x[0].s.b, x[0].t, x[1]).
    // 6. Retoma a verificação de pertinência novamente:
    //    1 pertence a x[0].s.a, e 2 pertence a x[0].s.b.
    // 7. O restante da análise de pertinência funciona de forma semelhante.

    char cv[4] = {'a', 's', 'd', 'f', 0}; // Erro: muitas cláusulas de inicialização
```

### Processo de inicialização

#### Determinando o tipo de elemento

Os efeitos da inicialização de agregado são:

1) Determinar os _elementos explicitamente inicializados_ do agregado da seguinte forma:

    *   Se a lista de inicializadores for uma [lista de inicializadores designados](<#/doc/language/aggregate_initialization>) (o agregado só pode ser do tipo classe), o identificador em cada designador deve nomear um membro de dados não estático direto da classe, e os elementos explicitamente inicializados do agregado são os elementos que são, ou contêm, esses membros.

| (desde C++20)

    *   Caso contrário, se a lista de inicializadores não estiver vazia, os elementos explicitamente inicializados do agregado são os elementos com uma cláusula de inicialização pertinente e os elementos que possuem um subagregado com uma cláusula de inicialização pertinente.
    *   Caso contrário, a lista de inicializadores deve estar vazia ({}), e não há elementos explicitamente inicializados.

    O programa é malformado se o agregado for uma union e houver dois ou mais elementos explicitamente inicializados:
```cpp
    union u { int a; const char* b; };

    u a = {1};                   // OK: inicializa explicitamente o membro `a`
    u b = {0, "asdf"};           // erro: inicializa explicitamente dois membros
    u c = {"asdf"};              // erro: int não pode ser inicializado por "asdf"

    // Listas de inicializadores designados C++20
    u d = {.b = "asdf"};         // OK: pode inicializar explicitamente um membro não inicial
    u e = {.a = 1, .b = "asdf"}; // erro: inicializa explicitamente dois membros
```

2) Inicializa cada elemento do agregado na ordem dos elementos. Ou seja, todos os cálculos de valor e efeitos colaterais associados a um determinado elemento são [sequenciados antes](<#/doc/language/eval_order>) daqueles de qualquer elemento que o siga na ordem(desde C++11).

#### Elementos explicitamente inicializados

Para cada elemento explicitamente inicializado:

*   Se o elemento for um membro de union anônima e a lista de inicializadores for uma [lista de inicializadores designados](<#/doc/language/aggregate_initialization>), o elemento é inicializado pela lista de inicializadores designados {D}, onde `D` é a cláusula de inicialização designada que nomeia um membro do membro de union anônima. Deve haver apenas uma cláusula de inicialização designada.

```cpp
    struct C
    {
        union
        {
            int a;
            const char* p;
        };

        int x;
    } c = {.a = 1, .x = 3}; // inicializa c.a com 1 e c.x com 3
```

*   Caso contrário, se a lista de inicializadores for uma lista de inicializadores designados, o elemento é inicializado com o inicializador da cláusula de inicialização designada correspondente.

    *   Se esse inicializador for da [sintaxe (1)](<#/doc/language/initialization>), e uma conversão de estreitamento for necessária para converter a expressão, o programa é malformado.

| (desde C++20)

    *   A lista de inicializadores é uma lista de inicializadores entre chaves:

| (até C++20)

    *   Caso contrário, a lista de inicializadores é uma lista de inicializadores entre chaves não designada:

| (desde C++20)

    *   Se uma cláusula de inicialização pertence ao elemento agregado, então o elemento agregado é [inicializado por cópia](<#/doc/language/copy_initialization>) a partir da cláusula de inicialização.
    *   Caso contrário, o elemento agregado é inicializado por cópia a partir de uma lista de inicializadores entre chaves que consiste em todas as cláusulas de inicialização que pertencem a subobjetos do elemento agregado, na ordem de aparição.

```cpp
    struct A
    {
        int x;

        struct B
        {
            int i;
            int j;
        } b;
    } a = {1, {2, 3}}; // inicializa a.x com 1, a.b.i com 2, a.b.j com 3

    struct base1 { int b1, b2 = 42; };

    struct base2
    {
        base2()
        {
            b3 = 42;
        }

        int b3;
    };

    struct derived : base1, base2
    {
        int d;
    };

    derived d1{{1, 2}, {}, 4}; // inicializa d1.b1 com 1, d1.b2 com 2,
                               //             d1.b3 com 42, d1.d com 4
    derived d2{{}, {}, 4};     // inicializa d2.b1 com 0, d2.b2 com 42,
                               //             d2.b3 com 42, d2.d com 4
```

#### Elementos implicitamente inicializados

Para um agregado que não é uma union, cada elemento que não é um elemento explicitamente inicializado é inicializado da seguinte forma:

*   Se o elemento tiver um [inicializador de membro padrão](<#/doc/language/data_members>), o elemento é inicializado a partir desse inicializador.

| (desde C++11)

*   Caso contrário, se o elemento não for uma referência, o elemento é [inicializado por cópia](<#/doc/language/copy_initialization>) a partir de uma lista de inicializadores vazia.
*   Caso contrário, o programa é malformado.

```cpp
    struct S
    {
        int a;
        const char* b;
        int c;
        int d = b[a];
    };

    // inicializa ss.a com 1,
    //             ss.b com "asdf",
    //             ss.c com o valor de uma expressão do tipo int{} (ou seja, 0),
    //         e ss.d com o valor de ss.b[ss.a] (ou seja, 's')
    S ss = {1, "asdf"};
```

Se o agregado for uma union e a lista de inicializadores estiver vazia, então

*   Se qualquer membro variante tiver um inicializador de membro padrão, esse membro é inicializado a partir de seu inicializador de membro padrão.

| (desde C++11)

*   Caso contrário, o primeiro membro da union (se houver) é inicializado por cópia a partir de uma lista de inicializadores vazia.

### Arrays com limites desconhecidos

O número de elementos em um array de limite desconhecido inicializado com uma lista de inicializadores entre chaves é o número de elementos explicitamente inicializados do array. Um array de limite desconhecido não pode ser inicializado com {}.
```cpp
    int x[] = {1, 3, 5}; // x tem 3 elementos

    struct Y { int i, j, k; };

    Y y[] = {1, 2, 3, 4, 5, 6}; // y tem apenas 2 elementos:
                                // 1, 2 e 3 pertencem a y[0],
                                // 4, 5 e 6 pertencem a y[1]

    int z[] = {} // Erro: não é possível declarar um array sem nenhum elemento
```

### Inicializadores designados

As formas de sintaxe (3,4) são conhecidas como inicializadores designados: cada designador deve nomear um membro de dados não estático direto de T, e todos os designadores usados na expressão devem aparecer na mesma ordem que os membros de dados de T.
```cpp
    struct A { int x; int y; int z; };

    A a{.y = 2, .x = 1}; // erro; a ordem do designador não corresponde à ordem de declaração
    A b{.x = 1, .z = 2}; // ok, b.y inicializado para 0
```

Cada membro de dados não estático direto nomeado pelo inicializador designado é inicializado a partir do inicializador correspondente entre chaves ou com sinal de igual que segue o designador. Conversões de estreitamento são proibidas. O inicializador designado pode ser usado para inicializar uma [union](<#/doc/language/union>) em um estado diferente do primeiro. Apenas um inicializador pode ser fornecido para uma union.
```cpp
    union u { int a; const char* b; };

    u f = {.b = "asdf"};         // OK, o membro ativo da union é b
    u g = {.a = 1, .b = "asdf"}; // Erro, apenas um inicializador pode ser fornecido
```

Para um agregado que não é uma union, os elementos para os quais um inicializador designado não é fornecido são inicializados da mesma forma que descrito acima para quando o número de cláusulas de inicialização é menor que o número de membros (inicializadores de membro padrão onde fornecidos, inicialização por lista vazia caso contrário):
```cpp
    struct A
    {
        string str;
        int n = 42;
        int m = -1;
    };

    A{.m = 21} // Inicializa str com {}, que chama o construtor padrão
               // então inicializa n com = 42
               // então inicializa m com = 21
```

Se o agregado que é inicializado com uma cláusula de inicialização designada tiver um membro de union anônima, o inicializador designado correspondente deve nomear um dos membros dessa union anônima. Nota: inicialização designada fora de ordem, inicialização designada aninhada, mistura de inicializadores designados e inicializadores regulares, e inicialização designada de arrays são todos suportados na [linguagem de programação C](<#/>), mas não são permitidos em C++.
```cpp
    struct A { int x, y; };
    struct B { struct A a; };

    struct A a = {.y = 1, .x = 2}; // C válido, C++ inválido (fora de ordem)
    int arr[3] = {[1] = 5};        // C válido, C++ inválido (array)
    struct B b = {.a.x = 0};       // C válido, C++ inválido (aninhado)
    struct A a = {.x = 1, 2};      // C válido, C++ inválido (misto)
```

| (desde C++20)

### Arrays de caracteres

Arrays de tipos de caracteres comuns (char, signed char, unsigned char), char8_t(desde C++20), char16_t, char32_t(desde C++11), ou wchar_t podem ser inicializados a partir de [literais de string](<#/doc/language/string_literal>) comuns, literais de string UTF-8(desde C++20), literais de string UTF-16, literais de string UTF-32(desde C++11), ou literais de string wide, respectivamente, opcionalmente entre chaves. Adicionalmente, um array de char ou unsigned char pode ser inicializado por um literal de string UTF-8, opcionalmente entre chaves(desde C++20). Caracteres sucessivos do literal de string (que inclui o caractere nulo de terminação implícito) inicializam os elementos do array, com uma [conversão integral](<#/doc/language/implicit_cast>) se necessário para o valor de origem e destino(desde C++20). Se o tamanho do array for especificado e for maior que o número de caracteres no literal de string, os caracteres restantes são inicializados com zero.
```cpp
    char a[] = "abc";
    // equivalente a char a[4] = {'a', 'b', 'c', '\0'};

    //  unsigned char b[3] = "abc"; // Erro: string inicializadora muito longa
    unsigned char b[5]{"abc"};
    // equivalente a unsigned char b[5] = {'a', 'b', 'c', '\0', '\0'};

    wchar_t c[] = {L"кошка"}; // chaves opcionais
    // equivalente a wchar_t c[6] = {L'к', L'о', L'ш', L'к', L'а', L'\0'};
```

### Notas

Uma classe aggregate ou array pode incluir bases públicas não-aggregate(desde C++17), membros ou elementos, que são inicializados conforme descrito acima (por exemplo, inicialização por cópia a partir da cláusula de inicialização correspondente).

Até C++11, conversões de estreitamento eram permitidas na inicialização de agregado, mas não são mais permitidas.

Até C++11, a inicialização de agregado só podia ser usada na definição de variáveis e não podia ser usada em uma [lista de inicializadores de construtor](<#/doc/language/initializer_list>), uma [new-expression](<#/doc/language/new>), ou criação de objeto temporário devido a restrições de sintaxe.

Em C, um array de caracteres com tamanho um a menos que o tamanho do literal de string pode ser inicializado a partir de um literal de string; o array resultante não é terminado em nulo. Isso não é permitido em C++.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_aggregate_bases`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | Classes aggregate com classes base
[`__cpp_aggregate_nsdmi`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Classes aggregate com inicializadores de membro padrão
[`__cpp_aggregate_paren_init`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | Inicialização de agregado na forma de [inicialização direta](<#/doc/language/direct_initialization>)
[`__cpp_char8_t`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23)
(DR20) | Correção de compatibilidade e portabilidade de char8_t ([permite a inicialização de arrays de char (unsigned char)](<#/doc/language/aggregate_initialization>) a partir de [literais de string UTF-8](<#/doc/language/string_literal>))
[`__cpp_designated_initializers`](<#/doc/feature_test>) | [`201707L`](<#/>) | (C++20) | [Inicializadores designados](<#/doc/language/aggregate_initialization>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstdio>
    #include <string>

    struct S
    {
        int x;

        struct Foo
        {
            int i;
            int j;
            int a[3];
        } b;
    };

    int main()
    {
        S s1 = {1, {2, 3, {4, 5, 6}}};
        S s2 = {1, 2, 3, 4, 5, 6}; // o mesmo, mas com elisão de chaves
        S s3{1, {2, 3, {4, 5, 6}}}; // o mesmo, usando a sintaxe de inicialização direta por lista
        S s4{1, 2, 3, 4, 5, 6}; // erro até CWG 1270:
                                // elisão de chaves permitida apenas com sinal de igual

        int ar[] = {1, 2, 3}; // ar é int[3]
    //  char cr[3] = {'a', 'b', 'c', 'd'}; // muitas cláusulas de inicialização
        char cr[3] = {'a'}; // array inicializado como {'a', '\0', '\0'}

        int ar2d1[2][2] = {{1, 2}, {3, 4}}; // array 2D totalmente entre chaves: {1, 2}
                                            //                        {3, 4}
        int ar2d2[2][2] = {1, 2, 3, 4}; // elisão de chaves: {1, 2}
                                        //                {3, 4}
        int ar2d3[2][2] = {{1}, {2}};   // apenas a primeira coluna: {1, 0}
                                        //                    {2, 0}

        std::array<int, 3> std_ar2{{1, 2, 3}};  // std::array é um agregado
        std::array<int, 3> std_ar1 = {1, 2, 3}; // elisão de chaves ok

    //  int ai[] = {1, 2.0}; // conversão de estreitamento de double para int:
                             // erro em C++11, ok em C++03

        std::string ars[] = {std::string("one"), // inicialização por cópia
                             "two",              // conversão, depois inicialização por cópia
                             {'t', 'h', 'r', 'e', 'e'}}; // inicialização por lista
        union U
        {
            int a;
            const char* b;
        };
        U u1 = {1};         // OK, primeiro membro da union
    //  U u2 = {0, "asdf"}; // erro: muitos inicializadores para union
    //  U u3 = {"asdf"};    // erro: conversão inválida para int

         { std::puts("Garbage collecting unused variables... Done."); }
        (
            s1, s2, s3, s4, ar, cr, ar2d1, ar2d2, ar2d3, std_ar2, std_ar1, u1
        );
    }

    // agregado
    struct base1 { int b1, b2 = 42; };

    // não-agregado
    struct base2
    {
        base2() : b3(42) {}

        int b3;
    };

    // agregado em C++17
    struct derived : base1, base2 { int d; };

    derived d1{{1, 2}, {}, 4}; // d1.b1 = 1, d1.b2 = 2,  d1.b3 = 42, d1.d = 4
    derived d2{{}, {}, 4};     // d2.b1 = 0, d2.b2 = 42, d2.b3 = 42, d2.d = 4
```

Saída:
```
    Garbage collecting unused variables... Done.
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 413](<https://cplusplus.github.io/CWG/issues/413.html>) | C++98 | bit-fields anônimos eram inicializados na inicialização de agregado | eles são ignorados
[CWG 737](<https://cplusplus.github.io/CWG/issues/737.html>) | C++98 | quando um array de caracteres é inicializado com um literal de string tendo menos caracteres que o tamanho do array, os elementos de caracteres após o '\0' final não eram inicializados | eles são inicializados com zero
[CWG 1270](<https://cplusplus.github.io/CWG/issues/1270.html>) | C++11 | a elisão de chaves era permitida apenas na inicialização por cópia de lista | permitido em outros lugares
[CWG 1518](<https://cplusplus.github.io/CWG/issues/1518.html>) | C++11 | uma classe que declara um construtor padrão explícito ou tem construtores herdados deveria poder ser um agregado | não é um agregado
[CWG 1622](<https://cplusplus.github.io/CWG/issues/1622.html>) | C++98 | uma union não podia ser inicializada com {} | permitido
[CWG 2149](<https://cplusplus.github.io/CWG/issues/2149.html>)  
([P3106R1](<https://wg21.link/P3106R1>))  | C++98 | não estava claro se a elisão de chaves é aplicável durante a dedução do tamanho do array | aplicável
---|---|---|---
[CWG 2272](<https://cplusplus.github.io/CWG/issues/2272.html>) | C++98 | um membro de referência não estático que não é explicitamente inicializado era inicializado por cópia a partir de uma lista de inicializadores vazia | o programa é malformado neste caso
[CWG 2610](<https://cplusplus.github.io/CWG/issues/2610.html>) | C++17 | tipos aggregate não podiam ter classes base indiretas privadas ou protegidas | permitido
[CWG 2619](<https://cplusplus.github.io/CWG/issues/2619.html>) | C++20 | o tipo de inicialização a partir de inicializadores designados não estava claro | depende do tipo de inicializador
[P2513R4](<https://wg21.link/P2513R4>) | C++20 | um literal de string UTF-8 não podia inicializar um array de char ou unsigned char, o que era incompatível com C ou C++17 | tal inicialização é válida

### Veja também

*   [elisão de cópia](<#/doc/language/copy_elision>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização por lista](<#/doc/language/list_initialization>)
    *   [inicialização de referência](<#/doc/language/reference_initialization>)
    *   [inicialização por valor](<#/doc/language/value_initialization>)
    *   [inicialização por zero](<#/doc/language/zero_initialization>)

[documentação C](<#/>) para inicialização de struct e union
---