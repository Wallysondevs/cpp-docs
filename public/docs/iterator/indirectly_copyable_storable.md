# std::indirectly_copyable_storable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class In, class Out >
concept indirectly_copyable_storable =
std::indirectly_copyable<In, Out> &&
std::indirectly_writable<Out, std::iter_value_t<In>&> &&
std::indirectly_writable<Out, const std::iter_value_t<In>&> &&
std::indirectly_writable<Out, std::iter_value_t<In>&&> &&
std::indirectly_writable<Out, const std::iter_value_t<In>&&> &&
std::copyable<std::iter_value_t<In>> &&
std::constructible_from<std::iter_value_t<In>, std::iter_reference_t<In>> &&
std::assignable_from<std::iter_value_t<In>&, std::iter_reference_t<In>>;
```

O `indirectly_copyable_storable` concept especifica a relação entre um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) e um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>). Além de [`indirectly_copyable`](<#/doc/iterator/indirectly_copyable>), este concept especifica que a cópia do tipo `indirectly_readable` pode ser realizada através de um objeto intermediário.

### Requisitos semânticos

`In` e `Out` modelam std::indirectly_copyable_storable<In, Out> somente se, dado um valor desreferenciável `i` do tipo `In`:

  * Após a definição [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;In&gt; obj(*i);, `obj` é igual ao valor previamente denotado por *i, e
  * se [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;In&gt; é um tipo de rvalue reference, *i é colocado em um estado válido, mas não especificado, após a inicialização de `obj`.

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde declarado de outra forma).

### Veja também

[ indirectly_copyable](<#/doc/iterator/indirectly_copyable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_movable_storable](<#/doc/iterator/indirectly_movable_storable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que a movimentação pode ser realizada através de um objeto intermediário
(concept)