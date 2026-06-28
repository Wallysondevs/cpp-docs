# std::experimental::ranges::StrictTotallyOrdered, std::experimental::ranges::StrictTotallyOrderedWith

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool StrictTotallyOrdered =
EqualityComparable<T> &&
requires(const std::remove_reference_t<T>& a,
const std::remove_reference_t<T>& b) {
{ a < b } -> Boolean&&;
{ a > b } -> Boolean&&;
{ a <= b } -> Boolean&&;
{ a >= b } -> Boolean&&;
};
template< class T, class U >
concept bool StrictTotallyOrderedWith =
StrictTotallyOrdered<T> &&
StrictTotallyOrdered<U> &&
CommonReference<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&> &&
StrictTotallyOrdered<
ranges::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>> &&
EqualityComparableWith<T, U> &&
requires(const std::remove_reference_t<T>& t,
const std::remove_reference_t<U>& u) {
{ t < u } -> Boolean&&;
{ t > u } -> Boolean&&;
{ t <= u } -> Boolean&&;
{ t >= u } -> Boolean&&;
{ u < t } -> Boolean&&;
{ u > t } -> Boolean&&;
{ u <= t } -> Boolean&&;
{ u >= t } -> Boolean&&;
};
```

1) O concept `StrictTotallyOrdered<T>` especifica que os operadores de comparação `==,!=,<,>,<=,>=` em `T` produzem resultados consistentes com uma [ordem total estrita](<https://en.wikipedia.org/wiki/Total_order#Strict_total_order> "enwiki:Total order") em `T`.

`StrictTotallyOrdered<T>` é satisfeito apenas se, dados os lvalues `a`, `b` e `c` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;:

  * Exatamente um de bool(a < b), bool(a > b) e bool(a == b) é verdadeiro;
  * Se bool(a < b) e bool(b < c) forem ambos verdadeiros, então bool(a < c) é verdadeiro;
  * bool(a > b) == bool(b < a)
  * bool(a >= b) == !bool(a < b)
  * bool(a <= b) == !bool(b < a)

2) O concept `StrictTotallyOrderedWith<T, U>` especifica que os operadores de comparação `==,!=,<,>,<=,>=` em operandos (possivelmente mistos) de `T` e `U` produzem resultados consistentes com uma ordem total estrita. A comparação de operandos mistos produz resultados equivalentes à comparação dos operandos convertidos para seu tipo comum.

Formalmente, `StrictTotallyOrderedWith<T, U>` é satisfeito apenas se, dado qualquer lvalue `t` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e qualquer lvalue `u` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;, e seja `C` [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;&, const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;&>:

  * bool(t < u) == bool(C(t) < C(u))
  * bool(t > u) == bool(C(t) > C(u))
  * bool(t <= u) == bool(C(t) <= C(u))
  * bool(t >= u) == bool(C(t) >= C(u))
  * bool(u < t) == bool(C(u) < C(t))
  * bool(u > t) == bool(C(u) > C(t))
  * bool(u <= t) == bool(C(u) <= C(t))
  * bool(u >= t) == bool(C(u) >= C(t))

### Preservação de igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e em todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade também deve ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

Salvo indicação em contrário, toda expressão usada em uma _requires-expression_ deve preservar a igualdade e ser estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Variações implícitas de expressão

Uma _requires-expression_ que usa uma expressão não-modificadora para algum operando lvalue constante também requer implicitamente variações adicionais dessa expressão que aceitam um lvalue não-constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente exigida com semânticas diferentes. Essas _variações implícitas de expressão_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações não é especificada.