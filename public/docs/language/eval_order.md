# Ordem de avaliação

A ordem de avaliação de qualquer parte de qualquer expressão, incluindo a ordem de avaliação dos argumentos de função é _não especificada_ (com algumas exceções listadas abaixo). O compilador pode avaliar operandos e outras subexpressões em qualquer ordem, e pode escolher uma ordem diferente quando a mesma expressão for avaliada novamente.

Não existe o conceito de avaliação da esquerda para a direita ou da direita para a esquerda em C++. Isso não deve ser confundido com a associatividade da esquerda para a direita e da direita para a esquerda dos operadores: a expressão a() + b() + c() é analisada como (a() + b()) + c() devido à associatividade da esquerda para a direita do operador+, mas c() pode ser avaliada primeiro, por último, ou entre a() ou b() em tempo de execução:

Execute este código
```cpp
    #include <cstdio>
    
    int a() { return std::puts("a"); }
    int b() { return std::puts("b"); }
    int c() { return std::puts("c"); }
    
    void z(int, int, int) {}
    
    int main()
    {
        z(a(), b(), c());       // all 6 permutations of output are allowed
        return a() + b() + c(); // all 6 permutations of output are allowed
    }
```

Saída possível:
```
    b
    c
    a
    c
    a 
    b
```

### Regras de "sequenciado antes" (desde C++11)

#### Avaliação de Expressões

A avaliação de cada expressão inclui:

  * _Cálculos de valor_ : cálculo do valor retornado pela expressão. Isso pode envolver a determinação da identidade do objeto (avaliação glvalue, por exemplo, se a expressão retorna uma referência a algum objeto) ou a leitura do valor previamente atribuído a um objeto (avaliação prvalue, por exemplo, se a expressão retorna um número, ou algum outro valor).
  * Iniciação de _efeitos colaterais_ : acesso (leitura ou escrita) a um objeto designado por um glvalue volátil, modificação (escrita) de um objeto, chamada de uma função de E/S da biblioteca, ou chamada de uma função que realiza qualquer uma dessas operações.

#### Ordenação

_Sequenciado antes_ é uma relação assimétrica, transitiva e par-a-par entre avaliações dentro da mesma thread.

  * Se A é sequenciado antes de B (ou, equivalentemente, B é _sequenciado depois_ de A), então a avaliação de A estará completa antes que a avaliação de B comece.
  * Se A não é sequenciado antes de B e B é sequenciado antes de A, então a avaliação de B estará completa antes que a avaliação de A comece.
  * Se A não é sequenciado antes de B e B não é sequenciado antes de A, então existem duas possibilidades:
    * As avaliações de A e B são _não sequenciadas_ : elas podem ser realizadas em qualquer ordem e podem se sobrepor (dentro de uma única thread de execução, o compilador pode intercalar as instruções da CPU que compõem A e B).
    * As avaliações de A e B são _sequenciadas indeterminadamente_ : elas podem ser realizadas em qualquer ordem, mas não podem se sobrepor: ou A estará completa antes de B, ou B estará completa antes de A. A ordem pode ser a oposta na próxima vez que a mesma expressão for avaliada.

#### Regras

1) Cada cálculo de valor e efeito colateral de uma [full-expression](<#/doc/language/expressions>) é sequenciado antes de cada cálculo de valor e efeito colateral da próxima full-expression.

2) Os cálculos de valor (mas não os efeitos colaterais) dos operandos de qualquer [operador](<#/doc/language/expressions>) são sequenciados antes do cálculo de valor do resultado do operador (mas não seus efeitos colaterais).

3) Ao chamar uma função (independentemente de a função ser inline, e independentemente de a sintaxe de chamada de função explícita ser usada), cada cálculo de valor e efeito colateral associado a qualquer expressão de argumento, ou à expressão postfix que designa a função chamada, é sequenciado antes da execução de cada expressão ou instrução no corpo da função chamada.

4) O cálculo de valor dos operadores [pós-incremento e pós-decremento](<#/doc/language/operator_incdec>) embutidos é sequenciado antes de seu efeito colateral.

5) O efeito colateral dos operadores [pré-incremento e pré-decremento](<#/doc/language/operator_incdec>) embutidos é sequenciado antes de seu cálculo de valor (regra implícita devido à definição como atribuição composta).

6) Cada cálculo de valor e efeito colateral do primeiro (esquerdo) argumento do operador AND lógico embutido &&, do operador OR lógico embutido || e do [operador vírgula](<#/doc/language/operator_other>) embutido , é sequenciado antes de cada cálculo de valor e efeito colateral do segundo (direito) argumento.

7) Cada cálculo de valor e efeito colateral associado à primeira expressão no [operador condicional](<#/doc/language/operator_other>) ?: é sequenciado antes de cada cálculo de valor e efeito colateral associado à segunda ou terceira expressão.

8) O efeito colateral (modificação do argumento esquerdo) do [operador de atribuição](<#/doc/language/operator_assignment>) embutido e de todos os operadores de [atribuição composta](<#/doc/language/operator_assignment>) embutidos é sequenciado após o cálculo de valor (mas não os efeitos colaterais) de ambos os argumentos esquerdo e direito, e é sequenciado antes do cálculo de valor da expressão de atribuição (ou seja, antes de retornar a referência ao objeto modificado).

9) Na [inicialização por lista](<#/doc/language/list_initialization>), cada cálculo de valor e efeito colateral de uma dada cláusula inicializadora é sequenciado antes de cada cálculo de valor e efeito colateral associado a qualquer cláusula inicializadora que a siga na lista de inicializadores separada por vírgulas e entre chaves.

```cpp
10) Uma chamada de função que não é sequenciada antes ou sequenciada depois de outra avaliação de expressão fora da função (possivelmente outra chamada de função) é sequenciada indeterminadamente em relação a essa avaliação (o programa deve se comportar como se as instruções da CPU que constituem uma chamada de função não fossem intercaladas com instruções que constituem avaliações de outras expressões, incluindo outras chamadas de função, mesmo que a função fosse inlined). A regra 10 tem uma exceção: chamadas de função feitas por um algoritmo da standard library executando sob a política de execução `std::execution::par_unseq` são não sequenciadas e podem ser arbitrariamente intercaladas umas com as outras.  // (desde C++17)
11) A chamada para a função de alocação (`operator new`) é sequenciada indeterminadamente em relação a (até C++17) sequenciada antes (desde C++17) da avaliação dos argumentos do construtor em uma new expression.
```

12) Ao retornar de uma função, a inicialização por cópia do temporário que é o resultado da avaliação da chamada de função é sequenciada antes da destruição de todos os temporários no final do operando da [instrução return](<#/doc/language/return>), que, por sua vez, é sequenciada antes da destruição das variáveis locais do bloco que envolve a instrução return.

13) Em uma expressão de chamada de função, a expressão que nomeia a função é sequenciada antes de cada expressão de argumento e cada argumento padrão. 14) Em uma chamada de função, os cálculos de valor e os efeitos colaterais da inicialização de cada parâmetro são sequenciados indeterminadamente em relação aos cálculos de valor e aos efeitos colaterais de qualquer outro parâmetro. 15) Cada operador sobrecarregado obedece às regras de sequenciamento do operador embutido que ele sobrecarrega quando chamado usando a notação de operador. 16) Em uma expressão de subscrito E1[E2], cada cálculo de valor e efeito colateral de E1 é sequenciado antes de cada cálculo de valor e efeito colateral de E2. 17) Em uma expressão de ponteiro para membro E1.*E2 ou E1->*E2, cada cálculo de valor e efeito colateral de E1 é sequenciado antes de cada cálculo de valor e efeito colateral de E2 (a menos que o tipo dinâmico de E1 não contenha o membro ao qual E2 se refere). 18) Em uma expressão de operador de deslocamento E1 << E2 e E1 >> E2, cada cálculo de valor e efeito colateral de E1 é sequenciado antes de cada cálculo de valor e efeito colateral de E2. 19) Em cada expressão de atribuição simples E1 = E2 e cada expressão de atribuição composta E1 @= E2, cada cálculo de valor e efeito colateral de E2 é sequenciado antes de cada cálculo de valor e efeito colateral de E1. 20) Cada expressão em uma lista de expressões separadas por vírgulas em um inicializador entre parênteses é avaliada como se fosse para uma chamada de função (sequenciada indeterminadamente). | (desde C++17)

#### Comportamento indefinido

O comportamento é [indefinido](<#/doc/language/ub>) nos seguintes casos:

1) Um efeito colateral em um [local de memória](<#/doc/language/memory_model>) não é sequenciado em relação a outro efeito colateral no mesmo local de memória:
```cpp
    i = ++i + 2;       // well-defined
    i = i++ + 2;       // undefined behavior until C++17
    f(i = -2, i = -2); // undefined behavior until C++17
    f(++i, ++i);       // undefined behavior until C++17, unspecified after C++17
    i = ++i + i++;     // undefined behavior
```

2) Um efeito colateral em um local de memória não é sequenciado em relação a um cálculo de valor usando o valor de qualquer objeto no mesmo local de memória:
```cpp
    cout << i << i++; // undefined behavior until C++17
    a[i] = i++;       // undefined behavior until C++17
    n = ++i + i;      // undefined behavior
```

3) Iniciar ou terminar o [tempo de vida](<#/doc/language/lifetime>) de um objeto em um local de memória não é sequenciado em relação a qualquer uma das seguintes operações:

  * um efeito colateral no mesmo local de memória
  * um cálculo de valor usando o valor de qualquer objeto no mesmo local de memória
  * iniciar ou terminar o tempo de vida de um objeto ocupando armazenamento que se sobrepõe ao local de memória

```cpp
    union U { int x, y; } u;
    (u.x = 1, 0) + (u.y = 2, 0); // undefined behavior
```

### Regras de ponto de sequência (até C++11)

#### Definições Pré-C++11

A avaliação de uma expressão pode produzir efeitos colaterais, que são: acessar um objeto designado por um lvalue volátil, modificar um objeto, chamar uma função de E/S da biblioteca, ou chamar uma função que realiza qualquer uma dessas operações.

Um _ponto de sequência_ é um ponto na sequência de execução onde todos os efeitos colaterais das avaliações anteriores na sequência estão completos, e nenhum efeito colateral das avaliações subsequentes começou.

#### Regras Pré-C++11

1) Existe um ponto de sequência no final de cada [full-expression](<#/doc/language/expressions>) (tipicamente, no ponto e vírgula).

2) Ao chamar uma função (independentemente de a função ser inline e independentemente de a sintaxe de chamada de função ter sido usada), existe um ponto de sequência após a avaliação de todos os argumentos da função (se houver) que ocorre antes da execução de quaisquer expressões ou instruções no corpo da função.

3) Ao retornar de uma função, existe um ponto de sequência após a inicialização por cópia do resultado da chamada de função, e antes da destruição de todos os objetos temporários no final da expressão na [instrução return](<#/doc/language/return>) (se houver).

4) Existe um ponto de sequência após a cópia de um valor retornado de uma função e antes da execução de quaisquer expressões fora da função.

5) Uma vez que a execução de uma função começa, nenhuma expressão da função chamadora é avaliada até que a execução da função chamada tenha sido concluída (funções não podem ser intercaladas).

6) Na avaliação de cada uma das quatro expressões seguintes, usando os operadores embutidos (não sobrecarregados), existe um ponto de sequência após a avaliação da expressão a.
```cpp
    a && b
    a || b
    a ? b : c
    a , b
```

#### Comportamento indefinido Pré-C++11

O comportamento é [indefinido](<#/doc/language/ub>) nos seguintes casos:

1) Entre o ponto de sequência anterior e o próximo, o valor de qualquer objeto em um local de memória é modificado mais de uma vez pela avaliação de uma expressão:
```cpp
    i = ++i + i++;     // undefined behavior
    i = i++ + 1;       // undefined behavior
    i = ++i + 1;       // undefined behavior
    ++ ++i;            // undefined behavior
    f(++i, ++i);       // undefined behavior
    f(i = -1, i = -1); // undefined behavior
```

2) Entre o ponto de sequência anterior e o próximo, para um objeto cujo valor é modificado pela avaliação de uma expressão, seu valor anterior é acessado de uma forma diferente de determinar o valor a ser armazenado:
```cpp
    cout << i << i++; // undefined behavior
    a[i] = i++;       // undefined behavior
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[CWG 1885](<https://cplusplus.github.io/CWG/issues/1885.html>) | C++11  | o sequenciamento da destruição de variáveis automáticas no retorno de função não era explícito  | regras de sequenciamento adicionadas
[CWG 1949](<https://cplusplus.github.io/CWG/issues/1949.html>) | C++11  | “sequenciado depois” foi usado mas não definido no padrão C++  | definido como o inverso de “sequenciado antes”
[CWG 1953](<https://cplusplus.github.io/CWG/issues/1953.html>) | C++11  | efeitos colaterais e cálculos de valor envolvendo um local de memória poderiam ser não sequenciados em relação ao início ou fim do tempo de vida de um objeto no mesmo local de memória  | o comportamento é indefinido neste caso
[CWG 2146](<https://cplusplus.github.io/CWG/issues/2146.html>) | C++98  | os casos envolvendo comportamentos indefinidos não consideravam bit-fields  | considerado

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 6.9.1 Program execution [intro.execution]

    

  * 7.6.1.6 Increment and decrement [expr.post.incr]

    

  * 7.6.2.8 New [expr.new]

    

  * 7.6.14 Logical AND operator [expr.log.and]

    

  * 7.6.15 Logical OR operator [expr.log.or]

    

  * 7.6.16 Conditional operator [expr.cond]

    

  * 7.6.19 Assignment and compound assignment operators [expr.ass]

    

  * 7.6.20 Comma operator [expr.comma]

    

  * 9.4.5 List-initialization [dcl.init.list]

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 6.9.1 Program execution [intro.execution]

    

  * 7.6.1.5 Increment and decrement [expr.post.incr]

    

  * 7.6.2.7 New [expr.new]

    

  * 7.6.14 Logical AND operator [expr.log.and]

    

  * 7.6.15 Logical OR operator [expr.log.or]

    

  * 7.6.16 Conditional operator [expr.cond]

    

  * 7.6.19 Assignment and compound assignment operators [expr.ass]

    

  * 7.6.20 Comma operator [expr.comma]

    

  * 9.4.4 List-initialization [dcl.init.list]

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 4.6 Program execution [intro.execution]

    

  * 8.2.6 Increment and decrement [expr.post.incr]

    

  * 8.3.4 New [expr.new]

    

  * 8.14 Logical AND operator [expr.log.and]

    

  * 8.15 Logical OR operator [expr.log.or]

    

  * 8.16 Conditional operator [expr.cond]

    

  * 8.18 Assignment and compound assignment operators [expr.ass]

    

  * 8.19 Comma operator [expr.comma]

    

  * 11.6.4 List-initialization [dcl.init.list]

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 1.9 Program execution [intro.execution]

    

  * 5.2.6 Increment and decrement [expr.post.incr]

    

  * 5.3.4 New [expr.new]

    

  * 5.14 Logical AND operator [expr.log.and]

    

  * 5.15 Logical OR operator [expr.log.or]

    

  * 5.16 Conditional operator [expr.cond]

    

  * 5.17 Assignment and compound assignment operators [expr.ass]

    

  * 5.18 Comma operator [expr.comma]

    

  * 8.5.4 List-initialization [dcl.init.list]

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 1.9 Program execution [intro.execution]

    

  * 5.2.6 Increment and decrement [expr.post.incr]

    

  * 5.3.4 New [expr.new]

    

  * 5.14 Logical AND operator [expr.log.and]

    

  * 5.15 Logical OR operator [expr.log.or]

    

  * 5.16 Conditional operator [expr.cond]

    

  * 5.17 Assignment and compound assignment operators [expr.ass]

    

  * 5.18 Comma operator [expr.comma]

    

  * 8.5.4 List-initialization [dcl.init.list]

### Veja também

  * [Precedência de operadores](<#/doc/language/operator_precedence>) que define como as expressões são construídas a partir de sua representação em código-fonte.

[Documentação C](<#/>) para Ordem de avaliação
---