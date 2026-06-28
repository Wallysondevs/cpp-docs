# std::experimental::ranges::Semiregular

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Semiregular = Copyable<T> && DefaultConstructible<T>;
```

O concept `Semiregular` especifica que um tipo é tanto copiável quanto construível por padrão. Ele é satisfeito por tipos que se comportam de forma semelhante a tipos embutidos como int, exceto que eles não precisam suportar comparação com `==`.