# Construtores padrão

Um construtor padrão é um [construtor](<#/doc/language/initializer_list>) que pode ser chamado sem argumentos.

### Sintaxe

class-name ﻿`(` parameter-list ﻿(optional)`);` | (1) |
---|---|---
class-name ﻿`(` parameter-list ﻿(optional)`)` function-body | (2) |
class-name ﻿`() = default;` | (3) | (desde C++11)
class-name ﻿`(` parameter-list ﻿(optional)`) = delete;` | (4) | (desde C++11)
class-name ﻿`::` class-name ﻿`(` parameter-list ﻿(optional)`)` function-body | (5) |
class-name ﻿`::` class-name ﻿`() = default;` | (6) | (desde C++11)
- **class-name** — a classe cujo construtor padrão está sendo declarado
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) onde todos os parâmetros (exceto [parameter packs](<#/doc/language/parameter_pack>))(desde C++11) possuem [argumentos padrão](<#/doc/language/default_arguments>)
- **function-body** — o [corpo da função](<#/doc/language/initializer_list>) do construtor padrão

### Explicação

1) Declaração de um construtor padrão dentro da definição da classe.

2-4) Definição de um construtor padrão dentro da definição da classe.

3) O construtor padrão é explicitamente-defaulted.

4) O construtor padrão é deletado.

5,6) Definição de um construtor padrão fora da definição da classe (a classe deve conter uma declaração (1)).

6) O construtor padrão é explicitamente-defaulted.

Construtores padrão são chamados durante [inicializações padrão](<#/doc/language/default_initialization>) e [inicializações por valor](<#/doc/language/value_initialization>).

### Construtor padrão implicitamente declarado

Se não houver um construtor declarado pelo usuário ou um template de construtor para um tipo de classe, o compilador declarará implicitamente um construtor padrão como um membro público inline de sua classe.

O construtor padrão implicitamente declarado (ou defaulted em sua primeira declaração) possui uma especificação de exceção conforme descrito em [especificação de exceção dinâmica](<#/doc/language/except_spec>)(ate C++17) [especificação noexcept](<#/doc/language/noexcept_spec>)(desde C++17).

### Construtor padrão implicitamente definido

Se o construtor é implicitamente declarado(ate C++11)o construtor padrão implicitamente declarado ou explicitamente-defaulted não for definido como deletado(desde C++11), ele é definido (ou seja, um corpo de função é gerado e compilado) pelo compilador se [odr-used](<#/doc/language/definition>) ou [necessário para avaliação constante](<#/doc/language/constant_expression>)(desde C++11), e tem o mesmo efeito de um construtor definido pelo usuário com corpo vazio e lista de inicializadores vazia. Ou seja, ele chama os construtores padrão das bases e dos membros não estáticos desta classe. Tipos de classe com um construtor vazio fornecido pelo usuário podem ser tratados de forma diferente daqueles com um construtor padrão implicitamente definido durante a [inicialização por valor](<#/doc/language/value_initialization>).

```cpp
Se isso satisfaz os requisitos de um construtor constexpr(ate C++23)função constexpr(desde C++23), o construtor gerado é constexpr. Se alguns construtores definidos pelo usuário estiverem presentes, o usuário ainda pode forçar a geração automática de um construtor padrão pelo compilador que seria implicitamente declarado de outra forma com a palavra-chave default.  // (desde C++11)
```

### Construtor padrão deletado

O construtor padrão implicitamente declarado ou explicitamente-defaulted(desde C++11) para a classe `T` é indefinido(ate C++11)definido como deletado(desde C++11) se qualquer uma das seguintes condições for satisfeita:

*   `T` é uma [union](<#/doc/language/union>) e todos os seus [membros variantes](<#/doc/language/union>) são do tipo const-qualified (ou possivelmente um array multidimensional disso).
*   `T` é uma classe não-union e todos os membros de qualquer membro de [union anônima](<#/doc/language/union>) são do tipo const-qualified (ou possivelmente um array multidimensional disso).
*   `T` possui um membro de dados não estático do tipo referência sem um inicializador padrão(desde C++11).
*   `T` possui um membro de dados não-variante não estático não-[const-default-constructible](<#/doc/language/default_initialization>) do tipo const-qualified (ou possivelmente um array multidimensional disso) sem um inicializador de membro padrão(desde C++11).
*   `T` possui um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional disso) de tal forma que

    *   `M` possui um destrutor que é deletado ou(desde C++11) inacessível a partir do construtor padrão, ou
    *   todas as seguintes condições são satisfeitas:

        *   O subobjeto não é um membro de dados não estático com um inicializador padrão.
        *   O subobjeto não é um membro variante de uma union onde outro membro de dados não estático possui um inicializador padrão.

        *   A resolução de sobrecarga aplicada para encontrar o construtor padrão de `M`

            *   não resulta em um candidato utilizável, ou
            *   no caso do subobjeto ser um membro variante, seleciona uma função não-trivial.

Se nenhum construtor definido pelo usuário estiver presente e o construtor padrão implicitamente declarado não for trivial, o usuário ainda pode inibir a geração automática de um construtor padrão implicitamente definido pelo compilador com a palavra-chave delete. | (desde C++11)

### Construtor padrão trivial

O construtor padrão para a classe `T` é trivial (ou seja, não executa nenhuma ação) se tudo o que segue for verdadeiro:

*   O construtor não é fornecido pelo usuário (ou seja, é implicitamente definido ou defaulted em sua primeira declaração).
*   `T` não possui funções membro virtuais.
*   `T` não possui classes base virtuais.
*   `T` não possui membros não estáticos com [inicializadores padrão](<#/doc/language/data_members>). | (desde C++11)
*   Cada base direta de `T` possui um construtor padrão trivial.
*   Cada membro não estático de tipo de classe (ou array disso) possui um construtor padrão trivial.

Um construtor padrão trivial é um construtor que não executa nenhuma ação. Todos os tipos de dados compatíveis com a linguagem C (POD types) são trivialmente default-constructible.

### Construtor padrão elegível

Um construtor padrão é elegível se for declarado pelo usuário ou implicitamente declarado e definível. | (ate C++11)
---|---
Um construtor padrão é elegível se não for deletado. | (desde C++11)
(ate C++20)
Um construtor padrão é elegível se todas as seguintes condições forem satisfeitas:

*   Não é deletado.
*   Suas [restrições associadas](<#/doc/language/constraints>) (se houver) são satisfeitas.
*   Nenhum construtor padrão cujas restrições associadas são satisfeitas é [mais restrito](<#/doc/language/constraints>). | (desde C++20)

A trivialidade de construtores padrão elegíveis determina se a classe é um [tipo de tempo de vida implícito](<#/doc/language/lifetime>), e se a classe é um [tipo trivial](<#/doc/named_req/TrivialType>).

### Exemplo

Execute este código
```cpp
    struct A
    {
        int x;
        A(int x = 1): x(x) {} // construtor padrão definido pelo usuário
    };
    
    struct B : A
    {
        // B::B() é implicitamente definido, chama A::A()
    };
    
    struct C
    {
        A a;
        // C::C() é implicitamente definido, chama A::A()
    };
    
    struct D : A
    {
        D(int y) : A(y) {}
        // D::D() não é declarado porque outro construtor existe
    };
    
    struct E : A
    {
        E(int y) : A(y) {}
        E() = default; // explicitamente defaulted, chama A::A()
    };
    
    struct F
    {
        int& ref; // membro referência
        const int c; // membro const
        // F::F() é implicitamente definido como deletado
    };
    
    // construtor de cópia declarado pelo usuário (fornecido pelo usuário, deletado ou defaulted)
    // impede a geração implícita de um construtor padrão
    
    struct G
    {
        G(const G&) {}
        // G::G() é implicitamente definido como deletado
    };
    
    struct H
    {
        H(const H&) = delete;
        // H::H() é implicitamente definido como deletado
    };
    
    struct I
    {
        I(const I&) = default;
        // I::I() é implicitamente definido como deletado
    };
    
    int main()
    {
        A a;
        B b;
        C c;
    //  D d; // erro de compilação
        E e;
    //  F f; // erro de compilação
    //  G g; // erro de compilação
    //  H h; // erro de compilação
    //  I i; // erro de compilação
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++98 | as condições onde construtores padrão implicitamente declarados são indefinidos não consideravam tipos de array multidimensionais | considerar esses tipos
[CWG 2084](<https://cplusplus.github.io/CWG/issues/2084.html>) | C++11 | inicializadores de membro padrão não tinham efeito sobre se um construtor padrão defaulted de uma union é deletado | eles impedem que o construtor padrão defaulted seja deletado
[CWG 2595](<https://cplusplus.github.io/CWG/issues/2595.html>) | C++20 | um construtor padrão não era elegível se houvesse outro construtor padrão que fosse mais restrito, mas não satisfizesse suas restrições associadas | ele pode ser elegível neste caso
[CWG 2871](<https://cplusplus.github.io/CWG/issues/2871.html>) | C++98 | um construtor padrão seria implicitamente declarado mesmo se houvesse um template de construtor declarado pelo usuário | nenhuma declaração implícita neste caso

### Veja também

*   [constructor](<#/doc/language/initializer_list>)
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
*   [`new`](<#/doc/language/new>)
