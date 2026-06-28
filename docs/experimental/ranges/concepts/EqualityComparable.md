# std::experimental::ranges::EqualityComparable, std::experimental::ranges::EqualityComparableWith

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool EqualityComparable = WeaklyEqualityComparableWith<T, T>;
template< class T, class U >
concept bool EqualityComparableWith =
EqualityComparable<T> &&
EqualityComparable<U> &&
CommonReference<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&> &&
EqualityComparable<
ranges::common_reference_t<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&>> &&
WeaklyEqualityComparableWith<T, U>;
```

1) O concept `EqualityComparable<T>` especifica que os operadores de comparação `==` e `!=` em `T` refletem igualdade: `==` resulta em true se e somente se os operandos são iguais.

`EqualityComparable<T>` é satisfeito somente se, dados objetos `a` e `b` do tipo `T`, bool(a == b) é true se e somente se `a` e `b` são iguais. Juntamente com o requisito de que a == b preserva a igualdade, isso implica que `==` é simétrico e transitivo, e ainda que `==` é reflexivo para todos os objetos `a` que são iguais a pelo menos um outro objeto.

2) O concept `EqualityComparableWith<T, U>` especifica que os operadores de comparação `==` e `!=` em operandos (possivelmente mistos) `T` e `U` produzem resultados consistentes com a igualdade. Comparar operandos mistos produz resultados equivalentes a comparar os operandos convertidos para seu tipo comum.

Formalmente, `EqualityComparableWith<T, U>` é satisfeito somente se, dado qualquer lvalue `t` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e qualquer lvalue `u` do tipo const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;, e seja `C` [ranges::common_reference_t](<#/doc/experimental/ranges/type_traits/common_reference>)<const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;&, const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt;&>, bool(t == u) == bool(C(t) == C(u)).

### Preservação da igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

* As entradas para uma expressão consistem em seus operandos.
* As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é ainda exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

### Variações de expressão implícitas

Uma _requires-expression_ que usa uma expressão que não é modificadora para algum operando lvalue constante também requer implicitamente variações adicionais dessa expressão que aceitam um lvalue não constante ou um rvalue (possivelmente constante) para o operando dado, a menos que tal variação de expressão seja explicitamente exigida com semânticas diferentes. Essas _variações de expressão implícitas_ devem atender aos mesmos requisitos semânticos da expressão declarada. A extensão em que uma implementação valida a sintaxe das variações é não especificada.