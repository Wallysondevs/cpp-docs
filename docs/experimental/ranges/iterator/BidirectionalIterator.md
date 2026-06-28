# std::experimental::ranges::BidirectionalIterator

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I >
concept bool BidirectionalIterator =
ForwardIterator<I> &&
DerivedFrom<ranges::iterator_category_t<I>, ranges::bidirectional_iterator_tag> &&
requires(I i) {
{ \--i } -> Same<I>&;
{ i\-- } -> Same<I>&&;
};
```

  
O concept `BidirectionalIterator<I>` refina [`ForwardIterator`](<#/doc/experimental/ranges/iterator/ForwardIterator>) adicionando a capacidade de mover um iterator para trás.

Um iterator bidirecional `r` é considerado _decrementável_ se e somente se existe algum `s` tal que ++s == r. Todos os iterators decrementáveis `r` devem estar no domínio das expressões \--r e r\--.

Sejam `a` e `b` objetos decrementáveis do tipo `I`. `BidirectionalIterator<I>` é satisfeito somente se:

  * O pré-decremento produz um lvalue que se refere ao operando: [std::addressof](<#/doc/memory/addressof>)(\--a) == [std::addressof](<#/doc/memory/addressof>)(a).
  * O pós-decremento produz o valor anterior do operando: se bool(a == b), então bool(a\-- == b).
  * O pós-decremento e o pré-decremento realizam a mesma modificação em seu operando: Se bool(a == b), então após avaliar tanto a\-- quanto \--b, bool(a == b) ainda é verdadeiro.
  * Incremento e decremento são inversos um do outro:

    

  * Se `a` é incrementável e bool(a == b), então bool(\--(++a) == b).
  * Se bool(a == b), então bool(++(\--a) == b).

### Preservação da igualdade

Uma expressão é _preservadora de igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve ser preservadora de igualdade é adicionalmente exigida a ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação intermediária explícita desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ deve ser preservadora de igualdade e estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.