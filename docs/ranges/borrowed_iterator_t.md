# std::ranges::borrowed_iterator_t, std::ranges::borrowed_subrange_t

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::range R >
using borrowed_iterator_t = /* veja abaixo */;
template< ranges::range R >
using borrowed_subrange_t = /* veja abaixo */;
```

1) `std::[ranges::iterator_t](<#/doc/ranges/iterator_t>)<R>` se `R` modela [`borrowed_range`](<#/doc/ranges/borrowed_range>), `[std::ranges::dangling](<#/doc/ranges/dangling>)` caso contrário.

2) `std::[ranges::subrange](<#/doc/ranges/subrange>)<std::[ranges::iterator_t](<#/doc/ranges/iterator_t>)<R>>` se `R` modela [`borrowed_range`](<#/doc/ranges/borrowed_range>), `[std::ranges::dangling](<#/doc/ranges/dangling>)` caso contrário.

Esses dois alias templates são usados por alguns [constrained algorithms](<#/doc/algorithm/ranges>) para evitar o retorno de *iterators* ou *views* potencialmente *dangling*.

### Implementação possível

[borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)
---
```cpp
    template< std::ranges::range R >
    using borrowed_iterator_t = std::conditional_t<std::ranges::borrowed_range<R>,
        std::ranges::iterator_t<R>, std::ranges::dangling>;
```

[borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)
```cpp
    template< std::ranges::range R >
    using borrowed_subrange_t = std::conditional_t<std::ranges::borrowed_range<R>,
        std::ranges::subrange<std::ranges::iterator_t<R>>, std::ranges::dangling>;
```

### Veja também

[ ranges::dangling](<#/doc/ranges/dangling>)(C++20) | um tipo *placeholder* indicando que um *iterator* ou um `subrange` não deve ser retornado, pois seria *dangling*
(class)