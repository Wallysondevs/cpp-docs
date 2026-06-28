# std::experimental::ranges::OutputIterator

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I, class T >
concept bool OutputIterator =
Iterator<I> && Writable<I, T> &&
requires(I i, T&& t) {
*i++ = std::forward<T>(t); // not required to be equality preserving
};
```

  
O concept `OutputIterator` é um refinamento de [`Iterator`](<#/doc/experimental/ranges/iterator/Iterator>), adicionando o requisito de que ele pode ser usado para escrever valores do tipo e categoria de valor codificados por `T` (via [`Writable`](<#/doc/experimental/ranges/iterator/Writable>)). [`EqualityComparable`](<#/doc/experimental/ranges/concepts/EqualityComparable>) não é requerido.

Seja `E` uma expressão tal que decltype((E)) é `T`, e `i` um objeto desreferenciável do tipo `I`. `OutputIterator<I, T>` é satisfeito apenas se *i++ = E; tiver efeitos equivalentes a *i = E; ++i;.

### Preservação de Igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige ser preservadora de igualdade é ainda exigida ser _estável_ : duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e interveniente desses objetos de entrada.

### Notas

Ao contrário dos requisitos de iterador de saída no padrão C++, `OutputIterator` no Ranges TS não exige que a tag de categoria do iterador seja definida.

Algoritmos em iteradores de saída devem ser de passagem única.