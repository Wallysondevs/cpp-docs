# std::experimental::ranges::Readable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class In >
concept bool Readable =
requires {
typename ranges::value_type_t<In>;
typename ranges::reference_t<In>;
typename ranges::rvalue_reference_t<In>;
} &&
CommonReference<ranges::reference_t<In>&&, ranges::value_type_t<In>&> &&
CommonReference<ranges::reference_t<In>&&, ranges::rvalue_reference_t<In>&&> &&
CommonReference<ranges::rvalue_reference_t<In>&&, const ranges::value_type_t<In>&>;
```

  
O concept `Readable` é satisfeito por tipos que são legíveis pela aplicação de `operator*`, como ponteiros, smart pointers e iterators. 