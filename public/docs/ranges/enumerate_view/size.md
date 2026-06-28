# std::ranges::enumerate_view&lt;V&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++23)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++23)
```

Retorna o número de elementos. Equivalente a `return [ranges::size](<#/doc/ranges/size>)(base_);`, onde [`_base__`](<#/doc/ranges/enumerate_view>) é a view subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <forward_list>
    #include <ranges>
    #include <string_view>
    
    int main()
    {
        constexpr static auto v1 = {1, 2, 3, 4, 5};
        constexpr auto ev1{v1 | std::views::enumerate};
        static_assert(ev1.size() == 5);
        static_assert(std::ranges::sized_range<decltype(v1)>);
    
        auto v2 = std::forward_list{1, 2, 3, 4, 5};
        auto ev2 {v2 | std::views::enumerate};
        static_assert(not std::ranges::sized_range<decltype(v2)>);
        // auto size = ev2.size(); // Erro: v2 não é um range com tamanho
        assert(std::ranges::distance(v2) == 5); // OK, distance não requer um range com tamanho, mas tem complexidade O(N) aqui
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro assinado igual ao tamanho de um range
(objeto de ponto de customização)