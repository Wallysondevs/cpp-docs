# std::ranges::common_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept common_range =
ranges::range<T> && std::same_as<ranges::iterator_t<T>, ranges::sentinel_t<T>>;
```

O concept `common_range` é um refinamento de [`range`](<#/doc/ranges/range>) para o qual [std::ranges::begin()](<#/doc/ranges/begin>) e [std::ranges::end()](<#/doc/ranges/end>) retornam o mesmo tipo (por exemplo, todos os containers da standard library).

### Exemplo

Execute este código
```cpp
    #include <ranges>
    
    struct A
    {
        char* begin();
        char* end();
    };
    static_assert( std::ranges::common_range<A> );
    
    struct B
    {
        char* begin();
        bool end();
    };  // não é um common_range: begin/end têm tipos diferentes
    static_assert( not std::ranges::common_range<B> );
    
    struct C
    {
        char* begin();
    };  // não é um common_range, nem mesmo um range: não tem end()
    static_assert( not std::ranges::common_range<C> );
    
    int main() {}
```

### Veja também

[ ranges::common_viewviews::common](<#/doc/ranges/common_view>)(C++20) | converte um [`view`](<#/doc/ranges/view>) em um `common_range`
(class template) (objeto adaptador de range)