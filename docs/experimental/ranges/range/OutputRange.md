# std::experimental::ranges::OutputRange

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class R, class T >
concept bool OutputRange =
Range<R> && OutputIterator<ranges::iterator_t<R>, T>;
Razão: adicionar descrição e advertências adicionais
```
