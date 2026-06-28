# std::indirectly_movable_storable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class In, class Out >
concept indirectly_movable_storable =
std::indirectly_movable<In, Out> &&
std::indirectly_writable<Out, std::iter_value_t<In>> &&
std::movable<std::iter_value_t<In>> &&
std::constructible_from<std::iter_value_t<In>, std::iter_rvalue_reference_t<In>> &&
std::assignable_from<std::iter_value_t<In>&, std::iter_rvalue_reference_t<In>>;
```

O `indirectly_movable_storable` concept especifica a relação entre um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) e um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>). Além de [`indirectly_movable`](<#/doc/iterator/indirectly_movable>), este concept especifica que a movimentação do tipo `indirectly_readable` pode ser realizada através de um objeto intermediário.

### Requisitos Semânticos

`In` e `Out` modelam std::indirectly_movable_storable<In, Out> apenas se, dado um valor desreferenciável `i` do tipo `In`:

  * Após a definição [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;In&gt; obj([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i));, `obj` é igual ao valor previamente denotado por *i, e
  * se [std::iter_rvalue_reference_t](<#/doc/iterator/iter_t>)&lt;In&gt; é um tipo de referência rvalue, *i é colocado em um estado válido, mas não especificado, após a inicialização de `obj`.

### Preservação de Igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [equality-preserving](<#/doc/concepts>) (exceto onde declarado de outra forma).

### Veja também

[ indirectly_movable](<#/doc/iterator/indirectly_movable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_copyable_storable](<#/doc/iterator/indirectly_copyable_storable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que a cópia pode ser realizada através de um objeto intermediário
(concept)