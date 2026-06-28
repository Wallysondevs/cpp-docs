# Comparações padrão (desde C++20)

Funções de operador de comparação podem ser explicitamente padronizadas (defaulted) para solicitar ao compilador que gere a comparação padrão correspondente para uma classe.

### Definição

Uma _função de operador de comparação padronizada_ é uma função de operador de comparação não-template (isto é, `<=>`, `==`, `!=`, `<`, `>`, `<=`, ou `>=`) que satisfaz todas as seguintes condições:

  * É um [membro não-estático](<#/doc/language/member_functions>) ou [friend](<#/doc/language/friend>) de alguma classe `C`.
  * É [definida como padronizada](<#/doc/language/function>) em `C` ou em um contexto onde `C` é [completa](<#/doc/language/type-id>).
  * Possui dois parâmetros do tipo const C& ou dois parâmetros do tipo `C`, onde o [parâmetro de objeto implícito](<#/doc/language/overload_resolution>) (se houver) é considerado o primeiro parâmetro.

Tal função de operador de comparação é denominada _função de operador de comparação padronizada para a classe `C`_.
```cpp
    struct X
    {
        bool operator==(const X&) const = default; // OK
        bool operator==(const X&) = default;       // Erro: o parâmetro de objeto
                                                   //        implícito é do tipo X&
        bool operator==(this X, X) = default;      // OK
    };
    
    struct Y
    {
        friend bool operator==(Y, Y) = default;        // OK
        friend bool operator==(Y, const Y&) = default; // Erro: tipos de parâmetros diferentes
    };
    
    bool operator==(const Y&, const Y&) = default;     // Erro: não é um friend de Y
```

Pesquisas de nome e verificações de acesso na definição implícita de uma função de operador de comparação são realizadas a partir de um contexto equivalente ao seu corpo de função. Uma definição de uma função de operador de comparação como padronizada que aparece em uma classe deve ser a primeira declaração dessa função.

### Ordem de comparação padrão

Dada uma classe `C`, uma lista de subobjetos é formada pelos seguintes sujeitos em ordem:

  * Os subobjetos de classe base direta de `C`, na ordem de declaração.
  * Os [membros de dados](<#/doc/language/data_members>) não-estáticos de `C`, na ordem de declaração.

  * Se qualquer subobjeto membro for do tipo array, ele é expandido para a sequência de seus elementos, na ordem de índice crescente. A expansão é recursiva: elementos de array de tipos array serão expandidos novamente até que não haja subobjeto do tipo array.

Para qualquer objeto x do tipo `C`, nas descrições a seguir:

  * Seja n o número de subobjetos na lista de subobjetos (expandida) para x.
  * Seja x_i o i-ésimo subobjeto na lista de subobjetos (expandida) para x, onde x_i é formado por uma sequência de [conversões de derivado para base](<#/doc/language/overload_resolution>), [expressões de acesso a membro de classe](<#/doc/language/operator_member_access>), e [expressões de índice de array](<#/doc/language/operator_member_access>) aplicadas a x.

```cpp
    struct S {};
    
    struct T : S
    {
        int arr[2][2];
    } t;
    
    // A lista de subobjetos para “t” consiste nos seguintes 5 subobjetos em ordem:
    // (S)t → t[0][0] → t[0][1] → t[1][0] → t[1][1]
```

### Comparação de três vias

Um operator<=> para um tipo de classe pode ser definido como padronizado com qualquer tipo de retorno.

#### Tipos de categoria de comparação

Existem três tipos de categoria de comparação:

  * [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>)
  * [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>)
  * [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>)

Tipo  |  Valores equivalentes são...  |  Valores incomparáveis são...
---|---|---
[`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>) | indistinguíveis  | não permitidos
[`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>) | distinguíveis  | não permitidos
[`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>) | distinguíveis  | permitidos

#### Comparação de três vias sintetizada

A _comparação de três vias sintetizada_ do tipo `T` entre glvalues a e b do mesmo tipo é definida da seguinte forma:

  * Se a resolução de sobrecarga para a <=> b resultar em um candidato utilizável, e puder ser explicitamente convertido para `T` usando [`static_cast`](<#/doc/language/static_cast>), a comparação sintetizada é static_cast&lt;T&gt;(a <=> b).
  * Caso contrário, se qualquer uma das seguintes condições for satisfeita, a comparação sintetizada não é definida:

  * A resolução de sobrecarga para a <=> b encontra pelo menos um candidato viável.
  * `T` não é um tipo de categoria de comparação.
  * A resolução de sobrecarga para a == b não resulta em um candidato utilizável.
  * A resolução de sobrecarga para a < b não resulta em um candidato utilizável.

  * Caso contrário, se `T` for [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>), a comparação sintetizada é

```cpp
    a == b ? std::strong_ordering::equal :
    a < b  ? std::strong_ordering::less :
             std::strong_ordering::greater
```

  * Caso contrário, se `T` for [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>), a comparação sintetizada é

```cpp
    a == b ? std::weak_ordering::equivalent :
    a < b  ? std::weak_ordering::less :
             std::weak_ordering::greater
```

  * Caso contrário (`T` é [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>)), a comparação sintetizada é

```cpp
    a == b ? std::partial_ordering::equivalent :
    a < b  ? std::partial_ordering::less :
    b < a  ? std::partial_ordering::greater :
             std::partial_ordering::unordered
```

#### Tipo de retorno placeholder

Se o tipo de retorno declarado de uma função de operador de comparação de três vias padronizada (operator<=>) para um tipo de classe `C` for auto, o tipo de retorno é deduzido dos tipos de retorno das comparações de três vias entre os subobjetos correspondentes de um objeto x do tipo `C`.

Para cada subobjeto x_i na [(expandida) lista de subobjetos](<#/doc/language/default_comparisons>) para x:

  1. Realize a resolução de sobrecarga para x_i <=> x_i; se a resolução de sobrecarga não resultar em um candidato utilizável, o operator<=> padronizado é definido como deleted.
  2. Denomine a versão cv-unqualified do tipo de x_i <=> x_i como `R_i`; se `R_i` não for um tipo de categoria de comparação, o operator<=> padronizado é definido como deleted.

Se o operator<=> padronizado não for definido como deleted, seu tipo de retorno é deduzido como [std::common_comparison_category_t](<#/doc/utility/compare/common_comparison_category>)<R_1, R_2, ..., R_n>.

#### Tipo de retorno não-placeholder

Se o tipo de retorno declarado do operator<=> padronizado não for auto, ele não pode conter nenhum [tipo placeholder](<#/doc/language/auto>) (por exemplo, decltype(auto)).

Se houver um subobjeto x_i na lista de subobjetos (expandida) para x tal que a [comparação de três vias sintetizada](<#/doc/language/default_comparisons>) do tipo de retorno declarado entre x_i e x_i não for definida, o operator<=> padronizado é definido como deleted.

#### Resultado da comparação

Sejam x e y os parâmetros de um operator<=> padronizado; denote cada subobjeto na lista de subobjetos (expandida) para x e y como x_i e y_i, respectivamente. A comparação de três vias padrão entre x e y é realizada comparando os subobjetos correspondentes x_i e y_i em ordem crescente de i.

Seja `R` o tipo de retorno (possivelmente deduzido); o resultado da comparação entre x_i e y_i é o resultado da comparação de três vias sintetizada do tipo `R` entre x_i e y_i.

  * Durante a comparação de três vias padrão entre x e y, se uma comparação subobjeto a subobjeto entre x_i e y_i gerar um resultado v_i tal que a conversão contextual de v_i != 0 para bool resulte em true, o valor de retorno é uma cópia de v_i (os subobjetos restantes não serão comparados).
  * Caso contrário, o valor de retorno é static_cast&lt;R&gt;(std::strong_ordering::equal).

Execute este código
```cpp
    #include <compare>
    #include <iostream>
    #include <set>
    
    struct Point
    {
        int x;
        int y;
        auto operator<=>(const Point&) const = default;
        /* non-comparison functions */
    };
    
    int main()
    {
        Point pt1{1, 1}, pt2{1, 2};
        std::set<Point> s; // OK
        s.insert(pt1);     // OK
    
        // as funções de operador de comparação de duas vias não precisam ser explicitamente definidas:
        // operator== é implicitamente declarado (veja abaixo)
        // as resoluções de sobrecarga de outros candidatos selecionarão candidatos reescritos
        std::cout << std::boolalpha
            << (pt1 == pt2) << ' '  // false
            << (pt1 != pt2) << ' '  // true
            << (pt1 <  pt2) << ' '  // true
            << (pt1 <= pt2) << ' '  // true
            << (pt1 >  pt2) << ' '  // false
            << (pt1 >= pt2) << ' '; // false
    }
```

### Comparação de igualdade

#### Declaração explícita

Um operator== para um tipo de classe pode ser definido como padronizado com tipo de retorno bool.

Dada uma classe `C` e um objeto x do tipo `C`, se houver um subobjeto x_i na lista de subobjetos (expandida) para x tal que a resolução de sobrecarga para x_i == x_i não resultar em um candidato utilizável, o operator== padronizado é definido como deleted.

Sejam x e y os parâmetros de um operator== padronizado; denote cada subobjeto na lista de subobjetos (expandida) para x e y como x_i e y_i, respectivamente. A comparação de igualdade padrão entre x e y é realizada comparando os subobjetos correspondentes x_i e y_i em ordem crescente de i.

O resultado da comparação entre x_i e y_i é o resultado de x_i == y_i.

  * Durante a comparação de igualdade padrão entre x e y, se uma comparação subobjeto a subobjeto entre x_i e y_i gerar um resultado v_i tal que a conversão contextual de v_i para bool resulte em false, o valor de retorno é false (os subobjetos restantes não serão comparados).
  * Caso contrário, o valor de retorno é true.

Execute este código
```cpp
    #include <iostream>
    
    struct Point
    {
        int x;
        int y;
        bool operator==(const Point&) const = default;
        /* non-comparison functions */
    };
    
    int main()
    {
        Point pt1{3, 5}, pt2{2, 5};
        std::cout << std::boolalpha
            << (pt1 != pt2) << '\n'  // true
            << (pt1 == pt1) << '\n'; // true
    
        struct [[maybe_unused]] { int x{}, y{}; } p, q;
        // if (p == q) {} // Erro: operator== não está definido
    }
```

#### Declaração implícita

Se uma classe `C` não declarar explicitamente nenhum membro ou friend chamado operator==, uma função de operador é declarada implicitamente para cada operator<=> definido como padronizado. Cada operator== declarado implicitamente tem o mesmo acesso e [definição de função](<#/doc/language/function>) e no mesmo [escopo de classe](<#/doc/language/scope>) que o respectivo operator<=> padronizado, com as seguintes alterações:

  * O [identificador do declarador](<#/doc/language/declarations>) é substituído por operator==.
  * O tipo de retorno é substituído por bool.

```cpp
    template<typename T>
    struct X
    {
        friend constexpr std::partial_ordering operator<=>(X, X)
            requires (sizeof(T) != 1) = default;
        // declara implicitamente: friend constexpr bool operator==(X, X)
        //                          requires (sizeof(T) != 1) = default;
    
        [[nodiscard]] virtual std::strong_ordering operator<=>(const X&) const = default;
        // declara implicitamente: [[nodiscard]] virtual bool
        //                          operator==(const X&) const = default;
    };
```

### Comparação secundária

Uma função de operador de comparação secundária (`!=`, `<`, `>`, `<=`, ou `>=`) para um tipo de classe pode ser definida como padronizada com tipo de retorno bool.

Seja `@` um dos cinco operadores de comparação secundários; para cada operator@ padronizado com parâmetros x e y, até duas resoluções de sobrecarga são realizadas (não considerando o operator@ padronizado como um candidato) para determinar se ele é definido como deleted.

  * A primeira resolução de sobrecarga é realizada para x @ y. Se a resolução de sobrecarga não resultar em um candidato utilizável, ou o candidato selecionado não for um [candidato reescrito](<#/doc/language/overload_resolution>), o operator@ padronizado é definido como deleted. Não há segunda resolução de sobrecarga nesses casos.
  * A segunda resolução de sobrecarga é realizada para o candidato reescrito selecionado de x @ y. Se a resolução de sobrecarga não resultar em um candidato utilizável, o operator@ padronizado é definido como deleted.

Se x @ y não puder ser implicitamente convertido para bool, o operator@ padronizado é definido como deleted.

Se o operator@ padronizado não for definido como deleted, ele resulta em x @ y.
```cpp
    struct HasNoRelational {};
    
    struct C
    {
        friend HasNoRelational operator<=>(const C&, const C&);
        bool operator<(const C&) const = default; // OK, função é padronizada
    };
```

### Palavras-chave

[`default`](<#/doc/keyword/default>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto
---|---|---|---
[CWG 2539](<https://cplusplus.github.io/CWG/issues/2539.html>) | C++20  | a comparação de três vias sintetizada escolheria static_cast mesmo se a conversão explícita não estivesse disponível  | não escolhe static_cast neste caso
[CWG 2546](<https://cplusplus.github.io/CWG/issues/2546.html>) | C++20  | o operator@ secundário padronizado não era definido como deleted se a resolução de sobrecarga de x @ y selecionasse um candidato reescrito não utilizável  | definido como deleted neste caso
[CWG 2547](<https://cplusplus.github.io/CWG/issues/2547.html>) | C++20  | não estava claro se as funções de operador de comparação para não-classes podem ser padronizadas  | elas não podem ser padronizadas
[CWG 2568](<https://cplusplus.github.io/CWG/issues/2568.html>) | C++20  | a definição implícita de funções de operador de comparação poderia violar as regras de acesso a membros  | verificações de acesso são realizadas a partir de um contexto equivalente aos seus corpos de função

### Veja também

  * [resolução de sobrecarga](<#/doc/language/overload_resolution>) em uma chamada a um operador sobrecarregado
  * [operador de comparação de três vias](<#/doc/language/operator_comparison>) embutido
  * [Sobrecarga de operador](<#/doc/language/operators>) para operadores de comparação
