# std::common_reference

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class... T >
struct common_reference;
```

Determina o tipo de referência comum dos tipos `T...`, ou seja, o tipo para o qual todos os tipos em `T...` podem ser convertidos ou vinculados. Se tal tipo existir (conforme determinado pelas regras abaixo), o membro `type` nomeia esse tipo. Caso contrário, não há membro `type`. O comportamento é indefinido se qualquer um dos tipos em `T...` for um tipo incompleto diferente de (possivelmente cv-qualificado) void.

Quando dados tipos de referência, `common_reference` tenta encontrar um tipo de referência ao qual todos os tipos de referência fornecidos possam ser vinculados, mas pode retornar um tipo não-referência se não conseguir encontrar tal tipo de referência.

*   Se sizeof...(T) for zero, não há membro `type`.
*   Se sizeof...(T) for um (ou seja, `T...` contém apenas um tipo `T0`), o membro `type` nomeia o mesmo tipo que T0.
*   Se sizeof...(T) for dois (ou seja, `T...` contém dois tipos `T1` e `T2`):
    *   Seja `S` o _tipo de referência comum simples_ de `T1` e `T2` (conforme definido abaixo). O tipo membro `type` nomeia `S` se todas as condições abaixo forem satisfeitas:
        *   `T1` e `T2` são ambos tipos de referência
        *   `S` é bem-formado

    *   [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::add_pointer_t](<#/doc/types/add_pointer>)<T1>, [std::add_pointer_t](<#/doc/types/add_pointer>)<S>> e [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::add_pointer_t](<#/doc/types/add_pointer>)<T2>, [std::add_pointer_t](<#/doc/types/add_pointer>)<S>> são verdadeiros;

| (desde C++23)

    *   Caso contrário, se std::basic_common_reference<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<T1>, [std::remove_cvref_t](<#/doc/types/remove_cvref>)<T2>, T1Q, T2Q>::type existir, onde `TiQ` é um alias template unário tal que TiQ<U> é `U` com a adição dos qualificadores cv- e de referência de `Ti`, então o tipo membro `type` nomeia esse tipo;

    *   Caso contrário, se decltype(false? val<T1>() : val<T2>()), onde `val` é um function template template<class T> T val();, for um tipo válido, então o tipo membro `type` nomeia esse tipo;
    *   Caso contrário, se [std::common_type_t](<#/doc/types/common_type>)<T1, T2> for um tipo válido, então o tipo membro `type` nomeia esse tipo;
    *   Caso contrário, não há membro `type`.
*   Se sizeof...(T) for maior que dois (ou seja, `T...` consiste nos tipos `T1, T2, R...`), então se std::common_reference_t<T1, T2> existir, o membro `type` denota std::common_reference_t<std::common_reference_t<T1, T2>, R...> se tal tipo existir. Em todos os outros casos, não há membro `type`.

O _tipo de referência comum simples_ de dois tipos de referência `T1` e `T2` é definido como segue:

*   Se `T1` for `_cv1_ X&` e `T2` for `_cv2_ Y&` (ou seja, ambos são tipos de referência lvalue): seu tipo de referência comum simples é decltype(false? [std::declval](<#/doc/utility/declval>)&lt;cv12 X&&gt;() : [std::declval](<#/doc/utility/declval>)&lt;cv12 Y&&gt;()), onde _cv12_ é a união de _cv1_ e _cv2_ , se esse tipo existir e for um tipo de referência;
*   Se `T1` e `T2` forem ambos tipos de referência rvalue: se o tipo de referência comum simples de `T1&` e `T2&` (determinado de acordo com o item anterior) existir, então seja `C` o tipo de referência rvalue correspondente a esse tipo. Se [std::is_convertible_v](<#/doc/types/is_convertible>)<T1, C> e [std::is_convertible_v](<#/doc/types/is_convertible>)<T2, C> forem ambos verdadeiros, então o tipo de referência comum simples de `T1` e `T2` é `C`;
*   Caso contrário, um dos dois tipos deve ser um tipo de referência lvalue `A&` e o outro deve ser um tipo de referência rvalue `B&&` (`A` e `B` podem ser cv-qualificados). Seja `D` o tipo de referência comum simples de A& e B const&, se houver. Se D existir e [std::is_convertible_v](<#/doc/types/is_convertible>)<B&&, D> for verdadeiro, então o tipo de referência comum simples é `D`;
*   Caso contrário, não há tipo de referência comum simples.

Veja [operador condicional](<#/doc/language/operator_other>) para a definição do tipo de expressão false ? X : Y como as usadas acima.

### Tipos Membro

Nome | Definição
---|---
`type` | o tipo de referência comum para todos `T...`

### Tipos Auxiliares

template< class... T >
using common_reference_t = std::common_reference<T...>::type;
template< class T, class U, template&lt;class&gt; class TQual, template&lt;class&gt; class UQual >
struct basic_common_reference {};

O class template `basic_common_reference` é um ponto de customização que permite aos usuários influenciar o resultado de `common_reference` para tipos definidos pelo usuário (tipicamente referências proxy). O template primário é vazio.

### Especializações

Um programa pode especializar std::basic_common_reference<T, U, TQual, UQual> nos dois primeiros parâmetros `T` e `U` se [std::is_same_v](<#/doc/types/is_same>)<T, [std::decay_t](<#/doc/types/decay>)&lt;T&gt;> e [std::is_same_v](<#/doc/types/is_same>)<U, [std::decay_t](<#/doc/types/decay>)&lt;U&gt;> forem ambos verdadeiros e pelo menos um deles depender de um tipo definido pelo programa.

Se tal especialização tiver um membro chamado `type`, ele deve ser um membro público e não ambíguo que nomeia um tipo para o qual tanto TQual&lt;T&gt; quanto UQual&lt;U&gt; são conversíveis. Além disso, std::basic_common_reference<T, U, TQual, UQual>::type e std::basic_common_reference<U, T, UQual, TQual>::type devem denotar o mesmo tipo.

Um programa não pode especializar `basic_common_reference` nos terceiro ou quarto parâmetros, nem pode especializar `common_reference` em si. Um programa que adiciona especializações em violação dessas regras tem comportamento indefinido.

A standard library fornece as seguintes especializações de `basic_common_reference`:

[ std::basic_common_reference<std::pair>](<#/doc/utility/pair/basic_common_reference>)(C++23) | determina o tipo de referência comum de dois `pair`s
(especialização de class template)
[ std::basic_common_reference<_tuple-like_ >](<#/doc/utility/tuple/basic_common_reference>)(C++23) | determina o tipo de referência comum de um `tuple` e um tipo `_tuple-like_`
(especialização de class template)
[ std::basic_common_reference<std::reference_wrapper>](<#/doc/utility/functional/reference_wrapper/basic_common_reference>)(C++23) | determina o tipo de referência comum de `reference_wrapper` e não-`reference_wrapper`
(especialização de class template)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_common_reference`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | Torna std::common_reference_t de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>) um tipo de referência

### Exemplos

Execute este código
```cpp
    #include <concepts>
    #include <type_traits>
    
    static_assert(
        std::same_as<
            int&,
            std::common_reference_t<
                std::add_lvalue_reference_t<int>,
                std::add_lvalue_reference_t<int>&,
                std::add_lvalue_reference_t<int>&&,
                std::add_lvalue_reference_t<int>const,
                std::add_lvalue_reference_t<int>const&
            >
        >
    );
    
    int main() {}
```

### Veja também

[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos
(class template)
[ common_reference_with](<#/doc/concepts/common_reference_with>)(C++20) | especifica que dois tipos compartilham um tipo de referência comum
(concept)