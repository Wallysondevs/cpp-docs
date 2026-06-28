# std::experimental::ranges::iterator_t, std::experimental::ranges::sentinel_t

Definido no cabeçalho `[<experimental/ranges/range>](<#/doc/header/experimental/ranges/range>)`

```c
template< class T >
using iterator_t = decltype(ranges::begin(std::declval<T&>()));
template< class T >
using sentinel_t = decltype(ranges::end(std::declval<T&>()));
```

  
Obtém os tipos de iterator e sentinel de um range `T`. 