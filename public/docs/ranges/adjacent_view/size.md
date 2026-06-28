# std::ranges::adjacent_view&lt;V,N&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (desde C++23)
constexpr auto size() const requires ranges::sized_range<const V>;  // (desde C++23)
```

  
Retorna o número de elementos. 

Seja [`_base__`](<#/doc/ranges/adjacent_view>) a view subjacente. Equivalente a: 
```
    using SizeType = decltype(ranges::size(base_));
    using CommonType = ranges::common_type_t<SizeType, std::size_t>;
    auto size = static_cast<CommonType>(ranges::size(base_));
    size -= std::min<CommonType>(size, N - 1);
    return static_cast<SizeType>(size);
```

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos, pode ser ​0​ se [ranges::size](<#/doc/ranges/size>)(base_) for menor que N. 

### Exemplo

Execute este código
```
    #include <ranges>
    
    int main()
    {
        constexpr static auto v = {1, 2, 3, 4, 5, 6};
    
        constexpr int width1 {4};
        constexpr auto view1 {std::views::adjacent<width1>(v)};
        static_assert(view1.size() == 3);
        static_assert(view1.size() == (v.size() - width1 + 1));
    
        constexpr int width2 {8};
        constexpr auto view2 {std::views::adjacent<width2>(v)};
        // a janela é muito larga, então view2 não tem elementos:
        static_assert(view2.size() == 0);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)