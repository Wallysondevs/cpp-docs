# Especificação de exceção dinâmica (até C++17)

Lista as exceções que uma função pode lançar direta ou indiretamente.

### Sintaxe

---
`throw(` type-id-list ﻿(opcional)`)` | (1) | (obsoleto em C++11)
(removido em C++17)

1) Especificação de exceção dinâmica explícita.

- **type-id-list** — lista de [type-ids](<#/doc/language/type-id>) separados por vírgula, um type-id representando uma [expansão de pack](<#/doc/language/parameter_pack>) é seguido por uma elipse (...)(desde C++11)

Uma especificação de exceção dinâmica explícita deve aparecer apenas em um declarador de função para um tipo de função, ponteiro para tipo de função, referência para tipo de função ou ponteiro para tipo de função membro que seja o tipo de nível superior de uma declaração ou definição, ou em tal tipo aparecendo como um parâmetro ou tipo de retorno em um declarador de função.
```cpp
    void f() throw(int);            // OK: declaração de função
    void (*pf)() throw (int);       // OK: declaração de ponteiro para função
    void g(void pfa() throw(int));  // OK: declaração de parâmetro ponteiro para função
    typedef int (*pf)() throw(int); // Erro: declaração de typedef
```

### Explicação

Se uma função é declarada com o tipo `T` listado em sua especificação de exceção dinâmica, a função pode lançar exceções desse tipo ou de um tipo derivado dele.

[Tipos incompletos](<#/doc/language/incomplete_type>), ponteiros ou referências para tipos incompletos que não sejam cv `void*`, e tipos de referência rvalue (desde C++11) não são permitidos na especificação de exceção. Tipos de array e função, se usados, são ajustados para os tipos de ponteiro correspondentes, qualificadores cv de nível superior também são descartados. [Parameter packs](<#/doc/language/parameter_pack>) são permitidos (desde C++11).

Uma especificação de exceção dinâmica cujo conjunto de tipos ajustados é vazio (após qualquer expansão de packs)(desde C++11) é non-throwing. Uma função com uma especificação de exceção dinâmica non-throwing não permite nenhuma exceção.

Uma especificação de exceção dinâmica não é considerada parte do tipo de uma função.

Se a função lança uma exceção de um tipo não listado em sua especificação de exceção, a função [std::unexpected](<#/doc/error/unexpected>) é chamada. A função padrão chama [std::terminate](<#/doc/error/terminate>), mas pode ser substituída por uma função fornecida pelo usuário (via [std::set_unexpected](<#/doc/error/exception/set_unexpected>)) que pode chamar [std::terminate](<#/doc/error/terminate>) ou lançar uma exceção. Se a exceção lançada de [std::unexpected](<#/doc/error/unexpected>) for aceita pela especificação de exceção, o desenrolamento da pilha continua normalmente. Se não for, mas [std::bad_exception](<#/doc/error/bad_exception>) for permitida pela especificação de exceção, [std::bad_exception](<#/doc/error/bad_exception>) é lançada. Caso contrário, [std::terminate](<#/doc/error/terminate>) é chamada.

#### Instanciação

A especificação de exceção dinâmica de uma especialização de template de função não é instanciada junto com a declaração da função; ela é instanciada apenas quando _necessário_ (conforme definido abaixo).

A especificação de exceção dinâmica de uma função membro especial implicitamente declarada também é avaliada apenas quando necessário (em particular, a declaração implícita de uma função membro de uma classe derivada não exige que a especificação de exceção de uma função membro base seja instanciada).

Quando a especificação de exceção dinâmica de uma especialização de template de função é _necessária_, mas ainda não foi instanciada, os nomes dependentes são pesquisados e quaisquer templates usados na expressão são instanciados como se fosse para a declaração da especialização.

Uma especificação de exceção dinâmica de uma função é considerada _necessária_ nos seguintes contextos:

  * em uma expressão, onde a função é selecionada por resolução de sobrecarga
  * a função é [odr-used](<#/doc/language/definition>)
  * a função seria odr-used, mas aparece em um operando não avaliado

```cpp
    template<class T>
    T f() throw(std::array<char, sizeof(T)>);
    
    int main()
    {
        decltype(f<void>()) *p; // f não avaliada, mas a especificação de exceção é necessária
                                // erro porque a instanciação da especificação de exceção
                                // calcula sizeof(void)
    }
```

  * a especificação é necessária para comparar com outra declaração de função (por exemplo, em um overrider de função virtual ou em uma especialização explícita de um template de função)
  * em uma definição de função
  * a especificação é necessária porque uma função membro especial padronizada precisa verificá-la para decidir sua própria especificação de exceção (isso ocorre apenas quando a especificação da função membro especial padronizada é, por si só, necessária).

### Exceções potenciais

Cada função `f`, ponteiro para função `pf`, e ponteiro para função membro `pmf` possui um _conjunto de exceções potenciais_, que consiste em tipos que podem ser lançados. O conjunto de todos os tipos indica que qualquer exceção pode ser lançada. Este conjunto é definido da seguinte forma:

1) Se a declaração de `f`, `pf`, ou `pmf` usa uma especificação de exceção dinâmica que não permite todas as exceções (até C++11), o conjunto consiste nos tipos listados nessa especificação.

2) Caso contrário, se a declaração de `f`, `pf`, ou `pmf` usa [`noexcept(true)`](<#/doc/language/noexcept>), o conjunto é vazio. | (desde C++11)

3) Caso contrário, o conjunto é o conjunto de todos os tipos.

Nota: para funções membro especiais implicitamente declaradas (construtores, operadores de atribuição e destrutores) e para os construtores herdados (desde C++11), o conjunto de exceções potenciais é uma combinação dos conjuntos das exceções potenciais de tudo o que eles chamariam: construtores/operadores de atribuição/destrutores de membros de dados não estáticos não variantes, bases diretas e, quando apropriado, bases virtuais (incluindo expressões de argumento padrão, como sempre).

Cada expressão `e` possui um _conjunto de exceções potenciais_. O conjunto é vazio se `e` for uma [expressão constante central](<#/doc/language/constant_expression>), caso contrário, é a união dos conjuntos de exceções potenciais de todas as subexpressões imediatas de `e` (incluindo [expressões de argumento padrão](<#/doc/language/default_arguments>)), combinada com outro conjunto que depende da forma de `e`, da seguinte forma:

1) Se `e` é uma expressão de chamada de função, seja `g` a função, ponteiro para função ou ponteiro para função membro que é chamada, então

  * se a declaração de `g` usa uma especificação de exceção dinâmica, o conjunto de exceções potenciais de `g` é adicionado ao conjunto;

  * se a declaração de `g` usa [`noexcept(true)`](<#/doc/language/noexcept>), o conjunto é vazio;

| (desde C++11)

  * caso contrário, o conjunto é o conjunto de todos os tipos.

2) Se `e` chama uma função implicitamente (é uma expressão de operador e o operador está sobrecarregado, é uma [new-expression](<#/doc/language/new>) e a função de alocação está sobrecarregada, ou é uma expressão completa e o destrutor de um temporário é chamado), então o conjunto é o conjunto dessa função.

3) Se `e` é uma [throw-expression](<#/doc/language/throw>), o conjunto é a exceção que seria inicializada por seu operando, ou o conjunto de todos os tipos para a throw-expression de relançamento (sem operando).

4) Se `e` é um [`dynamic_cast`](<#/doc/language/dynamic_cast>) para uma referência a um tipo polimórfico, o conjunto consiste em [std::bad_cast](<#/doc/types/bad_cast>).

5) Se `e` é um [`typeid`](<#/doc/language/typeid>) aplicado a um ponteiro desreferenciado para um tipo polimórfico, o conjunto consiste em [std::bad_typeid](<#/doc/types/bad_typeid>).

6) Se `e` é uma [new-expression](<#/doc/language/new>) com um tamanho de array não constante, e a função de alocação selecionada tem um conjunto não vazio de exceções potenciais, o conjunto consiste em [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>). | (desde C++11)
```cpp
    void f() throw(int); // o conjunto de f() é "int"
    void g();            // o conjunto de g() é o conjunto de todos os tipos
    
    struct A { A(); };                  // o conjunto de "new A" é o conjunto de todos os tipos
    struct B { B() noexcept; };         // o conjunto de "B()" é vazio
    struct D() { D() throw (double); }; // o conjunto de new D é o conjunto de todos os tipos
```

Todas as funções membro implicitamente declaradas e construtores herdados (desde C++11) possuem especificações de exceção, selecionadas da seguinte forma:

  * Se o conjunto de exceções potenciais é o conjunto de todos os tipos, a especificação de exceção implícita permite todas as exceções (a especificação de exceção é considerada presente, mesmo que seja inexpressível em código e se comporte como se não houvesse especificação de exceção)(até C++11) é noexcept(false)(desde C++11).
  * Caso contrário, se o conjunto de exceções potenciais não for vazio, a especificação de exceção implícita lista cada tipo do conjunto.
  * Caso contrário, a especificação de exceção implícita é throw()(até C++11)noexcept(true)(desde C++11).

```cpp
    struct A
    {
        A(int = (A(5), 0)) noexcept;
        A(const A&) throw();
        A(A&&) throw();
        ~A() throw(X);
    };
    
    struct B
    {
        B() throw();
        B(const B&) = default; // a especificação de exceção é "noexcept(true)"
        B(B&&, int = (throw Y(), 0)) noexcept;
        ~B() throw(Y);
    };
    
    int n = 7;
    struct D : public A, public B
    {
        // Pode lançar uma exceção de um tipo que corresponderia a um handler do tipo
        // std​::​bad_array_new_length, mas não lança uma exceção de má alocação
        (void*) new (std::nothrow) int[n];
    
        // D pode ter os seguintes membros implicitamente declarados:
        // D::D() throw(X, std::bad_array_new_length);
        // D::D(const D&) noexcept(true);
        // D::D(D&&) throw(Y);
        // D::~D() throw(X, Y);
    };
```

### Notas

Clang considera que a regra de instanciação da especificação de exceção dinâmica foi alterada em C++11 por [CWG1330](<https://cplusplus.github.io/CWG/issues/1330.html>), veja [LLVM #56349](<https://github.com/llvm/llvm-project/issues/56439>).

### Palavras-chave

[`throw`](<#/doc/keyword/throw>)

### Exemplo

Nota: é melhor ser compilado no modo C++98 para evitar avisos. Incompatível com C++17 e revisões mais recentes.

Execute este código
```cpp
    #include <cstdlib>
    #include <exception>
    #include <iostream>
    
    class X {};
    class Y {};
    class Z : public X {};
    class W {};
    
    void f() throw(X, Y) 
    {
        bool n = false;
    
        if (n)
            throw X(); // OK, chamaria std::terminate()
        if (n)
            throw Z(); // também OK
    
        throw W(); // chamará std::unexpected()
    }
    
    void handler()
    {
        std::cerr << "That was unexpected!\n"; // flush necessário
        std::abort();
    }
    
    int main()
    {
        std::set_unexpected(handler);
        f();
    }
```

Saída:
```
    That was unexpected!
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 25](<https://cplusplus.github.io/CWG/issues/25.html>) | C++98 | o comportamento de atribuição e inicialização
entre ponteiros para membros com diferentes
especificações de exceção era não especificado | aplicar a restrição
para ponteiros de função
e referências
[CWG 973](<https://cplusplus.github.io/CWG/issues/973.html>) | C++98 | a especificação de exceção pode conter tipos de funções, mas a conversão de ponteiro de função correspondente não era especificada | especificado
---|---
[CWG 1330](<https://cplusplus.github.io/CWG/issues/1330.html>) | C++98 | uma especificação de exceção poderia ser instanciada ansiosamente | ela é instanciada apenas se necessário
[CWG 1267](<https://cplusplus.github.io/CWG/issues/1267.html>) | C++11 | tipos de referência rvalue eram permitidos em especificações de exceção | não permitido
[CWG 1351](<https://cplusplus.github.io/CWG/issues/1351.html>) | C++98
C++11 | argumento padrão (C++98) e inicializador de membro padrão
(C++11) eram ignorados na especificação de exceção implícita | passaram a ser considerados
[CWG 1777](<https://cplusplus.github.io/CWG/issues/1777.html>) | C++11 | throw(T...) não era uma especificação
non-throwing mesmo se T fosse um pack vazio | é non-throwing
se o pack for vazio
[CWG 2191](<https://cplusplus.github.io/CWG/issues/2191.html>) | C++98 | o conjunto de exceções potenciais de uma expressão `typeid`
poderia conter `bad_typeid` mesmo que não pudesse ser lançada | contém `bad_typeid`
apenas se puder ser lançada

### Veja também

[ especificador `noexcept`](<#/doc/language/noexcept_spec>)(C++11) | especifica se uma função pode lançar exceções