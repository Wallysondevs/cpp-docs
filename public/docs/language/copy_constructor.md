# Construtores de cópia

Um construtor de cópia é um [construtor](<#/doc/language/initializer_list>) que pode ser chamado com um argumento do mesmo tipo de classe e copia o conteúdo do argumento sem mutá-lo.

### Sintaxe

---
class-name ﻿`(` parameter-list ﻿`);` | (1) |
---|---|---
class-name ﻿`(` parameter-list ﻿`)` function-body | (2) |
class-name ﻿`(` single-parameter-list ﻿`) = default;` | (3) | (desde C++11)
class-name ﻿`(` parameter-list ﻿`) = delete;` | (4) | (desde C++11)
class-name ﻿`::` class-name ﻿`(` parameter-list ﻿`)` function-body | (5) |
class-name ﻿`::` class-name ﻿`(` single-parameter-list ﻿`) = default;` | (6) | (desde C++11)
- **class-name** — a classe cujo construtor de cópia está sendo declarado
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) não vazia que satisfaz todas as seguintes condições:

  * dado o tipo de classe como `T`, o primeiro parâmetro é do tipo T&, const T&, volatile T& ou const volatile T&, e
  * ou não há outros parâmetros, ou todos os outros parâmetros possuem [argumentos padrão](<#/doc/language/default_arguments>).

- **single-parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo T&, const T&, volatile T& ou const volatile T& e não possui um argumento padrão
- **function-body** — o [corpo da função](<#/doc/language/initializer_list>) do construtor de cópia

### Explicação

1) Declaração de um construtor de cópia dentro da definição da classe.

2-4) Definição de um construtor de cópia dentro da definição da classe.

3) O construtor de cópia é explicitamente padronizado.

4) O construtor de cópia é deletado.

5,6) Definição de um construtor de cópia fora da definição da classe (a classe deve conter uma declaração (1)).

6) O construtor de cópia é explicitamente padronizado.
```cpp
    struct X
    {
        X(X& other); // copy constructor
    //  X(X other);  // Error: incorrect parameter type
    };
    
    union Y
    {
        Y(Y& other, int num = 1); // copy constructor with multiple parameters
    //  Y(Y& other, int num);     // Error: `num` has no default argument
    };
```

O construtor de cópia é chamado sempre que um objeto é [inicializado](<#/doc/language/initialization>) (por [inicialização direta](<#/doc/language/direct_initialization>) ou [inicialização por cópia](<#/doc/language/copy_initialization>)) a partir de outro objeto do mesmo tipo (a menos que a [resolução de sobrecarga](<#/doc/language/overload_resolution>) selecione uma correspondência melhor ou a chamada seja [elidida](<#/doc/language/copy_elision>)), o que inclui

  * inicialização: T a = b; ou T a(b);, onde b é do tipo `T`;
  * passagem de argumento de função: f(a);, onde a é do tipo `T` e f é void f(T t);
  * retorno de função: return a; dentro de uma função como T f(), onde a é do tipo `T`, que não possui um [construtor de movimento](<#/doc/language/move_constructor>).

### Construtor de cópia implicitamente declarado

Se nenhum construtor de cópia definido pelo usuário for fornecido para um tipo de classe, o compilador sempre declarará um construtor de cópia como um membro público inline não-[explicit](<#/doc/language/explicit>) de sua classe. Este construtor de cópia implicitamente declarado tem a forma T::T(const T&) se todas as seguintes condições forem verdadeiras:

  * cada base direta e virtual `B` de `T` possui um construtor de cópia cujos parâmetros são do tipo const B& ou const volatile B&;
  * cada membro de dados não estático `M` de `T` do tipo de classe ou array de tipo de classe possui um construtor de cópia cujos parâmetros são do tipo const M& ou const volatile M&.

Caso contrário, o construtor de cópia implicitamente declarado é T::T(T&).

Devido a essas regras, o construtor de cópia implicitamente declarado não pode se ligar a um argumento lvalue volatile.

Uma classe pode ter múltiplos construtores de cópia, por exemplo, ambos T::T(const T&) e T::T(T&).

Mesmo que alguns construtores de cópia definidos pelo usuário estejam presentes, o usuário ainda pode forçar a declaração implícita do construtor de cópia com a palavra-chave default. | (desde C++11)

O construtor de cópia implicitamente declarado (ou padronizado em sua primeira declaração) possui uma especificação de exceção conforme descrito em [especificação de exceção dinâmica](<#/doc/language/except_spec>)(ate C++17)[especificação noexcept](<#/doc/language/noexcept_spec>)(desde C++17).

### Construtor de cópia implicitamente definido

Se o construtor de cópia implicitamente declarado não for deletado, ele é definido (ou seja, um corpo de função é gerado e compilado) pelo compilador se [odr-usado](<#/doc/language/definition>) ou [necessário para avaliação em tempo de compilação](<#/doc/language/constant_expression>)(desde C++11). Para tipos union, o construtor de cópia implicitamente definido copia a representação do objeto (como por [std::memmove](<#/doc/string/byte/memmove>)). Para tipos de classe não-union, o construtor realiza uma cópia completa membro a membro dos subobjetos base diretos e subobjetos membro do objeto, em sua ordem de inicialização, usando inicialização direta. Para cada membro de dados não estático de um tipo de referência, o construtor de cópia liga a referência ao mesmo objeto ou função ao qual a referência de origem está ligada.

```cpp
Se isso satisfizer os requisitos de um construtor constexpr(ate C++23)função constexpr(desde C++23), o construtor de cópia gerado é constexpr. A geração do construtor de cópia implicitamente definido é descontinuada se `T` tiver um destrutor definido pelo usuário ou um operador de atribuição de cópia definido pelo usuário.  // (desde C++11)
```

### Construtor de cópia deletado

O construtor de cópia implicitamente declarado ou explicitamente padronizado(desde C++11) para a classe `T` é indefinido(ate C++11)definido como deletado(desde C++11) se qualquer uma das seguintes condições for satisfeita:

  * `T` possui um membro de dados não estático do tipo rvalue reference.

| (desde C++11)

  * `T` possui um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional dele) tal que

  * `M` possui um destrutor que é deletado ou(desde C++11) inacessível a partir do construtor de cópia, ou
  * a resolução de sobrecarga aplicada para encontrar o construtor de cópia de `M`

  * não resulta em um candidato utilizável, ou
  * no caso do subobjeto ser um [membro variante](<#/doc/language/union>), seleciona uma função não trivial.

```cpp
O construtor de cópia implicitamente declarado para a classe `T` é definido como deletado se `T` declarar um construtor de movimento ou operador de atribuição de movimento.  // (desde C++11)
```

### Construtor de cópia trivial

O construtor de cópia para a classe `T` é trivial se todas as seguintes condições forem verdadeiras:

  * não é fornecido pelo usuário (ou seja, é implicitamente definido ou padronizado);
  * `T` não possui funções membro virtuais;
  * `T` não possui classes base virtuais;
  * o construtor de cópia selecionado para cada base direta de `T` é trivial;
  * o construtor de cópia selecionado para cada membro de tipo de classe não estático (ou array de tipo de classe) de `T` é trivial;

Um construtor de cópia trivial para uma classe não-union copia efetivamente cada subobjeto escalar (incluindo, recursivamente, subobjetos de subobjetos e assim por diante) do argumento e não realiza nenhuma outra ação. No entanto, bytes de preenchimento não precisam ser copiados, e mesmo as representações de objeto dos subobjetos copiados não precisam ser as mesmas, desde que seus valores sejam idênticos.

Objetos [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) podem ser copiados copiando suas representações de objeto manualmente, por exemplo, com [std::memmove](<#/doc/string/byte/memmove>). Todos os tipos de dados compatíveis com a linguagem C (tipos POD) são trivialmente copiáveis.

### Construtor de cópia elegível

Um construtor de cópia é elegível se for declarado pelo usuário ou implicitamente declarado e definível. | (ate C++11)
---|---
Um construtor de cópia é elegível se não for deletado. | (desde C++11)
(ate C++20)
Um construtor de cópia é elegível se todas as seguintes condições forem satisfeitas:

  * Não é deletado.
  * Suas [restrições associadas](<#/doc/language/constraints>) (se houver) são satisfeitas.
  * Nenhum construtor de cópia cujas restrições associadas são satisfeitas é [mais restrito](<#/doc/language/constraints>).

| (desde C++20)

A trivialidade de construtores de cópia elegíveis determina se a classe é um [tipo de tempo de vida implícito](<#/doc/language/lifetime>), e se a classe é um [tipo trivialmente copiável](<#/doc/named_req/TriviallyCopyable>).

### Notas

Em muitas situações, construtores de cópia são otimizados mesmo que produzissem efeitos colaterais observáveis, veja [copy elision](<#/doc/language/copy_elision>).

### Exemplo
```cpp
    struct A
    {
        int n;
        A(int n = 1) : n(n) {}
        A(const A& a) : n(a.n) {} // construtor de cópia definido pelo usuário
    };
    
    struct B : A
    {
        // construtor padrão implícito B::B()
        // construtor de cópia implícito B::B(const B&)
    };
    
    struct C : B
    {
        C() : B() {}
    private:
        C(const C&); // não copiável, estilo C++98
    };
    
    int main()
    {
        A a1(7);
        A a2(a1); // chama o construtor de cópia
    
        B b;
        B b2 = b;
        A a3 = b; // conversão para A& e construtor de cópia
    
        volatile A va(10);
        // A a4 = va; // erro de compilação
    
        C c;
        // C c2 = c; // erro de compilação
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++98 | as condições onde construtores de cópia implicitamente declarados
são indefinidos não consideravam tipos de array multidimensionais | considera esses tipos
[CWG 2094](<https://cplusplus.github.io/CWG/issues/2094.html>) | C++11 | membros volatile tornam a cópia não trivial ([problema CWG 496](<https://cplusplus.github.io/CWG/issues/496.html>)) | trivialidade não afetada
[CWG 2171](<https://cplusplus.github.io/CWG/issues/2171.html>) | C++11 | X(X&) = default era não trivial | tornada trivial
[CWG 2595](<https://cplusplus.github.io/CWG/issues/2595.html>) | C++20 | um construtor de cópia não era elegível se houvesse
outro construtor de cópia mais restrito
mas que não satisfizesse suas restrições associadas | ele pode ser elegível neste caso

### Veja também

  * [construtor de conversão](<#/doc/language/converting_constructor>)
  * [atribuição de cópia](<#/doc/language/as_operator>)
  * [elision de cópia](<#/doc/language/copy_elision>)
  * [construtor padrão](<#/doc/language/default_constructor>)
  * [destrutor](<#/doc/language/destructor>)
  * [`explicit`](<#/doc/language/explicit>)
  * [inicialização](<#/doc/language/initialization>)
    * [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    * [inicialização constante](<#/doc/language/constant_initialization>)
    * [inicialização por cópia](<#/doc/language/copy_initialization>)
    * [inicialização padrão](<#/doc/language/default_initialization>)
    * [inicialização direta](<#/doc/language/direct_initialization>)
    * [lista de inicializadores](<#/doc/language/initializer_list>)
    * [inicialização por lista](<#/doc/language/list_initialization>)
    * [inicialização de referência](<#/doc/language/reference_initialization>)
    * [inicialização por valor](<#/doc/language/value_initialization>)
    * [inicialização zero](<#/doc/language/zero_initialization>)
  * [atribuição de movimento](<#/doc/language/move_operator>)
  * [construtor de movimento](<#/doc/language/move_constructor>)
  * [`new`](<#/doc/language/new>)
