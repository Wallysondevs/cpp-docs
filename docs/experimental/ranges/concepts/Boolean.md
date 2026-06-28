# std::experimental::ranges::Boolean

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class B >
concept bool Boolean =
Movable<std::decay_t<B>> &&
requires(const std::remove_reference_t<B>& b1,
const std::remove_reference_t<B>& b2, const bool a) {
{ b1 } -> ConvertibleTo<bool>&&;
{ !b1 } -> ConvertibleTo<bool>&&;
{ b1 && a } -> Same<bool>&&;
{ b1
{ b1 && b2 } -> Same<bool>&&;
{ a && b2 } -> Same<bool>&&;
{ b1
{ a
{ b1 == b2 } -> ConvertibleTo<bool>&&;
{ b1 == a } -> ConvertibleTo<bool>&&;
{ a == b2 } -> ConvertibleTo<bool>&&;
{ b1 != b2 } -> ConvertibleTo<bool>&&;
{ b1 != a } -> ConvertibleTo<bool>&&;
{ a != b2 } -> ConvertibleTo<bool>&&;
};
```

O concept `Boolean<B>` especifica os requisitos para um tipo utilizável em contextos Booleanos. Para que `Boolean` seja satisfeito, os operadores lógicos devem ter o comportamento usual (incluindo curto-circuito). Mais precisamente, dado

  * `b1`, `b2`, dois lvalues do tipo const `[std::remove_reference_t](<#/doc/types/remove_reference>)<B>`,

`Boolean<B>` é satisfeito apenas se:

  * `bool(b1) == !bool(!b1)`;
  * `b1 && b2`, `b1 && bool(b2)` e `bool(b1) && b2` são todos iguais a `bool(b1) && bool(b2)` e têm a mesma avaliação de curto-circuito;
  * `b1 || b2`, `b1 || bool(b2)` e `bool(b1) || b2` são todos iguais a `bool(b1) || bool(b2)` e têm a mesma avaliação de curto-circuito;
  * `bool(b1 == b2)`, `bool(b1 == bool(b2))` e `bool(bool(b1) == b2)` são todos iguais a `(bool(b1) == bool(b2))`;
  * `bool(b1 != b2)`, `bool(b1 != bool(b2))` e `bool(bool(b1) != b2)` são todos iguais a `(bool(b1) != bool(b2))`.

### Preservação de igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige que preserve a igualdade também se exige que seja _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita intermediária desses objetos de entrada.

Salvo indicação em contrário, toda expressão usada em uma _requires-expression_ deve preservar a igualdade e ser estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Variações de expressão implícitas

Uma _requires-expression_ que usa uma expressão que não modifica para algum operando lvalue constante também requer implicitamente variações adicionais dessa expressão que aceitam um lvalue não-constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente exigida com semânticas diferentes. Essas _variações de expressão implícitas_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações é não especificada.

### Notas

Exemplos de tipos `Boolean` incluem bool, `[std::true_type](<#/doc/types/integral_constant>)` e `[std::bitset](<#/doc/utility/bitset>)<N>::reference`. Ponteiros não são tipos `Boolean`.

Uma restrição de dedução na forma `{ expression } -> Same<T>&&` efetivamente exige que `decltype((expression))&&` seja exatamente o mesmo tipo que `T&&`. Isso restringe tanto o tipo da expressão quanto sua categoria de valor.