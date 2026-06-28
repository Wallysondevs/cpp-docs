# std::experimental::ranges::ForwardRange

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool ForwardRange =
InputRange<T> && ForwardIterator<ranges::iterator_t<T>>;
Razão: adicionar descrição e ressalvas adicionais
```
