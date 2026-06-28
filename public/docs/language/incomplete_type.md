# Tipo

[Objetos](<#/doc/language/objects>), [referências](<#/doc/language/reference>), [funções](<#/doc/language/functions>) incluindo [especializações de template de função](<#/doc/language/template_specialization>), e [expressões](<#/doc/language/expressions>) possuem uma propriedade chamada _tipo_, que tanto restringe as operações permitidas para essas entidades quanto fornece significado semântico às sequências de bits que, de outra forma, seriam genéricas.

### Classificação de tipos

O sistema de tipos C++ consiste nos seguintes tipos:

*   [tipos fundamentais](<#/doc/language/types>) (veja também [std::is_fundamental](<#/doc/types/is_fundamental>)):

*   o tipo void (veja também [std::is_void](<#/doc/types/is_void>));

*   o tipo [std::nullptr_t](<#/doc/types/nullptr_t>) (veja também [std::is_null_pointer](<#/doc/types/is_null_pointer>));

| (desde C++11)

*   tipos aritméticos (veja também [std::is_arithmetic](<#/doc/types/is_arithmetic>)):

*   tipos integrais (incluindo [versões cv-qualificadas](<#/doc/language/cv>), veja também [std::is_integral](<#/doc/types/is_integral>), um sinônimo para tipo integral é tipo inteiro):

*   o tipo bool;
*   tipos de caractere:

*   tipos de caractere estreito:

*   tipos de caractere ordinário: char, signed char, unsigned char[1](<#/doc/language/type-id>)

*   o tipo char8_t

| (desde C++20)

*   tipos de caractere largo: char16_t, char32_t, (desde C++11)wchar_t;

*   tipos inteiros com sinal:

*   tipos inteiros com sinal padrão: signed char, short, int, long, long long;

*   tipos inteiros com sinal estendidos (definidos pela implementação);

| (desde C++11)

*   tipos inteiros sem sinal:

*   tipos inteiros sem sinal padrão: unsigned char, unsigned short, unsigned, unsigned long, unsigned long long;

*   tipos inteiros sem sinal estendidos (cada um corresponde a um tipo inteiro com sinal estendido, e vice-versa);

| (desde C++11)

*   tipos de ponto flutuante (veja também [std::is_floating_point](<#/doc/types/is_floating_point>)):

*   tipos de ponto flutuante padrão: float, double, long double e suas [versões cv-qualificadas](<#/doc/language/cv>);

*   tipos de ponto flutuante estendidos (incluindo [versões cv-qualificadas](<#/doc/language/cv>)):

*   [tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>);
*   outros tipos de ponto flutuante estendidos definidos pela implementação;

| (desde C++23)
*   tipos compostos (veja também [std::is_compound](<#/doc/types/is_compound>)):

*   [tipos de referência](<#/doc/language/reference>) (veja também [std::is_reference](<#/doc/types/is_reference>)):

*   [tipos de referência lvalue](<#/doc/language/reference>) (veja também [std::is_lvalue_reference](<#/doc/types/is_lvalue_reference>)):

*   referência lvalue a tipos de objeto;
*   referência lvalue a tipos de função;

*   [tipos de referência rvalue](<#/doc/language/reference>) (veja também [std::is_rvalue_reference](<#/doc/types/is_rvalue_reference>)):

*   referência rvalue a tipos de objeto;
*   referência rvalue a tipos de função;

| (desde C++11)

*   [tipos de ponteiro](<#/doc/language/pointer>) (veja também [std::is_pointer](<#/doc/types/is_pointer>)):

*   [tipos de ponteiro para objeto](<#/doc/language/pointer>);
*   [tipos de ponteiro para função](<#/doc/language/pointer>);

*   [tipos de ponteiro para membro](<#/doc/language/pointer>) (veja também [std::is_member_pointer](<#/doc/types/is_member_pointer>)):

*   [tipos de ponteiro para membro de dados](<#/doc/language/pointer>) (veja também [std::is_member_object_pointer](<#/doc/types/is_member_object_pointer>));
*   [tipos de ponteiro para função membro](<#/doc/language/pointer>) (veja também [std::is_member_function_pointer](<#/doc/types/is_member_function_pointer>));

*   [tipos de array](<#/doc/language/array>) (veja também [std::is_array](<#/doc/types/is_array>));
*   [tipos de função](<#/doc/language/function>) (veja também [std::is_function](<#/doc/types/is_function>));
*   [tipos de enumeração](<#/doc/language/enum>) (veja também [std::is_enum](<#/doc/types/is_enum>));

*   [tipos de enumeração sem escopo](<#/doc/language/enum>);

*   [tipos de enumeração com escopo](<#/doc/language/enum>) (veja também [`std::is_scoped_enum`](<#/doc/types/is_scoped_enum>));

| (desde C++11)

*   [tipos de classe](<#/doc/language/class>):

*   tipos não-union (veja também [std::is_class](<#/doc/types/is_class>));
*   [tipos union](<#/doc/language/union>) (veja também [std::is_union](<#/doc/types/is_union>)).

1.  [↑](<#/doc/language/type-id>) signed char e unsigned char são tipos de caractere estreito, mas não são tipos de caractere. Em outras palavras, o conjunto de tipos de caractere estreito não é um subconjunto do conjunto de tipos de caractere.

Para cada tipo não cv-qualificado, exceto referência e função, o sistema de tipos suporta três [versões cv-qualificadas](<#/doc/language/cv>) adicionais desse tipo (const, volatile e const volatile).

### Outras categorias

Um _tipo de objeto_ (veja também [std::is_object](<#/doc/types/is_object>)) é um tipo (possivelmente cv-qualificado) que não é um tipo de função, não é um tipo de referência e não é void (possivelmente cv-qualificado).

Os seguintes tipos são coletivamente chamados de _tipos escalares_ (veja também [std::is_scalar](<#/doc/types/is_scalar>)):

*   tipos aritméticos
*   [tipos de enumeração](<#/doc/language/enum>)
*   [tipos de ponteiro](<#/doc/language/pointer>)
*   [tipos de ponteiro para membro](<#/doc/language/pointer>)
*   [std::nullptr_t](<#/doc/types/nullptr_t>)

| (desde C++11)
*   versões cv-qualificadas desses tipos

Os seguintes tipos são coletivamente chamados de _tipos de tempo de vida implícito_:

*   tipos escalares
*   [tipos de classe de tempo de vida implícito](<#/doc/language/classes>)
*   tipos de array
*   versões cv-qualificadas desses tipos

Os seguintes tipos são coletivamente chamados de _tipos trivialmente copiáveis_:

*   tipos escalares
*   [tipos de classe trivialmente copiáveis](<#/doc/language/classes>)
*   arrays de tais tipos
*   versões cv-qualificadas desses tipos

Os seguintes tipos são coletivamente chamados de _tipos de layout padrão_:

*   tipos escalares
*   [tipos de classe de layout padrão](<#/doc/language/classes>)
*   arrays de tais tipos
*   versões cv-qualificadas desses tipos

| (desde C++11)

Diagrama de hierarquia de type traits
---
_Nota: Os elementos da imagem SVG são clicáveis, mas você deve abrir o diagrama em uma nova aba do navegador primeiro_

#### Categorias obsoletas

Os seguintes tipos são coletivamente chamados de _tipos POD_ (veja também [std::is_pod](<#/doc/types/is_pod>)):

*   tipos escalares
*   [classes POD](<#/doc/language/classes>)
*   arrays de tais tipos
*   versões cv-qualificadas desses tipos

| (obsoleto em C++20)
Os seguintes tipos são coletivamente chamados de _tipos triviais_ (veja também [std::is_trivial](<#/doc/types/is_trivial>)):

*   tipos escalares
*   [tipos de classe triviais](<#/doc/language/classes>)
*   arrays de tais tipos
*   versões cv-qualificadas desses tipos

| (desde C++11)
(obsoleto em C++26)

### Tipo definido pelo programa

Uma _especialização definida pelo programa_ é uma [especialização explícita](<#/doc/language/template_specialization>) ou [especialização parcial](<#/doc/language/partial_specialization>) que não faz parte da [biblioteca padrão](<#/doc/standard_library>) C++ e não é definida pela implementação.

Um _tipo definido pelo programa_ é um dos seguintes tipos:

*   Um [tipo de classe](<#/doc/language/class>) ou [tipo de enumeração](<#/doc/language/enum>) não-[closure](<#/doc/language/lambda>) (desde C++11) que não faz parte da biblioteca padrão C++ e não é definido pela implementação.

*   Um tipo closure de uma [expressão lambda](<#/doc/language/lambda>) não fornecida pela implementação.

| (desde C++11)

*   Uma [instanciação](<#/doc/language/templates>) de uma especialização definida pelo programa.

### Nomenclatura de tipos

Um [nome](<#/doc/language/name>) pode ser declarado para se referir a um tipo por meio de:

*   declaração de [classe](<#/doc/language/class>);
*   declaração de [union](<#/doc/language/union>);
*   declaração de [enum](<#/doc/language/enum>);
*   declaração de [typedef](<#/doc/language/typedef>);
*   declaração de [alias de tipo](<#/doc/language/type_alias>).

Tipos que não possuem nomes frequentemente precisam ser referenciados em programas C++; a sintaxe para isso é conhecida como type-id. A sintaxe do type-id que nomeia o tipo `T` é exatamente a sintaxe de uma [declaração](<#/doc/language/declarations>) de uma variável ou função do tipo `T`, com o identificador omitido, exceto que a decl-specifier-seq da gramática da declaração é restrita a type-specifier-seq, e que novos tipos podem ser definidos apenas se o type-id aparecer no lado direito de uma declaração de alias de tipo não-template.
```cpp
    int* p;               // declaração de um ponteiro para int
    static_cast<int*>(p); // type-id é "int*"
    
    int a[3];   // declaração de um array de 3 int
    new int[3]; // type-id é "int[3]" (chamado new-type-id)
    
    int (*(*x[2])())[3];      // declaração de um array de 2 ponteiros para funções
                              // retornando ponteiro para array de 3 int
    new (int (*(*[2])())[3]); // type-id é "int (*(*[2])())[3]"
    
    void f(int);                    // declaração de uma função que recebe int e retorna void
    std::function<void(int)> x = f; // parâmetro de template de tipo é um type-id "void(int)"
    std::function<auto(int) -> void> y = f; // o mesmo
    
    std::vector<int> v;       // declaração de um vector de int
    sizeof(std::vector<int>); // type-id é "std::vector<int>"
    
    struct { int x; } b;         // cria um novo tipo e declara um objeto b desse tipo
    sizeof(struct { int x; });   // erro: não é possível definir novos tipos em uma expressão sizeof
    using t = struct { int x; }; // cria um novo tipo e declara t como um alias desse tipo
    
    sizeof(static int); // erro: especificadores de classe de armazenamento não fazem parte de type-specifier-seq
    std::function<inline void(int)> f; // erro: nem os especificadores de função
```

A parte declarator da gramática da declaração com o nome removido é referida como abstract-declarator.

Type-id pode ser usado nas seguintes situações:

*   para especificar o tipo de destino em [expressões de cast](<#/doc/language/expressions>);
*   como argumentos para [`sizeof`](<#/doc/language/sizeof>), [`alignof`](<#/doc/language/alignof>), [`alignas`](<#/doc/language/alignas>), [`new`](<#/doc/language/new>), e [`typeid`](<#/doc/language/typeid>);
*   no lado direito de uma declaração de [alias de tipo](<#/doc/language/type_alias>);
*   como o tipo de retorno final de uma declaração de [função](<#/doc/language/function>);
*   como o argumento padrão de um [parâmetro de tipo template](<#/doc/language/template_parameters>);
*   como o argumento template para um [parâmetro de tipo template](<#/doc/language/template_parameters>);
*   em [especificação de exceção dinâmica](<#/doc/language/except_spec>).

| (até C++17)

Type-id pode ser usado com algumas modificações nas seguintes situações:

*   na lista de parâmetros de uma [função](<#/doc/language/function>) (quando o nome do parâmetro é omitido), type-id usa decl-specifier-seq em vez de type-specifier-seq (em particular, alguns especificadores de classe de armazenamento são permitidos);
*   no nome de uma [função de conversão definida pelo usuário](<#/doc/language/cast_operator>), o abstract declarator não pode incluir operadores de função ou array.

| Esta seção está incompleta
Razão: 8.2[dcl.ambig.res] se puder ser resumido de forma compacta
| Esta seção está incompleta
Razão: mencionar e linkar para decltype e auto

### Especificador de tipo elaborado

Especificadores de tipo elaborados podem ser usados para se referir a um nome de classe (class, struct ou union) previamente declarado ou a um nome de enum previamente declarado, mesmo que o nome tenha sido [ocultado por uma declaração não-tipo](<#/doc/language/lookup>). Eles também podem ser usados para declarar novos nomes de classe.

Veja [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>) para detalhes.

### Tipo estático

O tipo de uma expressão que resulta da análise em tempo de compilação do programa é conhecido como o _tipo estático_ da expressão. O tipo estático não muda enquanto o programa está sendo executado.

### Tipo dinâmico

Se alguma [expressão glvalue](<#/doc/language/value_category>) se refere a um [objeto polimórfico](<#/doc/language/objects>), o tipo de seu objeto mais derivado é conhecido como o tipo dinâmico.
```cpp
    // dado
    struct B { virtual ~B() {} }; // tipo polimórfico
    struct D : B {};               // tipo polimórfico
    
    D d; // objeto mais derivado
    B* ptr = &d;
    
    // o tipo estático de (*ptr) é B
    // o tipo dinâmico de (*ptr) é D
```

Para expressões prvalue, o tipo dinâmico é sempre o mesmo que o tipo estático.

### Tipo incompleto

Os seguintes tipos são _tipos incompletos_:

*   o tipo void (possivelmente [cv](<#/doc/language/cv>)-qualificado);
*   _tipos de objeto incompletamente definidos_:
    *   tipo de classe que foi declarado (por exemplo, por [declaração antecipada](<#/doc/language/class>)) mas não definido;
    *   [array de limite desconhecido](<#/doc/language/array>);
    *   array de elementos de tipo incompleto;
    *   [tipo de enumeração](<#/doc/language/enum>) desde o ponto de declaração até que seu tipo subjacente seja determinado.

Todos os outros tipos são completos.

Qualquer um dos seguintes contextos exige que o tipo `T` seja completo:

*   [definição](<#/doc/language/function>) ou chamada de uma função com tipo de retorno `T` ou tipo de argumento `T`;
*   [definição](<#/doc/language/definition>) de um objeto do tipo `T`;
*   declaração de um [membro de dados de classe não-estático](<#/doc/language/data_members>) do tipo `T`;
*   [expressão `new`](<#/doc/language/new>) para um objeto do tipo `T` ou um array cujo tipo de elemento é `T`;
*   [conversão lvalue-para-rvalue](<#/doc/language/implicit_cast>) aplicada a um glvalue do tipo `T`;
*   uma conversão [implícita](<#/doc/language/implicit_cast>) ou [explícita](<#/doc/language/explicit_cast>) para o tipo `T`;
*   uma [conversão padrão](<#/doc/language/implicit_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), ou [`static_cast`](<#/doc/language/static_cast>) para o tipo T* ou T&, exceto ao converter da [constante de ponteiro nulo](<#/doc/language/pointer>) ou de um [ponteiro para void possivelmente cv-qualificado](<#/doc/language/pointer>);
*   [operador de acesso a membro de classe](<#/doc/language/operator_member_access>) aplicado a uma expressão do tipo `T`;
*   operador [`typeid`](<#/doc/language/typeid>), [`sizeof`](<#/doc/language/sizeof>), ou [`alignof`](<#/doc/language/alignof>) aplicado ao tipo `T`;
*   [operador aritmético](<#/doc/language/operator_arithmetic>) aplicado a um ponteiro para `T`;
*   definição de uma classe com classe base `T`;
*   atribuição a um lvalue do tipo `T`;
*   um [handler](<#/doc/language/catch>) do tipo `T`, T&, ou T*.

(Em geral, quando o tamanho e o layout de `T` devem ser conhecidos.)

Se alguma dessas situações ocorrer em uma unidade de tradução, a definição do tipo deve aparecer na mesma unidade de tradução. Caso contrário, não é exigido.

Um tipo de objeto incompletamente definido pode ser completado:

*   Um tipo de classe (como class X) pode ser considerado incompleto em um ponto em uma unidade de tradução e considerado completo mais tarde; o tipo class X é o mesmo tipo em ambos os pontos:

```cpp
    struct X;            // declaração de X, nenhuma definição fornecida ainda
    extern X* xp;        // xp é um ponteiro para um tipo incompleto:
                         // a definição de X não é alcançável
    
    void foo()
    {
        xp++;            // malformado: X é incompleto
    }
    
    struct X { int i; }; // definição de X
    X x;                 // OK: a definição de X é alcançável
    
    void bar()
    {
        xp = &x;         // OK: o tipo é “ponteiro para X”
        xp++;            // OK: X é completo
    }
```

*   O tipo declarado de um objeto array pode ser um array de tipo de classe incompleto e, portanto, incompleto; se o tipo de classe for completado mais tarde na unidade de tradução, o tipo de array se torna completo; o tipo de array nesses dois pontos é o mesmo tipo.
*   O tipo declarado de um objeto array pode ser um array de limite desconhecido e, portanto, ser incompleto em um ponto em uma unidade de tradução e completo mais tarde; os tipos de array nesses dois pontos ("array de limite desconhecido de `T`" e "array de N `T`") são tipos diferentes.

O tipo de um ponteiro ou referência para um array de limite desconhecido aponta ou se refere permanentemente a um tipo incompleto. Um array de limite desconhecido nomeado por uma declaração [`typedef`](<#/doc/language/typedef>) se refere permanentemente a um tipo incompleto. Em ambos os casos, o tipo de array não pode ser completado:
```cpp
    extern int arr[];   // o tipo de arr é incompleto
    typedef int UNKA[]; // UNKA é um tipo incompleto
    
    UNKA* arrp;         // arrp é um ponteiro para um tipo incompleto
    UNKA** arrpp;
    
    void foo()
    {
        arrp++;         // erro: UNKA é um tipo incompleto
        arrpp++;        // OK: sizeof UNKA* é conhecido
    }
    
    int arr[10];        // agora o tipo de arr é completo
    
    void bar()
    {
        arrp = &arr;    // OK: conversão de qualificação (desde C++20)
        arrp++;         // erro: UNKA não pode ser completado
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 328](<https://cplusplus.github.io/CWG/issues/328.html>) | C++98 | membros de classe de tipo incompleto não eram proibidos se um objeto do tipo de classe nunca fosse criado | membros de dados de classe não-estáticos precisam ser completos
[CWG 977](<https://cplusplus.github.io/CWG/issues/977.html>) | C++98 | o ponto em que um tipo de enumeração se torna completo em sua definição era incerto | o tipo é completo uma vez que o tipo subjacente é determinado
[CWG 1362](<https://cplusplus.github.io/CWG/issues/1362.html>) | C++98 | conversões definidas pelo usuário para o tipo `T*` ou `T&` exigiam que `T` fosse completo | não exigido
[CWG 2006](<https://cplusplus.github.io/CWG/issues/2006.html>) | C++98 | tipos void cv-qualificados eram tipo de objeto e tipo completo | excluídos de ambas as categorias
[CWG 2448](<https://cplusplus.github.io/CWG/issues/2448.html>) | C++98 | apenas tipos não cv-qualificados podiam ser tipos integrais e de ponto flutuante | permite tipos cv-qualificados
[CWG 2630](<https://cplusplus.github.io/CWG/issues/2630.html>) | C++98 | não estava claro se uma classe é considerada completa fora da unidade de tradução onde a definição da classe aparece | a classe é completa se sua definição for alcançável neste caso
[CWG 2643](<https://cplusplus.github.io/CWG/issues/2643.html>) | C++98 | o tipo de um ponteiro para array de limite desconhecido não podia ser completado (mas já é completo) | o tipo de array apontado não pode ser completado
[LWG 2139](<https://cplusplus.github.io/LWG/issue2139>) | C++98 | o significado de “tipo definido pelo usuário” era incerto | define e usa “tipo definido pelo programa” em vez disso
[LWG 3119](<https://cplusplus.github.io/LWG/issue3119>) | C++11 | não estava claro se os tipos closure são tipos definidos pelo programa | esclarecido

### Referências

*   C++23 standard (ISO/IEC 14882:2024):

*   6.8.2 Fundamental types [basic.fundamental]

*   C++20 standard (ISO/IEC 14882:2020):

*   6.8.2 Fundamental types [basic.fundamental]

*   C++17 standard (ISO/IEC 14882:2017):

*   6.9.1 Fundamental types [basic.fundamental]

*   C++14 standard (ISO/IEC 14882:2014):

*   3.9.1 Fundamental types [basic.fundamental]

*   C++11 standard (ISO/IEC 14882:2011):

*   3.9.1 Fundamental types [basic.fundamental]

*   C++98 standard (ISO/IEC 14882:1998):

*   3.9.1 Fundamental types [basic.fundamental]

### Veja também

**[Type traits](<#/doc/meta>)** | Interfaces baseadas em template em tempo de compilação para consultar as propriedades dos tipos
[Documentação C](<#/>) para Tipo

### Links externos

1.  | [Árvore de tipos C++0x de Howard Hinnant](<https://howardhinnant.github.io/TypeHiearchy.pdf>)