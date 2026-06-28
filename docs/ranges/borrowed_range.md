# std::ranges::borrowed_range, std::ranges::enable_borrowed_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
concept borrowed_range =
ranges::range<R> &&
(std::is_lvalue_reference_v<R>
ranges::enable_borrowed_range<std::remove_cvref_t<R>>);
template< class R >
constexpr bool enable_borrowed_range = false;
```

1) O concept `borrowed_range` define os requisitos de um range de modo que uma função possa recebê-lo por valor e retornar iterators obtidos dele sem perigo de dangling.

2) O template de variável `enable_borrowed_range` é usado para indicar se um [`range`](<#/doc/ranges/range>) é um `borrowed_range`. O template primário é definido como false.

### Requisitos semânticos

Seja `U` [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; se `T` for um tipo de referência rvalue, e `T` caso contrário. Dada uma variável u do tipo `U`, `T` modela `borrowed_range` apenas se a validade dos iterators obtidos de u não estiver ligada ao tempo de vida dessa variável.

### Especializações

Especializações de `enable_borrowed_range` para todas as especializações dos seguintes templates padrão são definidas como true:

*   [`std::basic_string_view`](<#/doc/string/basic_string_view>)
*   [`std::span`](<#/doc/container/span>)
*   [`std::ranges::subrange`](<#/doc/ranges/subrange>)
*   [`std::ranges::ref_view`](<#/doc/ranges/ref_view>)
*   [`std::ranges::empty_view`](<#/doc/ranges/empty_view>)
*   [`std::ranges::iota_view`](<#/doc/ranges/iota_view>)

Especialização de `enable_borrowed_range` para os seguintes adaptadores de range padrão são definidas como true se e somente se std::ranges::enable_borrowed_range&lt;V&gt; for true, onde `V` é o tipo de view subjacente:

*   [`std::ranges::owning_view`](<#/doc/ranges/owning_view>)
*   [`std::ranges::take_view`](<#/doc/ranges/take_view>)
*   [`std::ranges::drop_view`](<#/doc/ranges/drop_view>)
*   [`std::ranges::drop_while_view`](<#/doc/ranges/drop_while_view>)
*   [`std::ranges::common_view`](<#/doc/ranges/common_view>)
*   [`std::ranges::reverse_view`](<#/doc/ranges/reverse_view>)
*   [`std::ranges::elements_view`](<#/doc/ranges/elements_view>)

*   [`std::ranges::adjacent_view`](<#/doc/ranges/adjacent_view>)

| (desde C++23)
---|---
Especialização para [`std::ranges::zip_view`](<#/doc/ranges/zip_view>) é definida como true se e somente se (std::ranges::enable_borrowed_range&lt;Vs&gt; && ...) for true, onde `Vs...` são todos os tipos de view que ele adapta. | (desde C++23)

Um programa pode especializar `enable_borrowed_range` para true para [tipos definidos pelo programa](<#/doc/language/type-id>) não qualificados por cv que modelam `borrowed_range`, e para false para tipos que não o fazem. Tais especializações devem ser utilizáveis em [expressões constantes](<#/doc/language/constant_expression>) e ter o tipo const bool.

### Exemplo

Demonstra as especializações de `enable_borrowed_range` para tipos definidos pelo programa. Tais especializações protegem contra resultados potencialmente dangling.

Run this code
```cpp
    #include <algorithm>
    #include <array>
    #include <cstddef>
    #include <iostream>
    #include <ranges>
    #include <span>
    #include <type_traits>
    
    template<typename T, std::size_t N>
    struct MyRange : std::array<T, N> {};
    
    template<typename T, std::size_t N>
    constexpr bool std::ranges::enable_borrowed_range<MyRange<T, N>> = false;
    
    template<typename T, std::size_t N>
    struct MyBorrowedRange : std::span<T, N> {};
    
    template<typename T, std::size_t N>
    constexpr bool std::ranges::enable_borrowed_range<MyBorrowedRange<T, N>> = true;
    
    int main()
    {
        static_assert(std::ranges::range<MyRange<int, 8>>);
        static_assert(std::ranges::borrowed_range<MyRange<int, 8>> == false);
        static_assert(std::ranges::range<MyBorrowedRange<int, 8>>);
        static_assert(std::ranges::borrowed_range<MyBorrowedRange<int, 8>> == true);
    
        auto getMyRangeByValue = []{ return MyRange<int, 4>{{1, 2, 42, 3}}; };
        auto dangling_iter = std::ranges::max_element(getMyRangeByValue());
        static_assert(std::is_same_v<std::ranges::dangling, decltype(dangling_iter)>);
        // *dangling_iter; // compilation error (i.e. dangling protection works.)
    
        auto my = MyRange<int, 4>{{1, 2, 42, 3}};
        auto valid_iter = std::ranges::max_element(my);
        std::cout << *valid_iter << ' '; // OK: 42
    
        auto getMyBorrowedRangeByValue = []
        {
            static int sa[4]{1, 2, 42, 3};
            return MyBorrowedRange<int, std::size(sa)>{sa};
        };
        auto valid_iter2 = std::ranges::max_element(getMyBorrowedRangeByValue());
        std::cout << *valid_iter2 << '\n'; // OK: 42
    }
```

Output:
```
    42 42
```

### Veja também

[ ranges::dangling](<#/doc/ranges/dangling>)(C++20) | um tipo de placeholder indicando que um iterator ou um `subrange` não deve ser retornado, pois seria dangling
(class)