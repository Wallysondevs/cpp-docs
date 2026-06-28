# std::experimental::ranges::IndirectlyMovable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class In, class Out >
concept bool IndirectlyMovable =
Readable<In> && Writable<Out, ranges::rvalue_reference_t<In>>;
Razão: adicionar descrição e ressalvas adicionais
```
