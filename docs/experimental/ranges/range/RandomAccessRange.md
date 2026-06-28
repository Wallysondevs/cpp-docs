# std::experimental::ranges::RandomAccessRange

Definido no header `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```cpp
template< class T >
concept bool RandomAccessRange =
BidirectionalRange<T> &&
RandomAccessIterator<ranges::iterator_t<T>>;
```

| Esta seção está incompleta
Razão: adicionar descrição e ressalvas adicionais