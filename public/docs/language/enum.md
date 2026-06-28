# Declaração de enumeração

Uma _enumeração_ é um tipo distinto cujo valor é restrito a um intervalo de valores (veja detalhes abaixo), que pode incluir várias constantes explicitamente nomeadas ("_enumeradores_").

Os valores das constantes são valores de um tipo integral conhecido como _tipo subjacente_ da enumeração. Uma enumeração tem o mesmo [tamanho](<#/doc/language/sizeof>), [representação de valor](<#/doc/language/objects>) e [requisitos de alinhamento](<#/doc/language/objects>) que seu tipo subjacente. Além disso, cada valor de uma enumeração tem a mesma representação que o valor correspondente do tipo subjacente.

Uma enumeração é (re)declarada usando a seguinte sintaxe:

---
enum-key attr ﻿(optional) enum-head-name ﻿(optional) enum-base ﻿(optional)
`{` enumerator-list ﻿(optional) `}` | (1) |
enum-key attr ﻿(optional) enum-head-name ﻿(optional) enum-base ﻿(optional)
`{` enumerator-list `, }` | (2) |
---|---|---
enum-key attr ﻿(optional) enum-head-name enum-base ﻿(optional) `;` | (3) | (desde C++11)

1) enum-specifier, que aparece na decl-specifier-seq da sintaxe de [declaração](<#/doc/language/declarations>): define o tipo de enumeração e seus enumeradores.

2) Uma vírgula final pode seguir a lista de enumeradores.

3) Declaração de enumeração opaca: define o tipo de enumeração, mas não seus enumeradores: após esta declaração, o tipo é um tipo completo e seu tamanho é conhecido.

- **enum-key** — | `enum` | (até C++11)
one of `enum`, `enum class`, or `enum struct` | (desde C++11)
- **attr** — (desde C++11) sequência opcional de qualquer número de [atributos](<#/doc/language/attributes>)
- **enum-head-name** — | o nome da enumeração que está sendo declarada, pode ser omitido. | (até C++11)
```cpp
o nome da enumeração que está sendo declarada, opcionalmente precedido por um nested-name-specifier: sequência de nomes e operadores de resolução de escopo `::`, terminando com o operador de resolução de escopo. Ele só pode ser omitido em declarações de enumeração não opacas sem escopo.
nested-name-specifier só pode aparecer se o nome da enumeração estiver presente e esta declaração for uma redeclaração. Para declarações de enumeração opacas, nested-name-specifier só pode aparecer antes do nome da enumeração em declarações de especialização explícita.
Se nested-name-specifier estiver presente, o _enum-specifier_ não pode se referir a uma enumeração meramente herdada ou introduzida por uma declaração using, e o _enum-specifier_ só pode aparecer em um namespace que envolva a declaração anterior. Nesses casos, nested-name-specifier não pode começar com um especificador decltype.  // (desde C++11)
```
- **enum-base** — (desde C++11) dois pontos (`:`), seguido por uma type-specifier-seq que nomeia um tipo integral (se for cv-qualificado, as qualificações são ignoradas) que servirá como o tipo subjacente fixo para este tipo de enumeração
- **enumerator-list** — lista de definições de enumeradores separadas por vírgulas, cada uma das quais é simplesmente um identificador único, que se torna o nome do enumerador, ou um identificador único com uma expressão constante: identifier `=` constant-expression. Em ambos os casos, o identificador pode ser diretamente seguido por uma [sequência de especificadores de atributo](<#/doc/language/attributes>) opcional.(desde C++17)

Existem dois tipos distintos de enumerações: _enumeração sem escopo_ (declarada com a enum-key `enum`) e _enumeração com escopo_ (declarada com a enum-key `enum class` ou `enum struct`).

### Enumerações sem escopo

---
`enum` name ﻿(optional) `{` enumerator `=` constant-expression `,` enumerator `=` constant-expression `,` ... `}` | (1) |
---|---|---
`enum` name ﻿(optional) `:` type `{` enumerator `=` constant-expression `,` enumerator `=` constant-expression `,` ... `}` | (2) | (desde C++11)
`enum` name `:` type `;` | (3) | (desde C++11)

1) Declara um tipo de enumeração sem escopo cujo tipo subjacente não é fixo (neste caso, o tipo subjacente é um tipo integral definido pela implementação que pode representar todos os valores do enumerador; este tipo não é maior que int, a menos que o valor de um enumerador não possa caber em um int ou unsigned int. Se a lista de enumeradores estiver vazia, o tipo subjacente é como se a enumeração tivesse um único enumerador com valor ​0​. Se nenhum tipo integral puder representar todos os valores do enumerador, a enumeração é malformada).

2) Declara um tipo de enumeração sem escopo cujo tipo subjacente é fixo.

3) A declaração de enumeração opaca para uma enumeração sem escopo deve especificar o nome e o tipo subjacente.

Cada enumerador torna-se uma constante nomeada do tipo da enumeração (ou seja, nome), visível no escopo envolvente, e pode ser usado sempre que constantes forem necessárias.
```
    enum Color { red, green, blue };
    Color r = red;
     
    switch(r)
    {
        case red  : std::cout << "red\n";   break;
        case green: std::cout << "green\n"; break;
        case blue : std::cout << "blue\n";  break;
    }
```

Cada enumerador é associado a um valor do tipo subjacente. Quando `=` são fornecidos em uma lista de enumeradores, os valores dos enumeradores são definidos por essas expressões-constantes associadas. Se o primeiro enumerador não tiver `=`, o valor associado é zero. Para qualquer outro enumerador cuja definição não tenha um `=`, o valor associado é o valor do enumerador anterior mais um.
```
    enum Foo { a, b, c = 10, d, e = 1, f, g = f + c };
    //a = 0, b = 1, c = 10, d = 11, e = 1, f = 2, g = 12
```

O nome de uma enumeração sem escopo pode ser omitido: tal declaração apenas introduz os enumeradores no escopo envolvente:
```
    enum { a, b, c = 0, d = a + 2 }; // defines a = 0, b = 1, c = 0, d = 2
```

Quando uma enumeração sem escopo é um membro de classe, seus enumeradores podem ser acessados usando os operadores de acesso a membros de classe `.` e `- >`:
```
    struct X
    {
        enum direction { left = 'l', right = 'r' };
    };
    X x;
    X* p = &x;
     
    int a = X::direction::left; // allowed only in C++11 and later
    int b = X::left;
    int c = x.left;
    int d = p->left;
```

Nos [especificadores de declaração](<#/doc/language/declarations>) de uma [declaração de membro](<#/doc/language/class>), a sequência

    `enum` enum-head-name `:`
é sempre analisada como parte da declaração de enumeração:
```
    struct S
    {
        enum E1 : int {};
        enum E1 : int {}; // error: redeclaration of enumeration,
                          // NOT parsed as a zero-length bit-field of type enum E1
    };
     
    enum E2 { e1 };
     
    void f()
    {
        false ? new enum E2 : int(); // OK: 'int' is NOT parsed as the underlying type
    }
```

| (desde C++11)

#### Nome da enumeração para fins de linkage

Uma enumeração sem nome que não possui um [nome typedef para fins de linkage](<#/doc/language/typedef>) e que possui um enumerador é denotada, para [fins de linkage](<#/doc/language/storage_duration>), por seu tipo subjacente e seu primeiro enumerador; tal enumeração é dita ter um enumerador como um _nome para fins de linkage_.

### Enumerações com escopo

|
---
`enum struct|class` name `{` enumerator `=` constant-expression `,` enumerator `=` constant-expression `,` ... `}` | (1) |
---|---|---|---
`enum struct|class` name `:` type `{` enumerator `=` constant-expression `,` enumerator `=` constant-expression `,` ... `}` | (2) |
`enum struct|class` name `;` | (3) |
`enum struct|class` name `:` type `;` | (4) |

1) declara um tipo de enumeração com escopo cujo tipo subjacente é int (as palavras-chave class e struct são exatamente equivalentes)

2) declara um tipo de enumeração com escopo cujo tipo subjacente é type

3) declaração de enumeração opaca para uma enumeração com escopo cujo tipo subjacente é int

4) declaração de enumeração opaca para uma enumeração com escopo cujo tipo subjacente é type

Cada enumerador torna-se uma constante nomeada do tipo da enumeração (ou seja, nome), que está contida no escopo da enumeração, e pode ser acessada usando o operador de resolução de escopo. Não há conversões implícitas dos valores de um enumerador com escopo para tipos integrais, embora [`static_cast`](<#/doc/language/static_cast>) possa ser usado para obter o valor numérico do enumerador.

Execute este código
```
    #include <iostream>
     
    int main()
    {
        enum class Color { red, green = 20, blue };
        Color r = Color::blue;
     
        switch(r)
        {
            case Color::red  : std::cout << "red\n";   break;
            case Color::green: std::cout << "green\n"; break;
            case Color::blue : std::cout << "blue\n";  break;
        }
     
        // int n = r; // error: no implicit conversion from scoped enum to int
        int n = static_cast<int>(r); // OK, n = 21
        std::cout << n << '\n'; // prints 21
    }
```

(desde C++11)

Uma enumeração pode ser inicializada a partir de um inteiro sem um cast, usando [inicialização por lista](<#/doc/language/list_initialization>), se todas as seguintes condições forem verdadeiras:

  * A inicialização é direct-list-initialization.
  * A lista de inicializadores tem apenas um único elemento.
  * A enumeração tem escopo ou não tem escopo com tipo subjacente fixo.
  * A conversão não é de estreitamento.

Isso torna possível introduzir novos tipos inteiros (por exemplo, `SafeInt`) que desfrutam das mesmas convenções de chamada existentes que seus tipos inteiros subjacentes, mesmo em ABIs que penalizam a passagem/retorno de estruturas por valor.
```
    enum byte : unsigned char {}; // byte é um novo tipo inteiro; veja também std::byte (C++17)
    byte b{42};        // OK a partir de C++17 (direct-list-initialization)
    byte c = {42};     // error
    byte d = byte{42}; // OK a partir de C++17; mesmo valor que b
    byte e{-1};        // error
     
    struct A { byte b; };
    A a1 = {{42}};     // error (copy-list-initialization de um parâmetro de construtor)
    A a2 = {byte{42}}; // OK a partir de C++17
     
    void f(byte);
    f({42}); // error (copy-list-initialization de um parâmetro de função)
     
    enum class Handle : std::uint32_t { Invalid = 0 };
    Handle h{42}; // OK a partir de C++17
```

| (desde C++17)

### Declaração `using enum`

|
---
```cpp
`using enum` using-enum-declarator `;`  // (desde C++20)
```
- **declarator** — um [identificador](<#/doc/language/name>) (possivelmente qualificado) ou [identificadores de template simples](<#/doc/language/templates>)

declarator deve nomear um tipo de enumeração não-[dependente](<#/doc/language/dependent_name>). As declarações de enumeração são encontradas por lookup [qualificado](<#/doc/language/qualified_lookup>) ou [não qualificado](<#/doc/language/unqualified_lookup>) ordinário, apenas por tipo, dependendo se o declarator é qualificado.
```
    enum E { x };
     
    void f()
    {
        int E;
        using enum E; // OK
    }
     
    using F = E;
    using enum F; // OK
     
    template<class T>
    using EE = T;
     
    void g()
    {
        using enum EE<E>; // OK
    }
```

Uma declaração `using enum` introduz os nomes dos enumeradores da enumeração nomeada como se fosse por uma [declaração using](<#/doc/language/using_declaration>) para cada enumerador. Quando em escopo de classe, uma declaração `using enum` adiciona os enumeradores da enumeração nomeada como membros ao escopo, tornando-os acessíveis para lookup de membros.
```
    enum class fruit { orange, apple };
     
    struct S
    {
        using enum fruit; // OK: introduz orange e apple em S
    };
     
    void f()
    {
        S s;
        s.orange;  // OK: nomeia fruit::orange
        S::orange; // OK: nomeia fruit::orange
    }
```

Duas declarações `using enum` que introduzem dois enumeradores com o mesmo nome entram em conflito.
```
    enum class fruit { orange, apple };
    enum class color { red, orange };
     
    void f()
    {
        using enum fruit;    // OK
        // using enum color; // error: color::orange and fruit::orange conflict
    }
```

(desde C++20)

### Notas

Valores de tipo de enumeração sem escopo podem ser [promovidos](<#/doc/language/implicit_cast>) ou [convertidos](<#/doc/language/implicit_cast>) para tipos integrais:
```
    enum color { red, yellow, green = 20, blue };
    color col = red;
    int n = blue; // n == 21
```

Valores de tipos inteiros, de ponto flutuante e de enumeração podem ser convertidos para qualquer tipo de enumeração usando [`static_cast`](<#/doc/language/static_cast>). Note que o valor após tal conversão pode não ser necessariamente igual a nenhum dos enumeradores nomeados definidos para a enumeração:
```
    enum access_t { read = 1, write = 2, exec = 4 }; // enumeradores: 1, 2, 4 intervalo: 0..7
    access_t rwe = static_cast<access_t>(7);
    assert((rwe & read) && (rwe & write) && (rwe & exec));
     
    access_t x = static_cast<access_t>(8.0); // comportamento indefinido desde CWG 1766
    access_t y = static_cast<access_t>(8);   // comportamento indefinido desde CWG 1766
     
    enum foo { a = 0, b = UINT_MAX }; // intervalo: [0, UINT_MAX]
    foo x = foo(-1); // comportamento indefinido desde CWG 1766,
                     // mesmo que o tipo subjacente de foo seja unsigned int
```

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_enumerator_attributes`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [Atributos](<#/doc/language/attributes>) para enumeradores
[`__cpp_using_enum`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [`using enum`](<#/doc/language/enum>)

### Palavras-chave

[`enum`](<#/doc/keyword/enum>), [`struct`](<#/doc/keyword/struct>), [`class`](<#/doc/keyword/class>), [`using`](<#/doc/keyword/using>)

### Exemplo

Execute este código
```
    #include <cstdint>
    #include <iostream>
     
    // enum que ocupa 16 bits
    enum smallenum: std::int16_t
    {
        a,
        b,
        c
    };
     
    // color pode ser red (valor 0), yellow (valor 1), green (valor 20), ou blue (valor 21)
    enum color
    {
        red,
        yellow,
        green = 20,
        blue
    };
     
    // altitude pode ser altitude::high ou altitude::low
    enum class altitude: char
    {
        high = 'h',
        low = 'l', // vírgula final permitida apenas após CWG 518
    };
     
    // a constante d é 0, a constante e é 1, a constante f é 3
    enum
    {
        d,
        e,
        f = e + 2
    };
     
    // tipos de enumeração (com e sem escopo) podem ter operadores sobrecarregados
    std::ostream& operator<<(std::ostream& os, color c)
    {
        switch(c)
        {
            case red   : os << "red";    break;
            case yellow: os << "yellow"; break;
            case green : os << "green";  break;
            case blue  : os << "blue";   break;
            default    : os.setstate(std::ios_base::failbit);
        }
        return os;
    }
     
    std::ostream& operator<<(std::ostream& os, altitude al)
    {
        return os << static_cast<char>(al);
    }
     
    // A enumeração com escopo (C++11) pode ser parcialmente emulada em revisões anteriores do C++:
     
    enum struct E11 { x, y }; // desde C++11
     
    struct E98 { enum { x, y }; }; // OK em pré-C++11
     
    namespace N98 { enum { x, y }; } // OK em pré-C++11
     
    struct S98 { static const int x = 0, y = 1; }; // OK em pré-C++11
     
    void emu()
    {
        std::cout << (static_cast<int>(E11::y) + E98::y + N98::y + S98::y) << '\n'; // 4
    }
     
    namespace cxx20
    {
        enum class long_long_long_name { x, y };
     
        void using_enum_demo()
        {
            std::cout << "C++20 `using enum`: __cpp_using_enum == ";
            switch (auto rnd = []{return long_long_long_name::x;}; rnd())
            {
    #if defined(__cpp_using_enum)
                using enum long_long_long_name;
                case x: std::cout << __cpp_using_enum << "; x\n"; break;
                case y: std::cout << __cpp_using_enum << "; y\n"; break;
    #else
                case long_long_long_name::x: std::cout << "?; x\n"; break;
                case long_long_long_name::y: std::cout << "?; y\n"; break;
    #endif
            }
        }
    }
     
    int main()
    {
        color col = red;
        altitude a;
        a = altitude::low;
     
        std::cout << "col = " << col << '\n'
                  << "a = "   << a   << '\n'
                  << "f = "   << f   << '\n';
     
        cxx20::using_enum_demo();
    }
```

Saída possível:
```
    col = red
    a = l
    f = 3
    C++20 `using enum`: __cpp_using_enum == 201907; x
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 377](<https://cplusplus.github.io/CWG/issues/377.html>) | C++98 | o comportamento era não especificado quando nenhum tipo integral
podia representar todos os valores do enumerador | a enumeração é malformada neste caso
[CWG 518](<https://cplusplus.github.io/CWG/issues/518.html>) | C++98 | uma vírgula final não era permitida após a lista de enumeradores | permitido
[CWG 1514](<https://cplusplus.github.io/CWG/issues/1514.html>) | C++11 | uma redefinição de enumeração com tipo subjacente fixo
poderia ser analisada como um bit-field em uma declaração de membro de classe | sempre analisada como uma redefinição
[CWG 1638](<https://cplusplus.github.io/CWG/issues/1638.html>) | C++11 | a gramática da declaração de enumeração opaca
proibia o uso para especializações de template | nested-name-specifier permitido
[CWG 1766](<https://cplusplus.github.io/CWG/issues/1766.html>) | C++98 | fazer um cast de um valor fora do intervalo para uma enumeração
sem tipo subjacente fixo tinha um resultado não especificado | o comportamento é indefinido
[CWG 1966](<https://cplusplus.github.io/CWG/issues/1966.html>) | C++11 | a resolução do [problema CWG 1514](<https://cplusplus.github.io/CWG/issues/1514.html>) fez com que o `:`
de uma expressão condicional fosse parte de enum-base | aplicar a resolução apenas aos especificadores de declaração de membro
[CWG 2156](<https://cplusplus.github.io/CWG/issues/2156.html>) | C++11 | definições de enumeração podiam definir
tipos de enumeração por using-declarations | proibido
[CWG 2157](<https://cplusplus.github.io/CWG/issues/2157.html>) | C++11 | a resolução do [problema CWG 1966](<https://cplusplus.github.io/CWG/issues/1966.html>)
não cobria nomes de enumeração qualificados | coberto
[CWG 2530](<https://cplusplus.github.io/CWG/issues/2530.html>) | C++98 | uma lista de enumeradores podia conter múltiplos
enumeradores com o mesmo identificador | proibido
[CWG 2590](<https://cplusplus.github.io/CWG/issues/2590.html>) | C++98 | o tamanho, a representação de valor e os requisitos de alinhamento
de uma enumeração não dependiam de seu tipo subjacente | todos eles são idênticos aos do tipo subjacente
[CWG 2621](<https://cplusplus.github.io/CWG/issues/2621.html>) | C++20 | o lookup de nome de enumeração usado em
declarações using enum era pouco claro | esclarecido
[CWG 2877](<https://cplusplus.github.io/CWG/issues/2877.html>) | C++20 | o lookup de nome de enumeração usado em
declarações using enum não era apenas por tipo | tornado apenas por tipo

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 9.7.1 Enumeration declarations [dcl.enum]

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 9.7.1 Enumeration declarations [dcl.enum]

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 10.2 Enumeration declarations [dcl.enum]

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 7.2 Enumeration declarations [dcl.enum]

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 7.2 Enumeration declarations [dcl.enum]

  * C++03 standard (ISO/IEC 14882:2003):

    

  * 7.2 Enumeration declarations [dcl.enum]

  * C++98 standard (ISO/IEC 14882:1998):

    

  * 7.2 Enumeration declarations [dcl.enum]

### Veja também

[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(modelo de classe)
[ is_scoped_enum](<#/doc/types/is_scoped_enum>)(C++23) | verifica se um tipo é um tipo de enumeração com escopo
(modelo de classe)
[ underlying_type](<#/doc/types/underlying_type>)(C++11) | obtém o tipo inteiro subjacente para um dado tipo de enumeração
(modelo de classe)
[ to_underlying](<#/doc/utility/to_underlying>)(C++23) | converte uma enumeração para seu tipo subjacente
(modelo de função)
[Documentação C](<#/>) para Enumerações