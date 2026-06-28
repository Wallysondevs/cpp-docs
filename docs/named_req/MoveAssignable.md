# Requisitos nomeados C++: MoveAssignable (desde C++11)

Especifica que uma instância do tipo pode ser atribuída a partir de um argumento [rvalue](<#/doc/language/value_category>).

### Requisitos

O tipo `T` satisfaz MoveAssignable se

Dado

  * `t`, uma [expressão lvalue](<#/doc/language/value_category>) modificável do tipo `T`,
  * `rv`, uma [expressão rvalue](<#/doc/language/value_category>) do tipo `T`.

As seguintes expressões devem ser válidas e ter seus efeitos especificados.

Expressão | Tipo de retorno | Valor de retorno | Pós-condições
---|---|---|---
t = rv | `T&` | `t` | Se `t` e `rv` não se referirem ao mesmo objeto, o valor de `t` é equivalente ao valor de `rv` antes da atribuição. O novo valor de `rv` é não especificado.

### Notas

O tipo não precisa implementar um [operador de atribuição de movimento](<#/doc/language/move_operator>) para satisfazer este requisito de tipo: um [operador de atribuição de cópia](<#/doc/language/as_operator>) que recebe seu parâmetro por valor ou como um `const Type&`, irá se ligar a um argumento rvalue.

Se uma classe MoveAssignable implementar um operador de atribuição de movimento, ela também pode implementar [move semantics](<#/doc/utility/move>) para tirar proveito do fato de que o valor de `rv` após a atribuição é não especificado.

### Veja também

[ is_move_assignableis_trivially_move_assignableis_nothrow_move_assignable](<#/doc/types/is_move_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição de movimento
(modelo de classe)
[ assignable_from](<#/doc/concepts/assignable_from>)(C++20) | especifica que um tipo é atribuível a partir de outro tipo
(concept)
*[_(como está)_]: A::pointer