# std::ranges::contiguous_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept contiguous_range =
ranges::random_access_range<T> &&
std::contiguous_iterator<ranges::iterator_t<T>> &&
requires(T& t) {
{ ranges::data(t) } ->
std::same_as<std::add_pointer_t<ranges::range_reference_t<T>>>;
};
```

O concept `contiguous_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual `ranges::begin` retorna um modelo de [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e o ponto de customização `ranges::data` é utilizável.

### Requisitos Semânticos

`T` modela `contiguous_range` apenas se, dada uma expressão `e` tal que `decltype((e))` é `T&`, `[std::to_address](<#/doc/memory/to_address>)([ranges::begin](<#/doc/ranges/begin>)(e)) == [ranges::data](<#/doc/ranges/data>)(e)`.

### Exemplo

Run this code
```cpp
    #include <array>
    #include <deque>
    #include <list>
    #include <mdspan>
    #include <ranges>
    #include <set>
    #include <span>
    #include <string_view>
    #include <valarray>
    #include <vector>
    
    template<typename T>
    concept CR = std::ranges::contiguous_range<T>;
    
    // zstring sendo um ranges::contiguous_range não precisa ser um ranges::sized_range
    struct zstring
    {
        struct sentinel
        {
            friend constexpr bool operator==(const char* str, sentinel) noexcept
            { return *str == '\0'; }
        };
    
        const char* str;
    
        const char* begin() const noexcept { return str; }
        sentinel end() const noexcept { return {}; }
    };
    
    int main()
    {
        int a[4];
        static_assert(
                CR<std::vector<int>> and
            not CR<std::vector<bool>> and
            not CR<std::deque<int>> and
                CR<std::valarray<int>> and
                CR<decltype(a)> and
            not CR<std::list<int>> and
            not CR<std::set<int>> and
                CR<std::array<std::list<int>,42>> and
                CR<std::string_view> and
                CR<zstring> and
                CR<std::span<const int>> and
            not CR<std::mdspan<int, std::dims<1>>>
        );
    }
```

### Veja também

[ ranges::sized_range](<#/doc/ranges/sized_range>)(C++20) | especifica que um range conhece seu tamanho em tempo constante
(concept)
[ ranges::random_access_range](<#/doc/ranges/random_access_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)
(concept)