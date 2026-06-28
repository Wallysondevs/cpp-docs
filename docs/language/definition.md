# Definições e ODR (Regra de Uma Definição)

_Definições_ são [declarações](<#/doc/language/declarations>) que definem completamente a entidade introduzida pela declaração. Toda declaração é uma definição, exceto pelas seguintes:

  * Uma declaração de função sem um corpo de função:

```
    int f(int); // declara, mas não define f
```

  * Qualquer declaração com um [especificador de classe de armazenamento](<#/doc/language/storage_duration>) `extern` ou com um [especificador de ligação de linguagem](<#/doc/language/language_linkage>) (como `extern "C"`) sem um inicializador:

```
    extern const int a;     // declara, mas não define a
    extern const int b = 1; // define b
```

  * Declaração de um [membro de dados estático](<#/doc/language/static>) não-inline (desde C++17) dentro de uma definição de classe:

```
    struct S
    {
        int n;               // define S::n
        static int i;        // declara, mas não define S::i
        inline static int x; // define S::x
    };                       // define S
    
    int S::i;                // define S::i
```

  * (obsoleto) Declaração no escopo de namespace de um membro de dados estático que foi definido dentro da classe com o especificador [`constexpr`](<#/doc/language/constexpr>):

```
    struct S
    {
        static constexpr int x = 42; // implicitamente inline, define S::x
    };
    
    constexpr int S::x; // declara S::x, não uma redefinição
```

| (desde C++17)

  * Declaração de um nome de classe (por [declaração antecipada](<#/doc/language/class>) ou pelo uso do especificador de tipo elaborado em outra declaração):

```
    struct S;             // declara, mas não define S
    
    class Y f(class T p); // declara, mas não define Y e T (e também f e p)
```

  * Uma [declaração opaca](<#/doc/language/enum>) de uma enumeração:

```
    enum Color : int; // declara, mas não define Color
```

| (desde C++11)

  * Declaração de um [parâmetro de template](<#/doc/language/template_parameters>):

```
    template<typename T> // declara, mas não define T
```

  * Uma declaração de parâmetro em uma declaração de função que não é uma definição:

```
    int f(int x); // declara, mas não define f e x
    
    int f(int x)  // define f e x
    {
        return x + a;
    }
```

  * Uma declaração [typedef](<#/doc/language/typedef>):

```
    typedef S S2; // declara, mas não define S2 (S pode estar incompleto)
```

  * Uma [declaração de alias](<#/doc/language/type_alias>):

```
    using S2 = S; // declara, mas não define S2 (S pode estar incompleto)
```

| (desde C++11)

  * Uma [declaração using](<#/doc/language/using_declaration>):

```
    using N::d; // declara, mas não define d
```

  * Declaração de um [guia de dedução](<#/doc/language/ctad>) (não define nenhuma entidade)

| (desde C++17)

  * Uma declaração [static_assert](<#/doc/language/static_assert>) (não define nenhuma entidade)
  * Uma [declaração de atributo](<#/doc/language/declarations>) (não define nenhuma entidade)

| (desde C++11)

  * Uma [declaração vazia](<#/doc/language/declarations>) (não define nenhuma entidade)
  * Uma [diretiva using](<#/doc/language/namespace>) (não define nenhuma entidade)

  * Uma [declaração de instanciação explícita](<#/doc/language/class_template>) (um "extern template"):

```
    extern template
    f<int, char>; // declara, mas não define f<int, char>
```

| (desde C++11)

  * Uma [especialização explícita](<#/doc/language/template_specialization>) cuja declaração não é uma definição:

```
    template<>
    struct A<int>; // declara, mas não define A<int>
```

Uma [declaração asm](<#/doc/language/asm>) não define nenhuma entidade, mas é classificada como uma definição.

Onde necessário, o compilador pode definir implicitamente o [construtor padrão](<#/doc/language/default_constructor>), [construtor de cópia](<#/doc/language/copy_constructor>), [construtor de movimento](<#/doc/language/move_constructor>), [operador de atribuição de cópia](<#/doc/language/as_operator>), [operador de atribuição de movimento](<#/doc/language/move_operator>) e o [destrutor](<#/doc/language/destructor>).

Se a definição de qualquer objeto resultar em um objeto de [tipo incompleto](<#/doc/language/incomplete_type>) ou [tipo de classe abstrata](<#/doc/language/abstract_class>), o programa é malformado.

### Regra de Uma Definição (ODR)

Apenas uma definição de qualquer variável, função, tipo de classe, tipo de enumeração[, concept](<#/doc/language/constraints>) (desde C++20) ou template é permitida em qualquer unidade de tradução (alguns destes podem ter múltiplas declarações, mas apenas uma definição é permitida).

Uma e apenas uma definição de cada função ou variável não-[inline](<#/doc/language/inline>) que é _odr-usada_ (veja abaixo) é exigida em todo o programa (incluindo quaisquer bibliotecas padrão e definidas pelo usuário). O compilador não é obrigado a diagnosticar esta violação, mas o comportamento do programa que a viola é indefinido.

Para uma função inline ou variável inline (desde C++17), uma definição é exigida em cada unidade de tradução onde ela é _odr-usada_.

Para uma classe, uma definição é exigida onde quer que a classe seja usada de uma forma que exija que ela esteja [completa](<#/doc/language/incomplete_type>).

Pode haver mais de uma definição em um programa de cada um dos seguintes: tipo de classe, tipo de enumeração, função inline, variável inline (desde C++17), [entidade template](<#/doc/language/templates>) (template ou membro de template, mas não [especialização de template](<#/doc/language/template_specialization>) completa), desde que todas as seguintes condições sejam satisfeitas:

  * Cada definição aparece em uma unidade de tradução diferente.

  * As definições não estão [anexadas a um módulo nomeado](<#/doc/language/modules>).

| (desde C++20)

  * Cada definição consiste na mesma sequência de [tokens](<#/doc/language/translation_phases>) (tipicamente, aparece no mesmo header).
  * A pesquisa de nome de dentro de cada definição encontra as mesmas entidades (após [resolução de sobrecarga](<#/doc/language/overload_resolution>)), exceto que:

    

  * Constantes com ligação interna ou sem ligação podem se referir a objetos diferentes, desde que não sejam odr-usadas e tenham os mesmos valores em cada definição.

    

  * [Expressões lambda](<#/doc/language/lambda>) que não estão em um argumento padrão ou um argumento de template padrão (desde C++20) são identificadas unicamente pela sequência de tokens usados para defini-las.

| (desde C++11)

  * Operadores sobrecarregados, incluindo funções de conversão, alocação e desalocação, referem-se à mesma função de cada definição (a menos que se refiram a uma definida dentro da própria definição).
  * Entidades correspondentes têm a mesma ligação de linguagem em cada definição (por exemplo, o arquivo include não está dentro de um bloco `extern "C"`).
  * Se um objeto `const` for [inicializado por constante](<#/doc/language/constant_initialization>) em qualquer uma das definições, ele será inicializado por constante em cada definição.
  * As regras acima se aplicam a cada argumento padrão usado em cada definição.
  * Se a definição for para uma classe com um construtor implicitamente declarado, cada unidade de tradução onde ela é odr-usada deve chamar o mesmo construtor para a base e os membros.

  * Se a definição for para uma classe com uma [comparação de três vias](<#/doc/language/default_comparisons>) padrão, cada unidade de tradução onde ela é odr-usada deve chamar o mesmo operador de comparação para a base e os membros.

| (desde C++20)

  * Se a definição for para um template, então todos esses requisitos se aplicam tanto aos nomes no ponto de definição quanto aos nomes dependentes no ponto de instanciação.

Se todos esses requisitos forem satisfeitos, o programa se comporta como se houvesse apenas uma definição em todo o programa. Caso contrário, o programa é malformado, sem diagnóstico exigido.

Nota: Em C, não há ODR em todo o programa para tipos, e mesmo declarações `extern` da mesma variável em diferentes unidades de tradução podem ter tipos diferentes [desde que sejam compatíveis](<#/>). Em C++, os tokens do código-fonte usados em declarações do mesmo tipo devem ser os mesmos descritos acima: se um arquivo .cpp define `struct S { int x; };` e outro arquivo .cpp define `struct S { int y; };`, o comportamento do programa que os liga é indefinido. Isso geralmente é resolvido com [namespaces sem nome](<#/doc/language/namespace>).

#### Nomeando uma entidade

Uma variável é _nomeada_ por uma expressão se a expressão for uma expressão identificadora que a denota.

Uma função é _nomeada_ por uma expressão ou conversão nos seguintes casos:

  * Uma função cujo nome aparece como uma expressão ou conversão (incluindo função nomeada, operador sobrecarregado, [conversão definida pelo usuário](<#/doc/language/cast_operator>), formas de posicionamento definidas pelo usuário de [`operator new`](<#/doc/memory/new/operator_new>), inicialização não-padrão) é nomeada por essa expressão se for selecionada pela resolução de sobrecarga, exceto quando for uma função membro virtual pura não qualificada ou um ponteiro para membro de uma função virtual pura.
  * Uma função de [alocação](<#/doc/memory/new/operator_new>) ou [desalocação](<#/doc/memory/new/operator_delete>) para uma classe é nomeada por uma [expressão new](<#/doc/language/new>) que aparece em uma expressão.
  * Uma função de desalocação para uma classe é nomeada por uma [expressão delete](<#/doc/language/delete>) que aparece em uma expressão.
  * Um construtor selecionado para copiar ou mover um objeto é considerado nomeado pela expressão ou conversão, mesmo que ocorra [elision de cópia](<#/doc/language/copy_elision>). Usar um prvalue em alguns contextos não copia ou move um objeto, veja [elision obrigatória](<#/doc/language/copy_elision>). (desde C++17)

Uma expressão ou conversão potencialmente avaliada odr-usa uma função se a nomeia.

```cpp
Uma expressão ou conversão potencialmente avaliada em tempo de constante que nomeia uma função `constexpr` a torna necessária para avaliação em tempo de constante, o que aciona a definição de uma função padrão ou a instanciação de uma especialização de template de função, mesmo que a expressão não seja avaliada.  // (desde C++11)
```

#### Resultados potenciais

O conjunto de _resultados potenciais_ de uma expressão E é um conjunto (possivelmente vazio) de expressões identificadoras que aparecem dentro de E, combinadas da seguinte forma:

  * Se E for uma [expressão identificadora](<#/doc/language/expressions>), a expressão E é seu único resultado potencial.
  * Se E for uma expressão de subscrito (E1[E2]) onde um dos operandos é um array, os resultados potenciais desse operando são incluídos no conjunto.
  * Se E for uma expressão de acesso a membro de classe na forma E1.E2 ou E1.template E2 nomeando um membro de dados não estático, os resultados potenciais de E1 são incluídos no conjunto.
  * Se E for uma expressão de acesso a membro de classe nomeando um membro de dados estático, a expressão identificadora que designa o membro de dados é incluída no conjunto.
  * Se E for uma expressão de acesso a ponteiro para membro na forma E1.*E2 ou E1.*template E2 cujo segundo operando é uma expressão constante, os resultados potenciais de E1 são incluídos no conjunto.
  * Se E for uma expressão entre parênteses ((E1)), os resultados potenciais de E1 são incluídos no conjunto.
  * Se E for uma expressão condicional glvalue (E1 ? E2 : E3, onde E2 e E3 são glvalues), a união dos resultados potenciais de E2 e E3 são ambos incluídos no conjunto.
  * Se E for uma expressão de vírgula (E1, E2), os resultados potenciais de E2 estão no conjunto de resultados potenciais.
  * Caso contrário, o conjunto está vazio.

#### Uso ODR (definição informal)

Um objeto é odr-usado se seu valor é lido (a menos que seja uma constante em tempo de compilação) ou escrito, seu endereço é tomado, ou uma referência é vinculada a ele,

Uma referência é odr-usada se for usada e seu referente não for conhecido em tempo de compilação,

Uma função é odr-usada se uma chamada de função para ela é feita ou seu endereço é tomado.

Se uma entidade é odr-usada, sua definição deve existir em algum lugar no programa; uma violação disso é geralmente um erro em tempo de linkagem.
```
    struct S
    {
        static const int x = 0; // membro de dados estático
        // uma definição fora da classe é exigida se for odr-usada
    };
    
    const int& f(const int& r);
    
    int n = b ? (1, S::x) // S::x não é odr-usado aqui
              : f(S::x);  // S::x é odr-usado aqui: uma definição é exigida
```

#### Uso ODR (definição formal)

Uma variável x que é nomeada por uma [expressão potencialmente avaliada](<#/doc/language/expressions>) `expr` que aparece em um ponto `P` é odr-usada por `expr`, a menos que qualquer uma das seguintes condições seja satisfeita:

  * x é uma referência que é [utilizável em expressões constantes](<#/doc/language/constant_expression>) em `P`.
  * x não é uma referência e (até C++26) `expr` é um elemento do conjunto de resultados potenciais de uma expressão E, e qualquer uma das seguintes condições é satisfeita:
    * E é uma [expressão de valor descartado](<#/doc/language/expressions>), e nenhuma conversão lvalue-para-rvalue é aplicada a ela.
    * x é um objeto não-volátil (desde C++26) que é utilizável em expressões constantes em `P` e não possui subobjetos mutáveis, e qualquer uma das seguintes condições é satisfeita:

    

    

  * E é uma [expressão de acesso a membro de classe](<#/doc/language/operator_member_access>) nomeando um [membro de dados não estático](<#/doc/language/data_members>) de tipo referência e cuja expressão de objeto tem tipo qualificado não-volátil.

| (desde C++26)

    

    

  * E tem tipo não-classe qualificado não-volátil, e a conversão lvalue-para-rvalue é aplicada a ele.

```
    struct S { static const int x = 1; }; // aplicando conversão lvalue-para-rvalue
                                          // a S::x resulta em uma expressão constante
    
    int f()
    {
        S::x;        // expressão de valor descartado não odr-usa S::x
    
        return S::x; // expressão onde a conversão lvalue-para-rvalue
                     // se aplica não odr-usa S::x
    }
```

`this` é odr-usado se `this` aparece como uma expressão potencialmente avaliada (incluindo o `this` implícito em uma expressão de chamada de função membro não estática).

Uma [ligação estruturada](<#/doc/language/structured_binding>) é odr-usada se aparece como uma expressão potencialmente avaliada. | (desde C++17)

Uma função é odr-usada nos seguintes casos:

  * Uma função é odr-usada se for nomeada por (veja abaixo) uma expressão ou conversão potencialmente avaliada.
  * Uma [função membro virtual](<#/doc/language/virtual>) é odr-usada se não for uma função membro virtual pura (endereços de funções membro virtuais são necessários para construir a vtable).
  * Uma função de alocação ou desalocação não-placement para uma classe é odr-usada pela definição de um construtor dessa classe.
  * Uma função de desalocação não-placement para uma classe é odr-usada pela definição do destrutor dessa classe, ou por ser selecionada pela pesquisa no ponto de definição de um destrutor virtual.
  * Um operador de atribuição em uma classe `T` que é membro ou base de outra classe `U` é odr-usado por funções de atribuição de cópia ou atribuição de movimento implicitamente definidas de `U`.
  * Um construtor (incluindo construtores padrão) para uma classe é odr-usado pela [inicialização](<#/doc/language/initialization>) que o seleciona.
  * Um destrutor para uma classe é odr-usado se for [potencialmente invocado](<#/doc/language/destructor>).

| Esta seção está incompleta
Razão: lista de todas as situações onde o uso ODR faz diferença

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[CWG 261](<https://cplusplus.github.io/CWG/issues/261.html>) | C++98 | uma função de desalocação para uma classe polimórfica
poderia ser odr-usada mesmo que não houvesse
expressões new ou delete relevantes no programa | complementou os
casos de uso ODR para cobrir
construtores e destrutores
[CWG 678](<https://cplusplus.github.io/CWG/issues/678.html>) | C++98 | uma entidade poderia ter definições
com diferentes ligações de linguagem | o comportamento é
indefinido neste caso
[CWG 1472](<https://cplusplus.github.io/CWG/issues/1472.html>) | C++98 | variáveis de referência que satisfazem os requisitos para
aparecer em uma expressão constante eram odr-usadas mesmo
que a conversão lvalue-para-rvalue fosse aplicada imediatamente | elas não são
odr-usadas neste caso
[CWG 1614](<https://cplusplus.github.io/CWG/issues/1614.html>) | C++98 | tomar o endereço de uma função virtual pura a odr-usava | a função não é odr-usada
[CWG 1741](<https://cplusplus.github.io/CWG/issues/1741.html>) | C++98 | objetos constantes que são imediatamente convertidos de lvalue-para-rvalue
em expressões potencialmente avaliadas eram odr-usados | eles não são odr-usados
[CWG 1926](<https://cplusplus.github.io/CWG/issues/1926.html>) | C++98 | expressões de subscrito de array não propagavam resultados potenciais | elas propagam
[CWG 2242](<https://cplusplus.github.io/CWG/issues/2242.html>) | C++98 | não estava claro se um objeto `const` que é apenas
inicializado por constante em parte de suas definições violava a ODR | a ODR não é violada; o objeto é
inicializado por constante neste caso
[CWG 2300](<https://cplusplus.github.io/CWG/issues/2300.html>) | C++11 | expressões lambda em diferentes unidades de
tradução nunca poderiam ter o mesmo tipo de closure | o tipo de closure pode ser o
mesmo sob a regra de uma definição
[CWG 2353](<https://cplusplus.github.io/CWG/issues/2353.html>) | C++98 | um membro de dados estático não era um resultado potencial
---|---|---
de uma expressão de acesso a membro que o acessava | ele é
[CWG 2433](<https://cplusplus.github.io/CWG/issues/2433.html>) | C++14 | um template de variável não poderia ter
múltiplas definições em um programa | ele pode

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 6.3 Regra de uma definição [basic.def.odr]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 6.3 Regra de uma definição [basic.def.odr]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 6.2 Regra de uma definição [basic.def.odr]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 3.2 Regra de uma definição [basic.def.odr]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 3.2 Regra de uma definição [basic.def.odr]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 3.2 Regra de uma definição [basic.def.odr]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 3.2 Regra de uma definição [basic.def.odr]
