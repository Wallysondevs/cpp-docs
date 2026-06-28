# Requisitos nomeados C++: BooleanTestable

Especifica que uma expressão de tal tipo e categoria de valor é conversível para bool, e para a qual os operadores lógicos para o tipo ou dois tipos BooleanTestable diferentes têm o comportamento usual (incluindo [curto-circuito](<https://en.wikipedia.org/wiki/Short-circuit_evaluation> "enwiki:Short-circuit evaluation")).

### Requisitos

Seja e uma expressão de um certo tipo e categoria de valor. O tipo e a categoria de valor atendem aos requisitos BooleanTestable se:

  * !e é bem-formado e não modifica o objeto denotado por e, se houver, exceto que se e for um xvalue, o objeto denotado pode ser deixado em um estado válido, mas não especificado (desde C++11).
  * Tanto e quanto !e são conversíveis para bool por [conversão implícita](<#/doc/language/implicit_cast>) e por [`static_cast`](<#/doc/language/static_cast>).
  * As conversões de ambas as maneiras produzem resultados iguais e não modificam o objeto de origem, se houver, exceto que se e ou !e for um xvalue, o objeto de origem pode ser deixado em um estado válido, mas não especificado (desde C++11).
  * bool(!e) == !bool(e) é verdadeiro.
  * Nenhum operator&& e operator|| não-membro viável é visível por [argument-dependent lookup](<#/doc/language/adl>) para o tipo de e ou !e.
---|---|---
  * Se e ou !e for de um tipo de classe, a classe não define nenhum operator&& ou operator|| membro.

### Notas

O padrão não define um requisito nomeado com este nome. Ele foi originalmente proposto em uma resolução inicial de [LWG2114](<https://cplusplus.github.io/LWG/issue2114>), mas foi substituído pelo concept apenas para exposição `_[boolean-testable](<#/doc/concepts/boolean-testable>)_` na resolução final [P2167R3](<https://wg21.link/P2167R3>). Como as implementações geralmente esperam que os tipos fornecidos modelem `_boolean-testable_` mesmo em modos anteriores ao C++20, intencionalmente tratamos P2167R3 como um relatório de defeito e transformamos o `_boolean-testable_` em requisitos nomeados legados.

Quando os operadores `&&` e `||` são usados com operandos cujo tipo e categoria de valor são BooleanTestable, as versões embutidas são selecionadas e a avaliação de curto-circuito é realizada.

```cpp
O tipo e a categoria de valor de uma expressão e atendem aos requisitos BooleanTestable se e somente se decltype((e)) modelar `_boolean-testable_`.  // (desde C++20)
```

Exemplos de tipos BooleanTestable (com qualquer categoria de valor) incluem bool, [std::true_type](<#/doc/types/integral_constant>)(desde C++11), [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;::[`reference`](<#/doc/utility/bitset/reference>), e int*.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente aos padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>))  | C++98  | a conversibilidade para bool era muito fraca para refletir a expectativa das implementações  | requisitos fortalecidos

### Veja também

[_boolean-testable_](<#/doc/concepts/boolean-testable>) ﻿(C++20) |  especifica que um tipo pode ser usado em contextos Booleanos
(concept apenas para exposição*)
  *[_(as is)_]: A::pointer