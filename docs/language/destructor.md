# Destrutores

Um destrutor é uma [função membro](<#/doc/language/member_functions>) especial que é chamada quando o [tempo de vida de um objeto](<#/doc/language/lifetime>) termina. O propósito do destrutor é liberar os recursos que o objeto pode ter adquirido durante seu tempo de vida.

Um destrutor não pode ser uma [coroutine](<#/doc/language/coroutines>). | (desde C++20)

### Sintaxe

Destrutores (até C++20)[Destrutores prospectivos](<#/doc/language/destructor>)(desde C++20) são declarados usando [declaradores de função](<#/doc/language/function>) membro da seguinte forma:

---
class-name-with-tilde `(` parameter-list ﻿(opcional) `)` except ﻿(opcional) attr ﻿(opcional)
- **class-name-with-tilde** — uma [expressão identificadora](<#/doc/language/expressions>), possivelmente seguida por uma lista de [atributos](<#/doc/language/attributes>), e (desde C++11) possivelmente entre parênteses
- **parameter-list** — [lista de parâmetros](<#/doc/language/function>)
- **except** — | [especificação de exceção dinâmica](<#/doc/language/except_spec>) | (até C++11)
```cpp
ou especificação de exceção dinâmica
ou especificação noexcept  // (desde C++11)
(até C++17)
especificação noexcept  // (desde C++17)
```
- **attr** — (desde C++11) uma lista de [atributos](<#/doc/language/attributes>)

Os únicos especificadores permitidos nos [especificadores de declaração](<#/doc/language/declarations>) de uma declaração de destrutor prospectivo (desde C++20) são [`constexpr`](<#/doc/language/constexpr>), (desde C++11) [`friend`](<#/doc/language/friend>), [`inline`](<#/doc/language/inline>) e [`virtual`](<#/doc/language/virtual>) (em particular, nenhum tipo de retorno é permitido).

A expressão identificadora de class-name-with-tilde deve ter uma das seguintes formas:

*   Em uma declaração de membro que pertence à [especificação de membro](<#/doc/language/class>) de uma classe ou template de classe, mas não é uma [declaração friend](<#/doc/language/friend>):

    *   Para classes, a expressão identificadora é `~` seguida pelo [injected-class-name](<#/doc/language/injected-class-name>) da classe imediatamente envolvente.
    *   Para templates de classe, a expressão identificadora é `~` seguida por um nome de classe que nomeia a [instanciação atual](<#/doc/language/dependent_name>)(até C++20)o injected-class-name(desde C++20) do template de classe imediatamente envolvente.

*   Caso contrário, a expressão identificadora é um identificador qualificado cujo identificador não qualificado terminal é `~` seguido pelo injected-class-name da classe nomeada pelas partes não terminais do identificador qualificado.

### Explicação

O destrutor é implicitamente invocado sempre que o [tempo de vida](<#/doc/language/lifetime>) de um objeto termina, o que inclui:

*   [terminação do programa](<#/doc/utility/program/exit>), para objetos com [duração de armazenamento](<#/doc/language/storage_duration>) estática
*   saída de thread, para objetos com duração de armazenamento thread-local

| (desde C++11)

*   fim do escopo, para objetos com duração de armazenamento automática e para temporários cuja vida foi estendida por ligação a uma referência
*   [expressão delete](<#/doc/language/delete>), para objetos com duração de armazenamento dinâmica
*   fim da [expressão](<#/doc/language/expressions>) completa, para temporários sem nome
*   [desenrolamento da pilha](<#/doc/language/throw>), para objetos com duração de armazenamento automática quando uma exceção escapa de seu bloco, sem ser capturada.

O destrutor também pode ser invocado explicitamente.

### Destrutor potencialmente invocado

Um destrutor de uma classe `C` é _potencialmente invocado_ nas seguintes situações:

*   É invocado explicitamente ou implicitamente.
*   Uma [expressão new](<#/doc/language/new>) cria um array de objetos do tipo `C`.
*   O objeto resultante de uma [instrução return](<#/doc/language/return>) é do tipo `C`.
*   Um array está sob [inicialização agregada](<#/doc/language/aggregate_initialization>), e seu tipo de elemento é `C`.
*   Um objeto de classe está sob inicialização agregada, e possui um membro do tipo `C` onde `C` não é um tipo de [união anônima](<#/doc/language/union>).
*   Um [subobjeto potencialmente construído](<#/doc/language/objects>) é do tipo `C` em um construtor não-[delegado](<#/doc/language/initializer_list>)(desde C++11).
*   Um [objeto de exceção](<#/doc/language/throw>) do tipo `C` é construído.

Se um destrutor potencialmente invocado for deletado ou (desde C++11) não acessível a partir do contexto da invocação, o programa é malformado.

### Destrutor prospectivo

Uma classe pode ter um ou mais destrutores prospectivos, um dos quais é selecionado como o destrutor para a classe. Para determinar qual destrutor prospectivo é o destrutor, ao final da definição da classe, a [resolução de sobrecarga](<#/doc/language/overload_resolution>) é realizada entre os destrutores prospectivos declarados na classe com uma lista de argumentos vazia. Se a resolução de sobrecarga falhar, o programa é malformado. A seleção do destrutor não [odr-usa](<#/doc/language/definition>) o destrutor selecionado, e o destrutor selecionado pode ser deletado. Todos os destrutores prospectivos são funções membro especiais. Se nenhum destrutor prospectivo declarado pelo usuário for fornecido para a classe `T`, o compilador sempre declarará um (veja abaixo), e o destrutor prospectivo implicitamente declarado também é o destrutor para `T`. | (desde C++20)

### Destrutor implicitamente declarado

Se nenhum destrutor prospectivo (desde C++20) declarado pelo usuário for fornecido para um [tipo de classe](<#/doc/language/class>), o compilador sempre declarará um destrutor como um membro público inline de sua classe.

Assim como qualquer função membro especial implicitamente declarada, a especificação de exceção do destrutor implicitamente declarado é `non-throwing` (não lança exceções) a menos que o destrutor de qualquer base ou membro potencialmente construído seja [potencialmente lançador](<#/doc/language/noexcept_spec>)(desde C++17)a definição implícita invocaria diretamente uma função com uma especificação de exceção diferente(até C++17). Na prática, destrutores implícitos são `noexcept` a menos que a classe seja "envenenada" por uma base ou membro cujo destrutor seja `noexcept(false)`.

### Destrutor implicitamente definido

Se um destrutor implicitamente declarado não for deletado, ele é implicitamente definido (ou seja, um corpo de função é gerado e compilado) pelo compilador quando é [odr-usado](<#/doc/language/definition>). Este destrutor implicitamente definido tem um corpo vazio.

```cpp
Se isso satisfizer os requisitos de um destrutor constexpr(até C++23)função constexpr(desde C++23), o destrutor gerado é `constexpr`.  // (desde C++20)
```

### Destrutor deletado

O destrutor implicitamente declarado ou explicitamente padronizado para a classe `T` é indefinido (até C++11)definido como deletado (desde C++11) se qualquer uma das seguintes condições for satisfeita:

*   `T` possui um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional dele) de tal forma que `M` possui um destrutor que
    *   é deletado ou inacessível a partir do destrutor de `T`, ou
    *   no caso do subobjeto ser um [membro variante](<#/doc/language/union>), é não-trivial.
*   O destrutor é virtual e a busca pela [função de desalocação](<#/doc/memory/new/operator_delete>) resulta em
    *   uma ambiguidade, ou
    *   uma função que é deletada ou inacessível a partir do destrutor.

Um destrutor prospectivo explicitamente padronizado para `T` é definido como deletado se não for o destrutor para `T`. | (desde C++20)

### Destrutor trivial

O destrutor para a classe `T` é trivial se tudo o que segue for verdadeiro:

*   O destrutor não é fornecido pelo usuário (significando que é implicitamente declarado ou explicitamente definido como padronizado em sua primeira declaração).
*   O destrutor não é virtual (ou seja, o destrutor da classe base não é virtual).
*   Todas as classes base diretas têm destrutores triviais.
*   Todos os membros de dados não estáticos do tipo de classe (ou array de tipo de classe) têm destrutores triviais.

Um destrutor trivial é um destrutor que não executa nenhuma ação. Objetos com destrutores triviais não exigem uma expressão `delete` e podem ser descartados simplesmente desalocando seu armazenamento. Todos os tipos de dados compatíveis com a linguagem C (tipos POD) são trivialmente destrutíveis.

### Sequência de destruição

Para destrutores definidos pelo usuário ou implicitamente definidos, após executar o corpo do destrutor e destruir quaisquer objetos automáticos alocados dentro do corpo, o compilador chama os destrutores para todos os membros de dados não estáticos e não variantes da classe, na ordem inversa de declaração, então ele chama os destrutores de todas as classes base diretas não virtuais na [ordem inversa de construção](<#/doc/language/initializer_list>) (que por sua vez chamam os destrutores de seus membros e suas classes base, etc.), e então, se este objeto for da classe mais derivada, ele chama os destrutores de todas as bases virtuais.

Mesmo quando o destrutor é chamado diretamente (por exemplo, `obj.~Foo();`), a instrução `return` em `~Foo()` não retorna o controle para o chamador imediatamente: ele chama todos esses destrutores de membros e bases primeiro.

### Destrutores virtuais

Deletar um objeto através de um ponteiro para a base invoca comportamento indefinido a menos que o destrutor na classe base seja [virtual](<#/doc/language/virtual>):
```cpp
    class Base
    {
    public:
        virtual ~Base() {}
    };
    
    class Derived : public Base {};
    
    Base* b = new Derived;
    delete b; // safe
```

Uma diretriz comum é que um destrutor para uma classe base deve ser [ou público e virtual, ou protegido e não virtual](<http://www.gotw.ca/publications/mill18.htm>).

### Destrutores virtuais puros

Um destrutor prospectivo (desde C++20) pode ser declarado [virtual puro](<#/doc/language/abstract_class>), por exemplo, em uma classe base que precisa ser tornada abstrata, mas não possui outras funções adequadas que poderiam ser declaradas virtuais puras. Um destrutor virtual puro deve ter uma definição, já que todos os destrutores da classe base são sempre chamados quando a classe derivada é destruída:
```cpp
    class AbstractBase
    {
    public:
        virtual ~AbstractBase() = 0;
    };
    AbstractBase::~AbstractBase() {}
    
    class Derived : public AbstractBase {};
    
    // AbstractBase obj; // compiler error
    Derived obj;         // OK
```

### Exceções

Como qualquer outra função, um destrutor pode terminar lançando uma [exceção](<#/doc/language/exceptions>) (isso geralmente exige que seja explicitamente declarado `noexcept(false)`)(desde C++11), no entanto, se este destrutor for chamado durante o [desenrolamento da pilha](<#/doc/language/throw>), [`std::terminate`](<#/doc/error/terminate>) é chamado em vez disso.

Embora [`std::uncaught_exceptions`](<#/doc/error/exception/uncaught_exception>) possa às vezes ser usado para detectar o desenrolamento da pilha em andamento, geralmente é considerada uma má prática permitir que qualquer destrutor termine lançando uma exceção. Essa funcionalidade, no entanto, é usada por algumas bibliotecas, como [SOCI](<https://github.com/SOCI/soci>) e [Galera 3](<https://galeracluster.com/downloads/>), que dependem da capacidade dos destrutores de temporários sem nome de lançar exceções ao final da expressão completa que constrói o temporário.

[`std::experimental::scope_success`](<#/doc/experimental/scope_success>) na Library fundamental TS v3 pode ter [um destrutor potencialmente lançador](<#/doc/experimental/scope_success/~scope_success>), que lança uma exceção quando o escopo é encerrado normalmente e a função de saída lança uma exceção.

### Notas

Chamar um destrutor diretamente para um objeto comum, como uma variável local, invoca comportamento indefinido quando o destrutor é chamado novamente, ao final do escopo.

Em contextos genéricos, a sintaxe de chamada de destrutor pode ser usada com um objeto de tipo não-classe; isso é conhecido como chamada de pseudo-destrutor: veja [operador de acesso a membro](<#/doc/language/operator_member_access>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    struct A
    {
        int i;
    
        A(int num) : i(num)
        {
            std::cout << "ctor a" << i << '\n';
        }
    
        ~A()
        {
            std::cout << "dtor a" << i << '\n';
        }
    };
    
    A a0(0);
    
    int main()
    {
        A a1(1);
        A* p;
    
        { // nested scope
            A a2(2);
            p = new A(3);
        } // a2 out of scope
    
        delete p; // calls the destructor of a3
    }
```

Saída:
```
    ctor a0
    ctor a1
    ctor a2
    ctor a3
    dtor a2
    dtor a3
    dtor a1
    dtor a0
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 193](<https://cplusplus.github.io/CWG/issues/193.html>) | C++98 | se objetos automáticos em um destrutor são destruídos antes ou depois da destruição dos subobjetos base e membro da classe era não especificado | eles são destruídos antes de destruir esses subobjetos
[CWG 344](<https://cplusplus.github.io/CWG/issues/344.html>) | C++98 | a sintaxe do declarador do destrutor era defeituosa (tinha o mesmo problema que o [CWG issue 194](<https://cplusplus.github.io/CWG/issues/194.html>) e o [CWG issue 263](<https://cplusplus.github.io/CWG/issues/263.html>)) | alterou a sintaxe para uma sintaxe de declarador de função especializada
[CWG 1241](<https://cplusplus.github.io/CWG/issues/1241.html>) | C++98 | membros estáticos poderiam ser destruídos logo após a execução do destrutor | destruir apenas membros não estáticos
[CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++98 | as condições em que destrutores implicitamente declarados são indefinidos não consideravam tipos de array multidimensionais | considerar esses tipos
[CWG 1435](<https://cplusplus.github.io/CWG/issues/1435.html>) | C++98 | o significado de “nome da classe” na sintaxe do declarador do destrutor era incerto | alterou a sintaxe para uma sintaxe de declarador de função especializada
[CWG 2180](<https://cplusplus.github.io/CWG/issues/2180.html>) | C++98 | o destrutor da classe `X` chamava os destrutores para as classes base diretas virtuais de `X` | esses destrutores não são chamados
[CWG 2807](<https://cplusplus.github.io/CWG/issues/2807.html>) | C++20 | os especificadores de declaração poderiam conter consteval | proibido

### Veja também

*   [copy elision](<#/doc/language/copy_elision>)
*   [`new`](<#/doc/language/new>)
*   [`delete`](<#/doc/language/delete>)

\* [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.