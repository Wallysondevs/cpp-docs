# std::ranges::range_size_t, std::ranges::range_difference_t, std::ranges::range_value_t

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::sized_range R >
using range_size_t = decltype(ranges::size(std::declval<R&>()));
template< ranges::range R >
using range_difference_t = std::iter_difference_t<ranges::iterator_t<R>>;
template< ranges::range R >
using range_value_t = std::iter_value_t<ranges::iterator_t<R>>;
```

1) Usado para obter o tipo de tamanho do tipo [`sized_range`](<#/doc/ranges/sized_range>) `R`.

2) Usado para obter o tipo de diferença do tipo de iterator do tipo range `R`.

3) Usado para obter o tipo de valor do tipo de iterator do tipo range `R`.

### Parâmetros de template

- **R** — um tipo [`range`](<#/doc/ranges/range>) ou um tipo [`sized_range`](<#/doc/ranges/sized_range>)

### Veja também

[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterator
(alias template)
[ ranges::iterator_tranges::const_iterator_tranges::sentinel_tranges::const_sentinel_t](<#/doc/ranges/iterator_t>)(C++20)(C++23)(C++20)(C++23) | obtém os tipos de iterator e sentinel de um range
(alias template)
[ ranges::range_reference_tranges::range_const_reference_tranges::range_rvalue_reference_tranges::range_common_reference_t](<#/doc/ranges/range_reference_t>)(C++20)(C++23)(C++20)(C++20) | obtém os tipos de referência de um range
(alias template)