# especificador constexpr (desde C++11)

*   `constexpr` - especifica que o valor de uma variável, [structured binding](<#/doc/language/structured_binding>)(desde C++26) ou função pode aparecer em [expressões constantes](<#/doc/language/constant_expression>)

### Explicação

O especificador constexpr declara que é possível avaliar o valor das entidades em tempo de compilação. Tais entidades podem então ser usadas onde apenas [expressões constantes](<#/doc/language/constant_expression>) em tempo de compilação são permitidas (desde que argumentos de função apropriados sejam fornecidos).

Um especificador constexpr usado em uma declaração de objeto ou função membro não estática (até C++14) implica const.

Um especificador constexpr usado na primeira declaração de uma função ou membro de dados [static](<#/doc/language/static>) (desde C++17) implica inline. Se qualquer declaração de uma função ou function template tiver um especificador constexpr, então toda declaração deve conter esse especificador.

### variável constexpr

Uma variável ou variable template (desde C++14) pode ser declarada constexpr se todas as seguintes condições forem satisfeitas:

*   A declaração é uma [definição](<#/doc/language/definition>).
*   É de um [tipo literal](<#/doc/language/constant_expression>).
*   É inicializada (pela declaração).
*   A [full-expression](<#/doc/language/expressions>) de sua inicialização é uma [expressão constante](<#/doc/language/constant_expression>).

| (até C++26)
*   É [constant-initializable](<#/doc/language/constant_expression>).

| (desde C++26)
*   Possui destruição constante, o que significa que uma das seguintes condições precisa ser satisfeita:

    *   Não é de um tipo de classe nem de um array (possivelmente multidimensional) dele.
    *   É de um tipo de classe com um destrutor constexpr ou um array (possivelmente multidimensional) dele, e para uma expressão hipotética e cujo único efeito é destruir o objeto, e seria uma [expressão constante central](<#/doc/language/constant_expression>) se o tempo de vida do objeto e seus subobjetos não mutáveis (mas não seus subobjetos mutáveis) fossem considerados para começar dentro de e.

```cpp
Se uma variável constexpr não for translation-unit-local, ela não deve ser inicializada para referir-se a uma entidade translation-unit-local que seja utilizável em expressões constantes, nem ter um subobjeto que se refira a tal entidade. Tal inicialização é proibida em uma unidade de interface de módulo (fora de seu fragmento de módulo privado, se houver) ou uma partição de módulo, e é descontinuada em qualquer outro contexto.  // (desde C++20)
```

### função constexpr

Uma função ou function template pode ser declarada constexpr.

Uma função é _adequada para constexpr_ se todas as seguintes condições forem satisfeitas:

*   Não é uma função [virtual](<#/doc/language/virtual>).

| (até C++20)
*   Seu tipo de retorno (se existir) é um [tipo literal](<#/doc/language/constant_expression>).
*   Cada um de seus tipos de parâmetro é um tipo literal.

| (até C++23)
*   Não é uma [coroutine](<#/doc/language/coroutines>).

| (desde C++20)
*   Se for um construtor ou destrutor (desde C++20), sua classe não possui nenhuma [classe base virtual](<#/doc/language/derived_class>).

*   Seu corpo de função é = default, = delete, ou uma instrução composta [contendo](<#/doc/language/statements>) apenas o seguinte:

    *   [instruções nulas](<#/doc/language/statements>)
    *   declarações [`static_assert`](<#/doc/language/static_assert>)
    *   declarações [`typedef`](<#/doc/language/typedef>) e declarações de [alias](<#/doc/language/type_alias>) que não definem classes ou enumerações
    *   [using declarations](<#/doc/language/namespace>)
    *   [using directives](<#/doc/language/namespace>)
    *   exatamente uma instrução [`return`](<#/doc/language/return>) se a função não for um construtor

| (até C++14)
*   Seu corpo de função é = default, = delete, ou uma instrução composta que (até C++20) **não** [contém](<#/doc/language/statements>) o seguinte:

    *   instruções [goto](<#/doc/language/goto>)
    *   instruções com [rótulos](<#/doc/language/statements>) diferentes de case e default

|

    *   [blocos try](<#/doc/language/try>)
    *   declarações de [assembly inline](<#/doc/language/asm>)
    *   definições de variáveis para as quais [nenhuma inicialização é realizada](<#/doc/language/default_initialization>)

| (até C++20)

    *   definições de variáveis de tipos não literais
    *   definições de variáveis com [duração de armazenamento](<#/doc/language/storage_duration>) static ou thread

(desde C++14)
(até C++23)

Exceto por funções constexpr instanciadas, funções constexpr não-template devem ser adequadas para constexpr.

```cpp
Para uma função constexpr não-construtora que não é defaulted nem templated, se não existirem valores de argumento tais que uma invocação da função possa ser uma subexpressão avaliada de uma expressão constante central, o programa é malformado, sem diagnóstico exigido. Para uma função constexpr templated, se nenhuma especialização do function/class template tornaria a função templated adequada para constexpr quando considerada como uma função não-templated, o programa é malformado, sem diagnóstico exigido.  // (até C++23)
```

Uma invocação de uma função constexpr em um dado contexto produz o mesmo resultado que uma invocação de uma função não-constexpr equivalente no mesmo contexto em todos os aspectos, com as seguintes exceções:

*   Uma invocação de uma função constexpr pode aparecer em uma [expressão constante](<#/doc/language/constant_expression>).
*   [Copy elision](<#/doc/language/copy_elision>) não é realizada em uma expressão constante.

### construtor constexpr

Além dos requisitos das funções constexpr, um construtor também precisa satisfazer todas as seguintes condições para ser adequado para constexpr:

*   Seu corpo de função é = delete ou satisfaz os seguintes requisitos adicionais:

|

    *   Se a classe é uma [union](<#/doc/language/union>) com membros variantes, exatamente um deles é inicializado.
    *   Se a classe é uma [classe tipo union](<#/doc/language/union>), mas não é uma union, para cada um de seus membros union anônimos com membros variantes, exatamente um deles é inicializado.
    *   Cada membro de dados não-variante não-estático e subobjeto de classe base é inicializado.

| (até C++20)

    *   Se o construtor é um [construtor delegante](<#/doc/language/initializer_list>), o construtor alvo é um construtor constexpr.
    *   Se o construtor é um construtor não-delegante, cada construtor selecionado para inicializar membros de dados não-estáticos e subobjetos de classe base é um construtor constexpr.

(até C++23)

*   A classe não possui nenhuma [classe base virtual](<#/doc/language/derived_class>).

```cpp
Para um construtor constexpr que não é defaulted nem templated, se não existirem valores de argumento tais que uma invocação da função possa ser uma subexpressão avaliada da full-expression de inicialização de algum objeto sujeito a expressão constante, o programa é malformado, sem diagnóstico exigido.  // (até C++23)
```

### destrutor constexpr

```cpp
Destrutores não podem ser constexpr, mas um destrutor trivial pode ser implicitamente chamado em expressões constantes.  // (até C++20)
Além dos requisitos das funções constexpr, um destrutor também precisa satisfazer todas as seguintes condições para ser adequado para constexpr:
```

*   Para cada subobjeto de tipo de classe ou array (possivelmente multidimensional) dele, esse tipo de classe possui um destrutor constexpr.

| (até C++23)

*   A classe não possui nenhuma classe base virtual.

(desde C++20)

### Notas

Como o operador [`noexcept`](<#/doc/language/noexcept>) sempre retorna true para uma expressão constante, ele pode ser usado para verificar se uma invocação particular de uma função constexpr segue o ramo da expressão constante:
```cpp
    constexpr int f();
    constexpr bool b1 = noexcept(f()); // false, undefined constexpr function
    constexpr int f() { return 0; }
    constexpr bool b2 = noexcept(f()); // true, f() is a constant expression
```

```cpp
  // (até C++17)
É possível escrever uma função constexpr cuja invocação nunca pode satisfazer os requisitos de uma expressão constante central:
```
```cpp
    void f(int& i) // not a constexpr function
    {
        i = 0;
    }
    
    constexpr void g(int& i) // well-formed since C++23
    {
        f(i); // unconditionally calls f, cannot be a constant expression
    }
```

| (desde C++23)

Construtores constexpr são permitidos para classes que não são tipos literais. Por exemplo, o construtor padrão de [std::shared_ptr](<#/doc/memory/shared_ptr>) é constexpr, permitindo [inicialização constante](<#/doc/language/constant_initialization>).

Variáveis de referência podem ser declaradas constexpr (seus inicializadores devem ser [expressões constantes de referência](<#/doc/language/constant_expression>)):
```cpp
    static constexpr int const& x = 42; // constexpr reference to a const int object
                                        // (the object has static storage duration
                                        //  due to life extension by a static reference)
```

```cpp
Embora blocos try e assembly inline sejam permitidos em funções constexpr, lançar exceções não capturadas (desde C++26) ou executar o assembly ainda é proibido em uma expressão constante. Se uma variável tem destruição constante, não há necessidade de gerar código de máquina para chamar seu destrutor, mesmo que seu destrutor não seja trivial. Uma função constexpr não-lambda, não-membro-especial e não-templated não pode se tornar implicitamente uma função imediata. Os usuários precisam marcá-la explicitamente como consteval para que tal definição de função pretendida seja bem-formada.  // (desde C++20)
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_constexpr` | `200704L` | (C++11) | constexpr
`201304L` | (C++14) | constexpr relaxado, métodos constexpr não-const
`201603L` | (C++17) | Lambda constexpr
`201907L` | (C++20) | Inicialização padrão trivial e declaração asm em funções constexpr
`202002L` | (C++20) | Alterando o membro ativo de uma union em avaliação constante
`202110L` | (C++23) | Variáveis não-literais, rótulos e instruções `goto` em funções constexpr
`202207L` | (C++23) | Relaxando algumas restrições constexpr
`202211L` | (C++23) | Permitindo variáveis static constexpr em funções constexpr
`202306L` | (C++26) | Cast constexpr de void*: em direção à type-erasure constexpr
`__cpp_constexpr_in_decltype` | `201711L`  // (C++11)
(DR) | Geração de definições de função e variável quando necessário para avaliação constante
`__cpp_constexpr_dynamic_alloc` | `201907L` | (C++20) | Operações para duração de armazenamento dinâmico em funções constexpr
```

### Palavras-chave

[`constexpr`](<#/doc/keyword/constexpr>)

### Exemplo

Define funções constexpr C++11/14 que calculam fatoriais; define um tipo literal que estende literais de string:

Execute este código
```cpp
    #include <iostream>
    #include <stdexcept>
    
    // C++11 constexpr functions use recursion rather than iteration
    constexpr int factorial(int n)
    {
        return n <= 1 ? 1 : (n * factorial(n - 1));
    }
    
    // C++14 constexpr functions may use local variables and loops
    #if __cplusplus >= 201402L
    constexpr int factorial_cxx14(int n)
    {
        int res = 1;
        while (n > 1)
            res *= n--;
        return res;
    }
    #endif // C++14
    
    // A literal class
    class conststr
    {
        const char* p;
        std::size_t sz;
    public:
        template<std::size_t N>
        constexpr conststr(const char(&a)[N]): p(a), sz(N - 1) {}
    
        // constexpr functions signal errors by throwing exceptions
        // in C++11, they must do so from the conditional operator ?:
        constexpr char operator const
        {
            return n < sz ? p[n] : throw std::out_of_range("");
        }
    
        constexpr std::size_t size() const { return sz; }
    };
    
    // C++11 constexpr functions had to put everything in a single return statement
    // (C++14 does not have that requirement)
    constexpr std::size_t countlower(conststr s, std::size_t n = 0,
                                                 std::size_t c = 0)
    {
        return n == s.size() ? c :
            'a' <= s[n] && s[n] <= 'z' ? countlower(s, n + 1, c + 1)
                                       : countlower(s, n + 1, c);
    }
    
    // An output function that requires a compile-time constant, for testing
    template<int n>
    struct constN
    {
        constN() { std::cout << n << '\n'; }
    };
    
    int main()
    {
        std::cout << "4! = ";
        constN<factorial(4)> out1; // computed at compile time
    
        volatile int k = 8; // disallow optimization using volatile
        std::cout << k << "! = " << factorial(k) << '\n'; // computed at run time
    
        std::cout << "The number of lowercase letters in \"Hello, world!\" is ";
        constN<countlower("Hello, world!")> out2; // implicitly converted to conststr
    
        constexpr int a[12] = {0, 1, 2, 3, 4, 5, 6, 7, 8};
        constexpr int length_a = sizeof a / sizeof(int); // std::size(a) in C++17,
                                                          // std::ssize(a) in C++20
        std::cout << "Array of length " << length_a << " has elements: ";
        for (int i = 0; i < length_a; ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    4! = 24
    8! = 40320
    The number of lowercase letters in "Hello, world!" is 9
    Array of length 12 has elements: 0 1 2 3 4 5 6 7 8 0 0 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1358](<https://cplusplus.github.io/CWG/issues/1358.html>) | C++11 | funções constexpr templated também precisavam ter pelo menos um valor de argumento válido | não há necessidade
[CWG 1359](<https://cplusplus.github.io/CWG/issues/1359.html>) | C++11 | construtores de union constexpr devem inicializar todos os membros de dados | inicializa exatamente um membro de dados para unions não vazias
[CWG 1366](<https://cplusplus.github.io/CWG/issues/1366.html>) | C++11 | classes com construtores constexpr cujos corpos de função são = default ou = delete poderiam ter classes base virtuais | tais classes também não podem ter classes base virtuais
[CWG 1595](<https://cplusplus.github.io/CWG/issues/1595.html>) | C++11 | construtores delegantes constexpr exigiam que todos os construtores envolvidos fossem constexpr | apenas exige que o construtor alvo seja constexpr
[CWG 1712](<https://cplusplus.github.io/CWG/issues/1712.html>) | C++14 | um variable template constexpr era obrigado a ter todas as suas declarações contendo o especificador constexpr[1](<#/doc/language/constexpr>) | não é mais exigido
[CWG 1911](<https://cplusplus.github.io/CWG/issues/1911.html>) | C++11 | construtores constexpr para tipos não literais não eram permitidos | permitido em inicialização constante
[CWG 2004](<https://cplusplus.github.io/CWG/issues/2004.html>) | C++11 | cópia/movimentação de uma union com um membro mutável era permitida em uma expressão constante | variantes mutáveis desqualificam cópia/movimentação implícita
[CWG 2022](<https://cplusplus.github.io/CWG/issues/2022.html>) | C++98 | se funções constexpr e não-constexpr equivalentes produzem resultado igual pode depender se a copy elision é realizada | assume-se que a copy elision é sempre realizada em expressões constantes
[CWG 2163](<https://cplusplus.github.io/CWG/issues/2163.html>) | C++14 | rótulos eram permitidos em funções constexpr mesmo que instruções goto sejam proibidas | rótulos também proibidos
[CWG 2268](<https://cplusplus.github.io/CWG/issues/2268.html>) | C++11 | cópia/movimentação de uma union com um membro mutável foi proibida pela resolução do [problema CWG 2004](<https://cplusplus.github.io/CWG/issues/2004.html>) | permitido se o objeto for criado dentro da expressão constante
[CWG 2278](<https://cplusplus.github.io/CWG/issues/2278.html>) | C++98 | a resolução do [problema CWG 2022](<https://cplusplus.github.io/CWG/issues/2022.html>) não era implementável | assume-se que a copy elision nunca é realizada em expressões constantes
[CWG 2531](<https://cplusplus.github.io/CWG/issues/2531.html>) | C++11 | uma variável não-inline se tornava inline se fosse redeclarada com constexpr | a variável não se torna inline

1.  [↑](<#/doc/language/constexpr>) É redundante porque não pode haver mais de uma declaração de um variable template com o especificador constexpr.

### Veja também

[expressão constante](<#/doc/language/constant_expression>) | define uma [expressão](<#/doc/language/expressions>) que pode ser avaliada em tempo de compilação
---|---
[especificador `consteval`](<#/doc/language/consteval>)(C++20) | especifica que uma função é uma _função imediata_, ou seja, toda chamada à função deve estar em uma avaliação constante
[especificador `constinit`](<#/doc/language/constinit>)(C++20) | afirma que uma variável possui inicialização estática, ou seja, [zero initialization](<#/doc/language/zero_initialization>) e [constant initialization](<#/doc/language/constant_initialization>)
[documentação C](<#/>) para constexpr
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão