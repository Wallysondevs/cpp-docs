# std::experimental::ranges::RandomAccessIterator

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool RandomAccessIterator =
BidirectionalIterator<I> &&
DerivedFrom<ranges::iterator_category_t<I>, ranges::random_access_iterator_tag> &&
StrictTotallyOrdered<I> &&
SizedSentinel<I, I> &&
requires(I i, const I j, const ranges::difference_type_t<I> n) {
{ i += n } -> Same<I>&;
{ j + n } -> Same<I>&&;
{ n + j } -> Same<I>&&;
{ i -= n } -> Same<I>&;
{ j - n } -> Same<I>&&;
j[n];
requires Same<decltype(j[n]), ranges::reference_t<I>>;
};
```

O concept `RandomAccessIterator<I>` refina [`BidirectionalIterator`](<#/doc/experimental/ranges/iterator/BidirectionalIterator>) adicionando suporte para avanço em tempo constante com os operadores `+=`, `+`, `-=`, e `-`, cálculo em tempo constante de distância com `-`, e notação de array com indexação.

Sejam `a` e `b` iteradores válidos do tipo `I` tal que `b` é alcançável a partir de `a`, e seja `n` um valor do tipo ranges::difference_type_t&lt;I&gt; igual a b - a. `RandomAccessIterator<I>` é satisfeito somente se:

  * (a += n) é igual a b.
  * [std::addressof](<#/doc/memory/addressof>)(a += n) é igual a [std::addressof](<#/doc/memory/addressof>)(a).
  * (a + n) é igual a (a += n).
  * (a + n) é igual a (n + a).
  * Para quaisquer dois inteiros positivos `x` e `y`, se a + (x + y) é válido, então a + (x + y) é igual a (a + x) + y.
  * a + 0 é igual a a.
  * Se (a + (n - 1)) é válido, então \--b é igual a (a + (n - 1)).
  * (b += -n) e (b -= n) são ambos iguais a a.
  * [std::addressof](<#/doc/memory/addressof>)(b -= n) é igual a [std::addressof](<#/doc/memory/addressof>)(b).
  * (b - n) é igual a (b -= n).
  * Se b é desreferenciável, então a[n] é válido e é igual a *b.
  * bool(a <= b) é true.

### Preservação de igualdade

Uma expressão é _preservadora de igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade também deve ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

Salvo indicação em contrário, toda expressão usada em uma _requires-expression_ deve preservar a igualdade e ser estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Variações de expressão implícitas

Uma _requires-expression_ que usa uma expressão que não modifica para algum operando lvalue constante também requer implicitamente variações adicionais dessa expressão que aceitam um lvalue não-constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente requerida com semânticas diferentes. Essas _variações de expressão implícitas_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações não é especificada.