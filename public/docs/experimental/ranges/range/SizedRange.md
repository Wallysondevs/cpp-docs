# std::experimental::ranges::SizedRange

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool SizedRange =
Range<T> &&
!ranges::disable_sized_range<std::remove_cv_t<std::remove_reference_t<T>>> &&
requires(T& t) {
{ ranges::size(t) }
-> ConvertibleTo<ranges::difference_type_t<ranges::iterator_t<T>>>;
};
Razão: adicionar descrição e ressalvas adicionais
```
