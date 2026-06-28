# std::ranges::slide_view&lt;V&gt;::size

```cpp
constexpr auto size()
requires ranges::sized_range<V>;  // (1) (desde C++23)
constexpr auto size() const
requires ranges::sized_range<const V>;  // (2) (desde C++23)
```

  
Retorna o número de elementos.

Sejam [`_base__`](<#/doc/ranges/slide_view>) e [`_n__`](<#/doc/ranges/slide_view>) a view subjacente e o "tamanho da janela", respectivamente.

Equivalente a:
```
    auto sz = ranges::distance(base_) - n_ + 1;
    if (sz < 0)
        sz = 0;
    return /*to-unsigned-like*/(sz);
```

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos. É igual a ​0​, se o número de elementos ([ranges::size](<#/doc/ranges/size>)(base_)) na view subjacente [`_base__`](<#/doc/ranges/slide_view>) for menor que o "tamanho da janela" [`_n__`](<#/doc/ranges/slide_view>).

### Exemplo

Execute este código
```
    #include <forward_list>
    #include <iostream>
    #include <list>
    #include <ranges>
     
    int main()
    {
        constexpr static auto v = {1, 2, 3, 4, 5, 6};
     
        constexpr int width1{4};
        constexpr auto view1{std::views::slide(v, width1)};
        static_assert(view1.size() == 3);
        static_assert(view1.size() == (v.size() - width1 + 1));
     
        constexpr int width2{8};
        constexpr auto view2{std::views::slide(v, width2)};
        // a janela é muito larga, então view2 não tem elementos:
        static_assert(view2.size() == 0);
     
        std::forward_list forward_list = v;
        const auto view3{std::views::slide(forward_list, width1)};
    //  auto x = view3.size(); // erro: a restrição sized_range não é satisfeita
     
        std::list list = v;
        const auto view4{std::views::slide(list, width1)};
        std::cout << view4.size() << '\n'; // imprime 3
    }
```

Saída:
```
    3
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)