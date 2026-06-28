# std::ranges::chunk_by_view&lt;V,Pred&gt;::pred

```cpp
constexpr const Pred& pred() const;  // (desde C++23)
```

  
Retorna uma referência para o objeto `Pred` contido. Equivalente a `return *_[pred_](<#/doc/ranges/chunk_by_view>)_ ;`.

O comportamento é indefinido se `_[pred_](<#/doc/ranges/chunk_by_view>)_` não contiver um valor.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o objeto `Pred` contido.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <concepts>
    #include <functional>
    #include <initializer_list>
    #include <ranges>
     
    int main()
    {
        const auto v = {1, 1, 2, 2, 1, 1, 1};
        auto chunks = v | std::views::chunk_by(std::equal_to{});
        auto pred = chunks.pred();
        static_assert(std::same_as<decltype(pred), std::equal_to<>>);
        assert(pred(v.begin()[0], 1));
    }
```