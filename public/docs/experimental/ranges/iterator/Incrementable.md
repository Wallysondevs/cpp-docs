# std::experimental::ranges::Incrementable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool Incrementable =
Regular<I> &&
WeaklyIncrementable<I> &&
requires(I i) {
{ i++ } -> Same<I>&&;
};
```

O concept `Incrementable<I>` especifica os requisitos para um tipo que pode ser incrementado (com os operadores de pré e pós-incremento). As operações de incremento (incluindo aquelas exigidas por [`WeaklyIncrementable`](<#/doc/experimental/ranges/iterator/WeaklyIncrementable>)) devem preservar a igualdade, e o tipo deve ser [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>).

Sejam `a` e `b` objetos incrementáveis do tipo `I`. `Incrementable<I>` é satisfeito apenas se:

  * If bool(a == b) then bool(a++ == b).
  * If bool(a == b) then bool(void(a++), a) == ++b).

### Preservação da igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade também deve ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ deve preservar a igualdade e ser estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Notas

O requisito de que `a` seja igual a `b` implica que `++a` seja igual a `++b`, o que permite o uso de algoritmos de múltiplas passagens com tipos `Incrementable`.