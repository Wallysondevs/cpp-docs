# Inicialização de referência
Associa uma referência a um objeto.

### Sintaxe
##### Inicialização não-por-lista
---
T ﻿`&` ref `=` target `;`
T ﻿`&` ref `(` target `);` | (1) |
T ﻿`& &` ref `=` target `;`
T ﻿`& &` ref `(` target `);` | (2) | (desde C++11)
---|---|---
func-refpar `(` target `)` | (3) |
`return` target `;` | (4) | (dentro da definição de func-refret ﻿)
Class`::` Class`(`...`) :` ref-member `(` target `) {` ... `}` | (5) | (dentro da definição de Class ﻿)

##### Inicialização por lista ordinária (desde C++11)
---
T ﻿`&` ref `= {` arg1`,` arg2`,` ... `};`
T ﻿`&` ref `{` arg1`,` arg2`,` ... `};` | (1) |
T ﻿`& &` ref `= {` arg1`,` arg2`,` ... `};`
T ﻿`& &` ref `{` arg1`,` arg2`,` ... `};` | (2) |
---|---|---
func-refpar `({` arg1`,` arg2`,` ... `});` | (3) |

##### Inicialização por lista designada (desde C++20)
---
T ﻿`&` ref `= {.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};`
T ﻿`&` ref `{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};` | (1) |
T ﻿`& &` ref `= {.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};`
T ﻿`& &` ref `{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};` | (2) |
---|---|---
func-refpar `({.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `});` | (3) |

Uma referência a `T` pode ser inicializada com um objeto do tipo `T`, uma função do tipo `T`, ou um objeto implicitamente conversível para `T`. Uma vez inicializada, uma referência não pode ser reassociada (alterada) para referir-se a outro objeto.

Referências são inicializadas nas seguintes situações:

1) Quando uma variável de [referência lvalue](<#/doc/language/reference>) nomeada é declarada com um inicializador.

2) Quando uma variável de [referência rvalue](<#/doc/language/reference>) nomeada é declarada com um inicializador.

3) Em uma expressão de chamada de função, quando o parâmetro da função tem tipo de referência.

4) Na instrução `return`, quando a função retorna um tipo de referência. O programa é malformado se a referência retornada estiver associada ao resultado de uma [expressão temporária](<#/doc/language/reference_initialization>).(desde C++26)

5) Quando um [membro de dados não-estático](<#/doc/language/data_members>) do tipo referência é inicializado usando um [inicializador de membro](<#/doc/language/initializer_list>).

### Explicação
- **T** — o tipo referenciado
- **ref** — a variável de referência a ser inicializada
- **target** — a expressão inicializadora sendo usada
- **func-refpar** — uma função com um parâmetro do tipo referência (T ﻿`&` ou T ﻿`&&`(desde C++11))
- **func-refret** — uma função cujo tipo de retorno é um tipo de referência (T ﻿`&` ou T ﻿`&&`(desde C++11))
- **Class** — um nome de classe
- **ref-member** — um membro de dados não-estático do tipo referência (T ﻿`&` ou T ﻿`&&`(desde C++11)) de Class
- **des1, des2, ...** — designadores
- **arg1, arg2, ...** — os inicializadores em listas de inicializadores

### Definições
Para dois tipos `T1` e `T2`:

*   Dadas as versões cv-não-qualificadas de `T1` e `T2` como `U1` e `U2` respectivamente, se `U1` é [similar](<#/doc/language/implicit_cast>) a `U2`, ou `U1` é uma [classe base](<#/doc/language/derived_class>) de `U2`, `T1` é _relacionado por referência_ a `T2`.
*   Se um prvalue do tipo "ponteiro para `T2`" pode ser convertido para o tipo "ponteiro para `T1`" via uma sequência de conversão padrão, `T1` é _compatível por referência_ com `T2`.

### Regras de inicialização
Se uma inicialização de referência usa uma inicialização por lista ordinária ou designada (desde C++20), as regras de [inicialização por lista](<#/doc/language/list_initialization>) são seguidas. | (desde C++11)

Para inicialização de referência não-por-lista, dado o tipo de `target` como `U`, a referência _associa-se diretamente_ a `target` ou associa-se a um valor do tipo `T` convertido de `target`. A associação direta é considerada primeiro, seguida pela associação indireta; se nenhuma associação estiver disponível, o programa é malformado.

Em todos os casos onde a relação de compatibilidade por referência de dois tipos é usada para estabelecer a validade de uma associação de referência e a sequência de conversão padrão seria malformada, um programa que necessita de tal associação é malformado.

#### Associação direta
Se todas as seguintes condições forem satisfeitas:

*   A referência a ser inicializada é uma referência lvalue.
*   `target` é um lvalue não-[bit-field](<#/doc/language/bit_field>).
*   `T` é compatível por referência com `U`.

Então a referência associa-se a `target`, ou ao seu subobjeto de classe base apropriado:
```cpp
    double d = 2.0;
    double& rd = d;        // rd refere-se a d
    const double& rcd = d; // rcd refere-se a d
    
    struct A {};
    struct B : A {} b;
    
    A& ra = b;             // ra refere-se ao subobjeto A em b
    const A& rca = b;      // rca refere-se ao subobjeto A em b
```

Caso contrário, se todas as seguintes condições forem satisfeitas:

*   A referência a ser inicializada é uma referência lvalue.
*   `U` é um tipo de classe.
*   `T` não é relacionado por referência a `U`.
*   `target` pode ser convertido para um lvalue do tipo `V` tal que `T` é compatível por referência com `V`.

Então a referência associa-se ao resultado lvalue da conversão, ou ao seu subobjeto de classe base apropriado:
```cpp
    struct A {};
    struct B : A { operator int&(); };
    
    int& ir = B(); // ir refere-se ao resultado de B::operator int&
```

Caso contrário, se a referência a ser inicializada é uma referência lvalue, e `T` não é qualificado como `const` ou é qualificado como `volatile`, o programa é malformado:
```cpp
    double& rd2 = 2.0; // erro: não é um lvalue e a referência não é const
    int i = 2;
    double& rd3 = i;   // erro: incompatibilidade de tipo e a referência não é const
```

Caso contrário, se todas as seguintes condições forem satisfeitas:

*   `target` é um valor de qualquer uma das seguintes categorias:

    *   rvalue | (até C++11)

    *   xvalue não-bit-field
    *   prvalue de classe
    *   prvalue de array
    *   lvalue de função | (desde C++11)
    (até C++17)

    *   rvalue não-bit-field
    *   lvalue de função | (desde C++17)

*   `T` é compatível por referência com `U`.

Então a referência associa-se a `target`, ou ao seu subobjeto de classe base apropriado:
```cpp
    struct A {};
    struct B : A {};
    extern B f();
    
    const A& rca2 = f(); // associado ao subobjeto A do rvalue B.
    A&& rra = f();       // o mesmo que acima
    
    int i2 = 42;
    int&& rri = static_cast<int&&>(i2); // associa diretamente a i2
```

Se `target` é um prvalue, a [materialização temporária](<#/doc/language/implicit_cast>) é aplicada a ele, considerando o tipo do prvalue como sendo o tipo ajustado `P`.

*   `P` é [ajustado](<#/doc/language/implicit_cast>) a partir do tipo de `target` (ou seja, `U`) adicionando a qualificação cv de `T` a ele.

Neste caso, a referência associa-se ao objeto resultante, ou ao seu subobjeto de classe base apropriado. | (desde C++17)

Caso contrário, se todas as seguintes condições forem satisfeitas:

*   `U` é um tipo de classe.
*   `T` não é relacionado por referência a `U`.
*   `target` pode ser convertido para um valor `v` do tipo `V` tal que `T` é compatível por referência com `V`, onde `v` é de qualquer uma das seguintes categorias:

    *   rvalue | (até C++11)

    *   xvalue
    *   prvalue de classe
    *   lvalue de função | (desde C++11)
    (até C++17)

    *   rvalue
    *   lvalue de função | (desde C++17)

Então a referência associa-se ao resultado da conversão, ou ao seu subobjeto de classe base apropriado:
```cpp
    struct A {};
    struct B : A {};
    struct X { operator B(); } x;
    
    const A& r = x; // associado ao subobjeto A do resultado da conversão
    B&& rrb = x;    // associado diretamente ao resultado da conversão
```

Se o resultado da conversão é um prvalue, a [materialização temporária](<#/doc/language/implicit_cast>) é aplicada a ele, considerando o tipo do prvalue como sendo o tipo ajustado `P`.

*   `P` é [ajustado](<#/doc/language/implicit_cast>) a partir do tipo do resultado da conversão adicionando a qualificação cv de `T` a ele.

Neste caso, a referência associa-se ao objeto resultante, ou ao seu subobjeto de classe base apropriado. | (desde C++17)

#### Associação indireta
Se a associação direta não estiver disponível, a associação indireta é considerada. Neste caso, `T` não pode ser relacionado por referência a `U`.

Se `T` ou `U` é um tipo de classe, conversões definidas pelo usuário são consideradas usando as regras para [inicialização por cópia](<#/doc/language/copy_initialization>) de um objeto do tipo `T` por conversão definida pelo usuário. O programa é malformado se a inicialização por cópia não-referência correspondente seria malformada. O resultado da chamada para a função de conversão, conforme descrito para a [inicialização por cópia](<#/doc/language/copy_initialization>) não-referência, é então usado para inicializar diretamente a referência. Para esta inicialização direta, conversões definidas pelo usuário não são consideradas.

Caso contrário, um temporário do tipo `T` é criado e inicializado por cópia a partir de `target`. A referência é então associada ao temporário. | (até C++17)
---|---
Caso contrário, `target` é implicitamente convertido para um prvalue do tipo "cv-não-qualificado `T`". A conversão de materialização temporária é aplicada, considerando o tipo do prvalue como `T`, e a referência é associada ao objeto resultante. | (desde C++17)
```cpp
    const std::string& rs = "abc"; // rs refere-se a um temporário inicializado por cópia a partir de um array de char
    const double& rcd2 = 2;        // rcd2 refere-se a um temporário com valor 2.0
    int i3 = 2;
    double&& rrd3 = i3;            // rrd3 refere-se a um temporário com valor 2.0
```

### Tempo de vida de um temporário
Sempre que uma referência é associada a um objeto temporário ou a um subobjeto dele, o tempo de vida do objeto temporário é estendido para corresponder ao tempo de vida da referência (verificar [exceções de tempo de vida de objeto temporário](<#/doc/language/lifetime>)), onde o objeto temporário ou seu subobjeto é denotado por uma das seguintes expressões:

*   uma expressão [prvalue](<#/doc/language/value_category>) de um tipo de objeto, | (até C++17)

*   uma [conversão de materialização temporária](<#/doc/language/implicit_cast>), | (desde C++17)

*   uma expressão entre parênteses (e), onde e é uma dessas expressões,
*   uma [expressão de subscrito embutida](<#/doc/language/operator_member_access>) da forma a[n] ou n[a], onde a é um array e é uma dessas expressões,
*   uma [expressão de acesso a membro de classe](<#/doc/language/operator_member_access>) da forma e.m, onde e é uma dessas expressões e m designa um membro de dados não-estático do tipo objeto,
*   uma [operação de ponteiro para membro](<#/doc/language/operator_member_access>) da forma e.*mp, onde e é uma dessas expressões e mp é um ponteiro para membro de dados,
*   uma conversão [`const_cast`](<#/doc/language/const_cast>), [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), ou [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) sem uma conversão definida pelo usuário que converte uma dessas expressões para o glvalue refere-se ao objeto designado pelo operando, ou ao seu objeto completo ou um subobjeto dele (uma expressão de [cast explícito](<#/doc/language/explicit_cast>) é interpretada como uma sequência desses casts),
*   uma [expressão condicional](<#/doc/language/operator_other>) da forma cond ? e1 : e2 que é um glvalue, onde e1 ou e2 é uma dessas expressões, ou
*   uma [expressão de vírgula embutida](<#/doc/language/operator_other>) da forma x, e que é um glvalue, onde e é uma dessas expressões.

Existem as seguintes exceções a esta regra de tempo de vida:

*   um temporário associado a um valor de retorno de uma função em uma instrução `return` não é estendido: ele é destruído imediatamente no final da expressão `return`. Tal instrução `return` sempre retorna uma referência pendente (dangling reference). | (até C++26)

*   um temporário associado a um parâmetro de referência em uma chamada de função existe até o final da expressão completa que contém essa chamada de função: se a função retorna uma referência, que sobrevive à expressão completa, ela se torna uma referência pendente.

*   um temporário associado a uma referência no inicializador usado em uma new-expression existe até o final da expressão completa que contém essa new-expression, e não enquanto o objeto inicializado. Se o objeto inicializado sobrevive à expressão completa, seu membro de referência se torna uma referência pendente. | (desde C++11)

*   um temporário associado a uma referência em um elemento de referência de um agregado inicializado usando a sintaxe de [inicialização direta](<#/doc/language/direct_initialization>) **(** parênteses**)** existe até o final da expressão completa que contém o inicializador, em oposição à sintaxe de [inicialização por lista](<#/doc/language/list_initialization>) **{** chaves**}**.
```cpp
    struct A
    {
        int&& r;
    };
    
    A a1{7}; // OK, tempo de vida é estendido
    A a2(7); // bem-formado, mas referência pendente
```
| (desde C++20)

Em geral, o tempo de vida de um temporário não pode ser estendido ainda mais "passando-o adiante": uma segunda referência, inicializada a partir da variável de referência ou membro de dados ao qual o temporário foi associado, não afeta seu tempo de vida.

### Notas
Referências aparecem sem inicializadores apenas na declaração de parâmetros de função, na declaração do tipo de retorno de função, na declaração de um membro de classe e com o especificador [`extern`](<#/doc/language/storage_duration>).

Até a resolução do [problema CWG 1696](<https://cplusplus.github.io/CWG/issues/1696.html>), um temporário era permitido ser associado a um membro de referência em uma [lista de inicializadores](<#/doc/language/initializer_list>) de construtor, e persistia apenas até o construtor sair, e não enquanto o objeto existisse. Tal inicialização é malformada desde [CWG 1696](<https://cplusplus.github.io/CWG/issues/1696.html>), embora muitos compiladores ainda a suportem (uma exceção notável é o clang).

### Exemplo
Execute este código
```cpp
    #include <sstream>
    #include <utility>
    
    struct S
    {
        int mi;
        const std::pair<int, int>& mp; // membro de referência
    };
    
    void foo(int) {}
    
    struct A {};
    
    struct B : A
    {
        int n;
        operator int&() { return n; }
    };
    
    B bar() { return B(); }
    
    //int& bad_r;      // erro: sem inicializador
    extern int& ext_r; // OK
    
    int main()
    {
    //  Lvalues
        int n = 1;
        int& r1 = n;                    // referência lvalue para o objeto n
        const int& cr(n);               // a referência pode ser mais cv-qualificada
        volatile int& cv{n};            // qualquer sintaxe de inicializador pode ser usada
        int& r2 = r1;                   // outra referência lvalue para o objeto n
    //  int& bad = cr;                  // erro: menos cv-qualificada
        int& r3 = const_cast<int&>(cr); // const_cast é necessário
    
        void (&rf)(int) = foo; // referência lvalue para função
        int ar[3];
        int (&ra)[3] = ar;     // referência lvalue para array
    
        B b;
        A& base_ref = b;        // referência para subobjeto base
        int& converted_ref = b; // referência para o resultado de uma conversão
    
    //  Rvalues
    //  int& bad = 1;        // erro: não pode associar referência lvalue a rvalue
        const int& cref = 1; // associado a rvalue
        int&& rref = 1;      // associado a rvalue
    
        const A& cref2 = bar(); // referência para subobjeto A de temporário B
        A&& rref2 = bar();      // o mesmo
    
        int&& xref = static_cast<int&&>(n); // associa diretamente a n
    //  int&& copy_ref = n;                 // erro: não pode associar a um lvalue
        double&& copy_ref = n;              // associa a um temporário rvalue com valor 1.0
    
    //  Restrições no tempo de vida de temporários
    //  std::ostream& buf_ref = std::ostringstream() << 'a';
                         // o temporário ostringstream foi associado ao operando esquerdo
                         // de operator<< mas seu tempo de vida terminou no ponto e vírgula, então
                         // buf_ref é uma referência pendente
    
        S a {1, {2, 3}}; // par temporário {2, 3} associado ao membro de referência
                         // a.mp e seu tempo de vida é estendido para corresponder
                         // ao tempo de vida do objeto a
    
        S* p = new S{1, {2, 3}}; // par temporário {2, 3} associado à referência
                                 // membro p->mp, mas seu tempo de vida terminou no ponto e vírgula
                                 // p->mp é uma referência pendente
        delete p;
    
        // Imitate [[maybe_unused]] applied to the following variables:
        {}
        (
            cv, r2, r3, rf, ra, base_ref, converted_ref,
            a, cref, rref, cref2, rref2, copy_ref, xref
        );
    }
```

### Relatórios de defeitos
Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 391](<https://cplusplus.github.io/CWG/issues/391.html>) | C++98 | inicializar uma referência a um tipo qualificado como const com um rvalue de tipo de classe poderia criar um temporário, e um construtor dessa classe era necessário para copiar o rvalue para esse temporário | nenhum temporário é criado, construtor não é necessário
[CWG 450](<https://cplusplus.github.io/CWG/issues/450.html>) | C++98 | uma referência a um array qualificado como const não podia ser inicializada com um rvalue de array compatível por referência | permitido
[CWG 589](<https://cplusplus.github.io/CWG/issues/589.html>) | C++98 | uma referência não podia associar-se diretamente a um rvalue de array ou classe | permitido
[CWG 656](<https://cplusplus.github.io/CWG/issues/656.html>) | C++98 | uma referência a um tipo qualificado como const inicializada com um tipo que não é compatível por referência, mas tem uma função de conversão para um tipo compatível por referência, era associada a um temporário copiado do valor de retorno (ou seu subobjeto de classe base) da função de conversão | associada diretamente ao valor de retorno (ou seu subobjeto de classe base)
[CWG 1287](<https://cplusplus.github.io/CWG/issues/1287.html>) | C++11 | a conversão de um `target` de tipo de classe para outro tipo compatível por referência só podia ser implícita | permite conversões explícitas
[CWG 1295](<https://cplusplus.github.io/CWG/issues/1295.html>) | C++11 | uma referência podia associar-se a um xvalue bit-field | proibido
[CWG 1299](<https://cplusplus.github.io/CWG/issues/1299.html>) | C++98 | a definição de temporário era pouco clara | tornada clara
[CWG 1571](<https://cplusplus.github.io/CWG/issues/1571.html>) | C++98 | conversões definidas pelo usuário na associação indireta não consideravam o tipo de `target` | considerado
[CWG 1604](<https://cplusplus.github.io/CWG/issues/1604.html>) | C++98 | conversões definidas pelo usuário não eram consideradas na associação indireta | consideradas
[CWG 2352](<https://cplusplus.github.io/CWG/issues/2352.html>) | C++98 | a compatibilidade por referência não considerava conversões de qualificação | considerada
[CWG 2481](<https://cplusplus.github.io/CWG/issues/2481.html>) | C++17 | a qualificação cv não era adicionada ao tipo resultante da materialização temporária na associação indireta | adicionada
[CWG 2657](<https://cplusplus.github.io/CWG/issues/2657.html>) | C++17 | a qualificação cv não era adicionada ao tipo resultante da materialização temporária na associação direta | adicionada
[CWG 2801](<https://cplusplus.github.io/CWG/issues/2801.html>) | C++98 | tipos relacionados por referência eram permitidos para associação indireta | proibido

### Ver também
*   [construtor](<#/doc/language/initializer_list>)
*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [atribuição por cópia](<#/doc/language/as_operator>)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização por cópia](<#/doc/language/copy_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [inicialização por lista](<#/doc/language/list_initialization>)
*   [atribuição por movimento](<#/doc/language/move_operator>)
*   [construtor de movimento](<#/doc/language/move_constructor>)
*   [`new`](<#/doc/language/new>)

*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão