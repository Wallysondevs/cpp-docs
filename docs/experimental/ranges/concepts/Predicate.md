# std::experimental::ranges::Predicate

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class F, class... Args >
concept bool Predicate =
RegularInvocable<F, Args...> &&
Boolean<std::result_of_t<F&&(Args&&...)>>;
```

O concept `Predicate<F, Args...>` especifica que `F` é um predicado que aceita argumentos cujos tipos e categorias de valor são codificados por `Args...`, ou seja, pode ser invocado com esses argumentos para produzir um resultado [`Boolean`](<#/doc/experimental/ranges/concepts/Boolean>).

Note que [`RegularInvocable`](<#/doc/experimental/ranges/concepts/Invocable>) exige que a invocação não modifique nem o objeto invocável nem os argumentos e seja preservadora de igualdade.

### Preservação de igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve ser preservadora de igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita intermediária desses objetos de entrada.