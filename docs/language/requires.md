# requires expression (desde C++20)

Produz uma expressão prvalue do tipo bool que descreve as restrições.

### Sintaxe

---
`requires` `{` requirement-seq `}` | (1) |
---|---|---
`requires` `(` parameter-list ﻿(optional) `)` `{` requirement-seq `}` | (2) |
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>)
- **requirement-seq** — sequência de _requisitos_ , onde cada requisito é um dos seguintes:

*   [requisito simples](<#/doc/language/requires>)
*   [requisito de tipo](<#/doc/language/requires>)
*   [requisito composto](<#/doc/language/requires>)
*   [requisito aninhado](<#/doc/language/requires>)

### Explicação

Requisitos podem se referir aos parâmetros de template que estão no escopo, aos parâmetros da parameter-list, e a quaisquer outras declarações que sejam visíveis a partir do contexto envolvente.

A substituição de argumentos de template em uma requires expression usada na declaração de uma [entidade template](<#/doc/language/templates>) pode resultar na formação de tipos ou expressões inválidos em seus requisitos, ou na violação de restrições semânticas desses requisitos. Nesses casos, a requires expression avalia para `false` e não causa um programa malformado. A substituição e a verificação de restrições semânticas prosseguem em ordem lexical e param quando uma condição que determina o resultado da requires expression é encontrada. Se a substituição (se houver) e a verificação de restrições semânticas forem bem-sucedidas, a requires expression avalia para `true`.

Se uma falha de substituição ocorrer em uma requires expression para cada argumento de template possível, o programa é malformado, nenhum diagnóstico é exigido:
```cpp
    template<class T>
    concept C = requires
    {
        new int[-(int)sizeof(T)]; // inválido para todo T: malformado, nenhum diagnóstico exigido
    };
```

Se uma requires expression contiver tipos ou expressões inválidos em seus requisitos, e não aparecer dentro da declaração de uma [entidade template](<#/doc/language/templates>), então o programa é malformado.

### Parâmetros locais

Uma requires expression pode introduzir parâmetros locais usando uma [lista de parâmetros](<#/doc/language/function>). Esses parâmetros não possuem ligação (linkage), armazenamento (storage) ou tempo de vida (lifetime); eles são usados apenas como notação para o propósito de definir requisitos.

O tipo de cada parâmetro é determinado da mesma forma que [determinar o tipo real](<#/doc/language/function>) dos parâmetros de função:
```cpp
    template<typename T>
    concept C = requires(T p[2])
    {
        (decltype(p))nullptr; // OK, p tem o tipo T*
    };
```

Se qualquer uma das seguintes condições for satisfeita, o programa é malformado:

*   Um parâmetro local possui um [argumento padrão](<#/doc/language/default_arguments>).
*   A lista de parâmetros termina com uma elipse.

```cpp
    template<typename T>
    concept C1 = requires(T t = 0)  // Erro: t possui um argumento padrão
    {
        t;
    };
    
    template<typename T>
    concept C2 = requires(T t, ...) // Erro: termina com uma elipse
    {
        t;
    };
```

### Requisitos simples

---
expression `;`
- **expression** — uma expressão que não começa com requires

Um requisito simples afirma que a expressão é válida. A expressão é um [operando não avaliado](<#/doc/language/expressions>).
```cpp
    template<typename T>
    concept Addable = requires (T a, T b)
    {
        a + b; // "a expressão “a + b” é uma expressão válida que irá compilar"
    };
    
    template<class T, class U = T>
    concept Swappable = requires(T&& t, U&& u)
    {
        swap(std::forward<T>(t), std::forward<U>(u));
        swap(std::forward<U>(u), std::forward<T>(t));
    };
```

Um requisito que começa com a palavra-chave `requires` é sempre interpretado como um requisito aninhado. Assim, um requisito simples não pode começar com uma requires expression não-parentesizada.

### Requisitos de tipo

---
`typename` identifier `;`
- **identifier** — um [identificador](<#/doc/language/name>) (possivelmente qualificado) (incluindo [identificador de template simples](<#/doc/language/templates>))

Um requisito de tipo afirma que o tipo nomeado pelo identificador é válido: isso pode ser usado para verificar se um determinado tipo aninhado nomeado existe, ou se uma especialização de template de classe/alias nomeia um tipo. Um requisito de tipo que nomeia uma especialização de template de classe não exige que o tipo seja completo.
```cpp
    template<typename T>
    using Ref = T&;
    
    template<typename T>
    concept C = requires
    {
        typename T::inner; // nome de membro aninhado exigido
        typename S<T>;     // especialização de template de classe exigida
        typename Ref<T>;   // substituição de template de alias exigida
    };
    
    template<class T, class U>
    using CommonType = std::common_type_t<T, U>;
    
    template<class T, class U>
    concept Common = requires (T&& t, U&& u)
    {
        typename CommonType<T, U>; // CommonType<T, U> é válido e nomeia um tipo
        { CommonType<T, U>{std::forward<T>(t)} };
        { CommonType<T, U>{std::forward<U>(u)} };
    };
```

### Requisitos compostos

---
```cpp
`{` expression `};`  // (1)
`{` expression `}` `noexcept` `;`  // (2)
`{` expression `} - >` type-constraint `;`  // (3)
`{` expression `}` `noexcept - >` type-constraint `;`  // (4)
```
- **expression** — uma expressão
- **type-constraint** — uma [restrição](<#/doc/language/constraints>)

Um requisito composto afirma propriedades da expressão ﻿. A substituição e a verificação de restrições semânticas prosseguem na seguinte ordem:

1) Argumentos de template (se houver) são substituídos na expressão ﻿.

2) Se `noexcept` estiver presente, a expressão não deve ser [potencialmente lançadora de exceções](<#/doc/language/noexcept>).

3) Se a type-constraint estiver presente, então:

a) Argumentos de template são substituídos na type-constraint ﻿.

b) decltype((expression ﻿)) deve satisfazer a restrição imposta pela type-constraint ﻿. Caso contrário, a requires expression envolvente é `false`.

A expressão é um [operando não avaliado](<#/doc/language/expressions>).
```cpp
    template<typename T>
    concept C2 = requires(T x)
    {
        // a expressão *x deve ser válida
        // E o tipo T::inner deve ser válido
        // E o resultado de *x deve ser conversível para T::inner
        {*x} -> std::convertible_to<typename T::inner>;
    
        // a expressão x + 1 deve ser válida
        // E std::same_as<decltype((x + 1)), int> deve ser satisfeita
        // ou seja, (x + 1) deve ser um prvalue do tipo int
        {x + 1} -> std::same_as<int>;
    
        // a expressão x * 1 deve ser válida
        // E seu resultado deve ser conversível para T
        {x * 1} -> std::convertible_to<T>;
    };
```

### Requisitos aninhados

---
`requires` constraint-expression `;`
- **constraint-expression** — uma expressão que representa [restrições](<#/doc/language/constraints>)

Um requisito aninhado pode ser usado para especificar restrições adicionais em termos de parâmetros locais. A constraint-expression deve ser satisfeita pelos argumentos de template substituídos, se houver. A substituição de argumentos de template em um requisito aninhado causa a substituição na constraint-expression apenas na medida necessária para determinar se a constraint-expression é satisfeita.
```cpp
    template<class T>
    concept Semiregular = DefaultConstructible<T> &&
        CopyConstructible<T> && CopyAssignable<T> && Destructible<T> &&
    requires(T a, std::size_t n)
    {  
        requires Same<T*, decltype(&a)>; // aninhado: "Same<...> avalia para true"
        { a.~T() } noexcept; // composto: "a.~T()" é uma expressão válida que não lança exceções
        requires Same<T*, decltype(new T)>; // aninhado: "Same<...> avalia para true"
        requires Same<T*, decltype(new T[n])>; // aninhado
        { delete new T }; // composto
        { delete new T[n] }; // composto
    };
```

### Nota

A palavra-chave `requires` também é usada para introduzir [requires clauses](<#/doc/language/constraints>).
```cpp
    template<typename T>
    concept Addable = requires (T x) { x + x; }; // requires expression
    
    template<typename T> requires Addable<T> // requires clause, não requires expression
    T add(T a, T b) { return a + b; }
    
    template<typename T>
        requires requires (T x) { x + x; } // restrição ad-hoc, observe a palavra-chave usada duas vezes
    T add(T a, T b) { return a + b; }
```

### Palavras-chave

[`requires`](<#/doc/keyword/requires>)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2560](<https://cplusplus.github.io/CWG/issues/2560.html>) | C++20 | não estava claro se os tipos de parâmetros são ajustados em requires expressions | também ajustado
[CWG 2911](<https://cplusplus.github.io/CWG/issues/2911.html>) | C++20 | todas as expressões que aparecem dentro de requires expressions eram operandos não avaliados | apenas algumas expressões são

### Referências

*   C++23 standard (ISO/IEC 14882:2024):
    *   7.5.7 Requires expressions [expr.prim.req]
*   C++20 standard (ISO/IEC 14882:2020):
    *   7.5.7 Requires expressions [expr.prim.req]

### Ver também

[ Restrições e concepts](<#/doc/language/constraints>)(C++20) | especifica os requisitos para argumentos de template