# std::ranges::bidirectional_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept bidirectional_range =
ranges::forward_range<T> && std::bidirectional_iterator<ranges::iterator_t<T>>;
```

O concept `bidirectional_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual ranges::begin retorna um modelo de [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>).

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <list>
    #include <ranges>
    #include <set>
    #include <unordered_set>
     
    int main()
    {
        static_assert(
                std::ranges::bidirectional_range<std::set<int>> and
            not std::ranges::bidirectional_range<std::unordered_set<int>> and
                std::ranges::bidirectional_range<std::list<int>> and
            not std::ranges::bidirectional_range<std::forward_list<int>>
        );
    }
```

### Veja também

[ ranges::forward_range](<#/doc/ranges/forward_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`forward_iterator`](<#/doc/iterator/forward_iterator>)
(concept)
[ ranges::random_access_range](<#/doc/ranges/random_access_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)
(concept)