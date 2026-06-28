# Declaração de função

Uma declaração de função introduz o nome da função e seu tipo. Uma definição de função associa o nome/tipo da função ao corpo da função.

### Declaração de função

Declarações de função podem aparecer em qualquer escopo. Uma declaração de função no escopo de classe introduz uma função membro de classe (a menos que o especificador friend seja usado), veja [funções membro](<#/doc/language/member_functions>) e [funções friend](<#/doc/language/friend>) para detalhes.

---
noptr-declarator `(` parameter-list `)` cv ﻿(opcional) ref ﻿ ﻿(opcional) except ﻿(opcional) attr ﻿(opcional) | (1) |
noptr-declarator `(` parameter-list `)` cv ﻿(opcional) ref ﻿ ﻿(opcional) except ﻿(opcional) attr ﻿(opcional)
`- >` trailing | (2) | (desde C++11)

(veja [Declarações](<#/doc/language/declarations>) para as outras formas da sintaxe do declarador)

1) Sintaxe de declarador de função regular.

2) Declaração de tipo de retorno final (trailing return type). O decl-specifier-seq neste caso deve conter a palavra-chave auto.

noptr-declarator | - | qualquer declarador válido, mas se começar com `*`, `&`, ou `&&`, deve ser cercado por parênteses.
---|---|---
parameter-list | - | possivelmente vazia, lista de parâmetros da função separados por vírgulas (veja abaixo para detalhes)
attr | - | (desde C++11) uma lista de [atributos](<#/doc/language/attributes>). Esses atributos são aplicados ao tipo da função, não à própria função. Os atributos para a função aparecem após o identificador dentro do declarador e são combinados com os atributos que aparecem no início da declaração, se houver.
cv | - | qualificação const/volatile, permitida apenas em declarações de funções membro não estáticas
ref | - | (desde C++11) ref-qualificação, permitida apenas em declarações de funções membro não estáticas
except | - | | [especificação de exceção dinâmica](<#/doc/language/except_spec>) | (até C++11)
---|---
```cpp
ou especificação de exceção dinâmica
ou especificação noexcept  // (desde C++11)
(até C++17)
especificação noexcept  // (desde C++17)
trailing | - | Tipo de retorno final, útil se o tipo de retorno depender dos nomes dos argumentos, como template<class T, class U> auto add(T t, U u) -> decltype(t + u); ou for complicado, como em auto fpif(int)->int(*)(int)
```

Conforme mencionado em [Declarações](<#/doc/language/declarations>), o declarador pode ser seguido por uma [cláusula requires](<#/doc/language/constraints>), que declara as [restrições](<#/doc/language/constraints>) associadas para a função, que devem ser satisfeitas para que a função seja selecionada pela [resolução de sobrecarga](<#/doc/language/overload_resolution>). (exemplo: void f1(int a) requires true;) Note que a restrição associada faz parte da assinatura da função, mas não faz parte do tipo da função. | (desde C++20)
---|---

Declaradores de função podem ser misturados com outros declaradores, onde a [sequência de especificadores de declaração](<#/doc/language/declarations>) permite:
```cpp
    // declara um int, um int*, uma função e um ponteiro para uma função
    int a = 1, *p = NULL, f(), (*pf)(double);
    // decl-specifier-seq é int
    // declarador f() declara (mas não define)
    //                uma função que não recebe argumentos e retorna int
     
    struct S
    {
        virtual int f(char) const, g(int) &&; // declara duas funções membro não estáticas
        virtual int f(char), x; // erro em tempo de compilação: virtual (em decl-specifier-seq)
                                // é permitido apenas em declarações de
                                // funções membro não estáticas
    };
```

Usar um tipo de objeto qualificado com volatile como tipo de parâmetro ou tipo de retorno é obsoleto. | (desde C++20)
---|---

O tipo de retorno de uma função não pode ser um tipo de função ou um tipo de array (mas pode ser um ponteiro ou referência para esses).

Assim como em qualquer declaração, os atributos que aparecem antes da declaração e os atributos que aparecem imediatamente após o identificador dentro do declarador se aplicam à entidade que está sendo declarada ou definida (neste caso, à função):
```cpp
    [[noreturn]] void f [[noreturn]] (); // OK: ambos os atributos se aplicam à função f
```

No entanto, os atributos que aparecem após o declarador (na sintaxe acima), aplicam-se ao tipo da função, não à própria função:
```cpp
    void f() [[noreturn]]; // Erro: este atributo não tem efeito na própria função
```

| (desde C++11)
---|---

### Dedução do tipo de retorno

Se o decl-specifier-seq da declaração de função contiver a palavra-chave auto, o tipo de retorno final pode ser omitido e será deduzido pelo compilador a partir do tipo da expressão usada na instrução [return](<#/doc/language/return>). Se o tipo de retorno não usar decltype(auto), a dedução segue as regras da [dedução de argumento de template](<#/doc/language/template_argument_deduction>):
```cpp
    int x = 1;
    auto f() { return x; }        // tipo de retorno é int
    const auto& f() { return x; } // tipo de retorno é const int&
```

Se o tipo de retorno for decltype(auto), o tipo de retorno é o que seria obtido se a expressão usada na instrução return fosse envolvida em [`decltype`](<#/doc/language/decltype>):
```cpp
    int x = 1;
    decltype(auto) f() { return x; }  // tipo de retorno é int, o mesmo que decltype(x)
    decltype(auto) f() { return(x); } // tipo de retorno é int&, o mesmo que decltype((x))
```

(nota: "const decltype(auto)&" é um erro, decltype(auto) deve ser usado sozinho) Se houver múltiplas instruções return, todas elas devem deduzir para o mesmo tipo:
```cpp
    auto f(bool val)
    {
        if (val) return 123; // deduz tipo de retorno int
        else return 3.14f;   // Erro: deduz tipo de retorno float
    }
```

Se não houver instrução return ou se o argumento da instrução return for uma expressão void, o tipo de retorno declarado deve ser decltype(auto), caso em que o tipo de retorno deduzido é void, ou auto (possivelmente cv-qualificado), caso em que o tipo de retorno deduzido é então void (identicamente cv-qualificado):
```cpp
    auto f() {}              // retorna void
    auto g() { return f(); } // retorna void
    auto* x() {}             // Erro: não é possível deduzir auto* de void
```

Uma vez que uma instrução return tenha sido vista em uma função, o tipo de retorno deduzido a partir dessa instrução pode ser usado no restante da função, incluindo em outras instruções return:
```cpp
    auto sum(int i)
    {
        if (i == 1)
            return i;              // o tipo de retorno de sum é int
        else
            return sum(i - 1) + i; // OK: o tipo de retorno de sum já é conhecido
    }
```

Se a instrução return usar uma [lista de inicializadores entre chaves](<#/doc/language/initialization>), a dedução não é permitida:
```cpp
    auto func() { return {1, 2, 3}; } // Erro
```

[Funções virtuais](<#/doc/language/virtual>) e [coroutines](<#/doc/language/coroutines>)(desde C++20) não podem usar dedução de tipo de retorno:
```cpp
    struct F
    {
        virtual auto f() { return 2; } // Erro
    };
```

[Templates de função](<#/doc/language/function_template>) que não sejam [funções de conversão definidas pelo usuário](<#/doc/language/cast_operator>) podem usar dedução de tipo de retorno. A dedução ocorre na instanciação, mesmo que a expressão na instrução return não seja [dependente](<#/doc/language/dependent_name>). Esta instanciação não está em um contexto imediato para os propósitos de [SFINAE](<#/doc/language/sfinae>).
```cpp
    template<class T>
    auto f(T t) { return t; }
    typedef decltype(f(1)) fint_t;    // instancia f<int> para deduzir o tipo de retorno
     
    template<class T>
    auto f(T* t) { return *t; }
    void g() { int (*p)(int*) = &f; } // instancia ambos os fs para determinar os tipos de retorno,
                                      // escolhe a segunda sobrecarga de template
```

Redeclarações ou especializações de funções ou templates de função que usam dedução de tipo de retorno devem usar os mesmos marcadores de tipo de retorno:
```cpp
    auto f(int num) { return num; }
    // int f(int num);            // Erro: sem marcador de tipo de retorno
    // decltype(auto) f(int num); // Erro: marcador diferente
     
    template<typename T>
    auto g(T t) { return t; }
    template auto g(int);     // OK: tipo de retorno é int
    // template char g(char); // Erro: não é uma especialização do template primário g
```

Similarmente, redeclarações ou especializações de funções ou templates de função que não usam dedução de tipo de retorno não devem usar um marcador:
```cpp
    int f(int num);
    // auto f(int num) { return num; } // Erro: não é uma redeclaração de f
     
    template<typename T>
    T g(T t) { return t; }
    template int g(int);      // OK: especializa T como int
    // template auto g(char); // Erro: não é uma especialização do template primário g
```

[Declarações de instanciação explícita](<#/doc/language/function_template>) não instanciam templates de função que usam dedução de tipo de retorno:
```cpp
    template<typename T>
    auto f(T t) { return t; }
    extern template auto f(int); // não instancia f<int>
     
    int (*p)(int) = f; // instancia f<int> para determinar seu tipo de retorno,
                       // mas uma definição de instanciação explícita
                       // ainda é necessária em algum lugar do programa
```

| (desde C++14)

### Lista de parâmetros

A lista de parâmetros determina os argumentos que podem ser especificados quando a função é chamada. É uma lista de _declarações de parâmetros_ separada por vírgulas, cada uma com a seguinte sintaxe:

---
attr ﻿(opcional) decl-specifier-seq declarator | (1) |
---|---|---
attr ﻿(opcional) `this` decl-specifier-seq declarator | (2) | (desde C++23)
attr ﻿(opcional) decl-specifier-seq declarator `=` initializer | (3) |
attr ﻿(opcional) decl-specifier-seq abstract-declarator ﻿(opcional) | (4) |
attr ﻿(opcional) `this` decl-specifier-seq abstract-declarator ﻿(opcional) | (5) | (desde C++23)
attr ﻿(opcional) decl-specifier-seq abstract-declarator ﻿(opcional) `=` initializer | (6) |
`void` | (7) |

1) Declara um parâmetro nomeado (formal). Para os significados de decl-specifier-seq e declarator, veja [declarações](<#/doc/language/declarations>).

int f(int a, int* p, int (*(*x)(double))[3]);

2) Declara um [parâmetro de objeto explícito](<#/doc/language/function>) nomeado.

3) Declara um parâmetro nomeado (formal) com um [valor padrão](<#/doc/language/default_arguments>).

int f(int a = 7, int* p = nullptr, int (*(*x)(double))[3] = nullptr);

4) Declara um parâmetro sem nome.

int f(int, int*, int (*(*)(double))[3]);

5) Declara um [parâmetro de objeto explícito](<#/doc/language/function>) sem nome.

6) Declara um parâmetro sem nome com um [valor padrão](<#/doc/language/default_arguments>).

int f(int = 7, int* = nullptr, int (*(*)(double))[3] = nullptr);

7) Indica que a função não recebe parâmetros, é o sinônimo exato para uma lista de parâmetros vazia: int f(void); e int f(); declaram a mesma função.

void é a única sintaxe equivalente a uma lista de parâmetros vazia, outros usos de parâmetros void são malformados: Uso incorreto | Exemplo
---|---
múltiplos parâmetros estão presentes | int f1(void, int);
o parâmetro void é nomeado | inf f2(void param);
void é cv-qualificado | int f3(const void);
void é [dependente](<#/doc/language/dependent_name>) | int f4(T); (onde `T` é void)
o parâmetro void é um [parâmetro de objeto explícito](<#/doc/language/function>) (desde C++23) | int f5(this void);

Embora decl-specifier-seq implique que pode haver [especificadores](<#/doc/language/declarations>) além dos especificadores de tipo, o único outro especificador permitido é register, bem como auto (até C++11), e não tem efeito. | (até C++17)
---|---
Se qualquer um dos parâmetros da função usar um _marcador_ (auto ou um [tipo concept](<#/doc/concepts>)), a declaração da função é, em vez disso, uma declaração de [template de função abreviado](<#/doc/language/function_template>):
```cpp
    void f1(auto);    // o mesmo que template<class T> void f1(T)
    void f2(C1 auto); // o mesmo que template<C1 T> void f2(T), se C1 for um concept
```

| (desde C++20)
Uma declaração de parâmetro com o especificador this (sintaxe ([2](<#/doc/language/function>))/([5](<#/doc/language/function>))) declara um _parâmetro de objeto explícito_. Um parâmetro de objeto explícito não pode ser um [pacote de parâmetros de função](<#/doc/language/parameter_pack>), e só pode aparecer como o primeiro parâmetro da lista de parâmetros nas seguintes declarações:

  * uma declaração de uma [função membro](<#/doc/language/member_functions>) ou template de função membro
  * uma [instanciação explícita](<#/doc/language/function_template>) ou [especialização explícita](<#/doc/language/template_specialization>) de uma função membro template
  * uma declaração de [lambda](<#/doc/language/lambda>)

Uma função membro com um parâmetro de objeto explícito tem as seguintes restrições:

  * A função não é [static](<#/doc/language/static>).
  * A função não é [virtual](<#/doc/language/virtual>).
  * O declarador da função não contém cv e ref.

```cpp
    struct C
    {
        void f(this C& self);     // OK
     
        template<typename Self>
        void g(this Self&& self); // também OK para templates
     
        void p(this C) const;     // Erro: “const” não permitido aqui
        static void q(this C);    // Erro: “static” não permitido aqui
        void r(int, this C);      // Erro: um parâmetro de objeto explícito
                                  //        só pode ser o primeiro parâmetro
    };
     
    // void func(this C& self);   // Erro: funções não membro não podem ter
                                  //        um parâmetro de objeto explícito
```

| (desde C++23)

Os nomes de parâmetros declarados em declarações de função geralmente servem apenas para fins de auto-documentação. Eles são usados (mas permanecem opcionais) em definições de função.

Uma ambiguidade surge em uma lista de parâmetros quando um nome de tipo está aninhado em parênteses (incluindo [expressões lambda](<#/doc/language/lambda>))(desde C++11). Neste caso, a escolha é entre a declaração de um parâmetro do tipo ponteiro para função e a declaração de um parâmetro com parênteses redundantes em torno do identificador do declarador. A resolução é considerar o nome do tipo como um [especificador de tipo simples](<#/doc/language/declarations>) (que é o tipo ponteiro para função):
```cpp
    class C {};
     
    void f(int(C)) {} // void f(int(*fp)(C param)) {}
                      // NÃO void f(int C) {}
     
    void g(int *(C[10])); // void g(int *(*fp)(C param[10]));
                          // NÃO void g(int *C[10]);
```

O tipo de parâmetro não pode ser um tipo que inclua uma referência ou um ponteiro para array de tamanho desconhecido, incluindo ponteiros/arrays de múltiplos níveis de tais tipos, ou um ponteiro para funções cujos parâmetros são tais tipos.

#### Usando reticências

O último parâmetro na lista de parâmetros pode ser uma reticências (...); isso declara uma [função variádica](<#/doc/language/variadic_arguments>). A vírgula que precede as reticências pode ser omitida (obsoleto em C++26):
```cpp
    int printf(const char* fmt, ...); // uma função variádica
    int printf(const char* fmt...);   // o mesmo que acima, mas obsoleto desde C++26
     
    template<typename... Args>
    void f(Args..., ...); // um template de função variádica com um pacote de parâmetros
     
    template<typename... Args>
    void f(Args... ...);  // o mesmo que acima, mas obsoleto desde C++26
     
    template<typename... Args>
    void f(Args......);   // o mesmo que acima, mas obsoleto desde C++26
```

### Tipo de função

#### Lista de tipos de parâmetros

A _lista de tipos de parâmetros_ de uma função é determinada da seguinte forma:

  1. O tipo de cada parâmetro (incluindo [pacotes de parâmetros de função](<#/doc/language/parameter_pack>))(desde C++11) é determinado a partir de sua própria [declaração de parâmetro](<#/doc/language/function>).
  2. Após determinar o tipo de cada parâmetro, qualquer parâmetro do tipo "array de `T`" ou do tipo de função `T` é ajustado para ser "ponteiro para `T`".
  3. Após produzir a lista de tipos de parâmetros, quaisquer [qualificadores cv](<#/doc/language/cv>) de nível superior que modificam um tipo de parâmetro são excluídos ao formar o tipo de função.
  4. A lista resultante de tipos de parâmetros transformados e a presença ou ausência das [reticências](<#/doc/language/function>) ou de um [pacote de parâmetros de função](<#/doc/language/parameter_pack>)(desde C++11) é a lista de tipos de parâmetros da função.

```cpp
    void f(char*);         // #1
    void f(char[]) {}      // define #1
    void f(const char*) {} // OK, outra sobrecarga
    void f(char* const) {} // Erro: redefine #1
     
    void g(char(*)[2]);   // #2
    void g(char[3][2]) {} // define #2
    void g(char[3][3]) {} // OK, outra sobrecarga
     
    void h(int x(const int)); // #3
    void h(int (*)(int)) {}   // define #3
```

#### Determinando o tipo de função

Na sintaxe (1), assumindo noptr-declarator como uma declaração autônoma, dado o tipo do qualified-id ou unqualified-id em noptr-declarator como "derived-declarator-type-list `T`":

  * Se a especificação de exceção for [não lançadora](<#/doc/language/noexcept_spec>), o tipo da função declarada é
"derived-declarator-type-list noexcept função de
parameter-type-list cv ﻿(opcional) ref ﻿ ﻿(opcional) retornando `T`".

| (desde C++17)
---|---

  * O (até C++17)Caso contrário, o (desde C++17) tipo da função declarada é
"derived-declarator-type-list função de
parameter-type-list cv ﻿(opcional) ref ﻿ ﻿(opcional)(desde C++11) retornando `T`".

Na sintaxe (2), assumindo noptr-declarator como uma declaração autônoma, dado o tipo do qualified-id ou unqualified-id em noptr-declarator como "derived-declarator-type-list `T`" (`T` deve ser auto neste caso): | (desde C++11)
---|---

  * Se a especificação de exceção for [não lançadora](<#/doc/language/noexcept_spec>), o tipo da função declarada é
"derived-declarator-type-list noexcept função de
parameter-type-list cv ﻿(opcional) ref ﻿ ﻿(opcional) retornando trailing ﻿".

| (desde C++17)

  * O (até C++17)Caso contrário, o (desde C++17) tipo da função declarada é
"derived-declarator-type-list função de
parameter-type-list cv ﻿(opcional) ref ﻿ ﻿(opcional) retornando trailing ﻿".

attr, se presente, aplica-se ao tipo da função. | (desde C++11)
```cpp
    // o tipo de “f1” é
    // “função de int retornando void, com atributo noreturn”
    void f1(int a) [[noreturn]];
     
    // o tipo de “f2” é
    // “constexpr noexcept função de ponteiro para int retornando int”
    constexpr auto f2(int[] b) noexcept -> int;
     
    struct X
    {
        // o tipo de “f3” é
        // “função sem parâmetro const retornando const int”
        const int f3() const;
    };
```

#### Qualificadores finais

Um tipo de função com cv ﻿ ou ref ﻿ ﻿(desde C++11) (incluindo um tipo nomeado por um nome [`typedef`](<#/doc/language/typedef>)) pode aparecer apenas como:

  * o tipo de função para uma [função membro não estática](<#/doc/language/member_functions>),
  * o tipo de função para o qual um ponteiro para membro se refere,
  * o tipo de função de nível superior de uma declaração typedef de função ou [declaração de alias](<#/doc/language/type_alias>)(desde C++11),
  * o [type-id](<#/doc/language/type-id>) no argumento padrão de um [parâmetro de tipo de template](<#/doc/language/template_parameters>), ou
  * o type-id de um argumento de template para um parâmetro de tipo de template.

```cpp
    typedef int FIC(int) const;
    FIC f;     // Erro: não declara uma função membro
     
    struct S
    {
        FIC f; // OK
    };
     
    FIC S::*pm = &S::f; // OK
```

### Assinatura da função

Toda função tem uma assinatura.

A assinatura de uma função consiste em seu nome e [lista de tipos de parâmetros](<#/doc/language/function>). Sua assinatura também contém o [namespace](<#/doc/language/namespace>) envolvente, com as seguintes exceções:

  * Se a função for uma [função membro](<#/doc/language/member_functions>), sua assinatura contém a classe da qual a função é membro em vez do namespace envolvente. Sua assinatura também contém os seguintes componentes, se existirem:

  * cv

  * ref

| (desde C++11)
---|---

  * cláusula requires final

  * Se a função for uma função [friend](<#/doc/language/friend>) não template com uma cláusula requires final, sua assinatura contém a classe envolvente em vez do namespace envolvente. A assinatura também contém a cláusula requires final.

| (desde C++20)

except e attr (desde C++11) não envolvem a assinatura da função, embora a [especificação noexcept](<#/doc/language/noexcept_spec>) afete o tipo da função (desde C++17).

### Definição de função

Uma definição de função não membro pode aparecer apenas no escopo de namespace (não há funções aninhadas). Uma definição de [função membro](<#/doc/language/member_functions>) também pode aparecer no corpo de uma [definição de classe](<#/doc/language/class>). Elas têm a seguinte sintaxe:

---
attr ﻿(opcional) decl-specifier-seq ﻿(opcional) declarator
virt-specifier-seq ﻿(opcional) function-body | (1) |
---|---|---
attr ﻿(opcional) decl-specifier-seq ﻿(opcional) declarator requires-clause function-body | (2) | (desde C++20)

1) Uma definição de função sem restrições.

2) Uma definição de função com restrições.

attr | - | (desde C++11) uma lista de [atributos](<#/doc/language/attributes>). Esses atributos são combinados com os atributos após o identificador no declarador (veja o topo desta página), se houver.
---|---|---
decl-specifier-seq | - | o tipo de retorno com especificadores, como na [gramática de declaração](<#/doc/language/declarations>)
declarator | - | declarador de função, o mesmo que na gramática de declaração de função acima (pode ser entre parênteses)
virt-specifier-seq | - | (desde C++11) [`override`](<#/doc/language/override>), [`final`](<#/doc/language/final>), ou sua combinação em qualquer ordem
requires-clause | - | uma [cláusula requires](<#/doc/language/constraints>)
function-body | - | o corpo da função (veja abaixo)

function-body é um dos seguintes:

---
ctor-initializer ﻿(opcional) compound-statement | (1) |
---|---|---
function-try-block | (2) |
`=` `default` `;` | (3) | (desde C++11)
`=` `delete` `;` | (4) | (desde C++11)
`=` `delete` `(` string-literal `);` | (5) | (desde C++26)

1) Corpo de função regular.

2) [Bloco try de função](<#/doc/language/try>).

3) Definição de função explicitamente padronizada.

4) Definição de função explicitamente deletada.

5) Definição de função explicitamente deletada com mensagem de erro.

ctor-initializer | - | [lista de inicializadores de membro](<#/doc/language/initializer_list>), permitida apenas em construtores
---|---|---
compound-statement | - | a [sequência de instruções](<#/doc/language/statements>) entre chaves que constitui o corpo de uma função
function-try-block | - | um [bloco try de função](<#/doc/language/try>)
string-literal | - | um [literal de string não avaliado](<#/doc/language/string_literal>) que pode ser usado para explicar a razão pela qual a função é deletada
```cpp
    int max(int a, int b, int c)
    {
        int m = (a > b) ? a : b;
        return (m > c) ? m : c;
    }
     
    // decl-specifier-seq é “int”
    // declarator é “max(int a, int b, int c)”
    // body é { ... }
```

O corpo da função é uma [instrução composta](<#/doc/language/statements>) (sequência de zero ou mais instruções cercadas por um par de chaves), que é executada quando a chamada da função é feita. Além disso, o corpo da função de um [construtor](<#/doc/language/initializer_list>) também inclui o seguinte:

  * Para todos os membros de dados não estáticos cujos identificadores estão ausentes na [lista de inicializadores de membro](<#/doc/language/initializer_list>) do construtor, os [inicializadores de membro padrão](<#/doc/language/data_members>) ou (desde C++11) [inicializações padrão](<#/doc/language/default_initialization>) usados para inicializar os [subobjetos](<#/doc/language/objects>) membro correspondentes.
  * Para todas as classes base cujos nomes de tipo estão ausentes na lista de inicializadores de membro do construtor, as inicializações padrão usadas para inicializar os subobjetos de classe base correspondentes.

Se uma definição de função contiver um virt-specifier-seq, ela deve definir uma [função membro](<#/doc/language/member_functions>). | (desde C++11)
---|---
Se uma definição de função contiver uma cláusula requires, ela deve definir uma [função template](<#/doc/language/templates>). | (desde C++20)
```cpp
    void f() override {} // Erro: não é uma função membro
     
    void g() requires (sizeof(int) == 4) {} // Erro: não é uma função template
```

Os tipos de parâmetros, bem como o tipo de retorno de uma definição de função, não podem ser [tipos de classe](<#/doc/language/class>) [incompletos](<#/doc/language/incomplete_type>) (possivelmente cv-qualificados), a menos que a função seja definida como deletada (desde C++11). A verificação de completude é feita apenas no corpo da função, o que permite que [funções membro](<#/doc/language/member_functions>) retornem a classe na qual são definidas (ou sua classe envolvente), mesmo que esteja incompleta no ponto de definição (ela está completa no corpo da função).

Os parâmetros declarados no declarador de uma definição de função estão [no escopo](<#/doc/language/scope>) dentro do corpo. Se um parâmetro não for usado no corpo da função, ele não precisa ser nomeado (é suficiente usar um declarador abstrato):
```cpp
    void print(int a, int) // o segundo parâmetro não é usado
    {
        std::printf("a = %d\n", a);
    }
```

Embora os [qualificadores cv](<#/doc/language/cv>) de nível superior nos parâmetros sejam descartados nas declarações de função, eles modificam o tipo do parâmetro conforme visível no corpo de uma função:
```cpp
    void f(const int n) // declara função do tipo void(int)
    {
        // mas no corpo, o tipo de “n” é const int
    }
```

#### Funções padronizadas

Se a definição da função for da sintaxe ([3](<#/doc/language/function>)), a função é definida como _explicitamente padronizada_. Uma função explicitamente padronizada deve ser uma [função membro especial](<#/doc/language/member_functions>) ou [função de operador de comparação](<#/doc/language/operator_comparison>)(desde C++20), e não deve ter [argumento padrão](<#/doc/language/default_arguments>). Uma função membro especial explicitamente padronizada `F1` pode diferir da função membro especial correspondente `F2` que teria sido implicitamente declarada, da seguinte forma:

  * `F1` e `F2` podem ter ref e/ou except diferentes.
  * Se `F2` tiver um parâmetro não-objeto do tipo const C&, o parâmetro não-objeto correspondente de `F1` pode ser do tipo `C&`.

| (desde C++11)
---|---

  * Se `F2` tiver um parâmetro de objeto implícito do tipo "referência para `C`", `F1` pode ser uma função membro de objeto explícito cujo [parâmetro de objeto explícito](<#/doc/language/function>) é de tipo (possivelmente diferente) "referência para `C`", caso em que o tipo de `F1` diferiria do tipo de `F2` no sentido de que o tipo de `F1` tem um parâmetro adicional.

| (desde C++23)
Se o tipo de `F1` diferir do tipo de `F2` de uma forma diferente da permitida pelas regras precedentes, então:

  * Se `F1` for um operador de atribuição, e o tipo de retorno de `F1` diferir do tipo de retorno de `F2` ou o tipo de parâmetro não-objeto de `F1` não for uma referência, o programa é malformado.
  * Caso contrário, se `F1` for explicitamente padronizada em sua primeira declaração, ela é definida como deletada.
  * Caso contrário, o programa é malformado.

Uma função explicitamente padronizada em sua primeira declaração é implicitamente [inline](<#/doc/language/inline>), e é implicitamente constexpr se puder ser uma [função constexpr](<#/doc/language/constexpr>).
```cpp
    struct S
    {
        S(int a = 0) = default;             // erro: argumento padrão
        void operator=(const S&) = default; // erro: tipo de retorno não correspondente
        ~S() noexcept(false) = default;     // OK, especificação de exceção diferente
    private:
        int i;
        S(S&);          // OK, construtor de cópia privado
    };
     
    S::S(S&) = default; // OK, define construtor de cópia
```

Funções explicitamente padronizadas e funções implicitamente declaradas são coletivamente chamadas de funções _padronizadas_. Suas definições reais serão fornecidas implicitamente, veja suas páginas correspondentes para detalhes.

#### Funções deletadas

```cpp
Se a definição da função for da sintaxe (4) ou (5)(desde C++26), a função é definida como _explicitamente deletada_. Qualquer uso de uma função deletada é malformado (o programa não compilará). Isso inclui chamadas, tanto explícitas (com um operador de chamada de função) quanto implícitas (uma chamada para um operador sobrecarregado deletado, função membro especial, função de alocação, etc.), a construção de um ponteiro ou ponteiro para membro para uma função deletada, e até mesmo o uso de uma função deletada em uma expressão que não é potencialmente avaliada. Uma função membro virtual não pura pode ser definida como deletada, mesmo que seja implicitamente usada por ODR. Uma função deletada só pode ser sobrescrita por funções deletadas, e uma função não deletada só pode ser sobrescrita por funções não deletadas.  // (desde C++11)
Se string-literal estiver presente, a implementação é encorajada a incluir seu texto como parte da mensagem de diagnóstico resultante que mostra a justificativa para a exclusão ou para sugerir uma alternativa.  // (desde C++26)
Se a função for sobrecarregada, a resolução de sobrecarga ocorre primeiro, e o programa é malformado apenas se a função deletada foi selecionada:
```
```cpp
    struct T
    {
        void* operator new(std::size_t) = delete;
```
```cpp
        void* operator new) = delete("new[] is deleted"); // since C++26
    };
     
    T* p = new T;    // Error: attempts to call deleted T::operator new
    T* p = new T[5]; // Error: attempts to call deleted T::operator new[],
                     //        emits a diagnostic message “new[] is deleted”
```

A definição `deleted` de uma função deve ser a primeira declaração em uma unidade de tradução: uma função previamente declarada não pode ser redeclarada como `deleted`:
```cpp
    struct T { T(); };
    T::T() = delete; // Error: must be deleted on the first declaration
```

#### Funções fornecidas pelo usuário

Uma função é _fornecida pelo usuário_ se for declarada pelo usuário e não for explicitamente `defaulted` ou `deleted` em sua primeira declaração. Uma função `explicitly-defaulted` fornecida pelo usuário (ou seja, `explicitly defaulted` após sua primeira declaração) é definida no ponto em que é `explicitly defaulted`; se tal função for implicitamente definida como `deleted`, o programa é malformado. Declarar uma função como `defaulted` após sua primeira declaração pode proporcionar execução eficiente e definição concisa, ao mesmo tempo em que permite uma interface binária estável para uma base de código em evolução.
```cpp
    // All special member functions of “trivial” are
    // defaulted on their first declarations respectively,
    // they are not user-provided
    struct trivial
    {
        trivial() = default;
        trivial(const trivial&) = default;
        trivial(trivial&&) = default;
        trivial& operator=(const trivial&) = default;
        trivial& operator=(trivial&&) = default;
        ~trivial() = default;
    };
     
    struct nontrivial
    {
        nontrivial(); // first declaration
    };
     
    // not defaulted on the first declaration,
    // it is user-provided and is defined here
    nontrivial::nontrivial() = default;
```

#### Resolução de Ambiguidade

No caso de ambiguidade entre um corpo de função e um [inicializador](<#/doc/language/initialization>) começando com `{` ou `=`(desde C++26), a ambiguidade é resolvida verificando o tipo do [identificador do declarador](<#/doc/language/declarations>) de noptr-declarator:

  * Se o tipo for um tipo de função, a sequência de tokens ambígua é tratada como um corpo de função.
  * Caso contrário, a sequência de tokens ambígua é tratada como um inicializador.

```cpp
    using T = void(); // function type
    using U = int;    // non-function type
     
    T a{}; // defines a function doing nothing
    U b{}; // value-initializes an int object
     
    T c = delete("hello"); // defines a function as deleted
    U d = delete("hello"); // copy-initializes an int object with
                           // the result of a delete expression (ill-formed)
```

### __func__

Dentro do corpo da função, a variável predefinida local da função __func__ é definida como se fosse por
```cpp
    static const char __func__[] = "function-name";
```

Esta variável tem escopo de bloco e duração de armazenamento estática:
```cpp
    struct S
    {
        S(): s(__func__) {} // OK: initializer-list is part of function body
        const char* s;
    };
    void f(const char* s = __func__); // Error: parameter-list is part of declarator
```

Execute este código
```cpp
    #include <iostream>
     
    void Foo() { std::cout << __func__ << ' '; }
     
    struct Bar
    {
        Bar() { std::cout << __func__ << ' '; }
        ~Bar() { std::cout << __func__ << ' '; }
        struct Pub { Pub() { std::cout << __func__ << ' '; } };
    };
     
    int main()
    {
        Foo();
        Bar bar;
        Bar::Pub pub;
    }
```

Saída possível:
```cpp
    Foo Bar Pub ~Bar
```

| (desde C++11)
  
### Notas

Em caso de ambiguidade entre uma declaração de variável usando a sintaxe de `direct-initialization` e uma declaração de função, o compilador sempre escolhe a declaração de função; veja [direct-initialization](<#/doc/language/direct_initialization>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_decltype_auto`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | [`decltype(auto)`](<#/doc/language/auto>)
[`__cpp_return_type_deduction`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | [dedução de tipo de retorno](<#/doc/language/function>) para funções normais
[`__cpp_explicit_this_parameter`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [parâmetros de objeto explícitos](<#/doc/language/function>) ([deduzindo `this`](<#/doc/language/member_functions>))
[`__cpp_deleted_function`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | função `deleted` com uma razão
  
### Palavras-chave

[`default`](<#/doc/keyword/default>), [`delete`](<#/doc/keyword/delete>),

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    // função simples com um argumento padrão, não retornando nada
    void f0(const std::string& arg = "world!")
    {
        std::cout << "Hello, " << arg << '\n';
    }
     
    // a declaração está no escopo de namespace (arquivo)
    // (a definição é fornecida posteriormente)
    int f1();
     
    // função que retorna um ponteiro para f0, estilo pré-C++11
    void (*fp03())(const std::string&)
    {
        return f0;
    }
     
    // função que retorna um ponteiro para f0, com tipo de retorno final C++11
    auto fp11() -> void(*)(const std::string&)
    {
        return f0;
    }
     
    int main()
    {
        f0();
        fp03()("test!");
        fp11()("again!");
        int f2(std::string) noexcept; // declaração no escopo da função
        std::cout << "f2(\"bad\"): " << f2("bad") << '\n';
        std::cout << "f2(\"42\"): " << f2("42") << '\n';
    }
     
    // função não-membro simples que retorna int
    int f1()
    {
        return 007;
    }
     
    // função com uma especificação de exceção e um bloco try de função
    int f2(std::string str) noexcept
    try
    {
        return std::stoi(str);
    }
    catch (const std::exception& e)
    {
        std::cerr << "stoi() failed!\n";
        return 0;
    }
     
    // função deleted, uma tentativa de chamá-la resulta em um erro de compilação
    void bar() = delete
    #   if __cpp_deleted_function
        ("reason")
    #   endif
    ;
```

Saída possível:
```cpp
    stoi() failed!
    Hello, world!
    Hello, test!
    Hello, again!
    f2("bad"): 0
    f2("42"): 42
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 135](<https://cplusplus.github.io/CWG/issues/135.html>) | C++98 | funções membro definidas na classe não podiam ter um parâmetro ou retornar sua própria classe porque ela estava incompleta | permitido
[CWG 332](<https://cplusplus.github.io/CWG/issues/332.html>) | C++98 | um parâmetro podia ter tipo `void` qualificado por `cv` | proibido
[CWG 393](<https://cplusplus.github.io/CWG/issues/393.html>) | C++98 | tipos que incluem ponteiros/referências para array de tamanho desconhecido não podiam ser parâmetros | tais tipos são permitidos
[CWG 452](<https://cplusplus.github.io/CWG/issues/452.html>) | C++98 | lista de inicializadores de membro não fazia parte do corpo da função | faz parte
[CWG 577](<https://cplusplus.github.io/CWG/issues/577.html>) | C++98 | tipo dependente `void` podia ser usado para declarar uma função que não recebe parâmetros | apenas `void` não dependente é permitido
[CWG 1327](<https://cplusplus.github.io/CWG/issues/1327.html>) | C++11 | funções `defaulted` ou `deleted` não podiam ser especificadas com `override` ou `final` | permitido
[CWG 1355](<https://cplusplus.github.io/CWG/issues/1355.html>) | C++11 | apenas funções membro especiais podiam ser fornecidas pelo usuário | estendido a todas as funções
[CWG 1394](<https://cplusplus.github.io/CWG/issues/1394.html>) | C++11 | funções `deleted` não podiam ter nenhum parâmetro de um tipo incompleto ou retornar um tipo incompleto | tipo incompleto permitido
[CWG 1824](<https://cplusplus.github.io/CWG/issues/1824.html>) | C++98 | a verificação de completude no tipo de parâmetro e tipo de retorno de uma definição de função podia ser feita fora do contexto da definição da função | apenas verificar no contexto da definição da função
[CWG 1877](<https://cplusplus.github.io/CWG/issues/1877.html>) | C++14 | dedução de tipo de retorno tratava `return;` como `return void();` | simplesmente deduzir o tipo de retorno como `void` neste caso
[CWG 2015](<https://cplusplus.github.io/CWG/issues/2015.html>) | C++11 | o uso `odr` implícito de uma função virtual `deleted` era malformado | tais usos `odr` são isentos da proibição de uso
[CWG 2044](<https://cplusplus.github.io/CWG/issues/2044.html>) | C++14 | dedução de tipo de retorno em funções que retornam `void` falharia se o tipo de retorno declarado fosse `decltype(auto)` | regra de dedução atualizada para lidar com este caso
[CWG 2081](<https://cplusplus.github.io/CWG/issues/2081.html>) | C++14 | redeclarações de função podiam usar dedução de tipo de retorno mesmo que a declaração inicial não o fizesse | não permitido
[CWG 2144](<https://cplusplus.github.io/CWG/issues/2144.html>) | C++11 | `{}` podia ser um corpo de função ou um inicializador no mesmo local | diferenciado pelo tipo do identificador do declarador
[CWG 2145](<https://cplusplus.github.io/CWG/issues/2145.html>) | C++98 | o declarador na definição de função não podia ser parentesizado | permitido
[CWG 2259](<https://cplusplus.github.io/CWG/issues/2259.html>) | C++11 | a regra de resolução de ambiguidade referente a nomes de tipo parentesizados não cobria expressões lambda | coberto
[CWG 2430](<https://cplusplus.github.io/CWG/issues/2430.html>) | C++98 | na definição de uma função membro em uma definição de classe, o tipo dessa classe não podia ser o tipo de retorno ou tipo de parâmetro devido à resolução do [problema CWG 1824](<https://cplusplus.github.io/CWG/issues/1824.html>) | apenas verificar no corpo da função
[CWG 2760](<https://cplusplus.github.io/CWG/issues/2760.html>) | C++98 | o corpo da função de um construtor não incluía as inicializações não especificadas no corpo regular da função do construtor | também inclui essas inicializações
[CWG 2831](<https://cplusplus.github.io/CWG/issues/2831.html>) | C++20 | uma definição de função com uma `requires-clause` podia definir uma função não-template | proibido
[CWG 2846](<https://cplusplus.github.io/CWG/issues/2846.html>) | C++23 | funções membro de objeto explícito não podiam ter definições fora da classe | permitido
[CWG 2915](<https://cplusplus.github.io/CWG/issues/2915.html>) | C++23 | parâmetros de objeto explícito sem nome podiam ter tipo `void` | proibido
  
### Veja também

[Documentação C](<#/>) para Declaração de funções
---