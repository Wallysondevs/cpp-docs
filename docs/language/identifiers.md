# Identificadores

Um _identificador_ é uma sequência arbitrariamente longa de dígitos, underscores, letras latinas minúsculas e maiúsculas, e a maioria dos caracteres Unicode.

O primeiro caractere de um identificador válido deve ser um dos seguintes:

*   letras latinas maiúsculas A-Z
*   letras latinas minúsculas a-z
*   underscore
*   qualquer caractere Unicode com a propriedade Unicode [XID_Start](<https://www.unicode.org/reports/tr31/#Table_Lexical_Classes_for_Identifiers>)

Qualquer outro caractere de um identificador válido deve ser um dos seguintes:

*   dígitos 0-9
*   letras latinas maiúsculas A-Z
*   letras latinas minúsculas a-z
*   underscore
*   qualquer caractere Unicode com a propriedade Unicode [XID_Continue](<https://www.unicode.org/reports/tr31/#Table_Lexical_Classes_for_Identifiers>)

As listas de caracteres com as propriedades XID_Start e XID_Continue podem ser encontradas em [DerivedCoreProperties.txt](<https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt>).

Identificadores diferenciam maiúsculas de minúsculas (letras minúsculas e maiúsculas são distintas), e cada caractere é significativo. Todo identificador deve estar em conformidade com a [Forma de Normalização C](<https://www.unicode.org/charts/normalization/>).

Nota: O suporte a identificadores Unicode é limitado na maioria das implementações, por exemplo, [gcc (até 10)](<https://gcc.gnu.org/wiki/FAQ#What_is_the_status_of_adding_the_UTF-8_support_for_identifier_names_in_GCC.3F>).

### Em declarações

Um identificador pode ser usado [para nomear](<#/doc/language/declarations>) objetos, referências, funções, enumeradores, tipos, membros de classe, namespaces, templates, especializações de template, parameter packs (desde C++11), rótulos goto e outras entidades, com as seguintes exceções:

*   Os identificadores que são [palavras-chave](<#/doc/keywords>) não podem ser usados para outros propósitos.

    *   O único lugar onde podem ser usados como não-palavras-chave é em um attribute-token (por exemplo, [[private]] é um [atributo](<#/doc/language/attributes>) válido).

| (desde C++11) |
|---|
*   Os identificadores que são [representações alternativas](<#/doc/language/operator_alternative>) para certos operadores e pontuadores não podem ser usados para outros propósitos.

*   Os identificadores com significado especial (final, import, module (desde C++20) e override) são usados explicitamente em um determinado contexto, em vez de serem identificadores regulares.
    *   A menos que especificado de outra forma, qualquer ambiguidade quanto a se um determinado identificador tem um significado especial é resolvida para interpretar o token como um identificador regular.

| (desde C++11) |
|---|
*   Identificadores que aparecem como um token ou token de pré-processamento (ou seja, não em user-defined-string-literal como operator ""id) (desde C++11) de uma das seguintes formas são reservados:
    *   no namespace global, identificadores que começam com um underscore
    *   identificadores que contêm um double underscore ou começam com um underscore seguido por uma letra maiúscula, exceto os seguintes identificadores:

    *   [macros predefinidas](<#/doc/preprocessor/replace>) (incluindo [macros de teste de recursos da linguagem](<#/doc/feature_test>)) (desde C++20)

    *   [std::_Exit](<#/doc/utility/program/_Exit>)
    *   [__func__](<#/doc/language/function>)

| (desde C++11) |
|---|
    *   as seguintes macros definidas na standard library:

    *   as macros da biblioteca de E/S estilo C [_IOFBF](<#/doc/io/c>), [_IOLBF](<#/doc/io/c>) e [_IONBF](<#/doc/io/c>)

    *   as macros de compatibilidade C __alignas_is_defined e __alignof_is_defined (definidas em [`<stdalign.h>`](<#/doc/header/cstdalign>))
    *   a macro de compatibilidade C __bool_true_false_are_defined (definida em [`<stdbool.h>`](<#/doc/header/cstdbool>))

| (desde C++11) |
|---|
    *   [macros de teste de recursos da biblioteca](<#/doc/feature_test>)

| (desde C++20) |

“Reservado” aqui significa que os headers da standard library #define ou declaram tais identificadores para suas necessidades internas, o compilador pode predefinir identificadores não-padrão desse tipo, e que o algoritmo de name mangling pode assumir que alguns desses identificadores não estão em uso. Se o programador usar tais identificadores, o programa é malformado, sem diagnóstico exigido.

Além disso, é comportamento indefinido #define ou #undef certos nomes em uma unidade de tradução; veja [nomes de macro reservados](<#/doc/preprocessor/replace>) para mais detalhes.

#### Identificadores zumbis

A partir do C++14, alguns identificadores são removidos da standard library do C++. Eles estão listados na [lista de nomes zumbis](<#/>).

No entanto, esses identificadores ainda são reservados para padronização anterior em um determinado contexto. Nomes de funções membro removidas não podem ser usados como nome para macros tipo função, e outros nomes de membros removidos não podem ser usados como nome para macros tipo objeto em código portátil.

### Em expressões

Um identificador que nomeia uma variável, uma função, especialização de um [concept](<#/doc/language/constraints>) (desde C++20), ou um enumerador pode ser usado como uma [expressão](<#/doc/language/expressions>). O resultado de uma expressão que consiste apenas no identificador é a entidade nomeada pelo identificador. A [categoria de valor](<#/doc/language/value_category>) da expressão é _lvalue_ se o identificador nomeia uma função, uma variável, um [objeto de parâmetro de template](<#/doc/language/template_parameters>) (desde C++20), ou um membro de dados, e _rvalue_ (até C++11) _prvalue_ (desde C++11) caso contrário (por exemplo, um [enumerador](<#/doc/language/enum>) é uma expressão rvalue (até C++11) prvalue (desde C++11), uma especialização de um concept é um bool prvalue (desde C++20)).

#### Tipo

O tipo de uma expressão identificadora é o mesmo que o tipo da entidade que ela nomeia.

As seguintes exceções existem:

*   Se a entidade nomeada pelo identificador (não qualificado) for uma entidade local, e resultaria em uma [expressão lambda](<#/doc/language/lambda>) interveniente capturando-a por cópia se fosse nomeada fora de um operando não avaliado na região declarativa em que o identificador aparece, então o tipo da expressão é o tipo de uma [expressão de acesso a membro de classe](<#/doc/language/operator_member_access>) nomeando o membro de dados não estático que seria declarado para tal captura no objeto de closure da expressão lambda interveniente mais interna.

```cpp
    void f()
    {
        float x, &r = x;
    
        [=]
        {
            decltype(x) y1;        // y1 has type float
            decltype((x)) y2 = y1; // y2 has type float const& because this lambda
                                   // is not mutable and x is an lvalue
            decltype(r) r1 = y1;   // r1 has type float&
            decltype((r)) r2 = y2; // r2 has type float const&
        };
    }
```

|
*   Se a entidade nomeada for um [objeto de parâmetro de template](<#/doc/language/template_parameters>) para um parâmetro de template do tipo `T`, o tipo da expressão é const T.

| (desde C++20) |
|---|
(desde C++11) |

#### Identificadores não qualificados

Além de identificadores devidamente declarados, o seguinte pode ser usado em expressões no mesmo papel:

*   um nome de [operador sobrecarregado](<#/doc/language/operators>) em notação de função, como operator+ ou [operator new](<#/doc/memory/new/operator_new>);
*   um nome de [função de conversão definida pelo usuário](<#/doc/language/cast_operator>), como operator bool;

*   um nome de [operador literal definido pelo usuário](<#/doc/language/user_literal>), como operator "" _km;

| (desde C++11) |
|---|
*   um nome de [template](<#/doc/language/templates>) seguido por sua lista de argumentos, como MyTemplate&lt;int&gt;;
*   o caractere ~ seguido por um nome de classe, como ~MyClass;

*   o caractere ~ seguido por um especificador [decltype](<#/doc/language/decltype>), como ~decltype(str).

| (desde C++11) |
|---|
*   o caractere ~ seguido por um [especificador de indexação de pack](<#/doc/language/pack_indexing>), como ~pack...[0].

| (desde C++26) |
|---|

Juntamente com os identificadores, eles são conhecidos como _expressões de identificador não qualificado_.

#### Identificadores qualificados

Uma _expressão de identificador qualificado_ é uma expressão de identificador não qualificado precedida por um operador de resolução de escopo ::, e opcionalmente, uma sequência de qualquer um dos seguintes separados por operadores de resolução de escopo:

*   um nome de namespace;
*   um nome de classe;

*   um nome de enumeração;
*   um [especificador `decltype`](<#/doc/language/decltype>) denotando um tipo de classe ou enumeração.

| (desde C++11) |
|---|
*   um [especificador de indexação de pack](<#/doc/language/pack_indexing>) denotando um tipo de classe ou enumeração.

| (desde C++26) |
|---|

Por exemplo, a expressão [std::string::npos](<#/doc/string/basic_string/npos>) é uma expressão que nomeia o membro estático npos na classe string no namespace std. A expressão ::tolower nomeia a função tolower no namespace global. A expressão ::[std::cout](<#/doc/io/cout>) nomeia a variável global cout no namespace std, que é um namespace de nível superior. A expressão boost::signals2::connection nomeia o tipo connection declarado no namespace signals2, que é declarado no namespace boost.

A palavra-chave [`template`](<#/doc/keyword/template>) pode aparecer em identificadores qualificados conforme necessário para desambiguar [nomes de template dependentes](<#/doc/language/dependent_name>).

Veja [qualified lookup](<#/doc/language/qualified_lookup>) para os detalhes da busca de nome para identificadores qualificados.

### Transformação implícita de acesso a membro

Se uma expressão identificadora E denota um membro não estático e não-tipo de alguma classe `C` e todas as seguintes condições são satisfeitas, E é transformada na expressão de acesso a membro de classe this->E:

*   E não é o operando direito de um [operador de acesso a membro](<#/doc/language/operator_member_access>).
*   Se E é uma expressão de identificador qualificado, E não é o operando não-parentesizado de um [operador address-of](<#/doc/language/operator_member_access>).
*   Qualquer uma das seguintes condições é satisfeita:

    *   E é [potencialmente avaliada](<#/doc/language/expressions>).
    *   `C` é a classe envolvente mais interna em E.
    *   `C` é uma classe base da classe envolvente mais interna em E.

Esta transformação não se aplica no contexto de definição de template (veja [nomes dependentes](<#/doc/language/dependent_name>)).
```cpp
    struct X
    {
        int x;
    };
    
    struct B
    {
        int b;
    };
    
    struct D : B
    {
        X d;
    
        void func()
        {
            d;   // OK, will be transformed into this->d
            b;   // OK, will be transformed into this->b
            x;   // Error: this->x is ill-formed
    
            d.x; // OK, will be transformed into this->d.x
                 // instead of d.this->x or this->d.this->x
        }
    };
```

### Nomes

Um _nome_ é o uso de um dos seguintes para se referir a uma entidade:

*   um identificador
*   um nome de operador sobrecarregado em notação de função (operator+, [operator new](<#/doc/memory/new/operator_new>))
*   um nome de função de conversão definida pelo usuário (operator bool)

*   um nome de operador literal definido pelo usuário (operator ""_km)

| (desde C++11) |
|---|
*   um nome de template seguido por sua lista de argumentos (MyTemplate&lt;int&gt;)

Todo nome é introduzido no programa por uma [declaração](<#/doc/language/declarations>). Um nome usado em mais de uma unidade de tradução pode se referir à mesma ou a diferentes entidades, dependendo da [linkage](<#/doc/language/storage_duration>).

Quando o compilador encontra um nome desconhecido em um programa, ele o associa à declaração que introduziu o nome por meio de [name lookup](<#/doc/language/lookup>), exceto para os [nomes dependentes](<#/doc/language/dependent_name>) em declarações e definições de template (para esses nomes, o compilador determina se eles nomeiam um tipo, um template ou alguma outra entidade, o que pode exigir [desambiguação explícita](<#/doc/language/dependent_name>)).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1440](<https://cplusplus.github.io/CWG/issues/1440.html>) | C++11 | expressões decltype precedendo `::` podiam denotar qualquer tipo | só podem denotar tipos de classe ou enumeração
[CWG 1963](<https://cplusplus.github.io/CWG/issues/1963.html>) | C++11 | caracteres definidos pela implementação, além de dígitos, não-dígitos e nomes de caracteres universais, podiam ser usados em um identificador | proibido
[CWG 2521](<https://cplusplus.github.io/CWG/issues/2521.html>) | C++11 | o identificador em user-defined-string-literal de um operador literal era reservado como de costume | as regras são diferentes
[CWG 2771](<https://cplusplus.github.io/CWG/issues/2771.html>) | C++98 | &a não era transformado em &this->a em contextos de classe | é transformado
[CWG 2777](<https://cplusplus.github.io/CWG/issues/2777.html>) | C++20 | o tipo de uma expressão identificadora era incerto se nomeava um objeto de parâmetro de template | esclarecido
[CWG 2818](<https://cplusplus.github.io/CWG/issues/2818.html>) | C++98 | nomes de macros predefinidas são reservados | eles não são reservados

### Veja também

[documentação C](<#/>) para Identificadores
---