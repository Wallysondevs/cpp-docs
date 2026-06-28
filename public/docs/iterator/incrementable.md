# std::incrementable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept incrementable =
std::regular<I> &&
std::weakly_incrementable<I> &&
requires(I i) {
{ i++ } -> std::same_as<I>;
};
```

Este concept especifica requisitos para tipos que podem ser incrementados com os operadores de pré-incremento e pós-incremento, cujas operações de incremento são [equality-preserving](<#/doc/concepts>), e o tipo é [std::equality_comparable](<#/doc/concepts/equality_comparable>).

Ao contrário de [std::weakly_incrementable](<#/doc/iterator/weakly_incrementable>), que suporta apenas algoritmos de passagem única, algoritmos unidirecionais de múltiplas passagens podem ser usados com tipos que modelam `std::incrementable`.

### Requisitos semânticos

`I` modela `std::incrementable` apenas se, dados quaisquer dois objetos incrementáveis `a` e `b` do tipo `I`:

  * bool(a == b) implies bool(a++ == b), e
  * bool(a == b) implies bool(((void)a++, a) == ++b).

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Veja também

[ weakly_incrementable](<#/doc/iterator/weakly_incrementable>)(C++20) | especifica que um tipo [`semiregular`](<#/doc/concepts/semiregular>) pode ser incrementado com operadores de pré-incremento e pós-incremento
(concept)
[ same_as](<#/doc/concepts/same_as>)(C++20) | especifica que um tipo é o mesmo que outro tipo
(concept)