# std::ranges::chunk_by_view&lt;V,Pred&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

  
Retorna uma cópia da view subjacente `_[base_](<#/doc/ranges/chunk_by_view>)_`. 

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a: `return` ` _[base_](<#/doc/ranges/chunk_by_view>)_` ;`

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a: `return std::[`move`](<#/doc/utility/move>)(`_[base_](<#/doc/ranges/chunk_by_view>)_`);`

### Parâmetros

(nenhum) 

### Valor de retorno

Uma cópia da view subjacente. 

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <functional>
    #include <ranges>
     
    int main()
    {
        static constexpr auto v = {1, 1, 2, 2, 3, 3, 3};
        constexpr auto chunks = v | std::views::chunk_by(std::equal_to{});
        static_assert(std::ranges::equal(v, chunks.base()));
    }
```