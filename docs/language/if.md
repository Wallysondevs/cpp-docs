# if statement

Executa condicionalmente outra instrução.

Usado onde o código precisa ser executado com base em uma condição, ou se a instrução if é avaliada em um contexto manifestamente avaliado em tempo de compilação (desde C++23).

### Syntax

---
```cpp
attr ﻿(optional) `if` `constexpr`(optional)
`(` init-statement ﻿(optional) condition `)` statement-true  // (1)
attr ﻿(optional) `if` `constexpr`(optional)
`(` init-statement ﻿(optional) condition `)` statement-true `else` statement-false  // (2)
attr ﻿(optional) `if` `!`(optional) `consteval` compound-statement  // (3) (desde C++23)
attr ﻿(optional) `if` `!`(optional) `consteval` compound-statement `else` statement  // (4) (desde C++23)
```

1) Instrução if sem um ramo else

2) Instrução if com um ramo else

3) Instrução if consteval sem um ramo else

4) Instrução if consteval com um ramo else

- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- `constexpr` — (desde C++17) se presente, a instrução se torna uma [instrução if constexpr](<#/doc/language/if>)
- **init-statement** — (desde C++17) ou

  * uma [instrução de expressão](<#/doc/language/statements>) (que pode ser uma instrução nula ;)
  * uma [declaração simples](<#/doc/language/declarations>), tipicamente uma declaração de uma variável com inicializador, mas pode declarar um número arbitrário de variáveis ou ser uma declaração de [structured binding](<#/doc/language/structured_binding>)

|

  * uma [declaração de alias](<#/doc/language/type_alias>)

| (desde C++23)

Note que qualquer init-statement deve terminar com um ponto e vírgula. É por isso que é frequentemente descrito informalmente como uma expressão ou uma declaração seguida por um ponto e vírgula.

- **condition** — uma [condição](<#/doc/language/if>)
- **statement-true** — a [instrução](<#/doc/language/statements>) a ser executada se a condição resultar em true
- **statement-false** — a instrução a ser executada se a condição resultar em false
- **compound-statement** — a [instrução composta](<#/doc/language/statements>) a ser executada se a instrução if for avaliada em um [contexto manifestamente avaliado em tempo de compilação](<#/doc/language/constant_expression>) (ou não for avaliada em tal contexto se `!` preceder consteval)
- **statement** — a instrução (deve ser uma instrução composta, veja [abaixo](<#/doc/language/if>)) a ser executada se a instrução if não for avaliada em um contexto manifestamente avaliado em tempo de compilação (ou for avaliada em tal contexto se `!` preceder consteval)

### Condition

Uma condição pode ser uma [expressão](<#/doc/language/expressions>) ou uma [declaração simples](<#/doc/language/declarations>).

  * Se puder ser sintaticamente resolvida como uma declaração de [structured binding](<#/doc/language/structured_binding>), ela é interpretada como uma declaração de structured binding.

| (desde C++26)

  * Se puder ser sintaticamente resolvida como uma expressão, ela é tratada como uma expressão. Caso contrário, é tratada como uma declaração que não é uma declaração de structured binding (desde C++26).

Quando o controle atinge a condição, a condição produzirá um valor, que é usado para determinar para qual ramo o controle irá.

#### Expression

Se a condição for uma expressão, o valor que ela produz é o valor da expressão contextualmente convertido para bool. Se essa conversão for malformada, o programa é malformado.

#### Declaration

Se a condição for uma declaração simples, o valor que ela produz é o valor da variável de decisão (veja abaixo) contextualmente convertido para bool. Se essa conversão for malformada, o programa é malformado.

##### Non-structured binding declaration

A declaração possui as seguintes restrições:

  * Conforma-se sintaticamente à seguinte forma:

    

  * type-specifier-seq declarator `=` assignment-expression

| (até C++11)

    

  * attribute-specifier-seq(optional) decl-specifier-seq declarator brace-or-equal-initializer

| (desde C++11)

  * O declarator não pode especificar uma [função](<#/doc/language/function>) ou um [array](<#/doc/language/array>).
  * A [sequência de especificadores de tipo](<#/doc/language/declarations>) (até C++11) [sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr, e (desde C++11) não pode definir uma [classe](<#/doc/language/class>) ou [enumeração](<#/doc/language/enum>).

A variável de decisão da declaração é a variável declarada.

##### Structured binding declaration

A declaração possui as seguintes restrições:

  * A expressão em seu [inicializador](<#/doc/language/initialization>) não pode ser de um tipo array.
  * A [sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr.

A variável de decisão da declaração é a variável inventada e [introduzida pela declaração](<#/doc/language/structured_binding>). | (desde C++26)

### Branch selection

Se a condição resultar em true, statement-true é executado.

Se a parte else da instrução if estiver presente e a condição resultar em false, statement-false é executado.

Se a parte else da instrução if estiver presente e statement-true também for uma instrução if, então essa instrução if interna também deve conter uma parte else (em outras palavras, em instruções if aninhadas, o else é associado ao if mais próximo que ainda não possui um else associado).

Run this code
```cpp
    #include <iostream>
    
    int main()
    {
        // simple if-statement with an else clause
        int i = 2;
        if (i > 2)
            std::cout << i << " is greater than 2\n";
        else
            std::cout << i << " is not greater than 2\n";
    
        // nested if-statement
        int j = 1;
        if (i > 1)
            if (j > 2)
                std::cout << i << " > 1 and " << j << " > 2\n";
            else // this else is part of if (j > 2), not of if (i > 1)
                std::cout << i << " > 1 and " << j << " <= 2\n";
    
        // declarations can be used as conditions with dynamic_cast
        struct Base
        {
            virtual ~Base() {}
        };
    
        struct Derived : Base
        {
            void df() { std::cout << "df()\n"; }
        };
    
        Base* bp1 = new Base;
        Base* bp2 = new Derived;
    
        if (Derived* p = dynamic_cast<Derived*>(bp1)) // cast fails, returns nullptr
            p->df(); // not executed
    
        if (auto p = dynamic_cast<Derived*>(bp2)) // cast succeeds
            p->df(); // executed
    }
```

Output:
```
    2 is not greater than 2
    2 > 1 and 1 <= 2
    df()
```

### if statements with initializer

Se init-statement for usado, a instrução if é equivalente a |
---
`{`

    init-statement

    attr ﻿(optional) `if` `constexpr`(optional) `(` condition `)`

    statement-true

`}`

ou

---
`{`

    init-statement

    attr ﻿(optional) `if` `constexpr`(optional) `(` condition `)`

    statement-true

    `else`

    statement-false

`}`

Exceto que os nomes declarados pelo init-statement (se init-statement for uma declaração) e os nomes declarados pela condição (se a condição for uma declaração) estão no mesmo escopo, que também é o escopo de ambas as instruções.
```cpp
    std::map<int, std::string> m;
    std::mutex mx;
    extern bool shared_flag; // guarded by mx
    
    int demo()
    {
        if (auto it = m.find(10); it != m.end())
            return it->second.size();
    
        if (char buf[10]; std::fgets(buf, 10, stdin))
            m[0] += buf;
    
        if (std::lock_guard lock(mx); shared_flag)
        {
            unsafe_ping();
            shared_flag = false;
        }
    
        if (int s; int count = ReadBytesWithSignal(&s))
        {
            publish(count);
            raise(s);
        }
    
        if (const auto keywords = {"if", "for", "while"};
            std::ranges::any_of(keywords, &tok { return tok == kw; }))
        {
            std::cerr << "Token must not be a keyword\n";
        }
    }
```

(desde C++17)

### Constexpr if

A instrução que começa com if constexpr é conhecida como a _instrução if constexpr_. Todas as subinstruções de uma instrução if constexpr são [instruções com fluxo de controle limitado](<#/doc/language/statements>). Em uma instrução if constexpr, a condição deve ser uma [expressão constante contextualmente convertida do tipo bool](<#/doc/language/constant_expression>) (até C++23) uma expressão [contextualmente convertida para bool](<#/doc/language/implicit_cast>), onde a conversão é uma [expressão constante](<#/doc/language/constant_expression>) (desde C++23). Se a condição resultar em true, então statement-false é descartado (se presente), caso contrário, statement-true é descartado. As instruções return em uma instrução descartada não participam da dedução do tipo de retorno da função:
```cpp
    template<typename T>
    auto get_value(T t)
    {
        if constexpr (std::is_pointer_v<T>)
            return *t; // deduces return type to int for T = int*
        else
            return t;  // deduces return type to int for T = int
    }
```

A instrução descartada pode [ODR-usar](<#/doc/language/definition>) uma variável que não está definida:
```cpp
    extern int x; // no definition of x required
    
    int f()
    {
        if constexpr (true)
            return 0;
        else if (x)
            return x;
        else
            return -x;
    }
```

Fora de um template, uma instrução descartada é totalmente verificada. if constexpr não é um substituto para a diretiva de pré-processamento [` #if`](<#/doc/preprocessor/conditional>):
```cpp
    void f()
    {
        if constexpr(false)
        {
            int i = 0;
            int *p = i; // Error even though in discarded statement
        }
    }
```

Se uma instrução if constexpr aparecer dentro de uma [entidade template](<#/doc/language/templates>), e se a condição não for [dependente de valor](<#/doc/language/dependent_name>) após a instanciação, a instrução descartada não é instanciada quando o template envolvente é instanciado.
```cpp
    template<typename T, typename ... Rest>
    void g(T&& p, Rest&& ...rs)
    {
        // ... handle p
        if constexpr (sizeof...(rs) > 0)
            g(rs...); // never instantiated with an empty argument list
    }
```

A condição permanece dependente de valor após a instanciação ser um template aninhado:
```cpp
    template<class T>
    void g()
    {
        auto lm = =
        {
            if constexpr (sizeof(T) == 1 && sizeof p == 1)
            {
                // this condition remains value-dependent after instantiation of g<T>,
                // which affects implicit lambda captures
                // this compound statement may be discarded only after
                // instantiation of the lambda body
            }
        };
    }
```

A instrução descartada não pode ser malformada para cada especialização possível:
```cpp
    template<typename T>
    void f()
    {
        if constexpr (std::is_arithmetic_v<T>)
            // ...
        else {
            using invalid_array = int[-1]; // ill-formed: invalid for every T
            static_assert(false, "Must be arithmetic"); // ill-formed before CWG2518
        }
    }
```

A solução alternativa comum antes da implementação do [problema CWG 2518](<https://cplusplus.github.io/CWG/issues/2518.html>) para tal instrução catch-all é uma expressão dependente de tipo que é sempre falsa:
```cpp
    template<typename>
    constexpr bool dependent_false_v = false;
    
    template<typename T>
    void f()
    {
        if constexpr (std::is_arithmetic_v<T>)
            // ...
        else {
            // workaround before CWG2518
            static_assert(dependent_false_v<T>, "Must be arithmetic");
        }
    }
```

Uma [declaração typedef](<#/doc/language/typedef>) ou [declaração de alias](<#/doc/language/type_alias>) (desde C++23) pode ser usada como o init-statement de uma instrução if constexpr para reduzir o escopo do alias de tipo. | | Esta seção está incompleta
Razão: sem exemplo
(desde C++17)

### Consteval if

A instrução que começa com if consteval é conhecida como a _instrução if consteval_. Todas as subinstruções de uma instrução if consteval são [instruções com fluxo de controle limitado](<#/doc/language/statements>). statement deve ser uma instrução composta, e ainda será tratada como parte da instrução if consteval mesmo que não seja uma instrução composta (e, portanto, resulte em um erro de compilação): Run this code
```cpp
    constexpr void f(bool b)
    {
        if (true)
            if consteval {}
            else ; // error: not a compound-statement
                   // else not associated with outer if
    }
```

Se uma instrução if consteval for avaliada em um [contexto manifestamente avaliado em tempo de compilação](<#/doc/language/constant_expression>), compound-statement é executado. Caso contrário, statement é executado se estiver presente. Se a instrução começar com if !consteval, o compound-statement e o statement (se houver) devem ser ambos instruções compostas. Tais instruções não são consideradas instruções if consteval, mas são equivalentes a instruções if consteval:

  * if !consteval {/* stmt */ } é equivalente a

     if consteval {} else {/* stmt */}.

  * if !consteval {/* stmt-1 */} else {/* stmt-2 */} é equivalente a

     if consteval {/* stmt-2 */} else {/* stmt-1 */}.
compound-statement em uma instrução if consteval (ou statement na forma negativa) está em um [contexto de função imediata](<#/doc/language/consteval>), no qual uma chamada para uma função imediata não precisa ser uma expressão constante. Run this code
```cpp
    #include <cmath>
    #include <cstdint>
    #include <cstring>
    #include <iostream>
    
    constexpr bool is_constant_evaluated() noexcept
    {
        if consteval { return true; } else { return false; }
    }
    
    constexpr bool is_runtime_evaluated() noexcept
    {
        if not consteval { return true; } else { return false; }
    }
    
    consteval std::uint64_t ipow_ct(std::uint64_t base, std::uint8_t exp)
    {
        if (!base) return base;
        std::uint64_t res{1};
        while (exp)
        {
            if (exp & 1) res *= base;
            exp /= 2;
            base *= base;
        }
        return res;
    }
    
    constexpr std::uint64_t ipow(std::uint64_t base, std::uint8_t exp)
    {
        if consteval // use a compile-time friendly algorithm
        {
            return ipow_ct(base, exp);
        }
        else // use runtime evaluation
        {
            return std::pow(base, exp);
        }
    }
    
    int main(int, const char* argv[])
    {
        static_assert(ipow(0, 10) == 0 && ipow(2, 10) == 1024);
        std::cout << ipow(std::strlen(argv[0]), 3) << '\n';
    }
```

| (desde C++23)

### Notes

Se statement-true ou statement-false não for uma instrução composta, é tratado como se fosse:
```cpp
    if (x)
        int i;
    // i is no longer in scope
```

é o mesmo que
```cpp
    if (x)
    {
        int i;
    }
    // i is no longer in scope
```

O escopo do nome introduzido pela condição, se for uma declaração, é o escopo combinado dos corpos de ambas as instruções:
```cpp
    if (int x = f())
    {
        int x; // error: redeclaration of x
    }
    else
    {
        int x; // error: redeclaration of x
    }
```

Se statement-true for acessado por [`goto`](<#/doc/language/goto>) ou longjmp, a condição não é avaliada e statement-false não é executado.

```cpp
Conversões built-in não são permitidas na condição de uma instrução if constexpr, exceto por conversões integrais não restritivas para bool.  // (desde C++17)
(até C++23)
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_if_constexpr` | `201606L` | (C++17) | if constexpr
`__cpp_if_consteval` | `202106L` | (C++23) | if consteval
```

### Keywords

[`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>), [`constexpr`](<#/doc/keyword/constexpr>), [`consteval`](<#/doc/keyword/consteval>)

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 631](<https://cplusplus.github.io/CWG/issues/631.html>) | C++98 | o fluxo de controle era não especificado se a primeira subinstrução fosse alcançada via um rótulo | a condição não é avaliada e a segunda subinstrução não é executada (o mesmo que em C)

### See also

[ is_constant_evaluated](<#/doc/types/is_constant_evaluated>)(C++20) | detecta se a chamada ocorre dentro de um contexto avaliado em tempo de compilação
(função)
[Documentação C](<#/>) para instrução if