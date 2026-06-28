# Construtores e listas de inicialização de membros

_Construtores_ são [funções membro](<#/doc/language/member_functions>) não estáticas declaradas com uma sintaxe de declarador especial, e são usados para inicializar objetos de seus tipos de classe.

Um construtor não pode ser uma [coroutine](<#/doc/language/coroutines>). | (desde C++20)
---|---
Um construtor não pode ter um [parâmetro de objeto explícito](<#/doc/language/member_functions>). | (desde C++23)

### Sintaxe

Construtores são declarados usando [declaradores de função](<#/doc/language/function>) membro da seguinte forma:

---
class-name `(` parameter-list ﻿(opcional) `)` except ﻿(opcional) attr ﻿(opcional)
- **class-name** — uma [expressão identificadora](<#/doc/language/expressions>), possivelmente seguida por uma lista de [atributos](<#/doc/language/attributes>), e(desde C++11) possivelmente entre parênteses
- **parameter-list** — [lista de parâmetros](<#/doc/language/function>)
- **except** — | [especificação de exceção dinâmica](<#/doc/language/except_spec>) | (até C++11)
```cpp
ou especificação de exceção dinâmica
ou especificação noexcept  // (desde C++11)
(até C++17)
especificação noexcept  // (desde C++17)
```
- **attr** — (desde C++11) uma lista de [atributos](<#/doc/language/attributes>)

Os únicos especificadores permitidos nos [especificadores de declaração](<#/doc/language/declarations>) de uma declaração de construtor são [`friend`](<#/doc/language/friend>), [`inline`](<#/doc/language/inline>), [`constexpr`](<#/doc/language/constexpr>)(desde C++11), [`consteval`](<#/doc/language/consteval>)(desde C++20), e [`explicit`](<#/doc/language/explicit>) (em particular, nenhum tipo de retorno é permitido). Note que [qualificadores cv e ref](<#/doc/language/member_functions>) também não são permitidos: a semântica const e volatile de um objeto em construção só entra em vigor após a conclusão do construtor mais derivado.

A expressão identificadora de class-name deve ter uma das seguintes formas:

*   Em uma [declaração friend](<#/doc/language/friend>), a expressão identificadora é um [identificador qualificado](<#/doc/language/name>) que [nomeia um construtor](<#/doc/language/qualified_lookup>).
*   Caso contrário, em uma declaração de membro que pertence à [especificação de membro](<#/doc/language/class>) de uma classe ou template de classe:

    *   Para classes, a expressão identificadora é o [injected-class-name](<#/doc/language/injected-class-name>) da classe imediatamente envolvente.
    *   Para templates de classe, a expressão identificadora é um nome de classe que nomeia a [instanciação atual](<#/doc/language/dependent_name>)(até C++20)o injected-class-name(desde C++20) do template de classe imediatamente envolvente.

*   Caso contrário, a expressão identificadora é um identificador qualificado cujo identificador não qualificado terminal é o injected-class-name de seu contexto de [lookup](<#/doc/language/lookup>).

### Lista de inicialização de membros

O corpo de uma [definição de função](<#/doc/language/function>) de qualquer construtor, antes da chave de abertura da instrução composta, pode incluir a _lista de inicialização de membros_, cuja sintaxe é o caractere de dois pontos `:`, seguido pela lista separada por vírgulas de um ou mais inicializadores de membro, cada um dos quais tem a seguinte sintaxe:

---
class-or-identifier `(` expression-list ﻿(opcional) `)` | (1) |
---|---|---
class-or-identifier braced-init-list | (2) | (desde C++11)
parameter-pack `...` | (3) | (desde C++11)

1) Inicializa a base ou membro nomeado por class-or-identifier usando [inicialização direta](<#/doc/language/direct_initialization>) ou, se expression-list estiver vazia, [inicialização por valor](<#/doc/language/value_initialization>)

2) Inicializa a base ou membro nomeado por class-or-identifier usando [inicialização por lista](<#/doc/language/list_initialization>) (que se torna [inicialização por valor](<#/doc/language/value_initialization>) se a lista estiver vazia e [inicialização agregada](<#/doc/language/aggregate_initialization>) ao inicializar um agregado)

3) Inicializa múltiplas bases usando uma [expansão de pack](<#/doc/language/parameter_pack>)

- **class-or-identifier** — qualquer identificador que nomeie um membro de dados não estático ou qualquer nome de tipo que nomeie a própria classe (para construtores delegados) ou uma base direta ou virtual.
- **expression-list** — lista possivelmente vazia, separada por vírgulas, dos argumentos a serem passados para o construtor da base ou membro
- **braced-init-list** — [lista de inicializadores entre chaves](<#/doc/language/initialization>)
- **parameter-pack** — nome de um [parameter pack](<#/doc/language/parameter_pack>) de template variádico

Execute este código
```cpp
    struct S
    {
        int n;
    
        S(int);       // constructor declaration
    
        S() : n(7) {} // constructor definition:
                      // ": n(7)" is the initializer list
                      // ": n(7) {}" is the function body
    };
    
    S::S(int x) : n{x} {} // constructor definition: ": n{x}" is the initializer list
    
    int main()
    {
        S s;      // calls S::S()
        S s2(10); // calls S::S(int)
    }
```

### Explicação

Construtores não têm nomes e não podem ser chamados diretamente. Eles são invocados quando a [inicialização](<#/doc/language/initialization>) ocorre, e são selecionados de acordo com as regras de inicialização. Os construtores sem especificador explicit são [construtores de conversão](<#/doc/language/converting_constructor>). Os construtores com um especificador constexpr tornam seu tipo um [LiteralType](<#/doc/named_req/LiteralType>). Construtores que podem ser chamados sem nenhum argumento são [construtores padrão](<#/doc/language/default_constructor>). Construtores que recebem outro objeto do mesmo tipo como argumento são [construtores de cópia](<#/doc/language/copy_constructor>) e [construtores de movimento](<#/doc/language/move_constructor>).

Antes que a instrução composta que forma o corpo da função do construtor comece a ser executada, a inicialização de todas as bases diretas, bases virtuais e membros de dados não estáticos é concluída. A lista de inicialização de membros é o local onde a inicialização não padrão desses subobjetos pode ser especificada. Para bases que não podem ser inicializadas por padrão e para membros de dados não estáticos que não podem ser inicializados por inicialização padrão ou por seu [inicializador de membro padrão](<#/doc/language/data_members>), se houver(desde C++11), como membros de tipos de referência e qualificados por const, os inicializadores de membro devem ser especificados. (Note que os inicializadores de membro padrão para membros de dados não estáticos de instanciações de templates de classe podem ser inválidos se o tipo do membro ou o inicializador for dependente.)(desde C++11) Nenhuma inicialização é realizada para [uniões anônimas](<#/doc/language/union>) ou [membros variant](<#/doc/language/union>) que não possuem um inicializador de membro ou inicializador de membro padrão(desde C++11).

Os inicializadores onde class-or-identifier nomeia uma [classe base virtual](<#/doc/language/derived_class>) são ignorados durante a construção de qualquer classe que não seja a classe mais derivada do objeto que está sendo construído.

Nomes que aparecem em expression-list ou braced-init-list são avaliados no escopo do construtor:
```cpp
    class X
    {
        int a, b, i, j;
    public:
        const int& r;
        X(int i)
          : r(a) // initializes X::r to refer to X::a
          , b{i} // initializes X::b to the value of the parameter i
          , i(i) // initializes X::i to the value of the parameter i
          , j(this->i) // initializes X::j to the value of X::i
        {}
    };
```

Exceções que são lançadas a partir de inicializadores de membro podem ser tratadas por um [bloco try de função](<#/doc/language/try>).

Funções membro (incluindo funções membro virtuais) podem ser chamadas a partir de inicializadores de membro, mas o comportamento é indefinido se nem todas as bases diretas forem inicializadas naquele ponto.

Para chamadas virtuais (se as bases diretas forem inicializadas naquele ponto), as mesmas regras se aplicam às regras para chamadas virtuais de construtores e destrutores: funções membro virtuais se comportam como se o tipo dinâmico de *this fosse o tipo estático da classe que está sendo construída (o despacho dinâmico não se propaga pela hierarquia de herança) e chamadas virtuais (mas não chamadas estáticas) para funções membro [puramente virtuais](<#/doc/language/abstract_class>) resultam em comportamento indefinido.

Se um membro de dados não estático tiver um [inicializador de membro padrão](<#/doc/language/data_members>) e também aparecer em uma lista de inicialização de membros, então o inicializador de membro é usado e o inicializador de membro padrão é ignorado:
```cpp
    struct S
    {
        int n = 42;   // default member initializer
        S() : n(7) {} // will set n to 7, not 42
    };
```

| (desde C++11)

Membros de referência não podem ser ligados a temporários em uma lista de inicialização de membros:
```cpp
    struct A
    {
        A() : v(42) {} // Error
        const int& v;
    };
```

Nota: o mesmo se aplica ao [inicializador de membro padrão](<#/doc/language/data_members>).

#### Construtor delegado

Se o nome da própria classe aparecer como class-or-identifier na lista de inicialização de membros, então a lista deve consistir apenas daquele único inicializador de membro; tal construtor é conhecido como o _construtor delegado_, e o construtor selecionado pelo único membro da lista de inicializadores é o _construtor alvo_. Neste caso, o construtor alvo é selecionado por resolução de sobrecarga e executado primeiro, então o controle retorna ao construtor delegado e seu corpo é executado. Construtores delegados não podem ser recursivos.
```cpp
    class Foo
    {
    public: 
        Foo(char x, int y) {}
        Foo(int y) : Foo('a', y) {} // Foo(int) delegates to Foo(char, int)
    };
```

#### Construtores herdados

Veja [declaração using](<#/doc/language/using_declaration>). | (desde C++11)

#### Ordem de inicialização

A ordem dos inicializadores de membro na lista é irrelevante: a ordem real de inicialização é a seguinte:

1) Se o construtor for para a classe mais derivada, as bases virtuais são inicializadas na ordem em que aparecem na travessia em profundidade da esquerda para a direita das declarações da classe base (esquerda para a direita refere-se à aparência nas listas de base-specifier).

2) Em seguida, as bases diretas são inicializadas na ordem da esquerda para a direita, conforme aparecem na lista de base-specifier desta classe.

3) Em seguida, os membros de dados não estáticos são inicializados na ordem de declaração na definição da classe.

4) Finalmente, o corpo do construtor é executado.

(Nota: se a ordem de inicialização fosse controlada pela aparência nas listas de inicialização de membros de diferentes construtores, então o [destrutor](<#/doc/language/destructor>) não seria capaz de garantir que a ordem de destruição é o inverso da ordem de construção.)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_delegating_constructors`](<#/doc/feature_test>) | [`200604L`](<#/>) | (C++11) | [Construtores delegados](<#/doc/language/initializer_list>)

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <string>
    #include <mutex>
    
    struct Base
    {
        int n;
    };   
    
    struct Class : public Base
    {
        unsigned char x;
        unsigned char y;
        std::mutex m;
        std::lock_guard<std::mutex> lg;
        std::fstream f;
        std::string s;
    
        Class(int x) : Base{123}, // initialize base class
            x(x),     // x (member) is initialized with x (parameter)
            y{0},     // y initialized to 0
            f{"test.cc", std::ios::app}, // this takes place after m and lg are initialized
            s(__func__), // __func__ is available because init-list is a part of constructor
            lg(m),    // lg uses m, which is already initialized
            m{}       // m is initialized before lg even though it appears last here
        {}            // empty compound statement
    
        Class(double a) : y(a + 1),
            x(y), // x will be initialized before y, its value here is indeterminate
            lg(m)
        {} // base class initializer does not appear in the list, it is
           // default-initialized (not the same as if Base() were used, which is value-init)
    
        Class()
        try // function try block begins before the function body, which includes init list
          : Class(0.0) // delegate constructor
        {
            // ...
        }
        catch (...)
        {
            // exception occurred on initialization
        }
    };
    
    int main()
    {
        Class c;
        Class c1(1);
        Class c2(0.1);
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 194](<https://cplusplus.github.io/CWG/issues/194.html>) | C++98 | a sintaxe do declarador do construtor permitia apenas no máximo um especificador de função (ex: um construtor não podia ser declarado inline explicit) | múltiplos especificadores de função permitidos
[CWG 257](<https://cplusplus.github.io/CWG/issues/257.html>) | C++98 | não era especificado se uma classe abstrata deveria fornecer inicializadores de membro para suas classes base virtuais | especificado como não sendo necessário e tais inicializadores de membro são ignorados durante a execução
[CWG 263](<https://cplusplus.github.io/CWG/issues/263.html>) | C++98 | a sintaxe do declarador do construtor proibia construtores de serem friends | permitia construtores de serem friends
[CWG 1345](<https://cplusplus.github.io/CWG/issues/1345.html>) | C++98 | membros de união anônima sem inicializadores de membro padrão eram inicializados por padrão | eles não são inicializados
[CWG 1435](<https://cplusplus.github.io/CWG/issues/1435.html>) | C++98 | o significado de "nome da classe" na sintaxe do declarador do construtor era incerto | alterou a sintaxe para uma sintaxe de declarador de função especializada
[CWG 1696](<https://cplusplus.github.io/CWG/issues/1696.html>) | C++98 | membros de referência podiam ser inicializados com temporários (cuja vida útil terminaria no final do construtor) | tal inicialização é malformada

### Referências

*   C++23 standard (ISO/IEC 14882:2024):

    *   11.4.5 Constructors [class.ctor]

    *   11.9.3 Initializing bases and members [class.base.init]

*   C++20 standard (ISO/IEC 14882:2020):

    *   11.4.4 Constructors [class.ctor]

    *   11.10.2 Initializing bases and members [class.base.init]

*   C++17 standard (ISO/IEC 14882:2017):

    *   15.1 Constructors [class.ctor]

    *   15.6.2 Initializing bases and members [class.base.init]

*   C++14 standard (ISO/IEC 14882:2014):

    *   12.1 Constructors [class.ctor]

    *   12.6.2 Initializing bases and members [class.base.init]

*   C++11 standard (ISO/IEC 14882:2011):

    *   12.1 Constructors [class.ctor]

    *   12.6.2 Initializing bases and members [class.base.init]

*   C++98 standard (ISO/IEC 14882:1998):

    *   12.1 Constructors [class.ctor]

    *   12.6.2 Initializing bases and members [class.base.init]

### Veja também

*   [copy elision](<#/doc/language/copy_elision>)
*   [converting constructor](<#/doc/language/converting_constructor>)
*   [copy assignment](<#/doc/language/as_operator>)
*   [copy constructor](<#/doc/language/copy_constructor>)
*   [default constructor](<#/doc/language/default_constructor>)
*   [destructor](<#/doc/language/destructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [initialization](<#/doc/language/initialization>)
    *   [aggregate initialization](<#/doc/language/aggregate_initialization>)
    *   [constant initialization](<#/doc/language/constant_initialization>)
    *   [copy initialization](<#/doc/language/copy_initialization>)
    *   [default initialization](<#/doc/language/default_initialization>)
    *   [direct initialization](<#/doc/language/direct_initialization>)
    *   [list initialization](<#/doc/language/list_initialization>)
    *   [reference initialization](<#/doc/language/reference_initialization>)
    *   [value initialization](<#/doc/language/value_initialization>)
    *   [zero initialization](<#/doc/language/zero_initialization>)
*   [move assignment](<#/doc/language/move_operator>)
*   [move constructor](<#/doc/language/move_constructor>)
*   [`new`](<#/doc/language/new>)
