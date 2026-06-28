# Requisitos nomeados C++: NumericType

Especifica que o tipo pode ser usado como argumento de template de [std::valarray](<#/doc/numeric/valarray>).

### Requisitos

Para que um tipo `T` seja um NumericType, ele deve ser um tipo de objeto cv-unqualified que:

  * Atende aos requisitos [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [Destructible](<#/doc/named_req/Destructible>).
  * Nenhuma operação em `T` pode lançar exceções.

*[_(as is)_]: A::pointer