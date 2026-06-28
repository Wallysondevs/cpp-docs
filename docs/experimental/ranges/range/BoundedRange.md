# std::experimental::ranges::BoundedRange

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool BoundedRange =
Range<T> &&
Same<ranges::iterator_t<T>, ranges::sentinel_t<T>>;
Razão: adicionar descrição e ressalvas adicionais
```
