# std::ranges::iota_view&lt;W, Bound&gt;::iota_view

```cpp
iota_view() requires std::default_initializable<W> = default;  // (1) (desde C++20)
constexpr explicit iota_view( W value );  // (2) (desde C++20)
constexpr explicit iota_view( std::type_identity_t<W> value,
std::type_identity_t<Bound> bound );  // (3) (desde C++20)
constexpr explicit iota_view( /*iterator*/ first, /* see below */ last );  // (4) (desde C++20)
```

Constrói um [`iota_view`](<#/doc/ranges/iota_view>).

Sobrecarga | [Membros de dados](<#/doc/ranges/iota_view>)
---|---
`_value__` | `_bound__`
(1) | [inicializado por valor](<#/doc/language/value_initialization>) | [inicializado por valor](<#/doc/language/value_initialization>)
(2) | inicializado com value
(3) | inicializado com bound
(4) | inicializado com first.`_[value_](<#/doc/ranges/iota_view/iterator>)_` | veja abaixo

2,3) Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `Bound()` é inatingível a partir de `value`, a menos que `Bound` denote [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>).
  * `W` e `Bound` modelam [`totally_ordered_with`](<#/doc/concepts/totally_ordered>), e `bool(value <= bound)` é falso.

4) Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `Bound()` é inatingível a partir de `value`, a menos que `Bound` denote [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>).
  * `W` e `Bound` modelam [`totally_ordered_with`](<#/doc/concepts/totally_ordered>), e `bool(first.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `<= bound)` é falso.

O tipo de `last` e o método de inicialização de `_[bound_](<#/doc/ranges/iota_view>)_` são determinados pelo tipo que `Bound` denota: O tipo que `Bound` denota | O tipo de `last` | `_[bound_](<#/doc/ranges/iota_view>)_`
---|---|---
`W` | [`_iterator_`](<#/doc/ranges/iota_view/iterator>) | inicializado com last.`_[value_](<#/doc/ranges/iota_view/iterator>)_`
[std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) | `Bound` | inicializado com last
qualquer outro tipo | [`_sentinel_`](<#/doc/ranges/iota_view/sentinel>) | inicializado com last.`_[bound_](<#/doc/ranges/iota_view/sentinel>)_`

### Parâmetros

- **value** — o valor inicial
- **bound** — o limite
- **first** — o iterator que denota o valor inicial
- **last** — o iterator ou sentinel que denota o limite

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        const auto l = {1, 2, 3, 4};
    
        auto i1 = std::ranges::iota_view<int, int>(); // overload (1)
        assert(i1.empty() and i1.size() == 0);
    
        auto i2 = std::ranges::iota_view(1); // overload (2)
        assert(not i2.empty() and i2.front() == 1);
        for (std::cout << "1) "; auto e : i2 | std::views::take(3))
            std::cout << e << ' ';
        std::cout << '\n';
    
        auto i3 = std::ranges::iota_view(std::begin(l)); // overload (2)
        assert(not i3.empty() and i3.front() == l.begin());
        for (std::cout << "2) "; auto e : i3 | std::views::take(4))
            std::cout << *e << ' ';
        std::cout << '\n';
    
        auto i4 = std::ranges::iota_view(1, 8); // overload (3)
        assert(not i4.empty() and i4.front() == 1 and i4.back() == 7);
        for (std::cout << "3) "; auto e : i4)
            std::cout << e << ' ';
        std::cout << '\n';
    
        auto i5 = std::ranges::iota_view(l.begin(), l.end()); // overload (4)
        for (std::cout << "4) "; auto e : i5)
            std::cout << *e << ' ';
        std::cout << '\n';
    
        auto i6 = std::ranges::iota_view(l.begin(), std::unreachable_sentinel); // (4)
        for (std::cout << "5) "; auto e : i6 | std::views::take(3))
            std::cout << *e << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1) 1 2 3 
    2) 1 2 3 4 
    3) 1 2 3 4 5 6 7 
    4) 1 2 3 4 
    5) 1 2 3 
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3523](<https://cplusplus.github.io/LWG/issue3523>) | C++20 | a sobrecarga (4) pode usar um tipo de sentinel incorreto | corrigido
[P2711R1](<https://wg21.link/P2711R1>) | C++20 | as sobrecargas (3,4) não eram explicit | tornadas explicit