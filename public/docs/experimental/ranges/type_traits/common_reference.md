# std::experimental::ranges::common_reference

Definido no cabeçalho `[<experimental/ranges/type_traits>](<#/doc/header/experimental/ranges/type_traits>)`

```c
template< class... T >
struct common_reference;
```

Determina o tipo de referência comum dos tipos `T...`, isto é, o tipo para o qual todos os tipos em `T...` podem ser convertidos ou vinculados. Se tal tipo existir (conforme determinado pelas regras abaixo), o membro `type` nomeia esse tipo. Caso contrário, não há membro `type`. O comportamento é indefinido se qualquer um dos tipos em `T...` for um tipo incompleto diferente de `void` (possivelmente cv-qualificado).

Quando fornecidos tipos de referência, `common_reference` tenta encontrar um tipo de referência ao qual todos os tipos de referência fornecidos possam ser vinculados, mas pode retornar um tipo não-referência se não conseguir encontrar tal tipo de referência.

*   Se sizeof...(T) for zero, não há membro `type`.
*   Se sizeof...(T) for um (isto é, `T...` contém apenas um tipo `T0`), o membro `type` nomeia o mesmo tipo que T0.
*   Se sizeof...(T) for dois (isto é, `T...` contém dois tipos `T1` e `T2`):
    *   Se `T1` e `T2` forem ambos tipos de referência, e o _tipo de referência comum simples_ `S` de `T1` e `T2` (conforme definido abaixo) existir, então o membro `type` nomeia `S`;
    *   Caso contrário, se basic_common_reference<T1R, T2R, T1Q, T2Q>::type existir, onde `TiR` é [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::remove_reference_t](<#/doc/types/remove_reference>)<Ti>> e `TiQ` é um alias template tal que TiQ<TiR> é Ti, então o membro `type` nomeia esse tipo;
    *   Caso contrário, se decltype(false? val<T1>() : val<T2>()), onde `val` é um function template template<class T> T val();, denotar um tipo válido, então o membro `type` nomeia esse tipo;
    *   Caso contrário, se [ranges::common_type_t](<#/doc/experimental/ranges/type_traits/common_type>)<T1, T2> for um tipo válido, então o membro `type` nomeia esse tipo;
    *   Caso contrário, não há membro `type`.
*   Se sizeof...(T) for maior que dois (isto é, `T...` consiste nos tipos `T1, T2, R...`), então se ranges::common_reference_t<T1, T2> existir, o membro `type` denota ranges::common_reference_t<ranges::common_reference_t<T1, T2>, R...> se tal tipo existir. Em todos os outros casos, não há membro `type`.

O _tipo de referência comum simples_ de dois tipos de referência `T1` e `T2` é definido da seguinte forma:

*   Se `T1` for `_cv1_ X &` e `T2` for `_cv2_ Y &` (isto é, ambos são tipos de referência lvalue): seu tipo de referência comum simples é decltype(false? [std::declval](<#/doc/utility/declval>)&lt;cv12 X &&gt;() : [std::declval](<#/doc/utility/declval>)&lt;cv12 Y &&gt;()), onde _cv12_ é a união de _cv1_ e _cv2_, se esse tipo existir e for um tipo de referência.
*   Se `T1` e `T2` forem ambos tipos de referência rvalue: se o tipo de referência comum simples de `T1 &` e `T2 &` (determinado de acordo com o item anterior) existir, então `C` denota o tipo de referência rvalue correspondente a esse tipo. Se [std::is_convertible](<#/doc/types/is_convertible>)<T1, C>::value e [std::is_convertible](<#/doc/types/is_convertible>)<T2, C>::value forem ambos `true`, então o tipo de referência comum simples de `T1` e `T2` é `C`.
*   Caso contrário, um dos dois tipos deve ser um tipo de referência lvalue `A &` e o outro deve ser um tipo de referência rvalue `B &&` (`A` e `B` podem ser cv-qualificados). Seja `D` o tipo de referência comum simples de A & e B const &, se houver. Se D existir e [std::is_convertible](<#/doc/types/is_convertible>)&lt;B &&, D&gt;::value for `true`, então o tipo de referência comum simples é `D`.
*   Caso contrário, não há tipo de referência comum simples.

### Tipos de membros

Nome | Definição
---|---
`type` | o tipo de referência comum para todos `T...`

### Tipos auxiliares

template< class... T >
using common_reference_t = typename common_reference<T...>::type;
template< class T, class U, template&lt;class&gt; class TQual, template&lt;class&gt; class UQual >
struct basic_common_reference {};

O class template `basic_common_reference` é um ponto de customização que permite aos usuários influenciar o resultado de `common_reference` para tipos definidos pelo usuário (tipicamente referências proxy). O template primário é vazio.

### Especializações

Um programa pode especializar `basic_common_reference<T, U, TQual, UQual>` nos dois primeiros parâmetros `T` e `U` se [std::is_same](<#/doc/types/is_same>)<T, [std::decay_t](<#/doc/types/decay>)&lt;T&gt;> e [std::is_same](<#/doc/types/is_same>)<U, [std::decay_t](<#/doc/types/decay>)&lt;U&gt;> forem ambos true e pelo menos um deles depender de um tipo definido pelo programa.

Se tal especialização tiver um membro chamado `type`, ele deve ser um tipo de membro público e não ambíguo que nomeia um tipo para o qual TQual&lt;T&gt; e UQual&lt;U&gt; são ambos conversíveis. Além disso, ranges::basic_common_reference<T, U, TQual, UQual>::type e ranges::basic_common_reference<U, T, UQual, TQual>::type devem denotar o mesmo tipo.

Um programa não pode especializar `basic_common_reference` nos terceiro ou quarto parâmetros, nem pode especializar `common_reference` em si. Um programa que adiciona especializações em violação a essas regras tem comportamento indefinido.

### Notas

| Esta seção está incompleta

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos
(class template)
[ common_type](<#/doc/experimental/ranges/type_traits/common_type>) | determina o tipo comum de um conjunto de tipos
(class template)
[ CommonReference](<#/doc/experimental/ranges/concepts/CommonReference>) | especifica que dois tipos compartilham um tipo de referência comum
(concept)