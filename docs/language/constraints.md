# Restrições e concepts (desde C++20)

[Class templates](<#/doc/language/class_template>), [function templates](<#/doc/language/function_template>) (incluindo [lambdas genéricas](<#/doc/language/lambda>)), e outras [funções template](<#/doc/language/templates>) (tipicamente membros de class templates) podem ser associadas a uma _restrição_ , que especifica os requisitos para os argumentos de template, que podem ser usados para selecionar as sobrecargas de função e especializações de template mais apropriadas.

Conjuntos nomeados de tais [requisitos](<#/doc/language/requires>) são chamados de _concepts_. Cada concept é um predicado, avaliado em tempo de compilação, e torna-se parte da interface de um template onde é usado como uma restrição:

Execute este código
```cpp
    #include <cstddef>
    #include <concepts>
    #include <functional>
    #include <string>
    
    // Declaration of the concept “Hashable”, which is satisfied by any type “T”
    // such that for values “a” of type “T”, the expression std::hash<T>{}(a)
    // compiles and its result is convertible to std::size_t
    template<typename T>
    concept Hashable = requires(T a)
    {
        { std::hash<T>{}(a) } -> std::convertible_to<std::size_t>;
    };
    
    struct meow {};
    
    // Constrained C++20 function template:
    template<Hashable T>
    void f(T) {}
    //
    // Alternative ways to apply the same constraint:
    // template<typename T>
    //     requires Hashable<T>
    // void f(T) {}
    //
    // template<typename T>
    // void f(T) requires Hashable<T> {}
    //
    // void f(Hashable auto /* parameter-name */) {}
    
    int main()
    {
        using std::operator""s;
    
        f("abc"s);    // OK, std::string satisfies Hashable
        // f(meow{}); // Error: meow does not satisfy Hashable
    }
```

Violações de restrições são detectadas em tempo de compilação, no início do processo de instanciação de template, o que leva a mensagens de erro fáceis de seguir:
```cpp
    std::list<int> l = {3, -1, 10};
    std::sort(l.begin(), l.end()); 
    // Typical compiler diagnostic without concepts:
    // invalid operands to binary expression ('std::_List_iterator<int>' and
    // 'std::_List_iterator<int>')
    //                           std::__lg(__last - __first) * 2);
    //                                     ~~~~~~ ^ ~~~~~~~
    // ... 50 lines of output ...
    //
    // Typical compiler diagnostic with concepts:
    // error: cannot call std::sort with std::_List_iterator<int>
    // note:  concept RandomAccessIterator<std::_List_iterator<int>> was not satisfied
```

A intenção dos concepts é modelar categorias semânticas (Number, Range, RegularFunction) em vez de restrições sintáticas (HasPlus, Array). De acordo com a [diretriz principal T.20 do ISO C++](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#t20-avoid-concepts-without-meaningful-semantics>), "A capacidade de especificar semânticas significativas é uma característica definidora de um verdadeiro concept, em oposição a uma restrição sintática."

### Concepts

Um concept é um conjunto nomeado de [requisitos](<#/doc/language/requires>). A definição de um concept deve aparecer no escopo de namespace.

A definição de um concept tem a forma

---
`template <` template-parameter-list `>` `concept` concept-name attr ﻿(optional) `=` constraint-expression`;`
attr | \- | sequência de qualquer número de [atributos](<#/doc/language/attributes>)
```cpp
    // concept
    template<class T, class U>
    concept Derived = std::is_base_of<U, T>::value;
```

Concepts não podem se referir recursivamente a si mesmos e não podem ser restringidos:
```cpp
    template<typename T>
    concept V = V<T*>; // error: recursive concept
    
    template<class T>
    concept C1 = true;
    template<C1 T>
    concept Error1 = true; // Error: C1 T attempts to constrain a concept definition
    template<class T> requires C1<T>
    concept Error2 = true; // Error: the requires clause attempts to constrain a concept
```

Instanciações explícitas, especializações explícitas ou especializações parciais de concepts não são permitidas (o significado da definição original de uma restrição não pode ser alterado).

Concepts podem ser nomeados em uma id-expression. O valor da id-expression é true se a expressão de restrição for satisfeita, e false caso contrário.

Concepts também podem ser nomeados em uma type-constraint, como parte de

*   [declaração de parâmetro de template de tipo](<#/doc/language/template_parameters>),
*   [especificador de tipo placeholder](<#/doc/language/auto>),
*   [requisito composto](<#/doc/language/requires>).

Em uma type-constraint, um concept recebe um argumento de template a menos do que sua lista de parâmetros exige, porque o tipo deduzido contextualmente é implicitamente usado como o primeiro argumento do concept.
```cpp
    template<class T, class U>
    concept Derived = std::is_base_of<U, T>::value;
    
    template<Derived<Base> T>
    void f(T); // T is constrained by Derived<T, Base>
```

### Restrições

Uma restrição é uma sequência de operações lógicas e operandos que especifica requisitos para argumentos de template. Elas podem aparecer dentro de [requires expressions](<#/doc/language/requires>) ou diretamente como corpos de concepts.

Existem três (até C++26) quatro (desde C++26) tipos de restrições:

1) conjunções

2) disjunções

3) restrições atômicas

4) restrições expandidas por fold | (desde C++26)

A restrição associada a uma declaração é determinada [normalizando](<#/doc/language/constraints>) uma expressão AND lógica cujos operandos estão na seguinte ordem:

1.  a expressão de restrição introduzida para cada [parâmetro de template de tipo](<#/doc/language/template_parameters>) restrito ou parâmetro de template não-tipo declarado com um [tipo placeholder](<#/doc/language/auto>) restrito, na ordem de aparição;
2.  a expressão de restrição na [cláusula requires](<#/doc/language/constraints>) após a lista de parâmetros de template;
3.  a expressão de restrição introduzida para cada parâmetro com [tipo placeholder](<#/doc/language/auto>) restrito em uma declaração de [função template abreviada](<#/doc/language/function_template>);
4.  a expressão de restrição na [cláusula requires](<#/doc/language/constraints>) final.

Esta ordem determina a ordem em que as restrições são instanciadas ao verificar a satisfação.

#### Redeclarações

Uma declaração restrita só pode ser redeclarada usando a mesma forma sintática. Nenhum diagnóstico é exigido:
```cpp
    // These first two declarations of f are fine
    template<Incrementable T>
    void f(T) requires Decrementable<T>;
    
    template<Incrementable T>
    void f(T) requires Decrementable<T>; // OK, redeclaration
    
    // Inclusion of this third, logically-equivalent-but-syntactically-different
    // declaration of f is ill-formed, no diagnostic required
    template<typename T>
        requires Incrementable<T> && Decrementable<T>
    void f(T);
    
    // The following two declarations have different constraints:
    // the first declaration has Incrementable<T> && Decrementable<T>
    // the second declaration has Decrementable<T> && Incrementable<T>
    // Even though they are logically equivalent.
    
    template<Incrementable T> 
    void g(T) requires Decrementable<T>;
    
    template<Decrementable T> 
    void g(T) requires Incrementable<T>; // ill-formed, no diagnostic required
```

#### Conjunções

A conjunção de duas restrições é formada usando o operador `&&` na expressão de restrição:
```cpp
    template<class T>
    concept Integral = std::is_integral<T>::value;
    template<class T>
    concept SignedIntegral = Integral<T> && std::is_signed<T>::value;
    template<class T>
    concept UnsignedIntegral = Integral<T> && !SignedIntegral<T>;
```

Uma conjunção de duas restrições é satisfeita somente se ambas as restrições forem satisfeitas. As conjunções são avaliadas da esquerda para a direita e com curto-circuito (se a restrição da esquerda não for satisfeita, a substituição do argumento de template na restrição da direita não é tentada: isso evita falhas devido à substituição fora do contexto imediato).
```cpp
    template<typename T>
    constexpr bool get_value() { return T::value; }
    
    template<typename T>
        requires (sizeof(T) > 1 && get_value<T>())
    void f(T);   // #1
    
    void f(int); // #2
    
    void g()
    {
        f('A'); // OK, calls #2. When checking the constraints of #1,
                // 'sizeof(char) > 1' is not satisfied, so get_value<T>() is not checked
    }
```

#### Disjunções

A disjunção de duas restrições é formada usando o operador `||` na expressão de restrição.

Uma disjunção de duas restrições é satisfeita se qualquer uma das restrições for satisfeita. As disjunções são avaliadas da esquerda para a direita e com curto-circuito (se a restrição da esquerda for satisfeita, a substituição do argumento de template na restrição da direita não é tentada).
```cpp
    template<class T = void>
        requires EqualityComparable<T> || Same<T, void>
    struct equal_to;
```

#### Restrições atômicas

Uma restrição atômica consiste em uma expressão E e um mapeamento dos parâmetros de template que aparecem dentro de E para argumentos de template envolvendo os parâmetros de template da entidade restrita, chamado de seu _mapeamento de parâmetros_.

Restrições atômicas são formadas durante a [normalização de restrições](<#/doc/language/constraints>). E nunca é uma expressão AND lógica ou OR lógica (essas formam conjunções e disjunções, respectivamente).

A satisfação de uma restrição atômica é verificada substituindo o mapeamento de parâmetros e os argumentos de template na expressão E. Se a substituição resultar em um tipo ou expressão inválida, a restrição não é satisfeita. Caso contrário, E, após qualquer conversão de lvalue para rvalue, deve ser uma expressão constante prvalue do tipo bool, e a restrição é satisfeita se e somente se ela for avaliada como true.

O tipo de E após a substituição deve ser exatamente bool. Nenhuma conversão é permitida:
```cpp
    template<typename T>
    struct S
    {
        constexpr operator bool() const { return true; }
    };
    
    template<typename T>
        requires (S<T>{})
    void f(T);   // #1
    
    void f(int); // #2
    
    void g()
    {
        f(0); // error: S<int>{} does not have type bool when checking #1,
              // even though #2 is a better match
    }
```

Duas restrições atômicas são consideradas _idênticas_ se forem formadas a partir da mesma expressão no nível do código-fonte e seus mapeamentos de parâmetros forem equivalentes.
```cpp
    template<class T>
    constexpr bool is_meowable = true;
    
    template<class T>
    constexpr bool is_cat = true;
    
    template<class T>
    concept Meowable = is_meowable<T>;
    
    template<class T>
    concept BadMeowableCat = is_meowable<T> && is_cat<T>;
    
    template<class T>
    concept GoodMeowableCat = Meowable<T> && is_cat<T>;
    
    template<Meowable T>
    void f1(T); // #1
    
    template<BadMeowableCat T>
    void f1(T); // #2
    
    template<Meowable T>
    void f2(T); // #3
    
    template<GoodMeowableCat T>
    void f2(T); // #4
    
    void g()
    {
        f1(0); // error, ambiguous:
               // the is_meowable<T> in Meowable and BadMeowableCat forms distinct atomic
               // constraints that are not identical (and so do not subsume each other)
    
        f2(0); // OK, calls #4, more constrained than #3
               // GoodMeowableCat got its is_meowable<T> from Meowable
    }
```

#### Restrições expandidas por fold

Uma _restrição expandida por fold_ é formada a partir de uma restrição `C` e um operador fold (ou `&&` ou `||`). Uma restrição expandida por fold é uma [expansão de pack](<#/doc/language/parameter_pack>). Seja N o número de elementos nos parâmetros de expansão de pack:

*   Se a expansão de pack for inválida (como expandir packs de tamanhos diferentes), a restrição expandida por fold não é satisfeita.
*   Se N for ​0​, a restrição expandida por fold é satisfeita se o operador fold for `&&`, ou não satisfeita se o operador fold for `||`.
*   Para uma restrição expandida por fold com um N positivo, para cada i em `[`1`, `N`]`, cada parâmetro de expansão de pack é substituído pelo i-ésimo elemento correspondente em ordem crescente:
    *   Para restrições expandidas por fold cujo operador fold é `&&`, se a substituição do j-ésimo elemento violar `C`, a restrição expandida por fold não é satisfeita. Neste caso, nenhuma substituição ocorre para qualquer i maior que j. Caso contrário, a restrição expandida por fold é satisfeita.
    *   Para restrições expandidas por fold cujo operador fold é `||`, se a substituição do j-ésimo elemento satisfizer `C`, a restrição expandida por fold é satisfeita. Neste caso, nenhuma substituição ocorre para qualquer i maior que j. Caso contrário, a restrição expandida por fold não é satisfeita.

```cpp
    template <class T> concept A = std::is_move_constructible_v<T>;
    template <class T> concept B = std::is_copy_constructible_v<T>;
    template <class T> concept C = A<T> && B<T>;
    
    // in C++23, these two overloads of g() have distinct atomic constraints 
    // that are not identical and so do not subsume each other: calls to g() are ambiguous
    // in C++26, the folds are expanded and constraint on overload #2 (both move and copy
    // required), subsumes constraint on overload #1 (just the move is required)
    template <class... T>
    requires (A<T> && ...) void g(T...); // #1
    
    template <class... T>
    requires (C<T> && ...) void g(T...); // #2
```

| (desde C++26)

#### Normalização de restrições

A _normalização de restrições_ é o processo que transforma uma expressão de restrição em uma sequência de conjunções e disjunções de restrições atômicas. A _forma normal_ de uma expressão é definida da seguinte forma:

*   A forma normal de uma expressão (E) é a forma normal de E.
*   A forma normal de uma expressão E1 && E2 é a conjunção das formas normais de E1 e E2.
*   A forma normal de uma expressão E1 || E2 é a disjunção das formas normais de E1 e E2.
*   A forma normal de uma expressão C<A1, A2, ... , AN>, onde `C` nomeia um concept, é a forma normal da expressão de restrição de `C`, após substituir `A1`, `A2`, ... , `AN` pelos respectivos parâmetros de template de `C` nos mapeamentos de parâmetros de cada restrição atômica de `C`. Se qualquer tal substituição nos mapeamentos de parâmetros resultar em um tipo ou expressão inválida, o programa é malformado, nenhum diagnóstico é exigido.

```cpp
    template<typename T>
    concept A = T::value || true;
    
    template<typename U>
    concept B = A<U*>; // OK: normalized to the disjunction of 
                       // - T::value (with mapping T -> U*) and
                       // - true (with an empty mapping).
                       // No invalid type in mapping even though
                       // T::value is ill-formed for all pointer types
    
    template<typename V>
    concept C = B<V&>; // Normalizes to the disjunction of
                       // - T::value (with mapping T-> V&*) and
                       // - true (with an empty mapping).
                       // Invalid type V&* formed in mapping => ill-formed NDR
```

*   A forma normal das expressões (E && ...) e (... && E) é uma restrição expandida por fold, onde `C` é a forma normal de E e o operador fold é `&&`.
*   A forma normal das expressões (E || ...) e (... || E) é uma restrição expandida por fold, onde `C` é a forma normal de E e o operador fold é `||`.
---|---|---|---|---
*   As formas normais das expressões (E1 && ... && E2) e (E1 || ... || E2) são as formas normais de
    *   (E1 && ...) && E2 e (E1 || ...) || E2 respectivamente, se E1 contiver um pack não expandido, ou
    *   E1 && (... && E2) e E1 || (... || E2) respectivamente, caso contrário.

| (desde C++26)

*   A forma normal de qualquer outra expressão E é a restrição atômica cuja expressão é E e cujo mapeamento de parâmetros é o mapeamento de identidade. Isso inclui todas as [expressões fold](<#/doc/language/fold>), mesmo aquelas que operam sobre os operadores `&&` ou `||`.

Sobrecargas definidas pelo usuário de `&&` ou `||` não têm efeito na normalização de restrições.

### Cláusulas requires

A palavra-chave [`requires`](<#/doc/keyword/requires>) é usada para introduzir uma _cláusula requires_, que especifica restrições em argumentos de template ou em uma declaração de função.
```cpp
    template<typename T>
    void f(T&&) requires Eq<T>; // can appear as the last element of a function declarator
    
    template<typename T> requires Addable<T> // or right after a template parameter list
    T add(T a, T b) { return a + b; }
```

Neste caso, a palavra-chave requires deve ser seguida por alguma expressão constante (então é possível escrever requires true), mas a intenção é que um concept nomeado (como no exemplo acima) ou uma conjunção/disjunção de concepts nomeados ou uma [requires expression](<#/doc/language/requires>) seja usada.

A expressão deve ter uma das seguintes formas:

*   Uma [expressão primária](<#/doc/language/expressions>), por exemplo, Swappable&lt;T&gt;, [std::is_integral](<#/doc/types/is_integral>)&lt;T&gt;::value, ([std::is_object_v](<#/doc/types/is_object>)&lt;Args&gt; && ...), ou qualquer expressão entre parênteses.
*   Uma sequência das expressões primárias unidas pelo operador `&&`.
*   Uma sequência das expressões mencionadas unidas pelo operador `||`.

```cpp
    template<class T>
    constexpr bool is_meowable = true;
    
    template<class T>
    constexpr bool is_purrable() { return true; }
    
    template<class T>
    void f(T) requires is_meowable<T>; // OK
    
    template<class T>
    void g(T) requires is_purrable<T>(); // error, is_purrable<T>() is not a primary expression
    
    template<class T>
    void h(T) requires (is_purrable<T>()); // OK
```

### Ordenação parcial de restrições

Antes de qualquer análise adicional, as restrições são [normalizadas](<#/doc/language/constraints>) substituindo o corpo de cada concept nomeado e cada [requires expression](<#/doc/language/requires>) até que o que reste seja uma sequência de conjunções e disjunções em restrições atômicas.

Uma restrição `P` é dita _subsumir_ a restrição `Q` se puder ser provado que `P` [implica](<https://en.wikipedia.org/wiki/Logical_consequence> "enwiki:Logical consequence") `Q` até a identidade das restrições atômicas em P e Q. (Tipos e expressões não são analisados para equivalência: `N > 0` não subsume `N >= 0`).

Especificamente, primeiro `P` é convertido para a forma normal disjuntiva e `Q` é convertido para a forma normal conjuntiva. `P` subsume `Q` se e somente se:

*   cada cláusula disjuntiva na forma normal disjuntiva de `P` subsume cada cláusula conjuntiva na forma normal conjuntiva de `Q`, onde
*   uma cláusula disjuntiva subsume uma cláusula conjuntiva se e somente se houver uma restrição atômica `U` na cláusula disjuntiva e uma restrição atômica `V` na cláusula conjuntiva tal que `U` subsume `V`;
*   uma restrição atômica `A` subsume uma restrição atômica `B` se e somente se elas forem idênticas usando as regras descritas [acima](<#/doc/language/constraints>).

*   Uma restrição expandida por fold `A` subsume outra restrição expandida por fold `B` se elas tiverem o mesmo operador fold, a restrição `C` de `A` subsumir a de `B`, e ambas `C` contiverem um pack não expandido equivalente.

| (desde C++26)

A relação de subsunção define a ordem parcial das restrições, que é usada para determinar:

*   o melhor candidato viável para uma função não-template na [resolução de sobrecarga](<#/doc/language/overload_resolution>)
*   o [endereço de uma função não-template](<#/doc/language/overloaded_address>) em um conjunto de sobrecarga
*   a melhor correspondência para um argumento de template template
*   ordenação parcial de especializações de class template
*   [ordenação parcial](<#/doc/language/function_template>) de function templates

| Esta seção está incompleta
Razão: backlinks do acima para aqui

Se as declarações `D1` e `D2` forem restritas e as restrições associadas a `D1` subsumirem as restrições associadas a `D2` (ou se `D2` não for restrita), então `D1` é dita ser _pelo menos tão restrita_ quanto `D2`. Se `D1` for pelo menos tão restrita quanto `D2`, e `D2` não for pelo menos tão restrita quanto `D1`, então `D1` é _mais restrita_ que `D2`.

Se todas as seguintes condições forem satisfeitas, uma função não-template `F1` é _mais restrita por ordenação parcial_ que uma função não-template `F2`:

*   Elas têm a mesma lista de tipos de parâmetros, omitindo os tipos de [parâmetros de objeto explícitos](<#/doc/language/member_functions>) (desde C++23).
*   Se forem funções membro, ambas são membros diretos da mesma classe.
*   Se ambas forem funções membro não-estáticas, elas têm os mesmos tipos para seus parâmetros de objeto.
*   `F1` é mais restrita que `F2`.

```cpp
    template<typename T>
    concept Decrementable = requires(T t) { --t; };
    template<typename T>
    concept RevIterator = Decrementable<T> && requires(T t) { *t; };
    
    // RevIterator subsumes Decrementable, but not the other way around
    
    template<Decrementable T>
    void f(T); // #1
    
    template<RevIterator T>
    void f(T); // #2, more constrained than #1
    
    f(0);       // int only satisfies Decrementable, selects #1
    f((int*)0); // int* satisfies both constraints, selects #2 as more constrained
    
    template<class T>
    void g(T); // #3 (unconstrained)
    
    template<Decrementable T>
    void g(T); // #4
    
    g(true); // bool does not satisfy Decrementable, selects #3
    g(0);    // int satisfies Decrementable, selects #4 because it is more constrained
    
    template<typename T>
    concept RevIterator2 = requires(T t) { --t; *t; };
    
    template<Decrementable T>
    void h(T); // #5
    
    template<RevIterator2 T>
    void h(T); // #6
    
    h((int*)0); // ambiguous
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_concepts`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [Restrições](<#/doc/language/constraints>)
[`202002L`](<#/>) | (C++20) | [Funções membro especiais](<#/doc/language/member_functions>) condicionalmente triviais

### Palavras-chave

[`concept`](<#/doc/keyword/concept>), [`requires`](<#/doc/keyword/requires>), [`typename`](<#/doc/keywords/typename>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 2428](<https://cplusplus.github.io/CWG/issues/2428.html>) | C++20 | não podia aplicar atributos a concepts | permitido

### Veja também

*   [Concepts TS](<#/doc/experimental/constraints>)
*   [Requisitos nomeados](<#/doc/named_req>)

[Requires expression](<#/doc/language/requires>) (C++20) | produz uma expressão prvalue do tipo bool que descreve as restrições
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.