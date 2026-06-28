# std::ranges::forward_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
`template< class T > concept forward_range = ranges::input_range<T> && std::forward_iterator<ranges::iterator_t<T>>;`
```

O concept `forward_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual `ranges::begin` retorna um modelo de [`forward_iterator`](<#/doc/iterator/forward_iterator>).

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <queue>
    #include <ranges>
    #include <span>
    #include <stack>
    #include <tuple>
    
    const char* str{"not a forward range"};
    const char str2[] = "a forward range";
    static_assert(
        std::ranges::forward_range<decltype("a forward range")> &&
        !std::ranges::forward_range<decltype(str)> &&
        std::ranges::forward_range<decltype(str2)> &&
        !std::ranges::forward_range<std::stack<char>> &&
        std::ranges::forward_range<std::forward_list<char>> &&
        !std::ranges::forward_range<std::tuple<std::forward_list<char>>> &&
        std::ranges::forward_range<std::span<char>> &&
        !std::ranges::forward_range<std::queue<char>> &&
    "");
    
    int main() {}
```