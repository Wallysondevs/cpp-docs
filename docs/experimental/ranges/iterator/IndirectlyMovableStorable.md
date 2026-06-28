Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class In, class Out >
concept bool IndirectlyMovableStorable =
IndirectlyMovable<In, Out> &&
Writable<Out, ranges::value_type_t<In>> &&
Movable<ranges::value_type_t<In>> &&
Constructible<ranges::value_type_t<In>, ranges::rvalue_reference_t<In>> &&
Assignable<ranges::value_type_t<In>&, ranges::rvalue_reference_t<In>>;
Razão: adicionar descrição e ressalvas adicionais
```
