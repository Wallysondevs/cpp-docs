# Requisitos nomeados C++: LiteralType (desde C++11)

Especifica que um tipo é um _tipo literal_. Tipos literais são os tipos de [variáveis `constexpr`](<#/doc/language/constexpr>) e podem ser construídos, manipulados e retornados de [funções `constexpr`](<#/doc/language/constexpr>).

Nota: o padrão não define um requisito nomeado com este nome. Esta é uma categoria de tipo definida pela linguagem central. É incluída aqui como um requisito nomeado apenas por consistência.

### Requisitos

Um tipo literal é qualquer um dos seguintes:

*   `void` possivelmente cv-qualificado (para que funções `constexpr` possam retornar `void`);

| (desde C++14)

*   [tipo escalar](<#/doc/named_req/ScalarType>);
*   [tipo de referência](<#/doc/language/reference>);
*   um [array](<#/doc/language/array>) de tipo literal;
*   tipo de classe possivelmente cv-qualificado que possui todas as seguintes propriedades:

    *   possui um [destrutor](<#/doc/language/destructor>) trivial (até C++20) `constexpr` (desde C++20),
    *   todos os seus membros de dados não-estáticos não-variantes e classes base são de tipos literais não-voláteis, e
    *   é um de

        *   um [tipo lambda](<#/doc/language/lambda>),

| (desde C++17)

        *   um tipo union [agregado](<#/doc/language/aggregate_initialization>) que
            *   não possui [membros variantes](<#/doc/language/union>), ou
            *   possui pelo menos um membro variante de tipo literal não-volátil,
        *   um tipo [agregado](<#/doc/language/aggregate_initialization>) não-union, e cada um de seus membros de [union anônima](<#/doc/language/union>)
            *   não possui [membros variantes](<#/doc/language/union>), ou
            *   possui pelo menos um membro variante de tipo literal não-volátil,
        *   um tipo com pelo menos um construtor `constexpr` (possivelmente `template`) que não seja um construtor de cópia ou de movimento.

### Notas

Um tipo pode ser literal mesmo que todos os seus construtores `constexpr` sejam deletados, inacessíveis ou não possam participar da resolução de sobrecarga.
```cpp
    struct A { constexpr A(int) = delete; char c; }; // A is a literal type
    constexpr A v = std::bit_cast<A>('0'); // OK in C++20
                                           // v has literal type and thus can be constexpr
```

### Exemplo

Tipo literal que estende literais de string:

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <stdexcept>
    
    class conststr // conststr is a literal type
    {
        const char* p;
        std::size_t sz;
    public:
        template<std::size_t N>
        constexpr conststr(const char(&a)[N]) : p(a), sz(N - 1) {}
    
        constexpr char operator const
        {
            return n < sz ? p[n] : throw std::out_of_range("");
        }
    
        constexpr std::size_t size() const { return sz; }
    };
    
    constexpr std::size_t count_lower(conststr s)
    {
        std::size_t c{};
        for (std::size_t n{}; n != s.size(); ++n)
            if ('a' <= s[n] && s[n] <= 'z')
                ++c;
        return c;
    }
    
    // An output function that requires a compile-time constant N, for testing
    template<int N>
    struct constN
    {
        constN() { std::cout << N << '\n'; }
    };
    
    int main()
    {
        std::cout << "The number of lowercase letters in \"Hello, world!\" is ";
        constN<count_lower("Hello, world!")>(); // the string literal is implicitly
                                                // converted to conststr
    }
```

Saída:
```
    The number of lowercase letters in "Hello, world!" is 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1453](<https://cplusplus.github.io/CWG/issues/1453.html>) | C++11 | uma classe literal poderia ter membros de dados voláteis | não permitido
[CWG 1951](<https://cplusplus.github.io/CWG/issues/1951.html>) | C++11 C++14 | não estava claro se `void` cv-qualificado (C++14) e tipos de classe (C++11) são tipos literais | eles são
[CWG 2096](<https://cplusplus.github.io/CWG/issues/2096.html>) | C++11 | para que um tipo union seja literal, todos os seus membros de dados não-estáticos devem ser literais | apenas um membro de dados não-estático precisa ser
[CWG 2598](<https://cplusplus.github.io/CWG/issues/2598.html>) | C++11 | para que um tipo union seja literal, ele deve ter pelo menos um membro de dados não-estático | ele pode não ter nenhum membro de dados não-estático

### Veja também

[ is_literal_type](<#/doc/types/is_literal_type>)(C++11)(obsoleto em C++17)(removido em C++20) | verifica se um tipo é um tipo literal (class template)