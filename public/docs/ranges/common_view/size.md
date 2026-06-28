# std::ranges::common_view&lt;V&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++20)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++20)
```

Retorna o número de elementos.

Equivalente a `return [ranges::size](<#/doc/ranges/size>)(base_);`, onde `_base__` é a view subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos.

### Exemplo

Execute este código
```cpp
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        constexpr static auto v1 = {1, 2, 3, 4, 5};
        constexpr auto common1 { v1 | std::views::common };
        static_assert(common1.size() == 5);
    
        constexpr auto take3 { v1 | std::views::reverse | std::views::take(3) };
        constexpr auto common2 { take3 | std::views::common };
        static_assert(common2.size() == 3);
    
        using namespace std::literals;
        constexpr static auto v2 = { "∧"sv, "∨"sv, "∃"sv, "∀"sv };
        static_assert(std::ranges::views::common(v2).size() == 4);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro assinado igual ao tamanho de um range
(objeto de ponto de customização)