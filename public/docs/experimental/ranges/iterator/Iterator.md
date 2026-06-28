# std::experimental::ranges::Iterator

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool Iterator =
requires(I i) {
{ *i } -> auto&&; // Requer: i é desreferenciável
} &&
WeaklyIncrementable<I>;
```

O concept `Iterator` forma a base da taxonomia de concepts de iteradores; todo iterador satisfaz os requisitos de `Iterator`.

### Preservação de Igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

*   As entradas para uma expressão consistem em seus operandos.
*   As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige ser preservadora de igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita interveniente desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ é exigida ser preservadora de igualdade e estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Notas

O `Iterator` em si especifica apenas operações para desreferenciar e incrementar um iterador. A maioria dos algoritmos exigirá operações adicionais, por exemplo:

*   comparar iteradores com sentinels (veja [`Sentinel`](<#/doc/experimental/ranges/iterator/Sentinel>));
*   ler valores de um iterador (veja [`Readable`](<#/doc/experimental/ranges/iterator/Readable>) e [`InputIterator`](<#/doc/experimental/ranges/iterator/InputIterator>));
*   escrever valores para um iterador (veja [`Writable`](<#/doc/experimental/ranges/iterator/Writable>) e [`OutputIterator`](<#/doc/experimental/ranges/iterator/OutputIterator>));
*   um conjunto mais rico de movimentos de iterador (veja [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>), [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>), [`RandomAccessIterator`](<#/doc/experimental/ranges/iterator/RandomAccessIterator>)).

A restrição `-> auto&&` implica que o tipo de resultado da desreferência não pode ser `void`.