# Templates

Um template é uma entidade C++ que define um dos seguintes:

  * uma família de classes ([class template](<#/doc/language/class_template>)), que podem ser [classes aninhadas](<#/doc/language/member_template>)
  * uma família de funções ([function template](<#/doc/language/function_template>)), que podem ser [funções membro](<#/doc/language/member_template>)

  * um alias para uma família de tipos ([alias template](<#/doc/language/type_alias>))

| (desde C++11)
  * uma família de variáveis ([variable template](<#/doc/language/variable_template>))

| (desde C++14)
  * um concept ([constraints and concepts](<#/doc/language/constraints>))

| (desde C++20)

Templates são parametrizados por um ou mais [template parameters](<#/doc/language/template_parameters>), de três tipos: type template parameters, non-type template parameters, e template template parameters.

Quando template arguments são fornecidos, ou, apenas para templates de [função](<#/doc/language/function_template>) e de [classe](<#/doc/language/ctad>) (desde C++17), deduzidos, eles são substituídos pelos template parameters para obter uma _especialização_ do template, ou seja, um tipo específico ou um lvalue de função específico.

Especializações também podem ser fornecidas explicitamente: [full specializations](<#/doc/language/template_specialization>) são permitidas para templates de classe, de variável (desde C++14) e de função, [partial specializations](<#/doc/language/partial_specialization>) são permitidas apenas para templates de classe e templates de variável (desde C++14).

Quando uma especialização de template de classe é referenciada em um contexto que requer um tipo de objeto completo, ou quando uma especialização de template de função é referenciada em um contexto que requer que uma definição de função exista, o template é _instanciado_ (o código para ele é de fato compilado), a menos que o template já tenha sido explicitamente especializado ou explicitamente instanciado. A instanciação de um template de classe não instancia nenhuma de suas funções membro a menos que elas também sejam usadas. Em tempo de linkagem, instanciações idênticas geradas por diferentes unidades de tradução são mescladas.

A definição de um template de classe deve ser visível no ponto de instanciação implícita, razão pela qual as bibliotecas de template tipicamente fornecem todas as definições de template nos headers (por exemplo, a maioria das [bibliotecas Boost são header-only](<https://www.boost.org/doc/libs/release/more/getting_started/unix-variants.html#header-only-libraries>)).

### Sintaxe

---
```cpp
`template <`parameter-list ﻿`>` requires-clause ﻿(opcional) declaration  // (1)
`export template <`parameter-list ﻿`>` declaration  // (2) (até C++11)
`template <`parameter-list ﻿`> concept` concept-name `=` constraint-expression ﻿`;`  // (3) (desde C++20)
```
- **parameter-list** — uma lista não vazia de [template parameters](<#/doc/language/template_parameters>) separados por vírgulas, cada um dos quais é um [non-type parameter](<#/doc/language/template_parameters>), um [type parameter](<#/doc/language/template_parameters>), um [template parameter](<#/doc/language/template_parameters>), ou um [parameter pack](<#/doc/language/parameter_pack>) de qualquer um desses (desde C++11).
- **requires-clause** — (desde C++20) uma [requires-clause](<#/doc/language/constraints>) que especifica as [constraints](<#/doc/language/constraints>) nos template arguments.
- **declaration** — declaração de uma [classe (incluindo struct e union)](<#/doc/language/class_template>), uma [classe membro ou tipo de enumeração membro](<#/doc/language/member_template>), uma [função](<#/doc/language/function_template>) ou [função membro](<#/doc/language/member_template>), um static data member no escopo de namespace[, uma variável ou static data member no escopo de classe](<#/doc/language/variable_template>) (desde C++14), ou um [alias template](<#/doc/language/type_alias>) (desde C++11). Também pode definir uma [template specialization](<#/doc/language/template_specialization>).
concept-name
- **constraint-expression** — veja [constraints e concepts](<#/doc/language/constraints>)
export era um modificador opcional que declarava o template como _exportado_ (quando usado com um template de classe, ele declarava todos os seus membros como exportados também). Arquivos que instanciaram templates exportados não precisavam incluir suas definições: a declaração era suficiente. Implementações de export eram raras e divergiam entre si em detalhes. | (até C++11)
---|---
| Esta seção está incompleta
Razão: sintaxe central, template parameters e instanciações, pegam conteúdo comum entre class_template e function_template

### Template identifiers

Um template identifier tem uma das seguintes sintaxes:

---
```cpp
template-name ﻿`<` template-argument-list ﻿(opcional)`>`  // (1)
`operator` op ﻿`<` template-argument-list ﻿(opcional)`>`  // (2)
`operator ""` identifier `<` template-argument-list ﻿(opcional)`>`  // (3) (desde C++11)
(obsoleto)
`operator` user-defined-string-literal `<` template-argument-list ﻿(opcional)`>`  // (4) (desde C++11)
```

1) Um _simple template identifier_.

2) Um operator function template identifier.

3,4) Um [literal operator](<#/doc/language/user_literal>) function template identifier.

- **template-name** — um [identifier](<#/doc/language/name>) que nomeia um template
- **op** — um [operator sobrecarregável](<#/doc/language/operators>)
- **identifier** — um identifier
- **user-defined-string-literal** — "" seguido por um identifier

Um simple template identifier que nomeia uma especialização de template de classe nomeia uma classe.

Um template identifier que nomeia uma especialização de alias template nomeia um tipo.

Um template identifier que nomeia uma especialização de template de função nomeia uma função.

Se todas as seguintes condições forem satisfeitas, um template identifier é _válido_ ﻿:

  * Há no máximo tantos arguments quanto parâmetros ou um parâmetro é um template [parameter pack](<#/doc/language/parameter_pack>) (desde C++11).
  * Existe um argument para cada parâmetro não dedutível e não-pack (desde C++11) que não possui um default template argument.
  * Cada template argument corresponde ao template parameter correspondente.
  * A substituição de cada template argument nos template parameters seguintes (se houver) é bem-sucedida.

  * Se o template identifier é [non-dependent](<#/doc/language/dependent_name>), as constraints associadas são satisfeitas conforme especificado abaixo.

| (desde C++20)

Um simple template id inválido é um erro em tempo de compilação, a menos que ele nomeie uma especialização de template de função (nesse caso, [SFINAE](<#/doc/language/sfinae>) pode ser aplicado).
```cpp
    template<class T, T::type n = 0>
    class X;

    struct S
    {
        using type = int;
    };

    using T1 = X<S, int, int>; // erro: argumentos demais
    using T2 = X<>;            // erro: nenhum argumento padrão para o primeiro parâmetro de template
    using T3 = X<1>;           // erro: valor 1 não corresponde ao type-parameter
    using T4 = X<int>;         // erro: falha de substituição para o segundo parâmetro de template
    using T5 = X<S>;           // OK
```

Quando o template-name de um simple template id nomeia um template não-função restrito ou um template template parameter restrito, mas não um member template que é membro de uma especialização desconhecida, e todos os template arguments no simple template id são non-dependent, as constraints associadas do template restrito devem ser satisfeitas:
```cpp
    template<typename T>
    concept C1 = sizeof(T) != sizeof(int);

    template<C1 T>
    struct S1 {};

    template<C1 T>
    using Ptr = T*;

    S1<int>* p;                      // erro: constraints não satisfeitas
    Ptr<int> p;                      // erro: constraints não satisfeitas

    template<typename T>
    struct S2 { Ptr<int> x; };       // erro, nenhum diagnóstico requerido

    template<typename T>
    struct S3 { Ptr<T> x; };         // OK, satisfação não é requerida

    S3<int> x;                       // erro: constraints não satisfeitas

    template<template<C1 T> class X>
    struct S4
    {
        X<int> x;                    // erro, nenhum diagnóstico requerido
    };

    template<typename T>
    concept C2 = sizeof(T) == 1;

    template<C2 T> struct S {};

    template struct S<char[2]>;      // erro: constraints não satisfeitas
    template<> struct S<char[2]> {}; // erro: constraints não satisfeitas
```

| (desde C++20)

Se todas as seguintes condições forem satisfeitas, dois template identifiers são _iguais_ ﻿:

  * Seus template-name ﻿s ou operators referem-se ao mesmo template.
  * Seus type template arguments correspondentes são do mesmo tipo.
  * Os valores dos template parameters determinados por seus non-type template arguments correspondentes são [template-argument-equivalent](<#/doc/language/template_parameters>).
  * Seus template template arguments correspondentes referem-se ao mesmo template.

Dois template identifiers que são iguais referem-se à mesma variável (desde C++14), classe ou função.

### Entidade templated

Uma _entidade templated_ (ou, em algumas fontes, "temploid") é qualquer entidade que é definida (ou, para uma [lambda expression](<#/doc/language/lambda>), criada) (desde C++11) dentro de uma definição de template. Todas as seguintes são entidades templated:

  * um template de classe/função/variável (desde C++14)

  * um [concept](<#/doc/language/constraints>)

| (desde C++20)

  * um membro de uma entidade templated (como uma função membro não-template de um template de classe)
  * um enumerador de uma enumeração que é uma entidade templated
  * qualquer entidade definida ou criada dentro de uma entidade templated: uma classe local, uma variável local, uma função friend, etc

  * o closure type de uma lambda expression que aparece na declaração de uma entidade templated

| (desde C++11)

Por exemplo, em
```cpp
    template<typename T>
    struct A
    {
        void f() {}
    };
```

a função `A::f` não é um template de função, mas ainda é considerada templated.

Uma _função templated_ é um template de função ou uma função que é templated.

Uma _classe templated_ é um template de classe ou uma classe que é templated.

Uma _variável templated_ é um template de variável ou uma variável que é templated. | (desde C++14)

### Palavras-chave

[`template`](<#/doc/keyword/template>), [`export`](<#/doc/keyword/export>)

### Relatórios de defeitos

Os seguintes defect reports que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2293](<https://cplusplus.github.io/CWG/issues/2293.html>) | C++98 | as regras para determinar se um template identifier é válido não foram fornecidas | fornecido
[CWG 2682](<https://cplusplus.github.io/CWG/issues/2682.html>) | C++98
C++14 | as definições de função templated/classe template (C++98)/variável templated (C++14) estavam faltando | adicionado
[P2308R1](<https://wg21.link/P2308R1>) | C++98 | dois template identifiers eram diferentes se seus non-type template arguments correspondentes não fossem template-argument-equivalent | eles são diferentes se seus valores de non-type template parameter correspondentes não forem template-argument-equivalent

### Veja também

[Documentação C](<#/>) para seleção genérica
---