# Construtores de movimento

Um construtor de movimento é um [construtor](<#/doc/language/initializer_list>) que pode ser chamado com um argumento do mesmo tipo de classe e copia o conteúdo do argumento, possivelmente mutando o argumento.

### Sintaxe

class-name `(` parameter-list `);` | (1) |
---|---|---
class-name `(` parameter-list `)` function-body | (2) |
class-name `(` single-parameter-list `) = default;` | (3) |
class-name `(` parameter-list `) = delete;` | (4) |
class-name `::` class-name `(` parameter-list `)` function-body | (5) |
class-name `::` class-name `(` single-parameter-list `) = default;` | (6) |
- **class-name** — a classe cujo construtor de movimento está sendo declarado
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) não vazia que satisfaz todas as seguintes condições:

  * dado o tipo de classe como `T`, o primeiro parâmetro é do tipo T&&, const T&&, volatile T&& ou const volatile T&&, e
  * ou não há outros parâmetros, ou todos os outros parâmetros têm [argumentos padrão](<#/doc/language/default_arguments>)

- **single-parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo T&&, const T&&, volatile T&& ou const volatile T&& e não possui um argumento padrão
- **function-body** — o [corpo da função](<#/doc/language/initializer_list>) do construtor de movimento

### Explicação

1) Declaração de um construtor de movimento dentro da definição da classe.

2-4) Definição de um construtor de movimento dentro da definição da classe.

3) O construtor de movimento é explicitamente padronizado (`explicitly-defaulted`).

4) O construtor de movimento é deletado.

5,6) Definição de um construtor de movimento fora da definição da classe (a classe deve conter uma declaração (1)).

6) O construtor de movimento é explicitamente padronizado (`explicitly-defaulted`).
```cpp
    struct X
    {
        X(X&& other); // move constructor
    //  X(X other);   // Error: incorrect parameter type
    };
     
    union Y
    {
        Y(Y&& other, int num = 1); // move constructor with multiple parameters
    //  Y(Y&& other, int num);     // Error: `num` has no default argument
    };
```

O construtor de movimento é tipicamente chamado quando um objeto é [inicializado](<#/doc/language/initialization>) (por [inicialização direta](<#/doc/language/direct_initialization>) ou [inicialização por cópia](<#/doc/language/copy_initialization>)) a partir de um [rvalue](<#/doc/language/value_category>) (xvalue ou prvalue)(até C++17)xvalue(desde C++17) do mesmo tipo, incluindo

  * inicialização: T a = std::move(b); ou T a(std::move(b));, onde b é do tipo `T`;
  * passagem de argumento de função: f(std::move(a));, onde a é do tipo `T` e f é void f(T t);
  * retorno de função: return a; dentro de uma função como T f(), onde a é do tipo `T` que possui um construtor de movimento.

Quando o inicializador é um prvalue, a chamada do construtor de movimento é frequentemente otimizada (até C++17)nunca feita(desde C++17), veja [copy elision](<#/doc/language/copy_elision>).

Construtores de movimento tipicamente transferem os recursos mantidos pelo argumento (por exemplo, ponteiros para objetos alocados dinamicamente, descritores de arquivo, sockets TCP, handles de thread, etc.) em vez de fazer cópias deles, e deixam o argumento em um estado válido, mas de outra forma indeterminado. Como o construtor de movimento não altera o tempo de vida do argumento, o destrutor será tipicamente chamado no argumento em um ponto posterior. Por exemplo, mover de uma [std::string](<#/doc/string/basic_string>) ou de um [std::vector](<#/doc/container/vector>) pode resultar no argumento sendo deixado vazio. Para alguns tipos, como [std::unique_ptr](<#/doc/memory/unique_ptr>), o estado movido-de é totalmente especificado.

### Construtor de movimento implicitamente declarado

Se nenhum construtor de movimento definido pelo usuário for fornecido para um tipo de classe, e tudo o que se segue for verdadeiro:

  * não há [construtores de cópia](<#/doc/language/copy_constructor>) declarados pelo usuário;
  * não há [operadores de atribuição de cópia](<#/doc/language/as_operator>) declarados pelo usuário;
  * não há [operadores de atribuição de movimento](<#/doc/language/move_operator>) declarados pelo usuário;
  * não há [destrutor](<#/doc/language/destructor>) declarado pelo usuário.

Então o compilador declarará um construtor de movimento como um membro público inline não-[explicit](<#/doc/language/explicit>) de sua classe com a assinatura T::T(T&&).

Uma classe pode ter múltiplos construtores de movimento, por exemplo, ambos T::T(const T&&) e T::T(T&&). Se alguns construtores de movimento definidos pelo usuário estiverem presentes, o usuário ainda pode forçar a geração do construtor de movimento implicitamente declarado com a palavra-chave default.

O construtor de movimento implicitamente declarado (ou padronizado em sua primeira declaração) possui uma especificação de exceção conforme descrito em [especificação de exceção dinâmica](<#/doc/language/except_spec>)(até C++17)[especificação noexcept](<#/doc/language/noexcept_spec>)(desde C++17).

### Construtor de movimento implicitamente definido

Se o construtor de movimento implicitamente declarado não for nem deletado nem trivial, ele é definido (ou seja, um corpo de função é gerado e compilado) pelo compilador se houver [uso ODR](<#/doc/language/definition>) ou se for [necessário para avaliação constante](<#/doc/language/constant_expression>). Para tipos union, o construtor de movimento implicitamente definido copia a representação do objeto (como por [std::memmove](<#/doc/string/byte/memmove>)). Para tipos de classe que não são union, o construtor de movimento realiza um movimento completo membro a membro dos subobjetos base diretos e subobjetos membro do objeto, em sua ordem de inicialização, usando inicialização direta com um argumento [xvalue](<#/doc/language/value_category>). Para cada membro de dados não estático de um tipo de referência, o construtor de movimento vincula a referência ao mesmo objeto ou função ao qual a referência de origem está vinculada.

Se isso satisfaz os requisitos de um [`constexpr` constructor](<#/doc/language/constexpr>)(até C++23)[`constexpr` function](<#/doc/language/constexpr>)(desde C++23), o construtor de movimento gerado é constexpr.

### Construtor de movimento deletado

O construtor de movimento implicitamente declarado ou explicitamente padronizado (`explicitly-defaulted`) para a classe `T` é definido como deletado se `T` tiver um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional dele) tal que

  * `M` tem um destrutor que é deletado ou inacessível a partir do construtor de cópia, ou
  * a resolução de sobrecarga aplicada para encontrar o construtor de movimento de `M`

  * não resulta em um candidato utilizável, ou
  * no caso do subobjeto ser um [membro variante](<#/doc/language/union>), seleciona uma função não trivial.

Tal construtor é ignorado pela [resolução de sobrecarga](<#/doc/language/overload_resolution>) (caso contrário, impediria a inicialização por cópia a partir de rvalue).

### Construtor de movimento trivial

O construtor de movimento para a classe `T` é trivial se tudo o que se segue for verdadeiro:

  * não é fornecido pelo usuário (ou seja, é implicitamente definido ou padronizado);
  * `T` não tem funções membro virtuais;
  * `T` não tem classes base virtuais;
  * o construtor de movimento selecionado para cada base direta de `T` é trivial;
  * o construtor de movimento selecionado para cada membro de tipo de classe não estático (ou array de tipo de classe) de `T` é trivial.

Um construtor de movimento trivial é um construtor que executa a mesma ação que o construtor de cópia trivial, ou seja, faz uma cópia da representação do objeto como se fosse por [std::memmove](<#/doc/string/byte/memmove>). Todos os tipos de dados compatíveis com a linguagem C são trivialmente movíveis.

### Construtor de movimento elegível

Um construtor de movimento é elegível se não for deletado. | (até C++20)
Um construtor de movimento é elegível se todas as seguintes condições forem satisfeitas:

  * Não é deletado.
  * Suas [restrições associadas](<#/doc/language/constraints>) (se houver) são satisfeitas.
  * Nenhum construtor de movimento cujas restrições associadas são satisfeitas é [mais restrito](<#/doc/language/constraints>).

| (desde C++20)

A trivialidade dos construtores de movimento elegíveis determina se a classe é um [tipo de tempo de vida implícito](<#/doc/language/lifetime>), e se a classe é um [tipo trivialmente copiável](<#/doc/named_req/TriviallyCopyable>).

### Notas

Para tornar a [garantia de exceção forte](<#/doc/language/exceptions>) possível, construtores de movimento definidos pelo usuário não devem lançar exceções. Por exemplo, [std::vector](<#/doc/container/vector>) depende de [std::move_if_noexcept](<#/doc/utility/move_if_noexcept>) para escolher entre movimento e cópia quando os elementos precisam ser realocados.

Se ambos os construtores de cópia e de movimento forem fornecidos e nenhum outro construtor for viável, a resolução de sobrecarga seleciona o construtor de movimento se o argumento for um [rvalue](<#/doc/language/value_category>) do mesmo tipo (um [xvalue](<#/doc/language/value_category>) como o resultado de std::move ou um [prvalue](<#/doc/language/value_category>) como um temporário sem nome(até C++17)), e seleciona o construtor de cópia se o argumento for um [lvalue](<#/doc/language/value_category>) (objeto nomeado ou uma função/operador que retorna uma referência lvalue). Se apenas o construtor de cópia for fornecido, todas as categorias de argumento o selecionam (desde que ele aceite uma referência a const, já que rvalues podem se ligar a referências const), o que torna a cópia o recurso de fallback para o movimento, quando o movimento não está disponível.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <utility>
     
    struct A
    {
        std::string s;
        int k;
     
        A() : s("test"), k(-1) {}
        A(const A& o) : s(o.s), k(o.k) { std::cout << "move failed!\n"; }
        A(A&& o) noexcept :
            s(std::move(o.s)),       // explicit move of a member of class type
            k(std::exchange(o.k, 0)) // explicit move of a member of non-class type
        {}
    };
     
    A f(A a)
    {
        return a;
    }
     
    struct B : A
    {
        std::string s2;
        int n;
        // implicit move constructor B::(B&&)
        // calls A's move constructor
        // calls s2's move constructor
        // and makes a bitwise copy of n
    };
     
    struct C : B
    {
        ~C() {} // destructor prevents implicit move constructor C::(C&&)
    };
     
    struct D : B
    {
        D() {}
        ~D() {}           // destructor would prevent implicit move constructor D::(D&&)
        D(D&&) = default; // forces a move constructor anyway
    };
     
    int main()
    {
        std::cout << "Trying to move A\n";
        A a1 = f(A()); // return by value move-constructs the target
                       // from the function parameter
     
        std::cout << "Before move, a1.s = " << std::quoted(a1.s)
            << " a1.k = " << a1.k << '\n';
     
        A a2 = std::move(a1); // move-constructs from xvalue
        std::cout << "After move, a1.s = " << std::quoted(a1.s)
            << " a1.k = " << a1.k << '\n';
     
     
        std::cout << "\nTrying to move B\n";
        B b1;
     
        std::cout << "Before move, b1.s = " << std::quoted(b1.s) << "\n";
     
        B b2 = std::move(b1); // calls implicit move constructor
        std::cout << "After move, b1.s = " << std::quoted(b1.s) << "\n";
     
     
        std::cout << "\nTrying to move C\n";
        C c1;
        C c2 = std::move(c1); // calls copy constructor
     
        std::cout << "\nTrying to move D\n";
        D d1;
        D d2 = std::move(d1);
    }
```

Saída:
```
    Trying to move A
    Before move, a1.s = "test" a1.k = -1
    After move, a1.s = "" a1.k = 0
     
    Trying to move B
    Before move, b1.s = "test"
    After move, b1.s = ""
     
    Trying to move C
    move failed!
     
    Trying to move D
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++11 | as condições em que construtores de movimento padronizados são definidos como deletados não consideravam tipos de array multidimensionais | considerar esses tipos
[CWG 1402](<https://cplusplus.github.io/CWG/issues/1402.html>) | C++11 | um construtor de movimento padronizado que chamaria um construtor de cópia não trivial era definido como deletado; um construtor de movimento padronizado que é deletado ainda participava da resolução de sobrecarga | permite a chamada para tal construtor de cópia; feito para ser ignorado na resolução de sobrecarga
[CWG 1491](<https://cplusplus.github.io/CWG/issues/1491.html>) | C++11 | um construtor de movimento padronizado de uma classe com um membro de dados não estático do tipo referência rvalue era definido como deletado | não deletado neste caso
[CWG 2094](<https://cplusplus.github.io/CWG/issues/2094.html>) | C++11 | um subobjeto volátil tornava um construtor de movimento padronizado não trivial ([CWG issue 496](<https://cplusplus.github.io/CWG/issues/496.html>)) | trivialidade não afetada
[CWG 2595](<https://cplusplus.github.io/CWG/issues/2595.html>) | C++20 | um construtor de movimento não era elegível se houvesse outro construtor de movimento que fosse mais restrito, mas não satisfizesse suas restrições associadas | ele pode ser elegível neste caso

### Veja também

  * [converting constructor](<#/doc/language/converting_constructor>)
  * [copy assignment](<#/doc/language/as_operator>)
  * [copy constructor](<#/doc/language/copy_constructor>)
  * [copy elision](<#/doc/language/copy_elision>)
  * [default constructor](<#/doc/language/default_constructor>)
  * [destructor](<#/doc/language/destructor>)
  * [`explicit`](<#/doc/language/explicit>)
  * [initialization](<#/doc/language/initialization>)
    * [aggregate initialization](<#/doc/language/aggregate_initialization>)
    * [constant initialization](<#/doc/language/constant_initialization>)
    * [copy initialization](<#/doc/language/copy_initialization>)
    * [default initialization](<#/doc/language/default_initialization>)
    * [direct initialization](<#/doc/language/direct_initialization>)
    * [initializer list](<#/doc/language/initializer_list>)
    * [list initialization](<#/doc/language/list_initialization>)
    * [reference initialization](<#/doc/language/reference_initialization>)
    * [value initialization](<#/doc/language/value_initialization>)
    * [zero initialization](<#/doc/language/zero_initialization>)
  * [move assignment](<#/doc/language/move_operator>)
  * [`new`](<#/doc/language/new>)
