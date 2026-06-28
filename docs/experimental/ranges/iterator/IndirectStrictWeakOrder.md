# std::experimental::ranges::IndirectStrictWeakOrder

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class F, class I1, class I2 = I1 >
concept bool IndirectStrictWeakOrder =
Readable<I1> && Readable<I2> &&
CopyConstructible<F> &&
StrictWeakOrder<F&, ranges::value_type_t<I1>&, ranges::value_type_t<I2>&> &&
StrictWeakOrder<F&, ranges::value_type_t<I1>&, ranges::reference_t<I2>> &&
StrictWeakOrder<F&, ranges::reference_t<I1>, ranges::value_type_t<I2>&> &&
StrictWeakOrder<F&, ranges::reference_t<I1>, ranges::reference_t<I2>> &&
StrictWeakOrder<F&, ranges::iter_common_reference_t<I1>,
ranges::iter_common_reference_t<I2>>;
Razão: adicionar descrição e ressalvas adicionais
```
