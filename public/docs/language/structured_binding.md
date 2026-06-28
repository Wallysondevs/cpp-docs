# Declaração de structured binding (desde C++17)

Associa os nomes especificados a subobjetos ou elementos do inicializador.

Assim como uma referência, um structured binding é um alias para um objeto existente. Diferente de uma referência, um structured binding não precisa ser de um tipo de referência.

---
attr (opcional) decl-specifier-seq ref-qualifier (opcional) `[` sb-identifier-list `]` initializer `;`
- **attr** — sequência de qualquer número de [atributos](<#/doc/language/attributes>)
- **decl-specifier-seq** — sequência dos seguintes especificadores (seguindo as regras de [declaração simples](<#/doc/language/declarations>)):

  * [`constexpr`](<#/doc/language/constexpr>)
  * [`constinit`](<#/doc/language/constinit>)

| (desde C++26)

  * [`static`](<#/doc/keywords/static>)
  * [`thread_local`](<#/doc/keyword/thread_local>)
  * [`const`](<#/doc/keyword/const>)
  * [`volatile`](<#/doc/keyword/volatile>) (obsoleto em C++20)
  * [`auto`](<#/doc/language/auto>)

- **ref-qualifier** — ou `&` ou `& &`
- **sb-identifier-list** — lista de identificadores separados por vírgula introduzidos por esta declaração, cada identificador pode ser seguido por uma [sequência de especificadores de atributo](<#/doc/language/attributes>)(desde C++26)
- **initializer** — um inicializador (veja abaixo)

initializer pode ser um dos seguintes:

---
`=` expression | (1) |
---|---|---
`{` expression `} | (2) |
`(` expression `)` | (3) |
- **expression** — qualquer expressão (exceto [expressões de vírgula](<#/doc/language/operator_other>) não-parentesizadas)

Uma declaração de structured binding introduz todos os identificadores na sb-identifier-list como nomes no escopo circundante e os associa a subobjetos ou elementos do objeto denotado pela expressão. As associações assim introduzidas são chamadas de _structured bindings_.

Um dos identificadores na sb-identifier-list pode ser precedido por uma elipse. Tal identificador introduz um _structured binding pack_. O identificador deve declarar uma [entidade template](<#/doc/language/templates>). | (desde C++26)

Um structured binding é um identificador na sb-identifier-list que não é precedido por uma elipse, ou um elemento de um structured binding pack introduzido na mesma lista de identificadores (desde C++26).

### Processo de associação

Uma declaração de structured binding primeiro introduz uma variável com nome único (aqui denotada por e) para armazenar o valor do inicializador, da seguinte forma:

  * Se expression tiver tipo array _cv1_ `A` e nenhum ref-qualifier estiver presente, defina e como attr (opcional) specifiers `A e;`, onde specifiers é uma sequência dos especificadores em decl-specifier-seq excluindo auto.

     Então cada elemento de e é inicializado a partir do elemento correspondente de expression conforme especificado pela forma do initializer :

  * Para a sintaxe de inicializador (1), os elementos são [copy-initialized](<#/doc/language/copy_initialization>).
  * Para as sintaxes de inicializador (2,3), os elementos são [direct-initialized](<#/doc/language/direct_initialization>).

  * Caso contrário, defina e como attr (opcional) decl-specifier-seq ref-qualifier (opcional) `e` initializer `;`.

Usamos `E` para denotar o tipo da expressão identificadora e (ou seja, `E` é o equivalente de [std::remove_reference_t](<#/doc/types/remove_reference>)<decltype((e))>).

Um _tamanho de structured binding_ de `E` é o número de structured bindings que precisam ser introduzidos pela declaração de structured binding.

O número de identificadores em sb-identifier-list deve ser igual ao tamanho de structured binding de `E`. | (até C++26)
Dado o número de identificadores em sb-identifier-list como N e o tamanho de structured binding de `E` como S:

  * Se não houver structured binding pack, N deve ser igual a S.
  * Caso contrário, o número de elementos não-pack (ou seja, N - 1) deve ser menor ou igual a S, e o número de elementos do structured binding pack é S - N + 1 (que pode ser zero).

| (desde C++26)
```cpp
    struct C { int x, y, z; };
    
    template<class T>
    void now_i_know_my() 
    {
        auto [a, b, c] = C(); // OK: a, b, c referem-se a x, y, z, respectivamente
        auto [d, ...e] = C(); // OK: d refere-se a x; ...e refere-se a y e z
        auto [...f, g] = C(); // OK: ...f refere-se a x e y; g refere-se a z
        auto [h, i, j, ...k] = C();    // OK: o pack k está vazio
        auto [l, m, n, o, ...p] = C(); // erro: o tamanho do structured binding é muito pequeno
    }
```

Uma declaração de structured binding realiza a associação de uma das três maneiras possíveis, dependendo de `E`:

  * Caso 1: Se `E` for um tipo array, então os nomes são associados aos elementos do array.
  * Caso 2: Se `E` for um tipo de classe não-union e [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt; for um tipo completo com um membro chamado `value` (independentemente do tipo ou acessibilidade de tal membro), então o protocolo de associação "tipo-tupla" é usado.
  * Caso 3: Se `E` for um tipo de classe não-union, mas [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt; não for um tipo completo, então os nomes são associados aos membros de dados acessíveis de `E`.

Cada um dos três casos é descrito em mais detalhes abaixo.

Cada structured binding tem um _tipo referenciado_, definido na descrição abaixo. Este tipo é o tipo retornado por [`decltype`](<#/doc/language/decltype>) quando aplicado a um structured binding não-parentesizado.

#### Caso 1: associando um array

Cada structured binding na sb-identifier-list torna-se o nome de um lvalue que se refere ao elemento correspondente do array. O tamanho de structured binding de `E` é igual ao número de elementos do array.

O _tipo referenciado_ para cada structured binding é o tipo do elemento do array. Note que se o tipo array `E` for cv-qualificado, o seu tipo de elemento também o será.
```cpp
    int a[2] = {1, 2};
    
    auto [x, y] = a;    // cria e[2], copia a para e,
                        // então x se refere a e[0], y se refere a e[1]
    auto& [xr, yr] = a; // xr se refere a a[0], yr se refere a a[1]
```

#### Caso 2: associando um tipo que implementa as operações de tupla

A expressão [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt;::value deve ser uma [expressão constante integral](<#/doc/language/constant_expression>) bem formada, e o tamanho de structured binding de `E` é igual a [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt;::value.

Para cada structured binding, uma variável cujo tipo é "referência para [std::tuple_element](<#/doc/utility/tuple_element>)<I, E>::type" é introduzida: referência lvalue se seu inicializador correspondente for um lvalue, referência rvalue caso contrário. O inicializador para a I-ésima variável é

  * e.get&lt;I&gt;(), se a busca pelo identificador `get` no escopo de `E` por meio da busca de acesso a membro de classe encontrar pelo menos uma declaração que seja um function template cujo primeiro parâmetro template é um parâmetro não-tipo
  * Caso contrário, get&lt;I&gt;(e), onde get é buscado apenas por [argument-dependent lookup](<#/doc/language/adl>), ignorando a busca não-ADL.

Nessas expressões de inicializador, e é um lvalue se o tipo da entidade e for uma referência lvalue (isso só acontece se o ref-qualifier for `&` ou se for `& &` e a expressão inicializadora for um lvalue) e um xvalue caso contrário (isso efetivamente realiza um tipo de perfect forwarding), I é um prvalue [std::size_t](<#/doc/types/size_t>), e &lt;I&gt; é sempre interpretado como uma lista de parâmetros template.

A variável tem a mesma [duração de armazenamento](<#/doc/language/storage_duration>) que e.

O structured binding então se torna o nome de um lvalue que se refere ao objeto associado a essa variável.

O _tipo referenciado_ para o I-ésimo structured binding é [std::tuple_element](<#/doc/utility/tuple_element>)<I, E>::type.
```cpp
    float x{};
    char  y{};
    int   z{};
    
    std::tuple<float&, char&&, int> tpl(x, std::move(y), z);
    const auto& [a, b, c] = tpl;
    // using Tpl = const std::tuple<float&, char&&, int>;
    // a nomeia um structured binding que se refere a x (inicializado de get<0>(tpl))
    // decltype(a) é std::tuple_element<0, Tpl>::type, i.e. float&
    // b nomeia um structured binding que se refere a y (inicializado de get<1>(tpl))
    // decltype(b) é std::tuple_element<1, Tpl>::type, i.e. char&&
    // c nomeia um structured binding que se refere ao terceiro componente de tpl, get<2>(tpl)
    // decltype(c) é std::tuple_element<2, Tpl>::type, i.e. const int
```

#### Caso 3: associando a membros de dados

Cada membro de dados não-estático de `E` deve ser um membro direto de `E` ou da mesma classe base de `E`, e deve ser bem formado no contexto do structured binding quando nomeado como e.name. `E` não pode ter um membro union anônimo. O tamanho de structured binding de `E` é igual ao número de membros de dados não-estáticos.

Cada structured binding na sb-identifier-list torna-se o nome de um lvalue que se refere ao próximo membro de e na ordem de declaração (bit-fields são suportados); o tipo do lvalue é o de e.mI, onde `mI` se refere ao I-ésimo membro.

O _tipo referenciado_ do I-ésimo structured binding é o tipo de e.mI se não for um tipo de referência, ou o tipo declarado de `mI` caso contrário.
```cpp
    #include <iostream>
    
    struct S
    {
        mutable int x1 : 2;
        volatile double y1;
    };
    
    S f() { return S{1, 2.3}; }
    
    int main()
    {
        const auto [x, y] = f(); // x é um lvalue int identificando o bit-field de 2 bits
                                 // y é um lvalue const volatile double
        std::cout << x << ' ' << y << '\n';  // 1 2.3
        x = -2;   // OK
    //  y = -2.;  // Erro: y é const-qualificado
        std::cout << x << ' ' << y << '\n';  // -2 2.3
    }
```

#### Ordem de inicialização

Seja valI o objeto ou referência nomeado pelo I-ésimo structured binding em sb-identifier-list :

  * A inicialização de e é [sequenciada antes](<#/doc/language/eval_order>) da inicialização de qualquer valI.
  * A inicialização de cada valI é sequenciada antes da inicialização de qualquer valJ onde I é menor que J.

### Notas

Structured bindings não podem ser [restritos](<#/doc/language/constraints>):
```cpp
    template<class T>
    concept C = true;
    
    C auto [x, y] = std::pair{1, 2}; // erro: restrito
```

| (desde C++20)

A busca pelo membro `get` ignora a acessibilidade como de costume e também ignora o tipo exato do parâmetro template não-tipo. Um membro privado template<char*> void get(); fará com que a interpretação de membro seja usada, mesmo que seja malformado.

A parte da declaração que precede `[` se aplica à variável oculta e, não aos structured bindings introduzidos:
```cpp
    int a = 1, b = 2;
    const auto& [x, y] = std::tie(a, b); // x e y são do tipo int&
    auto [z, w] = std::tie(a, b);        // z e w ainda são do tipo int&
    assert(&z == &a);                    // passa
```

A interpretação tipo-tupla é sempre usada se [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt; for um tipo completo com um membro chamado `value`, mesmo que isso cause um programa malformado:
```cpp
    struct A { int x; };
    
    namespace std
    {
        template<>
        struct tuple_size<::A> { void value(); };
    }
    
    auto [x] = A{}; // erro; a interpretação de "membro de dados" não é considerada.
```

As regras usuais para associação de referência a temporários (incluindo extensão de tempo de vida) se aplicam se um ref-qualifier estiver presente e a expressão for um prvalue. Nesses casos, a variável oculta e é uma referência que se associa à variável temporária [materializada](<#/doc/language/implicit_cast>) a partir da expressão prvalue, estendendo seu tempo de vida. Como de costume, a associação falhará se e for uma referência lvalue não-const:
```cpp
    int a = 1;
    
    const auto& [x] = std::make_tuple(a); // OK, não pendente
    auto&       [y] = std::make_tuple(a); // erro, não é possível associar auto& a rvalue std::tuple
    auto&&      [z] = std::make_tuple(a); // também OK
```

decltype(x), onde x denota um structured binding, nomeia o _tipo referenciado_ desse structured binding. No caso tipo-tupla, este é o tipo retornado por std::tuple_element, que pode não ser uma referência, embora uma referência oculta seja sempre introduzida neste caso. Isso efetivamente emula o comportamento de associar a uma struct cujos membros de dados não-estáticos têm os tipos retornados por std::tuple_element, sendo a natureza de referência da própria associação um mero detalhe de implementação.
```cpp
    std::tuple<int, int&> f();
    
    auto [x, y] = f();       // decltype(x) é int
                             // decltype(y) é int&
    
    const auto [z, w] = f(); // decltype(z) é const int
                             // decltype(w) é int&
```

Structured bindings não podem ser capturados por [expressões lambda](<#/doc/language/lambda>):
```cpp
    #include <cassert>
    
    int main()
    {
        struct S { int p{6}, q{7}; };
        const auto& [b, d] = S{};
        auto l = [b, d] { return b * d; }; // válido desde C++20
        assert(l() == 42);
    }
```

| (até C++20)

Um tamanho de structured binding é permitido ser ​0​ desde que a sb-identifier-list contenha exatamente um identificador que possa introduzir apenas um structured binding pack vazio.
```cpp
    auto return_empty() -> std::tuple<>;
    
    template <class>
    void test_empty()
    {
        auto [] = return_empty(); // erro
        auto [...args] = return_empty(); // OK, args é um pack vazio
        auto [one, ...rest] = return_empty(); // erro, o tamanho do structured binding é muito pequeno
    }
```

| (desde C++26)
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_structured_bindings`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | Structured bindings
[`202403L`](<#/>) | (C++26) | Structured bindings com atributos
[`202411L`](<#/>) | (C++26) | Structured bindings podem introduzir um pack

### Palavras-chave

[`auto`](<#/doc/keyword/auto>)

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <set>
    #include <string>
    
    int main()
    {
        std::set<std::string> myset{"hello"};
    
        for (int i{2}; i; --i)
        {
            if (auto [iter, success] = myset.insert("Hello"); success) 
                std::cout << "A inserção foi bem-sucedida. O valor é "
                          << std::quoted(*iter) << ".\n";
            else
                std::cout << "O valor " << std::quoted(*iter)
                          << " já existe no conjunto.\n";
        }
    
        struct BitFields
        {
            // C++20: inicializador de membro padrão para bit-fields
            int b : 4 {1}, d : 4 {2}, p : 4 {3}, q : 4 {4};
        };
    
        {
            const auto [b, d, p, q] = BitFields{};
            std::cout << b << ' ' << d << ' ' << p << ' ' << q << '\n';
        }
    
        {
            const auto [b, d, p, q] = []{ return BitFields{4, 3, 2, 1}; }();
            std::cout << b << ' ' << d << ' ' << p << ' ' << q << '\n';
        }
    
        {
            BitFields s;
    
            auto& [b, d, p, q] = s;
            std::cout << b << ' ' << d << ' ' << p << ' ' << q << '\n';
    
            b = 4, d = 3, p = 2, q = 1;
            std::cout << s.b << ' ' << s.d << ' ' << s.p << ' ' << s.q << '\n';
        }
    }
```

Saída:
```
    A inserção foi bem-sucedida. O valor é "Hello".
    O valor "Hello" já existe no conjunto.
    1 2 3 4
    4 3 2 1
    1 2 3 4
    4 3 2 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2285](<https://cplusplus.github.io/CWG/issues/2285.html>) | C++17 | expression poderia se referir aos nomes da identifier-list | a declaração é malformada neste caso
[CWG 2312](<https://cplusplus.github.io/CWG/issues/2312.html>) | C++17 | o significado de mutable foi perdido no caso 3 | seu significado ainda é mantido
[CWG 2313](<https://cplusplus.github.io/CWG/issues/2313.html>) | C++17 | no caso 2, as variáveis de structured binding poderiam ser redeclaradas | não podem ser redeclaradas
[CWG 2339](<https://cplusplus.github.io/CWG/issues/2339.html>) | C++17 | no caso 2, a definição de I estava faltando | definição adicionada
[CWG 2341](<https://cplusplus.github.io/CWG/issues/2341.html>)
([P1091R3](<https://wg21.link/P1091R3>)) | C++17 | structured bindings não podiam ser declarados com duração de armazenamento estática | permitido
---|---|---|---
[CWG 2386](<https://cplusplus.github.io/CWG/issues/2386.html>) | C++17 | o protocolo de associação "tipo-tupla" era usado sempre que [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt; é um tipo completo | usado apenas quando [std::tuple_size](<#/doc/utility/tuple_size>)&lt;E&gt; tem um membro `value`
[CWG 2506](<https://cplusplus.github.io/CWG/issues/2506.html>) | C++17 | se expression é de um tipo array cv-qualificado, a cv-qualificação era transferida para `E` | descarta essa cv-qualificação
[CWG 2635](<https://cplusplus.github.io/CWG/issues/2635.html>) | C++20 | structured bindings podiam ser restritos | proibido
[CWG 2867](<https://cplusplus.github.io/CWG/issues/2867.html>) | C++17 | a ordem de inicialização era incerta | tornada clara
[P0961R1](<https://wg21.link/P0961R1>) | C++17 | no caso 2, o membro `get` era usado se a busca encontrasse um `get` de qualquer tipo | somente se a busca encontrar um function template com um parâmetro não-tipo
[P0969R0](<https://wg21.link/P0969R0>) | C++17 | no caso 3, os membros eram exigidos como públicos | apenas exigidos como acessíveis no contexto da declaração

### Referências

  * padrão C++23 (ISO/IEC 14882:2024):

    * 9.6 Declarações de structured binding [dcl.struct.bind] (p: 228-229)

  * padrão C++20 (ISO/IEC 14882:2020):

    * 9.6 Declarações de structured binding [dcl.struct.bind] (p: 219-220)

  * padrão C++17 (ISO/IEC 14882:2017):

    * 11.5 Declarações de structured binding [dcl.struct.bind] (p: 219-220)

### Veja também

[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tupla](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tupla em objetos individuais
(function template)