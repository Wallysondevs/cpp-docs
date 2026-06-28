# std::ranges::input_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept input_range =
ranges::range<T> && std::input_iterator<ranges::iterator_t<T>>;
```

  
O `concept` `input_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual ranges::begin retorna um modelo de [`input_iterator`](<#/doc/iterator/input_iterator>). 