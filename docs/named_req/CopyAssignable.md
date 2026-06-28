# Requisitos nomeados C++: CopyAssignable

Especifica que uma instância do tipo pode ser atribuída por cópia a partir de uma [expressão lvalue](<#/doc/language/value_category>).

### Requisitos

O tipo `T` satisfaz CopyAssignable se

* O tipo `T` satisfaz [MoveAssignable](<#/doc/named_req/MoveAssignable>), e

Dado

* `t`, uma [expressão lvalue](<#/doc/language/value_category>) modificável do tipo `T`,
* `v`, uma expressão [lvalue](<#/doc/language/value_category>) do tipo `T` ou `const T` ou uma expressão [rvalue](<#/doc/language/value_category>) do tipo `const T`.

As seguintes expressões devem ser válidas e ter seus efeitos especificados.

Expressão | Tipo de retorno | Valor de retorno | Pós-condições
---|---|---|---
t = v | `T&` | `t` | O valor de `t` é equivalente ao valor de `v`. O valor de `v` permanece inalterado.

### Ver também

[ is_copy_assignableis_trivially_copy_assignableis_nothrow_copy_assignable](<#/doc/types/is_copy_assignable>)(desde C++11)(desde C++11)(desde C++11) | verifica se um tipo possui um operador de atribuição por cópia
(modelo de classe)
[ assignable_from](<#/doc/concepts/assignable_from>)(desde C++20) | especifica que um tipo é atribuível a partir de outro tipo
(concept)
*[_(as is)_]: A::pointer