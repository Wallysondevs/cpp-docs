# std::ranges::dangling

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
struct dangling;
```

`dangling` é um tipo de marcador de posição e um tipo de classe vazia, usado em conjunto com os alias templates [`ranges::borrowed_iterator_t`](<#/doc/ranges/borrowed_iterator_t>) e [`ranges::borrowed_subrange_t`](<#/doc/ranges/borrowed_iterator_t>).

Quando alguns [algoritmos restritos](<#/doc/algorithm/ranges>) que geralmente retornam um iterator ou um subrange de um [`range`](<#/doc/ranges/range>) recebem um argumento `range` rvalue particular que não modela [`borrowed_range`](<#/doc/ranges/borrowed_range>), `dangling` será retornado em vez disso para evitar o retorno de resultados potencialmente dangling.

### Funções membro

## std::ranges::dangling::dangling

```cpp
constexpr dangling() noexcept = default;  // (1)
template<class... Args>
constexpr dangling(Args&&...) noexcept { }  // (2)
```

1) `dangling` é trivialmente construível por padrão.

2) `dangling` pode ser construído a partir de argumentos de número arbitrário e tipo não-void arbitrário. A construção em si não tem nenhum efeito colateral.

Em outras palavras, após substituir o tipo (por exemplo, um tipo de iterator) em uma inicialização não-agregada bem-formada por `dangling`, a inicialização resultante também é bem-formada.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <ranges>
    #include <type_traits>
    #include <string_view>
     
    int main()
    {
        auto get_array_by_value = [] { return std::array{0, 1, 0, 1}; };
        auto dangling_iter = std::ranges::max_element(get_array_by_value());
        static_assert(std::is_same_v<std::ranges::dangling, decltype(dangling_iter)>);
    //  std::cout << *dangling_iter << '\n'; // compilation error: no match for 'operator*'
                                             // (operand type is 'std::ranges::dangling')
     
        auto get_persistent_array =  -> const std::array<int, 4>& {
            static constexpr std::array a{0, 1, 0, 1};
            return a;
        };
        auto valid_iter = std::ranges::max_element(get_persistent_array());
        static_assert(!std::is_same_v<std::ranges::dangling, decltype(valid_iter)>);
        std::cout << *valid_iter << ' '; // 1
     
     
        auto get_string_view = [] { return std::string_view{"alpha"}; };
        auto valid_iter2 = std::ranges::min_element(get_string_view());
            // OK: std::basic_string_view models borrowed_range
        static_assert(!std::is_same_v<std::ranges::dangling, decltype(valid_iter2)>);
        std::cout << '\'' << *valid_iter2 << '\'' << '\n'; // 'a'
    }
```

Output:
```
    1 'a'
```

### Veja também

[ ranges::borrowed_iterator_tranges::borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)(C++20) | obtém o tipo do iterator ou o tipo de `subrange` de um [`borrowed_range`](<#/doc/ranges/borrowed_range>)
(alias template)
[ ranges::borrowed_range](<#/doc/ranges/borrowed_range>)(C++20) | especifica que um tipo é um [`range`](<#/doc/ranges/range>) e iterators obtidos de uma expressão dele podem ser retornados com segurança sem perigo de dangling
(concept)