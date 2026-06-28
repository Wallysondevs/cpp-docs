# Expressões Lambda (desde C++11)

Constrói um [closure](<https://en.wikipedia.org/wiki/Closure_\(computer_science\)> "enwiki:Closure \(computer science\)") (um objeto de função sem nome capaz de capturar variáveis no escopo).

### Sintaxe

##### Expressões lambda sem uma lista explícita de parâmetros de template (possivelmente não-genéricas)

---
`[` captures `]` front-attr (opcional) `(` params `)` specs (opcional) exception (opcional)
back-attr (opcional) trailing-type (opcional) requires (opcional) `{` body `}` | (1) |
---|---|---
`[` captures `] {` body `}` | (2) | (até C++23)
`[` captures `]` front-attr (opcional) trailing-type (opcional) `{` body `}` | (2) | (desde C++23)
`[` captures `]` front-attr (opcional) exception
back-attr (opcional) trailing-type (opcional) `{` body `}` | (3) | (desde C++23)
`[` captures `]` front-attr (opcional) specs exception (opcional)
back-attr (opcional) trailing-type (opcional) `{` body `}` | (4) | (desde C++23)

##### Expressões lambda com uma lista explícita de parâmetros de template (sempre genéricas) (desde C++20)

---
`[` captures `] <`tparams `>` t-requires (opcional) front-attr (opcional) `(` params `)` specs (opcional)
exception (opcional) back-attr (opcional) trailing-type (opcional) requires (opcional) `{` body `}` | (1) |
---|---|---
`[` captures `] <`tparams `>` t-requires (opcional) `{` body `}` | (2) | (até C++23)
`[` captures `] <`tparams `>` t-requires (opcional)
front-attr (opcional) trailing-type (opcional) `{` body `}` | (2) | (desde C++23)
`[` captures `] <`tparams `>` t-requires (opcional) front-attr (opcional) exception
back-attr (opcional) trailing-type (opcional) `{` body `}` | (3) | (desde C++23)
`[` captures `] <`tparams `>` t-requires (opcional) front-attr (opcional) specs exception (opcional)
back-attr (opcional) trailing-type (opcional) `{` body `}` | (4) | (desde C++23)

1) A expressão lambda com uma lista de parâmetros.

2-4) A expressão lambda sem uma lista de parâmetros.

2) A sintaxe mais simples. back-attr não pode ser aplicado.

3,4) back-attr só pode ser aplicado se qualquer um de specs e exception estiver presente.

### Explicação

- **captures** — Uma lista separada por vírgulas de zero ou mais [capturas](<#/doc/language/lambda>), opcionalmente começando com um capture-default. Veja [abaixo](<#/doc/language/lambda>) para a descrição detalhada das capturas. Uma expressão lambda pode usar uma variável sem capturá-la se a variável
  * for uma variável não-local ou tiver [duração de armazenamento](<#/doc/language/storage_duration>) estática ou thread local (nesse caso a variável não pode ser capturada), ou
  * for uma referência que foi inicializada com uma [expressão constante](<#/doc/language/constant_expression>).

Uma expressão lambda pode ler o valor de uma variável sem capturá-la se a variável
  * tiver tipo integral ou de enumeração const não-volátil e tiver sido inicializada com uma [expressão constante](<#/doc/language/constant_expression>), ou
  * for constexpr e não tiver membros mutáveis.

- **tparams** — Uma lista não vazia separada por vírgulas de [parâmetros de template](<#/doc/language/template_parameters>), usada para fornecer nomes aos parâmetros de template de uma lambda genérica (veja `ClosureType::operator()` abaixo).
- **t-requires** — Adiciona [restrições](<#/doc/language/constraints>) a tparams. | Se t-requires terminar com uma sequência de especificadores de atributo, os atributos na sequência são tratados como atributos em front-attr. | (desde C++23)
- **front-attr** — (desde C++23) Uma [sequência de especificadores de atributo](<#/doc/language/attributes>) se aplica a operator() do tipo closure (e assim o atributo `[[[noreturn](<#/doc/language/attributes/noreturn>)]]` pode ser usado).
- **params** — A [lista de parâmetros](<#/doc/language/function>) de operator() do tipo closure. | Pode ter um [parâmetro de objeto explícito](<#/doc/language/function>). | (desde C++23)
---|---|---
- **specs** — Uma lista dos seguintes especificadores, cada especificador é permitido no máximo uma vez em cada sequência. | Especificador | Efeito
mutable | Permite que o corpo modifique os objetos capturados por cópia e chame suas funções membro não-const. |
  * Não pode ser usado se um parâmetro de objeto explícito estiver presente.
```cpp
  // (desde C++23)
constexpr
(desde C++17) | Especifica explicitamente que operator() é uma função constexpr.
```
  * Se operator() satisfizer todos os requisitos de função constexpr, operator() será constexpr mesmo que constexpr não esteja presente.

consteval
(desde C++20) | Especifica que operator() é uma [função imediata](<#/doc/language/consteval>).
  * consteval e constexpr não podem ser especificados ao mesmo tempo.

static
(desde C++23) | Especifica que operator() é uma [função membro estática](<#/doc/language/static>).
  * static e mutable não podem ser especificados ao mesmo tempo.
  * Não pode ser usado se captures não estiver vazio, ou se um parâmetro de objeto explícito estiver presente.

- **exception** — Fornece a [especificação de exceção dinâmica](<#/doc/language/except_spec>) ou (até C++20) o [especificador noexcept](<#/doc/language/noexcept_spec>) para operator() do tipo closure.
- **back-attr** — Uma [sequência de especificadores de atributo](<#/doc/language/attributes>) se aplica ao tipo de operator() do tipo closure (e assim o atributo `[[[noreturn](<#/doc/language/attributes/noreturn>)]]` não pode ser usado).
- **trailing-type** — `- >` ret, onde ret especifica o tipo de retorno.
- **requires** — (desde C++20) Adiciona [restrições](<#/doc/language/constraints>) a operator() do tipo closure.
- **body** — O corpo da função.

Se [`auto`](<#/doc/language/auto>) for usado como tipo de um parâmetro ou uma lista explícita de parâmetros de template for fornecida (desde C++20), a lambda é uma _lambda genérica_. | (desde C++14)

Uma variável __func__ é implicitamente definida no início do corpo, com semântica conforme descrito [aqui](<#/doc/language/function>).

### Tipo Closure

A expressão lambda é uma expressão prvalue de um tipo de classe único, sem nome, não-[union](<#/doc/language/union>), não-[aggregate](<#/doc/language/aggregate_initialization>), conhecido como _tipo closure_, que é declarado (para fins de [ADL](<#/doc/language/adl>)) no menor escopo de bloco, escopo de classe ou escopo de namespace que contém a expressão lambda.

O tipo closure é um tipo [estrutural](<#/doc/language/template_parameters>) se e somente se captures estiver vazio. | (desde C++20)

O tipo closure possui os seguintes membros, eles não podem ser [explicitamente instanciados](<#/doc/language/function_template>), [explicitamente especializados](<#/doc/language/template_specialization>), ou (desde C++14) nomeados em uma [declaração friend](<#/doc/language/friend>):

## ClosureType::operator()(params)

```cpp
ret operator()(params) { body } | | (static e const podem estar presentes, veja abaixo)
template<template-params>
ret operator()(params) { body }  // (desde C++14)
(lambda genérica, static e const podem estar presentes, veja abaixo)
```

Executa o corpo da expressão lambda, quando invocada. Ao acessar uma variável, acessa sua cópia capturada (para as entidades capturadas por cópia), ou o objeto original (para as entidades capturadas por referência).

A lista de parâmetros de operator() é params se for fornecida, caso contrário a lista de parâmetros é vazia.

O tipo de retorno de operator() é o tipo especificado em trailing-type.

Se trailing-type não for fornecido, o tipo de retorno de operator() é automaticamente [deduzido](<#/doc/language/function>).[1](<#/doc/language/lambda>)

A menos que a palavra-chave mutable tenha sido usada nos especificadores lambda, ou um parâmetro de objeto explícito esteja presente (desde C++23), o cv-qualifier de operator() é const e os objetos que foram capturados por cópia são não-modificáveis de dentro deste operator(). Qualificador const explícito não é permitido. operator() nunca é virtual e não pode ter o qualificador volatile.

```cpp
operator() é sempre constexpr se satisfizer os requisitos de uma função constexpr. Também é constexpr se a palavra-chave constexpr foi usada nos especificadores lambda.  // (desde C++17)
operator() é uma função imediata se a palavra-chave consteval foi usada nos especificadores lambda.  // (desde C++20)
operator() é uma função membro estática se a palavra-chave static foi usada nos especificadores lambda. operator() é uma função membro de objeto explícito se params contiver um parâmetro de objeto explícito.  // (desde C++23)
```

Para cada parâmetro em params cujo tipo é especificado como auto, um parâmetro de template inventado é adicionado a template-params, na ordem de aparição. O parâmetro de template inventado pode ser um [parameter pack](<#/doc/language/parameter_pack>) se o membro de função correspondente de params for um function parameter pack.
```cpp
    // generic lambda, operator() is a template with two parameters
    auto glambda =  { return a < b; };
    bool b = glambda(3, 3.14); // OK
    
    // generic lambda, operator() is a template with one parameter
    auto vglambda = 
    {
        return = // generic lambda, ts is a parameter pack
        { 
            printer(std::forward<decltype(ts)>(ts)...);
            // nullary lambda (takes no parameters):
            return [=] { printer(ts...); };
        };
    };
    
    auto p = vglambda(
    {
        std::cout << v1 << v2 << v3;
    });
    
    auto q = p(1, 'a', 3.14); // outputs 1a3.14
    q();                      // outputs 1a3.14
```
| (desde C++14)

Se a definição da lambda usar uma lista explícita de parâmetros de template, essa lista de parâmetros de template é usada com operator(). Para cada parâmetro em params cujo tipo é especificado como auto, um parâmetro de template inventado adicional é anexado ao final dessa lista de parâmetros de template:
```cpp
    // generic lambda, operator() is a template with two parameters
    auto glambda = []<class T>(T a, auto&& b) { return a < b; };
    
    // generic lambda, operator() is a template with one parameter pack
    auto f = []<typename... Ts>(Ts&&... ts)
    {
        return foo(std::forward<Ts>(ts)...);
    };
```
| (desde C++20)

A especificação de exceção exception na expressão lambda se aplica a operator().

Para fins de [busca de nome](<#/doc/language/lookup>), determinação do tipo e valor do [ponteiro this](<#/doc/language/this>) e para acessar membros de classe não-estáticos, o corpo de operator() do tipo closure é considerado no contexto da expressão lambda.
```cpp
    struct X
    {
        int x, y;
        int operator()(int);
        void f()
        {
            // the context of the following lambda is the member function X::f
            = -> int
            {
                return operator()(this->x + y); // X::operator()(this->x + (*this).y)
                                                // this has type X*
            };
        }
    };
```

### Referências Pendentes

Se uma entidade não-referência for capturada por referência, implícita ou explicitamente, e operator() do objeto closure for invocado após o término da vida útil da entidade, ocorre comportamento indefinido. Os closures C++ não estendem a vida útil dos objetos capturados por referência.

O mesmo se aplica à vida útil do objeto *this atual capturado via `this`.

1. [↑](<#/doc/language/lambda>) Embora a dedução do tipo de retorno de função seja introduzida em C++14, sua regra está disponível para dedução do tipo de retorno de lambda em C++11.

## ClosureType::operator ret(*)(params)()

```cpp
lambda não-genérica sem captura
using F = ret(*)(params);
operator F() const noexcept;  // (até C++17)
using F = ret(*)(params);
constexpr operator F() const noexcept;  // (desde C++17)
lambda genérica sem captura
template<template-params> using fptr_t = /* see below */;
template<template-params>
operator fptr_t<template-params>() const noexcept;  // (desde C++14)
(até C++17)
template<template-params> using fptr_t = /* see below */;
template<template-params>
constexpr operator fptr_t<template-params>() const noexcept;  // (desde C++17)
```

Esta [função de conversão definida pelo usuário](<#/doc/language/cast_operator>) é definida apenas se a lista de captura da expressão lambda estiver vazia e não tiver um parâmetro de objeto explícito (desde C++23). É uma função membro pública, constexpr (desde C++17), não-virtual, não-explícita, const noexcept do objeto closure.

```cpp
Esta função é uma função imediata se o operador de chamada de função (ou especialização, para lambdas genéricas) for uma função imediata.  // (desde C++20)
Uma lambda genérica sem captura possui um template de função de conversão definido pelo usuário com a mesma lista de parâmetros de template inventada que operator().
```
```cpp
    void f1(int (*)(int)) {}
    void f2(char (*)(int)) {}
    void h(int (*)(int)) {}  // #1
    void h(char (*)(int)) {} // #2
    
    auto glambda =  { return a; };
    f1(glambda); // OK
    f2(glambda); // error: not convertible
    h(glambda);  // OK: calls #1 since #2 is not convertible
    
    int& (*fpi)(int*) =  -> auto& { return *a; }; // OK
```
| (desde C++14)

O valor retornado pela função de conversão é um ponteiro para uma função com [ligação de linguagem](<#/doc/language/language_linkage>) C++ que, quando invocada, tem o mesmo efeito que invocar o operador de chamada de função do tipo closure em uma instância default-construída do tipo closure. | (até C++14)
O valor retornado pela função de conversão (template) é um ponteiro para uma função com [ligação de linguagem](<#/doc/language/language_linkage>) C++ que, quando invocada, tem o mesmo efeito que:
  * para lambdas não-genéricas, invocar operator() do tipo closure em uma instância default-construída do tipo closure.
  * para lambdas genéricas, invocar a especialização operator() correspondente da lambda genérica em uma instância default-construída do tipo closure.
| (desde C++14)
(até C++23)
O valor retornado pela função de conversão (template) é
  * se operator() for static, um ponteiro para esse operator() com [ligação de linguagem](<#/doc/language/language_linkage>) C++,
  * caso contrário, um ponteiro para uma função com [ligação de linguagem](<#/doc/language/language_linkage>) C++ que, quando invocada, tem o mesmo efeito que:
    * para lambdas não-genéricas, invocar operator() do tipo closure em uma instância default-construída do tipo closure.
    * para lambdas genéricas, invocar a especialização operator() correspondente da lambda genérica em uma instância default-construída do tipo closure.
| (desde C++23)

Esta função é constexpr se o operador de chamada de função (ou especialização, para lambdas genéricas) for constexpr.
```cpp
    auto Fwd = (int), auto a) { return fp(a); };
    auto C =  { return a; };
    static_assert(Fwd(C, 3) == 3);  // OK
    
    auto NC =  { static int s; return a; };
    static_assert(Fwd(NC, 3) == 3); // error: no specialization can be
                                    // constexpr because of static s
```
```cpp
Se operator() do objeto closure tiver uma especificação de exceção não-lançadora, então o ponteiro retornado por esta função tem o tipo ponteiro para função noexcept.  // (desde C++17)
```

## ClosureType::ClosureType()

ClosureType() = default; | | (desde C++20)
(somente se nenhuma captura for especificada)
ClosureType(const ClosureType&) = default;
ClosureType(ClosureType&&) = default;

Tipos closure não são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). Tipos closure não possuem construtor padrão. | (até C++20)
---|---
Se nenhuma captura for especificada, o tipo closure tem um construtor padrão default. Caso contrário, ele não tem construtor padrão (isso inclui o caso em que há um capture-default, mesmo que ele não capture nada de fato). | (desde C++20)

O construtor de cópia e o construtor de movimento são declarados como defaulted e podem ser implicitamente definidos de acordo com as regras usuais para [construtores de cópia](<#/doc/language/copy_constructor>) e [construtores de movimento](<#/doc/language/move_constructor>).

## ClosureType::operator=(const ClosureType&)

```cpp
ClosureType& operator=(const ClosureType&) = delete;  // (até C++20)
ClosureType& operator=(const ClosureType&) = default;
ClosureType& operator=(ClosureType&&) = default;  // (desde C++20)
(somente se nenhuma captura for especificada)
ClosureType& operator=(const ClosureType&) = delete;  // (desde C++20)
(caso contrário)
```

O operador de atribuição de cópia é definido como deleted (e o operador de atribuição de movimento não é declarado). Tipos closure não são [CopyAssignable](<#/doc/named_req/CopyAssignable>). | (até C++20)
---|---
Se nenhuma captura for especificada, o tipo closure tem um operador de atribuição de cópia default e um operador de atribuição de movimento default. Caso contrário, ele tem um operador de atribuição de cópia deleted (isso inclui o caso em que há um capture-default, mesmo que ele não capture nada de fato). | (desde C++20)
## ClosureType::~ClosureType()

`~ClosureType() = default;`

O destrutor é implicitamente declarado.

## ClosureType::Captures

`T1 a; T2 b; ...`

Se a expressão lambda captura algo por cópia (seja implicitamente com a cláusula de captura `[=]` ou explicitamente com uma captura que não inclui o caractere &, por exemplo `[a, b, c]`), o tipo de closure inclui membros de dados não estáticos sem nome, declarados em ordem não especificada, que contêm cópias de todas as entidades que foram assim capturadas.

Aqueles membros de dados que correspondem a capturas sem inicializadores são [inicializados diretamente](<#/doc/language/direct_initialization>) quando a expressão lambda é avaliada. Aqueles que correspondem a capturas com inicializadores são inicializados conforme o inicializador exige (podendo ser inicialização por cópia ou direta). Se um array é capturado, os elementos do array são inicializados diretamente em ordem crescente de índice. A ordem em que os membros de dados são inicializados é a ordem em que são declarados (que é não especificada).

O tipo de cada membro de dados é o tipo da entidade capturada correspondente, exceto se a entidade tiver tipo de referência (nesse caso, referências a funções são capturadas como referências lvalue para as funções referenciadas, e referências a objetos são capturadas como cópias dos objetos referenciados).

Para as entidades que são capturadas por referência (com o capture-default `[ &]` ou ao usar o caractere &, por exemplo `[ &a, &b, &c]`), é não especificado se membros de dados adicionais são declarados no tipo de closure, mas quaisquer membros adicionais devem satisfazer [LiteralType](<#/doc/named_req/LiteralType>)(desde C++17).

Expressões lambda não são permitidas em [expressões não avaliadas](<#/doc/language/expressions>), [argumentos de template](<#/doc/language/template_parameters>), [declarações de alias](<#/doc/language/type_alias>), [declarações typedef](<#/doc/language/typedef>), e em qualquer lugar em uma declaração de função (ou template de função) exceto o corpo da função e os [argumentos padrão](<#/doc/language/default_arguments>) da função. | (até C++20)

### Lambda capture

As capturas são uma lista separada por vírgulas de zero ou mais _capturas_, opcionalmente começando com o capture-default. A lista de captura define as variáveis externas que são acessíveis de dentro do corpo da função lambda. Os únicos capture-defaults são

*   `&` (captura implicitamente as variáveis usadas com duração de armazenamento automática por referência) e
*   `=` (captura implicitamente as variáveis usadas com duração de armazenamento automática por cópia).

O objeto atual (`*this`) pode ser implicitamente capturado se qualquer um dos capture-defaults estiver presente. Se implicitamente capturado, ele é sempre capturado por referência, mesmo que o capture-default seja `=`. A captura implícita de `*this` quando o capture-default é `=` é descontinuada.(desde C++20)

A sintaxe de uma captura individual em capturas é

---
`identifier` | (1) |
---|---|---
`identifier` `...` | (2) |
`identifier initializer` | (3) | (desde C++14)
`&` `identifier` | (4) |
`&` `identifier` `...` | (5) |
`&` `identifier initializer` | (6) | (desde C++14)
`this` | (7) |
`*` `this` | (8) | (desde C++17)
`...` `identifier initializer` | (9) | (desde C++20)
`&` `...` `identifier initializer` | (10) | (desde C++20)

1) captura simples por cópia

2) captura simples por cópia que é uma [expansão de pacote](<#/doc/language/parameter_pack>)

3) captura por cópia com um [inicializador](<#/doc/language/initialization>)

4) captura simples por referência

5) captura simples por referência que é uma [expansão de pacote](<#/doc/language/parameter_pack>)

6) captura por referência com um inicializador

7) captura simples por referência do objeto atual

8) captura simples por cópia do objeto atual

9) captura por cópia com um inicializador que é uma expansão de pacote

10) captura por referência com um inicializador que é uma expansão de pacote

Se o capture-default for `&`, as capturas simples subsequentes não devem começar com `&`.
```cpp
    struct S2 { void f(int i); };
    void S2::f(int i)
    {
        [&] {};          // OK: by-reference capture default
        [&, i] {};       // OK: by-reference capture, except i is captured by copy
        [&, &i] {};      // Error: by-reference capture when by-reference is the default
        [&, this] {};    // OK, equivalent to [&]
        [&, this, i] {}; // OK, equivalent to [&, i]
    }
```

Se o capture-default for `=`, as capturas simples subsequentes devem começar com `&` ou ser `*this`(desde C++17) ou `this`(desde C++20).
```cpp
    struct S2 { void f(int i); };
    void S2::f(int i)
    {
        [=] {};        // OK: by-copy capture default
        [=, &i] {};    // OK: by-copy capture, except i is captured by reference
        [=, *this] {}; // until C++17: Error: invalid syntax
                       // since C++17: OK: captures the enclosing S2 by copy
        [=, this] {};  // until C++20: Error: this when = is the default
                       // since C++20: OK, same as [=]
    }
```

Qualquer captura pode aparecer apenas uma vez, e seu nome deve ser diferente de qualquer nome de parâmetro:
```cpp
    struct S2 { void f(int i); };
    void S2::f(int i)
    {
        [i, i] {};        // Error: i repeated
        [this, *this] {}; // Error: "this" repeated (C++17)
    
        [i] (int i) {};   // Error: parameter and capture have the same name
    }
```

Apenas expressões lambda definidas em escopo de bloco ou em um [inicializador de membro padrão](<#/doc/language/data_members>) podem ter um capture-default ou capturas sem inicializadores. Para tal expressão lambda, o _escopo de alcance_ é definido como o conjunto de escopos envolventes até e incluindo a função envolvente mais interna (e seus parâmetros). Isso inclui escopos de bloco aninhados e os escopos de lambdas envolventes se esta lambda estiver aninhada.

O identificador em qualquer captura sem um inicializador (que não seja a captura de `this`) é procurado usando a [pesquisa de nome não qualificado](<#/doc/language/lookup>) usual no _escopo de alcance_ da lambda. O resultado da pesquisa deve ser uma [variável](<#/doc/language/objects>) com duração de armazenamento automática declarada no escopo de alcance, ou um [structured binding](<#/doc/language/structured_binding>) cuja variável correspondente satisfaça tais requisitos(desde C++20). A entidade é _explicitamente capturada_.

Uma captura com um inicializador, chamada _init-capture_, age como se declarasse e capturasse explicitamente uma variável declarada com o especificador de tipo [`auto`](<#/doc/language/auto>) e o mesmo inicializador, cuja região declarativa é o corpo da expressão lambda (ou seja, não está no escopo dentro de seu inicializador), exceto que:

*   se a captura for por cópia, o membro de dados não estático introduzido do objeto closure é outra forma de se referir a essa variável;
    *   em outras palavras, a variável de origem não existe de fato, e a dedução de tipo via auto e a inicialização são aplicadas ao membro de dados não estático;
*   se a captura for por referência, o tempo de vida da variável de referência termina quando o tempo de vida do objeto closure termina.

Isso é usado para capturar tipos move-only com uma captura como `x = std::move(x)`. Isso também torna possível capturar por referência const, com `&cr = [std::as_const](<#/doc/utility/as_const>)(x)` ou similar.
```cpp
    int x = 4;
    
    auto y = &r = x, x = x + 1 -> int
    {
        r += 2;
        return x * x;
    }(); // updates ::x to 6 and initializes y to 25.
```

| (desde C++14)

Se uma lista de captura tem um capture-default e não captura explicitamente o objeto envolvente (como `this` ou `*this`), ou uma variável automática que é [odr-utilizável](<#/doc/language/definition>) no corpo da lambda, ou um [structured binding](<#/doc/language/structured_binding>) cuja variável correspondente tem duração de armazenamento atômica(desde C++20), ela captura a entidade _implicitamente_ se a entidade for nomeada em uma [expressão potencialmente avaliada](<#/doc/language/expressions>) dentro de uma expressão (incluindo quando o `this->` implícito é adicionado antes do uso de um membro de classe não estático).

Para o propósito de determinar capturas implícitas, [`typeid`](<#/doc/language/typeid>) nunca é considerado para tornar seus operandos não avaliados.

Entidades podem ser implicitamente capturadas mesmo que sejam nomeadas apenas dentro de uma [instrução descartada](<#/doc/language/if>) após a instanciação do corpo da lambda. | (desde C++17)
```cpp
    void f(int, const int (&)[2] = {}) {}   // #1
    void f(const int&, const int (&)[1]) {} // #2
    
    struct NoncopyableLiteralType
    {
        constexpr explicit NoncopyableLiteralType(int n) : n_(n) {}
        NoncopyableLiteralType(const NoncopyableLiteralType&) = delete;
    
        int n_;
    };
    
    void test()
    {
        const int x = 17;
    
        auto l0 = []{ f(x); };           // OK: calls #1, does not capture x
        auto g0 =  { f(x); };  // same as above
    
        auto l1 = [=]{ f(x); };          // OK: captures x (since P0588R1) and calls #1
                                         // the capture can be optimized away
        auto g1 = = { f(x); }; // same as above
    
        auto ltid = [=]{ typeid(x); };   // OK: captures x (since P0588R1)
                                         // even though x is unevaluated
                                         // the capture can be optimized away
    
        auto g2 = =
        {
            int selector[sizeof(a) == 1 ? 1 : 2] = {};
            f(x, selector); // OK: is a dependent expression, so captures x
        };
    
        auto g3 = =
        {
            typeid(a + x);  // captures x regardless of
                            // whether a + x is an unevaluated operand
        };
    
        constexpr NoncopyableLiteralType w{42};
        auto l4 = []{ return w.n_; };      // OK: w is not odr-used, capture is unnecessary
        // auto l5 = [=]{ return w.n_; };  // error: w needs to be captured by copy
    }
```

Se o corpo de uma lambda [usa ODR](<#/doc/language/definition>) uma entidade capturada por cópia, o membro do tipo de closure é acessado. Se não estiver usando ODR a entidade, o acesso é ao objeto original:
```cpp
    void f(const int*);
    void g()
    {
        const int N = 10;
        [=]
        { 
            int arr[N]; // not an odr-use: refers to g's const int N
            f(&N); // odr-use: causes N to be captured (by copy)
                   // &N is the address of the closure object's member N, not g's N
        }();
    }
```

Se uma lambda usa ODR uma referência que é capturada por referência, ela está usando o objeto referenciado pela referência original, não a própria referência capturada:

Execute este código
```cpp
    #include <iostream>
    
    auto make_function(int& x)
    {
        return [&] { std::cout << x << '\n'; };
    }
    
    int main()
    {
        int i = 3;
        auto f = make_function(i); // the use of x in f binds directly to i
        i = 5;
        f(); // OK: prints 5
    }
```

Dentro do corpo de uma lambda com capture-default `=`, o tipo de qualquer entidade capturável é como se ela fosse capturada (e, portanto, a qualificação const é frequentemente adicionada se a lambda não for mutável), mesmo que a entidade esteja em um operando não avaliado e não seja capturada (por exemplo, em [`decltype`](<#/doc/language/decltype>)):
```cpp
    void f3()
    {
        float x, &r = x;
        [=]
        { // x and r are not captured (appearance in a decltype operand is not an odr-use)
            decltype(x) y1;        // y1 has type float
            decltype((x)) y2 = y1; // y2 has type float const& because this lambda
                                   // is not mutable and x is an lvalue
            decltype(r) r1 = y1;   // r1 has type float& (transformation not considered)
            decltype((r)) r2 = y2; // r2 has type float const&
        };
    }
```

Qualquer entidade capturada por uma lambda (implícita ou explicitamente) é usada ODR pela expressão lambda (portanto, a captura implícita por uma lambda aninhada aciona a captura implícita na lambda envolvente).

Todas as variáveis implicitamente capturadas devem ser declaradas dentro do _escopo de alcance_ da lambda.

Se uma lambda captura o objeto envolvente (como `this` ou `*this`), a função envolvente mais próxima deve ser uma função membro não estática ou a lambda deve estar em um [inicializador de membro padrão](<#/doc/language/data_members>):
```cpp
    struct s2
    {
        double ohseven = .007;
        auto f() // nearest enclosing function for the following two lambdas
        {
            return [this]      // capture the enclosing s2 by reference
            {
                return [*this] // capture the enclosing s2 by copy (C++17)
                {
                    return ohseven; // OK
                }
            }();
        }
    
        auto g()
        {
            return [] // capture nothing
            { 
                return [*this] {}; // error: *this not captured by outer lambda expression
            }();
        }
    };
```

Se uma expressão lambda (ou uma especialização do operador de chamada de função de uma lambda genérica)(desde C++14) usa ODR `*this` ou qualquer variável com duração de armazenamento automática, ela deve ser capturada pela expressão lambda.
```cpp
    void f1(int i)
    {
        int const N = 20;
        auto m1 = [=]
        {
            int const M = 30;
            auto m2 = [i]
            {
                int x[N][M]; // N and M are not odr-used 
                             // (ok that they are not captured)
                x[0][0] = i; // i is explicitly captured by m2
                             // and implicitly captured by m1
            };
        };
    
        struct s1 // local class within f1()
        {
            int f;
            void work(int n) // non-static member function
            {
                int m = n * n;
                int j = 40;
                auto m3 = [this, m]
                {
                    auto m4 = [&, j] // error: j is not captured by m3
                    {
                        int x = n; // error: n is implicitly captured by m4
                                   // but not captured by m3
                        x += m;    // OK: m is implicitly captured by m4
                                   // and explicitly captured by m3
                        x += i;    // error: i is outside of the reaching scope
                                   // (which ends at work())
                        x += f;    // OK: this is captured implicitly by m4
                                   // and explicitly captured by m3
                    };
                };
            }
        };
    }
```

Membros de classe não podem ser capturados explicitamente por uma captura sem inicializador (como mencionado acima, apenas [variáveis](<#/doc/language/objects>) são permitidas na lista de captura):
```cpp
    class S
    {
        int x = 0;
    
        void f()
        {
            int i = 0;
        //  auto l1 = [i, x] { use(i, x); };      // error: x is not a variable
            auto l2 = [i, x = x] { use(i, x); };  // OK, copy capture
            i = 1; x = 1; l2(); // calls use(0,0)
            auto l3 = [i, &x = x] { use(i, x); }; // OK, reference capture
            i = 2; x = 2; l3(); // calls use(1,2)
        }
    };
```

Quando uma lambda captura um membro usando captura implícita por cópia, ela não faz uma cópia dessa variável membro: o uso de uma variável membro `m` é tratado como uma expressão `(*this).m`, e `*this` é sempre implicitamente capturado por referência:
```cpp
    class S
    {
        int x = 0;
    
        void f()
        {
            int i = 0;
    
            auto l1 = [=] { use(i, x); }; // captures a copy of i and
                                          // a copy of the this pointer
            i = 1; x = 1; l1();           // calls use(0, 1), as if
                                          // i by copy and x by reference
    
            auto l2 = [i, this] { use(i, x); }; // same as above, made explicit
            i = 2; x = 2; l2();           // calls use(1, 2), as if
                                          // i by copy and x by reference
    
            auto l3 = [&] { use(i, x); }; // captures i by reference and
                                          // a copy of the this pointer
            i = 3; x = 2; l3();           // calls use(3, 2), as if
                                          // i and x are both by reference
    
            auto l4 = [i, *this] { use(i, x); }; // makes a copy of *this,
                                                 // including a copy of x
            i = 4; x = 4; l4();           // calls use(3, 2), as if
                                          // i and x are both by copy
        }
    };
```

Se uma expressão lambda aparece em um [argumento padrão](<#/doc/language/default_arguments>), ela não pode capturar nada explícita ou implicitamente, a menos que todas as capturas tenham inicializadores que satisfaçam as restrições de uma expressão que aparece em um argumento padrão(desde C++14):
```cpp
    void f2()
    {
        int i = 1;
    
        void g1( int = [i] { return i; }() ); // error: captures something
        void g2( int = [i] { return 0; }() ); // error: captures something
        void g3( int = [=] { return i; }() ); // error: captures something
    
        void g4( int = [=] { return 0; }() );       // OK: capture-less
        void g5( int = [] { return sizeof i; }() ); // OK: capture-less
    
        // C++14
        void g6( int = [x = 1] { return x; }() ); // OK: 1 can appear
                                                  //     in a default argument
        void g7( int = [x = i] { return x; }() ); // error: i cannot appear
                                                  //        in a default argument
    }
```

Membros de [uniões anônimas](<#/doc/language/union>) não podem ser capturados. [Bit-fields](<#/doc/language/bit_field>) só podem ser capturados por cópia.

Se uma lambda aninhada `m2` captura algo que também é capturado pela lambda `m1` imediatamente envolvente, então a captura de `m2` é transformada da seguinte forma:

*   se a lambda envolvente `m1` captura por cópia, `m2` está capturando o membro não estático do tipo de closure de `m1`, não a variável original ou `*this`; se `m1` não for mutável, o membro de dados não estático é considerado qualificado como const.
*   se a lambda envolvente `m1` captura por referência, `m2` está capturando a variável original ou `*this`.

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        int a = 1, b = 1, c = 1;
    
        auto m1 = a, &b, &c mutable
        {
            auto m2 = a, b, &c mutable
            {
                std::cout << a << b << c << '\n';
                a = 4; b = 4; c = 4;
            };
            a = 3; b = 3; c = 3;
            m2();
        };
    
        a = 2; b = 2; c = 2;
    
        m1();                             // calls m2() and prints 123
        std::cout << a << b << c << '\n'; // prints 234
    }
```

Se uma lambda captura algo, o tipo do parâmetro de objeto explícito (se houver) do operador de chamada de função pode ser apenas

*   o tipo de closure,
*   um tipo de classe pública e inequivocamente derivado do tipo de closure, ou
*   uma referência a um tipo possivelmente cv-qualificado.

```cpp
    struct C 
    {
        template<typename T>
        C(T);
    };
    
    void func(int i) 
    {
        int x = = { return i; }();  // OK
        int y = = { return i; }();       // error
        int z =  { return 42; }();       // OK
    
        auto lambda = [n = 42] (this auto self) { return n; };
        using Closure = decltype(lambda);
        struct D : private Closure {
            D(Closure l) : Closure(l) {}
            using Closure::operator();
            friend Closure;
        };
        D{lambda}(); // error
    }
```

| (desde C++23)

### Notes

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lambdas`](<#/doc/feature_test>) | [`200907L`](<#/>) | (C++11) | Expressões lambda
[`__cpp_generic_lambdas`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Expressões lambda genéricas
[`201707L`](<#/>) | (C++20) | Lista explícita de parâmetros de template para lambdas genéricas
[`__cpp_init_captures`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Init-capture de lambda
[`201803L`](<#/>) | (C++20) | Permitir expansão de pacote em init-capture de lambda
[`__cpp_capture_star_this`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | Captura de *this por valor como [=, *this] em lambda
[`__cpp_constexpr`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | Lambda constexpr
[`__cpp_static_call_operator`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | operator() estático para lambdas sem captura

A regra para captura implícita de lambda foi ligeiramente alterada pelo relatório de defeito [P0588R1](<https://wg21.link/P0588R1>). Em outubro de 2023, algumas implementações principais não implementaram completamente o DR, e, portanto, a regra antiga, que detecta [uso ODR](<#/doc/language/definition>), ainda é usada em alguns casos.

Regra antiga antes de P0588R1
---
Se uma lista de captura tem um capture-default e não captura explicitamente o objeto envolvente (como `this` ou `*this`), ou uma variável automática que é [odr-utilizável](<#/doc/language/definition>) no corpo da lambda, ou um [structured binding](<#/doc/language/structured_binding>) cuja variável correspondente tem duração de armazenamento atômica(desde C++20), ela captura a entidade _implicitamente_ se a entidade for |

*   nomeada em uma [expressão potencialmente avaliada](<#/doc/language/expressions>) dentro de uma expressão que depende de um parâmetro de template de uma lambda genérica, ou

| (desde C++14)

*   [usada ODR](<#/doc/language/definition>) pelo corpo da lambda.

### Example

Este exemplo mostra como passar uma lambda para um algoritmo genérico e como objetos resultantes de uma expressão lambda podem ser armazenados em objetos [std::function](<#/doc/utility/functional/function>).

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> c{1, 2, 3, 4, 5, 6, 7};
        int x = 5;
        c.erase(std::remove_if(c.begin(), c.end(), x { return n < x; }), c.end());
    
        std::cout << "c: ";
        std::for_each(c.begin(), c.end(),  { std::cout << i << ' '; });
        std::cout << '\n';
    
        // the type of a closure cannot be named, but can be inferred with auto
        // since C++14, lambda could own default arguments
        auto func1 =  { return i + 4; };
        std::cout << "func1: " << func1() << '\n';
    
        // like all callable objects, closures can be captured in std::function
        // (this may incur unnecessary overhead)
        std::function<int(int)> func2 =  { return i + 4; };
        std::cout << "func2: " << func2(6) << '\n';
    
        constexpr int fib_max {8};
        std::cout << "Emulate `recursive lambda` calls:\nFibonacci numbers: ";
        auto nth_fibonacci = 
        {
            std::function<int(int, int, int)> fib = &
            {
                return n ? fib(n - 1, a + b, a) : b;
            };
            return fib(n, 0, 1);
        };
    
        for (int i{1}; i <= fib_max; ++i)
            std::cout << nth_fibonacci(i) << (i < fib_max ? ", " : "\n");
    
        std::cout << "Alternative approach to lambda recursion:\nFibonacci numbers: ";
        auto nth_fibonacci2 =  -> int
        {
            return n ? self(self, n - 1, a + b, a) : b;
        };
    
        for (int i{1}; i <= fib_max; ++i)
            std::cout << nth_fibonacci2(nth_fibonacci2, i) << (i < fib_max ? ", " : "\n");
    
    #ifdef __cpp_explicit_this_parameter
        std::cout << "C++23 approach to lambda recursion:\n";
        auto nth_fibonacci3 =  -> int
        {
             return n ? self(n - 1, a + b, a) : b;
        };
    
        for (int i{1}; i <= fib_max; ++i)
            std::cout << nth_fibonacci3(i) << (i < fib_max ? ", " : "\n");
    #endif
    }
```

Saída possível:
```
    c: 5 6 7
    func1: 10
    func2: 10
    Emulate `recursive lambda` calls:
    Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13
    Alternative approach to lambda recursion:
    Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 974](<https://cplusplus.github.io/CWG/issues/974.html>) | C++11 | argumento padrão não era permitido na lista de parâmetros de uma expressão lambda | permitido
[CWG 1048](<https://cplusplus.github.io/CWG/issues/1048.html>) ([N3638](<https://wg21.link/N3638>)) | C++11 | o tipo de retorno só podia ser deduzido para corpos de lambda contendo apenas uma instrução de retorno | dedução de tipo de retorno melhorada
[CWG 1249](<https://cplusplus.github.io/CWG/issues/1249.html>) | C++11 | não estava claro se o membro capturado da lambda não mutável envolvente era considerado const ou não | considerado const
[CWG 1557](<https://cplusplus.github.io/CWG/issues/1557.html>) | C++11 | a ligação de linguagem do tipo de função retornado da função de conversão do tipo de closure não era especificada | tem ligação de linguagem C++
[CWG 1607](<https://cplusplus.github.io/CWG/issues/1607.html>) | C++11 | expressões lambda podiam aparecer em assinaturas de funções e templates de funções | não permitido
[CWG 1612](<https://cplusplus.github.io/CWG/issues/1612.html>) | C++11 | membros de uniões anônimas podiam ser capturados | não permitido
[CWG 1722](<https://cplusplus.github.io/CWG/issues/1722.html>) | C++11 | a função de conversão para lambdas sem captura tinha especificação de exceção não especificada | função de conversão é noexcept
[CWG 1772](<https://cplusplus.github.io/CWG/issues/1772.html>) | C++11 | a semântica de __func__ no corpo da lambda não estava clara | refere-se ao operator() da classe de closure
[CWG 1780](<https://cplusplus.github.io/CWG/issues/1780.html>) | C++14 | não estava claro se os membros dos tipos de closure de lambdas genéricas podiam ser explicitamente instanciados ou explicitamente especializados | nenhum é permitido
[CWG 1891](<https://cplusplus.github.io/CWG/issues/1891.html>) | C++11 | closure tinha um construtor padrão deletado e construtores de cópia/movimentação implícitos | sem construtor padrão e construtores de cópia/movimentação padronizados
[CWG 1937](<https://cplusplus.github.io/CWG/issues/1937.html>) | C++11 | quanto ao efeito de invocar o resultado da função de conversão, era não especificado em qual objeto chamar seu operator() tem o mesmo efeito | em uma instância default-constructed do tipo de closure
[CWG 1973](<https://cplusplus.github.io/CWG/issues/1973.html>) | C++11 | a lista de parâmetros do operator() do tipo de closure podia se referir à lista de parâmetros fornecida no trailing-type | pode se referir apenas a parâmetros
[CWG 2011](<https://cplusplus.github.io/CWG/issues/2011.html>) | C++11 | para uma referência capturada por referência, era não especificado a qual entidade o identificador da captura se refere | refere-se à entidade originalmente referenciada
[CWG 2095](<https://cplusplus.github.io/CWG/issues/2095.html>) | C++11 | o comportamento de capturar referências rvalue a funções por cópia não estava claro | esclarecido
[CWG 2211](<https://cplusplus.github.io/CWG/issues/2211.html>) | C++11 | o comportamento era não especificado se uma captura tivesse o mesmo nome que um parâmetro | o programa é malformado neste caso
[CWG 2358](<https://cplusplus.github.io/CWG/issues/2358.html>) | C++14 | expressões lambda aparecendo em argumentos padrão tinham que ser sem captura mesmo se todas as capturas fossem inicializadas com expressões que podem aparecer em argumentos padrão | permitir tais expressões lambda com capturas
[CWG 2509](<https://cplusplus.github.io/CWG/issues/2509.html>) | C++17 | cada especificador podia ter múltiplas ocorrências na sequência de especificadores | cada especificador pode aparecer no máximo uma vez na sequência de especificadores
[CWG 2561](<https://cplusplus.github.io/CWG/issues/2561.html>) | C++23 | uma lambda com parâmetro de objeto explícito podia ter uma função de conversão para um tipo de ponteiro de função indesejado | não tem tal função de conversão
[CWG 2881](<https://cplusplus.github.io/CWG/issues/2881.html>) | C++23 | operator() com parâmetro explícito podia ser instanciado para uma classe derivada quando a herança não era pública ou ambígua | tornado malformado
[P0588R1](<https://wg21.link/P0588R1>) | C++11 | a regra para captura implícita de lambda detectava uso ODR | a detecção é simplificada

### See also

[`auto`](<#/doc/language/auto>) specifier | (C++11) | especifica um tipo deduzido de uma expressão
---|---|---
[`function`](<#/doc/utility/functional/function>) | (C++11) | wrapper copiável de qualquer objeto chamável copiável (class template)
[`move_only_function`](<#/doc/utility/functional/move_only_function>) | (C++23) | wrapper move-only de qualquer objeto chamável que suporta qualificadores em uma dada assinatura de chamada (class template)

Links externos

[Função aninhada](<https://en.wikipedia.org/wiki/Nested_function> "enwiki:Nested function") - uma função que é definida dentro de outra função (_envolvente_).
---