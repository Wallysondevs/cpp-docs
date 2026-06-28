# std::experimental::ranges::WeaklyIncrementable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool WeaklyIncrementable =
Semiregular<I> &&
requires(I i) {
typename ranges::difference_type_t<I>;
requires SignedIntegral<ranges::difference_type_t<I>>;
{ ++i } -> Same<I>&; /* não é exigido que preserve a igualdade */
i++; /* não é exigido que preserve a igualdade */
};
```

O concept `WeaklyIncrementable<I>` especifica os requisitos para um tipo que pode ser incrementado (com os operadores de pré-incremento e pós-incremento). As operações de incremento não precisam preservar a igualdade, e o tipo não precisa ser [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>).

Seja i um objeto do tipo `I`. i é dito _incrementável_ se estiver no domínio de ambos os operadores de pré-incremento e pós-incremento. `WeaklyIncrementable<I>` é satisfeito apenas se:

  * ++i e i++ têm o mesmo domínio;
  * Se i for incrementável, então:
    * ++i e i++ ambos avançam i para o próximo elemento; e
    * ++i se refere ao mesmo objeto que i.

### Preservação da igualdade

Uma expressão _preserva a igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

### Notas

Para tipos `WeaklyIncrementable`, a igual a b não implica que ++a seja igual a ++b. Algoritmos sobre tais tipos devem ser de passagem única e nunca tentar passar pelo mesmo valor duas vezes.