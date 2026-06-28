# Statements

_Statements_ são fragmentos do programa C++ que são executados em sequência. O corpo de qualquer função é uma sequência de statements. Por exemplo:
```cpp
    int main()
    {
        int n = 1;                        // statement de declaração
        n = n + 1;                        // statement de expressão
        std::cout << "n = " << n << '\n'; // statement de expressão
        return 0;                         // statement de retorno
    }
```

C++ inclui os seguintes tipos de statements:

1) statements rotulados;

2) statements de expressão;

3) statements compostos;

4) statements de seleção;

5) statements de iteração;

6) statements de salto;

7) statements de declaração;

8) blocos try;

9) blocos atômicos e sincronizados (TM TS).

### Statements rotulados

Um statement rotulado rotula um statement para fins de fluxo de controle.

---
statement rotulado
- **rótulo** — o rótulo aplicado ao statement (definido abaixo)
- **statement** — o statement ao qual o rótulo se aplica; pode ser um statement rotulado em si, permitindo múltiplos rótulos

#### Rótulos

rótulo é definido como

---
```cpp
attr ﻿(opcional) identifier `:`  // (1)
attr ﻿(opcional) `case` constexpr `:`  // (2)
attr ﻿(opcional) `default:`  // (3)
```

1) alvo para [goto](<#/doc/language/goto>);

2) rótulo case em um statement [switch](<#/doc/language/switch>);

3) rótulo default em um statement [switch](<#/doc/language/switch>).

Uma sequência de [atributos](<#/doc/language/attributes>) attr pode aparecer logo no início do rótulo (nesse caso, aplica-se ao rótulo), ou logo antes de qualquer statement em si, nesse caso, aplica-se ao statement inteiro. | (desde C++11)

Um rótulo com um identificador declarado dentro de uma função corresponde a todos os statements goto com o mesmo identificador nessa função, em todos os blocos aninhados, antes e depois de sua própria declaração.

Dois rótulos em uma função não devem ter o mesmo identificador.

Além de serem adicionados a um statement, os rótulos também podem ser usados em qualquer lugar em [statements compostos](<#/doc/language/statements>). | (desde C++23)

Rótulos não são encontrados por [unqualified lookup](<#/doc/language/unqualified_lookup>): um rótulo pode ter o mesmo nome que qualquer outra entidade no programa.
```cpp
    void f()
    {
        {
            goto label; // rótulo no escopo mesmo que declarado depois
            label:      // rótulo pode aparecer no final de um bloco sozinho desde C++23
        }
        goto label; // rótulo ignora escopo de bloco
    }
    
    void g()
    {
        goto label; // erro: rótulo não está no escopo em g()
    }
```

#### Statements com fluxo de controle limitado

Os seguintes statements são _statements com fluxo de controle limitado_ :

  * O compound-statement de um [bloco try](<#/doc/language/try>).
  * O compound-statement de um [handler](<#/doc/language/catch>).

  * Todos os [substatements](<#/doc/language/statements>) de um [statement constexpr if](<#/doc/language/if>).

| (desde C++17)

  * Todos os substatements de um [statement consteval if](<#/doc/language/if>).

| (desde C++23)

Para cada statement com fluxo de controle limitado `S`:

  * Todos os rótulos de destino goto declarados em `S` só podem ser referenciados por statements em `S`.
  * Cada rótulo case ou default que aparece dentro de `S` só pode ser associado a um [statement switch](<#/doc/language/switch>) dentro de `S`.

### Statements de expressão

Um statement de expressão é uma expressão seguida por um ponto e vírgula.

---
attr ﻿(opcional) expression ﻿(opcional) `;`
- **attr** — (desde C++11) sequência opcional de qualquer número de [atributos](<#/doc/language/attributes>)
- **expression** — uma [expressão](<#/doc/language/expressions>)

A maioria dos statements em um programa C++ típico são statements de expressão, como atribuições ou chamadas de função.

Um statement de expressão sem uma expressão é chamado de _statement nulo_. É frequentemente usado para fornecer um corpo vazio a um loop [for](<#/doc/language/for>) ou [while](<#/doc/language/while>). Também pode ser usado para carregar um rótulo no final de um statement composto.(até C++23)

### Statements compostos

Um statement composto ou _bloco_ agrupa uma sequência de statements em um único statement.

---
attr ﻿(opcional) `{` statement... ﻿(opcional) label... ﻿(opcional)(desde C++23) `}`

Quando um statement é esperado, mas múltiplos statements precisam ser executados em sequência (por exemplo, em um statement [if](<#/doc/language/if>) ou um loop), um statement composto pode ser usado:
```cpp
    if (x > 5)          // início do statement if
    {                   // início do bloco
        int n = 1;      // statement de declaração
        std::cout << n; // statement de expressão
    }                   // fim do bloco, fim do statement if
```

Cada statement composto introduz seu próprio [escopo](<#/doc/language/scope>) de bloco; variáveis declaradas dentro de um bloco são destruídas na chave de fechamento em ordem inversa:
```cpp
    int main()
    { // início do bloco externo
        {                                // início do bloco interno
            std::ofstream f("test.txt"); // statement de declaração
            f << "abc\n";                // statement de expressão
        }                                // fim do bloco interno, f é descarregado e fechado
        std::ifstream f("test.txt"); // statement de declaração
        std::string str;             // statement de declaração
        f >> str;                    // statement de expressão
    } // fim do bloco externo, str é destruído, f é fechado
```

Um [rótulo](<#/doc/language/statements>) no final de um statement composto é tratado como se fosse seguido por um statement nulo. | (desde C++23)

### Statements de seleção

Um statement de seleção escolhe entre um de vários fluxos de controle.

---
```cpp
attr ﻿(opcional) `if constexpr`(opcional) `(` init-statement ﻿(opcional) condition `)` statement  // (1)
attr ﻿(opcional) `if constexpr`(opcional) `(` init-statement ﻿(opcional) condition `)` statement
` `else` statement  // (2)
attr ﻿(opcional) `switch (` init-statement ﻿(opcional) condition `)` statement  // (3)
attr ﻿(opcional) `if !`(opcional) `consteval` compound-statement  // (4) (desde C++23)
attr ﻿(opcional) `if !`(opcional) `consteval` compound-statement `else` statement  // (5) (desde C++23)
```

1) statement [if](<#/doc/language/if>);

2) statement [if](<#/doc/language/if>) com uma cláusula else;

3) statement [switch](<#/doc/language/switch>);

4) statement [consteval if](<#/doc/language/if>);

5) statement [consteval if](<#/doc/language/if>) com uma cláusula else.

### Statements de iteração

Um statement de iteração executa repetidamente algum código.

---
attr ﻿(opcional) `while (` condition `)` statement | (1) |
---|---|---
attr ﻿(opcional) `do` statement `while (` expression `)` `;` | (2) |
attr ﻿(opcional) `for (` init-statement condition ﻿(opcional) `;` expression ﻿(opcional) `)` statement | (3) |
attr ﻿(opcional) `for`
` `(` init-statement ﻿(opcional)(desde C++20) for-range-decl `:` for-range-init `)` statement | (4) | (desde C++11)

1) loop [while](<#/doc/language/while>);

2) loop [do-while](<#/doc/language/do>);

3) loop [for](<#/doc/language/for>);

4) loop [range for](<#/doc/language/range-for>).

### Statements de salto

Um statement de salto transfere incondicionalmente o fluxo de controle.

---
attr ﻿(opcional) `break;` | (1) |
---|---|---
attr ﻿(opcional) `continue;` | (2) |
attr ﻿(opcional) `return` expression ﻿(opcional) `;` | (3) |
attr ﻿(opcional) `return` braced-init-list `;` | (4) | (desde C++11)
attr ﻿(opcional) `goto` identifier `;` | (5) |

1) statement [break](<#/doc/language/break>);

2) statement [continue](<#/doc/language/continue>);

3) statement [return](<#/doc/language/return>) com uma expressão opcional;

4) statement [return](<#/doc/language/return>) usando [inicialização por lista](<#/doc/language/list_initialization>);

5) statement [goto](<#/doc/language/goto>).

Nota: para todos os statements de salto, a transferência para fora de um loop, para fora de um bloco, ou de volta para além de uma variável inicializada com duração de armazenamento automática, envolve a destruição de objetos com duração de armazenamento automática que estão no escopo no ponto de onde a transferência ocorreu, mas não no ponto para onde a transferência ocorreu. Se múltiplos objetos foram inicializados, a ordem de destruição é o oposto da ordem de inicialização.

### Statements de declaração

Um statement de declaração introduz um ou mais identificadores em um bloco.

---
block-declaration | (1) |

1) Veja [Declarações](<#/doc/language/declarations>) e [Inicialização](<#/doc/language/initialization>) para detalhes.

### Blocos try

Um bloco try captura exceções lançadas ao executar outros statements.

---
attr ﻿(opcional) `try` compound-statement handler-sequence | (1) |

1) Veja [bloco try](<#/doc/language/try>) para detalhes.

### Blocos atômicos e sincronizados

Um bloco atômico e sincronizado fornece [memória transacional](<#/doc/language/transactional_memory>). |
---
`synchronized` compound-statement | (1) | (TM TS)
---|---|---
`atomic_noexcept` compound-statement | (2) | (TM TS)
`atomic_cancel` compound-statement | (3) | (TM TS)
`atomic_commit` compound-statement | (4) | (TM TS)

1) [bloco synchronized](<#/doc/language/transactional_memory>), executado em uma única ordem total com todos os blocos synchronized;

2) [bloco atomic](<#/doc/language/transactional_memory>) que aborta em exceções;

3) [bloco atomic](<#/doc/language/transactional_memory>) que reverte em exceções;

4) [bloco atomic](<#/doc/language/transactional_memory>) que faz commit em exceções.

(TM TS)

### Substatements

Um _substatement_ de um statement é um dos seguintes:

  * Para um [statement rotulado](<#/doc/language/statements>), seu statement ﻿.
  * Para um [statement composto](<#/doc/language/statements>), qualquer statement de seu statement... ﻿.
  * Para um [statement de seleção](<#/doc/language/statements>), qualquer um de seus statement ﻿ ou compound-statement ﻿(desde C++23).
  * Para um [statement de iteração](<#/doc/language/statements>), seu statement ﻿.

Um statement S1 _engloba_ um statement S2 se qualquer uma das seguintes condições for satisfeita:

  * S2 é um substatement de S1
  * S1 é um statement de seleção ou statement de iteração, e S2 é o init-statement de S1.
  * S1 é um [bloco try](<#/doc/language/try>), e S2 é seu compound-statement ou o compound-statement de qualquer [handler](<#/doc/language/catch>) em sua handler-seq ﻿.
  * S1 engloba um statement S3 e S3 engloba S2.

Um statement S1 é _englobado por_ um statement S2 se S2 engloba S1.

### Veja também

[documentação C](<#/>) para Statements
---