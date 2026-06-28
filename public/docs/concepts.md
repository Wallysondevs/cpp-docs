# Biblioteca de Concepts (desde C++20)

A biblioteca de concepts fornece definições de concepts fundamentais da biblioteca que podem ser usados para realizar a validação em tempo de compilação de argumentos de template e para realizar o despacho de funções com base nas propriedades dos tipos. Esses concepts fornecem uma base para o raciocínio equacional em programas.

A maioria dos concepts na standard library impõe requisitos sintáticos e semânticos. Diz-se que um concept padrão é _satisfeito_ se seus requisitos sintáticos são atendidos, e é _modelado_ se é satisfeito e seus requisitos semânticos (se houver) também são atendidos.

Em geral, apenas os requisitos sintáticos podem ser verificados pelo compilador. Se a validade ou o significado de um programa depende se uma sequência de argumentos de template modela um concept, e o concept é satisfeito mas não modelado, ou se um requisito semântico não é atendido no ponto de uso, o programa é malformado, [sem diagnóstico exigido](<#/doc/language/ndr>).

### Preservação de igualdade

Uma expressão é _preservadora de igualdade_ se resulta em saídas iguais dadas entradas iguais, onde

  * as entradas consistem em seus operandos (não necessariamente tornando a expressão semanticamente válida), e
  * as saídas consistem em seu resultado e todas as modificações nos operandos pela expressão, se houver

onde, para conveniência da redação, seus "operandos" se referem às suas maiores subexpressões que consistem em uma [id-expression](<#/doc/language/expressions>) ou invocações de [`std::move`](<#/doc/utility/move>), [std::forward](<#/doc/utility/forward>), e [std::declval](<#/doc/utility/declval>).

A qualificação cv e a categoria de valor de cada operando são determinadas assumindo que cada parâmetro de tipo de template em seu tipo denota um tipo de objeto não-array completo e não-cv-qualificado.

Toda expressão que se exige que preserve a igualdade é ainda exigida que seja estável, ou seja, duas avaliações dela com os mesmos objetos de entrada devem ter saídas iguais sem qualquer modificação explícita intermediária desses objetos de entrada.

Salvo indicação em contrário, toda expressão usada em uma [requires expression](<#/doc/language/requires>) dos [concepts da standard library](<#/doc/concepts>) é exigida que preserve a igualdade, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

Na standard library, os seguintes concepts podem ter requires expressions que não preservam a igualdade:

  * [`output_iterator`](<#/doc/iterator/output_iterator>)
  * [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
  * [`invocable`](<#/doc/concepts/invocable>)
  * [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
  * [`range`](<#/doc/ranges/range>)

### Variações implícitas de expressão

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão que não modifica para algum operando lvalue constante também exige implicitamente variações adicionais dessa expressão que aceitam um lvalue não-constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente exigida com semânticas diferentes.

Essas _variações implícitas de expressão_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações é não especificada.
```cpp
    template<class T>
    concept C = requires(T a, T b, const T c, const T d)
    {
        c == d;           // expressão #1: não modifica os operandos
        a = std::move(b); // expressão #2: modifica ambos os operandos
        a = c;            // expressão #3: modifica o operando esquerdo `a`
    };
    
    // A expressão #1 exige implicitamente variações adicionais de expressão que
    // atendem aos requisitos para c == d (incluindo não-modificação),
    // como se as seguintes expressões tivessem sido declaradas também:
    
    // ------ const == const ------- ------ const == não-const ---
    //                                         c  ==           b;
    //            c == std::move(d);           c  == std::move(b);
    // std::move(c) ==           d;  std::move(c) ==           b;
    // std::move(c) == std::move(d); std::move(c) == std::move(b);
    
    // -- não-const == const ------- -- não-const == não-const ---
    //           a  ==           d;            a  ==           b;
    //           a  == std::move(d);           a  == std::move(b);
    // std::move(a) ==           d;  std::move(a) ==           b;
    // std::move(a) == std::move(d); std::move(a) == std::move(b);
    
    // A expressão #3 exige implicitamente variações adicionais de expressão que
    // atendem aos requisitos para a = c
    // (incluindo não-modificação do segundo operando),
    // como se as expressões a = b (variação lvalue não-constante)
    // e a = std::move(c) (variação rvalue const) tivessem sido declaradas.
    
    // Nota: Como a expressão #2 já exige a variação rvalue não-constante
    // (a == std::move(b)) explicitamente, a expressão #3 não a exige implicitamente mais.
    
    // O tipo T atende aos requisitos sintáticos explicitamente declarados de
    // concept C acima, mas não atende aos requisitos implícitos adicionais
    // (ou seja, T satisfaz mas não modela C):
    // um programa que exige C<T> é malformado (sem diagnóstico exigido).
    struct T
    {
        bool operator==(const T&) const { return true; }
        bool operator==(T&) = delete;
    };
```

### Concepts da standard library

Definidos no namespace `std`
---

##### Concepts da linguagem central

Definidos no header `[<concepts>](<#/doc/header/concepts>)`
[ same_as](<#/doc/concepts/same_as>)(desde C++20) | especifica que um tipo é o mesmo que outro tipo
(concept)
[ derived_from](<#/doc/concepts/derived_from>)(desde C++20) | especifica que um tipo é derivado de outro tipo
(concept)
[ convertible_to](<#/doc/concepts/convertible_to>)(desde C++20) | especifica que um tipo é implicitamente conversível para outro tipo
(concept)
[ common_reference_with](<#/doc/concepts/common_reference_with>)(desde C++20) | especifica que dois tipos compartilham um tipo de referência comum
(concept)
[ common_with](<#/doc/concepts/common_with>)(desde C++20) | especifica que dois tipos compartilham um tipo comum
(concept)
[ integral](<#/doc/concepts/integral>)(desde C++20) | especifica que um tipo é um tipo integral
(concept)
[ signed_integral](<#/doc/concepts/signed_integral>)(desde C++20) | especifica que um tipo é um tipo integral que é assinado
(concept)
[ unsigned_integral](<#/doc/concepts/unsigned_integral>)(desde C++20) | especifica que um tipo é um tipo integral que é não assinado
(concept)
[ floating_point](<#/doc/concepts/floating_point>)(desde C++20) | especifica que um tipo é um tipo de ponto flutuante
(concept)
[ assignable_from](<#/doc/concepts/assignable_from>)(desde C++20) | especifica que um tipo é atribuível a partir de outro tipo
(concept)
[ swappableswappable_with](<#/doc/concepts/swappable>)(desde C++20) | especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si
(concept)
[ destructible](<#/doc/concepts/destructible>)(desde C++20) | especifica que um objeto do tipo pode ser destruído
(concept)
[ constructible_from](<#/doc/concepts/constructible_from>)(desde C++20) | especifica que uma variável do tipo pode ser construída a partir de ou ligada a um conjunto de tipos de argumento
(concept)
[ default_initializable](<#/doc/concepts/default_initializable>)(desde C++20) | especifica que um objeto de um tipo pode ser construído por padrão
(concept)
[ move_constructible](<#/doc/concepts/move_constructible>)(desde C++20) | especifica que um objeto de um tipo pode ser construído por movimento
(concept)
[ copy_constructible](<#/doc/concepts/copy_constructible>)(desde C++20) | especifica que um objeto de um tipo pode ser construído por cópia e construído por movimento
##### Concepts de comparação

Definidos no header `[<concepts>](<#/doc/header/concepts>)`
[_boolean-testable_](<#/doc/concepts/boolean-testable>) ﻿(desde C++20) | especifica que um tipo pode ser usado em contextos Booleanos
(concept de exposição*)
[ equality_comparableequality_comparable_with](<#/doc/concepts/equality_comparable>)(desde C++20) | especifica que o operador == é uma relação de equivalência
(concept)
[ totally_orderedtotally_ordered_with](<#/doc/concepts/totally_ordered>)(desde C++20) | especifica que os operadores de comparação no tipo produzem uma ordem total
(concept)
Definidos no header `[<compare>](<#/doc/header/compare>)`
[ three_way_comparablethree_way_comparable_with](<#/doc/utility/compare/three_way_comparable>)(desde C++20) | especifica que o operador <=> produz resultado consistente em tipos dados
(concept)

##### Concepts de objeto

Definidos no header `[<concepts>](<#/doc/header/concepts>)`
[ movable](<#/doc/concepts/movable>)(desde C++20) | especifica que um objeto de um tipo pode ser movido e trocado
(concept)
[ copyable](<#/doc/concepts/copyable>)(desde C++20) | especifica que um objeto de um tipo pode ser copiado, movido e trocado
(concept)
[ semiregular](<#/doc/concepts/semiregular>)(desde C++20) | especifica que um objeto de um tipo pode ser copiado, movido, trocado e construído por padrão
(concept)
[ regular](<#/doc/concepts/regular>)(desde C++20) | especifica que um tipo é regular, ou seja, é tanto [`semiregular`](<#/doc/concepts/semiregular>) quanto [`equality_comparable`](<#/doc/concepts/equality_comparable>)
(concept)

##### Concepts invocáveis

Definidos no header `[<concepts>](<#/doc/header/concepts>)`
[ invocableregular_invocable](<#/doc/concepts/invocable>)(desde C++20) | especifica que um tipo invocável pode ser invocado com um dado conjunto de tipos de argumento
(concept)
[ predicate](<#/doc/concepts/predicate>)(desde C++20) | especifica que um tipo invocável é um predicado Booleano
(concept)
[ relation](<#/doc/concepts/relation>)(desde C++20) | especifica que um tipo invocável é uma relação binária
(concept)
[ equivalence_relation](<#/doc/concepts/equivalence_relation>)(desde C++20) | especifica que uma [`relation`](<#/doc/concepts/relation>) impõe uma relação de equivalência
(concept)
[ strict_weak_order](<#/doc/concepts/strict_weak_order>)(desde C++20) | especifica que uma [`relation`](<#/doc/concepts/relation>) impõe uma ordenação fraca estrita
(concept)

Concepts adicionais podem ser encontrados na [biblioteca de iteradores](<#/doc/iterator>), na [biblioteca de algoritmos](<#/doc/iterator>), e na [biblioteca de ranges](<#/doc/ranges>).

### Ver também

  * [Requisitos Nomeados](<#/doc/named_req>)
