# Requisitos nomeados C++: DefaultConstructible

Especifica que uma instância do tipo pode ser default constructed.

### Requisitos

O tipo `T` satisfaz DefaultConstructible se todas as seguintes declarações e expressões forem válidas e tiverem seus efeitos especificados:

Expressão/Declaração | Pós-condição
---|---
T u; | O objeto u é [default-initialized](<#/doc/language/default_initialization>).
T u{}; | O objeto u é [value-initialized](<#/doc/language/value_initialization>) ou [aggregate-initialized](<#/doc/language/aggregate_initialization>).
T() T{} | Um objeto temporário do tipo `T` é [value-initialized](<#/doc/language/value_initialization>) ou [aggregate-initialized](<#/doc/language/aggregate_initialization>).

### Notas

Para objetos de tipo de classe não-agregado, um [construtor padrão](<#/doc/language/default_constructor>) público deve ser definido (seja definido pelo usuário ou implicitamente definido) para satisfazer DefaultConstructible.

Objetos não-const de [tipo de objeto não-classe](<#/doc/language/type-id>) são sempre DefaultConstructible.

Tipos não-classe const não são DefaultConstructible.

Tipos agregados const não são DefaultConstructible se qualquer um de seus membros for um objeto de tipo não-classe.

Tipos não-objeto (tipos de função, tipos de referência e o tipo void (possivelmente cv-qualified)), assim como os tipos não-objeto const, nunca são DefaultConstructible.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 724](<https://cplusplus.github.io/LWG/issue724>) | C++98 | os requisitos de DefaultConstructible estavam faltando | adicionado
[LWG 2170](<https://cplusplus.github.io/LWG/issue2170>) | C++98 | inicializar um objeto de um tipo DefaultConstructible com um inicializador vazio poderia resultar apenas em value-initialization | também pode levar a aggregate-initialization

### Veja também

[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(desde C++11)(desde C++11)(desde C++11) | verifica se um tipo possui um construtor padrão
(template de classe)
[ default_initializable](<#/doc/concepts/default_initializable>)(C++20) | especifica que um objeto de um tipo pode ser default constructed
(concept)
*[_(as is)_]: A::pointer