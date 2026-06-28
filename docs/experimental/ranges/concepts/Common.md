# std::experimental::ranges::Common

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class U >
concept bool Common =
Same<ranges::common_type_t<T, U>, ranges::common_type_t<U, T>> &&
ConvertibleTo<T, ranges::common_type_t<T, U>> &&
ConvertibleTo<U, ranges::common_type_t<T, U>> &&
CommonReference<
std::add_lvalue_reference_t<const T>,
std::add_lvalue_value_reference_t<const U>> &&
CommonReference<
std::add_lvalue_reference_t<ranges::common_type_t<T, U>>,
ranges::common_reference_t<
std::add_lvalue_reference_t<const T>,
std::add_lvalue_reference_t<const U>>>;
```

O concept `Common<T, U>` especifica que dois tipos `T` e `U` compartilham um _tipo comum_ (conforme calculado por ranges::common_type_t) para o qual ambos podem ser convertidos.

`Common<T, U>` é satisfeito apenas se, dadas as expressões `t` e `u` tais que decltype((t)) é `T` e decltype((u)) é `U`,

  * [ranges::common_type_t](<#/doc/experimental/ranges/type_traits/common_type>)<T, U>(t) é igual a [ranges::common_type_t](<#/doc/experimental/ranges/type_traits/common_type>)<T, U>(t) se e somente se `t` for uma expressão que preserva a igualdade; e
  * [ranges::common_type_t](<#/doc/experimental/ranges/type_traits/common_type>)<T, U>(u) é igual a [ranges::common_type_t](<#/doc/experimental/ranges/type_traits/common_type>)<T, U>(u) se e somente se `u` for uma expressão que preserva a igualdade.

Em outras palavras, a conversão para o tipo comum não deve alterar a propriedade de preservação da igualdade da expressão original.

### Preservação da igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita interveniente desses objetos de entrada.

### Veja também

[ common_type](<#/doc/experimental/ranges/type_traits/common_type>) | determina o tipo comum de um conjunto de tipos
(modelo de classe)
[ common_reference](<#/doc/experimental/ranges/type_traits/common_reference>) | determina o tipo de referência comum de um conjunto de tipos
(modelo de classe)
[ CommonReference](<#/doc/experimental/ranges/concepts/CommonReference>) | especifica que dois tipos compartilham um tipo de referência comum
(concept)