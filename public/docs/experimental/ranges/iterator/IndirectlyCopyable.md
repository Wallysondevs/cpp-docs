# std::experimental::ranges::IndirectlyCopyable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class In, class Out >
concept bool IndirectlyCopyable =
Readable<In> && Writable<Out, ranges::reference_t<In>>;
Razão: adicionar descrição e ressalvas adicionais
```
