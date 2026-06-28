# Requisitos nomeados C++: LessThanComparable

O tipo deve funcionar com o operador `<` e o resultado deve ter semântica padrão.

### Requisitos

O tipo `T` satisfaz LessThanComparable se, dadas as expressões a, b e c do tipo `T` ou const T (desde C++11), a seguinte expressão é válida e tem seus efeitos especificados:

Expressão | Tipo | Efeitos
---|---
a < b | atende a [BooleanTestable](<#/doc/named_req/BooleanTestable>)
(até C++20) | Estabelece uma relação de [ordem fraca estrita](<https://en.wikipedia.org/wiki/strict_weak_ordering> "enwiki:strict weak ordering") com as seguintes propriedades:

  * Para todo a, !(a < a) resulta em true.
  * Se a < b, então !(b < a).
  * Se a < b e b < c, então a < c.
  * Definindo equiv(a, b) como !(a < b) && !(b < a), se equiv(a, b) e equiv(b, c), então equiv(a, c).

models [`_boolean-testable_`](<#/doc/concepts/boolean-testable>)
(desde C++20)

### Notas

Para satisfazer este requisito, tipos que não possuem [operadores de comparação](<#/doc/language/operator_comparison>) embutidos devem fornecer um [operator< definido pelo usuário](<#/doc/language/operators>).

Para os tipos que são tanto [EqualityComparable](<#/doc/named_req/EqualityComparable>) quanto LessThanComparable, a standard library C++ faz uma distinção entre

  * _Igualdade_ , que é o valor da expressão a == b e
  * _Equivalência_ , que é o valor da expressão !(a < b) && !(b < a).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | a conversibilidade para bool era muito fraca para refletir a expectativa das implementações | requisitos fortalecidos

### Ver também

[Compare](<#/doc/named_req/Compare>) | um [BinaryPredicate](<#/doc/named_req/BinaryPredicate>) que estabelece uma relação de ordenação
(requisito nomeado)
[ strict_weak_order](<#/doc/concepts/strict_weak_order>)(C++20) | especifica que uma [`relation`](<#/doc/concepts/relation>) impõe uma ordem fraca estrita
(concept)
  *[_(as is)_]: A::pointer