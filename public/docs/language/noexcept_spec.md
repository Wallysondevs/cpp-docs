# especificador noexcept (desde C++11)

Especifica se uma função pode lançar exceções.

### Sintaxe

---
```cpp
`noexcept`  // (1)
`noexcept(` expression`)`  // (2)
`throw()` | (3) | (obsoleto em C++17)
(removido em C++20)
```

1) O mesmo que `noexcept(true)`

2) Se a expressão avalia para true, a função é declarada para não lançar nenhuma exceção. Um `(` após `noexcept` é sempre parte desta forma (nunca pode iniciar um inicializador).

3) O mesmo que `noexcept(true)` (veja [especificação de exceção dinâmica](<#/doc/language/except_spec>) para sua semântica antes de C++17)

- **expression** — [expressão constante convertida contextualmente do tipo bool](<#/doc/language/constant_expression>)

### Explicação

A especificação noexcept não faz parte do tipo da função (assim como a [especificação de exceção dinâmica](<#/doc/language/except_spec>)) e só pode aparecer como parte de um [declarador lambda](<#/doc/language/lambda>) ou de um [declarador de função](<#/doc/language/function>) de nível superior ao declarar funções, variáveis, membros de dados não estáticos do tipo função, ponteiro para função, referência para função ou ponteiro para função membro, e também ao declarar um parâmetro ou um tipo de retorno em uma dessas declarações que, por sua vez, seja um ponteiro ou referência para função. Não pode aparecer em uma declaração [typedef](<#/doc/language/typedef>) ou [type alias](<#/doc/language/type_alias>).
```cpp
    void f() noexcept; // the function f() does not throw
    void (*fp)() noexcept(false); // fp points to a function that may throw
    void g(void pfa() noexcept);  // g takes a pointer to function that doesn't throw
    // typedef int (*pf)() noexcept; // error
```

```cpp
  // (até C++17)
A especificação noexcept faz parte do tipo da função e pode aparecer como parte de qualquer declarador de função.  // (desde C++17)
```

Toda função em C++ é _não-lançadora_ ou _potencialmente lançadora_:

*   funções _potencialmente lançadoras_ são:

    *   funções declaradas com uma [especificação de exceção dinâmica](<#/doc/language/except_spec>) não vazia

| (até C++17)

    *   funções declaradas com o especificador `noexcept` cuja expressão avalia para `false`
    *   funções declaradas sem o especificador `noexcept`, exceto para

        *   [destrutores](<#/doc/language/destructor>) a menos que o destrutor de qualquer base ou membro potencialmente construído seja _potencialmente lançador_ (veja abaixo)
        *   [construtores padrão](<#/doc/language/default_constructor>), [construtores de cópia](<#/doc/language/copy_constructor>), [construtores de movimento](<#/doc/language/move_constructor>) que são implicitamente declarados ou padronizados em sua primeira declaração, a menos que

            *   um construtor para uma base ou membro que a definição implícita do construtor chamaria seja _potencialmente lançador_ (veja abaixo)
            *   uma subexpressão de tal inicialização, como uma expressão de argumento padrão, seja _potencialmente lançadora_ (veja abaixo)
            *   um inicializador de membro padrão (apenas para construtor padrão) seja _potencialmente lançador_ (veja abaixo)

        *   operadores de [atribuição de cópia](<#/doc/language/as_operator>), operadores de [atribuição de movimento](<#/doc/language/move_operator>) que são implicitamente declarados ou padronizados em sua primeira declaração, a menos que a invocação de qualquer operador de atribuição na definição implícita seja _potencialmente lançadora_ (veja abaixo)

        *   operadores de [comparação](<#/doc/language/default_comparisons>) que são padronizados em sua primeira declaração, a menos que a invocação de qualquer operador de comparação na definição implícita seja _potencialmente lançadora_ (veja abaixo)

| (desde C++20)

        *   [funções de desalocação](<#/doc/memory/new/operator_delete>)

*   funções não-lançadoras são todas as outras (aquelas com especificador noexcept cuja expressão avalia para `true`, bem como destrutores, funções membro especiais padronizadas e funções de desalocação)

[Instanciações explícitas](<#/doc/language/function_template>) podem usar o especificador noexcept, mas não é obrigatório. Se usado, a especificação de exceção deve ser a mesma para todas as outras declarações. Um diagnóstico é exigido apenas se as especificações de exceção não forem as mesmas dentro de uma única unidade de tradução.

Funções que diferem apenas em sua especificação de exceção não podem ser sobrecarregadas (assim como o tipo de retorno, a especificação de exceção faz parte do tipo da função, mas não da assinatura da função)(desde C++17).
```cpp
    void f() noexcept;
    void f(); // error: different exception specification
    void g() noexcept(false);
    void g(); // ok, both declarations for g are potentially-throwing
```

Ponteiros (incluindo ponteiros para função membro) para funções não-lançadoras podem ser atribuídos ou usados para inicializar (até C++17) são [implicitamente conversíveis](<#/doc/language/implicit_cast>) para (desde C++17) ponteiros para funções potencialmente lançadoras, mas não o contrário.
```cpp
    void ft(); // potentially-throwing
    void (*fn)() noexcept = ft; // error
```

Se uma função virtual é não-lançadora, todas as declarações, incluindo a definição, de cada overrider devem ser não-lançadoras também, a menos que o overrider seja definido como deletado:
```cpp
    struct B
    {
        virtual void f() noexcept;
        virtual void g();
        virtual void h() noexcept = delete;
    };
    
    struct D: B
    {
        void f();          // ill-formed: D::f is potentially-throwing, B::f is non-throwing
        void g() noexcept; // OK
        void h() = delete; // OK
    };
```

Funções não-lançadoras podem chamar funções potencialmente lançadoras. Sempre que uma exceção é lançada e a busca por um handler encontra o bloco mais externo de uma função não-lançadora, a função [std::terminate](<#/doc/error/terminate>) é chamada:
```cpp
    extern void f(); // potentially-throwing
    
    void g() noexcept
    {
        f();      // valid, even if f throws
        throw 42; // valid, effectively a call to std::terminate
    }
```

A especificação de exceção de uma especialização de template de função não é instanciada junto com a declaração da função; ela é instanciada apenas quando _necessário_ (conforme definido abaixo).

A especificação de exceção de uma função membro especial implicitamente declarada também é avaliada apenas quando necessário (em particular, a declaração implícita de uma função membro de uma classe derivada não exige que a especificação de exceção de uma função membro base seja instanciada).

Quando a especificação noexcept de uma especialização de template de função é _necessária_, mas ainda não foi instanciada, os nomes dependentes são pesquisados e quaisquer templates usados na expressão são instanciados como se fossem para a declaração da especialização.

Uma especificação noexcept de uma função é considerada _necessária_ nos seguintes contextos:

*   em uma expressão, onde a função é selecionada pela resolução de sobrecarga
*   a função é [odr-used](<#/doc/language/definition>)
*   a função seria odr-used, mas aparece em um operando não avaliado

```cpp
    template<class T>
    T f() noexcept(sizeof(T) < 4);
    
    int main()
    {
        decltype(f<void>()) *p; // f não avaliada, mas a especificação noexcept é necessária
                                // erro porque a instanciação da especificação noexcept
                                // calcula sizeof(void)
    }
```

*   a especificação é necessária para comparar com outra declaração de função (por exemplo, em um overrider de função virtual ou em uma especialização explícita de um template de função)
*   em uma definição de função
*   a especificação é necessária porque uma função membro especial padronizada precisa verificá-la para decidir sua própria especificação de exceção (isso ocorre apenas quando a especificação da função membro especial padronizada é, por si só, necessária).

Definição formal de _expressão potencialmente lançadora_ (usada para determinar a especificação de exceção padrão de destrutores, construtores e operadores de atribuição, conforme descrito acima):

Uma expressão `e` é _potencialmente lançadora_ se:

*   `e` é uma chamada de função para uma função, ponteiro para função ou ponteiro para função membro que é _potencialmente lançadora_, a menos que `e` seja uma [expressão constante central](<#/doc/language/constant_expression>)(até C++17)
*   `e` faz uma chamada implícita para uma função _potencialmente lançadora_ (como um operador sobrecarregado, uma função de alocação em uma `new`-expression, um construtor para um argumento de função, ou um destrutor se `e` for uma full-expression)
*   `e` é uma [`throw`-expression](<#/doc/language/throw>)
*   `e` é um [`dynamic_cast`](<#/doc/language/dynamic_cast>) que faz um cast de um tipo de referência polimórfico
*   `e` é uma expressão [`typeid`](<#/doc/language/typeid>) aplicada a um ponteiro desreferenciado para um tipo polimórfico
*   `e` tem uma subexpressão imediata que é potencialmente lançadora

```cpp
    struct A
    {
        A(int = (A(5), 0)) noexcept;
        A(const A&) noexcept;
        A(A&&) noexcept;
        ~A();
    };
    
    struct B
    {
        B() throw();
        B(const B&) = default; // implicit exception specification is noexcept(true)
        B(B&&, int = (throw Y(), 0)) noexcept;
        ~B() noexcept(false);
    };
    
    int n = 7;
    struct D : public A, public B
    {
        int * p = new int[n];
        // D::D() potencialmente lançador por causa do operador new
        // D::D(const D&) não-lançador
        // D::D(D&&) potencialmente lançador: o argumento padrão para o construtor de B pode lançar
        // D::~D() potencialmente lançador
    
        // nota; se A::~A() fosse virtual, este programa seria malformado porque um overrider
        // de uma virtual não-lançadora não pode ser potencialmente lançador
    };
```

### Notas

Um dos usos da expressão constante é (junto com o [operador `noexcept`](<#/doc/language/noexcept>)) para definir templates de função que declaram `noexcept` para alguns tipos, mas não para outros.

Note que uma especificação `noexcept` em uma função não é uma verificação em tempo de compilação; é meramente um método para um programador informar ao compilador se uma função deve ou não lançar exceções. O compilador pode usar essa informação para habilitar certas otimizações em funções não-lançadoras, bem como habilitar o [operador `noexcept`](<#/doc/language/noexcept>), que pode verificar em tempo de compilação se uma expressão específica é declarada para lançar quaisquer exceções. Por exemplo, containers como [std::vector](<#/doc/container/vector>) moverão seus elementos se o construtor de movimento dos elementos for `noexcept`, e copiarão caso contrário (a menos que o construtor de cópia não seja acessível, mas um construtor de movimento potencialmente lançador seja, nesse caso a garantia de exceção forte é dispensada).

#### Depreciações

`noexcept` é uma versão aprimorada de [throw()](<#/doc/language/except_spec>), que é obsoleto em C++11. Ao contrário de [throw()](<#/doc/language/except_spec>) pré-C++17, `noexcept` não chamará [std::unexpected](<#/doc/error/unexpected>), pode ou não desenrolar a pilha, e chamará [std::terminate](<#/doc/error/terminate>), o que potencialmente permite ao compilador implementar `noexcept` sem a sobrecarga de tempo de execução de [throw()](<#/doc/language/except_spec>). A partir de C++17, throw() é redefinido para ser um equivalente exato de noexcept(true).

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_noexcept_function_type`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | Fazer com que as especificações de exceção façam parte do sistema de tipos

### Palavras-chave

[`noexcept`](<#/doc/keyword/noexcept>), [`throw`](<#/doc/keyword/throw>)(desde C++17)(até C++20)

### Exemplo

Execute este código
```cpp
    // se foo é declarado noexcept depende se a expressão
    // T() lançará quaisquer exceções
    template<class T>
    void foo() noexcept(noexcept(T())) {}
    
    void bar() noexcept(true) {}
    void baz() noexcept { throw 42; } // noexcept é o mesmo que noexcept(true)
    
    int main() 
    {
        foo<int>(); // noexcept(noexcept(int())) => noexcept(true), então isso está ok
    
        bar(); // ok
        baz(); // compila, mas em tempo de execução isso chama std::terminate
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1330](<https://cplusplus.github.io/CWG/issues/1330.html>) | C++11 | uma especificação de exceção pode ser instanciada ansiosamente | ela é instanciada apenas se necessário
[CWG 1740](<https://cplusplus.github.io/CWG/issues/1740.html>) | C++11 | um ( após noexcept pode iniciar um inicializador | ele só pode ser parte da especificação noexcept
[CWG 2039](<https://cplusplus.github.io/CWG/issues/2039.html>) | C++11 | apenas a expressão antes da conversão é exigida como constante | a conversão também deve ser válida em uma expressão constante

### Veja também

[ operador `noexcept`](<#/doc/language/noexcept>)(C++11) | determina se uma expressão lança quaisquer exceções
---|---
[ Especificação de exceção dinâmica](<#/doc/language/except_spec>)(até C++17) | especifica quais exceções são lançadas por uma função (obsoleto em C++11)
[ expressão `throw`](<#/doc/language/throw>) | sinaliza um erro e transfere o controle para o handler de erro
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar
(template de função)