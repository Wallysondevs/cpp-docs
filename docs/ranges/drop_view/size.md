# std::ranges::drop_view&lt;V&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++20)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++20)
```

  
Retorna o número de elementos.

Seja [`_base__`](<#/doc/ranges/drop_view>) a view subjacente, [`_count__`](<#/doc/ranges/drop_view>) seja a contagem armazenada (o número passado para o construtor, ou ​0​ se *this for construído por padrão). Equivalente a:
```
    const auto s = ranges::size(base_);
    const auto c = static_cast<decltype(s)>(count_);
    return s < c ? 0 : s - c;
```

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos.

### Exemplo

Execute este código
```
    #include <array>
    #include <ranges>
     
    int main()
    {
        constexpr std::array a{42, 43, 44};
        static_assert(std::ranges::drop_view{std::views::all(a), 0}.size() == 3);
        static_assert(std::ranges::drop_view{std::views::all(a), 1}.size() == 2);
        static_assert(std::ranges::drop_view{std::views::all(a), 2}.size() == 1);
        static_assert(std::ranges::drop_view{std::views::all(a), 3}.size() == 0);
        static_assert(std::ranges::drop_view{std::views::all(a), 4}.size() == 0);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)