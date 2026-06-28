# std::experimental::ranges::InputRange

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
concept bool InputRange =
Range<T> && InputIterator<ranges::iterator_t<T>>;
Razão: adicionar descrição e ressalvas adicionais
```
