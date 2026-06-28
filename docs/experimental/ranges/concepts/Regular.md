# std::experimental::ranges::Regular

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Regular = Semiregular<T> && EqualityComparable<T>;
```

  
O `concept` `Regular` especifica que um tipo é _regular_, ou seja, é copiável, construtível por padrão e comparável por igualdade. É satisfeito por tipos que se comportam de forma semelhante a tipos embutidos como `int`, e que são comparáveis com `==`. 