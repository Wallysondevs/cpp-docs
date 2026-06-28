# Loop for baseado em range (desde C++11)

Executa um loop for sobre um range.

Usado como um equivalente mais legível ao [loop for](<#/doc/language/for>) tradicional que opera sobre um range de valores, como todos os elementos em um container.

### Sintaxe

---
attr ﻿(opcional) `for (` init-statement ﻿(opcional) item-declaration `:` range-initializer `)` statement
attr | \- | qualquer número de [atributos](<#/doc/language/attributes>)
---|---|---
init-statement | \- | (desde C++20) um de

  * uma [declaração de expressão](<#/doc/language/statements>) (que pode ser uma declaração nula ;)
  * uma [declaração simples](<#/doc/language/declarations>) (tipicamente uma declaração de uma variável com inicializador), pode declarar um número arbitrário de variáveis ou ser uma [declaração de structured binding](<#/doc/language/structured_binding>)

|

  * uma [declaração de alias](<#/doc/language/type_alias>)

| (desde C++23)

Note que qualquer init-statement deve terminar com um ponto e vírgula. É por isso que é frequentemente descrito informalmente como uma expressão ou uma declaração seguida por um ponto e vírgula.

item-declaration | \- | uma declaração para cada item do range
---|---|---
range-initializer | \- | uma [expressão](<#/doc/language/expressions>) ou [lista de inicializadores entre chaves](<#/doc/language/initialization>)
statement | \- | qualquer [declaração](<#/doc/language/statements>) (tipicamente uma declaração composta)

### Explicação

A sintaxe acima produz código equivalente ao seguinte, exceto pela extensão do tempo de vida de temporários de range-initializer (veja [abaixo](<#/doc/language/range-for>))(desde C++23) (as variáveis e expressões envolvidas em /* */ são apenas para exposição):

`{`

    `auto &&` /* range */ `=` range-initializer ﻿`;`

    `for (auto` /* begin */ `=` /* begin-expr */`,` /* end */ `=` /* end-expr */`;`

    /* begin */ `!=` /* end */`; ++` /* begin */`)`

    `{`

    item-declaration `= *` /* begin */`;`

    statement

    `}`

`}`
| (até C++17)
`{`

    `auto &&` /* range */ `=` range-initializer ﻿`;`

    `auto` /* begin */ `=` /* begin-expr */`;`

    `auto` /* end */ `=` /* end-expr */`;`

    `for ( ;` /* begin */ `!=` /* end */`; ++` /* begin */`)`

    `{`

    item-declaration `= *` /* begin */`;`

    statement

    `}`

`}`
| (desde C++17)
(até C++20)
`{`

    init-statement

    `auto &&` /* range */ `=` range-initializer ﻿`;`

    `auto` /* begin */ `=` /* begin-expr */`;`

    `auto` /* end */ `=` /* end-expr */`;`

    `for ( ;` /* begin */ `!=` /* end */`; ++` /* begin */`)`

    `{`

    item-declaration `= *` /* begin */`;`

    statement

    `}`

`}`
| (desde C++20)

range-initializer é avaliado para inicializar a sequência ou range a ser iterado. Cada elemento da sequência, por sua vez, é desreferenciado e usado para inicializar a variável com o tipo e nome dados em item-declaration.

item-declaration pode ser um dos seguintes:

  * uma [declaração simples](<#/doc/language/declarations>) com as seguintes restrições:
  * Possui apenas um [declarator](<#/doc/language/declarations>).
  * O declarator não deve ter [inicializador](<#/doc/language/initialization>).
  * A [sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr, e não pode definir uma [classe](<#/doc/language/class>) ou [enumeração](<#/doc/language/enum>).

As expressões apenas para exposição /* begin-expr */ e /* end-expr */ são definidas da seguinte forma:

  * Se o tipo de /* range */ for uma referência a um tipo de array `R`:

    

  * Se `R` for de limite N, /* begin-expr */ é /* range */ e /* end-expr */ é /* range */ + N.
  * Se `R` for um array de limite desconhecido ou um array de tipo incompleto, o programa é malformado.

  * Se o tipo de /* range */ for uma referência a um tipo de classe `C`, e as buscas no escopo de `C` pelos nomes “`begin`” e “`end`” encontrarem pelo menos uma declaração cada, então /* begin-expr */ é /* range */.begin() e /* end-expr */ é /* range */.end().
  * Caso contrário, /* begin-expr */ é begin(/* range */) e /* end-expr */ é end(/* range */), onde “`begin`” e “`end`” são encontrados via [argument-dependent lookup](<#/doc/language/adl>) (a busca não-ADL não é realizada).

Se o loop precisar ser terminado dentro de statement, uma [declaração break](<#/doc/language/break>) pode ser usada como declaração de término.

Se a iteração atual precisar ser terminada dentro de statement, uma [declaração continue](<#/doc/language/continue>) pode ser usada como atalho.

Se um nome introduzido em init-statement for redeclarado no bloco mais externo de statement, o programa é malformado:
```cpp
    for (int i : {1, 2, 3})
        int i = 1; // error: redeclaration
```

### Inicializador de range temporário

Se range-initializer retornar um temporário, seu tempo de vida é estendido até o final do loop, conforme indicado pela ligação à referência de encaminhamento /* range */.

Os tempos de vida de todos os temporários dentro de range-initializer não são estendidos, a menos que eles seriam destruídos no final de range-initializer (desde C++23).
```cpp
    // if foo() returns by value
    for (auto& x : foo().items()) { /* ... */ } // until C++23 undefined behavior
```

Este problema pode ser contornado usando init-statement:
```cpp
    for (T thing = foo(); auto& x : thing.items()) { /* ... */ } // OK
```

| (desde C++20)

Note que mesmo em C++23, parâmetros não-referência de chamadas de função intermediárias não recebem uma extensão de tempo de vida (porque em algumas ABIs eles são destruídos no callee, não no caller), mas isso é apenas um problema para funções que já são bugadas:
```cpp
    using T = std::list<int>;
    const T& f1(const T& t) { return t; }
    const T& f2(T t)        { return t; } // always returns a dangling reference
    T g();
    
    void foo()
    {
        for (auto e : f1(g())) {} // OK: lifetime of return value of g() extended
        for (auto e : f2(g())) {} // UB: lifetime of f2's value parameter ends early
    }
```

| (desde C++23)

### Notas

Se o range-initializer for uma [lista de inicializadores entre chaves](<#/doc/language/initialization>), /* range */ é deduzido como uma referência a um [std::initializer_list](<#/doc/utility/initializer_list>).

É seguro, e de fato, preferível em código genérico, usar dedução para referência de encaminhamento, para (auto&& var : sequence).

A interpretação de membro é usada se o tipo do range tiver um membro chamado “`begin`” e um membro chamado “`end`”. Isso é feito independentemente de o membro ser um tipo, membro de dados, função ou enumerador, e independentemente de sua acessibilidade. Assim, uma classe como class meow { enum { begin = 1, end = 2 }; /* rest of class */ }; não pode ser usada com o loop for baseado em range, mesmo que as funções “`begin`”/“`end`” no escopo do namespace estejam presentes.

Embora a variável declarada em item-declaration seja geralmente usada na declaração, isso não é obrigatório.

A partir de C++17, os tipos de /* begin-expr */ e /* end-expr */ não precisam ser os mesmos, e de fato o tipo de /* end-expr */ não precisa ser um iterator: ele apenas precisa ser capaz de ser comparado por desigualdade com um. Isso torna possível delimitar um range por um predicado (por exemplo, "o iterator aponta para um caractere nulo"). | (desde C++17)

Quando usado com um objeto (não-const) que possui semântica copy-on-write, o loop for baseado em range pode disparar uma cópia profunda ao chamar (implicitamente) a função membro `begin()` não-const.

Se isso for indesejável (por exemplo, porque o loop não está realmente modificando o objeto), pode ser evitado usando [std::as_const](<#/doc/utility/as_const>):
```cpp
    struct cow_string { /* ... */ }; // a copy-on-write string
    cow_string str = /* ... */;
    
    // for (auto x : str) { /* ... */ } // may cause deep copy
    
    for (auto x : std::as_const(str)) { /* ... */ }
```

| (desde C++17)
Macro de teste de recurso | Valor | Std | Recurso
[`__cpp_range_based_for`](<#/doc/feature_test>) | [`200907L`](<#/>) | (C++11) | [Loop for baseado em range](<#/doc/language/range-for>)
[`201603L`](<#/>) | (C++17) | Loop for baseado em range com tipos [diferentes para `begin`/`end`](<#/doc/language/range-for>)
[`202211L`](<#/>) | (C++23) | Extensão do tempo de vida para todos os objetos temporários em range-initializer

### Palavras-chave

[`for`](<#/doc/keyword/for>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {0, 1, 2, 3, 4, 5};
    
        for (const int& i : v) // acesso por referência const
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (auto i : v) // acesso por valor, o tipo de i é int
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (auto&& i : v) // acesso por referência de encaminhamento, o tipo de i é int&
            std::cout << i << ' ';
        std::cout << '\n';
    
        const auto& cv = v;
    
        for (auto&& i : cv) // acesso por referência de encaminhamento, o tipo de i é const int&
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (int n : {0, 1, 2, 3, 4, 5}) // o inicializador pode ser uma
                                         // lista de inicializadores entre chaves
            std::cout << n << ' ';
        std::cout << '\n';
    
        int a[] = {0, 1, 2, 3, 4, 5};
        for (int n : a) // o inicializador pode ser um array
            std::cout << n << ' ';
        std::cout << '\n';
    
        for ([[maybe_unused]] int n : a)  
            std::cout << 1 << ' '; // a variável do loop não precisa ser usada
        std::cout << '\n';
    
        for (auto n = v.size(); auto i : v) // o init-statement (C++20)
            std::cout << --n + i << ' ';
        std::cout << '\n';
    
        for (typedef decltype(v)::value_type elem_t; elem_t i : v)
        // declaração typedef como init-statement (C++20)
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (using elem_t = decltype(v)::value_type; elem_t i : v)
        // declaração de alias como init-statement (C++23)
            std::cout << i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    0 1 2 3 4 5 
    0 1 2 3 4 5 
    0 1 2 3 4 5 
    0 1 2 3 4 5 
    0 1 2 3 4 5 
    0 1 2 3 4 5 
    1 1 1 1 1 1 
    5 5 5 5 5 5 
    0 1 2 3 4 5 
    0 1 2 3 4 5
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1442](<https://cplusplus.github.io/CWG/issues/1442.html>) | C++11 | não era especificado se a busca de “`begin`” e “`end`” não-membros incluía a busca não qualificada usual | nenhuma busca não qualificada usual
[CWG 2220](<https://cplusplus.github.io/CWG/issues/2220.html>) | C++11 | os nomes introduzidos em init-statement podiam ser redeclarados | o programa é malformado neste caso
[CWG 2825](<https://cplusplus.github.io/CWG/issues/2825.html>) | C++11 | se range-initializer for uma lista de inicializadores entre chaves, os “`begin`” e “`end`” não-membros serão procurados | procurará os membros “`begin`” e “`end`” neste caso
[P0962R1](<https://wg21.link/P0962R1>) | C++11 | a interpretação de membro era usada se um dos membros “`begin`” e “`end`” estivesse presente | usada apenas se ambos estiverem presentes

### Veja também

[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos (function template)