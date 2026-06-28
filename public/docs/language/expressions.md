# Expressões

Uma expressão é uma sequência de _operadores_ e seus _operandos_, que especifica um cálculo.

A avaliação de uma expressão pode produzir um resultado (por exemplo, a avaliação de 2 + 2 produz o resultado 4) e pode gerar efeitos colaterais (por exemplo, a avaliação de [std::printf](<#/doc/io/c/fprintf>)("%d", 4) imprime o caractere '4' na saída padrão).

Cada expressão C++ é caracterizada por duas propriedades independentes: Um tipo e uma categoria de valor.

#### Geral

*   [categorias de valor](<#/doc/language/value_category>) (lvalue, rvalue, glvalue, prvalue, xvalue (desde C++11)) classificam expressões por seus valores
*   [ordem de avaliação](<#/doc/language/eval_order>) de argumentos e subexpressões especifica a ordem em que os resultados intermediários são obtidos

### Operadores

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | [incremento
---|---
decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | [acesso a
membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)
a = b
a += b
a -= b
a *= b
a /= b
a %= b
a &= b
a |= b
a ^= b
a <<= b
a >>= b | ++a
--a
a++
a-- | +a
-a
a + b
a - b
a * b
a / b
a % b
~a
a & b
a | b
a ^ b
a << b
a >> b | !a
a && b
a || b | a == b
a != b
a < b
a > b
a <= b
a >= b
a <=> b | a[...]
*a
&a
a->b
a.b
a->*b
a.*b | chamada de função

a(...)
vírgula

a, b
condicional

a ? b : c
Operadores especiais
[`static_cast`](<#/doc/language/static_cast>) converte um tipo para outro tipo relacionado
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte um tipo para um tipo não relacionado
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo para outro através de uma mistura de static_cast, const_cast e reinterpret_cast
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)

*   [precedência de operadores](<#/doc/language/operator_precedence>) define a ordem em que os operadores são ligados aos seus argumentos
*   [representações alternativas](<#/doc/language/operator_alternative>) são grafias alternativas para alguns operadores
*   [sobrecarga de operadores](<#/doc/language/operators>) possibilita especificar o comportamento dos operadores com classes definidas pelo usuário.

#### Conversões

*   [conversões padrão](<#/doc/language/implicit_cast>) conversões implícitas de um tipo para outro
*   conversão [`const_cast`](<#/doc/language/const_cast>)
*   conversão [`static_cast`](<#/doc/language/static_cast>)
*   conversão [`dynamic_cast`](<#/doc/language/dynamic_cast>)
*   conversão [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
*   [conversão explícita](<#/doc/language/explicit_cast>) usando notação de cast estilo C e notação estilo função
*   [conversão definida pelo usuário](<#/doc/language/cast_operator>) possibilita especificar a conversão a partir de classes definidas pelo usuário

#### Alocação de memória

*   [expressão new](<#/doc/language/new>) aloca memória dinamicamente
*   [expressão delete](<#/doc/language/delete>) desaloca memória dinamicamente

#### Outros

*   [expressões constantes](<#/doc/language/constant_expression>) podem ser avaliadas em tempo de compilação e usadas em contexto de tempo de compilação (argumentos de template, tamanhos de array, etc)
*   [`sizeof`](<#/doc/language/sizeof>)
*   [`alignof`](<#/doc/language/alignof>)
*   [`typeid`](<#/doc/language/typeid>)
*   [expressão throw](<#/doc/language/throw>)

### Expressões primárias

Os operandos de qualquer operador podem ser outras expressões ou expressões primárias (por exemplo, em 1 + 2 * 3, os operandos do operator+ são a [subexpressão](<#/doc/language/expressions>) 2 * 3 e a expressão primária 1).

Expressões primárias são qualquer uma das seguintes:

*   [`this`](<#/doc/language/this>)
*   literais (por exemplo, 2 ou "Hello, world")
*   expressões de identificador, incluindo
    *   [identificadores não qualificados](<#/doc/language/name>) devidamente declarados (por exemplo, n ou cout),
    *   [identificadores qualificados](<#/doc/language/name>) devidamente declarados (por exemplo, [std::string::npos](<#/doc/string/basic_string/npos>)), e
    *   identificadores a serem declarados em [declaradores](<#/doc/language/declarations>)

*   [expressão de indexação de pack](<#/doc/language/pack_indexing>)

| (desde C++26)

*   [expressões lambda](<#/doc/language/lambda>)

| (desde C++11)

*   [expressões fold](<#/doc/language/fold>)

| (desde C++17)

*   [expressões requires](<#/doc/language/requires>)

| (desde C++20)

Qualquer expressão entre parênteses também é classificada como uma expressão primária: isso garante que os parênteses tenham precedência maior do que qualquer operador. Os parênteses preservam valor, tipo e categoria de valor.

#### Literais

Literais são os tokens de um programa C++ que representam valores constantes incorporados no código-fonte.

*   [literais inteiros](<#/doc/language/integer_literal>) são números decimais, octais, hexadecimais ou binários de tipo inteiro.
*   [literais de caractere](<#/doc/language/character_literal>) são caracteres individuais do tipo

    *   char ou wchar_t

    *   char16_t ou char32_t

| (desde C++11)

    *   char8_t

| (desde C++20)

*   [literais de ponto flutuante](<#/doc/language/floating_literal>) são valores do tipo float, double ou long double
*   [literais de string](<#/doc/language/string_literal>) são sequências de caracteres do tipo

    *   const char[] ou const wchar_t[]

    *   const char16_t[] ou const char32_t[]

| (desde C++11)

    *   const char8_t[]

| (desde C++20)

*   [literais booleanos](<#/doc/language/bool_literal>) são valores do tipo bool, ou seja, true e false

*   [`nullptr`](<#/doc/language/nullptr>) é o literal de ponteiro que especifica um valor de ponteiro nulo
*   [literais definidos pelo usuário](<#/doc/language/user_literal>) são valores constantes de tipo especificado pelo usuário

| (desde C++11)

### Expressões completas (Full-expressions)

Uma _expressão constituinte_ é definida da seguinte forma:

*   A expressão constituinte de uma expressão é essa própria expressão.
*   As expressões constituintes de uma braced-init-list ou de uma lista de expressões (possivelmente entre parênteses) são as expressões constituintes dos elementos da respectiva lista.
*   As expressões constituintes de um brace-or-equal-initializer da forma `=` initializer-clause são as expressões constituintes do initializer-clause.

```cpp
    int num1 = 0;
    num1 += 1; // Case 1: the constituent expression of `num += 1` is `num += 1`
    
    int arr2[2] = {2, 22} // Case 2: the constituent expressions
                          //         of `{2, 22}` are `2` and `22`
                          // Case 3: the constituent expressions of ` = {2, 22}`
                          //         are the constituent expressions of `{2, 22}`
                          //         (i.e. also `2` and `22`)
```

As _subexpressões imediatas_ de uma expressão E são

*   as expressões constituintes dos operandos de E,

*   se E cria um objeto [agregado](<#/doc/language/aggregate_initialization>), as expressões constituintes de cada [inicializador de membro padrão](<#/doc/language/data_members>) usado na inicialização,

| (desde C++14)

*   se E é uma [expressão lambda](<#/doc/language/lambda>), a inicialização das entidades capturadas por cópia e as expressões constituintes do inicializador das capturas,

| (desde C++11)

*   qualquer chamada de função que E invoca implicitamente, ou
*   se E é uma chamada de função ou invoca implicitamente uma função, as expressões constituintes de cada [argumento padrão](<#/doc/language/default_arguments>) usado na chamada.

Uma _subexpressão_ de uma expressão E é uma subexpressão imediata de E ou uma subexpressão de uma subexpressão imediata de E. Note que as expressões que aparecem no 'corpo da função' de expressões lambda não são subexpressões da expressão lambda. (desde C++11)

Uma _full-expression_ é

*   um [operando não avaliado](<#/doc/language/expressions>),
*   uma [expressão constante](<#/doc/language/constant_expression>),

*   uma [invocação imediata](<#/doc/language/consteval>),

| (desde C++20)

*   um declarador de uma [declaração simples](<#/doc/language/declarations>) ou um [inicializador de membro](<#/doc/language/initializer_list>), incluindo as expressões constituintes do inicializador,
*   uma invocação de um [destrutor](<#/doc/language/destructor>) gerada no final do [tempo de vida](<#/doc/language/lifetime>) de um objeto que não seja um objeto temporário cujo tempo de vida não foi estendido, ou
*   uma expressão que não é uma subexpressão de outra expressão e que não faz parte de uma full-expression de outra forma.

Se um construto de linguagem é definido para produzir uma chamada implícita de uma função, um uso do construto de linguagem é considerado uma expressão para os propósitos desta definição. As conversões aplicadas ao resultado de uma expressão para satisfazer os requisitos do construto de linguagem em que a expressão aparece também são consideradas parte da full-expression.

Para um inicializador, a realização da inicialização da entidade (incluindo a avaliação de inicializadores de membro padrão de um agregado) (desde C++14) também é considerada parte da full-expression.

### Expressões potencialmente avaliadas

Uma expressão é _potencialmente avaliada_ a menos que

*   seja o operando do operador [`sizeof`](<#/doc/language/sizeof>), ou
*   seja o operando do operador [`typeid`](<#/doc/language/typeid>) e não designe um lvalue de tipo de classe [polimórfica](<#/doc/language/objects>).

| (até C++11)
Os seguintes operandos são _operandos não avaliados_, eles não são avaliados:

*   expressões às quais o operador [`typeid`](<#/doc/language/typeid>) se aplica, exceto glvalues de tipos de classe [polimórfica](<#/doc/language/objects>)
*   expressões que são operandos do operador [`sizeof`](<#/doc/language/sizeof>)
*   operandos do operador [`noexcept`](<#/doc/language/noexcept>)
*   operandos do especificador [`decltype`](<#/doc/language/decltype>)

|

*   constraint-expression de definições de [concept](<#/doc/language/constraints>)
*   expressões que seguem a palavra-chave requires de [requires-clauses](<#/doc/language/constraints>)
*   expressões que aparecem em requirement-seq de [requires-expressions](<#/doc/language/requires>)

| (desde C++20)

Uma expressão é _potencialmente avaliada_ a menos que

*   seja um operando não avaliado, ou
*   seja uma subexpressão de um operando não avaliado.

(desde C++11)

Expressões potencialmente avaliadas são [ODR-use](<#/doc/language/definition>).

| Esta seção está incompleta
Razão: exemplo de operandos não avaliados

### Expressões de valor descartado

Uma _expressão de valor descartado_ é uma expressão que é usada apenas por seus efeitos colaterais. O valor calculado a partir de tal expressão é descartado. Tais expressões incluem a full-expression de qualquer [declaração de expressão](<#/doc/language/statements>), o operando esquerdo do operador vírgula embutido, ou o operando de uma expressão de cast que faz cast para o tipo void.

As conversões de array para ponteiro e de função para ponteiro nunca são aplicadas ao valor calculado por uma expressão de valor descartado. A conversão de lvalue para rvalue é aplicada se e somente se a expressão for um glvalue [volatile-qualified](<#/doc/language/cv>) e tiver uma das seguintes formas (significado embutido exigido, possivelmente entre parênteses):

*   id-expression,
*   array subscript expression,
*   class member access expression,
*   indirection,
*   pointer-to-member operation,
*   conditional expression onde ambos o segundo e o terceiro operandos são uma dessas expressões,
*   comma expression onde o operando direito é uma dessas expressões.

Além disso, se o lvalue for de um tipo de classe volatile-qualified, um construtor de cópia volátil é necessário para inicializar o rvalue temporário resultante.

Se a expressão for um prvalue não-void (após qualquer conversão de lvalue para rvalue que possa ter ocorrido), ocorre a [materialização temporária](<#/doc/language/implicit_cast>). Compiladores podem emitir avisos quando uma expressão diferente de um cast para void descarta um valor declarado `[[[nodiscard](<#/doc/language/attributes/nodiscard>)]]`. | (desde C++17)

### Equivalência de expressões

Um número de expressões e1, e2, ..., eN são _expressão-equivalentes_ se todas as seguintes condições forem satisfeitas:

1.  Elas têm os mesmos efeitos.
2.  Ou todas são [subexpressões constantes](<#/doc/language/constant_expression>) ou nenhuma delas é.
3.  Ou todas são [noexcept](<#/doc/language/noexcept_spec>) ou nenhuma delas é.

e1 é _expressão-equivalente a_ e2 se e somente se e1 e e2 forem expressão-equivalentes (o que significa que e2 também é expressão-equivalente a e1). | (desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1054](<https://cplusplus.github.io/CWG/issues/1054.html>) | C++98 | atribuir um valor a uma variável volátil poderia
resultar em uma leitura desnecessária devido à conversão de lvalue para
rvalue aplicada ao resultado da atribuição | introduzir expressões de valor descartado
e excluir este caso da lista
de casos que exigem a conversão
[CWG 1343](<https://cplusplus.github.io/CWG/issues/1343.html>) | C++98 | a sequência de chamadas de destrutores na
inicialização de agregado era subespecificada | full-expressions na inicialização de agregado
são bem especificadas
[CWG 1383](<https://cplusplus.github.io/CWG/issues/1383.html>) | C++98 | a lista de expressões onde a conversão de lvalue para rvalue
é aplicada a expressões de valor descartado
também cobria operadores sobrecarregados | cobrir apenas operadores
com significado embutido
[CWG 1576](<https://cplusplus.github.io/CWG/issues/1576.html>) | C++11 | conversões de lvalue para rvalue não eram aplicadas
a expressões xvalue voláteis de valor descartado | aplicar a conversão
neste caso
[CWG 2249](<https://cplusplus.github.io/CWG/issues/2249.html>) | C++98 | identificadores a serem declarados em declaradores
---|---|---
não eram id-expressions | eles são
[CWG 2431](<https://cplusplus.github.io/CWG/issues/2431.html>) | C++11 | as invocações dos destrutores de temporários que
são ligados a referências não eram full-expressions | eles são

### Ver também

[documentação C](<#/>) para Expressões
---
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.