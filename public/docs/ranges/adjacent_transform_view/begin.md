# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::begin

```cpp
constexpr auto begin();  // (1) (desde C++23)
constexpr auto begin() const
requires ranges::range<const InnerView> &&
std::regular_invocable<const F&,
/*REPEAT*/(ranges::range_reference_t<const V>, N)...>;  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/adjacent_transform_view/iterator>) para o primeiro elemento da [`adjacent_transform_view`](<#/doc/ranges/adjacent_transform_view>). 

Seja [`_inner__`](<#/doc/ranges/adjacent_transform_view>) o `ranges::adjacent_view` subjacente. 

1) Equivalente a `return /*iterator*/<false>(*this, inner_.begin());`.

2) Equivalente a `return /*iterator*/<true>(*this, inner_.begin());`.

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o primeiro elemento. 

### Exemplo

Execute este código
```cpp
    #include <ranges>
    
    int main()
    {
        auto sum =  { return (... + args); };
    
        constexpr auto view = std::views::iota(13, 1337)
                            | std::views::adjacent_transform<3>(sum);
    
        static_assert(*view.begin() == 42 and 42 == 13 + 14 + 15);
    }
```

### Veja também

[ end](<#/doc/ranges/adjacent_transform_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range  
(objeto de ponto de customização)