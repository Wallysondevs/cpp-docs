# Precedência de Operadores C++

A tabela a seguir lista a precedência e associatividade dos operadores C++. Os operadores são listados de cima para baixo, em ordem decrescente de precedência. a, b e c são operandos.

Precedência | Operador | Descrição | Associatividade 1 | a::b | [Resolução de escopo](<#/doc/language/name>) | Esquerda para direita → 2 | a++ a\-- | [Incremento e decremento sufixo/pós-fixo](<#/doc/language/operator_incdec>) `_type_`(a) ` _type_`{a} | [Conversão funcional (cast)](<#/doc/language/explicit_cast>)
---|---
a() | [Chamada de função](<#/doc/language/operator_other>)
a[] | [Subscrito](<#/doc/language/operator_member_access>)
a.b a->b | [Acesso a membro](<#/doc/language/operator_member_access>)
3 | ++a \--a | [Incremento e decremento prefixo](<#/doc/language/operator_incdec>) | Direita para esquerda ←
+a -a | [Mais e menos unários](<#/doc/language/operator_arithmetic>)
!a ~a | [NOT lógico](<#/doc/language/operator_logical>) e [NOT bit a bit](<#/doc/language/operator_arithmetic>)
(`_type_`)a | [Conversão (cast) estilo C](<#/doc/language/explicit_cast>)
*a | [Indireção](<#/doc/language/operator_member_access>) (desreferência)
&a | [Endereço de](<#/doc/language/operator_member_access>)
[`sizeof`](<#/doc/language/sizeof>) | [Tamanho de](<#/doc/language/sizeof>)[note 1](<#/doc/language/operator_precedence>)
[`co_await`](<#/doc/keyword/co_await>) | [expressão await](<#/doc/language/coroutines>) (desde C++20)
[`new`](<#/doc/language/new>) – [`new[]`](<#/doc/language/new>) | [Alocação dinâmica de memória](<#/doc/language/new>)
[`delete`](<#/doc/language/delete>) – [`delete[]`](<#/doc/language/delete>) | [Desalocação dinâmica de memória](<#/doc/language/delete>)
4 | a.*b a->*b | [Ponteiro para membro](<#/doc/language/operator_member_access>) | Esquerda para direita →
5 | a * b a / b a % b | [Multiplicação, divisão e resto](<#/doc/language/operator_arithmetic>)
6 | a + b a - b | [Adição e subtração](<#/doc/language/operator_arithmetic>)
7 | a << b a >> b | [Deslocamento bit a bit para a esquerda e para a direita](<#/doc/language/operator_arithmetic>)
8 | a <=> b | [Operador de comparação de três vias](<#/doc/language/operator_comparison>) (desde C++20)
9 | a < b a <= b a > b a >= b | Para [operadores relacionais](<#/doc/language/operator_comparison>) `<` e `< =` e `>` e `> =` respectivamente
10 | a == b a != b | Para [operadores de igualdade](<#/doc/language/operator_comparison>) `=` e `!=` respectivamente
11 | a & b | [AND bit a bit](<#/doc/language/operator_arithmetic>)
12 | a ^ b | [XOR bit a bit](<#/doc/language/operator_arithmetic>) (ou exclusivo)
13 | a | b | [OR bit a bit](<#/doc/language/operator_arithmetic>) (ou inclusivo)
14 | a && b | [AND lógico](<#/doc/language/operator_logical>)
15 | a || b | [OR lógico](<#/doc/language/operator_logical>)
16 | a ? b : c | [Condicional ternário](<#/doc/language/operator_other>)[note 2](<#/doc/language/operator_precedence>) | Direita para esquerda ←
[`throw`](<#/doc/language/throw>) | [operador throw](<#/doc/language/throw>)
[`co_yield`](<#/doc/keyword/co_yield>) | [expressão yield](<#/doc/language/coroutines>) (desde C++20)
a = b | [Atribuição direta](<#/doc/language/operator_assignment>) (fornecida por padrão para classes C++)
a += b a -= b | [Atribuição composta](<#/doc/language/operator_assignment>) por soma e diferença
a *= b a /= b a %= b | [Atribuição composta](<#/doc/language/operator_assignment>) por produto, quociente e resto
a <<= b a >>= b | [Atribuição composta](<#/doc/language/operator_assignment>) por deslocamento bit a bit para a esquerda e para a direita
a &= b a ^= b a |= b | [Atribuição composta](<#/doc/language/operator_assignment>) por AND, XOR e OR bit a bit
17 | a, b | [Vírgula](<#/doc/language/operator_other>) | Esquerda para direita →

1. [↑](<#/doc/language/operator_precedence>) O operando de sizeof não pode ser uma conversão de tipo (cast) estilo C: a expressão sizeof (int) * p é interpretada inequivocamente como (sizeof(int)) * p, mas não sizeof((int)*p).
2. [↑](<#/doc/language/operator_precedence>) A expressão no meio do operador condicional (entre `?` e `:`) é analisada como se estivesse entre parênteses: sua precedência em relação a `?:` é ignorada.

Ao analisar uma expressão, um operador listado em uma linha da tabela acima com uma precedência será ligado mais fortemente (como se por parênteses) aos seus argumentos do que qualquer operador listado em uma linha mais abaixo com uma precedência menor. Por exemplo, as expressões [std::cout](<#/doc/io/cout>) << a & b e *p++ são analisadas como ([std::cout](<#/doc/io/cout>) << a) & b e *(p++), e não como [std::cout](<#/doc/io/cout>) << (a & b) ou (*p)++.

Operadores que possuem a mesma precedência são ligados aos seus argumentos na direção de sua associatividade. Por exemplo, a expressão a = b = c é analisada como a = (b = c), e não como (a = b) = c por causa da associatividade da atribuição da direita para a esquerda, mas a + b - c é analisada como (a + b) - c e não a + (b - c) por causa da associatividade da adição e subtração da esquerda para a direita.

A especificação de associatividade é redundante para operadores unários e é mostrada apenas para completude: operadores prefixos unários sempre associam da direita para a esquerda (delete ++*p é delete(++(*p))) e operadores pós-fixos unários sempre associam da esquerda para a direita (a[1][2]++ é ((a[1])[2])++). Note que a associatividade é significativa para operadores de acesso a membros, mesmo que sejam agrupados com operadores pós-fixos unários: a.b++ é analisado como (a.b)++ e não a.(b++).

A precedência de operadores não é afetada pela [sobrecarga de operadores](<#/doc/language/operators>). Por exemplo, [std::cout](<#/doc/io/cout>) << a ? b : c; é analisado como ([std::cout](<#/doc/io/cout>) << a) ? b : c; porque a precedência do deslocamento aritmético para a esquerda é maior do que a do operador condicional.

### Notas

Precedência e associatividade são conceitos de tempo de compilação e são independentes da [ordem de avaliação](<#/doc/language/eval_order>), que é um conceito de tempo de execução.

O próprio padrão não especifica níveis de precedência. Eles são derivados da gramática.

[`const_cast`](<#/doc/language/const_cast>), [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), [`reinterpret_cast`](<#/doc/language/reinterpret_cast>), [`typeid`](<#/doc/language/typeid>), [`sizeof...`](<#/doc/language/sizeof...>), [`noexcept`](<#/doc/language/noexcept>) e [`alignof`](<#/doc/language/alignof>) não estão incluídos, pois nunca são ambíguos.

Alguns dos operadores possuem [grafias alternativas](<#/doc/language/operator_alternative>) (por exemplo, and para &&, or para ||, not para !, etc.).

Em C, o operador condicional ternário tem precedência maior do que os operadores de atribuição. Portanto, a expressão e = a < d ? a++ : a = d, que é analisada em C++ como e = ((a < d) ? (a++) : (a = d)), falhará ao compilar em C devido a restrições gramaticais ou semânticas em C. Consulte a página C correspondente para detalhes.

### Veja também

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | [incremento decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | [acesso a membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)
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
\--a
a++
a\-- | +a
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
a.*b | function call

a(...)
comma

a, b
conditional

a ? b : c
Operadores especiais
[`static_cast`](<#/doc/language/static_cast>) converte um tipo em outro tipo relacionado
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte um tipo em um tipo não relacionado
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo em outro por uma mistura de static_cast, const_cast e reinterpret_cast
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)
[Documentação C](<#/>) para precedência de operadores C
---