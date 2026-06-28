# std::ranges::output_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template<class R, class T>
concept output_range =
ranges::range<R> && std::output_iterator<ranges::iterator_t<R>, T>;
```

O `concept` `output_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual `ranges::begin` retorna um modelo de [`output_iterator`](<#/doc/iterator/output_iterator>).