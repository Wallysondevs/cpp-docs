# std::experimental::ranges::SizedSentinel

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class S, class I >
concept bool SizedSentinel =
Sentinel<S, I> &&
!ranges::disable_sized_sentinel<std::remove_cv_t<S>, std::remove_cv_t<I>> &&
requires(const I& i, const S& s) {
{ s - i } -> Same<ranges::difference_type_t<I>>&&;
{ i - s } -> Same<ranges::difference_type_t<I>>&&;
};
template< class S, class I >
constexpr bool disable_sized_sentinel = false;
```

  
O conceito `SizedSentinel` especifica que um objeto do tipo iterator `I` e um objeto do tipo sentinel `S` podem ser subtraídos para calcular a distância entre eles em tempo constante.

Seja `i` um iterator do tipo `I`, e `s` um sentinel do tipo `S` tal que `[`i`, `s`)` denota um range. Seja `N` o menor número de aplicações de `++i` necessárias para que bool(i == s) seja verdadeiro. Então `SizedSentinel<S, I>` é satisfeito somente se:

  * Se `N` for representável por ranges::difference_type_t&lt;I&gt;, então s - i é bem-definido e igual a `N`; e
  * Se `-N` for representável por ranges::difference_type_t&lt;I&gt;, então i - s é bem-definido e igual a `-N`.

O template de variável `disable_sized_sentinel` fornece um mecanismo para iterators e sentinels que podem ser subtraídos, mas não atendem aos requisitos semânticos de `SizedSentinel`, para optarem por sair do conceito, especializando o template de variável para ter o valor true.

### Preservação de igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que se exige que seja preservadora de igualdade é adicionalmente exigida que seja _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e interveniente desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ é exigida que seja preservadora de igualdade e estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Variações de expressão implícitas

Uma _requires-expression_ que usa uma expressão que não é modificadora para algum operando lvalue constante também exige implicitamente variações adicionais dessa expressão que aceitam um lvalue não-constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente exigida com semânticas diferentes. Essas _variações de expressão implícitas_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações é não especificada.