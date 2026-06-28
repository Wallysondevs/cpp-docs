# Requisitos nomeados C++: Hash (desde C++11)

Um **Hash** é um objeto de função para o qual a saída depende apenas da entrada e tem uma probabilidade muito baixa de produzir a mesma saída para diferentes valores de entrada.

### Requisitos

O tipo `T` satisfaz Hash se

* O tipo `T` satisfaz [FunctionObject](<#/doc/named_req/FunctionObject>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [Destructible](<#/doc/named_req/Destructible>), e

Dado

* h, um valor do tipo `T` ou `const T`, cujo tipo de argumento é `Key`,
* k, um valor do tipo conversível para `Key` ou const Key,
* u, uma expressão [lvalue](<#/doc/language/value_category>) do tipo `Key`.

As seguintes expressões devem ser válidas e ter seus efeitos especificados.

Expressão | Tipo de retorno | Requisitos
---|---|---
h(k) | [std::size_t](<#/doc/types/size_t>) | O valor retornado depende apenas do valor de k durante a execução do programa. Todas as avaliações de h(k) executadas dentro de uma dada execução de um programa produzem o mesmo resultado para o mesmo valor de k. A probabilidade de h(a) == h(b) para a != b deve se aproximar de 1.0 / [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::size_t](<#/doc/types/size_t>)>::max().
h(u) | [std::size_t](<#/doc/types/size_t>) | u não é modificado.

### Biblioteca padrão

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2291](<https://cplusplus.github.io/LWG/issue2291>) | C++11 | os mesmos resultados para os mesmos argumentos eram exigidos em todos os casos | exigido apenas dentro de uma única execução
*[_(as is)_]: A::pointer