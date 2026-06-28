# switch statement

Transfere o controle para uma das várias instruções, dependendo do valor de uma condição.

### Syntax

---
attr ﻿(opcional) `switch` `(` init-statement ﻿(opcional) condition `)` statement
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **init-statement** — (desde C++17) qualquer um dos seguintes:

  * uma [instrução de expressão](<#/doc/language/statements>) (que pode ser uma instrução nula ;)
  * uma [declaração simples](<#/doc/language/declarations>), tipicamente uma declaração de uma variável com inicializador, mas pode declarar um número arbitrário de variáveis ou [structured bindings](<#/doc/language/structured_binding>)

|

  * uma [declaração de alias](<#/doc/language/type_alias>)

| (desde C++23)

Note que qualquer init-statement deve terminar com um ponto e vírgula. É por isso que é frequentemente descrito informalmente como uma expressão ou uma declaração seguida por um ponto e vírgula.

- **condition** — uma [condição](<#/doc/language/switch>)
- **statement** — uma instrução (tipicamente uma instrução composta)

### Condition

Uma condição pode ser uma [expressão](<#/doc/language/expressions>) ou uma [declaração simples](<#/doc/language/declarations>).

  * Se puder ser sintaticamente resolvida como uma declaração de [structured binding](<#/doc/language/structured_binding>), ela é interpretada como uma declaração de structured binding.

| (desde C++26)

  * Se puder ser sintaticamente resolvida como uma expressão, ela é tratada como uma expressão. Caso contrário, é tratada como uma declaração que não é uma declaração de structured binding (desde C++26).

Quando o controle atinge a condition, a condição produzirá um valor, que é usado para determinar para qual label o controle irá.

#### Expression

Se condition for uma expressão, o valor que ela produz é o valor da expressão.

#### Declaration

Se condition for uma declaração simples, o valor que ela produz é o valor da variável de decisão (veja abaixo).

##### Non-structured binding declaration

A declaração tem as seguintes restrições:

  * Conforma-se sintaticamente à seguinte forma:

    

  * type-specifier-seq declarator `=` assignment-expression

| (até C++11)

    

  * attribute-specifier-seq(opcional) decl-specifier-seq declarator brace-or-equal-initializer

| (desde C++11)

  * O declarator não pode especificar uma [função](<#/doc/language/function>) ou um [array](<#/doc/language/array>).
  * A [sequência de especificadores de tipo](<#/doc/language/declarations>)(até C++11)[sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr, e ela (desde C++11) não pode definir uma [classe](<#/doc/language/class>) ou [enumeração](<#/doc/language/enum>).

A variável de decisão da declaração é a variável declarada.

##### Structured binding declaration

A declaração tem as seguintes restrições:

  * A expressão em seu [inicializador](<#/doc/language/initialization>) não pode ser de um tipo array.
  * A [sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr.

A variável de decisão da declaração é a variável inventada `e` [introduzida pela declaração](<#/doc/language/structured_binding>). | (desde C++26)

#### Type

condition pode produzir apenas os seguintes tipos:

  * tipos integrais
  * tipos de enumeração
  * tipos de classe

Se o valor produzido for de um tipo de classe, ele é implicitamente convertido contextualmente para um tipo integral ou de enumeração.

Se o tipo (possivelmente convertido) estiver sujeito a [promoções integrais](<#/doc/language/implicit_cast>), o valor produzido é convertido para o tipo promovido.

### Labels

Qualquer instrução dentro da instrução switch pode ser rotulada com um ou mais dos seguintes labels:

---
attr ﻿(opcional) `case` constant-expression `:` | (1) |
---|---|---
attr ﻿(opcional) `default:` | (2) |
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **constant-expression** — uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo ajustado da condição switch

Um label `case` ou `default` é associado à instrução switch mais interna que o contém.

Se qualquer uma das seguintes condições for satisfeita, o programa é malformado:

  * Uma instrução switch está associada a múltiplos labels `case` cujas constant-expression ﻿s têm o mesmo valor após as conversões.
  * Uma instrução switch está associada a múltiplos labels `default`.

### Control flow transfer

Quando a condição de uma instrução switch produz um valor (possivelmente convertido):

  * Se uma das constantes de label `case` associadas tiver o mesmo valor, o controle é passado para a instrução rotulada pelo label `case` correspondente.
  * Caso contrário, se houver um label `default` associado, o controle é passado para a instrução rotulada pelo label `default`.
  * Caso contrário, nenhuma das instruções na instrução switch será executada.

Os labels `case` e `default` por si só não alteram o fluxo de controle. Para sair de uma instrução switch do meio, veja [instruções break](<#/doc/language/break>).

Os compiladores podem emitir avisos sobre fallthrough (atingir o próximo label `case` ou `default` sem um `break`), a menos que o atributo `[[[fallthrough](<#/doc/language/attributes/fallthrough>)]]` apareça imediatamente antes do label `case` para indicar que o fallthrough é intencional (desde C++17).
```
    switch (1)
    {
        case 1:
            std::cout << '1'; // prints "1",
        case 2:
            std::cout << '2'; // then prints "2"
    }
```
```
    switch (1)
    {
        case 1:
            std::cout << '1'; // prints "1"
            break;            // and exits the switch
        case 2:
            std::cout << '2';
            break;
    }
```

### switch statements with initializer

Se init-statement for usado, a instrução switch é equivalente a |
---
`{`

    init-statement

    `switch` `(` condition `)` statement

`}

Exceto que os nomes declarados pelo init-statement (se init-statement for uma declaração) e os nomes declarados pela condition (se condition for uma declaração) estão no mesmo escopo, que também é o escopo da statement.

(desde C++17)

### Notes

Como a transferência de controle [não é permitida para entrar no escopo](<#/doc/language/goto>) de uma variável, se uma instrução de declaração for encontrada dentro da statement, ela deve ser delimitada em sua própria instrução composta:
```
    switch (1)
    {
        case 1:
            int x = 0; // initialization
            std::cout << x << '\n';
            break;
        default:
            // compilation error: jump to default:
            // would enter the scope of 'x' without initializing it
            std::cout << "default\n";
            break;
    }
```
```
    switch (1)
    {
        case 1:
            {
                int x = 0;
                std::cout << x << '\n';
                break;
            } // scope of 'x' ends here
        default:
            std::cout << "default\n"; // no error
            break;
    }
```

### Keywords

[`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>), [`default`](<#/doc/keyword/default>)

### Example

O código a seguir mostra vários casos de uso da instrução switch:

Execute este código
```
    #include <iostream>
    
    int main()
    {
        const int i = 2;
        switch (i)
        {
            case 1:
                std::cout << '1';
            case 2:              // execution starts at this case label
                std::cout << '2';
            case 3:
                std::cout << '3';
                [[fallthrough]]; // C++17 attribute to silent the warning on fallthrough
            case 5:
                std::cout << "45";
                break;           // execution of subsequent statements is terminated
            case 6:
                std::cout << '6';
        }
    
        std::cout << '\n';
    
        switch (i)
        {
            case 4:
                std::cout << 'a';
            default:
                std::cout << 'd'; // there are no applicable constant expressions 
                                  // therefore default is executed
        }
    
        std::cout << '\n';
    
        switch (i)
        {
            case 4:
                std::cout << 'a'; // nothing is executed
        }
    
        // when enumerations are used in a switch statement, many compilers
        // issue warnings if one of the enumerators is not handled
        enum color { RED, GREEN, BLUE };
        switch (RED)
        {
            case RED:
                std::cout << "red\n";
                break;
            case GREEN:
                std::cout << "green\n";
                break;
            case BLUE:
                std::cout << "blue\n";
                break;
        }
    
        // the C++17 init-statement syntax can be helpful when there is
        // no implicit conversion to integral or enumeration type
        struct Device
        {
            enum State { SLEEP, READY, BAD };
            auto state() const { return m_state; }
    
            /* ... */
    
        private:
            State m_state{};
        };
    
        switch (auto dev = Device{}; dev.state())
        {
            case Device::SLEEP:
                /* ... */
                break;
            case Device::READY:
                /* ... */
                break;
            case Device::BAD:
                /* ... */
                break;
        }
    
        // pathological examples
    
        // the statement does not have to be a compound statement
        switch (0)
            std::cout << "this does nothing\n";
    
        // labels do not require a compound statement either
        switch (int n = 1)
            case 0:
            case 1:
                std::cout << n << '\n';
    }
```

Output:
```
    2345
    d
    red
    1
```

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1767](<https://cplusplus.github.io/CWG/issues/1767.html>) | C++98 | condition ﻿s de tipos que não estão sujeitos a
promoção integral não podiam ser promovidos | não promover
condition ﻿s desses tipos
[CWG 2629](<https://cplusplus.github.io/CWG/issues/2629.html>) | C++98 | condition poderia ser uma declaração de uma variável de ponto flutuante | proibido

### See also

[Documentação C](<#/>) para switch
---

### External links

1. | [Loop unrolling usando Duff's Device](<https://en.wikipedia.org/wiki/Duff%27s_device> "enwiki:Duff's device")
---|---
2. | [Duff's device pode ser usado para implementar coroutines em C/C++](<https://en.wikipedia.org/wiki/Coroutine#C> "enwiki:Coroutine")