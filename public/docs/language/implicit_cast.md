# Conversões implícitas

Conversões implícitas são realizadas sempre que uma expressão de algum tipo `T1` é usada em um contexto que não aceita esse tipo, mas aceita algum outro tipo `T2`; em particular:

*   quando a expressão é usada como argumento ao chamar uma função que é declarada com `T2` como parâmetro;
*   quando a expressão é usada como operando com um operador que espera `T2`;
*   quando inicializa um novo objeto do tipo `T2`, incluindo a instrução `return` em uma função que retorna `T2`;
*   quando a expressão é usada em uma instrução `switch` (`T2` é um tipo integral);
*   quando a expressão é usada em uma instrução `if` ou um loop (`T2` é `bool`).

O programa é bem-formado (compila) somente se existir uma _sequência de conversão implícita_ não ambígua de `T1` para `T2`.

Se houver múltiplas sobrecargas da função ou operador sendo chamado, depois que a sequência de conversão implícita é construída de `T1` para cada `T2` disponível, as regras de [resolução de sobrecarga](<#/doc/language/overload_resolution>) decidem qual sobrecarga é compilada.

Nota: em expressões aritméticas, o tipo de destino para as conversões implícitas nos operandos para operadores binários é determinado por um conjunto separado de regras: [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>).

### Ordem das conversões

A sequência de conversão implícita consiste no seguinte, nesta ordem:

1) zero ou uma _sequência de conversão padrão_;

2) zero ou uma _conversão definida pelo usuário_;

3) zero ou uma _sequência de conversão padrão_ (somente se uma conversão definida pelo usuário for usada).

Ao considerar o argumento para um construtor ou para uma função de conversão definida pelo usuário, apenas uma sequência de conversão padrão é permitida (caso contrário, as conversões definidas pelo usuário poderiam ser efetivamente encadeadas). Ao converter de um tipo não-classe para outro tipo não-classe, apenas uma sequência de conversão padrão é permitida.

Uma sequência de conversão padrão consiste no seguinte, nesta ordem:

1) zero ou uma conversão do seguinte conjunto:

*   _conversão lvalue-para-rvalue_,
*   _conversão array-para-ponteiro_, e
*   _conversão função-para-ponteiro_;

2) zero ou uma _promoção numérica_ ou _conversão numérica_;

3) zero ou uma _conversão de ponteiro de função_; | (desde C++17)
---|---

4) zero ou uma _conversão de qualificação_.

Uma conversão definida pelo usuário consiste em zero ou uma chamada de [construtor de conversão](<#/doc/language/converting_constructor>) de argumento único não-explicit ou de [função de conversão](<#/doc/language/cast_operator>) não-explicit.

Uma expressão `e` é dita ser _implicitamente conversível para `T2`_ se e somente se `T2` puder ser [inicializado por cópia](<#/doc/language/copy_initialization>) a partir de `e`, ou seja, a declaração `T2 t = e;` é bem-formada (pode ser compilada), para algum `t` temporário inventado. Note que isso é diferente da [inicialização direta](<#/doc/language/direct_initialization>) (`T2 t(e)`), onde construtores explícitos e funções de conversão seriam adicionalmente considerados.

#### Conversões contextuais

Nos seguintes contextos, o tipo `bool` é esperado e a conversão implícita é realizada se a declaração `bool t(e);` for bem-formada (ou seja, uma função de conversão explícita como `explicit T::operator bool() const;` é considerada). Tal expressão `e` é dita ser _contextualmente convertida para `bool`_.

*   a expressão de controle de `if`, `while`, `for`;
*   os operandos dos operadores lógicos embutidos `!`, `&&` e `||`;
*   o primeiro operando do operador condicional `?:`;
*   o predicado em uma declaração [`static_assert`](<#/doc/language/static_assert>);
*   a expressão em um especificador [`noexcept`](<#/doc/language/noexcept_spec>);

|

*   a expressão em um especificador [`explicit`](<#/doc/language/explicit>);

| (desde C++20)
---|---
(desde C++11)

Nos seguintes contextos, um tipo `T` específico do contexto é esperado, e a expressão `e` do tipo de classe `E` é permitida apenas se

*   `E` tiver uma única [função de conversão definida pelo usuário](<#/doc/language/cast_operator>) não-explicit (desde C++11) para um tipo permitido.

| (até C++14)
---|---

*   existe exatamente um tipo `T` entre os tipos permitidos tal que `E` possui funções de conversão não-explícitas cujos tipos de retorno são `T` (possivelmente cv-qualificado) ou referência para `T` (possivelmente cv-qualificado), e
*   `e` é implicitamente conversível para `T`.

| (desde C++14)

Tal expressão `e` é dita ser _contextualmente implicitamente convertida_ para o tipo `T` especificado. Note que funções de conversão explícitas não são consideradas, mesmo que sejam consideradas em conversões contextuais para `bool`. (desde C++11)

*   o argumento da [delete-expression](<#/doc/language/delete>) (`T` é qualquer tipo de ponteiro de objeto);
*   [expressão constante integral](<#/doc/language/constant_expression>), onde uma classe literal é usada (`T` é qualquer tipo integral ou de enumeração não-escopada, a função de conversão definida pelo usuário selecionada deve ser [constexpr](<#/doc/language/constexpr>));
*   a expressão de controle da instrução [`switch`](<#/doc/language/switch>) (`T` é qualquer tipo integral ou de enumeração).

```cpp
    #include <cassert>
     
    template<typename T>
    class zero_init
    {
        T val;
    public:
        zero_init() : val(static_cast<T>(0)) {}
        zero_init(T val) : val(val) {}
        operator T&() { return val; }
        operator T() const { return val; }
    };
     
    int main()
    {
        zero_init<int> i;
        assert(i == 0);
     
        i = 7;
        assert(i == 7);
     
        switch (i) {}     // error until C++14 (more than one conversion function)
                          // OK since C++14 (both functions convert to the same type int)
        switch (i + 0) {} // always okay (implicit conversion)
    }
```

### Transformações de valor

Transformações de valor são conversões que alteram a [categoria de valor](<#/doc/language/value_category>) de uma expressão. Elas ocorrem sempre que uma expressão aparece como operando de um operador que espera uma expressão de uma categoria de valor diferente:

*   Sempre que um `glvalue` aparece como operando de um operador que requer um `prvalue` para esse operando, as conversões padrão _lvalue-para-rvalue_, _array-para-ponteiro_ ou _função-para-ponteiro_ são aplicadas para converter a expressão para um `prvalue`.

*   A menos que especificado de outra forma, sempre que um `prvalue` aparece como operando de um operador que espera um `glvalue` para esse operando, a _conversão de materialização temporária_ é aplicada para converter a expressão para um `xvalue`.

| (desde C++17)
---|---

#### Conversão lvalue-para-rvalue

Um [lvalue](<#/doc/language/value_category>) (até C++11) Um [glvalue](<#/doc/language/value_category>) (desde C++11) de qualquer tipo `T` não-função, não-array pode ser implicitamente convertido para um [rvalue](<#/doc/language/value_category>) (até C++11) um [prvalue](<#/doc/language/value_category>) (desde C++11):

*   Se `T` não for um tipo de classe, o tipo do `rvalue` (até C++11) `prvalue` (desde C++11) é a versão cv-não-qualificada de `T`.
*   Caso contrário, o tipo do `rvalue` (até C++11) `prvalue` (desde C++11) é `T`.

Se uma conversão lvalue-para-rvalue de um [tipo incompleto](<#/doc/language/type-id>) for exigida por um programa, esse programa é malformado.

Dado o objeto ao qual o `lvalue` (até C++11) `glvalue` (desde C++11) se refere como `obj`:

*   Quando uma conversão lvalue-para-rvalue ocorre dentro do operando de [`sizeof`](<#/doc/language/sizeof>), o valor contido em `obj` não é acessado, já que esse operador [não avalia](<#/doc/language/expressions>) seu operando.

*   O resultado da conversão é o valor contido em `obj`. Se um de `T` e o tipo de `obj` for um tipo inteiro com sinal, e o outro for o tipo inteiro sem sinal correspondente, o resultado é o valor do tipo `T` com a mesma representação de valor de `obj`.

| (até C++11)
---|---

*   Quando uma conversão lvalue-para-rvalue é aplicada a uma expressão `E`, o valor contido em `obj` não é acessado se:

    *   `E` não é [potencialmente avaliado](<#/doc/language/expressions>), ou
    *   a avaliação de `E` resulta na avaliação de um membro `Ex` do conjunto de [resultados potenciais](<#/doc/language/definition>) de `E`, e `Ex` nomeia uma variável `x` que não é [odr-usada](<#/doc/language/definition>) por `Ex`.

*   O resultado da conversão é determinado da seguinte forma:

    *   Se `T` for (possivelmente cv-qualificado) [std::nullptr_t](<#/doc/types/nullptr_t>), o resultado é uma [constante de ponteiro nulo](<#/doc/language/pointer>). `obj` não é acessado pela conversão, então não há efeito colateral mesmo se `T` for qualificado como `volatile`, e o `glvalue` pode se referir a um membro inativo de uma `union`.
    *   Caso contrário, se `T` for um tipo de classe:

|

    *   A conversão [inicializa por cópia](<#/doc/language/copy_initialization>) um [temporário](<#/doc/language/lifetime>) do tipo `T` a partir do `glvalue`, e o resultado da conversão é um `prvalue` para o temporário.

| (até C++17)
---|---

    *   A conversão [inicializa por cópia](<#/doc/language/copy_initialization>) o [objeto resultante](<#/doc/language/implicit_cast>) a partir do `glvalue`.

| (desde C++17)

    *   Caso contrário, se `obj` contiver um valor de ponteiro inválido, o comportamento é definido pela implementação.
    *   Caso contrário, se os bits na [representação de valor](<#/doc/language/objects>) de `obj` não forem válidos para o tipo de `obj`, o comportamento é indefinido.
    *   Caso contrário, `obj` é lido, e (desde C++20) o resultado é o valor contido em `obj`. Se um de `T` e o tipo de `obj` for um tipo inteiro com sinal, e o outro for o tipo inteiro sem sinal correspondente, o resultado é o valor do tipo `T` com a mesma representação de valor de `obj`.

(desde C++11)

Esta conversão modela o ato de ler um valor de um local de memória para um registrador da CPU.

#### Conversão array-para-ponteiro

Um [lvalue](<#/doc/language/value_category>) ou [rvalue](<#/doc/language/value_category>) do tipo "array de N `T`" ou "array de limite desconhecido de `T`" pode ser implicitamente convertido para um [prvalue](<#/doc/language/value_category>) do tipo "ponteiro para `T`". Se o array for um `prvalue`, ocorre [materialização temporária](<#/doc/language/implicit_cast>). (desde C++17) O ponteiro resultante refere-se ao primeiro elemento do array (veja [Decaimento array-para-ponteiro](<#/doc/language/array>) para detalhes).

#### Conversão função-para-ponteiro

Um [lvalue](<#/doc/language/value_category>) de tipo de função pode ser implicitamente convertido para um [prvalue](<#/doc/language/value_category>) [ponteiro para essa função](<#/doc/language/pointer>). Isso não se aplica a funções membro não-estáticas porque `lvalues` que se referem a funções membro não-estáticas não existem.

#### Materialização temporária

Um [prvalue](<#/doc/language/value_category>) de qualquer tipo completo `T` pode ser convertido para um `xvalue` do mesmo tipo `T`. Esta conversão inicializa um [objeto temporário](<#/doc/language/lifetime>) do tipo `T` a partir do `prvalue` avaliando o `prvalue` com o objeto temporário como seu objeto resultante, e produz um `xvalue` denotando o objeto temporário. Se `T` for uma classe ou um array de tipo de classe, ele deve ter um destrutor acessível e não-deletado.
```cpp
    struct S { int m; };
    int i = S().m; // member access expects glvalue as of C++17;
                   // S() prvalue is converted to xvalue
```
A materialização temporária ocorre nas seguintes situações:

*   ao [vincular uma referência](<#/doc/language/reference_initialization>) a um `prvalue`;
*   ao [acessar](<#/doc/language/operator_member_access>) um [membro de dados](<#/doc/language/data_members>) não-estático de um `prvalue` de classe;
*   ao [invocar](<#/doc/language/operator_other>) uma [função membro de objeto implícita](<#/doc/language/member_functions>) de um `prvalue` de classe;
*   ao realizar uma conversão array-para-ponteiro (veja acima) ou [indexação](<#/doc/language/operator_member_access>) em um `prvalue` de array;
*   ao inicializar um objeto do tipo [std::initializer_list](<#/doc/utility/initializer_list>)&lt;T&gt; a partir de uma [lista de inicializadores entre chaves](<#/doc/language/initialization>);
*   quando um `prvalue` aparece como uma [expressão de valor descartado](<#/doc/language/expressions>).

Note que a materialização temporária **não** ocorre ao inicializar um objeto a partir de um `prvalue` do mesmo tipo (por [inicialização direta](<#/doc/language/direct_initialization>) ou [inicialização por cópia](<#/doc/language/copy_initialization>)): tal objeto é inicializado diretamente a partir do inicializador. Isso garante a “eliminação de cópia garantida”. | (desde C++17)

### Promoção integral

[prvalues](<#/doc/language/value_category>) de tipos integrais pequenos (como `char`) e tipos de enumeração não-escopados podem ser convertidos para `prvalues` de tipos integrais maiores (como `int`). Em particular, [operadores aritméticos](<#/doc/language/operator_arithmetic>) não aceitam tipos menores que `int` como argumentos, e promoções integrais são automaticamente aplicadas após a conversão lvalue-para-rvalue, se aplicável. Esta conversão sempre preserva o valor.

As seguintes conversões implícitas nesta seção são classificadas como _promoções integrais_.

Note que para um dado tipo de origem, o tipo de destino da promoção integral é único, e todas as outras conversões não são promoções. Por exemplo, a [resolução de sobrecarga](<#/doc/language/overload_resolution>) escolhe `char -> int` (promoção) em vez de `char -> short` (conversão).

#### Promoção de tipos integrais

Um `prvalue` do tipo `bool` pode ser convertido para um `prvalue` do tipo `int`, com `false` tornando-se `0` e `true` tornando-se `1`.

Para um `prvalue` `val` de um tipo integral `T` exceto `bool`:

1) Se `val` for o resultado de uma conversão lvalue-para-rvalue aplicada a um [bit-field](<#/doc/language/bit_field>),

*   `val` pode ser convertido para um `prvalue` do tipo `int` se `int` puder representar todos os valores do bit-field;
*   caso contrário, `val` pode ser convertido para `unsigned int` se `unsigned int` puder representar todos os valores do bit-field;
*   caso contrário, `val` pode ser convertido de acordo com as regras especificadas no item (3).

2) Caso contrário (`val` não é convertido de um bit-field),

*   se `T` for `char8_t`, (desde C++20) `char16_t`, `char32_t` ou (desde C++11) `wchar_t`, `val` pode ser convertido de acordo com as regras especificadas no item (3);
*   caso contrário, se o [rank de conversão inteira](<#/doc/language/usual_arithmetic_conversions>) de `T` for menor que o rank de `int`:

    *   `val` pode ser convertido para um `prvalue` do tipo `int` se `int` puder representar todos os valores de `T`;
    *   caso contrário, `val` pode ser convertido para um `prvalue` do tipo `unsigned int`.

3) Nos casos especificados pelo item (1) (um bit-field convertido que não se encaixa em `unsigned int`) ou item (2) (`T` é um dos tipos de caractere dados), `val` pode ser convertido para um `prvalue` do primeiro dos seguintes tipos que pode representar todos os valores de seu tipo subjacente:

    *   `int`
    *   `unsigned int`
    *   `long`
    *   `unsigned long`
    *   `long long`
    *   `unsigned long long`
    *   o tipo subjacente de `T`

| (desde C++11)
---|---

#### Promoção de tipos de enumeração

Um `prvalue` de um tipo de [enumeração](<#/doc/language/enum>) não-escopada cujo tipo subjacente não é fixo pode ser convertido para um `prvalue` do primeiro tipo da seguinte lista capaz de conter todo o seu intervalo de valores:

*   `int`
*   `unsigned int`
*   `long`
*   `unsigned long`
*   `long long`
*   `unsigned long long`
*   o [tipo inteiro estendido](<#/doc/language/types>) tal que

    *   seu [rank de conversão inteira](<#/doc/language/usual_arithmetic_conversions>) é maior que o rank de `long long`,
    *   seu rank de conversão inteira é o mais baixo entre todos os tipos inteiros estendidos, e
    *   ele é com sinal se houver dois tipos com o rank de conversão inteira mais baixo entre todos os tipos inteiros estendidos.

| (desde C++11)
---|---

Um `prvalue` de um tipo de enumeração não-escopada cujo tipo subjacente é fixo pode ser convertido para seu tipo subjacente. Além disso, se o tipo subjacente também estiver sujeito a promoção integral, para o tipo subjacente promovido. A conversão para o tipo subjacente não promovido é melhor para fins de [resolução de sobrecarga](<#/doc/language/overload_resolution>). | (desde C++11)
---|---

### Promoção de ponto flutuante

Um [prvalue](<#/doc/language/value_category>) do tipo `float` pode ser convertido para um `prvalue` do tipo `double`. O valor não muda.

Esta conversão é chamada de _promoção de ponto flutuante_.

### Conversões numéricas

Ao contrário das promoções, as conversões numéricas podem alterar os valores, com potencial perda de precisão.

#### Conversões integrais

Um [prvalue](<#/doc/language/value_category>) de um tipo inteiro ou de um tipo de enumeração não-escopada pode ser convertido para qualquer outro tipo inteiro. Se a conversão estiver listada sob promoções integrais, é uma promoção e não uma conversão.

*   Se o tipo de destino for sem sinal, o valor resultante é o menor valor sem sinal igual ao valor de origem [módulo](<https://en.wikipedia.org/wiki/Modular_arithmetic> "enwiki:Modular arithmetic") 2n
    onde `n` é o número de bits usados para representar o tipo de destino.

    *   Ou seja, dependendo se o tipo de destino é mais largo ou mais estreito, inteiros com sinal são estendidos por sinal[1](<#/doc/language/implicit_cast>) ou truncados e inteiros sem sinal são estendidos por zero ou truncados, respectivamente.

*   Se o tipo de destino for com sinal, o valor não muda se o inteiro de origem puder ser representado no tipo de destino. Caso contrário, o resultado é definido pela implementação (até C++20) o valor único do tipo de destino igual ao valor de origem módulo 2n
    onde `n` é o número de bits usados para representar o tipo de destino (desde C++20) (note que isso é diferente do [overflow aritmético de inteiro com sinal](<#/doc/language/operator_arithmetic>), que é indefinido).
*   Se o tipo de origem for `bool`, o valor `false` é convertido para zero e o valor `true` é convertido para o valor um do tipo de destino (note que se o tipo de destino for `int`, esta é uma promoção inteira, não uma conversão inteira).
*   Se o tipo de destino for `bool`, esta é uma [conversão booleana](<#/doc/language/implicit_cast>) (veja abaixo).

1.  [↑](<#/doc/language/implicit_cast>) Isso se aplica apenas se a aritmética for de complemento de dois, o que é exigido apenas para os [tipos inteiros de largura exata](<#/doc/types/integer>). Note, no entanto, que atualmente todas as plataformas com um compilador C++ usam aritmética de complemento de dois.

#### Conversões de ponto flutuante

Um [prvalue](<#/doc/language/value_category>) de um tipo de ponto flutuante pode ser convertido para um `prvalue` de qualquer outro tipo de ponto flutuante. | (até C++23)
---|---
Um [prvalue](<#/doc/language/value_category>) de um tipo de ponto flutuante pode ser convertido para um `prvalue` de qualquer outro tipo de ponto flutuante com um [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) maior ou igual. Um [prvalue](<#/doc/language/value_category>) de um tipo de ponto flutuante padrão pode ser convertido para um `prvalue` de qualquer outro tipo de ponto flutuante padrão. [`static_cast`](<#/doc/language/static_cast>) pode ser usado para converter explicitamente um `prvalue` de tipo de ponto flutuante para qualquer outro tipo de ponto flutuante. | (desde C++23)

Se a conversão estiver listada sob promoções de ponto flutuante, é uma promoção e não uma conversão.

*   Se o valor de origem puder ser representado exatamente no tipo de destino, ele não muda.
*   Se o valor de origem estiver entre dois valores representáveis do tipo de destino, o resultado é um desses dois valores (é definido pela implementação qual, embora se a aritmética IEEE for suportada, o arredondamento padrão seja [para o mais próximo](<#/doc/numeric/fenv/FE_round>)).
*   Caso contrário, o comportamento é indefinido.

#### Conversões ponto flutuante–integral

Um [prvalue](<#/doc/language/value_category>) de tipo de ponto flutuante pode ser convertido para um `prvalue` de qualquer tipo inteiro. A parte fracionária é truncada, ou seja, a parte fracionária é descartada.

*   Se o valor truncado não puder ser ajustado ao tipo de destino, o comportamento é indefinido (mesmo quando o tipo de destino é sem sinal, a aritmética modular não se aplica).
*   Se o tipo de destino for `bool`, esta é uma conversão booleana (veja [abaixo](<#/doc/language/implicit_cast>)).

Um `prvalue` de tipo inteiro ou de enumeração não-escopada pode ser convertido para um `prvalue` de qualquer tipo de ponto flutuante. O resultado é exato, se possível.

*   Se o valor puder ser ajustado ao tipo de destino, mas não puder ser representado exatamente, é definido pela implementação se o valor representável mais próximo superior ou o mais próximo inferior será selecionado, embora se a aritmética IEEE for suportada, o arredondamento padrão seja [para o mais próximo](<#/doc/numeric/fenv/FE_round>)).
*   Se o valor não puder ser ajustado ao tipo de destino, o comportamento é indefinido.
*   Se o tipo de origem for `bool`, o valor `false` é convertido para zero, e o valor `true` é convertido para um.

#### Conversões de ponteiro

Uma [constante de ponteiro nulo](<#/doc/language/pointer>) pode ser convertida para qualquer tipo de ponteiro, e o resultado é o valor de ponteiro nulo desse tipo. Tal conversão (conhecida como _conversão de ponteiro nulo_) é permitida para converter para um tipo cv-qualificado como uma única conversão, ou seja, não é considerada uma combinação de conversões numéricas e de qualificação.

Um [prvalue](<#/doc/language/value_category>) ponteiro para qualquer tipo de objeto `T` (opcionalmente cv-qualificado) pode ser convertido para um `prvalue` ponteiro para `void` (identicamente cv-qualificado). O ponteiro resultante representa o mesmo local na memória que o valor do ponteiro original.

*   Se o ponteiro original for um valor de ponteiro nulo, o resultado é um valor de ponteiro nulo do tipo de destino.

Um `prvalue` `ptr` do tipo "ponteiro para `Derived` (possivelmente cv-qualificado)" pode ser convertido para um `prvalue` do tipo "ponteiro para `Base` (possivelmente cv-qualificado)", onde `Base` é uma [classe base](<#/doc/language/derived_class>) de `Derived`, e `Derived` é um tipo de classe [completo](<#/doc/language/type-id>). Se a `Base` for inacessível ou ambígua, o programa é malformado.

*   Se `ptr` for um valor de ponteiro nulo, o resultado também é um valor de ponteiro nulo.
*   Caso contrário, se `Base` for uma [classe base virtual](<#/doc/language/derived_class>) de `Derived` e `ptr` não apontar para um objeto cujo tipo é [similar](<#/doc/language/implicit_cast>) a `Derived` e que esteja dentro de seu [tempo de vida](<#/doc/language/lifetime>) ou dentro de seu período de construção ou destruição, o comportamento é indefinido.
*   Caso contrário, o resultado é um ponteiro para o subobjeto da classe base do objeto da classe derivada.

#### Conversões de ponteiro para membro

Uma [constante de ponteiro nulo](<#/doc/language/pointer>) pode ser convertida para qualquer tipo de ponteiro para membro, e o resultado é o valor de ponteiro para membro nulo desse tipo. Tal conversão (conhecida como _conversão de ponteiro para membro nulo_) é permitida para converter para um tipo cv-qualificado como uma única conversão, ou seja, não é considerada uma combinação de conversões numéricas e de qualificação.

Um [prvalue](<#/doc/language/value_category>) do tipo "ponteiro para membro de `Base` do tipo `T` (possivelmente cv-qualificado)" pode ser convertido para um `prvalue` do tipo "ponteiro para membro de `Derived` do tipo `T` (identicamente cv-qualificado)", onde `Base` é uma classe base de `Derived`, e `Derived` é um tipo de classe completo. Se `Base` for inacessível, ambígua, ou base virtual de `Derived` ou for uma base de alguma base virtual intermediária de `Derived`, o programa é malformado.

*   Se `Derived` não contiver o membro original e não for uma classe base da classe que contém o membro original, o comportamento é indefinido.
*   Caso contrário, o ponteiro resultante pode ser desreferenciado com um objeto `Derived`, e ele acessará o membro dentro do subobjeto base `Base` desse objeto `Derived`.

#### Conversões booleanas

Um [prvalue](<#/doc/language/value_category>) de tipos integral, ponto flutuante, enumeração não-escopada, ponteiro e ponteiro para membro pode ser convertido para um `prvalue` do tipo `bool`.

O valor zero (para integral, ponto flutuante e enumeração não-escopada) e os valores de ponteiro nulo e ponteiro para membro nulo tornam-se `false`. Todos os outros valores tornam-se `true`.

No contexto de uma [inicialização direta](<#/doc/language/direct_initialization>), um objeto `bool` pode ser inicializado a partir de um `prvalue` do tipo [std::nullptr_t](<#/doc/types/nullptr_t>), incluindo `nullptr`. O valor resultante é `false`. No entanto, isso não é considerado uma conversão implícita. | (desde C++11)

### Conversões de qualificação

De modo geral:

*   Um [prvalue](<#/doc/language/value_category>) do tipo ponteiro para tipo `T` [cv-qualificado](<#/doc/language/cv>) pode ser convertido para um `prvalue` ponteiro para o mesmo tipo `T` mais cv-qualificado (em outras palavras, `constness` e `volatility` podem ser adicionadas).
*   Um `prvalue` do tipo ponteiro para membro do tipo `T` cv-qualificado na classe `X` pode ser convertido para um `prvalue` ponteiro para membro do tipo `T` [mais cv-qualificado](<#/doc/language/cv>) na classe `X`.

A definição formal de "conversão de qualificação" é dada [abaixo](<#/doc/language/implicit_cast>).

#### Tipos similares

Informalmente, dois tipos são _similares_ se, ignorando a cv-qualificação de nível superior:

*   eles são do mesmo tipo; ou
*   ambos são ponteiros, e os tipos apontados são similares; ou
*   ambos são ponteiros para membro da mesma classe, e os tipos dos membros apontados são similares; ou
*   ambos são arrays e os tipos dos elementos do array são similares.

Por exemplo:

*   `const int* const *` e `int` são similares;
*   `int (*)(int*)` e `int (*)(const int*)` não são similares;
*   `const int (*)(int*)` e `int (*)(int*)` não são similares;
*   `int (*)(int* const)` e `int (*)(int*)` são similares (eles são do mesmo tipo);
*   [std::pair](<#/doc/utility/pair>)<int, int> e [std::pair](<#/doc/utility/pair>)&lt;const int, int&gt; não são similares.

Formalmente, a similaridade de tipos é definida em termos de decomposição de qualificação.

Uma _decomposição de qualificação_ de um tipo `T` é uma sequência de componentes `cv_i` e `P_i` tal que `T` é "`cv_0 P_0 cv_1 P_1 ... cv_n−1 P_n−1 cv_n U`" para `n` não-negativo, onde

*   cada `cv_i` é um conjunto de `const` e `volatile`, e
*   cada `P_i` é

    *   "ponteiro para",
    *   "ponteiro para membro da classe `C_i` do tipo",
    *   "array de N_i", ou
    *   "array de limite desconhecido de".

Se `P_i` designa um array, os cv-qualificadores `cv_i+1` no tipo do elemento também são considerados como os cv-qualificadores `cv_i` do array.
```cpp
    // T is “pointer to pointer to const int”, it has 3 qualification-decompositions:
    // n = 0 -> cv_0 is empty, U is “pointer to pointer to const int”
    // n = 1 -> cv_0 is empty, P_0 is “pointer to”,
    //          cv_1 is empty, U is “pointer to const int”
    // n = 2 -> cv_0 is empty, P_0 is “pointer to”,
    //          cv_1 is empty, P_1 is “pointer to”,
    //          cv_2 is “const", U is “int”
    using T = const int**;
     
    // substitute any of the following type to U gives one of the decompositions:
    // U = U0 -> the decomposition with n = 0: U0
    // U = U1 -> the decomposition with n = 1: pointer to [U1]
    // U = U2 -> the decomposition with n = 2: pointer to [pointer to [const U2]]
    using U2 = int;
    using U1 = const U2*;
    using U0 = U1*;
```
Dois tipos `T1` e `T2` são _similares_ se existir uma decomposição de qualificação para cada um deles, onde todas as seguintes condições são satisfeitas para as duas decomposições de qualificação:

*   Eles têm o mesmo `n`.
*   Os tipos denotados por `U` são os mesmos.
*   Os componentes `P_i` correspondentes são os mesmos ou um é "array de N_i" e o outro é "array de limite desconhecido de" (desde C++20) para todo `i`.

```cpp
    // the qualification-decomposition with n = 2:
    // pointer to [volatile pointer to [const int]]
    using T1 = const int* volatile *;
     
    // the qualification-decompositions with n = 2:
    // const pointer to [pointer to [int]]
    using T2 = int** const;
     
    // For the two qualification-decompositions above
    // although cv_0, cv_1 and cv_2 are all different,
    // they have the same n, U, P_0 and P_1,
    // therefore types T1 and T2 are similar.
```

#### Combinando cv-qualificações

Na descrição abaixo, a decomposição de qualificação mais longa do tipo `Tn` é denotada como `Dn`, e seus componentes são denotados como `cvn_i` e `Pn_i`.

Uma expressão `prvalue` do tipo `T1` pode ser convertida para o tipo `T2` se todas as seguintes condições forem satisfeitas:

*   `T1` e `T2` são similares.
*   Para cada `i` não-zero, se `const` estiver em `cv1_i`, então `const` também estará em `cv2_i`, e similarmente para `volatile`.
*   Para cada `i` não-zero, se `cv1_i` e `cv2_i` forem diferentes, então `const` estará em `cv2_k` para todo `k` em `[`1`, `i`)`.

O _tipo combinado por qualificação_ de dois tipos `T1` e `T2` é um tipo `T3` similar a `T1` tal que

*   `cv3_0` é vazio,
*   para cada `i` não-zero, `cv3_i` é a união de `cv1_i` e `cv2_i`, e
*   se `cv3_i` for diferente de `cv1_i` ou `c2_i`, então `const` é adicionado a `cv3_k` para todo `k` em `[`1`, `i`)`.

| (até C++20)
---|---
O _tipo combinado por qualificação_ de dois tipos `T1` e `T2` é um tipo `T3` similar a `T1`, onde `D3` satisfaz todas as seguintes condições:

*   `cv3_0` é vazio.
*   Para cada `i` não-zero, `cv3_i` é a união de `cv1_i` e `cv2_i`.
*   Se `P1_i` ou `P2_i` for "array de limite desconhecido de", `P3_i` é "array de limite desconhecido de", caso contrário é `P1_i`.
*   Se `cv3_i` for diferente de `cv1_i` ou `cv2_i`, ou `P3_i` for diferente de `P1_i` ou `P2_i`, então `const` é adicionado a `cv3_k` para todo `k` em `[`1`, `i`)`.

Um `prvalue` do tipo `T1` pode ser convertido para o tipo `T2` se o tipo combinado por qualificação de `T1` e `T2` for `T2` cv-não-qualificado. | (desde C++20)
```cpp
    // longest qualification-decomposition of T1 (n = 2):
    // pointer to [pointer to [char]]
    using T1 = char**;
     
    // longest qualification-decomposition of T2 (n = 2):
```
```cpp
    // ponteiro para [ponteiro para [const char]]
    using T2 = const char**;
     
    // Determinando os componentes cv3_i e T_i de D3 (n = 2):
    // cv3_1 = vazio (união de cv1_1 vazio e cv2_1 vazio)
    // cv3_2 = “const” (união de cv1_2 vazio e cv2_2 “const”)
    // P3_0 = “ponteiro para” (nenhum array de limite desconhecido, use P1_0)
    // P3_1 = “ponteiro para” (nenhum array de limite desconhecido, use P1_1)
    // Todos os componentes, exceto cv_2, são os mesmos; cv3_2 é diferente de cv1_2,
    // portanto, adicione “const” a cv3_k para cada k em [1, 2): cv3_1 torna-se “const”.
    // T3 é “ponteiro para ponteiro const para const char”, ou seja, const char* const *.
    using T3 = /* o tipo combinado por qualificação de T1 e T2 */;
     
    int main()
    {
        const char c = 'c';
        char* pc;
        T1 ppc = &pc;
        T2 pcc = ppc; // Erro: T3 não é o mesmo que T2 sem qualificação cv,
                      //        nenhuma conversão implícita.
     
        *pcc = &c;
        *pc = 'C';    // Se a atribuição errônea acima for permitida,
                      // o objeto const “c” pode ser modificado.
    }
```  
  
Note que na linguagem de programação C, const/volatile pode ser adicionado apenas ao primeiro nível: 
```cpp 
    char** p = 0;
    char * const* p1 = p;       // OK em C e C++
    const char* const * p2 = p; // erro em C, OK em C++
```

### Conversões de ponteiro para função

  * Um [prvalue](<#/doc/language/value_category>) do tipo ponteiro para função não-throwing pode ser convertido para um prvalue ponteiro para função potencialmente-throwing. 
  * Um prvalue do tipo ponteiro para função membro não-throwing pode ser convertido para um prvalue ponteiro para função membro potencialmente-throwing. 

```cpp 
    void (*p)();
    void (**pp)() noexcept = &p; // erro: não é possível converter para ponteiro para função noexcept
     
    struct S
    {
        typedef void (*p)();
        operator p();
    };
    void (*q)() noexcept = S(); // erro: não é possível converter para ponteiro para função noexcept
```

| (desde C++17)  
---|---  
  
### O problema do safe bool

Até C++11, projetar uma classe que deveria ser utilizável em contextos booleanos (por exemplo, if (obj) { ... }) apresentava um problema: dada uma função de conversão definida pelo usuário, como T::operator bool() const;, a sequência de conversão implícita permitia uma sequência de conversão padrão adicional após essa chamada de função, o que significa que o bool resultante poderia ser convertido para int, permitindo código como obj << 1; ou int i = obj;. 

Uma solução inicial para isso pode ser vista em [std::basic_ios](<#/doc/io/basic_ios>), que inicialmente define operator void*, de modo que o código como if ([std::cin](<#/doc/io/cin>)) {...} compila porque void* é conversível para bool, mas int n = [std::cout](<#/doc/io/cout>); não compila porque void* não é conversível para int. Isso ainda permite que código sem sentido como delete [std::cout](<#/doc/io/cout>); compile. 

Muitas bibliotecas de terceiros pré-C++11 foram projetadas com uma solução mais elaborada, conhecida como o [idioma Safe Bool](<https://en.wikibooks.org/wiki/More_C++_Idioms/Safe_bool>). [std::basic_ios](<#/doc/io/basic_ios>) também permitiu este idioma via [LWG issue 468](<https://cplusplus.github.io/LWG/issue468>), e operator void* foi substituído (veja [notas](<#/doc/io/basic_ios/operator_bool>)). 

Desde C++11, a [conversão explícita para bool](<#/doc/language/explicit>) também pode ser usada para resolver o problema do safe bool. 

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---  
[CWG 170](<https://cplusplus.github.io/CWG/issues/170.html>) | C++98  | o comportamento das conversões de ponteiro para membro era incerto  
se a classe derivada não tivesse o membro original  | tornado claro   
[CWG 172](<https://cplusplus.github.io/CWG/issues/172.html>) | C++98  | o tipo de enumeração era promovido com base em seu tipo subjacente  | com base em seu intervalo de valores, em vez disso   
[CWG 330](<https://cplusplus.github.io/CWG/issues/330.html>)  
([N4261](<https://wg21.link/N4261>))  | C++98  | a conversão de double* const (*p)[3]  
---|---|---
para double const * const (*p)[3] era inválida  | tornada válida   
[CWG 519](<https://cplusplus.github.io/CWG/issues/519.html>) | C++98  | valores de ponteiro nulo não eram garantidos de serem  
preservados ao converter para outro tipo de ponteiro  | sempre preservados   
[CWG 616](<https://cplusplus.github.io/CWG/issues/616.html>) | C++98  | o comportamento da conversão de lvalue para rvalue de  
qualquer objeto não inicializado e objetos ponteiro  
com valores inválidos era sempre indefinido  | unsigned char indeterminado  
é permitido; o uso de ponteiros inválidos  
é definido pela implementação   
[CWG 685](<https://cplusplus.github.io/CWG/issues/685.html>) | C++98  | o tipo subjacente de um tipo de enumeração não era
---|---|---
priorizado na promoção integral se fosse fixo  | priorizado   
[CWG 707](<https://cplusplus.github.io/CWG/issues/707.html>) | C++98  | a conversão de inteiro para ponto flutuante  
tinha comportamento definido em todos os casos  | o comportamento é indefinido se  
o valor sendo convertido estiver  
fora do intervalo de destino   
[CWG 1423](<https://cplusplus.github.io/CWG/issues/1423.html>) | C++11  | [std::nullptr_t](<#/doc/types/nullptr_t>) era conversível para bool  
---|---|---
tanto em inicialização direta quanto por cópia  | apenas inicialização direta   
[CWG 1773](<https://cplusplus.github.io/CWG/issues/1773.html>) | C++11  | uma expressão de nome que aparece em uma expressão potencialmente avaliada,  
de modo que o objeto nomeado não é odr-usado, ainda poderia  
ser avaliada durante uma conversão de lvalue para rvalue  | não avaliada   
---|---
[CWG 1781](<https://cplusplus.github.io/CWG/issues/1781.html>) | C++11  | [std::nullptr_t](<#/doc/types/nullptr_t>) para bool era considerada uma conversão implícita,  
embora seja válida apenas para inicialização direta  | não mais considerada  
uma conversão implícita   
[CWG 1787](<https://cplusplus.github.io/CWG/issues/1787.html>) | C++98  | o comportamento de leitura de um unsigned char indeterminado
---|---|---
armazenado em cache em um registrador era indefinido  | tornado bem-definido   
[CWG 1981](<https://cplusplus.github.io/CWG/issues/1981.html>) | C++11  | conversões contextuais consideravam funções de conversão explícitas  | não consideradas   
[CWG 2140](<https://cplusplus.github.io/CWG/issues/2140.html>) | C++11  | não estava claro se as conversões de lvalue para rvalue de  
lvalues [std::nullptr_t](<#/doc/types/nullptr_t>) buscavam esses lvalues da memória  | não buscados   
[CWG 2310](<https://cplusplus.github.io/CWG/issues/2310.html>) | C++98  | para conversões de ponteiro de derivada para base e  
conversões de ponteiro para membro de base para derivada,  
o tipo da classe derivada poderia ser incompleto  | deve ser completo   
---|---
[CWG 2484](<https://cplusplus.github.io/CWG/issues/2484.html>) | C++20  | char8_t e char16_t tinham diferentes estratégias de  
promoção integral, mas ambos podem se encaixar  | char8_t deve ser promovido  
da mesma forma que char16_t  
[CWG 2485](<https://cplusplus.github.io/CWG/issues/2485.html>) | C++98  | promoções integrais envolvendo bit-fields não eram bem especificadas  | melhorou a especificação   
[CWG 2813](<https://cplusplus.github.io/CWG/issues/2813.html>) | C++23  | a materialização temporária ocorreria quando uma função membro  
de objeto explícita de um prvalue de classe fosse invocada  | não ocorrerá  
neste caso   
[CWG 2861](<https://cplusplus.github.io/CWG/issues/2861.html>) | C++98  | um ponteiro para um objeto inacessível por tipo poderia ser  
convertido para um ponteiro para um subobjeto de classe base  | o comportamento é  
indefinido neste caso   
[CWG 2879](<https://cplusplus.github.io/CWG/issues/2879.html>) | C++17  | a conversão de materialização temporária era aplicada em prvalue
---|---|---
como operando de um operador que espera glvalue  | não aplicada em alguns casos   
[CWG 2899](<https://cplusplus.github.io/CWG/issues/2899.html>) | C++98  | conversões de lvalue para rvalue poderiam ser aplicadas a lvalues  
designando objetos com representações de valor inválidas  | o comportamento é  
indefinido neste caso   
[CWG 2901](<https://cplusplus.github.io/CWG/issues/2901.html>) | C++98  | o resultado da conversão de lvalue para rvalue de um unsigned int  
lvalue referindo-se a um objeto int com valor -1 era incerto  | tornado claro   
  
### Veja também

  * [`const_cast`](<#/doc/language/const_cast>)
  * [`static_cast`](<#/doc/language/static_cast>)
  * [`dynamic_cast`](<#/doc/language/dynamic_cast>)
  * [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
  * [conversão explícita](<#/doc/language/explicit_cast>)
  * [conversão definida pelo usuário](<#/doc/language/cast_operator>)

[Documentação C](<#/>) para conversões implícitas  
---