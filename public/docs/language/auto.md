# Especificadores de tipo placeholder (desde C++11)

Um especificador de tipo placeholder designa um _tipo placeholder_ que será substituído posteriormente, tipicamente por dedução a partir de um [inicializador](<#/doc/language/initialization>).

### Sintaxe

---
```cpp
type-constraint ﻿(opcional) `auto`  // (1)
type-constraint ﻿(opcional) `decltype(auto)`  // (2) (desde C++14)
```
- **type-constraint** — (desde C++20) um nome de [concept](<#/doc/language/constraints>), opcionalmente qualificado, opcionalmente seguido por uma lista de argumentos de template entre `< >`

1) O tipo é deduzido usando as regras para [dedução de argumentos de template](<#/doc/language/template_argument_deduction>).

2) O tipo é [`decltype(expr)`](<#/doc/language/decltype>), onde expr é o inicializador ou os usados em declarações de retorno.

O placeholder auto pode ser acompanhado por modificadores, como const ou `&`, que participarão da dedução de tipo. O placeholder decltype(auto) deve ser o único constituinte do tipo declarado. (desde C++14)

Se type-constraint estiver presente, seja `T` o tipo deduzido para o placeholder, o type-constraint introduz uma [expressão de restrição](<#/doc/language/constraints>) da seguinte forma:

*   Se type-constraint for `Concept<A1, ..., An>`, então a expressão de restrição é `Concept<T, A1, ..., An>`;
*   caso contrário (type-constraint é `Concept` sem uma lista de argumentos), a expressão de restrição é `Concept<T>`.

A dedução falha se a expressão de restrição for inválida ou retornar false. | (desde C++20)

### Explicação

Um especificador de tipo placeholder pode aparecer nos seguintes contextos:

#### Declarações de parâmetro

Nas seguintes declarações de parâmetro, o tipo do parâmetro declarado pode ser da sintaxe (1):

*   Se um parâmetro de uma [expressão lambda](<#/doc/language/lambda>) tiver um tipo placeholder, a expressão lambda é uma lambda genérica.

| (desde C++14)

*   Se um [parâmetro de template não-tipo](<#/doc/language/template_parameters>) tiver um tipo placeholder, seu tipo é deduzido do argumento de template correspondente.

| (desde C++17)

*   Se um parâmetro de uma [declaração de função](<#/doc/language/function>) tiver um tipo placeholder, um [template de função abreviado](<#/doc/language/function_template>) é declarado.

| (desde C++20)

#### Declarações de função

Um tipo placeholder pode aparecer nos [especificadores de declaração](<#/doc/language/declarations>) para um [declarador de função](<#/doc/language/function>) que inclui um tipo de retorno final.

Um tipo placeholder pode aparecer nos especificadores de declaração ou [especificadores de tipo](<#/doc/language/declarations>) no tipo de retorno declarado de um [declarador de função](<#/doc/language/function>). A [dedução do tipo de retorno](<#/doc/language/function>) será aplicada neste caso. | (desde C++14)
```cpp
    auto f() -> int; // OK: f retorna int
    auto g() { return 0.0; } // OK desde C++14: g retorna double
    auto h(); // OK desde C++14: o tipo de retorno de h será deduzido quando for definido
```

#### Declarações de variável

O tipo de uma variável declarada usando um tipo placeholder é deduzido de seu [inicializador](<#/doc/language/initialization>). Este uso é permitido em uma declaração de inicialização de uma variável.

O tipo placeholder só pode aparecer como um dos [especificadores de declaração](<#/doc/language/declarations>) na sequência de especificadores de declaração ou como um dos especificadores de tipo em um tipo de retorno final que especifica o tipo que substitui tal especificador de declaração. Neste caso, a declaração deve declarar pelo menos uma variável, e cada variável deve ter um inicializador não vazio.
```cpp
    // “auto”s em especificadores de declaração
    auto x = 5; // OK: x tem o tipo int
    const auto *v = &x, u = 6; // OK: v tem o tipo const int*, u tem o tipo const int
    static auto y = 0.0; // OK: y tem o tipo double
    
    auto f() -> int;
    auto (*fp)() -> auto = f; // OK: o “auto” no tipo de retorno final
                              // pode ser deduzido de f
```

#### Declarações de structured binding

O especificador auto pode ser usado em uma declaração de [structured binding](<#/doc/language/structured_binding>). | (desde C++17)

#### Expressões new

Um tipo placeholder pode ser usado na sequência de especificadores de tipo do type-id de uma [expressão new](<#/doc/language/new>). Em tal type-id, o tipo placeholder deve aparecer como um dos especificadores de tipo na sequência de especificadores de tipo ou um tipo de retorno final que especifica o tipo que substitui tal especificador de tipo.

#### Conversão de tipo estilo função

O especificador de tipo auto pode ser usado como o especificador de tipo de uma [conversão de tipo estilo função](<#/doc/language/explicit_cast>). | (desde C++23)

### Notas

Até C++11, auto tinha a semântica de um [especificador de duração de armazenamento](<#/doc/language/storage_duration>).

Um programa que usa um tipo placeholder em um contexto não explicitamente declarado acima é malformado.

Se uma declaração declara múltiplas entidades, e a sequência de especificadores de declaração usa um tipo placeholder, o programa é malformado se qualquer uma das seguintes condições for satisfeita:

*   Algumas das entidades declaradas não são variáveis.
*   O tipo que substitui o tipo placeholder não é o mesmo em cada dedução.

```cpp
    auto f() -> int, i = 0; // Erro: declara uma função e uma variável com “auto”
    auto a = 5, b = {1, 2}; // Erro: tipos diferentes para “auto”
```

A palavra-chave auto também pode ser usada em um especificador de nome aninhado. Um especificador de nome aninhado na forma auto:: é um placeholder que é substituído por um tipo de classe ou enumeração seguindo as regras para dedução de placeholder de [tipo restrito](<#/doc/experimental/constraints>). | (concepts TS)
---|---|---|---
Feature-test macro | Value | Std | Feature
[`__cpp_decltype_auto`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | decltype(auto)

### Palavras-chave

[`auto`](<#/doc/keyword/auto>), [`decltype`](<#/doc/keyword/decltype>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    template<class T, class U>
    auto add(T t, U u) { return t + u; } // o tipo de retorno é o tipo de operator+(T, U)
    
    // o perfect forwarding de uma chamada de função deve usar decltype(auto)
    // caso a função que ele chama retorne por referência
    template<class F, class... Args>
    decltype(auto) PerfectForward(F fun, Args&&... args) 
    { 
        return fun(std::forward<Args>(args)...); 
    }
    
    template<auto n> // Declaração de parâmetro auto C++17
    auto f() -> std::pair<decltype(n), decltype(n)> // auto não pode deduzir de brace-init-list
    {
        return {n, n};
    }
    
    int main()
    {
        auto a = 1 + 2;          // o tipo de a é int
        auto b = add(1, 1.2);    // o tipo de b é double
        static_assert(std::is_same_v<decltype(a), int>);
        static_assert(std::is_same_v<decltype(b), double>);
    
        auto c0 = a;             // o tipo de c0 é int, contendo uma cópia de a
        decltype(auto) c1 = a;   // o tipo de c1 é int, contendo uma cópia de a
        decltype(auto) c2 = (a); // o tipo de c2 é int&, um alias de a
        std::cout << "before modification through c2, a = " << a << '\n';
        ++c2;
        std::cout << " after modification through c2, a = " << a << '\n';
    
        auto [v, w] = f<0>(); // declaração de structured binding
    
        auto d = {1, 2}; // OK: o tipo de d é std::initializer_list<int>
        auto n = {5};    // OK: o tipo de n é std::initializer_list<int>
    //  auto e{1, 2};    // Erro a partir do DR n3922, std::initializer_list<int> antes
        auto m{5};       // OK: o tipo de m é int a partir do DR n3922, initializer_list<int> antes
    //  decltype(auto) z = { 1, 2 } // Erro: {1, 2} não é uma expressão
    
        // auto é comumente usado para tipos sem nome, como os tipos de expressões lambda
        auto lambda =  { return x + 3; };
    
    //  auto int x; // válido em C++98, erro a partir de C++11
    //  auto x;     // válido em C, erro em C++
    
        {}(c0, c1, v, w, d, n, m, lambda); // suprime avisos de "variável não utilizada"
    }
```

Saída possível:
```
    before modification through c2, a = 3
     after modification through c2, a = 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1265](<https://cplusplus.github.io/CWG/issues/1265.html>) | C++11 | o especificador auto poderia ser usado para declarar uma função com um tipo de retorno final e definir uma variável em uma única declaração | proibido
[CWG 1346](<https://cplusplus.github.io/CWG/issues/1346.html>) | C++11 | uma lista de expressões entre parênteses não podia ser atribuída a uma variável auto | permitido
[CWG 1347](<https://cplusplus.github.io/CWG/issues/1347.html>) | C++11 | uma declaração com o especificador auto poderia definir duas variáveis com os tipos `T` e [std::initializer_list](<#/doc/utility/initializer_list>)&lt;T&gt; respectivamente | proibido
[CWG 1852](<https://cplusplus.github.io/CWG/issues/1852.html>) | C++14 | o especificador auto em decltype(auto) também era um placeholder | não é um placeholder neste caso
[CWG 1892](<https://cplusplus.github.io/CWG/issues/1892.html>) | C++11 | o tipo de retorno de um type-id de ponteiro para função poderia ser auto | proibido
[CWG 2476](<https://cplusplus.github.io/CWG/issues/2476.html>) | C++11 | a resolução do [problema CWG 1892](<https://cplusplus.github.io/CWG/issues/1892.html>) proibia a dedução do tipo de retorno de variáveis de ponteiro para função a partir de inicializadores | permitido

### Referências

*   C++23 standard (ISO/IEC 14882:2024):

    *   9.2.9.6 Placeholder type specifiers [dcl.spec.auto]
*   C++20 standard (ISO/IEC 14882:2020):

    *   9.2.8.5 Placeholder type specifiers [dcl.spec.auto]
*   C++17 standard (ISO/IEC 14882:2017):

    *   10.1.7.4 The `auto` specifier [dcl.spec.auto]
*   C++14 standard (ISO/IEC 14882:2014):

    *   7.1.6.4 `auto` specifier [dcl.spec.auto]
*   C++11 standard (ISO/IEC 14882:2011):

    *   7.1.6.4 `auto` specifier [dcl.spec.auto]
