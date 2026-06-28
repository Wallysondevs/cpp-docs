# std::ranges::adjacent_view&lt;V,N&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr auto operator*() const;  // (desde C++23)
```

  
Retorna os elementos em V para os quais o array subjacente de iteradores aponta.

Seja [`_current__`](<#/doc/ranges/adjacent_view/iterator>) um array subjacente de iteradores.

Equivalente a: 
```
    return /*tuple-transform*/( -> decltype(auto) { return *i; }, current_);
```

### Parâmetros

(nenhum) 

### Valor de retorno

O elemento atual, que é uma [std::tuple](<#/doc/utility/tuple>) de referências para elementos subjacentes. 

### Notas

operator-> não é fornecido. 

### Exemplo

Execute este código
```
    #include <ranges>
    #include <tuple>
     
    int main()
    {
        constexpr static auto v = {0, 1, 2, 3, 4, 5};
        //                               └──┬──┘
        //                                  └─────────────────┐
        constexpr auto view {v | std::views::adjacent<3>}; // │
        constexpr auto iter {view.begin() + 2};            // │
        //              ┌────────────────────┬────────────────┘
        //              │                 ┌──┴──┐
        static_assert(*iter == std::tuple{2, 3, 4});
    }
```

### Veja também

[ operator[]](<#/doc/ranges/adjacent_view/iterator/operator_at>)(C++23) | acessa um elemento por índice   
(função membro pública)  