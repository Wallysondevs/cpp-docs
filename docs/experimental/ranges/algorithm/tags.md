# std::experimental::ranges::tag::in, in1, in2, out, out1, out2, fun, min, max, begin, end

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
struct in { /* implementation-defined */ };
struct in1 { /* implementation-defined */ };
struct in2 { /* implementation-defined */ };
struct out { /* implementation-defined */ };
struct out1 { /* implementation-defined */ };
struct out2 { /* implementation-defined */ };
struct fun { /* implementation-defined */ };
struct min { /* implementation-defined */ };
struct max { /* implementation-defined */ };
struct begin { /* implementation-defined */ };
struct end { /* implementation-defined */ };
```

Estas classes são [`TagSpecifier`s](<#/doc/experimental/ranges/utility/TagSpecifier>) para uso com [`ranges::tagged`](<#/doc/experimental/ranges/utility/tagged>).

O nome de um especificador é também o nome do elemento ao qual ele corresponde. Por exemplo, [ranges::tagged](<#/doc/experimental/ranges/utility/tagged>)<[std::pair](<#/doc/utility/pair>)<int, int>, tag::min, tag::max> fornece um conjunto de acessadores nomeados `min` e um conjunto de acessadores nomeados `max`.