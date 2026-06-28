# std::ranges::stride_view&lt;V&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const;  // (desde C++23)
```

  
Retorna os elementos em V para os quais o iterator subjacente [`_current__`](<#/doc/ranges/stride_view/iterator>) aponta.

Equivalente a: return *current_;.

### Parâmetros

(nenhum)

### Valor de retorno

O elemento atual.

### Observações

operator-> não é fornecido.

### Exemplo

Execute este código
```
    #include <ranges>
     
    int main()
    {
        constexpr static auto v = {'a', 'b', 'c', 'd', 'e'};
        constexpr auto view{v | std::views::stride(2)};
        constexpr auto iter{view.begin() + 1};
        static_assert(*iter == 'c');
        static_assert(*(view.begin() + 2) == 'e');
    }
```

### Veja também

[ operator[]](<#/doc/ranges/stride_view/iterator/operator_at>)(C++23) | acessa um elemento por índice   
(função membro pública)  