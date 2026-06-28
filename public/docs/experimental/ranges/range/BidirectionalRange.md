# std::experimental::ranges::BidirectionalRange

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool BidirectionalRange =
ForwardRange<T> &&
BidirectionalIterator<ranges::iterator_t<T>>;
Razão: adicionar descrição e ressalvas adicionais
```
