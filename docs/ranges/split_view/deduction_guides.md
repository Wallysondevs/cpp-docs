# guias de dedução para std::ranges::split_view

```cpp
template< class R, class P >
split_view( R&&, P&& )
-> split_view<views::all_t<R>, views::all_t<P>>;  // (1) (desde C++20)
template< ranges::input_range R >
split_view( R&&, ranges::range_value_t<R> )
-> split_view<views::all_t<R>, ranges::single_view<ranges::range_value_t<R>>>;  // (2) (desde C++20)
```

  
Esses [guias de dedução](<#/doc/language/ctad>) são fornecidos para split_view para permitir a dedução a partir de um range e um delimitador. 

1) O delimitador é um range de elementos.

2) O delimitador é um único elemento.

### Exemplo

Run this code
```cpp
    #include <ranges>
    #include <string_view>
    #include <type_traits>
    using std::operator""sv;
    
    int main() {
        std::ranges::split_view w1{"a::b::c"sv, "::"sv};
        static_assert(std::is_same_v<
            decltype(w1),
            std::ranges::split_view<std::string_view, std::string_view>>);
    
        std::ranges::split_view w2{"x,y,z"sv, ','};
        static_assert(std::is_same_v<
            decltype(w2),
            std::ranges::split_view<std::string_view, std::ranges::single_view<char>>>);
    }
```