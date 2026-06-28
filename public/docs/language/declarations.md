# Declarações

Declarações são como nomes são introduzidos (ou reintroduzidos) no programa C++. Nem todas as declarações realmente declaram algo, e cada tipo de entidade é declarado de forma diferente. [Definições](<#/doc/language/definition>) são declarações que são suficientes para usar a entidade identificada pelo nome.

Uma declaração é uma das seguintes:

*   [Definição de função](<#/doc/language/function>)
*   [Declaração de template](<#/doc/language/templates>) (incluindo [Especialização parcial de template](<#/doc/language/partial_specialization>))
*   [Instanciação explícita de template](<#/doc/language/class_template>)
*   [Especialização explícita de template](<#/doc/language/template_specialization>)
*   [Definição de namespace](<#/doc/language/namespace>)
*   [Especificação de linkage](<#/doc/language/language_linkage>)

*   Declaração de atributo ([attr](<#/doc/language/attributes>) `;`)

| (desde C++11) |
|---|

*   Declaração vazia (`;`)
*   Uma declaração de função sem um decl-specifier-seq ﻿:

---
attr ﻿(opcional) declarator `;`
- **attr** — (desde C++11) sequência de qualquer número de [atributos](<#/doc/language/attributes>)
- **declarator** — um declarator de função

Esta declaração deve declarar um construtor, destrutor ou [função de conversão](<#/doc/language/cast_operator>) de tipo definida pelo usuário. Ela só pode ser usada como parte de uma [declaração de template](<#/doc/language/templates>), [especialização explícita](<#/doc/language/template_specialization>), ou instanciação explícita.

*   block-declaration (uma declaração que pode aparecer dentro de um [bloco](<#/doc/language/statements>)), que, por sua vez, pode ser uma das seguintes:

*   [declaração asm](<#/doc/language/asm>)

*   [declaração de alias de tipo](<#/doc/language/type_alias>)

| (desde C++11) |
|---|

*   [definição de alias de namespace](<#/doc/language/namespace_alias>)
*   [using-declaration](<#/doc/language/using_declaration>)
*   [diretiva using](<#/doc/language/namespace>)

*   [using-enum-declaration](<#/doc/language/enum>)

| (desde C++20) |
|---|

*   declaração [`static_assert`](<#/doc/language/static_assert>)
*   [declaração de enum opaco](<#/doc/language/enum>)

| (desde C++11) |

*   declaração simples

### Declaração simples

Uma declaração simples é uma instrução que introduz, cria e, opcionalmente, inicializa um ou vários identificadores, tipicamente variáveis.

---
decl-specifier-seq init-declarator-list ﻿(opcional) `;` | (1) |
---|---|---
attr decl-specifier-seq init-declarator-list`;` | (2) |
- **attr** — (desde C++11) sequência de qualquer número de [atributos](<#/doc/language/attributes>)
- **decl-specifier-seq** — sequência de _specifiers_ (veja abaixo)
- **init-declarator-list** — lista de _declarators_ separados por vírgula com [inicializadores](<#/doc/language/initialization>) opcionais. init-declarator-list é opcional ao declarar uma classe/struct/union nomeada ou uma enumeração nomeada

Uma [declaração de structured binding](<#/doc/language/structured_binding>) também é uma declaração simples.(desde C++17)

### Especificadores

**Especificadores de declaração** (decl-specifier-seq) é uma sequência dos seguintes especificadores separados por espaço em branco, em qualquer ordem:

*   o especificador [`typedef`](<#/doc/language/typedef>). Se presente, a declaração inteira é uma [declaração typedef](<#/doc/language/typedef>) e cada declarator introduz um novo nome de tipo, não um objeto ou uma função.
*   especificadores de função ([`inline`](<#/doc/language/inline>), [`virtual`](<#/doc/language/virtual>), [`explicit`](<#/doc/language/explicit>)), permitidos apenas em [declarações de função](<#/doc/language/function>).

*   o especificador [`inline`](<#/doc/language/inline>) também é permitido em declarações de variáveis.

| (desde C++17) |
|---|

*   o especificador [`friend`](<#/doc/language/friend>), permitido em declarações de classe e função.

*   o especificador [`constexpr`](<#/doc/language/constexpr>), permitido apenas em definições de variáveis, declarações de funções e function templates, e na declaração de membros de dados estáticos de tipo literal.

| (desde C++11) |
|---|

*   o especificador [`consteval`](<#/doc/language/consteval>), permitido apenas em declarações de funções e function templates.
*   o especificador [`constinit`](<#/doc/language/constinit>), permitido apenas na declaração de uma variável com duração de armazenamento estática ou de thread. No máximo um dos especificadores constexpr, consteval e constinit é permitido aparecer em um decl-specifier-seq.

| (desde C++20) |

*   [especificador de classe de armazenamento](<#/doc/language/storage_duration>) ([`register`](<#/doc/keyword/register>), (até C++17) [`static`](<#/doc/keywords/static>), [`thread_local`](<#/doc/keyword/thread_local>), (desde C++11) [`extern`](<#/doc/keyword/extern>), [`mutable`](<#/doc/keyword/mutable>)). Apenas um especificador de classe de armazenamento é permitido, exceto que thread_local pode aparecer junto com extern ou static(desde C++11).
*   **Especificadores de tipo** (type-specifier-seq), uma sequência de especificadores que nomeia um tipo. O tipo de cada entidade introduzida pela declaração é este tipo, opcionalmente modificado pelo declarator (veja abaixo). Esta sequência de especificadores também é usada por [type-id](<#/doc/language/type-id>). Apenas os seguintes especificadores fazem parte de type-specifier-seq, em qualquer ordem:

*   [especificador de classe](<#/doc/language/class>)
*   [especificador de enum](<#/doc/language/enum>)
*   especificador de tipo simples

*   [`char`](<#/doc/keyword/char>), [`char8_t`](<#/doc/keyword/char8_t>), (desde C++20) [`char16_t`](<#/doc/keyword/char16_t>), [`char32_t`](<#/doc/keyword/char32_t>), (desde C++11) [`wchar_t`](<#/doc/keyword/wchar_t>), [`bool`](<#/doc/keyword/bool>), [`short`](<#/doc/keyword/short>), [`int`](<#/doc/keyword/int>), [`long`](<#/doc/keyword/long>), [`signed`](<#/doc/keyword/signed>), [`unsigned`](<#/doc/keyword/unsigned>), [`float`](<#/doc/keyword/float>), [`double`](<#/doc/keyword/double>), [`void`](<#/doc/keyword/void>)

*   [`auto`](<#/doc/language/auto>)
*   [especificador decltype](<#/doc/language/decltype>)

| (desde C++11) |
|---|

*   [especificador de indexação de pack](<#/doc/language/pack_indexing>)

| (desde C++26) |

*   nome de classe previamente declarado (opcionalmente [qualificado](<#/doc/language/name>))
*   nome de enum previamente declarado (opcionalmente [qualificado](<#/doc/language/name>))
*   [typedef-name](<#/doc/language/typedef>) ou [alias de tipo](<#/doc/language/type_alias>) previamente declarado(desde C++11) (opcionalmente [qualificado](<#/doc/language/name>))
*   nome de template com argumentos de template (opcionalmente [qualificado](<#/doc/language/name>), opcionalmente usando [disambiguador de template](<#/doc/language/dependent_name>))

*   nome de template sem argumentos de template (opcionalmente [qualificado](<#/doc/language/name>)): veja [dedução de argumento de template de classe](<#/doc/language/ctad>)

| (desde C++17) |
|---|

*   [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>)

*   a palavra-chave [`class`](<#/doc/keyword/class>), [`struct`](<#/doc/keyword/struct>), ou [`union`](<#/doc/keyword/union>), seguida pelo identificador (opcionalmente [qualificado](<#/doc/language/name>)), previamente definido como o nome de uma classe.
*   a palavra-chave [`class`](<#/doc/keyword/class>), [`struct`](<#/doc/keyword/struct>), ou [`union`](<#/doc/keyword/union>), seguida pelo nome de template com argumentos de template (opcionalmente [qualificado](<#/doc/language/name>), opcionalmente usando [disambiguador de template](<#/doc/language/dependent_name>)), previamente definido como o nome de um class template.
*   a palavra-chave [`enum`](<#/doc/keyword/enum>) seguida pelo identificador (opcionalmente [qualificado](<#/doc/language/name>)), previamente declarado como o nome de uma enumeração.

*   [especificador typename](<#/doc/language/dependent_name>)
*   [qualificador cv](<#/doc/language/cv>)

apenas um especificador de tipo é permitido em um decl-specifier-seq, com as seguintes exceções:

*   const pode ser combinado com qualquer especificador de tipo, exceto ele mesmo.
*   volatile pode ser combinado com qualquer especificador de tipo, exceto ele mesmo.
*   signed ou unsigned podem ser combinados com char, long, short ou int.
*   short ou long podem ser combinados com int.
*   long pode ser combinado com double.

*   long pode ser combinado com long.

| (desde C++11) |
|---|

[Atributos](<#/doc/language/attributes>) podem aparecer em decl-specifier-seq, caso em que se aplicam ao tipo determinado pelos especificadores precedentes.

Repetições de qualquer especificador em um decl-specifier-seq, como const static const, ou virtual inline virtual são erros, exceto que long é permitido aparecer duas vezes(desde C++11).

### Declarators

init-declarator-list é uma sequência separada por vírgulas de um ou mais init-declarators, que possuem a seguinte sintaxe:

---
declarator initializer ﻿(opcional) | (1) |
---|---|---
declarator requires-clause | (2) | (desde C++20)
- **declarator** — o declarator
- **initializer** — inicializador opcional (exceto onde exigido, como ao inicializar referências ou objetos const). Veja [Inicialização](<#/doc/language/initialization>) para detalhes.
- **requires-clause** — [uma requires-clause](<#/doc/language/constraints>), que adiciona uma [restrição](<#/doc/language/constraints>) a uma [declaração de função](<#/doc/language/function>)

Cada init-declarator em uma sequência de init-declarators S D1, D2, D3; é processado como se fosse uma declaração autônoma com os mesmos especificadores: S D1; S D2; S D3;.

Cada declarator introduz exatamente um objeto, referência, função, ou (para declarações typedef) alias de tipo, cujo tipo é fornecido por decl-specifier-seq e opcionalmente modificado por operadores como & (referência para) ou [] (array de) ou () (função que retorna) no declarator. Esses operadores podem ser aplicados recursivamente, como mostrado abaixo.

Um declarator é um dos seguintes:

---
```cpp
unqualified-id attr ﻿(opcional)  // (1)
qualified-id attr ﻿(opcional)  // (2)
`...` identifier attr ﻿(opcional)  // (3) (desde C++11)
`*` attr ﻿(opcional) cv ﻿(opcional) declarator  // (4)
nested-name-specifier `*` attr ﻿(opcional) cv ﻿(opcional) declarator  // (5)
`&` attr ﻿(opcional) declarator  // (6)
`& &` attr ﻿(opcional) declarator  // (7) (desde C++11)
noptr-declarator `[` constexpr ﻿(opcional) `]` attr ﻿(opcional)  // (8)
noptr-declarator `(` parameter-list `)` cv ﻿(opcional) ref ﻿ ﻿(opcional) except ﻿(opcional) attr ﻿(opcional)  // (9)
```

1) O [nome](<#/doc/language/name>) que é declarado.

2) Um declarator que usa um [identificador qualificado](<#/doc/language/name>) (qualified-id) define ou redeclara um [membro de namespace](<#/doc/language/namespace>) ou [membro de classe](<#/doc/language/classes>) previamente declarado.

3) [Parameter pack](<#/doc/language/parameter_pack>), aparece apenas em [declarações de parâmetro](<#/doc/language/function>).

4) [Declarator de ponteiro](<#/doc/language/pointer>): a declaração S * D; declara `D` como um ponteiro para o tipo determinado por decl-specifier-seq `S`.

5) [Declaração de ponteiro para membro](<#/doc/language/pointer>): a declaração S C::* D; declara `D` como um ponteiro para membro de `C` do tipo determinado por decl-specifier-seq `S`. nested-name-specifier é uma [sequência de nomes e operadores de resolução de escopo `::`](<#/doc/language/name>)

6) [Declarator de referência lvalue](<#/doc/language/reference>): a declaração S & D; declara `D` como uma referência lvalue para o tipo determinado por decl-specifier-seq `S`.

7) [Declarator de referência rvalue](<#/doc/language/reference>): a declaração S && D; declara `D` como uma referência rvalue para o tipo determinado por decl-specifier-seq `S`.

8) [Declarator de array](<#/doc/language/array>). noptr-declarator qualquer declarator válido, mas se começar com *, &, ou &&, deve ser cercado por parênteses.

9) [Declarator de função](<#/doc/language/function>). noptr-declarator qualquer declarator válido, mas se começar com *, &, ou &&, deve ser cercado por parênteses. Pode terminar com o tipo de retorno trailing opcional.(desde C++11)

Em todos os casos, attr é uma sequência opcional de [atributos](<#/doc/language/attributes>). Quando aparece imediatamente após o identificador, aplica-se ao objeto que está sendo declarado. | (desde C++11)

cv é uma sequência de qualificadores [const e volatile](<#/doc/language/cv>), onde qualquer um dos qualificadores pode aparecer no máximo uma vez na sequência.

| Esta seção está incompleta |
|---|
| Razão: explicar as regras de ocultação de nomes de declaração; como uma declaração de variável/função oculta uma classe (mas não um typedef) com o mesmo nome |

### Notas

Quando uma block-declaration aparece [dentro de um bloco](<#/doc/language/statements>), e um identificador introduzido por uma declaração foi previamente declarado em um bloco externo, a [declaração externa é ocultada](<#/doc/language/scope>) para o restante do bloco.

Se uma declaração introduz uma variável com duração de armazenamento automática, ela é inicializada quando sua instrução de declaração é executada. Todas as variáveis automáticas declaradas em um bloco são destruídas na saída do bloco (independentemente de como o bloco é saído: via [exceção](<#/doc/language/exceptions>), [goto](<#/doc/language/goto>), ou atingindo seu fim), na ordem oposta à sua ordem de inicialização.

### Exemplo

Nota: este exemplo demonstra como algumas declarações complexas são analisadas em termos da gramática da linguagem. Outras mnemônicas populares são: [a regra espiral](<https://c-faq.com/decl/spiral.anderson.html>), leitura [de dentro para fora](<https://stackoverflow.com/a/34560439/273767>), e [declaração espelha uso](<https://stackoverflow.com/a/34552915/273767>). Há também um analisador automático em <https://cdecl.org>.

Run this code
```cpp
    #include <type_traits>
    
    struct S
    {
        int member;
        // decl-specifier-seq é "int"
        // declarator é "member"
    } obj, *pObj(&obj);
    // decl-specifier-seq é "struct S { int member; }"
    // declarator "obj" declara um objeto do tipo S
    // declarator "*pObj" declara um ponteiro para S,
    //     e o inicializador "(&obj)" o inicializa
    
    int i = 1, *p = nullptr, f(), (*pf)(double);
    // decl-specifier-seq é "int"
    // declarator "i" declara uma variável do tipo int,
    //     e o inicializador "= 1" a inicializa
    // declarator "*p" declara uma variável do tipo int*,
    //     e o inicializador "= nullptr" a inicializa
    // declarator "f()" declara (mas não define)
    //     uma função que não recebe argumentos e retorna int
    // declarator "(*pf)(double)" declara um ponteiro para função
    //     que recebe double e retorna int
    
    int (*(*var1)(double))[3] = nullptr;
    // decl-specifier-seq é "int"
    // declarator é "(*(*var1)(double))[3]"
    // initializer é "= nullptr"
    
    // 1. declarator "(*(*var1)(double))[3]" é um declarator de array:
    //    Tipo declarado é: "(*(*var1)(double))" array de 3 elementos
    // 2. declarator "(*(*var1)(double))" é um declarator de ponteiro:
    //    Tipo declarado é: "(*var1)(double)" ponteiro para array de 3 elementos
    // 3. declarator "(*var1)(double)" é um declarator de função:
    //    Tipo declarado é: "(*var1)" função que recebe "(double)",
    //    retornando ponteiro para array de 3 elementos.
    // 4. declarator "(*var1)" é um declarator de ponteiro:
    //    Tipo declarado é: "var1" ponteiro para função que recebe "(double)",
    //    retornando ponteiro para array de 3 elementos.
    // 5. declarator "var1" é um identificador.
    // Esta declaração declara o objeto var1 do tipo "ponteiro para função
    // que recebe double e retorna ponteiro para array de 3 elementos do tipo int"
    // O inicializador "= nullptr" fornece o valor inicial deste ponteiro.
    
    // Sintaxe alternativa C++11:
    auto (*var2)(double) -> int (*)[3] = nullptr;
    // decl-specifier-seq é "auto"
    // declarator é "(*var2)(double) -> int (*)[3]"
    // initializer é "= nullptr"
    
    // 1. declarator "(*var2)(double) -> int (*)[3]" é um declarator de função:
    //    Tipo declarado é: "(*var2)" função que recebe "(double)", retornando "int (*)[3]"
    // ...
    
    int main()
    {
        static_assert(std::is_same_v<decltype(var1), decltype(var2)>);
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 482](<https://cplusplus.github.io/CWG/issues/482.html>) | C++98 | os declarators de redeclarações não podiam ser qualificados | declarators qualificados permitidos
[CWG 569](<https://cplusplus.github.io/CWG/issues/569.html>) | C++98 | um único ponto e vírgula autônomo não era uma declaração válida | é uma declaração vazia, que não tem efeito
[CWG 1830](<https://cplusplus.github.io/CWG/issues/1830.html>) | C++98 | a repetição de um especificador de função em um decl-specifier-seq era permitida | a repetição é proibida

### Veja também

[Documentação C](<#/>) para Declarações
---
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão