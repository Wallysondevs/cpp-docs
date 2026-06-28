# std::ranges::random_access_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept random_access_range =
ranges::bidirectional_range<T> && std::random_access_iterator<ranges::iterator_t<T>>;
```

  
O concept `random_access_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual ranges::begin retorna um modelo de [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). 

### Exemplo

Execute este código
```cpp 
    #include <array>
    #include <deque>
    #include <list>
    #include <ranges>
    #include <set>
    #include <valarray>
    #include <vector>
    
    template<typename T> concept RAR = std::ranges::random_access_range<T>;
    
    int main()
    {
        int a[4];
        static_assert(
                RAR<std::vector<int>> and
                RAR<std::vector<bool>> and
                RAR<std::deque<int>> and
                RAR<std::valarray<int>> and
                RAR<decltype(a)> and
            not RAR<std::list<int>> and
            not RAR<std::set<int>> and
                RAR<std::array<std::list<int>,42>>
        );
    }
```

### Veja também

[ ranges::sized_range](<#/doc/ranges/sized_range>)(C++20) |  especifica que um range conhece seu tamanho em tempo constante   
(concept)  
[ ranges::contiguous_range](<#/doc/ranges/contiguous_range>)(C++20) |  especifica um range cujo tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>)   
(concept)