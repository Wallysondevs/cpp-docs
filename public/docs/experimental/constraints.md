# Restrições e conceitos

Esta página descreve uma funcionalidade experimental da linguagem central. Para requisitos de tipo nomeados usados na especificação da standard library, veja [requisitos nomeados](<#/doc/named_req>)

[Class templates](<#/doc/language/class_template>), [function templates](<#/doc/language/function_template>), e funções não-template (tipicamente membros de class templates) podem ser associados a uma _restrição_, que especifica os requisitos para os argumentos de template, que podem ser usados para selecionar as sobrecargas de função e especializações de template mais apropriadas.

Restrições também podem ser usadas para limitar a dedução automática de tipo em declarações de variáveis e tipos de retorno de funções apenas aos tipos que satisfazem os requisitos especificados.

Conjuntos nomeados de tais requisitos são chamados de _concepts_. Cada concept é um predicado, avaliado em tempo de compilação, e se torna parte da interface de um template onde é usado como uma restrição:

Execute este código
```
    #include <string>
    #include <locale>
    using namespace std::literals;
    
    // Declaration of the concept "EqualityComparable", which is satisfied by
    // any type T such that for values a and b of type T,
    // the expression a==b compiles and its result is convertible to bool
    template<typename T>
    concept bool EqualityComparable = requires(T a, T b) {
        { a == b } -> bool;
    };
    
    void f(EqualityComparable&&); // declaration of a constrained function template
    // template<typename T>
    // void f(T&&) requires EqualityComparable<T>; // long form of the same
    
    int main() {
      f("abc"s); // OK, std::string is EqualityComparable
      f(std::use_facet<std::ctype<char>>(std::locale{})); // Error: not EqualityComparable
    }
```

Violações de restrições são detectadas em tempo de compilação, cedo no processo de instanciação do template, o que leva a mensagens de erro fáceis de seguir.
```
    std::list<int> l = {3,-1,10};
    std::sort(l.begin(), l.end());
    //Typical compiler diagnostic without concepts:
    //  invalid operands to binary expression ('std::_List_iterator<int>' and
    //  'std::_List_iterator<int>')
    //                           std::__lg(__last - __first) * 2);
    //                                     ~~~~~~ ^ ~~~~~~~
    // ... 50 lines of output ...
    //
    //Typical compiler diagnostic with concepts:
    //  error: cannot call std::sort with std::_List_iterator<int>
    //  note:  concept RandomAccessIterator<std::_List_iterator<int>> was not satisfied
```

A intenção dos concepts é modelar categorias semânticas (Number, Range, RegularFunction) em vez de restrições sintáticas (HasPlus, Array). De acordo com a [diretriz central T.20 do ISO C++](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#t20-avoid-concepts-without-meaningful-semantics>), "A capacidade de especificar uma semântica significativa é uma característica definidora de um verdadeiro concept, em oposição a uma restrição sintática."

Se o teste de funcionalidade for suportado, as funcionalidades descritas aqui são indicadas pela macro constante __cpp_concepts com um valor igual ou maior que 201507.

### Placeholders

O placeholder não-restrito `auto` e _placeholders restritos_ que têm a forma `concept-name` `<` `template-argument-list`(opcional)`>`, são placeholders para o tipo que será deduzido.

Placeholders podem aparecer em declarações de variáveis (nesse caso, são deduzidos do inicializador) ou em tipos de retorno de funções (nesse caso, são deduzidos das instruções de retorno)
```
    std::pair<auto, auto> p2 = std::make_pair(0, 'a'); // first auto is int,
                                                       // second auto is char
    
    Sortable x = f(y); // the type of x is deduced from the return type of f,
                       // only compiles if the type satisfies the constraint Sortable
    
    auto f(Container) -> Sortable; // return type is deduced from the return statement
                                   // only compiles if the type satisfies Sortable
```

Placeholders também podem aparecer em parâmetros, nesse caso, eles transformam declarações de funções em declarações de template (restritas se o placeholder for restrito)
```
    void f(std::pair<auto, EqualityComparable>); // this is a template with two parameters:
           // unconstrained type parameter and a constrained non-type parameter
```

Placeholders restritos podem ser usados em qualquer lugar onde `auto` possa ser usado, por exemplo, em declarações de lambda genéricas
```
    auto gl =  { a = *b; };
```

Se um especificador de tipo restrito designa um não-tipo ou um template, mas é usado como um placeholder restrito, o programa é malformado:
```
    template<size_t N> concept bool Even = (N%2 == 0);
    struct S1 { int n; };
    int Even::* p2 = &S1::n; // error, invalid use of a non-type concept
    void f(std::array<auto, Even>); // error, invalid use of a non-type concept
    template<Even N> void f(std::array<auto, N>); // OK
```

### Templates abreviados

Se um ou mais placeholders aparecem em uma lista de parâmetros de função, a declaração da função é, na verdade, uma declaração de function template, cuja lista de parâmetros de template inclui um parâmetro inventado para cada placeholder único, na ordem de aparição
```
    // short form
    void g1(const EqualityComparable*, Incrementable&);
    // long form:
    // template<EqualityComparable T, Incrementable U> void g1(const T*, U&);
    // longer form:
    // template<typename T, typename U>
    // void g1(const T*, U&) requires EqualityComparable<T> && Incrementable<U>;
    
    void f2(std::vector<auto*>...);
    // long form: template<typename... T> void f2(std::vector<T*>...);
    
    void f4(auto (auto::*)(auto));
    // long form: template<typename T, typename U, typename V> void f4(T (U::*)(V));
```

Todos os placeholders introduzidos por especificadores de tipo restritos equivalentes têm o mesmo parâmetro de template inventado. No entanto, cada especificador não-restrito (`auto`) sempre introduz um parâmetro de template diferente
```
    void f0(Comparable a, Comparable* b);
    // long form: template<Comparable T> void f0(T a, T* b);
    
    void f1(auto a, auto* b);
    // long form: template<typename T, typename U> f1(T a, U* b);
```

Tanto function templates quanto class templates podem ser declarados usando uma _introdução de template_, que tem a sintaxe `concept-name` `{` `parameter-list`(opcional)`}`, nesse caso, a palavra-chave `template` não é necessária: cada parâmetro da `parameter-list` da introdução de template se torna um parâmetro de template cujo tipo (type, non-type, template) é determinado pelo tipo do parâmetro correspondente no concept nomeado.

Além de declarar um template, a introdução de template associa uma _restrição de predicado_ (veja abaixo) que nomeia (para variable concepts) ou invoca (para function concepts) o concept nomeado pela introdução.
```
    EqualityComparable{T} class Foo;
    // long form: template<EqualityComparable T> class Foo;
    // longer form: template<typename T> requires EqualityComparable<T> class Foo;
    
    template<typename T, int N, typename... Xs> concept bool Example = ...;
    Example{A, B, ...C} struct S1;
    // long form template<class A, int B, class... C> requires Example<A,B,C...> struct S1;
```

Para function templates, a introdução de template pode ser combinada com placeholders:
```
    Sortable{T} void f(T, auto);
    // long form: template<Sortable T, typename U> void f(T, U);
    // alternative using only placeholders: void f(Sortable, auto);
```

| Esta seção está incompleta
Razão: ajustar as páginas de declaração de template para linkar aqui

### Concepts

Um concept é um conjunto nomeado de requisitos. A definição de um concept aparece no escopo de namespace e tem a forma de uma definição de [function template](<#/doc/language/function_template>) (nesse caso, é chamado de _function concept_) ou uma definição de [variable template](<#/doc/language/variable_template>) (nesse caso, é chamado de _variable concept_). A única diferença é que a palavra-chave `concept` aparece na `decl-specifier-seq`:
```
    // variable concept from the standard library (Ranges TS)
    template <class T, class U>
    concept bool Derived = std::is_base_of<U, T>::value;
    
    // function concept from the standard library (Ranges TS)
    template <class T>
    concept bool EqualityComparable() {
        return requires(T a, T b) { {a == b} -> Boolean; {a != b} -> Boolean; };
    }
```

As seguintes restrições se aplicam a function concepts:

  * `inline` e `constexpr` não são permitidos, a função é automaticamente `inline` e `constexpr`
  * `friend` e `virtual` não são permitidos
  * especificação de exceção não é permitida, a função é automaticamente `noexcept(true)`.
  * não pode ser declarada e definida posteriormente, não pode ser redeclarada
  * o tipo de retorno deve ser `bool`
  * dedução de tipo de retorno não é permitida
  * a lista de parâmetros deve ser vazia
  * o corpo da função deve consistir apenas em uma instrução `return`, cujo argumento deve ser uma _constraint-expression_ (restrição de predicado, conjunção/disjunção de outras restrições, ou uma requires-expression, veja abaixo)

As seguintes restrições se aplicam a variable concepts:

  * Deve ter o tipo `bool`
  * Não pode ser declarado sem um inicializador
  * Não pode ser declarado ou no escopo de classe.
  * `constexpr` não é permitido, a variável é automaticamente `constexpr`
  * o inicializador deve ser uma constraint expression (restrição de predicado, conjunção/disjunção de restrições, ou uma requires-expression, veja abaixo)

Concepts não podem se referir recursivamente a si mesmos no corpo da função ou no inicializador da variável:
```
    template<typename T>
    concept bool F() { return F<typename T::type>(); } // error
    template<typename T>
    concept bool V = V<T*>; // error
```

Instanciações explícitas, especializações explícitas ou especializações parciais de concepts não são permitidas (o significado da definição original de uma restrição não pode ser alterado)

### Restrições

Uma restrição é uma sequência de operações lógicas que especifica requisitos para argumentos de template. Elas podem aparecer dentro de _requires-expression_s (veja abaixo) e diretamente como corpos de concepts

Existem 9 tipos de restrições:

1) conjunções
2) disjunções
3) restrições de predicado
4) restrições de expressão (apenas em uma _requires-expression_)
5) restrições de tipo (apenas em uma _requires-expression_)
6) restrições de conversão implícita (apenas em uma _requires-expression_)
7) restrições de dedução de argumento (apenas em uma _requires-expression_)
8) restrições de exceção (apenas em uma _requires-expression_)
9) restrições parametrizadas (apenas em uma _requires-expression_)

Os três primeiros tipos de restrições podem aparecer diretamente como o corpo de um concept ou como uma requires-clause ad-hoc:
```
    template<typename T>
    requires // requires-clause (restrição ad-hoc)
    sizeof(T) > 1 && get_value<T>() // conjunção de duas restrições de predicado
    void f(T);
```

Quando múltiplas restrições são anexadas à mesma declaração, a restrição total é uma conjunção na seguinte ordem: a restrição introduzida pela _introdução de template_, restrições para cada parâmetro de template na ordem de aparição, a _requires_ clause após a lista de parâmetros de template, restrições para cada parâmetro de função na ordem de aparição, cláusula _requires_ final:
```
    // as declarações declaram o mesmo function template restrito
    // com a restrição Incrementable<T> && Decrementable<T>
    template<Incrementable T> void f(T) requires Decrementable<T>;
    template<typename T> requires Incrementable<T> && Decrementable<T> void f(T); // ok
    
    // as duas declarações a seguir têm restrições diferentes:
    // a primeira declaração tem Incrementable<T> && Decrementable<T>
    // a segunda declaração tem Decrementable<T> && Incrementable<T>
    // Embora sejam logicamente equivalentes.
    // A segunda declaração é malformada, nenhum diagnóstico é exigido
    
    template<Incrementable T> requires Decrementable<T> void g();
    template<Decrementable T> requires Incrementable<T> void g(); // erro
```

#### Conjunções

A conjunção das restrições `P` e `Q` é especificada como P && Q.
```
    // concepts de exemplo da standard library (Ranges TS)
    template <class T>
    concept bool Integral = std::is_integral<T>::value;
    template <class T>
    concept bool SignedIntegral = Integral<T> && std::is_signed<T>::value;
    template <class T>
    concept bool UnsignedIntegral = Integral<T> && !SignedIntegral<T>;
```

Uma conjunção de duas restrições é satisfeita apenas se ambas as restrições forem satisfeitas. Conjunções são avaliadas da esquerda para a direita e com curto-circuito (se a restrição da esquerda não for satisfeita, a substituição do argumento de template na restrição da direita não é tentada: isso evita falhas devido à substituição fora do contexto imediato). Sobrecargas definidas pelo usuário de `operator&&` não são permitidas em conjunções de restrições.

#### Disjunções

A disjunção das restrições `P` e `Q` é especificada como P || Q.

Uma disjunção de duas restrições é satisfeita se qualquer uma das restrições for satisfeita. Disjunções são avaliadas da esquerda para a direita e com curto-circuito (se a restrição da esquerda for satisfeita, a dedução do argumento de template na restrição da direita não é tentada). Sobrecargas definidas pelo usuário de `operator||` não são permitidas em disjunções de restrições.
```
    // restrição de exemplo da standard library (Ranges TS)
    template <class T = void>
    requires EqualityComparable<T>() || Same<T, void>
    struct equal_to;
```

#### Restrições de predicado

Uma restrição de predicado é uma expressão constante do tipo `bool`. Ela é satisfeita apenas se for avaliada como `true`
```
    template<typename T> concept bool Size32 = sizeof(T) == 4;
```

Restrições de predicado podem especificar requisitos para parâmetros de template não-tipo e para argumentos de template template.

Restrições de predicado devem ser avaliadas diretamente para `bool`, sem conversões permitidas:
```
    template<typename T> struct S {
        constexpr explicit operator bool() const { return true; }
    };
    template<typename T>
    requires S<T>{} // restrição de predicado inválida: S<T>{} não é bool
    void f(T);
    f(0); // erro: restrição nunca satisfeita
```

### Requisitos

A palavra-chave `requires` é usada de duas maneiras:

1) Para introduzir uma _requires-clause_, que especifica restrições em argumentos de template ou em uma declaração de função.
```
    template<typename T>
    void f(T&&) requires Eq<T>; // pode aparecer como o último elemento de um declarador de função
    
    template<typename T> requires Addable<T> // ou logo após uma lista de parâmetros de template
    T add(T a, T b) { return a + b; }
```

Nesse caso, a palavra-chave _requires_ deve ser seguida por alguma expressão constante (então é possível escrever "requires true;"), mas a intenção é que um concept nomeado (como no exemplo acima) ou uma conjunção/disjunção de concepts nomeados ou uma _requires-expression_ seja usada.

2) Para iniciar uma _requires-expression_, que é uma expressão prvalue do tipo `bool` que descreve as restrições em alguns argumentos de template. Tal expressão é `true` se o concept correspondente for satisfeito, e `false` caso contrário:
```
    template<typename T>
    concept bool Addable = requires (T x) { x + x; }; // requires-expression
    
    template<typename T> requires Addable<T> // requires-clause, não requires-expression
    T add(T a, T b) { return a + b; }
    
    template<typename T>
    requires requires (T x) { x + x; } // restrição ad-hoc, note a palavra-chave usada duas vezes
    T add(T a, T b) { return a + b; }
```

A sintaxe de _requires-expression_ é a seguinte:

---
`requires` `(` parameter-list(opcional) `)` `{` requirement-seq `}`
- **parameter-list** — uma lista de parâmetros separada por vírgulas, como em uma declaração de função, exceto que argumentos padrão não são permitidos e o último parâmetro não pode ser uma reticência. Esses parâmetros não têm armazenamento, ligação ou tempo de vida. Esses parâmetros estão no escopo até o `}` de fechamento da `requirement-seq`. Se nenhum parâmetro for usado, os parênteses redondos também podem ser omitidos
- **requirement-seq** — sequência de _requisitos_ separada por espaços em branco, descrita abaixo (cada requisito termina com um ponto e vírgula). Cada requisito adiciona outra restrição à _conjunção_ de restrições que esta requires-expression define.

Cada requisito na `requirements-seq` é um dos seguintes:

  * requisito simples
  * requisitos de tipo
  * requisitos compostos
  * requisitos aninhados

Requisitos podem se referir aos parâmetros de template que estão no escopo e aos parâmetros locais introduzidos na `parameter-list`. Quando parametrizada, uma requires-expression é dita introduzir uma _restrição parametrizada_

A substituição de argumentos de template em uma requires-expression pode resultar na formação de tipos ou expressões inválidos em seus requisitos. Nesses casos,

  * Se uma falha de substituição ocorrer em uma requires-expression que é usada fora de uma declaração de [entidade template](<#/doc/language/templates>), então o programa é malformado.
  * Se a requires-expression for usada em uma declaração de uma [entidade template](<#/doc/language/templates>), a restrição correspondente é tratada como "não satisfeita" e a [falha de substituição não é um erro](<#/doc/language/sfinae>), no entanto
  * Se uma falha de substituição ocorreria em uma requires-expression para cada argumento de template possível, o programa é malformado, nenhum diagnóstico é exigido:

```
    template<class T> concept bool C = requires {
        new int[-(int)sizeof(T)]; // inválido para todo T: malformado, nenhum diagnóstico é exigido
    };
```

#### Requisitos simples

Um requisito simples é uma instrução de expressão arbitrária. O requisito é que a expressão seja válida (esta é uma _restrição de expressão_). Ao contrário das restrições de predicado, a avaliação não ocorre, apenas a correção da linguagem é verificada.
```
    template<typename T>
    concept bool Addable =
    requires (T a, T b) {
        a + b; // "a expressão a+b é uma expressão válida que irá compilar"
    };
    
    // restrição de exemplo da standard library (ranges TS)
    template <class T, class U = T>
    concept bool Swappable = requires(T&& t, U&& u) {
        swap(std::forward<T>(t), std::forward<U>(u));
        swap(std::forward<U>(u), std::forward<T>(t));
    };
```

#### Requisitos de tipo

Um requisito de tipo é a palavra-chave `typename` seguida por um nome de tipo, opcionalmente qualificado. O requisito é que o tipo nomeado exista (uma _restrição de tipo_): isso pode ser usado para verificar se um determinado tipo aninhado nomeado existe, ou se uma especialização de class template nomeia um tipo, ou se um alias template nomeia um tipo.
```
    template<typename T> using Ref = T&;
    template<typename T> concept bool C =
    requires {
        typename T::inner; // nome de membro aninhado exigido
        typename S<T>;     // especialização de class template exigida
        typename Ref<T>;   // substituição de alias template exigida
    };
    
    //Concept de exemplo da standard library (Ranges TS)
    template <class T, class U> using CommonType = std::common_type_t<T, U>;
    template <class T, class U> concept bool Common =
    requires (T t, U u) {
        typename CommonType<T, U>; // CommonType<T, U> é válido e nomeia um tipo
        { CommonType<T, U>{std::forward<T>(t)} };
        { CommonType<T, U>{std::forward<U>(u)} };
    };
```

#### Requisitos Compostos

Um requisito composto tem a forma

---
`{` expression `}` `noexcept`(opcional) trailing-return-type(opcional) `;`

e especifica uma conjunção das seguintes restrições:

1) expression é uma expressão válida (_restrição de expressão_)
2) Se `noexcept` for usado, expression também deve ser `noexcept` (_restrição de exceção_)
3) Se `trailing-return-type` que nomeia um tipo que usa placeholders, o tipo deve ser dedutível do tipo da expressão (_restrição de dedução de argumento_)
4) Se `trailing-return-type` que nomeia um tipo que não usa placeholders, então mais duas restrições são adicionadas:
4a) o tipo nomeado por `trailing-return-type` é válido (_restrição de tipo_)
4b) o resultado da expressão é [implicitamente conversível](<#/doc/language/implicit_cast>) para esse tipo (_restrição de conversão implícita_)
```
    template<typename T> concept bool C2 =
    requires(T x) {
        {*x} -> typename T::inner; // a expressão *x deve ser válida
                                   // E o tipo T::inner deve ser válido
                                   // E o resultado de *x deve ser conversível para T::inner
    };
    
    // Concept de exemplo da standard library (Ranges TS)
    template <class T, class U> concept bool Same = std::is_same<T,U>::value;
    template <class B> concept bool Boolean =
    requires(B b1, B b2) {
        { bool(b1) }; // a restrição de inicialização direta deve usar expressão
        { !b1 } -> bool; // restrição composta
        requires Same<decltype(b1 && b2), bool>; // restrição aninhada, veja abaixo
        requires Same<decltype(b1 || b2), bool>;
    };
```

#### Requisitos aninhados

Um requisito aninhado é outra _requires-clause_, terminada com um ponto e vírgula. Isso é usado para introduzir _restrições de predicado_ (veja acima) expressas em termos de outros concepts nomeados aplicados aos parâmetros locais (fora de uma requires clause, restrições de predicado não podem usar parâmetros, e colocar uma expressão diretamente em uma requires clause a torna uma restrição de expressão, o que significa que ela não é avaliada)
```
    // restrição de exemplo do Ranges TS
    template <class T>
    concept bool Semiregular = DefaultConstructible<T> &&
        CopyConstructible<T> && Destructible<T> && CopyAssignable<T> &&
    requires(T a, size_t n) {
        requires Same<T*, decltype(&a)>;  // aninhado: "Same<...> avalia para true"
        { a.~T() } noexcept;  // composto: "a.~T()" é uma expressão válida que não lança exceção
        requires Same<T*, decltype(new T)>; // aninhado: "Same<...> avalia para true"
        requires Same<T*, decltype(new T[n])>; // aninhado
        { delete new T };  // composto
        { delete new T[n] }; // composto
    };
```

### Resolução de concept

Como qualquer outro function template, um function concept (mas não um variable concept) pode ser sobrecarregado: múltiplas definições de concept podem ser fornecidas, todas usando o mesmo `concept-name`.

A resolução de concept é realizada quando um `concept-name` (que pode ser qualificado) aparece em

1) um especificador de tipo restrito `void f(Concept); std::vector<Concept> x = ...;`
2) um parâmetro restrito `template<Concept T> void f();`
3) uma introdução de template `Concept{T} struct X;`
4) uma _constraint-expression_ `template<typename T> void f() requires Concept<T>;`
```
    template<typename T> concept bool C() { return true; } // #1
    template<typename T, typename U> concept bool C() { return true; } // #2
    void f(C); // o conjunto de concepts referidos por C inclui tanto #1 quanto #2;
               // a resolução de concept (veja abaixo) seleciona #1.
```

Para realizar a resolução de concept, os _parâmetros de template_ de cada concept que corresponde ao nome (e à qualificação, se houver) são comparados a uma sequência de _argumentos de concept_, que são argumentos de template e _wildcards_. Um wildcard pode corresponder a um parâmetro de template de qualquer tipo (type, non-type, template). O conjunto de argumentos é construído de forma diferente, dependendo do contexto

1) Para um nome de concept usado como parte de um especificador de tipo restrito ou parâmetro, se o nome do concept for usado sem uma lista de parâmetros, a lista de argumentos é um único wildcard.
```
    template<typename T> concept bool C1() { return true; } // #1
    template<typename T, typename U> concept bool C1() { return true; } // #2
    void f1(const C1*); // <wildcard> corresponde a <T>, seleciona #1
```

2) Para um nome de concept usado como parte de um especificador de tipo restrito ou parâmetro, se o nome do concept for usado com uma lista de argumentos de template, a lista de argumentos é um único wildcard seguido por essa lista de argumentos.
```
    template<typename T> concept bool C1() { return true; } // #1
    template<typename T, typename U> concept bool C1() { return true; } // #2
    void f2(C1<char>); // <wildcard, char> corresponde a <T, U>, seleciona #2
```

3) Se um concept aparece em uma introdução de template, a lista de argumentos é uma sequência de placeholders tão longa quanto a lista de parâmetros na introdução de template
```
    template<typename... Ts>
    concept bool C3 = true;
    C3{T} void q2();     // OK: <T> corresponde a <...Ts>
    C3{...Ts} void q1(); // OK: <...Ts> corresponde a <...Ts>
```

4) Se um concept aparece como o nome de um template-id, a lista de argumentos do concept é exatamente a sequência de argumentos desse template-id
```
    template<typename T> concept bool C() { return true; } // #1
    template<typename T, typename U> concept bool C() { return true; } // #2
    
    template <typename T>
    void f(T) requires C<T>(); // corresponde a #1
```

A resolução de concept é realizada comparando cada argumento com o parâmetro correspondente de cada concept visível. Argumentos de template padrão (se usados) são instanciados para cada parâmetro que não corresponde a um argumento, e são então anexados à lista de argumentos. Um parâmetro de template corresponde a um argumento apenas se tiver o mesmo tipo (type, non-type, template), a menos que o argumento seja um wildcard. Um parameter pack corresponde a zero ou mais argumentos, desde que todos os argumentos correspondam ao padrão em tipo (a menos que sejam wildcards).

Se qualquer argumento não corresponder ao seu parâmetro correspondente ou se houver mais argumentos do que parâmetros e o último parâmetro não for um pack, o concept não é viável. Se houver zero ou mais de um concept viável, o programa é malformado.
```
    template<typename T> concept bool C2() { return true; }
    template<int T> concept bool C2() { return true; }
    
    template<C2<0> T> struct S1; // erro: <wildcard, 0> corresponde
                                 // nem <typename T> nem <int T>
    template<C2 T> struct S2; // ambos #1 e #2 correspondem: erro
```

| Esta seção está incompleta
Razão: precisa de um exemplo com concepts significativos, não esses placeholders 'return true'

### Ordenação parcial de restrições

Antes de qualquer análise adicional, as restrições são _normalizadas_ substituindo o corpo de cada concept nomeado e cada requires expression até que o que resta seja uma sequência de conjunções e disjunções em restrições atômicas, que são restrições de predicado, restrições de expressão, restrições de tipo, restrições de conversão implícita, restrições de dedução de argumento e restrições de exceção.

O concept `P` é dito _subsumir_ o concept `Q` se puder ser provado que `P` [implica](<https://en.wikipedia.org/wiki/Logical_consequence> "enwiki:Logical consequence") `Q` sem analisar tipos e expressões para equivalência (assim `N >= 0` não subsume `N > 0`)

Especificamente, primeiro `P` é convertido para a forma normal disjuntiva e `Q` é convertido para a forma normal conjuntiva, e são comparados da seguinte forma:

  * cada restrição atômica `A` subsume a restrição atômica equivalente `A`
  * cada restrição atômica `A` subsume uma disjunção `A||B` e não subsume uma conjunção `A&&B`
---|---|---
  * cada conjunção `A&&B` subsume `A`, mas uma disjunção `A||B` não subsume `A`

A relação de subsumpção define a ordem parcial das restrições, que é usada para determinar:

  * o melhor candidato viável para uma função não-template em [resolução de sobrecarga](<#/doc/language/overload_resolution>)
  * o [endereço de uma função não-template](<#/doc/language/overloaded_address>) em um conjunto de sobrecargas
  * a melhor correspondência para um argumento de template template
  * ordenação parcial de especializações de class template
  * [ordenação parcial](<#/doc/language/function_template>) de function templates

| Esta seção está incompleta
Razão: links de retorno do texto acima para cá

Se as declarações `D1` e `D2` são restritas e as restrições normalizadas de D1 subsumem as restrições normalizadas de D2 (ou se D1 é restrita e D2 é não-restrita), então D1 é dita ser _pelo menos tão restrita_ quanto D2. Se D1 é pelo menos tão restrita quanto D2 e D2 não é pelo menos tão restrita quanto D1, então D1 é _mais restrita_ que D2.
```
    template<typename T>
    concept bool Decrementable = requires(T t) { --t; };
    template<typename T>
    concept bool RevIterator = Decrementable<T> && requires(T t) { *t; };
    
    // RevIterator subsume Decrementable, mas não o contrário
    // RevIterator é mais restrita que Decrementable
    
    void f(Decrementable); // #1
    void f(RevIterator);   // #2
    
    f(0);       // int satisfaz apenas Decrementable, seleciona #1
    f((int*)0); // int* satisfaz ambas as restrições, seleciona #2 como mais restrita
    
    void g(auto);          // #3 (não-restrita)
    void g(Decrementable); // #4
    
    g(true);  // bool não satisfaz Decrementable, seleciona #3
    g(0);     // int satisfaz Decrementable, seleciona #4 porque é mais restrita
```

### Palavras-chave

[`concept`](<#/doc/keyword/concept>), [`requires`](<#/doc/keyword/requires>)

### Suporte do compilador

GCC >= 6.1 suporta esta especificação técnica (opção necessária -fconcepts)