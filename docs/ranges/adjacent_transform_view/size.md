# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<InnerView>;  // (desde C++23)
constexpr auto size() const requires ranges::sized_range<const InnerView>;  // (desde C++23)
```

  
Retorna o número de elementos. 

Seja [`_inner__`](<#/doc/ranges/adjacent_transform_view>) o objeto subjacente do tipo [`_InnerView_`](<#/doc/ranges/adjacent_transform_view>) (ou seja, o [ranges::adjacent_view](<#/doc/ranges/adjacent_view>)<V,N>). 

1,2) Equivalente a return inner_.size();.

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos, pode ser 0 se o tamanho do view subjacente V for menor que N. 

### Exemplo

Execute este código
```
    #include <ranges>
     
    int main()
    {
        constexpr static auto v = {1, 2, 3, 4, 5, 6};
     
        auto f =  { return 0; }; // fictício
     
        constexpr int width1 {4};
        constexpr auto view1 = v | std::views::adjacent_transform<width1>(f);
        static_assert(view1.size() == 3);
        static_assert(view1.size() == (v.size() - width1 + 1));
     
        constexpr int width2 {8};
        constexpr auto view2 = v | std::views::adjacent_transform<width2>(f);
        // a janela é muito larga, então view2 não tem elementos:
        static_assert(view2.size() == 0);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro com sinal igual ao tamanho de um range  
(objeto de ponto de customização)