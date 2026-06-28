# std::ranges::stride_view&lt;V&gt;::stride

```cpp
constexpr ranges::range_difference_t<_Vp> stride() const noexcept;  // (desde C++23)
```

  
Retorna uma cópia do objeto stride subjacente [`_stride__`](<#/doc/ranges/stride_view>). Equivalente a `return stride_;`. 

### Parâmetros

(nenhum) 

### Valor de retorno

O valor do stride. 

### Exemplo

Execute este código
```
    #include <ranges>
     
    int main()
    {
        constexpr auto view = std::views::iota(1337)
                            | std::views::stride(42);
        static_assert(view.stride() == 42);
    }
```