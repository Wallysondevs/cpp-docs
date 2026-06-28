# Sobrecarga de operadores

Personaliza os operadores C++ para operandos de tipos definidos pelo usuário.

### Sintaxe

_Funções de operador_ são [funções](<#/doc/language/function>) com nomes de função especiais:

---
```cpp
`operator` op  // (1)
`operator` `new`
`operator` `new []`  // (2)
`operator` `delete`
`operator` `delete []`  // (3)
`operator` `co_await`  // (4) (desde C++20)
```
- **op** — qualquer um dos seguintes operadores:+ - * / % ^ & | ~ ! = < > += -= *= /= %= ^= &= |= << >> >>= <<= == != <= >= <=>(desde C++20) && || ++ -- , ->* -> () []

1) Um operador de pontuação sobrecarregado.

2) Uma [função de alocação](<#/doc/memory/new/operator_new>).

3) Uma [função de desalocação](<#/doc/memory/new/operator_delete>).

4) Um operador `co_await` sobrecarregado para uso em [expressões co_await](<#/doc/language/coroutines>).

Os comportamentos dos operadores não-pontuação são descritos em suas respectivas páginas. A menos que especificado de outra forma, a descrição restante nesta página não se aplica a essas funções.

### Explicação

Quando um operador aparece em uma [expressão](<#/doc/language/expressions>), e pelo menos um de seus operandos tem um [tipo de classe](<#/doc/language/class>) ou um [tipo de enumeração](<#/doc/language/enum>), então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) é usada para determinar a função definida pelo usuário a ser chamada entre todas as funções cujas assinaturas correspondem ao seguinte:

```cpp
Expressão | Como função membro | Como função não-membro | Exemplo
@a | (a).operator@ ( ) | operator@ (a) | !std::cin chama std::cin.operator!()
a@b | (a).operator@ (b) | operator@ (a, b) | std::cout << 42 chama std::cout.operator<<(42)
a=b | (a).operator= (b) | não pode ser não-membro | Dado std::string s;, s = "abc"; chama s.operator=("abc")
a(b...) | (a).operator()(b...) | não pode ser não-membro | Dado std::random_device r;, auto n = r(); chama r.operator()()
a[b...] | (a).operator | não pode ser não-membro | Dado std::map<int, int> m;, m[1] = 2; chama m.operator
a-> | (a).operator->( ) | não pode ser não-membro | Dado std::unique_ptr<S> p;, p->bar() chama p.operator->()
a@ | (a).operator@ (0) | operator@ (a, 0) | Dado std::vector<int>::iterator i;, i++ chama i.operator++(0)
Nesta tabela, `@` é um marcador de posição representando todos os operadores correspondentes: todos os operadores prefixos em @a, todos os operadores postfixos diferentes de -> em a@, todos os operadores infixos diferentes de = em a@b.
Além disso, para os operadores de comparação ==, !=, <, >, <=, >=, <=>, a resolução de sobrecarga também considera os candidatos reescritos `operator==` ou `operator<=>`.  // (desde C++20)
```

Operadores sobrecarregados (mas não os operadores embutidos) podem ser chamados usando a notação de função:
```cpp
    std::string str = "Hello, ";
    str.operator+=("world");                      // o mesmo que str += "world";
    operator<<(operator<<(std::cout, str), '\n'); // o mesmo que std::cout << str << '\n';
                                                  // (desde C++17) exceto para sequenciamento
```

#### Operadores sobrecarregados estáticos

Operadores sobrecarregados que são funções membro podem ser declarados [static](<#/doc/language/static>). No entanto, isso é permitido apenas para `operator()` e `operator[]`. Tais operadores podem ser chamados usando a notação de função. No entanto, quando esses operadores aparecem em expressões, eles ainda exigem um objeto do tipo de classe.
```cpp
    struct SwapThem
    {
        template<typename T>
        static void operator()(T& lhs, T& rhs) 
        {
            std::ranges::swap(lhs, rhs);
        }
    
        template<typename T>
        static void operator
        {
            std::ranges::swap(lhs, rhs);
        } 
    };
    inline constexpr SwapThem swap_them{};
    
    void foo()
    {
        int a = 1, b = 2;
    
        swap_them(a, b); // OK
        swap_them[a, b]; // OK
    
        SwapThem{}(a, b); // OK
        SwapThem{}[a, b]; // OK
    
        SwapThem::operator()(a, b); // OK
        SwapThem::operator; // OK
    
        SwapThem(a, b); // erro, construção inválida
        SwapThem[a, b]; // erro
    }
```

| (desde C++23)

### Restrições

*   Uma função de operador deve ter pelo menos um parâmetro de função ou parâmetro de objeto implícito cujo tipo seja uma classe, uma referência a uma classe, uma enumeração ou uma referência a uma enumeração.
*   Os operadores `::` (resolução de escopo), `.` (acesso a membro), `.*` (acesso a membro através de ponteiro para membro) e `?:` (condicional ternário) não podem ser sobrecarregados.
*   Novos operadores como `, `< >` ou `& |` não podem ser criados.
*   Não é possível alterar a precedência, o agrupamento ou o número de operandos dos operadores.
*   A sobrecarga do operador `- >` deve retornar um ponteiro bruto ou retornar um objeto (por referência ou por valor) para o qual o operador `- >` é, por sua vez, sobrecarregado.
*   As sobrecargas dos operadores `& &` e `||` perdem a avaliação de curto-circuito.

*   `& &`, `||` e `,` perdem suas [propriedades de sequenciamento](<#/doc/language/eval_order>) especiais quando sobrecarregados e se comportam como chamadas de função regulares, mesmo quando usados sem a notação de chamada de função.

| (até C++17)

### Implementações canônicas

Além das restrições acima, a linguagem não impõe outras restrições sobre o que os operadores sobrecarregados fazem, ou sobre o tipo de retorno (ele não participa da resolução de sobrecarga), mas, em geral, espera-se que os operadores sobrecarregados se comportem da forma mais semelhante possível aos operadores embutidos: `operator+` deve adicionar, em vez de multiplicar seus argumentos, `operator=` deve atribuir, etc. Espera-se que os operadores relacionados se comportem de forma semelhante (`operator+` e `operator+=` realizam a mesma operação de adição). Os tipos de retorno são limitados pelas expressões nas quais o operador deve ser usado: por exemplo, os operadores de atribuição retornam por referência para possibilitar a escrita `a = b = c = d`, porque os operadores embutidos permitem isso.

Operadores comumente sobrecarregados têm as seguintes formas típicas e canônicas:[1](<#/doc/language/operators>)

#### Operador de atribuição

O operador de atribuição `operator=` tem propriedades especiais: veja [atribuição por cópia](<#/doc/language/as_operator>) e [atribuição por movimento](<#/doc/language/move_operator>) para detalhes.

Espera-se que o operador de atribuição por cópia canônico [seja seguro em autoatribuição](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#c62-make-copy-assignment-safe-for-self-assignment>), e que retorne o operando esquerdo (lhs) por referência:
```cpp
    // atribuição por cópia
    T& operator=(const T& other)
    {
        // Protege a autoatribuição
        if (this == &other)
            return *this;
    
        // assume que *this gerencia um recurso reutilizável, como um buffer alocado na heap mArray
        if (size != other.size)           // recurso em *this não pode ser reutilizado
        {
            temp = new int[other.size];   // aloca recurso, se lançar exceção, não faz nada
            delete[] mArray;              // libera recurso em *this
            mArray = temp;
            size = other.size;
        }
    
        std::copy(other.mArray, other.mArray + other.size, mArray);
        return *this;
    }
```

Espera-se que a atribuição por movimento canônica [deixe o objeto movido de um estado válido](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#c64-a-move-operation-should-move-and-leave-its-source-in-a-valid-state>) (ou seja, um estado com invariantes de classe intactos), e que [não faça nada](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#c65-make-move-assignment-safe-for-self-assignment>) ou pelo menos deixe o objeto em um estado válido em autoatribuição, e retorne o operando esquerdo (lhs) por referência para não-const, e seja `noexcept`:
```cpp
    // atribuição por movimento
    T& operator=(T&& other) noexcept
    {
        // Protege a autoatribuição
        if (this == &other)
            return *this; // delete[]/size=0 também estaria ok
    
        delete[] mArray;                               // libera recurso em *this
        mArray = std::exchange(other.mArray, nullptr); // deixa other em estado válido
        size = std::exchange(other.size, 0);
        return *this;
    }
```

| (desde C++11)

Nas situações em que a atribuição por cópia não pode se beneficiar da reutilização de recursos (não gerencia um array alocado na heap e não possui um membro (possivelmente transitivo) que o faça, como um membro [std::vector](<#/doc/container/vector>) ou [std::string](<#/doc/string/basic_string>)), existe uma abreviação conveniente e popular: o operador de atribuição copy-and-swap, que recebe seu parâmetro por valor (funcionando assim como atribuição por cópia e por movimento, dependendo da categoria de valor do argumento), troca com o parâmetro e permite que o destrutor o limpe.
```cpp
    // atribuição por cópia (idioma copy-and-swap)
    T& T::operator=(T other) noexcept // chama o construtor de cópia ou movimento para construir other
    {
        std::swap(size, other.size); // troca recursos entre *this e other
        std::swap(mArray, other.mArray);
        return *this;
    } // o destrutor de other é chamado para liberar os recursos anteriormente gerenciados por *this
```

Esta forma fornece automaticamente [garantia forte de exceção](<#/doc/language/exceptions>), mas proíbe a reutilização de recursos.

#### Extração e inserção de stream

As sobrecargas de `operator>>` e `operator<<` que recebem um [std::istream](<#/doc/io/basic_istream>)& ou [std::ostream](<#/doc/io/basic_ostream>)& como argumento do lado esquerdo são conhecidas como operadores de inserção e extração. Como elas recebem o tipo definido pelo usuário como argumento do lado direito (`b` em `_a @ b_`), elas devem ser implementadas como não-membros.
```cpp
    std::ostream& operator<<(std::ostream& os, const T& obj)
    {
        // escreve obj no stream
        return os;
    }
    
    std::istream& operator>>(std::istream& is, T& obj)
    {
        // lê obj do stream
        if (/* T não pôde ser construído */)
            is.setstate(std::ios::failbit);
        return is;
    }
```

Esses operadores são às vezes implementados como [funções friend](<#/doc/language/friend>).

#### Operador de chamada de função

Quando uma classe definida pelo usuário sobrecarrega o operador de chamada de função `operator()`, ela se torna um tipo [FunctionObject](<#/doc/named_req/FunctionObject>).

Um objeto de tal tipo pode ser usado em uma expressão de chamada de função:
```cpp
    // Um objeto deste tipo representa uma função linear de uma variável a * x + b.
    struct Linear
    {
        double a, b;
    
        double operator()(double x) const
        {
            return a * x + b;
        }
    };
    
    int main()
    {
        Linear f{2, 1};  // Representa a função 2x + 1.
        Linear g{-1, 0}; // Representa a função -x.
        // f e g são objetos que podem ser usados como uma função.
    
        double f_0 = f(0);
        double f_1 = f(1);
    
        double g_0 = g(0);
    }
```

Muitos [algoritmos](<#/doc/algorithm>) da biblioteca padrão aceitam [FunctionObjects](<#/doc/named_req/FunctionObject>) para personalizar o comportamento. Não há formas canônicas particularmente notáveis de `operator()`, mas para ilustrar o uso:

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    struct Sum
    {
        int sum = 0;
        void operator()(int n) { sum += n; }
    };
    
    int main()
    {
        std::vector<int> v = {1, 2, 3, 4, 5};
        Sum s = std::for_each(v.begin(), v.end(), Sum());
        std::cout << "The sum is " << s.sum << '\n';
    }
```

Saída:
```
    The sum is 15
```

#### Incremento e decremento

Quando o operador de incremento ou decremento postfixo aparece em uma expressão, a função definida pelo usuário correspondente (`operator++` ou `operator--`) é chamada com um argumento inteiro `0`. Tipicamente, é declarada como `T operator++(int)` ou `T operator--(int)`, onde o argumento é ignorado. Os operadores de incremento e decremento postfixos são geralmente implementados em termos das versões prefixas:
```cpp
    struct X
    {
        // incremento prefixo
        X& operator++()
        {
            // o incremento real ocorre aqui
            return *this; // retorna o novo valor por referência
        }
    
        // incremento postfixo
        X operator++(int)
        {
            X old = *this; // copia o valor antigo
            operator++();  // incremento prefixo
            return old;    // retorna o valor antigo
        }
    
        // decremento prefixo
        X& operator--()
        {
            // o decremento real ocorre aqui
            return *this; // retorna o novo valor por referência
        }
    
        // decremento postfixo
        X operator--(int)
        {
            X old = *this; // copia o valor antigo
            operator--();  // decremento prefixo
            return old;    // retorna o valor antigo
        }
    };
```

Embora as implementações canônicas dos operadores de incremento e decremento prefixos retornem por referência, como em qualquer sobrecarga de operador, o tipo de retorno é definido pelo usuário; por exemplo, as sobrecargas desses operadores para [std::atomic](<#/doc/atomic/atomic>) retornam por valor.

#### Operadores aritméticos binários

Operadores binários são tipicamente implementados como não-membros para manter a simetria (por exemplo, ao adicionar um número complexo e um inteiro, se `operator+` for uma função membro do tipo complexo, então apenas `complex + integer` compilaria, e não `integer + complex`). Como para cada operador aritmético binário existe um operador de atribuição composta correspondente, as formas canônicas dos operadores binários são implementadas em termos de suas atribuições compostas:
```cpp
    class X
    {
    public:
        X& operator+=(const X& rhs) // atribuição composta (não precisa ser um membro,
        {                           // mas frequentemente é, para modificar os membros privados)
            /* a adição de rhs a *this ocorre aqui */
            return *this; // retorna o resultado por referência
        }
    
        // friends definidos dentro do corpo da classe são inline e estão ocultos da pesquisa não-ADL
        friend X operator+(X lhs,        // passar lhs por valor ajuda a otimizar cadeias a+b+c
                           const X& rhs) // caso contrário, ambos os parâmetros podem ser referências const
        {
            lhs += rhs; // reutiliza a atribuição composta
            return lhs; // retorna o resultado por valor (usa construtor de movimento)
        }
    };
```

#### Operadores de comparação

Algoritmos da biblioteca padrão como [std::sort](<#/doc/algorithm/sort>) e contêineres como [std::set](<#/doc/container/set>) esperam que `operator<` seja definido, por padrão, para os tipos fornecidos pelo usuário, e esperam que ele implemente uma ordenação fraca estrita (satisfazendo assim os requisitos [Compare](<#/doc/named_req/Compare>)). Uma maneira idiomática de implementar a ordenação fraca estrita para uma estrutura é usar a comparação lexicográfica fornecida por [std::tie](<#/doc/utility/tuple/tie>):
```cpp
    struct Record
    {
        std::string name;
        unsigned int floor;
        double weight;
    
        friend bool operator<(const Record& l, const Record& r)
        {
            return std::tie(l.name, l.floor, l.weight)
                 < std::tie(r.name, r.floor, r.weight); // mantém a mesma ordem
        }
    };
```

Tipicamente, uma vez que `operator<` é fornecido, os outros operadores relacionais são implementados em termos de `operator<`.
```cpp
    inline bool operator< (const X& lhs, const X& rhs) { /* faz a comparação real */ }
    inline bool operator> (const X& lhs, const X& rhs) { return rhs < lhs; }
    inline bool operator<=(const X& lhs, const X& rhs) { return !(lhs > rhs); }
    inline bool operator>=(const X& lhs, const X& rhs) { return !(lhs < rhs); }
```

Da mesma forma, o operador de desigualdade é tipicamente implementado em termos de `operator==`:
```cpp
    inline bool operator==(const X& lhs, const X& rhs) { /* faz a comparação real */ }
    inline bool operator!=(const X& lhs, const X& rhs) { return !(lhs == rhs); }
```

Quando a comparação de três vias (como [std::memcmp](<#/doc/string/byte/memcmp>) ou [std::string::compare](<#/doc/string/basic_string/compare>)) é fornecida, todos os seis operadores de comparação de duas vias podem ser expressos através dela:
```cpp
    inline bool operator==(const X& lhs, const X& rhs) { return cmp(lhs,rhs) == 0; }
    inline bool operator!=(const X& lhs, const X& rhs) { return cmp(lhs,rhs) != 0; }
    inline bool operator< (const X& lhs, const X& rhs) { return cmp(lhs,rhs) <  0; }
    inline bool operator> (const X& lhs, const X& rhs) { return cmp(lhs,rhs) >  0; }
    inline bool operator<=(const X& lhs, const X& rhs) { return cmp(lhs,rhs) <= 0; }
    inline bool operator>=(const X& lhs, const X& rhs) { return cmp(lhs,rhs) >= 0; }
```

#### Operador de subscrito de array

Classes definidas pelo usuário que fornecem acesso tipo array que permite tanto leitura quanto escrita tipicamente definem duas sobrecargas para `operator[]`: variantes `const` e não-`const`:
```cpp
    struct T
    {
              value_t& operator idx)       { return mVector[idx]; }
        const value_t& operator idx) const { return mVector[idx]; }
    };
```

Alternativamente, elas podem ser expressas como um único template de função membro usando um [parâmetro de objeto explícito](<#/doc/language/member_functions>):
```cpp
    struct T
    {
        decltype(auto) operator idx) 
        { 
            return self.mVector[idx]; 
        }
    };
```

| (desde C++23)

Se o tipo de valor for conhecido como um tipo escalar, a variante `const` deve retornar por valor.

Onde o acesso direto aos elementos do contêiner não é desejado ou não é possível, ou para distinguir entre o uso de lvalue `c[i] = v;` e rvalue `v = c[i];`, `operator[]` pode retornar um proxy. Veja, por exemplo, [std::bitset::operator[]](<#/doc/utility/bitset/operator_at>).

```cpp
`operator[]` pode receber apenas um subscrito. Para fornecer semântica de acesso a array multidimensional, por exemplo, para implementar um acesso a array 3D `a[i][j][k] = x;`, `operator[]` deve retornar uma referência a um plano 2D, que deve ter seu próprio `operator[]` que retorna uma referência a uma linha 1D, que deve ter `operator[]` que retorna uma referência ao elemento. Para evitar essa complexidade, algumas bibliotecas optam por sobrecarregar `operator()` em vez disso, de modo que as expressões de acesso 3D tenham a sintaxe tipo Fortran `a(i, j, k) = x;`.  // (até C++23)
`operator[]` pode receber qualquer número de subscritos. Por exemplo, um `operator[]` de uma classe de array 3D declarada como `T& operator x, std::size_t y, std::size_t z);` pode acessar diretamente os elementos. Execute este código
```
```cpp
    #include <array>
    #include <cassert>
    #include <iostream>
    
    template<typename T, std::size_t Z, std::size_t Y, std::size_t X>
    struct Array3d
    {
        std::array<T, X * Y * Z> m{};
    
        constexpr T& operator z, std::size_t y, std::size_t x) // C++23
        {
            assert(x < X and y < Y and z < Z);
            return m[z * Y * X + y * X + x];
        }
    };
    
    int main()
    {
        Array3d<int, 4, 3, 2> v;
        v[3, 2, 1] = 42;
        std::cout << "v[3, 2, 1] = " << v[3, 2, 1] << '\n';
    }
```

Saída:
```
    v[3, 2, 1] = 42
```

| (desde C++23)

#### Operadores aritméticos bit a bit

Classes e enumerações definidas pelo usuário que implementam os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) são obrigadas a sobrecarregar os operadores aritméticos bit a bit `operator&`, `operator|`, `operator^`, `operator~`, `operator&=`, `operator|=` e `operator^=`, e podem opcionalmente sobrecarregar os operadores de deslocamento `operator<<`, `operator>>`, `operator>>=` e `operator<<=`. As implementações canônicas geralmente seguem o padrão para operadores aritméticos binários descritos acima.

#### Operador de negação booleana

```cpp
O operador `operator!` é comumente sobrecarregado por classes definidas pelo usuário que se destinam a ser usadas em contextos booleanos. Tais classes também fornecem uma função de conversão definida pelo usuário para o tipo booleano (veja std::basic_ios para o exemplo da biblioteca padrão), e o comportamento esperado de `operator!` é retornar o valor oposto de `operator bool`.  // (até C++11)
Como o operador embutido `!` realiza conversão contextual para bool, classes definidas pelo usuário que se destinam a ser usadas em contextos booleanos poderiam fornecer apenas `operator bool` e não precisariam sobrecarregar `operator!`.  // (desde C++11)
```

#### Operadores raramente sobrecarregados

Os seguintes operadores são raramente sobrecarregados:

*   O operador de endereço, `operator&`. Se o `&` unário for aplicado a um lvalue de tipo incompleto e o tipo completo declarar um `operator&` sobrecarregado, é não especificado se o operador tem o significado embutido ou se a função de operador é chamada. Como este operador pode ser sobrecarregado, bibliotecas genéricas usam [std::addressof](<#/doc/memory/addressof>) para obter endereços de objetos de tipos definidos pelo usuário. O exemplo mais conhecido de um `operator&` sobrecarregado canônico é a classe Microsoft [`CComPtrBase`](<https://docs.microsoft.com/en-us/cpp/atl/reference/ccomptrbase-class?view=msvc-160#operator_amp>). Um exemplo do uso deste operador em EDSL pode ser encontrado em [boost.spirit](<https://www.boost.org/doc/libs/release/libs/spirit/doc/html/spirit/qi/reference/operator/and_predicate.html>).
*   Os operadores lógicos booleanos, `operator&&` e `operator||`. Ao contrário das versões embutidas, as sobrecargas não podem implementar avaliação de curto-circuito. Também ao contrário das versões embutidas, elas não sequenciam seu operando esquerdo antes do direito.(até C++17) Na biblioteca padrão, esses operadores são sobrecarregados apenas para [std::valarray](<#/doc/numeric/valarray>).
*   O operador vírgula, `operator,`. Ao contrário da versão embutida, as sobrecargas não sequenciam seu operando esquerdo antes do direito.(até C++17) Como este operador pode ser sobrecarregado, bibliotecas genéricas usam expressões como `a, void(), b` em vez de `a, b` para sequenciar a execução de expressões de tipos definidos pelo usuário. A biblioteca boost usa `operator,` em [boost.assign](<https://www.boost.org/doc/libs/release/libs/assign/doc/index.html#intro>), [boost.spirit](<https://github.com/boostorg/spirit/blob/develop/include/boost/spirit/home/qi/string/symbols.hpp#L317>) e outras bibliotecas. A biblioteca de acesso a banco de dados [SOCI](<https://soci.sourceforge.net/doc.html>) também sobrecarrega `operator,`.
*   O operador de acesso a membro através de ponteiro para membro `operator->*`. Não há desvantagens específicas em sobrecarregar este operador, mas ele é raramente usado na prática. Foi sugerido que ele poderia fazer parte de uma [interface de ponteiro inteligente](<https://www.aristeia.com/Papers/DDJ_Oct_1999.pdf>), e de fato é usado nessa capacidade por atores em [boost.phoenix](<https://www.boost.org/doc/libs/release/libs/phoenix/doc/html/phoenix/modules/operator.html#phoenix.modules.operator.member_pointer_operator>). É mais comum em EDSLs como [cpp.react](<https://github.com/schlangster/cpp.react/blob/legacy1/include/react/Signal.h#L557>).

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_static_call_operator`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `operator()` estático
[`__cpp_multidimensional_subscript`](<#/doc/feature_test>) | [`202211L`](<#/>) | (C++23) | `operator[]` estático

### Palavras-chave

[`operator`](<#/doc/keyword/operator>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    class Fraction
    {
        // ou std::gcd do C++17
        constexpr int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
    
        int n, d;
    public:
        constexpr Fraction(int n, int d = 1) : n(n / gcd(n, d)), d(d / gcd(n, d)) {}
    
        constexpr int num() const { return n; }
        constexpr int den() const { return d; }
    
        constexpr Fraction& operator*=(const Fraction& rhs)
        {
            int new_n = n * rhs.n / gcd(n * rhs.n, d * rhs.d);
            d = d * rhs.d / gcd(n * rhs.n, d * rhs.d);
            n = new_n;
            return *this;
        }
    };
    
    std::ostream& operator<<(std::ostream& out, const Fraction& f)
    {
       return out << f.num() << '/' << f.den();
    }
    
    constexpr bool operator==(const Fraction& lhs, const Fraction& rhs)
    {
        return lhs.num() == rhs.num() && lhs.den() == rhs.den();
    }
    
    constexpr bool operator!=(const Fraction& lhs, const Fraction& rhs)
    {
        return !(lhs == rhs);
    }
    
    constexpr Fraction operator*(Fraction lhs, const Fraction& rhs)
    {
        return lhs *= rhs;
    }
    
    int main()
    {
        constexpr Fraction f1{3, 8}, f2{1, 2}, f3{10, 2};
        std::cout << f1 << " * " << f2 << " = " << f1 * f2 << '\n'
                  << f2 << " * " << f3 << " = " << f2 * f3 << '\n'
                  <<  2 << " * " << f1 << " = " <<  2 * f1 << '\n';
        static_assert(f3 == f2 * 10);
    }
```

Saída:
```
    3/8 * 1/2 = 3/16
    1/2 * 5/1 = 5/2
    2 * 3/8 = 3/4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1481](<https://cplusplus.github.io/CWG/issues/1481.html>) | C++98 | o operador de incremento prefixo não-membro só poderia ter um parâmetro
do tipo de classe, tipo de enumeração, ou um tipo de referência para tais tipos | nenhum requisito de tipo
[CWG 2931](<https://cplusplus.github.io/CWG/issues/2931.html>) | C++23 | funções de operador membro de objeto explícito só poderiam não ter parâmetro
do tipo de classe, tipo de enumeração, ou um tipo de referência para tais tipos | proibido

### Ver também

*   [Precedência de operadores](<#/doc/language/operator_precedence>)
*   [Sintaxe alternativa de operador](<#/doc/language/operator_alternative>)
*   [Pesquisa dependente de argumento](<#/doc/language/adl>)

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | [incremento
decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | [acesso a membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)
a = b
a += b
a -= b
a *= b
a /= b
a %= b
a &= b
a |= b
a ^= b
a <<= b
a >>= b | ++a
--a
a++
a-- | +a
-a
a + b
a - b
a * b
a / b
a % b
~a
a & b
a | b
a ^ b
a << b
a >> b | !a
a && b
a || b | a == b
a != b
a < b
a > b
a <= b
a >= b
a <=> b | a[...]
*a
&a
a->b
a.b
a->*b
a.*b | chamada de função

a(...)
vírgula

a, b
condicional

a ? b : c
Operadores especiais
[`static_cast`](<#/doc/language/static_cast>) converte um tipo em outro tipo relacionado
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte tipo em tipo não relacionado
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo em outro por uma mistura de static_cast, const_cast e reinterpret_cast
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)

### Links externos

1.  [↑](<#/doc/language/operators>) [Operator Overloading](<https://stackoverflow.com/questions/4421706/4421719#4421719>) no FAQ de C++ do StackOverflow

---
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Padrão]: Padrão no qual o recurso é introduzido; RD significa relatório de defeito contra essa revisão.