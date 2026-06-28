# Requisitos nomeados C++: EqualityComparable

O tipo deve funcionar com o operador `==` e o resultado deve ter semântica padrão.

### Requisitos

O tipo `T` satisfaz EqualityComparable se, dadas as expressões a, b e c do tipo `T` ou (desde C++11) const T, a seguinte expressão for válida e tiver seus efeitos especificados:

Expression | Type | Effects
---|---
a == b | meets [BooleanTestable](<#/doc/named_req/BooleanTestable>)
(until C++20) | Estabelece uma [relação de equivalência](<https://en.wikipedia.org/wiki/Equivalence_relation> "enwiki:Equivalence relation"), ou seja, satisfaz as seguintes propriedades:

  * Para todos os valores de a, a == a resulta em true.
  * Se a == b, então b == a.
  * Se a == b e b == c, então a == c.

models [`_boolean-testable_`](<#/doc/concepts/boolean-testable>)
(since C++20)

### Notas

Para satisfazer este requisito, tipos que não possuem [operadores de comparação](<#/doc/language/operator_comparison>) embutidos devem fornecer um [operator== definido pelo usuário](<#/doc/language/operators>).

Para os tipos que são tanto EqualityComparable quanto [LessThanComparable](<#/doc/named_req/LessThanComparable>), a standard library C++ faz uma distinção entre

  * _Igualdade_ , que é o valor da expressão a == b e
  * _Equivalência_ , que é o valor da expressão !(a < b) && !(b < a).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Applied to | Behavior as published | Correct behavior
---|---|---|---
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | mesmo que `T` seja EqualityComparable, os requisitos não se aplicavam a objetos const T | eles se aplicam a const T em vez de `T`
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | a convertibilidade para bool era muito fraca para refletir a expectativa das implementações | requisitos fortalecidos

### Veja também

[ equality_comparableequality_comparable_with](<#/doc/concepts/equality_comparable>)(C++20) | especifica que o operador == é uma relação de equivalência
(concept)
*[_(as is)_]: A::pointer