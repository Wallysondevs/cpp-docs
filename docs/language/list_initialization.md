# Inicialização por lista (desde C++11)

Inicializa um objeto a partir de uma [lista de inicializadores entre chaves](<#/doc/language/initialization>).

### Sintaxe

#### Inicialização direta por lista

---
T object `{` arg1, arg2, ... `};` | T object`{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};` | (desde C++20)
---|---|---
(1) |
T `{` arg1, arg2, ... `}` | T `{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `}` | (desde C++20)
(2) |
`new` T `{` arg1, arg2, ... `}` | `new` T `{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `}` | (desde C++20)
(3) |
Class `{` T member `{` arg1, arg2, ... `}; };` | Class `{` T member `{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `}; };` | (desde C++20)
(4) |
Class`::` Class`() :` member `{` arg1, arg2, ... `} {...` | Class`::` Class`() :` member `{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ...`} {...` | (desde C++20)
(5) |

#### Inicialização por lista de cópia

---
T object `= {` arg1, arg2, ... `};` | T object `= {.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};` | (desde C++20)
---|---|---
(6) |
function `({` arg1, arg2, ... `})` | function `({.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `})` | (desde C++20)
(7) |
`return {` arg1, arg2, ... `};` | `return`{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `};` | (desde C++20)
(8) |
object `[{` arg1, arg2, ... `}]` | object `[{.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `}]` | (desde C++20)
(9) |
object `= {` arg1, arg2, ... `}` | object `= {.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `}` | (desde C++20)
(10) |
U `({` arg1, arg2, ... `})` | U `({.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `})` | (desde C++20)
(11) |
Class `{` T member `= {` arg1, arg2, ... `}; };` | Class `{` T member `= {.` des1 `=` arg1 `, .` des2 `{` arg2 `}` ... `}; };` | (desde C++20)
(12) |

A inicialização por lista é realizada nas seguintes situações:

*   inicialização direta por lista (construtores explícitos e não explícitos são considerados)

1)  inicialização de uma variável nomeada com uma lista de inicializadores entre chaves
2)  inicialização de um temporário sem nome com uma lista de inicializadores entre chaves
3)  inicialização de um objeto com duração de armazenamento dinâmica com uma [expressão new](<#/doc/language/new>), onde o inicializador é uma lista de inicializadores entre chaves
4)  em um [inicializador de membro de dados](<#/doc/language/data_members>) não estático que não usa o sinal de igual
5)  em uma [lista de inicializadores de membro](<#/doc/language/initializer_list>) de um construtor se uma lista de inicializadores entre chaves for usada

*   inicialização por lista de cópia (construtores explícitos e não explícitos são considerados, mas apenas construtores não explícitos podem ser chamados)

6)  inicialização de uma variável nomeada com uma lista de inicializadores entre chaves após um sinal de igual
7)  em uma expressão de chamada de função, com uma lista de inicializadores entre chaves usada como argumento e a inicialização por lista inicializa o parâmetro da função
8)  em uma instrução return com uma lista de inicializadores entre chaves usada como expressão de retorno e a inicialização por lista inicializa o objeto retornado
9)  em uma [expressão de subscrito](<#/doc/language/operator_member_access>) com um `operator[]` definido pelo usuário, onde a inicialização por lista inicializa o parâmetro do operador sobrecarregado
10) em uma [expressão de atribuição](<#/doc/language/operator_assignment>), onde a inicialização por lista inicializa o parâmetro do operador sobrecarregado
11) [expressão de cast funcional](<#/doc/language/explicit_cast>) ou outras invocações de construtor, onde uma lista de inicializadores entre chaves é usada no lugar de um argumento de construtor. A inicialização por lista de cópia inicializa o parâmetro do construtor (nota; o tipo `U` neste exemplo não é o tipo que está sendo inicializado por lista; é o parâmetro do construtor de `U`)
12) em um [inicializador de membro de dados](<#/doc/language/data_members>) não estático que usa o sinal de igual

### Explicação

Os efeitos da inicialização por lista de um objeto do tipo (possivelmente cv-qualificado) `T` são:

*   Se a lista de inicializadores entre chaves contiver uma [lista de inicializadores designados](<#/doc/language/aggregate_initialization>) e `T` não for um tipo de referência, `T` deve ser uma classe aggregate. Os identificadores ordenados nos designadores da lista de inicializadores designados devem formar uma subsequência dos identificadores ordenados nos membros de dados não estáticos diretos de `T`. A [inicialização aggregate](<#/doc/language/aggregate_initialization>) é realizada.

| (desde C++20)

*   Se `T` for uma classe aggregate e a lista de inicializadores entre chaves, que não contém uma lista de inicializadores designados, (desde C++20) tiver uma única cláusula inicializadora do mesmo tipo ou de um tipo derivado (possivelmente cv-qualificado), o objeto é inicializado a partir dessa cláusula inicializadora (por [inicialização de cópia](<#/doc/language/copy_initialization>) para inicialização por lista de cópia, ou por [inicialização direta](<#/doc/language/direct_initialization>) para inicialização direta por lista).
*   Caso contrário, se `T` for um array de caracteres e a lista de inicializadores entre chaves tiver uma única cláusula inicializadora que seja um literal de string de tipo apropriado, o array é [inicializado a partir do literal de string como de costume](<#/doc/language/aggregate_initialization>).

*   Caso contrário, se `T` for um [tipo aggregate](<#/doc/language/aggregate_initialization>), a [inicialização aggregate](<#/doc/language/aggregate_initialization>) é realizada.

*   Caso contrário, se a lista de inicializadores entre chaves estiver vazia e `T` for um tipo de classe com um construtor padrão, a [inicialização por valor](<#/doc/language/value_initialization>) é realizada.

*   Caso contrário, se `T` for uma especialização de [std::initializer_list](<#/doc/utility/initializer_list>), o objeto é inicializado conforme descrito [abaixo](<#/doc/language/list_initialization>).

*   Caso contrário, se `T` for um tipo de classe, os construtores de `T` são considerados, em duas fases:

    *   Todos os construtores que recebem [std::initializer_list](<#/doc/utility/initializer_list>) como único argumento, ou como primeiro argumento se os argumentos restantes tiverem valores padrão, são examinados e correspondidos por [resolução de sobrecarga](<#/doc/language/overload_resolution>) contra um único argumento do tipo [std::initializer_list](<#/doc/utility/initializer_list>).

    *   Se a fase anterior não produzir uma correspondência, todos os construtores de `T` participam da [resolução de sobrecarga](<#/doc/language/overload_resolution>) contra o conjunto de argumentos que consiste nas cláusulas inicializadoras da lista de inicializadores entre chaves, com a restrição de que apenas conversões não restritivas são permitidas. Se esta fase produzir um construtor explícito como a melhor correspondência para uma inicialização por lista de cópia, a compilação falha (nota, em uma inicialização de cópia simples, construtores explícitos não são considerados de forma alguma).

*   Caso contrário, se `T` for um [tipo de enumeração](<#/doc/language/enum>) com tipo subjacente fixo `U`, a lista de inicializadores entre chaves tiver apenas um inicializador v, e todas as condições a seguir forem satisfeitas, então a enumeração é inicializada com o resultado da conversão de v para `U`:
    *   A inicialização é uma inicialização direta por lista.
    *   v é de [tipo escalar](<#/doc/named_req/ScalarType>).
    *   v é implicitamente conversível para `U`.
    *   A conversão de v para `U` não é restritiva.

| (desde C++17)

*   Caso contrário (se `T` não for um tipo de classe), se a lista de inicializadores entre chaves tiver apenas uma cláusula inicializadora e `T` não for um tipo de referência ou for um tipo de referência cujo tipo referenciado é o mesmo ou é uma classe base do tipo da cláusula inicializadora, `T` é [diretamente inicializado](<#/doc/language/direct_initialization>) (em inicialização direta por lista) ou [inicializado por cópia](<#/doc/language/copy_initialization>) (em inicialização por lista de cópia), exceto que conversões restritivas não são permitidas.

*   Caso contrário, se `T` for um tipo de referência que não é compatível com o tipo da cláusula inicializadora:

    *   um temporário prvalue do tipo referenciado por `T` é inicializado por lista de cópia, e a referência é vinculada a esse temporário (isso falha se a referência for uma referência lvalue não-const).

| (até C++17)

    *   um prvalue é gerado. O prvalue inicializa seu objeto resultante por inicialização por lista de cópia. O prvalue é então usado para inicializar diretamente a referência (isso falha se a referência for uma referência lvalue não-const). O tipo do temporário é o tipo referenciado por `T`, a menos que `T` seja "referência para array de limite desconhecido de `U`", caso em que o tipo do temporário é o tipo de x na declaração U x[] H, onde `H` é a lista de inicializadores (desde C++20).

| (desde C++17)

*   Caso contrário, se a lista de inicializadores entre chaves não tiver cláusula inicializadora, `T` é [inicializado por valor](<#/doc/language/value_initialization>).

### Inicializando por lista [std::initializer_list](<#/doc/utility/initializer_list>)

Um objeto do tipo [std::initializer_list](<#/doc/utility/initializer_list>)&lt;E&gt; é construído a partir de uma lista de inicializadores como se o compilador gerasse e [materializasse](<#/doc/language/implicit_cast>) (desde C++17) um [prvalue](<#/doc/language/value_category>) do tipo "array de N const E", onde N é o número de cláusulas inicializadoras na lista de inicializadores; isso é chamado de _backing array_ da lista de inicializadores.

Cada elemento do backing array é [inicializado por cópia](<#/doc/language/copy_initialization>) com a cláusula inicializadora correspondente da lista de inicializadores, e o objeto [std::initializer_list](<#/doc/utility/initializer_list>)&lt;E&gt; é construído para referenciar esse array. Um construtor ou função de conversão selecionada para a cópia deve ser [acessível](<#/doc/language/access>) no contexto da lista de inicializadores. Se uma conversão restritiva for necessária para inicializar qualquer um dos elementos, o programa é malformado.

O backing array tem a mesma vida útil que qualquer outro [objeto temporário](<#/doc/language/lifetime>), exceto que a inicialização de um objeto [std::initializer_list](<#/doc/utility/initializer_list>) a partir do backing array estende a vida útil do array exatamente como [vincular uma referência a um temporário](<#/doc/language/reference_initialization>).
```cpp
    void f(std::initializer_list<double> il);
    
    void g(float x)
    {
       f({1, x, 3});
    }
    
    void h()
    {
       f({1, 2, 3});
    }
    
    struct A { mutable int i; };
    
    void q(std::initializer_list<A>);
    
    void r()
    {
        q({A{1}, A{2}, A{3}});
    }
    
    // A inicialização acima será implementada de forma aproximadamente equivalente à abaixo,
    // assumindo que o compilador pode construir um objeto initializer_list com um par de
    // ponteiros, e com o entendimento de que `__b` não sobrevive à chamada para `f`.
    
    void g(float x)
    {
        const double __a[3] = {double{1}, double{x}, double{3}}; // backing array
        f(std::initializer_list<double>(__a, __a + 3));
    }
    
    void h()
    {
        static constexpr double __b[3] =
            {double{1}, double{2}, double{3}}; // backing array
        f(std::initializer_list<double>(__b, __b + 3));
    }
    
    void r()
    {
        const A __c[3] = {A{1}, A{2}, A{3}}; // backing array
        q(std::initializer_list<A>(__c, __c + 3));
    }
```

Se todos os backing arrays são distintos (ou seja, são armazenados em [objetos não sobrepostos](<#/doc/language/objects>)) é não especificado:
```cpp
    bool fun(std::initializer_list<int> il1, std::initializer_list<int> il2)
    {
        return il2.begin() == il1.begin() + 1;
    }
    
    bool overlapping = fun({1, 2, 3}, {2, 3, 4}); // o resultado é não especificado:
                                                  // os backing arrays podem compartilhar
                                                  // armazenamento dentro de {1, 2, 3, 4}
```

### Conversões restritivas

A inicialização por lista limita as [conversões implícitas](<#/doc/language/implicit_cast>) permitidas, proibindo o seguinte:

*   conversão de um tipo de ponto flutuante para um tipo inteiro

*   conversão de um tipo de ponto flutuante `T` para outro tipo de ponto flutuante cujo [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) não é maior nem igual ao de `T`, exceto quando o resultado da conversão é uma [expressão constante](<#/doc/language/constant_expression>) e uma das seguintes condições é satisfeita:
    *   O valor convertido é finito, e a conversão não causa overflow.
    *   Os valores antes e depois da conversão não são finitos.

*   conversão de um tipo inteiro para um tipo de ponto flutuante, exceto quando a origem é uma expressão constante cujo valor pode ser armazenado exatamente no tipo de destino

*   conversão de tipo inteiro ou de enumeração não escopada para tipo inteiro que não pode representar todos os valores do original, exceto quando
    *   a origem é um [bit-field](<#/doc/language/bit_field>) cuja largura w é menor que a de seu tipo (ou, para um [tipo de enumeração](<#/doc/language/enum>), seu tipo subjacente) e o tipo de destino pode representar todos os valores de um tipo inteiro estendido hipotético com largura w e com a mesma sinalização que o tipo original, ou
    *   a origem é uma expressão constante cujo valor pode ser armazenado exatamente no tipo de destino

*   conversão de um tipo ponteiro ou ponteiro para membro para bool

### Notas

Cada cláusula inicializadora é [sequenciada antes](<#/doc/language/eval_order>) de qualquer cláusula inicializadora que a segue na lista de inicializadores entre chaves. Isso contrasta com os argumentos de uma [expressão de chamada de função](<#/doc/language/operator_other>), que são [não sequenciados](<#/doc/language/eval_order>) (até C++17) [sequenciados indeterminadamente](<#/doc/language/eval_order>) (desde C++17).

Uma lista de inicializadores entre chaves não é uma expressão e, portanto, não tem tipo, por exemplo, decltype({1, 2}) é malformado. Não ter tipo implica que a dedução de tipo de template não pode deduzir um tipo que corresponda a uma lista de inicializadores entre chaves, então, dada a declaração template&lt;class T&gt; void f(T); a expressão f({1, 2, 3}) é malformada. No entanto, o parâmetro de template pode ser deduzido de outra forma, como é o caso para [std::vector](<#/doc/container/vector>)&lt;int&gt; v([std::istream_iterator](<#/doc/iterator/istream_iterator>)&lt;int&gt;([std::cin](<#/doc/io/cin>)), {}), onde o tipo do iterator é deduzido pelo primeiro argumento, mas também usado na segunda posição do parâmetro. Uma exceção especial é feita para [dedução de tipo usando a palavra-chave auto](<#/doc/language/template_argument_deduction>), que deduz qualquer lista de inicializadores entre chaves como [std::initializer_list](<#/doc/utility/initializer_list>) em inicialização por lista de cópia.

Também porque uma lista de inicializadores entre chaves não tem tipo, [regras especiais para resolução de sobrecarga](<#/doc/language/overload_resolution>) se aplicam quando ela é usada como argumento para uma chamada de função sobrecarregada.

Aggregates copiam/movem inicializam diretamente de uma lista de inicializadores entre chaves de uma única cláusula inicializadora do mesmo tipo, mas não-aggregates consideram os construtores de [std::initializer_list](<#/doc/utility/initializer_list>) primeiro:
```cpp
    struct X {}; // aggregate
    
    struct Q     // non-aggregate
    {
        Q() = default;
        Q(Q const&) = default;
        Q(std::initializer_list<Q>) {}
    };
    
    int main()
    {
        X x;
        X x2 = X{x}; // construtor de cópia (não inicialização aggregate)
    
        Q q;
        Q q2 = Q{q}; // construtor de lista de inicializadores (não construtor de cópia)
    }
```

Alguns compiladores (por exemplo, gcc 10) consideram a conversão de um ponteiro ou ponteiro para membro para bool como restritiva apenas no modo C++20.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_initializer_lists`](<#/doc/feature_test>) | [`200806L`](<#/>) | (C++11) | Inicialização por lista e [std::initializer_list](<#/doc/utility/initializer_list>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <string>
    #include <vector>
    
    struct Foo
    {
        std::vector<int> mem = {1, 2, 3}; // inicialização por lista de um membro não estático
        std::vector<int> mem2;
    
        Foo() : mem2{-1, -2, -3} {} // inicialização por lista de um membro no construtor
    };
    
    std::pair<std::string, std::string> f(std::pair<std::string, std::string> p)
    {
        return {p.second, p.first}; // inicialização por lista em instrução return
    }
    
    int main()
    {
        int n0{};  // inicialização por valor (para zero)
        int n1{1}; // inicialização direta por lista
    
        std::string s1{'a', 'b', 'c', 'd'}; // chamada do construtor de lista de inicializadores
        std::string s2{s1, 2, 2};           // chamada de construtor regular
        std::string s3{0x61, 'a'}; // construtor de lista de inicializadores é preferido a (int, char)
    
        int n2 = {1}; // inicialização por lista de cópia
        double d = double{1.2}; // inicialização por lista de um prvalue, depois inicialização por cópia
        auto s4 = std::string{"HelloWorld"}; // o mesmo que acima, nenhum temporário
                                             // criado desde C++17
    
        std::map<int, std::string> m = // inicialização por lista aninhada
        {
            {1, "a"},
            {2, {'a', 'b', 'c'}},
            {3, s1}
        };
    
        std::cout << f({"hello", "world"}).first // inicialização por lista em chamada de função
                  << '\n';
    
        const int (&ar)[2] = {1, 2}; // vincula uma referência lvalue a um array temporário
        int&& r1 = {1}; // vincula uma referência rvalue a um int temporário
    //  int& r2 = {2}; // erro: não é possível vincular rvalue a uma referência lvalue não-const
    
    //  int bad{1.0}; // erro: conversão restritiva
        unsigned char uc1{10}; // ok
    //  unsigned char uc2{-1}; // erro: conversão restritiva
    
        Foo f_obj;
    
        std::cout << n0 << ' ' << n1 << ' ' << n2 << '\n'
                  << s1 << ' ' << s2 << ' ' << s3 << '\n';
        for (auto p : m)
            std::cout << p.first << ' ' << p.second << '\n';
        for (auto n : f_obj.mem)
            std::cout << n << ' ';
        for (auto n : f_obj.mem2)
            std::cout << n << ' ';
        std::cout << '\n';
    
        {}(d, ar, r1, uc1); // tem o efeito de [[maybe_unused]]
    }
```

Saída:
```
    world
    0 1 1
    abcd cd aa
    1 a
    2 abc
    3 abcd
    1 2 3 -1 -2 -3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1288](<https://cplusplus.github.io/CWG/issues/1288.html>) | C++11 | inicializar por lista uma referência com uma lista de inicializadores entre chaves de uma única cláusula inicializadora sempre vinculava a referência a um temporário | vincular a essa cláusula inicializadora se válido
[CWG 1290](<https://cplusplus.github.io/CWG/issues/1290.html>) | C++11 | a vida útil do backing array não foi especificada corretamente | especificada igual a outros objetos temporários
[CWG 1324](<https://cplusplus.github.io/CWG/issues/1324.html>) | C++11 | inicialização considerada primeiro para inicialização de `{}` | inicialização aggregate considerada primeiro
[CWG 1418](<https://cplusplus.github.io/CWG/issues/1418.html>) | C++11 | o tipo do backing array não tinha const | const adicionado
[CWG 1467](<https://cplusplus.github.io/CWG/issues/1467.html>) | C++11 | inicialização do mesmo tipo de aggregates e arrays de caracteres era proibida; construtores de lista de inicializadores tinham prioridade sobre construtores de cópia para listas de cláusula única | inicialização do mesmo tipo permitida; listas de cláusula única inicializam diretamente
[CWG 1494](<https://cplusplus.github.io/CWG/issues/1494.html>) | C++11 | ao inicializar por lista uma referência com uma cláusula inicializadora de um tipo incompatível, era não especificado se o temporário criado era inicializado diretamente por lista ou inicializado por lista de cópia | depende do tipo de inicialização para a referência
[CWG 2137](<https://cplusplus.github.io/CWG/issues/2137.html>) | C++11 | construtores de lista de inicializadores perdiam para construtores de cópia ao inicializar por lista `X` de `{X}` | não-aggregates consideram listas de inicializadores primeiro
[CWG 2252](<https://cplusplus.github.io/CWG/issues/2252.html>) | C++17 | enumerações podiam ser inicializadas por lista a partir de valores não escalares | proibido
[CWG 2267](<https://cplusplus.github.io/CWG/issues/2267.html>) | C++11 | a resolução do [problema CWG 1494](<https://cplusplus.github.io/CWG/issues/1494.html>) deixou claro que temporários poderiam ser inicializados diretamente por lista | eles são inicializados por lista de cópia ao inicializar referências por lista
[CWG 2374](<https://cplusplus.github.io/CWG/issues/2374.html>) | C++17 | inicialização direta por lista de um enum permitia muitos tipos de origem | restrito
[CWG 2627](<https://cplusplus.github.io/CWG/issues/2627.html>) | C++11 | um bit-field estreito de um tipo inteiro maior pode ser promovido para um tipo inteiro menor, mas ainda era uma conversão restritiva | não é uma conversão restritiva
[CWG 2713](<https://cplusplus.github.io/CWG/issues/2713.html>) | C++20 | referências a classes aggregate não podiam ser inicializadas por listas de inicializadores designados | permitido
[CWG 2830](<https://cplusplus.github.io/CWG/issues/2830.html>) | C++11 | a inicialização por lista não ignorava a qualificação cv de nível superior | ignora
[CWG 2864](<https://cplusplus.github.io/CWG/issues/2864.html>) | C++11 | conversões de ponto flutuante que causavam overflow não eram restritivas | elas são restritivas
[P1957R2](<https://wg21.link/P1957R2>) | C++11 | conversão de um ponteiro/ponteiro para membro para bool não era restritiva | considerada restritiva
[P2752R3](<https://wg21.link/P2752R3>) | C++11 | backing arrays com vida útil sobreposta não podiam se sobrepor | eles podem se sobrepor

### Veja também

*   [construtor](<#/doc/language/initializer_list>)
*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [atribuição de cópia](<#/doc/language/as_operator>)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [elision de cópia](<#/doc/language/copy_elision>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   `explicit`(<explicit.html> "cpp/language/explicit")
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização aggregate](<#/doc/language/aggregate_initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização de cópia](<#/doc/language/copy_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [inicialização de referência](<#/doc/language/reference_initialization>)
    *   [inicialização por valor](<#/doc/language/value_initialization>)
    *   [inicialização zero](<#/doc/language/zero_initialization>)
*   [atribuição de move](<#/doc/language/move_operator>)
*   [construtor de move](<#/doc/language/move_constructor>)
*   `new`(<new.html> "cpp/language/new")
