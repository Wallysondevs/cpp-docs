# Inicialização constante

Define os valores iniciais das variáveis [static](<#/doc/language/storage_duration>) para uma constante em tempo de compilação.

### Explicação

A _inicialização constante_ é realizada nos seguintes casos:

*   Inicializar uma referência com [duração de armazenamento estática](<#/doc/language/storage_duration>) com uma [expressão constante](<#/doc/language/constant_expression>).

*   Inicializar um objeto de [tipo POD](<#/doc/language/type-id>) com duração de armazenamento estática com uma expressão constante.

| (até C++11)

*   Inicializar uma referência com duração de armazenamento [estática](<#/doc/language/storage_duration>) ou de [thread](<#/doc/language/storage_duration>), onde todas as seguintes condições são satisfeitas:

    *   Cada [full-expression](<#/doc/language/expressions>) (incluindo conversões implícitas) que aparece no inicializador é uma [expressão constante](<#/doc/language/constant_expression>).
    *   A referência é vinculada a uma das seguintes entidades:

        *   um lvalue designando um objeto com duração de armazenamento estática
        *   um objeto temporário
        *   um [subobjeto](<#/doc/language/objects>) de um objeto temporário
        *   uma função

*   Inicializar um objeto com duração de armazenamento estática ou de thread, e uma das seguintes condições é satisfeita:

    *   Se o objeto é inicializado por uma chamada de construtor, onde a full-expression de inicialização é uma expressão constante, exceto que ela também pode invocar [construtores constexpr](<#/doc/language/constexpr>) para o objeto e seus subobjetos (mesmo que esses objetos sejam de tipos de classe não-[literal](<#/doc/language/constant_expression>)).
    *   Caso contrário, ou o objeto é [value-initialized](<#/doc/language/value_initialization>) ou cada full-expression que aparece em seu inicializador é uma expressão constante.

| (desde C++11)
(até C++17)

*   Inicializar uma variável ou objeto temporário com duração de armazenamento [estática](<#/doc/language/storage_duration>) ou de [thread](<#/doc/language/storage_duration>) por um inicializador cuja [full-expression](<#/doc/language/expressions>) é uma [expressão constante](<#/doc/language/constant_expression>), exceto que, se a entidade sendo inicializada for um objeto, tal inicializador também pode invocar [construtores constexpr](<#/doc/language/constexpr>) para o objeto e seus [subobjetos](<#/doc/language/objects>) (mesmo que esses objetos sejam de tipos de classe não-[literal](<#/doc/language/constant_expression>)).

| (desde C++17)
(até C++20)

*   Uma variável ou objeto temporário (até C++26) com duração de armazenamento [estática](<#/doc/language/storage_duration>) ou de [thread](<#/doc/language/storage_duration>) é [constantemente inicializado](<#/doc/language/constant_expression>).

| (desde C++20)

Os efeitos da inicialização constante são os mesmos que os efeitos da inicialização correspondente, exceto que é garantido que ela seja concluída antes que qualquer outra inicialização de um objeto estático ou thread-local (desde C++11) comece.

### Notas

O compilador tem permissão para inicializar outros objetos estáticos e thread-local (desde C++11) usando inicialização constante, se puder garantir que o valor seria o mesmo como se a ordem padrão de inicialização fosse seguida.

A inicialização constante geralmente ocorre quando o programa é carregado na memória, como parte da inicialização do ambiente de tempo de execução do programa.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <array>
    
    struct S
    {
        static const int c;
    };
    
    const int d = 10 * S::c; // not a constant expression: S::c has no preceding
                             // initializer, this initialization happens after const
    const int S::c = 5;      // constant initialization, guaranteed to happen first
    
    int main()
    {
        std::cout << "d = " << d << '\n';
        std::array<int, S::c> a1; // OK: S::c is a constant expression
    //  std::array<int, d> a2;    // error: d is not a constant expression
    }
```

Saída:
```
    d = 50
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 441](<https://cplusplus.github.io/CWG/issues/441.html>) | C++98 | referências não podiam ser constantemente inicializadas | tornadas constantemente inicializáveis
[CWG 1489](<https://cplusplus.github.io/CWG/issues/1489.html>) | C++11 | não estava claro se a inicialização por valor de um objeto pode ser uma inicialização constante | pode
[CWG 1747](<https://cplusplus.github.io/CWG/issues/1747.html>) | C++11 | vincular uma referência a uma função não podia ser inicialização constante | pode
[CWG 1834](<https://cplusplus.github.io/CWG/issues/1834.html>) | C++11 | vincular uma referência a um xvalue não podia ser inicialização constante | pode

### Veja também

*   [`constinit`](<#/doc/language/constinit>)
*   [`constexpr`](<#/doc/language/constexpr>)
*   [constructor](<#/doc/language/initializer_list>)
*   [converting constructor](<#/doc/language/converting_constructor>)
*   [copy constructor](<#/doc/language/copy_constructor>)
*   [default constructor](<#/doc/language/default_constructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [initialization](<#/doc/language/initialization>)
    *   [aggregate initialization](<#/doc/language/aggregate_initialization>)
    *   [copy initialization](<#/doc/language/copy_initialization>)
    *   [default initialization](<#/doc/language/default_initialization>)
    *   [direct initialization](<#/doc/language/direct_initialization>)
    *   [list initialization](<#/doc/language/list_initialization>)
    *   [reference initialization](<#/doc/language/reference_initialization>)
    *   [value initialization](<#/doc/language/value_initialization>)
    *   [zero initialization](<#/doc/language/zero_initialization>)
*   [move constructor](<#/doc/language/move_constructor>)
