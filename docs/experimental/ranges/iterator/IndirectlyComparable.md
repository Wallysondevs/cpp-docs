# std::experimental::ranges::IndirectlyComparable

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class I1, class I2, class R = ranges::equal_to<>,
class P1 = ranges::identity, class P2 = ranges::identity >
concept bool IndirectlyComparable =
IndirectRelation<R, ranges::projected<I1, P1>, ranges::projected<I2, P2>>;
Razão: adicionar descrição e ressalvas adicionais
```
