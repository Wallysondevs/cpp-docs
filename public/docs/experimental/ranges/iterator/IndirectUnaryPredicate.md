# std::experimental::ranges::IndirectUnaryPredicate

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class F, class I >
concept bool IndirectUnaryPredicate =
Readable<I> && CopyConstructible<F> &&
Predicate<F&, ranges::value_type_t<I>&> &&
Predicate<F&, ranges::reference_t<I>> &&
Predicate<F&, ranges::iter_common_reference_t<I>>;
Razão: adicionar descrição e ressalvas adicionais
```
