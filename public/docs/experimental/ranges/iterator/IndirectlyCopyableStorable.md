# std::experimental::ranges::IndirectlyCopyableStorable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class In, class Out >
concept bool IndirectlyCopyableStorable =
IndirectlyCopyable<In, Out> &&
Writable<Out, const ranges::value_type_t<In>&> &&
Copyable<ranges::value_type_t<In>> &&
Constructible<ranges::value_type_t<In>, ranges::reference_t<In>> &&
Assignable<ranges::value_type_t<In>&, ranges::reference_t<In>>;
Razão: adicionar descrição e ressalvas adicionais
```
