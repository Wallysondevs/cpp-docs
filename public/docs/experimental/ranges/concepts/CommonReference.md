# std::experimental::ranges::CommonReference

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class U >
concept bool CommonReference =
Same<ranges::common_reference_t<T, U>, ranges::common_reference_t<U, T>> &&
ConvertibleTo<T, ranges::common_reference_t<T, U>> &&
ConvertibleTo<U, ranges::common_reference_t<T, U>>;
```

O concept `CommonReference<T, U>` especifica que dois tipos `T` e `U` compartilham um _tipo de referência comum_ (conforme calculado por ranges::common_reference_t) ao qual ambos podem ser convertidos.

`CommonReference<T, U>` é satisfeito apenas se, dadas as expressões `t` e `u` tais que decltype((t)) é `T` e decltype((u)) é `U`,

  * [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<T, U>(t) é igual a [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<T, U>(t) se e somente se `t` for uma expressão que preserva a igualdade; e
  * [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<T, U>(u) é igual a [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<T, U>(u) se e somente se `u` for uma expressão que preserva a igualdade.

Em outras palavras, a conversão para o tipo de referência comum não deve alterar a propriedade de preservação da igualdade da expressão original.

### Preservação da igualdade

Uma expressão _preserva a igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige que preserve a igualdade é ainda exigida que seja _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e interveniente desses objetos de entrada.

### Ver também

[ common_reference](<#/doc/experimental/ranges/type_traits/common_reference>) | determina o tipo de referência comum de um conjunto de tipos
(modelo de classe)
[ Common](<#/doc/experimental/ranges/concepts/Common>) | especifica que dois tipos compartilham um tipo comum
(concept)
[ common_type](<#/doc/experimental/ranges/type_traits/common_type>) | determina o tipo comum de um conjunto de tipos
(modelo de classe)