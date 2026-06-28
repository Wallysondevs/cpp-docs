# std::output_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I, class T >
concept output_iterator =
std::input_or_output_iterator<I> &&
std::indirectly_writable<I, T> &&
requires(I i, T&& t) {
*i++ = std::forward<T>(t); /* not required to be equality-preserving */
};
```

O `output_iterator` concept é um refinamento de [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>), adicionando o requisito de que ele pode ser usado para escrever valores do tipo e categoria de valor codificados por `T` (via [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)). [`equality_comparable`](<#/doc/concepts/equality_comparable>) não é requerido.

### Requisitos semânticos

Seja `E` uma expressão tal que decltype((E)) é `T`, e `i` seja um objeto desreferenciável do tipo `I`. `std::output_iterator<I, T>` é modelado apenas se todos os concepts que ele subsume forem modelados, e `*i++ = E;` tem efeitos equivalentes a `*i = E; ++i;`.

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são requeridas para serem [equality-preserving](<#/doc/concepts>) (exceto onde declarado de outra forma).

### Notas

Ao contrário dos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>), o `output_iterator` concept não exige que a tag de categoria do iterator seja definida.

Algoritmos em output iterators devem ser de passagem única.

### Veja também

[ input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>)(C++20) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)